# arduino_program_test
Test programming an Atmel micro running the Nano bootloader via a node application.

The use case is one where in-system programming of an Arduino or clone via a Raspberry Pi is needed and the Arduino is connected to the Raspberry Pi via the RX/TX lines on the Raspberry Pi instead of via USB.  The Arduino perhaps does some low-level control while the Pi perhaps is used as the user interface or for connectivity.

### Setup

Required hardware:

- Raspberry Pi 2 running Raspbian or another suitable distro
- GrovePi+ board
- A target board containing an Arduino Nano or clone with the Nano bootloader installed

Basic Instructions:

- Install the GrovePi+ board onto the Pi
- Install the GrovePi+ software per the instructions on the [GrovePi web site](http://www.dexterindustries.com/GrovePi/get-started-with-the-grovepi/)
- Connect RX and TX to the target board.  Observe voltage differences, i.e. 3v3 vs 5v0.
- Connect the D2 GPIO from the GrovePi+ to the reset line of the target micro.
- Connect appropriate supply voltages to the target board.
- Clone this repo

Install and run the program:
```bash
cd arduino_program_test
npm install
sudo node index.js
```

Notes:
- The file to be uploaded to the target micro is hard-coded in the app.

### Links
- [stk500](https://www.npmjs.com/package/stk500)
- [intel-hex](https://www.npmjs.com/package/intel-hex)
- A [fork](https://github.com/rbultman/GrovePi) of [node-grovepi](https://www.npmjs.com/package/node-grovepi)
