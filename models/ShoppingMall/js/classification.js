var dom = {
	$refreshContainer: document.getElementById("refreshContainer"),
	$muiFullscreen: document.getElementsByClassName("mui-fullscreen")[0],
	$classificationWrapper: document.getElementById("classification-wrapper")
}

mui.plusReady(function() {
	//根据上个页面传过来的值，设置当前页面的标题显示的文字
	appOpenWebView.setWebViewTitleName();

	//	dom.$muiFullscreen.style.height = WINDOW_HEIGHT -dom.$classificationWrapper.offsetHeight-5 + "px";

	/**
	 * 设置分类的滚动属性
	 * @author dongdongjie <zdj@ourstu.com> 2017-11-11
	 */
	mui('.mui-scroll-wrapper').scroll({
		bounce: false
	});
	/**
	 * 各个分类的上拉加载，下拉刷新
	 * @author dongdongjie <zdj@ourstu.com> 2017-11-04
	 */
	mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
		mui(pullRefreshEl).pullToRefresh({
			down: {
				auto: true,
				callback: function() {
					console.log("下拉刷新");
					//TODO ，请求服务器数据，逻辑代码，暂时注释
					pullObj = this;
					if(true) {

						pullObj.endPullDownToRefresh();
						pullObj.refresh(true);
						pullObj.endPullUpToRefresh(false);
					} else {
						pullObj.endPullDownToRefresh();
						pullObj.refresh(false);
						pullObj.endPullUpToRefresh(true);
					}

				}
			},
			up: {
				height: 50, //可选.默认50.触发上拉加载拖动距离
				//    		auto:true,//可选,默认false.自动上拉加载一次
				contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
				contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
				callback: function() {
					console.log("上拉加载");
					//TODO ，请求服务器数据，逻辑代码，暂时注释
					pullObj = this;
					if(true) {
						pullObj.endPullUpToRefresh(false);
					} else {
						pullObj.endPullUpToRefresh(true);
					}
				}
			}
		});
	})

})