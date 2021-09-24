const { STATES, ACTIONS } = require('./constants');
const service = require('./fakeService');

const paymentFormStateMachine = {
    state: STATES.IDLE,
    transitions: {
        IDLE: {
            click: function () {
                this.changeState(STATES.LOADING);
                service.getData()
                    .then(res => {
                        this.dispatchAction(ACTIONS.PAYMENT_RECEIVED, [JSON.parse(res)]);
                    })
                    .catch(err => {
                        this.dispatchAction(ACTIONS.PAYMENT_FAILED, err);
                    })
            }
        },
        LOADING: {
            paymentReceived: function (data) {
                console.log(data.message);
                this.changeState(STATES.IDLE);
            },
            paymentFailed: function (error) {
                this.changeState(STATES.ERROR);
            }
        },
        ERROR: {
            retry: function () {
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
            console.log('Action name is not valid for current state!');
        }
    },
    changeState(newState) {
        this.state = newState;
    }
}

console.log('Machine demo');
console.log('Machine current state: ', paymentFormStateMachine.state);
paymentFormStateMachine.dispatchAction(ACTIONS.CLICK);