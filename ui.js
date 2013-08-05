net.ui = {};

net.ui.refillNodes = function(){
	var sel = document.querySelector("#nodesList");
	sel.innerHTML = "";

	var toAdd = "";
	for(node in net.nodes){
		toAdd += "<tr onclick='selectNode(this);'><td>"+node+"</td><td>"+Math.round(net.nodes[node].x)+"</td><td>"+Math.round(net.nodes[node].y)+"</td><td>"+Math.round(net.nodes[node].radius)+"</td></tr>";
	}
	sel.innerHTML = toAdd;
}

function setupUI(){
	net.ui.refillNodes();
}

net.ui.prevSel = 0;
function selectNode(nodeText){
	var nodeNumber = parseInt(nodeText.firstChild.innerHTML);

	setNode(net.nodes[nodeNumber]);

	nodeText.parentNode.children[net.ui.prevSel].style.backgroundColor = "lightgrey";
	nodeText.style.backgroundColor = "grey";
	net.ui.prevSel = nodeNumber;
}
function setNode(node){
	var sel = document.querySelector("#nodesList");

	document.querySelector("#number").value = net.nodes.indexOf(node);
	document.querySelector("#x").value = node.x;
	document.querySelector("#y").value = node.y;
	document.querySelector("#radius").value = node.radius;
	document.querySelector("#color").value = node.color;

	/*this.tagsToPass 	= [];
	this.tagsToStore 	= [];
	this.localResources	= [];*/

}

function updateNode(){

	var node = net.nodes[parseInt(document.querySelector("#number").value)];

	node.x = document.querySelector("#x").value;
	node.y = document.querySelector("#y").value;
	node.radius = document.querySelector("#radius").value;
	node.color = document.querySelector("#color").value;

	document.querySelector("#nodesList").children[net.ui.prevSel].innerHTML = "<tr onclick='selectNode(this);'><td>"+net.ui.prevSel+"</td><td>"+Math.round(node.x)+"</td><td>"+Math.round(node.y)+"</td><td>"+Math.round(node.radius)+"</td></tr>";
}


function updateUI(){
	
}


function addNode(){

	net.nodes[net.nodes.length] = new net.Node(Math.random() * net.ctx.width, Math.random() * net.ctx.height, 50, "rgba(220,223,0, 0.5);");

	var node = net.nodes[parseInt(document.querySelector("#number").value)];

	node.x = document.querySelector("#x").value;
	node.y = document.querySelector("#y").value;
	node.radius = document.querySelector("#radius").value;
	node.color = document.querySelector("#color").value;

	net.ui.refillNodes();
}

function removeNode(){
	net.nodes.splice(net.ui.prevSel, 1);

	net.ui.refillNodes();
}