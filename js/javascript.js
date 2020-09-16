let $ = function (id) {
    return document.getElementById(id);
}

let listaDestinos = [{
        nome: 'Paris',
        pais: 'França'
    },
    {
        nome: 'Salvador',
        pais: 'Brasil'
    },
    {
        nome: 'Cairo',
        pais: 'Egito'
    },
    {
        nome: 'Orlando',
        pais: 'EUA'
    }
];

function procuraLocalPartida() {
    let input = $('inputLocalPartida').value;
    let div = $('div-sugestao-partida');
    div.innerHTML = '';

    for (let i = 0; i < listaDestinos.length; i++) {
        if (listaDestinos[i].nome.toUpperCase().startsWith(input.toUpperCase())) {
            div.innerHTML = listaDestinos[i].nome + ", " + listaDestinos[i].pais;
            div.style.display = "block";
        }
    }

    if (input == '') {
        div.innerHTML = '';
    }
}

function selecionaLocalPartida() {
    $('inputLocalPartida').value = $('div-sugestao-partida').innerHTML;
    if ($('inputLocalPartida').value == $('div-sugestao-partida').innerHTML) {
        $('div-sugestao-partida').style.display = "none";
    }
}

function procuraLocalDestino() {
    let input = $('inputLocalDestino').value;
    let div = $('div-sugestao-destino');
    div.innerHTML = '';

    for (let i = 0; i < listaDestinos.length; i++) {
        if (listaDestinos[i].nome.toUpperCase().startsWith(input.toUpperCase())) {
            div.innerHTML = listaDestinos[i].nome + ", " + listaDestinos[i].pais;
            div.style.display = "block";
        }
    }

    if (input == '') {
        div.innerHTML = '';
    }
}

function selecionaLocalDestino() {
    $('inputLocalDestino').value = $('div-sugestao-destino').innerHTML;

    if ($('inputLocalDestino').value == $('div-sugestao-destino').innerHTML) {
        $('div-sugestao-destino').style.display = "none";
    }
}

function selecaoData() {
    let data = new Date();
    let dia = data.getDate();
    let mes = data.getMonth() + 1;
    let ano = data.getFullYear();

    if (dia < 10) {
        dia = '0' + dia;
    } else if (mes < 10) {
        mes = '0' + mes;
    }

    let dataHoje = ano + "-" + mes + "-" + dia;
    $('inputDataPartida').setAttribute('min', dataHoje);
    $('inputDataVolta').setAttribute('min', dataHoje);
};

window.addEventListener("load", function () {
    $('inputLocalPartida').onkeyup = procuraLocalPartida;
    $('inputLocalDestino').onkeyup = procuraLocalDestino;
    $('div-sugestao-partida').onclick = selecionaLocalPartida;
    $('div-sugestao-destino').onclick = selecionaLocalDestino;
    selecaoData();
});