'use strict';

let _ = require('lodash');

const JsonParseService = {

    getElementPath: (obj, element, path, result) => {
        path = path || '';
        result = result || [];

        _.forIn(obj, (value, key, object) => {
            if(value == element) {
                let fullPath = JsonParseService.getPathString(object, path, key);
                result.push(fullPath);
                return false;
            }

            if (typeof value === 'object') {
                JsonParseService.getElementPath(value, element, JsonParseService.getPathString(object, path, key), result);
            }
        });

        return result;
    },

    getPathString: (value, path, key) => {
        if (value instanceof Array) {
            return `${path}[${key}]`;
        }

        return key === 'items' ? path : `${path}\\${key}`;
    },

    getObjectsContainingKey: (object, elementKey) => {
        return _.reduce(object, (result, value, key, obj) => {
            if(key === elementKey) {
                result.push(obj);
            }

            if(typeof value === 'object') {
                result = _.concat(result, JsonParseService.getObjectsContainingKey(value, elementKey));
            }

            return result;
        }, []);
    },

    getValue(object, path, element, id) {
        let objectAtPath = _.get(object, path);
        let objectsWithId = _.find(objectAtPath, ['id', id]);

        if(!objectsWithId || !objectsWithId.hasOwnProperty(element)) {
            return;
        }

        return objectsWithId[element];
    }
};

module.exports = JsonParseService;