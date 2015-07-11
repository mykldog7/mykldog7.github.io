/**
 * Written by Michael Riley. 
 * Utilities.
 * 2015.
 */
"use strict";

//Used for generating nodes id numbers. Each must be unique.. watch for syncronization errors.. 
// As far as I know its single threaded throughout the network construction code. I've used callbacks, but they are sequential.
var next_vaild_id = 1;
function getId(){
	next_vaild_id++;
	return next_vaild_id-1;
}
