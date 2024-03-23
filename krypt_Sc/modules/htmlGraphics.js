function writeText() {
    ctx.font = "16px Arial";
    ctx.fillStyle = color;
    ctx.fillText(setText, Number(coordx), Number(coordy)+16);
}

function clrScr() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startModules() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillRect(0, 0, 480, 320);
    ctx.fillStyle = 'black';
    ctx.fillStyle = 'gray';
    ctx.fillRect(10, 10, 460, 300);
    ctx.font = "16px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText('Krypt-Sc w/ HTML graphics', 136, 26);
}

function screenSize(x,y) {
    var canvas = document.getElementById("tftScreen");
    var ctx = canvas.getContext("2d")
    canvas.height = y
    canvas.width = x
}