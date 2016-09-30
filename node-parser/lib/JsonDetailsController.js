const jsonFileService = require('./JsonFileService');
const jsonParseServcie = require('./JsonParseService');
const fs = require('fs');
const path = require('path');
const Q = require('q');
const _ = require('lodash');

class JsonDetailsController {

    constructor(dir) {
        this.directory = dir;
    }

    swapDetails(src) {
        let mainPath = path.join(this.directory, src);
        return jsonFileService.readJson(mainPath).then(this.processContent.bind(this));
    }

    processContent(content) {
        let insertObjects = jsonParseServcie.getObjectsContainingKey(content, 'serverInsert');
        let insertFilePromises = this.getFilesToInsert(insertObjects);

        return Q.all(insertFilePromises).then(fileContents => {
            for (let idx = 0; idx < insertObjects.length; ++idx) {
                delete insertObjects[idx].serverInsert;
                Object.assign(insertObjects[idx], fileContents[idx]);
            }

            return content;
        });
    }


    getFilesToInsert(insertObjects) {
        return _.map(insertObjects, insertObject => {
            let filePath = path.join(this.directory, `${insertObject.serverInsert}.json`);
            return jsonFileService.readJson(filePath);
        });
    }


}

module.exports = (JsonDetailsController);