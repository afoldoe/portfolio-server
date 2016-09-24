//api testing for projects route
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const mongoose = require('mongoose');
const connection = require('../lib/mongoose-setup');
const app = require('../lib/app');

describe('projects', () => {

  before(done => {
    mongoose.connect('mongodb://localhost/portfolio', () => {
      mongoose.connection.once('connected', () => {
        connection.db.dropDatabase( () => {
          done();
        });
      });
    });
  });

  const request = chai.request(app);
  let sample = {title: 'Code-aoke', author: 'Arielle'};


  it('gets all the projects', done => {
    request
      .get('/api/projects')
      .then(res => {
        assert.deepEqual(res.body.length, 0);
        assert.equal(res.status, 200);
        done();
      })
      .catch(done);
  });

  it('adds a project to the database', done => {
    request
      .post('/api/projects')
      .send(sample)
      .then(res => {
        const project = res.body;
        sample = project;
        assert.equal(res.status, 200);
        assert.equal(res.body.title, 'Code-aoke');
        assert.equal(res.body.author, 'Arielle');
        done();
      })
      .catch(done);
  });

  it('changes a projects info', done => {
    request
      .put(`/api/projects/${sample._id}`)
      .send({title: 'No-Spoilers', author: 'Aaron'})
      .then(res => {
        let project = res.body;
        assert.deepEqual(project.title, 'No-Spoilers');
        assert.deepEqual(project._id, sample._id);
        assert.equal(project.__v, 0);
        done();
      })
      .catch(done);
  });

  it('deletes a project by id', done => {
    request
      .del(`/api/projects/${sample._id}`)
      .then(res => {
        let project = res.body;
        assert.equal(sample._id, project._id);
        done();
      })
      .catch(done);
  });

});