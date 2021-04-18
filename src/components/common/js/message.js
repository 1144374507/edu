import { Message } from 'element-ui'

var rjMessage = function(){
				
	var subSelf = this;

	var bg = {
		success:'rgba(19,206,102,0.8)',
		error:'rgba(255,73,73,0.8)',
		warning:'rgba(247,186,42,0.8)',
		info:'rgba(80,191,255,0.8)'
	};

	var removeOld = function() {
		var emObjs = document.getElementsByClassName("el-message");
		for(var i=0; i<emObjs.length; i++) {
			emObjs[i].parentNode.removeChild(emObjs[i]);
		}
	};

	var setElCls = function(clsName) {
		/*var emObjs = document.getElementsByClassName("el-message");
		emObjs[0].style.top = "10px";
		emObjs[0].style.background = bg[clsName];
		emObjs[0].lastChild.firstChild.setAttribute("style", "color:#fff!important");*/
	};

    subSelf.error = function(msg){
    	removeOld();
    	Message.error(msg);
    	setElCls("error");
    	return subSelf;
    };

    subSelf.success = function(msg){
    	removeOld();
    	Message({
        	message: msg,
          	type: 'success'
        });
        setElCls("success");
    	return subSelf;
    };

    subSelf.warning = function(msg){
    	removeOld();
    	Message({
        	message: msg,
          	type: 'warning'
        });
        setElCls("warning");
    	return subSelf;
    };

    subSelf.info = function(msg){
    	removeOld();
    	Message(msg);
    	setElCls("info");
    	return subSelf;
    };

};

export default new rjMessage();