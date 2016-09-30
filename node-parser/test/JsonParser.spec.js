const jsonParseService = require('../lib/JsonParseService');
const expect = require('expect.js');

describe('JsonParseService', () => {

    describe('.getElementPath', () => {
        var json;
        beforeEach(() => {
            json = require('../json/task1/sample.json');
        });

        it('should return \\itemList[1]\\id for item2', function () {
            expect(jsonParseService.getElementPath(json, 'item2')[0]).to.be('\\itemList[1]\\id');
        });

        it('should return \\itemList[5]\\subItems[1]\\label for \'SubItem 2\'', function () {
            expect(jsonParseService.getElementPath(json, 'SubItem 2')[0]).to.be('\\itemList[5]\\subItems[1]\\label');
        });

        it('should return multiple paths if value occurs on more than one path', function () {
            let paths = jsonParseService.getElementPath(json, 'item1');
            expect(paths).to.contain('\\itemList[8]\\subItems\\id');
            expect(paths).to.contain('\\itemList[0]\\id');
        });
    });

    describe('.getObjectsContainingKey', () => {

        it('should return a empty list if no matching key is found', () => {
            let json = {dog: 'woof', cat: 'meh', kennel: [{dog: 'woof', cat: 'meh'}, {dog: 'woof'}]};
            expect(jsonParseService.getObjectsContainingKey({}, 'goose')).to.eql([]);
            expect(jsonParseService.getObjectsContainingKey(json, 'goose')).to.eql([]);
        });

        it('should return all objects containing the given key', () => {
            let json = {
                lonely: {goose: 'woot'},
                threesCompany: [
                    {goose: 'woot'},
                    {duck: 'meh'},
                    {duck: {goose: 'woot'}}
                ]
            };

            let result = jsonParseService.getObjectsContainingKey(json, 'goose');
            expect(result).to.have.length(3);
        });

        it('should return a reference to the found object', () => {
            let json = {
                lonely: {goose: 'woot'}
            };
            let found = jsonParseService.getObjectsContainingKey(json, 'goose');
            found[0].goose = 'sowonwy';
            expect(json.lonely.goose).to.be('sowonwy');
        });
    });

    describe('.getValue', () => {

        let json;
        beforeEach(()=>{
            json = require('../json/task3/sample.json');
        });

        it('should find object at contained in object at path with the given id', ()=> {
            let result =jsonParseService.getValue(json, 'itemList.items.subItems', 'label', 'subItem1Item2');
            expect(result).to.be.ok();
            expect(jsonParseService.getValue(json, 'itemList.items.subItems', 'label', 'subItem1Item2')).to.be('SubItem 2 label');
        });
    });
});