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
  request('https://api.blockchair.com/bitcoin-cash/outputs?q=recipient('+ selected_addr +'),is_spent(0)', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    var unspents = JSON.parse(body).data;
    console.log(unspents);
    async.eachSeries(unspents, function(u, callback) {
      console.log(u)
      console.log(u.transaction_id)
      request('https://api.blockchair.com/bitcoin-cash/transactions?q=id('+ u.transaction_id +')', function(err, res, body) {
          // do something
          console.log(body);
          var txhash = JSON.parse(body).data[0].hash;
          u.txhash = txhash;
          callback();
      });
    }, function done(err) {
        // do something
        console.log(unspents);
        unspents.forEach(function(u){
          result.push({
            "tx_hash_big_endian": u.txhash,
            "tx_hash": reverseString(u.txhash),
            "value": u.value,
            "tx_output_n": u.index
          });
        });
        res.send(JSON.stringify(result));
        console.log(result);
        console.log('all done!');
    })
    // unspents.forEach(function(u){
    //   request('https://api.blockchair.com/bitcoin-cash/transactions?q=id('+ u.transaction_id +')', function(){
    //
    //   });
    // });
  });
})

app.listen(4500, function () {
  console.log('Example app listening on port 4500!');
});
