var request = require("request");
const express = require('express');
const engine = require('ejs-locals');

var app = express();
app.use(express.static("public"));
app.engine('ejs',engine);
app.use(express.static(__dirname + '/static'));
app.set('files','./files');
app.set('view engine','ejs');

// 爬一年的股票開盤價
var get_stock = async function(stock_num) {
    return new Promise((resolve, reject) => {
        let cur_time = new Date();
        cur_time = Math.round(cur_time.valueOf()/1000);
        let year_ago_time = cur_time - 31556926;
        request({
        url: `https://query1.finance.yahoo.com/v8/finance/chart/${stock_num}.TW?period1=${year_ago_time}&period2=${cur_time}&interval=1d&events=history&=hP2rOschxO0`,
        method: "GET"
        }, function(error, response, data) {
        if (error || !data) {
            return;
        }else{
            resolve(data);
        }
        });
    });
};

app.get('/',function(req, res){
    res.render('index');
});

app.get('/get_stock_info',function(req, res){
    let stock_num = req.query.stock_num;
    get_stock(stock_num).then(
        function(data) {
            // 回傳該股票一年開盤價
            res.send({'json_data':data});
        },
        function(error) {throw error}
      );
});

  // check running enviroment
var port = process.env.PORT || 3000;

// create
app.listen(port);

// only print hint link for local enviroment
if (port === 3000) {
    console.log('RUN http://localhost:3000/');
}