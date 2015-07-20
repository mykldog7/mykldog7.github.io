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
	NeuralNetwork.params = {};
	NeuralNetwork.params.features = numInputs;
	NeuralNetwork.params.hiddenLayerCount = hiddenLayerCount;
	NeuralNetwork.params.hiddenLayerSize = nodesPerHiddenLayer;
	NeuralNetwork.params.learningRate = learnRate;
	
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
	
	//ad utility functions. 
	attachMethodsToNeuralNetwork();
	console.log("Network initialized and ready to be trained.");
}

/*trains the network... call all the smaller modular functions.*/
function trainNetwork(imgs, lbls, stopPercent, stopCycles, callBackAfterEachCycle){
	//stopCycles--;	//decrement 1. to make loop execute correct number of times.
	console.log("Beginning training.");
	for(var cycle=stopCycles;cycle>=0;cycle--){
		//for every label we can train on the image.. unlabeled images are useless. 
		var totalCases = lbls.length;
		var totalCorrectlyClassified = 0;			//for accuracy calculations
		for(var i=lbls.length-1;i>=0;i--){
			var image = imgs[i];
			var expectedOutputs = [0,0,0,0,0,0,0,0,0,0];
			expectedOutputs[lbls[i]] = 1;
			NeuralNetwork.lookAtImage(image);
			NeuralNetwork.doForwardPass();
			//Count accuracy. Does the normalized vector match thee expectedOutputs? 
			var outVec = NeuralNetwork.getOuputVectorNormalized();
			if(arrEqual(outVec,expectedOutputs)){	//do arrays match.. uses util in utils.js to compare arrays element by element.
				totalCorrectlyClassified++;
			}
			NeuralNetwork.doBackwardPass(expectedOutputs);
			NeuralNetwork.applyWeightChanges();
		}
		//How accurate was this cycle.. 
		var accuracy = totalCorrectlyClassified/totalCases;
		console.log("One cycle completed. accuracy score was: " +accuracy );
		callBackAfterEachCycle(accuracy, cycle);	//Cycles remaining. 
		//stop training if accuracy percentage achieved. 
		if(accuracy > stopPercent) { break; }
		
	}
	console.log("Network training complete");
}

/**/
function applyNetworkToUnlabledImages(imgholder, images){
	var newlbls = [];	//storage for newly generated labels
	images.forEach(function(img){
		var result = classifyGivenImage(img);
		var digit = result.indexOf(1);
		newlbls.push(digit);
	});
	console.log("New labels: "+newlbls);
	//apply digit label to image.
	// params.	parentELEM, labelArray, offset, lblColor1, lblColor2
	addLablesToCanvasesExt(imgholder, newlbls, lblArray.length, "blue", "gold");			// in makeCanvas.js

}

/*Remove all functions and image data from elements. Leave references and weights.*/
function networkExport(){
	//render JSON object containing weights and references and layout.
	// Remove extra stuff from NeuralNetwork
	removeMethodsFromNeuralNetwork();
	removeExtrasFromNodes();
	
	var json = JSON.stringify(NeuralNetwork);
	var blob = new Blob([json], {type: "application/json"});
	var url  = URL.createObjectURL(blob);

	var a = document.createElement('a');
	a.download    = "network.json";
	a.href        = url;
	a.textContent = "Download Link";
	//fire off download event.
	a.click();
	
	//reattach methods so we can continue using the network. 
	attachMethodsToNeuralNetwork();
	NeuralNetwork.nodes = setupReverseDirectionalReferences(NeuralNetwork.nodes);	//removed by removeExtrasFromNodes above.
}

/*Build the NeuralNetwork object from a JSON object.*/
function networkImport(filename){
	//clear the old NeuralNetwork
	// bring in the JSON object and overwrite with it.
	
	LoadNetworkFromFile(	filename, 	//this function is defined in processFile.js.
							function(net){		//callback function which takes the network and applies it.  
								NeuralNetwork = net;
								attachMethodsToNeuralNetwork();
								NeuralNetwork.nodes = setupReverseDirectionalReferences(NeuralNetwork.nodes);
								//update values of onscreen textboxes.
								updateScreenWithLoadedNetworkValues();
							}
	);
}
