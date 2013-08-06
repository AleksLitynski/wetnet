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
    document.querySelector("#speed").value = net.speed;
}

net.ui.prevSel = 0;
function selectNode(nodeText){
	var nodeNumber = parseInt(nodeText.firstChild.innerHTML);

	setNode(net.nodes[nodeNumber]);

	nodeText.parentNode.children[net.ui.prevSel].style.backgroundColor = "rgba(220,223,255, 0.5)";
	nodeText.style.backgroundColor = "rgba(255,144,45, 0.5)";
	net.ui.prevSel = nodeNumber;
    
    nodeText.scrollIntoView();
    
}
function setNode(node){
	var sel = document.querySelector("#nodesList");

	document.querySelector("#number").value = net.nodes.indexOf(node);
	document.querySelector("#x").value = node.x;
	document.querySelector("#y").value = node.y;
	document.querySelector("#radius").value = node.radius;
	document.querySelector("#color").value = node.color;

	/*this.localResources = []*/
    
    var tagOptions = "";
    for(tag in node.tagsToPass){node.tagsToPass[tag];
        tagOptions += "<option>" + tag + "</option>";
    }
    this.tagsToPass.innerHTML = tagOptions;
    
    var tagOptions = "";
    for(tag in node.tagsToStore){node.tagsToStore[tag];
        tagOptions += "<option>" + tag + "</option>";
    }
    this.tagsToStore.innerHTML = tagOptions;
    
    var tagOptions = "";
    for(resource in node.localResources){node.localResources[resource];
        tagOptions += "<option>" + resource.tags, resource.text + "</option>";
    }
    this.localResources.innerHTML = tagOptions;
    
    net.nodes[net.ui.prevSel].color = "rgba(220,223,255, 0.5)";
    node.color = "rgba(0, 0, 30, 0.6)";
    console.log(node.color);

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

net.ui.isPlaying = true;
function togglePlay(node){
    net.ui.isPlaying = !net.ui.isPlaying;
    if(net.ui.isPlaying){
        setSpeed(document.querySelector("#speed").value);
        node.innerHTML = "| |";
    }
    else{
        net.speed = 0;
        node.innerHTML = ">";
    }
}
function setSpeed(newValue){
    net.ui.isPlaying = true; 
    document.querySelector("#pausePlay").innerHTML = "| |";
    if(parseFloat(newValue) != NaN)
    {
            net.speed = parseFloat(newValue);
    }
    else
    {
        document.querySelector("#speed").value = net.speed;
        setSpeed(net.speed, restore);
    }
    
    
    
}


function addNode(){

	net.nodes[net.nodes.length] = new net.Node(Math.random() * net.ctx.width, Math.random() * net.ctx.height, 50, "rgba(220,223,255, 0.5)");

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