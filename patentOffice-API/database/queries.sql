/* QUERY 1 */
SELECT pi.professionalID, p.name, count(*) 
FROM ProfessionalInvention pi
INNER JOIN Professional p ON (p.professionalID = pi.professionalID)
GROUP BY pi.professionalID, p.name
ORDER BY count(*) DESC;



/* QUERY 2 */
SELECT c.name AS 'Continent', r.name AS 'Region', 
	cnt.name AS 'Country', count(ca.countryID) AS 'Answers'
FROM CountryAnswer ca
RIGHT JOIN Country cnt ON (cnt.countryID = ca.countryID)
INNER JOIN Region r ON (r.regionID = cnt.regionID)
LEFT JOIN Region c ON (c.regionID = r.parentID)
GROUP BY Continent, Region, Country
ORDER BY Answers DESC; 



/* QUERY 3 */
SELECT cnt.name AS 'Country', cnt.area
FROM Country cnt
WHERE cnt.CountryID NOT IN (SELECT inv.CountryID FROM Inventor inv)
	AND cnt.CountryID NOT IN (SELECT b.CountryID FROM Border b)
ORDER BY cnt.area DESC;



/* QUERY 4 */ 
(SELECT ina.name AS 'Area', inap.name AS 'Boss', 
	p.name AS 'Professional' 
FROM ProfessionalArea pa
INNER JOIN InvestigationArea ina ON (ina.investigationAreaID = pa.investigationAreaID)
INNER JOIN Professional p ON (p.professionalID = pa.professionalID)
INNER JOIN Professional inap ON (inap.professionalID = ina.professionalID))
UNION
(SELECT ina.name AS 'Area', 
	(
		SELECT p.name FROM InvestigationArea ina 
        INNER JOIN Professional p ON (p.professionalID = ina.professionalID)
        WHERE ina.name = 'TODAS'
	) AS 'Boss', p.name AS 'Professional'
FROM ProfessionalArea pa
INNER JOIN InvestigationArea ina ON (ina.investigationAreaID = pa.investigationAreaID 
	AND ina.professionalID IS NULL)
INNER JOIN Professional p ON (p.professionalID = pa.professionalID))
ORDER BY Boss ASC, Professional ASC;

SELECT inva.investigationAreaID, inva.name, 
	inva.professionalID, p.name
FROM InvestigationArea inva
LEFT JOIN Professional p ON (p.professionalID = inva.professionalID)
WHERE inva.name != 'TODAS'; 



/* QUERY 5 */
WITH averageSalary AS (
	SELECT ia.investigationAreaID, ia.name, 
		ROUND(AVG(p.salary + p.commission),2) AS 'avgSalary'
	FROM ProfessionalArea pa
	INNER JOIN Professional p ON (p.professionalID = pa.professionalID)
	INNER JOIN InvestigationArea ia ON (ia.investigationAreaID = pa.investigationAreaID)
	GROUP BY ia.investigationAreaID, ia.name
)
SELECT p.name AS 'Professional', ia.name AS 'Area', 
	p.salary, p.commission, (p.salary+p.commission) AS 'TOTAL',
    avgs.avgSalary AS 'Average salary'
FROM ProfessionalArea pa
INNER JOIN Professional p ON (p.professionalID = pa.professionalID)
INNER JOIN InvestigationArea ia ON (ia.investigationAreaID = pa.investigationAreaID)
INNER JOIN averageSalary avgs ON (avgs.investigationAreaID = ia.investigationAreaID)
WHERE (p.salary+p.commission) > avgs.avgSalary
ORDER BY Area, 'Average salary'; 


WITH averageSalary AS (
	SELECT ia.investigationAreaID, ia.name, 
		ROUND(AVG(p.salary),2) AS 'avgSalary'
	FROM ProfessionalArea pa
	INNER JOIN Professional p ON (p.professionalID = pa.professionalID)
	INNER JOIN InvestigationArea ia ON (ia.investigationAreaID = pa.investigationAreaID)
	GROUP BY ia.investigationAreaID, ia.name
)
SELECT p.name AS 'Professional', ia.name AS 'Area', p.salary,
    avgs.avgSalary AS 'Average salary'
FROM ProfessionalArea pa
INNER JOIN Professional p ON (p.professionalID = pa.professionalID)
INNER JOIN InvestigationArea ia ON (ia.investigationAreaID = pa.investigationAreaID)
INNER JOIN averageSalary avgs ON (avgs.investigationAreaID = ia.investigationAreaID 
	AND avgs.avgSalary < p.salary)
ORDER BY Area, 'Average salary'; 



/* QUERY 6 */
SELECT cnt.name AS 'Country', count(ca.countryID) AS 'Answers'
FROM CountryAnswer ca
INNER JOIN Country cnt ON (cnt.countryID = ca.countryID)
INNER JOIN Answer ans ON (ans.answerID = ca.answerID 
	AND (ans.correct = TRUE OR ans.correct IS NULL))
GROUP BY Country
ORDER BY Answers DESC;



/* QUERY 7 */
SELECT DISTINCT inv.name
FROM ProfessionalInvention poin
INNER JOIN Invention inv ON (inv.inventionID = poin.inventionID)
INNER JOIN Professional p ON (p.professionalID = poin.professionalID)
INNER JOIN ProfessionalArea pa ON (pa.professionalID = p.professionalID)
INNER JOIN InvestigationArea inva ON (inva.investigationAreaID = pa.investigationAreaID 
	AND inva.name = 'Optica')
ORDER BY inv.name;



/* QUERY 8 */
SELECT SUBSTR(UPPER(ct.name), 1, 1) AS 'Letter',
	SUM(ct.area) AS 'Area'
FROM Country ct
GROUP BY Letter;



/* QUERY 9 */
SELECT invt.name AS 'Inventor', inv.name AS 'Invention'
FROM InventorInvention ii
INNER JOIN Invention inv ON (inv.inventionID = ii.inventionID)
INNER JOIN Inventor invt ON (invt.inventorID = ii.inventorID 
	AND UPPER(invt.name) LIKE 'BE%');



/* QUERY 10 */ 
SELECT invt.name AS 'Inventor'
FROM InventorInvention ii
INNER JOIN Invention inv ON (inv.inventionID = ii.inventionID)
INNER JOIN Inventor invt ON (invt.inventorID = ii.inventorID 
	AND (UPPER(invt.name) LIKE 'B%' AND (UPPER(invt.name) LIKE '%R' 
	OR UPPER(invt.name) LIKE '%N') AND (inv.year >= 1801 AND inv.year <= 1900)))
ORDER BY inv.year;



/* QUERY 11 */
SELECT ct.name, ct.area, COUNT(ct.countryID) AS 'Border'
FROM Border b
INNER JOIN Country ct ON (ct.countryID = b.countryID)
GROUP BY ct.name, ct.area
HAVING COUNT(ct.countryID) > 7
ORDER BY ct.area DESC;



/* QUERY 12 */
SELECT *
FROM Invention inv
WHERE UPPER(inv.name) LIKE 'L%' 
	AND CHAR_LENGTH(inv.name) = 4;



/* QUERY 13 */
SELECT p.name AS 'Professional', p.salary, p.commission, 
	(p.salary+p.commission) AS 'TOTAL'
FROM Professional p
WHERE p.commission > (p.salary * 0.25); 



/* QUERY 14 */
WITH polls AS (
	SELECT sv.name, ca.countryID, COUNT(sv.surveyID) 
	FROM CountryAnswer ca
	INNER JOIN Answer ans ON (ans.answerID = ca.answerID)
	INNER JOIN Question qt ON (qt.questionID = ans.questionID)
	INNER JOIN Survey sv ON (sv.surveyID = qt.surveyID)
	GROUP BY sv.name, ca.countryID
)
SELECT p.name, COUNT(p.name) AS 'TOTAL'
FROM polls p
GROUP BY p.name;



/* QUERY 15 */
SELECT * FROM Country ct
WHERE ct.population > (
	SELECT SUM(ct.population) 
	FROM Country ct
	INNER JOIN Region r ON (r.regionID = ct.regionID)
	WHERE r.name = 'Centro America'
);



/* QUERY 16 */
SELECT inva.name AS 'AREA', inap.name AS 'Boss', p.name AS 'Professional'
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
ORDER BY Boss ASC, Professional ASC;



/* QUERY 17 */
SELECT inv.name AS 'Inventor', invt.name AS 'Invention'  
FROM InventorInvention ii
INNER JOIN Inventor inv ON (inv.inventorID = ii.inventorID)
INNER JOIN Invention invt ON (invt.inventionID = ii.inventionID 
	AND invt.year IN (
			SELECT invt.year
			FROM InventorInvention ii
			INNER JOIN Inventor inv ON (inv.inventorID = ii.inventorID AND inv.name = 'Benz')
			INNER JOIN Invention invt ON (invt.inventionID = ii.inventionID)
		)
    );




/* QUERY 18 */
SELECT * FROM Country 
WHERE countryID NOT IN (SELECT countryID FROM Border)
	AND area >= (SELECT area FROM Country WHERE name = 'Japon');



/* QUERY 19 */
SELECT DISTINCTROW ct.name, ctb.name AS 'Border'
FROM Border b
INNER JOIN Country ct ON (ct.countryID = b.countryID)
INNER JOIN Country ctb ON (ctb.countryID = b.countryBorderID)
ORDER BY ct.name;



/* QUERY 20 */
SELECT p.name AS 'Professional', p.salary, p.commission
FROM Professional p
WHERE p.salary > (p.commission * 2) AND p.commission > 0; 