'use strict';

const Segments = require('ht16k33').Segments,
    moment = require('moment'),
    display = new Segments(0x70, 1);

let i = 1;

setInterval(() => {
    const time = moment().format('HHmm');
    if (i > 4) i = 1;
    let str = time.split('');
    str.splice(i, 0, '.');
    display.writeString(str.join(''));
    i++;
}, 250);