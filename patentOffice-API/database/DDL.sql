DROP DATABASE IF EXISTS patentOffice;
CREATE DATABASE patentOffice;
USE patentOffice;

CREATE TABLE Region (
    regionID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    parentID INT,
    PRIMARY KEY (regionID),
    FOREIGN KEY (parentID) REFERENCES Region(regionID) 
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Country (
    countryID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    capital VARCHAR(100) NOT NULL,
    population BIGINT NOT NULL,
    area INT NOT NULL,
    regionID INT NOT NULL,
    PRIMARY KEY (countryID),
    FOREIGN KEY (regionID) REFERENCES Region(regionID) 
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Border (
    borderID INT NOT NULL AUTO_INCREMENT,
    cardinalDirection CHAR(1) NOT NULL,
    countryID INT NOT NULL,
    countryBorderID INT NOT NULL,
    PRIMARY KEY (borderID),
    FOREIGN KEY (countryID) REFERENCES Country(countryID) 
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (countryBorderID) REFERENCES Country(countryID) 
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Inventor (
    inventorID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    countryID INT NOT NULL,
    PRIMARY KEY (inventorID),
    FOREIGN KEY (countryID) REFERENCES Country(countryID) 
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Invention (
    inventionID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    year SMALLINT NOT NULL,
    countryID INT NOT NULL,
    PRIMARY KEY (inventionID),
    FOREIGN KEY (countryID) REFERENCES Country(countryID) 
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE InventorInvention (
    inventorInventionID INT NOT NULL AUTO_INCREMENT,
    inventorID INT NOT NULL,
    inventionID INT NOT NULL,
    PRIMARY KEY (inventorInventionID),
    FOREIGN KEY (inventorID) REFERENCES Inventor(inventorID) 
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (inventionID) REFERENCES Invention(inventionID) 
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Professional (
    professionalID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    salary DECIMAL(8, 2) NOT NULL,
    commission DECIMAL(8, 2) DEFAULT 0.00,
    contractStart VARCHAR(12) NOT NULL,
    PRIMARY KEY (professionalID)
);

CREATE TABLE ProfessionalInvention (
    professionalInvention INT NOT NULL AUTO_INCREMENT,
    professionalID INT NOT NULL,
    inventionID INT NOT NULL,
    PRIMARY KEY (professionalInvention),
    FOREIGN KEY (professionalID) REFERENCES Professional(professionalID) 
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (inventionID) REFERENCES Invention(inventionID) 
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE InvestigationArea (
    investigationAreaID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    ranking SMALLINT NOT NULL,
    professionalID INT NOT NULL,
    PRIMARY KEY (investigationAreaID),
    FOREIGN KEY (professionalID) REFERENCES Professional(professionalID)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE ProfessionalArea (
    professionalAreaID INT NOT NULL AUTO_INCREMENT,
    professionalID INT NOT NULL,
    investigationAreaID INT NOT NULL,
    PRIMARY KEY (professionalAreaID),
    FOREIGN KEY (professionalID) REFERENCES Professional(professionalID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (investigationAreaID) REFERENCES InvestigationArea(investigationAreaID)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Survey (
    surveyID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    PRIMARY KEY (surveyID)
);

CREATE TABLE Question (
    questionID INT NOT NULL AUTO_INCREMENT,
    utterance TEXT NOT NULL,
    surveyID INT NOT NULL,
    PRIMARY KEY (questionID),
    FOREIGN KEY (surveyID) REFERENCES Survey(surveyID)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Answer (
    answerID INT NOT NULL AUTO_INCREMENT,
    utterance TEXT NOT NULL,
    correct BOOLEAN DEFAULT FALSE,
    questionID INT NOT NULL,
    PRIMARY KEY (answerID),
    FOREIGN KEY (questionID) REFERENCES Question(questionID)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE CountryAnswer (
    countryAnswerID INT NOT NULL AUTO_INCREMENT,
    countryID INT NOT NULL,
    answerID INT NOT NULL,
    PRIMARY KEY (countryAnswerID),
    FOREIGN KEY (countryID) REFERENCES Country(countryID) 
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (answerID) REFERENCES Answer(answerID)
        ON UPDATE CASCADE ON DELETE CASCADE
);