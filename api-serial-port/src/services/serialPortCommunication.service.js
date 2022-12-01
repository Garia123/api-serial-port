var SerialPort = require("serialport");
var dataReceive;
var serialPort;
var dataSerialPort = [];
const balanzaNormal = "balanzaNormal";
const balanzaSW = "balanzaSW";

const connectSerialPort = () => {
  openSerialPort("COM8");
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
    } catch (err) {
      console.log(err);
    }
  });
};

const listenSerialPortData = () => {
  serialPort.on("data", function(data) {
    dataString = data.toString(); 
    if (dataString == '@' || dataString == 'D') {
      dataSerialPort = [];
      dataSerialPort.push(balanzaSW);
    } else if (dataString == 'ã') {
      dataSerialPort = [];
      dataSerialPort.push(balanzaNormal);
    } else if (!isNaN(dataString)) {
      dataSerialPort.push(data.toString());
    }
    console.log(data.toString());
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
