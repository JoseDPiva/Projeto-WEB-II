'use strict';

let $$ = function (id) {
    return document.getElementById(id);
};

//Lista com destinos disponíveis
let listaDestinos = [{
        nome: 'Paris',
        pais: 'França',
        preco: 2000,
        nomeHotel: 'Rose Bourbon',
        precoHotel: 600
    },
    {
        nome: 'Salvador',
        pais: 'Brasil',
        preco: 1000,
        nomeHotel: 'Alah Mar',
        precoHotel: 200
    },
    {
        nome: 'Cairo',
        pais: 'Egito',
        preco: 1500,
        nomeHotel: 'Ramses Hilton',
        precoHotel: 400
    },
    {
        nome: 'Orlando',
        pais: 'EUA',
        preco: 2000,
        nomeHotel: 'Crowne Plaza Orlando',
        precoHotel: 450
    },
    {
        nome: 'Madri',
        pais: 'Espanha',
        preco: 1750,
        nomeHotel: 'Avenida Gran Via',
        precoHotel: 250
    },
    {
        nome: 'Fernando de Noronha',
        pais: 'Brasil',
        preco: 1500,
        nomeHotel: 'Tesouro de Noronha',
        precoHotel: 900
    },
    {
        nome: 'Rio de Janeiro',
        pais: 'Brasil',
        preco: 750,
        nomeHotel: 'Atlantis Copacabana',
        precoHotel: 120
    },
    {
        nome: 'Florianópolis',
        pais: 'Brasil',
        preco: 1000,
        nomeHotel: 'Majestic Palace',
        precoHotel: 200
    },
    {
        nome: 'São Paulo',
        pais: 'Brasil',
        preco: 750,
        nomeHotel: 'Paulista Center',
        precoHotel: 100
    },
    {
        nome: 'Berlim',
        pais: 'Alemanha',
        preco: 2250,
        nomeHotel: 'Meininger',
        precoHotel: 150
    },
    {
        nome: 'Lisboa',
        pais: 'Portugal',
        preco: 1750,
        nomeHotel: 'Lisboa',
        precoHotel: 400
    },
    {
        nome: 'Manágua',
        pais: 'Nicarágua',
        preco: 1250,
        nomeHotel: 'Mozonte',
        precoHotel: 150
    },
    {
        nome: 'Cidade do Cabo',
        pais: 'África do Sul',
        preco: 2000,
        nomeHotel: 'Radisson Blu',
        precoHotel: 550
    },
    {
        nome: 'Monte Tavan Bogd',
        pais: 'Mongólia',
        preco: 2500,
        nomeHotel: 'Hemu',
        precoHotel: 500
    }
];

//Classe de criação do voucher de passagem
class VoucherPassagem {
    constructor(partida, destino, passagemA, passagemC, passagemB,
        dataPartida, dataVolta, preco, idaEVolta) {
        this.partida = partida;
        this.destino = destino;
        this.passagemA = passagemA;
        this.passagemC = passagemC;
        this.passagemB = passagemB;
        this.dataPartida = dataPartida;
        this.dataVolta = dataVolta;
        this.preco = preco;
        this.idaEVolta = idaEVolta;
    }
}

//Classe de criação do voucher de hotel
class VoucherHotel {
    constructor(nomeHotel, dataCheckIn, dataCheckOut, precoHotel) {
        this.nomeHotel = nomeHotel;
        this.dataCheckIn = dataCheckIn;
        this.dataCheckOut = dataCheckOut;
        this.precoHotel = precoHotel;
    }
}

//Função de procura e sugestão de local de partida
function procuraLocalPartida() {
    let input = $$('inputLocalPartida').value;
    let div = $$('div-sugestao-partida');
    div.innerHTML = '';

    for (let i = 0; i < listaDestinos.length; i++) {
        if (listaDestinos[i].nome.toUpperCase().startsWith(input.toUpperCase())) {
            div.innerHTML = listaDestinos[i].nome + ', ' + listaDestinos[i].pais;
            div.style.display = 'block';
        }
    }

    if (input === '') {
        div.innerHTML = '';
    }
}

function selecionaLocalPartida() {
    $$('inputLocalPartida').value = $$('div-sugestao-partida').innerHTML;
    if ($$('inputLocalPartida').value === $$('div-sugestao-partida').innerHTML) {
        $$('div-sugestao-partida').style.display = 'none';
    }
}

//Função de procura e sugestão de local de destino
function procuraLocalDestino() {
    let input = $$('inputLocalDestino').value;
    let div = $$('div-sugestao-destino');
    div.innerHTML = '';

    for (let i = 0; i < listaDestinos.length; i++) {
        if (listaDestinos[i].nome.toUpperCase().startsWith(input.toUpperCase())) {
            div.innerHTML = listaDestinos[i].nome + ', ' + listaDestinos[i].pais;
            div.style.display = 'block';
        }
    }

    if (input === '') {
        div.innerHTML = '';
    }
}

let selecionaLocalDestino = function () {
    $$('inputLocalDestino').value = $$('div-sugestao-destino').innerHTML;

    if ($$('inputLocalDestino').value === $$('div-sugestao-destino').innerHTML) {
        $$('div-sugestao-destino').style.display = 'none';
    }
};

//Determina a data atual como a menor possível para escolha de passagem
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

    let dataHoje = ano + '-' + mes + '-' + dia;
    $$('inputDataPartida').setAttribute('min', dataHoje);
    $$('inputDataVolta').setAttribute('min', dataHoje);
    $$('dataCheckIn').setAttribute('min', dataHoje);
    $$('dataCheckOut').setAttribute('min', dataHoje);
}

//Retorna o objeto do destino a partir do nome completo
let procuraDestino = function (d) {
    d = d.value;
    let n = d.indexOf(',');
    let destinoNome = d.substring(0, n);
    let destino;

    for (let i in listaDestinos) {
        if (listaDestinos[i].nome.startsWith(destinoNome)) {
            destino = listaDestinos[i];
        }
    }

    return destino;
};

function calculaPrecoPassagem() {
    let qtdAdulto = parseFloat($$('inputQuantidadeAdulto').value);
    let qtdCriancas = parseFloat($$('inputQuantidadeCriancas').value);
    let qtdBebes = parseFloat($$('inputQuantidadeBebes').value);
    let destino = procuraDestino($$('inputLocalDestino'));

    if (isNaN(qtdAdulto)) {
        qtdAdulto = 0;
    } else if (isNaN(qtdBebes)) {
        qtdBebes = 0;
    } else if (isNaN(qtdCriancas)) {
        qtdCriancas = 0;
    }

    (function () {
        let subtotal = $$('precoSubTotal');
        if ($$('inputIdaEVolta').checked) {
            subtotal.value = destino.preco * ((qtdCriancas + qtdBebes + qtdAdulto) * 2);
        } else if ((qtdCriancas + qtdBebes + qtdAdulto) === 0) {
            subtotal.value = 0;
        } else {
            subtotal.value = destino.preco * (qtdCriancas + qtdBebes + qtdAdulto);
        }
    })();
}

//Itera pela lista de destino procurando o input digitado no local de partida
function checarDisponibilidadePartida() {
    let partida = $$('inputLocalPartida').value;

    for (let i in listaDestinos) {
        if (partida === (listaDestinos[i].nome + ', ' + listaDestinos[i].pais)) {
            return true;
        }
    }

    return false;
}

//Itera pela lista de destino procurando o input digitado no local de destino
function checarDisponibilidadeDestino() {
    let destino = $$('inputLocalDestino').value;

    for (let i in listaDestinos) {
        if (destino === (listaDestinos[i].nome + ', ' + listaDestinos[i].pais)) {
            return true;
        }
    }

    return false;
}

function selecionarPassagem() {
    let qtdAdulto = parseFloat($$('inputQuantidadeAdulto').value);
    let qtdCriancas = parseFloat($$('inputQuantidadeCriancas').value);
    let qtdBebes = parseFloat($$('inputQuantidadeBebes').value);
    let qtdTotal = qtdAdulto + qtdBebes + qtdCriancas;
    let destino = $$('inputLocalDestino').value;
    let partida = $$('inputLocalPartida').value;
    let dataPartida = $$('inputDataPartida').value;
    let dataVolta = $$('inputDataVolta').value;
    let idaEVolta = $$('inputIdaEVolta').checked;
    let preco = $$('precoSubTotal').value;
    let idaOuVolta = document.getElementsByName('idaOuVolta');

    //valida os locais de partida e destino e datas de partida e volta
    if (destino === '' || partida === '') {
        window.alert('Por favor preencha o local de destino e de partida.');
        return false;
    } else if (!checarDisponibilidadeDestino()) {
        window.alert('Desculpa, nós não oferecemos passagem para o destino digitado.');
        return false;
    } else if (!checarDisponibilidadePartida()) {
        window.alert('Desculpa, nós não oferecemos passagem para o local de partida digitado.');
        return false;
    } else if (idaOuVolta[0].checked) {
        if ($$('inputDataPartida').value === '') {
            window.alert('Por favor seleciona  uma data de partida.');
            return false;
        }
    } else if (idaOuVolta[1].checked) {
        if ($$('inputDataPartida').value === '' || $$('inputDataVolta').value === '') {
            window.alert('Por favor selecione datas de partida e de volta.');
            return false;
        }
    }

    if (qtdAdulto === 0) {
        window.alert('Por favor, selecione pelo menos uma passagem para adulto.');
        return false;
    } else if (partida === destino) {
        window.alert('Os locais de partida e destino precisam ser diferentes.');
        return false;
    } else if (qtdTotal === 1) {
        //Mensagem de confirmação da seleção de passagem
        let c = window.confirm(`Passagem selecionada:
        \nLocal de partida: ${partida}.
        \nLocal de destino: ${destino}.
        \nPassagem para adulto: ${qtdAdulto}.
        \nGostaria de confirmar a seleção da passagem?`);

        if (c) {
            //Cria o voucher de passagem e guarda na sessionStorage
            window.alert('Passagem selecionada com sucesso!\nPassagem para adulto: ' + qtdAdulto);
            let voucherPassagem = new VoucherPassagem(partida, destino, qtdAdulto, qtdCriancas,
                qtdBebes, dataPartida, dataVolta, preco, idaEVolta);
            sessionStorage.setItem('voucherPassagem', JSON.stringify(voucherPassagem));
        }
    } else if (qtdAdulto > 0) {
        let c = window.confirm(`Passagens selecionadas:
            \nLocal de partida: ${partida}.
            \nLocal de destino: ${destino}.
            \nPassagem(s) para adulto(s): ${qtdAdulto}.
            \nPassagem(s) para criança(s): ${qtdCriancas}.
            \nPassagem(s) para bebe(s): ${qtdBebes};
            \nGostaria de confirmar a seleção das passagens?`);

        if (c) {
            window.alert(`Passagens selecionadas com sucesso!
            \nPassagem(s) para adulto(s): ${qtdAdulto}.
            \nPassagem(s) para criança(s): ${qtdCriancas}.
            \nPassagem(s) para bebe(s): ${qtdBebes};`);
            let voucherPassagem = new VoucherPassagem(partida, destino, qtdAdulto, qtdCriancas,
                qtdBebes, dataPartida, dataVolta, preco, idaEVolta);
            sessionStorage.setItem('voucherPassagem', JSON.stringify(voucherPassagem));
        }
    }

    return false;
}

//Exibe um relógio com o horário de Brasília dentro do form de seleção de passagem
function relogio() {
    let data = new Date();
    let hora = data.getHours();
    let minuto = data.getMinutes();
    let segundo = data.getSeconds();

    function defineHorario() {
        let horario = '';

        if (hora < 10) {
            hora = '0' + hora;
        } else if (minuto < 10) {
            minuto = '0' + minuto;
        } else if (segundo < 10) {
            segundo = '0' + segundo;
        }

        horario = hora + ':' + minuto + ':' + segundo;

        return horario;
    }

    $$('divRelogio').innerHTML = 'Horário de Brasília: ' + defineHorario();
}

//Verifica que só letras sejam digitadas nos locais de destino e partida
function validaEntrada(event) {
    let code = event.charCode;

    if ((code < 97 || code > 122) && (code < 65 || code > 90)) {
        event.preventDefault();
    }

    return false;
}

//Pega a informação do URL passada pelo form da home page e insere no form
//de escolha de passagem
function homePageFormHandler() {
    let URLSearchParams = window.URLSearchParams;
    let results = new URLSearchParams(window.location.search);
    let inputs = [$$('inputLocalPartida'), $$('inputLocalDestino')];
    let cont = 0;

    if (results != null) {
        results.forEach((value) => {
            inputs[cont].value = value;
            cont++;
        });
    }
}

//Calcula a quantidade de quartos de hotel a partir da quantidade de passagens
function calculaQuantidadeQuartos() {
    let qtdPessoas = parseFloat($$('inputQuantidadeAdulto').value) +
        parseFloat($$('inputQuantidadeCriancas').value) +
        parseFloat($$('inputQuantidadeBebes').value);
    let inputQtdQuartos = $$('inputQuartoHotel');
    let resto;

    if (qtdPessoas === 1) {
        inputQtdQuartos.value = `1 Quarto, 1 Pessoa`;
    } else if (qtdPessoas > 1) {
        resto = qtdPessoas % 2;
        inputQtdQuartos.value = `${((qtdPessoas-resto)/2)+resto} Quartos, ${qtdPessoas} Pessoas`;
    }
}

//Preenche o nome do hotel baseado no local de destino selecionado
function preencheFormHotel() {
    let destino = procuraDestino($$('inputLocalDestino'));
    $$('inputDestinoHotel').value = `Hotel ${destino.nomeHotel}, ${destino.nome}`;

    calculaQuantidadeQuartos();
}

//Calcula quantos dias o hospede ficará no hotel e o preço total
function calculaPrecoEstadiaHotelEValidaDataEstadia() {
    let destino = procuraDestino($$('inputLocalDestino'));
    let qtdPessoas = parseFloat($$('inputQuantidadeAdulto').value) +
        parseFloat($$('inputQuantidadeCriancas').value) +
        parseFloat($$('inputQuantidadeBebes').value);
    let dataCheckIn = new Date($$('dataCheckIn').value);
    let dataCheckOut = new Date($$('dataCheckOut').value);
    let difMil = dataCheckOut.getTime() - dataCheckIn.getTime();
    let qtdDias = difMil / (1000 * 3600 * 24);
    let precoEstadia = qtdPessoas * qtdDias * destino.precoHotel;
    let checkInDate = new Date($$('dataCheckIn').value);
    let tempoCheckIn = checkInDate.getTime();
    let checkOutDate = new Date($$('dataCheckOut').value);
    let tempoCheckOut = checkOutDate.getTime();

    if (!isNaN(precoEstadia)) {
        $$('precoHotel').value = precoEstadia;
    } else {
        $$('precoHotel').value = '';
    }

    if (tempoCheckIn === tempoCheckOut) {
        window.alert('Por favor, escolha datas de check-in e check-out diferentes.');
        $$('dataCheckOut').value = 'mm/dd/yyyy';
    } else if (tempoCheckOut < tempoCheckIn) {
        window.alert('A data de check-in precisa ser antes da data de check-out.');
        $$('dataCheckOut').value = 'mm/dd/yyyy';
    }
}

//Valida as datas da passagem para serem diferentes e
//para a data de volta ser maior que a data de saída
function validaDataPassagem() {
    let dataPartidaDate = new Date($$('inputDataPartida').value);
    let tempoPartida = dataPartidaDate.getTime();
    let dataVoltaDate = new Date($$('inputDataVolta').value);
    let tempoVolta = dataVoltaDate.getTime();

    if (tempoPartida === tempoVolta) {
        window.alert('Por favor, escolha datas de partida e volta diferentes.');
        $$('inputDataVolta').value = 'mm/dd/yyyy';
    } else if (tempoVolta < tempoPartida) {
        window.alert('A data de partida precisa ser antes da data de volta.');
        $$('inputDataVolta').value = 'mm/dd/yyyy';
    }
}

//Verifica se uma passagem foi selecionada e cria o voucher de Hotel
function validaHotel() {
    let nomeHotel = $$('inputDestinoHotel').value;
    let dataCheckIn = $$('dataCheckIn').value;
    let dataCheckOut = $$('dataCheckOut').value;
    let precoHotel = $$('precoHotel').value;
    let destino = procuraDestino($$('inputLocalDestino'));
    let precoQuarto = destino.precoHotel;
    let voucherP = sessionStorage.getItem('voucherPassagem');

    if (voucherP === null) {
        window.alert('É preciso selecionar uma passagem para selecionar a estadia.');
        return false;
    } else if($$('dataCheckIn').value === '' || $$('dataCheckOut').value === '') {
        window.alert('Por favor selecione datas de check-in e check-out.');
        return false;
    } else {
        let c = window.confirm(`Confirmar a seleção do Hotel?\n
        Hotel Selecionado: ${nomeHotel}.\n
        Preco por quarto: ${precoQuarto}.\n
        Preco total: R$${precoHotel}.\n
        Data de check-in: ${dataCheckIn}.\n
        Data de check-out: ${dataCheckOut}.`);

        if (c) {
            let voucherHotel = new VoucherHotel(nomeHotel, dataCheckIn, dataCheckOut, precoHotel);
            sessionStorage.setItem('voucherHotel', JSON.stringify(voucherHotel));
        }
        return false;
    }
}

//Verfica se uma passagem foi selecionada
function validaCompra(e) {
    let voucherP = sessionStorage.getItem('voucherPassagem');

    if (voucherP == null) {
        e.preventDefault();
    }
}

window.addEventListener('load', function () {
    $$('inputLocalPartida').onkeyup = procuraLocalPartida;
    $$('inputLocalDestino').onkeyup = procuraLocalDestino;
    document.querySelector('#div-sugestao-partida').onclick = selecionaLocalPartida;
    $$('div-sugestao-destino').onclick = selecionaLocalDestino;
    $$('div-quantidade-passagens').onchange = calculaPrecoPassagem;
    $$('inputSelecionarPassagem').onclick = selecionarPassagem;
    $$('inputIda').onchange = () => $$('inputQuantidadeAdulto').value = 0;
    $$('inputIdaEVolta').onchange = () => $$('inputQuantidadeAdulto').value = 0;
    $$('inputLocalDestino').onchange = () => $$('inputQuantidadeAdulto').value = 0;
    $$('inputLocalPartida').addEventListener('keypress', validaEntrada);
    $$('inputLocalDestino').addEventListener('keypress', validaEntrada);
    $$('inputSelecionarPassagem').onblur = preencheFormHotel;
    setInterval(relogio, 1000);
    $$('form-escolha-passagem').reset();
    $$('form-escolha-hotel').reset();
    $$('dataCheckOut').onchange = calculaPrecoEstadiaHotelEValidaDataEstadia;
    $$('dataCheckIn').onchange = calculaPrecoEstadiaHotelEValidaDataEstadia;
    $$('inputDataVolta').onchange = validaDataPassagem;
    $$('inputDataPartida').onchange = validaDataPassagem;
    $$('btn-comprar-hotel').onclick = validaHotel;
    $$('form-pagamento-final').onsubmit = validaCompra;
    homePageFormHandler();
});