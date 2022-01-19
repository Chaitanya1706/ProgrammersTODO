const Question = require('../models/question');
const moment = require('moment');
const User = require('../models/user');


// MyModel.find({$text: {$search: searchString}})
//        .skip(20)
//        .limit(10)
//        .exec(function(err, docs) { ... });



module.exports.search = async function (req, res) {
    try {
        const search = req.body.search;
        Question.find({ "name": { "$regex": search, "$options": "i" }, userid: req.user.id }).exec(
            function (err, data) {
                if (err) {
                    res.send("500 Internal Error")
                }
                return res.render('list', {
                    title: 'List',
                    page_name: 'questions',
                    questions: data || [],
                    moment: moment
                })
            }

        );
    } catch (err) {
        res.send("500 Internal Server Error")
    }

}

module.exports.returnstatusQuestion = async function (req, res) {
    const status = req.query.s

    let possiblestatus = ["unsolved", "solved", "retry"]

    if (!possiblestatus.includes(status)) {
        return res.redirect('back');
    }
    const filterd = await User.findById(req.user.id)
        .populate(status).select("-password")

    return res.render('list', {
        title: 'List',
        page_name: 'questions',
        questions: filterd[status],
        moment: moment
    })
}