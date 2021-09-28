const { weekendMachine } = require('./machine');
const { ACTIONS } = require('./constants');

const machine = Object.create(weekendMachine, {
    name: {
        writable: false,
        enumerable: true,
        value: 'MyGame'
    }
});
const beer = { name: 'Lav pivo', type: 'alcohol' };
const tequila = { name: 'Tequila', type: 'alcohol' };
const water = { name: 'Voda ROSA', type: 'non-alcohol' };

console.log('********* Drinking weekend game *********');
console.log('Machine current state: ', machine.state);

machine.dispatchAction(ACTIONS.DRINK, [beer]);
machine.dispatchAction(ACTIONS.DRINK, [tequila]);
machine.dispatchAction(ACTIONS.DRINK, [tequila]);
machine.dispatchAction(ACTIONS.WAKE);
machine.dispatchAction(ACTIONS.DRINK, [beer]);
