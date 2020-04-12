-- -----------------------------------------------------
-- Schema SparrowMap
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SparrowMap` DEFAULT CHARACTER SET utf8 ;
USE `SparrowMap` ;

-- -----------------------------------------------------
-- Table `SparrowMap`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SparrowMap`.`Users` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `Email` VARCHAR(50) NULL,
  `Hash` VARCHAR(100) NULL,
  `Surname` VARCHAR(45) NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SparrowMap`.`Routes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SparrowMap`.`Routes` (
  `idRoute` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NULL,
  `Track` LONGTEXT NULL,
  PRIMARY KEY (`idRoute`),
  CONSTRAINT `idUser`
    FOREIGN KEY (`idUser`)
    REFERENCES `SparrowMap`.`Users` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;