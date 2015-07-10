/**
 * Written by Michael Riley. 
 * Take image data and create canvas representations of it. Added to the center of the index.html section.
 * 2015.
 */
//Force strict mode. 
"use strict"; 	
 
//Loop over every image in the imagesArray. 
// add generated canvas elements to the parentELEM. (blank it first.)
// do this according to the imageParameters object.
var imgA; 
function makeCanvasElements(parentELEM, imagesArray, imageParameters){
	imgA = imagesArray;	//globalize so I can debug it. //REMOVE THIS LINE AND THE ONE ABOVE.
	parentELEM.innerHTML = "";	//make sure the thing is empty. We want to overwrite. 
	imagesArray.forEach(function(image,index){
		var canvas = document.createElement("canvas");
		//grab the context to draw into. This will be rendered on the canvas. 
		var graphicContext = canvas.getContext("2d");
		//generate pixel set
		var imageData = graphicContext.createImageData(imageParameters.width, imageParameters.height);
		//set canvas element attributes. 
		canvas.id     = "image-"+index;
		canvas.width  = imageParameters.width;
		canvas.height = imageParameters.height;
		canvas.className += "image-display col-sm-2";
		//For each pixel in this image. we set the pixel in the imageData(to be drawn to canvas). 
		image.values.forEach(function(pixelValue, index){
			imageData.data[(index*4)+0] = pixelValue;
			imageData.data[(index*4)+1] = pixelValue;
			imageData.data[(index*4)+2] = pixelValue;
			imageData.data[(index*4)+3] = 255;
		});
		graphicContext.putImageData(imageData, 0, 0);	//imageData and upper left hand corner coordinates. 
		parentELEM.appendChild(canvas);
	});
}