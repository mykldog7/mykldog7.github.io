/**
 * Written by Michael Riley. 
 * Setup output layer nodes. 
 * 2015.
 */
"use strict";

/*Create and add the output layer nodes. connect them to the last hidden layer. */
function setupOutputLayers(nodeArray, numHiddenLayers, numOutputNodes){
	//use numHiddenLayers to work out which layer we will attach as influencers. 
	var prevLayerTag = "hidden"+(numHiddenLayers-1);
	//For every node in this layer.. create,setup,add the node.
	for(var j=0;j<numOutputNodes;j++){
		var newNode = {layer: "output", id: getId()};
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
	return nodeArray;
}