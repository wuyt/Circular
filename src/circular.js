/*!
 * circular.js 1.0
 * https://github.com/wuyt/Circul
 * http://blog.csdn.net/wuyt2008/article/details/53302880
 * @license MIT licensed
 *
 * Copyright (C) 2016 吴雁涛
 */
// JavaScript Document
/*global $ */
(function($) {

    //定义参数
    "use strict";
    var centerDeg;//扇形中心线角度
    var allDeg;//整个扇形角度
    var inner;//内部圆形百分比
    var hidden;//开始时是否隐藏
    var animation;//动画类型
    var spacing;//间距
    var time;//动画时间

    var startDeg;//开始角度
    var count;//总块数
    var perDeg;//每个扇形角度
    var skew;
    var rotate;

    $.fn.circular = function(options) {

        //设置参数默认值
        $.fn.circular.defaults = {
            centerDeg: 90,
            allDeg: 180,
            inner: 50,
            hidden: false,
            animation: "zoom",
            spacing: 0,
            time: 0.5
        };

        var opts = $.extend({}, $.fn.circular.defaults, options);

        //显示扇形方法
        this.toShow = function() {
            switch (animation) {
                case "zoom":
                    $(this).find("ul li").css("transition", "");
                    $(this).css("transition", "all " + time + "s ease 0s");
                    $(this).css("transform", "scale(1)");
                    break;
                default:
                    $(this).find("ul li").css("transition", "all " + time / 2 + "s ease " + time / 2 + "s");
                    $(this).css("transition", "all " + time / 2 + "s ease 0s");
                    $(this).css("transform", "scale(1)");
                    circularExpand(this, startDeg, perDeg, spacing);
                    break;
            }
        }

        //隐藏扇形方法
        this.toHidden = function() {
            if (animation == "zoom") {
                $(this).find("ul li").css("transition", "");
                $(this).css("transition", "all " + time + "s ease 0s");
                $(this).css("transform", "scale(0)");
            } else {
                $(this).find("ul li").css("transition", "all " + time / 2 + "s ease 0s");
                $(this).css("transition", "all " + time / 2 + "s ease " + time / 2 + "s");
                switch (animation) {
                    case "clockwise":
                        circularShrink(this, startDeg, perDeg);
                        break;
                    case "counterclockwise":
                        circularShrink(this, startDeg + allDeg - perDeg, perDeg);
                        break;
                    case "bothside":
                        (this).css("transition", "all " + time / 2 + "s ease " + time / 2 + "s");
                        circularShrink(this, centerDeg - perDeg / 2, perDeg);
                        break;
                }
                $(this).css("transform", "scale(0)");
            }
        }

        return this.each(function() {
            centerDeg = opts.centerDeg;
            allDeg = opts.allDeg;
            inner = opts.inner;
            hidden = opts.hidden;
            animation = opts.animation;
            spacing = opts.spacing;
            time = opts.time;

			$(this).addClass("circular");

            //获取扇形个数
            count = $(this).find("ul li").length;

            perDeg = (allDeg - (spacing * (count - 1))) / count;
            startDeg = centerDeg - allDeg / 2;

            //默认样式设置

            //旋转li
            switch (animation) {
                case "clockwise":
                    circularShrink(this, startDeg, perDeg);
                    break;
                case "counterclockwise":
                    circularShrink(this, startDeg + allDeg - perDeg, perDeg);
                    break;
                case "bothside":
                    circularShrink(this, centerDeg - perDeg / 2, perDeg);
                    break;
                default:
                    circularExpand(this, startDeg, perDeg, spacing);
                    break;
            }

            //扇形外边
            rotate = 90 - perDeg / 2;
            skew = 90 - perDeg;
            $(this).find("ul li a").css("transform", "skew(-" + skew + "deg) rotate(-" + rotate + "deg) scale(1)");

            //扇形内边
            $(this).find("ul li a").css("background", "radial-gradient(transparent " + inner / Math.sqrt(2) + "%," + $(this).find("ul li a").css("background-color") + " " + inner / Math.sqrt(2) + "%)");

            //内边遮盖
            $(this).find("ul").after("<div class=\"after\"></div>");
            $(this).find("div.after").css({
                "width": inner + "%",
                "height": inner + "%",
                "top": (100 - inner) / 2 + "%",
                "left": (100 - inner) / 2 + "%"
            });

            //是否显示
            if (hidden) {
                $(this).css("transform", "scale(0)");
            } else {
                circularExpand(this, startDeg, perDeg, spacing);
                $(this).css("transform", "scale(1)");
            }
        });// this.each结束
    };// 主体结束

    //支持方法

    //全部展开
    function circularExpand(container, startDeg, perDeg, spacing) {
        $(container).find("ul li").each(function(index, element) {
            var skew = 90 - perDeg;
            var rotate = startDeg + index * perDeg + index * spacing;

            $(element).css("transform", "rotate(" + rotate + "deg) skew(" + skew + "deg)");
        });
    }

    //收缩
    function circularShrink(container, rotate, perDeg) {
        $(container).find("ul li").each(function(index, element) {
            var skew = 90 - perDeg;
            $(element).css("transform", "rotate(" + rotate + "deg) skew(" + skew + "deg)");
        });
    }
} ($));