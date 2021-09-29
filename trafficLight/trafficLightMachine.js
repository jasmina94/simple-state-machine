const { STATES, ACTIONS } = require('./constants');


/**
 * Traffic light state machine.
 */
const trafficLightMachine = {
    state: STATES.BLINKING_YELLOW,
    transitions: {
        RED: {
            turnYellow: function () {
                console.log('\tEnough of waiting. Turning yellow...');
                this.changeState(STATES.YELLOW);
                setTimeout(() => {
                    this.dispatchAction(ACTIONS.TURN_GREEN);
                }, 700);
            }
        },
        YELLOW: {
            turnGreen: function () {
                console.log('\tGet ready. Turning green...');
                this.changeState(STATES.GREEN);
                setTimeout(() => {
                    this.dispatchAction(ACTIONS.TURN_BLINKING_GREEN);
                }, 3000);
            },
            turnRed: function () {
                console.log('\tOuuups. Last chance! Turning red light');
                this.changeState(STATES.RED);
                setTimeout(() => {
                    this.dispatchAction(ACTIONS.TURN_YELLOW);
                }, 2000);
            }
        },
        GREEN: {
            turnBlinkingGreen: function () {
                console.log('\tTurning blinking green...');
                this.changeState(STATES.BLINKING_GREEN);
                setTimeout(() => {
                    this.dispatchAction(ACTIONS.TURN_YELLOW);
                }, 2000);
            }
        },
        BLINKING_GREEN: {
            turnYellow: function () {
                console.log('\tTurning yellow. Must wait.');
                this.changeState(STATES.YELLOW);
                setTimeout(() => {
                    this.dispatchAction(ACTIONS.TURN_RED);
                }, 1000);
            }
        },
        BLINKING_YELLOW: {
            turnGreen: function () {
                console.log('\tTurning green light...');
                this.changeState(STATES.GREEN);
                setTimeout(() => {
                    this.dispatchAction(ACTIONS.TURN_BLINKING_GREEN);
                }, 2000)
            }
        }
    },
    dispatchAction(actionName) {
        const actions = this.transitions[this.state];
        const action = actions[actionName];

        if (action) {
            action.apply(this);
        } else {
            console.log('\tERROR: Traffic light broken! Requested action not available from current state.');
            this.changeState(STATES.BLINKING_YELLOW);
        }

    },
    changeState(newState) {
        this.state = newState;
        console.log('***' + newState + '***');
    },
    displayIntro() {
        console.log('**** SuperCool Traffic Light ****');
        console.log('Current state: ' + this.state);
    },
    run(turnOn) {
        if (turnOn) {
            this.displayIntro();
            if (this.state === STATES.BLINKING_YELLOW) {
                console.log('Traffic light starts.');
                this.dispatchAction(ACTIONS.TURN_GREEN);
            } else {
                console.log('Traffic light already running.');
            }
        } else {
            console.log('Traffic light is turning off.');
            this.changeState(STATES.BLINKING_YELLOW);
        }
    }
};


module.exports = {
    Machine: trafficLightMachine
}