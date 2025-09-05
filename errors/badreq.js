const CustomAPIError = require('./customeapi')
class BadRequest extends CustomAPIError {
    constructor(message){
        super(message)
        this.statusCode = 400
    }
}

module.exports = BadRequest