class ExpressError extends Error {
    constructor(messege, StatusCode) {
        super();
        this.messege = messege;
        this.statusCode = StatusCode
    }
}
module.exports = ExpressError;