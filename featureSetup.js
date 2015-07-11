/**
 * Written by Michael Riley. 
 * Setup input nodes and thier features. updates the given nodeArray. 
 * The features are cool. They can represent a huge vareity of features in the image. 
 * They consist of one central pixel and various nearby ones. Each of these has an expected value and is used to calculate error 
 * 2015. 
 */
//Make sure bugs splatter and are obvious to fix.
"use strict"; 
//small test string..for Chrome console:     generateFeatures({width:28, height:28}, 5);

//Generate an array of features. and their methods. 
function generateInputs(nodeArray, imageDimensions, numberOfInputNodesToGenerate){
	//storage for generated features. 
	while(numberOfInputNodesToGenerate > 0){
		// pick a centering location. each of the other interest locations will be near to this one. 
		var targetValues = [0, 255];		//could have greyscale values added, but keep it simple for now. 
		// This pixel becomes the centering pixel which all others are near to. But not exactly the same. 
		var anchorPixel = {	x:		Math.floor((Math.random() * imageDimensions.width) + 1),	
							y:		Math.floor((Math.random() * imageDimensions.height) + 1),
							val: 	targetValues[Math.floor(Math.random()*targetValues.length)]}		//selects one of the indexes in the array.
		var singleInput = {
			locations : [	anchorPixel,	//element zero of this array is the anchoring interest pixel.
							{	x: anchorPixel.x+genRadialOffset(), 
								y: anchorPixel.y+genRadialOffset(),
								val: targetValues[Math.floor(Math.random()*targetValues.length)]
							},{	x: anchorPixel.x+genRadialOffset(), 
								y: anchorPixel.y+genRadialOffset(),
								val: targetValues[Math.floor(Math.random()*targetValues.length)]
							},{	x: anchorPixel.x+genRadialOffset(), 
								y: anchorPixel.y+genRadialOffset(),
								val: targetValues[Math.floor(Math.random()*targetValues.length)]
							},{	x: anchorPixel.x+genRadialOffset(), 
								y: anchorPixel.y+genRadialOffset(),
								val: targetValues[Math.floor(Math.random()*targetValues.length)]
							}],
			layer:			"input",
			id: 			getId(),
			setImage:		function(image) {this.image = image;},
			outputValue : 	function(){ /* Returns the value of this feature when computed on the given image. Watch for out of bounds indexes. Cap them. */
								var image = this.image;	//must set the image before we can get an output value!
								if(image == undefined){return "error, no image set";}
								//inline function to check coordinates are valid and cap if needed. ultra hacky.. this is breaks if images aren't square.
								function chkCds(a){return (a<0) ? 0 : ( (a>( image.width>image.height ? image.height : image.width )-1 ? ( image.width>image.height ? image.height : image.width )-1 : a) ); }
								if(image == undefined){return undefined;}	//Fail silently. 
								var featureErrorSum = 0;	//error value sum, accumulator .
								this.locations.forEach( function(loc){
									var pxError = Math.abs(loc.val - image.getPixelAt(chkCds(loc.x), chkCds(loc.y)));	//calc error at this interest pixel. absolute value of difference
									featureErrorSum += pxError;			//add to the err accumulator 
								});
								/*linear transform (scale): 	0 error gives value of 1. 
															255*5(1275) gives value of 0*/
								return (1275 - featureErrorSum)/1275;		// invert, multiply by (1/1275) and add 0.
							}
		};
		nodeArray.push(singleInput);
		numberOfInputNodesToGenerate--;
	}
	//send the result.
	return nodeArray;
}

//Utility functions..
//Generate a different offset from anchor.. plus one value of memory to stop multiple zeros being generated in row.
var featureMaxRadius = 3;			//how far from the feature center can other interest pixels be?
var prevRandomValue;				//special storage to stop the function below returning zero twice in a row.
function genRadialOffset(){		// returns a value between +maxRadius and -maxRadius. never returns zero twice in a row.
	var a = Math.floor((Math.random() * 2*featureMaxRadius) + 1)-featureMaxRadius
	while(a == 0 && prevRandomValue == 0){
		a = Math.floor((Math.random() * 2*featureMaxRadius) + 1)-featureMaxRadius;
	}
	prevRandomValue = a;
	return a;
}