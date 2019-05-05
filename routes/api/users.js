const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys').secretOrKey;
const passport = require('passport')

const User = require('../../models/User.js')

// $route GET api/users/test
// @desc 返回请求的json数据
// @access public
router.get("/test",(req,res)=>{
    res.json({
        msg:"success"
    })
})

// $route POST api/users/register
// @desc 返回请求的json数据
// @access public
router.post("/register", (req, res) => {
    console.log(req.body);
    if(!req.body.email){
        throw "Can't find req.body.email"
    }
    User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                return res.status(400).json("邮箱已被注册")
            }else{
                var avatar = gravatar.url(req.body.email, {s: '200', r: 'g', d: 'mm'});
                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar,
                    password: req.body.password,
                    identity:req.body.identity,
                });
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        if(err) throw err;
                        newUser.password = hash;

                        newUser.save()
                            .then(user=>{
                                return res.json(user)
                            })
                            .catch(err => console.log(err))
                    });
                });
            }
        })
        .catch(err=>{
            console.log(err)
        })
})

// $route POST api/users/login
// @desc 返回token jwt passwport
// @access public
router.post("/login",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
        .then(user=>{
            if (!user){
                return res.status(404).json({email:'用户不存在!'})
            }
            //密码匹配
            bcrypt.compare(password, user.password, function (err, isMatch) {
                // res == true
                if (isMatch){
                    const rule = {
                        id:user.id,
                        name:user.name,
                        avatar:user.avatar,
                        identity:user.identity,
                    };
                    // jwt.sign("规则","加密名字","过期时间","回调函数")
                    jwt.sign(rule, keys,{expiresIn:3600},(err,token)=>{
                        if(err) throw err;
                        res.json({
                            success:true,
                            token:"Bearer "+token
                        })
                })
                // res.json({msg:'success'})
                }else{
                    return res.status(400).json('密码错误!')
                }
            });
        })
})

// $route GET api/users/current
// @desc return current user
// @access Private
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity:req.user.identity,
    })
})

module.exports = router;