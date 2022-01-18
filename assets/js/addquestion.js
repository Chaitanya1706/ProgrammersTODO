(function () {


    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    var date = new Date();
    var newDate = date.addDays(20)

    var day = ("0" + newDate.getDate()).slice(-2);
    var month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    var formatDate = newDate.getFullYear() + "-" + (month) + "-" + (day);

    document.getElementById("deadline").value = formatDate
    console.log(formatDate);


    let description = document.getElementById("desc")
    description.addEventListener("focus", function () {

        description.setAttribute("rows", 5)

    })


})()