const moment = require('moment');
const Segments = require('../library/14-segments');
const display = new Segments(0x70, 1);

const rollStr = '-\\|/';
let r = 0,
    dotIndex = 1;

setInterval(() => {
    const time = moment().format('HHmm');
    if (dotIndex > 3) dotIndex = 0;
    let str = '';

    time.split('').forEach(item => {
        if (item == 0) str += rollStr[dotIndex];
        else str += item;
    });
    display.writeString(str);
    dotIndex++;
}, 1000);
