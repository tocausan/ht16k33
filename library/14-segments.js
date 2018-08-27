'use strict';

const Backpack = require('./backpack');
const moment = require('moment');
const fonts = require('./14-segments-fonts');

class Segments {
    constructor(address = 0x70, bus = 1) {
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

    writeString(str) {
        const binaries = this.getStringBinaries(str);
        binaries.forEach((item, index) => {
            this.display.setBufferRow(index, item, false);
        });
        console.log(str);
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
        if (this.interval !== undefined) clearInterval(this.interval);
         this.display.clear();
    }

    clock() {
        let dot = true;
        this.interval = setInterval(() => {
            const time = moment().format('HHmm');
            let str = time.split('');
            if (dot) str.splice(2, 0, '.');
            dot = !dot;
            this.writeString(str.join(''));
        }, 500);
    }

    countDown(duration = 60) {
        return new Promise(resolve => {
            this.interval = setInterval(() => {
                //return clear() when 00:00
                if (duration <= 1) {
                    this.clear();
                    resolve();
                }

                let str = '';
                const minutes = Math.floor(duration / 60).toString();
                const seconds = Math.floor(duration - (minutes * 60)).toString();

                str += minutes.length > 1 ? minutes : '0' + minutes;
                str += seconds.length > 1 ? seconds : '0' + seconds;

                if ((parseInt(seconds) % 2) === 0) {
                    let strArray = str.split('');
                    strArray.splice(2, 0, '.');
                    str = strArray.join('');
                }
                this.writeString(str);

                duration -= .1;
            }, 100);
        });
    }

    rollDigits(interval = 100, duration = null, direction = true) {
        return new Promise(resolve => {
            const chars = '-\\|/';
            let i = 0;

            this.interval = setInterval(() => {
                if (i < 0) i = chars.length - 1;
                if (i > (chars.length - 1)) i = 0;

                let str = '';
                for (let j = 0; j < 4; j++) {
                    str += chars[i];
                }
                this.writeString(str);
                direction ? i++ : i--;
            }, interval);

            //return clear() after duration if set
            if (duration !== null) {
                setTimeout(() => {
                    this.clear();
                    resolve();
                }, duration)
            }
        });
    }
}

module.exports = Segments;