const queries = {
  clearUserTable: "DELETE IGNORE FROM `user`;",
  clearStockTable: "DELETE IGNORE FROM `stock`;",
  clearProductTable: "DELETE IGNORE FROM `product`;",
  clearWorkshopTable: "DELETE IGNORE FROM `workshop`;",
  insertUser:
    "INSERT INTO `user` (`id`, `emailAdress`, `password`, `firstname`, `phoneNumber` ) VALUES" +
    '(1, "levikooy@gmail.com", "1234", "Levi", "0612345678"),' +
    '(2, "thomas@gmail.com", "1234", "Thomas", "0612345678")',
  insertStock:
    "INSERT INTO `stock` (`productId`, `workshopId`, `quantity`) VALUES" +
    "(1, 1, 10)," +
    "(2, 1, 10)",
  insertProduct:
    "INSERT INTO `product` (`id`, `name`, `description`, `code`, `image`) VALUES" +
    '(1, "spuitbus", "description", "code", "image"),' +
    '(2, "pencil", "description", "code", "image")',
  insertWorkshop:
    "INSERT INTO `workshop` (`id`, `name`, `description`, `image`) VALUES" +
    '(1, "workshop1", "description", "image"),' +
    '(2, "workshop2", "description", "image")',

};

module.exports = queries;
