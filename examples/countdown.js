const Segments = require('../library/14-segments'),
    display = new Segments(0x70, 1);

// start the countdown
display.countDown(60)
    .then(() => display.rollDigits());
