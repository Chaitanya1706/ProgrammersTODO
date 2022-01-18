const User = require('../models/user');

module.exports.profile = function (req, res) {

    User.findById(req.user.id, function (err, user) {
        return res.render('user_profile', {
            title: 'User Profile',
            page_name : 'profile',
            profile_user: user
        });
    });


}

module.exports.update = function (req, res) {
    if (req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
            return res.redirect('back');
        });
    } else {
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signup = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect(`/users/profile`);
    }

    return res.render('signup', {
        title: 'sign-up',
        page_name : "signup",
    })
}

module.exports.signin = function (req, res) {
    // console.log("logged in");
    if (req.isAuthenticated()) {
        return res.redirect(`/users/profile`);
    }
    return res.render('signin', {
        title: 'sign-in',
        page_name : 'signin'
    })
}

module.exports.create = async function (req, res) {
    // console.log(req.body);
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    // console.log(req.body);
    try{
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            await User.create(req.body)
            return res.redirect('/users/signin');
        } else {
            return res.redirect('back');
        }
    }catch(err){
        console.log('ERROR!!',err);
    }
    

}

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success','Logged In Successfully!')
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success','You have Logged Out!');
    res.redirect('/users/signin');
}