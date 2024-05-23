/**
 * ICS4U - Mr. Brash 🐿️
 * 4.6 - MVC and Graphics... a trial run for a game!
 * 
 * Read through the README carefully!
 * 
 * Author:
 */

'use strict';

// Globals, event listeners, and general tomfoolery
// Feel free to change values but beware the consequences
const CVS_WIDTH = 640;
const CVS_HEIGHT = 640;
const ROWS = 8;
const COLS = 8;
let cvs;
let grid = [];

// The (overly simple) model
class Square {
  colour = [0, 0, 0];
  value = 0;

  constructor(colour, value) {
    this.colour = colour;
    this.value = value;
  }
}

// Setup the scene (runs first)
function setup() {
  cvs = createCanvas(CVS_WIDTH, CVS_HEIGHT);

  // Initialize the grid to all white squares
  for (let y = 0; y < ROWS; y++) {
    grid[y] = [];
    for (let x = 0; x < COLS; x++) {
      if ((x+y) % 2 == 0) {
        grid[y].push(new Square([155, 155, 155], 0));
      } else {
        grid[y].push(new Square([80,100,80], 0));
      }
    }
  }
  
}

// Draw a new frame of the scene
function draw() {
  // Clear the screen with a grey rectangle
  background(220);

  // Draw the grid
  draw_grid(COLS, ROWS);
}

/* Draw a grid that is x by y
 * Utilize the `grid` 2D array of Squares
 * Fill each square with the proper .colour and if the value
 * of the square is over 0, write the value on the square.
 */
function draw_grid(x, y) {
  // Get the size of each square
  let width = Math.floor(CVS_WIDTH/x);
  let height = Math.floor(CVS_HEIGHT/y);
  
  // Center the grid on the canvas if there's a rounding error
  let x_buffer = (CVS_WIDTH - width*x)/2
  let y_buffer = (CVS_HEIGHT - height*y)/2

  stroke("black");
  for (let row = 0; row < y; row++) {
    for (let col = 0; col < x; col++) {
      // Fill the square with the r,g,b values from the model
      fill(...grid[row][col].colour);
      rect(col*width + x_buffer, row*height + y_buffer, width, height);

      // Write the value of the square in the center of it
      if (grid[row][col].value > 0) {
        textAlign(CENTER, CENTER);
        fill("black")
        text(grid[row][col].value, (col*width + x_buffer)+width/2, (row*height + y_buffer)+width/2);
      }
    }
  }
}

function mouseClicked() {
  // to find what tile the mouse is over
  // first find where the grid starts
  // then check what tile by dividing the grid length by the amount of tiles and accounting for gridX and gridY
  // cant be too hard right?
  // UPDATE: mouseX and mouseY are 0,0 at the top right so we don't need to worry about the grid offset

  let x = CVS_WIDTH / COLS
  let y = CVS_HEIGHT / ROWS

  let i = 0;
  while (i < mouseX) {
    i += x;
  }

  let j = 0;
  while (j < mouseY) {
    j += x;
  }
  // coords of tile in grid are [i/x -1, j/y -1]
  grid[(j/y)-1][(i/x)-1].value++;
}