const express = require('express');

const { renderMain, renderWeather, renderMusic, renderTodo } = require('../controllers/page')

const router = express.Router();

router.get('/', renderMain)

router.get('/weather', renderWeather)

router.get('/music', renderMusic)

router.get('/todo', renderTodo)



module.exports = router;