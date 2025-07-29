let drone;
let frutas = [];
let caminhao;
let numFrutas = 0;
let instrucoesExibindo = true;
let somFundo;
let fundo;


let emojiDrone = '🚁';   
let emojiFruta = '🍓';   
let emojiCaminhao = '🚛'; 

function preload() {
  fundo = loadImage('cena-de-fazenda-na-natureza-com-celeiro_1308-34080.avif');
  somFundo = loadSound('Farm Country - Telecasted.mp3');
}

function setup() {
  createCanvas(600, 400);

  drone = {
    x: 300,
    y: 100,
    size: 80
  };

  caminhao = {
    x: width + 50,
    y: height - 30,
    size: 80,
    moving: false
  };

  for (let i = 0; i < 10; i++) {
    frutas.push({
      x: random(90, width - 80),
      y: random(height - 90, height - 60),  
      size: 30
    });
  }
}

function draw() {
  background(fundo);

  if (instrucoesExibindo) {
    mostrarInstrucoes();
    return;
  }

  // Movimento do drone com setas
  if (keyIsDown(UP_ARROW)) drone.y -= 2;
  if (keyIsDown(DOWN_ARROW)) drone.y += 2;
  if (keyIsDown(LEFT_ARROW)) drone.x -= 2;
  if (keyIsDown(RIGHT_ARROW)) drone.x += 2;

  
  textSize(drone.size);
  textAlign(CENTER, CENTER);
  text(emojiDrone, drone.x, drone.y);

  // verificar colisão
  for (let i = frutas.length - 1; i >= 0; i--) {
    let fruta = frutas[i];
    textSize(fruta.size);
    text(emojiFruta, fruta.x, fruta.y);

    if (dist(drone.x, drone.y, fruta.x, fruta.y) < 25) {
      frutas.splice(i, 1);
      numFrutas++;
    }
  }

  // Caminhão começa a se mover após coletar 10 frutas
  if (numFrutas >= 10) {
    caminhao.moving = true;
  }

  // Mover caminhão
  if (caminhao.moving) {
    caminhao.x -= 2;
  }

  textSize(caminhao.size);
  text(emojiCaminhao, caminhao.x, caminhao.y);

  // Remover caminhão quando sair da tela
  if (caminhao.x < -50) {
    caminhao.moving = false;
  }
}

function mousePressed() {
  if (instrucoesExibindo) {
    instrucoesExibindo = false;
    if (!somFundo.isPlaying()) {
      somFundo.loop();
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    instrucoesExibindo = false;
    if (!somFundo.isPlaying()) {
      somFundo.loop();
    }
  }
}

function mostrarInstrucoes() {
  fill(255);
  stroke(0);
  rect(50, 50, 500, 300);

  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Bem-vindo ao Jogo!\nUse as setas para mover o drone\nColete 10 frutas no chão 🍓\n Quando você coletar 10 frutas um caminhão\n vai leva-las para a cidade 🚛\n FIM DE JOGO", width / 2, height / 2);
}
