var SerialPort = require("serialport");
var serialPort;
var dataSerialPort = [];
const balanzaNormal = "1";
const balanzaSW = "2";

const connectSerialPort = () => {
  openSerialPort("COM11");
  /*SerialPort.list()
    .then(function(ports) {
      ports.forEach(function(port) {
        //serialPorts.push(port.path)
        openSerialPort(port.path);
      });
    })
    .catch(error => {
      console.log(error);
    });*/
};

const openSerialPort = port => {
  serialPort = new SerialPort(port, {
    baudRate: 9600
  }).on("error", function(error) {
    console.log(error);
  });

  serialPort.on("open", function() {
    try {
      console.log("-- Connection opened --");
      listenSerialPortData();
    } catch (err) {
      console.log(err);
    }
  });
};

const listenSerialPortData = () => {
  serialPort.on("data", function(data) {
    dataString = data.toString();
    dataAscii = data.toString("ascii");
    if (dataString == "@" || dataString == "D") {
      dataSerialPort = [];
      dataSerialPort.push(balanzaSW);
    } else if (dataAscii == "c") {
      dataSerialPort = [];
      dataSerialPort.push(balanzaNormal);
    } else if (!isNaN(dataString)) {
      dataSerialPort.push(data.toString());
    }
  });
};

const getAll = function() {
  return dataSerialPort.toString();
};

const closeConnection = function() {
  serialPort.on("close", function() {
    console.log("-- Connection closed --");
  });
};

module.exports = {
  getAll,
  connectSerialPort,
  listenSerialPortData,
  closeConnection
};
