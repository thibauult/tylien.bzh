var express = require('express');
var router = express.Router();
var i18n = require('i18n');

var Link = require('../models/link');

/* GET home page. */
router.get('/', function(req, res) {
    res.setLocale(req.cookies['locale']);
    res.render('index');
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

// set a cookie to requested locale
router.get('/i18n/:locale', function (req, res) {
    res.cookie('locale', req.params.locale);
    res.redirect('/');
});

module.exports = router;
