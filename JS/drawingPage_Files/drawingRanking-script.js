const loadDrawings = function () {
  // Get the api link based on the host name
  apiLink =
    window.location.href.substr(0, 22) === "http://localhost:5500/"
      ? "http://localhost:8080/test?additionalQuery= ORDER BY score DESC"
      : "http://localhost:8080/GET?additionalQuery= ORDER BY score DESC";

  let xhttpGet = new XMLHttpRequest();
  xhttpGet.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let imagesJson = JSON.parse(this.responseText);
      pageCreation(imagesJson);
    }
  };
  xhttpGet.open("GET", apiLink, true);
  xhttpGet.send();
};

const pageCreation = function (imagesJson) {
  let imageRow;
  imageRow = document.createElement("div");
  imageRow.classList.add("row");
  for (let i = 0; i < imagesJson.length; i++) {
    let id, src, name, score;
    id = imagesJson[i].drawing.id;
    name = imagesJson[i].drawing.name;
    score = imagesJson[i].drawing.score;
    src = imagesJson[i].drawing.data;

    let newImageContainer,
      newImageSrc,
      newImageDetails,
      newNameRow,
      newScoreRow,
      newImageName,
      newImageScore,
      newPlusButton,
      newMinusButton;

    newImageContainer = document.createElement("div");
    newImageContainer.classList.add("col-4");

    newImageSrc = document.createElement("img");
    newImageSrc.src = src;

    newImageDetails = document.createElement("div");
    newImageDetails.classList.add("container-fluid");

    newNameRow = document.createElement("div");
    newNameRow.classList.add("row");

    newScoreRow = document.createElement("div");
    newScoreRow.classList.add("row");

    newImageName = document.createElement("p");
    newImageName.classList.add("col-9");
    newImageName.id = `${name}-name`;
    newImageName.textContent = name;

    newImageScore = document.createElement("p");
    newImageScore.classList.add("col-5");
    newImageScore.id = `${name}-score`;
    newImageScore.textContent = score;

    newPlusButton = document.createElement("button");
    newPlusButton.classList.add("col-2");
    newPlusButton.id = `${name}-plus-btn`;
    newPlusButton.textContent = `+`;
    newPlusButton.addEventListener("click", function () {
      score++;
      PUT(id, name, score, src, `${name}-plus-btn`);
      newImageScore.textContent = score;
    });

    newMinusButton = document.createElement("button");
    newMinusButton.classList.add("col-2");
    newMinusButton.id = `${name}-minus-btn`;
    newMinusButton.textContent = `-`;
    newMinusButton.addEventListener("click", function () {
      score--;
      PUT(id, name, score, src, `${name}-minus-btn`);
      newImageScore.textContent = score;
    });

    newNameRow.appendChild(newImageName);

    newScoreRow.appendChild(newImageScore);
    newScoreRow.appendChild(newPlusButton);
    newScoreRow.appendChild(newMinusButton);

    newImageDetails.appendChild(newNameRow);
    newImageDetails.appendChild(newScoreRow);

    newImageContainer.appendChild(newImageSrc);
    newImageContainer.appendChild(newImageDetails);

    if (i % 3 === 0 && i !== 1 && i !== 0) {
      imageRow = document.createElement("div");
      imageRow.classList.add("row");
    }
    imageRow.appendChild(newImageContainer);
    document.getElementById("showcase-area").appendChild(imageRow);
  }
};

const PUT = function (targetId, imgName, newScore, baseImg, clickedElement) {
  clickedElement.disabled = true;
  let updateJson = `[{id: ${targetId}, name: "${imgName}", score: ${newScore}, data:"${baseImg}"}]`;
  let xhttpPut = new XMLHttpRequest();

  xhttpPut.open(
    "PUT",
    window.location.href.substr(0, 22) === "http://localhost:5500/"
      ? "http://localhost:8080/update/" + targetId
      : "http://localhost:8080/PUT/" + targetId,
    true
  );
  xhttpPut.setRequestHeader("Content-Type", "application/json");
  xhttpPut.send(updateJson);

  xhttpPut.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200)
      clickedElement.disabled = false;
  };
};

loadDrawings();
