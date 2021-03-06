const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 15;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return; //stop function from running when not click+hold and drawing;
  console.log(e);
  ctx.beginPath(); //start from
  ctx.moveTo(lastX, lastY); // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY]; //destructuring array
  hue++;

  if (hue >= 360) {
    hue = 0;
  }

  if (ctx.lineWidth >= 35 || ctx.lineWidth <= 10) {
    direction = !direction; //flip direction
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY]; //destructuring array
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
