const x = Math.floor(
    Math.random() * 100
);

console.log(x);

function adivinhar() {
    let list = [];

    let num = document.getElementById('num').value;

    list.push(num)
    list.toString()

    document.getElementById('num-digitados').innerHTML = num;

    if (num < x) {
        document.getElementById('span').innerHTML = 'Menor';
        document.getElementById('span').style.setProperty('background-color', 'red');
        return
    }

    if (num > x) {
        document.getElementById('span').innerHTML = 'Maior';
        document.getElementById('span').style.setProperty('background-color', 'red');
        return
    }

    document.getElementById('span').innerHTML = 'Número igual';
    document.getElementById('span').style.setProperty('background-color', 'green');
}

