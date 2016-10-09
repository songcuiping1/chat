/**
 * Created by 宋翠平 on 2016/10/9.
 */
var mongoose=require('mongoose');
var config=require('../config');
mongoose.connect(config.dbUrl);
var UserSchema=new mongoose.Schema({
    email:String,avatar:String
});
var User=mongoose.module('User',UserSchema);
exports.User=User;

var RoomSchema=new mongoose.Schema({
    name:String,
    users:[{type:objectId,ref:'User'}],
    messages:[{
        user:{type:Object}
    }]
})
var Room = mongoose.model('Room',RoomSchema);
exports.Room = Room;
