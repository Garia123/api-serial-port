const serialPortCommunicationService = require("../services/serialPortCommunication.service");

const connectSerialPort = function(req, res) {
  res.send(serialPortCommunicationService.connectSerialPort());
};

const listenSerialPortData = function(req, res) {
  res.send(serialPortCommunicationService.listenSerialPortData());
};

const getAll = function(req, res) {
  res.send(serialPortCommunicationService.getAll());
};
 
const closeConnection = function(req, res) {
  res.send(serialPortCommunicationService.closeConnection());
};

module.exports = {
  listenSerialPortData,
  getAll,
  connectSerialPort,
  closeConnection
};
