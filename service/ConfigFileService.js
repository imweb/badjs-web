/**
 * ���������ļ��ķ���
 * @author homkerliu
 * @type {*|exports|module.exports}
 */
var log4js = require('log4js'),
    logger = log4js.getLogger(),
    fs = require('fs');

/**
 * ����
 * @param filePath
 * @param data ��string��
 * @param callback
 */
function insertFile(filePath, data, callback) {
    fs.writeFile(filePath, JSON.stringify(data), function (err) {
        if (err) {
            logger.warn('write file is wrong the err is' + err);
        }
        typeof callback == 'function' && callback(err);
    });
}
/**
 * ��װ����json��ʽ������
 * @param filePath
 * @param data ��json��
 * @param callback
 */
function insertJson(filePath, data, callback) {
    queryFromFile(filePath, function (err, result) {
        extend(data, result, true);
        insertFile(filePath, data, callback);
    })
}

/**
 * ������չ����
 * @param o
 * @param n
 * @param override
 */
function extend(o, n, override) {
    for (var p in n)if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override))o[p] = n[p];
};

/**
 * ��ѯ���첽
 * @param filePath
 * @param callback
 */

function queryFromFile(filePath, callback) {
    fs.readFile(filePath, function (err, data) {
        if (err) {
            logger.error('file read file err');
            return;
        }
        callback && callback(err, JSON.parse(data));
    })
}

/**
 * ��ѯ��ͬ��
 * @param filepath
 */

function queryFromFileBySync(filepath) {
    var data = {};
    try {
        data = JSON.parse(fs.readFileSync(filepath));
    } catch (error) {
        if (error) {
            logger.warn('read file sync error ,err is' + error);
            return;
        }
    }
    logger.debug(data);
    return data;
}

module.exports = {
    insert: function (filePath, data, callback, type) {
        if (type === 'json') {
            insertJson(filePath, data, callback)
        } else {
            insertFile(filePath, data, callback);
        }
    },
    query: function (filePath, callback) {
        queryFromFile(filePath, callback);
    },
    querySync: function (filePath) {
        queryFromFileBySync(filePath);
    }
};
