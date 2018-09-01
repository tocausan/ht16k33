const moment = require('moment');
const Segments = require('../').Segments;
const display = new Segments(0x70, 1);

display.rollDigits(100, 3000, true)
    .then(() => clockNRoll());

function clockNRoll() {
    setInterval(() => {
        const time = moment().format('HHmm');
        let str = zeroToRoll(time);
        str = toDot(str);
        display.setBrightness(3);
        display.writeString(str);
    }, 100);
}

// DOT
function toDot(str) {
    const seconds = moment().format('ss');
    const strArray = display.stringToCharArray(str);
    if ((seconds % 2) === 0) strArray.splice(2, 0, '.');
    return strArray.join('');
}

// ZERO TO ROLL
let rollIndex = 0;

function zeroToRoll(str) {
    const rollChars = '-\\|/';

    if (rollIndex > (rollChars.length - 1)) rollIndex = 0;
    let resultStr = '';
    str.split('').forEach(item => {
        if (item == 0) resultStr += rollChars[rollIndex];
        else resultStr += item;
    });
    rollIndex++;
    return resultStr;
}