const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Fetch Images from Unsplash APi
const count = 30;
const apiKey = 'XCc2La1PfnRiNtbWx-iEsIqJOHEOt0s0sBLS715iVFk';
// const url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

// Check if all images were loaded
function imageLoaded() {
  imageLoaded++;

  if (imageLoaded === totalImages) {
    ready = true;
  }
}

// Helper function to set attributes.
function setAttributes(element, atts) {
  for (const key in atts) {
    element.setAttribute(key, atts[key]);
  }
}

// Create Elements For Links And Photos, Add To DOM
function displayPhotos() {
  photosArray.forEach(photo => {
    // Craete anchor tag <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, { href: photo.links.html, target: '_blank' });
    // Create image element
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });
    // Event listener, Check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put img element inside a element
    item.append(img);
    imageContainer.append(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(url);
    photosArray = await response.json();

    // Display Photos
    displayPhotos();
  } catch (err) {
    console.log(err);
  }
}

// On Load
getPhotos();
