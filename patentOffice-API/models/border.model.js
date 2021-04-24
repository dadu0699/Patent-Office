const mysqlConnection = require('../config/database');

const borderModel = {
    executeQuery(query, callback) {
        mysqlConnection.query(query, (err, res) => callback(err, res));
    },

    create(params, callback) {
        let {
            cardinalDirection,
            countryID,
            countryBorderID
        } = params

        const query = `INSERT INTO Border (cardinalDirection,
                countryID, countryBorderID)
            VALUES('${cardinalDirection}', ${countryID}, 
                ${countryBorderID});`;

        return this.executeQuery(query, callback);
    },
    update(params, id, callback) {
        let {
            cardinalDirection,
            countryID,
            countryBorderID
        } = params

        const query = `UPDATE Border SET cardinalDirection = '${cardinalDirection}', 
                countryID = ${countryID}, countryBorderID = ${countryBorderID}
            WHERE borderID = ${id};`;

        return this.executeQuery(query, callback);
    },
    delete(id, callback) {
        const query = `DELETE FROM Border WHERE borderID = ${id};`;
        return this.executeQuery(query, callback);
    },
    get(id, callback) {
        let query = `SELECT b.countryID, ct.name AS 'country', 
                    b.countryBorderID, ctb.name AS 'border',
                    b.cardinalDirection
            FROM Border b
            INNER JOIN Country ct ON (ct.countryID = b.countryID)
            INNER JOIN Country ctb ON (ctb.countryID = b.countryBorderID)`;
        if (id) query += ` WHERE b.borderID = ${id};`;

        return this.executeQuery(query, callback);
    }
};

module.exports = borderModel;