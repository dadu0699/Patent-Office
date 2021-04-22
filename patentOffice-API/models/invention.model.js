const mysqlConnection = require('../config/database');

const inventionModel = {
    executeQuery(query, callback) {
        mysqlConnection.query(query, (err, res) => callback(err, res));
    },

    create(params, callback) {
        let {
            name,
            year,
            countryID
        } = params

        const query = `INSERT INTO Invention (name, year, countryID)
            VALUES('${name}', ${year}, ${countryID});`;

        return this.executeQuery(query, callback);
    },
    update(params, id, callback) {
        let {
            name,
            year,
            countryID
        } = params

        const query = `UPDATE Invention SET name = '${name}', year = ${year}, 
            countryID = ${countryID} WHERE inventionID = ${id};`;

        return this.executeQuery(query, callback);
    },
    delete(id, callback) {
        const query = `DELETE FROM Invention WHERE inventionID = ${id};`;
        return this.executeQuery(query, callback);
    },
    get(id, callback) {
        let query = `SELECT * FROM Invention`;
        if (id) query += ` WHERE inventionID = ${id};`;

        return this.executeQuery(query, callback);
    }
};

module.exports = inventionModel;