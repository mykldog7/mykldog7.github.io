/**
 * Written by Michael Riley. 
 * Setup features.
 * 2015.
 */
//Make sure bugs splatter and are obvious to fix.
"use strict"; 

//Generate an array of features. and their methods. 
function generateFeatures(imageDimensions, numberOfFeaturesToGenerate){
	//storage for generated features. 
	var features = [];
	while(numberOfFeaturesToGenerate > 0){
		// pick a centering location. each of the other interest locations will be near to this one. 
		targetValues = [0, 255];	//could have greyscale values added, but keep it simple for now. 
		featureMaxRadius = 3;		//how far from the feature center can other interest pixels be?
		featureCenter = {	x:Math.floor((Math.random() * imageDimensions.width) + 1),	
							y:Math.floor((Math.random() * imageDimensions.height) + 1),
							val: targetValues[Math.floor(Math.random()*targetValues.length)]}		//selects one of the indexes in the array.
		var singleFeature = {
			locations : [	featureCenter,
							{	x: Math.floor((Math.random() * 2*featureMaxRadius) + 1)-featureMaxRadius, 
								y: Math.floor((Math.random() * 2*featureMaxRadius) + 1)-featureMaxRadius,
								val: targetValues[Math.floor(Math.random()*targetValues.length)]
							},{	x: Math.floor((Math.random() * 2*featureMaxRadius) + 1)-featureMaxRadius, 
								y: Math.floor((Math.random() * 2*featureMaxRadius) + 1)-featureMaxRadius,
								val: targetValues[Math.floor(Math.random()*targetValues.length)]
							},{	x: Math.floor((Math.random() * 2*featureMaxRadius) + 1)-featureMaxRadius, 
								y: Math.floor((Math.random() * 2*featureMaxRadius) + 1)-featureMaxRadius,
								val: targetValues[Math.floor(Math.random()*targetValues.length)]
							},{	x: Math.floor((Math.random() * 2*featureMaxRadius) + 1)-featureMaxRadius, 
								y: Math.floor((Math.random() * 2*featureMaxRadius) + 1)-featureMaxRadius,
								val: targetValues[Math.floor(Math.random()*targetValues.length)]
							}]
			getValue : 	function(image){ 
							/* Implement this */
							return featureValue;
						}
		};
		features.push(singleFeature);
	}
	//send the result.
	return features;
}