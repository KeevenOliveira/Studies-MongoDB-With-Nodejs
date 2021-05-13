const express = require('express');
const router = express.Router();

const { createTask, getTasks, updateTask, deleteTask, getTaskById } = require('../controllers/calendarController');

router.get('/tasks', getTasks);
router.get('/task/:id', getTaskById);

router.post('/task', express.urlencoded({extended: true}), createTask);

router.put('/task/:id', express.urlencoded({extended: true}), updateTask);

router.delete('/task/:id', deleteTask);

module.exports = router;