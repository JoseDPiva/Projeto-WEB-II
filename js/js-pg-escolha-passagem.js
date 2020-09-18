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

class Voucher {
    constructor(partida, destino, passagemA, passagemC, passagemB, dataPartida, dataVolta, preco) {
        this.partida = partida;
        this.destino = destino;
        this.passagemA = passagemA;
        this.passagemC = passagemC;
        this.passagemB = passagemB;
        this.dataPartida = dataPartida;
        this.dataVolta = dataVolta;
        this.preco = preco;
    }
}

let listaVoucher = [];

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

function calculaPrecoPassagem() {
    let d = $('inputLocalDestino').value;
    let n = d.indexOf(',');
    let destinoNome = d.substring(0, n);
    let subtotal = $('precoSubTotal');
    let qtdAdulto = parseFloat($('inputQuantidadeAdulto').value);
    let qtdCriancas = parseFloat($('inputQuantidadeCriancas').value);
    let qtdBebes = parseFloat($('inputQuantidadeBebes').value);
    let destino;

    for (let i = 0; i < listaDestinos.length; i++) {
        if (listaDestinos[i].nome.startsWith(destinoNome)) {
            destino = listaDestinos[i];
        }
    }

    if (isNaN(qtdAdulto)) {
        qtdAdulto = 0;
    } else if (isNaN(qtdBebes)) {
        qtdBebes = 0;
    } else if (isNaN(qtdCriancas)) {
        qtdCriancas = 0;
    }

    if ($('inputIdaEVolta').checked) {
        subtotal.value = destino.preco * ((qtdCriancas + qtdBebes + qtdAdulto) * 2);
    } else if ((qtdCriancas + qtdBebes + qtdAdulto) == 0) {
        subtotal.value = 0;
    } else {
        subtotal.value = destino.preco * (qtdCriancas + qtdBebes + qtdAdulto);
    }
}

function selecionarPassagem() {
    let qtdAdulto = parseFloat($('inputQuantidadeAdulto').value);
    let qtdCriancas = parseFloat($('inputQuantidadeCriancas').value);
    let qtdBebes = parseFloat($('inputQuantidadeBebes').value);
    let qtdTotal = qtdAdulto + qtdBebes + qtdCriancas;
    let destino = $('inputLocalDestino').value;
    let partida = $('inputLocalPartida').value;
    let dataPartida = $('inputDataPartida').value;
    let dataVolta = $('inputDataVolta').value;
    let preco = $('precoSubTotal').value;

    if (destino == '' || partida == '') {
        alert('Por favor preencha o local de destino e de partida.');
        return false;
    } else if ($('inputIda').checked) {
        if ($('inputDataPartida').value == '') {
            alert('Por favor seleciona  uma data de partida.');
            return false;
        }
    } else if ($('inputIdaEVolta').checked) {
        if ($('inputDataPartida').value == '' || $('inputDataVolta').value == '') {
            alert('Por favor selecione datas de partida e de volta.');
            return false;
        }
    }

    if (qtdAdulto == 0) {
        alert('Por favor, selecione pelo menos uma passagem para adulto.');
        return false;
    } else if (qtdTotal == 1) {
        let c = confirm(`Passagem selecionada:
        \nLocal de partida: ${partida}.
        \nLocal de destino: ${destino}.
        \nPassagem para adulto: ${qtdAdulto}.
        \nGostaria de confirmar a seleção da passagem?`);

        if (c) {
            alert('Passagem selecionada com sucesso!\nPassagem para adulto: ' + qtdAdulto);
            listaVoucher.push(new Voucher(partida, destino, qtdAdulto, qtdCriancas, qtdBebes, dataPartida, dataVolta, preco));
        }
    } else if (qtdAdulto > 0) {
        let c = confirm(`Passagens selecionadas:
            \nLocal de partida: ${partida}.
            \nLocal de destino: ${destino}.
            \nPassagem(s) para adulto(s): ${qtdAdulto}.
            \nPassagem(s) para criança(s): ${qtdCriancas}.
            \nPassagem(s) para bebe(s): ${qtdBebes};
            \nGostaria de confirmar a seleção das passagens?`);

        if (c) {
            alert(`Passagens selecionadas com sucesso!
            \nPassagem(s) para adulto(s): ${qtdAdulto}.
            \nPassagem(s) para criança(s): ${qtdCriancas}.
            \nPassagem(s) para bebe(s): ${qtdBebes};`);
            listaVoucher.push(new Voucher(partida, destino, qtdAdulto, qtdCriancas, qtdBebes, dataPartida, dataVolta, preco));
        }
    }

    return false;
}

function corrigeValor() {
    $('inputQuantidadeAdulto').value = 0;
}

function finalizarCompra() {
    document.location = 'pagina-pagamento.html';
}

window.addEventListener("load", function () {
    $('inputLocalPartida').onkeyup = procuraLocalPartida;
    $('inputLocalDestino').onkeyup = procuraLocalDestino;
    $('div-sugestao-partida').onclick = selecionaLocalPartida;
    $('div-sugestao-destino').onclick = selecionaLocalDestino;
    $('div-quantidade-passagens').onchange = calculaPrecoPassagem;
    $('inputSelecionarPassagem').onclick = selecionarPassagem;
    $('inputIda').addEventListener('change', corrigeValor);
    $('inputIdaEVolta').addEventListener('change', corrigeValor);
});