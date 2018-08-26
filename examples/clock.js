const segments = require('../library/14-segments'),
    moment = require('moment');

const display = new segments(0x70, 1);
display.writeString('clock');

setInterval(() => {
    const time = moment().format('mmss');
    display.writeString(time);
}, .5);
