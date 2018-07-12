import RpiLeds from 'rpi-leds';
import Web3 from 'web3';

//import gpio from 'rpi-gpio';
//import gpio from 'gpio';

export default (app) => {

    console.log("Blink Demo!");
    const leds = new RpiLeds();
    const web3 = new Web3();

    web3.setProvider(new web3.providers.HttpProvider("http://192.28.4.151:8545"));


    var coinbase = web3.eth.coinbase;
    console.log(coinbase);
    var balance = web3.eth.getBalance(coinbase);
    console.log(balance);

    var contractAddress = '0x12a4e803ae1d5504791bbe2917d2584db160e329';

    var ABI = JSON.parse('[{"constant":true,"inputs":[],"name":"getData","outputs":[{"name":"retData","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"inData","type":"uint256"}],"name":"setData","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"msgData","type":"uint256"}],"name":"blinkEvent","type":"event"}]');
    
    const blinkContract = web3.eth.contract(ABI).at(contractAddress);

    blinkContract.setData(20).then((err,res)=>{
        console.log(res);
        console.log(err);
    })

    blinkContract.blinkEvent({}, (error, msg) => {
        if (!error) {
            // console.log(msg.args.msgData);
            const obj = msg.args.msgData;
            const jc = JSON.stringify(obj);
            const numb = Number(obj);
            console.log(msg)
            console.log(jc)
            console.log(numb);
            
            app.blinkLeds(numb);
        } else {
            console.log(error);
        }
    });



    app.blinkLeds = (number) => {
        let time =  number * 1000;
        app.ledStatus = false;
        let iv = setInterval(() => {
            if (app.ledStatus) {
                console.log("turn off!")
                leds.power.turnOff();
                leds.status.turnOff();
            } else {
                console.log("turn on!")
                leds.power.turnOn();
                leds.status.turnOn();
            }
            app.ledStatus = !app.ledStatus;
        }, 500);

        setTimeout(() => {
            clearInterval(iv);
        }, time);
    }

    //  app.blinkLeds();
    return app;
}