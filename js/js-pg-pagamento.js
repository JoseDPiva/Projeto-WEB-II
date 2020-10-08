let $$ = function (id) {
    'use strict';

    return document.getElementById(id);
};

function voucherHandler() {
    'use strict';
    let voucherPassagem = JSON.parse(sessionStorage.getItem('voucherPassagem'));
    let precoTotal = parseFloat(voucherPassagem.preco);
    if (sessionStorage.length > 2) {
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

window.onload = function () {
    'use strict';
    voucherHandler();
    $$('inputPagamentoCredito').onclick = escolhaFormaPagamento;
    $$('inputPagamentoDebito').onchange = escolhaFormaPagamento;
};