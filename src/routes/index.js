var express = require('express');
var router = express.Router();

var Link = require('../models/link');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'tylien.bzh | home'
  });
});

router.get('/api/hello/:name', function(req, res) {
  res.send('Hello ' + req.params.name + ' !');
});

/* GET a link */
router.get('/:key', function(req, res) {

  var key = req.params.key;

  Link.findByKey(key, function(link) {

    if(link) res.redirect(link.url);
    else     res.sendStatus(404);
  });
});

/* POST a link */
router.post('/', function(req, res) {

  var url = req.body.url; //TODO detect if starts with 'http://' or 'https://' and remove it. And check if ends with '/'

  Link.findOrCreateByUrl(url, function(link) {
    if(link) res.json(link);
    else     res.sendStatus(404);
  });

});

router.get('/translations', function(req, res) {
  res.json(JSON.parse());
});

module.exports = router;
