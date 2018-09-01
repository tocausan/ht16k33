const Segments = require('../library/14-segments'),
    display = new Segments(0x70, 1);

// set roll chars
// start the roll in one direction for 30s
// then change roll direction
display.setRollChars('#roll0_#roll1_#roll2_#roll3_');
display.rollDigits(100, 30000, true)
    .then(() => display.rollDigits(100, null, false));