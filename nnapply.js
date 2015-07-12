/**
 * Written by Michael Riley. 
 * Implement all the neuralNetwork direct application functions.  
 *	//makes use of network functions defined in nntrain.js
 * 2015.
 */
"use strict"; //bug splatterer

function classifyGivenImage(image, continuousValuesFlag){
	NeuralNetwork.lookAtImage(image);
	NeuralNetwork.doForwardPass();
	var outVec = [];
	if(continuousValuesFlag) { outVec = NeuralNetwork.getOuputVector(); }
	else { outVec = NeuralNetwork.getOuputVectorNormalized(); }
	return outVec;
}