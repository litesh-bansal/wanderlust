// this is a way to handle the errors here we are making try catch block part little complex but it will help us
// to make code more neat and clean and better to read and it will decrease messyness of code if we use try and catch block again and again
module.exports = (fn)=>
{
    return (req,res,next)=>{
        fn(req,res,next).catch(next);
    }
}