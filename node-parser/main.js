'use strict';

let JsonDetailsController = require('./lib/JsonDetailsController');

let detaisCtrl = new JsonDetailsController('./json/task2');
detaisCtrl.swapDetails('main.json').then((content) => console.log(JSON.stringify(content, null, 4)), console.log);