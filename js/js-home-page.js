let $ = function (id) {
    return document.getElementById(id);
}

let listaDestinos = [{
        nome: 'Paris',
        pais: 'França',
        preco: 2000
    },
    {
        nome: 'Salvador',
        pais: 'Brasil',
        preco: 1000
    },
    {
        nome: 'Cairo',
        pais: 'Egito',
        preco: 1500
    },
    {
        nome: 'Orlando',
        pais: 'EUA',
        preco: 2000
    },
    {
        nome: 'Madri',
        pais: 'Espanha',
        preco: 1750
    },
    {
        nome: 'Fernando de Noronha',
        pais: 'Brasil',
        preco: 1500
    },
    {
        nome: 'Rio de Janeiro',
        pais: 'Brasil',
        preco: 750
    },
    {
        nome: 'Florianópolis',
        pais: 'Brasil',
        preco: 1000
    },
    {
        nome: 'São Paulo',
        pais: 'Brasil',
        preco: 750
    },
    {
        nome: 'Berlim',
        pais: 'Alemanha',
        preco: 2250
    },
    {
        nome: 'Lisboa',
        pais: 'Portugal',
        preco: 1750
    },
    {
        nome: 'Manágua',
        pais: 'Nicarágua',
        preco: 1250
    },
    {
        nome: 'Cidade do Cabo',
        pais: 'África do Sul',
        preco: 2000
    },
    {
        nome: 'Monte Tavan Bogd',
        pais: 'Mongólia',
        preco: 2500
    }
];

function procuraLocalPartida() {
    let input = $('localpartida').value;
    let div = $('div-sugestao-partida-home');
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
    $('localpartida').value = $('div-sugestao-partida-home').innerHTML;
    if ($('localpartida').value == $('div-sugestao-partida-home').innerHTML) {
        $('div-sugestao-partida-home').style.display = "none";
    }
}

function procuraLocalDestino() {
    let input = $('localdestino').value;
    let div = $('div-sugestao-destino-home');
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

let selecionaLocalDestino = function () {
    $('localdestino').value = $('div-sugestao-destino-home').innerHTML;

    if ($('localdestino').value == $('div-sugestao-destino-home').innerHTML) {
        $('div-sugestao-destino-home').style.display = "none";
    }
}

function promptLocal() {
    let localPartida = prompt("De que cidade você partirá?");

    $('localpartida').value = localPartida;
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

function validaEntrada(event) {
    let code = event.charCode;

    if ((code < 97 || code > 122) && (code < 65 || code > 90)) {
        event.preventDefault();
    }

    return false;
}

function validaLocais() {
    if ($('localpartida').value == $('localdestino').value) {
        alert("Por favor escolha locais de partida e destino diferentes.");
        return false;
    } else if ($('localpartida').value == '' || $('localdestino').value == '') {
        alert("Por favor preencha o local de partida e de destino.");
        return false;
    } else {
        return true;
    }
}

window.onload = function () {
    //setTimeout(promptLocal, 3000);
    document.querySelector('img').addEventListener('mouseover', realsaImagens);
    $('localpartida').addEventListener('keypress', validaEntrada);
    $('localdestino').addEventListener('keypress', validaEntrada);
    $('localpartida').onkeyup = procuraLocalPartida;
    $('localdestino').onkeyup = procuraLocalDestino;
    $('div-sugestao-partida-home').onclick = selecionaLocalPartida;
    $('div-sugestao-destino-home').onclick = selecionaLocalDestino;
    $('btn-escolha-destino').onclick = validaLocais;
}