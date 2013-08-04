function setupUI()
{
	var sel = document.querySelector("#chooseNode");

	for(node in net.nodes){
		sel.options[sel.options.length] = new Option("node " + node, node);
	}

	swapNode();
}

function swapNode(){
	var sel = document.querySelector("#chooseNode");
	var node = net.nodes[parseInt(sel.value)];

	document.querySelector("#x").value = node.x;
	document.querySelector("#y").value = node.y;
	document.querySelector("#radius").value = node.radius;
	document.querySelector("#color").value = node.color;

	this.tagsToPass 	= [];
	this.tagsToStore 	= [];
	this.localResources	= [];

	var ttp = document.querySelector("#tagsToStore");
	console.log(node.tagsToStore);
	ttp.options = [];
	for(tagToPass in node.tagsToStore){
		//console.log(tagToPass);
		ttp.options[ttp.options.length] = new Option(tagToPass);
	}



}

function updateNode(){
	var sel = document.querySelector("#chooseNode");
	net.nodes[parseInt(sel.value)].x = document.querySelector("#x").value;
	net.nodes[parseInt(sel.value)].y = document.querySelector("#y").value;
	net.nodes[parseInt(sel.value)].radius = document.querySelector("#radius").value;
	net.nodes[parseInt(sel.value)].color = document.querySelector("#color").value;
}