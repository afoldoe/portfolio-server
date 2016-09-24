//slapping the app together
'use strict';

const express = require('express');
const app = express();
const projects = require('./routes/projects');
const errorhandler = require('./errorhandler');
const path = require( 'path' );
const publicPath = path.resolve( __dirname, '../public' );
const cors = require('./cors')('*');
const bodyParser = require('body-parser');

module.exports = app
.use(express.static(publicPath))
.use(cors)
.use(bodyParser.urlencoded({
  extended: true
}))
.use(bodyParser.json())
// .get('/', (req,res) => res.sendFile(indexHtml))
.use('/api/projects', projects)

.use(errorhandler)
;
