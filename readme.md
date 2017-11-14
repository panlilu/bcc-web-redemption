# BCC web redemption

Simple BitcoinCash web wallet.

Your private key won't go out from your browser.

Unspent data is from https://blockchair.com/.

You can edit your unspent or paste from any other resource as you wish.

After making raw transaction, broadcast it to https://pool.viabtc.com/tools/BCC/broadcast/ or any other node to make transaction happen.

## build it
```
git clone --recursive git@github.com:panlilu/bcc-web-redemption.git
cd bcc-web-redemption
npm install
npm run build
```
## run
```
npm install
npm start

open 127.0.0.1:4500 in your browser
```
## screenshot
<img width="910" alt="2017-08-03 4 13 33" src="https://user-images.githubusercontent.com/910022/28912449-e17ff900-7866-11e7-87fc-64de38d64c06.png">
