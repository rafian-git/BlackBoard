var express = require('express');
var router = express.Router();


// router.get('/', function(req, res){
//
// 	var ran = '';
// 	var char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
// 	for (var i = 0; i < 7; i++) {
// 		ran += char[Math.floor(Math.random()*61)];
// 	}
// 	res.redirect('/'+ran);
// 	//res.render('blackboard');
// });


router.get('/', function(req, res){

	//console.log(req.params.id);
	res.render('blackboard');

});
module.exports = router;
