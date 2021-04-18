import axios from 'axios'

//定义token内部方法,和属性，避免全局冲突
let token_self_obj = {
	//token刷新api
	"token_flush_api": "/api/base/auth/reflashToken",
	//多久累一次发起新token的获取
	"flag_time_to_add_next_time": 100,
	//定时去后端token
	"reflash_token_time": 1500 * 1000,
	//用于判定token是否失效
	"token_invalid_time": 1800 * 1000,
	//用于标记页面当前动作时间
	"lastReqTime_Token": "token_last_req_time",
	//用于标记定时取后端token
	"time_object": undefined,
	//标记是否销毁 未定义或1=是，2=否
	"flag_is_destroy": "flag_page_is_destroy",
	//缓存当前用户id
	"cache_current_session_id":"cache_current_session_id",
	//标记会话级token
	"flag_session_token": "flag_session_token",
	//标记第三方会话级token
	"flag_th_session_token": "flag_th_session_token",
	//标记距离下次请求token已走过的时间
	"flag_next_token_time":"flag_next_token_time",
	//标记仓库型的token
	"flag_localstory_token": "token",
	//设置用户id
	setUserId: function(userId) {
		let self = this;
		if(!userId) console.log("没有正常缓存当前用户sessionid, 传入的用户sessionid为空");
		sessionStorage.setItem(self.cache_current_session_id, userId);
	},
	//取得当前用户id
	getSessionId: function() {
		let self = this;
		return sessionStorage.getItem(self.cache_current_session_id);
	},
	//标记页面是否被销毁
	flagPageIsDestroy: function(flag) {
		let self = this;
		sessionStorage.setItem(self.flag_is_destroy, flag);
	},
	//验证页面是否销毁
	checkPageIsDestroy: function() {
		let self = this;
		let flag = sessionStorage.getItem(self.flag_is_destroy);
		if(flag == "2") return false;
		return true;
	},
	//标记当前页面动作时间
	flagPageActive: function(flagTime) {
		let self = this;
		if(self.checkTokenIsInvalid()) return;
		let nowTime = new Date().getTime();
		if(flagTime) sessionStorage.setItem(self.lastReqTime_Token, flagTime);
		else sessionStorage.setItem(self.lastReqTime_Token, nowTime);
	},
	//通过监听鼠标操作标记token最新时间
	flagPageByListen: function() {
		let self = this;
		token_self_obj.flagPageActive();
	},
	//取得时间标记
	getPageActiveFlag: function() {
		let self = this;
		return sessionStorage.getItem(self.lastReqTime_Token);
	},
	//监听页面动作
	listenerToPageActive : function() {
		let self = this;
		if(self.checkPageIsDestroy()) {
			console.log("页面销毁，不在监听页面的动作");
			//二次调用销毁
			self.destroyed();
			return;
		}
		document.removeEventListener("mousemove",self.flagPageByListen,false);
		document.removeEventListener("mousedown",self.flagPageByListen,false);
		document.addEventListener("mousemove",self.flagPageByListen,false);
		document.addEventListener("mousedown",self.flagPageByListen,false);
	},
	//执行token设置
	setToken : function(token) {
		let self = this;
		localStorage.setItem(self.flag_localstory_token,token);
		sessionStorage.setItem(self.flag_session_token, token);	
	},
	//取token
	getToken: function() {
		let self = this;
		self.flagPageActive();
		let token = sessionStorage.getItem(self.flag_session_token);
		if(token) return token;
		return "";
	},
	//发起后端token请求
	findToken : function() {
		let self = this;
		if(self.checkPageIsDestroy()) {
			console.log("页面销毁，不在监听后端token的获取");
			//二次调用销毁
			self.destroyed();
			return;
		}
		let lastReqTime = self.getPageActiveFlag();
		let userId = self.getSessionId();
		if(!userId) {
			console.log("没能取到当前用户id，强制销毁当前会话");
			self.destroyed();
			return;
		}
		let begin = new Date().getTime();
		axios.get(`${self.token_flush_api}`)
		.then(function(res) {
			let end = new Date().getTime();
			let newLeastToken = res.data.result;
			if(!newLeastToken) {
				console.log("耗时:" + (end - begin) + "ms没能取到当前用户的最新token会话，强制销毁已有会话");
				self.destroyed();
				return;
			}
			console.log("耗时:" + (end - begin) + "ms取到最新token:" +newLeastToken);
			self.setToken(newLeastToken);
			self.intime2FindToken();
			self.flagPageActive(lastReqTime);
			self.resetNextTokenTime();
		})
		.catch(function(err) {
			if(err.respCode == "1401") {
				console.log("刷新token,发现token确实失效了");
				self.destroyed();
			} else {
				self.intime2FindToken();
				self.flagPageActive(lastReqTime);
				self.resetNextTokenTime();
			}
		});
	},
	//累增下次token时间
	flagAddNextTokenTime: function(addTime) {
		let self = this;
		let flag_time = sessionStorage.getItem(self.flag_next_token_time);
		flag_time = flag_time ? flag_time : 0;
		flag_time = parseInt(flag_time) + parseInt(addTime);
		sessionStorage.setItem(self.flag_next_token_time, flag_time);	
	},
	//取得当前累增的下次token时间
	getToNextTokenTime: function() {
		let self = this;
		return sessionStorage.getItem(self.flag_next_token_time);	
	},
	//重置下次token获取时间
	resetNextTokenTime: function() {
		let self = this;
		sessionStorage.setItem(self.flag_next_token_time, 0);
	},
	//定时取后端token
	intime2FindToken : function() {
		let self = this;
		//为了防止浏览器窗口切换导致，无法按self.flag_time_to_add_next_time轮询下一次获取token的时间
		let lastFlagTime = new Date().getTime();
		window.clearTimeout(self.time_object);
		let toFindToken = function() {
			if(self.checkPageIsDestroy()) {
				console.log("页面销毁，不在监听后端token的获取");
				//二次调用销毁
				self.destroyed();
				return;
			}
			let addTime = new Date().getTime() - lastFlagTime;
			self.flagAddNextTokenTime(addTime);
			lastFlagTime = new Date().getTime();
			let addNextTokenTime = self.getToNextTokenTime();
			if(addNextTokenTime < self.reflash_token_time) {
				window.clearTimeout(self.time_object);
				self.time_object = window.setTimeout(toFindToken, self.flag_time_to_add_next_time);
				return;
			}
			let lastReqTime = self.getPageActiveFlag();
			let isOverTime = (new Date().getTime() - lastReqTime >= self.token_invalid_time);
			if(lastReqTime && isOverTime) {
				console.log("页面太久没反应，token 自动失效");
				self.destroyed();
				return;
			} else {
				//获取新的token
				self.findToken();
			}
		}
		self.time_object = window.setTimeout(toFindToken, self.flag_time_to_add_next_time);
	},
	//设置第三方token
	setThToken : function(thToken) {
		let self = this;
		if(thToken) sessionStorage.setItem(self.flag_th_session_token, thToken);
	},
	//取得第三方token
	getThToken : function() {
		let self = this;
		return sessionStorage.getItem(self.flag_th_session_token);
	},
	//销毁token
	destroyed: function() {
		let self = this;
		localStorage.removeItem(self.flag_localstory_token);
		sessionStorage.removeItem(self.flag_session_token);
		sessionStorage.removeItem(self.lastReqTime_Token);
		sessionStorage.removeItem(self.flag_th_session_token);
		sessionStorage.removeItem(self.cache_current_session_id);
		sessionStorage.removeItem(self.flag_next_token_time);
		document.removeEventListener("mousemove",self.flagPageByListen,false);
		document.removeEventListener("mousedown",self.flagPageByListen,false);
		self.flagPageIsDestroy(1);
	},
	//验证token是否有效，用于判定服务端返回回来的失效是否是真的失效
	checkTokenIsInvalid: function() {
		let self = this;
		return self.checkPageIsDestroy();
	},
	//验证第三方token的有效性
	checkThTokenIsValid: function(thToken) {
		let self = this;
		let lastThToken = self.getThToken();
		if(lastThToken != thToken) return false;
		return true;
	},
	//监听页面刷新
	initPageReload: function() {
		let self = this;
		//保证页面刷新也能发起定时监听
		self.listenerToPageActive();
		//保证页面刷新也能发起定时监听
		self.intime2FindToken();
	}
};

token_self_obj.initPageReload();

//暴露获取token接口
export const getToken = function() {
	return token_self_obj.getToken();
};

//暴露设置token接口
export const setToken = function(token, thToken, userId) {
	token_self_obj.setUserId(userId);
	token_self_obj.flagPageIsDestroy(2);
	token_self_obj.setThToken(thToken);
	token_self_obj.setToken(token);
	token_self_obj.intime2FindToken();
	token_self_obj.flagPageActive();
	token_self_obj.listenerToPageActive();
};

//暴露验证第三方token接口
export const checkThTokenIsValid = function(thToken) {
	return token_self_obj.checkThTokenIsValid(thToken);
};

//暴露销毁token接口
export const destroyed = function() {
	token_self_obj.destroyed();
};

//暴露验证token是否失效接口
export const checkTokenIsInvalid = function() {
	return token_self_obj.checkTokenIsInvalid();
};