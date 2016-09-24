
//unit testing for project model
// 'use strict';
const Project = require('../lib/models/project');
const assert = require('chai').assert;

describe('Project Schema', () => {
  
  it('requires a title', done => {
    const project = new Project({title: 'N0-Spoilers'});
    project.validate(err => {
      assert.equal(null, err);
      done();
    });
  });

});