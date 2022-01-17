const { profile } = require('console');
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
            page_name : 'profile',
            profile_user : req.user
        })
    }
    
}