DROP TABLE IF EXISTS `stock`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `workshop`;
DROP TABLE IF EXISTS `product`;

CREATE TABLE `workshop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `CategoryName` varchar(200) NOT NULL,
  `description` varchar(400) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` varchar(400) NOT NULL,
  `code` bigint,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emailAdress` varchar(200) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `stock` (
  `workshopId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`workshopId`, `productId`),
  KEY `IDX_stock_workshop` (`workshopId`),
  KEY `IDX_stock_product` (`productId`),
  CONSTRAINT `FK_stock_workshop` FOREIGN KEY (`workshopId`) REFERENCES `workshop` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_stock_product` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert data
INSERT INTO `workshop` VALUES 
  (1, 'graffiti', 'BeeldendeKunst', 'description', 'URL'),
  (2, 'dance', 'Muziek', 'description', 'URL');

INSERT INTO `product` VALUES 
  (1, 'spuitbus', 'description', 1234, 'URL'),
  (2, 'selfiestick', 'description', 4321, 'URL');

INSERT INTO `user` VALUES 
  (1, 'test@gmail.com', 'secret', 'Levi', '06123456789'),
  (2, 'thomas@gmail.com', 'secret123', 'Thomas', '06987654321');

INSERT INTO `stock` VALUES 
  (1, 1, 100),
  (2, 2, 200),
  (1, 2, 100);