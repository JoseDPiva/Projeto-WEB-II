let $$ = function (id) {
    'use strict';
    return document.getElementById(id);
};

class Usuario {
    constructor(nome, cpf, endereco, numeroEndereco, cidadeEstado, email, numeroCelular, senha) {
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.numeroEndereco = numeroEndereco;
        this.cidadeEstado = cidadeEstado;
        this.email = email;
        this.numeroCelular = numeroCelular;
        this.senha = senha;
    }
}

function registraUsuario() {
    'use strict';
    let nome = $$('inputNome').value;
    let cpf = $$('inputCPF').value;
    let endereco = $$('inputEndereco').value;
    let numeroEndereco = $$('numeroEndereco').value;
    let cidadeEstado = $$('inputCidadeEstado').value;
    let email = $$('inputEmail').value;
    let numeroCelular = $$('inputNumeroCelular').value;
    let senha = $$('inputSenhaRegistro').value;

    let usuario = new Usuario(nome, cpf, endereco, numeroEndereco,
        cidadeEstado, email, numeroCelular, senha);

    localStorage.setItem('usuario', JSON.stringify(usuario));
}

function retornaUsuario() {
    'use strict';
    let u = localStorage.getItem('usuario');
    let usuario = JSON.parse(u);

    return usuario;
}

function logIn() {
    'use strict';
    let usuario = retornaUsuario();
    let emailUsuario = usuario.email;
    let senhaUsuario = usuario.senha;
    let emailLogIn = $$('input-email-login').value;
    let senhaLogIn = $$('senha-login').value;

    if (emailLogIn === emailUsuario && senhaLogIn === senhaUsuario) {
        window.alert('login com sucesso');
        return false;
    } else {
        window.alert('Email ou senha incorretos');
        return false;
    }
}

window.onload = function () {
    'use strict';
    $$('btn-registro').onclick = registraUsuario;
    $$('btn-form').onclick = logIn;
};