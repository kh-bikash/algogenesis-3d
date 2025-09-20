// In: backend/models/ProblemModel.js
    
const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  defaultCode: { type: String, required: true },
  algorithmKey: { type: String, required: true },
  dataType: { type: String, required: true, enum: ['array', 'bst', 'linkedList', 'stack'] },
  initialData: { type: mongoose.Schema.Types.Mixed, required: true },
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;