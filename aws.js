const AWS = require('aws-sdk');
const FORM = require('./writeform');
AWS.config.update({
  region: "us-west-2",
    endpoint: "http://localhost:8000",
    accessKeyId: "xxxxxx1",
    secretAccessKey: "xxxxxx1"
});

let docClient = new AWS.DynamoDB.DocumentClient();
function getAllItem(res) {
  let params = {
    TableName: "Students"
  };
  let scanObject = {};
  docClient.scan(params, (err, data) => {
    if (err) {
      scanObject.err = err;
    } else {
      scanObject.data = data;
    }
    FORM.writeItemTable(scanObject, res);
  });
}
function createItem(ID,MSSV,HoTen,NgaySinh,Avata, res) {
  let params = {
    TableName: 'Students',
    Item: {
      ID: String(ID),
      MSSV: String(MSSV),     
      HoTen: String(HoTen),   
      NgaySinh: String(NgaySinh),            
      Avata:String(Avata)
    }
  };
  docClient.put(params, (err, data) => {
    if (err) {
      FORM.CreateForm(res);
      res.write('<h5 style="color:red;">Vui lòng nhập đủ các thuộc tính</h5>');
    } else {
      res.writeHead(302, {'Location': '/'});
    }
    res.end();
  });
}
function updateItem(ID,MSSV,HoTen,NgaySinh,Avata, res) {
  let params = {
    TableName: 'Students',
    Key:{
      "ID": String(ID),
      "MSSV": String(MSSV)
    },
    UpdateExpression: "set #ht=:HoTen,#ns=:NgaySinh, #a=:Avata",
    ExpressionAttributeNames: {
      '#ht':'HoTen',
      '#ns':'NgaySinh',
      '#a' :'Avata'
    },
    ExpressionAttributeValues:{
      ':HoTen':String(HoTen),
      ':NgaySinh':String(NgaySinh),
      ':Avata':String(Avata)
    },
    
  };
  docClient.update(params, (err, data) => {
    if (err) {
      FORM.writeEditForm(HoTen, NgaySinh,Avata, res);
      res.write('<h5 style="color:red;">Vui lòng nhập đủ các thuộc tính</h5>');
    } else {
      res.writeHead(302, {'Location': '/'});
    }
    res.end();
  })
}

function deleteItem(ID,MSSV,res) {
  let params = {
    TableName: 'Students',
    Key:{
      "ID": String(ID),
      "MSSV": String(MSSV)
    }
  };

  docClient.delete(params, (err, data) => {
    if (err) {
      console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      res.writeHead(302, {'Location': '/'});
    }
    res.end();
  });
}
module.exports = {
  getAllItem : getAllItem,
  //getAllItemToJson : getAllItemToJson,
  createItem : createItem,
  updateItem : updateItem,
  deleteItem:deleteItem
};