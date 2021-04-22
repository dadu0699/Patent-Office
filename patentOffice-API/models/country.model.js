const mysqlConnection = require('../config/database');

const countryModel = {
    executeQuery(query, callback) {
        mysqlConnection.query(query, (err, res) => callback(err, res));
    },

    create(params, callback) {
        let {
            name,
            capital,
            population,
            area,
            regionID
        } = params

        const query = `INSERT INTO Country (name, capital,
                population, area, regionID)
            VALUES('${name}', '${capital}', ${population}, ${area}, 
                ${regionID});`;

        return this.executeQuery(query, callback);
    },
    update(params, id, callback) {
        let {
            name,
            capital,
            population,
            area,
            regionID
        } = params

        const query = `UPDATE Country SET name = '${name}', capital = '${capital}', 
                population = ${population}, area = ${area}, regionID = ${regionID}
            WHERE countryID = ${id};`;

        return this.executeQuery(query, callback);
    },
    delete(id, callback) {
        const query = `DELETE FROM Country WHERE countryID = ${id};`;
        return this.executeQuery(query, callback);
    },
    get(id, callback) {
        let query = `SELECT * FROM Country`;
        if (id) query += ` WHERE countryID = ${id};`;

        return this.executeQuery(query, callback);
    }
};

module.exports = countryModel;