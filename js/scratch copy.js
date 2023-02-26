const result = document.getElementById('label'); // The result tag in the HTML

result.innerText = 'Loading model...'

// Grab elements, create settings, etc.
const video = document.getElementById("video");

// Create a webcam capture
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  });
}

const loop = classifier => {
  classifier.classification(video).then(results => {
    result.innerText = `${results[0].label} - ${results[0].confidence.toFixed(4) * 100}%`;
    loop(classifier); // Call again to create a loop
  });
}

// Initialize the Image Classifier method with MobileNet passing the video as the
// second argument and the getClassification function as the third
ml5.FeatureExtractor("MobileNet").then(classifier => loop(classifier));