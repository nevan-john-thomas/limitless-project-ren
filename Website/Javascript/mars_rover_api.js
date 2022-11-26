const api_key = "0sGi3LGy1DbJCypkYvsZbhNCHhwSVVnTN5pExmnY";

get_mission_manifest("curiosity")
.then(retrieve_rover_images);

async function get_mission_manifest(rover) {
    console.log(rover)
    let mission_manifest_url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${api_key}`;
    
    let response = await fetch(mission_manifest_url);
    let data = await response.json();
    
    const manifest_data = data.photo_manifest;
    const most_recent_photo_date = manifest_data.max_date;
    const is_active = manifest_data.status;
    
    return [rover, most_recent_photo_date, is_active];
}

async function retrieve_rover_images([rover, most_recent_photo_date, is_active]) {
    let photo_date_element = document.getElementById("photo_date_element");
    photo_date_element.innerText = most_recent_photo_date;
    
    let images_request_url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${most_recent_photo_date}&api_key=${api_key}`;
    
    const response = await fetch(images_request_url);
    const data = await response.json();
    let photos = await data.photos;
    photos = photos.sort(() => 0.5 - Math.random()).slice(0, 10) // Shuffled and Sliced Photos

    let rover_element = document.getElementById(rover);
    
    for (const photo of photos) {
        if (photo.camera.name === "CHEMCAM" 
            || photo.camera.name === "NAVCAM" 
            || photo.camera.name === "FHAZ" 
            || photo.camera.name === "RHAZ") {
            
            let img_element = document.createElement("img");
            img_element.src = photo.img_src;
            rover_element.appendChild(img_element);
            console.log(photo)
        }
    }
}