// const test = document.getElementById("submit"); Make JSON

// test.addEventListener("click", function () {
//   let id = parseInt(document.getElementById("id").value);
//   let name = document.getElementById("name").value;
//   let score = parseInt(document.getElementById("score").value);
//   let entryList = [];

//   for (let i = 0; i < 3; i++) {
//     let jsonData = {};
//     let jsonEntry = {};
//     jsonData["id"] = id;
//     jsonData["name"] = name;
//     jsonData["score"] = score;
//     jsonEntry["drawing"] = jsonData;
//     entryList.push(jsonEntry);
//     id++;
//     score = score + 500;
//     name = name + " again";
//   }
//   console.log(entryList);
// });

const get = document.getElementById("getBtn"); //GET request

get.addEventListener("click", function () {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let jsonArray = JSON.parse(this.responseText);
      for (let i = 0; i < jsonArray.length; i++) {
        console.log(jsonArray[i].drawing);
      }
    }
  };
  xhttp.open("GET", "http://localhost:8080/test", true);
  xhttp.send();
});

const post = document.getElementById("postBtn");

post.addEventListener("click", function () {
  // POST request
  let xhttp = new XMLHttpRequest();
  let order = { idInsert: "9", nameInsert: "Solidus", scoreInsert: "1627" };
  let urlOrder = `?idInsert=${order.idInsert}&nameInsert=${order.nameInsert}&scoreInsert=${order.scoreInsert}`;
  xhttp.open("POST", "http://localhost:8080/insert" + urlOrder, true);

  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.send();
});
