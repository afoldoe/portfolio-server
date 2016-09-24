//model for project documents
'use strict';
// const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const project = new Schema({
  title: String,
  author: [String],
  projectUrl: String,
  githubUrl: String,
  datePublished: Date,
  bodyText: String,
  imgUrl: String
}, { timestamps: true });


module.exports = mongoose.model('Project', project);
