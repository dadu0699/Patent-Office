const mysqlConnection = require('../config/database');

const answerModel = {
    executeQuery(query, callback) {
        mysqlConnection.query(query, (err, res) => callback(err, res));
    },

    create(params, callback) {
        let {
            utterance,
            correct,
            questionID
        } = params

        const query = `INSERT INTO Answer (utterance, correct, questionID)
            VALUES('${utterance}', ${correct}, ${questionID});`;

        return this.executeQuery(query, callback);
    },
    update(params, id, callback) {
        let {
            utterance,
            correct
        } = params

        const query = `UPDATE Answer SET utterance = '${utterance}', 
            correct = ${correct} WHERE answerID = ${id};`;

        return this.executeQuery(query, callback);
    },
    delete(id, callback) {
        const query = `DELETE FROM Answer WHERE answerID = ${id};`;
        return this.executeQuery(query, callback);
    },
    get(id, callback) {
        let query = `SELECT * FROM Answer`;
        if (id) query += ` WHERE answerID = ${id};`;

        return this.executeQuery(query, callback);
    }
};

module.exports = answerModel;