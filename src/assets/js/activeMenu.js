
let now_active_menu_url = "now_active_menu_url";

/**
 * [取得当前url链接]
 * @return {[type]} [description]
 */
export function getUrl() {
	let urlObjStr = sessionStorage.getItem(now_active_menu_url);
	let urlObj = JSON.parse(urlObjStr);
	return urlObj;
};

/**
 * [缓存当前触发的url信息]
 * @param {[type]} path    [url链接]
 * @param {[type]} query [参数]
 */
export function setUrl(path, query) {
	let urlObjStr = JSON.stringify({path: path, query: query});
	sessionStorage.setItem(now_active_menu_url,urlObjStr);
};