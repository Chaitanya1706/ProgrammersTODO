const Question = require('../models/question');
const User = require('../models/user');

module.exports.addQuestion = function (req, res) {
    res.render('add_question', {
        title: 'Add Question',
        page_name: 'add_ques'
    })
}

module.exports.todo = async function (req, res) {

    if (req.query.q === 'randompick') {
        let qpick = await pickRandom()
        res.render('todo', {
            title: 'TODO',
            page_name: 'todo',
            todo: qpick
        })
    }
    else {
        var now = new Date();
        const todo = await Question.find({
            deadline: { $lte: new Date(now) },
            status: { $in: ["RETRY", "UNSOLVED"] }
        })


        res.render('todo', {
            title: 'TODO',
            page_name: 'todo',
            todo: todo
        })
    }
}

async function pickRandom(req, res) {

    const questions = await Question.find({
        status: { $in: ["SOLVED"] }
    })
    randomPick = questions.sort(() => Math.random() - Math.random()).slice(0, 2)

    return randomPick;

}
module.exports.markdone = async function (req, res) {

    const marktodo = req.body;
    console.log(marktodo);

    const updateres = await Question.updateMany(
        {
            _id: {
                $in: marktodo.mark
            }
        },
        { $set: { status: "SOLVED" } }
        , { multi: true }

    )
    console.log(updateres);
    return res.redirect('/questions/todo');

}
module.exports.create = async function (req, res) {
    // console.log(req.body);
    try {
        const question = await Question.create(req.body)

        const user = await User.findById(req.user.id);

        user.questions.push(question.id);
        user.save();
        return res.redirect('/questions/view');

    } catch (err) {
        console.log('Error!!', err);
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
            questions: user.questions
        })
    } catch (err) {
        console.log('error!', err);
    }

}

module.exports.destroy = async function (req, res) {
    try {
        let ques = await Question.findById(req.params.id);
        ques.remove();
        return res.redirect('back');
    } catch (err) {
        console.log('Error', err);
    }
}