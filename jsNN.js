/**
 * Written by Michael Riley. 
 * Proccess images and classify each one as an instance of a handwritten digit.  
 * 2015.
 */
 //Force good coding practice to raise code quality.
"use strict";

function initNetwork(imgDims, numInputs, hiddenLayerCount, nodesPerHiddenLayer, learnRate){
	//input layer. contains: First generated features. 
	NeuralNetwork = {};	//its global, but reset it here. 
	NeuralNetwork.learningRate = learnRate;
	NeuralNetwork.nodes = [];
	NeuralNetwork.nodes = generateInputs(NeuralNetwork.nodes, imgDims, numInputs);
	
	//construct hidden layers.	
	NeuralNetwork.nodes = setupHiddenNetworkLayers(NeuralNetwork.nodes, hiddenLayerCount, nodesPerHiddenLayer);
	
	//construct output layers.	//the 10 param is the number of outputs. corresponds to digits. 
	NeuralNetwork.nodes = setupOutputLayers(NeuralNetwork.nodes, hiddenLayerCount, 10);
	//make it easier to calculate errors in the network by including backlinks and forward links. 
	//This make each node know what it is effecting and what effects it. 
	//Next time I implement a NeuralNetwork I will have structures for links instead of nodes.
	NeuralNetwork.nodes = setupReverseDirectionalReferences(NeuralNetwork.nodes);
	console.log("Network initialized.");
}

/*trains the network... call all the smaller modular functions.*/
function trainNetwork(imgs){
	attachMethodsToNeuralNetwork();
	NeuralNetwork.lookAtImage(imgs[0]);
	NeuralNetwork.doForwardPass();
	/* imagesToTrainWithArray.forEach(function(img){
		NeuralNetwork.lookAtImage(img);			// set the input layer's image elements. 
		NeuralNetwork.doForwardPass();
		NeuralNetwork.doBackwardPass(); 			//calculate error and adjustments. 
		NeuralNetwork.applyWeightChanges();
	}); */
}

/*Remove all functions and image data from elements. Leave references and weights.*/
function networkExport(){
	//remove all the methods attached above.
	//render JSON object containing weights and references and layout.
}

/*Build the NeuralNetwork object from a JSON object.*/
function networkImport(){
	//clear the old NeuralNetwork
	// bring in the JSON object and overwrite with it. 
}



//This constructs the network

