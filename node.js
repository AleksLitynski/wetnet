net.speed = 0.4;
net.Node = function(x,y,radius,color){
				this.x 				= x;
				this.y 				= y;
				this.radius 		= radius;
				this.color 			= color;
				this.messages 		= [];

				this.tagsToPass 	= [];
				this.tagsToStore 	= [];
				this.localResources	= [];

				this.setup = function(){
					if(Math.random() < 0.01){
						//this.broadcast({tag:"aaa", assess:  net.agents.always, sources:[], maxSources:10});
					}
				}

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
					

					for(var i = 0; i < this.messages.length; i++){
						if(this.messages[i].type == "agent"){
							if(this.messages[i].content.sources.indexOf(this) <= -1){
								var agentRequest = this.messages[i].content.assess(this.tagsToPass, this.messages[i].content.tag);
								if(agentRequest != false){
									this.tagsToPass[this.messages[i].content.assess.tag] += 1;
									this.broadcast(agentRequest);
								}
							}
						}
						else{
							var content = this.messages[i].content;
							for(tag in tags){tag = tags[tag];
								if(this.tagsToStore.indexOf(tag) > -1){
									this.localResources.push(content);
								}
								if(this.tagsToPass.indexOf(tag) > -1){
									this.broadcastContent(content.tags, content.text);
								}
							}
							//store?
							//retransmit?


							console.log(this.messages[i]);
						}


						this.messages.splice(i, 1); i--;
					}



					//transmit more resources




				};

				
				this.broadcastContent = function(tags, text){
					net.waves.push(new net.Wave(this.x, this.y, this.radius, this, new net.Message("rgba(255,144,45, 0.5);", "content", {tags:tags, text:text})));
				}


				this.broadcast = function(agent){
						if(agent.maxSources == null){ 
							agent.maxSources = 1000;
						}
						agent.sources.push(this);
						if(agent.sources.length > agent.maxSources){
							agent.sources.splice(agent.sources.length-1, 1);
						}
						net.waves.push(new net.Wave(this.x, this.y, this.radius, this, new net.Message("rgba(255,144,45, 0.5);", "agent", agent)));
				}
}
