{
    let updateQuestion = function(){
        let updateQuestionForm = $('#update-question-form');

        updateQuestionForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : $(updateQuestionForm).prop('action'),
                data : updateQuestionForm.serialize(),
                success : function(data){
                    $('#clear')[0].click();
                    new Noty({
                        theme: 'relax',
                        text: "Question Updated",
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

    updateQuestion();
}