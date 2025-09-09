const router = require("express").Router();
const itemController = require("../controllers/Item.controller");

router.get("/", itemController.getItems.bind(itemController));

router.post("/order", itemController.saveOrder.bind(itemController));

router.post("/selected", itemController.saveSelected.bind(itemController));

router.get("/state", itemController.getState.bind(itemController));

module.exports = router;
