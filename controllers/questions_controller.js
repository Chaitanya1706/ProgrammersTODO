const Question = require('../models/question');
const User = require('../models/user');
const moment = require('moment');
//todo
module.exports.todo = async function (req, res) {

    if (req.query.q === 'randompick') {
        const user = await User.findById(req.user.id)
            .populate('questions')

        const randomPick = user.questions.sort(() => Math.random() - Math.random()).slice(0, Math.min(user.questions.length, 3));

        res.render('todo', {
            title: 'TODO',
            page_name: 'todo',
            todo: randomPick,
            moment: moment
        })
    }
    else {
        var now = new Date();
        const todo = await Question.find({
            deadline: { $lte: new Date(now) },
            status: { $in: ["RETRY", "UNSOLVED"] },
            userid: req.user.id
        })


        res.render('todo', {
            title: 'TODO',
            page_name: 'todo',
            todo: todo,
            moment: moment
        })
    }
}

module.exports.markdone = async function (req, res) {

    const marktodo = req.body;
    console.log(marktodo);

    marktodo.mark.map(async (id) => {
        const q = await Question.findById(id);
        console.log(q.status);
        if (q.status == 'SOLVED') {
            console.log("solve match");
            // await User.findByIdAndUpdate(req.user.id, { $pull: { solved: id }, $push: { solved: id } })
        }
        else if (q.status == 'UNSOLVED') {
            console.log("unsolved match");
            await User.findByIdAndUpdate(req.user.id, { $pull: { unsolved: id }, $push: { solved: id } })
        }
        else if (q.status == 'RETRY') {
            console.log("retry match");
            await User.findByIdAndUpdate(req.user.id, { $pull: { retry: id }, $push: { solved: id } })
        }

        q.status = "SOLVED";
        q.lastsolved = new Date();
        await q.save()

    })

    return res.redirect('back');

}

//questions CRUD

module.exports.addQuestion = function (req, res) {
    res.render('add_question', {
        title: 'Add Question',
        page_name: 'add_ques'
    })
}


module.exports.create = async function (req, res) {
    // console.log(req.body);
    try {
        req.body.userid = req.user._id
        console.log("request received");
        if (["SOLVED", "RETRY"].includes(req.body.status)) {
            req.body.lastsolved = new Date();
        }
        // console.log("date set", req.body);
        const question = await Question.create(req.body)

        const user = await User.findById(req.user.id);
        if (req.body.status == "SOLVED") {
            user.solved.push(question.id);
        }
        else if (req.body.status == "RETRY") {
            user.retry.push(question.id);
        }
        else {
            user.unsolved.push(question.id);
        }
        user.questions.push(question.id);

        // req.flash('success', 'New Question Added Successfully')
        // console.log(user);
        // console.log(question);

        user.save();

        if(req.xhr){
            return res.status(200).json({
                data : {
                    question : question
                },
                message : "Question Added"
            })
        }

        // req.flash('success', 'New Question Added Successfully')

        // return res.redirect('/questions/add');

    } catch (err) {
        req.flash('error', err);
    }


}

module.exports.viewList = async function (req, res) {
    try {
        // const question = await Question.find({})
        const user = await User.findById(req.user.id)
            .populate('questions').select("-password")

        return res.render('list', {
            title: 'List',
            page_name: 'questions',
            questions: user.questions,
            moment: moment
        })
    } catch (err) {
        console.log('error!', err);
    }

}

module.exports.destroy = async function (req, res) {
    try {
        let question = await Question.findById(req.params.id);
        question.remove();
        if (question.status == 'SOLVED') {
            await User.findByIdAndUpdate(req.user.id, { $pull: { questions: req.params.id, solved: req.params.id } })
        }
        else if (question.status == 'UNSOLVED') {
            await User.findByIdAndUpdate(req.user.id, { $pull: { questions: req.params.id, unsolved: req.params.id } })
        }
        else if (question.status == 'RETRY') {
            await User.findByIdAndUpdate(req.user.id, { $pull: { questions: req.params.id, retry: req.params.id } })
        }
        return res.redirect('back');
    } catch (err) {
        console.log('Error', err);
    }
}

module.exports.updateQuestion = async function (req, res) {

    try {
        // console.log(req);
        const ques = await Question.findById(req.params.id);
        // console.log(ques);
        return res.render('update', {
            title: 'Update Question',
            ques: ques
        })


    } catch (err) {
        console.log('ERROR!!', err);
    }
}

module.exports.update = async function (req, res) {
    try {   
        
        const question = await Question.findById(req.params.id);

            const user = await User.findById(req.user.id);

            if (question.status == 'SOLVED') {
                await User.findByIdAndUpdate(req.user.id, { $pull: { solved: req.params.id } })
            }
            else if (question.status == 'UNSOLVED') {
                await User.findByIdAndUpdate(req.user.id, { $pull: { unsolved: req.params.id } })
            }
            else if (question.status == 'RETRY') {
                await User.findByIdAndUpdate(req.user.id, { $pull: { retry: req.params.id } })
            }
            if (req.body.status == 'SOLVED') {
                user.solved.push(req.params.id);
            }
            else if (req.body.status == 'UNSOLVED') {
                user.unsolved.push(req.params.id);
            }
            else if (req.body.status == 'RETRY') {
                user.retry.push(req.params.id);
            }
            user.save();
            req.body.lastsolved = new Date()
    
        req.body.userid = req.user._id
        await Question.findByIdAndUpdate(req.params.id, req.body);

        if(req.xhr){
            
            return res.status(200).json({
                data : {
                    question : question
                },
                message : "Question Updated"
            })
        }

        req.flash('success', 'Question Updated Successfully');

        return res.redirect('/questions/view');
    } catch (err) {
        req.flash('error', err)
    }
}


// const marktodo = req.body;
// console.log(marktodo);
// const user = await User.findById(req.user.id);

// console.log(user);
// marktodo.mark.map(async (id) => {
//     const q = await Question.findById(id);
//     console.log(q.status);
//     if (q.status == 'SOLVED') {
//         user.solved = user.solved.remove(id)
//     }
//     else if (q.status == 'UNSOLVED') {
//         user.unsolved = user.unsolved.remove(id)
//     }
//     else if (q.status == 'RETRY') {
//         user.retry = user.retry.remove(id)
//     }
//     console.log(user);
//     user.solved.push(id);
//     console.log(user);
//     q.status = "SOLVED";
//     q.lastsolved = new Date();
//     await q.save()


// })

// await user.save()

// console.log(user);
// // const updateres = await Question.updateMany(
// //     {
// //         _id: {
// //             $in: marktodo.mark
// //         }
// //     },
// //     { $set: { status: "SOLVED", lastsolved: new Date() } }
// //     , { multi: true }

// // )
// // console.log(updateres);
// return res.redirect('/questions/todo');