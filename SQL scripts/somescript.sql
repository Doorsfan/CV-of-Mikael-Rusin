CREATE TABLE IF NOT EXISTS Agenda(
	Id INTEGER(11) NOT NULL UNIQUE,
    Priority VARCHAR(50), PRIMARY KEY(Id));

CREATE TABLE IF NOT EXISTS Course(
	IdOfSchema INTEGER(11) NOT NULL UNIQUE,
    Times VARCHAR(50),
    FOREIGN KEY (IdOfSchema) REFERENCES SchemaInDB(IdOfSchema));

CREATE TABLE IF NOT EXISTS SchemaInDB(IdOfSchema INTEGER(11) PRIMARY KEY UNIQUE AUTO_INCREMENT,
	School VARCHAR(50), IdOfSchool INTEGER(11) UNIQUE NOT NULL, Classes VARCHAR(50));

CREATE TABLE IF NOT EXISTS Class(
	IdOfClass INTEGER(11) NOT NULL UNIQUE,
    PRIMARY KEY(IdOfClass));

#NOTE: THIS IS A ROUGH SKETCH OF THE DAtABASE STRUCTURE, GIVEN SUCH A SHORT NOTICE,
#THEN I HAD TO IMPROVISE BASED ON WHAT TIME I HAD. THERE ARE SOME FLAWS IN TERMS
#OF ACTUAL TABLES NOT GENERATED, POPULATED AND RELATED - BUT THE GENERAL STRUCTURE
# ALONG WITH THE UML EXISTS.