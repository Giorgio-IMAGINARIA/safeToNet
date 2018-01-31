var express = require('express');
var router = express.Router();
var environment = require('../environment.js');
process.env['API_ADDRESS'] = environment.apiAddress;
const https = require("https");
const axios = require("axios");
const request = require("request");

const {Wit, log} = require('node-wit');

const client = new Wit({
  accessToken: 'ECTBS4WXRIEUZSDLAWSPDZILOQYS3TVY',
  logger: new log.Logger(log.DEBUG) // optional
});

function getRecipesAxios(ingredients) {
  const url = "https://community-food2fork.p.mashape.com/search?key=388a3fb91f08c545ae5f8238bc65a984&q=shredded+chicken";
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
  console.log('pippa!');

  axios.get(url, {crossdomain: true}).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  });
}

function getRecipesRequest(ingredients) {
  const url = "http://food2fork.com/api/search?key={388a3fb91f08c545ae5f8238bc65a984}&q=shredded%20chicken";
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
  console.log('pippa!');

  request.get(url, (error, response, body) => {
    let json = JSON.parse(body);
    console.log(json);
  });
}

function tryWit(messageReceived) {
  client.message(messageReceived, {}).then((data) => {
    console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
  }).catch(console.error);
}

/* GET API Address. */
router.get('/', function(req, res, next) {
  var apiAddressJson = {
    apiAddress: process.env['API_ADDRESS']
  };

  // getRecipesAxios('ingredients');

  tryWit('set state to open, direction to ascending and sort to created');

  res.json(apiAddressJson);
});

module.exports = router;
