// import gpio from 'rpi-gpio';
// import GPIO from 'onoff';
var GPIO = require('onoff').Gpio;

import Web3 from 'web3';


export default (app) => {
    console.log('Set Example using gpio');

    
    
    /*gpio.setup(INPUT, gpio.DIR_IN, gpio.EDGE_BOTH);
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    const coinbase = web3.eth.coinbase;
    const balance = web3.eth.getBalance(coinbase);
    const contract = '';
    const ABI = JSON.parse('');
    const switchCon = web3.eth.contract(ABI).at(contract);
    console.log(switchCon);
    web3.eth.defaultAccount = web3.eth.accounts[0];*/

    

    var led07 = new GPIO(3, 'out');
    var led08 = new GPIO(4, 'out');
    var led09 = new GPIO(17, 'out');

    var sensor = new GPIO(18, 'in','both');

    console.log('Pin 18 Intilized!');

    sensor.watch(function(err, value) {
        if (value == 1) {
            console.log('Intruder alert');
        } else {
            console.log('Intruder gone');
        }
    });

    var leds = [ led07, led08, led09];


    app.blinkledset = () => {
        
    counter = 0;
    console.log(leds.length);
    let timeout = setInterval(function() {
    leds.forEach(function(currentValue) {
        currentValue.writeSync(0);
    });

    leds[counter].writeSync(1);
    counter++;

    if (counter >= (leds.length)) counter = 0;
    console.log(counter);
    }, 200);

    setTimeout(() => {
            clearInterval(timeout);
    }, 10000);

  }
    

    return app;
 }   

