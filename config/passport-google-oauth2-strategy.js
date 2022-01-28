const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const Profile = require('../models/profile');

//tell passport to use a new Strategy for google login
passport.use(new googleStrategy({
        clientID : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL : "http://localhost:8000/users/auth/google/callback"
    },

    async function(accessToken, refreshToken, profile, done){
        try{
            //find a user
            const user = await User.findOne({email: profile.emails[0].value});

            console.log("****",profile);

            if(user){
                // if found set this user as req.user
                return done(null,user);
            }
            else{
                // if not found, create the user and set it as req.user
                const newUser = await User.create({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }) 

                console.log("photo***",profile.photos[0].value)

                const prof = await Profile.create({
                    user: newUser.id,
                    'img.filepath': profile.photos[0].value
                })

                newUser.profile = prof._id;
                newUser.save();
                return done(null,newUser);
            }
        }catch(err){
            console.log('Error from Google OAuth', err);
            return;
        }
    }
))

module.exports = passport;
