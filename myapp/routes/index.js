var express = require('express');
var router = express.Router();
var connection = require('./mysql');
/* GET home page. */
router.get('/', function(req, res) {
    connection.query("select * from user", function (error, results) {
        if(error){
            console.log(error);
            res.end();
        }else{
            res.render('index', { result: results });
        }
    });
});
//添加
router.get('/add', function(req, res) {
    res.render('add');
});
router.get('/addcon', function(req, res) {
    var name=req.query.name;
    var age=req.query.age;
    var sex=req.query.sex;

    connection.query(`insert into user (name,age,sex) values('${name}','${age}','${sex}')`, function (error, results) {
        if(error){
            console.log(error);
            res.end();
        }else{
            res.render('message',{message:'添加成功',url:'/add'});

        }
    });
});
//删除
router.get('/del/:id', function(req, res) {
    var id=req.params.id;
    connection.query(`delete from user where id=${id}`, function (error, results) {
        if(error){
            console.log(error);
            res.end();
        }else{
            res.render('message',{message:'删除成功',url:'/'});
        }
    });
});
//修改
router.get('/update/:id', function(req, res) {

    var id=req.params.id;
console.log(id)
    connection.query("select * from user where id="+id, function (error, data) {
        if(error){
            console.log(error);
            res.end();
        }else{
            res.render('update', { data: data });
        }
    });

});
router.get('/updatecon/:id', function(req, res) {

    var id=req.params.id;
    var name=req.query.name;
    var age=req.query.age;
    var sex=req.query.sex;
    connection.query(`update user set name='${name}',age='${age}',sex='${sex}' where id=${id}`, function (error, results) {
        if(error){
            console.log(error);
            res.end();
        }else{
            res.render('message',{message:'修改成功',url:'/update/'+id});
        }
    });
});
module.exports = router;
