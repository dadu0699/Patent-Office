const mysqlConnection = require('../config/database');

const queryModel = {
    executeQuery(query, callback) {
        mysqlConnection.query(query, (err, res) => callback(err, res));
    },

    query1(callback) {
        const query = `SELECT pi.professionalID, p.name, count(*) AS 'quantity' 
            FROM ProfessionalInvention pi
            INNER JOIN Professional p ON (p.professionalID = pi.professionalID)
            GROUP BY pi.professionalID, p.name
            ORDER BY count(*) DESC;`;

        return this.executeQuery(query, callback);
    },
    query2(callback) {
        const query = `SELECT c.name AS 'continent', r.name AS 'region', 
                cnt.name AS 'country', count(ca.countryID) AS 'answers'
            FROM CountryAnswer ca
            RIGHT JOIN Country cnt ON (cnt.countryID = ca.countryID)
            INNER JOIN Region r ON (r.regionID = cnt.regionID)
            LEFT JOIN Region c ON (c.regionID = r.parentID)
            GROUP BY continent, region, country
            ORDER BY answers DESC;`;

        return this.executeQuery(query, callback);
    },
    query3(callback) {
        const query = `SELECT cnt.name AS 'country', cnt.area
            FROM Country cnt
            WHERE cnt.CountryID NOT IN (SELECT inv.CountryID FROM Inventor inv)
                AND cnt.CountryID NOT IN (SELECT b.CountryID FROM Border b)
            ORDER BY cnt.area DESC;`;

        return this.executeQuery(query, callback);
    },
    query4(callback) {
        const query = `(SELECT ina.name AS 'area', inap.name AS 'boss', 
                p.name AS 'professional' 
            FROM ProfessionalArea pa
            INNER JOIN InvestigationArea ina ON (ina.investigationAreaID = pa.investigationAreaID)
            INNER JOIN Professional p ON (p.professionalID = pa.professionalID)
            INNER JOIN Professional inap ON (inap.professionalID = ina.professionalID))
            UNION
            (SELECT ina.name AS 'area', 
                (
                    SELECT p.name FROM InvestigationArea ina 
                    INNER JOIN Professional p ON (p.professionalID = ina.professionalID)
                    WHERE ina.name = 'TODAS'
                ) AS 'boss', p.name AS 'Professional'
            FROM ProfessionalArea pa
            INNER JOIN InvestigationArea ina ON (ina.investigationAreaID = pa.investigationAreaID 
                AND ina.professionalID IS NULL)
            INNER JOIN Professional p ON (p.professionalID = pa.professionalID))
            ORDER BY boss ASC, professional ASC;`;

        return this.executeQuery(query, callback);
    },
    query5(callback) {
        const query = `WITH averageSalary AS (
                SELECT ia.investigationAreaID, ia.name, 
                    ROUND(AVG(p.salary),2) AS 'avgSalary'
                FROM ProfessionalArea pa
                INNER JOIN Professional p ON (p.professionalID = pa.professionalID)
                INNER JOIN InvestigationArea ia ON (ia.investigationAreaID = pa.investigationAreaID)
                GROUP BY ia.investigationAreaID, ia.name
            )
            SELECT p.name AS 'professional', ia.name AS 'area', p.salary,
                avgs.avgSalary AS 'avgSalary'
            FROM ProfessionalArea pa
            INNER JOIN Professional p ON (p.professionalID = pa.professionalID)
            INNER JOIN InvestigationArea ia ON (ia.investigationAreaID = pa.investigationAreaID)
            INNER JOIN averageSalary avgs ON (avgs.investigationAreaID = ia.investigationAreaID 
                AND avgs.avgSalary < p.salary)
            ORDER BY area, 'avgSalary';`;

        return this.executeQuery(query, callback);
    },
    query6(callback) {
        const query = `SELECT cnt.name AS 'country', count(ca.countryID) AS 'answers'
            FROM CountryAnswer ca
            INNER JOIN Country cnt ON (cnt.countryID = ca.countryID)
            INNER JOIN Answer ans ON (ans.answerID = ca.answerID 
                AND (ans.correct = TRUE OR ans.correct IS NULL))
            GROUP BY country
            ORDER BY answers DESC;`;

        return this.executeQuery(query, callback);
    },
    query7(callback) {
        const query = `SELECT DISTINCT inv.name, inva.name AS area
            FROM ProfessionalInvention poin
            INNER JOIN Invention inv ON (inv.inventionID = poin.inventionID)
            INNER JOIN Professional p ON (p.professionalID = poin.professionalID)
            INNER JOIN ProfessionalArea pa ON (pa.professionalID = p.professionalID)
            INNER JOIN InvestigationArea inva ON (inva.investigationAreaID = pa.investigationAreaID 
                AND inva.name = 'Optica')
            ORDER BY inv.name;`;

        return this.executeQuery(query, callback);
    },
    query8(callback) {
        const query = `SELECT SUBSTR(UPPER(ct.name), 1, 1) AS 'letter',
                SUM(ct.area) AS 'area'
            FROM Country ct
            GROUP BY letter;`;

        return this.executeQuery(query, callback);
    },
    query9(callback) {
        const query = `SELECT invt.name AS 'inventor', inv.name AS 'invention'
            FROM InventorInvention ii
            INNER JOIN Invention inv ON (inv.inventionID = ii.inventionID)
            INNER JOIN Inventor invt ON (invt.inventorID = ii.inventorID 
                AND UPPER(invt.name) LIKE 'BE%');`;

        return this.executeQuery(query, callback);
    },
    query10(callback) {
        const query = `SELECT invt.name AS 'inventor'
            FROM InventorInvention ii
            INNER JOIN Invention inv ON (inv.inventionID = ii.inventionID)
            INNER JOIN Inventor invt ON (invt.inventorID = ii.inventorID 
                AND (UPPER(invt.name) LIKE 'B%' AND (UPPER(invt.name) LIKE '%R' 
                OR UPPER(invt.name) LIKE '%N') AND (inv.year >= 1801 AND inv.year <= 1900)))
            ORDER BY inv.year;`;

        return this.executeQuery(query, callback);
    },
    query11(callback) {
        const query = `SELECT ct.name, ct.area, COUNT(ct.countryID) AS 'borders'
            FROM Border b
            INNER JOIN Country ct ON (ct.countryID = b.countryID)
            GROUP BY ct.name, ct.area
            HAVING COUNT(ct.countryID) > 7
            ORDER BY ct.area DESC;`;

        return this.executeQuery(query, callback);
    },
    query12(callback) {
        const query = `SELECT inv.name
            FROM Invention inv
            WHERE UPPER(inv.name) LIKE 'L%' 
                AND CHAR_LENGTH(inv.name) = 4;`;

        return this.executeQuery(query, callback);
    },
    query13(callback) {
        const query = `SELECT p.name AS 'professional', p.salary, p.commission, 
                (p.salary+p.commission) AS 'total'
            FROM Professional p
            WHERE p.commission > (p.salary * 0.25);`;

        return this.executeQuery(query, callback);
    },
    query14(callback) {
        const query = `WITH polls AS (
                SELECT sv.name, ca.countryID, COUNT(sv.surveyID) 
                FROM CountryAnswer ca
                INNER JOIN Answer ans ON (ans.answerID = ca.answerID)
                INNER JOIN Question qt ON (qt.questionID = ans.questionID)
                INNER JOIN Survey sv ON (sv.surveyID = qt.surveyID)
                GROUP BY sv.name, ca.countryID
            )
            SELECT p.name, COUNT(p.name) AS 'total'
            FROM polls p
            GROUP BY p.name;`;

        return this.executeQuery(query, callback);
    },
    query15(callback) {
        const query = `SELECT * FROM Country ct
            WHERE ct.population > (
                SELECT SUM(ct.population) 
                FROM Country ct
                INNER JOIN Region r ON (r.regionID = ct.regionID)
                WHERE r.name = 'Centro America'
            );`;

        return this.executeQuery(query, callback);
    },
    query16(callback) {
        const query = `SELECT inva.name AS 'area', inap.name AS 'boss', p.name AS 'professional'
            FROM ProfessionalArea pa
            INNER JOIN Professional p ON (p.professionalID = pa.professionalID)
            LEFT JOIN InvestigationArea inva ON (inva.investigationAreaID = pa.investigationAreaID)
            LEFT JOIN Professional inap ON (inap.professionalID = inva.professionalID)
            WHERE pa.investigationAreaID NOT IN (
                SELECT pa.investigationAreaID 
                FROM ProfessionalInvention pi 
                INNER JOIN InventorInvention ii ON (ii.inventionID = pi.inventionID)
                INNER JOIN Inventor inv ON (inv.inventorID = ii.inventorID AND inv.name = 'Pasteur')
                INNER JOIN ProfessionalArea pa ON (pa.professionalID = pi.professionalID)
            )
            ORDER BY area, boss, Professional ASC;`;

        return this.executeQuery(query, callback);
    },
    query17(callback) {
        const query = `SELECT inv.name AS 'inventor', invt.name AS 'invention'  
            FROM InventorInvention ii
            INNER JOIN Inventor inv ON (inv.inventorID = ii.inventorID)
            INNER JOIN Invention invt ON (invt.inventionID = ii.inventionID 
                AND invt.year IN (
                        SELECT invt.year
                        FROM InventorInvention ii
                        INNER JOIN Inventor inv ON (inv.inventorID = ii.inventorID AND inv.name = 'Benz')
                        INNER JOIN Invention invt ON (invt.inventionID = ii.inventionID)
                    )
                );`;

        return this.executeQuery(query, callback);
    },
    query18(callback) {
        const query = `SELECT * FROM Country 
            WHERE countryID NOT IN (SELECT countryID FROM Border)
                AND area >= (SELECT area FROM Country WHERE name = 'Japon');`;

        return this.executeQuery(query, callback);
    },
    query19(callback) {
        const query = `SELECT DISTINCTROW ct.name, ctb.name AS 'border'
            FROM Border b
            INNER JOIN Country ct ON (ct.countryID = b.countryID)
            INNER JOIN Country ctb ON (ctb.countryID = b.countryBorderID)
            ORDER BY ct.name;`;

        return this.executeQuery(query, callback);
    },
    query20(callback) {
        const query = `SELECT p.name AS 'professional', p.salary, p.commission
            FROM Professional p
            WHERE p.salary > (p.commission * 2) AND p.commission > 0;`;

        return this.executeQuery(query, callback);
    }
};

module.exports = queryModel;