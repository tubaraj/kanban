const express = require('express')
const router = express.Router()
const { Project, Task } = require('../models/kanban')
const { getProject } = require('../controller/project.helper');
const { getTask } = require('../controller/task.helper');


//PROJECT CRUD

// Getting all
router.get('/project', async (req, res) => {
  try {
    const project = await Project.find()
    res.json(project)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creating one
router.post('/project', async (req, res) => {
  const project = new Project({
    name: req.body.name,
    description: req.body.description
  })
  try {
    const newProject = await project.save()
    res.status(201).json(newProject)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/project/:id', getProject, async (req, res) => {
   res.project.name = req.body.name,
   res.project.description = req.body.description
  try {
    const updateProject = await res.project.save()
    res.json(updateProject)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/project/:id', getProject, async (req, res) => {
  try {
    await res.project.remove()
    res.json({ message: 'Deleted Project' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//TASK CRUD

// Getting all
router.get('/task/:id', async (req, res) => {
  try {
    const task = await Task.find({ projectId: req.params.id })
    res.json(task)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creating one
router.post('/task', async (req, res) => {
  const task = new Task({
    name: req.body.name,
    description: req.body.description,
    priority: req.body.priority,
    projectId: req.body.projectId
  })
  try {
    const newtask = await task.save()
    res.status(201).json(newtask)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/task/:id', getTask, async (req, res) => {
    res.task.name = req.body.name,
    res.task.description = req.body.description
    res.task.priority = req.body.priority,
    res.task.projectId = req.body.projectId
    res.task.status = req.body.status

  try {
    const updatetask = await res.task.save()
    res.json(updatetask)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/task/:id', getTask, async (req, res) => {
  try {
    await res.task.remove()
    res.json({ message: 'Deleted Task' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



module.exports = router