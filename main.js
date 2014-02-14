var net = {};
net.nodes = [];
net.waves = [];

net.mouse = {};
net.mouse.x = 0;
net.mouse.y = 0;

window.onload = function() {
	var canvas=document.getElementById('display');
	canvas.width = window.innerWidth; 
	canvas.height = window.innerHeight;
	net.ctx=canvas.getContext('2d');
	net.ctx.fillStyle='#aaffaa';
	net.ctx.width = canvas.width;
	net.ctx.height = canvas.height;

	var mainloop = function() {
		canvas.width = window.innerWidth; 
		canvas.height = window.innerHeight;
		net.ctx.width = canvas.width;
		net.ctx.height = canvas.height;
		net.ctx.clearRect ( 0 , 0 , net.ctx.width , net.ctx.height );
		net.ctx.strokeRect(0,0,net.ctx.width,net.ctx.height);
		update();
		draw();
		window.requestAnimationFrame(mainloop);
	};
	window.requestAnimationFrame(mainloop);

	setup();
	setupUI();
}

function setup(){
	for(var x = 0; x < 1500; x++){
		net.nodes[x] = new net.Node(Math.random() * net.ctx.width, Math.random() * net.ctx.height, 50, "rgba(220,223,255, 0.5);");
	}
	net.nodes[0] = new net.Node(50, 60, 50, "rgba(220,223,0, 0.5);");
	net.nodes[0].tagsToStore.push("aaa");
	//net.nodes[1] = new net.Node(50, 50, 50, "rgba(220,223,0, 0.5);");

	net.nodes[0].broadcast({tag:"aaa", assess:  net.agents.always, sources:[], maxSources:10000});


	for(node in net.nodes){
		net.nodes[node].setup();
	}
    
    
    
    net.ctx.canvas.addEventListener("mousemove", function getPosition(event)
    {
          net.mouse.x = event.offsetX;
          net.mouse.y = event.offsetY;
        
    }, false);
    net.ctx.canvas.addEventListener("mousedown", function getPosition(event){
        net.mouse.x = event.offsetX;
        net.mouse.y = event.offsetY;
        
        for(var node = net.nodes.length-1; node >= 0; node--){nodeVal = net.nodes[node];
            if(lineDistance({x:nodeVal.x, y:nodeVal.y}, {x:net.mouse.x, y:net.mouse.y}) < nodeVal.radius){
                selectNode(document.querySelector("#nodesList").children[node]);
    			document.querySelector("#nodesList").children[node].scrollIntoView();
    			document.querySelector("#controlPanel").offsetTop = 0;
                break;
            }
        }
    }, false);

    
    
    
    
}


function update(){

    
    
	for(node in net.nodes){
		net.nodes[node].update();
	}
	for(wave in net.waves){
		net.waves[wave].update();
	}

	updateUI();
}

function draw(){
	for(node in net.nodes){
		net.nodes[node].draw();
	}
	for(wave in net.waves){
		net.waves[wave].draw();
	}
}







