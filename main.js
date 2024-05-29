let apiUrl = "https://vid.puffyan.us"
let trendingApiPath = "/api/v1/trending"
let searchApiPath = "/api/v1/search"

function populateMain() {
  let mainCont = document.getElementById("main")
  let didntGo = 0;
  mainCont.innerHTML = "<p class=\"urbanist-600\">Grabbing a list of videos... this might take a while</p>"

  document.addEventListener("DOMContentLoaded", function() {
    fetch('https://vid.puffyan.us/api/v1/popular')
      .then(response => response.json())
      .then(data => {
        if (didntGo === 0) {
          mainCont.innerHTML = ""
          didntGo = 1
        }
        const videoContainer = document.getElementById('main');
        data.forEach(video => {
          const videoElement = document.createElement('div');
          videoElement.classList.add('video');
          videoElement.innerHTML = `
              <a href="/watch.html?v=${video.videoId}">
              <div class="image">
                <img src="${video.videoThumbnails[0].url}" alt="${video.title}">
              </div>
              </a>
              <div class="vidInfo"><a href="/watch.html?v=${video.videoId}">
                <div class="videoName urbanist-400">
                  <p>${video.title}</p>
                </div>
                <div class="authorName urbanist-400">
                  <p>${video.author}</p>
                </div>
              </a></div>
          `;
          videoContainer.appendChild(videoElement);
        });
      })
      .catch(error => console.error('Error fetching the data:', error));
  });
}

populateMain()

function populateSearch() {
  let mainCont = document.getElementById("main")
  let input = document.getElementById("search").value
  mainCont.innerHTML = "<p class=\"urbanist-600\">Grabbing a list of videos... this might take a while</p>"
  let didntGo = 0;
  
    fetch(`https://vid.puffyan.us/api/v1/search?q=${input}&page=1&type=all`)
      .then(response => response.json())
      .then(data => {
        if (didntGo === 0) {
          mainCont.innerHTML = ""
          didntGo = 1
        }
        const videoContainer = document.getElementById('main');
        data.forEach(video => {
          if (video.type === "video") {
          const videoElement = document.createElement('div');
          videoElement.classList.add('video');
          videoElement.innerHTML = `
              <a href="/watch.html?v=${video.videoId}">
              <div class="image">
                <img src="${video.videoThumbnails[0].url}" alt="${video.title}">
              </div>
              </a>
              <div class="vidInfo"><a href="/watch.html?v=${video.videoId}">
                <div class="videoName urbanist-400">
                  <p>${video.title}</p>
                </div>
                <div class="authorName urbanist-400">
                  <p>${video.author}</p>
                </div>
              </a></div>
          `;
          videoContainer.appendChild(videoElement);
          } else if (video.type === "channel") {
              const videoElement = document.createElement('div');
              videoElement.classList.add('channel');
            videoElement.innerHTML = `
                <a href="https://youtube.com/${video.authorId}">
                  <div class="image">
                    <img class="authorImage" src="${video.authorThumbnails[3].url}" alt="${video.author}">
                  </div>
                </a>
                <div class="vidInfo">
                  <div class="videoName urbanist-400">
                    <p>${video.author}</p>
                  </div>
                  <div class="authorName urbanist-400">
                    <p>${video.subCount}</p>
                  </div>
                </div>
            `;
              videoContainer.appendChild(videoElement);
              }
        });
      })
      .catch(error => console.error('Error fetching the data:', error));
  }
