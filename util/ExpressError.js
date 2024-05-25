// this is our custom error file it will generate errors defined by us
class ExpressError extends Error{
    constructor(statusCode,message){
        super(statusCode,message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;