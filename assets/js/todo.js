
function openFullscreen() {
    if (!document.fullscreenElement) {
        document.getElementById('expand').style.display = "none";
        document.getElementById('compress').style.display = "block";
        document.documentElement.requestFullscreen();
    } else {

        if (document.exitFullscreen) {

            document.getElementById('expand').style.display = "block";
            document.getElementById('compress').style.display = "none";
            document.exitFullscreen();

        }

    }

}


