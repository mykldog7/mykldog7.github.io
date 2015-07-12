/**
 * Written by Michael Riley. 
 * Implement all the neuralNetwork training functions.  called by jsNN.js
 * 2015.
 */
"use strict"; //bug splatterer

/*Add utilities to the NeuralNetwork itself. These utilities provide the training functions. They are not saved.*/
function attachMethodsToNeuralNetwork(){
	//place the image before the NN. This allows it to be accessed apart from the image array. 
	NeuralNetwork.lookAtImage = function(img){
		NeuralNetwork.image = img;
	};
	
	/*Propagate values through the network from inputs towards outputs.*/
	NeuralNetwork.doForwardPass= function(){
		if(NeuralNetwork.image == undefined){console.log("No image defined. Can't do forward pass."); return;}
		//assuming we have an image.. every node needs to have a outputValue calculated and attached. 
		NeuralNetwork.nodes.forEach(function(node){
			//for every input node the outputValue is assigned like this...
			if(node.layer == "input") {
				//inline function to check coordinates are valid and cap if needed. ultra hacky.. this is breaks if images aren't square.
				function chkCds(a){return (a<0) ? 0 : ( (a>( NeuralNetwork.image.width>NeuralNetwork.image.height ? NeuralNetwork.image.height : NeuralNetwork.image.width )-1 ? ( NeuralNetwork.image.width>NeuralNetwork.image.height ? NeuralNetwork.image.height : NeuralNetwork.image.width )-1 : a) ); }
				var featureErrorSum = 0;			//error value sum, accumulator .
				node.locations.forEach( function(loc){
					var pxError = Math.abs(loc.val - NeuralNetwork.image.getPixelAt(chkCds(loc.x), chkCds(loc.y)));	//calc error at this interest pixel. absolute value of difference
					featureErrorSum += pxError;			//add to the err accumulator 
				});
				//linear transform (scale): 	0 error gives value of 1. 	255*5(1275) gives value of 0
				node.outputValue = (1275 - featureErrorSum)/1275;  // invert, multiply by (1/1275) and add 0.
			}
			//every non input node is the same... 
			else if(node.layer.substr(0,6) == "hidden" || node.layer == "output"){
				var weightedSumOfInfluencers = 0;	//storage for sum.
				node.influencers.forEach(function(infNode){
					//get value from node referred to by node
					var incomingVal = getNodeWithID(+infNode.influencerId).outputValue;  //getNodeWithID is in utils.js
					if(incomingVal == undefined){console.log("Attempt to process a node with no outputValue. Are nodes out of order in array?");}
					weightedSumOfInfluencers += (incomingVal*infNode.weight);										
				});
				node.outputValue = transferFunction(weightedSumOfInfluencers);		//Transfer functionin utils.js
			}
		});
		//console.log("Forward pass completed.");
	};
	
	/*After forward pass is applied, get the resultant classification.*/
	NeuralNetwork.getOuputVector= function(){
		var outVec = [];
		NeuralNetwork.nodes.forEach(function(node){
			if(node.layer == "output"){
			   outVec.push(node.outputValue);
			}
		});
		return outVec;
	};
	
	/*Returns the outputVector, but with highest value made either 1 and lowest made 0.*/
	NeuralNetwork.getOuputVectorNormalized= function(){
		var inVec = NeuralNetwork.getOuputVector();
		var highestResult = -1;		//every result should be higher than this. 
		var highestIndex = 0;
		//find which location is the highest. 
		inVec.forEach(function(val, index){
			if (val > highestResult) {
				highestResult = val;
				highestIndex = index;
			}
		});
		// setup result array with the biggest value equal 1.
		var outVec = [0,0,0,0,0,0,0,0,0,0];
		outVec[highestIndex] = 1;
		return outVec;
	};
	
	/*Use the results of the forward pass to adjust the weights. The expectedOutputsArray is a vector describing the expected output.*/
	NeuralNetwork.doBackwardPass= function(expectedOutputsArray){
		//for each outputNode(same as digit) calc an error
		expectedOutputsArray.forEach(function(desiredOut, index){
			var outNode = getOutputNode(index);		//grab the output node that corresponds to this digit.//function in utils.js.
			outNode.beta =  desiredOut - outNode.outputValue;
		});
		//now, for the rest of the nodes. //input nodes don't need a beta value. 
		NeuralNetwork.nodes.reverse().forEach(function(node){
			if(node.layer.substr(0,6) == "hidden" || node.layer == "input"){
				var sum =0;
				node.effects.forEach(function(effNode){	//effectedNode
					var effectedNode = getNodeWithID(effNode.effectedNodeId);
					sum += (effNode.effectWeight*effectedNode.outputValue*(1-effectedNode.outputValue)*effectedNode.beta);
				});
				node.beta = sum;	//sum for all nodes in next(forward)layer: weight to that node*output of that node*(1-outputagain)*that nodes beta. 
			}
		});
		NeuralNetwork.nodes.reverse();	//rereverse so that it is the forward direction again. 
		//console.log("Backward pass completed.");
	};
	
	/*Determine and Apply weight adjustment */
	NeuralNetwork.applyWeightChanges= function(){
		NeuralNetwork.nodes.forEach(function(node){
			if(node.effects != undefined){
				node.effects.forEach(function(effNodeRef){
					var effectedNode = getNodeWithID(effNodeRef.effectedNodeId); 
					//calculate weight delta
					var weightDelta = NeuralNetwork.params.learningRate*node.outputValue*effectedNode.outputValue*(1-effectedNode.outputValue)*effectedNode.beta;
					//apply weight delta in both directions. in effectedNode and influencerNode
					//adjust weight in other nodes influencers array. 
					effectedNode.influencers.forEach(function(influencer){
						if(influencer.influencerId == node.id) {influencer.weight += weightDelta;}
					});
					//adjust this nodes weight in effects array. 
					effNodeRef.effectWeight += weightDelta;
				});
			}
		});
		//console.log("Weight changes calculated and applied");
	};
}

/*Loop over all nodes and attach these methods to corresponding nodes.*/
function removeExtrasFromNodes(){
	NeuralNetwork.nodes.forEach(function(node){
		node.outputValue = undefined;
		node.effects = undefined;
		node.beta = undefined;
	});
}

/*Remove - this is done before the network is saved..*/
function removeMethodsFromNeuralNetwork(){
	NeuralNetwork.lookAtImage = undefined;
	NeuralNetwork.image = undefined;
	NeuralNetwork.getOuputVectorNormalized=undefined;
	NeuralNetwork.getOuputVector=undefined;
	NeuralNetwork.doForwardPass = undefined;
	NeuralNetwork.doBackwardPass = undefined;
}