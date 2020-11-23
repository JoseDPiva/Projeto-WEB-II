'use strict';

const $$ = function retornaElementoPeloId(id) {
    return document.getElementById(id);
};

const listaDeViajantes = [];
let quantidadeViajantesAdultos = 0;
let quantidadeViajantesCriancas = 0;
let quantidadeViajantesBebes = 0;

//Procura pelos vouchers de passagem e hotel na session storage
//e determina o preço total a ser pago
const voucherHandler = function leOsVouchersDeHotelEPassagemEDefineOPrecoTotal() {
    const voucherPassagem = JSON.parse(sessionStorage.getItem('voucherPassagem'));
    let precoTotal = parseFloat(voucherPassagem.preco);
    if ((sessionStorage.getItem('voucherHotel')) != null) {
        let voucherHotel = JSON.parse(sessionStorage.getItem('voucherHotel'));
        precoTotal += parseFloat(voucherHotel.precoHotel);
    }

    $('#labelValorPagamento').next('input').val(`R$ ${precoTotal},00`);
    $('#valorFinalPagamento').val(`R$ ${precoTotal},00`);
};

const usuarioHandler = function procuraPorLogInNoSessionStorageEPegaOEMail() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const estado = sessionStorage.getItem('estadoUsuario');

    if (estado) {
        $$('inputEmailEnvioVoucher').value = usuario.email;
    } else if (!(estado)) {
        $$('inputEmailEnvioVoucher').value = '';
    }
};

const escolhaFormaPagamento = function defineAFormaDePagamentoEMostraOForm() {

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
    let code = e.charCode;

    if (code < 48 || code > 57) {
        e.preventDefault();
    }
};

const adicionaViajanteAdulto = function leNomeECPFDoViajanteAdultoEAdicionaNaLista() {
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
    const code = e.charCode;

    if ((code < 65 || code > 90) && (code < 97 || code > 122) && (code !== 32)) {
        e.preventDefault();
    }
};

const limpaListaViajantes = function () {

    $$('corpo-lista-viajantes').innerHTML = '';
    quantidadeViajantesAdultos = 0;
    quantidadeViajantesBebes = 0;
    quantidadeViajantesCriancas = 0;
};

const validaEmail = function validaEmailComRegExEModificaMensagemDeValidacao() {
    const patternEmail = /\w+@\w+\.\w+(\.\w+)*/;
    const inputEmail = this.value;

    this.setCustomValidity(!patternEmail.test(inputEmail) ? 'Entre um email válido.' : '');
};

const mudaBordaInputNome = function () {
    const $this = $(this);

    if ($this.val() === '' || $this.val() === null) {
        $this.css('border-color', 'red');
    } else {
        $this.css('border-color', 'green');
    }
};

const validaFormaPagamento = function () {
    const credito = $$('inputPagamentoCredito');
    const debito = $$('inputPagamentoDebito');
    const nCredito = $$('numeroCartaoCredito').value;
    const nDebito = $$('numeroCartaoDebito').value;
    const cCredito = $$('codigoCartaoCredito').value;
    const cDebito = $$('codigoCartaoDebito').value;

    if (credito.checked) {
        if ((!nCredito) || (!cCredito)) {
            return false;
        } else if ((nCredito.length < 16) || (cCredito.length < 3)) {
            return false;
        }
    } else if (debito.checked) {
        if ((!nDebito) || (!cDebito)) {
            return false;
        } else if ((nDebito.length < 16) || (cDebito.length < 3)) {
            return false;
        }
    } else if ((!credito.checked) && (!debito.checked)) {
        return false;
    }

    return true;
};

const validaCompra = function () {
    const email = $$('inputEmailEnvioVoucher').value;
    const vP = JSON.parse(sessionStorage.getItem('voucherPassagem'));
    const qtdPassageiros = vP.passagemA + vP.passagemB + vP.passagemC;
    const qtdLista = quantidadeViajantesAdultos + quantidadeViajantesBebes +
        quantidadeViajantesCriancas;

    if ((!/\w+@\w+\.\w+(\.\w+)*/.test(email))) {
        window.alert('Por favor insira um email válido.');
    } else if (!validaFormaPagamento()) {
        window.alert('Por favor selecione e preencha uma forma de pagamento corretamente.');
    } else if (qtdLista < qtdPassageiros) {
        window.alert('Por favor adicione os viajantes restantes à lista.');
    } else {
        window.alert('Voucher enviado com sucesso!');
    }
};

window.onload = function () {
    voucherHandler();
    usuarioHandler();
    $$('inputPagamentoCredito').onchange = escolhaFormaPagamento;
    $$('inputPagamentoDebito').onchange = escolhaFormaPagamento;
    document.getElementsByName('numero').forEach(ele => {
        ele.addEventListener('keypress', validaInputNumerico);
    });
    $('#btn-adicionar-viajante-adulto').parent('div').find('button').click(adicionaViajanteAdulto);
    $('#div-add-viajante-crianca').children('button').click(adicionaViajanteCrianca);
    $$('btn-adicionar-viajante-bebe').onclick = adicionaViajanteBebe;
    $$('inputPagamentoCredito').onclick = mostraFormaDePagamentoFinal;
    $$('inputPagamentoDebito').onclick = mostraFormaDePagamentoFinal;
    $$('inputNomeViajanteAdulto').onkeypress = validaInputNaoNumerico;
    $$('inputNomeViajanteCrianca').onkeypress = validaInputNaoNumerico;
    $$('inputNomeViajanteBebe').onkeypress = validaInputNaoNumerico;
    $$('btnLimpaListaViajantes').onclick = limpaListaViajantes;
    $$('inputEmailEnvioVoucher').onblur = validaEmail;
    $('.nome').blur(mudaBordaInputNome);
    $('.cpf').mask('000.000.000-00');
    $$('btn-finalizar-pagamento').onclick = validaCompra;
};