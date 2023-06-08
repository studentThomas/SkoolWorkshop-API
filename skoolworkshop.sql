DROP TABLE IF EXISTS `stock`;
DROP TABLE IF EXISTS `orderproduct`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `userorderworkshop`;
DROP TABLE IF EXISTS `orderworkshop`;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS `workshop`;
DROP TABLE IF EXISTS `productcategory`;


CREATE TABLE `workshop` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) NOT NULL,
  `CategoryName` varchar(200) NOT NULL,
  `Description` varchar(400) NOT NULL,
  `Materials` varchar(512) DEFAULT '',
  `Active` tinyint(1) NOT NULL,
  `Image` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE productcategory (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `user` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EmailAdress` varchar(200) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `PhoneNumber` varchar(255) NOT NULL,
  `IsAdmin` boolean NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE product (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CategoryId` int,
  `Name` varchar(200) NOT NULL,
  `Description` varchar(400) NOT NULL,
  `Code` bigint,
  `Image` varchar(255) NOT NULL,
  `Reusable` boolean NOT NULL DEFAULT '0',
  `Quantity` int NOT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `FK_product_productcategory` FOREIGN KEY (`CategoryId`) REFERENCES `productcategory` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `orderworkshop` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `OrderId` int NOT NULL,
  `WorkshopId` int NOT NULL,
  `TeacherCount` int NOT NULL,
  `ParticipantCount` int NOT NULL,
  `RoundCount` int NOT NULL,
  `SubGroup` longtext CHARACTER SET utf8mb4,
  `WorkshopInfo` longtext CHARACTER SET utf8mb4,
  PRIMARY KEY (`Id`),
  KEY `IX_OrderWorkshop_OrderId` (`OrderId`),
  KEY `IX_OrderWorkshop_WorkshopId` (`WorkshopId`),
  CONSTRAINT `FK_OrderWorkshop_Workshop_WorkshopId` FOREIGN KEY (`WorkshopId`) REFERENCES `workshop` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `stock` (
  `WorkshopId` int NOT NULL,
  `ProductId` int NOT NULL,
  `ParticipantMultiplier` decimal(5,2) NOT NULL,
  PRIMARY KEY (`WorkshopId`, `ProductId`),
  KEY `IDX_stock_workshop` (`WorkshopId`),
  KEY `IDX_stock_product` (`ProductId`),
  CONSTRAINT `FK_stock_workshop` FOREIGN KEY (`WorkshopId`) REFERENCES `workshop` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_stock_product` FOREIGN KEY (`ProductId`) REFERENCES `product` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `orderproduct` (
  `OrderWorkshopId` int NOT NULL,
  `ProductId` int NOT NULL,
  `Quantity` int NOT NULL,
  PRIMARY KEY (`OrderWorkshopId`, `ProductId`),
  KEY `IDX_orderproduct_workshop` (`OrderWorkshopId`),
  KEY `IDX_orderproduct_product` (`ProductId`),
  CONSTRAINT `FK_orderproduct_orderworkshop` FOREIGN KEY (`OrderWorkshopId`) REFERENCES `orderworkshop` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_orderproduct_product` FOREIGN KEY (`ProductId`) REFERENCES `product` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




-- Insert data
INSERT INTO `workshop` VALUES 
(1,'Graffiti','BeeldendeKunst','','',1,'image.png'),
(2,'StopMotion','BeeldendeKunst','','',1,'image.png'),
(3,'LightGraffiti','BeeldendeKunst','','',1,'image.png'),
(4,'TShirtOntwerpen','BeeldendeKunst','','',1,'image.png'),
(5,'Hiphop','Dans','','Geluidspeaker',1,'image.png'),
(6,'Stepping','Dans','','',1,'image.png'),
(7,'Flashmob','Dans','','',1,'image.png'),
(8,'Streetdance','Dans','','',1,'image.png'),
(9,'Breakdance','Dans','','',1,'image.png'),
(10,'DanceFit','Dans','','',1,'image.png'),
(11,'ModerneDans','Dans','','',1,'image.png'),
(12,'Vloggen','Media','','',1,'image.png'),
(13,'VideoClip','Media','','',1,'image.png'),
(14,'Smartphone','Media','','',1,'image.png'),
(15,'Photoshop','Media','','',1,'image.png'),
(16,'CaribbeanDrums','Muziek','','',1,'image.png'),
(17,'Popstar','Muziek','','',1,'image.png'),
(18,'LiveLooping','Muziek','','',1,'image.png'),
(19,'GhettoDrums','Muziek','','',1,'image.png'),
(20,'Rap','Muziek','','Mobile studio',1,'image.png'),
(21,'Percussie','Muziek','','',1,'image.png'),
(22,'Kickboksen','Sport','','',1,'image.png'),
(23,'Zelfverdediging','Sport','','',1,'image.png'),
(24,'PannaVoetbal','Sport','','',1,'image.png'),
(25,'FreeRunning','Sport','','',1,'image.png'),
(26,'Bootcamp','Sport','','',1,'image.png'),
(27,'SoapActeren','Theater','','- Soap scenes\n- Camera',1,'image.png'),
(28,'StageFighting','Theater','','',1,'image.png'),
(29,'Theatersport','Theater','','',1,'image.png'),
(30,'CombiWorkshop','Combi','','',1,'image.png');

INSERT INTO productcategory VALUES 
  (1, 'spuitbussen'),
  (2, 'digitaal');

INSERT INTO product VALUES 
  (1, 1, 'spuitbus blauw', 'het is blauw', 1234, 'URL', 0, 50),
  (2, 1, 'spuitbus geel', 'het is geel', 2345, 'URL', 0, 10),
  (3, 2, 'selfiestick', 'description', 4321, 'URL', 1, 100),
  (4, 2, 'telefoon', 'telefoon', 4321, 'URL', 1, 30);



INSERT INTO `user` VALUES 
  (1, 'admin@gmail.com', 'secret', 'Levi', '06123456789', '1'),
  (2, 'thomas@gmail.com', 'secret123', 'Thomas', '06987654321', '0');


INSERT INTO stock VALUES 
  (1, 1, 1.00),
  (2, 2, 0.33),
  (2, 1, 0.33),
  (2, 3, 0.33),
  (1, 4, 0.50);


INSERT INTO `orderworkshop` VALUES 
(11,3,1,1,25,3,'3 mbo',NULL),
(12,3,2,1,25,3,'3 mbo',NULL),
(13,3,5,1,25,3,'3 mbo',NULL),
(14,4,20,1,20,2,'2 Mavo',NULL),
(15,4,17,1,20,2,'2 Mavo',NULL);

INSERT INTO orderproduct VALUES 
  (11, 1, 100),
  (11, 2, 100),
  (11, 3, 100),
  (11, 4, 100),
  (12, 1, 100),
  (12, 2, 100),
  (15, 4, 100);


