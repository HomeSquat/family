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
	$special_column_list: document.getElementById("special-column-list"), //专栏列表
	$boutique_list: document.getElementById("boutique-list") //精品内容列表
}

mui.plusReady(function() {
	//----------------------------------------------------------------------------------------------------------------------------------------		
	//------------------------------------------------分界线：以下初始化部分---------------------------------------------------------------	
	//----------------------------------------------------------------------------------------------------------------------------------------	
	
	/**
	 * 顶部轮播图部分加载，向服务器发起请求动态加载，addSlider()方法见下面的function部分
	 * @author dongdongjie <zdj@ourstu.com> 2017-11-05 
	 */
	//	data模拟服务器传过来的数据
	var data = {
		img: [{
				src: "../img/banan.jpg"
			},
			{
				src: "../img/voice-front.png"
			},
			{
				src: "../img/banan.jpg"
			}
		]
	};
	addSlider(data);
	
	/**
	 * 专题列表部分加载，向服务器发起请求动态加载，addSpecialColumn()方法见下面的function部分
	 * @author dongdongjie <zdj@ourstu.com> 2017-11-06
	 */
	var data2 = {
		special: [{
				src: "../img/banan.jpg"
			},
			{
				src: "../img/voice-front.png"
			},
			{
				src: "../img/voice-front.png"
			},
			{
				src: "../img/banan.jpg"
			}
		]
	}
	addSpecialColumn(data2);
	
	
	/**
	 * 精品内容部分加载，向服务器发起请求动态加载， addBoutique()方法见下面的function部分
	 * @author dongdongjie <zdj@ourstu.com> 2017-11-06
	 */
	addBoutique(data2);

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
	
	document.getElementById("open-special-column").addEventListener("tap",function(){
//		plus.webview.open("../view/SpecialColumn-index.html","SpecialColumn-index",{},"pop-in",200);
		appOpenWebView.openSubWebView();
	})
	/**
	 * 上拉加载，下拉刷新
	 * @author dongdongjie <zdj@ourstu.com> 2017-11-04
	 */
	mui(dom.$refreshContainer).pullToRefresh({
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
 * sleder_item 轮播组件中的item节点
 * sleder_indicator 轮播组件中的指示器节点
 * sleder_item_temp 模板
 * @param {Object} data   ，从服务器传过来的值
 * @author dongdongjie <zdj@ourstu.com> 2017-11-05
 */
function addSlider(data) {
	for(var i = 0; i < data.img.length; i++) {
		var sleder_item = document.createElement("div"),
			sleder_indicator = document.createElement("div"),
			render = template.compile(sleder_item_temp);
		sleder_item.classList.add("mui-slider-item");
		sleder_indicator.classList.add("mui-indicator");
		if(i == 0) {
			//判断是否是第一张图片
			//为第一张轮播图添加mui-slider-item-duplicate类,并插入到mui-slider-group中，mui规定，若轮播图为自动轮播必须要在开头和结尾添加重复的图片
			var sleder_item_duplicate = document.createElement("div");
			sleder_item_duplicate.classList.add("mui-slider-item-duplicate");
			sleder_item_duplicate.classList.add("mui-slider-item");
			sleder_item_duplicate.innerHTML = render(data.img[i]);
			mui(".mui-slider .mui-slider-group")[0].appendChild(sleder_item_duplicate);

			//插入第一张轮播图
			sleder_indicator.classList.add("mui-active");
			sleder_item.innerHTML = render(data.img[i]);
			mui(".mui-slider .mui-slider-group")[0].appendChild(sleder_item);
			mui(".mui-slider .mui-slider-indicator")[0].appendChild(sleder_indicator);

		} else if(i == data.img.length - 1) {
			//判断是否是最后一张图片
			//插入最后一张轮播图
			sleder_item.innerHTML = render(data.img[i]);
			mui(".mui-slider .mui-slider-group")[0].appendChild(sleder_item);
			mui(".mui-slider .mui-slider-indicator")[0].appendChild(sleder_indicator);

			//为最后一张轮播图添加mui-slider-item-duplicate类,并插入到mui-slider-group中，mui规定，若轮播图为自动轮播必须要在开头和结尾添加重复的图片
			var sleder_item_duplicate = document.createElement("div");
			sleder_item_duplicate.classList.add("mui-slider-item-duplicate");
			sleder_item_duplicate.classList.add("mui-slider-item");
			sleder_item_duplicate.innerHTML = render(data.img[i]);
			mui(".mui-slider .mui-slider-group")[0].appendChild(sleder_item_duplicate);

		} else {
			//其他轮播图正常添加
			sleder_item.innerHTML = render(data.img[i]);
			mui(".mui-slider .mui-slider-group")[0].appendChild(sleder_item);
			mui(".mui-slider .mui-slider-indicator")[0].appendChild(sleder_indicator);
		}
	}

}

/**
 * 添加专题列表的方法
 * special_column_item 列表中的li节点
 * special_column_item_temp 模板
 * @param {Object} data 从服务器传过来的值
 * @author dongdongjie <zdj@ourstu.com> 2017-11-06
 */
function addSpecialColumn(data) {
	for(var i = 0; i < data.special.length; i++) {
		var special_column_item = document.createElement("li"),
			render = template.compile(special_column_item_temp);
		special_column_item.classList.add("mui-table-view-cell");
		special_column_item.classList.add("mui-media");
		special_column_item.innerHTML = render(data.special[i]);
		dom.$special_column_list.appendChild(special_column_item);
	}
}

/**
 * 添加精品内容列表的方法
 * boutiq_item 列表中的li节点
 * boutique_item_temp 模板
 * @param {Object} data 从服务器传过来的值
 */
function addBoutique(data){
	for(var i = 0;i<data.special.length;i++){
		var boutique_item = document.createElement("li"),
			render = template.compile(boutique_item_temp);
		boutique_item.classList.add("mui-table-view-cell");
		boutique_item.classList.add("mui-media");
		boutique_item.innerHTML = render(data.special[i]);
		dom.$boutique_list.appendChild(boutique_item);
		
	}
}

//function send(){
//	var request = new httpRequest();
//		request.get('weibo_crowd_type', function(res) {
//			console.log(JSON.stringify(res));
//		});
////	console.log(APP_BASE.domain);
//}
//send();
