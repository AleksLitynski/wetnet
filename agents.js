net.agents = {};


net.agents.random = function(locals, tag) {


		if(Math.random() > 0.5){
			return this;
		}
		return false;
};

net.agents.always = function(locals, tag) {

	return this;
		
};

