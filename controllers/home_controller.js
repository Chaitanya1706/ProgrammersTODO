const User = require('../models/user')

module.exports.home = function(req,res){
    // return res.render('user_profile',{
    //     title : 'ProgrammersTODO'
    // })
    

    if(!req.user){
        return res.redirect('/users/signin');
    }
    else{
        // console.log(req.user);
        return res.render('user_profile',{
            title : 'Home',
            profile_user : req.user
        })
    }
    
}