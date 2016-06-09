# arduino_program_test
Test programming an Atmel micro running the Nano bootloader via a node application.

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

Run the program:
```bash
cd arduino_program_test
npm install
sudo node index.js
```

