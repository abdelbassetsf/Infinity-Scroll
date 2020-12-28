const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Fetch Images from Unsplash APi
let imageLoadCount = 1;
const apiKey = config.API_KEY;
let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageLoadCount}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    imageLoadCount = 5;
  }
}

// Helper function to set attributes.
function setAttributes(element, atts) {
  for (const key in atts) {
    element.setAttribute(key, atts[key]);
  }
}

// Create Elements For Links And Photos, Add To DOM
function displayPhotos(photosArray) {
  // Resseting the imagesLoaded after images loaded
  imagesLoaded = 0;
  // Set total number of images
  totalImages = photosArray.length;
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
    const photosArray = await response.json();

    // Display Photos
    displayPhotos(photosArray);
  } catch (err) {
    console.log(err);
  }
}

// Check to see if scrolling near bottom of page, load more images
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
