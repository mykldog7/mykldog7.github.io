/**
 * Written by Michael Riley. 
 * Utilities.
 * 2015.
 */
"use strict";

/*Calculates the cumulative offset on the page of a given element. Used by the drawdigit canvas.*/
var cumulativeOffset = function(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
};

//Used for generating nodes id numbers. Each must be unique.. watch for syncronization errors.. 
// As far as I know its single threaded throughout the network construction code. I've used callbacks, but they are sequential.
var next_vaild_id = 1;
function getId(){
	next_vaild_id++;
	return next_vaild_id-1;
}

/*Compare two arrays for equal elements.*/
function arrEqual(a,b){
	if(a.length != b.length) {return false;}
	for(var i = a.length;i>0;i--){
		if(a[i] != b[i]){ return false; }
	}
	return true;
}

/*Returns the node, given the id.. Used all the time.*/
function getNodeWithID(id) {
    for (var i = 0, len = NeuralNetwork.nodes.length; i < len; i++) {
        if (NeuralNetwork.nodes[i].id === id)
            return NeuralNetwork.nodes[i]; // Return as soon as the object is found
    }
    return null; // The object was not found
}

/*Get outputnode corresponding to the given digit.*/
function getOutputNode(digit) {
    for (var i = 0, len = NeuralNetwork.nodes.length; i < len; i++) {
        if (NeuralNetwork.nodes[i].classVal === digit)
            return NeuralNetwork.nodes[i]; // Return as soon as the object is found
    }
    return null; // The object was not found
}

/*Sigmoid transfer function.. */
//Different transfer function can be substituted here. 	
function transferFunction(sum){
	//y = 1/(1+e^(-x))
	return 1/(1+Math.exp(-sum));
}