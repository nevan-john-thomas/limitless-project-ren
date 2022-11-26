let slide_index = 0;
setTimeout(iterate_through_slides, 5000)

function iterate_through_slides() {
    let slides = document.querySelectorAll(".slideshow > img");
    for (const slide of slides) {
        slide.style.display = "none";
    }
    slide_index++;
    if (slide_index >= slides.length) {
        slide_index = 0
    }
    slides[slide_index].style.display = "block";
    setTimeout(iterate_through_slides, 2000);
}