const moment = require('moment');
const Segments = require('../library/14-segments');
const display = new Segments(0x70, 1);

display.rollAnimation(1, '-\\|/');

setInterval(() => {
    const time = moment().format('HHss');
    let str = zeroToRoll(time);
    str = toDot(str);
    display.setBrightness(3);
    display.writeString(str);

    //console.log(str);
}, 100);

// DOT
let dotIndex = 0;

function toDot(str) {
    const strArray = str.split('');
    if (dotIndex > 10) dotIndex = 0;
    if ((dotIndex % 5) === 0) strArray.splice(2, 0, '.');
    dotIndex++;
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