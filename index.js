var async = require('async');

var SerialPort = require("serialport");
var serialPort = new SerialPort.SerialPort("/dev/ttyAMA0", {
  baudrate: 57600
});

var GrovePi = require('node-grovepi').GrovePi
var Commands = GrovePi.commands
var GroveBoard = GrovePi.board
var DigitalOutput = GrovePi.sensors.DigitalOutput;
var DigitalInput = GrovePi.sensors.DigitalInput;

var fs = require('fs');
var intelHex = require('intel-hex');
var data = fs.readFileSync('PizzaOvenControllerSketch.ino.hex', {
  encoding: 'utf8'
});
var hexData = intelHex.parse(data).data;

var Stk500 = require('stk500');

var resetPort = 2;
var resetPreTime = 50;
var resetTime = 50;
var resetPostTime = 50;

function resetControlBoardAsync(resetPin, done) {
  async.series(
    [
      // Initial on period - not sure if this is needed
      function(callback) {
        resetPin.on();
        setTimeout(function() {
          callback();
        }, resetPreTime);
      },
      // The actual reset
      function(callback) {
	console.log("Setting reset low...");
        resetPin.off();
        setTimeout(function() {
          callback();
        }, resetTime);
      },
      // The post reset delay
      function(callback) {
        resetPin.on();
        setTimeout(function() {
          callback();
        }, resetPostTime);
      }
    ], 
    function(err) {
       done(err)
    }
  );
}

var micro_info = {
  signature: new Buffer([0x1e, 0x95, 0x0f]),
  pageSize: 128,
  timeout: 400
};

function microProgrammingEnded(error) {
  serialPort.close(function(error) {
    console.log(error);
  });

  if (error) {
    console.log("Error bootloading: " + error);
  } else {
    console.log("Programming successful.");
  }
}

function proceedWithProgramming(err) {
  if (err) {
    console.log("An error occurred while setting up programming.");
    microProgrammingEnded(err);
  } else {
    Stk500.bootload(serialPort, hexData, micro_info, microProgrammingEnded);
  }
}

serialPort.on('open', function() {
  var grove = new GroveBoard({
    debug: false,
    onError: function(err) {
      console.log("Something bad happened: " + err);
    },
    onInit: function(res) {
      if (res) {
        grove.pinMode(resetPort, 'output');
        var reset = new DigitalOutput(resetPort);

	resetControlBoardAsync(reset, proceedWithProgramming);
      }
    }
  });

  grove.init();
});
