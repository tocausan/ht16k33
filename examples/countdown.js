'use strict';

const Segments = require('../').Segments,
    display = new Segments(0x70, 1);

// start the countdown
display.countDown(60)
    .then(() => display.rollDigits());

