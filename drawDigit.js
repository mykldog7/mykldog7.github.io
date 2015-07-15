/**
 * Written by Michael Riley. 
 * Code for digit drawing component. 
 *	
 * 2015.
 */
"use strict"; //bug splatterer

// graphics_globals.
var g_paint;
var g_context = {};
var g_clickX = new Array();		//arrays store data that the canvas must render. 
var g_clickY = new Array();
var g_clickDrag = new Array();

//init canvas.. attach methods
function setupCanvasToDraw(canvasElem){
	g_context = canvasElem.getContext("2d");
	canvasElem.onmousedown = function(e){
		var mouseX = e.pageX - cumulativeOffset(canvasElem).left;
		var mouseY = e.pageY - cumulativeOffset(canvasElem).top;
		g_paint = true;
		addClick(e.pageX - cumulativeOffset(canvasElem).left, e.pageY - cumulativeOffset(canvasElem).top);
		redrawCanvas();
	};
	canvasElem.onmousemove = function(e){
		if(g_paint){
			addClick(e.pageX - cumulativeOffset(canvasElem).left, e.pageY - cumulativeOffset(canvasElem).top, true);
			redrawCanvas();
		}
	};
	canvasElem.onmouseup = function(e){
		g_paint = false;
	};
	canvasElem.onmouseleave = function(e){
	  g_paint = false;
	};
}
//when user clicks/drags save coordinates into those global arrays.
function addClick(x, y, dragging)
{
  g_clickX.push(x);
  g_clickY.push(y);
  g_clickDrag.push(dragging);
}

/*Re render the canvas from the content of those arrays.. clear it to black first. */
function redrawCanvas(){
	 console.log("Redrawing..");
	g_context.fillStyle="#000000";
	g_context.fillRect(0, 0, g_context.canvas.width, g_context.canvas.height); // Clears the canvas

	g_context.strokeStyle = "#ffffff";
	g_context.lineJoin = "round";
	g_context.lineWidth = 23;
			
	for(var i=0; i < g_clickX.length; i++) {		
		g_context.beginPath();
		if(g_clickDrag[i] && i){
			g_context.moveTo(g_clickX[i-1], g_clickY[i-1]);
		}else{
			g_context.moveTo(g_clickX[i]-1, g_clickY[i]);
		}
		g_context.lineTo(g_clickX[i], g_clickY[i]);
		g_context.closePath();
		g_context.stroke();
	}
}

function applyNetworkToCanvas(){
	//grab image data .. its 280*280*4. 
	var imgDataObj = g_context.getImageData(0, 0, g_context.canvas.width, g_context.canvas.height);
	
	var imageParameters = {width: sliceCountX, height: sliceCountY};
	
	//use the old functions, first create an full image object. 
	var retImage = reduceImageData(imgDataObj)
	var singleImageArray= [];
	var userImage = {};
	userImage.width = sliceCountX;
	userImage.height = sliceCountY;
	userImage.values = retImage;
	userImage.getPixelAt = function(x,y){ return this.values[y*this.width + x]; };	
	
	//setup labelarray
	var result = classifyGivenImage(userImage);
	var digitGuess = result.indexOf(1);
	var userLabelArray= [];
	userLabelArray[0] = digitGuess;
	
	//setupImage array;
	singleImageArray[0] = userImage;
	
	//grab location to load new image and label
	var placeHolderDiv = document.getElementById("processed-image-here");
	
	makeCanvasElements(placeHolderDiv, singleImageArray, imageParameters, "user-")
	
	//addLablesToCanvasesExt(parentELEM, labelArray, offset, lblColor1, lblColor2, imageList)
	addLablesToCanvasesExt(placeHolderDiv, userLabelArray, 0, "orange", "black", "user-");			// in makeCanvas.js
	
}

//globals used by other functions in this file. 
var sliceCountX =28;
var sliceCountY =28;

//How many pixels in each slice in each dimension.
var sliceX	= 10;
var sliceY	= 10;

//location in the original image. and location in the new image. 
var xbig;
var xsmall;

var ybig;
var ysmall;

function reduceImageData(imgData){
//Image is divided into chunks.. 28 in each dimension. Each of these chunks is a 10by10 square.
// The percentage of these squares that are white is the greyscale value of the corresponding reduced image. 
	//how many slices are made in the original image to reduce it to the require size for the network. 
	
	var processedImage = [];
	for(ybig=0; ybig < sliceCountY; ybig++){
		for(xbig=0; xbig < sliceCountX; xbig++){
			var totalIntensitySlice = 0;
			for(ysmall=0; ysmall < sliceY; ysmall++){
				for(xsmall=0; xsmall < sliceX; xsmall++){
					var rowLength = sliceCountX*sliceX;
					var currentPixelOffset = ((ybig*sliceY*(rowLength)) + (xbig*sliceX) + (ysmall*(rowLength)) + (xsmall))*4; 	//*4 as each pixel is 4 elements. 							
					
					if(imgData.data[currentPixelOffset+0] > 0) {totalIntensitySlice += imgData.data[currentPixelOffset+0]};	//if the red channel is full then its white. // as I only let them draw white.
					
				}
			}
			//scale totalIntensitySlice from 0<10*10 (sliceX and sliceY) to between 0<x<255
			var newPixVal = Math.floor((totalIntensitySlice/25500)*255);  // invert, multiply by (1/1275) and add 0.
			processedImage.push(newPixVal);
		}
	}
	return processedImage;
}




