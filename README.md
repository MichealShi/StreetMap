## 项目说明:
### 如何运行本项目
 - 直接用浏览器打开本工程根目录下的index.html文件就可运行本项目
 - 本项目可在桌面,平板电脑和手机浏览器上均可运行.
### 本项目功能介绍
 - 本项目所有应用组件均具有响应性
 - 本项目氛围三个区域,搜索区,菜单区(搜索按钮所在区域)和地图展示区
 - 点击搜索区列表,地区上会做出响应
 - 输入地点,过滤器会自动匹配地点
 - 过滤器匹配不到地点,您还可以点击输入框右侧的搜索Icon,在线搜索,搜索结果展示在右侧地图展示区
 - 本项目会初始化五个地点(雍和宫,恭王府,北京798艺术区,银河SOHO,鸟巢)
 - 点击地图上标记,会展示相应标记的位置信息,可关闭位置信息窗口

### 项目所用知识
 - 使用knockout做了代码分离, JS方法与Html组件绑定
 - 使用了异步数据请求,从Google和Foursquare请求数据
 - 为数据请求添加了错误信息处理和请求超时处理

#### 第三方API
 - Google Map JavaScript API
 - Google Places API Web Service
 - Knockout JS
 - jQuery ajax
 - Foursquare API


### 改进地方
 - 常量将var替换成const
 - 加入google.maps.event.trigger(marker, 'click');使用户点击条目地图上有变化
 - 使用了ES6的for of函数 for(let marker of markers)

### 待研究改进
 - locations独立成json文件
 - for of 与 forEach for 的区别
 - ES6的`Fifteen is ${a} and\nnot ${b}.`,这种方式为什么不起作用
