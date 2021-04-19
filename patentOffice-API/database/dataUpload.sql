INSERT INTO Region (name)
    SELECT DISTINCT TRIM(f1.REGION_DEL_PAIS) FROM file1 f1; 

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

/* TODO Verify more than one inventor per invention */ 
INSERT INTO Inventor (name, countryID)
    SELECT DISTINCT TRIM(f1.INVENTOR), c.countryID
    FROM file1 f1
    INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTOR))
    WHERE f1.INVENTOR != '';

INSERT INTO Invention (name, year, countryID)
    SELECT DISTINCT TRIM(f1.INVENTO), TRIM(f1.ANIO_DEL_INVENTO), 
        c.countryID
    FROM file1 f1
    INNER JOIN Country c ON (c.name = TRIM(f1.PAIS_DEL_INVENTO));

INSERT INTO InventorInvention (inventorID, inventionID)
    SELECT DISTINCT i.inventorID, iv.inventionID
    FROM file1 f1
    INNER JOIN Inventor i ON (i.name = TRIM(f1.INVENTOR))
    INNER JOIN Invention iv ON (iv.name = TRIM(f1.INVENTO));

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