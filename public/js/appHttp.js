//document.write("<script language='javascript' src='../../config.js'></script>");
var httpRequest = function(){
	var $this =this;
	$this.data = {};
	$this.host = APP_BASE.domain+"/api/";
	$this.addData = function(key, value) {
		if(!value)return;
		$this.data[key] = value;
	};
	$this.request = function(url, method, callback, asynch) {
		asynch = asynch == null ? true : asynch;
		var data = new FormData();
//		var appVersion = app.getVersion();
		var appVersion = "5.0.0";
		data.append('version', appVersion);
		data.append('method', method);
		data.append('access_token', APP_BASE.access_token);
		data.append('open_id',  '');
		for (key in $this.data) {
			data.append(key, $this.data[key]);
		}

		var XML = new XMLHttpRequest();
		var XMLtimeout = setTimeout(function(){
			toast.info('网络连接超时，请检查网络');
			if(XML)XML.abort();
		},HTTP_DELAY);
		XML.onreadystatechange = function() {
			switch(XML.readyState){
				case 4 :{
							var result;
							if(XMLtimeout)clearTimeout(XMLtimeout);		//模拟的超时处理机制
							try{
								result = JSON.parse(XML.responseText);
							}catch(e){
			//					var errorInfo = XML.responseText.match(/<p class="font">[^<]+<\/p>/g);
								console.log(XML.responseText);
								toast.hideLoading();
								if(e instanceof SyntaxError){
									console.log('错误的数据接口：' + url);
								}
								result = {info:'接口错误',code:400};
							}
							callback(result);
						};break;
			}
			
		};
		XML.open('POST', $this.host + url, asynch);
		XML.send(data);
	};

	$this.get = function(url, callback, asynch) {
		$this.request(url, 'GET', callback, asynch)
	};

	$this.post = function(url, callback, asynch) {
		$this.request(url, 'POST', callback, asynch)
	};

	$this.put = function(url, callback, asynch) {
		$this.request(url, 'PUT', callback, asynch)
	};

	$this.delete = function(url, callback, asynch) {
		$this.request(url, 'DELETE', callback, asynch)
	}
}
