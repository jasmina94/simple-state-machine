const { STATES, ACTIONS } = require("./constants");

const weekendMachine = {
    state: STATES.SOBER,
    transitions: {
        SOBER: {
            drink: function (beverage) {
                console.log('Current state', this.state);
                console.log('\tdrinking', beverage.type);
                if (beverage.type === 'alcohol') {
                    console.log('\tAdios inhibitions!\t');
                    this.changeState(STATES.DRUNK);
                } else {
                    console.log('\tNot thirsty anymore!\t');
                }
            }
        },
        DRUNK: {
            drink: function (beverage) {
                console.log('Current state', this.state);
                console.log('\tdrinking', beverage.type);
                if (beverage.type === 'alcohol') {
                    console.log('\tAdios pants!');
                    this.changeState(STATES.REALLY_DRUNK);
                } else {
                    console.log('\tI said what?');
                    this.changeState(STATES.SOBER);
                }
            }
        },
        REALLY_DRUNK: {
            drink: function (beverage) {
                console.log('Current state: ', this.state);
                console.log('\tdrinking', beverage.type);
                if (beverage.type === 'alcohol') {
                    let dice = Math.floor(Math.random() * 2);
                    if (dice) {
                        this.dispatchAction(ACTIONS.THROWUP);
                    } else {
                        this.dispatchAction(ACTIONS.PASSOUT);
                    }
                } else {
                    this.changeState(STATES.DRUNK);
                }
            },
            throwup: function () {
                console.log('Current state: ', this.state);
                this.dispatchAction(ACTIONS.PASSOUT);
            },
            passout: function () {
                console.log('Current state: ', this.state);
                this.changeState(STATES.ASLEEP);
            }
        },
        ASLEEP: {
            wake: function () {
                console.log('Current state: ', this.state);
                console.log('\tWaking up...');
                this.changeState(STATES.HANGOVER);
            }
        },
        HANGOVER: {
            openEyes: function () {
                console.log('CurrentState', this.state);
                console.log('\tTurn off the sun please...');
            },
            drink: function (beverage) {
                console.log('Current state: ', this.state);
                console.log('\tDrinking', beverage.type);
                if (beverage.type === 'alcohol') {
                    console.log('\tKlin se klinom izbija!');
                    this.changeState(STATES.DRUNK);
                } else {
                    console.log('\tNever again!');
                    this.changeState(STATES.SOBER);
                }
            }
        }
    },
    dispatchAction(actionName, ...payload) {
        const actions = this.transitions[this.state];
        const action = actions[actionName];

        if (action) {
            action.apply(this, ...payload);
        } else {
            console.log('Action name is not valid for current state!');
        }
    },
    changeState(newState) {
        this.state = newState;
    }
};

module.exports = {
    weekendMachine
}