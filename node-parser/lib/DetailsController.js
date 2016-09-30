const jsonFileService = require('./FileService');
const jsonParseServcie = require('./ParseService');
const fs = require('fs');
const path = require('path');
const Q = require('q');
const _ = require('lodash');

class DetailsController {

    constructor(dir) {
        this.directory = dir;
    }

    swapDetails(src) {
        let mainPath = path.join(this.directory, src);
        return jsonFileService.readJson(mainPath).then(this.getDetails.bind(this));
    }

    getDetails(content) {
        let insertObjects = jsonParseServcie.getObjectsContainingKey(content, 'serverInsert');
        let insertFilePromises = this.getFilesToInsert(insertObjects);
        let swap = _.curry(this.swap)(content)(insertObjects);

        return Q.all(insertFilePromises).then(swap);
    }

    swap(content, insertObjects, insertFileContents) {
        for (let idx = 0; idx < insertObjects.length; ++idx) {
            delete insertObjects[idx].serverInsert;
            Object.assign(insertObjects[idx], insertFileContents[idx]);
        }

        return content
    }

    getFilesToInsert(insertObjects) {
        return _.map(insertObjects, insertObject => {
            let filePath = path.join(this.directory, `${insertObject.serverInsert}.json`);
            return jsonFileService.readJson(filePath);
        });
    }


}

module.exports = (DetailsController);