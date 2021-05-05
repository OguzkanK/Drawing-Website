const resultList = document.getElementById("results");
new URLSearchParams(window.location.search).forEach((id, name, score) => {
  resultList.append(`${id}, ${name}, ${score}`);
});
