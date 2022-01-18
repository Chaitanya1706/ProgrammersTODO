(function () {


    function format(newDate) {
        var day = ("0" + newDate.getDate()).slice(-2);
        var month = ("0" + (newDate.getMonth() + 1)).slice(-2);
        var formatDate = newDate.getFullYear() + "-" + (month) + "-" + (day);
        return formatDate
    }

    let dateEle = document.getElementById("deadline")
    let deadline = dateEle.getAttribute("value")


    var date = new Date(deadline);
    document.getElementById("deadline").value = format(date)



})()