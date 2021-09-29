const { Machine } = require('./trafficLightMachine');
const readline = require('readline');
const { resolve } = require('path');

const machine = Object.create(Machine, {
    name: {
        writable: false,
        enumerable: true,
        value: 'SuperCoolTraficLight'
    }
});

const demo = () => {
    console.log('To run a traffic light press \'r\' or to stop press \'s\'');
    return new Promise((res, rej) => {
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.setPrompt('>> ');
        rl.prompt();
        rl
            .on('line', (line) => {
                if (line === 'r') {
                    machine.run(true);
                } else if (line === 's') {
                    machine.run(false);
                } else {
                    console.log(`Unknown command: ${line}`);
                }
            })
            .on('close', () => {
                console.log('Demo stops...');
                resolve(42);
            })
    });
}

const run = async () => {
    try {
        let demoResult = await demo();
        console.log('Result: ', demoResult);
    } catch (e) {
        console.log('Programm failed: ', e);
    }
}

run();

