const CustomAPIError = require('./customeapi')
class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.StatusCodes = 404
    }
}

module.exports = NotFoundError