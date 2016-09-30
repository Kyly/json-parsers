'use strict';
let Q = require('q');
let fs = require('fs');

const JsonFileServce = {

    readJson: path => JsonFileServce.readFile(path).then(JSON.parse),

    readFile: path => {
        let deferer = Q.defer();

        fs.readFile(path, (error, data) => {
            if (error) {
                deferer.reject(error);
            }

            else {
                deferer.resolve(data);
            }
        });

        return deferer.promise;
    }

};

module.exports = JsonFileServce;