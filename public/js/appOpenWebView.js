var appOpenWebView = {
	
	/**
	 * 打开一个新页面的通用方法
	 * @param {Object} url			页面的相对路径
	 * @param {Object} id			页面的id，唯一标识
	 * @param {Object} data			上一个页面传递给新打开页面的参数
	 * @param {Object} show			新页面打开是的动画效果
	 * @param {Object} waiting		新页面打开时等待框的效果
	 * @param {Object} styles		页面显示的样式
	 */
	openSubWebView : function(url,id,data,show,waiting,styles){
		mui.openWindow({
			url : url,
			id 	: id,
			styles : styles === undefined?  {top:"0px",bottom:"0px",scrollIndicator:"none"}: styles,
			extras : data || {},
			show : show || {autoShow:true,aniShow:"pop-in",duration:100},
			waiting : waiting || {autoShow : false}
		});
	},
	
	setWebViewTitleName : function(){
		var titleName = plus.webview.currentWebview().webViewName;
		document.getElementById("title").innerHTML = titleName; 
	}
	
	
	
	
}
