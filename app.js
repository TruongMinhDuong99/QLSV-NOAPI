const port = 3000;
const FORM = require('./writeform');
const DATA = require('./aws');
const express = require('express');
const app=express();
var Global_name = {
    id :'123', 
    mssv:'111111',   
  }
app.use(express.static('/public'));
app.get('/',function(req,res){
    FORM.PageQLSV(res);
    DATA.getAllItem(res);
})
app.get('/new',function(req,res){
    FORM.CreateForm(res);
        res.end();
})
app.get('/edit',function(req,res){
    Global_name.id =req.query.ID;
    Global_name.mssv = req.query.MSSV;
    var HoTen=req.query.HoTen;
    var NgaySinh= req.query.NgaySinh;
    var Avata= req.query.Avata;
    FORM.writeEditForm(HoTen,NgaySinh,Avata,res)
})
app.get('/create',function(req,res){
    var ID=req.query.ID;
    var MSSV= req.query.MSSV;
    var HoTen=req.query.HoTen;
    var NgaySinh= req.query.NgaySinh;
    var Avata=req.query.Avata;
    DATA.createItem(ID,MSSV,HoTen,NgaySinh,Avata,res);
})
app.get('/save',function(req,res){
    var ID=req.query.ID;
    var MSSV= req.query.MSSV;
    var HoTen=req.query.HoTen;
    var NgaySinh= req.query.NgaySinh;
    var Avata= req.query.Avata;
    DATA.updateItem(Global_name.id,Global_name.mssv,HoTen,NgaySinh,Avata,res);
})
app.get('/delete',function(req,res){
    var ID=req.query.ID;
    var MSSV= req.query.MSSV;
    DATA.deleteItem(ID, MSSV, res);
})
app.listen(port,function(){
    console.log(`Server starting at port ${port} `);
})
