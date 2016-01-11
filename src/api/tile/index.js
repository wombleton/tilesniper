const { Router } = require('express');
const controller = require('./tile.controller');

var router = new Router();

router.post('/', controller.create);

module.exports = router;
