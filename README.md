# HT16K33

## Description
Library for modules using I2C protocol with HT16K33 chip.

## Test
Tested with Adafruits Quad Alphanumeric Display Digits I2C Backpack.

### Availability
At this time only 14 segments module library is available.

## Setup
```bash
npm i -S ht16k33
```
```javascript
const Segments = require('ht16k33').Segments;
const display = new Segments(0x70, 1);
```

## Examples
### A clock
```javascript
const Segments = require('../').Segments,
    display = new Segments(0x70, 1);

// display a simple clock
display.clock();
```

### Digit roll
```javascript
const Segments = require('../').Segments,
    display = new Segments(0x70, 1);

// default rolling chars are '-\|/'
// roll digits for 30s at 10fps
display.rollDigits(100, 30000, true);
```

### Custom digit roll
```javascript
const Segments = require('../').Segments,
    display = new Segments(0x70, 1);

// set rolling chars to 'rolling
display.setRollChars('rolling');
// roll digits for unlimited time at 2fps
display.rollDigits(500, null, true);
```

### Countdown
```javascript
const Segments = require('../').Segments,
    display = new Segments(0x70, 1);

// 1h countdown
display.countDown(3600);
```

## Licence
MIT
