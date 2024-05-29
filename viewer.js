const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const videoId = urlParams.get('v');

var body = document.body,
    html = document.documentElement;

var heightBody = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight)
fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
    .then(response => response.json())
    .then(data => {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
        var newHeight = window.innerHeight * 0.8;
        var newWidth = newHeight / (data.height / data.width);
        iframe.width = newWidth;
        iframe.height = newHeight;
        iframe.autoselect= true
        document.getElementById("vidCont").appendChild(iframe);

        document.getElementById("videoName").innerHTML = data.title;
        document.getElementById("authorName").innerHTML = data.author_name;


        const fullscreenButton = document.createElement('button');
        fullscreenButton.textContent = 'Fullscreen';
        fullscreenButton.onclick = function() {
            fullscreenButton.class = "button"
            if (!document.fullscreenElement) {
                iframe.requestFullscreen().catch(err => console.log(err));
            } else {
                document.exitFullscreen();
            }
        };
        document.getElementById("authorName").appendChild(document.createElement('br'))
              fullscreenButton.classList.add('smallButton');
        document.getElementById("authorName").appendChild(fullscreenButton);

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download (MP4, 1080p)';
        
        downloadButton.onclick = function() {
            let defaultApiUrl = 'https://co.wuk.sh/';

            const fixApiUrl = (apiUrl) => {
                return apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
            };

            let apiURL = fixApiUrl(defaultApiUrl);

            const changeApi = (newApiUrl) => {
                apiURL = fixApiUrl(newApiUrl);
            };

            const aBody = {
                url: `https://www.youtube.com/watch?v=${videoId}`,
                "vQuality": "1080"
            };

            async function fetchDataAndOpen() {
                try {
                    const response = await fetch(`${apiURL}/api/json`, {
                        method: "POST",
                        body: JSON.stringify(aBody),
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        }
                    });

                    if (!response.ok) throw new Error('Network response was not ok');

                    const data = await response.json();
                    window.open(data.url, "_blank");
                } catch (error) {
                    console.error("There was a problem with the fetch operation:", error);
                }
            }

            fetchDataAndOpen();
        }


        const downloadButton2 = document.createElement('button');
        downloadButton2.textContent = 'Download (MP3)';

        downloadButton2.onclick = function() {
            let defaultApiUrl = 'https://co.wuk.sh/';

            const fixApiUrl = (apiUrl) => {
                return apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
            };

            let apiURL = fixApiUrl(defaultApiUrl);

            const changeApi = (newApiUrl) => {
                apiURL = fixApiUrl(newApiUrl);
            };

            const aBody = {
                "url": "https://www.youtube.com/watch?v=fAqa1ozCuj8",
                "vQuality": "1080",
                "isAudioOnly": "true"
            };

            async function fetchDataAndOpen() {
                try {
                    const response = await fetch(`${apiURL}/api/json`, {
                        method: "POST",
                        body: JSON.stringify(aBody),
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        }
                    });

                    if (!response.ok) throw new Error('Network response was not ok');

                    const data = await response.json();
                    window.open(data.url, "_blank");
                } catch (error) {
                    console.error("There was a problem with the fetch operation:", error);
                }
            }

            fetchDataAndOpen();
        }
          downloadButton.classList.add('smallButton');
          downloadButton2.classList.add('smallButton');
        document.getElementById("authorName").appendChild(downloadButton);
        document.getElementById("authorName").appendChild(downloadButton2);
    })
    .catch(error => console.error('Error fetching video details:', error));