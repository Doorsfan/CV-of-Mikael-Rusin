-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema yatzy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema yatzy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `yatzy` DEFAULT CHARACTER SET utf8 ;
USE `yatzy` ;

-- -----------------------------------------------------
-- Table `yatzy`.`matches`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yatzy`.`matches` (
  `idMatch` INT(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idMatch`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `yatzy`.`players`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yatzy`.`players` (
  `idPlayers` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `score` INT(11) NOT NULL,
  `Matches_idMatch` INT(11) NOT NULL,
  PRIMARY KEY (`idPlayers`, `Matches_idMatch`),
  INDEX `fk_Players_Matches_idx` (`Matches_idMatch` ASC),
  CONSTRAINT `fk_Players_Matches`
    FOREIGN KEY (`Matches_idMatch`)
    REFERENCES `yatzy`.`matches` (`idMatch`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
