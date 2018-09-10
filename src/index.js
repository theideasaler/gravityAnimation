import './index.scss';
import $ from 'jquery';

let canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let colorArray = [
    '#133046',
    '#15959F',
    '#F1E4B3',
    '#F4A090',
    '#F26144'
];
let middleX = window.innerWidth / 2;
let middleY = window.innerHeight / 2;
let mouse = {
    x: middleX,
    y: middleY
};
let becomeCircleFlag = false;
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
        this.radius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }
    update() {
        if (this.y + this.radius > canvas.height){
            this.dy = - this.dy;
        }else this.dy += 1;
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
    for (let i = 0; i < 1; i++) {
        const randomRadius = getRange(20,25);
        particles.push(new Particle(mouse.x, mouse.y, randomRadius, 3));
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

