const mysqlConnection = require('../config/database');

const regionModel = {
    executeQuery(query, callback) {
        mysqlConnection.query(query, (err, res) => callback(err, res));
    },

    create(params, callback) {
        let {
            name,
            parentID
        } = params

        if (parentID === undefined) parentID = null;

        const query = `INSERT INTO Region (name, parentID)
            VALUES('${name}', ${parentID});`;

        return this.executeQuery(query, callback);
    },
    update(params, id, callback) {
        let {
            name,
            parentID
        } = params

        if (parentID === undefined) parentID = null;

        const query = `UPDATE Region SET name = '${name}', parentID = ${parentID} 
            WHERE regionID = ${id};`;

        return this.executeQuery(query, callback);
    },
    delete(id, callback) {
        const query = `DELETE FROM Region WHERE regionID = ${id};`;
        return this.executeQuery(query, callback);
    },
    get(id, callback) {
        let query = `SELECT * FROM Region`;
        if (id) query += ` WHERE regionID = ${id};`;

        return this.executeQuery(query, callback);
    }
};

module.exports = regionModel;