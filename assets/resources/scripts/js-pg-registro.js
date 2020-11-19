'use strict';

const $$ = function retornaElementoPeloId(id) {
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

const registraUsuario = function criaObjetoUsuarioESalvaNaLocalStorage(e) {
    const nome = $$('inputNome').value;
    const cpf = $$('inputCPF').value;
    const endereco = $$('inputEndereco').value;
    const numeroEndereco = $$('numeroEndereco').value;
    const cidadeEstado = $$('inputCidadeEstado').value;
    const email = $$('inputEmail').value;
    const numeroCelular = $$('inputNumeroCelular').value;
    const senha = $$('inputSenhaRegistro').value;

    const usuario = new Usuario(nome, cpf, endereco, numeroEndereco, cidadeEstado,
        email, numeroCelular, senha);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    window.alert('Usuário registrado com sucesso.');
};

const logIn = function (e) {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const logInEMail = $$('input-email-login').value;
    const logInSenha = $$('input-senha-login').value;
    let estadoUsuario;

    if ((!usuario) || (usuario.email !== logInEMail) || (usuario.senha !== logInSenha)) {
        window.alert('Usuário não registrado. Por favor registre-se abaixo.');
        estadoUsuario = false;
        sessionStorage.setItem('estadoUsuario', estadoUsuario);
    } else if ((usuario) && ((logInEMail === usuario.email) && (logInSenha === usuario.senha))) {
        estadoUsuario = true;
        sessionStorage.setItem('estadoUsuario', estadoUsuario);
        window.alert('Log in feito com êxito');
        location.href = 'index.html';
    }

    e.preventDefault();
};

window.onload = function () {
    $$('form-registro-conta').onsubmit = registraUsuario;
    $$('form-login').onsubmit = logIn;
};