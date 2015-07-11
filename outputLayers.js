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
		var newNode = {layer: "output", id: getId(), classVal: j};		//classVal signals the digit that this output node corresponds to
		//Initialize the inputs array with the bias input value. Its a pseudo-node with an outputValue and a weight of 1.
		newNode.influencers = [];
		//Add a connection to every node in the previous layer... 
		nodeArray.forEach(function(nodeI){
			if(nodeI.layer == prevLayerTag){
				//go ahead and add it.
				newNode.influencers.push({influencerId: nodeI.id, weight: getRand(-1,1)});
			}
		});
		// finally add the completed node to the layer.. 
		nodeArray.push(newNode);
	}
	return nodeArray;
}

/*Add an array to each node. Array contains references to all nodes that this one effects.*/
function setupReverseDirectionalReferences(nodeArray){
	nodeArray.forEach(function(node){
		if(node.influencers != undefined){	//input layers don't have influencers so skip them. 
			node.influencers.forEach(function(nodeRef){
				var nodeInfluencing = getNodeWithID(nodeRef.influencerId);
				if(nodeInfluencing.effects == undefined){	//if it doesn't exist then create it. 
					nodeInfluencing.effects = [];
				}
				nodeInfluencing.effects.push({effectedNodeId: node.id, effectWeight: nodeRef.weight});
			});
		}
	});
	return nodeArray;
}