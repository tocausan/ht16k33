const Segments = require('../library/14-segments');

const display = new Segments(0x70, 1);
const rollStr = '-\\|/';
let i = 0;

setInterval(() => {
    let str = '';
    if (i > 3) i = 0;
    for (let j = 0; j <= 3; j++) str += rollStr[i];
    display.writeString(str);
    i++;
}, 100);
