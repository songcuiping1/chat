var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var User = require('./db').User;
app.get('/', function (req, res) {
    res.sendFile(path.resolve('app/index.html'))
});
app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('app')));
app.use(bodyParser.json());
app.post('/user/login', function (req, res) {
    var email = req.body.email;
    User.findOne({email}, function (err, doc) {
        if (err) {
            res.send({err: 1, msg: '查询出错', data: err})
        } else {
            if (doc) {
                res.send({err: 0, msg: '成功', data: doc})
            } else {
                user.avatar = 'https://secure.gravatar.com/avatar/email';
                User.create(user, function (err, doc2) {
                    if (err) {
                        res.send({err: 1, msg: '查询出错', data: err})
                    } else {
                        res.send({err: 0, msg: '成功', data: doc2})
                    }
                })
            }
        }

    })
});
app.get('/rooms',function(req,res){
   Room.find({},function(err,rooms){
      if(err){
          res.send({err:1,msg:'查询错误',data:err})
      }else{
          res.send({err:0,msg:'成功',data:rooms})
      }

   })

})
app.post('/rooms',function(req,res){
   var room=req.body;
    room.users=room.messages=[];
    Room.create(room,function(err,doc){
        if(err){
            res.send({err:1,msg:'增加房间出错',data:err});
        }else{
            //把保存成功之后的文档对象发回给客户端
            res.send({err:0,msg:'成功',data:doc});
        }
    });

});

app.get('/rooms/:id',function(req,res){
    Room.findById(req.params.id,function(err,room){
        if(err){
            res.send({err:1,msg:'查询房间出错',data:err});
        }else{
            //把保存成功之后的文档对象发回给客户端
            res.send({err:0,msg:'成功',data:room});
        }
    })
});
var server=require('http').createServer(app);

server.listen(9090);


