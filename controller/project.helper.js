const express = require('express')
const router = express.Router()
const { Project, Task } = require('../models/kanban')

async function getProject(req, res, next) {
    let project
    try {
      project = await Project.findById(req.params.id)
      if (project == null) {
        return res.status(404).json({ message: 'Cannot find board' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.project = project
    next()
}
  
module.exports = {
    getProject
  };