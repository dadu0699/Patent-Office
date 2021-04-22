/* QUERY 1 */
SELECT pi.professionalID, p.name, count(*) 
FROM ProfessionalInvention pi
INNER JOIN Professional p ON (p.professionalID = pi.professionalID)
GROUP BY pi.professionalID, p.name
ORDER BY count(*) DESC;

/* QUERY 2 */
SELECT c.name AS 'continente', r.name AS 'region', 
	cnt.name AS 'pais', count(ca.countryID) AS 'respuestas'
FROM CountryAnswer ca
RIGHT JOIN Country cnt ON (cnt.countryID = ca.countryID)
INNER JOIN Region r ON (r.regionID = cnt.regionID)
LEFT JOIN Region c ON (c.regionID = r.parentID)
GROUP BY continente, region, pais
ORDER BY respuestas DESC; 

/* QUERY 3 */
SELECT cnt.name AS 'pais', cnt.area
FROM Country cnt
WHERE cnt.CountryID NOT IN (SELECT inv.CountryID FROM Inventor inv)
	AND cnt.CountryID NOT IN (SELECT b.CountryID FROM Border b)
ORDER BY cnt.area DESC;

/* TODO QUERY 4 */

/* QUERY 5 */
SELECT p.name AS 'profesional', ia.name AS 'Area', 
	p.salary, sq.salarioPromedio AS 'salarioPromedio' 
FROM (
	SELECT ia.investigationAreaID, ia.name, 
		ROUND(AVG(p.salary),2) AS 'salarioPromedio'
	FROM ProfessionalArea pa
	INNER JOIN Professional p ON (p.professionalID = pa.professionalID)
	INNER JOIN InvestigationArea ia ON (ia.investigationAreaID = pa.investigationAreaID)
	GROUP BY ia.investigationAreaID, ia.name
) AS sq
INNER JOIN InvestigationArea ia ON (ia.investigationAreaID = sq.investigationAreaID)
INNER JOIN ProfessionalArea pa ON (pa.investigationAreaID = sq.investigationAreaID)
INNER JOIN Professional p ON (p.professionalID = pa.professionalID)
WHERE p.salary > sq.salarioPromedio
ORDER BY Area, 'salarioPromedio';

/* QUERY 6 */
SELECT cnt.name AS 'pais', count(ca.countryID) AS 'respuestas'
FROM CountryAnswer ca
INNER JOIN Country cnt ON (cnt.countryID = ca.countryID)
INNER JOIN Answer ans ON (ans.answerID = ca.answerID)
WHERE ans.correct = TRUE OR ans.correct IS NULL
GROUP BY pais
ORDER BY respuestas DESC;


/* QUERY 7 */
SELECT DISTINCT inv.name
FROM ProfessionalInvention poin
INNER JOIN Invention inv ON (inv.inventionID = poin.inventionID)
INNER JOIN Professional p ON (p.professionalID = poin.professionalID)
INNER JOIN ProfessionalArea pa ON (pa.professionalID = p.professionalID)
INNER JOIN InvestigationArea inva ON (inva.investigationAreaID = pa.investigationAreaID)
WHERE inva.name = 'Optica'
ORDER BY inv.name;

/* QUERY 8 */
SELECT SUBSTR(UPPER(ct.name), 1, 1) AS 'letra',
	SUM(ct.area) AS 'area'
FROM Country ct
GROUP BY letra;

/* QUERY 9 */
SELECT invt.name AS 'inventor', inv.name AS 'invento'
FROM InventorInvention ii
INNER JOIN Invention inv ON (inv.inventionID = ii.inventionID)
INNER JOIN Inventor invt ON (invt.inventorID = ii.inventorID)
WHERE UPPER(invt.name) LIKE 'BE%';

/* QUERY 10 */ 
SELECT invt.name AS 'inventor'
FROM InventorInvention ii
INNER JOIN Invention inv ON (inv.inventionID = ii.inventionID)
INNER JOIN Inventor invt ON (invt.inventorID = ii.inventorID)
WHERE UPPER(invt.name) LIKE 'B%' AND (UPPER(invt.name) LIKE '%R' 
	OR UPPER(invt.name) LIKE '%N') AND (inv.year >= 1801 AND inv.year <= 1900)
ORDER BY inv.year;

/* QUERY 11 */
SELECT ct.name, COUNT(ct.countryID) AS 'fronteras'
FROM Border b
INNER JOIN Country ct ON (ct.countryID = b.countryID)
GROUP BY ct.name, ct.area
HAVING COUNT(ct.countryID) >= 7
ORDER BY ct.area DESC;

/* QUERY 12 */
SELECT *
FROM Invention inv
WHERE UPPER(inv.name) LIKE 'L%' 
	AND CHAR_LENGTH(inv.name) = 4;

/* QUERY 13 */
SELECT p.name AS 'profesional', p.salary, p.commission, 
	(p.salary+p.commission) AS 'total'
FROM Professional p
WHERE p.commission > (p.salary * 0.25); 

/* QUERY 14 */
SELECT p.name, COUNT(p.name) AS 'total' 
FROM (
	SELECT sv.name, ca.countryID, COUNT(sv.surveyID) 
	FROM CountryAnswer ca
	INNER JOIN Answer ans ON (ans.answerID = ca.answerID)
	INNER JOIN Question qt ON (qt.questionID = ans.questionID)
	INNER JOIN Survey sv ON (sv.surveyID = qt.surveyID)
	GROUP BY sv.name, ca.countryID
) AS p
GROUP BY p.name;

/* QUERY 15 */
SELECT ct.name, ct.population FROM Country ct
WHERE ct.population > (
	SELECT SUM(ct.population) 
	FROM Country ct
	INNER JOIN Region r ON (r.regionID = ct.regionID)
	WHERE r.name = 'Centro America'
);

/* TODO QUERY 16 */

/* QUERY 17 */
SELECT inv.name AS 'inventor', invt.name AS 'invento'  
FROM InventorInvention ii
INNER JOIN Inventor inv ON (inv.inventorID = ii.inventorID)
INNER JOIN Invention invt ON (invt.inventionID = ii.inventionID)
WHERE invt.year IN (
	SELECT invt.year
	FROM InventorInvention ii
	INNER JOIN Inventor inv ON (inv.inventorID = ii.inventorID AND inv.name = 'Benz')
	INNER JOIN Invention invt ON (invt.inventionID = ii.inventionID)
);

/* QUERY 18 */
SELECT * FROM Country 
WHERE countryID NOT IN (SELECT countryID FROM Border)
	AND area >= (SELECT area FROM Country WHERE name = 'Japon')
	/*AND name != 'Japon'*/;

	
/* QUERY 19 */
SELECT DISTINCT ct.name, ctb.name AS 'frontera'
FROM Border b
INNER JOIN Country ct ON (ct.countryID = b.countryID)
INNER JOIN Country ctb ON (ctb.countryID = b.countryBorderID)
ORDER BY ct.name;

/* QUERY 20 */
SELECT p.name AS 'profesional', p.salary, p.commission
FROM Professional p
WHERE p.salary > (p.commission * 2); 