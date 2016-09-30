const DetailsController = require('../lib/DetailsController');
const expect = require('expect.js');

describe('DetailsController', () => {

    describe('.swapDetails', () => {
        var json;
        let detailsCtrl;
        beforeEach(() => {
            detailsCtrl = new DetailsController('./test/json/task2');
        });

        it('should return without a error', function (done) {
            detailsCtrl.swapDetails('main.json').then(() => done());
        });

        it('should swap object containing the insert object key', () => {
            let result = {
                "id": "subItem1Itemssn",
                "label": "dog"
            };
            detailsCtrl.swapDetails('main.json').should.eventually.equal(result);
        });
    });

});