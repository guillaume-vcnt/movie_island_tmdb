// import config from './config.js';
// console.log(`API Key: ${config.API_KEY}`);

const genre = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  romance: 10749,
  sciencefiction: 878,
  thriller: 53,
  war: 10752,
  western: 37,
};

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTc4NThmMGFhYzFjNTAxMWM0NmIxMTZmOTljNjUwZSIsIm5iZiI6MTcyNDkyMDE0MS40MTg2NzIsInN1YiI6IjY2Y2Q5MzY5N2JmMjdmYWE2OGM1NzhmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ObjFS5WdocA-Faub3uydXDfDoYqiTFb8VP2kOpJxRC8",
  },
};

window.onload = function mainPage() {
  const DisplayElements = document.querySelectorAll(
    ".poster-container, .mandatory-text, #return-button"
  );
  DisplayElements.forEach((element) => {
    element.style.display = "none";
  });
};

document.querySelector("#start-button").addEventListener("click", () => {
  const selectIsValid = document.querySelector("#genre-select").value
  
  if (selectIsValid === "") {
    const mandatoryOn = document.querySelector(".mandatory-text");
    mandatoryOn.style.display = "flex";
} else {
  fetchApi();
  const posterContainerON = document.querySelector(".poster-container");
  posterContainerON.style.display = "flex";
  const returnButtonON = document.querySelector("#return-button");
  returnButtonON.style.display = "flex";
  const mainContainerOff = document.querySelector(".main-container");
  mainContainerOff.style.display = "none";
}
});

async function fetchApi() {
  const page = Math.round(Math.random() * 500);
  const genreSelected = document.querySelector("#genre-select").value;

  const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre[genreSelected]}`;
  const response = await fetch(apiUrl, options).catch((err) => {
    console.error(err);
  });

  const data = await response.json();
  const movies = data;
  console.log("🎥", movies);

  const resultsObjet = randomObjet();
  function randomObjet() {
    return Math.round(Math.random() * 19);
  }
  console.log("📂", resultsObjet);

  const posterUrl = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";
  const posterPath = movies.results[resultsObjet].poster_path;
  const posterElm = document.createElement("img");
  posterElm.src = posterUrl + posterPath;
  const posterContainer = document.querySelector(".poster-container");
  posterContainer.appendChild(posterElm);

  document.querySelector("#return-button").addEventListener("click", () => {
    function refreshPage() {
      location.reload();
    }
    refreshPage();
  });
}
