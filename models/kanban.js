const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  AddedDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  priority: String,
  projectId: String,
  status: {
    type: String,
    default: 'TODO',
  },

})

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  AddedDate: {
    type: Date,
    required: true,
    default: Date.now
  },
})

const Task = mongoose.model('Task', TaskSchema);
const Project = mongoose.model('Project', ProjectSchema);

module.exports = {
  Task,
  Project,
};