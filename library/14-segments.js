'use strict';

const Backpack = require('./backpack');
const fonts = require('./14-segments-fonts');

module.exports = class Segments {
    constructor(address, bus) {
        address = address || 0x70;
        bus = bus || 1;
        this.display = new Backpack(address, bus);
        this.digits = fonts;
    }

    getStringBinaries(str) {
        const result = [];
        str.split('').forEach((item, index) => {
            const digit = this.digits[item];
            if (item == '.' && index > 0) result[index - 1] |= this.digits['.'];
            else result.push(digit);
        });

        return result;
    }

    rollAnimation(charIndex, charArr, interval = 100, duration = 1000) {
        let i = 0;
        const animation = setInterval(() => {
            let digit = this.digits[charArr[i]];
            this.display.setBufferRow(charIndex, digit, false);
            this.display.writeDisplay();
            i++;
        }, interval);
        setTimeout(() => clearInterval(animation), duration);
    }

    writeString(str) {
        const binaries = this.getStringBinaries(str);
        binaries.forEach((item, index) => {
            this.display.setBufferRow(index, item, false);
        });
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

    setBrightness(brightness) {
        this.display.setBrightness(brightness);
    }

    clear() {
        this.display.clear();
    }
};