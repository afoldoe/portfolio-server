//routing for projects route
'use strict';

const express = require('express');
const router = express.Router();
const Project = require('../models/project');

module.exports = router

.get('', (req,res,next) => {
  Project.find()
  .lean()
  .then ( data => res.send(data) )
  .catch( err => {
    console.log('error getting user list');
    console.log(err);
    next(err);
  });
})

// .get('/:id', (req,res,next) => {
//   User.findById(req.params.id)
//   .lean()
//   .select('-password')
//   .then( data => res.send(data) )
//   .catch( err => {
//     console.log('error getting an user by id');
//     console.log(err);
//     next(err);
//   });
// })

.post('', (req,res,next) => {
  const newProject = new Project(req.body);
  newProject.save()
  .then(project => res.send(project))
  .catch(next);
})

.put('/:id', (req,res,next) => {
  Project.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .lean()
  .then(project => res.send(project))
  .catch(next);
})

.delete('/:id', (req,res,next) => {
  Project.findByIdAndRemove(req.params.id)
  .lean()
  .then( data => {
    if(!data) return Promise.reject(data);
    res.send(data);
  })
  .catch( next );
})
;
