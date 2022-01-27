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
        .populate('profile')

        console.log("*******////****",user);
        
        return res.render('user_profile', {
            title: 'Home',
            page_name: 'profile',
            profile_user: user,
        })
    }

}

module.exports.about = async function(req,res){
    try{
        return res.render('about',{
            title : 'About',
            page_name : 'about'
        })
    }catch(err){
        req.flash('error',err)
    }
}