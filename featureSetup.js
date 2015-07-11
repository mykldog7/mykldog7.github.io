/**
 * Written by Michael Riley. 
 * Setup input nodes and thier features. updates the given nodeArray. 
 * The features are cool. They can represent a huge vareity of features in the image. 
 * They consist of one central pixel and various nearby ones. Each of these has an expected value and is used to calculate error 
 * 2015. 
 */
//Make sure bugs splatter and are obvious to fix.
"use strict"; 

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