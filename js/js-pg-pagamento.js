let $$ = function (id) {
    'use strict';

    return document.getElementById(id);
};

let listaDeViajantes = [];
let quantidadeViajantesAdultos = 0;
let quantidadeViajantesCriancas = 0;
let quantidadeViajantesBebes = 0;

//Procura pelos vouchers de passagem e hotel na session storage
//e determina o preço total a ser pago
function voucherHandler() {
    'use strict';
    let voucherPassagem = JSON.parse(sessionStorage.getItem('voucherPassagem'));
    let precoTotal = parseFloat(voucherPassagem.preco);
    if ((sessionStorage.getItem('voucherHotel')) != null) {
        let voucherHotel = JSON.parse(sessionStorage.getItem('voucherHotel'));
        precoTotal += parseFloat(voucherHotel.precoHotel);
    }

    $$('inputValorPagamento').value = `R$ ${precoTotal},00`;
    $$('valorFinalPagamento').value = `R$ ${precoTotal},00`;
}

function escolhaFormaPagamento() {
    'use strict';
    let credito = $$('inputPagamentoCredito');
    let debito = $$('inputPagamentoDebito');
    let labelCredito = $$('labelCartaoCredito');
    let numeroCredito = $$('numeroCartaoCredito');
    let labelCodigoCredito = $$('labelCodigoCredito');
    let codigoCredito = $$('codigoCartaoCredito');
    let labelDebito = $$('labelCartaoDebito');
    let numeroDebito = $$('numeroCartaoDebito');
    let labelCodigoDebito = $$('labelCodigoDebito');
    let codigoDebito = $$('codigoCartaoDebito');


    if (credito.checked) {
        labelCredito.style.visibility = 'visible';
        numeroCredito.style.visibility = 'visible';
        labelCodigoCredito.style.visibility = 'visible';
        codigoCredito.style.visibility = 'visible';
    } else {
        labelCredito.style.visibility = 'hidden';
        numeroCredito.style.visibility = 'hidden';
        labelCodigoCredito.style.visibility = 'hidden';
        codigoCredito.style.visibility = 'hidden';
    }

    if (debito.checked) {
        labelDebito.style.visibility = 'visible';
        numeroDebito.style.visibility = 'visible';
        labelCodigoDebito.style.visibility = 'visible';
        codigoDebito.style.visibility = 'visible';
    } else {
        labelDebito.style.visibility = 'hidden';
        numeroDebito.style.visibility = 'hidden';
        labelCodigoDebito.style.visibility = 'hidden';
        codigoDebito.style.visibility = 'hidden';
    }
}

function validaInputNumerico(e) {
    'use strict';
    let code = e.charCode;

    if (code < 48 || code > 57) {
        e.preventDefault();
    }
}

function adicionaViajanteAdulto() {
    'use strict';
    let voucherPassagem = JSON.parse(sessionStorage.getItem('voucherPassagem'));
    let qtdAdultos = voucherPassagem.passagemA;
    let nomeA = $$('inputNomeViajanteAdulto').value;
    let CPFA = $$('inputCPFViajanteAdulto').value;

    if ((qtdAdultos === 0) || (quantidadeViajantesAdultos === qtdAdultos)) {
        window.alert('Já foram selecionados todos os viajantes adultos.');
    } else if (nomeA === '' || CPFA === '') {
        window.alert('Por favor entre o nome e CPF do adulto.');
    } else {
        let viajante = {
            nome: nomeA,
            cpf: CPFA
        };
        listaDeViajantes.push(viajante);
        quantidadeViajantesAdultos++;
    }
}

function adicionaViajanteCrianca() {
    'use strict';
    let voucherPassagem = JSON.parse(sessionStorage.getItem('voucherPassagem'));
    let qtdCriancas = voucherPassagem.passagemC;
    let nomeC = $$('inputNomeViajanteCrianca').value;
    let CPFC = $$('inputCPFViajanteCrianca').value;

    if ((qtdCriancas === 0) || (quantidadeViajantesCriancas === qtdCriancas)) {
        window.alert('Já foram selecionados todos os viajantes crianças.');
    } else if (nomeC === '' || CPFC === '') {
        window.alert('Por favor entre o nome e CPF da criança.');
    } else {
        let viajante = {
            nome: nomeC,
            cpf: CPFC
        };
        listaDeViajantes.push(viajante);
        quantidadeViajantesCriancas++;
    }
}

function adicionaViajanteBebe() {
    'use strict';
    let voucherPassagem = JSON.parse(sessionStorage.getItem('voucherPassagem'));
    let qtdBebes = voucherPassagem.passagemB;
    let nomeB = $$('inputNomeViajanteBebe').value;
    let CPFB = $$('inputCPFViajanteBebe').value;

    if ((qtdBebes === 0) || (quantidadeViajantesBebes === qtdBebes)) {
        window.alert('Já foram selecionados todos os viajantes bebês.');
    } else if (nomeB === '' || CPFB === '') {
        window.alert('Por favor entre o nome e CPF do bebe.');
    } else {
        let viajante = {
            nome: nomeB,
            cpf: CPFB
        };
        listaDeViajantes.push(viajante);
        quantidadeViajantesBebes++;
    }
}

function mostraFormaDePagamentoFinal() {
    'use strict';
    let credito = $$('inputPagamentoCredito').checked;
    let debito = $$('inputPagamentoDebito').checked;

    if (credito) {
        $$('formaPagamentoFinal').value = 'Cartão de Crédito';
    } else if (debito) {
        $$('formaPagamentoFinal').value = 'Cartão de Débito';
    } else {
        $$('formaPagamentoFinal').value = '';
    }
}

function validaInputNaoNumerico(e) {
    'use strict';
    let code = e.charCode;

    if ((code < 65 || code > 90) && (code < 97 || code > 122)) {
        e.preventDefault();
    }
}

window.onload = function () {
    'use strict';
    voucherHandler();
    $$('inputPagamentoCredito').onchange = escolhaFormaPagamento;
    $$('inputPagamentoDebito').onchange = escolhaFormaPagamento;
    document.getElementsByName('numero').forEach(ele => {
        ele.addEventListener('keypress', validaInputNumerico);
    });
    $$('btn-adicionar-viajante-adulto').onclick = adicionaViajanteAdulto;
    $$('btn-adicionar-viajante-crianca').onclick = adicionaViajanteCrianca;
    $$('btn-adicionar-viajante-bebe').onclick = adicionaViajanteBebe;
    $$('inputPagamentoCredito').onclick = mostraFormaDePagamentoFinal;
    $$('inputPagamentoDebito').onclick = mostraFormaDePagamentoFinal;
    $$('inputNomeViajanteAdulto').onkeypress = validaInputNaoNumerico;
    $$('inputNomeViajanteCrianca').onkeypress = validaInputNaoNumerico;
    $$('inputNomeViajanteBebe').onkeypress = validaInputNaoNumerico;
};