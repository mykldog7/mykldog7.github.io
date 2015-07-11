/**
 * Written by Michael Riley. 
 * NeuralNet hidden layer setup.   
 * 2015.
 */
"use strict";	//force bug splats.

/*Initialize and setup the structure of the network and its hidden and output layers */
//We will be building a full connected network. (Each node connects to every node in the layer below.)
function setupHiddenNetworkLayers(nodeArray, numHiddenLayers, nodesPerHiddenLayer){
	//initially we use the input as the previous layer. 
	var prevLayerTag = "input";	//marks which nodes we are interested in connecting to.
			
	// For every hidden layer we want to create...
	for(var i=0;i<numHiddenLayers;i++){
		var layerTag = "hidden"+i;
		//For every node in this layer.. create,setup,configure,and add the node.
		for(var j=0;j<nodesPerHiddenLayer;j++){
			var newNode = {layer: layerTag, id: getId()};
			//Initialize the inputs array with the bias input value. Its a pseudo-node with an outputValue and a weight of 1.
			newNode.influencers = [];
			//Add a connection to every node in the previous layer... 
			nodeArray.forEach(function(nodeI){
				if(nodeI.layer == prevLayerTag){
					//go ahead and add it.
					newNode.influencers.push({influencer_id: nodeI.id, weight: getRand(-1,1)});
				}
			});
			// finally add the completed node to the layer.. 
			nodeArray.push(newNode);
		}
		prevLayerTag = layerTag;
	}
	return nodeArray;
}

//Utility functions: Returns a random number between min (inclusive) and max (exclusive)
function getRand(min, max) {
  return Math.random() * (max - min) + min;
}