const STATES = {
    IDLE: 'IDLE',
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};

const ACTIONS = {
    CLICK: 'click',
    PAYMENT_RECEIVED: 'paymentReceived',
    PAYMENT_FAILED: 'paymentFailed'
}

module.exports = {
    STATES,
    ACTIONS
}