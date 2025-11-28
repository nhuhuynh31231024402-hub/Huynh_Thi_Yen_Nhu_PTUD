var h = null;
var m = null;
var s = null;

var timeout = null;

function start() {
    if (h === null && m === null && s === null) {
        h = parseInt(document.getElementById("h_val").value, 10);
        m = parseInt(document.getElementById("m_val").value, 10);
        s = parseInt(document.getElementById("s_val").value, 10);

        if (isNaN(h)) h = 0;
        if (isNaN(m)) m = 0;
        if (isNaN(s)) s = 0;
    }

    if (s < 0) {
        s = 59;
        m--;
    }

    if (m < 0) {
        m = 59;
        h--;
    }

    if (h < 0) {
        clearTimeout(timeout);
        alert("Hết giờ!");
        h = m = s = null;
        return;
    }

    document.getElementById("h").innerHTML = h;
    document.getElementById("m").innerHTML = m;
    document.getElementById("s").innerHTML = s;

    s--;

    timeout = setTimeout(function () {
        start();
    }, 1000);
}

function stop() {
    clearTimeout(timeout);
    h = m = s = null;
}
