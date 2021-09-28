const { STATES, ACTIONS } = require('./constants');
const service = require('./fakeService');

const paymentFormStateMachine = {
    state: STATES.IDLE,
    transitions: {
        IDLE: {
            click: function () {
                console.log('\tUser clicks on Sumbit button...');
                console.log('Current state:', this.state);
                this.changeState(STATES.LOADING);
                service.getData()
                    .then(res => {
                        this.dispatchAction(ACTIONS.PAYMENT_RECEIVED, [JSON.parse(res)]);
                    })
                    .catch(err => {
                        this.dispatchAction(ACTIONS.PAYMENT_FAILED, [err.message]);

                        if (this.state === STATES.ERROR) {
                            this.dispatchAction(ACTIONS.RETRY);
                        }
                    });
            }
        },
        LOADING: {
            paymentReceived: function (data) {
                console.log('Current state:', this.state);
                console.log(data.message);
                this.changeState(STATES.IDLE);
            },
            paymentFailed: function (error) {
                console.log('Current state:', this.state);
                console.error(error);
                this.changeState(STATES.ERROR);
            }
        },
        ERROR: {
            retry: function () {
                console.log('Current state:', this.state);
                this.changeState(STATES.IDLE);
                this.dispatchAction(ACTIONS.CLICK);
            }
        }
    },
    dispatchAction(actionName, ...payload) {
        const actions = this.transitions[this.state];
        const action = actions[actionName];

        if (action) {
            action.apply(paymentFormStateMachine, ...payload);
        } else {
            console.log('\tAction name is not valid for current state!');
        }
    },
    changeState(newState) {
        this.state = newState;
    }
}

console.log('************ Payment form demo ************');
paymentFormStateMachine.dispatchAction(ACTIONS.CLICK);
