// console.log(document.getElementById('nome').innerHTML);

// document.getElementById('nome').innerHTML = 'Victor';

// function imprimir() {
//     let x = document.getElementById('i1').value;
//     console.log(x);
//     document.getElementById('s1').innerHTML = x
// }


/* ----------------------------------- EX1 ---------------------------------- */
// function calcularAnoNascimento() {
//     let nome = document.getElementById('nome').value;
//     let idade = document.getElementById('idade').value;

//     let anoAtual = 2026;
//     let anoNascimento = anoAtual - idade;

//     let resposta = `Olá, ${nome}. Seu ano de nascimento é ${anoNascimento}!`;
//     document.getElementById('r1').innerHTML = resposta;    
// }

// function sum(a, b) {
//     return a + b
// }

/* ----------------------------------- EX2 ---------------------------------- */
function processar() {
    let numero = document.getElementById('numero').value;

    for (i = 0; i < numero; i++) {
        resposta += i + ' ';
    }

    document.getElementById('respota').innerHTML = resposta;
}
