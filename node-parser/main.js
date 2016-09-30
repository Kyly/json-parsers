'use strict';

let DetailsController = require('./lib/DetailsController');

let detaisCtrl = new DetailsController('./json/task2');
detaisCtrl.swapDetails('main.json').then((content) => console.log(JSON.stringify(content, null, 4)), console.log);