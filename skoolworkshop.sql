DROP TABLE IF EXISTS `orderproduct`;
DROP TABLE IF EXISTS `orderworkshop`;
DROP TABLE IF EXISTS `stock`;
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `workshop`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `productcategory`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EmailAdress` varchar(200) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `PhoneNumber` varchar(255) NOT NULL,
  `Role` varchar(50) NOT NULL DEFAULT 'stagiair',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `productcategory` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

CREATE TABLE `product` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CategoryId` int,
  `Name` varchar(200) NOT NULL,
  `Description` varchar(400) NOT NULL,
  `Code` bigint,
  `Image` varchar(255) NOT NULL,
  `Reusable` boolean NOT NULL DEFAULT '0',
  `Quantity` int NOT NULL,
  `minStock` int DEFAULT '0',
  PRIMARY KEY (`Id`),
  CONSTRAINT `FK_product_productcategory` FOREIGN KEY (`CategoryId`) REFERENCES `productcategory` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `stock` (
  `WorkshopId` int NOT NULL,
  `ProductId` int NOT NULL,
  `Quantity` int NOT NULL,
  `ParticipantMultiplier` decimal(5,2) NOT NULL,
  PRIMARY KEY (`ProductId`),
  CONSTRAINT `FK_stock_product` FOREIGN KEY (`ProductId`) REFERENCES `product` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `orderproduct` (
  `OrderId` int NOT NULL,
  `ProductId` int NOT NULL,
  `Quantity` int NOT NULL,
  PRIMARY KEY (`OrderId`, `ProductId`),
  CONSTRAINT `FK_orderproduct_product` FOREIGN KEY (`ProductId`) REFERENCES `product` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `orderworkshop` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `OrderId` int NOT NULL,
  `WorkshopId` int NOT NULL,
  `TeacherCount` int NOT NULL,
  `ParticipantCount` int NOT NULL,
  `RoundCount` int NOT NULL,
  `SubGroup` varchar(255) NOT NULL,
  `WorkshopInfo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `FK_orderworkshop_workshop` FOREIGN KEY (`WorkshopId`) REFERENCES `workshop` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `notifications` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ProductId` int NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Message` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Notifications_ProductId` (`ProductId`),
  CONSTRAINT `FK_Notifications_Product_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `product` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert data
INSERT INTO `workshop` VALUES 
(1,'Graffiti','BeeldendeKunst','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2021/04/Skool-Workshop-Workshop-Graffiti-1024x683.jpg'),
(2,'Stop Motion','BeeldendeKunst','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Stopmotion-Workshop-op-school-1024x652.jpg'),
(3,'Light Graffiti','BeeldendeKunst','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Light-Graffiti-Workshop-op-school-1024x652.jpg'),
(4,'TShirt Ontwerpen','BeeldendeKunst','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2020/01/T-Shirt-Ontwerpen-Workshop-op-school-1024x652-1.jpg'),
(5,'Hiphop','Dans','','Geluidspeaker',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2021/01/6L6A9734-1024x683.jpg'),
(6,'Stepping','Dans','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Stepping-Workshop-op-school-1024x652.jpg'),
(7,'Flashmob','Dans','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Flashmob-Workshop-op-school-1024x652.jpg'),
(8,'Streetdance','Dans','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Streetdance-Workshop-op-school-1024x652.jpg'),
(9,'Breakdance','Dans','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Breakdance-Workshops-op-school-1024x652.jpg'),
(10,'DanceFit','Dans','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Moderne-Dans-Workshop-op-school-1024x652.jpg'),
(11,'Moderne Dans','Dans','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Moderne-Dans-Workshop-op-school-1024x652.jpg'),
(12,'Vloggen','Media','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Vlog-Workshop-op-school-1024x652.jpg'),
(13,'VideoClip','Media','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Videoclip-Workshop-op-school-1024x652.jpg'),
(14,'Smartphone','Media','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Workshop-Smartphone-Fotografie-op-school-1024x652.jpg'),
(15,'Photoshop','Media','','',1,'https://interestedvideos.com/wp-content/uploads/2023/01/adobe-photoshop-tutorial-Dr08P.jpg'),
(16,'Caribbean Drums','Muziek','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2020/10/Caribbean-Drums-kopie-1024x652.jpg'),
(17,'Popstar','Muziek','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Popstar-Workshop-op-school-1024x652.jpg'),
(18,'LiveLooping','Muziek','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Live-Looping-Workshop-op-school-1024x652.jpg'),
(19,'Ghetto Drums','Muziek','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Drum-Workshop-op-school-1024x652.jpg'),
(20,'Rap','Muziek','','Mobile studio',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2020/09/Jongens-rap-e1643291580110-1024x653.jpg'),
(21,'Percussie','Muziek','','',1,'https://1001.pics/img/300x0/1001/tags/workshops/muziek-workshops/percussie-workshop.fpb586550d.jpg'),
(22,'Kickboksen','Sport','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Kickboks-Workshop-op-school-1024x652.jpg'),
(23,'Zelfverdediging','Sport','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Zelfverdediging-Workshop-op-school-1024x652.jpg'),
(24,'PannaVoetbal','Sport','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Pannavoetbal-Workshop-op-school_2-1024x652.jpg'),
(25,'FreeRunning','Sport','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Freerunning-Workshop-op-school-1024x652.jpg'),
(26,'Bootcamp','Sport','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Bootcamp-Workshop-op-school-1024x652.jpg'),
(27,'Soap Acteren','Theater','','- Soap scenes\n- Camera',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Acteer-Workshop-op-school-1024x652.jpg'),
(28,'StageFighting','Theater','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Stage-Fighting-Workshop-op-school_1-1024x652.jpg'),
(29,'Theatersport','Theater','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2019/12/Theater.jpg'),
(30,'CombiWorkshop','Combi','','',1,'https://skoolworkshop.nl/wp-content/uploads/2019/11/Skool-homepage-1.jpg'),
(31,'DJ Skills','Muziek','','',1,'https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2023/04/Workshop-DJ-Skiils-1024x683.jpg');

INSERT INTO `productcategory` VALUES 
  (1, 'spuitbussen'),
  (2, 'digitaal');

INSERT INTO `product` VALUES 
  (1, 1, 'spuitbus blauw', 'het is blauw', 1234, 'URL', 0, 50, 0),
  (2, 1, 'spuitbus geel', 'het is geel', 2345, 'URL', 0, 10, 0),
  (3, 2, 'selfiestick', 'description', 4321, 'URL', 1, 100, 0),
  (4, 2, 'telefoon', 'telefoon', 4321, 'URL', 1, 30, 0);

INSERT INTO `user` VALUES 
  (1, 'admin@gmail.com', 'secret', 'Levi', '06123456789', 'admin'),
  (2, 'thomas@gmail.com', 'secret123', 'Thomas', '06987654321', 'moderator');

INSERT INTO `stock` VALUES 
  (1, 1, 10, 1.00),
  (2, 2, 10, 0.33),
  (2, 3, 10, 0.5),
  (1, 4, 10, 0.50);

INSERT INTO `orderworkshop` VALUES 
(11,3,1,1,25,3,'3 mbo',NULL),
(12,3,2,1,25,3,'3 mbo',NULL),
(13,3,5,1,25,3,'3 mbo',NULL),
(14,4,20,1,20,2,'2 Mavo',NULL),
(15,4,17,1,20,2,'2 Mavo',NULL);

INSERT INTO `orderproduct` VALUES 
  (12, 1, 10);

DELIMITER //
CREATE TRIGGER trg_insert_orderworkshop
AFTER INSERT ON orderworkshop
FOR EACH ROW
BEGIN
  DECLARE Product_Id INT;
  DECLARE Participant_Multiplier DECIMAL(5,2);
  DECLARE Is_Reusable boolean;
  DECLARE Quantity INT;


  DECLARE done INT DEFAULT FALSE;
  DECLARE cur_product CURSOR FOR
    SELECT s.ProductId, s.ParticipantMultiplier, p.Reusable
    FROM stock s
    JOIN product p ON p.Id = s.ProductId
    WHERE s.WorkshopId = NEW.WorkshopId;

  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

  OPEN cur_product;

  read_loop: LOOP
    FETCH cur_product INTO Product_Id, Participant_Multiplier, Is_Reusable;
    IF done THEN
      LEAVE read_loop;
    END IF;

    SET Quantity = NEW.ParticipantCount * Participant_Multiplier;

     IF Is_Reusable = 0 THEN
      SET Quantity = Quantity * NEW.RoundCount;
    END IF;

    INSERT INTO orderproduct VALUES (NEW.Id, NEW.WorkshopId, Product_Id, Quantity);
  END LOOP;

  CLOSE cur_product;

END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER product_update_notifications
AFTER UPDATE ON product
FOR EACH ROW
BEGIN
    DECLARE ExistingNotificationId INT;

    SET ExistingNotificationId = (SELECT Id FROM notifications WHERE ProductId = NEW.Id);

    -- If quantity is less than minStock and there's no existing notification
    IF NEW.Quantity < NEW.minStock AND ExistingNotificationId IS NULL THEN
        INSERT INTO notifications(ProductId, Title, Message)
        VALUES (NEW.Id, 'Voorraad Alert!', CONCAT('Product ', NEW.Id, ' Let op: de voorraad van ', NEW.Name, ' is bijna op. '));

    -- Else if quantity is equal or more than minStock and there's an existing notification
    ELSEIF NEW.Quantity >= NEW.minStock AND ExistingNotificationId IS NOT NULL THEN
        DELETE FROM notifications WHERE Id = ExistingNotificationId;
    END IF;

END //
DELIMITER ;