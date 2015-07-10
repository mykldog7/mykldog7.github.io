/**
 * Written by Michael Riley. 
 * Proccess images and classify each one as an instance of a handwritten digit.  
 * 2015.
 */
 //Force good coding practice to raise code quality.
"use strict";

//This global is the weights and feature locations. It should be saveable. (YES). (not too many functions that break).
var NeuralNetwork = {};

function initNetwork(imgDims, numFeatures /*hiddenLayerCount, nodesInEachHiddenLayer*/){
	//First generate features. These are tightly coupled with the input layer.
	NeuralNetwork.features = generateFeatures(imgDims, numFeatures);
	
	//construct other parts of the network. 
}


//This constructs the network

