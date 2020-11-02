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

const registraUsuario = function criaObjetoUsuarioESalvaNaLocalStorage() {
    const nome = $$('inputNome').value;
    const cpf = $$('inputCPF').value;
    const endereco = $$('inputEndereco').value;
    const numeroEndereco = $$('numeroEndereco').value;
    const cidadeEstado = $$('inputCidadeEstado').value;
    const email = $$('inputEmail').value;
    const numeroCelular = $$('inputNumeroCelular').value;
    const senha = $$('inputSenhaRegistro').value;

    const usuarios = localStorage.getItem('usuarios') ?
        JSON.parse(localStorage.getItem('usuarios')) : [];

    usuarios.push(new Usuario(nome, cpf, endereco, numeroEndereco, cidadeEstado,
        email, numeroCelular, senha));
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    window.alert('Usuário registrado com sucesso.');
};

const logIn = function () {
    if(!localStorage.getItem('usuarios')) {
        window.alert('Por favor registre um usuário.');
        return false;
    } else {
        const usuarios = JSON.parse(localStorage.getItem('usuarios'));
        let usuario;
        const logInEMail = $$('input-email-login').value;
        const logInSenha = $$('input-senha-login').value;

        usuarios.forEach(function (u, i) {
            if(u.email === logInEMail) {
                usuario = usuarios[i];
                console.log(usuario);
                return false;
            }
        });
    }
};

window.onload = function () {
    $$('form-registro-conta').onsubmit = registraUsuario;
    $$('form-login').onsubmit = logIn;
};