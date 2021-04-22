const mysqlConnection = require('../config/database');

const invModel = {
    executeQuery(query, callback) {
        mysqlConnection.query(query, (err, res) => callback(err, res));
    },

    create(params, callback) {
        let {
            inventorID,
            inventionID
        } = params

        const query = `INSERT INTO InventorInvention (inventorID, inventionID)
            VALUES('${inventorID}', ${inventionID});`;

        return this.executeQuery(query, callback);
    },
    update(params, id, callback) {
        let {
            name,
            year,
            countryID
        } = params

        const query = `UPDATE InventorInvention SET inventorID = ${inventorID}, 
            inventionID = ${inventionID} WHERE inventorInventionID = ${id};`;

        return this.executeQuery(query, callback);
    },
    delete(id, callback) {
        const query = `DELETE FROM InventorInvention 
            WHERE inventorInventionID = ${id};`;
        return this.executeQuery(query, callback);
    },
    get(id, callback) {
        let query = `SELECT * FROM InventorInvention`;
        if (id) query += ` WHERE inventorInventionID = ${id};`;

        return this.executeQuery(query, callback);
    }
};

module.exports = invModel;