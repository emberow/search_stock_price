var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

// 創建collection
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("stock");
  dbo.createCollection("stock_transfer", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});




fs.readFile('股票代碼轉化表.txt', 'utf8', function(err, data) {
    data = data.split("\n");
    let data2 = []
    let c = 0;
    for (item of data){
        if(item != "\r" && item != ""){
            // console.log(item)
            data2.push(item);
        }
    }
    let n = data2.length/2;
    // console.log(data2[1])
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("stock");
        for(let i = 0; i < n; i++){
            var myobj = { stock_num: data2[i], stock_name: data2[i+n] };
            dbo.collection("stock_transfer").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
            
            });
        }
        

      });
  });