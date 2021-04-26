INSERT INTO Region (name)
    SELECT DISTINCT TRIM(f3.NOMBRE_REGION) FROM file3 f3
    WHERE REGION_PADRE = ''; 
    
INSERT INTO Region (name, parentID)
    SELECT DISTINCT TRIM(f3.NOMBRE_REGION), r.regionID FROM file3 f3
    INNER JOIN Region r ON (r.name = TRIM(f3.REGION_PADRE))
    WHERE REGION_PADRE != ''; 

INSERT INTO Country (name, capital, population, area, regionID)
    SELECT DISTINCT TRIM(f1.PAIS_DEL_INVENTOR), TRIM(f1.CAPITAL), 
        TRIM(f1.POBLACION_DEL_PAIS), TRIM(f1.AREA_EN_KM2), r.regionID 
    FROM file1 f1
    INNER JOIN Region r ON (r.name = TRIM(f1.REGION_DEL_PAIS));

INSERT INTO Border (cardinalDirection, countryID, countryBorderID)
    SELECT DISTINCT 'N', c.countryID, cb.countryID
    FROM file1 f1
    INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
    INNER JOIN Country cb ON (cb.name = TRIM(f1.FRONTERA_CON))
    WHERE f1.NORTE = 'X';
    
INSERT INTO Border (cardinalDirection, countryID, countryBorderID)
    SELECT DISTINCT 'E', c.countryID, cb.countryID
    FROM file1 f1
    INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
    INNER JOIN Country cb ON (cb.name = TRIM(f1.FRONTERA_CON))
    WHERE f1.ESTE = 'X';
    
INSERT INTO Border (cardinalDirection, countryID, countryBorderID)
    SELECT DISTINCT 'S', c.countryID, cb.countryID
    FROM file1 f1
    INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
    INNER JOIN Country cb ON (cb.name = TRIM(f1.FRONTERA_CON))
    WHERE f1.SUR = 'X';
    
INSERT INTO Border (cardinalDirection, countryID, countryBorderID)
    SELECT DISTINCT 'W', c.countryID, cb.countryID
    FROM file1 f1
    INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
    INNER JOIN Country cb ON (cb.name = TRIM(f1.FRONTERA_CON))
    WHERE f1.OESTE = 'X';

/* More than one inventor per invention */ 
CREATE TEMPORARY TABLE numbers (
  n INT PRIMARY KEY);
INSERT INTO numbers VALUES (1),(2),(3),(4),(5),(6);

INSERT INTO Inventor (name, countryID)
    SELECT DISTINCT
        TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(TRIM(f1.INVENTOR), ',', numbers.n), ',', -1)) name,  
        c.countryID
    FROM numbers 
    INNER JOIN file1 f1 
        ON CHAR_LENGTH(TRIM(f1.INVENTOR))-CHAR_LENGTH(REPLACE(TRIM(f1.INVENTOR), ',', ''))>=numbers.n-1
    INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
    WHERE f1.INVENTOR != '';
    
DROP TEMPORARY TABLE numbers;
/* END More than one inventor per invention */ 

/* V2 */
INSERT INTO Inventor (name, countryID)
    SELECT DISTINCT
        TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(TRIM(f1.INVENTOR), ',', 1), ',', -1)),  
        c.countryID
    FROM file1 f1 
    INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
    WHERE f1.INVENTOR != '';

INSERT INTO Inventor (name, countryID)
    SELECT s2.name, s2.countryID 
    FROM (
        SELECT DISTINCT
            TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(TRIM(f1.INVENTOR), ',', 2), ',', -1)) name,  
            c.countryID
        FROM file1 f1 
        INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
        WHERE f1.INVENTOR != ''
    ) s2
    LEFT JOIN Inventor inv ON (inv.name = s2.name AND inv.countryID = s2.countryID)
    WHERE inv.name IS NULL AND inv.countryID IS NULL;

INSERT INTO Inventor (name, countryID)
    SELECT s2.name, s2.countryID 
    FROM (
        SELECT DISTINCT
            TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(TRIM(f1.INVENTOR), ',', 3), ',', -1)) name,  
            c.countryID
        FROM file1 f1 
        INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
        WHERE f1.INVENTOR != ''
    ) s2
    LEFT JOIN Inventor inv ON (inv.name = s2.name AND inv.countryID = s2.countryID)
    WHERE inv.name IS NULL AND inv.countryID IS NULL;
/* END V2 */ 

/* V3 */
INSERT INTO Inventor (name, countryID)
    SELECT DISTINCT
        TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(TRIM(f1.INVENTOR), ',', 1), ',', -1)),  
        c.countryID
    FROM file1 f1 
    INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
    WHERE f1.INVENTOR != ''
    UNION
    SELECT DISTINCT
        TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(TRIM(f1.INVENTOR), ',', 2), ',', -1)) name,  
        c.countryID
    FROM file1 f1 
    INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
    WHERE f1.INVENTOR != ''
    UNION
    SELECT DISTINCT
        TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(TRIM(f1.INVENTOR), ',', 3), ',', -1)) name,  
        c.countryID
    FROM file1 f1 
    INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
    WHERE f1.INVENTOR != ''
/* END V3 */ 

INSERT INTO Invention (name, year, countryID)
    SELECT DISTINCT TRIM(f1.INVENTO), TRIM(f1.ANIO_DEL_INVENTO), 
        c.countryID
    FROM file1 f1
    INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTO));

/* InventorInvention */
INSERT INTO InventorInvention (inventorID, inventionID)
    SELECT DISTINCT i.inventorID, iv.inventionID
    FROM file1 f1
    INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
    INNER JOIN Inventor i ON (
            i.name = TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(TRIM(f1.INVENTOR), ',', 1), ',', -1)) AND
            i.countryID = c.countryID
        )
    INNER JOIN Invention iv ON (iv.name = TRIM(f1.INVENTO) AND iv.countryID = c.countryID)
    WHERE f1.inventor != '';
    
INSERT INTO InventorInvention (inventorID, inventionID)
    SELECT s2.inventorID, s2.inventionID 
    FROM (
        SELECT DISTINCT i.inventorID, iv.inventionID
        FROM file1 f1
        INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
        INNER JOIN Inventor i ON (
                i.name = TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(TRIM(f1.INVENTOR), ',', 2), ',', -1)) AND
                i.countryID = c.countryID
            )
        INNER JOIN Invention iv ON (iv.name = TRIM(f1.INVENTO) AND iv.countryID = c.countryID)
    ) s2
    LEFT JOIN InventorInvention inv ON (inv.inventorID = s2.inventorID AND inv.inventionID = s2.inventionID)
    WHERE inv.inventorID IS NULL AND inv.inventionID IS NULL;    

INSERT INTO InventorInvention (inventorID, inventionID)
    SELECT s2.inventorID, s2.inventionID 
    FROM (
        SELECT DISTINCT i.inventorID, iv.inventionID
        FROM file1 f1
        INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
        INNER JOIN Inventor i ON (
                i.name = TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(TRIM(f1.INVENTOR), ',', 3), ',', -1)) AND
                i.countryID = c.countryID
            )
        INNER JOIN Invention iv ON (iv.name = TRIM(f1.INVENTO) AND iv.countryID = c.countryID)
    ) s2
    LEFT JOIN InventorInvention inv ON (inv.inventorID = s2.inventorID AND inv.inventionID = s2.inventionID)
    WHERE inv.inventorID IS NULL AND inv.inventionID IS NULL;
/* InventorInvention */

/* InventorInvention V2 */
INSERT INTO InventorInvention (inventorID, inventionID)
    SELECT DISTINCT i.inventorID, iv.inventionID
    FROM file1 f1
    INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
    INNER JOIN Inventor i ON (
            i.name = TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(TRIM(f1.INVENTOR), ',', 1), ',', -1)) AND
            i.countryID = c.countryID
        )
    INNER JOIN Invention iv ON (iv.name = TRIM(f1.INVENTO) AND iv.countryID = c.countryID)
    WHERE f1.inventor != ''
    UNION
    SELECT DISTINCT i.inventorID, iv.inventionID
    FROM file1 f1
    INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
    INNER JOIN Inventor i ON (
            i.name = TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(TRIM(f1.INVENTOR), ',', 2), ',', -1)) AND
            i.countryID = c.countryID
        )
    INNER JOIN Invention iv ON (iv.name = TRIM(f1.INVENTO) AND iv.countryID = c.countryID)
    UNION
    SELECT DISTINCT i.inventorID, iv.inventionID
    FROM file1 f1
    INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
    INNER JOIN Inventor i ON (
            i.name = TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(TRIM(f1.INVENTOR), ',', 3), ',', -1)) AND
            i.countryID = c.countryID
        )
    INNER JOIN Invention iv ON (iv.name = TRIM(f1.INVENTO) AND iv.countryID = c.countryID);
/* END InventorInvention V2 */

INSERT INTO Professional (name, salary, commission, contractStart)
    SELECT DISTINCT TRIM(f1.PROFESIONAL_ASIGANDO_AL_INVENTO), 
        TRIM(f1.SALARIO), TRIM(f1.COMISION), TRIM(f1.FECHA_CONTRATO_PROFESIONAL)
    FROM file1 f1
    WHERE f1.PROFESIONAL_ASIGANDO_AL_INVENTO != '';

INSERT INTO ProfessionalInvention (professionalID, inventionID)
    SELECT DISTINCT p.professionalID, iv.inventionID
    FROM file1 f1
    INNER JOIN Professional p ON (p.name = TRIM(f1.PROFESIONAL_ASIGANDO_AL_INVENTO))
    INNER JOIN Invention iv ON (iv.name = TRIM(f1.INVENTO));

INSERT INTO InvestigationArea (name, ranking, professionalID)
    WITH professionalT AS (
        SELECT DISTINCT TRIM(f1.EL_PROFESIONAL_ES_JEFE_DEL_AREA) AS 'AREA',
            p.professionalID
        FROM file1 f1	
        INNER JOIN Professional p ON (p.name = TRIM(f1.PROFESIONAL_ASIGANDO_AL_INVENTO))
        WHERE f1.EL_PROFESIONAL_ES_JEFE_DEL_AREA != ''
    )
    SELECT DISTINCT TRIM(f1.AREA_INVEST_DEL_PROF), TRIM(f1.RANKING), p.professionalID
    FROM file1 f1
    LEFT JOIN professionalT p ON (p.AREA = TRIM(f1.AREA_INVEST_DEL_PROF))
    WHERE f1.AREA_INVEST_DEL_PROF != '';

INSERT INTO InvestigationArea (name, ranking, professionalID)
    SELECT DISTINCT 'TODAS', 10, p.professionalID
    FROM file1 f1
    INNER JOIN Professional p ON (p.name = TRIM(f1.PROFESIONAL_ASIGANDO_AL_INVENTO) AND 
        TRIM(f1.EL_PROFESIONAL_ES_JEFE_DEL_AREA) = 'TODAS');

INSERT INTO ProfessionalArea (professionalID, investigationAreaID)
    SELECT DISTINCT p.professionalID, iv.investigationAreaID
    FROM file1 f1
    INNER JOIN Professional p ON (p.name = TRIM(f1.PROFESIONAL_ASIGANDO_AL_INVENTO))
    INNER JOIN InvestigationArea iv ON (iv.name = TRIM(f1.AREA_INVEST_DEL_PROF));

INSERT INTO Survey (name)
    SELECT DISTINCT TRIM(f2.NOMBRE_ENCUESTA)
    FROM file2 f2;

INSERT INTO Question (utterance, surveyID)
    SELECT DISTINCT TRIM(f2.PREGUNTA), sv.surveyID
    FROM file2 f2
    INNER JOIN Survey sv ON (sv.name = TRIM(f2.NOMBRE_ENCUESTA));

INSERT INTO Answer (utterance, correct, questionID)
    SELECT DISTINCT TRIM(f2.RESPUESTAS_POSIBLES), 
		IF(TRIM(f2.RESPUESTA_CORRECTA) = '', NULL, 
			IF(TRIM(f2.RESPUESTAS_POSIBLES) = TRIM(f2.RESPUESTA_CORRECTA), true, false)
		) AS 'Correct',
        qt.questionID
    FROM file2 f2
    INNER JOIN Question qt ON (qt.utterance = TRIM(f2.PREGUNTA));

INSERT INTO CountryAnswer (countryID, answerID)
    SELECT DISTINCT c.countryID, ans.answerID
    FROM file2 f2
    INNER JOIN Country c ON (c.name = TRIM(f2.PAIS))
    INNER JOIN Question qt ON (qt.utterance = TRIM(f2.PREGUNTA))
    INNER JOIN Answer ans ON (ans.questionID = qt.questionID 
		AND f2.RESPUESTA_PAIS = SUBSTR(ans.utterance, 1, 1));


SELECT table_name, table_rows
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'patentOffice';