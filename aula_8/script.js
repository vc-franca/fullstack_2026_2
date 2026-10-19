let L = [1, 2, 3, 4, 5];

console.log(L);

L.push(9);
console.log(L);

L.pop();
console.log(L);

class Carro {
    constructor(marca, modelo, cor, ano, automatico) {
        this.marca = marca
        this.modelo = modelo
        this.cor = cor
        this.ano = ano
        this.automatico = automatico
    }

    buzinar() {
        return 'bi bi'
    }
}

const basedCeltinha = new Carro('GM', 'Celta', 'prata', 2005, false);
const cringeDodgeRam = new Carro('RAM', 'gay', 'prata', 2024, true);

console.log(basedCeltinha.buzinar());
console.log(cringeDodgeRam.buzinar());


// let retangulo = {
//     x: 10,
//     y: 10,
//     l: 50,
//     a: 50,
//     cor1: 'blue',
//     cor2: 'red'
// }

class Retangulo {
    constructor(x, y, l, a, cor1, cor2) {
        this.x = x
        this.y = y
        this.l = l
        this.a = a
        this.cor1 = cor1
        this.cor2 = cor2
    }

    desenhar() {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.fillStyle = this.cor1;
        ctx.strokeStyle = this.cor2;
        ctx.strokeRect(this.x, this.y, this.l, this.a);
        ctx.fillRect(this.x, this.y, this.l, this.a);
        ctx.closePath();
    }
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let r1 = new Retangulo(10, 10, 50, 50, 'red', 'blue');
let r2 = new Retangulo(340, 10, 50, 50, 'green', 'blue');
let r3 = new Retangulo(10, 340, 50, 50, 'blue', 'blue');

r1.desenhar();
r2.desenhar();
r3.desenhar();

let direcao = 1;

function animacao() {
    // apaga canvas
    ctx.clearRect(0, 0, 400, 400);


    // move obj
    if (r1.x == 350) {
        direcao = -1
    }

    if (r1.x == 0) {
        direcao = 1;
    }

    r1.x += direcao;

    // desenha obj
    r1.desenhar();

    requestAnimationFrame(animacao)
}

animacao()