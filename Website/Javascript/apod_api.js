let img = document.getElementById("apod_image");
let caption_div = document.getElementById("apod_caption");
let explanation_div = document.getElementById("apod_explanation");
const api_key = "jsVWx7fBwcgnMNmuxrZAN1LZFuyEO1yNWDcHiYJy";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`)
.then(response => {
    // let ratelimit = response.headers.get("X-RateLimit-Limit");
    // let remaining = response.headers.get("X-RateLimit-Remaining");

    // console.log(`${remaining} calls remain out of ${ratelimit}`);
    return response.json()
})
.then(data => {
    let title = data.title;
    let explanation = data.explanation;
    let url = data.url;

    img.src = url;
    caption_div.innerText = title;
    explanation_div.innerText = explanation;
});