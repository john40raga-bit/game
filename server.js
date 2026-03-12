const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 1. Load the Sprite Sheet
const spriteSheet = new Image();
spriteSheet.src = 'your-sprite-sheet.png'; // Imagine a character running

// 2. Define the Animation Variables
const frameWidth = 64;  // The width of a single frame on the sheet
const frameHeight = 64; // The height of a single frame
const totalFrames = 6;  // How many frames make up the running animation
let currentFrame = 0;   // The frame we are currently drawing
// Add these below your animation variables
let charX = 150;     // Starting X position on the canvas
let charY = 150;     // Starting Y position on the canvas
let speed = 3;       // How many pixels to move per frame
let isMoving = false; // Is the character currently walking?

// Track which keys are currently being pressed
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};
// Variables to slow down the animation (so it doesn't run at 60fps)
let frameCount = 0;
const frameDelay = 5; // Update the frame every 5 game loops

// 3. The Animation Loop
function animate() {
    // Clear the canvas before drawing the next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate where to "cut" the image from the sprite sheet
    // If currentFrame is 0, sourceX is 0. If currentFrame is 1, sourceX is 64, etc.
    let sourceX = currentFrame * frameWidth;
    let sourceY = 0; // Assuming all frames are in the first row

    // Draw the specific frame to the canvas
    ctx.drawImage(
        spriteSheet, 
        sourceX, sourceY, frameWidth, frameHeight, // The "cutout" from the source image
        150, 150, frameWidth, frameHeight          // Where to draw it on the canvas (x, y, width, height)
    );

    // Update the frame counters
    frameCount++;
    if (frameCount >= frameDelay) {
        currentFrame++; // Move to the next frame
        frameCount = 0; // Reset the delay counter
    }

    // Loop back to the first frame if we hit the end
    if (currentFrame >= totalFrames) {
        currentFrame = 0;
    }

    // Call animate() again for the next frame
    requestAnimationFrame(animate);
}
window.addEventListener('keydown', function(e) {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
        isMoving = true;
    }
});

window.addEventListener('keyup', function(e) {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
        
        // Check if all movement keys are released
        if (!keys.ArrowUp && !keys.ArrowDown && !keys.ArrowLeft && !keys.ArrowRight) {
            isMoving = false;
        }
    }
});
// Start the loop once the image is loaded
spriteSheet.onload = function() {
    animate();
};
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Update Position
    if (keys.ArrowUp) charY -= speed;
    if (keys.ArrowDown) charY += speed;
    if (keys.ArrowLeft) charX -= speed;
    if (keys.ArrowRight) charX += speed;

    // 2. Handle Animation Logic
    let sourceX = currentFrame * frameWidth;
    let sourceY = 0; 

    // Draw the character at their new charX and charY position
    ctx.drawImage(
        spriteSheet, 
        sourceX, sourceY, frameWidth, frameHeight, 
        charX, charY, frameWidth, frameHeight          
    );

    // 3. Only animate if moving
    if (isMoving) {
        frameCount++;
        if (frameCount >= frameDelay) {
            currentFrame++;
            frameCount = 0;
        }
        if (currentFrame >= totalFrames) {
            currentFrame = 0; // Loop the run cycle
        }
    } else {
        currentFrame = 0; // Force to the "idle" frame when standing still
    }

    requestAnimationFrame(animate);
}
