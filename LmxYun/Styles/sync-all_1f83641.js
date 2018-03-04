define("file-widget-1:video/context.js",function(t,e,n){var o={context:null},c={getContext:function(){return o.context},setContext:function(t){"object"==typeof t&&(o.context=t)}};n.exports=c});
;define("file-widget-1:video/util/filePlayVedio.js",function(o,e,n){var i=o("file-widget-1:video/context.js"),t=window.yunData,a=function(){};a.obtain="",a.prototype={reBuild:function(o){var e,n=o&&o.path;i.getContext().log.send({type:"videoWatch"}),"/disk/home"===window.location.pathname?(e="/play/video#video/path="+encodeURIComponent(n)+"&t=-1",this.openPlay(e)):/(\/s\/[\w\W]+)/.test(window.location.pathname)?(e=window.location.pathname+"?fid="+o.fs_id,this.openPlay(e)):/(\/share\/link)/.test(window.location.pathname)?(e="/share/link?shareid="+t.SHARE_ID+"&uk="+t.SHARE_UK+"&fid="+o.fs_id,this.openPlay(e)):window.location.pathname.indexOf("clear")>0&&(e="/play/video#video/path="+encodeURIComponent(n)+"&t=-1",this.openPlay(e))},openPlay:function(o){return o?void window.open(o):!1}},a.obtain=a.obtain||new a,n.exports=a});
;define("file-widget-1:video/start.js",function(e,i,t){var l=e("file-widget-1:video/util/filePlayVedio.js"),s=l.obtain,f=e("file-widget-1:video/context.js");t.exports={start:function(e,i){f.setContext(e);var t,l;if(t="object"==typeof i&&i.filesList?i.filesList.length>0?i.filesList:[i.filesList]:e.list.getSelected(),1!==t.length)throw new Error("[Plugin][file-widget-1/video] The filesList must have one file !");l=t[0],l.path&&s.reBuild(l)}}});
;define("file-widget-1:download/service/dlinkService.js",function(t,r,e){var a=t("base:widget/libs/jquerypacket.js"),n=t("base:widget/libs/underscore.js"),i=t("system-core:context/context.js"),o=window.yunData,s={PRODUCT_PAN:"pan",PRODUCT_MBOX:"mbox",PRODUCT_SHARE:"share",currentProduct:null,dialog:null,sign:null,setCurrentProduct:function(t){this.currentProduct=t},getCurrentProduct:function(){return this.currentProduct},URL_DLINK_PAN:"/api/download",URL_DLINK_SHARE:"/api/sharedownload",_doError:function(t){var r="",e=this,a=i.instanceForSystem.accountBan(t);if(a.isBan)return!1;if(2==t&&(r="下载失败，请稍候重试"),116===t&&(r="该分享不存在！"),-1===t&&(r="您下载的内容中包含违规信息！"),118===t&&(r="没有下载权限！"),(113===t||112===t)&&(r='页面已过期，请<a href="javascript:window.location.reload();">刷新</a>后重试'),-20===t)return void e._showVerifyDialog();121===t&&(r="你选择操作的文件过多，减点试试吧。"),r=r||"网络错误，请稍候重试";new i.instanceForSystem.ui.tip({mode:"caution",msg:r,hasClose:!0,autoClose:!1})},getFsidListData:function(t){return n.isArray(t)===!1&&(t=[t]),a.stringify(n.pluck(t,"fs_id"))},getPathListData:function(t){return n.isArray(t)===!1&&(t=[t]),a.stringify(n.pluck(t,"path"))},base64Encode:function(t){var r,e,a,n,i,o,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(a=t.length,e=0,r="";a>e;){if(n=255&t.charCodeAt(e++),e==a){r+=s.charAt(n>>2),r+=s.charAt((3&n)<<4),r+="==";break}if(i=t.charCodeAt(e++),e==a){r+=s.charAt(n>>2),r+=s.charAt((3&n)<<4|(240&i)>>4),r+=s.charAt((15&i)<<2),r+="=";break}o=t.charCodeAt(e++),r+=s.charAt(n>>2),r+=s.charAt((3&n)<<4|(240&i)>>4),r+=s.charAt((15&i)<<2|(192&o)>>6),r+=s.charAt(63&o)}return r},getDlinkPan:function(t,r,e,n,s,c){var d,u,p=this;if(null===p.sign){try{u=new Function("return "+o.sign2)()}catch(l){throw new Error(l.message)}if("function"!=typeof u)return void this._doError();p.sign=p.base64Encode(u(o.sign5,o.sign1))}"[object Array]"===Object.prototype.toString.call(t)?t=a.stringify(t):"string"!=typeof t||/^\[\S+\]$/.test(t)||(t="["+t+"]"),d={sign:p.sign,timestamp:o.timestamp,fidlist:t,type:r},n&&s&&(d.ct=n,d.cv=s),window.location.hash.match("#cardholder/")&&(d.src="cardholder"),a.ajax({url:this.URL_DLINK_PAN,data:d,dataType:"json",type:c||"GET",success:function(t,r,n){i.instanceForSystem.log.send({type:"webdownload",url:"//update.pan.baidu.com/statistics",clienttype:"0",op:"download",from:d.type,product:"pan",success:t&&0===+t.errno?1:0,reason:t?t.errno:0,ajaxstatus:n.status,ajaxurl:"/api/download",ajaxdata:a.stringify(r)}),0==t.errno?t.dlink&&t.dlink.length>0?"function"==typeof e&&(t.logType="webdownload",t.logFrom=d.type,e(t)):p._doError():p._doError(t.errno)},error:function(t,r){i.instanceForSystem.log.send({type:"webdownload",url:"//update.pan.baidu.com/statistics",clienttype:"0",op:"download",from:d.type,product:"pan",success:0,ajaxstatus:t.status,ajaxurl:"/api/download",ajaxdata:a.stringify(r)}),p._doError()}})},ajaxGetDlinkShare:function(){var t={encrypt:0};0===o.SHARE_PUBLIC&&(t.extra=a.stringify({sekey:decodeURIComponent(i.instanceForSystem.tools.baseService.getCookie("BDCLND"))}));var r=function(){a.get("/share/autoincre",{type:1,uk:o.SHARE_UK,shareid:o.SHARE_ID,sign:o.SIGN,timestamp:o.TIMESTAMP})};return function(e,n){var o=this,s=a.extend({},t,e),c=s.sign,d=s.timestamp;delete s.sign,delete s.timestamp,a.ajax({type:"POST",url:this.URL_DLINK_SHARE+"?sign="+c+"&timestamp="+d,data:s,success:function(t,e,c){var d=null;try{d=a.parseJSON(t)}catch(u){}i.instanceForSystem.log.send({type:"websharedownload",url:"//update.pan.baidu.com/statistics",clienttype:"0",op:"download",from:s.product,product:"pan",success:d&&0===+d.errno?1:0,reason:d?d.errno:0,ajaxstatus:c.status,ajaxurl:"/api/sharedownload",ajaxdata:a.stringify(e)}),d?0==d.errno?(s.product===o.PRODUCT_SHARE&&r(),"function"==typeof n&&(d.logType="websharedownload",d.logFrom=s.product,n(d))):o._doError(d.errno):o._doError()},error:function(t,r){i.instanceForSystem.log.send({type:"websharedownload",url:"//update.pan.baidu.com/statistics",clienttype:"0",op:"download",from:s.product,product:"pan",success:0,ajaxstatus:t.status,ajaxurl:"/api/sharedownload",ajaxdata:a.stringify(r)}),o._doError()}})}}(),getDlinkMbox:function(){var t=function(t){var r={uk:o.MYUK,product:s.PRODUCT_MBOX,encrypt:0,timestamp:"",sign:""},e={};return t.vcode&&(e.vcode=t.vcode,e.input=t.input),t.isForBatch===!0&&(e.type="batch"),t.isForGuanjia===!0&&(e.encrypt=1),t.ct&&t.cv&&(e.ct=t.ct,e.cv=t.cv),e=t.group_id?a.extend({},r,e,{primaryid:t.msg_id,fid_list:s.getFsidListData(t.list),extra:a.stringify({type:"group",gid:t.group_id})}):a.extend({},r,e,{primaryid:t.msg_id,fid_list:s.getFsidListData(t.list),extra:a.stringify({type:"single",from_uk:t.from_uk,to_uk:t.to_uk})})};return function(r,e){this.arguments=arguments,this.ajaxGetDlinkShare(t(r),e)}}(),getDlinkShare:function(){var t=function(t){var r={product:s.PRODUCT_SHARE,encrypt:0,timestamp:"",sign:""},e={};return t.vcode_input&&t.vcode_str&&(e.vcode_input=t.vcode_input,e.vcode_str=t.vcode_str),t.type&&(e.type=t.type),t.isForBatch===!0&&(e.type="batch"),t.isForGuanjia===!0&&(e.encrypt=1),t.ct&&t.cv&&(e.ct=t.ct,e.cv=t.cv),e=a.extend({},r,e,{uk:t.share_uk,primaryid:t.share_id,product:t.product,fid_list:t.list?s.getFsidListData(t.list):"",path_list:t.path?s.getPathListData(t.path):"",sign:t.sign,timestamp:t.timestamp})};return function(r,e){this.arguments=arguments,this.ajaxGetDlinkShare(t(r),e)}}(),_showVerifyDialog:function(){var t=this;t.dialog=i.instanceForSystem.ui.verify({title:"提示",prod:"pan",onSure:function(r,e){t.arguments[0].vcode_str=r,t.arguments[0].vcode_input=e,t.arguments.callee.apply(t,t.arguments)}}),t.dialog.show()}};e.exports=s});
;define("file-widget-1:download/util/context.js",function(t,e,n){var o={context:null},i=t("file-widget-1:download/log.js"),l={getContext:function(){return o.context},setContext:function(t){o.context=t,t&&t.log&&t.log.define(i)}};n.exports=l});
;define("file-widget-1:download/util/downloadCommonUtil.js",function(e,t,n){var o=e("base:widget/libs/jquerypacket.js"),r=e("file-widget-1:download/service/dlinkService.js"),i=e("file-widget-1:download/util/context.js"),s=e("base:widget/tools/service/tools.flash.js"),a={getFlashVersion:function(){var e=0,t=navigator;if(t.plugins&&t.plugins.length){for(var n=0,o=t.plugins.length;o>n;n++)if(-1!==t.plugins[n].name.indexOf("Shockwave Flash")){e=t.plugins[n].description.split("Shockwave Flash ")[1];break}}else if(window.ActiveXObject)try{var r=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");if(r){var i=r.GetVariable("$version"),s=/WIN ([\d\.\,]+)/g,a=s.exec(i);a&&(e=a[1])}}catch(c){}return e},compareVersion:function(e,t,n){return"string"==typeof e&&(e=e.replace(/(^|\.)(\d)(?=\.|$)/g,"$10$2").replace(/\./g,""),e=e.length<=6?e+="00":e,e=parseInt(e,10)),"string"==typeof t&&(t=t.replace(/(^|\.)(\d)(?=\.|$)/g,"$10$2").replace(/\./g,""),t=t.length<=6?t+="00":t,t=parseInt(t,10)),n?e>t:e>=t},getDownloadLogmsg:function(){var e;return e=r.getCurrentProduct()===r.PRODUCT_SHARE?2:1},useToast:function(e){i.getContext().ui.tip({mode:e.toastMode,msg:e.msg})},useCloseToast:function(){i.getContext().ui.hideTip()},getPackName:function(e){var t,n=i.getContext().tools.baseService.parseDirFromPath(e[0].path),o=e[0].isdir;if("number"==typeof e.length){var r=e.length>1?"【批量下载】{%packName%}等.zip":"{%packName%}.zip";return 0===o&&(t=n.lastIndexOf("."),-1!==t&&(n=n.substring(0,t))),r.replace(/{%packName%}/g,n)}return i.getContext().tools.baseService.parseDirFromPath(e[0].path)},isFile:function(e){return 0===e||void 0===e?!0:!1},isPlatformWindows:function(){var e=navigator.platform;return 0===e.toLowerCase().indexOf("win")},isPlatformMac:function(){var e=/Mac\D+(\d+).(\d*)/gi,t=e.exec(navigator.userAgent);return t&&t[1]&&(+t[1]>10||10===+t[1]&&t[2]&&+t[2]>=10)?!0:!1},getDownloadUrl:function(e){return o.browser.msie?e.dlink+"&response-cache-control=private":e.dlink},isChromeAndGreaterThan42:function(){var e="42";return a.getChromeVersion()>=e?!0:!1},getChromeVersion:function(){var e,t=navigator.userAgent.toLowerCase(),n=/chrome/,o=/safari\/\d{3}\.\d{2}$/,r=/chrome\/(\S+)/;return n.test(t)&&o.test(t)&&r.test(t)?e=RegExp.$1:0},isChrome:function(){var e=navigator.userAgent.toLowerCase(),t=/chrome/;return t.test(e)?!0:!1},ctrBrowserVersion:function(e,t,n){var o="get"+e.slice(0,1).toUpperCase()+e.slice(1)+"Version",r=a[o],i=parseInt(r(),10),n=parseInt(n,10);return"<"===t?n>i:"=="===t||"==="===t?i===n:"<="===t?n>=i:">="===t?i>=n:">"===t?i>n:void 0},shouldKeepAlive:function(){return location.protocol.indexOf("https")>-1&&(!s.checkFlashSupport()||a.isPlatformMac()&&a.ctrBrowserVersion("firefox",">","50")||a.ctrBrowserVersion("chrome","==","59"))},isFirefoxAndGreaterThan50:function(){var e="50";return a.isFirefox()&&a.getFirefoxVersion()>e?!0:!1},getFirefoxVersion:function(){var e,t=navigator.userAgent.toLowerCase(),n=/firefox\/(\S+)/;return n.test(t)?e=RegExp.$1:0},isFirefox:function(){var e=navigator.userAgent.toLowerCase(),t=/firefox/;return t.test(e)?!0:!1},toLogin:function(){var t=this;this.useToast({toastMode:"loading",msg:"请稍候..."}),e.async("base:widget/passAPI/passAPI.js",function(e){t.useCloseToast(),e.promise.done(function(){e.passAPI.PassportInit.netdiskLogin({reload:!0}),e.passAPI.PassLoginDialog.onLoginSuccessCallback=function(){e.passAPI.PassportInit.hide(),i.getContext().log.send({type:"download_share_single_size_limit_login_success"})}}),i.getContext().log.send({type:"download_share_single_size_limit_login_dialog_show"})})},openYunGuanjiaByScheme:function(e,t){var n=!1,r=function(){n=!0};o(window).on("blur",r);var i=function(){n&&setTimeout(function(){"function"==typeof t&&t()},100),n=!1,o(window).off("focus",i)};if(o(window).on("focus",i),a.isChrome()){var s=document.createElement("a"),c=null;"function"==typeof MouseEvent?c=new MouseEvent("click",{bubbles:!0,cancelable:!1}):(c=document.createEvent("MouseEvents"),c.initEvent("click",!0,!1)),s.href=e,s.dispatchEvent(c)}else{var l=a.callClientIframe;l||(l=document.createElement("iframe"),o(l).hide(),a.callClientIframe=l,document.body.appendChild(l)),l.src=e}setTimeout(function(){o(window).off("blur",r),n||(o(window).off("focus",i),"function"==typeof t&&t())},100)}};n.exports=a});
;define("file-widget-1:download/log.js",function(e,o,t){t.exports={event:{},ajax:{"/api/download":{logType:"dis",description:"下载文件",callback:function(e,o){return[{name:"downloadHttpTime",value:o&&o.time},{name:"downloadHttpStatus",value:o&&o.responseData&&o.responseData.errno}]}}},mix:{chromeStraightforwardDownload:{logType:"count",description:"chrome直接下载文件"},httpsAccessFail:{logType:"count",description:"https访问失败"},httpsAccessSuccess:{logType:"count",description:"https访问成功"},https_pub:{logType:"count",description:"是否命中https访问的小流量"},callGuanjia:{logType:"count",description:"是否成功调起云管家"},tab_download_click:{logType:"count",description:"选中文件后点上方按钮文件下载"},list_download_click:{logType:"count",description:"列表下载按钮文件下载"},file_down_count:{logType:"count",description:"文件下载统计(不包含文件夹)"},call_guanjia_local:{logType:"count",description:"下载本地服务调起"},call_guanjia_server:{logType:"count",description:"下载长连接方式调起"},getBrowserIdByServer:{logType:"count",description:"发送长连接调起browserId请求"},checkIsOnlineByServer:{logType:"count",description:"发送长连接调起online请求"},callGuanjiaByServer:{logType:"count",description:"发送长连接调起send请求"},checkGuanjiaStatusByServer:{logType:"count",description:"发送长连接调起check请求"}}}});
;define("file-widget-1:download/service/guanjiaConnector.js",function(e,o,n){var t=e("file-widget-1:download/util/downloadCommonUtil.js"),i=e("base:widget/libs/jquerypacket.js"),c=e("base:widget/httpProxy/httpProxy.js"),a=e("base:widget/tools/tools.js"),r=e("file-widget-1:download/util/context.js"),l=window.yunData,u={},s={};u={conf:{localUrl:"http://127.0.0.1",localPort:1e4,currentPort:1e4,portPollLimit:10,guanjiaVersion:0,localServerReady:!1,domIframeId:"guanjia-iframe-id",domHookId:"guanjia-hook-id",hook:null,minVersion:"5.3.4.5"},setVersion:function(e){u.conf.guanjiaVersion=e,"http:"!==location.protocol||t.isPlatformWindows()&&!t.compareVersion(e,"5.4.7")||u.imageAccess("https://"+location.host+"/yun-static/common/images/default.gif",function(){a.setCookie("secu",1,365,"/"),r.getContext()&&r.getContext().log.send({name:"httpsAccessSuccess",value:"success"})},function(){r.getContext()&&r.getContext().log.send({name:"httpsAccessFail",value:"failure"})}),r.getContext()&&r.getContext().log.send({name:"https_pub",value:"string"==typeof l.sampling&&l.sampling.indexOf("https_pub")>-1?"success":"failure"})},imageAccess:function(e,o,n){var t=new Image;t.onload=function(e){"function"==typeof o&&o.call(null,e)},t.onerror=function(e){"function"==typeof n&&n.call(null,e)},t.src=e},util:{init:function(e){u.conf.checkStartTime=e?+new Date:0,u.util.checkLocalServer(),t.getChromeVersion()<=42&&setTimeout(function(){u.util.localServerReady||u.util.installHook()},1e3)},checkLtIe8:function(){var e=i.browser||{};return e.msie&&+e.version<=8?!0:!1},checkLocalServer:function(){if(!u.conf.localServerReady)for(var e=0,o=function(o){var n=u.conf.localUrl+":"+o+"/guanjia",a={url:n,type:"GET",data:{method:"GetVersion"},dataType:"json",timeout:3e3,success:function(e){try{e=i.parseJSON(e)}catch(n){}if(e&&e.version){if(t.isPlatformWindows()&&!t.compareVersion(e.version,u.conf.minVersion))return;u.conf.currentPort=o,u.setVersion(e.version),u.conf.localServerReady=!0}},error:function(){e++,e===u.conf.portPollLimit&&+new Date-u.conf.checkStartTime<3e3&&setTimeout(function(){u.util.checkLocalServer()},400)}};location.protocol.indexOf("https")>-1||u.util.checkLtIe8()?t.isPlatformMac()?u.imageAccess(u.conf.localUrl+":"+o+"/version.png",function(){c.ajax(a)},a.error):c.ajax(a):i.ajax(a)},n=0;n<u.conf.portPollLimit;n++)o(u.conf.localPort+n)},installHook:function(){var e,o,n=[];return null!==u.conf.hook?u.conf.hook:(e=document.getElementById(u.conf.domIframeId),e&&document.body.removeChild(e),e=document.createElement("div"),e.style.width="1px",e.style.height="1px",e.style.position="absolute",e.style.overflow="hidden",e.style.left="-999em",e.style.top="-999em",e.id=u.conf.domIframeId,document.body.appendChild(e),n.push("undefined"!=typeof window.attachEvent||window.ActiveXObject||"ActiveXObject"in window?'<object id="'+u.conf.domHookId+'" classid="CLSID:8DCE7B6C-C3B9-4efd-9CC6-2D9F938B4A06" hidden="true" viewastext></OBJECT>':-1!==navigator.userAgent.indexOf("Trident/7.0")?'<embed id="'+u.conf.domHookId+'" type="application/bd-npYunWebDetect-plugin" width="0" height="0">':'<embed id="'+u.conf.domHookId+'" type="application/bd-npYunWebDetect-plugin" width="0" height="0">'),e.innerHTML=n.join(""),o=u.util.hasPlugin(),o&&(u.conf.hook=document.getElementById(u.conf.domHookId),u.setVersion(u.conf.hook.GetVersion())),u.conf.hook)},hasPlugin:function(){var e=null;try{e=new ActiveXObject("YunWebDetect.YunWebDetect.1")}catch(o){for(var n=null,t=navigator.plugins,i=0,c=t.length;c>i;i++)if(n=t[i].name||t[i].filename,-1!=n.indexOf("BaiduYunGuanjia")){e=t[i];break}}return null!=e},checkPluginHook:function(){return u.conf.installHook()},sendData:function(e,o,n,a,r){if(u.conf.localServerReady){var l=u.conf.localUrl+":"+u.conf.currentPort+"/guanjia?";l+="method="+e+"&uk="+n+"&checkuser="+(a?1:0);var s={url:l,type:"POST",data:{filelist:o},success:function(){},timeout:3e3,error:function(){r||t.openYunGuanjiaByScheme("baiduyunguanjia://guanjia",function(){u.conf.localServerReady=!1,u.util.init(!0),setTimeout(function(){u.util.sendData(e,o,n,a,!0)},3e3)})}};location.protocol.indexOf("https")>-1||u.util.checkLtIe8()?c.ajax(s):i.ajax(s)}else{if(!u.conf.hook)return-2;try{"undefined"==typeof a?u.conf.hook[e](o,n):u.conf.hook[e](o,n,a)}catch(f){return-2}}}}},s={getVersion:function(){return u.conf.guanjiaVersion},checkConnect:function(){return u.conf.localServerReady?!0:t.isChromeAndGreaterThan42()?!1:u.conf.hook&&u.conf.guanjiaVersion?!0:!1},callGuanjia:function(e,o,n,t){return u.util.sendData(e,o,n,t)},init:function(e){u.util.init(e)}},u.setVersion(0),n.exports=s});
;define("file-widget-1:download/start.js",function(e,i,t){function n(i,t){var n,d=null;if(a.setContext(i),"object"==typeof t&&t.filesList){if(d=t.filesList.length>0?t.filesList:[t.filesList],n=t.hasDlink,t.getDlink&&t.callback){var c=o.pluck(d,"fs_id");return void s.getDlink(c,t.callback,t.filePosition)}a.getContext().log.send({name:"list_download_click",value:"列表下载按钮文件下载"})}else if("string"==typeof t)d=[{dlink:t}],n=!0;else{if("object"==typeof t&&t.fsids&&t.getDlink)return void s.getDlink(t.fsids,t.callback,t.filePosition);window.location.hash.match("#cardholder/")?(d=[t],a.getContext().log.send({name:"cardHolder_download_click",value:"卡包文件下载"})):(d=i.list.getSelected(),a.getContext().log.send({name:"tab_download_click",value:"选中文件后点上方按钮文件下载"}))}e.async("file-widget-1:download/controller/downloadController.js",function(e){var o={list:d,hasDlink:n};"share"===i.pageInfo.currentProduct&&(o={list:d,product:t&&"unzip"===t.from?"pan":i.pageInfo.currentProduct,hasDlink:n,share_uk:l.SHARE_UK,share_id:l.SHARE_ID,sign:l.SIGN,timestamp:l.timestamp}),e.download(o)})}var o=e("base:widget/libs/underscore.js"),l=window.yunData||{},a=e("file-widget-1:download/util/context.js");e("file-widget-1:download/service/guanjiaConnector.js");var s={start:function(e,i){if(l.SHAREPAGETYPE){var t=window.yunHeader.nameVerify.start({complete:function(){n(e,i)}},!0);t===!1&&n(e,i)}else n(e,i)},getDlink:function(i,t,n){e.async("file-widget-1:download/service/dlinkService.js",function(e){switch(n){case"mbox":break;case"share":break;default:e.getDlinkPan(i,"nolimit",function(e){"function"==typeof t&&t(e)},void 0,void 0,"POST")}})}};t.exports=s});