'use strict';

const $$ = function retornaElementoPeloId(id) {
    return document.getElementById(id);
};

// Lista com destinos disponíveis
const listaDestinos = [{
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
const procuraLocalPartida = function procuraOLocalDePartidaESugereEmUmDiv() {
    const input = $$('inputLocalPartida').value;
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
};

const selecionaLocalPartida = function defineOValorDoInputDePartida() {
    $$('inputLocalPartida').value = $$('div-sugestao-partida').innerHTML;
    if ($$('inputLocalPartida').value === $$('div-sugestao-partida').innerHTML) {
        $$('div-sugestao-partida').style.display = 'none';
    }
};

//Função de procura e sugestão de local de destino
const procuraLocalDestino = function procuraOLocalDeDestinoESugereEmUmDiv() {
    const input = $$('inputLocalDestino').value;
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
};

const selecionaLocalDestino = function defineOValorDoInputDeDestino() {
    $$('inputLocalDestino').value = $$('div-sugestao-destino').innerHTML;

    if ($$('inputLocalDestino').value === $$('div-sugestao-destino').innerHTML) {
        $$('div-sugestao-destino').style.display = 'none';
    }
};

//Determina a data atual como a menor possível para escolha de passagem
const selecaoData = function defineADataDeViagemMinimaComoADataAtual() {
    const data = new Date();
    const ano = data.getFullYear();
    let dia = data.getDate();
    let mes = data.getMonth() + 1;

    if (dia < 10) {
        dia = '0' + dia;
    } else if (mes < 10) {
        mes = '0' + mes;
    }

    const dataHoje = ano + '-' + mes + '-' + dia;
    $$('inputDataPartida').setAttribute('min', dataHoje);
    $$('inputDataVolta').setAttribute('min', dataHoje);
    $$('dataCheckIn').setAttribute('min', dataHoje);
    $$('dataCheckOut').setAttribute('min', dataHoje);
};

//Retorna o objeto do destino a partir do nome completo
const procuraDestino = function retornaObjetoDestinoAPartirDoNome(d) {
    d = d.value;
    const n = d.indexOf(',');
    const destinoNome = d.substring(0, n);
    let destino;

    for (let i in listaDestinos) {
        if (listaDestinos[i].nome.startsWith(destinoNome)) {
            destino = listaDestinos[i];
        }
    }

    return destino;
};

const calculaPrecoPassagem = function calculaOPrecoDaPassagemEMostra() {
    const destino = procuraDestino($$('inputLocalDestino'));
    let qtdAdulto = parseFloat($$('inputQuantidadeAdulto').value);
    let qtdCriancas = parseFloat($$('inputQuantidadeCriancas').value);
    let qtdBebes = parseFloat($$('inputQuantidadeBebes').value);

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
    }());
};

//Itera pela lista de destino procurando o input digitado no local de partida
const checarDisponibilidadePartida = function () {
    const partida = $$('inputLocalPartida').value;

    for (let i in listaDestinos) {
        if (partida === (listaDestinos[i].nome + ', ' + listaDestinos[i].pais)) {
            return true;
        }
    }

    return false;
};

//Itera pela lista de destino procurando o input digitado no local de destino
const checarDisponibilidadeDestino = function () {
    const destino = $$('inputLocalDestino').value;

    for (let i in listaDestinos) {
        if (destino === (listaDestinos[i].nome + ', ' + listaDestinos[i].pais)) {
            return true;
        }
    }

    return false;
};

const selecionarPassagem = function validaLocalDePartidaEDestinoECriaVoucher() {
    const qtdAdulto = parseFloat($$('inputQuantidadeAdulto').value);
    const qtdCriancas = parseFloat($$('inputQuantidadeCriancas').value);
    const qtdBebes = parseFloat($$('inputQuantidadeBebes').value);
    const qtdTotal = qtdAdulto + qtdBebes + qtdCriancas;
    const destino = $$('inputLocalDestino').value;
    const partida = $$('inputLocalPartida').value;
    const dataPartida = $$('inputDataPartida').value;
    const dataVolta = $$('inputDataVolta').value;
    const idaEVolta = $$('inputIdaEVolta').checked;
    const preco = $$('precoSubTotal').value;
    const idaOuVolta = document.getElementsByName('idaOuVolta');

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
            /* Se o radio button de 'Ida' está checado mas a data de partida
            for vazia, alerta para selecionar uma data */
            window.alert('Por favor selecione uma data de partida.');
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
        const c = window.confirm(`Passagem selecionada:
        \nLocal de partida: ${partida}.
        \nLocal de destino: ${destino}.
        \nPassagem para adulto: ${qtdAdulto}.
        \nGostaria de confirmar a seleção da passagem?`);

        if (c) {
            //Cria o voucher de passagem e guarda na sessionStorage
            window.alert('Passagem selecionada com sucesso!\nPassagem para adulto: ' + qtdAdulto);
            const voucherPassagem = new VoucherPassagem(partida, destino, qtdAdulto, qtdCriancas,
                qtdBebes, dataPartida, dataVolta, preco, idaEVolta);
            sessionStorage.setItem('voucherPassagem', JSON.stringify(voucherPassagem));
        }
    } else if (qtdAdulto > 0) {
        const c = window.confirm(`Passagens selecionadas:
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
            const voucherPassagem = new VoucherPassagem(partida, destino, qtdAdulto, qtdCriancas,
                qtdBebes, dataPartida, dataVolta, preco, idaEVolta);
            sessionStorage.setItem('voucherPassagem', JSON.stringify(voucherPassagem));
        }
    }

    return false;
};

//Exibe um relógio com o horário de Brasília dentro do form de seleção de passagem
const relogio = function () {
    const data = new Date();
    let hora = data.getHours();
    let minuto = data.getMinutes();
    let segundo = data.getSeconds();

    const defineHorario = function () {
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
    };

    $$('divRelogio').innerHTML = 'Horário de Brasília: ' + defineHorario();
};

//Verifica que só letras sejam digitadas nos locais de destino e partida
const validaEntrada = function validaInputNaoNumerico(event) {
    const code = event.charCode;

    if ((code < 97 || code > 122) && (code < 65 || code > 90)) {
        event.preventDefault();
    }

    return false;
};

//Pega a informação do URL passada pelo form da home page e insere no form
//de escolha de passagem
const homePageFormHandler = function LeURLEDefineOLocalDePartidaEDestino() {
    const URLSearchParams = window.URLSearchParams;
    const results = new URLSearchParams(window.location.search);
    const inputs = [$$('inputLocalPartida'), $$('inputLocalDestino')];
    let cont = 0;

    if (results != null) {
        results.forEach((value) => {
            inputs[cont].value = value;
            cont++;
        });
    }
};

//Calcula a quantidade de quartos de hotel a partir da quantidade de passagens
const calculaQuantidadeQuartos = function () {
    const qtdPessoas = parseFloat($$('inputQuantidadeAdulto').value) +
        parseFloat($$('inputQuantidadeCriancas').value) +
        parseFloat($$('inputQuantidadeBebes').value);
    const inputQtdQuartos = $$('inputQuartoHotel');
    let resto;

    if (qtdPessoas === 1) {
        inputQtdQuartos.value = `1 Quarto, 1 Pessoa`;
    } else if (qtdPessoas > 1) {
        resto = qtdPessoas % 2;
        inputQtdQuartos.value = `${((qtdPessoas-resto)/2)+resto} Quartos, ${qtdPessoas} Pessoas`;
    }
};

//Preenche o nome do hotel baseado no local de destino selecionado
const preencheFormHotel = function () {
    const destino = procuraDestino($$('inputLocalDestino'));
    $$('inputDestinoHotel').value = `Hotel ${destino.nomeHotel}, ${destino.nome}`;

    calculaQuantidadeQuartos();
};

//Calcula quantos dias o hospede ficará no hotel e o preço total
const calculaPrecoHotel = function calculaPrecoEstadiaHotelEValidaDataEstadia() {
    const destino = procuraDestino($$('inputLocalDestino'));
    const qtdPessoas = parseFloat($$('inputQuantidadeAdulto').value) +
        parseFloat($$('inputQuantidadeCriancas').value) +
        parseFloat($$('inputQuantidadeBebes').value);
    const dataCheckIn = new Date($$('dataCheckIn').value);
    const dataCheckOut = new Date($$('dataCheckOut').value);
    const difMil = dataCheckOut.getTime() - dataCheckIn.getTime();
    const qtdDias = difMil / (1000 * 3600 * 24);
    const precoEstadia = qtdPessoas * qtdDias * destino.precoHotel;
    const checkInDate = new Date($$('dataCheckIn').value);
    const tempoCheckIn = checkInDate.getTime();
    const checkOutDate = new Date($$('dataCheckOut').value);
    const tempoCheckOut = checkOutDate.getTime();

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
};

//Valida as datas da passagem para serem diferentes e
//para a data de volta ser maior que a data de saída
const validaDataPassagem = function validaQueAsDatasDaPassagemSaoDiferentesEPossiveis() {
    const dataPartidaDate = new Date($$('inputDataPartida').value);
    const tempoPartida = dataPartidaDate.getTime();
    const dataVoltaDate = new Date($$('inputDataVolta').value);
    const tempoVolta = dataVoltaDate.getTime();

    if (tempoPartida === tempoVolta) {
        window.alert('Por favor, escolha datas de partida e volta diferentes.');
        $$('inputDataVolta').value = 'mm/dd/yyyy';
    } else if (tempoVolta < tempoPartida) {
        window.alert('A data de partida precisa ser antes da data de volta.');
        $$('inputDataVolta').value = 'mm/dd/yyyy';
    }
};

//Verifica se uma passagem foi selecionada e cria o voucher de Hotel
const validaHotel = function validaASelecaoDePassagemECriaVoucherDeHotel() {
    const nomeHotel = $$('inputDestinoHotel').value;
    const dataCheckIn = $$('dataCheckIn').value;
    const dataCheckOut = $$('dataCheckOut').value;
    const precoHotel = $$('precoHotel').value;
    const destino = procuraDestino($$('inputLocalDestino'));
    const precoQuarto = destino.precoHotel;
    const voucherP = sessionStorage.getItem('voucherPassagem');

    if (voucherP === null) {
        window.alert('É preciso selecionar uma passagem para selecionar a estadia.');
        return false;
    } else if ($$('dataCheckIn').value === '' || $$('dataCheckOut').value === '') {
        window.alert('Por favor selecione datas de check-in e check-out.');
        return false;
    } else {
        const c = window.confirm(`Confirmar a seleção do Hotel?\n
        Hotel Selecionado: ${nomeHotel}.\n
        Preco por quarto: ${precoQuarto}.\n
        Preco total: R$${precoHotel}.\n
        Data de check-in: ${dataCheckIn}.\n
        Data de check-out: ${dataCheckOut}.`);

        if (c) {
            const voucherHotel = new VoucherHotel(nomeHotel, dataCheckIn, dataCheckOut, precoHotel);
            sessionStorage.setItem('voucherHotel', JSON.stringify(voucherHotel));
        }
        return false;
    }
};

//Verfica se uma passagem foi selecionada
const validaCompra = function verificaSeUmaPassagemFoiSelecionadaEArmazenadaNaSessionStorage(e) {
    const voucherP = sessionStorage.getItem('voucherPassagem');

    if (voucherP == null) {
        e.preventDefault();
    }
};

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
    $$('dataCheckOut').onchange = calculaPrecoHotel;
    $$('dataCheckIn').onchange = calculaPrecoHotel;
    $$('inputDataVolta').onchange = validaDataPassagem;
    $$('inputDataPartida').onchange = validaDataPassagem;
    $$('btn-comprar-hotel').onclick = validaHotel;
    $$('form-pagamento-final').onsubmit = validaCompra;
    homePageFormHandler();
});