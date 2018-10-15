#include <SoftwareSerial.h>
#include <Wire.h>
#include <SDS011.h>
#include <Adafruit_SHT31.h>
#include <ESP8266WiFi.h>

SoftwareSerial co2(D7,D8);
SDS011 dust;
Adafruit_SHT31 tempHumid = Adafruit_SHT31();

const byte readCmd[] = {0xFF,0x01,0x86,0x00,0x00,0x00,0x00,0x00,0x79};
const char* ssid     = "myid";
const char* password = "mypassword";
const char* host = "myip";
const int httpPort = 80;

int ppm;

float p10,p25;
int error;

float h,t;

void setup() {  
  Serial.begin(9600);
  co2.begin(9600);
  dust.begin(D4,D3);
  tempHumid.begin(0x44);

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
  
  delay(30000);
}

int stat = 0;
int dataByteCount = 0;
byte checkSum = 0;
byte ppmHigh = 0;
byte ppmLow = 0;

void loop() {  

  //measure PM2.5 and PM10
  error = dust.read(&p25,&p10);
  if (! error) {
    Serial.print("PM2.5: " + String(p25) + ", ");
    Serial.print("PM10: " + String(p10) + ", ");
  }

  //measure temperature and humidity
  t = tempHumid.readTemperature();
  h = tempHumid.readHumidity();
  Serial.print("T: " + String(t) + "C, "); 
  Serial.print("RH: " + String(h) + "%, ");

  //measure CO2
  while (co2.available() == 0) {
    co2.write(readCmd,9);
    delay (1000);
  }
  while (co2.available() > 0) {
    byte d = co2.read();
    switch (stat) {
      case 0:
        if (d == 0xFF) stat = 1;
        break;
      case 1:
        if (d == 0x86) {
          stat = 2; 
        }else if (d != 0xFF){
          stat = 0;          
        }
        break;
      case 2:
        switch (dataByteCount){
          case 0:
            ppmHigh = d;
            checkSum = 0x86 + d;
            dataByteCount ++;
            break;
         case 1:
           ppmLow = d;
           checkSum = checkSum + d;
           dataByteCount ++;
           break;
         case 6:
           checkSum = 255 - checkSum;
           checkSum = checkSum + 1;
           if (checkSum < 0){
            checkSum = checkSum + 256;
           }
           if (checkSum == d){
             stat = 0;
             dataByteCount = 0;
             checkSum = 0;
             ppm = ppmHigh * 256 + ppmLow;
             Serial.println ("CO2: " + String(ppm) + "ppm");
           }
           break;
         default:
           checkSum = checkSum + d;
           dataByteCount ++;
           break;
        }
     }
  }
  //Modify data to minimize storage space
  int T = t*100;
  int H = h*100;
  int P10 = p10*10;
  int P25 = p25*10;

  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  Serial.print("connecting to ");
  Serial.println(host);
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  // This will send the request to the server
  String postData = "user=kitchen&T="+String(T)+"&H="+String(H)+"&P10="+String(P10)+"&P25="+String(P25)+"&C="+String(ppm);
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
  delay(1000);
  
  dust.sleep(); 
  delay(867000);
  dust.wakeup(); 
  delay(30000);
}
