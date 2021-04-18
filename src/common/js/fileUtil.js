import axios from 'axios'

/**
 * 文件下载
 * @param  {[type]} url      [description]
 * @param  {[type]} fileName [description]
 * @return {[type]}          [description]
 */
export function download(url, fileName, params) {
	if(!url) {
		console.info("文件下载失败，下载路径不存在!");
		return;
	}
	if(!fileName) {
		console.info("文件下载失败，fileName不存在!");
		return;
	}
    params = params || {};
    Object.keys(params).forEach(function(key){
        url += (url.indexOf("?") > -1 ? "&" : "?") + key + "=" + params[key];
    });
    console.info(url);
	axios.get(url,{
        responseType:'blob'
    }).then(function(response) {
        let blob = new Blob([response.data], {type: response.type}); 
    	let downloadElement = document.createElement('a');
    	let href = window.URL.createObjectURL(blob); //创建下载的链接
    　　downloadElement.href = href;
    　　downloadElement.download = fileName; //下载后文件名
    　　document.body.appendChild(downloadElement);
    　　downloadElement.click(); //点击下载
    　　document.body.removeChild(downloadElement); //下载完成移除元素
    　　window.URL.revokeObjectURL(href); //释放掉blob对象
    	console.info("文件下载成功!");
    }).catch(function(error){
    	console.info("文件下载失败!");
    });
};