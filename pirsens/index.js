var GPIO = require('onoff').Gpio;
import Web3 from 'web3';
var pir = new GPIO(17, 'in', 'both');

export default (app) => {

    const web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider("http://172.28.4.151:8545"));

    var coinbase = web3.eth.coinbase;
    console.log(coinbase);
    var balance = web3.eth.getBalance(coinbase);
    console.log(balance);

    var contractAddress = '0xb0a7c05b111d1a1164c66d5debcb8f424f5c9804';
    var ABI = JSON.parse('[{"constant":true,"inputs":[],"name":"getData","outputs":[{"name":"retData","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"inData","type":"uint256"}],"name":"setData","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"msgData","type":"uint256"}],"name":"blinkEvent","type":"event"}]');
    const blinkContract = web3.eth.contract(ABI).at(contractAddress);




    // blinkContract.blinkEvent({}, (error, msg) => {
    //     if (!error) {
    //         // console.log(msg.args.msgData);
    //         const obj = msg.args.msgData;
    //         const jc = JSON.stringify(obj);
    //         const numb = Number(obj);
    //         console.log(msg)
    //         console.log(jc)
    //         console.log(numb);

    //         //app.blinkLeds(numb);
    //     } else {
    //         console.log(error);
    //     }
    // });
    

    // try {
    //     blinkContract.getData((err,result)=>{
    //         console.log(result, "jsx");
    //         console.log(err,"kc");
    //     })
    // } catch (e) {
    //     console.log(e);
    // }





    pir.watch(function (err, value) {

        console.log(err);
        console.log(value);
        if (err) {
            console.log(err);
        }
        else if (value) {
            console.log('Object Detected', value);

            var params = {
                gas: 1000000,
                from: '0x597c454e3d4754b770f0b512f607e350fe8de976'
            };
            try {
                blinkContract.setData(5, params);
                console.log('Message Sent!');
            } catch (e) {
                console.log(e);
            }

        } else {
            console.log('No Object at the Moment', value);
        }
    });

    console.log('Pi Bot deployed successfully!');
    console.log('Listining...');

    return app;

}