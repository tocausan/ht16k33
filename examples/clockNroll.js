const moment = require('moment');
const Segments = require('../library/14-segments');
const display = new Segments(0x70, 1);

let time = getTime();

display.rollAnimation(1, '-\\|/');

setInterval(() => {
    time = getTime();
    const str = roll_0(time);
    display.setBrightness(3);
    display.writeString(str);

    //console.log(str);
}, 100);

// GET TIME FORMAT
function getTime() {
    return moment().format('HH.ss');
}

// ROLL 0

let rollIndex = 0;

function roll_0(str) {
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