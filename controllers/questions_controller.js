const Question = require('../models/question');

module.exports.addQuestion = function(req,res){
    res.render('add_question',{
        title : 'Add Question'
    })
}

module.exports.todo = function(req,res){
    res.render('todo',{
        title : 'TODO'
    })
}

module.exports.create = function(req,res){
    // console.log(req.body);
    Question.create(req.body,function(err,question){
        if(err){
            console.log('error in adding question',err);
            return;
        }
        return res.redirect('/questions/view');
    })
}

module.exports.viewList = function(req,res){
    Question.find({},function(err,questions){
        if(err){
            console.log('error in finding questions',err);
            return;
        }
        return res.render('list',{
            title : 'List',
            questions : questions
        })
    })
}