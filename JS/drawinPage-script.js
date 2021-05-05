const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const strokeWeight = document.getElementById("stroke-weight");
const color = document.getElementById("color-picker");

let isDrawing = false;

const resizeCanvas = function () {
  canvas.width = 800;
  canvas.height = 600;
};

const start = function (e) {
  isDrawing = true;
  draw(e);
};

const stop = function (e) {
  isDrawing = false;
  context.beginPath();
};

const draw = function ({ clientX: x, clientY: y }) {
  if (!isDrawing) return;

  context.lineWidth = strokeWeight.value;
  context.lineCap = "round";
  context.strokeStyle = color.value;

  context.lineTo(x, y);
  context.stroke();
  context.beginPath();
  context.moveTo(x, y);
};

const clearCanvas = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const saveCanvas = function () {
  if (window.navigator.msSaveBlob)
    // For Internet Explorer and Edge Support
    window.navigator.mySaveBlob(canvas.msToBlob(), "test-image.png");
  else {
    let downloadElem = document.createElement("a");
    document.body.appendChild(downloadElem);
    downloadElem.href = canvas.toDataURL();
    downloadElem.download = "test-image.png";
    downloadElem.click();
    document.body.removeChild(downloadElem);
  }
};

resizeCanvas();

window.addEventListener("resize", resizeCanvas());
canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stop);
clearBtn.addEventListener("click", clearCanvas);
saveBtn.addEventListener("click", saveCanvas);
