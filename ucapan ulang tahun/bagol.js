document.getElementById("startButton").addEventListener("click", function() {
    this.style.display = "none"; // Sembunyikan tombol setelah diklik
    document.getElementById("messageContainer").classList.remove("hidden");

    // Mainkan lagu Happy Birthday
    let audio = document.getElementById("birthdaySong");
    audio.play();

    // Mulai efek petasan
    startFireworks();
});

/* Efek Petasan */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = Math.random() * 4 + 2;
    this.speedX = (Math.random() - 0.5) * 8;
    this.speedY = (Math.random() - 0.5) * 8;
    this.life = 100;
}

Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 2;
};

Particle.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
};

function createFirework(x, y) {
    let colors = ["#ff1493", "#ff69b4", "#ff85c0", "#ff00aa", "#ff33cc", "#ff66ff"];
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animateFireworks);
}

function startFireworks() {
    setInterval(() => {
        createFirework(Math.random() * canvas.width, Math.random() * canvas.height);
    }, 500);
    animateFireworks();
}