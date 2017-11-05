/**
 * 获取节点
 * 建议把页面节点的获取都写到dom下，方便管理
 * @author dongdongjie <zdj@ourstu.com> 2017-11-01
 */
var dom = {
	$refreshContainer: document.getElementById("refreshContainer"), //上拉刷新，下拉加载节点
	$search: document.getElementById("search"), //搜索框
	$mui_slider: mui(".mui-slider")[0], //图片轮播
	$tab_list: document.getElementById("tab-list"), //横向滚动区域
	$special_column_list: document.getElementById("special-column-list")//专栏列表
}

mui.plusReady(function() {
	//----------------------------------------------------------------------------------------------------------------------------------------		
	//------------------------------------------------分界线：以下初始化部分---------------------------------------------------------------	
	//----------------------------------------------------------------------------------------------------------------------------------------	
	/**
	 * 顶部轮播图部分加载，向服务器发起请求动态加载
	 * @author dongdongjie <zdj@ourstu.com> 2017-11-05 
	 */ 
	var data = {
		1:[
			{src : "../img/banan.jpg"}
		],
		2:[
			{src : "../img/banan.jpg"}
		]
	};
	addSlider(data);
	
	/**
	 * 图片轮播设置
	 * @author dongdongjie <zdj@ourstu.com> 2017-11-04
	 */
	mui(dom.$mui_slider).slider({
		interval: 5000
	});

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
	});

	/**
	 * 上拉加载，下拉刷新
	 * @author dongdongjie <zdj@ourstu.com> 2017-11-04
	 */
	mui(dom.$refreshContainer).pullToRefresh({
		down: {
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

	//----------------------------------------------------------------------------------------------------------------------------------------		
	//------------------------------------------------分界线：事件部分---------------------------------------------------------------	
	//----------------------------------------------------------------------------------------------------------------------------------------	
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

})

//----------------------------------------------------------------------------------------------------------------------------------------		
//------------------------------------------------分界线：以下为function方法---------------------------------------------------------------	
//----------------------------------------------------------------------------------------------------------------------------------------


/**
 * 添加轮播图片的方法
 * sleder_item_temp 轮播组件中的item节点
 * sleder_indicator_temp 轮播组件中的指示器节点
 * @param {Object} data   ，从服务器传过来的值
 * @author dongdongjie <zdj@ourstu.com> 2017-11-05
 */
function addSlider(data){
	var sleder_item = document.createElement("div"),
		sleder_indicator = document.createElement("div"),
		render = template.compile(sleder_item_temp),
		jsonlength =0;
	for(jsons in data){
		jsonlength++;
	}
	console.log(jsonlength);
	for(var i=0;i<jsonlength;i++){
		console.log(data[i]);
		sleder_item.classList.add("mui-slider-item");
		sleder_indicator.classList.add("mui-indicator");
		if(i == 0){
			sleder_item.classList.add("mui-slider-item-duplicate");
			sleder_indicator.classList.add("mui-active");
			sleder_item.innerHTML = render(data[i]);
			mui(".mui-slider .mui-slider-group")[0].insertBefore(sleder_item);
		}
		if(i == data.length-1){
			sleder_item.classList.add("mui-slider-item-duplicate");
			sleder_item.innerHTML = render(data[i]);
			mui(".mui-slider .mui-slider-group")[0].appendChild(sleder_item);
		}
		sleder_item.classList.remove("mui-slider-item-duplicate");
		
		sleder_item.innerHTML = render(data[i]);
		mui(".mui-slider .mui-slider-group")[0].appendChild(sleder_item);
		mui(".mui-slider .mui-slider-indicator")[0].appendChild(sleder_indicator);
	}
	
}
