const STATES = {
    IDLE: 'IDLE',
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};

const ACTIONS = {
    CLICK: 'click',
    PAYMENT_RECEIVED: 'paymentReceived',
    PAYMENT_FAILED: 'paymentFailed',
    RETRY: 'retry'
}

module.exports = {
    STATES,
    ACTIONS
}