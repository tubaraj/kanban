const express = require('express')
const router = express.Router()
const { Project, Task } = require('../models/kanban')

async function getTask(req, res, next) {
    let task
    try {
      task = await Task.findById(req.params.id)
      if (task == null) {
        return res.status(404).json({ message: 'Cannot find task' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.task = task
    next()
}
  
module.exports = {
    getTask
  };