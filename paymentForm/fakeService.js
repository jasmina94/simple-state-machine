const service = {
    getData: function () {
        const paymentId = Math.floor(Math.random() * 100);
        return Promise.resolve(JSON.stringify({ message: `Successful payment. Payment ID: ${paymentId}.` }));
    }
}

module.exports = service;