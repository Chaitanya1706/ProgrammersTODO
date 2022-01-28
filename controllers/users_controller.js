const User = require('../models/user');
const Profile = require('../models/profile');

const { cloudinary } = require('../cloudinary/index');

module.exports.profile = function (req, res) {

    User.findById(req.user.id, function (err, user) {
        return res.render('user_profile', {
            title: 'User Profile',
            page_name: 'profile',
            profile_user: user
        });
    });
}

// module.exports.edit = async function(req,res){

//     try{
//         const user = await User.findById(req.params.id)
//         .populate('profile');

//         return res.render('user_edit',{
//             user : user
//         })

//     }catch(err){

//     }
// }

module.exports.update = async function (req, res) {

    try {

        const userprofile = await Profile.findById(req.user.profile);
        if (req.file) {
            if (userprofile.img?.filepath?.length > 0) {
                await cloudinary.uploader.destroy(userprofile.img.filename);
            }
            userprofile.img.filepath = req.file.path;
            userprofile.img.filename = req.file.filename
        }
        userprofile.education = req.body.education
        userprofile.bio = req.body.bio
        userprofile.website = req.body.website
        userprofile.save()


        req.flash('success', 'Profile Updated Successfully!!')

        return res.redirect('/');
    } catch (err) {
        console.log(err);
        req.flash('error', err);
        res.redirect('back')
    }

}

module.exports.signup = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect(`/`);
    }

    return res.render('signup', {
        title: 'sign-up',
        page_name: "signup",
    })
}

module.exports.signin = function (req, res) {
    // console.log("logged in");
    // console.log(req.body);
    if (req.isAuthenticated()) {
        return res.redirect(`/`);
    }
    return res.render('signin', {
        title: 'sign-in',
        page_name: 'signin'
    })
}

module.exports.create = async function (req, res) {
    // console.log(req.body);
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Password Mismatch')
        return res.redirect('back');
    }
    // console.log(req.body);
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            const user = await User.create(req.body)

            const profile = await Profile.create({
                user: user.id,
                education: req.body.education
            })

            user.profile = profile._id;
            // console.log("User***",user);
            // console.log("Prof***",profile);

            req.flash('success', 'SignUp Successfully!')

            user.save();

            return res.redirect('/users/signin');
        } else {
            req.flash('error', 'User already exist!')
            return res.redirect('back');
        }
    } catch (err) {
        console.log('ERROR!!', err);
    }


}

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged In Successfully!')
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success', 'You have Logged Out!');
    res.redirect('/users/signin');
}