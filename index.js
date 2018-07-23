var express = require('express');
var app = express();
var request = require('request');
var async = require('async');
//
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
//
// app.use(express.static('public'));

function reverseString(str) {
    return str.match(/.{2}|.{1}/g).reverse().join('');
}

app.use('/', express.static('public'));

app.get('/unspent/:selected_addr', function(req,res){
  var selected_addr = req.params.selected_addr;
  if (!selected_addr) {
    res.send('[]');
    return;
  }
  var result = [];
  request('https://bch-chain.api.btc.com/v3/address/'+ selected_addr +'/unspent', function(error, response, body){
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    var unspents = JSON.parse(body).data.list
    unspents.forEach(function(u){
      result.push({
        "tx_hash_big_endian": u.tx_hash,
        "tx_hash": reverseString(u.tx_hash),
        "value": u.value,
        "tx_output_n": u.tx_output_n
      });
    });
    res.send(JSON.stringify(result));
    console.log(result);
    console.log('all done!');
  });

})

app.listen(4500, function () {
  console.log('Example app listening on port 4500!');
});
