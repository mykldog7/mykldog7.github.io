/**
 * Written by Michael Riley. 
 * Proccess images and classify each one as an instance of a handwritten digit.  
 * 2015.
 */
 //Force good coding practice to raise code quality.
"use strict";

function initNetwork(imgDims, numInputs, hiddenLayerCount, nodesPerHiddenLayer){
	//input layer. contains: First generated features. 
	NeuralNetwork = {};	//its global, but reset it here. 
	NeuralNetwork.nodes = [];
	NeuralNetwork.nodes = generateInputs(NeuralNetwork.nodes, imgDims, numInputs);
	
	//construct hidden layers.	
	NeuralNetwork.nodes = setupHiddenNetworkLayers(NeuralNetwork.nodes, hiddenLayerCount, nodesPerHiddenLayer);
	
	//construct output layers.	//the 10 param is the number of outputs. corresponds to digits. 
	NeuralNetwork.nodes = setupOutputLayers(NeuralNetwork.nodes, hiddenLayerCount, 10);
	
	console.log("Network initialized.");
}

/*trains the network... call all the smaller modular functions.*/
function trainNetwork(imagesToTrainWithArray){
	imagesToTrainWithArray.forEach(function(img){
		NeuralNetwork.lookAtImage(img);			// set the input layer's image elements. 
		NeuralNetwork.forwardPass();
		NeuralNetwork.backwardPass(); 			//calculate error and adjustments. 
		NeuralNetwork.applyWeightChanges();
	}
	
}

/*Remove all functions and image data from elements. Leave references and weights.*/
function prepNetworkForExport(){
	
}

/*Build the NeuralNetwork object from a JSON object.*/
function importSavedNetwork(){
	
}



//This constructs the network

