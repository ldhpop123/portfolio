const express = require('express');

const { renderMain, renderWeather, renderMusic } = require('../controllers/page')

const router = express.Router();

router.get('/', renderMain)

router.get('/weather', renderWeather)

router.get('/music', renderMusic)


module.exports = router;