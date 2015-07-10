/**
 * Written by Michael Riley. 
 * Read in image data and store as javascript objects for jsNN.js to process and classify. 
 * 2015.
 */
 //Force good coding practice to raise code quality.
"use strict";

//Incoming data is all of the properties needed to make sense of the file. 
// callbackFunction is called once the images have been loaded and parsed. 
function LoadImagesFromFile(data, callbackFunction){
	//Create file reader
	var reader = new FileReader();
	
	//When reading is completed we will... callbackFunction. attach event handler. 
	reader.onloadend = function(evt){
		if (evt.target.readyState == FileReader.DONE){
			//Arraybuffer used to manipulate binary data. 
			var arrayBuf = reader.result;
			var dataViewer = new DataView(arrayBuf);		//Gives the methods we use to view the binary data. 
			var offsetPointer = data.initOffset;	//location of first byte of first image
			var imageSize = data.imageWidth * data.imageHeight;
			//assemble bytes into image objects. construct an array
			var imageArray = [];
			while(data.imageCount > 0){
				//for every 8 bits turn this into an integer value between 0 and 255. 
				var newImage = {};
				newImage.values = [];
				newImage.width = data.imageWidth;
				newImage.height = data.imageHeight;
				//grab the image pixel by pixel.
				for(var i=0;i<imageSize;i++){
					newImage.values.push(dataViewer.getUint8(offsetPointer));	//get an usigned (8-bit) int and append it to the image array.
					offsetPointer++;	//move to next byte. 
				}
				//Provide function to get pixel value by coordinates.
				newImage.getPixelAt = function(x,y){ return this.values[y*this.width + x]; };			
				imageArray.push(newImage);
				//update looping variables. images counter and byte array offset. 
				data.imageCount--;		//reduce images remaining count
				offsetPointer += data.imageSpacing;		//space between images
			}
			//Now the imageArray is constructed.. each element in the array is one of the images.
			callbackFunction(imageArray);
		}
	}
	
	//actually read the file.
	reader.readAsArrayBuffer(data.file) 
	
}