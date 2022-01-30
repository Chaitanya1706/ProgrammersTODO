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
        Question.find({ "name": { "$regex": search, "$options": "i" }, userid: req.user.id })
            .sort({ 'deadline': 'asc' })
            .exec(
                function (err, data) {
                    if (err) {
                        res.send("500 Internal Error")
                    }
                    return res.render('list', {
                        title: search + '| search',
                        search: search,
                        page_name: 'search',
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
    const options = { sort: { 'deadline': 'asc' } }

    const filterd = await User.findById(req.user.id)
        .populate({
            path: status,
            options
        }).select("-password")

    return res.render('list', {
        title: status + " Question",
        page_name: 'filter',
        questions: filterd[status],
        moment: moment
    })
}