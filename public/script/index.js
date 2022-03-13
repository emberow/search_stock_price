
var is_chart_exit = false;
var chart_obj;

function get_stock_info(){
    let stock_num = $("#stock_num").val();
    $.ajax({
        url: "/get_stock_info?stock_num="+stock_num,
        type : "get", 
        dataType:'json', 
        error:function(){   
            document.getElementById("accounting_table").innerHTML = "連接server失敗";
        },
        success:function(data){   
            data = data.json_data;
            show_stock_info(data);
        }
    });
}

function show_stock_info(data){
    let json_data = JSON.parse(data);
    // 該股票一年開盤價
    let stock_price = json_data.chart.result[0].indicators.quote[0].open;
    let time_stamp = json_data.chart.result[0].timestamp;
    let time_array = [];
    for(time of time_stamp){
        // yahoo是用秒計算 Date()用毫秒
        console.log(time)
        let date_obj = new Date(time*1000);
        let month = date_obj.getMonth();
        let date = date_obj.getDate();
        time_array.push(String(month+1) + '/' + String(date));
    }
    if(is_chart_exit){
        chart_obj.destroy();
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: time_array,
            datasets: [{
                label: '價格',
                data: stock_price,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
            }]
        },
    });
    chart_obj = myChart;
    is_chart_exit = true
}
