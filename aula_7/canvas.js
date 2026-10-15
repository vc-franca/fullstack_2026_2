let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');

// // retângulos
// ctx.beginPath();
// ctx.lineWidth = 2;
// ctx.fillStyle = 'blue';
// ctx.strokeStyle = 'red';
// ctx.fillRect(10,10,50,50);
// ctx.strokeRect(10,10,50,50);
// ctx.closePath();

// // linhas
// ctx.beginPath();
// ctx.lineWidth = 2;
// ctx.fillStyle = 'blue';
// ctx.strokeStyle = 'red';
// ctx.moveTo(200,150);
// ctx.lineTo(60,10);
// ctx.lineTo(60,250);
// ctx.lineTo(200,250);
// ctx.lineTo(200,150);
// ctx.fill();
// ctx.stroke();
// ctx.closePath();

// // arcos
// ctx.beginPath();
// ctx.lineWidth = 2;
// ctx.fillStyle = 'blue';
// ctx.strokeStyle = 'red';
// ctx.arc(200,200,50,1.5*Math.PI,2.5*Math.PI);
// ctx.fill();
// ctx.stroke();
// ctx.closePath();

// // texto
// ctx.beginPath();
// ctx.lineWidth = 2;
// ctx.fillStyle = 'blue';
// ctx.strokeStyle = 'red';
// ctx.font = "90px Arial"
// ctx.textAlign = "center";
// ctx.fillText("Olá",200,350);
// ctx.strokeText("Olá",200,350)
// ctx.closePath();

c.fillStyle = 'red'
c.fillRect(0, 0, 40, 40)

c.fillStyle = 'blue'
c.fillRect(360, 0, 40, 40)

c.fillStyle = 'yellow'
c.fillRect(0, 360, 40, 40)

c.fillStyle = 'green'
c.fillRect(360, 360, 40, 40)

c.beginPath()
c.lineWidth = 2
c.strokeStyle = 'red'
c.moveTo(40, 40)
c.lineTo(400, 400)
c.stroke()
c.closePath()

c.beginPath()
c.lineWidth = 2
c.strokeStyle = 'blue'
c.moveTo(360, 40)
c.lineTo(0, 400)
c.stroke()
c.closePath()

c.beginPath()
c.lineWidth = 2
c.strokeStyle = 'green'
c.moveTo(0, 200)
c.lineTo(400, 200)
c.stroke()
c.closePath()

c.beginPath()

c.closePath()