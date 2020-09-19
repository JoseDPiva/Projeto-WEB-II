let $ = function (id) {
    return document.getElementById(id);
}

let realsaImagens = function () {
    let x = document.getElementsByTagName('img');

    for (let i = 0; i < x.length; i++) {
        x[i].addEventListener('mouseover', function () {
            x[i].setAttribute('style', 'border: 2px solid  rgb(22, 47, 160);');
        });

        x[i].addEventListener('mouseout', function () {
            x[i].setAttribute('style', 'border: hidden;');
        })
    }
}

function validaLocalPartida(event) {
    let code = event.charCode;

    if ((code < 97 || code > 122) && (code < 65 || code > 90)) {
        event.preventDefault();
    }

    return false;
}

window.addEventListener('load', function () {
    document.querySelector('img').addEventListener('mouseover', realsaImagens);
    document.querySelector('#localpartida').addEventListener('keypress', validaLocalPartida);
})