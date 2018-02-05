var express = require('express');
var router = express.Router();

const {Wit, log} = require('node-wit');

const client = new Wit({
  accessToken: 'ECTBS4WXRIEUZSDLAWSPDZILOQYS3TVY',

  logger: new log.Logger(log.DEBUG) // optional
});

// 'set state to open, direction to ascending and sort to created'

function analyseVoice(messageReceived, res) {
  client.message(messageReceived, {}).then((data) => {
    res.json(JSON.stringify(data));
  }).catch(console.error);
}

/* POST API Address. */
router.post('/', function(req, res, next) {
  console.log('req: ', req);
  analyseVoice(req.body.voice, res);
});

module.exports = router;
