const Question = require('../models/question');
const moment = require('moment');

// MyModel.find({$text: {$search: searchString}})
//        .skip(20)
//        .limit(10)
//        .exec(function(err, docs) { ... });



module.exports.search = async function (req, res) {
    const search = req.body.search;
    Question.find({ "name": { "$regex": search, "$options": "i" } }).exec(
        function (err, data) {
            console.log(data.length);


            return res.render('list', {
                title: 'List',
                page_name: 'questions',
                questions: data,
                moment: moment
            })
        }

    );

}
