const $$ = function retornaElementoPeloId(id) {
    'use strict';

    return document.getElementById(id);
};

const listaDeViajantes = [];
let quantidadeViajantesAdultos = 0;
let quantidadeViajantesCriancas = 0;
let quantidadeViajantesBebes = 0;

//Procura pelos vouchers de passagem e hotel na session storage
//e determina o preço total a ser pago
const voucherHandler = function leOsVouchersDeHotelEPassagemEDefineOPrecoTotal() {
    'use strict';
    const voucherPassagem = JSON.parse(sessionStorage.getItem('voucherPassagem'));
    let precoTotal = parseFloat(voucherPassagem.preco);
    if ((sessionStorage.getItem('voucherHotel')) != null) {
        let voucherHotel = JSON.parse(sessionStorage.getItem('voucherHotel'));
        precoTotal += parseFloat(voucherHotel.precoHotel);
    }

    $$('inputValorPagamento').value = `R$ ${precoTotal},00`;
    $$('valorFinalPagamento').value = `R$ ${precoTotal},00`;
};

const escolhaFormaPagamento = function defineAFormaDePagamentoEMostraOForm() {
    'use strict';
    const credito = $$('inputPagamentoCredito');
    const debito = $$('inputPagamentoDebito');
    const labelCredito = $$('labelCartaoCredito');
    const numeroCredito = $$('numeroCartaoCredito');
    const labelCodigoCredito = $$('labelCodigoCredito');
    const codigoCredito = $$('codigoCartaoCredito');
    const labelDebito = $$('labelCartaoDebito');
    const numeroDebito = $$('numeroCartaoDebito');
    const labelCodigoDebito = $$('labelCodigoDebito');
    const codigoDebito = $$('codigoCartaoDebito');


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
};

const validaInputNumerico = function (e) {
    'use strict';
    let code = e.charCode;

    if (code < 48 || code > 57) {
        e.preventDefault();
    }
};

const adicionaViajanteAdulto = function leNomeECPFDoViajanteAdultoEAdicionaNaLista() {
    'use strict';
    const voucherPassagem = JSON.parse(sessionStorage.getItem('voucherPassagem'));
    const qtdAdultos = voucherPassagem.passagemA;
    const nomeA = $$('inputNomeViajanteAdulto').value;
    const CPFA = $$('inputCPFViajanteAdulto').value;

    if ((qtdAdultos === 0) || (quantidadeViajantesAdultos === qtdAdultos)) {
        window.alert('Já foram selecionados todos os viajantes adultos.');
    } else if (nomeA === '' || CPFA === '') {
        window.alert('Por favor entre o nome e CPF do adulto.');
    } else {
        const viajante = {
            nome: nomeA,
            cpf: CPFA
        };
        listaDeViajantes.push(viajante);
        quantidadeViajantesAdultos++;
        let div = document.createElement('div');
        //Cria um div com as informações do viajante e coloca na lista
        const idDiv = `divViajanteAdulto${quantidadeViajantesAdultos}`;
        div.setAttribute('id', idDiv);
        div.innerHTML = `Viajante adulto ${quantidadeViajantesAdultos}: Nome completo:
         ${nomeA}, CPF: ${CPFA}.`;
        $$('corpo-lista-viajantes').appendChild(div);
    }
};

const adicionaViajanteCrianca = function leNomeECPFDoViajanteCriancaEAdicionaNaLista() {
    'use strict';
    const voucherPassagem = JSON.parse(sessionStorage.getItem('voucherPassagem'));
    const qtdCriancas = voucherPassagem.passagemC;
    const nomeC = $$('inputNomeViajanteCrianca').value;
    const CPFC = $$('inputCPFViajanteCrianca').value;

    if ((qtdCriancas === 0) || (quantidadeViajantesCriancas === qtdCriancas)) {
        window.alert('Já foram selecionados todos os viajantes crianças.');
    } else if (nomeC === '' || CPFC === '') {
        window.alert('Por favor entre o nome e CPF da criança.');
    } else {
        const viajante = {
            nome: nomeC,
            cpf: CPFC
        };
        listaDeViajantes.push(viajante);
        quantidadeViajantesCriancas++;
        let div = document.createElement('div');
        div.innerHTML = `Viajante criança ${quantidadeViajantesCriancas}: Nome completo:
         ${nomeC}, CPF: ${CPFC}.`;
        $$('corpo-lista-viajantes').appendChild(div);
    }
};

const adicionaViajanteBebe = function leNomeECPFDoViajanteBebeEAdicionaNaLista() {
    'use strict';
    const voucherPassagem = JSON.parse(sessionStorage.getItem('voucherPassagem'));
    const qtdBebes = voucherPassagem.passagemB;
    const nomeB = $$('inputNomeViajanteBebe').value;
    const CPFB = $$('inputCPFViajanteBebe').value;

    if ((qtdBebes === 0) || (quantidadeViajantesBebes === qtdBebes)) {
        window.alert('Já foram selecionados todos os viajantes bebês.');
    } else if (nomeB === '' || CPFB === '') {
        window.alert('Por favor entre o nome e CPF do bebe.');
    } else {
        const viajante = {
            nome: nomeB,
            cpf: CPFB
        };
        listaDeViajantes.push(viajante);
        quantidadeViajantesBebes++;
        let div = document.createElement('div');
        div.innerHTML = `Viajante bebe ${quantidadeViajantesBebes}: Nome completo:
         ${nomeB}, CPF: ${CPFB}.`;
        $$('corpo-lista-viajantes').appendChild(div);
    }
};

const mostraFormaDePagamentoFinal = function () {
    'use strict';
    const credito = $$('inputPagamentoCredito').checked;
    const debito = $$('inputPagamentoDebito').checked;

    if (credito) {
        $$('formaPagamentoFinal').value = 'Cartão de Crédito';
    } else if (debito) {
        $$('formaPagamentoFinal').value = 'Cartão de Débito';
    } else {
        $$('formaPagamentoFinal').value = '';
    }
};

const validaInputNaoNumerico = function (e) {
    'use strict';
    const code = e.charCode;

    if ((code < 65 || code > 90) && (code < 97 || code > 122) && (code !== 32)) {
        e.preventDefault();
    }
};

const limpaListaViajantes = function () {
    'use strict';

    $$('corpo-lista-viajantes').innerHTML = '';
    quantidadeViajantesAdultos = 0;
    quantidadeViajantesBebes = 0;
    quantidadeViajantesCriancas = 0;
};

/* function imprimeVoucher() {
    'use strict';
    let vH = JSON.parse(sessionStorage.getItem('voucherHotel'));
    let vP = JSON.parse(sessionStorage.getItem('voucherPassagem'));
    let semVolta = 'Sem data de volta definida';
    let voucher = `Este é o seu voucher do Passagens.com.\n
    Local de partida: ${vP.partida}, Local de destino: ${vP.destino}.\n
    Data de saída: ${vP.dataPartida}, Data de volta: ${vP.idaEVolta ? vP.dataVolta : semVolta}.\n
    Informações dos viajantes:\n
    Viajante adulto 1: ${listaDeViajantes[0].nome}, CPF: ${listaDeViajantes[0].cpf}.\n
    Viajante adulto 2: ${listaDeViajantes[1].nome}, CPF: ${listaDeViajantes[1].cpf}.`;

    return voucher;
} */

const validaEmail = function validaEmailComRegExEModificaMensagemDeValidacao() {
    'use strict';
    const patternEmail = /\w+@\w+\.\w+(\.\w+)*/;
    const inputEmail = this.value;

    this.setCustomValidity(!patternEmail.test(inputEmail) ? 'Entre um email válido.' : '');
};

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
    $$('btnLimpaListaViajantes').onclick = limpaListaViajantes;
    $$('inputEmailEnvioVoucher').onblur = validaEmail;
};