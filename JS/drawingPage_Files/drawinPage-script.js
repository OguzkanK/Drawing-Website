const canvas = document.getElementById("canvas"); // Drawing canvas
const context = canvas.getContext("2d"); // Drawing canvas context
const clearBtn = document.getElementById("clearBtn"); // Button to clear drawing
const saveBtn = document.getElementById("saveBtn"); // Button to download drawing
const uploadBtn = document.getElementById("uploadBtn"); // Button to upload drawing to database
const strokeWeight = document.getElementById("stroke-weight"); // Pencil stroke weight
const color = document.getElementById("custom-color"); // Pencil color
const colorOption = []; // Color options for drawing

let isDrawing = false; // Drawing state

// Add event listeners to all color options
const loadColors = function () {
  for (let i = 0; i < 8; i++) {
    colorOption.push(document.getElementById(`color_${i + 1}`));
    colorOption[i].addEventListener("click", function () {
      color.value = colorOption[i].style.backgroundColor;
    });
  }
};

// Correct drawing are when window size changes
const resizeCanvas = function () {
  canvas.width = 800;
  canvas.height = 600;
};

// Sets drawing state to true when mouse is down
const start = function (e) {
  isDrawing = true;
  draw(e);
};

// Sets drawing state to false when mouse is up
const stop = function (e) {
  isDrawing = false;
  context.beginPath();
};

// Adds pencil color to mouse position when draewing state is true
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

// Clear the drawing
const clearCanvas = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

// Download the drawing
const saveCanvas = function () {
  let downloadElem = document.createElement("a");
  let drawingName = document.getElementById("drawing-name").value;
  document.body.appendChild(downloadElem);
  downloadElem.href = canvas.toDataURL();
  downloadElem.download = `${
    drawingName === "Drawing Name" ? "My Drawing.png" : drawingName
  }`;
  downloadElem.click();
  document.body.removeChild(downloadElem);
};

// Upload the drawing to database
const uploadCanvas = function () {
  let drawingName = document.getElementById("drawing-name").value;
  let baseImg = canvas.toDataURL();
  drawingName === "Drawing Name" ? "My Drawing.png" : drawingName;
  addImageToDatabase(baseImg, drawingName);
};

// Get the api link based on the host name
const getApiLink = function () {
  if (window.location.href.substr(0, 22) === "http://localhost:5500/")
    return "http://localhost:8080/test";
  else return "http://localhost:8080/GET";
};

// The actual function used for uploading with POST request
const addImageToDatabase = function (baseImg, imgName) {
  // Disables button after first upload
  uploadBtn.disabled = true;
  console.log("clicked");
  // Use GET request to determine the new drawings id
  let xhttpGet = new XMLHttpRequest();
  xhttpGet.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let imgId;
      let jsonForId = JSON.parse(this.responseText);
      if (jsonForId.length != 0)
        imgId = jsonForId[jsonForId.length - 1].drawing.id + 1;
      else imgId = 1;
      let imageJson = `[{id: ${imgId}, name: "${imgName}", score: 0, data:"${baseImg}"}]`;
      let xhttpPost = new XMLHttpRequest();

      xhttpPost.open(
        "POST",
        window.location.href.substr(0, 22) === "http://localhost:5500/"
          ? "http://localhost:8080/insert"
          : "http://localhost:8080/POST",
        true
      );
      xhttpPost.setRequestHeader("Content-Type", "application/json");
      xhttpPost.send(imageJson);

      xhttpPost.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200)
          if (this.response === "duplicate") {
            // Duplicate name
            alert("Name taken, please choose a different name.");
            // Reenables the upload button
            uploadBtn.disabled = false;
          } else {
            alert("Your drawing has been uploaded.");
            uploadBtn.style.background = "grey";
            uploadBtn.style.cursor = "not-allowed";
          }
      };
    }
  };
  xhttpGet.open("GET", getApiLink(), true);
  xhttpGet.send();
};

resizeCanvas();

// Event listeners for corresponding elemenss
window.addEventListener("onload", loadColors());
window.addEventListener("resize", resizeCanvas());
canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stop);
clearBtn.addEventListener("click", clearCanvas);
saveBtn.addEventListener("click", saveCanvas);
uploadBtn.addEventListener("click", uploadCanvas);
