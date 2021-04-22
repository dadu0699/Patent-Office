const mysqlConnection = require('../config/database');

const questionModel = {
    executeQuery(query, callback) {
        mysqlConnection.query(query, (err, res) => callback(err, res));
    },

    create(params, callback) {
        let {
            utterance,
            surveyID
        } = params

        const query = `INSERT INTO Question (utterance, surveyID)
            VALUES('${utterance}', ${surveyID});`;

        return this.executeQuery(query, callback);
    },
    update(params, id, callback) {
        let {
            utterance,
            surveyID
        } = params

        const query = `UPDATE Question SET utterance = '${utterance}', 
                surveyID = ${surveyID} WHERE questionID = ${id};`;

        return this.executeQuery(query, callback);
    },
    delete(id, callback) {
        const query = `DELETE FROM Question WHERE questionID = ${id};`;
        return this.executeQuery(query, callback);
    },
    get(id, callback) {
        let query = `SELECT * FROM Question`;
        if (id) query += ` WHERE questionID = ${id};`;

        return this.executeQuery(query, callback);
    }
};

module.exports = questionModel