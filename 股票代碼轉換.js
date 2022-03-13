var fs = require('fs');
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
    let content = "";
    // console.log(data2[1])
    for(let i = 0; i < n; i++){
        console.log(data2[i]);
        console.log(data2[i+n]);
    }
  });