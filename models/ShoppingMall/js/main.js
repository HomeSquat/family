/**
 * 获取节点
 * 建议把页面节点的获取都写到dom下，方便管理
 * @author dongdongjie <zdj@ourstu.com> 2017-11-1
 */
var dom = {
	$search : document.getElementById("search"), //搜索框
	$mui_slider : mui(".mui-slider")[0], //图片轮播
	$tab_list : document.getElementById("tab-list")
}

mui(dom.$mui_slider).slider({
	interval:5000 
})

mui(dom.$tab_list).scroll({
	scrollX: true, //是否横向滚动
	scrollY:false,
	deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
	indicators: false, //是否显示滚动条
	bounce: true //是否启用回弹
})
