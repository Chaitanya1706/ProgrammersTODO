{
    let addQuestion = function(){
        let newQuestionForm = $('#newQuestionForm');

        newQuestionForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/questions/create',
                data : newQuestionForm.serialize(),
                success : function(data){
                    $('#clear').click();
                    new Noty({
                        theme: 'relax',
                        text: "New Question Added",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    addQuestion();
}