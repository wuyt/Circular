# Circular
jquery 扇形显示插件

使用说明：

1、引入样式，脚本及jquery

2、定义外框、ul及li

外框的容器需要高宽相等

3、脚本调用方法

var circ =$(".demo").circular(); 

4、参数

centerDeg: 90,//扇形中心线角度，单位：度，默认：90

allDeg: 180,//整个扇形角度，单位：度，默认：180

inner: 50,//内部圆形百分比，默认：50

hidden: false,//开始时是否隐藏，默认：false

animation: "zoom",//动画类型，默认：zoom，其他：clockwise：顺时针展开，counterclockwise：逆时针展开，bothside：两侧展开

spacing: 3,//间距，单位：度，默认：0

time: 0.5//动画时间，单位：秒，默认：0.5


circ.toHidden();//隐藏方法  
circtoShow();//显示方  

http://blog.csdn.net/wuyt2008/article/details/53302880#t1