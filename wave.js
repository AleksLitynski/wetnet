net.Wave = function(x,y,maxRadius,rate, node, message){
		this.x = x;
		this.y = y;
		this.radius = 0;
		this.maxRadius = maxRadius;
		this.rate=rate;
		this.color = message.color;
		this.message = message;
		this.parentNode = node;
		this.alreadyRecieved = [];


		this.draw = function(){
			net.ctx.beginPath();
			net.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
			net.ctx.fillStyle = this.color;
			net.ctx.fill();
			net.ctx.stroke();
			net.ctx.beginPath();
			net.ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
			net.ctx.fillStyle = "rgba(0, 0, 0, 255);";
			net.ctx.fill();
			net.ctx.stroke();
		};
		this.update = function(){
			this.radius += this.rate;

			for(node in net.nodes){ node = net.nodes[node];
				if(node != this.parentNode && this.alreadyRecieved.indexOf(node) == -1){
					if(interceptsNodes(this, node)){


							node.messages.push(this.message);
							this.alreadyRecieved.push(node);
					}
				}
			}

			if(this.radius > this.maxRadius){
				net.waves.splice(net.waves.indexOf(this), 1);
			}
		};

		function interceptsNodes(self, node){
			function lineDistance( p1, p2 ){
				var x = Math.pow(p2.x - p1.x, 2);
				var y = Math.pow(p2.y - p1.y, 2);
				return Math.sqrt(x + y);
			}
			return lineDistance({x:self.x, y:self.y}, {x:node.x, y:node.y}) < self.radius;
		}


};

