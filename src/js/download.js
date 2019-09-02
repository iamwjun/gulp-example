/*! download.js | (c)订货宝 2019, 2019 | cddxwujun@qq.com */
'use strict';

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.download = factory());
}(this, (function () {
  'use strict';4

  /**
   * 获取客户端userAgent
   */
  const userAgent = navigator.userAgent.toLowerCase();

  /**
   * 获取完整url
   */
  const url = new URL(window.location.href);

  /**
   * 获取客户端系统信息
   */
  let systemInformation = {
    weixin: userAgent.indexOf('micromessenger') > -1 ? 1 : 0,
    android: userAgent.indexOf('android') > -1 ? 1 : 0,
    ios: userAgent.indexOf('iphone') > -1 ? 1 : 0,
    wp: userAgent.indexOf('windows phone') > -1 ? 1 : 0
  };

  /**
   * url参数
   * a android参数 i ios参数  enterprise 是否企业应用参数 T/F
   */
  let urlParameter = {
    a: url.searchParams.get('a'),
    i: url.searchParams.get('i'),
    enterprise: url.searchParams.get('enterprise')
  }

  /**
   * 下载地址
   */
  let downloadUrl = {
    android: `https://mobcdn.dhb168.com/app/${urlParameter.a}/${urlParameter.a}.apk`,
    ios: `https://itunes.apple.com/us/app/ding-huo-bao-3.0/${urlParameter.i}?l=zh&ls=1&mt=8`,
    enterprise: `guide-ios-enterprise.html?a=${urlParameter.a}`
    //enterprise: `itms-services://?action=download-manifest&url=https://dhb-apk.oss-cn-hangzhou.aliyuncs.com/app/${urlParameter.a && urlParameter.a.split('.')[0]}/manifest.plist`
  }

  /**
   * 开始下载业务流程
   */
  var startDownload = function () {
    systemInformation.weixin ? weixinOperating() : urlJump();
  }

  /**
   * 获取element对象
   * @param {string} selectors 类名或者ID
   */
  var $ = function (selector) {
    return document.querySelector(selector);
  }

  /**
   * 获取element对象
   * @param {string} selectors 类名或者ID
   */
  var $s = function (selectors) {
    return document.querySelectorAll(selectors);
  }

  /**
   * dom操作，加载图，显示div
   * @param {object} element element对象
   * @param {string} imgName 图片名称
   */
  var elementOperating = function (element, imgName) {
    if (element) {
      element.lastElementChild.src = `../img/${imgName}.jpg`;
      element.style.display = 'block';
    }
  }

  /**
   * 微信中根据操作系统显示对应指示图片
   */
  var weixinOperating = function () {
    if (systemInformation.android) {
      elementOperating($('.android-wx'), 'hint01');
    } else if (systemInformation.ios) {
      elementOperating($('.ios-wx'), 'hint02');
    } else {
      elementOperating($('.winphone'), 'hint04');
    }
  }

  /**
   * 非微信浏览器打开链接操作
   */
  var urlJump = function () {
    if (systemInformation.android) {
      window.location.href = downloadUrl.android;
    } else if (systemInformation.ios) {
      // 判断是否企业应用
      window.location.href = urlParameter.enterprise == 'T' ? downloadUrl.enterprise : downloadUrl.ios;
    } else {
      weixinOperating($('.winphone'));
    }
  }

  var download = {
    start: startDownload
  };
  return download;
})));