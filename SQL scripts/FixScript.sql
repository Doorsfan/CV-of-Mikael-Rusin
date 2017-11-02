DROP TABLE PhoneNumber;
DROP TABLE Jobs;
DROP TABLE Hobbies;
DROP TABLE Cars;

DROP TABLE Pets;
DROP TABLE Person;

SHOW TABLES; #Debug




        

CREATE TABLE IF NOT EXISTS Person( #Create the table if it does not exist
        Id INTEGER(11) NOT NULL UNIQUE, 
		Name VARCHAR(50) NOT NULL, 
        Country VARCHAR(50), Hometown VARCHAR(50), Hates VARCHAR(50), Pets INTEGER(5),
        PRIMARY KEY(Id)); #Assign Id to be the Primary key of this Table
        
INSERT IGNORE INTO Person VALUES(1244, 'Tomas','Ireland', 'Dublin', 'Beans', 0);#1
INSERT IGNORE INTO Person VALUES(255, 'Henrik',  'Sweden', 'Göteborg', 'Macaroni', 0); #2
INSERT IGNORE INTO Person VALUES(3006, 'Fredrik','Germany', 'München', 'Bratwurst', 0); #3
INSERT IGNORE INTO Person VALUES(4891, 'Mikael', 'Sweden', 'Eslöv', 'Tortellini', 0); #4
INSERT IGNORE INTO Person VALUES(5555, 'Mary', 'Switzerland', 'Bern', 'Brie', 0);#5
INSERT IGNORE INTO Person VALUES(6666, 'Joe', 'US', 'Chicago', 'Bacon', 0);#6
INSERT IGNORE INTO Person VALUES(66, 'Castello', 'Italy', 'Naples', 'Risotto', 0);#7
INSERT IGNORE INTO Person VALUES(8912, 'Marco', 'Brazil', 'Salvador', 'Sandwiches', 0);#8
INSERT IGNORE INTO Person VALUES(1002, 'Elin', 'Norway', 'Bergen', 'Meatloaf', 0);#9
INSERT IGNORE INTO Person VALUES(5011, 'Cecilia', 'Denmark', 'Kopenhagen', 'Omelette', 0);#10

CREATE TABLE IF NOT EXISTS Pets(PetId INTEGER(11) PRIMARY KEY UNIQUE AUTO_INCREMENT, IdOfOwner INTEGER(11) NOT NULL, Name VARCHAR(50) NOT NULL, Type VARCHAR(50), Race VARCHAR(50), Loves VARCHAR(50),
        FOREIGN KEY (IdOfOwner) REFERENCES Person(Id));




UPDATE Person SET Name = 'Mark' WHERE Id = 255; #4actor
UPDATE Person SET Country = 'Columbia' WHERE Id = 6666;
UPDATE Person SET Hometown = 'Odense' WHERE Id = 5011;
        
CREATE TABLE IF NOT EXISTS Jobs(Id INTEGER(11), Title VARCHAR(50), Name VARCHAR(50), #id, Title, Name, Location, Salary
							   Workplace VARCHAR(50), 
                               Salary INTEGER(30) NOT NULL, Employment VARCHAR(50) NOT NULL, Workphone INTEGER(11) UNIQUE NOT NULL,
                               FOREIGN KEY (Id) REFERENCES Person(Id));  #The idea, is that, we get PersonID to be a Foreignkey
                               #from Person Table, to reflect PersonID


CREATE TABLE IF NOT EXISTS Cars(CarID INTEGER(11) NOT NULL UNIQUE PRIMARY KEY,
        BelongsToId INTEGER(11) NOT NULL, Colour VARCHAR(50) NOT NULL,
        Price INTEGER(11) NOT NULL, MilesDriven INTEGER(11) NOT NULL, Serviced VARCHAR(50) NOT NULL, FOREIGN KEY (BelongsToId) REFERENCES Person(Id));

CREATE TABLE IF NOT EXISTS Hobbies(Id INTEGER(11), Name VARCHAR(50), Hobby VARCHAR(50), Location VARCHAR(50), FOREIGN KEY (Id) REFERENCES Person(Id));

CREATE TABLE IF NOT EXISTS PhoneNumber(Id INTEGER(11), Owner VARCHAR(50), PhoneNr INTEGER(11) UNIQUE NOT NULL, Aquired VARCHAR(50), FOREIGN KEY (Id) REFERENCES Person(Id));

INSERT IGNORE INTO PhoneNumber VALUES(1244, (SELECT Name FROM Person WHERE Id IN (1244)),
0701999999, '2011-11-21');

INSERT IGNORE INTO PhoneNumber VALUES(255, (SELECT Name FROM Person WHERE Id IN (255)), 
0872111111, '2004-01-23');

INSERT IGNORE INTO PhoneNumber VALUES(3006, (SELECT Name FROM Person WHERE Id IN (3006)),
80234568, '2005-03-06');

INSERT IGNORE INTO PhoneNumber VALUES(4891, (SELECT Name FROM Person WHERE Id IN (4891)),
070142104, '1998-01-05');

INSERT IGNORE INTO PhoneNumber VALUES(5555, (SELECT Name FROM Person WHERE Id IN (5555)), 
070515902, '1999-02-03');

INSERT IGNORE INTO PhoneNumber VALUES(6666, (SELECT Name FROM Person WHERE Id IN (6666)), 
07011130, '1990-01-05');

INSERT IGNORE INTO PhoneNumber VALUES(66, (SELECT Name FROM Person WHERE Id IN (66)), 
070405819, '2005-05-01');

INSERT IGNORE INTO PhoneNumber VALUES(8912, (SELECT Name FROM Person WHERE Id IN (8912)), 
070141298, '2006-06-01');

INSERT IGNORE INTO PhoneNumber VALUES(1002, (SELECT Name FROM Person WHERE Id IN (1002)), 
0701249084, '2010-10-01');

INSERT IGNORE INTO PhoneNumber VALUES(5011, (SELECT Name FROM Person WHERE Id IN (5011)), 
070124974, '2011-11-01');




#SELECT Name FROM Person WHERE Id IN
#SELECT   Hobbies FROM Person WHERE Id in 

INSERT IGNORE INTO Hobbies VALUES(1244, (SELECT Name FROM Person WHERE Id IN (1244)), 'Mountaineering', 'Everest');
INSERT IGNORE INTO Hobbies VALUES(1244, (SELECT Name FROM Person WHERE Id IN (1244)), 'Biking', 'Nepal');
INSERT IGNORE INTO Hobbies VALUES(255, (SELECT Name FROM Person WHERE Id IN (255)), 'Golf', 'Miami');
INSERT IGNORE INTO Hobbies VALUES(255, (SELECT Name FROM Person WHERE Id IN (255)), 'Biking', 'Nepal');
INSERT IGNORE INTO Hobbies VALUES(3006, (SELECT Name FROM Person WHERE Id IN (3006)), 'Programming', 'Home');
INSERT IGNORE INTO Hobbies VALUES(4891, (SELECT Name FROM Person WHERE Id IN(4891)), 'Tennis', 'Båstad');
INSERT IGNORE INTO Hobbies VALUES(5555, (SELECT Name FROM Person WHERE Id IN(5555)), 'Knitting', 'Clubhouse');
INSERT IGNORE INTO Hobbies VALUES(6666, (SELECT Name FROM Person WHERE Id IN(6666)), 'Pottery', 'Workshop');
INSERT IGNORE INTO Hobbies VALUES(66, (SELECT Name FROM Person WHERE Id IN(66)), 'Musician', 'Garage');
INSERT IGNORE INTO Hobbies VALUES(8912, (SELECT Name FROM Person WHERE Id IN(8912)), 'Jogging', 'Gym');
INSERT IGNORE INTO Hobbies VALUES(1002, (SELECT Name FROM Person WHERE Id IN(1002)), 'Engineering', 'Workshop');
INSERT IGNORE INTO Hobbies VALUES(5011, (SELECT Name FROM Person WHERE Id IN(5011)), 'Smithing', 'Smithy');

DELETE FROM Hobbies WHERE Id IN (255) AND Location = 'Nepal';

#ID, Jobs, Name, Location, Salary, Employment, Workphone
INSERT IGNORE INTO Jobs VALUES(1244,'Plumber', (SELECT Name FROM Person WHERE Id IN (1244)), #ID, Title, Name, Location, Salary
'Montreal', 10000, 'Hours', 0345789510);

INSERT IGNORE INTO Jobs VALUES(255,'Fireman', (SELECT Name FROM Person WHERE Id IN (255)), #ID, Title, Name, Location, Salary
'Chicago', 15320, 'Fulltime', 0511009911);



INSERT IGNORE INTO Jobs VALUES(4891, 'Programmer', (SELECT Name FROM Person WHERE Id IN (4891)), #ID, Title, Name, Location, Salary
'Dallas', 60000, 'Fulltime', 0712346788);

INSERT IGNORE INTO Jobs VALUES(5555, 'Senator', (SELECT Name FROM Person WHERE Id IN (5555)), #ID, Title, Name, Location, Salary
'Stockholm', 30000, '25%', 0111923888);

INSERT IGNORE INTO Jobs VALUES(6666, 'Designer', (SELECT Name FROM Person WHERE Id IN (6666)), #ID, Title, Name, Location, Salary
'Madrid', 50320, '75%', 0229998833);

INSERT IGNORE INTO Jobs VALUES(66, 'Farmer', (SELECT Name FROM Person WHERE Id IN (66)), #ID, Title, Name, Location, Salary
'Rejkavik', 5000, 'Fulltime', 0334985711);

INSERT IGNORE INTO Jobs VALUES(8912,'Cashier', (SELECT Name FROM Person WHERE Id IN (8912)), #ID, Title, Name, Location, Salary
'Melbourne', 7000, 'Hours', 0413458192);

INSERT IGNORE INTO Jobs VALUES(1002,'Playtester', (SELECT Name FROM Person WHERE Id IN (1002)), #ID, Title, Name, Location, Salary
'Umeå', 25000, 'Fulltime', 0455594832);

INSERT IGNORE INTO Jobs VALUES(5011,'Writer', (SELECT Name FROM Person WHERE Id IN (5011)), #ID, Title, Name, Location, Salary
'Kopenhagen', 5000, 'Fulltime', 0413242510);
#We can only reference a index that is in range, in terms of the ID in
#the table of IDs for Persons - When we get 5, it's out of range, so we get a null value on everything.


UPDATE Jobs SET Employment='75%' WHERE Id IN (5555);
UPDATE Jobs SET Employment='Hours' WHERE Id in (66);
UPDATE Jobs SET Employment='Fulltime' WHERE Id in (8912);
UPDATE Jobs SET Employment='50%' WHERE Id in (255);


SELECT Person.Id, Person.Name, Person.Country, PhoneNumber.PhoneNr FROM Person RIGHT JOIN PhoneNumber USING (Id);
SELECT Person.Id, Person.Name, Jobs.Workphone, Jobs.Employment FROM Person RIGHT JOIN Jobs USING(Id);

SELECT Person.Id, Person.Name, Jobs.Workplace, Jobs.Salary FROM Person RIGHT JOIN Jobs ON Jobs.Id = Person.Id WHERE Person.Name LIKE ('C%');
SELECT Person.Id, Person.Name, Person.Country, Jobs.Workplace, Jobs.Salary FROM Person RIGHT JOIN Jobs ON Jobs.Id = Person.Id WHERE Person.Country LIKE ('S%');



#DELETE FROM Person WHERE Id IN (2, 4); #2

INSERT IGNORE INTO Pets VALUES(1,5011, 'Stompy', 'Rabbit', 'Yorkshire', 'Carrots');
INSERT IGNORE INTO Pets VALUES(2,5011, 'Wumpus', 'Dog', 'Terrier', 'Sticks');
INSERT IGNORE INTO Pets VALUES(3, 1002, 'Nightmare', 'Horse', 'IslandPony', 'Trotting');
INSERT IGNORE INTO Pets VALUES(4, 1244, 'Moppen', 'Cat', 'Perser', 'Garn');  
INSERT IGNORE INTO Pets VALUES(5, 1244, 'Floppen', 'Cat', 'Perser', 'Mice');  
INSERT IGNORE INTO Pets VALUES(6, 1244, 'Kroppen', 'Cat', 'Perser', 'Cheese');  
INSERT IGNORE INTO Pets VALUES(7, 1244, 'Shoppen', 'Cat', 'Perser', 'Food');  
INSERT IGNORE INTO Pets VALUES(8, 1244, 'Proppen', 'Cat', 'Perser', 'Dogs');  
INSERT IGNORE INTO Pets VALUES(9, 1244, 'Toppen', 'Cat', 'Perser', 'Sleeping');  
INSERT IGNORE INTO Pets VALUES(10, 1244, 'Droppen', 'Cat', 'Perser', 'Everything');  
INSERT IGNORE INTO Pets VALUES(11, 1244, 'Ryu', 'Turtle', 'Snapjaw', 'Strawberries');  
INSERT IGNORE INTO Pets VALUES(12, 1244, 'Lee', 'Dog', 'Labrador', 'Fetch');  
INSERT IGNORE INTO Pets VALUES(13, 1244, 'Carpedium', 'Lizard', 'Komodore', 'Bugs');  

DELETE FROM Pets WHERE PetId IN (10);
DELETE FROM Pets WHERE PetId IN (6);
DELETE FROM Pets WHERE PetId IN (2);
DELETE FROM Pets WHERE PetId IN (1);



UPDATE Person SET Pets = (SELECT COUNT(IdOfOwner) as Something FROM Pets WHERE IdOfOwner = 1244) WHERE Id = 1244;
UPDATE Person SET Pets = (SELECT COUNT(IdOfOwner) as Something FROM Pets WHERE IdOfOwner = 66) WHERE Id = 66;
UPDATE Person SET Pets = (SELECT COUNT(IdOfOwner) as Something FROM Pets WHERE IdOfOwner = 255) WHERE Id = 255;
UPDATE Person SET Pets = (SELECT COUNT(IdOfOwner) as Something FROM Pets WHERE IdOfOwner = 1002) WHERE Id = 1002;
UPDATE Person SET Pets = (SELECT COUNT(IdOfOwner) as Something FROM Pets WHERE IdOfOwner = 4891) WHERE Id = 4891;
UPDATE Person SET Pets = (SELECT COUNT(IdOfOwner) as Something FROM Pets WHERE IdOfOwner = 3006) WHERE Id = 3006;
UPDATE Person SET Pets = (SELECT COUNT(IdOfOwner) as Something FROM Pets WHERE IdOfOwner = 5011) WHERE Id = 5011;
UPDATE Person SET Pets = (SELECT COUNT(IdOfOwner) as Something FROM Pets WHERE IdOfOwner = 5555) WHERE Id = 5555;
UPDATE Person SET Pets = (SELECT COUNT(IdOfOwner) as Something FROM Pets WHERE IdOfOwner = 6666) WHERE Id = 6666;
UPDATE Person SET Pets = (SELECT COUNT(IdOfOwner) as Something FROM Pets WHERE IdOfOwner = 8912) WHERE Id = 8912;



SELECT Pets.IdOfOwner, Person.Name AS OwnedBy, Pets.Name, Pets.Type FROM Person RIGHT JOIN Pets ON Pets.IdOfOwner = Person.Id;

#CarID, BelongsToId, Model, Price, MilesDriven, Serviced
#CarID, BelongsToId, Colour, Price, MilesDriven, Serviced
INSERT IGNORE INTO Cars VALUES(1, 5011, 'Yellow', 50000, 500, '2016-10-05');
INSERT IGNORE INTO Cars VALUES(2, 5011, 'Red', 5000, 50, 'Never');
INSERT IGNORE INTO Cars VALUES(3, 66, 'Grey', 65000, 535, '2011-01-16');
INSERT IGNORE INTO Cars VALUES(4, 255, 'Black', 25341, 550, '2015-11-10');
INSERT IGNORE INTO Cars VALUES(5, 1002, 'White', 33010, 1000, '1999-10-11');
INSERT IGNORE INTO Cars VALUES(6, 1244, 'Green', 330000, 1000, '2001-12-11');
INSERT IGNORE INTO Cars VALUES(7, 8912, 'Pink', 44000, 4000, '1998-09-11');
INSERT IGNORE INTO Cars VALUES(8, 3006, 'Purple', 54031, 25, 'Never');
INSERT IGNORE INTO Cars VALUES(9, 1002, 'Blue', 68891, 100, '1997-11-25');
INSERT IGNORE INTO Cars VALUES(10, 6666, 'Cyan', 53201, 132, '1995-10-11');

SELECT * FROM Person; #1
SELECT * FROM Jobs;
SELECT * FROM Hobbies;
SELECT * FROM PhoneNumber;
SELECT * FROM Pets;
SELECT * FROM Cars;