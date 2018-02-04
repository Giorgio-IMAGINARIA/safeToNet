var express = require('express');
var router = express.Router();

const {Wit, log} = require('node-wit');

const client = new Wit({
  accessToken: 'ECTBS4WXRIEUZSDLAWSPDZILOQYS3TVY',
  logger: new log.Logger(log.DEBUG) // optional
});


function tryWit(messageReceived) {
  client.message(messageReceived, {}).then((data) => {
    console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
  }).catch(console.error);
}

/* GET API Address. */
router.get('/', function(req, res, next) {


  var apiAddressJson = {
    apiAddress: ''
  };


  tryWit('set state to open, direction to ascending and sort to created');

  res.json(apiAddressJson);

});

module.exports = router;
