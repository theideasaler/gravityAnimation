import './index.scss';
import $ from 'jquery';

let canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let colorArray = [
    '#233D4D',
    '#FE7F2D',
    '#FCCA46',
    '#A1C181',
    '#579C87'
];
let middleX = window.innerWidth / 2;
let middleY = window.innerHeight / 2;
let mouse = {
    x: middleX,
    y: middleY
};
window.addEventListener('mousemove', event => {
    
    if(isNaN(mouse.x)) { mouse.x = middleX; }
    if(isNaN(mouse.y)) { mouse.y = middleY; }
    mouse.x = event.x;
    mouse.y = event.y;
});

canvas.height = 2 * middleY;
canvas.width = 2 * middleX;

class Particle {
    constructor(x, y, radius, velocityY) {
        this.x = x;
        this.y = y;
        this.dy = velocityY;
        this.basicEnergyLost = 0.96 * radius;
        this.radius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }
    update() {
        if (this.y + this.radius > canvas.height){
            this.dy = - this.dy * 0.96;//multiply the energy lost
        }else this.dy += 1;//this number this the gravity force placed vertically
        this.y += this.dy;
        this.draw();
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    };
}

let getRange = (min, max) => min + (max -min) * Math.random();

let particles;
const init = () => {
    middleX = window.innerWidth / 2;
    middleY = window.innerHeight / 2;
    canvas.height = 2 * middleY;
    canvas.width = 2 * middleX;
    particles = [];
    for (let i = 0; i < 100; i++) {
        const randomRadius = getRange(5,25);
        const randomX = getRange(randomRadius, middleX * 2 - randomRadius);
        particles.push(new Particle(randomX, middleY, randomRadius, 0));
    } 
};

const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
    });
}

$(() => {
    init();
    animate();
    $(window).on('resize', () => {
        init();
    });
});

