const listaPacotes = [{
        id: 0,
        nome: 'Rio de Janeiro, Brasil',
        pessoas: 3,
        quartos: 2,
        dias: 5
    },
    {
        id: 1,
        nome: 'Salvador, Brasil',
        pessoas: 4,
        quartos: 2,
        dias: 7
    },
    {
        id: 2,
        nome: 'Fernando de Noronha, Brasil',
        pessoas: 2,
        quartos: 1,
        dias: 3
    },
    {
        id: 3,
        nome: 'Florianópolis, Brasil',
        pessoas: 2,
        quartos: 1,
        dias: 2
    },
    {
        id: 4,
        nome: 'Paris, França',
        pessoas: 2,
        quartos: 1,
        dias: 7
    },
    {
        id: 5,
        nome: 'Orlando, EUA',
        pessoas: 4,
        quartos: 2,
        dias: 3
    },
    {
        id: 6,
        nome: 'Cairo, Egito',
        pessoas: 3,
        quartos: 2,
        dias: 5
    }
];

window.onload = function () {
    'use strict';
    document.querySelectorAll('.btn-primary').forEach(function (btn, ind) {
        btn.addEventListener('click', function () {
            sessionStorage.setItem('pacote', JSON.stringify(listaPacotes[ind]));
            const msg = 
            `Você será redirecionado para a página de escolha de passagens.
            Você deve preencher as informações relevantes e
            confirmar a seleção de passagem e hotel.`;
            window.alert(msg);
            location.href = 'pagina-escolha-passagens.html';
        });
    });
};