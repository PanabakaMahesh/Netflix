// Array of custom banner images with titles and descriptions
const bannerData = [
  {
    image: "./images/Raayann.jpg",
    title: "Raayan ",
    description: "Dhanush plays Kaathavarayan, aka Raayan, the eldest of four siblings, including the troublemaker Muthuvel (Sundeep Kishan), the studious Manickavel (Kalidas) and the one he dotes on, Durga (Dushara Vijayan). When Durga is a few months old, the parents leave home to attend some work but never return.",
  },
  {
    image: "./images/india3.jpg",
    title: "Indian - 3 ",
    description: "Kamal Haasan reprises his role as Senapathy, an ageing freedom fighter turned vigilante who fights against corruption, alongside an ensemble cast including Siddharth, S. J.",
  },
  {
    image: "./images/The-Goat-Life.jpg",
    title: "Goat Life (Aadujeevitham)",
    description: "Kattappa narrates the story of Amarendra Baahubali to Shivudu, who learns his lineage as the prince of Mahishmati and the son of Amarendra Baahubali. Shivudu, now Mahendra Baahubali, decides to dethrone and punish Bhallaladeva for all wrongdoings of his past with the help of Kattappa.",
  },
  {
    image: "./images/str4.jpg",
    title: "Stanger Things - 4 ",
    description: "The first plotline takes place in Hawkins, where a series of mysterious teenage murders begin haunting the town.",
  },
  {
    image: "./images/gkmb.jpg",
    title: "Guntur Kaaram ",
    description: "In Guntur, brothers Dokka Marx Babu and Lenin Babu, two of the biggest hooligans in the city, burn down Bhogineni Satyam alias 'Royal' Satyam's mirchi factory. Satyam, seeing this, approaches Marx and Lenin to question them, while the factory is burning.",
  },
  {
    image: "./images/RRR.jpg",
    title: "RRR ",
    description: "RRR is an entirely fictitious story incorporating the lives of two real-life Indian revolutionaries, namely Alluri Sitarama Raju and Komaram Bheem, who fought against the British Raj and the Nizam of Hyderabad respectively. Charan plays Rama Raju while Rama Rao plays Komaram Bheem.",
  },
  // Add more banner data as needed
];

// Function to get a random banner object from the array
function getRandomBannerData(bannerDataArray) {
  const randomIndex = Math.floor(Math.random() * bannerDataArray.length);
  return bannerDataArray[randomIndex];
}

// Your API key from TMDB
const api = "api_key=fd05294e902b54b9292b4f0175532e0a";

// Base URL of the site
const base_url = "https://api.themoviedb.org/3";
const img_url = "https://image.tmdb.org/t/p/original"; // Adjust the size as needed

// Requests for movies data
const requests = {
  fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
  fetchNetflixOrignals: `${base_url}/discover/tv?${api}&with_networks=213`,
  fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
  fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
  fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
  fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
  fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
  fetchRandomMovie: `${base_url}/movie/popular?${api}&language=en-US&page=${Math.floor(Math.random() * 500) + 1}`,
};

// Used to truncate the string
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

document.addEventListener("DOMContentLoaded", function() {
  var banner = document.getElementById("banner");
  var banner_title = document.getElementById("banner__title");
  var banner__desc = document.getElementById("banner__description");

  // Randomly decide whether to show a custom banner or a TMDB movie/TV show banner
  const useCustomBanner = Math.random() < 0.5;

  if (useCustomBanner) {
    // Get random banner data (image, title, description)
    const randomBannerData = getRandomBannerData(bannerData);

    // Set the banner background image, title, and description
    banner.style.backgroundImage = "url(" + randomBannerData.image + ")";
    banner_title.innerText = randomBannerData.title;
    banner__desc.innerText = randomBannerData.description;
  } else {
    // Fetch a random popular movie/TV show from TMDB
    fetch(requests.fetchRandomMovie)
      .then((res) => res.json())
      .then((data) => {
        const movie = data.results[Math.floor(Math.random() * data.results.length)];
        banner.style.backgroundImage = "url(" + img_url + movie.backdrop_path + ")";
        banner_title.innerText = movie.title || movie.name;
        banner__desc.innerText = truncate(movie.overview, 150);
      })
      .catch((error) => console.error("Error fetching TMDB data:", error));
  }

  // Fetch and display movie data
  function fetchAndDisplayMovies(requestUrl, rowTitle) {
    fetch(requestUrl)
      .then((res) => res.json())
      .then((data) => {
        const headrow = document.getElementById("headrow");
        const row = document.createElement("div");
        row.className = "row";

        headrow.appendChild(row);

        const title = document.createElement("h2");
        title.className = "row__title";
        title.innerText = rowTitle;
        row.appendChild(title);

        const row_posters = document.createElement("div");
        row_posters.className = "row__posters";
        row.appendChild(row_posters);

        data.results.forEach((movie) => {
          const poster = document.createElement("img");
          poster.className = "row__poster";
          poster.src = img_url + movie.poster_path;
          row_posters.appendChild(poster);
        });
      });
  }

  // Display movie rows
  fetchAndDisplayMovies(requests.fetchNetflixOrignals, "NETFLIX ORIGINALS");
  fetchAndDisplayMovies(requests.fetchTrending, "Top Rated");
  fetchAndDisplayMovies(requests.fetchActionMovies, "Action");
  fetchAndDisplayMovies(requests.fetchComedyMovies, "Comedy");
  fetchAndDisplayMovies(requests.fetchHorrorMovies, "Horror");
  fetchAndDisplayMovies(requests.fetchRomanceMovies, "Romance");
  fetchAndDisplayMovies(requests.fetchDocumentaries, "Documentaries");
});
