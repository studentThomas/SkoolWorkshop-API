DROP TABLE IF EXISTS `stock`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `workshop`;
DROP TABLE IF EXISTS `product`;

CREATE TABLE `workshop` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) NOT NULL,
  `CategoryName` varchar(200) NOT NULL,
  `Description` varchar(400) NOT NULL,
  `Image` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `product` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) NOT NULL,
  `Description` varchar(400) NOT NULL,
  `Code` bigint,
  `Image` varchar(255) NOT NULL,
  `Quantity` int NOT NULL,
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

CREATE TABLE `stock` (
  `WorkshopId` int NOT NULL,
  `ProductId` int NOT NULL,
  PRIMARY KEY (`WorkshopId`, `ProductId`),
  KEY `IDX_stock_workshop` (`WorkshopId`),
  KEY `IDX_stock_product` (`ProductId`),
  CONSTRAINT `FK_stock_workshop` FOREIGN KEY (`WorkshopId`) REFERENCES `workshop` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_stock_product` FOREIGN KEY (`ProductId`) REFERENCES `product` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert data
INSERT INTO `workshop` VALUES 
  (1, 'graffiti', 'BeeldendeKunst', 'description', 'URL'),
  (2, 'dance', 'Muziek', 'description', 'URL');

INSERT INTO `product` VALUES 
  (1, 'spuitbus', 'description', 1234, 'URL', 100),
  (2, 'selfiestick', 'description', 4321, 'URL', 50);

INSERT INTO `user` VALUES 
  (1, 'admin@gmail.com', 'secret', 'Levi', '06123456789', '1'),
  (2, 'thomas@gmail.com', 'secret123', 'Thomas', '06987654321', '0');

INSERT INTO `stock` VALUES 
  (1, 1),
  (2, 2),
  (1, 2);