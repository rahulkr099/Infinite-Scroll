// Select the DOM elements with the IDs 'image-container' and 'loader'.
const imgContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Initialize an array to hold the photo data from Unsplash API.
let photosArray = [];

// Variables to track if all images are loaded.
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API configuration.
const count = 10; // Number of images to fetch.
const apiKey = 'Lvikm1D-8ThYagMgnGA6gEHA-Brkt6fr2HamAUz5DRQ'; // Replace with your Unsplash API key.
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Function to check if all images have loaded.
function imageLoaded() {
    console.log("Image Loaded");
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        console.log('ready:', ready);
    }
}

// Function to create elements for links and photos, then add them to the DOM.
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('TotalImages',totalImages);
    // Iterate over each photo object in photosArray.
    photosArray.forEach((photo) => {
        // Create an anchor element (<a>) to link to the Unsplash photo page.
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        // Create an image element (<img>) for the photo.
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        // Add an event listener to check when the photo has finished loading.
        img.addEventListener('load', imageLoaded);

        // Insert the <img> inside the <a>, then append both to the image-container element.
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}

// Async function to fetch photos from Unsplash API.
async function getPhotos() {
    try {
        const response = await fetch(apiUrl); // Fetch data from Unsplash API.
        photosArray = await response.json(); // Parse JSON response into photosArray.
        console.log(photosArray);
        displayPhotos(); // Call displayPhotos to process and show images.
    } catch (error) {
        // Handle errors here, such as network issues or invalid responses.
        console.log('Unsplash API is not running', error);
    }
}

/*Note: window is parent of document and window is grandparent of body */
// Event listener for infinite scrolling functionality.
window.addEventListener('scroll', () => {
    // Check if the user has scrolled near the bottom of the page; load more photos if true.
    if (window.innerHeight + window.scrollY <= document.body.offsetHeight - 1000 && ready) {
        console.log('Load More...');
        ready = false; // Reset ready status to prevent multiple loads at once.
        getPhotos(); // Fetch more photos from Unsplash API.
    }
});

// Initial call to getPhotos when the page loads.
getPhotos();
