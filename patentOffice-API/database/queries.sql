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
SELECT cnt.name AS 'Country'
FROM Country cnt
WHERE cnt.CountryID NOT IN (SELECT inv.CountryID FROM Inventor inv)
	AND cnt.CountryID NOT IN (SELECT b.CountryID FROM Border b)
ORDER BY Country; 

/* QUERY 4 */ 
