SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
-- Table structure for table telegram


CREATE TABLE Administrateurs (
   id_adm INT NOT NULL ,
   nom VARCHAR(50),
   prenom VARCHAR(50),
   email VARCHAR(50) UNIQUE,
   password VARCHAR(255),
   createdAt DATETIME NOT NULL,
   updatedAt DATETIME NOT NULL,
   PRIMARY KEY (id_adm ,email)
);

ALTER TABLE Administrateurs
  MODIFY id_adm INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;
