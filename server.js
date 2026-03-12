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

// Start the loop once the image is loaded
spriteSheet.onload = function() {
    animate();
};
