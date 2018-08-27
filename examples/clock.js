const Segments = require('../library/14-segments'),
    display = new Segments(0x70, 1);

// start the clock
display.clock();

// stop the clock after 30s
setTimeout(() => display.clear(), 30000);