import * as THREE from 'three';
import { Modelos3D, objBunny, objWolf, objCoin, objCoinV, objCoinM } from './models2.js';
const $ = window.jQuery;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// UI
const scoreElement = document.createElement('div');
scoreElement.id = 'score';
scoreElement.style.position = 'absolute';
scoreElement.style.top = '10px';
scoreElement.style.left = '10px';
scoreElement.style.color = 'white';
scoreElement.style.fontSize = '24px';
document.body.appendChild(scoreElement);

const timerElement = document.createElement('div');
timerElement.id = 'timer';
timerElement.style.position = 'absolute';
timerElement.style.top = '10px';
timerElement.style.right = '10px';
timerElement.style.color = 'white';
timerElement.style.fontSize = '24px';
document.body.appendChild(timerElement);

let score = { left: 0, right: 0 };
let timeRemaining = 60; // 60 segundos

function updateScore() {
    scoreElement.textContent = `Score - Left: ${score.left} Right: ${score.right}`;
}

function updateTimer() {
    timerElement.textContent = `Time: ${timeRemaining}s`;
}

setInterval(() => {
    if (timeRemaining > 0) {
        timeRemaining -= 1;
        updateTimer();
    }
}, 1000);

updateScore();
updateTimer();

const manager = new THREE.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};

manager.onLoad = function () {
    console.log('Loading complete!');
};

manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};

manager.onError = function (url) {
    console.log('There was an error loading ' + url);
};

camera.position.z = 10;

// Crear raquetas
Modelos3D(scene, manager);

// Crear pelota
const ballGeometry = new THREE.SphereGeometry(0.5, 8, 8);
const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ball);

// Crear paredes horizontales
const wallGeometry = new THREE.BoxGeometry(20, 1, 1);
const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const topWall = new THREE.Mesh(wallGeometry, wallMaterial);
const bottomWall = new THREE.Mesh(wallGeometry, wallMaterial);
topWall.position.y = 6;
bottomWall.position.y = -6;

scene.add(topWall);
scene.add(bottomWall);

// Crear porterías
const goalGeometry = new THREE.BoxGeometry(1, 4, 1);
const goalMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const leftGoal = new THREE.Mesh(goalGeometry, goalMaterial);
const rightGoal = new THREE.Mesh(goalGeometry, goalMaterial);
leftGoal.position.x = -9.5;
rightGoal.position.x = 9.5;

scene.add(leftGoal);
scene.add(rightGoal);

// Crear paredes alrededor de las porterías
const sideWallGeometry = new THREE.BoxGeometry(1, 6, 1);
const sideWallMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const leftGoalTopWall = new THREE.Mesh(sideWallGeometry, sideWallMaterial);
const leftGoalBottomWall = new THREE.Mesh(sideWallGeometry, sideWallMaterial);
const rightGoalTopWall = new THREE.Mesh(sideWallGeometry, sideWallMaterial);
const rightGoalBottomWall = new THREE.Mesh(sideWallGeometry, sideWallMaterial);
leftGoalTopWall.position.set(-9.5, 5, 0);
leftGoalBottomWall.position.set(-9.5, -5, 0);
rightGoalTopWall.position.set(9.5, 5, 0);
rightGoalBottomWall.position.set(9.5, -5, 0);

scene.add(leftGoalTopWall);
scene.add(leftGoalBottomWall);
scene.add(rightGoalTopWall);
scene.add(rightGoalBottomWall);

// Crear ítems


const items = [];
const itemTypes = [
    { color: 0x00ff00, effect: () => { ballSpeed += 0.005; } }, // Incrementar velocidad
    { color: 0xffff00, effect: (lastHitPlayer) => { lastHitPlayer === 'left' ? score.left += 4 : score.right += 4; updateScore(); } }, // Dar 4 puntos al último jugador que golpeó la pelota
    { color: 0xff00ff, effect: (lastHitPlayer) => { lastHitPlayer === 'left' ? score.left += 1 : score.right += 1; updateScore(); } } // Dar 1 punto al último jugador que golpeó la pelota
];

function createItem() {
    const itemType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
    const itemGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    const itemMaterial = new THREE.MeshPhongMaterial({ color: itemType.color });
    const item = new THREE.Mesh(itemGeometry, itemMaterial);
    item.position.set((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 10, 0);
    item.effect = itemType.effect;
    scene.add(item);
    items.push(item);
}

for (let i = 0; i < 3; i++) {
    createItem();
}
// Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

const spotLight = new THREE.SpotLight(0xffffff, 0.5);
spotLight.position.set(0, 10, 10);
spotLight.castShadow = true;
scene.add(spotLight);

// Variables de movimiento de la pelota
let ballDirection = new THREE.Vector3(1, 1, 0).normalize();
let ballSpeed = 0.1;

let lastHitPlayer = null;

//Variables para los Audios
const listener = new THREE.AudioListener();
camera.add(listener);

const soundBounce = new THREE.Audio(listener);
const soundFondo = new THREE.Audio(listener);
const soundGoal = new THREE.Audio(listener);
const soundItem = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();
audioLoader.load('Audios/Bounce.mp3', function(buffer) {
    soundBounce.setBuffer(buffer);
    soundBounce.setVolume(0.5);
});
audioLoader.load('Audios/Fondo.mp3', function(buffer) {
    soundFondo.setBuffer(buffer);
    soundFondo.setVolume(0.5);
});
audioLoader.load('Audios/Item.mp3', function(buffer) {
    soundItem.setBuffer(buffer);
    soundItem.setVolume(0.7);
});
audioLoader.load('Audios/Goal.mp3', function(buffer) {
    soundGoal.setBuffer(buffer);
    soundGoal.setVolume(0.6);
});

// Colisiones
function checkCollisions() {
    const ballBB = new THREE.Box3().setFromObject(ball);
    //const bounceSound = new HTMLAudioElement('Audios/Bounce.mp3');

    const leftPaddleBB = new THREE.Box3().setFromObject(objBunny);
    const rightPaddleBB = new THREE.Box3().setFromObject(objWolf);

    const topWallBB = new THREE.Box3().setFromObject(topWall);
    const bottomWallBB = new THREE.Box3().setFromObject(bottomWall);
    const leftGoalBB = new THREE.Box3().setFromObject(leftGoal);
    const rightGoalBB = new THREE.Box3().setFromObject(rightGoal);
    const leftGoalTopWallBB = new THREE.Box3().setFromObject(leftGoalTopWall);
    const leftGoalBottomWallBB = new THREE.Box3().setFromObject(leftGoalBottomWall);
    const rightGoalTopWallBB = new THREE.Box3().setFromObject(rightGoalTopWall);
    const rightGoalBottomWallBB = new THREE.Box3().setFromObject(rightGoalBottomWall);

    // Colisión con las raquetas
    if (ballBB.intersectsBox(leftPaddleBB) || ballBB.intersectsBox(rightPaddleBB)) {
        ballDirection.x = -ballDirection.x;
        lastHitPlayer = 'left';
        soundBounce.play();
    }

    // Colisión con las paredes horizontales
    if (ballBB.intersectsBox(topWallBB) || ballBB.intersectsBox(bottomWallBB)) {
        ballDirection.y = -ballDirection.y;
        lastHitPlayer = 'right';
        soundBounce.play();
    }

    // Colisión con las paredes verticales alrededor de las porterías
    if (ballBB.intersectsBox(leftGoalTopWallBB) || ballBB.intersectsBox(leftGoalBottomWallBB) || 
        ballBB.intersectsBox(rightGoalTopWallBB) || ballBB.intersectsBox(rightGoalBottomWallBB)) {
        ballDirection.x = -ballDirection.x;
        soundBounce.play();
    }

    // Colisión con las porterías (goles)
    if (ballBB.intersectsBox(leftGoalBB)) {
        score.right += 1;
        updateScore();
        ball.position.set(0, 0, 0);
        ballDirection.set(1, 1, 0).normalize();
        soundGoal.play();

    } else if (ballBB.intersectsBox(rightGoalBB)) {
        score.left += 1;
        updateScore();
        ball.position.set(0, 0, 0);
        ballDirection.set(1, 1, 0).normalize();
        soundGoal.play();
    }

    // Colisión con los ítems
    items.forEach((item, index) => {
        const itemBB = new THREE.Box3().setFromObject(item);
        if (ballBB.intersectsBox(itemBB)) {
            item.effect(lastHitPlayer);
            scene.remove(item);
            items.splice(index, 1);
            createItem();
            soundItem.play();
        }
    });
}

// Movimiento de raquetas
let keysPressed = {};

function movePaddles() {
    if (keysPressed['ArrowUp']) {
        objWolf.position.y += 0.1;
    }
    if (keysPressed['ArrowDown']) {
        objWolf.position.y -= 0.1;
    }
    if (keysPressed['w']) {
        objBunny.position.y += 0.1;
    }
    if (keysPressed['s']) {
        objBunny.position.y -= 0.1;
    }

    // Limitar el movimiento de las raquetas para que no se salgan del área de juego
    objWolf.position.y = Math.max(-5, Math.min(5, objWolf.position.y));
    objBunny.position.y = Math.max(-5, Math.min(5, objBunny.position.y));
}

document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
});

function animate() {
    requestAnimationFrame(animate);

    movePaddles();

    ball.position.add(ballDirection.clone().multiplyScalar(ballSpeed));

    checkCollisions();

    renderer.render(scene, camera);
}

animate();
