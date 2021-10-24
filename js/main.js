const canvasNode = document.getElementById('canvas');
const context = canvasNode.getContext('2d');

let firstImageInput = document.getElementById('first-image');

let secondImageInput = document.getElementById('second-image');


const switchButton = document.getElementById('switch-button');

const downloadButton = document.getElementById('download-button');


let firstImage = new Image();
let secondImage = new Image();


function canvas1() {

  if (!!firstImage.src) {
    drawFirstImage();
  }

}

function canvas2() {
    
  if (!!secondImage.src) {
    drawSecondImage();
  }
}

function updateCanvas(){
  if (!!firstImage.src) {
    drawFirstImage();
  }

  if (!!secondImage.src) {
    drawSecondImage();
  }
}


function drawFirstImage() {
  // Draw First iMage, regular opacity
  context.save();  
  // Draw Image
  context.drawImage(firstImage, 0, 0, 600, 600);
}

function drawSecondImage() {
  context.save();
  // Draw Image  
  context.drawImage(secondImage, 0, 0, 600, 600); 
}


function handleImageChange(imageObj, evt) {  
  const { files } = evt.target;
  const firstFile = files[0];  

  const reader = new FileReader();

reader.onload = (img => {
  // When a file is read, we want to update the source of the image object.
  return (e) => {
    const { result: imageFile } = e.target;
    // Set the image object's source to this
    imageObj.src = imageFile;
  }
})(firstFile);  
  reader.readAsDataURL(firstFile);
}

function switchImages() {
  const firstImageCopy = firstImage.cloneNode();
  const secondImageCopy = secondImage.cloneNode();
  
  firstImage = secondImageCopy;
  secondImage = firstImageCopy;
  updateCanvas();
  initialize();
}

function downloadCanvas(evt) {
    canvasNode.toBlob((blob) => {
        const timestamp = Date.now().toString();
        const a = document.createElement('a');
        document.body.append(a);
        a.download = `profile.png`;
        a.href = URL.createObjectURL(blob);
        a.click();
        a.remove();
      });
}
document.getElementById('download-button').addEventListener('click', downloadCanvas);

function initialize() {
  firstImageInput.addEventListener('change', handleImageChange.bind(this, firstImage));

secondImageInput.addEventListener('change', handleImageChange.bind(this, secondImage));



switchButton.addEventListener('click', switchImages);

firstImage.onload = canvas1;
secondImage.onload = canvas2;

}

function loadDefaults() {
  
  firstImage.src = "";
  secondImage.src = "";

}

initialize();
loadDefaults();

cropper.start(canvasNode, 1); // initialize cropper by providing it with a target canvas and a XY ratio (height = width * ratio)
						
			function handleFileSelect() {
				// this function will be called when the file input below is changed
				var file = firstImageInput.files[0];  // get a reference to the selected file
				
				var reader = new FileReader(); // create a file reader
				// set an onload function to show the image in cropper once it has been loaded
				reader.onload = function(event) {
					var data = event.target.result; // the "data url" of the image
					cropper.showImage(data); // hand this to cropper, it will be displayed
				};
				
				reader.readAsDataURL(file); // this loads the file as a data url calling the function above once done
			}
      
			
