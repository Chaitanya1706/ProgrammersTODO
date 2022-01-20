const { profile } = require('console');
const User = require('../models/user')

module.exports.home = async function (req, res) {
    // return res.render('user_profile',{
    //     title : 'ProgrammersTODO'
    // })

    // var userIP = req.connection.remoteAddress;
    // console.log(userIP + " connected to the site.");


    if (!req.user) {
        return res.redirect('/users/signin');
    }
    else {
        
        const user = await User.findById(req.user.id)
        .populate('questions').select("-password")
        // console.log("*******////****",user);
        return res.render('user_profile', {
            title: 'Home',
            page_name: 'profile',
            profile_user: user,
        })
    }

}

module.exports.about = function(req,res){
    return res.send("<h1>ABOUT</h1>")
}