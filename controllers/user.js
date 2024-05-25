const User = require('../models/user.js');

// signup form
module.exports.renderSignup = (req,res)=>
{
    res.render('./users/signup.ejs');
}
// sign up
module.exports.signup = async (req,res)=>{
    try
    {
        let{username,email,password} = req.body;
        const newUser = new User({username,email});
        const registeredUser = await User.register(newUser,password);
        // console.log(registeredUser);

        // req.login() is implemented when a user will sign up he will be logged in automatically
        req.login(registeredUser,(err)=>{
            if(err)
            {
                next(err);
            }
            else
            {
                req.flash('success','welcome to wanderlust');
                res.redirect('/listings');
            }
        })
        
    }
    catch(e)
    {
        req.flash('error',e.message);
        res.redirect('/signup');
    }
    
}


// login form
module.exports.renderLogin = (req,res)=>{
    res.render('./users/login.ejs');
}
// login
module.exports.login = async(req,res)=>{
    req.flash('success','welcome back to wanderlust');
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
    
}

// logout 
module.exports.logout = (req,res)=>{
    req.logOut((err)=>{
        if(err)
        {
            return next(err);
        }
        else
        {
            req.flash('success','logged out successfully');
            res.redirect('/listings');
        }
    })
}