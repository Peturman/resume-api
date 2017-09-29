var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var User = require(libs + 'model/user');
var db = require(libs + 'db/mongoose');
var log = require(libs + 'log')(module);

//获取用户信息
router.get('/info', passport.authenticate('bearer', { session: false }),
    function(req, res) {
        // req.authInfo is set using the `info` argument supplied by
        // `BearerStrategy`.  It is typically used to indicate scope of the token,
        // and used in access control checks.  For illustrative purposes, this
        // example simply returns the scope in the response.
        res.json({
        	user_id: req.user.userId, 
        	name: req.user.username, 
        	scope: req.authInfo.scope
        });
    }
);

//添加新用户
router.post('/create',
    function(req, res) {
        User.findOne({ username: req.body.username }, function (err, user) {
            if (err) {
                return log.error(err);
            } else if (!user) {
                var newUser = new User({
                    username: req.body.username,
                    password: req.body.password
                });

                newUser.save(function(err, user) {
                    if(!err) {
                        log.info("New user - %s:%s", user.username, user.password);
                        res.json({
                            status: 1,
                            message: '注册成功'
                        })
                    }else {
                        return log.error(err);
                    }
                });
            }else {
                res.json({
                    status: 0,
                    message: '用户名已存在'
                })
            }
        })

    }
);

module.exports = router;