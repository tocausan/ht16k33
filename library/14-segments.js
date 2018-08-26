'use strict';

const Backpack = require('./backpack'),
    fonts = require('./14-segments-fonts');

module.exports = class Segments {
    constructor(address, bus) {
        address = address || 0x70;
        bus = bus || 1;
        this.display = new Backpack(address, bus);
        this.digits = fonts;
    }

    animation(charIndex, charArr, interval = 100) {
        let i = 0;
        setInterval(() => {
            let digit = this.digits[charArr[i]];
            this.display.setBufferRow(charIndex, digit, false);
            this.display.writeDisplay();
            i++;
        }, interval);
    }

    writeString(string) {
        const chars = string.split('');
        let addDot = false,
            i = 3;
        while (i >= 0 && chars.length > 0) {
            const buff = chars.pop();
            let message = this.digits[buff];
            console.log(message)
            if (addDot) message |= 0x4000;

            if (buff === '.') {
                addDot = true;
            } else {
                addDot = false;
                this.display.setBufferRow(i, message, false);
                i--;
            }
        }
        while (i >= 0) {
            this.display.setBufferRow(i, 0, false);
            i--;
        }
        this.display.writeDisplay();
    }

    writeChar(charNumber, char) {
        if (charNumber > 3) return;
        this.display.setBufferRow(charNumber, this.digits[char]);
    }

    writeRaw(charNumber, value) {
        //Sets a digit using the raw 16-bit value"
        if (charNumber > 3) return;
        //Set the appropriate digit
        this.display.setBufferRow(charNumber, value);
    }

    setBrightness(brightness){
        this.display.setBrightness(brightness);
    }

    clear() {
        this.display.clear();
    }
};