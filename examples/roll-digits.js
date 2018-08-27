const Segments = require('../library/14-segments'),
    display = new Segments(0x70, 1);

// start the roll in one direction
display.rollDigits(true);


// change roll direction after 30s
setTimeout(() => {
    display.clear();
    // start the roll in the other direction
    display.rollDigits(false);
}, 30000);