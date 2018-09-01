const Segments = require('../').Segments,
    display = new Segments(0x70, 1);

// start the roll in one direction for 30s
// then change roll direction
display.rollDigits(100, 30000, true)
    .then(() => display.rollDigits(100, null, false));