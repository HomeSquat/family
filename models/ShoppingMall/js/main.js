/**
 * 获取节点
 * 建议把页面节点的获取都写到dom下，方便管理
 * @author dongdongjie <zdj@ourstu.com> 2017-11-01
 */
var dom = {
	$refreshContainer : document.getElementById("refreshContainer"), //上拉刷新，下拉加载节点
	$search: document.getElementById("search"), //搜索框
	$mui_slider: mui(".mui-slider")[0], //图片轮播
	$tab_list: document.getElementById("tab-list"), //横向滚动区域
	$special_column_list: document.getElementById("special-column-list")
}


mui.plusReady(function() {
	
	/**
	 * 上拉加载，下拉刷新
	 * @author dongdongjie <zdj@ourstu.com> 2017-11-04
	 */
	mui(dom.$refreshContainer).pullToRefresh({
		down: {
			callback: function() {
				console.log("下拉刷新");
				//TODO ，请求服务器数据，逻辑代码，暂时注释
//				pullObj = this;
//				if(true) {
//					pullObj.endPullDownToRefresh();
//					pullObj.refresh(true);
//					pullObj.endPullUpToRefresh(false);
//				} else {
//					pullObj.endPullDownToRefresh();
//					pullObj.refresh(false);
//					pullObj.endPullUpToRefresh(true);
//				}

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
//				pullObj = this;
//				if(true) {
//					pullObj.endPullUpToRefresh(false);
//				} else {
//					pullObj.endPullUpToRefresh(true);
//				}
			}
		}
	})
})

/**
 * 图片轮播设置
 * @author dongdongjie <zdj@ourstr.com> 2017-11-04
 */
mui(dom.$mui_slider).slider({
	interval: 5000
})

/**
 * 区域滚动设置
 * @author dongdongjie <zdj@ourstr.com> 2017-11-04
 */
mui(dom.$tab_list).scroll({
	scrollX: true, //是否横向滚动
	scrollY: false, //是否纵向滚动
	deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
	indicators: false, //是否显示滚动条
	bounce: true //是否启用回弹
})

/**
 * 页面滚动事件，当页面滚动到一定程度的时候$tab_list浮动在最顶部
 * tab_list_top表示 $tab_list节点距离页面顶部的距离
 * top 表示页面当前的卷去高度
 */
var tab_list_top = dom.$tab_list.offsetTop;
window.onscroll = function() {
	var top = document.documentElement.scrollTop || document.body.scrollTop;
	if(top >= tab_list_top) {
		dom.$tab_list.classList.add("active");
	} else {
		dom.$tab_list.classList.remove("active");
	}
}

//----------------------------------------------------------------------------------------------------------------------------------------		
//------------------------------------------------分界线：以下为function方法---------------------------------------------------------------	
//----------------------------------------------------------------------------------------------------------------------------------------	