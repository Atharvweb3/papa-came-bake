// Button Interactions
document.getElementById('celebrateBtn').addEventListener('click', function() {
    alert('🎉🎉🎉 Let the celebrations begin! 🎉🎉🎉\n\nWe\'re so happy to have you home!');
    startFireworks();
});

document.getElementById('callBtn').addEventListener('click', function() {
    // Show the call confirmation modal
    document.getElementById('callModal').style.display = 'flex';
});

document.getElementById('confirmCall').addEventListener('click', function() {
    // Hide the modal
    document.getElementById('callModal').style.display = 'none';
    
    // Call the home number (replace with your actual number)
    const phoneNumber = "+919876543210"; // Replace with your actual phone number
    window.location.href = "tel:" + phoneNumber;
});

document.getElementById('cancelCall').addEventListener('click', function() {
    // Hide the modal
    document.getElementById('callModal').style.display = 'none';
});

document.getElementById('surpriseBtn').addEventListener('click', function() {
    alert('🎁 Surprise!\n\nWe have a special welcome dinner planned with your favorite dishes!');
});

document.getElementById('closeFireworks').addEventListener('click', function() {
    stopFireworks();
});

// Fireworks Animation
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let fireworks = [];
let particles = [];
let animationId;
let isFireworksActive = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetX = Math.random() * canvas.width;
        this.targetY = Math.random() * canvas.height * 0.5;
        this.speed = 2;
        this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.brightness = Math.random() * 50 + 50;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.radius = 2;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Check if firework reached target
        const distance = Math.sqrt(
            Math.pow(this.targetX - this.x, 2) + 
            Math.pow(this.targetY - this.y, 2)
        );
        
        if (distance < 5) {
            return true; // Explode
        }
        
        return false;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 2 + 1;
        this.speed = Math.random() * 3 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // Gravity
        this.alpha -= this.decay;
        
        return this.alpha <= 0;
    }
    
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
        ctx.globalAlpha = 1;
    }
}

function createParticles(x, y, color) {
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Random chance to add new firework
    if (Math.random() < 0.05) {
        fireworks.push(new Firework());
    }
    
    // Update and draw fireworks
    for (let i = fireworks.length - 1; i >= 0; i--) {
        const exploded = fireworks[i].update();
        fireworks[i].draw();
        
        if (exploded) {
            createParticles(fireworks[i].x, fireworks[i].y, fireworks[i].color);
            fireworks.splice(i, 1);
        }
    }
    
    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
        const faded = particles[i].update();
        particles[i].draw();
        
        if (faded) {
            particles.splice(i, 1);
        }
    }
    
    if (isFireworksActive) {
        animationId = requestAnimationFrame(animate);
    }
}

function startFireworks() {
    if (!isFireworksActive) {
        isFireworksActive = true;
        canvas.style.display = 'block';
        document.querySelector('.fireworks-controls').style.display = 'block';
        animate();
    }
}

function stopFireworks() {
    isFireworksActive = false;
    canvas.style.display = 'none';
    document.querySelector('.fireworks-controls').style.display = 'none';
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks = [];
    particles = [];
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Page initialization without countdown timer
});