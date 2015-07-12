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
function makeCanvasElements(parentELEM, imagesArray, imageParameters){
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
/*Add labels to canvas elements*/
function addLablesToCanvases(parentELEM, labelArray){
	labelArray.forEach(function(label,index){
		var cElem = document.getElementById("image-"+index);
		var gcontext = cElem.getContext("2d");
		var xO = 21;		//postion and size of the small label...
		var yO = 18;
		var w = 7;
		var h = 10;
		gcontext.fillStyle = "rgba(144, 238, 144, 0.6)";	//color of box.	
		gcontext.fillRect(xO, yO, w, h)
		gcontext.font = "9pt sans-serif";
		gcontext.fillStyle = "yellow";						//color of text.	
		gcontext.fillText(""+label, xO, yO+h);				//actually draw text. 
	});
}

/*Add labels to canvas elements starting at offset. And specifying a colour.*/
function addLablesToCanvasesExt(parentELEM, labelArray, offset, lblColor1, lblColor2){
	labelArray.forEach(function(label,index){
		var cElem = document.getElementById("image-"+(index+offset));
		var gcontext = cElem.getContext("2d");
		var xO = 21;		//postion and size of the small label...
		var yO = 18;
		var w = 7;
		var h = 10;
		gcontext.fillStyle = lblColor1; //"rgba(144, 238, 144, 0.6)";	//color of box.	
		gcontext.fillRect(xO, yO, w, h)
		gcontext.font = "9pt sans-serif";
		gcontext.fillStyle = lblColor2; //"yellow";						//color of text.	
		gcontext.fillText(""+label, xO, yO+h);				//actually draw text. 
	});
}