var net = {};
net.nodes = [];
net.waves = [];

window.onload = function() {
	var canvas=document.getElementById('display');
	canvas.width = 1000; 
	canvas.height = screen.height - screen.height/8;
	net.ctx=canvas.getContext('2d');
	net.ctx.fillStyle='#FF0000';
	net.ctx.width = canvas.width;
	net.ctx.height = canvas.height;

	var mainloop = function() {
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
	for(var x = 0; x < 250; x++){
		net.nodes[x] = new net.Node(Math.random() * net.ctx.width, Math.random() * net.ctx.height, 50, "rgba(220,223,0, 0.5);");
	}
	//net.nodes[0] = new net.Node(50, 60, 50, "rgba(220,223,0, 0.5);");
	//net.nodes[1] = new net.Node(50, 50, 50, "rgba(220,223,0, 0.5);");

	net.nodes[0].broadcast({tag:"aaa", assess:  net.agents.always, sources:[], maxSources:1000});


	for(node in net.nodes){
		net.nodes[node].setup();
	}
}

function update(){
	for(node in net.nodes){
		net.nodes[node].update();
	}
	for(wave in net.waves){
		net.waves[wave].update();
	}
	swapNode();
}

function draw(){
	for(node in net.nodes){
		net.nodes[node].draw();
	}
	for(wave in net.waves){
		net.waves[wave].draw();
	}
}







