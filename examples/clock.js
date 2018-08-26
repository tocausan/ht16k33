const Segments = require('../library/14-segments'),
    moment = require('moment');

const display = new Segments(0x70, 1);
display.writeString('clock');

setInterval(() => {
    const time = moment().format('HHmm');
    display.writeString(time);
}, .5);
