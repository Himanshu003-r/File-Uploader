const CustomAPIError = require('./customeapi')
class Unauthenticated extends CustomAPIError {
    constructor(message){
        super(message)
        this.statusCode = 401
    }
}

module.exports = Unauthenticated