const mysqlConnection = require('../config/database');

const inventorModel = {
    executeQuery(query, callback) {
        mysqlConnection.query(query, (err, res) => callback(err, res));
    },

    create(params, callback) {
        let {
            name,
            countryID
        } = params

        const query = `INSERT INTO Inventor (name, countryID)
            VALUES('${name}', ${countryID});`;

        return this.executeQuery(query, callback);
    },
    update(params, id, callback) {
        let {
            name,
            countryID
        } = params

        const query = `UPDATE Inventor SET name = '${name}', countryID = ${countryID}
            WHERE inventorID = ${id};`;

        return this.executeQuery(query, callback);
    },
    delete(id, callback) {
        const query = `DELETE FROM Inventor WHERE inventorID = ${id};`;
        return this.executeQuery(query, callback);
    },
    get(id, callback) {
        let query = `SELECT * FROM Inventor`;
        if (id) query += ` WHERE inventorID = ${id};`;

        return this.executeQuery(query, callback);
    }
};

module.exports = inventorModel;