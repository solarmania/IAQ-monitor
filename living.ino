#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP085_U.h>
#include <Adafruit_SHT31.h>
#include <ESP8266WiFi.h>

Adafruit_BMP085_Unified bmp = Adafruit_BMP085_Unified(10085);
Adafruit_SHT31 sht31 = Adafruit_SHT31();

const char* ssid     = "KT_WiFi_2G_F05D";
const char* password = "8ei54ib512";
const char* host = "172.30.1.5";
const int httpPort = 8000;

void setup() {
  Serial.begin(9600);
  bmp.begin();
  sht31.begin(0x44);
  
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA); //Explicitly set the ESP8266 to be a WiFi-client. 
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay (500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {  
  sensors_event_t event;
  bmp.getEvent(&event); 
  float p = event.pressure;
  Serial.print("Pressure: "); Serial.print(p); Serial.println(" hPa");
    
  float t = sht31.readTemperature();
  float h = sht31.readHumidity();
  Serial.print("Temperature: "); Serial.print(t); Serial.println(" oC");
  Serial.print("Rel. Humidity: "); Serial.print(h); Serial.println(" %");
  
  //Modify data to minimize storage space
  int T = t*100;
  int H = h*100;
  int P = round(p*10); 

  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  Serial.print("connecting to ");
  Serial.println(host);
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  // This will send the request to the server
  String postData = "user=living&T="+String(T)+"&H="+String(H)+"&P="+String(P);
  client.println("POST / HTTP/1.1");
  client.println("Content-Type: application/x-www-form-urlencoded;");
  client.print("Content-Length: ");
  client.println(postData.length());
  client.println();
  client.println(postData);
           
  // Read all the lines of the reply from server and print them to Serial
  while (client.available()) {
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }
  
  client.stop();
  Serial.println();
  Serial.println("closing connection");
  
  delay(898800);
}
