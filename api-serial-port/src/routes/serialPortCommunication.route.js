const express = require("express");
const router = express.Router({ mergeParams: true });

const serialPortCommunicationController = require("../controllers/serialPortCommunication.controller");

router.route("/connectSerialPort").get(serialPortCommunicationController.connectSerialPort);
router.route("/listenSerialPortData").get(serialPortCommunicationController.listenSerialPortData);
router.route("/closeConnection").get(serialPortCommunicationController.closeConnection);
router.route("/").get(serialPortCommunicationController.getAll);

module.exports = router;
