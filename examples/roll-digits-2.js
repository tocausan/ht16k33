'use strict';

const Segments = require('ht16k33').Segments,
    display = new Segments(0x70, 1);

// set roll chars
// start the roll in one direction for 30s
// then change roll direction
const rollChars = [];
for (let i = 0; i <= 14; i++) {
    rollChars.push('#fullClock' + i + '_');
}
for (let i = 0; i <= 14; i++) {
    rollChars.push('#emptyClock' + i + '_');
}

display.setRollChars(rollChars.join(''));
display.rollDigits(50, null, true);