(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!window.qxsettings) qxsettings = {};
var settings = {"qx.application":"logbuch.Application","qx.theme":"logbuch.theme.Theme","qx.version":"1.2"};
for (var k in settings) qxsettings[k] = settings[k];

if (!window.qxvariants) qxvariants = {};
var variants = {"qx.debug":"off"};
for (var k in variants) qxvariants[k] = variants[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"script"},"collapsablepanel":{"resourceUri":"resource","sourceUri":"script","version":"trunk"},"dialog":{"resourceUri":"resource","sourceUri":"script","version":"trunk"},"logbuch":{"resourceUri":"resource","sourceUri":"script","version":"trunk"},"persist":{"resourceUri":"resource","sourceUri":"script","version":"trunk"},"qcl":{"resourceUri":"resource","sourceUri":"script","version":"trunk"},"qx":{"resourceUri":"resource","sourceUri":"script","version":"1.2"},"uploadwidget":{"resourceUri":"resource","sourceUri":"script","version":"trunk"},"virtualdata":{"resourceUri":"resource","sourceUri":"script","version":"trunk"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {};
qx.$$locales = {};
qx.$$packageData = {};

qx.$$loader = {
  parts : {"boot":[0]},
  uris : [["__out__:logbuch.js"]],
  urisBefore : ["../build/resource/persist/persist-all-min.js","resource/logbuch/script/promise.js"],
  packageHashes : {"0":"6b63b24c9881"},
  boot : "boot",
  closureParts : {},
  bootIsInline : true,
  addNoCacheParam : false,
  
  decodeUris : function(compressedUris)
  {
    var libs = qx.$$libraries;
    var uris = [];
    for (var i=0; i<compressedUris.length; i++)
    {
      var uri = compressedUris[i].split(":");
      var euri;
      if (uri.length==2 && uri[0] in libs) {
        var prefix = libs[uri[0]].sourceUri;
        euri = prefix + "/" + uri[1];
      } else {
        euri = compressedUris[i];
      }
      if (qx.$$loader.addNoCacheParam) {
        euri += "?nocache=" + Math.random();
      }
      
      uris.push(euri);
    }
    return uris;      
  }
};  

function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function()
  {
    if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")
    {
      elem.onreadystatechange = elem.onload = null;
      callback();
    }
  };
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

var isWebkit = /AppleWebKit\/([^ ]+)/.test(navigator.userAgent);

function loadScriptList(list, callback) {
  if (list.length == 0) {
    callback();
    return;
  }
  loadScript(list.shift(), function() {
    if (isWebkit) {
      // force asynchronous load
      // Safari fails with an "maximum recursion depth exceeded" error if it is
      // called sync.      
      window.setTimeout(function() {
        loadScriptList(list, callback);
      }, 0);
    } else {
      loadScriptList(list, callback);
    }
  });
}

var fireContentLoadedEvent = function() {
  qx.$$domReady = true;
  document.removeEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
};
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
}

qx.$$loader.importPackageData = function (dataMap) {
  if (dataMap["resources"]){
    var resMap = dataMap["resources"];
    for (var k in resMap) qx.$$resources[k] = resMap[k];
  }
  if (dataMap["locales"]){
    var locMap = dataMap["locales"];
    var qxlocs = qx.$$locales;
    for (var lang in locMap){
      if (!qxlocs[lang]) qxlocs[lang] = locMap[lang];
      else 
        for (var k in locMap[lang]) qxlocs[lang][k] = locMap[lang][k];
    }
  }
  if (dataMap["translations"]){
    var trMap   = dataMap["translations"];
    var qxtrans = qx.$$translations;
    for (var lang in trMap){
      if (!qxtrans[lang]) qxtrans[lang] = trMap[lang];
      else 
        for (var k in trMap[lang]) qxtrans[lang][k] = trMap[lang][k];
    }
  }
}

qx.$$loader.signalStartup = function () 
{
  qx.$$loader.scriptLoaded = true;
  if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) {
    qx.event.handler.Application.onScriptLoaded();
    qx.$$loader.applicationHandlerReady = true; 
  } else {
    qx.$$loader.applicationHandlerReady = false;
  }
}

qx.$$loader.init = function(){
  var l=qx.$$loader;
  if (l.urisBefore.length>0){
    loadScriptList(l.urisBefore, function(){return;});
  }
  var bootPackageHash=l.packageHashes[l.parts[l.boot][0]];
  if (l.bootIsInline){
    l.importPackageData(qx.$$packageData[bootPackageHash]);
    l.signalStartup();
  } else {
    loadScriptList(l.decodeUris(l.uris[l.parts[l.boot]]), function(){
      // Opera needs this extra time to parse the scripts
      window.setTimeout(function(){
        l.importPackageData(qx.$$packageData[bootPackageHash] || {});
        l.signalStartup();
      }, 0);
    });
  }
}
})();

qx.$$packageData['6b63b24c9881']={"locales":{"C":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EEEd":"d EEE","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_Hms":"H:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMMEd":"E, MMMM d","cldr_date_time_format_MMMMd":"MMMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, M/d/yyyy","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"EEE, MMM d, y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_abbreviated_fri":"Fri","cldr_day_stand-alone_abbreviated_mon":"Mon","cldr_day_stand-alone_abbreviated_sat":"Sat","cldr_day_stand-alone_abbreviated_sun":"Sun","cldr_day_stand-alone_abbreviated_thu":"Thu","cldr_day_stand-alone_abbreviated_tue":"Tue","cldr_day_stand-alone_abbreviated_wed":"Wed","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"Friday","cldr_day_stand-alone_wide_mon":"Monday","cldr_day_stand-alone_wide_sat":"Saturday","cldr_day_stand-alone_wide_sun":"Sunday","cldr_day_stand-alone_wide_thu":"Thursday","cldr_day_stand-alone_wide_tue":"Tuesday","cldr_day_stand-alone_wide_wed":"Wednesday","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"},"de":{"alternateQuotationEnd":"‘","alternateQuotationStart":"‚","cldr_am":"vorm.","cldr_date_format_full":"EEEE, d. MMMM y","cldr_date_format_long":"d. MMMM y","cldr_date_format_medium":"dd.MM.yyyy","cldr_date_format_short":"dd.MM.yy","cldr_date_time_format_EEEd":"d. EEE","cldr_date_time_format_Ed":"E d.","cldr_date_time_format_H":"H","cldr_date_time_format_HHmm":"HH:mm","cldr_date_time_format_HHmmss":"HH:mm:ss","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, d.M.","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E d. MMM","cldr_date_time_format_MMMMEd":"E d. MMMM","cldr_date_time_format_MMMMd":"d. MMMM","cldr_date_time_format_MMMMdd":"dd. MMMM","cldr_date_time_format_MMMd":"d. MMM","cldr_date_time_format_MMd":"d.MM.","cldr_date_time_format_MMdd":"dd.MM.","cldr_date_time_format_Md":"d.M.","cldr_date_time_format_d":"d","cldr_date_time_format_mmss":"mm:ss","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"yyyy-M","cldr_date_time_format_yMEd":"EEE, yyyy-M-d","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"EEE, d. MMM y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ y","cldr_date_time_format_yyMM":"MM.yy","cldr_date_time_format_yyMMM":"MMM yy","cldr_date_time_format_yyMMdd":"dd.MM.yy","cldr_date_time_format_yyQ":"Q yy","cldr_date_time_format_yyQQQQ":"QQQQ yy","cldr_date_time_format_yyyy":"y","cldr_date_time_format_yyyyMMMM":"MMMM y","cldr_day_format_abbreviated_fri":"Fr.","cldr_day_format_abbreviated_mon":"Mo.","cldr_day_format_abbreviated_sat":"Sa.","cldr_day_format_abbreviated_sun":"So.","cldr_day_format_abbreviated_thu":"Do.","cldr_day_format_abbreviated_tue":"Di.","cldr_day_format_abbreviated_wed":"Mi.","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"D","cldr_day_format_narrow_tue":"D","cldr_day_format_narrow_wed":"M","cldr_day_format_wide_fri":"Freitag","cldr_day_format_wide_mon":"Montag","cldr_day_format_wide_sat":"Samstag","cldr_day_format_wide_sun":"Sonntag","cldr_day_format_wide_thu":"Donnerstag","cldr_day_format_wide_tue":"Dienstag","cldr_day_format_wide_wed":"Mittwoch","cldr_day_stand-alone_abbreviated_fri":"Fr.","cldr_day_stand-alone_abbreviated_mon":"Mo.","cldr_day_stand-alone_abbreviated_sat":"Sa.","cldr_day_stand-alone_abbreviated_sun":"So.","cldr_day_stand-alone_abbreviated_thu":"Do.","cldr_day_stand-alone_abbreviated_tue":"Di.","cldr_day_stand-alone_abbreviated_wed":"Mi.","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"D","cldr_day_stand-alone_narrow_tue":"D","cldr_day_stand-alone_narrow_wed":"M","cldr_day_stand-alone_wide_fri":"Freitag","cldr_day_stand-alone_wide_mon":"Montag","cldr_day_stand-alone_wide_sat":"Samstag","cldr_day_stand-alone_wide_sun":"Sonntag","cldr_day_stand-alone_wide_thu":"Donnerstag","cldr_day_stand-alone_wide_tue":"Dienstag","cldr_day_stand-alone_wide_wed":"Mittwoch","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Okt","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dez","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mär","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"Mai","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"Januar","cldr_month_format_wide_10":"Oktober","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"Dezember","cldr_month_format_wide_2":"Februar","cldr_month_format_wide_3":"März","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"Mai","cldr_month_format_wide_6":"Juni","cldr_month_format_wide_7":"Juli","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_abbreviated_10":"Okt","cldr_month_stand-alone_abbreviated_11":"Nov","cldr_month_stand-alone_abbreviated_12":"Dez","cldr_month_stand-alone_abbreviated_3":"Mär","cldr_month_stand-alone_abbreviated_7":"Jul","cldr_month_stand-alone_abbreviated_8":"Aug","cldr_month_stand-alone_abbreviated_9":"Sep","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":",","cldr_number_group_separator":".","cldr_number_percent_format":"#,##0 %","cldr_pm":"nachm.","cldr_time_format_full":"HH:mm:ss zzzz","cldr_time_format_long":"HH:mm:ss z","cldr_time_format_medium":"HH:mm:ss","cldr_time_format_short":"HH:mm","quotationEnd":"“","quotationStart":"„"},"en":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EEEd":"d EEE","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_Hms":"H:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMMEd":"E, MMMM d","cldr_date_time_format_MMMMd":"MMMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, M/d/yyyy","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"EEE, MMM d, y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_abbreviated_fri":"Fri","cldr_day_stand-alone_abbreviated_mon":"Mon","cldr_day_stand-alone_abbreviated_sat":"Sat","cldr_day_stand-alone_abbreviated_sun":"Sun","cldr_day_stand-alone_abbreviated_thu":"Thu","cldr_day_stand-alone_abbreviated_tue":"Tue","cldr_day_stand-alone_abbreviated_wed":"Wed","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"Friday","cldr_day_stand-alone_wide_mon":"Monday","cldr_day_stand-alone_wide_sat":"Saturday","cldr_day_stand-alone_wide_sun":"Sunday","cldr_day_stand-alone_wide_thu":"Thursday","cldr_day_stand-alone_wide_tue":"Tuesday","cldr_day_stand-alone_wide_wed":"Wednesday","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"}},"resources":{"logbuch/icon/16/ajax-loader.gif":[16,16,"gif","logbuch"],"logbuch/icon/16/bibliograph-logo-square.png":[218,218,"png","logbuch"],"logbuch/icon/16/bibliograph-logo.png":[526,129,"png","logbuch"],"logbuch/icon/16/button-arrow-left.png":[20,16,"png","logbuch"],"logbuch/icon/16/button-arrow-right.png":[20,16,"png","logbuch"],"logbuch/icon/16/button-double-plus.png":[21,16,"png","logbuch"],"logbuch/icon/16/button-edit.png":[20,16,"png","logbuch"],"logbuch/icon/16/button-minus.png":[20,16,"png","logbuch"],"logbuch/icon/16/button-plus.png":[20,16,"png","logbuch"],"logbuch/icon/16/button-reload.png":[20,16,"png","logbuch"],"logbuch/icon/16/button-settings-up.png":[21,16,"png","logbuch"],"logbuch/icon/16/button-settings.png":[21,16,"png","logbuch"],"logbuch/icon/16/button-show-panel.png":[20,16,"png","logbuch"],"logbuch/image/logbuch-header.png":[1024,133,"png","logbuch"],"logbuch/image/tuev_logo.png":[185,50,"png","logbuch"],"logbuch/script/promise.js":"logbuch","qx/decoration/Modern/app-header.png":[110,20,"png","qx"],"qx/decoration/Modern/arrows-combined.png":[87,8,"png","qx"],"qx/decoration/Modern/arrows/down-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-74,0],"qx/decoration/Modern/arrows/down-small-invert.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-69,0],"qx/decoration/Modern/arrows/down-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-49,0],"qx/decoration/Modern/arrows/down.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-20,0],"qx/decoration/Modern/arrows/forward.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-59,0],"qx/decoration/Modern/arrows/left-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",0,0],"qx/decoration/Modern/arrows/left.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-44,0],"qx/decoration/Modern/arrows/rewind.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-10,0],"qx/decoration/Modern/arrows/right-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-5,0],"qx/decoration/Modern/arrows/right.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-54,0],"qx/decoration/Modern/arrows/up-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-28,0],"qx/decoration/Modern/arrows/up-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-82,0],"qx/decoration/Modern/arrows/up.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-36,0],"qx/decoration/Modern/button-lr-combined.png":[72,52,"png","qx"],"qx/decoration/Modern/button-tb-combined.png":[4,216,"png","qx"],"qx/decoration/Modern/checkradio-combined.png":[504,14,"png","qx"],"qx/decoration/Modern/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Modern/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Modern/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",0,0],"qx/decoration/Modern/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Modern/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",-35,0],"qx/decoration/Modern/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Modern/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-52,0],"qx/decoration/Modern/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-33,0],"qx/decoration/Modern/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-20,0],"qx/decoration/Modern/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Modern/cursors-combined.gif",0,0],"qx/decoration/Modern/form/button-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-72],"qx/decoration/Modern/form/button-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-204],"qx/decoration/Modern/form/button-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-188],"qx/decoration/Modern/form/button-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-36],"qx/decoration/Modern/form/button-checked-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-84],"qx/decoration/Modern/form/button-checked-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-184],"qx/decoration/Modern/form/button-checked-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-156],"qx/decoration/Modern/form/button-checked-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-208],"qx/decoration/Modern/form/button-checked-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-160],"qx/decoration/Modern/form/button-checked-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-40,0],"qx/decoration/Modern/form/button-checked-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-32,0],"qx/decoration/Modern/form/button-checked-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-28],"qx/decoration/Modern/form/button-checked-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-24],"qx/decoration/Modern/form/button-checked-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-48],"qx/decoration/Modern/form/button-checked-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-checked-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-16,0],"qx/decoration/Modern/form/button-checked-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-60,0],"qx/decoration/Modern/form/button-checked-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-140],"qx/decoration/Modern/form/button-checked-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-56],"qx/decoration/Modern/form/button-checked-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-112],"qx/decoration/Modern/form/button-checked.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-disabled-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-40],"qx/decoration/Modern/form/button-disabled-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-136],"qx/decoration/Modern/form/button-disabled-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-16],"qx/decoration/Modern/form/button-disabled-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-disabled-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-68,0],"qx/decoration/Modern/form/button-disabled-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-4,0],"qx/decoration/Modern/form/button-disabled-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-116],"qx/decoration/Modern/form/button-disabled-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-168],"qx/decoration/Modern/form/button-disabled-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-60],"qx/decoration/Modern/form/button-disabled.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-68],"qx/decoration/Modern/form/button-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-144],"qx/decoration/Modern/form/button-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-8],"qx/decoration/Modern/form/button-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-24,0],"qx/decoration/Modern/form/button-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-44,0],"qx/decoration/Modern/form/button-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-192],"qx/decoration/Modern/form/button-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-148],"qx/decoration/Modern/form/button-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-104],"qx/decoration/Modern/form/button-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-hovered-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-108],"qx/decoration/Modern/form/button-hovered-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-32],"qx/decoration/Modern/form/button-hovered-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-128],"qx/decoration/Modern/form/button-hovered-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-hovered-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-20,0],"qx/decoration/Modern/form/button-hovered-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-48,0],"qx/decoration/Modern/form/button-hovered-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-44],"qx/decoration/Modern/form/button-hovered-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-76],"qx/decoration/Modern/form/button-hovered-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-88],"qx/decoration/Modern/form/button-hovered.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-56,0],"qx/decoration/Modern/form/button-preselected-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-124],"qx/decoration/Modern/form/button-preselected-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-176],"qx/decoration/Modern/form/button-preselected-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-200],"qx/decoration/Modern/form/button-preselected-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-4],"qx/decoration/Modern/form/button-preselected-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-152],"qx/decoration/Modern/form/button-preselected-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-28,0],"qx/decoration/Modern/form/button-preselected-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-36,0],"qx/decoration/Modern/form/button-preselected-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-196],"qx/decoration/Modern/form/button-preselected-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-164],"qx/decoration/Modern/form/button-preselected-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-212],"qx/decoration/Modern/form/button-preselected-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-preselected-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-8,0],"qx/decoration/Modern/form/button-preselected-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-64,0],"qx/decoration/Modern/form/button-preselected-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-96],"qx/decoration/Modern/form/button-preselected-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-80],"qx/decoration/Modern/form/button-preselected-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-132],"qx/decoration/Modern/form/button-preselected.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-pressed-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-12],"qx/decoration/Modern/form/button-pressed-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-52],"qx/decoration/Modern/form/button-pressed-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-20],"qx/decoration/Modern/form/button-pressed-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-pressed-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-52,0],"qx/decoration/Modern/form/button-pressed-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-12,0],"qx/decoration/Modern/form/button-pressed-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-100],"qx/decoration/Modern/form/button-pressed-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-172],"qx/decoration/Modern/form/button-pressed-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-64],"qx/decoration/Modern/form/button-pressed.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",0,0],"qx/decoration/Modern/form/button-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-92],"qx/decoration/Modern/form/button-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-120],"qx/decoration/Modern/form/button-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-180],"qx/decoration/Modern/form/button.png":[80,60,"png","qx"],"qx/decoration/Modern/form/checkbox-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-126,0],"qx/decoration/Modern/form/checkbox-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-322,0],"qx/decoration/Modern/form/checkbox-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-294,0],"qx/decoration/Modern/form/checkbox-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-364,0],"qx/decoration/Modern/form/checkbox-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-490,0],"qx/decoration/Modern/form/checkbox-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-224,0],"qx/decoration/Modern/form/checkbox-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-378,0],"qx/decoration/Modern/form/checkbox-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-84,0],"qx/decoration/Modern/form/checkbox-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-182,0],"qx/decoration/Modern/form/checkbox-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-42,0],"qx/decoration/Modern/form/checkbox-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-392,0],"qx/decoration/Modern/form/checkbox-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-210,0],"qx/decoration/Modern/form/checkbox-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-14,0],"qx/decoration/Modern/form/checkbox-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-238,0],"qx/decoration/Modern/form/checkbox-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-462,0],"qx/decoration/Modern/form/checkbox-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-112,0],"qx/decoration/Modern/form/checkbox-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-448,0],"qx/decoration/Modern/form/checkbox.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-140,0],"qx/decoration/Modern/form/input-focused.png":[40,12,"png","qx"],"qx/decoration/Modern/form/input.png":[84,12,"png","qx"],"qx/decoration/Modern/form/radiobutton-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-196,0],"qx/decoration/Modern/form/radiobutton-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-168,0],"qx/decoration/Modern/form/radiobutton-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-98,0],"qx/decoration/Modern/form/radiobutton-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-308,0],"qx/decoration/Modern/form/radiobutton-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-406,0],"qx/decoration/Modern/form/radiobutton-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-28,0],"qx/decoration/Modern/form/radiobutton-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-350,0],"qx/decoration/Modern/form/radiobutton-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-266,0],"qx/decoration/Modern/form/radiobutton-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-252,0],"qx/decoration/Modern/form/radiobutton-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-336,0],"qx/decoration/Modern/form/radiobutton-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-476,0],"qx/decoration/Modern/form/radiobutton-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-420,0],"qx/decoration/Modern/form/radiobutton-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-56,0],"qx/decoration/Modern/form/radiobutton-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",0,0],"qx/decoration/Modern/form/radiobutton-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-154,0],"qx/decoration/Modern/form/radiobutton-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-434,0],"qx/decoration/Modern/form/radiobutton-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-280,0],"qx/decoration/Modern/form/radiobutton.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-70,0],"qx/decoration/Modern/form/tooltip-error-arrow.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-b.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-30],"qx/decoration/Modern/form/tooltip-error-bl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-24],"qx/decoration/Modern/form/tooltip-error-br.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-c.png":[40,18,"png","qx"],"qx/decoration/Modern/form/tooltip-error-l.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",-6,0],"qx/decoration/Modern/form/tooltip-error-r.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-t.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-6],"qx/decoration/Modern/form/tooltip-error-tl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-18],"qx/decoration/Modern/form/tooltip-error-tr.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-12],"qx/decoration/Modern/form/tooltip-error.png":[127,30,"png","qx"],"qx/decoration/Modern/groupbox-lr-combined.png":[8,51,"png","qx"],"qx/decoration/Modern/groupbox-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-b.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-12],"qx/decoration/Modern/groupbox/groupbox-bl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-16],"qx/decoration/Modern/groupbox/groupbox-br.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-8],"qx/decoration/Modern/groupbox/groupbox-c.png":[40,51,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-l.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",-4,0],"qx/decoration/Modern/groupbox/groupbox-r.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-t.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-4],"qx/decoration/Modern/groupbox/groupbox-tl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-tr.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-20],"qx/decoration/Modern/groupbox/groupbox.png":[255,59,"png","qx"],"qx/decoration/Modern/menu-background-combined.png":[80,49,"png","qx"],"qx/decoration/Modern/menu-checkradio-combined.gif":[64,7,"gif","qx"],"qx/decoration/Modern/menu/background.png":[40,49,"png","qx","qx/decoration/Modern/menu-background-combined.png",-40,0],"qx/decoration/Modern/menu/bar-background.png":[40,20,"png","qx","qx/decoration/Modern/menu-background-combined.png",0,0],"qx/decoration/Modern/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-16,0],"qx/decoration/Modern/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-48,0],"qx/decoration/Modern/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-32,0],"qx/decoration/Modern/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",0,0],"qx/decoration/Modern/pane-lr-combined.png":[12,238,"png","qx"],"qx/decoration/Modern/pane-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/pane/pane-b.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-30],"qx/decoration/Modern/pane/pane-bl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-18],"qx/decoration/Modern/pane/pane-br.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-12],"qx/decoration/Modern/pane/pane-c.png":[40,238,"png","qx"],"qx/decoration/Modern/pane/pane-l.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",0,0],"qx/decoration/Modern/pane/pane-r.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",-6,0],"qx/decoration/Modern/pane/pane-t.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,0],"qx/decoration/Modern/pane/pane-tl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-24],"qx/decoration/Modern/pane/pane-tr.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-6],"qx/decoration/Modern/pane/pane.png":[185,250,"png","qx"],"qx/decoration/Modern/scrollbar-combined.png":[54,12,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-horizontal.png":[76,15,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-horizontal.png":[19,10,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-vertical.png":[10,19,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-vertical.png":[15,76,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-horizontal.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-34,0],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-vertical.png":[10,12,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-6,0],"qx/decoration/Modern/scrollbar/scrollbar-down.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-28,0],"qx/decoration/Modern/scrollbar/scrollbar-left.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-50,0],"qx/decoration/Modern/scrollbar/scrollbar-right.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-46,0],"qx/decoration/Modern/scrollbar/scrollbar-up.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",0,0],"qx/decoration/Modern/scrollbar/slider-knob-background.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-16,0],"qx/decoration/Modern/selection.png":[110,20,"png","qx"],"qx/decoration/Modern/shadow-lr-combined.png":[30,382,"png","qx"],"qx/decoration/Modern/shadow-small-lr-combined.png":[10,136,"png","qx"],"qx/decoration/Modern/shadow-small-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/shadow-tb-combined.png":[15,90,"png","qx"],"qx/decoration/Modern/shadow/shadow-b.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-30],"qx/decoration/Modern/shadow/shadow-bl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-br.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-45],"qx/decoration/Modern/shadow/shadow-c.png":[40,382,"png","qx"],"qx/decoration/Modern/shadow/shadow-l.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-r.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",-15,0],"qx/decoration/Modern/shadow/shadow-small-b.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-20],"qx/decoration/Modern/shadow/shadow-small-bl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-small-br.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-10],"qx/decoration/Modern/shadow/shadow-small-c.png":[40,136,"png","qx"],"qx/decoration/Modern/shadow/shadow-small-l.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-r.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",-5,0],"qx/decoration/Modern/shadow/shadow-small-t.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-5],"qx/decoration/Modern/shadow/shadow-small-tl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-tr.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-25],"qx/decoration/Modern/shadow/shadow-small.png":[114,146,"png","qx"],"qx/decoration/Modern/shadow/shadow-t.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-60],"qx/decoration/Modern/shadow/shadow-tl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-75],"qx/decoration/Modern/shadow/shadow-tr.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow.png":[381,412,"png","qx"],"qx/decoration/Modern/splitpane-knobs-combined.png":[8,9,"png","qx"],"qx/decoration/Modern/splitpane/knob-horizontal.png":[1,8,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,-1],"qx/decoration/Modern/splitpane/knob-vertical.png":[8,1,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,0],"qx/decoration/Modern/table-combined.png":[94,18,"png","qx"],"qx/decoration/Modern/table/ascending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",0,0],"qx/decoration/Modern/table/boolean-false.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-80,0],"qx/decoration/Modern/table/boolean-true.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-26,0],"qx/decoration/Modern/table/descending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",-18,0],"qx/decoration/Modern/table/header-cell.png":[40,18,"png","qx","qx/decoration/Modern/table-combined.png",-40,0],"qx/decoration/Modern/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Modern/table-combined.png",-8,0],"qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png":[10,14,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-lr-combined.png":[10,12,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-pane-lr-combined.png":[60,2,"png","qx"],"qx/decoration/Modern/tabview-pane-tb-combined.png":[30,180,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-bottom-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-bottom-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-bottom-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-l.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-r.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-bottom-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-bottom-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active.png":[49,24,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-left-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-left-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-left-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-left-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-left-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-left-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-right-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-right-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-right-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-right-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-right-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-right-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-top-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-top-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-top-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-l.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-r.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-top-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-top-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-top-active.png":[48,22,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-b.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-60],"qx/decoration/Modern/tabview/tabview-pane-bl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-br.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-120],"qx/decoration/Modern/tabview/tabview-pane-c.png":[40,120,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-l.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-r.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",-30,0],"qx/decoration/Modern/tabview/tabview-pane-t.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-150],"qx/decoration/Modern/tabview/tabview-pane-tl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-30],"qx/decoration/Modern/tabview/tabview-pane-tr.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-90],"qx/decoration/Modern/tabview/tabview-pane.png":[185,250,"png","qx"],"qx/decoration/Modern/toolbar-combined.png":[80,130,"png","qx"],"qx/decoration/Modern/toolbar/toolbar-gradient-blue.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",-40,0],"qx/decoration/Modern/toolbar/toolbar-gradient.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",0,0],"qx/decoration/Modern/toolbar/toolbar-handle-knob.gif":[1,8,"gif","qx"],"qx/decoration/Modern/toolbar/toolbar-part.gif":[7,1,"gif","qx"],"qx/decoration/Modern/tooltip-error-lr-combined.png":[12,18,"png","qx"],"qx/decoration/Modern/tooltip-error-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/tree-combined.png":[32,8,"png","qx"],"qx/decoration/Modern/tree/closed-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-24,0],"qx/decoration/Modern/tree/closed.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-16,0],"qx/decoration/Modern/tree/open-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-8,0],"qx/decoration/Modern/tree/open.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",0,0],"qx/decoration/Modern/window-captionbar-buttons-combined.png":[108,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-active-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-inactive-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-active-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-inactive-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-statusbar-lr-combined.png":[8,7,"png","qx"],"qx/decoration/Modern/window-statusbar-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/window/captionbar-active-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-active-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-active-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-active-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-active-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-active-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-active-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-active.png":[69,21,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-inactive-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-inactive-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-inactive-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-inactive-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-inactive.png":[69,21,"png","qx"],"qx/decoration/Modern/window/close-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-27,0],"qx/decoration/Modern/window/close-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-9,0],"qx/decoration/Modern/window/close-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-90,0],"qx/decoration/Modern/window/maximize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-18,0],"qx/decoration/Modern/window/maximize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-81,0],"qx/decoration/Modern/window/maximize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-54,0],"qx/decoration/Modern/window/minimize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-63,0],"qx/decoration/Modern/window/minimize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-72,0],"qx/decoration/Modern/window/minimize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-36,0],"qx/decoration/Modern/window/restore-active-hovered.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",0,0],"qx/decoration/Modern/window/restore-active.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-99,0],"qx/decoration/Modern/window/restore-inactive.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-45,0],"qx/decoration/Modern/window/statusbar-b.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-16],"qx/decoration/Modern/window/statusbar-bl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-20],"qx/decoration/Modern/window/statusbar-br.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-4],"qx/decoration/Modern/window/statusbar-c.png":[40,7,"png","qx"],"qx/decoration/Modern/window/statusbar-l.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",-4,0],"qx/decoration/Modern/window/statusbar-r.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",0,0],"qx/decoration/Modern/window/statusbar-t.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,0],"qx/decoration/Modern/window/statusbar-tl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-8],"qx/decoration/Modern/window/statusbar-tr.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-12],"qx/decoration/Modern/window/statusbar.png":[369,15,"png","qx"],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-color-chooser.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-document.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/22/mimetypes/office-document.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-open.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder.png":[22,22,"png","qx"],"qx/icon/Tango/32/actions/dialog-close.png":[32,32,"png","qx"],"qx/icon/Tango/32/mimetypes/office-document.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder-open.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder.png":[32,32,"png","qx"],"qx/static/blank.gif":[1,1,"gif","qx"],"qx/static/blank.html":"qx"},"translations":{"C":{},"de":{"Last month":"Vorheriger Monat","Last year":"Vorheriges Jahr","Next month":"Nächster Monat","Next year":"Nächstes Jahr"},"en":{}}};
(function(){var A="toString",z=".",y="default",x="Object",w='"',v="Array",u="()",t="String",s="Function",r=".prototype",ba="function",Y="Boolean",X="Error",W="constructor",V="warn",U="hasOwnProperty",T="string",S="toLocaleString",R="RegExp",Q='\", "',H="info",I="BROKEN_IE",F="isPrototypeOf",G="Date",D="",E="qx.Bootstrap",B="]",C="Class",J="error",K="[Class ",M="valueOf",L="Number",O="count",N="debug",P="ES5";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return K+this.classname+B;
},createNamespace:function(name,bO){var bQ=name.split(z);
var parent=window;
var bP=bQ[0];

for(var i=0,bR=bQ.length-1;i<bR;i++,bP=bQ[i]){if(!parent[bP]){parent=parent[bP]={};
}else{parent=parent[bP];
}}parent[bP]=bO;
return bP;
},setDisplayName:function(d,e,name){d.displayName=e+z+name+u;
},setDisplayNames:function(ca,cb){for(var name in ca){var cc=ca[name];

if(cc instanceof Function){cc.displayName=cb+z+name+u;
}}},define:function(name,bz){if(!bz){var bz={statics:{}};
}var bE;
var bC=null;
qx.Bootstrap.setDisplayNames(bz.statics,name);

if(bz.members||bz.extend){qx.Bootstrap.setDisplayNames(bz.members,name+r);
bE=bz.construct||new Function;

if(bz.extend){this.extendClass(bE,bE,bz.extend,name,bD);
}var bA=bz.statics||{};
for(var i=0,bF=qx.Bootstrap.getKeys(bA),l=bF.length;i<l;i++){var bG=bF[i];
bE[bG]=bA[bG];
}bC=bE.prototype;
var bB=bz.members||{};
for(var i=0,bF=qx.Bootstrap.getKeys(bB),l=bF.length;i<l;i++){var bG=bF[i];
bC[bG]=bB[bG];
}}else{bE=bz.statics||{};
}var bD=this.createNamespace(name,bE);
bE.name=bE.classname=name;
bE.basename=bD;
bE.$$type=C;
if(!bE.hasOwnProperty(A)){bE.toString=this.genericToString;
}if(bz.defer){bz.defer(bE,bC);
}qx.Bootstrap.$$registry[name]=bz.statics;
return bE;
}};
qx.Bootstrap.define(E,{statics:{LOADSTART:qx.$$start||new Date(),createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(ce,cf,cg,name,ch){var ck=cg.prototype;
var cj=new Function;
cj.prototype=ck;
var ci=new cj;
ce.prototype=ci;
ci.name=ci.classname=name;
ci.basename=ch;
cf.base=ce.superclass=cg;
cf.self=ce.constructor=ci.constructor=ce;
},getByName:function(name){return qx.Bootstrap.$$registry[name];
},$$registry:{},objectGetLength:({"count":function(cd){return cd.__count__;
},"default":function(g){var length=0;

for(var h in g){length++;
}return length;
}})[(({}).__count__==0)?O:y],objectMergeWith:function(j,k,m){if(m===undefined){m=true;
}
for(var n in k){if(m||j[n]===undefined){j[n]=k[n];
}}return j;
},__shadowedKeys:[F,U,S,A,M,W],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(bd){var be=[];
var bg=Object.prototype.hasOwnProperty;

for(var bh in bd){if(bg.call(bd,bh)){be.push(bh);
}}var bf=qx.Bootstrap.__shadowedKeys;

for(var i=0,a=bf,l=a.length;i<l;i++){if(bg.call(bd,a[i])){be.push(a[i]);
}}return be;
},"default":function(br){var bs=[];
var bt=Object.prototype.hasOwnProperty;

for(var bu in br){if(bt.call(br,bu)){bs.push(bu);
}}return bs;
}})[typeof (Object.keys)==
ba?P:
(function(){for(var bc in {toString:1}){return bc;
}})()!==A?I:y],getKeysAsString:function(bl){var bm=qx.Bootstrap.getKeys(bl);

if(bm.length==0){return D;
}return w+bm.join(Q)+w;
},__classToTypeMap:{"[object String]":t,"[object Array]":v,"[object Object]":x,"[object RegExp]":R,"[object Number]":L,"[object Boolean]":Y,"[object Date]":G,"[object Function]":s,"[object Error]":X},bind:function(bS,self,bT){var bU=Array.prototype.slice.call(arguments,2,arguments.length);
return function(){var b=Array.prototype.slice.call(arguments,0,arguments.length);
return bS.apply(self,bU.concat(b));
};
},firstUp:function(f){return f.charAt(0).toUpperCase()+f.substr(1);
},firstLow:function(q){return q.charAt(0).toLowerCase()+q.substr(1);
},getClass:function(bv){var bw=Object.prototype.toString.call(bv);
return (qx.Bootstrap.__classToTypeMap[bw]||bw.slice(8,-1));
},isString:function(bb){return (bb!==null&&(typeof bb===T||qx.Bootstrap.getClass(bb)==t||bb instanceof String||(!!bb&&!!bb.$$isString)));
},isArray:function(o){return (o!==null&&(o instanceof Array||(o&&qx.data&&qx.data.IListData&&qx.Bootstrap.hasInterface(o.constructor,qx.data.IListData))||qx.Bootstrap.getClass(o)==v||(!!o&&!!o.$$isArray)));
},isObject:function(bx){return (bx!==undefined&&bx!==null&&qx.Bootstrap.getClass(bx)==x);
},isFunction:function(bH){return qx.Bootstrap.getClass(bH)==s;
},classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;
},getPropertyDefinition:function(p,name){while(p){if(p.$$properties&&p.$$properties[name]){return p.$$properties[name];
}p=p.superclass;
}return null;
},hasProperty:function(bY,name){return !!qx.Bootstrap.getPropertyDefinition(bY,name);
},getEventType:function(by,name){var by=by.constructor;

while(by.superclass){if(by.$$events&&by.$$events[name]!==undefined){return by.$$events[name];
}by=by.superclass;
}return null;
},supportsEvent:function(bk,name){return !!qx.Bootstrap.getEventType(bk,name);
},getByInterface:function(bV,bW){var bX,i,l;

while(bV){if(bV.$$implements){bX=bV.$$flatImplements;

for(i=0,l=bX.length;i<l;i++){if(bX[i]===bW){return bV;
}}}bV=bV.superclass;
}return null;
},hasInterface:function(bp,bq){return !!qx.Bootstrap.getByInterface(bp,bq);
},getMixins:function(bK){var bL=[];

while(bK){if(bK.$$includes){bL.push.apply(bL,bK.$$flatIncludes);
}bK=bK.superclass;
}return bL;
},$$logs:[],debug:function(bn,bo){qx.Bootstrap.$$logs.push([N,arguments]);
},info:function(bI,bJ){qx.Bootstrap.$$logs.push([H,arguments]);
},warn:function(bM,bN){qx.Bootstrap.$$logs.push([V,arguments]);
},error:function(bi,bj){qx.Bootstrap.$$logs.push([J,arguments]);
},trace:function(c){}}});
})();
(function(){var h="qx.allowUrlSettings",g="&",f="qx.core.Setting",e="qx.allowUrlVariants",d="qx.propertyDebugLevel",c="qxsetting",b=":",a=".";
qx.Bootstrap.define(f,{statics:{__settings:{},define:function(q,r){if(r===undefined){throw new Error('Default value of setting "'+q+'" must be defined!');
}
if(!this.__settings[q]){this.__settings[q]={};
}else if(this.__settings[q].defaultValue!==undefined){throw new Error('Setting "'+q+'" is already defined!');
}this.__settings[q].defaultValue=r;
},get:function(m){var n=this.__settings[m];

if(n===undefined){throw new Error('Setting "'+m+'" is not defined.');
}
if(n.value!==undefined){return n.value;
}return n.defaultValue;
},set:function(o,p){if((o.split(a)).length<2){throw new Error('Malformed settings key "'+o+'". Must be following the schema "namespace.key".');
}
if(!this.__settings[o]){this.__settings[o]={};
}this.__settings[o].value=p;
},__init:function(){if(window.qxsettings){for(var s in window.qxsettings){this.set(s,window.qxsettings[s]);
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(t){}this.__loadUrlSettings();
}},__loadUrlSettings:function(){if(this.get(h)!=true){return;
}var k=document.location.search.slice(1).split(g);

for(var i=0;i<k.length;i++){var j=k[i].split(b);

if(j.length!=3||j[0]!=c){continue;
}this.set(j[1],decodeURIComponent(j[2]));
}}},defer:function(l){l.define(h,false);
l.define(e,false);
l.define(d,0);
l.__init();
}});
})();
(function(){var h="function",g="Boolean",f="qx.Interface",e="]",d="toggle",c="Interface",b="is",a="[Interface ";
qx.Bootstrap.define(f,{statics:{define:function(name,I){if(I){if(I.extend&&!(I.extend instanceof Array)){I.extend=[I.extend];
}{};
var J=I.statics?I.statics:{};
if(I.extend){J.$$extends=I.extend;
}
if(I.properties){J.$$properties=I.properties;
}
if(I.members){J.$$members=I.members;
}
if(I.events){J.$$events=I.events;
}}else{var J={};
}J.$$type=c;
J.name=name;
J.toString=this.genericToString;
J.basename=qx.Bootstrap.createNamespace(name,J);
qx.Interface.$$registry[name]=J;
return J;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(A){if(!A){return [];
}var B=A.concat();

for(var i=0,l=A.length;i<l;i++){if(A[i].$$extends){B.push.apply(B,this.flatten(A[i].$$extends));
}}return B;
},__assertMembers:function(o,p,q,r){var v=q.$$members;

if(v){for(var u in v){if(qx.Bootstrap.isFunction(v[u])){var t=this.__isPropertyMethod(p,u);
var s=t||qx.Bootstrap.isFunction(o[u]);

if(!s){throw new Error('Implementation of method "'+u+'" is missing in class "'+p.classname+'" required by interface "'+q.name+'"');
}var w=r===true&&!t&&!qx.Bootstrap.hasInterface(p,q);

if(w){o[u]=this.__wrapInterfaceMember(q,o[u],u,v[u]);
}}else{if(typeof o[u]===undefined){if(typeof o[u]!==h){throw new Error('Implementation of member "'+u+'" is missing in class "'+p.classname+'" required by interface "'+q.name+'"');
}}}}}},__isPropertyMethod:function(C,D){var H=D.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!H){return false;
}var E=qx.Bootstrap.firstLow(H[2]);
var F=qx.Bootstrap.getPropertyDefinition(C,E);

if(!F){return false;
}var G=H[0]==b||H[0]==d;

if(G){return qx.Bootstrap.getPropertyDefinition(C,E).check==g;
}return true;
},__assertProperties:function(O,P){if(P.$$properties){for(var Q in P.$$properties){if(!qx.Bootstrap.getPropertyDefinition(O,Q)){throw new Error('The property "'+Q+'" is not supported by Class "'+O.classname+'"!');
}}}},__assertEvents:function(x,y){if(y.$$events){for(var z in y.$$events){if(!qx.Bootstrap.supportsEvent(x,z)){throw new Error('The event "'+z+'" is not supported by Class "'+x.classname+'"!');
}}}},assertObject:function(j,k){var n=j.constructor;
this.__assertMembers(j,n,k,false);
this.__assertProperties(n,k);
this.__assertEvents(n,k);
var m=k.$$extends;

if(m){for(var i=0,l=m.length;i<l;i++){this.assertObject(j,m[i]);
}}},assert:function(K,L,M){this.__assertMembers(K.prototype,K,L,M);
this.__assertProperties(K,L);
this.__assertEvents(K,L);
var N=L.$$extends;

if(N){for(var i=0,l=N.length;i<l;i++){this.assert(K,N[i],M);
}}},genericToString:function(){return a+this.name+e;
},$$registry:{},__wrapInterfaceMember:function(){},__allowedKeys:null,__validateConfig:function(){}}});
})();
(function(){var g="qx.Mixin",f=".prototype",e="constructor",d="[Mixin ",c="]",b="destruct",a="Mixin";
qx.Bootstrap.define(g,{statics:{define:function(name,h){if(h){if(h.include&&!(h.include instanceof Array)){h.include=[h.include];
}{};
var k=h.statics?h.statics:{};
qx.Bootstrap.setDisplayNames(k,name);

for(var j in k){if(k[j] instanceof Function){k[j].$$mixin=k;
}}if(h.construct){k.$$constructor=h.construct;
qx.Bootstrap.setDisplayName(h.construct,name,e);
}
if(h.include){k.$$includes=h.include;
}
if(h.properties){k.$$properties=h.properties;
}
if(h.members){k.$$members=h.members;
qx.Bootstrap.setDisplayNames(h.members,name+f);
}
for(var j in k.$$members){if(k.$$members[j] instanceof Function){k.$$members[j].$$mixin=k;
}}
if(h.events){k.$$events=h.events;
}
if(h.destruct){k.$$destructor=h.destruct;
qx.Bootstrap.setDisplayName(h.destruct,name,b);
}}else{var k={};
}k.$$type=a;
k.name=name;
k.toString=this.genericToString;
k.basename=qx.Bootstrap.createNamespace(name,k);
this.$$registry[name]=k;
return k;
},checkCompatibility:function(r){var u=this.flatten(r);
var v=u.length;

if(v<2){return true;
}var y={};
var x={};
var w={};
var t;

for(var i=0;i<v;i++){t=u[i];

for(var s in t.events){if(w[s]){throw new Error('Conflict between mixin "'+t.name+'" and "'+w[s]+'" in member "'+s+'"!');
}w[s]=t.name;
}
for(var s in t.properties){if(y[s]){throw new Error('Conflict between mixin "'+t.name+'" and "'+y[s]+'" in property "'+s+'"!');
}y[s]=t.name;
}
for(var s in t.members){if(x[s]){throw new Error('Conflict between mixin "'+t.name+'" and "'+x[s]+'" in member "'+s+'"!');
}x[s]=t.name;
}}return true;
},isCompatible:function(o,p){var q=qx.Bootstrap.getMixins(p);
q.push(o);
return qx.Mixin.checkCompatibility(q);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(m){if(!m){return [];
}var n=m.concat();

for(var i=0,l=m.length;i<l;i++){if(m[i].$$includes){n.push.apply(n,this.flatten(m[i].$$includes));
}}return n;
},genericToString:function(){return d+this.name+c;
},$$registry:{},__allowedKeys:null,__validateConfig:function(){}}});
})();
(function(){var dS=';',dR='computed=this.',dQ='=value;',dP='this.',dO="set",dN="setThemed",dM="setRuntime",dL="init",dK='if(this.',dJ='delete this.',cS='!==undefined)',cR='}',cQ="resetThemed",cP='else if(this.',cO="string",cN='return this.',cM="reset",cL="boolean",cK="resetRuntime",cJ='!==undefined){',ea="",eb="refresh",dX='=true;',dY="this.",dV=";",dW='old=this.',dT="();",dU='else ',ec='if(old===undefined)old=this.',ed='old=computed=this.',ds="return this.",dr="get",du='(value);',dt="(a[",dw='if(old===computed)return value;',dv='if(old===undefined)old=null;',dy=' of an instance of ',dx=' is not (yet) ready!");',dq="]);",dp='!==inherit){',bA='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',bB='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',bC='value !== null && value.nodeType === 9 && value.documentElement',bD='===value)return value;',bE='value !== null && value.$$type === "Mixin"',bF='return init;',bG='var init=this.',bH='value !== null && value.nodeType === 1 && value.attributes',bI="var parent = this.getLayoutParent();",bJ="Error in property ",er='var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){',eq="property",ep='.validate.call(this, value);',eo='qx.core.Assert.assertInstance(value, Date, msg) || true',ev='else{',eu="if (!parent) return;",et=" in method ",es='qx.core.Assert.assertInstance(value, Error, msg) || true',ex='=computed;',ew='Undefined value is not allowed!',cj='(backup);',ck="MSIE 6.0",ch='if(computed===inherit){',ci="inherit",cn='Is invalid!',co='if(value===undefined)prop.error(this,2,"',cl='var computed, old=this.',cm='else if(computed===undefined)',cf="': ",cg=" of class ",bR='value !== null && value.nodeType !== undefined',bQ='===undefined)return;',bT='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',bS="')){",bN='qx.core.Assert.assertPositiveInteger(value, msg) || true',bM='else this.',bP='value=this.',bO='","',bL='if(init==qx.core.Property.$$inherit)init=null;',bK='value !== null && value.$$type === "Interface"',ct='var inherit=prop.$$inherit;',cu="', qx.event.type.Data, [computed, old]",cv="var value = parent.",cw="$$useinit_",cp='computed=undefined;delete this.',cq="(value);",cr='",value);',cs='computed=value;',cx=".",cy="$$runtime_",cc='Requires exactly one argument!',cb=';}',ca="$$user_",bY='){',bX='qx.core.Assert.assertArray(value, msg) || true',bW='if(computed===undefined||computed===inherit){',bV='qx.core.Assert.assertPositiveNumber(value, msg) || true',bU=".prototype",ce="Boolean",cd=")}",cz='(computed, old, "',cA='return value;',cB='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',cC='}else{',cD="if(reg.hasListener(this, '",cE='Does not allow any arguments!',cF=')a[i].',cG="()",cH="var a=arguments[0] instanceof Array?arguments[0]:arguments;",cI='.$$properties.',cW='value !== null && value.$$type === "Theme"',cV="var reg=qx.event.Registration;",cU="())",cT='return null;',db='qx.core.Assert.assertObject(value, msg) || true',da='");',cY='qx.core.Assert.assertString(value, msg) || true',cX='var pa=this.getLayoutParent();if(pa)computed=pa.',dd="if (value===undefined) value = parent.",dc='value !== null && value.$$type === "Class"',dk='qx.core.Assert.assertFunction(value, msg) || true',dl='!==undefined&&',di='var computed, old;',dj='var backup=computed;',dg="on",dh="object",de="$$init_",df="$$theme_",dm='if(computed===undefined)computed=null;',dn='qx.core.Assert.assertMap(value, msg) || true',dC="qx.aspects",dB='qx.core.Assert.assertNumber(value, msg) || true',dE='if((computed===undefined||computed===inherit)&&',dD="reg.fireEvent(this, '",dG='Null value is not allowed!',dF='qx.core.Assert.assertInteger(value, msg) || true',dI="value",dH="rv:1.8.1",dA="shorthand",dz='qx.core.Assert.assertInstance(value, RegExp, msg) || true',ek='value !== null && value.type !== undefined',el='value !== null && value.document',em='throw new Error("Property ',en="(!this.",eg='qx.core.Assert.assertBoolean(value, msg) || true',eh='if(a[i].',ei="toggle",ej="$$inherit_",ee='var prop=qx.core.Property;',ef=" with incoming value '",bz="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));",by='if(computed===undefined||computed==inherit)computed=null;',bx="qx.core.Property",bw="is",bv='Could not change or apply init value after constructing phase!';
qx.Bootstrap.define(bx,{statics:{__checks:{"Boolean":eg,"String":cY,"Number":dB,"Integer":dF,"PositiveNumber":bV,"PositiveInteger":bN,"Error":es,"RegExp":dz,"Object":db,"Array":bX,"Map":dn,"Function":dk,"Date":eo,"Node":bR,"Element":bH,"Document":bC,"Window":el,"Event":ek,"Class":dc,"Mixin":bE,"Interface":bK,"Theme":cW,"Color":bA,"Decorator":bT,"Font":bB},__dereference:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:ci,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:cO,dereference:cL,inheritable:cL,nullable:cL,themeable:cL,refine:cL,init:null,apply:cO,event:cO,check:null,transform:cO,deferredInit:cL,validate:null},$$allowedGroupKeys:{name:cO,group:dh,mode:cO,themeable:cL},$$inheritable:{},__executeOptimizedRefresh:function(B){var C=this.__getInheritablesOfClass(B);

if(!C.length){var D=qx.lang.Function.empty;
}else{D=this.__createRefresher(C);
}B.prototype.$$refreshInheritables=D;
},__getInheritablesOfClass:function(b){var d=[];

while(b){var c=b.$$properties;

if(c){for(var name in this.$$inheritable){if(c[name]&&c[name].inheritable){d.push(name);
}}}b=b.superclass;
}return d;
},__createRefresher:function(I){var M=this.$$store.inherit;
var L=this.$$store.init;
var K=this.$$method.refresh;
var J=[bI,eu];

for(var i=0,l=I.length;i<l;i++){var name=I[i];
J.push(cv,M[name],dV,dd,L[name],dV,dY,K[name],cq);
}return new Function(J.join(ea));
},attachRefreshInheritables:function(e){e.prototype.$$refreshInheritables=function(){qx.core.Property.__executeOptimizedRefresh(e);
return this.$$refreshInheritables();
};
},attachMethods:function(o,name,p){p.group?this.__attachGroupMethods(o,p,name):this.__attachPropertyMethods(o,p,name);
},__attachGroupMethods:function(q,r,name){var y=qx.Bootstrap.firstUp(name);
var x=q.prototype;
var z=r.themeable===true;
{};
var A=[];
var u=[];

if(z){var s=[];
var w=[];
}var v=cH;
A.push(v);

if(z){s.push(v);
}
if(r.mode==dA){var t=bz;
A.push(t);

if(z){s.push(t);
}}
for(var i=0,a=r.group,l=a.length;i<l;i++){{};
A.push(dY,this.$$method.set[a[i]],dt,i,dq);
u.push(dY,this.$$method.reset[a[i]],dT);

if(z){{};
s.push(dY,this.$$method.setThemed[a[i]],dt,i,dq);
w.push(dY,this.$$method.resetThemed[a[i]],dT);
}}this.$$method.set[name]=dO+y;
x[this.$$method.set[name]]=new Function(A.join(ea));
this.$$method.reset[name]=cM+y;
x[this.$$method.reset[name]]=new Function(u.join(ea));

if(z){this.$$method.setThemed[name]=dN+y;
x[this.$$method.setThemed[name]]=new Function(s.join(ea));
this.$$method.resetThemed[name]=cQ+y;
x[this.$$method.resetThemed[name]]=new Function(w.join(ea));
}},__attachPropertyMethods:function(ey,ez,name){var eB=qx.Bootstrap.firstUp(name);
var eD=ey.prototype;
{};
if(ez.dereference===undefined&&typeof ez.check===cO){ez.dereference=this.__shouldBeDereferenced(ez.check);
}var eC=this.$$method;
var eA=this.$$store;
eA.runtime[name]=cy+name;
eA.user[name]=ca+name;
eA.theme[name]=df+name;
eA.init[name]=de+name;
eA.inherit[name]=ej+name;
eA.useinit[name]=cw+name;
eC.get[name]=dr+eB;
eD[eC.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,ey,name,dr);
};
eC.set[name]=dO+eB;
eD[eC.set[name]]=function(eW){return qx.core.Property.executeOptimizedSetter(this,ey,name,dO,arguments);
};
eC.reset[name]=cM+eB;
eD[eC.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,ey,name,cM);
};

if(ez.inheritable||ez.apply||ez.event||ez.deferredInit){eC.init[name]=dL+eB;
eD[eC.init[name]]=function(ba){return qx.core.Property.executeOptimizedSetter(this,ey,name,dL,arguments);
};
}
if(ez.inheritable){eC.refresh[name]=eb+eB;
eD[eC.refresh[name]]=function(f){return qx.core.Property.executeOptimizedSetter(this,ey,name,eb,arguments);
};
}eC.setRuntime[name]=dM+eB;
eD[eC.setRuntime[name]]=function(eS){return qx.core.Property.executeOptimizedSetter(this,ey,name,dM,arguments);
};
eC.resetRuntime[name]=cK+eB;
eD[eC.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,ey,name,cK);
};

if(ez.themeable){eC.setThemed[name]=dN+eB;
eD[eC.setThemed[name]]=function(bd){return qx.core.Property.executeOptimizedSetter(this,ey,name,dN,arguments);
};
eC.resetThemed[name]=cQ+eB;
eD[eC.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,ey,name,cQ);
};
}
if(ez.check===ce){eD[ei+eB]=new Function(ds+eC.set[name]+en+eC.get[name]+cU);
eD[bw+eB]=new Function(ds+eC.get[name]+cG);
}},__shouldBeDereferenced:function(E){return !!this.__dereference[E];
},__shouldBeDereferencedOld:function(bi){return this.__dereference[bi]||qx.Bootstrap.classIsDefined(bi)||(qx.Interface&&qx.Interface.isDefined(bi));
},__errors:{0:bv,1:cc,2:ew,3:cE,4:dG,5:cn},error:function(bj,bk,bl,bm,bn){var bo=bj.constructor.classname;
var bp=bJ+bl+cg+bo+et+this.$$method[bm][bl]+ef+bn+cf;
throw new Error(bp+(this.__errors[bk]||"Unknown reason: "+bk));
},__unwrapFunctionFromCode:function(g,h,name,j,k,m){var n=this.$$method[j][name];
{h[n]=new Function(dI,k.join(ea));
};
if(qx.core.Variant.isSet(dC,dg)){h[n]=qx.core.Aspect.wrap(g.classname+cx+n,h[n],eq);
}qx.Bootstrap.setDisplayName(h[n],g.classname+bU,n);
if(m===undefined){return g[n]();
}else{return g[n](m[0]);
}},executeOptimizedGetter:function(eI,eJ,name,eK){var eM=eJ.$$properties[name];
var eO=eJ.prototype;
var eL=[];
var eN=this.$$store;
eL.push(dK,eN.runtime[name],cS);
eL.push(cN,eN.runtime[name],dS);

if(eM.inheritable){eL.push(cP,eN.inherit[name],cS);
eL.push(cN,eN.inherit[name],dS);
eL.push(dU);
}eL.push(dK,eN.user[name],cS);
eL.push(cN,eN.user[name],dS);

if(eM.themeable){eL.push(cP,eN.theme[name],cS);
eL.push(cN,eN.theme[name],dS);
}
if(eM.deferredInit&&eM.init===undefined){eL.push(cP,eN.init[name],cS);
eL.push(cN,eN.init[name],dS);
}eL.push(dU);

if(eM.init!==undefined){if(eM.inheritable){eL.push(bG,eN.init[name],dS);

if(eM.nullable){eL.push(bL);
}else if(eM.init!==undefined){eL.push(cN,eN.init[name],dS);
}else{eL.push(cB,name,dy,eJ.classname,dx);
}eL.push(bF);
}else{eL.push(cN,eN.init[name],dS);
}}else if(eM.inheritable||eM.nullable){eL.push(cT);
}else{eL.push(em,name,dy,eJ.classname,dx);
}return this.__unwrapFunctionFromCode(eI,eO,name,eK,eL);
},executeOptimizedSetter:function(N,O,name,P,Q){var V=O.$$properties[name];
var U=O.prototype;
var S=[];
var R=P===dO||P===dN||P===dM||(P===dL&&V.init===undefined);
var T=V.apply||V.event||V.inheritable;
var W=this.__getStore(P,name);
this.__emitSetterPreConditions(S,V,name,P,R);

if(R){this.__emitIncomingValueTransformation(S,O,V,name);
}
if(T){this.__emitOldNewComparison(S,R,W,P);
}
if(V.inheritable){S.push(ct);
}{};

if(!T){this.__emitStoreValue(S,name,P,R);
}else{this.__emitStoreComputedAndOldValue(S,V,name,P,R);
}
if(V.inheritable){this.__emitStoreInheritedPropertyValue(S,V,name,P);
}else if(T){this.__emitNormalizeUndefinedValues(S,V,name,P);
}
if(T){this.__emitCallCallback(S,V,name);
if(V.inheritable&&U._getChildren){this.__emitRefreshChildrenValue(S,name);
}}if(R){S.push(cA);
}return this.__unwrapFunctionFromCode(N,U,name,P,S,Q);
},__getStore:function(X,name){if(X===dM||X===cK){var Y=this.$$store.runtime[name];
}else if(X===dN||X===cQ){Y=this.$$store.theme[name];
}else if(X===dL){Y=this.$$store.init[name];
}else{Y=this.$$store.user[name];
}return Y;
},__emitSetterPreConditions:function(eE,eF,name,eG,eH){{if(!eF.nullable||eF.check||eF.inheritable){eE.push(ee);
}if(eG===dO){eE.push(co,name,bO,eG,cr);
}};
},__emitIncomingValueTransformation:function(eP,eQ,eR,name){if(eR.transform){eP.push(bP,eR.transform,du);
}if(eR.validate){if(typeof eR.validate===cO){eP.push(dP,eR.validate,du);
}else if(eR.validate instanceof Function){eP.push(eQ.classname,cI,name);
eP.push(ep);
}}},__emitOldNewComparison:function(bq,br,bs,bt){var bu=(bt===cM||bt===cQ||bt===cK);

if(br){bq.push(dK,bs,bD);
}else if(bu){bq.push(dK,bs,bQ);
}},__emitIncomingValueValidation:undefined,__emitStoreValue:function(F,name,G,H){if(G===dM){F.push(dP,this.$$store.runtime[name],dQ);
}else if(G===cK){F.push(dK,this.$$store.runtime[name],cS);
F.push(dJ,this.$$store.runtime[name],dS);
}else if(G===dO){F.push(dP,this.$$store.user[name],dQ);
}else if(G===cM){F.push(dK,this.$$store.user[name],cS);
F.push(dJ,this.$$store.user[name],dS);
}else if(G===dN){F.push(dP,this.$$store.theme[name],dQ);
}else if(G===cQ){F.push(dK,this.$$store.theme[name],cS);
F.push(dJ,this.$$store.theme[name],dS);
}else if(G===dL&&H){F.push(dP,this.$$store.init[name],dQ);
}},__emitStoreComputedAndOldValue:function(be,bf,name,bg,bh){if(bf.inheritable){be.push(cl,this.$$store.inherit[name],dS);
}else{be.push(di);
}be.push(dK,this.$$store.runtime[name],cJ);

if(bg===dM){be.push(dR,this.$$store.runtime[name],dQ);
}else if(bg===cK){be.push(dJ,this.$$store.runtime[name],dS);
be.push(dK,this.$$store.user[name],cS);
be.push(dR,this.$$store.user[name],dS);
be.push(cP,this.$$store.theme[name],cS);
be.push(dR,this.$$store.theme[name],dS);
be.push(cP,this.$$store.init[name],cJ);
be.push(dR,this.$$store.init[name],dS);
be.push(dP,this.$$store.useinit[name],dX);
be.push(cR);
}else{be.push(ed,this.$$store.runtime[name],dS);
if(bg===dO){be.push(dP,this.$$store.user[name],dQ);
}else if(bg===cM){be.push(dJ,this.$$store.user[name],dS);
}else if(bg===dN){be.push(dP,this.$$store.theme[name],dQ);
}else if(bg===cQ){be.push(dJ,this.$$store.theme[name],dS);
}else if(bg===dL&&bh){be.push(dP,this.$$store.init[name],dQ);
}}be.push(cR);
be.push(cP,this.$$store.user[name],cJ);

if(bg===dO){if(!bf.inheritable){be.push(dW,this.$$store.user[name],dS);
}be.push(dR,this.$$store.user[name],dQ);
}else if(bg===cM){if(!bf.inheritable){be.push(dW,this.$$store.user[name],dS);
}be.push(dJ,this.$$store.user[name],dS);
be.push(dK,this.$$store.runtime[name],cS);
be.push(dR,this.$$store.runtime[name],dS);
be.push(dK,this.$$store.theme[name],cS);
be.push(dR,this.$$store.theme[name],dS);
be.push(cP,this.$$store.init[name],cJ);
be.push(dR,this.$$store.init[name],dS);
be.push(dP,this.$$store.useinit[name],dX);
be.push(cR);
}else{if(bg===dM){be.push(dR,this.$$store.runtime[name],dQ);
}else if(bf.inheritable){be.push(dR,this.$$store.user[name],dS);
}else{be.push(ed,this.$$store.user[name],dS);
}if(bg===dN){be.push(dP,this.$$store.theme[name],dQ);
}else if(bg===cQ){be.push(dJ,this.$$store.theme[name],dS);
}else if(bg===dL&&bh){be.push(dP,this.$$store.init[name],dQ);
}}be.push(cR);
if(bf.themeable){be.push(cP,this.$$store.theme[name],cJ);

if(!bf.inheritable){be.push(dW,this.$$store.theme[name],dS);
}
if(bg===dM){be.push(dR,this.$$store.runtime[name],dQ);
}else if(bg===dO){be.push(dR,this.$$store.user[name],dQ);
}else if(bg===dN){be.push(dR,this.$$store.theme[name],dQ);
}else if(bg===cQ){be.push(dJ,this.$$store.theme[name],dS);
be.push(dK,this.$$store.init[name],cJ);
be.push(dR,this.$$store.init[name],dS);
be.push(dP,this.$$store.useinit[name],dX);
be.push(cR);
}else if(bg===dL){if(bh){be.push(dP,this.$$store.init[name],dQ);
}be.push(dR,this.$$store.theme[name],dS);
}else if(bg===eb){be.push(dR,this.$$store.theme[name],dS);
}be.push(cR);
}be.push(cP,this.$$store.useinit[name],bY);

if(!bf.inheritable){be.push(dW,this.$$store.init[name],dS);
}
if(bg===dL){if(bh){be.push(dR,this.$$store.init[name],dQ);
}else{be.push(dR,this.$$store.init[name],dS);
}}else if(bg===dO||bg===dM||bg===dN||bg===eb){be.push(dJ,this.$$store.useinit[name],dS);

if(bg===dM){be.push(dR,this.$$store.runtime[name],dQ);
}else if(bg===dO){be.push(dR,this.$$store.user[name],dQ);
}else if(bg===dN){be.push(dR,this.$$store.theme[name],dQ);
}else if(bg===eb){be.push(dR,this.$$store.init[name],dS);
}}be.push(cR);
if(bg===dO||bg===dM||bg===dN||bg===dL){be.push(ev);

if(bg===dM){be.push(dR,this.$$store.runtime[name],dQ);
}else if(bg===dO){be.push(dR,this.$$store.user[name],dQ);
}else if(bg===dN){be.push(dR,this.$$store.theme[name],dQ);
}else if(bg===dL){if(bh){be.push(dR,this.$$store.init[name],dQ);
}else{be.push(dR,this.$$store.init[name],dS);
}be.push(dP,this.$$store.useinit[name],dX);
}be.push(cR);
}},__emitStoreInheritedPropertyValue:function(fb,fc,name,fd){fb.push(bW);

if(fd===eb){fb.push(cs);
}else{fb.push(cX,this.$$store.inherit[name],dS);
}fb.push(dE);
fb.push(dP,this.$$store.init[name],dl);
fb.push(dP,this.$$store.init[name],dp);
fb.push(dR,this.$$store.init[name],dS);
fb.push(dP,this.$$store.useinit[name],dX);
fb.push(cC);
fb.push(dJ,this.$$store.useinit[name],cb);
fb.push(cR);
fb.push(dw);
fb.push(ch);
fb.push(cp,this.$$store.inherit[name],dS);
fb.push(cR);
fb.push(cm);
fb.push(dJ,this.$$store.inherit[name],dS);
fb.push(bM,this.$$store.inherit[name],ex);
fb.push(dj);
if(fc.init!==undefined&&fd!==dL){fb.push(ec,this.$$store.init[name],dV);
}else{fb.push(dv);
}fb.push(by);
},__emitNormalizeUndefinedValues:function(eT,eU,name,eV){if(eV!==dO&&eV!==dM&&eV!==dN){eT.push(dm);
}eT.push(dw);
if(eU.init!==undefined&&eV!==dL){eT.push(ec,this.$$store.init[name],dV);
}else{eT.push(dv);
}},__emitCallCallback:function(bb,bc,name){if(bc.apply){bb.push(dP,bc.apply,cz,name,da);
}if(bc.event){bb.push(cV,cD,bc.event,bS,dD,bc.event,cu,cd);
}},__emitRefreshChildrenValue:function(fe,name){fe.push(er);
fe.push(eh,this.$$method.refresh[name],cF,this.$$method.refresh[name],cj);
fe.push(cR);
}},defer:function(eX){var fa=navigator.userAgent.indexOf(ck)!=-1;
var eY=navigator.userAgent.indexOf(dH)!=-1;
if(fa||eY){eX.__shouldBeDereferenced=eX.__shouldBeDereferencedOld;
}}});
})();
(function(){var m="emulated",k="native",j='"',h="qx.lang.Core",g="\\\\",f="\\\"",e="[object Error]";
qx.Bootstrap.define(h,{statics:{errorToString:{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}[(!Error.prototype.toString||Error.prototype.toString()==e)?m:k],arrayIndexOf:{"native":Array.prototype.indexOf,"emulated":function(r,s){if(s==null){s=0;
}else if(s<0){s=Math.max(0,this.length+s);
}
for(var i=s;i<this.length;i++){if(this[i]===r){return i;
}}return -1;
}}[Array.prototype.indexOf?k:m],arrayLastIndexOf:{"native":Array.prototype.lastIndexOf,"emulated":function(t,u){if(u==null){u=this.length-1;
}else if(u<0){u=Math.max(0,this.length+u);
}
for(var i=u;i>=0;i--){if(this[i]===t){return i;
}}return -1;
}}[Array.prototype.lastIndexOf?k:m],arrayForEach:{"native":Array.prototype.forEach,"emulated":function(y,z){var l=this.length;

for(var i=0;i<l;i++){var A=this[i];

if(A!==undefined){y.call(z||window,A,i,this);
}}}}[Array.prototype.forEach?k:m],arrayFilter:{"native":Array.prototype.filter,"emulated":function(n,o){var p=[];
var l=this.length;

for(var i=0;i<l;i++){var q=this[i];

if(q!==undefined){if(n.call(o||window,q,i,this)){p.push(this[i]);
}}}return p;
}}[Array.prototype.filter?k:m],arrayMap:{"native":Array.prototype.map,"emulated":function(a,b){var c=[];
var l=this.length;

for(var i=0;i<l;i++){var d=this[i];

if(d!==undefined){c[i]=a.call(b||window,d,i,this);
}}return c;
}}[Array.prototype.map?k:m],arraySome:{"native":Array.prototype.some,"emulated":function(v,w){var l=this.length;

for(var i=0;i<l;i++){var x=this[i];

if(x!==undefined){if(v.call(w||window,x,i,this)){return true;
}}}return false;
}}[Array.prototype.some?k:m],arrayEvery:{"native":Array.prototype.every,"emulated":function(B,C){var l=this.length;

for(var i=0;i<l;i++){var D=this[i];

if(D!==undefined){if(!B.call(C||window,D,i,this)){return false;
}}}return true;
}}[Array.prototype.every?k:m],stringQuote:{"native":String.prototype.quote,"emulated":function(){return j+this.replace(/\\/g,g).replace(/\"/g,f)+j;
}}[String.prototype.quote?k:m]}});
Error.prototype.toString=qx.lang.Core.errorToString;
Array.prototype.indexOf=qx.lang.Core.arrayIndexOf;
Array.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;
Array.prototype.forEach=qx.lang.Core.arrayForEach;
Array.prototype.filter=qx.lang.Core.arrayFilter;
Array.prototype.map=qx.lang.Core.arrayMap;
Array.prototype.some=qx.lang.Core.arraySome;
Array.prototype.every=qx.lang.Core.arrayEvery;
String.prototype.quote=qx.lang.Core.stringQuote;
})();
(function(){var s="gecko",r="1.9.0.0",q=".",p="[object Opera]",o="function",n="[^\\.0-9]",m="525.26",l="",k="mshtml",j="AppleWebKit/",d="unknown",i="9.6.0",g="4.0",c="Gecko",b="opera",f="webkit",e="0.0.0",h="8.0",a="qx.bom.client.Engine";
qx.Bootstrap.define(a,{statics:{NAME:"",FULLVERSION:"0.0.0",VERSION:0.0,OPERA:false,WEBKIT:false,GECKO:false,MSHTML:false,UNKNOWN_ENGINE:false,UNKNOWN_VERSION:false,DOCUMENT_MODE:null,__init:function(){var t=d;
var x=e;
var w=window.navigator.userAgent;
var z=false;
var v=false;

if(window.opera&&Object.prototype.toString.call(window.opera)==p){t=b;
this.OPERA=true;
if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(w)){x=RegExp.$1+q+RegExp.$2;

if(RegExp.$3!=l){x+=q+RegExp.$3;
}}else{v=true;
x=i;
}}else if(window.navigator.userAgent.indexOf(j)!=-1){t=f;
this.WEBKIT=true;

if(/AppleWebKit\/([^ ]+)/.test(w)){x=RegExp.$1;
var y=RegExp(n).exec(x);

if(y){x=x.slice(0,y.index);
}}else{v=true;
x=m;
}}else if(window.controllers&&window.navigator.product===c){t=s;
this.GECKO=true;
if(/rv\:([^\);]+)(\)|;)/.test(w)){x=RegExp.$1;
}else{v=true;
x=r;
}}else if(window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(w)){t=k;
x=RegExp.$1;

if(document.documentMode){this.DOCUMENT_MODE=document.documentMode;
}if(x<8&&/Trident\/([^\);]+)(\)|;)/.test(w)){if(RegExp.$1===g){x=h;
}}this.MSHTML=true;
}else{var u=window.qxFail;

if(u&&typeof u===o){var t=u();

if(t.NAME&&t.FULLVERSION){t=t.NAME;
this[t.toUpperCase()]=true;
x=t.FULLVERSION;
}}else{z=true;
v=true;
x=r;
t=s;
this.GECKO=true;
qx.Bootstrap.warn("Unsupported client: "+w+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}this.UNKNOWN_ENGINE=z;
this.UNKNOWN_VERSION=v;
this.NAME=t;
this.FULLVERSION=x;
this.VERSION=parseFloat(x);
}},defer:function(A){A.__init();
}});
})();
(function(){var u="on",t="off",s="|",r="default",q="object",p="&",o="qx.aspects",n="$",m="qx.allowUrlVariants",k="qx.debug",d="qx.client",j="qx.dynlocale",g="webkit",c="qxvariant",b="opera",f=":",e="qx.core.Variant",h="mshtml",a="gecko";
qx.Bootstrap.define(e,{statics:{__variants:{},__cache:{},compilerIsSet:function(){return true;
},define:function(D,E,F){{};

if(!this.__variants[D]){this.__variants[D]={};
}else{}this.__variants[D].allowedValues=E;
this.__variants[D].defaultValue=F;
},get:function(z){var A=this.__variants[z];
{};

if(A.value!==undefined){return A.value;
}return A.defaultValue;
},__init:function(){if(window.qxvariants){for(var G in qxvariants){{};

if(!this.__variants[G]){this.__variants[G]={};
}this.__variants[G].value=qxvariants[G];
}window.qxvariants=undefined;

try{delete window.qxvariants;
}catch(B){}this.__loadUrlVariants(this.__variants);
}},__loadUrlVariants:function(){if(qx.core.Setting.get(m)!=true){return;
}var M=document.location.search.slice(1).split(p);

for(var i=0;i<M.length;i++){var N=M[i].split(f);

if(N.length!=3||N[0]!=c){continue;
}var O=N[1];

if(!this.__variants[O]){this.__variants[O]={};
}this.__variants[O].value=decodeURIComponent(N[2]);
}},select:function(w,x){{};

for(var y in x){if(this.isSet(w,y)){return x[y];
}}
if(x[r]!==undefined){return x[r];
}{};
},isSet:function(H,I){var J=H+n+I;

if(this.__cache[J]!==undefined){return this.__cache[J];
}var L=false;
if(I.indexOf(s)<0){L=this.get(H)===I;
}else{var K=I.split(s);

for(var i=0,l=K.length;i<l;i++){if(this.get(H)===K[i]){L=true;
break;
}}}this.__cache[J]=L;
return L;
},__isValidArray:function(v){return typeof v===q&&v!==null&&v instanceof Array;
},__isValidObject:function(v){return typeof v===q&&v!==null&&!(v instanceof Array);
},__arrayContains:function(P,Q){for(var i=0,l=P.length;i<l;i++){if(P[i]==Q){return true;
}}return false;
}},defer:function(C){C.define(d,[a,h,b,g],qx.bom.client.Engine.NAME);
C.define(k,[u,t],u);
C.define(o,[u,t],t);
C.define(j,[u,t],u);
C.__init();
}});
})();
(function(){var d="qx.core.Aspect",c="before",b="*",a="static";
qx.Bootstrap.define(d,{statics:{__registry:[],wrap:function(e,f,g){var m=[];
var h=[];
var l=this.__registry;
var k;

for(var i=0;i<l.length;i++){k=l[i];

if((k.type==null||g==k.type||k.type==b)&&(k.name==null||e.match(k.name))){k.pos==-1?m.push(k.fcn):h.push(k.fcn);
}}
if(m.length===0&&h.length===0){return f;
}var j=function(){for(var i=0;i<m.length;i++){m[i].call(this,e,f,g,arguments);
}var n=f.apply(this,arguments);

for(var i=0;i<h.length;i++){h[i].call(this,e,f,g,arguments,n);
}return n;
};

if(g!==a){j.self=f.self;
j.base=f.base;
}f.wrapper=j;
j.original=f;
return j;
},addAdvice:function(o,p,q,name){this.__registry.push({fcn:o,pos:p===c?-1:1,type:q,name:name});
}}});
})();
(function(){var bp="qx.aspects",bo="on",bn=".",bm="static",bl="constructor",bk="[Class ",bj="]",bi="toString",bh="singleton",bg="$$init_",ba=".prototype",bf="destructor",bd="extend",Y="destruct",X="Class",bc="off",bb="qx.Class",be="member",W="qx.event.type.Data";
qx.Bootstrap.define(bb,{statics:{define:function(name,bs){if(!bs){var bs={};
}if(bs.include&&!(bs.include instanceof Array)){bs.include=[bs.include];
}if(bs.implement&&!(bs.implement instanceof Array)){bs.implement=[bs.implement];
}var bt=false;

if(!bs.hasOwnProperty(bd)&&!bs.type){bs.type=bm;
bt=true;
}{};
var bu=this.__createClass(name,bs.type,bs.extend,bs.statics,bs.construct,bs.destruct,bs.include);
if(bs.extend){if(bs.properties){this.__addProperties(bu,bs.properties,true);
}if(bs.members){this.__addMembers(bu,bs.members,true,true,false);
}if(bs.events){this.__addEvents(bu,bs.events,true);
}if(bs.include){for(var i=0,l=bs.include.length;i<l;i++){this.__addMixin(bu,bs.include[i],false);
}}}if(bs.settings){for(var bv in bs.settings){qx.core.Setting.define(bv,bs.settings[bv]);
}}if(bs.variants){for(var bv in bs.variants){qx.core.Variant.define(bv,bs.variants[bv].allowedValues,bs.variants[bv].defaultValue);
}}if(bs.implement){for(var i=0,l=bs.implement.length;i<l;i++){this.__addInterface(bu,bs.implement[i]);
}}{};
if(bs.defer){bs.defer.self=bu;
bs.defer(bu,bu.prototype,{add:function(name,r){var s={};
s[name]=r;
qx.Class.__addProperties(bu,s,true);
}});
}return bu;
},undefine:function(name){delete this.$$registry[name];
var T=name.split(bn);
var V=[window];

for(var i=0;i<T.length;i++){V.push(V[i][T[i]]);
}for(var i=V.length-1;i>=1;i--){var U=V[i];
var parent=V[i-1];

if(qx.Bootstrap.isFunction(U)||qx.Bootstrap.objectGetLength(U)===0){delete parent[T[i-1]];
}else{break;
}}},isDefined:qx.Bootstrap.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},getByName:qx.Bootstrap.getByName,include:function(z,A){{};
qx.Class.__addMixin(z,A,false);
},patch:function(bT,bU){{};
qx.Class.__addMixin(bT,bU,true);
},isSubClassOf:function(bJ,bK){if(!bJ){return false;
}
if(bJ==bK){return true;
}
if(bJ.prototype instanceof bK){return true;
}return false;
},getPropertyDefinition:qx.Bootstrap.getPropertyDefinition,getProperties:function(O){var P=[];

while(O){if(O.$$properties){P.push.apply(P,qx.Bootstrap.getKeys(O.$$properties));
}O=O.superclass;
}return P;
},getByProperty:function(B,name){while(B){if(B.$$properties&&B.$$properties[name]){return B;
}B=B.superclass;
}return null;
},hasProperty:qx.Bootstrap.hasProperty,getEventType:qx.Bootstrap.getEventType,supportsEvent:qx.Bootstrap.supportsEvent,hasOwnMixin:function(x,y){return x.$$includes&&x.$$includes.indexOf(y)!==-1;
},getByMixin:function(d,e){var f,i,l;

while(d){if(d.$$includes){f=d.$$flatIncludes;

for(i=0,l=f.length;i<l;i++){if(f[i]===e){return d;
}}}d=d.superclass;
}return null;
},getMixins:qx.Bootstrap.getMixins,hasMixin:function(C,D){return !!this.getByMixin(C,D);
},hasOwnInterface:function(bq,br){return bq.$$implements&&bq.$$implements.indexOf(br)!==-1;
},getByInterface:qx.Bootstrap.getByInterface,getInterfaces:function(cn){var co=[];

while(cn){if(cn.$$implements){co.push.apply(co,cn.$$flatImplements);
}cn=cn.superclass;
}return co;
},hasInterface:qx.Bootstrap.hasInterface,implementsInterface:function(ck,cl){var cm=ck.constructor;

if(this.hasInterface(cm,cl)){return true;
}
try{qx.Interface.assertObject(ck,cl);
return true;
}catch(bS){}
try{qx.Interface.assert(cm,cl,false);
return true;
}catch(b){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return bk+this.classname+bj;
},$$registry:qx.Bootstrap.$$registry,__allowedKeys:null,__staticAllowedKeys:null,__validateConfig:function(){},__validateAbstractInterfaces:function(){},__createClass:function(name,E,F,G,H,I,J){var M;

if(!F&&qx.core.Variant.isSet(bp,bc)){M=G||{};
qx.Bootstrap.setDisplayNames(M,name);
}else{var M={};

if(F){if(!H){H=this.__createDefaultConstructor();
}
if(this.__needsConstructorWrapper(F,J)){M=this.__wrapConstructor(H,name,E);
}else{M=H;
}if(E===bh){M.getInstance=this.getInstance;
}qx.Bootstrap.setDisplayName(H,name,bl);
}if(G){qx.Bootstrap.setDisplayNames(G,name);
var N;

for(var i=0,a=qx.Bootstrap.getKeys(G),l=a.length;i<l;i++){N=a[i];
var K=G[N];

if(qx.core.Variant.isSet(bp,bo)){if(K instanceof Function){K=qx.core.Aspect.wrap(name+bn+N,K,bm);
}M[N]=K;
}else{M[N]=K;
}}}}var L=qx.Bootstrap.createNamespace(name,M);
M.name=M.classname=name;
M.basename=L;
M.$$type=X;

if(E){M.$$classtype=E;
}if(!M.hasOwnProperty(bi)){M.toString=this.genericToString;
}
if(F){qx.Bootstrap.extendClass(M,H,F,name,L);
if(I){if(qx.core.Variant.isSet(bp,bo)){I=qx.core.Aspect.wrap(name,I,bf);
}M.$$destructor=I;
qx.Bootstrap.setDisplayName(I,name,Y);
}}this.$$registry[name]=M;
return M;
},__addEvents:function(cc,cd,ce){var cf,cf;
{};

if(cc.$$events){for(var cf in cd){cc.$$events[cf]=cd[cf];
}}else{cc.$$events=cd;
}},__addProperties:function(bw,bx,by){var bz;

if(by===undefined){by=false;
}var bA=bw.prototype;

for(var name in bx){bz=bx[name];
{};
bz.name=name;
if(!bz.refine){if(bw.$$properties===undefined){bw.$$properties={};
}bw.$$properties[name]=bz;
}if(bz.init!==undefined){bw.prototype[bg+name]=bz.init;
}if(bz.event!==undefined){var event={};
event[bz.event]=W;
this.__addEvents(bw,event,by);
}if(bz.inheritable){qx.core.Property.$$inheritable[name]=true;

if(!bA.$$refreshInheritables){qx.core.Property.attachRefreshInheritables(bw);
}}
if(!bz.refine){qx.core.Property.attachMethods(bw,name,bz);
}}},__validateProperty:null,__addMembers:function(bB,bC,bD,bE,bF){var bG=bB.prototype;
var bI,bH;
qx.Bootstrap.setDisplayNames(bC,bB.classname+ba);

for(var i=0,a=qx.Bootstrap.getKeys(bC),l=a.length;i<l;i++){bI=a[i];
bH=bC[bI];
{};
if(bE!==false&&bH instanceof Function&&bH.$$type==null){if(bF==true){bH=this.__mixinMemberWrapper(bH,bG[bI]);
}else{if(bG[bI]){bH.base=bG[bI];
}bH.self=bB;
}
if(qx.core.Variant.isSet(bp,bo)){bH=qx.core.Aspect.wrap(bB.classname+bn+bI,bH,be);
}}bG[bI]=bH;
}},__mixinMemberWrapper:function(t,u){if(u){return function(){var w=t.base;
t.base=u;
var v=t.apply(this,arguments);
t.base=w;
return v;
};
}else{return t;
}},__addInterface:function(bP,bQ){{};
var bR=qx.Interface.flatten([bQ]);

if(bP.$$implements){bP.$$implements.push(bQ);
bP.$$flatImplements.push.apply(bP.$$flatImplements,bR);
}else{bP.$$implements=[bQ];
bP.$$flatImplements=bR;
}},__retrospectWrapConstruct:function(bV){var name=bV.classname;
var bW=this.__wrapConstructor(bV,name,bV.$$classtype);
for(var i=0,a=qx.Bootstrap.getKeys(bV),l=a.length;i<l;i++){bX=a[i];
bW[bX]=bV[bX];
}bW.prototype=bV.prototype;
var ca=bV.prototype;

for(var i=0,a=qx.Bootstrap.getKeys(ca),l=a.length;i<l;i++){bX=a[i];
var cb=ca[bX];
if(cb&&cb.self==bV){cb.self=bW;
}}for(var bX in this.$$registry){var bY=this.$$registry[bX];

if(!bY){continue;
}
if(bY.base==bV){bY.base=bW;
}
if(bY.superclass==bV){bY.superclass=bW;
}
if(bY.$$original){if(bY.$$original.base==bV){bY.$$original.base=bW;
}
if(bY.$$original.superclass==bV){bY.$$original.superclass=bW;
}}}qx.Bootstrap.createNamespace(name,bW);
this.$$registry[name]=bW;
return bW;
},__addMixin:function(g,h,j){{};

if(this.hasMixin(g,h)){return;
}var n=g.$$original;

if(h.$$constructor&&!n){g=this.__retrospectWrapConstruct(g);
}var m=qx.Mixin.flatten([h]);
var k;

for(var i=0,l=m.length;i<l;i++){k=m[i];
if(k.$$events){this.__addEvents(g,k.$$events,j);
}if(k.$$properties){this.__addProperties(g,k.$$properties,j);
}if(k.$$members){this.__addMembers(g,k.$$members,j,j,j);
}}if(g.$$includes){g.$$includes.push(h);
g.$$flatIncludes.push.apply(g.$$flatIncludes,m);
}else{g.$$includes=[h];
g.$$flatIncludes=m;
}},__createDefaultConstructor:function(){function c(){c.base.apply(this,arguments);
}return c;
},__createEmptyFunction:function(){return function(){};
},__needsConstructorWrapper:function(bL,bM){{};
if(bL&&bL.$$includes){var bN=bL.$$flatIncludes;

for(var i=0,l=bN.length;i<l;i++){if(bN[i].$$constructor){return true;
}}}if(bM){var bO=qx.Mixin.flatten(bM);

for(var i=0,l=bO.length;i<l;i++){if(bO[i].$$constructor){return true;
}}}return false;
},__wrapConstructor:function(cg,name,ch){var cj=function(){var S=cj;
{};
var R=S.$$original.apply(this,arguments);
if(S.$$includes){var Q=S.$$flatIncludes;

for(var i=0,l=Q.length;i<l;i++){if(Q[i].$$constructor){Q[i].$$constructor.apply(this,arguments);
}}}{};
return R;
};

if(qx.core.Variant.isSet(bp,bo)){var ci=qx.core.Aspect.wrap(name,cj,bl);
cj.$$original=cg;
cj.constructor=ci;
cj=ci;
}cj.$$original=cg;
cg.wrapper=cj;
return cj;
}},defer:function(){if(qx.core.Variant.isSet(bp,bo)){for(var o in qx.Bootstrap.$$registry){var p=qx.Bootstrap.$$registry[o];

for(var q in p){if(p[q] instanceof Function){p[q]=qx.core.Aspect.wrap(o+bn+q,p[q],bm);
}}}}}});
})();
(function(){var i="qx.client",h="on",g="function",f="mousedown",d="qx.bom.Event",c="return;",b="mouseover",a="HTMLEvents";
qx.Class.define(d,{statics:{addNativeListener:qx.core.Variant.select(i,{"mshtml":function(w,x,y){w.attachEvent(h+x,y);
},"default":function(q,r,s){q.addEventListener(r,s,false);
}}),removeNativeListener:qx.core.Variant.select(i,{"mshtml":function(t,u,v){try{t.detachEvent(h+u,v);
}catch(e){if(e.number!==-2146828218){throw e;
}}},"default":function(z,A,B){z.removeEventListener(A,B,false);
}}),getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:qx.core.Variant.select(i,{"mshtml":function(e){if(e.type===b){return e.fromEvent;
}else{return e.toElement;
}},"gecko":function(e){try{e.relatedTarget&&e.relatedTarget.nodeType;
}catch(e){return null;
}return e.relatedTarget;
},"default":function(e){return e.relatedTarget;
}}),preventDefault:qx.core.Variant.select(i,{"gecko":function(e){if(qx.bom.client.Engine.VERSION>=1.9&&e.type==f&&e.button==2){return;
}e.preventDefault();
if(qx.bom.client.Engine.VERSION<1.9){try{e.keyCode=0;
}catch(C){}}},"mshtml":function(e){try{e.keyCode=0;
}catch(F){}e.returnValue=false;
},"default":function(e){e.preventDefault();
}}),stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}e.cancelBubble=true;
},fire:function(j,k){if(document.createEventObject){var l=document.createEventObject();
return j.fireEvent(h+k,l);
}else{var l=document.createEvent(a);
l.initEvent(k,true,true);
return !j.dispatchEvent(l);
}},supportsEvent:qx.core.Variant.select(i,{"webkit":function(D,E){return D.hasOwnProperty(h+E);
},"default":function(m,n){var o=h+n;
var p=(o in m);

if(!p){p=typeof m[o]==g;

if(!p&&m.setAttribute){m.setAttribute(o,c);
p=typeof m[o]==g;
m.removeAttribute(o);
}}return p;
}})}});
})();
(function(){var bC="|bubble",bB="|capture",bA="|",bz="",by="_",bx="unload",bw="__dispatchers",bv="UNKNOWN_",bu="c",bt="DOM_",bq="__handlers",bs="WIN_",br="capture",bp="qx.event.Manager",bo="QX_";
qx.Class.define(bp,{extend:Object,construct:function(r,s){this.__window=r;
this.__windowId=qx.core.ObjectRegistry.toHashCode(r);
this.__registration=s;
if(r.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(r,bx,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(r,bx,arguments.callee);
self.dispose();
}));
}this.__listeners={};
this.__handlers={};
this.__dispatchers={};
this.__handlerCache={};
},statics:{__lastUnique:0,getNextUniqueId:function(){return (this.__lastUnique++)+bz;
}},members:{__registration:null,__listeners:null,__dispatchers:null,__disposeWrapper:null,__handlers:null,__handlerCache:null,__window:null,__windowId:null,getWindow:function(){return this.__window;
},getWindowId:function(){return this.__windowId;
},getHandler:function(a){var b=this.__handlers[a.classname];

if(b){return b;
}return this.__handlers[a.classname]=new a(this);
},getDispatcher:function(g){var h=this.__dispatchers[g.classname];

if(h){return h;
}return this.__dispatchers[g.classname]=new g(this,this.__registration);
},getListeners:function(t,u,v){var w=t.$$hash||qx.core.ObjectRegistry.toHashCode(t);
var y=this.__listeners[w];

if(!y){return null;
}var z=u+(v?bB:bC);
var x=y[z];
return x?x.concat():null;
},serializeListeners:function(bS){var ca=bS.$$hash||qx.core.ObjectRegistry.toHashCode(bS);
var cc=this.__listeners[ca];
var bX=[];

if(cc){var bV,cb,bT,bW,bY;

for(var bU in cc){bV=bU.indexOf(bA);
cb=bU.substring(0,bV);
bT=bU.charAt(bV+1)==bu;
bW=cc[bU];

for(var i=0,l=bW.length;i<l;i++){bY=bW[i];
bX.push({self:bY.context,handler:bY.handler,type:cb,capture:bT});
}}}return bX;
},toggleAttachedEvents:function(U,V){var bb=U.$$hash||qx.core.ObjectRegistry.toHashCode(U);
var bd=this.__listeners[bb];

if(bd){var X,bc,W,Y;

for(var ba in bd){X=ba.indexOf(bA);
bc=ba.substring(0,X);
W=ba.charCodeAt(X+1)===99;
Y=bd[ba];

if(V){this.__registerAtHandler(U,bc,W);
}else{this.__unregisterAtHandler(U,bc,W);
}}}},hasListener:function(N,O,P){{};
var Q=N.$$hash||qx.core.ObjectRegistry.toHashCode(N);
var S=this.__listeners[Q];

if(!S){return false;
}var T=O+(P?bB:bC);
var R=S[T];
return R&&R.length>0;
},importListeners:function(cx,cy){{};
var cE=cx.$$hash||qx.core.ObjectRegistry.toHashCode(cx);
var cF=this.__listeners[cE]={};
var cB=qx.event.Manager;

for(var cz in cy){var cC=cy[cz];
var cD=cC.type+(cC.capture?bB:bC);
var cA=cF[cD];

if(!cA){cA=cF[cD]=[];
this.__registerAtHandler(cx,cC.type,cC.capture);
}cA.push({handler:cC.listener,context:cC.self,unique:cC.unique||(cB.__lastUnique++)+bz});
}},addListener:function(bH,bI,bJ,self,bK){var bO;
{};
var bP=bH.$$hash||qx.core.ObjectRegistry.toHashCode(bH);
var bR=this.__listeners[bP];

if(!bR){bR=this.__listeners[bP]={};
}var bN=bI+(bK?bB:bC);
var bM=bR[bN];

if(!bM){bM=bR[bN]=[];
}if(bM.length===0){this.__registerAtHandler(bH,bI,bK);
}var bQ=(qx.event.Manager.__lastUnique++)+bz;
var bL={handler:bJ,context:self,unique:bQ};
bM.push(bL);
return bN+bA+bQ;
},findHandler:function(A,B){var L=false,E=false,M=false;
var K;

if(A.nodeType===1){L=true;
K=bt+A.tagName.toLowerCase()+by+B;
}else if(A==this.__window){E=true;
K=bs+B;
}else if(A.classname){M=true;
K=bo+A.classname+by+B;
}else{K=bv+A+by+B;
}var G=this.__handlerCache;

if(G[K]){return G[K];
}var J=this.__registration.getHandlers();
var F=qx.event.IEventHandler;
var H,I,D,C;

for(var i=0,l=J.length;i<l;i++){H=J[i];
D=H.SUPPORTED_TYPES;

if(D&&!D[B]){continue;
}C=H.TARGET_CHECK;

if(C){if(!L&&C===F.TARGET_DOMNODE){continue;
}else if(!E&&C===F.TARGET_WINDOW){continue;
}else if(!M&&C===F.TARGET_OBJECT){continue;
}}I=this.getHandler(J[i]);

if(H.IGNORE_CAN_HANDLE||I.canHandleEvent(A,B)){G[K]=I;
return I;
}}return null;
},__registerAtHandler:function(c,d,e){var f=this.findHandler(c,d);

if(f){f.registerEvent(c,d,e);
return;
}{};
},removeListener:function(be,bf,bg,self,bh){var bl;
{};
var bm=be.$$hash||qx.core.ObjectRegistry.toHashCode(be);
var bn=this.__listeners[bm];

if(!bn){return false;
}var bi=bf+(bh?bB:bC);
var bj=bn[bi];

if(!bj){return false;
}var bk;

for(var i=0,l=bj.length;i<l;i++){bk=bj[i];

if(bk.handler===bg&&bk.context===self){qx.lang.Array.removeAt(bj,i);

if(bj.length==0){this.__unregisterAtHandler(be,bf,bh);
}return true;
}}return false;
},removeListenerById:function(cl,cm){var cs;
{};
var cq=cm.split(bA);
var cv=cq[0];
var cn=cq[1].charCodeAt(0)==99;
var cu=cq[2];
var ct=cl.$$hash||qx.core.ObjectRegistry.toHashCode(cl);
var cw=this.__listeners[ct];

if(!cw){return false;
}var cr=cv+(cn?bB:bC);
var cp=cw[cr];

if(!cp){return false;
}var co;

for(var i=0,l=cp.length;i<l;i++){co=cp[i];

if(co.unique===cu){qx.lang.Array.removeAt(cp,i);

if(cp.length==0){this.__unregisterAtHandler(cl,cv,cn);
}return true;
}}return false;
},removeAllListeners:function(j){var o=j.$$hash||qx.core.ObjectRegistry.toHashCode(j);
var q=this.__listeners[o];

if(!q){return false;
}var m,p,k;

for(var n in q){if(q[n].length>0){m=n.split(bA);
p=m[0];
k=m[1]===br;
this.__unregisterAtHandler(j,p,k);
}}delete this.__listeners[o];
return true;
},deleteAllListeners:function(cd){delete this.__listeners[cd];
},__unregisterAtHandler:function(bD,bE,bF){var bG=this.findHandler(bD,bE);

if(bG){bG.unregisterEvent(bD,bE,bF);
return;
}{};
},dispatchEvent:function(ce,event){var cj;
{};
var ck=event.getType();

if(!event.getBubbles()&&!this.hasListener(ce,ck)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(ce);
}var ci=this.__registration.getDispatchers();
var ch;
var cg=false;

for(var i=0,l=ci.length;i<l;i++){ch=this.getDispatcher(ci[i]);
if(ch.canDispatchEvent(ce,event,ck)){ch.dispatchEvent(ce,event,ck);
cg=true;
break;
}}
if(!cg){{};
return true;
}var cf=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !cf;
},dispose:function(){this.__registration.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,bq);
qx.util.DisposeUtil.disposeMap(this,bw);
this.__listeners=this.__window=this.__disposeWrapper=null;
this.__registration=this.__handlerCache=null;
}}});
})();
(function(){var d="qx.dom.Node",c="qx.client",b="";
qx.Class.define(d,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(f){return f.nodeType===
this.DOCUMENT?f:
f.ownerDocument||f.document;
},getWindow:qx.core.Variant.select(c,{"mshtml":function(e){if(e.nodeType==null){return e;
}if(e.nodeType!==this.DOCUMENT){e=e.ownerDocument;
}return e.parentWindow;
},"default":function(h){if(h.nodeType==null){return h;
}if(h.nodeType!==this.DOCUMENT){h=h.ownerDocument;
}return h.defaultView;
}}),getDocumentElement:function(p){return this.getDocument(p).documentElement;
},getBodyElement:function(q){return this.getDocument(q).body;
},isNode:function(m){return !!(m&&m.nodeType!=null);
},isElement:function(g){return !!(g&&g.nodeType===this.ELEMENT);
},isDocument:function(l){return !!(l&&l.nodeType===this.DOCUMENT);
},isText:function(o){return !!(o&&o.nodeType===this.TEXT);
},isWindow:function(n){return !!(n&&n.history&&n.location&&n.document);
},isNodeName:function(r,s){if(!s||!r||!r.nodeName){return false;
}return s.toLowerCase()==qx.dom.Node.getName(r);
},getName:function(t){if(!t||!t.nodeName){return null;
}return t.nodeName.toLowerCase();
},getText:function(j){if(!j||!j.nodeType){return null;
}
switch(j.nodeType){case 1:var i,a=[],k=j.childNodes,length=k.length;

for(i=0;i<length;i++){a[i]=this.getText(k[i]);
}return a.join(b);
case 2:return j.nodeValue;
break;
case 3:return j.nodeValue;
break;
}return null;
}}});
})();
(function(){var bl="mshtml",bk="qx.client",bj="[object Array]",bi="qx.lang.Array",bh="qx",bg="number",bf="string";
qx.Class.define(bi,{statics:{toArray:function(A,B){return this.cast(A,Array,B);
},cast:function(I,J,K){if(I.constructor===J){return I;
}
if(qx.Class.hasInterface(I,qx.data.IListData)){var I=I.toArray();
}var L=new J;
if(qx.core.Variant.isSet(bk,bl)){if(I.item){for(var i=K||0,l=I.length;i<l;i++){L.push(I[i]);
}return L;
}}if(Object.prototype.toString.call(I)===bj&&K==null){L.push.apply(L,I);
}else{L.push.apply(L,Array.prototype.slice.call(I,K||0));
}return L;
},fromArguments:function(T,U){return Array.prototype.slice.call(T,U||0);
},fromCollection:function(C){if(qx.core.Variant.isSet(bk,bl)){if(C.item){var D=[];

for(var i=0,l=C.length;i<l;i++){D[i]=C[i];
}return D;
}}return Array.prototype.slice.call(C,0);
},fromShortHand:function(Q){var S=Q.length;
var R=qx.lang.Array.clone(Q);
switch(S){case 1:R[1]=R[2]=R[3]=R[0];
break;
case 2:R[2]=R[0];
case 3:R[3]=R[1];
}return R;
},clone:function(bm){return bm.concat();
},insertAt:function(y,z,i){y.splice(i,0,z);
return y;
},insertBefore:function(v,w,x){var i=v.indexOf(x);

if(i==-1){v.push(w);
}else{v.splice(i,0,w);
}return v;
},insertAfter:function(E,F,G){var i=E.indexOf(G);

if(i==-1||i==(E.length-1)){E.push(F);
}else{E.splice(i+1,0,F);
}return E;
},removeAt:function(be,i){return be.splice(i,1)[0];
},removeAll:function(bq){bq.length=0;
return this;
},append:function(M,N){{};
Array.prototype.push.apply(M,N);
return M;
},exclude:function(Y,ba){{};

for(var i=0,bc=ba.length,bb;i<bc;i++){bb=Y.indexOf(ba[i]);

if(bb!=-1){Y.splice(bb,1);
}}return Y;
},remove:function(p,q){var i=p.indexOf(q);

if(i!=-1){p.splice(i,1);
return q;
}},contains:function(t,u){return t.indexOf(u)!==-1;
},equals:function(O,P){var length=O.length;

if(length!==P.length){return false;
}
for(var i=0;i<length;i++){if(O[i]!==P[i]){return false;
}}return true;
},sum:function(r){var s=0;

for(var i=0,l=r.length;i<l;i++){s+=r[i];
}return s;
},max:function(bn){{};
var i,bp=bn.length,bo=bn[0];

for(i=1;i<bp;i++){if(bn[i]>bo){bo=bn[i];
}}return bo===undefined?null:bo;
},min:function(V){{};
var i,X=V.length,W=V[0];

for(i=1;i<X;i++){if(V[i]<W){W=V[i];
}}return W===undefined?null:W;
},unique:function(a){var m=[],c={},f={},h={};
var g,b=0;
var n=bh+qx.lang.Date.now();
var d=false,k=false,o=false;
for(var i=0,j=a.length;i<j;i++){g=a[i];
if(g===null){if(!d){d=true;
m.push(g);
}}else if(g===undefined){}else if(g===false){if(!k){k=true;
m.push(g);
}}else if(g===true){if(!o){o=true;
m.push(g);
}}else if(typeof g===bf){if(!c[g]){c[g]=1;
m.push(g);
}}else if(typeof g===bg){if(!f[g]){f[g]=1;
m.push(g);
}}else{e=g[n];

if(e==null){e=g[n]=b++;
}
if(!h[e]){h[e]=g;
m.push(g);
}}}for(var e in h){try{delete h[e][n];
}catch(H){try{h[e][n]=null;
}catch(bd){throw new Error("Cannot clean-up map entry doneObjects["+e+"]["+n+"]");
}}}return m;
}}});
})();
(function(){var B="()",A=".",z=".prototype.",y='anonymous()',x="qx.lang.Function",w=".constructor()";
qx.Class.define(x,{statics:{getCaller:function(s){return s.caller?s.caller.callee:s.callee.caller;
},getName:function(a){if(a.displayName){return a.displayName;
}
if(a.$$original||a.wrapper||a.classname){return a.classname+w;
}
if(a.$$mixin){for(var c in a.$$mixin.$$members){if(a.$$mixin.$$members[c]==a){return a.$$mixin.name+z+c+B;
}}for(var c in a.$$mixin){if(a.$$mixin[c]==a){return a.$$mixin.name+A+c+B;
}}}
if(a.self){var d=a.self.constructor;

if(d){for(var c in d.prototype){if(d.prototype[c]==a){return d.classname+z+c+B;
}}for(var c in d){if(d[c]==a){return d.classname+A+c+B;
}}}}var b=a.toString().match(/function\s*(\w*)\s*\(.*/);

if(b&&b.length>=1&&b[1]){return b[1]+B;
}return y;
},globalEval:function(r){if(window.execScript){return window.execScript(r);
}else{return eval.call(window,r);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(C,D){{};
if(!D){return C;
}if(!(D.self||D.args||D.delay!=null||D.periodical!=null||D.attempt)){return C;
}return function(event){{};
var l=qx.lang.Array.fromArguments(arguments);
if(D.args){l=D.args.concat(l);
}
if(D.delay||D.periodical){var k=qx.event.GlobalError.observeMethod(function(){return C.apply(D.self||this,l);
});

if(D.delay){return window.setTimeout(k,D.delay);
}
if(D.periodical){return window.setInterval(k,D.periodical);
}}else if(D.attempt){var m=false;

try{m=C.apply(D.self||this,l);
}catch(q){}return m;
}else{return C.apply(D.self||this,l);
}};
},bind:function(h,self,i){return this.create(h,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(G,H){return this.create(G,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(e,self,f){if(arguments.length<3){return function(event){return e.call(self||this,event||window.event);
};
}else{var g=qx.lang.Array.fromArguments(arguments,2);
return function(event){var j=[event||window.event];
j.push.apply(j,g);
e.apply(self||this,j);
};
}},attempt:function(E,self,F){return this.create(E,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(t,u,self,v){return this.create(t,{delay:u,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(n,o,self,p){return this.create(n,{periodical:o,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
})();
(function(){var d="qx.event.Registration";
qx.Class.define(d,{statics:{__managers:{},getManager:function(G){if(G==null){{};
G=window;
}else if(G.nodeType){G=qx.dom.Node.getWindow(G);
}else if(!qx.dom.Node.isWindow(G)){G=window;
}var I=G.$$hash||qx.core.ObjectRegistry.toHashCode(G);
var H=this.__managers[I];

if(!H){H=new qx.event.Manager(G,this);
this.__managers[I]=H;
}return H;
},removeManager:function(p){var q=p.getWindowId();
delete this.__managers[q];
},addListener:function(L,M,N,self,O){return this.getManager(L).addListener(L,M,N,self,O);
},removeListener:function(v,w,x,self,y){return this.getManager(v).removeListener(v,w,x,self,y);
},removeListenerById:function(R,S){return this.getManager(R).removeListenerById(R,S);
},removeAllListeners:function(e){return this.getManager(e).removeAllListeners(e);
},deleteAllListeners:function(P){var Q=P.$$hash;

if(Q){this.getManager(P).deleteAllListeners(Q);
}},hasListener:function(m,n,o){return this.getManager(m).hasListener(m,n,o);
},serializeListeners:function(c){return this.getManager(c).serializeListeners(c);
},createEvent:function(r,s,t){{};
if(s==null){s=qx.event.type.Event;
}var u=qx.event.Pool.getInstance().getObject(s);
t?u.init.apply(u,t):u.init();
if(r){u.setType(r);
}return u;
},dispatchEvent:function(f,event){return this.getManager(f).dispatchEvent(f,event);
},fireEvent:function(A,B,C,D){var E;
{};
var F=this.createEvent(B,C||null,D);
return this.getManager(A).dispatchEvent(A,F);
},fireNonBubblingEvent:function(g,h,i,j){{};
var k=this.getManager(g);

if(!k.hasListener(g,h,false)){return true;
}var l=this.createEvent(h,i||null,j);
return k.dispatchEvent(g,l);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__handlers:[],addHandler:function(z){{};
this.__handlers.push(z);
this.__handlers.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__handlers;
},__dispatchers:[],addDispatcher:function(J,K){{};
this.__dispatchers.push(J);
this.__dispatchers.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__dispatchers;
}}});
})();
(function(){var e="$$hash",d="",c="qx.core.ObjectRegistry";
qx.Class.define(c,{statics:{inShutDown:false,__registry:{},__nextHash:0,__freeHashes:[],register:function(w){var z=this.__registry;

if(!z){return;
}var y=w.$$hash;

if(y==null){var x=this.__freeHashes;

if(x.length>0){y=x.pop();
}else{y=(this.__nextHash++)+d;
}w.$$hash=y;
}{};
z[y]=w;
},unregister:function(j){var k=j.$$hash;

if(k==null){return;
}var m=this.__registry;

if(m&&m[k]){delete m[k];
this.__freeHashes.push(k);
}try{delete j.$$hash;
}catch(v){if(j.removeAttribute){j.removeAttribute(e);
}}},toHashCode:function(f){{};
var h=f.$$hash;

if(h!=null){return h;
}var g=this.__freeHashes;

if(g.length>0){h=g.pop();
}else{h=(this.__nextHash++)+d;
}return f.$$hash=h;
},clearHashCode:function(o){{};
var p=o.$$hash;

if(p!=null){this.__freeHashes.push(p);
try{delete o.$$hash;
}catch(q){if(o.removeAttribute){o.removeAttribute(e);
}}}},fromHashCode:function(n){return this.__registry[n]||null;
},shutdown:function(){this.inShutDown=true;
var s=this.__registry;
var u=[];

for(var t in s){u.push(t);
}u.sort(function(a,b){return parseInt(b)-parseInt(a);
});
var r,i=0,l=u.length;

while(true){try{for(;i<l;i++){t=u[i];
r=s[t];

if(r&&r.dispose){r.dispose();
}}}catch(A){qx.Bootstrap.error(this,"Could not dispose object "+r.toString()+": "+A);

if(i!==l){i++;
continue;
}}break;
}qx.Bootstrap.debug(this,"Disposed "+l+" objects");
delete this.__registry;
},getRegistry:function(){return this.__registry;
}}});
})();
(function(){var a="qx.data.MBinding";
qx.Mixin.define(a,{members:{bind:function(b,c,d,e){return qx.data.SingleValueBinding.bind(this,b,c,d,e);
},removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
})();
(function(){var j=":",h="qx.client",g="anonymous",f="...",e="qx.dev.StackTrace",d="",c="\n",b="/source/class/",a=".";
qx.Class.define(e,{statics:{getStackTrace:qx.core.Variant.select(h,{"gecko":function(){try{throw new Error();
}catch(s){var K=this.getStackTraceFromError(s);
qx.lang.Array.removeAt(K,0);
var I=this.getStackTraceFromCaller(arguments);
var G=I.length>K.length?I:K;

for(var i=0;i<Math.min(I.length,K.length);i++){var H=I[i];

if(H.indexOf(g)>=0){continue;
}var O=H.split(j);

if(O.length!=2){continue;
}var M=O[0];
var F=O[1];
var E=K[i];
var P=E.split(j);
var L=P[0];
var D=P[1];

if(qx.Class.getByName(L)){var J=L;
}else{J=M;
}var N=J+j;

if(F){N+=F+j;
}N+=D;
G[i]=N;
}return G;
}},"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},"opera":function(){var B;

try{B.bar();
}catch(r){var C=this.getStackTraceFromError(r);
qx.lang.Array.removeAt(C,0);
return C;
}return [];
}}),getStackTraceFromCaller:qx.core.Variant.select(h,{"opera":function(bc){return [];
},"default":function(V){var bb=[];
var ba=qx.lang.Function.getCaller(V);
var W={};

while(ba){var X=qx.lang.Function.getName(ba);
bb.push(X);

try{ba=ba.caller;
}catch(U){break;
}
if(!ba){break;
}var Y=qx.core.ObjectRegistry.toHashCode(ba);

if(W[Y]){bb.push(f);
break;
}W[Y]=ba;
}return bb;
}}),getStackTraceFromError:qx.core.Variant.select(h,{"gecko":function(k){if(!k.stack){return [];
}var q=/@(.+):(\d+)$/gm;
var l;
var m=[];

while((l=q.exec(k.stack))!=null){var n=l[1];
var p=l[2];
var o=this.__fileNameToClassName(n);
m.push(o+j+p);
}return m;
},"webkit":function(A){if(A.sourceURL&&A.line){return [this.__fileNameToClassName(A.sourceURL)+j+A.line];
}else{return [];
}},"opera":function(t){if(t.message.indexOf("Backtrace:")<0){return [];
}var v=[];
var w=qx.lang.String.trim(t.message.split("Backtrace:")[1]);
var x=w.split(c);

for(var i=0;i<x.length;i++){var u=x[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(u&&u.length>=2){var z=u[1];
var y=this.__fileNameToClassName(u[2]);
v.push(y+j+z);
}}return v;
},"default":function(){return [];
}}),__fileNameToClassName:function(Q){var T=b;
var R=Q.indexOf(T);
var S=(R==-1)?Q:Q.substring(R+T.length).replace(/\//g,a).replace(/\.js$/,d);
return S;
}}});
})();
(function(){var a="qx.lang.RingBuffer";
qx.Class.define(a,{extend:Object,construct:function(b){this.setMaxEntries(b||50);
},members:{__nextIndexToStoreTo:0,__entriesStored:0,__isMarkActive:false,__entriesStoredSinceMark:0,__entries:null,__maxEntries:null,setMaxEntries:function(j){this.__maxEntries=j;
this.clear();
},getMaxEntries:function(){return this.__maxEntries;
},addEntry:function(c){this.__entries[this.__nextIndexToStoreTo]=c;
this.__nextIndexToStoreTo=this.__addToIndex(this.__nextIndexToStoreTo,1);
var d=this.getMaxEntries();

if(this.__entriesStored<d){this.__entriesStored++;
}if(this.__isMarkActive&&(this.__entriesStoredSinceMark<d)){this.__entriesStoredSinceMark++;
}},mark:function(){this.__isMarkActive=true;
this.__entriesStoredSinceMark=0;
},clearMark:function(){this.__isMarkActive=false;
},getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);
},getEntries:function(e,f){if(e>this.__entriesStored){e=this.__entriesStored;
}if(f&&this.__isMarkActive&&(e>this.__entriesStoredSinceMark)){e=this.__entriesStoredSinceMark;
}
if(e>0){var h=this.__addToIndex(this.__nextIndexToStoreTo,-1);
var g=this.__addToIndex(h,-e+1);
var i;

if(g<=h){i=this.__entries.slice(g,h+1);
}else{i=this.__entries.slice(g,this.__entriesStored).concat(this.__entries.slice(0,h+1));
}}else{i=[];
}return i;
},clear:function(){this.__entries=new Array(this.getMaxEntries());
this.__entriesStored=0;
this.__entriesStoredSinceMark=0;
this.__nextIndexToStoreTo=0;
},__addToIndex:function(k,l){var m=this.getMaxEntries();
var n=(k+l)%m;
if(n<0){n+=m;
}return n;
}}});
})();
(function(){var a="qx.log.appender.RingBuffer";
qx.Class.define(a,{extend:qx.lang.RingBuffer,construct:function(b){this.setMaxMessages(b||50);
},members:{setMaxMessages:function(c){this.setMaxEntries(c);
},getMaxMessages:function(){return this.getMaxEntries();
},process:function(f){this.addEntry(f);
},getAllLogEvents:function(){return this.getAllEntries();
},retrieveLogEvents:function(d,e){return this.getEntries(d,e);
},clearHistory:function(){this.clear();
}}});
})();
(function(){var bp="node",bo="error",bn="...(+",bm="array",bl=")",bk="info",bj="instance",bi="string",bh="null",bg="class",bK="number",bJ="stringify",bI="]",bH="unknown",bG="function",bF="boolean",bE="debug",bD="map",bC="undefined",bB="qx.log.Logger",bw=")}",bx="#",bu="warn",bv="document",bs="{...(",bt="[",bq="text[",br="[...(",by="\n",bz=")]",bA="object";
qx.Class.define(bB,{statics:{__level:bE,setLevel:function(k){this.__level=k;
},getLevel:function(){return this.__level;
},setTreshold:function(bc){this.__buffer.setMaxMessages(bc);
},getTreshold:function(){return this.__buffer.getMaxMessages();
},__appender:{},__id:0,register:function(bN){if(bN.$$id){return;
}var bO=this.__id++;
this.__appender[bO]=bN;
bN.$$id=bO;
var bP=this.__buffer.getAllLogEvents();

for(var i=0,l=bP.length;i<l;i++){bN.process(bP[i]);
}},unregister:function(z){var A=z.$$id;

if(A==null){return;
}delete this.__appender[A];
delete z.$$id;
},debug:function(bL,bM){qx.log.Logger.__log(bE,arguments);
},info:function(p,q){qx.log.Logger.__log(bk,arguments);
},warn:function(O,P){qx.log.Logger.__log(bu,arguments);
},error:function(V,W){qx.log.Logger.__log(bo,arguments);
},trace:function(U){qx.log.Logger.__log(bk,[U,qx.dev.StackTrace.getStackTrace().join(by)]);
},deprecatedMethodWarning:function(bd,be){var bf;
{};
},deprecatedClassWarning:function(B,C){var D;
{};
},deprecatedEventWarning:function(w,event,x){var y;
{};
},deprecatedMixinWarning:function(m,n){var o;
{};
},deprecatedConstantWarning:function(X,Y,ba){var self,bb;
{};
},deprecateMethodOverriding:function(r,s,t,u){var v;
{};
},clear:function(){this.__buffer.clearHistory();
},__buffer:new qx.log.appender.RingBuffer(50),__levels:{debug:0,info:1,warn:2,error:3},__log:function(E,F){var K=this.__levels;

if(K[E]<K[this.__level]){return;
}var H=F.length<2?null:F[0];
var J=H?1:0;
var G=[];

for(var i=J,l=F.length;i<l;i++){G.push(this.__serialize(F[i],true));
}var L=new Date;
var M={time:L,offset:L-qx.Bootstrap.LOADSTART,level:E,items:G,win:window};
if(H){if(H instanceof qx.core.Object){M.object=H.$$hash;
}else if(H.$$type){M.clazz=H;
}}this.__buffer.process(M);
var N=this.__appender;

for(var I in N){N[I].process(M);
}},__detect:function(Q){if(Q===undefined){return bC;
}else if(Q===null){return bh;
}
if(Q.$$type){return bg;
}var R=typeof Q;

if(R===bG||R==bi||R===bK||R===bF){return R;
}else if(R===bA){if(Q.nodeType){return bp;
}else if(Q.classname){return bj;
}else if(Q instanceof Array){return bm;
}else if(Q instanceof Error){return bo;
}else{return bD;
}}
if(Q.toString){return bJ;
}return bH;
},__serialize:function(a,b){var j=this.__detect(a);
var e=bH;
var d=[];

switch(j){case bh:case bC:e=j;
break;
case bi:case bK:case bF:e=a;
break;
case bp:if(a.nodeType===9){e=bv;
}else if(a.nodeType===3){e=bq+a.nodeValue+bI;
}else if(a.nodeType===1){e=a.nodeName.toLowerCase();

if(a.id){e+=bx+a.id;
}}else{e=bp;
}break;
case bG:e=qx.lang.Function.getName(a)||j;
break;
case bj:e=a.basename+bt+a.$$hash+bI;
break;
case bg:case bJ:e=a.toString();
break;
case bo:d=qx.dev.StackTrace.getStackTraceFromError(a);
e=a.toString();
break;
case bm:if(b){e=[];

for(var i=0,l=a.length;i<l;i++){if(e.length>20){e.push(bn+(l-i)+bl);
break;
}e.push(this.__serialize(a[i],false));
}}else{e=br+a.length+bz;
}break;
case bD:if(b){var c;
var h=[];

for(var g in a){h.push(g);
}h.sort();
e=[];

for(var i=0,l=h.length;i<l;i++){if(e.length>20){e.push(bn+(l-i)+bl);
break;
}g=h[i];
c=this.__serialize(a[g],false);
c.key=g;
e.push(c);
}}else{var f=0;

for(var g in a){f++;
}e=bs+f+bw;
}break;
}return {type:j,text:e,trace:d};
}},defer:function(S){var T=qx.Bootstrap.$$logs;

for(var i=0;i<T.length;i++){S.__log(T[i][0],T[i][1]);
}qx.Bootstrap.debug=S.debug;
qx.Bootstrap.info=S.info;
qx.Bootstrap.warn=S.warn;
qx.Bootstrap.error=S.error;
qx.Bootstrap.trace=S.trace;
}});
})();
(function(){var bA="set",bz="get",by="reset",bx="MSIE 6.0",bw="qx.core.Object",bv="]",bu="rv:1.8.1",bt="[",bs="$$user_",br="Object";
qx.Class.define(bw,{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:br},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+bt+this.$$hash+bv;
},base:function(A,B){{};

if(arguments.length===1){return A.callee.base.call(this);
}else{return A.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(ba){return ba.callee.self;
},clone:function(){var N=this.constructor;
var M=new N;
var P=qx.Class.getProperties(N);
var O=qx.core.Property.$$store.user;
var Q=qx.core.Property.$$method.set;
var name;
for(var i=0,l=P.length;i<l;i++){name=P[i];

if(this.hasOwnProperty(O[name])){M[Q[name]](this[O[name]]);
}}return M;
},set:function(u,v){var x=qx.core.Property.$$method.set;

if(qx.Bootstrap.isString(u)){if(!this[x[u]]){if(this[bA+qx.Bootstrap.firstUp(u)]!=undefined){this[bA+qx.Bootstrap.firstUp(u)](v);
return this;
}{};
}return this[x[u]](v);
}else{for(var w in u){if(!this[x[w]]){if(this[bA+qx.Bootstrap.firstUp(w)]!=undefined){this[bA+qx.Bootstrap.firstUp(w)](u[w]);
continue;
}{};
}this[x[w]](u[w]);
}return this;
}},get:function(W){var X=qx.core.Property.$$method.get;

if(!this[X[W]]){if(this[bz+qx.Bootstrap.firstUp(W)]!=undefined){return this[bz+qx.Bootstrap.firstUp(W)]();
}{};
}return this[X[W]]();
},reset:function(E){var F=qx.core.Property.$$method.reset;

if(!this[F[E]]){if(this[by+qx.Bootstrap.firstUp(E)]!=undefined){this[by+qx.Bootstrap.firstUp(E)]();
return;
}{};
}this[F[E]]();
},__Registration:qx.event.Registration,addListener:function(bd,be,self,bf){if(!this.$$disposed){return this.__Registration.addListener(this,bd,be,self,bf);
}return null;
},addListenerOnce:function(I,J,self,K){var L=function(e){J.call(self||this,e);
this.removeListener(I,L,this,K);
};
return this.addListener(I,L,this,K);
},removeListener:function(o,p,self,q){if(!this.$$disposed){return this.__Registration.removeListener(this,o,p,self,q);
}return false;
},removeListenerById:function(R){if(!this.$$disposed){return this.__Registration.removeListenerById(this,R);
}return false;
},hasListener:function(y,z){return this.__Registration.hasListener(this,y,z);
},dispatchEvent:function(bF){if(!this.$$disposed){return this.__Registration.dispatchEvent(this,bF);
}return true;
},fireEvent:function(bh,bi,bj){if(!this.$$disposed){return this.__Registration.fireEvent(this,bh,bi,bj);
}return true;
},fireNonBubblingEvent:function(k,m,n){if(!this.$$disposed){return this.__Registration.fireNonBubblingEvent(this,k,m,n);
}return true;
},fireDataEvent:function(bB,bC,bD,bE){if(!this.$$disposed){if(bD===undefined){bD=null;
}return this.__Registration.fireNonBubblingEvent(this,bB,qx.event.type.Data,[bC,bD,!!bE]);
}return true;
},__userData:null,setUserData:function(bb,bc){if(!this.__userData){this.__userData={};
}this.__userData[bb]=bc;
},getUserData:function(G){if(!this.__userData){return null;
}var H=this.__userData[G];
return H===undefined?null:H;
},__Logger:qx.log.Logger,debug:function(D){this.__Logger.debug(this,D);
},info:function(bG){this.__Logger.info(this,bG);
},warn:function(r){this.__Logger.warn(this,r);
},error:function(C){this.__Logger.error(this,C);
},trace:function(){this.__Logger.trace(this);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){var bp,bn,bm,bq;
if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
{};
var bo=this.constructor;
var bl;

while(bo.superclass){if(bo.$$destructor){bo.$$destructor.call(this);
}if(bo.$$includes){bl=bo.$$flatIncludes;

for(var i=0,l=bl.length;i<l;i++){if(bl[i].$$destructor){bl[i].$$destructor.call(this);
}}}bo=bo.superclass;
}if(this.__removePropertyReferences){this.__removePropertyReferences();
}{};
},__removePropertyReferences:null,__removePropertyReferencesOld:function(){var s=qx.Class.getProperties(this.constructor);

for(var i=0,l=s.length;i<l;i++){delete this[bs+s[i]];
}},_disposeObjects:function(t){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeSingletonObjects:function(bg){qx.util.DisposeUtil.disposeObjects(this,arguments,true);
},_disposeArray:function(Y){qx.util.DisposeUtil.disposeArray(this,Y);
},_disposeMap:function(bk){qx.util.DisposeUtil.disposeMap(this,bk);
}},settings:{"qx.disposerDebugLevel":0},defer:function(S,T){{};
var V=navigator.userAgent.indexOf(bx)!=-1;
var U=navigator.userAgent.indexOf(bu)!=-1;
if(V||U){T.__removePropertyReferences=T.__removePropertyReferencesOld;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);
}else{qx.event.Registration.deleteAllListeners(this);
}qx.core.ObjectRegistry.unregister(this);
this.__userData=null;
var c=this.constructor;
var h;
var j=qx.core.Property.$$store;
var f=j.user;
var g=j.theme;
var a=j.inherit;
var d=j.useinit;
var b=j.init;

while(c){h=c.$$properties;

if(h){for(var name in h){if(h[name].dereference){this[f[name]]=this[g[name]]=this[a[name]]=this[d[name]]=this[b[name]]=undefined;
}}}c=c.superclass;
}}});
})();
(function(){var a="qx.event.IEventHandler";
qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:3},members:{canHandleEvent:function(e,f){},registerEvent:function(b,c,d){},unregisterEvent:function(g,h,i){}}});
})();
(function(){var c="qx.globalErrorHandling",b="on",a="qx.event.GlobalError";
qx.Bootstrap.define(a,{statics:{setErrorHandler:function(d,f){this.__callback=d||null;
this.__context=f||window;

if(qx.core.Setting.get(c)===b){if(d&&window.onerror){var g=qx.Bootstrap.bind(this.__onErrorWindow,this);

if(this.__originalOnError==null){this.__originalOnError=window.onerror;
}var self=this;
window.onerror=function(e){self.__originalOnError(e);
g(e);
};
}
if(d&&!window.onerror){window.onerror=qx.Bootstrap.bind(this.__onErrorWindow,this);
}if(this.__callback==null){if(this.__originalOnError!=null){window.onerror=this.__originalOnError;
this.__originalOnError=null;
}else{window.onerror=null;
}}}},__onErrorWindow:function(h,i,j){if(this.__callback){this.handleError(new qx.core.WindowError(h,i,j));
return true;
}},observeMethod:function(k){if(qx.core.Setting.get(c)===b){var self=this;
return function(){if(!self.__callback){return k.apply(this,arguments);
}
try{return k.apply(this,arguments);
}catch(m){self.handleError(new qx.core.GlobalError(m,arguments));
}};
}else{return k;
}},handleError:function(n){if(this.__callback){this.__callback.call(this.__context,n);
}}},defer:function(l){qx.core.Setting.define(c,b);
l.setErrorHandler(null,null);
}});
})();
(function(){var m="ready",l="qx.client",k="mshtml",j="load",i="unload",h="qx.event.handler.Application",g="complete",f="qx.application",d="gecko|opera|webkit",c="left",a="DOMContentLoaded",b="shutdown";
qx.Class.define(h,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(q){qx.core.Object.call(this);
this._window=q.getWindow();
this.__domReady=false;
this.__loaded=false;
this._initObserver();
qx.event.handler.Application.$$instance=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,onScriptLoaded:function(){var s=qx.event.handler.Application.$$instance;

if(s){s.__fireReady();
}}},members:{canHandleEvent:function(n,o){},registerEvent:function(t,u,v){},unregisterEvent:function(y,z,A){},__isReady:null,__domReady:null,__loaded:null,__isUnloaded:null,__fireReady:function(){if(!this.__isReady&&this.__domReady&&qx.$$loader.scriptLoaded){try{var x=qx.core.Setting.get(f);

if(!qx.Class.getByName(x)){return;
}}catch(e){}if(qx.core.Variant.isSet(l,k)){if(qx.event.Registration.hasListener(this._window,m)){this.__isReady=true;
qx.event.Registration.fireEvent(this._window,m);
}}else{this.__isReady=true;
qx.event.Registration.fireEvent(this._window,m);
}}},isApplicationReady:function(){return this.__isReady;
},_initObserver:function(){if(qx.$$domReady||document.readyState==g||document.readyState==m){this.__domReady=true;
this.__fireReady();
}else{this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);

if(qx.core.Variant.isSet(l,d)){qx.bom.Event.addNativeListener(this._window,a,this._onNativeLoadWrapped);
}else if(qx.core.Variant.isSet(l,k)){var self=this;
var r=function(){try{document.documentElement.doScroll(c);

if(document.body){self._onNativeLoadWrapped();
}}catch(p){window.setTimeout(r,100);
}};
r();
}qx.bom.Event.addNativeListener(this._window,j,this._onNativeLoadWrapped);
}this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);
qx.bom.Event.addNativeListener(this._window,i,this._onNativeUnloadWrapped);
},_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,j,this._onNativeLoadWrapped);
}qx.bom.Event.removeNativeListener(this._window,i,this._onNativeUnloadWrapped);
this._onNativeLoadWrapped=null;
this._onNativeUnloadWrapped=null;
},_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__domReady=true;
this.__fireReady();
}),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__isUnloaded){this.__isUnloaded=true;

try{qx.event.Registration.fireEvent(this._window,b);
}catch(e){throw e;
}finally{qx.core.ObjectRegistry.shutdown();
}}})},destruct:function(){this._stopObserver();
this._window=null;
},defer:function(w){qx.event.Registration.addHandler(w);
}});
})();
(function(){var a="qx.event.handler.Window";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(m){qx.core.Object.call(this);
this._manager=m;
this._window=m.getWindow();
this._initWindowObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(d,f){},registerEvent:function(i,j,k){},unregisterEvent:function(s,t,u){},_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);
var c=qx.event.handler.Window.SUPPORTED_TYPES;

for(var b in c){qx.bom.Event.addNativeListener(this._window,b,this._onNativeWrapper);
}},_stopWindowObserver:function(){var h=qx.event.handler.Window.SUPPORTED_TYPES;

for(var g in h){qx.bom.Event.removeNativeListener(this._window,g,this._onNativeWrapper);
}},_onNative:qx.event.GlobalError.observeMethod(function(e){if(this.isDisposed()){return;
}var o=this._window;

try{var r=o.document;
}catch(e){return ;
}var p=r.documentElement;
var n=e.target||e.srcElement;

if(n==null||n===o||n===r||n===p){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,o]);
qx.event.Registration.dispatchEvent(o,event);
var q=event.getReturnValue();

if(q!=null){e.returnValue=q;
return q;
}}})},destruct:function(){this._stopWindowObserver();
this._manager=this._window=null;
},defer:function(l){qx.event.Registration.addHandler(l);
}});
})();
(function(){var a="qx.event.IEventDispatcher";
qx.Interface.define(a,{members:{canDispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);
this.assertString(e);
},dispatchEvent:function(b,event,c){this.assertInstance(event,qx.event.type.Event);
this.assertString(c);
}}});
})();
(function(){var a="qx.event.dispatch.Direct";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(b){this._manager=b;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(k,event,m){return !event.getBubbles();
},dispatchEvent:function(c,event,d){var g,e;
{};
event.setEventPhase(qx.event.type.Event.AT_TARGET);
var h=this._manager.getListeners(c,d,false);

if(h){for(var i=0,l=h.length;i<l;i++){var f=h[i].context||c;
h[i].handler.call(f,event);
}}}},defer:function(j){qx.event.Registration.addDispatcher(j);
}});
})();
(function(){var f="ready",d="qx.application",c="beforeunload",b="qx.core.Init",a="shutdown";
qx.Class.define(b,{statics:{getApplication:function(){return this.__application||null;
},ready:function(){if(this.__application){return;
}
if(qx.bom.client.Engine.UNKNOWN_ENGINE){qx.log.Logger.warn("Could not detect engine!");
}
if(qx.bom.client.Engine.UNKNOWN_VERSION){qx.log.Logger.warn("Could not detect the version of the engine!");
}
if(qx.bom.client.Platform.UNKNOWN_PLATFORM){qx.log.Logger.warn("Could not detect platform!");
}
if(qx.bom.client.System.UNKNOWN_SYSTEM){qx.log.Logger.warn("Could not detect system!");
}qx.log.Logger.debug(this,"Load runtime: "+(new Date-qx.Bootstrap.LOADSTART)+"ms");
var k=qx.core.Setting.get(d);
var l=qx.Class.getByName(k);

if(l){this.__application=new l;
var j=new Date;
this.__application.main();
qx.log.Logger.debug(this,"Main runtime: "+(new Date-j)+"ms");
var j=new Date;
this.__application.finalize();
qx.log.Logger.debug(this,"Finalize runtime: "+(new Date-j)+"ms");
}else{qx.log.Logger.warn("Missing application class: "+k);
}},__close:function(e){var h=this.__application;

if(h){e.setReturnValue(h.close());
}},__shutdown:function(){var i=this.__application;

if(i){i.terminate();
}}},defer:function(g){qx.event.Registration.addListener(window,f,g.ready,g);
qx.event.Registration.addListener(window,a,g.__shutdown,g);
qx.event.Registration.addListener(window,c,g.__close,g);
}});
})();
(function(){var a="qx.application.IApplication";
qx.Interface.define(a,{members:{main:function(){},finalize:function(){},close:function(){},terminate:function(){}}});
})();
(function(){var d="qx.locale.MTranslation";
qx.Mixin.define(d,{members:{tr:function(a,b){var c=qx.locale.Manager;

if(c){return c.tr.apply(c,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trn:function(i,j,k,l){var m=qx.locale.Manager;

if(m){return m.trn.apply(m,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trc:function(e,f,g){var h=qx.locale.Manager;

if(h){return h.trc.apply(h,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},marktr:function(n){var o=qx.locale.Manager;

if(o){return o.marktr.apply(o,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
}}});
})();
(function(){var b="abstract",a="qx.application.AbstractGui";
qx.Class.define(a,{type:b,extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,members:{__root:null,_createRootWidget:function(){throw new Error("Abstract method call");
},getRoot:function(){return this.__root;
},main:function(){qx.theme.manager.Meta.getInstance().initialize();
qx.ui.tooltip.Manager.getInstance();
this.__root=this._createRootWidget();
},finalize:function(){this.render();
},render:function(){qx.ui.core.queue.Manager.flush();
},close:function(c){},terminate:function(){}},destruct:function(){this.__root=null;
}});
})();
(function(){var a="qx.application.Standalone";
qx.Class.define(a,{extend:qx.application.AbstractGui,members:{_createRootWidget:function(){return new qx.ui.root.Application(document);
}}});
})();
(function(){var i="sidebar",h="west",g="footer",f="center",e="south",d="logbuch.Application",c="north",b="main",a="header";
qx.Class.define(d,{extend:qx.application.Standalone,members:{__core:null,__layoutConfig:null,__layoutConfigInit:{viewport:{maxHeight:600,minHeight:600,maxWidth:1000,minWidth:1000},workspace:{marginTop:10,marginRight:10},calendarDayBox:{height:78,width:120,horizontalGridLineWidth:5},sidebar:{marginTop:44,marginLeft:10,width:120},footer:{marginTop:10,controlsHeight:20,buttonWidth:70}},main:function(){qx.application.Standalone.prototype.main.call(this);
{};
this.__layoutConfig=qx.data.marshal.Json.createModel(this.__layoutConfigInit,true);
var m=new qx.ui.container.Composite(new qx.ui.layout.Dock());
m.set(this.__layoutConfigInit.viewport);
var j=new qcl.application.Core();
var l=new logbuch.module.Header();
j.register(a,l);
m.add(l,{edge:c});
var k=new logbuch.module.Footer();
j.register(g,k);
m.add(k,{edge:e});
var o=new logbuch.module.Sidebar();
j.register(i,o);
m.add(o,{edge:h});
var n=new logbuch.module.Calendar();
j.register(b,n);
m.add(n,{edge:f});
j.buildModules();
j.startModules();
this.getRoot().add(m,{edge:0});
},getLayoutConfig:function(){return this.__layoutConfig;
}}});
})();
(function(){var f="qx.event.type.Event";
qx.Class.define(f,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(a,b){{};
this._type=null;
this._target=null;
this._currentTarget=null;
this._relatedTarget=null;
this._originalTarget=null;
this._stopPropagation=false;
this._preventDefault=false;
this._bubbles=!!a;
this._cancelable=!!b;
this._timeStamp=(new Date()).getTime();
this._eventPhase=null;
return this;
},clone:function(l){if(l){var m=l;
}else{var m=qx.event.Pool.getInstance().getObject(this.constructor);
}m._type=this._type;
m._target=this._target;
m._currentTarget=this._currentTarget;
m._relatedTarget=this._relatedTarget;
m._originalTarget=this._originalTarget;
m._stopPropagation=this._stopPropagation;
m._bubbles=this._bubbles;
m._preventDefault=this._preventDefault;
m._cancelable=this._cancelable;
return m;
},stop:function(){if(this._bubbles){this.stopPropagation();
}
if(this._cancelable){this.preventDefault();
}},stopPropagation:function(){{};
this._stopPropagation=true;
},getPropagationStopped:function(){return !!this._stopPropagation;
},preventDefault:function(){{};
this._preventDefault=true;
},getDefaultPrevented:function(){return !!this._preventDefault;
},getType:function(){return this._type;
},setType:function(h){this._type=h;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(e){this._eventPhase=e;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(k){this._target=k;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(j){this._currentTarget=j;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(d){this._relatedTarget=d;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(i){this._originalTarget=i;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(c){this._bubbles=c;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(g){this._cancelable=g;
}},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;
}});
})();
(function(){var a="qx.event.type.Data";
qx.Class.define(a,{extend:qx.event.type.Event,members:{__data:null,__old:null,init:function(d,e,f){qx.event.type.Event.prototype.init.call(this,false,f);
this.__data=d;
this.__old=e;
return this;
},clone:function(b){var c=qx.event.type.Event.prototype.clone.call(this,b);
c.__data=this.__data;
c.__old=this.__old;
return c;
},getData:function(){return this.__data;
},getOldData:function(){return this.__old;
}},destruct:function(){this.__data=this.__old=null;
}});
})();
(function(){var bA="get",bz="",by="[",bx="last",bw="change",bv="]",bu=".",bt="Number",bs="String",br="set",bP="deepBinding",bO="item",bN="reset",bM="' (",bL="Boolean",bK=").",bJ=") to the object '",bI="Integer",bH="qx.data.SingleValueBinding",bG="No event could be found for the property",bE="PositiveNumber",bF="Binding from '",bC="PositiveInteger",bD="Binding does not exist!",bB="Date";
qx.Class.define(bH,{statics:{DEBUG_ON:false,__bindings:{},bind:function(co,cp,cq,cr,cs){var cC=this.__setUpTargetBinding(co,cp,cq,cr,cs);
var cx=cp.split(bu);
var cu=this.__checkForArrayInPropertyChain(cx);
var cB=[];
var cy=[];
var cz=[];
var cv=[];
var cw=co;
for(var i=0;i<cx.length;i++){if(cu[i]!==bz){cv.push(bw);
}else{cv.push(this.__getEventNameForProperty(cw,cx[i]));
}cB[i]=cw;
if(i==cx.length-1){if(cu[i]!==bz){var cF=cu[i]===bx?cw.length-1:cu[i];
var ct=cw.getItem(cF);
this.__setInitialValue(ct,cq,cr,cs,co);
cz[i]=this.__bindEventToProperty(cw,cv[i],cq,cr,cs,cu[i]);
}else{if(cx[i]!=null&&cw[bA+qx.lang.String.firstUp(cx[i])]!=null){var ct=cw[bA+qx.lang.String.firstUp(cx[i])]();
this.__setInitialValue(ct,cq,cr,cs,co);
}cz[i]=this.__bindEventToProperty(cw,cv[i],cq,cr,cs);
}}else{var cD={index:i,propertyNames:cx,sources:cB,listenerIds:cz,arrayIndexValues:cu,targetObject:cq,targetPropertyChain:cr,options:cs,listeners:cy};
var cA=qx.lang.Function.bind(this.__chainListener,this,cD);
cy.push(cA);
cz[i]=cw.addListener(cv[i],cA);
}if(cw[bA+qx.lang.String.firstUp(cx[i])]==null){cw=null;
}else if(cu[i]!==bz){cw=cw[bA+qx.lang.String.firstUp(cx[i])](cu[i]);
}else{cw=cw[bA+qx.lang.String.firstUp(cx[i])]();
}
if(!cw){break;
}}var cE={type:bP,listenerIds:cz,sources:cB,targetListenerIds:cC.listenerIds,targets:cC.targets};
this.__storeBinding(cE,co,cp,cq,cr);
return cE;
},__chainListener:function(cG){if(cG.options&&cG.options.onUpdate){cG.options.onUpdate(cG.sources[cG.index],cG.targetObject);
}for(var j=cG.index+1;j<cG.propertyNames.length;j++){var cK=cG.sources[j];
cG.sources[j]=null;

if(!cK){continue;
}cK.removeListenerById(cG.listenerIds[j]);
}var cK=cG.sources[cG.index];
for(var j=cG.index+1;j<cG.propertyNames.length;j++){if(cG.arrayIndexValues[j-1]!==bz){cK=cK[bA+qx.lang.String.firstUp(cG.propertyNames[j-1])](cG.arrayIndexValues[j-1]);
}else{cK=cK[bA+qx.lang.String.firstUp(cG.propertyNames[j-1])]();
}cG.sources[j]=cK;
if(!cK){this.__resetTargetValue(cG.targetObject,cG.targetPropertyChain);
break;
}if(j==cG.propertyNames.length-1){if(qx.Class.implementsInterface(cK,qx.data.IListData)){var cL=cG.arrayIndexValues[j]===bx?cK.length-1:cG.arrayIndexValues[j];
var cI=cK.getItem(cL);
this.__setInitialValue(cI,cG.targetObject,cG.targetPropertyChain,cG.options,cG.sources[cG.index]);
cG.listenerIds[j]=this.__bindEventToProperty(cK,bw,cG.targetObject,cG.targetPropertyChain,cG.options,cG.arrayIndexValues[j]);
}else{if(cG.propertyNames[j]!=null&&cK[bA+qx.lang.String.firstUp(cG.propertyNames[j])]!=null){var cI=cK[bA+qx.lang.String.firstUp(cG.propertyNames[j])]();
this.__setInitialValue(cI,cG.targetObject,cG.targetPropertyChain,cG.options,cG.sources[cG.index]);
}var cJ=this.__getEventNameForProperty(cK,cG.propertyNames[j]);
cG.listenerIds[j]=this.__bindEventToProperty(cK,cJ,cG.targetObject,cG.targetPropertyChain,cG.options);
}}else{if(cG.listeners[j]==null){var cH=qx.lang.Function.bind(this.__chainListener,this,cG);
cG.listeners.push(cH);
}if(qx.Class.implementsInterface(cK,qx.data.IListData)){var cJ=bw;
}else{var cJ=this.__getEventNameForProperty(cK,cG.propertyNames[j]);
}cG.listenerIds[j]=cK.addListener(cJ,cG.listeners[j]);
}}},__setUpTargetBinding:function(o,p,q,r,s){var w=r.split(bu);
var u=this.__checkForArrayInPropertyChain(w);
var B=[];
var A=[];
var y=[];
var x=[];
var v=q;
for(var i=0;i<w.length-1;i++){if(u[i]!==bz){x.push(bw);
}else{try{x.push(this.__getEventNameForProperty(v,w[i]));
}catch(e){break;
}}B[i]=v;
var z=function(){for(var j=i+1;j<w.length-1;j++){var cP=B[j];
B[j]=null;

if(!cP){continue;
}cP.removeListenerById(y[j]);
}var cP=B[i];
for(var j=i+1;j<w.length-1;j++){var cN=qx.lang.String.firstUp(w[j-1]);
if(u[j-1]!==bz){var cQ=u[j-1]===bx?cP.getLength()-1:u[j-1];
cP=cP[bA+cN](cQ);
}else{cP=cP[bA+cN]();
}B[j]=cP;
if(A[j]==null){A.push(z);
}if(qx.Class.implementsInterface(cP,qx.data.IListData)){var cO=bw;
}else{try{var cO=qx.data.SingleValueBinding.__getEventNameForProperty(cP,w[j]);
}catch(e){break;
}}y[j]=cP.addListener(cO,A[j]);
}qx.data.SingleValueBinding.__updateTarget(o,p,q,r,s);
};
A.push(z);
y[i]=v.addListener(x[i],z);
var t=qx.lang.String.firstUp(w[i]);
if(v[bA+t]==null){v=null;
}else if(u[i]!==bz){v=v[bA+t](u[i]);
}else{v=v[bA+t]();
}
if(!v){break;
}}return {listenerIds:y,targets:B};
},__updateTarget:function(bQ,bR,bS,bT,bU){var bY=this.__getTargetFromChain(bQ,bR);

if(bY!=null){var cb=bR.substring(bR.lastIndexOf(bu)+1,bR.length);
if(cb.charAt(cb.length-1)==bv){var bV=cb.substring(cb.lastIndexOf(by)+1,cb.length-1);
var bX=cb.substring(0,cb.lastIndexOf(by));
var ca=bY[bA+qx.lang.String.firstUp(bX)]();

if(bV==bx){bV=ca.length-1;
}
if(ca!=null){var bW=ca.getItem(bV);
}}else{var bW=bY[bA+qx.lang.String.firstUp(cb)]();
}}bW=qx.data.SingleValueBinding.__convertValue(bW,bS,bT,bU);
this.__setTargetValue(bS,bT,bW);
},__getEventNameForProperty:function(cf,cg){var ch=this.__getEventForProperty(cf,cg);
if(ch==null){if(qx.Class.supportsEvent(cf.constructor,cg)){ch=cg;
}else if(qx.Class.supportsEvent(cf.constructor,bw+qx.lang.String.firstUp(cg))){ch=bw+qx.lang.String.firstUp(cg);
}else{throw new qx.core.AssertionError(bG,cg);
}}return ch;
},__resetTargetValue:function(h,k){var l=this.__getTargetFromChain(h,k);

if(l!=null){var m=k.substring(k.lastIndexOf(bu)+1,k.length);
if(m.charAt(m.length-1)==bv){this.__setTargetValue(h,k,null);
return;
}if(l[bN+qx.lang.String.firstUp(m)]!=undefined){l[bN+qx.lang.String.firstUp(m)]();
}else{l[br+qx.lang.String.firstUp(m)](null);
}}},__setTargetValue:function(cR,cS,cT){var cX=this.__getTargetFromChain(cR,cS);

if(cX!=null){var cY=cS.substring(cS.lastIndexOf(bu)+1,cS.length);
if(cY.charAt(cY.length-1)==bv){var cU=cY.substring(cY.lastIndexOf(by)+1,cY.length-1);
var cW=cY.substring(0,cY.lastIndexOf(by));
var cV=cX[bA+qx.lang.String.firstUp(cW)]();

if(cU==bx){cU=cV.length-1;
}
if(cV!=null){cV.setItem(cU,cT);
}}else{cX[br+qx.lang.String.firstUp(cY)](cT);
}}},__getTargetFromChain:function(be,bf){var bi=bf.split(bu);
var bj=be;
for(var i=0;i<bi.length-1;i++){try{var bh=bi[i];
if(bh.indexOf(bv)==bh.length-1){var bg=bh.substring(bh.indexOf(by)+1,bh.length-1);
bh=bh.substring(0,bh.indexOf(by));
}bj=bj[bA+qx.lang.String.firstUp(bh)]();

if(bg!=null){if(bg==bx){bg=bj.length-1;
}bj=bj.getItem(bg);
bg=null;
}}catch(cM){return null;
}}return bj;
},__setInitialValue:function(da,db,dc,dd,de){da=this.__convertValue(da,db,dc,dd);
if(da==null){this.__resetTargetValue(db,dc);
}if(da!=undefined){try{this.__setTargetValue(db,dc,da);
if(dd&&dd.onUpdate){dd.onUpdate(de,db,da);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(dd&&dd.onSetFail){dd.onSetFail(e);
}else{this.warn("Failed so set value "+da+" on "+db+". Error message: "+e);
}}}},__checkForArrayInPropertyChain:function(bk){var bl=[];
for(var i=0;i<bk.length;i++){var name=bk[i];
if(qx.lang.String.endsWith(name,bv)){var bm=name.substring(name.indexOf(by)+1,name.indexOf(bv));
if(name.indexOf(bv)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(bm!==bx){if(bm==bz||isNaN(parseInt(bm))){throw new Error("No number or 'last' value hast been given"+" in a array binding: "+name+" does not work.");
}}if(name.indexOf(by)!=0){bk[i]=name.substring(0,name.indexOf(by));
bl[i]=bz;
bl[i+1]=bm;
bk.splice(i+1,0,bO);
i++;
}else{bl[i]=bm;
bk.splice(i,1,bO);
}}else{bl[i]=bz;
}}return bl;
},__bindEventToProperty:function(P,Q,R,S,T,U){var V;
{};
var X=function(c,e){if(c!==bz){if(c===bx){c=P.length-1;
}var g=P.getItem(c);
if(g==undefined){qx.data.SingleValueBinding.__resetTargetValue(R,S);
}var d=e.getData().start;
var f=e.getData().end;

if(c<d||c>f){return;
}}else{var g=e.getData();
}if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Binding executed from "+P+" by "+Q+" to "+R+" ("+S+")");
qx.log.Logger.debug("Data before conversion: "+g);
}g=qx.data.SingleValueBinding.__convertValue(g,R,S,T);
if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Data after conversion: "+g);
}try{if(g!=undefined){qx.data.SingleValueBinding.__setTargetValue(R,S,g);
}else{qx.data.SingleValueBinding.__resetTargetValue(R,S);
}if(T&&T.onUpdate){T.onUpdate(P,R,g);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(T&&T.onSetFail){T.onSetFail(e);
}else{this.warn("Failed so set value "+g+" on "+R+". Error message: "+e);
}}};
if(!U){U=bz;
}X=qx.lang.Function.bind(X,P,U);
var W=P.addListener(Q,X);
return W;
},__storeBinding:function(Y,ba,bb,bc,bd){if(this.__bindings[ba.toHashCode()]===undefined){this.__bindings[ba.toHashCode()]=[];
}this.__bindings[ba.toHashCode()].push([Y,ba,bb,bc,bd]);
},__convertValue:function(G,H,I,J){if(J&&J.converter){var L;

if(H.getModel){L=H.getModel();
}return J.converter(G,L);
}else{var N=this.__getTargetFromChain(H,I);
var O=I.substring(I.lastIndexOf(bu)+1,I.length);
if(N==null){return G;
}var M=qx.Class.getPropertyDefinition(N.constructor,O);
var K=M==null?bz:M.check;
return this.__defaultConversion(G,K);
}},__getEventForProperty:function(ci,cj){var ck=qx.Class.getPropertyDefinition(ci.constructor,cj);

if(ck==null){return null;
}return ck.event;
},__defaultConversion:function(cc,cd){var ce=qx.lang.Type.getClass(cc);
if((ce==bt||ce==bs)&&(cd==bI||cd==bC)){cc=parseInt(cc);
}if((ce==bL||ce==bt||ce==bB)&&cd==bs){cc=cc+bz;
}if((ce==bt||ce==bs)&&(cd==bt||cd==bE)){cc=parseFloat(cc);
}return cc;
},removeBindingFromObject:function(cl,cm){if(cm.type==bP){for(var i=0;i<cm.sources.length;i++){if(cm.sources[i]){cm.sources[i].removeListenerById(cm.listenerIds[i]);
}}for(var i=0;i<cm.targets.length;i++){if(cm.targets[i]){cm.targets[i].removeListenerById(cm.targetListenerIds[i]);
}}}else{cl.removeListenerById(cm);
}var cn=this.__bindings[cl.toHashCode()];
if(cn!=undefined){for(var i=0;i<cn.length;i++){if(cn[i][0]==cm){qx.lang.Array.remove(cn,cn[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(bp){{};
var bq=this.__bindings[bp.toHashCode()];

if(bq!=undefined){for(var i=bq.length-1;i>=0;i--){this.removeBindingFromObject(bp,bq[i][0]);
}}},getAllBindingsForObject:function(n){if(this.__bindings[n.toHashCode()]===undefined){this.__bindings[n.toHashCode()]=[];
}return this.__bindings[n.toHashCode()];
},removeAllBindings:function(){for(var bo in this.__bindings){var bn=qx.core.ObjectRegistry.fromHashCode(bo);
if(bn==null){delete this.__bindings[bo];
continue;
}this.removeAllBindingsForObject(bn);
}this.__bindings={};
},getAllBindings:function(){return this.__bindings;
},showBindingInLog:function(C,D){var F;
for(var i=0;i<this.__bindings[C.toHashCode()].length;i++){if(this.__bindings[C.toHashCode()][i][0]==D){F=this.__bindings[C.toHashCode()][i];
break;
}}
if(F===undefined){var E=bD;
}else{var E=bF+F[1]+bM+F[2]+bJ+F[3]+bM+F[4]+bK;
}qx.log.Logger.debug(E);
},showAllBindingsInLog:function(){for(var b in this.__bindings){var a=qx.core.ObjectRegistry.fromHashCode(b);

for(var i=0;i<this.__bindings[b].length;i++){this.showBindingInLog(a,this.__bindings[b][i][0]);
}}}}});
})();
(function(){var Q="",P="g",O="0",N='\\$1',M="%",L='-',K="qx.lang.String",J=' ',I='\n',H="undefined";
qx.Class.define(K,{statics:{camelCase:function(p){return p.replace(/\-([a-z])/g,function(y,z){return z.toUpperCase();
});
},hyphenate:function(B){return B.replace(/[A-Z]/g,function(A){return (L+A.charAt(0).toLowerCase());
});
},capitalize:function(a){return a.replace(/\b[a-z]/g,function(l){return l.toUpperCase();
});
},clean:function(q){return this.trim(q.replace(/\s+/g,J));
},trimLeft:function(k){return k.replace(/^\s+/,Q);
},trimRight:function(d){return d.replace(/\s+$/,Q);
},trim:function(o){return o.replace(/^\s+|\s+$/g,Q);
},startsWith:function(h,j){return h.indexOf(j)===0;
},endsWith:function(e,f){return e.substring(e.length-f.length,e.length)===f;
},repeat:function(m,n){return m.length>0?new Array(n+1).join(m):Q;
},pad:function(r,length,s){var t=length-r.length;

if(t>0){if(typeof s===H){s=O;
}return this.repeat(s,t)+r;
}else{return r;
}},firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(b,c){return b.indexOf(c)!=-1;
},format:function(v,w){var x=v;

for(var i=0;i<w.length;i++){x=x.replace(new RegExp(M+(i+1),P),w[i]+Q);
}return x;
},escapeRegexpChars:function(g){return g.replace(/([.*+?^${}()|[\]\/\\])/g,N);
},toArray:function(u){return u.split(/\B|\b/g);
},stripTags:function(C){return C.replace(/<\/?[^>]+>/gi,Q);
},stripScripts:function(D,E){var G=Q;
var F=D.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){G+=arguments[1]+I;
return Q;
});

if(E===true){qx.lang.Function.globalEval(G);
}return F;
}}});
})();
(function(){var c="qx.event.type.Data",b="qx.event.type.Event",a="qx.data.IListData";
qx.Interface.define(a,{events:{"change":c,"changeLength":b},members:{getItem:function(f){},setItem:function(d,e){},splice:function(h,i,j){},contains:function(g){},getLength:function(){},toArray:function(){}}});
})();
(function(){var a="qx.lang.Date";
qx.Class.define(a,{statics:{now:function(){return +new Date;
}}});
})();
(function(){var b="",a="qx.core.WindowError";
qx.Bootstrap.define(a,{extend:Error,construct:function(c,d,e){Error.call(this,c);
this.__failMessage=c;
this.__uri=d||b;
this.__lineNumber=e===undefined?-1:e;
},members:{__failMessage:null,__uri:null,__lineNumber:null,toString:function(){return this.__failMessage;
},getUri:function(){return this.__uri;
},getLineNumber:function(){return this.__lineNumber;
}}});
})();
(function(){var b="GlobalError: ",a="qx.core.GlobalError";
qx.Bootstrap.define(a,{extend:Error,construct:function(c,d){{};
this.__failMessage=b+(c&&c.message?c.message:c);
Error.call(this,this.__failMessage);
this.__arguments=d;
this.__exc=c;
},members:{__exc:null,__arguments:null,__failMessage:null,toString:function(){return this.__failMessage;
},getArguments:function(){return this.__arguments;
},getSourceException:function(){return this.__exc;
}},destruct:function(){this.__exc=null;
this.__arguments=null;
this.__failMessage=null;
}});
})();
(function(){var c=": ",b="qx.type.BaseError",a="";
qx.Class.define(b,{extend:Error,construct:function(d,e){Error.call(this,e);
this.__comment=d||a;
this.message=e||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__comment:null,message:null,getComment:function(){return this.__comment;
},toString:function(){return this.__comment+c+this.message;
}}});
})();
(function(){var a="qx.core.AssertionError";
qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);
this.__trace=qx.dev.StackTrace.getStackTrace();
},members:{__trace:null,getStackTrace:function(){return this.__trace;
}}});
})();
(function(){var a="qx.core.ValidationError";
qx.Class.define(a,{extend:qx.type.BaseError});
})();
(function(){var f="qx.lang.Type",e="Error",d="RegExp",c="Date",b="Number",a="Boolean";
qx.Class.define(f,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(j){return this.getClass(j)==d;
},isNumber:function(h){return (h!==null&&(this.getClass(h)==b||h instanceof Number));
},isBoolean:function(i){return (i!==null&&(this.getClass(i)==a||i instanceof Boolean));
},isDate:function(k){return (k!==null&&(this.getClass(k)==c||k instanceof Date));
},isError:function(g){return (g!==null&&(this.getClass(g)==e||g instanceof Error));
}}});
})();
(function(){var e="qx.util.ObjectPool",d="Integer";
qx.Class.define(e,{extend:qx.core.Object,construct:function(f){qx.core.Object.call(this);
this.__pool={};

if(f!=null){this.setSize(f);
}},properties:{size:{check:d,init:Infinity}},members:{__pool:null,getObject:function(k){if(this.$$disposed){return new k;
}
if(!k){throw new Error("Class needs to be defined!");
}var m=null;
var n=this.__pool[k.classname];

if(n){m=n.pop();
}
if(m){m.$$pooled=false;
}else{m=new k;
}return m;
},poolObject:function(g){if(!this.__pool){return;
}var h=g.classname;
var j=this.__pool[h];

if(g.$$pooled){throw new Error("Object is already pooled: "+g);
}
if(!j){this.__pool[h]=j=[];
}if(j.length>this.getSize()){if(g.destroy){g.destroy();
}else{g.dispose();
}return;
}g.$$pooled=true;
j.push(g);
}},destruct:function(){var c=this.__pool;
var a,b,i,l;

for(a in c){b=c[a];

for(i=0,l=b.length;i<l;i++){b[i].dispose();
}}delete this.__pool;
}});
})();
(function(){var b="singleton",a="qx.event.Pool";
qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){qx.util.ObjectPool.call(this,30);
}});
})();
(function(){var d="qx.util.DisposeUtil";
qx.Class.define(d,{statics:{disposeObjects:function(a,b,c){var name;

for(var i=0,l=b.length;i<l;i++){name=b[i];

if(a[name]==null||!a.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(a[name].dispose){if(!c&&a[name].constructor.$$instance){throw new Error("The object stored in key "+name+" is a singleton! Please use disposeSingleton instead.");
}else{a[name].dispose();
}}else{throw new Error("Has no disposable object under key: "+name+"!");
}}a[name]=null;
}},disposeArray:function(m,n){var p=m[n];

if(!p){return;
}if(qx.core.ObjectRegistry.inShutDown){m[n]=null;
return;
}try{var o;

for(var i=p.length-1;i>=0;i--){o=p[i];

if(o){o.dispose();
}}}catch(f){throw new Error("The array field: "+n+" of object: "+m+" has non disposable entries: "+f);
}p.length=0;
m[n]=null;
},disposeMap:function(g,h){var j=g[h];

if(!j){return;
}if(qx.core.ObjectRegistry.inShutDown){g[h]=null;
return;
}try{for(var k in j){if(j.hasOwnProperty(k)){j[k].dispose();
}}}catch(e){throw new Error("The map field: "+h+" of object: "+g+" has non disposable entries: "+e);
}g[h]=null;
},disposeTriggeredBy:function(q,r){var s=r.dispose;
r.dispose=function(){s.call(r);
q.dispose();
};
}}});
})();
(function(){var a="qx.event.handler.Object";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(e,f){return qx.Class.supportsEvent(e.constructor,f);
},registerEvent:function(g,h,i){},unregisterEvent:function(b,c,d){}},defer:function(j){qx.event.Registration.addHandler(j);
}});
})();
(function(){var k="indexOf",j="lastIndexOf",h="slice",g="concat",f="join",e="toLocaleUpperCase",d="shift",c="substr",b="filter",a="unshift",I="match",H="quote",G="qx.lang.Generics",F="localeCompare",E="sort",D="some",C="charAt",B="split",A="substring",z="pop",t="toUpperCase",u="replace",q="push",r="charCodeAt",o="every",p="reverse",m="search",n="forEach",v="map",w="toLowerCase",y="splice",x="toLocaleLowerCase";
qx.Class.define(G,{statics:{__map:{"Array":[f,p,E,q,z,d,a,y,g,h,k,j,n,v,b,D,o],"String":[H,A,w,t,C,r,k,j,x,e,F,I,m,u,B,c,g,h]},__wrap:function(O,P){return function(s){return O.prototype[P].apply(s,Array.prototype.slice.call(arguments,1));
};
},__init:function(){var J=qx.lang.Generics.__map;

for(var N in J){var L=window[N];
var K=J[N];

for(var i=0,l=K.length;i<l;i++){var M=K[i];

if(!L[M]){L[M]=qx.lang.Generics.__wrap(L,M);
}}}}},defer:function(Q){Q.__init();
}});
})();
(function(){var a="qx.event.type.Native";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(g,h,i,j,k){qx.event.type.Event.prototype.init.call(this,j,k);
this._target=h||qx.bom.Event.getTarget(g);
this._relatedTarget=i||qx.bom.Event.getRelatedTarget(g);

if(g.timeStamp){this._timeStamp=g.timeStamp;
}this._native=g;
this._returnValue=null;
return this;
},clone:function(b){var c=qx.event.type.Event.prototype.clone.call(this,b);
var d={};
c._native=this._cloneNativeEvent(this._native,d);
c._returnValue=this._returnValue;
return c;
},_cloneNativeEvent:function(e,f){f.preventDefault=qx.lang.Function.empty;
return f;
},preventDefault:function(){qx.event.type.Event.prototype.preventDefault.call(this);
qx.bom.Event.preventDefault(this._native);
},getNativeEvent:function(){return this._native;
},setReturnValue:function(l){this._returnValue=l;
},getReturnValue:function(){return this._returnValue;
}},destruct:function(){this._native=this._returnValue=null;
}});
})();
(function(){var n="iPod",m="Win32",l="",k="Win64",j="Linux",i="BSD",h="Macintosh",g="iPhone",f="Windows",e="qx.bom.client.Platform",b="iPad",d="X11",c="MacIntel",a="MacPPC";
qx.Class.define(e,{statics:{NAME:"",WIN:false,MAC:false,UNIX:false,UNKNOWN_PLATFORM:false,__init:function(){var o=navigator.platform;
if(o==null||o===l){o=navigator.userAgent;
}
if(o.indexOf(f)!=-1||o.indexOf(m)!=-1||o.indexOf(k)!=-1){this.WIN=true;
this.NAME="win";
}else if(o.indexOf(h)!=-1||o.indexOf(a)!=-1||o.indexOf(c)!=-1||o.indexOf(n)!=-1||o.indexOf(g)!=-1||o.indexOf(b)!=-1){this.MAC=true;
this.NAME="mac";
}else if(o.indexOf(d)!=-1||o.indexOf(j)!=-1||o.indexOf(i)!=-1){this.UNIX=true;
this.NAME="unix";
}else{this.UNKNOWN_PLATFORM=true;
this.WIN=true;
this.NAME="win";
}}},defer:function(p){p.__init();
}});
})();
(function(){var j="win98",i="osx2",h="osx0",g="osx4",f="win95",e="win2000",d="osx1",c="osx5",b="osx3",a="Windows NT 5.01",H=")",G="winxp",F="freebsd",E="sunos",D="SV1",C="|",B="nintendods",A="winnt4",z="wince",y="winme",q="os9",r="\.",o="osx",p="linux",m="netbsd",n="winvista",k="openbsd",l="(",s="win2003",t="symbian",v="win7",u="g",x="qx.bom.client.System",w=" Mobile/";
qx.Class.define(x,{statics:{NAME:"",SP1:false,SP2:false,WIN95:false,WIN98:false,WINME:false,WINNT4:false,WIN2000:false,WINXP:false,WIN2003:false,WINVISTA:false,WIN7:false,WINCE:false,LINUX:false,SUNOS:false,FREEBSD:false,NETBSD:false,OPENBSD:false,OSX:false,OS9:false,SYMBIAN:false,NINTENDODS:false,PSP:false,IPHONE:false,UNKNOWN_SYSTEM:false,__ids:{"Windows NT 6.1":v,"Windows NT 6.0":n,"Windows NT 5.2":s,"Windows NT 5.1":G,"Windows NT 5.0":e,"Windows 2000":e,"Windows NT 4.0":A,"Win 9x 4.90":y,"Windows CE":z,"Windows 98":j,"Win98":j,"Windows 95":f,"Win95":f,"Linux":p,"FreeBSD":F,"NetBSD":m,"OpenBSD":k,"SunOS":E,"Symbian System":t,"Nitro":B,"PSP":"sonypsp","Mac OS X 10_5":c,"Mac OS X 10.5":c,"Mac OS X 10_4":g,"Mac OS X 10.4":g,"Mac OS X 10_3":b,"Mac OS X 10.3":b,"Mac OS X 10_2":i,"Mac OS X 10.2":i,"Mac OS X 10_1":d,"Mac OS X 10.1":d,"Mac OS X 10_0":h,"Mac OS X 10.0":h,"Mac OS X":o,"Mac OS 9":q},__init:function(){var K=navigator.userAgent;
var J=[];

for(var I in this.__ids){J.push(I);
}var L=new RegExp(l+J.join(C).replace(/\./g,r)+H,u);

if(!L.test(K)){this.UNKNOWN_SYSTEM=true;

if(!qx.bom.client.Platform.UNKNOWN_PLATFORM){if(qx.bom.client.Platform.UNIX){this.NAME="linux";
this.LINUX=true;
}else if(qx.bom.client.Platform.MAC){this.NAME="osx5";
this.OSX=true;
}else{this.NAME="winxp";
this.WINXP=true;
}}else{this.NAME="winxp";
this.WINXP=true;
}return;
}
if(qx.bom.client.Engine.WEBKIT&&RegExp(w).test(navigator.userAgent)){this.IPHONE=true;
this.NAME="iphone";
}else{this.NAME=this.__ids[RegExp.$1];
this[this.NAME.toUpperCase()]=true;

if(qx.bom.client.Platform.WIN){if(K.indexOf(a)!==-1){this.SP1=true;
}else if(qx.bom.client.Engine.MSHTML&&K.indexOf(D)!==-1){this.SP2=true;
}}}}},defer:function(M){M.__init();
}});
})();
(function(){var f="_applyTheme",e="qx.theme",d="qx.theme.manager.Meta",c="qx.theme.Modern",b="Theme",a="singleton";
qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:b,nullable:true,apply:f}},members:{_applyTheme:function(j,k){var n=null;
var q=null;
var t=null;
var u=null;
var p=null;

if(j){n=j.meta.color||null;
q=j.meta.decoration||null;
t=j.meta.font||null;
u=j.meta.icon||null;
p=j.meta.appearance||null;
}var r=qx.theme.manager.Color.getInstance();
var s=qx.theme.manager.Decoration.getInstance();
var l=qx.theme.manager.Font.getInstance();
var o=qx.theme.manager.Icon.getInstance();
var m=qx.theme.manager.Appearance.getInstance();
r.setTheme(n);
s.setTheme(q);
l.setTheme(t);
o.setTheme(u);
m.setTheme(p);
},initialize:function(){var h=qx.core.Setting;
var g,i;
g=h.get(e);

if(g){i=qx.Theme.getByName(g);

if(!i){throw new Error("The theme to use is not available: "+g);
}this.setTheme(i);
}}},settings:{"qx.theme":c}});
})();
(function(){var b="qx.util.ValueManager",a="abstract";
qx.Class.define(b,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this._dynamic={};
},members:{_dynamic:null,resolveDynamic:function(f){return this._dynamic[f];
},isDynamic:function(e){return !!this._dynamic[e];
},resolve:function(d){if(d&&this._dynamic[d]){return this._dynamic[d];
}return d;
},_setDynamic:function(c){this._dynamic=c;
},_getDynamic:function(){return this._dynamic;
}},destruct:function(){this._dynamic=null;
}});
})();
(function(){var f="_applyTheme",e="qx.theme.manager.Color",d="Theme",c="changeTheme",b="string",a="singleton";
qx.Class.define(e,{type:a,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:f,event:c}},members:{_applyTheme:function(g){var h={};

if(g){var i=g.colors;
var j=qx.util.ColorUtil;
var k;

for(var l in i){k=i[l];

if(typeof k===b){if(!j.isCssString(k)){throw new Error("Could not parse color: "+k);
}}else if(k instanceof Array){k=j.rgbToRgbString(k);
}else{throw new Error("Could not parse color: "+k);
}h[l]=k;
}}this._setDynamic(h);
},resolve:function(p){var s=this._dynamic;
var q=s[p];

if(q){return q;
}var r=this.getTheme();

if(r!==null&&r.colors[p]){return s[p]=r.colors[p];
}return p;
},isDynamic:function(m){var o=this._dynamic;

if(m&&(o[m]!==undefined)){return true;
}var n=this.getTheme();

if(n!==null&&m&&(n.colors[m]!==undefined)){o[m]=n.colors[m];
return true;
}return false;
}}});
})();
(function(){var R=",",Q="rgb(",P=")",O="qx.theme.manager.Color",N="qx.util.ColorUtil";
qx.Class.define(N,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(M){return this.NAMED[M]!==undefined;
},isSystemColor:function(B){return this.SYSTEM[B]!==undefined;
},supportsThemes:function(){return qx.Class.isDefined(O);
},isThemedColor:function(D){if(!this.supportsThemes()){return false;
}return qx.theme.manager.Color.getInstance().isDynamic(D);
},stringToRgb:function(W){if(this.supportsThemes()&&this.isThemedColor(W)){var W=qx.theme.manager.Color.getInstance().resolveDynamic(W);
}
if(this.isNamedColor(W)){return this.NAMED[W];
}else if(this.isSystemColor(W)){throw new Error("Could not convert system colors to RGB: "+W);
}else if(this.isRgbString(W)){return this.__rgbStringToRgb();
}else if(this.isHex3String(W)){return this.__hex3StringToRgb();
}else if(this.isHex6String(W)){return this.__hex6StringToRgb();
}throw new Error("Could not parse color: "+W);
},cssStringToRgb:function(e){if(this.isNamedColor(e)){return this.NAMED[e];
}else if(this.isSystemColor(e)){throw new Error("Could not convert system colors to RGB: "+e);
}else if(this.isRgbString(e)){return this.__rgbStringToRgb();
}else if(this.isRgbaString(e)){return this.__rgbaStringToRgb();
}else if(this.isHex3String(e)){return this.__hex3StringToRgb();
}else if(this.isHex6String(e)){return this.__hex6StringToRgb();
}throw new Error("Could not parse color: "+e);
},stringToRgbString:function(C){return this.rgbToRgbString(this.stringToRgb(C));
},rgbToRgbString:function(X){return Q+X[0]+R+X[1]+R+X[2]+P;
},rgbToHexString:function(F){return (qx.lang.String.pad(F[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(F[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(F[2].toString(16).toUpperCase(),2));
},isValidPropertyValue:function(bf){return this.isThemedColor(bf)||this.isNamedColor(bf)||this.isHex3String(bf)||this.isHex6String(bf)||this.isRgbString(bf);
},isCssString:function(Y){return this.isSystemColor(Y)||this.isNamedColor(Y)||this.isHex3String(Y)||this.isHex6String(Y)||this.isRgbString(Y);
},isHex3String:function(E){return this.REGEXP.hex3.test(E);
},isHex6String:function(ba){return this.REGEXP.hex6.test(ba);
},isRgbString:function(be){return this.REGEXP.rgb.test(be);
},isRgbaString:function(S){return this.REGEXP.rgba.test(S);
},__rgbStringToRgb:function(){var V=parseInt(RegExp.$1,10);
var U=parseInt(RegExp.$2,10);
var T=parseInt(RegExp.$3,10);
return [V,U,T];
},__rgbaStringToRgb:function(){var k=parseInt(RegExp.$1,10);
var j=parseInt(RegExp.$2,10);
var h=parseInt(RegExp.$3,10);
return [k,j,h];
},__hex3StringToRgb:function(){var bi=parseInt(RegExp.$1,16)*17;
var bh=parseInt(RegExp.$2,16)*17;
var bg=parseInt(RegExp.$3,16)*17;
return [bi,bh,bg];
},__hex6StringToRgb:function(){var bd=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);
var bc=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);
var bb=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);
return [bd,bc,bb];
},hex3StringToRgb:function(d){if(this.isHex3String(d)){return this.__hex3StringToRgb(d);
}throw new Error("Invalid hex3 value: "+d);
},hex6StringToRgb:function(c){if(this.isHex6String(c)){return this.__hex6StringToRgb(c);
}throw new Error("Invalid hex6 value: "+c);
},hexStringToRgb:function(a){if(this.isHex3String(a)){return this.__hex3StringToRgb(a);
}
if(this.isHex6String(a)){return this.__hex6StringToRgb(a);
}throw new Error("Invalid hex value: "+a);
},rgbToHsb:function(l){var n,o,u;
var A=l[0];
var x=l[1];
var m=l[2];
var z=(A>x)?A:x;

if(m>z){z=m;
}var s=(A<x)?A:x;

if(m<s){s=m;
}u=z/255.0;

if(z!=0){o=(z-s)/z;
}else{o=0;
}
if(o==0){n=0;
}else{var w=(z-A)/(z-s);
var y=(z-x)/(z-s);
var v=(z-m)/(z-s);

if(A==z){n=v-y;
}else if(x==z){n=2.0+w-v;
}else{n=4.0+y-w;
}n=n/6.0;

if(n<0){n=n+1.0;
}}return [Math.round(n*360),Math.round(o*100),Math.round(u*100)];
},hsbToRgb:function(G){var i,f,p,q,t;
var H=G[0]/360;
var I=G[1]/100;
var J=G[2]/100;

if(H>=1.0){H%=1.0;
}
if(I>1.0){I=1.0;
}
if(J>1.0){J=1.0;
}var K=Math.floor(255*J);
var L={};

if(I==0.0){L.red=L.green=L.blue=K;
}else{H*=6.0;
i=Math.floor(H);
f=H-i;
p=Math.floor(K*(1.0-I));
q=Math.floor(K*(1.0-(I*f)));
t=Math.floor(K*(1.0-(I*(1.0-f))));

switch(i){case 0:L.red=K;
L.green=t;
L.blue=p;
break;
case 1:L.red=q;
L.green=K;
L.blue=p;
break;
case 2:L.red=p;
L.green=K;
L.blue=t;
break;
case 3:L.red=p;
L.green=q;
L.blue=K;
break;
case 4:L.red=t;
L.green=p;
L.blue=K;
break;
case 5:L.red=K;
L.green=p;
L.blue=q;
break;
}}return [L.red,L.green,L.blue];
},randomColor:function(){var r=Math.round(Math.random()*255);
var g=Math.round(Math.random()*255);
var b=Math.round(Math.random()*255);
return this.rgbToRgbString([r,g,b]);
}}});
})();
(function(){var h="object",g="__dynamic",f="_applyTheme",e="qx.theme.manager.Decoration",d="Theme",c="changeTheme",b="string",a="singleton";
qx.Class.define(e,{type:a,extend:qx.core.Object,properties:{theme:{check:d,nullable:true,apply:f,event:c}},members:{__dynamic:null,resolve:function(q){if(!q){return null;
}
if(typeof q===h){return q;
}var t=this.getTheme();

if(!t){return null;
}var t=this.getTheme();

if(!t){return null;
}var u=this.__dynamic;

if(!u){u=this.__dynamic={};
}var r=u[q];

if(r){return r;
}var s=t.decorations[q];

if(!s){return null;
}var v=s.decorator;

if(v==null){throw new Error("Missing definition of which decorator to use in entry: "+q+"!");
}return u[q]=(new v).set(s.style);
},isValidPropertyValue:function(i){if(typeof i===b){return this.isDynamic(i);
}else if(typeof i===h){var j=i.constructor;
return qx.Class.hasInterface(j,qx.ui.decoration.IDecorator);
}return false;
},isDynamic:function(k){if(!k){return false;
}var l=this.getTheme();

if(!l){return false;
}return !!l.decorations[k];
},_applyTheme:function(m,n){var p=qx.util.AliasManager.getInstance();

if(n){for(var o in n.aliases){p.remove(o);
}}
if(m){for(var o in m.aliases){p.add(o,m.aliases[o]);
}}
if(!m){this.__dynamic={};
}}},destruct:function(){this._disposeMap(g);
}});
})();
(function(){var a="qx.ui.decoration.IDecorator";
qx.Interface.define(a,{members:{getMarkup:function(){},resize:function(b,c,d){},tint:function(e,f){},getInsets:function(){}}});
})();
(function(){var j="/",i="0",h="qx/static",g="http://",f="https://",e="file://",d="qx.util.AliasManager",c="singleton",b=".",a="static";
qx.Class.define(d,{type:c,extend:qx.util.ValueManager,construct:function(){qx.util.ValueManager.call(this);
this.__aliases={};
this.add(a,h);
},members:{__aliases:null,_preprocess:function(k){var n=this._getDynamic();

if(n[k]===false){return k;
}else if(n[k]===undefined){if(k.charAt(0)===j||k.charAt(0)===b||k.indexOf(g)===0||k.indexOf(f)===i||k.indexOf(e)===0){n[k]=false;
return k;
}
if(this.__aliases[k]){return this.__aliases[k];
}var m=k.substring(0,k.indexOf(j));
var l=this.__aliases[m];

if(l!==undefined){n[k]=l+k.substring(m.length);
}}return k;
},add:function(r,s){this.__aliases[r]=s;
var u=this._getDynamic();
for(var t in u){if(t.substring(0,t.indexOf(j))===r){u[t]=s+t.substring(r.length);
}}},remove:function(q){delete this.__aliases[q];
},resolve:function(o){var p=this._getDynamic();

if(o!=null){o=this._preprocess(o);
}return p[o]||o;
}},destruct:function(){this.__aliases=null;
}});
})();
(function(){var e="qx.theme.manager.Font",d="Theme",c="changeTheme",b="_applyTheme",a="singleton";
qx.Class.define(e,{type:a,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:b,event:c}},members:{resolveDynamic:function(u){var v=this._dynamic;
return u instanceof qx.bom.Font?u:v[u];
},resolve:function(n){var q=this._dynamic;
var o=q[n];

if(o){return o;
}var p=this.getTheme();

if(p!==null&&p.fonts[n]){return q[n]=(new qx.bom.Font).set(p.fonts[n]);
}return n;
},isDynamic:function(r){var t=this._dynamic;

if(r&&(r instanceof qx.bom.Font||t[r]!==undefined)){return true;
}var s=this.getTheme();

if(s!==null&&r&&s.fonts[r]){t[r]=(new qx.bom.Font).set(s.fonts[r]);
return true;
}return false;
},__resolveInclude:function(f,g){if(f[g].include){var h=f[f[g].include];
f[g].include=null;
delete f[g].include;
f[g]=qx.lang.Object.mergeWith(f[g],h,false);
this.__resolveInclude(f,g);
}},_applyTheme:function(i){var j=this._getDynamic();

for(var m in j){if(j[m].themed){j[m].dispose();
delete j[m];
}}
if(i){var k=i.fonts;
var l=qx.bom.Font;

for(var m in k){if(k[m].include&&k[k[m].include]){this.__resolveInclude(k,m);
}j[m]=(new l).set(k[m]);
j[m].themed=true;
}}this._setDynamic(j);
}}});
})();
(function(){var k="",j="underline",h="Boolean",g="px",f='"',e="italic",d="normal",c="bold",b="_applyItalic",a="_applyBold",x="Integer",w="_applyFamily",v="_applyLineHeight",u="Array",t="overline",s="line-through",r="qx.bom.Font",q="Number",p="_applyDecoration",o=" ",m="_applySize",n=",";
qx.Class.define(r,{extend:qx.core.Object,construct:function(L,M){qx.core.Object.call(this);

if(L!==undefined){this.setSize(L);
}
if(M!==undefined){this.setFamily(M);
}},statics:{fromString:function(N){var R=new qx.bom.Font();
var P=N.split(/\s+/);
var name=[];
var Q;

for(var i=0;i<P.length;i++){switch(Q=P[i]){case c:R.setBold(true);
break;
case e:R.setItalic(true);
break;
case j:R.setDecoration(j);
break;
default:var O=parseInt(Q,10);

if(O==Q||qx.lang.String.contains(Q,g)){R.setSize(O);
}else{name.push(Q);
}break;
}}
if(name.length>0){R.setFamily(name);
}return R;
},fromConfig:function(J){var K=new qx.bom.Font;
K.set(J);
return K;
},__defaultStyles:{fontFamily:k,fontSize:k,fontWeight:k,fontStyle:k,textDecoration:k,lineHeight:1.2},getDefaultStyles:function(){return this.__defaultStyles;
}},properties:{size:{check:x,nullable:true,apply:m},lineHeight:{check:q,nullable:true,apply:v},family:{check:u,nullable:true,apply:w},bold:{check:h,nullable:true,apply:a},italic:{check:h,nullable:true,apply:b},decoration:{check:[j,s,t],nullable:true,apply:p}},members:{__size:null,__family:null,__bold:null,__italic:null,__decoration:null,__lineHeight:null,_applySize:function(C,D){this.__size=C===null?null:C+g;
},_applyLineHeight:function(H,I){this.__lineHeight=H===null?null:H;
},_applyFamily:function(E,F){var G=k;

for(var i=0,l=E.length;i<l;i++){if(E[i].indexOf(o)>0){G+=f+E[i]+f;
}else{G+=E[i];
}
if(i!==l-1){G+=n;
}}this.__family=G;
},_applyBold:function(S,T){this.__bold=S===null?null:S?c:d;
},_applyItalic:function(A,B){this.__italic=A===null?null:A?e:d;
},_applyDecoration:function(y,z){this.__decoration=y===null?null:y;
},getStyles:function(){return {fontFamily:this.__family,fontSize:this.__size,fontWeight:this.__bold,fontStyle:this.__italic,textDecoration:this.__decoration,lineHeight:this.__lineHeight};
}}});
})();
(function(){var b="CSS1Compat",a="qx.bom.client.Feature";
qx.Class.define(a,{statics:{STANDARD_MODE:false,QUIRKS_MODE:false,CONTENT_BOX:false,BORDER_BOX:false,SVG:false,CANVAS:!!window.CanvasRenderingContext2D,VML:false,XPATH:!!document.evaluate,AIR:navigator.userAgent.indexOf("adobeair")!==-1,GEARS:!!(window.google&&window.google.gears),SSL:window.location.protocol==="https:",ECMA_OBJECT_COUNT:(({}).__count__==0),CSS_POINTER_EVENTS:"pointerEvents" in document.documentElement.style,HTML5_CLASSLIST:(document.documentElement.classList&&qx.Bootstrap.getClass(document.documentElement.classList)==="DOMTokenList"),__init:function(){this.QUIRKS_MODE=this.__isQuirksMode();
this.STANDARD_MODE=!this.QUIRKS_MODE;
this.CONTENT_BOX=!qx.bom.client.Engine.MSHTML||this.STANDARD_MODE;
this.BORDER_BOX=!this.CONTENT_BOX;
this.SVG=document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature("org.w3c.dom.svg","1.0")||document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"));
this.VML=qx.bom.client.Engine.MSHTML;
},__isQuirksMode:function(){if(qx.bom.client.Engine.MSHTML&&qx.bom.client.Engine.VERSION>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return document.compatMode!==b;
}}},defer:function(c){c.__init();
}});
})();
(function(){var d="qx.lang.Object";
qx.Class.define(d,{statics:{empty:function(t){{};

for(var u in t){if(t.hasOwnProperty(u)){delete t[u];
}}},isEmpty:(qx.bom.client.Feature.ECMA_OBJECT_COUNT)?
function(e){{};
return e.__count__===0;
}:
function(A){{};

for(var B in A){return false;
}return true;
},hasMinLength:(qx.bom.client.Feature.ECMA_OBJECT_COUNT)?
function(h,j){{};
return h.__count__>=j;
}:
function(H,I){{};

if(I<=0){return true;
}var length=0;

for(var J in H){if((++length)>=I){return true;
}}return false;
},getLength:qx.Bootstrap.objectGetLength,getKeys:qx.Bootstrap.getKeys,getKeysAsString:qx.Bootstrap.getKeysAsString,getValues:function(C){{};
var E=[];
var D=this.getKeys(C);

for(var i=0,l=D.length;i<l;i++){E.push(C[D[i]]);
}return E;
},mergeWith:qx.Bootstrap.objectMergeWith,carefullyMergeWith:function(r,s){{};
return qx.lang.Object.mergeWith(r,s,false);
},merge:function(o,p){{};
var q=arguments.length;

for(var i=1;i<q;i++){qx.lang.Object.mergeWith(o,arguments[i]);
}return o;
},clone:function(v){{};
var w={};

for(var x in v){w[x]=v[x];
}return w;
},invert:function(k){{};
var m={};

for(var n in k){m[k[n].toString()]=n;
}return m;
},getKeyFromValue:function(a,b){{};

for(var c in a){if(a.hasOwnProperty(c)&&a[c]===b){return c;
}}return null;
},contains:function(f,g){{};
return this.getKeyFromValue(f,g)!==null;
},select:function(F,G){{};
return G[F];
},fromArray:function(y){{};
var z={};

for(var i=0,l=y.length;i<l;i++){{};
z[y[i].toString()]=true;
}return z;
}}});
})();
(function(){var e="qx.theme.manager.Icon",d="Theme",c="changeTheme",b="_applyTheme",a="singleton";
qx.Class.define(e,{type:a,extend:qx.core.Object,properties:{theme:{check:d,nullable:true,apply:b,event:c}},members:{_applyTheme:function(f,g){var i=qx.util.AliasManager.getInstance();

if(g){for(var h in g.aliases){i.remove(h);
}}
if(f){for(var h in f.aliases){i.add(h,f.aliases[h]);
}}}}});
})();
(function(){var h="string",g="_applyTheme",f="qx.theme.manager.Appearance",e=":",d="Theme",c="changeTheme",b="/",a="singleton";
qx.Class.define(f,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__styleCache={};
this.__aliasMap={};
},properties:{theme:{check:d,nullable:true,event:c,apply:g}},members:{__defaultStates:{},__styleCache:null,__aliasMap:null,_applyTheme:function(K,L){this.__aliasMap={};
this.__styleCache={};
},__resolveId:function(i,j,k){var o=j.appearances;
var r=o[i];

if(!r){var s=b;
var l=[];
var q=i.split(s);
var p;

while(!r&&q.length>0){l.unshift(q.pop());
var m=q.join(s);
r=o[m];

if(r){p=r.alias||r;

if(typeof p===h){var n=p+s+l.join(s);
return this.__resolveId(n,j,k);
}}}if(k!=null){return this.__resolveId(k,j);
}return null;
}else if(typeof r===h){return this.__resolveId(r,j,k);
}else if(r.include&&!r.style){return this.__resolveId(r.include,j,k);
}return i;
},styleFrom:function(t,u,v,w){if(!v){v=this.getTheme();
}var C=this.__aliasMap;
var x=C[t];

if(!x){x=C[t]=this.__resolveId(t,v,w);
}var H=v.appearances[x];

if(!H){this.warn("Missing appearance: "+t);
return null;
}if(!H.style){return null;
}var I=x;

if(u){var J=H.$$bits;

if(!J){J=H.$$bits={};
H.$$length=0;
}var A=0;

for(var D in u){if(!u[D]){continue;
}
if(J[D]==null){J[D]=1<<H.$$length++;
}A+=J[D];
}if(A>0){I+=e+A;
}}var B=this.__styleCache;

if(B[I]!==undefined){return B[I];
}if(!u){u=this.__defaultStates;
}var F;
if(H.include||H.base){var z=H.style(u);
var y;

if(H.include){y=this.styleFrom(H.include,u,v,w);
}F={};
if(H.base){var E=this.styleFrom(x,u,H.base,w);

if(H.include){for(var G in E){if(!y.hasOwnProperty(G)&&!z.hasOwnProperty(G)){F[G]=E[G];
}}}else{for(var G in E){if(!z.hasOwnProperty(G)){F[G]=E[G];
}}}}if(H.include){for(var G in y){if(!z.hasOwnProperty(G)){F[G]=y[G];
}}}for(var G in z){F[G]=z[G];
}}else{F=H.style(u);
}return B[I]=F||null;
}},destruct:function(){this.__styleCache=this.__aliasMap=null;
}});
})();
(function(){var q="other",p="widgets",o="fonts",n="appearances",m="qx.Theme",k="]",j="[Theme ",h="colors",g="decorations",f="Theme",c="meta",e="borders",d="icons";
qx.Bootstrap.define(m,{statics:{define:function(name,A){if(!A){var A={};
}A.include=this.__normalizeArray(A.include);
A.patch=this.__normalizeArray(A.patch);
{};
var B={$$type:f,name:name,title:A.title,toString:this.genericToString};
if(A.extend){B.supertheme=A.extend;
}B.basename=qx.Bootstrap.createNamespace(name,B);
this.__convert(B,A);
this.__initializeAliases(B,A);
this.$$registry[name]=B;
for(var i=0,a=A.include,l=a.length;i<l;i++){this.include(B,a[i]);
}
for(var i=0,a=A.patch,l=a.length;i<l;i++){this.patch(B,a[i]);
}},__normalizeArray:function(b){if(!b){return [];
}
if(qx.Bootstrap.isArray(b)){return b;
}else{return [b];
}},__initializeAliases:function(r,s){var t=s.aliases||{};

if(s.extend&&s.extend.aliases){qx.Bootstrap.objectMergeWith(t,s.extend.aliases,false);
}r.aliases=t;
},getAll:function(){return this.$$registry;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},genericToString:function(){return j+this.name+k;
},__extractType:function(P){for(var i=0,Q=this.__inheritableKeys,l=Q.length;i<l;i++){if(P[Q[i]]){return Q[i];
}}},__convert:function(I,J){var M=this.__extractType(J);
if(J.extend&&!M){M=J.extend.type;
}I.type=M||q;
if(!M){return;
}var O=function(){};
if(J.extend){O.prototype=new J.extend.$$clazz;
}var N=O.prototype;
var L=J[M];
for(var K in L){N[K]=L[K];
if(N[K].base){{};
N[K].base=J.extend;
}}I.$$clazz=O;
I[M]=new O;
},$$registry:{},__inheritableKeys:[h,e,g,o,d,p,n,c],__allowedKeys:null,__metaKeys:null,__validateConfig:function(){},patch:function(C,D){var F=this.__extractType(D);

if(F!==this.__extractType(C)){throw new Error("The mixins '"+C.name+"' are not compatible '"+D.name+"'!");
}var E=D[F];
var G=C.$$clazz.prototype;

for(var H in E){G[H]=E[H];
}},include:function(u,v){var x=v.type;

if(x!==u.type){throw new Error("The mixins '"+u.name+"' are not compatible '"+v.name+"'!");
}var w=v[x];
var y=u.$$clazz.prototype;

for(var z in w){if(y[z]!==undefined){continue;
}y[z]=w[z];
}}}});
})();
(function(){var w="Boolean",v="focusout",u="interval",t="mouseover",s="mouseout",r="mousemove",q="widget",p="Use isShowInvalidToolTips() instead.",o="qx.ui.tooltip.ToolTip",n="Use setShowInvalidToolTips() instead.",g="Use initShowInvalidToolTips() instead.",m="Use resetShowInvalidToolTips() instead.",j="__showTimer",d="_applyCurrent",c="__hideTimer",i="qx.ui.tooltip.Manager",h="__sharedToolTip",k="tooltip-error",b="Use toggleShowInvalidToolTips() instead.",l="singleton",f="Use getShowInvalidToolTips() instead.";
qx.Class.define(i,{type:l,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
qx.event.Registration.addListener(document.body,t,this.__onMouseOverRoot,this,true);
this.__showTimer=new qx.event.Timer();
this.__showTimer.addListener(u,this.__onShowInterval,this);
this.__hideTimer=new qx.event.Timer();
this.__hideTimer.addListener(u,this.__onHideInterval,this);
this.__mousePosition={left:0,top:0};
},properties:{current:{check:o,nullable:true,apply:d},showInvalidToolTips:{check:w,init:true},showToolTips:{check:w,init:true}},members:{__mousePosition:null,__hideTimer:null,__showTimer:null,__sharedToolTip:null,__sharedErrorToolTip:null,__getSharedTooltip:function(){if(!this.__sharedToolTip){this.__sharedToolTip=new qx.ui.tooltip.ToolTip().set({rich:true});
}return this.__sharedToolTip;
},__getSharedErrorTooltip:function(){if(!this.__sharedErrorToolTip){this.__sharedErrorToolTip=new qx.ui.tooltip.ToolTip().set({appearance:k});
this.__sharedErrorToolTip.syncAppearance();
}return this.__sharedErrorToolTip;
},_applyCurrent:function(y,z){if(z&&qx.ui.core.Widget.contains(z,y)){return;
}if(z){if(!z.isDisposed()){z.exclude();
}this.__showTimer.stop();
this.__hideTimer.stop();
}var B=qx.event.Registration;
var A=document.body;
if(y){this.__showTimer.startWith(y.getShowTimeout());
B.addListener(A,s,this.__onMouseOutRoot,this,true);
B.addListener(A,v,this.__onFocusOutRoot,this,true);
B.addListener(A,r,this.__onMouseMoveRoot,this,true);
}else{B.removeListener(A,s,this.__onMouseOutRoot,this,true);
B.removeListener(A,v,this.__onFocusOutRoot,this,true);
B.removeListener(A,r,this.__onMouseMoveRoot,this,true);
}},__onShowInterval:function(e){var x=this.getCurrent();

if(x&&!x.isDisposed()){this.__hideTimer.startWith(x.getHideTimeout());

if(x.getPlaceMethod()==q){x.placeToWidget(x.getOpener());
}else{x.placeToPoint(this.__mousePosition);
}x.show();
}this.__showTimer.stop();
},__onHideInterval:function(e){var a=this.getCurrent();

if(a&&!a.isDisposed()){a.exclude();
}this.__hideTimer.stop();
this.resetCurrent();
},__onMouseMoveRoot:function(e){var G=this.__mousePosition;
G.left=e.getDocumentLeft();
G.top=e.getDocumentTop();
},__onMouseOverRoot:function(e){var J=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!J){return;
}var K,L,I,H;
while(J!=null){K=J.getToolTip();
L=J.getToolTipText()||null;
I=J.getToolTipIcon()||null;

if(qx.Class.hasInterface(J.constructor,qx.ui.form.IForm)&&!J.isValid()){H=J.getInvalidMessage();
}
if(K||L||I||H){break;
}J=J.getLayoutParent();
}if(!J||
!J.getEnabled()||
J.isBlockToolTip()||
(!H&&!this.getShowToolTips())||(H&&!this.getShowInvalidToolTips())){return;
}
if(H){K=this.__getSharedErrorTooltip().set({label:H});
}
if(!K){K=this.__getSharedTooltip().set({label:L,icon:I});
}this.setCurrent(K);
K.setOpener(J);
},__onMouseOutRoot:function(e){var D=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!D){return;
}var E=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());

if(!E){return;
}var F=this.getCurrent();
if(F&&(E==F||qx.ui.core.Widget.contains(F,E))){return;
}if(E&&D&&qx.ui.core.Widget.contains(D,E)){return;
}if(F&&!E){this.setCurrent(null);
}else{this.resetCurrent();
}},__onFocusOutRoot:function(e){var M=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!M){return;
}var N=this.getCurrent();
if(N&&N==M.getToolTip()){this.setCurrent(null);
}},setShowInvalidTooltips:function(C){qx.log.Logger.deprecatedMethodWarning(arguments.callee,n);
return this.setShowInvalidToolTips(C);
},getShowInvalidTooltips:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,f);
return this.getShowInvalidToolTips();
},resetShowInvalidTooltips:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,m);
return this.resetShowInvalidToolTips();
},isShowInvalidTooltips:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,p);
return this.isShowInvalidToolTips();
},toggleShowInvalidTooltips:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,b);
return this.toggleShowInvalidToolTips();
},initShowInvalidTooltips:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,g);
return this.initShowInvalidToolTips();
}},destruct:function(){qx.event.Registration.removeListener(document.body,t,this.__onMouseOverRoot,this,true);
this._disposeObjects(j,c,h);
this.__mousePosition=null;
}});
})();
(function(){var h="interval",g="qx.event.Timer",f="_applyInterval",d="_applyEnabled",c="Boolean",b="qx.event.type.Event",a="Integer";
qx.Class.define(g,{extend:qx.core.Object,construct:function(n){qx.core.Object.call(this);
this.setEnabled(false);

if(n!=null){this.setInterval(n);
}var self=this;
this.__oninterval=function(){self._oninterval.call(self);
};
},events:{"interval":b},statics:{once:function(o,p,q){var r=new qx.event.Timer(q);
r.__onceFunc=o;
r.addListener(h,function(e){r.stop();
o.call(p,e);
r.dispose();
p=null;
},p);
r.start();
return r;
}},properties:{enabled:{init:true,check:c,apply:d},interval:{check:a,init:1000,apply:f}},members:{__intervalHandler:null,__oninterval:null,_applyInterval:function(l,m){if(this.getEnabled()){this.restart();
}},_applyEnabled:function(j,k){if(k){window.clearInterval(this.__intervalHandler);
this.__intervalHandler=null;
}else if(j){this.__intervalHandler=window.setInterval(this.__oninterval,this.getInterval());
}},start:function(){this.setEnabled(true);
},startWith:function(s){this.setInterval(s);
this.start();
},stop:function(){this.setEnabled(false);
},restart:function(){this.stop();
this.start();
},restartWith:function(i){this.stop();
this.startWith(i);
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.$$disposed){return;
}
if(this.getEnabled()){this.fireEvent(h);
}})},destruct:function(){if(this.__intervalHandler){window.clearInterval(this.__intervalHandler);
}this.__intervalHandler=this.__oninterval=null;
}});
})();
(function(){var a="qx.ui.core.MChildrenHandling";
qx.Mixin.define(a,{members:{getChildren:function(){return this._getChildren();
},hasChildren:function(){return this._hasChildren();
},indexOf:function(k){return this._indexOf(k);
},add:function(l,m){this._add(l,m);
},addAt:function(d,e,f){this._addAt(d,e,f);
},addBefore:function(n,o,p){this._addBefore(n,o,p);
},addAfter:function(g,h,i){this._addAfter(g,h,i);
},remove:function(b){this._remove(b);
},removeAt:function(j){return this._removeAt(j);
},removeAll:function(){this._removeAll();
}},statics:{remap:function(c){c.getChildren=c._getChildren;
c.hasChildren=c._hasChildren;
c.indexOf=c._indexOf;
c.add=c._add;
c.addAt=c._addAt;
c.addBefore=c._addBefore;
c.addAfter=c._addAfter;
c.remove=c._remove;
c.removeAt=c._removeAt;
c.removeAll=c._removeAll;
}}});
})();
(function(){var a="qx.ui.core.MLayoutHandling";
qx.Mixin.define(a,{members:{setLayout:function(c){return this._setLayout(c);
},getLayout:function(){return this._getLayout();
}},statics:{remap:function(b){b.getLayout=b._getLayout;
b.setLayout=b._setLayout;
}}});
})();
(function(){var r="Integer",q="_applyDimension",p="Boolean",o="_applyStretching",n="_applyMargin",m="shorthand",l="_applyAlign",k="allowShrinkY",j="bottom",i="baseline",F="marginBottom",E="qx.ui.core.LayoutItem",D="center",C="marginTop",B="allowGrowX",A="middle",z="marginLeft",y="allowShrinkX",x="top",w="right",u="marginRight",v="abstract",s="allowGrowY",t="left";
qx.Class.define(E,{type:v,extend:qx.core.Object,properties:{minWidth:{check:r,nullable:true,apply:q,init:null,themeable:true},width:{check:r,nullable:true,apply:q,init:null,themeable:true},maxWidth:{check:r,nullable:true,apply:q,init:null,themeable:true},minHeight:{check:r,nullable:true,apply:q,init:null,themeable:true},height:{check:r,nullable:true,apply:q,init:null,themeable:true},maxHeight:{check:r,nullable:true,apply:q,init:null,themeable:true},allowGrowX:{check:p,apply:o,init:true,themeable:true},allowShrinkX:{check:p,apply:o,init:true,themeable:true},allowGrowY:{check:p,apply:o,init:true,themeable:true},allowShrinkY:{check:p,apply:o,init:true,themeable:true},allowStretchX:{group:[B,y],mode:m,themeable:true},allowStretchY:{group:[s,k],mode:m,themeable:true},marginTop:{check:r,init:0,apply:n,themeable:true},marginRight:{check:r,init:0,apply:n,themeable:true},marginBottom:{check:r,init:0,apply:n,themeable:true},marginLeft:{check:r,init:0,apply:n,themeable:true},margin:{group:[C,u,F,z],mode:m,themeable:true},alignX:{check:[t,D,w],nullable:true,apply:l,themeable:true},alignY:{check:[x,A,j,i],nullable:true,apply:l,themeable:true}},members:{__computedHeightForWidth:null,__computedLayout:null,__hasInvalidLayout:null,__sizeHint:null,__updateMargin:null,__userBounds:null,__layoutProperties:null,getBounds:function(){return this.__userBounds||this.__computedLayout||null;
},clearSeparators:function(){},renderSeparator:function(bc,bd){},renderLayout:function(U,top,V,W){var X;
{};
var Y=null;

if(this.getHeight()==null&&this._hasHeightForWidth()){var Y=this._getHeightForWidth(V);
}
if(Y!=null&&Y!==this.__computedHeightForWidth){this.__computedHeightForWidth=Y;
qx.ui.core.queue.Layout.add(this);
return null;
}var bb=this.__computedLayout;

if(!bb){bb=this.__computedLayout={};
}var ba={};

if(U!==bb.left||top!==bb.top){ba.position=true;
bb.left=U;
bb.top=top;
}
if(V!==bb.width||W!==bb.height){ba.size=true;
bb.width=V;
bb.height=W;
}if(this.__hasInvalidLayout){ba.local=true;
delete this.__hasInvalidLayout;
}
if(this.__updateMargin){ba.margin=true;
delete this.__updateMargin;
}return ba;
},isExcluded:function(){return false;
},hasValidLayout:function(){return !this.__hasInvalidLayout;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutCache:function(){this.__hasInvalidLayout=true;
this.__sizeHint=null;
},getSizeHint:function(S){var T=this.__sizeHint;

if(T){return T;
}
if(S===false){return null;
}T=this.__sizeHint=this._computeSizeHint();
if(this._hasHeightForWidth()&&this.__computedHeightForWidth&&this.getHeight()==null){T.height=this.__computedHeightForWidth;
}if(T.minWidth>T.width){T.width=T.minWidth;
}
if(T.maxWidth<T.width){T.width=T.maxWidth;
}
if(!this.getAllowGrowX()){T.maxWidth=T.width;
}
if(!this.getAllowShrinkX()){T.minWidth=T.width;
}if(T.minHeight>T.height){T.height=T.minHeight;
}
if(T.maxHeight<T.height){T.height=T.maxHeight;
}
if(!this.getAllowGrowY()){T.maxHeight=T.height;
}
if(!this.getAllowShrinkY()){T.minHeight=T.height;
}return T;
},_computeSizeHint:function(){var K=this.getMinWidth()||0;
var H=this.getMinHeight()||0;
var L=this.getWidth()||K;
var J=this.getHeight()||H;
var G=this.getMaxWidth()||Infinity;
var I=this.getMaxHeight()||Infinity;
return {minWidth:K,width:L,maxWidth:G,minHeight:H,height:J,maxHeight:I};
},_hasHeightForWidth:function(){var R=this._getLayout();

if(R){return R.hasHeightForWidth();
}return false;
},_getHeightForWidth:function(g){var h=this._getLayout();

if(h&&h.hasHeightForWidth()){return h.getHeightForWidth(g);
}return null;
},_getLayout:function(){return null;
},_applyMargin:function(){this.__updateMargin=true;
var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyAlign:function(){var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyDimension:function(){qx.ui.core.queue.Layout.add(this);
},_applyStretching:function(){qx.ui.core.queue.Layout.add(this);
},hasUserBounds:function(){return !!this.__userBounds;
},setUserBounds:function(M,top,N,O){this.__userBounds={left:M,top:top,width:N,height:O};
qx.ui.core.queue.Layout.add(this);
},resetUserBounds:function(){delete this.__userBounds;
qx.ui.core.queue.Layout.add(this);
},__emptyProperties:{},setLayoutProperties:function(a){if(a==null){return;
}var b=this.__layoutProperties;

if(!b){b=this.__layoutProperties={};
}var parent=this.getLayoutParent();

if(parent){parent.updateLayoutProperties(a);
}for(var c in a){if(a[c]==null){delete b[c];
}else{b[c]=a[c];
}}},getLayoutProperties:function(){return this.__layoutProperties||this.__emptyProperties;
},clearLayoutProperties:function(){delete this.__layoutProperties;
},updateLayoutProperties:function(d){var e=this._getLayout();

if(e){var f;
{};
e.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},getApplicationRoot:function(){return qx.core.Init.getApplication().getRoot();
},getLayoutParent:function(){return this.$$parent||null;
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}this.$$parent=parent||null;
qx.ui.core.queue.Visibility.add(this);
},isRootWidget:function(){return false;
},_getRoot:function(){var parent=this;

while(parent){if(parent.isRootWidget()){return parent;
}parent=parent.$$parent;
}return null;
},clone:function(){var P=qx.core.Object.prototype.clone.call(this);
var Q=this.__layoutProperties;

if(Q){P.__layoutProperties=qx.lang.Object.clone(Q);
}return P;
}},destruct:function(){this.$$parent=this.$$subparent=this.__layoutProperties=this.__computedLayout=this.__userBounds=this.__sizeHint=null;
}});
})();
(function(){var e="qx.ui.core.DecoratorFactory";
qx.Class.define(e,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__pool={};
},statics:{MAX_SIZE:15,__NO_POOL_ID:"$$nopool$$"},members:{__pool:null,getDecoratorElement:function(i){var n=qx.ui.core.DecoratorFactory;

if(qx.lang.Type.isString(i)){var l=i;
var k=qx.theme.manager.Decoration.getInstance().resolve(i);
}else{var l=n.__NO_POOL_ID;
k=i;
}var m=this.__pool;

if(m[l]&&m[l].length>0){var j=m[l].pop();
}else{var j=this._createDecoratorElement(k,l);
}j.$$pooled=false;
return j;
},poolDecorator:function(a){if(!a||a.$$pooled||a.isDisposed()){return;
}var d=qx.ui.core.DecoratorFactory;
var b=a.getId();

if(b==d.__NO_POOL_ID){a.dispose();
return;
}var c=this.__pool;

if(!c[b]){c[b]=[];
}
if(c[b].length>d.MAX_SIZE){a.dispose();
}else{a.$$pooled=true;
c[b].push(a);
}},_createDecoratorElement:function(f,g){var h=new qx.html.Decorator(f,g);
{};
return h;
},toString:function(){return qx.core.Object.prototype.toString.call(this);
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){var p=this.__pool;

for(var o in p){qx.util.DisposeUtil.disposeArray(p,o);
}}this.__pool=null;
}});
})();
(function(){var di="px",dh="Boolean",dg="qx.event.type.Mouse",df="qx.event.type.Drag",de="visible",dd="qx.event.type.Focus",dc="on",db="Integer",da="excluded",cY="qx.event.type.Data",cK="_applyPadding",cJ="qx.event.type.Event",cI="hidden",cH="contextmenu",cG="String",cF="tabIndex",cE="backgroundColor",cD="focused",cC="changeVisibility",cB="mshtml",dq="hovered",dr="qx.event.type.KeySequence",dn="qx.client",dp="absolute",dl="drag",dm="div",dj="disabled",dk="move",ds="dragstart",dt="qx.dynlocale",cR="dragchange",cQ="dragend",cT="resize",cS="Decorator",cV="zIndex",cU="opacity",cX="default",cW="Color",cP="changeToolTipText",cO="beforeContextmenuOpen",bs="_applyNativeContextMenu",bt="_applyBackgroundColor",bu="_applyFocusable",bv="changeShadow",bw="qx.event.type.KeyInput",bx="createChildControl",by="Font",bz="_applyShadow",bA="_applyEnabled",bB="_applySelectable",dx="Number",dw="_applyKeepActive",dv="_applyVisibility",du="repeat",dB="qxDraggable",dA="syncAppearance",dz="paddingLeft",dy="__containerElement",dD="_applyDroppable",dC="#",cb="__widgetChildren",cc="qx.event.type.MouseWheel",bY="__layoutManager",ca="_applyCursor",cf="_applyDraggable",cg="changeTextColor",cd="$$widget",ce="changeContextMenu",bW="paddingTop",bX="changeSelectable",bJ="hideFocus",bI="none",bL="__protectorElement",bK="outline",bF="_applyAppearance",bE="_applyOpacity",bH="url(",bG=")",bD="qx.ui.core.Widget",bC="_applyFont",cl="cursor",cm="__decoratorElement",cn="qxDroppable",co="changeZIndex",ch="changeEnabled",ci="changeFont",cj="_applyDecorator",ck="_applyZIndex",cp="_applyTextColor",cq="__separators",bT="qx.ui.menu.Menu",bS="_applyToolTipText",bR="true",bQ="widget",bP="__shadowElement",bO="changeDecorator",bN="_applyTabIndex",bM="changeAppearance",bV="shorthand",bU="/",cr="__contentElement",cs="",ct="_applyContextMenu",cu="paddingBottom",cv="changeNativeContextMenu",cw="qx.ui.tooltip.ToolTip",cx="qxKeepActive",cy="_applyKeepFocus",cz="paddingRight",cA="changeBackgroundColor",cN="changeLocale",cM="qxKeepFocus",cL="qx/static/blank.gif";
qx.Class.define(bD,{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){qx.ui.core.LayoutItem.call(this);
this.__containerElement=this._createContainerElement();
this.__contentElement=this.__createContentElement();
this.__containerElement.add(this.__contentElement);
this.initFocusable();
this.initSelectable();
this.initNativeContextMenu();
},events:{appear:cJ,disappear:cJ,createChildControl:cY,resize:cY,move:cY,syncAppearance:cY,mousemove:dg,mouseover:dg,mouseout:dg,mousedown:dg,mouseup:dg,click:dg,dblclick:dg,contextmenu:dg,beforeContextmenuOpen:dg,mousewheel:cc,keyup:dr,keydown:dr,keypress:dr,keyinput:bw,focus:dd,blur:dd,focusin:dd,focusout:dd,activate:dd,deactivate:dd,capture:cJ,losecapture:cJ,drop:df,dragleave:df,dragover:df,drag:df,dragstart:df,dragend:df,dragchange:df,droprequest:df},properties:{paddingTop:{check:db,init:0,apply:cK,themeable:true},paddingRight:{check:db,init:0,apply:cK,themeable:true},paddingBottom:{check:db,init:0,apply:cK,themeable:true},paddingLeft:{check:db,init:0,apply:cK,themeable:true},padding:{group:[bW,cz,cu,dz],mode:bV,themeable:true},zIndex:{nullable:true,init:null,apply:ck,event:co,check:db,themeable:true},decorator:{nullable:true,init:null,apply:cj,event:bO,check:cS,themeable:true},shadow:{nullable:true,init:null,apply:bz,event:bv,check:cS,themeable:true},backgroundColor:{nullable:true,check:cW,apply:bt,event:cA,themeable:true},textColor:{nullable:true,check:cW,apply:cp,event:cg,themeable:true,inheritable:true},font:{nullable:true,apply:bC,check:by,event:ci,themeable:true,inheritable:true,dereference:true},opacity:{check:dx,apply:bE,themeable:true,nullable:true,init:null},cursor:{check:cG,apply:ca,themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:cw,nullable:true},toolTipText:{check:cG,nullable:true,event:cP,apply:bS},toolTipIcon:{check:cG,nullable:true,event:cP},blockToolTip:{check:dh,init:false},visibility:{check:[de,cI,da],init:de,apply:dv,event:cC},enabled:{init:true,check:dh,inheritable:true,apply:bA,event:ch},anonymous:{init:false,check:dh},tabIndex:{check:db,nullable:true,apply:bN},focusable:{check:dh,init:false,apply:bu},keepFocus:{check:dh,init:false,apply:cy},keepActive:{check:dh,init:false,apply:dw},draggable:{check:dh,init:false,apply:cf},droppable:{check:dh,init:false,apply:dD},selectable:{check:dh,init:false,event:bX,apply:bB},contextMenu:{check:bT,apply:ct,nullable:true,event:ce},nativeContextMenu:{check:dh,init:false,themeable:true,event:cv,apply:bs},appearance:{check:cG,init:bQ,apply:bF,event:bM}},statics:{DEBUG:false,getWidgetByElement:function(gC){while(gC){var gD=gC.$$widget;
if(gD!=null){return qx.core.ObjectRegistry.fromHashCode(gD);
}try{gC=gC.parentNode;
}catch(e){return null;
}}return null;
},contains:function(parent,eq){while(eq){if(parent==eq){return true;
}eq=eq.getLayoutParent();
}return false;
},__decoratorPool:new qx.ui.core.DecoratorFactory(),__shadowPool:new qx.ui.core.DecoratorFactory()},members:{__containerElement:null,__contentElement:null,__decoratorElement:null,__shadowElement:null,__protectorElement:null,__initialAppearanceApplied:null,__toolTipTextListenerId:null,__layoutManager:null,_getLayout:function(){return this.__layoutManager;
},_setLayout:function(eU){{};

if(this.__layoutManager){this.__layoutManager.connectToWidget(null);
}
if(eU){eU.connectToWidget(this);
}this.__layoutManager=eU;
qx.ui.core.queue.Layout.add(this);
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}var eA=this.getContainerElement();

if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(eA);
}this.$$parent=parent||null;

if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(eA);
}this.$$refreshInheritables();
qx.ui.core.queue.Visibility.add(this);
},_updateInsets:null,__checkInsetsModified:function(a,b){if(a==b){return false;
}
if(a==null||b==null){return true;
}var bl=qx.theme.manager.Decoration.getInstance();
var bn=bl.resolve(a).getInsets();
var bm=bl.resolve(b).getInsets();

if(bn.top!=bm.top||bn.right!=bm.right||bn.bottom!=bm.bottom||bn.left!=bm.left){return true;
}return false;
},renderLayout:function(x,top,y,z){var I=qx.ui.core.LayoutItem.prototype.renderLayout.call(this,x,top,y,z);
if(!I){return;
}var B=this.getContainerElement();
var content=this.getContentElement();
var F=I.size||this._updateInsets;
var J=di;
var G={};
if(I.position){G.left=x+J;
G.top=top+J;
}if(I.size){G.width=y+J;
G.height=z+J;
}
if(I.position||I.size){B.setStyles(G);
}
if(F||I.local||I.margin){var A=this.getInsets();
var innerWidth=y-A.left-A.right;
var innerHeight=z-A.top-A.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}var D={};

if(this._updateInsets){D.left=A.left+J;
D.top=A.top+J;
}
if(F){D.width=innerWidth+J;
D.height=innerHeight+J;
}
if(F||this._updateInsets){content.setStyles(D);
}
if(I.size){var H=this.__protectorElement;

if(H){H.setStyles({width:y+di,height:z+di});
}}
if(I.size||this._updateInsets){if(this.__decoratorElement){this.__decoratorElement.resize(y,z);
}}
if(I.size){if(this.__shadowElement){var A=this.__shadowElement.getInsets();
var E=y+A.left+A.right;
var C=z+A.top+A.bottom;
this.__shadowElement.resize(E,C);
}}
if(F||I.local||I.margin){if(this.__layoutManager&&this.hasLayoutChildren()){this.__layoutManager.renderLayout(innerWidth,innerHeight);
}else if(this.hasLayoutChildren()){throw new Error("At least one child in control "+this._findTopControl()+" requires a layout, but no one was defined!");
}}if(I.position&&this.hasListener(dk)){this.fireDataEvent(dk,this.getBounds());
}
if(I.size&&this.hasListener(cT)){this.fireDataEvent(cT,this.getBounds());
}delete this._updateInsets;
return I;
},__separators:null,clearSeparators:function(){var eW=this.__separators;

if(!eW){return;
}var eX=qx.ui.core.Widget.__decoratorPool;
var content=this.getContentElement();
var eV;

for(var i=0,l=eW.length;i<l;i++){eV=eW[i];
eX.poolDecorator(eV);
content.remove(eV);
}eW.length=0;
},renderSeparator:function(dL,dM){var dN=qx.ui.core.Widget.__decoratorPool.getDecoratorElement(dL);
this.getContentElement().add(dN);
dN.resize(dM.width,dM.height);
dN.setStyles({left:dM.left+di,top:dM.top+di});
if(!this.__separators){this.__separators=[dN];
}else{this.__separators.push(dN);
}},_computeSizeHint:function(){var eM=this.getWidth();
var eL=this.getMinWidth();
var eH=this.getMaxWidth();
var eK=this.getHeight();
var eI=this.getMinHeight();
var eJ=this.getMaxHeight();
{};
var eN=this._getContentHint();
var eG=this.getInsets();
var eP=eG.left+eG.right;
var eO=eG.top+eG.bottom;

if(eM==null){eM=eN.width+eP;
}
if(eK==null){eK=eN.height+eO;
}
if(eL==null){eL=eP;

if(eN.minWidth!=null){eL+=eN.minWidth;
}}
if(eI==null){eI=eO;

if(eN.minHeight!=null){eI+=eN.minHeight;
}}
if(eH==null){if(eN.maxWidth==null){eH=Infinity;
}else{eH=eN.maxWidth+eP;
}}
if(eJ==null){if(eN.maxHeight==null){eJ=Infinity;
}else{eJ=eN.maxHeight+eO;
}}return {width:eM,minWidth:eL,maxWidth:eH,height:eK,minHeight:eI,maxHeight:eJ};
},invalidateLayoutCache:function(){qx.ui.core.LayoutItem.prototype.invalidateLayoutCache.call(this);

if(this.__layoutManager){this.__layoutManager.invalidateLayoutCache();
}},_getContentHint:function(){var dJ=this.__layoutManager;

if(dJ){if(this.hasLayoutChildren()){var dI;
var dK=dJ.getSizeHint();
{};
return dK;
}else{return {width:0,height:0};
}}else{return {width:100,height:50};
}},_getHeightForWidth:function(c){var h=this.getInsets();
var m=h.left+h.right;
var k=h.top+h.bottom;
var j=c-m;
var f=this._getLayout();

if(f&&f.hasHeightForWidth()){var d=f.getHeightForWidth(c);
}else{d=this._getContentHeightForWidth(j);
}var g=d+k;
return g;
},_getContentHeightForWidth:function(ez){throw new Error("Abstract method call: _getContentHeightForWidth()!");
},getInsets:function(){var top=this.getPaddingTop();
var L=this.getPaddingRight();
var N=this.getPaddingBottom();
var M=this.getPaddingLeft();

if(this.__decoratorElement){var K=this.__decoratorElement.getInsets();
{};
top+=K.top;
L+=K.right;
N+=K.bottom;
M+=K.left;
}return {"top":top,"right":L,"bottom":N,"left":M};
},getInnerSize:function(){var gi=this.getBounds();

if(!gi){return null;
}var gh=this.getInsets();
return {width:gi.width-gh.left-gh.right,height:gi.height-gh.top-gh.bottom};
},show:function(){this.setVisibility(de);
},hide:function(){this.setVisibility(cI);
},exclude:function(){this.setVisibility(da);
},isVisible:function(){return this.getVisibility()===de;
},isHidden:function(){return this.getVisibility()!==de;
},isExcluded:function(){return this.getVisibility()===da;
},isSeeable:function(){var u=this.getContainerElement().getDomElement();

if(u){return u.offsetWidth>0;
}var t=this;

do{if(!t.isVisible()){return false;
}
if(t.isRootWidget()){return true;
}t=t.getLayoutParent();
}while(t);
return false;
},_createContainerElement:function(){var w={"$$widget":this.toHashCode()};
{};
var v={zIndex:0,position:dp};
return new qx.html.Element(dm,v,w);
},__createContentElement:function(){var fT=this._createContentElement();
{};
fT.setStyles({"position":dp,"zIndex":10});
return fT;
},_createContentElement:function(){return new qx.html.Element(dm,{overflowX:cI,overflowY:cI});
},getContainerElement:function(){return this.__containerElement;
},getContentElement:function(){return this.__contentElement;
},getDecoratorElement:function(){return this.__decoratorElement||null;
},getShadowElement:function(){return this.__shadowElement||null;
},__widgetChildren:null,getLayoutChildren:function(){var ek=this.__widgetChildren;

if(!ek){return this.__emptyChildren;
}var em;

for(var i=0,l=ek.length;i<l;i++){var ej=ek[i];

if(ej.hasUserBounds()||ej.isExcluded()){if(em==null){em=ek.concat();
}qx.lang.Array.remove(em,ej);
}}return em||ek;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutChildren:function(){var gB=this.__layoutManager;

if(gB){gB.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},hasLayoutChildren:function(){var bg=this.__widgetChildren;

if(!bg){return false;
}var bh;

for(var i=0,l=bg.length;i<l;i++){bh=bg[i];

if(!bh.hasUserBounds()&&!bh.isExcluded()){return true;
}}return false;
},getChildrenContainer:function(){return this;
},__emptyChildren:[],_getChildren:function(){return this.__widgetChildren||this.__emptyChildren;
},_indexOf:function(gE){var gF=this.__widgetChildren;

if(!gF){return -1;
}return gF.indexOf(gE);
},_hasChildren:function(){var er=this.__widgetChildren;
return er!=null&&(!!er[0]);
},addChildrenToQueue:function(fl){var fm=this.__widgetChildren;

if(!fm){return;
}var fn;

for(var i=0,l=fm.length;i<l;i++){fn=fm[i];
fl[fn.$$hash]=fn;
fn.addChildrenToQueue(fl);
}},_add:function(be,bf){if(be.getLayoutParent()==this){qx.lang.Array.remove(this.__widgetChildren,be);
}
if(this.__widgetChildren){this.__widgetChildren.push(be);
}else{this.__widgetChildren=[be];
}this.__addHelper(be,bf);
},_addAt:function(gT,gU,gV){if(!this.__widgetChildren){this.__widgetChildren=[];
}if(gT.getLayoutParent()==this){qx.lang.Array.remove(this.__widgetChildren,gT);
}var gW=this.__widgetChildren[gU];

if(gW===gT){return gT.setLayoutProperties(gV);
}
if(gW){qx.lang.Array.insertBefore(this.__widgetChildren,gT,gW);
}else{this.__widgetChildren.push(gT);
}this.__addHelper(gT,gV);
},_addBefore:function(dF,dG,dH){{};

if(dF==dG){return;
}
if(!this.__widgetChildren){this.__widgetChildren=[];
}if(dF.getLayoutParent()==this){qx.lang.Array.remove(this.__widgetChildren,dF);
}qx.lang.Array.insertBefore(this.__widgetChildren,dF,dG);
this.__addHelper(dF,dH);
},_addAfter:function(bi,bj,bk){{};

if(bi==bj){return;
}
if(!this.__widgetChildren){this.__widgetChildren=[];
}if(bi.getLayoutParent()==this){qx.lang.Array.remove(this.__widgetChildren,bi);
}qx.lang.Array.insertAfter(this.__widgetChildren,bi,bj);
this.__addHelper(bi,bk);
},_remove:function(gS){if(!this.__widgetChildren){throw new Error("This widget has no children!");
}qx.lang.Array.remove(this.__widgetChildren,gS);
this.__removeHelper(gS);
},_removeAt:function(X){if(!this.__widgetChildren){throw new Error("This widget has no children!");
}var Y=this.__widgetChildren[X];
qx.lang.Array.removeAt(this.__widgetChildren,X);
this.__removeHelper(Y);
return Y;
},_removeAll:function(){if(!this.__widgetChildren){return;
}var dO=this.__widgetChildren.concat();
this.__widgetChildren.length=0;

for(var i=dO.length-1;i>=0;i--){this.__removeHelper(dO[i]);
}qx.ui.core.queue.Layout.add(this);
},_afterAddChild:null,_afterRemoveChild:null,__addHelper:function(U,V){{};
var parent=U.getLayoutParent();

if(parent&&parent!=this){parent._remove(U);
}U.setLayoutParent(this);
if(V){U.setLayoutProperties(V);
}else{this.updateLayoutProperties();
}if(this._afterAddChild){this._afterAddChild(U);
}},__removeHelper:function(fD){{};

if(fD.getLayoutParent()!==this){throw new Error("Remove Error: "+fD+" is not a child of this widget!");
}fD.setLayoutParent(null);
if(this.__layoutManager){this.__layoutManager.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
if(this._afterRemoveChild){this._afterRemoveChild(fD);
}},capture:function(gj){this.getContainerElement().capture(gj);
},releaseCapture:function(){this.getContainerElement().releaseCapture();
},_applyPadding:function(eh,ei,name){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
},_createProtectorElement:function(){if(this.__protectorElement){return;
}var fB=this.__protectorElement=new qx.html.Element;
{};
fB.setStyles({position:dp,top:0,left:0,zIndex:7});
var fC=this.getBounds();

if(fC){this.__protectorElement.setStyles({width:fC.width+di,height:fC.height+di});
}if(qx.core.Variant.isSet(dn,cB)){fB.setStyles({backgroundImage:bH+qx.util.ResourceManager.getInstance().toUri(cL)+bG,backgroundRepeat:du});
}this.getContainerElement().add(fB);
},_applyDecorator:function(fU,fV){{};
var ga=qx.ui.core.Widget.__decoratorPool;
var fX=this.getContainerElement();
if(!this.__protectorElement&&!qx.bom.client.Feature.CSS_POINTER_EVENTS){this._createProtectorElement();
}if(fV){fX.remove(this.__decoratorElement);
ga.poolDecorator(this.__decoratorElement);
}if(fU){var fY=this.__decoratorElement=ga.getDecoratorElement(fU);
fY.setStyle(cV,5);
var fW=this.getBackgroundColor();
fY.tint(fW);
fX.add(fY);
}else{delete this.__decoratorElement;
this._applyBackgroundColor(this.getBackgroundColor());
}if(fU&&!fV&&fW){this.getContainerElement().setStyle(cE,null);
}if(this.__checkInsetsModified(fV,fU)){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
}else if(fU){var gb=this.getBounds();

if(gb){fY.resize(gb.width,gb.height);
this.__protectorElement&&
this.__protectorElement.setStyles({width:gb.width+di,height:gb.height+di});
}}},_applyShadow:function(dX,dY){var eg=qx.ui.core.Widget.__shadowPool;
var eb=this.getContainerElement();
if(dY){eb.remove(this.__shadowElement);
eg.poolDecorator(this.__shadowElement);
}if(dX){var ed=this.__shadowElement=eg.getDecoratorElement(dX);
eb.add(ed);
var ef=ed.getInsets();
ed.setStyles({left:(-ef.left)+di,top:(-ef.top)+di});
var ee=this.getBounds();

if(ee){var ec=ee.width+ef.left+ef.right;
var ea=ee.height+ef.top+ef.bottom;
ed.resize(ec,ea);
}ed.tint(null);
}else{delete this.__shadowElement;
}},_applyToolTipText:function(ew,ex){if(qx.core.Variant.isSet(dt,dc)){if(this.__toolTipTextListenerId){return;
}var ey=qx.locale.Manager.getInstance();
this.__toolTipTextListenerId=ey.addListener(cN,function(){if(ew&&ew.translate){this.setToolTipText(ew.translate());
}},this);
}},_applyTextColor:function(eS,eT){},_applyZIndex:function(gX,gY){this.getContainerElement().setStyle(cV,gX==null?0:gX);
},_applyVisibility:function(fq,fr){var fs=this.getContainerElement();

if(fq===de){fs.show();
}else{fs.hide();
}var parent=this.$$parent;

if(parent&&(fr==null||fq==null||fr===da||fq===da)){parent.invalidateLayoutChildren();
}qx.ui.core.queue.Visibility.add(this);
},_applyOpacity:function(en,eo){this.getContainerElement().setStyle(cU,en==1?null:en);
if(qx.core.Variant.isSet(dn,cB)&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){if(!qx.Class.isSubClassOf(this.getContentElement().constructor,qx.html.Image)){var ep=(en==1||en==null)?null:0.99;
this.getContentElement().setStyle(cU,ep);
}}},_applyCursor:function(O,P){if(O==null&&!this.isSelectable()){O=cX;
}this.getContainerElement().setStyle(cl,O,qx.bom.client.Engine.OPERA);
},_applyBackgroundColor:function(eB,eC){var eD=this.getBackgroundColor();
var eF=this.getContainerElement();

if(this.__decoratorElement){this.__decoratorElement.tint(eD);
eF.setStyle(cE,null);
}else{var eE=qx.theme.manager.Color.getInstance().resolve(eD);
eF.setStyle(cE,eE);
}},_applyFont:function(gv,gw){},__states:null,$$stateChanges:null,_forwardStates:null,hasState:function(S){var T=this.__states;
return !!T&&!!T[S];
},addState:function(fu){var fv=this.__states;

if(!fv){fv=this.__states={};
}
if(fv[fu]){return;
}this.__states[fu]=true;
if(fu===dq){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var fy=this.__childControls;

if(forward&&forward[fu]&&fy){var fw;

for(var fx in fy){fw=fy[fx];

if(fw instanceof qx.ui.core.Widget){fy[fx].addState(fu);
}}}},removeState:function(fH){var fI=this.__states;

if(!fI||!fI[fH]){return;
}delete this.__states[fH];
if(fH===dq){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var fL=this.__childControls;

if(forward&&forward[fH]&&fL){for(var fK in fL){var fJ=fL[fK];

if(fJ instanceof qx.ui.core.Widget){fJ.removeState(fH);
}}}},replaceState:function(gI,gJ){var gK=this.__states;

if(!gK){gK=this.__states={};
}
if(!gK[gJ]){gK[gJ]=true;
}
if(gK[gI]){delete gK[gI];
}
if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var gN=this.__childControls;

if(forward&&forward[gJ]&&gN){for(var gM in gN){var gL=gN[gM];

if(gL instanceof qx.ui.core.Widget){gL.replaceState(gI,gJ);
}}}},__appearanceSelector:null,__updateSelector:null,syncAppearance:function(){var fd=this.__states;
var fc=this.__appearanceSelector;
var fe=qx.theme.manager.Appearance.getInstance();
var fa=qx.core.Property.$$method.setThemed;
var fi=qx.core.Property.$$method.resetThemed;
if(this.__updateSelector){delete this.__updateSelector;
if(fc){var eY=fe.styleFrom(fc,fd,null,this.getAppearance());
if(eY){fc=null;
}}}if(!fc){var fb=this;
var fh=[];

do{fh.push(fb.$$subcontrol||fb.getAppearance());
}while(fb=fb.$$subparent);
fc=this.__appearanceSelector=fh.reverse().join(bU).replace(/#[0-9]+/g,cs);
}var ff=fe.styleFrom(fc,fd,null,this.getAppearance());

if(ff){var fg;

if(eY){for(var fg in eY){if(ff[fg]===undefined){this[fi[fg]]();
}}}{};
for(var fg in ff){ff[fg]===undefined?this[fi[fg]]():this[fa[fg]](ff[fg]);
}}else if(eY){for(var fg in eY){this[fi[fg]]();
}}this.fireDataEvent(dA,this.__states);
},_applyAppearance:function(gz,gA){this.updateAppearance();
},checkAppearanceNeeds:function(){if(!this.__initialAppearanceApplied){qx.ui.core.queue.Appearance.add(this);
this.__initialAppearanceApplied=true;
}else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);
delete this.$$stateChanges;
}},updateAppearance:function(){this.__updateSelector=true;
qx.ui.core.queue.Appearance.add(this);
var s=this.__childControls;

if(s){var q;

for(var r in s){q=s[r];

if(q instanceof qx.ui.core.Widget){q.updateAppearance();
}}}},syncWidget:function(){},getEventTarget:function(){var dE=this;

while(dE.getAnonymous()){dE=dE.getLayoutParent();

if(!dE){return null;
}}return dE;
},getFocusTarget:function(){var gg=this;

if(!gg.getEnabled()){return null;
}
while(gg.getAnonymous()||!gg.getFocusable()){gg=gg.getLayoutParent();

if(!gg||!gg.getEnabled()){return null;
}}return gg;
},getFocusElement:function(){return this.getContainerElement();
},isTabable:function(){return (!!this.getContainerElement().getDomElement())&&this.isFocusable();
},_applyFocusable:function(dT,dU){var dV=this.getFocusElement();
if(dT){var dW=this.getTabIndex();

if(dW==null){dW=1;
}dV.setAttribute(cF,dW);
if(qx.core.Variant.isSet(dn,cB)){dV.setAttribute(bJ,bR);
}else{dV.setStyle(bK,bI);
}}else{if(dV.isNativelyFocusable()){dV.setAttribute(cF,-1);
}else if(dU){dV.setAttribute(cF,null);
}}},_applyKeepFocus:function(fj){var fk=this.getFocusElement();
fk.setAttribute(cM,fj?dc:null);
},_applyKeepActive:function(dR){var dS=this.getContainerElement();
dS.setAttribute(cx,dR?dc:null);
},_applyTabIndex:function(W){if(W==null){W=1;
}else if(W<1||W>32000){throw new Error("TabIndex property must be between 1 and 32000");
}
if(this.getFocusable()&&W!=null){this.getFocusElement().setAttribute(cF,W);
}},_applySelectable:function(bq,br){if(br!==null){this._applyCursor(this.getCursor());
}this.getContainerElement().setSelectable(bq);
this.getContentElement().setSelectable(bq);
},_applyEnabled:function(eQ,eR){if(eQ===false){this.addState(dj);
this.removeState(dq);
if(this.isFocusable()){this.removeState(cD);
this._applyFocusable(false,true);
}if(this.isDraggable()){this._applyDraggable(false,true);
}if(this.isDroppable()){this._applyDroppable(false,true);
}}else{this.removeState(dj);
if(this.isFocusable()){this._applyFocusable(true,false);
}if(this.isDraggable()){this._applyDraggable(true,false);
}if(this.isDroppable()){this._applyDroppable(true,false);
}}},_applyNativeContextMenu:function(gm,gn,name){},_applyContextMenu:function(gO,gP){if(gP){gP.removeState(cH);

if(gP.getOpener()==this){gP.resetOpener();
}
if(!gO){this.removeListener(cH,this._onContextMenuOpen);
gP.removeListener(cC,this._onBeforeContextMenuOpen,this);
}}
if(gO){gO.setOpener(this);
gO.addState(cH);

if(!gP){this.addListener(cH,this._onContextMenuOpen);
gO.addListener(cC,this._onBeforeContextMenuOpen,this);
}}},_onContextMenuOpen:function(e){this.getContextMenu().openAtMouse(e);
e.stop();
},_onBeforeContextMenuOpen:function(e){if(e.getData()==de&&this.hasListener(cO)){this.fireDataEvent(cO,e);
}},_onStopEvent:function(e){e.stopPropagation();
},_applyDraggable:function(dP,dQ){if(!this.isEnabled()&&dP===true){dP=false;
}qx.ui.core.DragDropCursor.getInstance();
if(dP){this.addListener(ds,this._onDragStart);
this.addListener(dl,this._onDrag);
this.addListener(cQ,this._onDragEnd);
this.addListener(cR,this._onDragChange);
}else{this.removeListener(ds,this._onDragStart);
this.removeListener(dl,this._onDrag);
this.removeListener(cQ,this._onDragEnd);
this.removeListener(cR,this._onDragChange);
}this.getContainerElement().setAttribute(dB,dP?dc:null);
},_applyDroppable:function(Q,R){if(!this.isEnabled()&&Q===true){Q=false;
}this.getContainerElement().setAttribute(cn,Q?dc:null);
},_onDragStart:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
this.getApplicationRoot().setGlobalCursor(cX);
},_onDrag:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
},_onDragEnd:function(e){qx.ui.core.DragDropCursor.getInstance().moveTo(-1000,-1000);
this.getApplicationRoot().resetGlobalCursor();
},_onDragChange:function(e){var gQ=qx.ui.core.DragDropCursor.getInstance();
var gR=e.getCurrentAction();
gR?gQ.setAction(gR):gQ.resetAction();
},visualizeFocus:function(){this.addState(cD);
},visualizeBlur:function(){this.removeState(cD);
},scrollChildIntoView:function(gc,gd,ge,gf){this.scrollChildIntoViewX(gc,gd,gf);
this.scrollChildIntoViewY(gc,ge,gf);
},scrollChildIntoViewX:function(go,gp,gq){this.getContentElement().scrollChildIntoViewX(go.getContainerElement(),gp,gq);
},scrollChildIntoViewY:function(n,o,p){this.getContentElement().scrollChildIntoViewY(n.getContainerElement(),o,p);
},focus:function(){if(this.isFocusable()){this.getFocusElement().focus();
}else{throw new Error("Widget is not focusable!");
}},blur:function(){if(this.isFocusable()){this.getFocusElement().blur();
}else{throw new Error("Widget is not focusable!");
}},activate:function(){this.getContainerElement().activate();
},deactivate:function(){this.getContainerElement().deactivate();
},tabFocus:function(){this.getFocusElement().focus();
},hasChildControl:function(ft){if(!this.__childControls){return false;
}return !!this.__childControls[ft];
},__childControls:null,_getCreatedChildControls:function(){return this.__childControls;
},getChildControl:function(fE,fF){if(!this.__childControls){if(fF){return null;
}this.__childControls={};
}var fG=this.__childControls[fE];

if(fG){return fG;
}
if(fF===true){return null;
}return this._createChildControl(fE);
},_showChildControl:function(gk){var gl=this.getChildControl(gk);
gl.show();
return gl;
},_excludeChildControl:function(fz){var fA=this.getChildControl(fz,true);

if(fA){fA.exclude();
}},_isChildControlVisible:function(bo){var bp=this.getChildControl(bo,true);

if(bp){return bp.isVisible();
}return false;
},_createChildControl:function(fM){if(!this.__childControls){this.__childControls={};
}else if(this.__childControls[fM]){throw new Error("Child control '"+fM+"' already created!");
}var fQ=fM.indexOf(dC);

if(fQ==-1){var fN=this._createChildControlImpl(fM);
}else{var fN=this._createChildControlImpl(fM.substring(0,fQ));
}
if(!fN){throw new Error("Unsupported control: "+fM);
}fN.$$subcontrol=fM;
fN.$$subparent=this;
var fO=this.__states;
var forward=this._forwardStates;

if(fO&&forward&&fN instanceof qx.ui.core.Widget){for(var fP in fO){if(forward[fP]){fN.addState(fP);
}}}this.fireDataEvent(bx,fN);
return this.__childControls[fM]=fN;
},_createChildControlImpl:function(gH){return null;
},_disposeChildControls:function(){var bd=this.__childControls;

if(!bd){return;
}var bb=qx.ui.core.Widget;

for(var bc in bd){var ba=bd[bc];

if(!bb.contains(this,ba)){ba.destroy();
}else{ba.dispose();
}}delete this.__childControls;
},_findTopControl:function(){var gG=this;

while(gG){if(!gG.$$subparent){return gG;
}gG=gG.$$subparent;
}return null;
},getContainerLocation:function(fo){var fp=this.getContainerElement().getDomElement();
return fp?qx.bom.element.Location.get(fp,fo):null;
},getContentLocation:function(gx){var gy=this.getContentElement().getDomElement();
return gy?qx.bom.element.Location.get(gy,gx):null;
},setDomLeft:function(gr){var gs=this.getContainerElement().getDomElement();

if(gs){gs.style.left=gr+di;
}else{throw new Error("DOM element is not yet created!");
}},setDomTop:function(fR){var fS=this.getContainerElement().getDomElement();

if(fS){fS.style.top=fR+di;
}else{throw new Error("DOM element is not yet created!");
}},setDomPosition:function(eu,top){var ev=this.getContainerElement().getDomElement();

if(ev){ev.style.left=eu+di;
ev.style.top=top+di;
}else{throw new Error("DOM element is not yet created!");
}},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
},clone:function(){var es=qx.ui.core.LayoutItem.prototype.clone.call(this);

if(this.getChildren){var et=this.getChildren();

for(var i=0,l=et.length;i<l;i++){es.add(et[i].clone());
}}return es;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Variant.isSet(dt,dc)){if(this.__toolTipTextListenerId){qx.locale.Manager.getInstance().removeListenerById(this.__toolTipTextListenerId);
}}this.getContainerElement().setAttribute(cd,null,true);
this._disposeChildControls();
qx.ui.core.queue.Appearance.remove(this);
qx.ui.core.queue.Layout.remove(this);
qx.ui.core.queue.Visibility.remove(this);
qx.ui.core.queue.Widget.remove(this);
}if(!qx.core.ObjectRegistry.inShutDown){var gu=qx.ui.core.Widget;
var gt=this.getContainerElement();

if(this.__decoratorElement){gt.remove(this.__decoratorElement);
gu.__decoratorPool.poolDecorator(this.__decoratorElement);
}
if(this.__shadowElement){gt.remove(this.__shadowElement);
gu.__shadowPool.poolDecorator(this.__shadowElement);
}this.clearSeparators();
this.__decoratorElement=this.__shadowElement=this.__separators=null;
}else{this._disposeArray(cq);
this._disposeObjects(cm,bP);
}this._disposeArray(cb);
this.__states=this.__childControls=null;
this._disposeObjects(bY,dy,cr,bL);
}});
})();
(function(){var d="qx.event.type.Data",c="qx.ui.container.Composite",b="addChildWidget",a="removeChildWidget";
qx.Class.define(c,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MLayoutHandling],construct:function(h){qx.ui.core.Widget.call(this);

if(h!=null){this._setLayout(h);
}},events:{addChildWidget:d,removeChildWidget:d},members:{_afterAddChild:function(i){this.fireNonBubblingEvent(b,qx.event.type.Data,[i]);
},_afterRemoveChild:function(g){this.fireNonBubblingEvent(a,qx.event.type.Data,[g]);
}},defer:function(e,f){qx.ui.core.MChildrenHandling.remap(f);
qx.ui.core.MLayoutHandling.remap(f);
}});
})();
(function(){var j="Integer",i="interval",h="keep-align",g="disappear",f="best-fit",e="mouse",d="bottom-left",c="direct",b="Boolean",a="bottom-right",x="widget",w="qx.ui.core.MPlacement",v="left-top",u="offsetRight",t="shorthand",s="offsetLeft",r="top-left",q="appear",p="offsetBottom",o="top-right",m="offsetTop",n="right-bottom",k="right-top",l="left-bottom";
qx.Mixin.define(w,{properties:{position:{check:[r,o,d,a,v,l,k,n],init:d,themeable:true},placeMethod:{check:[x,e],init:e,themeable:true},domMove:{check:b,init:false},placementModeX:{check:[c,h,f],init:h,themeable:true},placementModeY:{check:[c,h,f],init:h,themeable:true},offsetLeft:{check:j,init:0,themeable:true},offsetTop:{check:j,init:0,themeable:true},offsetRight:{check:j,init:0,themeable:true},offsetBottom:{check:j,init:0,themeable:true},offset:{group:[m,u,p,s],mode:t,themeable:true}},members:{__ptwLiveUpdater:null,__ptwLiveDisappearListener:null,__ptwLiveUpdateDisappearListener:null,getLayoutLocation:function(D){var G,F,H,top;
F=D.getBounds();
H=F.left;
top=F.top;
var I=F;
D=D.getLayoutParent();

while(D&&!D.isRootWidget()){F=D.getBounds();
H+=F.left;
top+=F.top;
G=D.getInsets();
H+=G.left;
top+=G.top;
D=D.getLayoutParent();
}if(D.isRootWidget()){var E=D.getContainerLocation();

if(E){H+=E.left;
top+=E.top;
}}return {left:H,top:top,right:H+I.width,bottom:top+I.height};
},moveTo:function(O,top){if(this.getDomMove()){this.setDomPosition(O,top);
}else{this.setLayoutProperties({left:O,top:top});
}},placeToWidget:function(J,K){if(K){this.__cleanupFromLastPlaceToWidgetLiveUpdate();
this.__ptwLiveUpdater=qx.lang.Function.bind(this.placeToWidget,this,J,false);
qx.event.Idle.getInstance().addListener(i,this.__ptwLiveUpdater);
this.__ptwLiveUpdateDisappearListener=function(){this.__cleanupFromLastPlaceToWidgetLiveUpdate();
};
this.addListener(g,this.__ptwLiveUpdateDisappearListener,this);
}var L=J.getContainerLocation()||this.getLayoutLocation(J);
this.__place(L);
},__cleanupFromLastPlaceToWidgetLiveUpdate:function(){if(this.__ptwLiveUpdater){qx.event.Idle.getInstance().removeListener(i,this.__ptwLiveUpdater);
this.__ptwLiveUpdater=null;
}
if(this.__ptwLiveUpdateDisappearListener){this.removeListener(g,this.__ptwLiveUpdateDisappearListener,this);
this.__ptwLiveUpdateDisappearListener=null;
}},placeToMouse:function(event){var Q=event.getDocumentLeft();
var top=event.getDocumentTop();
var P={left:Q,top:top,right:Q,bottom:top};
this.__place(P);
},placeToElement:function(y,z){var location=qx.bom.element.Location.get(y);
var A={left:location.left,top:location.top,right:location.left+y.offsetWidth,bottom:location.top+y.offsetHeight};
if(z){this.__ptwLiveUpdater=qx.lang.Function.bind(this.placeToElement,this,y,false);
qx.event.Idle.getInstance().addListener(i,this.__ptwLiveUpdater);
this.addListener(g,function(){if(this.__ptwLiveUpdater){qx.event.Idle.getInstance().removeListener(i,this.__ptwLiveUpdater);
this.__ptwLiveUpdater=null;
}},this);
}this.__place(A);
},placeToPoint:function(M){var N={left:M.left,top:M.top,right:M.left,bottom:M.top};
this.__place(N);
},_getPlacementOffsets:function(){return {left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};
},__getPlacementSize:function(R){var S=null;

if(this._computePlacementSize){var S=this._computePlacementSize();
}else if(this.isVisible()){var S=this.getBounds();
}
if(S==null){this.addListenerOnce(q,function(){this.__getPlacementSize(R);
},this);
}else{R.call(this,S);
}},__place:function(T){this.__getPlacementSize(function(B){var C=qx.util.placement.Placement.compute(B,this.getLayoutParent().getBounds(),T,this._getPlacementOffsets(),this.getPosition(),this.getPlacementModeX(),this.getPlacementModeY());
this.moveTo(C.left,C.top);
});
}},destruct:function(){this.__cleanupFromLastPlaceToWidgetLiveUpdate();
}});
})();
(function(){var e="qx.ui.popup.Popup",d="visible",c="excluded",b="popup",a="Boolean";
qx.Class.define(e,{extend:qx.ui.container.Composite,include:qx.ui.core.MPlacement,construct:function(f){qx.ui.container.Composite.call(this,f);
qx.core.Init.getApplication().getRoot().add(this);
this.initVisibility();
},properties:{appearance:{refine:true,init:b},visibility:{refine:true,init:c},autoHide:{check:a,init:true}},members:{_applyVisibility:function(g,h){qx.ui.container.Composite.prototype._applyVisibility.call(this,g,h);
var i=qx.ui.popup.Manager.getInstance();
g===d?i.add(this):i.remove(this);
}},destruct:function(){qx.ui.popup.Manager.getInstance().remove(this);
}});
})();
(function(){var l="atom",k="Integer",j="String",i="_applyRich",h="qx.ui.tooltip.ToolTip",g="_applyIcon",f="tooltip",d="qx.ui.core.Widget",c="mouseover",b="Boolean",a="_applyLabel";
qx.Class.define(h,{extend:qx.ui.popup.Popup,construct:function(x,y){qx.ui.popup.Popup.call(this);
this.setLayout(new qx.ui.layout.Grow);
this._createChildControl(l);
if(x!=null){this.setLabel(x);
}
if(y!=null){this.setIcon(y);
}this.addListener(c,this._onMouseOver,this);
},properties:{appearance:{refine:true,init:f},showTimeout:{check:k,init:700,themeable:true},hideTimeout:{check:k,init:4000,themeable:true},label:{check:j,nullable:true,apply:a},icon:{check:j,nullable:true,apply:g,themeable:true},rich:{check:b,init:false,apply:i},opener:{check:d,nullable:true}},members:{_createChildControlImpl:function(v){var w;

switch(v){case l:w=new qx.ui.basic.Atom;
this._add(w);
break;
}return w||qx.ui.popup.Popup.prototype._createChildControlImpl.call(this,v);
},_onMouseOver:function(e){this.hide();
},_applyIcon:function(p,q){var r=this.getChildControl(l);
p==null?r.resetIcon():r.setIcon(p);
},_applyLabel:function(m,n){var o=this.getChildControl(l);
m==null?o.resetLabel():o.setLabel(m);
},_applyRich:function(s,t){var u=this.getChildControl(l);
u.setRich(s);
}}});
})();
(function(){var b="qx.ui.core.queue.Layout",a="layout";
qx.Class.define(b,{statics:{__queue:{},remove:function(c){delete this.__queue[c.$$hash];
},add:function(m){this.__queue[m.$$hash]=m;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var h=this.__getSortedQueue();
for(var i=h.length-1;i>=0;i--){var j=h[i];
if(j.hasValidLayout()){continue;
}if(j.isRootWidget()&&!j.hasUserBounds()){var l=j.getSizeHint();
j.renderLayout(0,0,l.width,l.height);
}else{var k=j.getBounds();
j.renderLayout(k.left,k.top,k.width,k.height);
}}},getNestingLevel:function(d){var e=this.__nesting;
var g=0;
var parent=d;
while(true){if(e[parent.$$hash]!=null){g+=e[parent.$$hash];
break;
}
if(!parent.$$parent){break;
}parent=parent.$$parent;
g+=1;
}var f=g;

while(d&&d!==parent){e[d.$$hash]=f--;
d=d.$$parent;
}return g;
},__getLevelGroupedWidgets:function(){var s=qx.ui.core.queue.Visibility;
this.__nesting={};
var r=[];
var q=this.__queue;
var n,p;

for(var o in q){n=q[o];

if(s.isVisible(n)){p=this.getNestingLevel(n);
if(!r[p]){r[p]={};
}r[p][o]=n;
delete q[o];
}}return r;
},__getSortedQueue:function(){var w=[];
var y=this.__getLevelGroupedWidgets();

for(var v=y.length-1;v>=0;v--){if(!y[v]){continue;
}
for(var u in y[v]){var t=y[v][u];
if(v==0||t.isRootWidget()||t.hasUserBounds()){w.push(t);
t.invalidateLayoutCache();
continue;
}var A=t.getSizeHint(false);

if(A){t.invalidateLayoutCache();
var x=t.getSizeHint();
var z=(!t.getBounds()||A.minWidth!==x.minWidth||A.width!==x.width||A.maxWidth!==x.maxWidth||A.minHeight!==x.minHeight||A.height!==x.height||A.maxHeight!==x.maxHeight);
}else{z=true;
}
if(z){var parent=t.getLayoutParent();

if(!y[v-1]){y[v-1]={};
}y[v-1][parent.$$hash]=parent;
}else{w.push(t);
}}}return w;
}}});
})();
(function(){var b="qx.event.handler.UserAction";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(a){qx.core.Object.call(this);
this.__manager=a;
this.__window=a.getWindow();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__manager:null,__window:null,canHandleEvent:function(g,h){},registerEvent:function(i,j,k){},unregisterEvent:function(d,e,f){}},destruct:function(){this.__manager=this.__window=null;
},defer:function(c){qx.event.Registration.addHandler(c);
}});
})();
(function(){var b="qx.util.DeferredCallManager",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,construct:function(){this.__calls={};
this.__timeoutWrapper=qx.lang.Function.bind(this.__timeout,this);
this.__hasCalls=false;
},members:{__timeoutId:null,__currentQueue:null,__calls:null,__hasCalls:null,__timeoutWrapper:null,schedule:function(e){if(this.__timeoutId==null){this.__timeoutId=window.setTimeout(this.__timeoutWrapper,0);
}var f=e.toHashCode();
if(this.__currentQueue&&this.__currentQueue[f]){return;
}this.__calls[f]=e;
this.__hasCalls=true;
},cancel:function(c){var d=c.toHashCode();
if(this.__currentQueue&&this.__currentQueue[d]){this.__currentQueue[d]=null;
return;
}delete this.__calls[d];
if(qx.lang.Object.isEmpty(this.__calls)&&this.__timeoutId!=null){window.clearTimeout(this.__timeoutId);
this.__timeoutId=null;
}},__timeout:qx.event.GlobalError.observeMethod(function(){this.__timeoutId=null;
while(this.__hasCalls){this.__currentQueue=qx.lang.Object.clone(this.__calls);
this.__calls={};
this.__hasCalls=false;

for(var h in this.__currentQueue){var g=this.__currentQueue[h];

if(g){this.__currentQueue[h]=null;
g.call();
}}}this.__currentQueue=null;
})},destruct:function(){if(this.__timeoutId!=null){window.clearTimeout(this.__timeoutId);
}this.__timeoutWrapper=this.__calls=null;
}});
})();
(function(){var a="qx.util.DeferredCall";
qx.Class.define(a,{extend:qx.core.Object,construct:function(d,e){qx.core.Object.call(this);
this.__callback=d;
this.__context=e||null;
this.__manager=qx.util.DeferredCallManager.getInstance();
},members:{__callback:null,__context:null,__manager:null,cancel:function(){this.__manager.cancel(this);
},schedule:function(){this.__manager.schedule(this);
},call:function(){this.__context?this.__callback.apply(this.__context):this.__callback();
}},destruct:function(b,c){this.cancel();
this.__context=this.__callback=this.__manager=null;
}});
})();
(function(){var cL="element",cK="qx.client",cJ="qxSelectable",cI="off",cH="on",cG="div",cF="",cE="mshtml",cD="none",cC="scroll",df="text",de="qx.html.Element",dd="|capture|",dc="activate",da="blur",cY="deactivate",cX="capture",cW="userSelect",cV="-moz-none",cU="visible",cS="releaseCapture",cT="|bubble|",cQ="tabIndex",cR="focus",cO="MozUserSelect",cP="normal",cM="hidden",cN="__children";
qx.Class.define(de,{extend:qx.core.Object,construct:function(o,p,q){qx.core.Object.call(this);
this.__nodeName=o||cG;
this.__styleValues=p||null;
this.__attribValues=q||null;
},statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__selection:{},_scheduleFlush:function(cs){qx.html.Element.__deferredCall.schedule();
},flush:function(){var bR;
{};
var bJ=this.__getFocusHandler();
var bI=bJ.getFocus();

if(bI&&this.__willBecomeInvisible(bI)){bJ.blur(bI);
}var bY=bJ.getActive();

if(bY&&this.__willBecomeInvisible(bY)){qx.bom.Element.deactivate(bY);
}var bM=this.__getCaptureElement();

if(bM&&this.__willBecomeInvisible(bM)){qx.bom.Element.releaseCapture(bM);
}var bS=[];
var bT=this._modified;

for(var bQ in bT){bR=bT[bQ];
if(bR.__willBeSeeable()){if(bR.__element&&qx.dom.Hierarchy.isRendered(bR.__element)){bS.push(bR);
}else{{};
bR.__flush();
}delete bT[bQ];
}}
for(var i=0,l=bS.length;i<l;i++){bR=bS[i];
{};
bR.__flush();
}var bO=this._visibility;

for(var bQ in bO){bR=bO[bQ];
var bU=bR.__element;

if(!bU){delete bO[bQ];
continue;
}{};
if(!bR.$$disposed){bU.style.display=bR.__visible?cF:cD;
if(qx.core.Variant.isSet(cK,cE)){if(!(document.documentMode>=8)){bU.style.visibility=bR.__visible?cU:cM;
}}}delete bO[bQ];
}var scroll=this._scroll;

for(var bQ in scroll){bR=scroll[bQ];
var ca=bR.__element;

if(ca&&ca.offsetWidth){var bL=true;
if(bR.__lazyScrollX!=null){bR.__element.scrollLeft=bR.__lazyScrollX;
delete bR.__lazyScrollX;
}if(bR.__lazyScrollY!=null){bR.__element.scrollTop=bR.__lazyScrollY;
delete bR.__lazyScrollY;
}var bV=bR.__lazyScrollIntoViewX;

if(bV!=null){var bP=bV.element.getDomElement();

if(bP&&bP.offsetWidth){qx.bom.element.Scroll.intoViewX(bP,ca,bV.align);
delete bR.__lazyScrollIntoViewX;
}else{bL=false;
}}var bW=bR.__lazyScrollIntoViewY;

if(bW!=null){var bP=bW.element.getDomElement();

if(bP&&bP.offsetWidth){qx.bom.element.Scroll.intoViewY(bP,ca,bW.align);
delete bR.__lazyScrollIntoViewY;
}else{bL=false;
}}if(bL){delete scroll[bQ];
}}}var bK={"releaseCapture":1,"blur":1,"deactivate":1};
for(var i=0;i<this._actions.length;i++){var bX=this._actions[i];
var bU=bX.element.__element;

if(!bU||!bK[bX.type]&&!bX.element.__willBeSeeable()){continue;
}var bN=bX.args;
bN.unshift(bU);
qx.bom.Element[bX.type].apply(qx.bom.Element,bN);
}this._actions=[];
for(var bQ in this.__selection){var bH=this.__selection[bQ];
var ca=bH.element.__element;

if(ca){qx.bom.Selection.set(ca,bH.start,bH.end);
delete this.__selection[bQ];
}}qx.event.handler.Appear.refresh();
},__getFocusHandler:function(){if(!this.__focusHandler){var t=qx.event.Registration.getManager(window);
this.__focusHandler=t.getHandler(qx.event.handler.Focus);
}return this.__focusHandler;
},__getCaptureElement:function(){if(!this.__mouseCapture){var bg=qx.event.Registration.getManager(window);
this.__mouseCapture=bg.getDispatcher(qx.event.dispatch.MouseCapture);
}return this.__mouseCapture.getCaptureElement();
},__willBecomeInvisible:function(bm){var bn=qx.core.ObjectRegistry.fromHashCode(bm.$$element);
return bn&&!bn.__willBeSeeable();
}},members:{__nodeName:null,__element:null,__root:false,__included:true,__visible:true,__lazyScrollIntoViewX:null,__lazyScrollIntoViewY:null,__lazyScrollX:null,__lazyScrollY:null,__styleJobs:null,__attribJobs:null,__propertyJobs:null,__styleValues:null,__attribValues:null,__propertyValues:null,__eventValues:null,__children:null,__modifiedChildren:null,__parent:null,_scheduleChildrenUpdate:function(){if(this.__modifiedChildren){return;
}this.__modifiedChildren=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cL);
},_createDomElement:function(){return qx.bom.Element.create(this.__nodeName);
},__flush:function(){{};
var dL=this.__children;

if(dL){var length=dL.length;
var dM;

for(var i=0;i<length;i++){dM=dL[i];

if(dM.__visible&&dM.__included&&!dM.__element){dM.__flush();
}}}
if(!this.__element){this.__element=this._createDomElement();
this.__element.$$element=this.$$hash;
this._copyData(false);

if(dL&&length>0){this._insertChildren();
}}else{this._syncData();

if(this.__modifiedChildren){this._syncChildren();
}}delete this.__modifiedChildren;
},_insertChildren:function(){var dY=this.__children;
var length=dY.length;
var eb;

if(length>2){var ea=document.createDocumentFragment();

for(var i=0;i<length;i++){eb=dY[i];

if(eb.__element&&eb.__included){ea.appendChild(eb.__element);
}}this.__element.appendChild(ea);
}else{var ea=this.__element;

for(var i=0;i<length;i++){eb=dY[i];

if(eb.__element&&eb.__included){ea.appendChild(eb.__element);
}}}},_syncChildren:function(){var K;
var P=qx.core.ObjectRegistry;
var G=this.__children;
var N=G.length;
var H;
var L;
var J=this.__element;
var M=J.childNodes;
var I=0;
var O;
{};
for(var i=M.length-1;i>=0;i--){O=M[i];
L=P.fromHashCode(O.$$element);

if(!L||!L.__included||L.__parent!==this){J.removeChild(O);
{};
}}for(var i=0;i<N;i++){H=G[i];
if(H.__included){L=H.__element;
O=M[I];

if(!L){continue;
}if(L!=O){if(O){J.insertBefore(L,O);
}else{J.appendChild(L);
}{};
}I++;
}}{};
},_copyData:function(W){var bb=this.__element;
var ba=this.__attribValues;

if(ba){var X=qx.bom.element.Attribute;

for(var bc in ba){X.set(bb,bc,ba[bc]);
}}var ba=this.__styleValues;

if(ba){var Y=qx.bom.element.Style;

if(W){Y.setStyles(bb,ba);
}else{Y.setCss(bb,Y.compile(ba));
}}var ba=this.__propertyValues;

if(ba){for(var bc in ba){this._applyProperty(bc,ba[bc]);
}}var ba=this.__eventValues;

if(ba){qx.event.Registration.getManager(bb).importListeners(bb,ba);
delete this.__eventValues;
}},_syncData:function(){var dk=this.__element;
var dj=qx.bom.element.Attribute;
var dh=qx.bom.element.Style;
var di=this.__attribJobs;

if(di){var dn=this.__attribValues;

if(dn){var dl;

for(var dm in di){dl=dn[dm];

if(dl!==undefined){dj.set(dk,dm,dl);
}else{dj.reset(dk,dm);
}}}this.__attribJobs=null;
}var di=this.__styleJobs;

if(di){var dn=this.__styleValues;

if(dn){var dg={};

for(var dm in di){dg[dm]=dn[dm];
}dh.setStyles(dk,dg);
}this.__styleJobs=null;
}var di=this.__propertyJobs;

if(di){var dn=this.__propertyValues;

if(dn){var dl;

for(var dm in di){this._applyProperty(dm,dn[dm]);
}}this.__propertyJobs=null;
}},__willBeSeeable:function(){var cf=this;
while(cf){if(cf.__root){return true;
}
if(!cf.__included||!cf.__visible){return false;
}cf=cf.__parent;
}return false;
},__addChildHelper:function(ck){if(ck.__parent===this){throw new Error("Child is already in: "+ck);
}
if(ck.__root){throw new Error("Root elements could not be inserted into other ones.");
}if(ck.__parent){ck.__parent.remove(ck);
}ck.__parent=this;
if(!this.__children){this.__children=[];
}if(this.__element){this._scheduleChildrenUpdate();
}},__removeChildHelper:function(Q){if(Q.__parent!==this){throw new Error("Has no child: "+Q);
}if(this.__element){this._scheduleChildrenUpdate();
}delete Q.__parent;
},__moveChildHelper:function(dv){if(dv.__parent!==this){throw new Error("Has no child: "+dv);
}if(this.__element){this._scheduleChildrenUpdate();
}},getChildren:function(){return this.__children||null;
},getChild:function(be){var bf=this.__children;
return bf&&bf[be]||null;
},hasChildren:function(){var bh=this.__children;
return bh&&bh[0]!==undefined;
},indexOf:function(a){var b=this.__children;
return b?b.indexOf(a):-1;
},hasChild:function(bi){var bj=this.__children;
return bj&&bj.indexOf(bi)!==-1;
},add:function(dA){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++){this.__addChildHelper(arguments[i]);
}this.__children.push.apply(this.__children,arguments);
}else{this.__addChildHelper(dA);
this.__children.push(dA);
}return this;
},addAt:function(bk,bl){this.__addChildHelper(bk);
qx.lang.Array.insertAt(this.__children,bk,bl);
return this;
},remove:function(dS){var dT=this.__children;

if(!dT){return;
}
if(arguments[1]){var dU;

for(var i=0,l=arguments.length;i<l;i++){dU=arguments[i];
this.__removeChildHelper(dU);
qx.lang.Array.remove(dT,dU);
}}else{this.__removeChildHelper(dS);
qx.lang.Array.remove(dT,dS);
}return this;
},removeAt:function(dx){var dy=this.__children;

if(!dy){throw new Error("Has no children!");
}var dz=dy[dx];

if(!dz){throw new Error("Has no child at this position!");
}this.__removeChildHelper(dz);
qx.lang.Array.removeAt(this.__children,dx);
return this;
},removeAll:function(){var bd=this.__children;

if(bd){for(var i=0,l=bd.length;i<l;i++){this.__removeChildHelper(bd[i]);
}bd.length=0;
}return this;
},getParent:function(){return this.__parent||null;
},insertInto:function(parent,ct){parent.__addChildHelper(this);

if(ct==null){parent.__children.push(this);
}else{qx.lang.Array.insertAt(this.__children,this,ct);
}return this;
},insertBefore:function(m){var parent=m.__parent;
parent.__addChildHelper(this);
qx.lang.Array.insertBefore(parent.__children,this,m);
return this;
},insertAfter:function(S){var parent=S.__parent;
parent.__addChildHelper(this);
qx.lang.Array.insertAfter(parent.__children,this,S);
return this;
},moveTo:function(cl){var parent=this.__parent;
parent.__moveChildHelper(this);
var cm=parent.__children.indexOf(this);

if(cm===cl){throw new Error("Could not move to same index!");
}else if(cm<cl){cl--;
}qx.lang.Array.removeAt(parent.__children,cm);
qx.lang.Array.insertAt(parent.__children,this,cl);
return this;
},moveBefore:function(dB){var parent=this.__parent;
return this.moveTo(parent.__children.indexOf(dB));
},moveAfter:function(n){var parent=this.__parent;
return this.moveTo(parent.__children.indexOf(n)+1);
},free:function(){var parent=this.__parent;

if(!parent){throw new Error("Has no parent to remove from.");
}
if(!parent.__children){return;
}parent.__removeChildHelper(this);
qx.lang.Array.remove(parent.__children,this);
return this;
},getDomElement:function(){return this.__element||null;
},getNodeName:function(){return this.__nodeName;
},setNodeName:function(name){this.__nodeName=name;
},setRoot:function(bF){this.__root=bF;
},useMarkup:function(bC){if(this.__element){throw new Error("Could not overwrite existing element!");
}if(qx.core.Variant.isSet(cK,cE)){var bD=document.createElement(cG);
}else{var bD=qx.bom.Element.getHelperElement();
}bD.innerHTML=bC;
this.useElement(bD.firstChild);
return this.__element;
},useElement:function(cc){if(this.__element){throw new Error("Could not overwrite existing element!");
}this.__element=cc;
this.__element.$$element=this.$$hash;
this._copyData(true);
},isFocusable:function(){var ce=this.getAttribute(cQ);

if(ce>=1){return true;
}var cd=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(ce>=0&&cd[this.__nodeName]){return true;
}return false;
},setSelectable:qx.core.Variant.select(cK,{"webkit":function(u){this.setAttribute(cJ,u?cH:cI);
this.setStyle(cW,u?cP:cD);
},"gecko":function(dX){this.setAttribute(cJ,dX?cH:cI);
this.setStyle(cO,dX?df:cV);
},"default":function(cB){this.setAttribute(cJ,cB?cH:cI);
}}),isNativelyFocusable:function(){return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this.__nodeName];
},include:function(){if(this.__included){return;
}delete this.__included;

if(this.__parent){this.__parent._scheduleChildrenUpdate();
}return this;
},exclude:function(){if(!this.__included){return;
}this.__included=false;

if(this.__parent){this.__parent._scheduleChildrenUpdate();
}return this;
},isIncluded:function(){return this.__included===true;
},show:function(){if(this.__visible){return;
}
if(this.__element){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(cL);
}if(this.__parent){this.__parent._scheduleChildrenUpdate();
}delete this.__visible;
},hide:function(){if(!this.__visible){return;
}
if(this.__element){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(cL);
}this.__visible=false;
},isVisible:function(){return this.__visible===true;
},scrollChildIntoViewX:function(cn,co,cp){var cq=this.__element;
var cr=cn.getDomElement();

if(cp!==false&&cq&&cq.offsetWidth&&cr&&cr.offsetWidth){qx.bom.element.Scroll.intoViewX(cr,cq,co);
}else{this.__lazyScrollIntoViewX={element:cn,align:co};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(cL);
}delete this.__lazyScrollX;
},scrollChildIntoViewY:function(B,C,D){var E=this.__element;
var F=B.getDomElement();

if(D!==false&&E&&E.offsetWidth&&F&&F.offsetWidth){qx.bom.element.Scroll.intoViewY(F,E,C);
}else{this.__lazyScrollIntoViewY={element:B,align:C};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(cL);
}delete this.__lazyScrollY;
},scrollToX:function(x,dV){var dW=this.__element;

if(dV!==true&&dW&&dW.offsetWidth){dW.scrollLeft=x;
}else{this.__lazyScrollX=x;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(cL);
}delete this.__lazyScrollIntoViewX;
},getScrollX:function(){var cv=this.__element;

if(cv){return cv.scrollLeft;
}return this.__lazyScrollX||0;
},scrollToY:function(y,cz){var cA=this.__element;

if(cz!==true&&cA&&cA.offsetWidth){cA.scrollTop=y;
}else{this.__lazyScrollY=y;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(cL);
}delete this.__lazyScrollIntoViewY;
},getScrollY:function(){var bG=this.__element;

if(bG){return bG.scrollTop;
}return this.__lazyScrollY||0;
},disableScrolling:function(){this.enableScrolling();
this.scrollToX(0);
this.scrollToY(0);
this.addListener(cC,this.__onScroll,this);
},enableScrolling:function(){this.removeListener(cC,this.__onScroll,this);
},__inScroll:null,__onScroll:function(e){if(!this.__inScroll){this.__inScroll=true;
this.__element.scrollTop=0;
this.__element.scrollLeft=0;
delete this.__inScroll;
}},getTextSelection:function(){var cj=this.__element;

if(cj){return qx.bom.Selection.get(cj);
}return null;
},getTextSelectionLength:function(){var cu=this.__element;

if(cu){return qx.bom.Selection.getLength(cu);
}return null;
},getTextSelectionStart:function(){var dw=this.__element;

if(dw){return qx.bom.Selection.getStart(dw);
}return null;
},getTextSelectionEnd:function(){var c=this.__element;

if(c){return qx.bom.Selection.getEnd(c);
}return null;
},setTextSelection:function(bz,bA){var bB=this.__element;

if(bB){qx.bom.Selection.set(bB,bz,bA);
return;
}qx.html.Element.__selection[this.toHashCode()]={element:this,start:bz,end:bA};
qx.html.Element._scheduleFlush(cL);
},clearTextSelection:function(){var dK=this.__element;

if(dK){qx.bom.Selection.clear(dK);
}delete qx.html.Element.__selection[this.toHashCode()];
},__performAction:function(bw,bx){var by=qx.html.Element._actions;
by.push({type:bw,element:this,args:bx||[]});
qx.html.Element._scheduleFlush(cL);
},focus:function(){this.__performAction(cR);
},blur:function(){this.__performAction(da);
},activate:function(){this.__performAction(dc);
},deactivate:function(){this.__performAction(cY);
},capture:function(dH){this.__performAction(cX,[dH!==false]);
},releaseCapture:function(){this.__performAction(cS);
},setStyle:function(T,U,V){if(!this.__styleValues){this.__styleValues={};
}
if(this.__styleValues[T]==U){return;
}
if(U==null){delete this.__styleValues[T];
}else{this.__styleValues[T]=U;
}if(this.__element){if(V){qx.bom.element.Style.set(this.__element,T,U);
return this;
}if(!this.__styleJobs){this.__styleJobs={};
}this.__styleJobs[T]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cL);
}return this;
},setStyles:function(d,f){var g=qx.bom.element.Style;

if(!this.__styleValues){this.__styleValues={};
}
if(this.__element){if(!this.__styleJobs){this.__styleJobs={};
}
for(var j in d){var h=d[j];

if(this.__styleValues[j]==h){continue;
}
if(h==null){delete this.__styleValues[j];
}else{this.__styleValues[j]=h;
}if(f){g.set(this.__element,j,h);
continue;
}this.__styleJobs[j]=true;
}qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cL);
}else{for(var j in d){var h=d[j];

if(this.__styleValues[j]==h){continue;
}
if(h==null){delete this.__styleValues[j];
}else{this.__styleValues[j]=h;
}}}return this;
},removeStyle:function(dI,dJ){this.setStyle(dI,null,dJ);
},getStyle:function(k){return this.__styleValues?this.__styleValues[k]:null;
},getAllStyles:function(){return this.__styleValues||null;
},setAttribute:function(w,z,A){if(!this.__attribValues){this.__attribValues={};
}
if(this.__attribValues[w]==z){return;
}
if(z==null){delete this.__attribValues[w];
}else{this.__attribValues[w]=z;
}if(this.__element){if(A){qx.bom.element.Attribute.set(this.__element,w,z);
return this;
}if(!this.__attribJobs){this.__attribJobs={};
}this.__attribJobs[w]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cL);
}return this;
},setAttributes:function(cw,cx){for(var cy in cw){this.setAttribute(cy,cw[cy],cx);
}return this;
},removeAttribute:function(r,s){this.setAttribute(r,null,s);
},getAttribute:function(bE){return this.__attribValues?this.__attribValues[bE]:null;
},_applyProperty:function(name,R){},_setProperty:function(cg,ch,ci){if(!this.__propertyValues){this.__propertyValues={};
}
if(this.__propertyValues[cg]==ch){return;
}
if(ch==null){delete this.__propertyValues[cg];
}else{this.__propertyValues[cg]=ch;
}if(this.__element){if(ci){this._applyProperty(cg,ch);
return this;
}if(!this.__propertyJobs){this.__propertyJobs={};
}this.__propertyJobs[cg]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cL);
}return this;
},_removeProperty:function(dF,dG){this._setProperty(dF,null,dG);
},_getProperty:function(dC){var dD=this.__propertyValues;

if(!dD){return null;
}var dE=dD[dC];
return dE==null?null:dE;
},addListener:function(dp,dq,self,dr){var ds;

if(this.$$disposed){return null;
}{};

if(this.__element){return qx.event.Registration.addListener(this.__element,dp,dq,self,dr);
}
if(!this.__eventValues){this.__eventValues={};
}
if(dr==null){dr=false;
}var dt=qx.event.Manager.getNextUniqueId();
var du=dp+(dr?dd:cT)+dt;
this.__eventValues[du]={type:dp,listener:dq,self:self,capture:dr,unique:dt};
return du;
},removeListener:function(bo,bp,self,bq){var br;

if(this.$$disposed){return null;
}{};

if(this.__element){qx.event.Registration.removeListener(this.__element,bo,bp,self,bq);
}else{var bt=this.__eventValues;
var bs;

if(bq==null){bq=false;
}
for(var bu in bt){bs=bt[bu];
if(bs.listener===bp&&bs.self===self&&bs.capture===bq&&bs.type===bo){delete bt[bu];
break;
}}}return this;
},removeListenerById:function(bv){if(this.$$disposed){return null;
}
if(this.__element){qx.event.Registration.removeListenerById(this.__element,bv);
}else{delete this.__eventValues[bv];
}return this;
},hasListener:function(dN,dO){if(this.$$disposed){return false;
}
if(this.__element){return qx.event.Registration.hasListener(this.__element,dN,dO);
}var dQ=this.__eventValues;
var dP;

if(dO==null){dO=false;
}
for(var dR in dQ){dP=dQ[dR];
if(dP.capture===dO&&dP.type===dN){return true;
}}return false;
}},defer:function(cb){cb.__deferredCall=new qx.util.DeferredCall(cb.flush,cb);
},destruct:function(){var v=this.__element;

if(v){qx.event.Registration.getManager(v).removeAllListeners(v);
v.$$element=cF;
}
if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__parent;

if(parent&&!parent.$$disposed){parent.remove(this);
}}this._disposeArray(cN);
this.__attribValues=this.__styleValues=this.__eventValues=this.__propertyValues=this.__attribJobs=this.__styleJobs=this.__propertyJobs=this.__element=this.__parent=this.__lazyScrollIntoViewX=this.__lazyScrollIntoViewY=null;
}});
})();
(function(){var b="qx.ui.core.queue.Manager",a="useraction";
qx.Class.define(b,{statics:{__scheduled:false,__jobs:{},__retries:0,MAX_RETRIES:10,scheduleFlush:function(h){var self=qx.ui.core.queue.Manager;
self.__jobs[h]=true;

if(!self.__scheduled){self.__deferredCall.schedule();
self.__scheduled=true;
}},flush:function(){var self=qx.ui.core.queue.Manager;
if(self.__inFlush){return;
}self.__inFlush=true;
self.__deferredCall.cancel();
var d=self.__jobs;
self.__executeAndRescheduleOnError(function(){while(d.visibility||d.widget||d.appearance||d.layout||d.element){if(d.widget){delete d.widget;
qx.ui.core.queue.Widget.flush();
}
if(d.visibility){delete d.visibility;
qx.ui.core.queue.Visibility.flush();
}
if(d.appearance){delete d.appearance;
qx.ui.core.queue.Appearance.flush();
}if(d.widget||d.visibility||d.appearance){continue;
}
if(d.layout){delete d.layout;
qx.ui.core.queue.Layout.flush();
}if(d.widget||d.visibility||d.appearance||d.layout){continue;
}
if(d.element){delete d.element;
qx.html.Element.flush();
}}},function(){self.__scheduled=false;
});
self.__executeAndRescheduleOnError(function(){if(d.dispose){delete d.dispose;
qx.ui.core.queue.Dispose.flush();
}},function(){self.__inFlush=false;
});
self.__retries=0;
},__executeAndRescheduleOnError:function(f,g){var self=qx.ui.core.queue.Manager;

try{f();
}catch(e){{};
self.__scheduled=false;
self.__inFlush=false;
self.__retries+=1;

if(self.__retries<=self.MAX_RETRIES){self.scheduleFlush();
}else{throw new Error("Fatal Error: Flush terminated "+(self.__retries-1)+" times in a row"+" due to exceptions in user code. The application has to be reloaded!");
}throw e;
}finally{g();
}}},defer:function(c){c.__deferredCall=new qx.util.DeferredCall(c.flush);
qx.html.Element._scheduleFlush=c.scheduleFlush;
qx.event.Registration.addListener(window,a,c.flush);
}});
})();
(function(){var b="abstract",a="qx.event.dispatch.AbstractBubbling";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:b,construct:function(x){this._manager=x;
},members:{_getParent:function(e){throw new Error("Missing implementation");
},canDispatchEvent:function(c,event,d){return event.getBubbles();
},dispatchEvent:function(f,event,g){var parent=f;
var r=this._manager;
var o,v;
var m;
var q,t;
var s;
var u=[];
o=r.getListeners(f,g,true);
v=r.getListeners(f,g,false);

if(o){u.push(o);
}
if(v){u.push(v);
}var parent=this._getParent(f);
var k=[];
var h=[];
var l=[];
var p=[];
while(parent!=null){o=r.getListeners(parent,g,true);

if(o){l.push(o);
p.push(parent);
}v=r.getListeners(parent,g,false);

if(v){k.push(v);
h.push(parent);
}parent=this._getParent(parent);
}event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);

for(var i=l.length-1;i>=0;i--){s=p[i];
event.setCurrentTarget(s);
m=l[i];

for(var j=0,n=m.length;j<n;j++){q=m[j];
t=q.context||s;
q.handler.call(t,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.AT_TARGET);
event.setCurrentTarget(f);

for(var i=0,w=u.length;i<w;i++){m=u[i];

for(var j=0,n=m.length;j<n;j++){q=m[j];
t=q.context||f;
q.handler.call(t,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);

for(var i=0,w=k.length;i<w;i++){s=h[i];
event.setCurrentTarget(s);
m=k[i];

for(var j=0,n=m.length;j<n;j++){q=m[j];
t=q.context||s;
q.handler.call(t,event);
}
if(event.getPropagationStopped()){return;
}}}}});
})();
(function(){var a="qx.event.dispatch.DomBubbling";
qx.Class.define(a,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(c){return c.parentNode;
},canDispatchEvent:function(d,event,e){return d.nodeType!==undefined&&event.getBubbles();
}},defer:function(b){qx.event.Registration.addDispatcher(b);
}});
})();
(function(){var q="keydown",p="qx.client",o="keypress",n="NumLock",m="keyup",l="Enter",k="0",j="9",i="-",h="PageUp",by="+",bx="PrintScreen",bw="gecko",bv="A",bu="Z",bt="Left",bs="F5",br="Down",bq="Up",bp="F11",x="F6",y="useraction",v="F3",w="keyinput",t="Insert",u="F8",r="End",s="/",F="Delete",G="*",S="cmd",O="F1",bb="F4",V="Home",bl="F2",bg="F12",K="PageDown",bo="F7",bn="Win",bm="F9",J="F10",M="Right",N="text",Q="Escape",T="webkit",W="5",bd="3",bi="Meta",z="7",A="CapsLock",L="input",ba="Control",Y="Space",X="Tab",bf="Shift",be="Pause",U="Unidentified",bc="qx.event.handler.Keyboard",e="mshtml|webkit",bh="6",B="off",C="Apps",P="4",f="Alt",g="mshtml",I="2",D="Scroll",E="1",H="8",R="autoComplete",bk=",",bj="Backspace";
qx.Class.define(bc,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(cp){qx.core.Object.call(this);
this.__manager=cp;
this.__window=cp.getWindow();
if(qx.core.Variant.isSet(p,bw)){this.__root=this.__window;
}else{this.__root=this.__window.document.documentElement;
}this.__lastUpDownType={};
this._initKeyObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(cu){if(this._identifierToKeyCodeMap[cu]){return true;
}
if(cu.length!=1){return false;
}
if(cu>=k&&cu<=j){return true;
}
if(cu>=bv&&cu<=bu){return true;
}
switch(cu){case by:case i:case G:case s:return true;
default:return false;
}}},members:{__onKeyUpDownWrapper:null,__manager:null,__window:null,__root:null,__lastUpDownType:null,__lastKeyCode:null,__inputListeners:null,__onKeyPressWrapper:null,canHandleEvent:function(bU,bV){},registerEvent:function(cl,cm,cn){},unregisterEvent:function(a,b,c){},_fireInputEvent:function(cJ,cK){var cL=this.__getEventTarget();
if(cL&&cL.offsetWidth!=0){var event=qx.event.Registration.createEvent(w,qx.event.type.KeyInput,[cJ,cL,cK]);
this.__manager.dispatchEvent(cL,event);
}if(this.__window){qx.event.Registration.fireEvent(this.__window,y,qx.event.type.Data,[w]);
}},_fireSequenceEvent:function(bz,bA,bB){var bC=this.__getEventTarget();
var bD=bz.keyCode;
var event=qx.event.Registration.createEvent(bA,qx.event.type.KeySequence,[bz,bC,bB]);
this.__manager.dispatchEvent(bC,event);
if(qx.core.Variant.isSet(p,e)){if(bA==q&&event.getDefaultPrevented()){if(!this._isNonPrintableKeyCode(bD)&&!this._emulateKeyPress[bD]){this._fireSequenceEvent(bz,o,bB);
}}}if(this.__window){qx.event.Registration.fireEvent(this.__window,y,qx.event.type.Data,[bA]);
}},__getEventTarget:function(){var cD=this.__manager.getHandler(qx.event.handler.Focus);
var cE=cD.getActive();
if(!cE||cE.offsetWidth==0){cE=cD.getFocus();
}if(!cE||cE.offsetWidth==0){cE=this.__manager.getWindow().document.body;
}return cE;
},_initKeyObserver:function(){this.__onKeyUpDownWrapper=qx.lang.Function.listener(this.__onKeyUpDown,this);
this.__onKeyPressWrapper=qx.lang.Function.listener(this.__onKeyPress,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__root,m,this.__onKeyUpDownWrapper);
Event.addNativeListener(this.__root,q,this.__onKeyUpDownWrapper);
Event.addNativeListener(this.__root,o,this.__onKeyPressWrapper);
},_stopKeyObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__root,m,this.__onKeyUpDownWrapper);
Event.removeNativeListener(this.__root,q,this.__onKeyUpDownWrapper);
Event.removeNativeListener(this.__root,o,this.__onKeyPressWrapper);

for(var bF in (this.__inputListeners||{})){var bE=this.__inputListeners[bF];
Event.removeNativeListener(bE.target,o,bE.callback);
}delete (this.__inputListeners);
},__onKeyUpDown:qx.event.GlobalError.observeMethod(qx.core.Variant.select(p,{"mshtml":function(bP){bP=window.event||bP;
var bS=bP.keyCode;
var bQ=0;
var bR=bP.type;
if(!(this.__lastUpDownType[bS]==q&&bR==q)){this._idealKeyHandler(bS,bQ,bR,bP);
}if(bR==q){if(this._isNonPrintableKeyCode(bS)||this._emulateKeyPress[bS]){this._idealKeyHandler(bS,bQ,o,bP);
}}this.__lastUpDownType[bS]=bR;
},"gecko":function(cx){var cB=this._keyCodeFix[cx.keyCode]||cx.keyCode;
var cz=0;
var cA=cx.type;
if(qx.bom.client.Platform.WIN){var cy=cB?this._keyCodeToIdentifier(cB):this._charCodeToIdentifier(cz);

if(!(this.__lastUpDownType[cy]==q&&cA==q)){this._idealKeyHandler(cB,cz,cA,cx);
}this.__lastUpDownType[cy]=cA;
}else{this._idealKeyHandler(cB,cz,cA,cx);
}this.__firefoxInputFix(cx.target,cA,cB);
},"webkit":function(cq){var ct=0;
var cr=0;
var cs=cq.type;
if(qx.bom.client.Engine.VERSION<525.13){if(cs==m||cs==q){ct=this._charCode2KeyCode[cq.charCode]||cq.keyCode;
}else{if(this._charCode2KeyCode[cq.charCode]){ct=this._charCode2KeyCode[cq.charCode];
}else{cr=cq.charCode;
}}this._idealKeyHandler(ct,cr,cs,cq);
}else{ct=cq.keyCode;
this._idealKeyHandler(ct,cr,cs,cq);
if(cs==q){if(this._isNonPrintableKeyCode(ct)||this._emulateKeyPress[ct]){this._idealKeyHandler(ct,cr,o,cq);
}}this.__lastUpDownType[ct]=cs;
}},"opera":function(cC){this.__lastKeyCode=cC.keyCode;
this._idealKeyHandler(cC.keyCode,0,cC.type,cC);
}})),__firefoxInputFix:qx.core.Variant.select(p,{"gecko":function(bG,bH,bI){if(bH===q&&(bI==33||bI==34||bI==38||bI==40)&&bG.type==N&&bG.tagName.toLowerCase()===L&&bG.getAttribute(R)!==B){if(!this.__inputListeners){this.__inputListeners={};
}var bK=qx.core.ObjectRegistry.toHashCode(bG);

if(this.__inputListeners[bK]){return;
}var self=this;
this.__inputListeners[bK]={target:bG,callback:function(bT){qx.bom.Event.stopPropagation(bT);
self.__onKeyPress(bT);
}};
var bJ=qx.event.GlobalError.observeMethod(this.__inputListeners[bK].callback);
qx.bom.Event.addNativeListener(bG,o,bJ);
}},"default":null}),__onKeyPress:qx.event.GlobalError.observeMethod(qx.core.Variant.select(p,{"mshtml":function(cv){cv=window.event||cv;

if(this._charCode2KeyCode[cv.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[cv.keyCode],0,cv.type,cv);
}else{this._idealKeyHandler(0,cv.keyCode,cv.type,cv);
}},"gecko":function(bW){var ca=this._keyCodeFix[bW.keyCode]||bW.keyCode;
var bX=bW.charCode;
var bY=bW.type;
this._idealKeyHandler(ca,bX,bY,bW);
},"webkit":function(bL){if(qx.bom.client.Engine.VERSION<525.13){var bO=0;
var bM=0;
var bN=bL.type;

if(bN==m||bN==q){bO=this._charCode2KeyCode[bL.charCode]||bL.keyCode;
}else{if(this._charCode2KeyCode[bL.charCode]){bO=this._charCode2KeyCode[bL.charCode];
}else{bM=bL.charCode;
}}this._idealKeyHandler(bO,bM,bN,bL);
}else{if(this._charCode2KeyCode[bL.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[bL.keyCode],0,bL.type,bL);
}else{this._idealKeyHandler(0,bL.keyCode,bL.type,bL);
}}},"opera":function(cG){var cI=cG.keyCode;
var cH=cG.type;
if(cI!=this.__lastKeyCode){this._idealKeyHandler(0,this.__lastKeyCode,cH,cG);
}else{if(this._keyCodeToIdentifierMap[cG.keyCode]){this._idealKeyHandler(cG.keyCode,0,cG.type,cG);
}else{this._idealKeyHandler(0,cG.keyCode,cG.type,cG);
}}}})),_idealKeyHandler:function(cb,cc,cd,ce){var cf;
if(cb||(!cb&&!cc)){cf=this._keyCodeToIdentifier(cb);
this._fireSequenceEvent(ce,cd,cf);
}else{cf=this._charCodeToIdentifier(cc);
this._fireSequenceEvent(ce,o,cf);
this._fireInputEvent(ce,cc);
}},_specialCharCodeMap:{8:bj,9:X,13:l,27:Q,32:Y},_emulateKeyPress:qx.core.Variant.select(p,{"mshtml":{8:true,9:true},"webkit":{8:true,9:true,27:true},"default":{}}),_keyCodeToIdentifierMap:{16:bf,17:ba,18:f,20:A,224:bi,37:bt,38:bq,39:M,40:br,33:h,34:K,35:r,36:V,45:t,46:F,112:O,113:bl,114:v,115:bb,116:bs,117:x,118:bo,119:u,120:bm,121:J,122:bp,123:bg,144:n,44:bx,145:D,19:be,91:qx.bom.client.Platform.MAC?S:bn,92:bn,93:qx.bom.client.Platform.MAC?S:C},_numpadToCharCode:{96:k.charCodeAt(0),97:E.charCodeAt(0),98:I.charCodeAt(0),99:bd.charCodeAt(0),100:P.charCodeAt(0),101:W.charCodeAt(0),102:bh.charCodeAt(0),103:z.charCodeAt(0),104:H.charCodeAt(0),105:j.charCodeAt(0),106:G.charCodeAt(0),107:by.charCodeAt(0),109:i.charCodeAt(0),110:bk.charCodeAt(0),111:s.charCodeAt(0)},_charCodeA:bv.charCodeAt(0),_charCodeZ:bu.charCodeAt(0),_charCode0:k.charCodeAt(0),_charCode9:j.charCodeAt(0),_isNonPrintableKeyCode:function(co){return this._keyCodeToIdentifierMap[co]?true:false;
},_isIdentifiableKeyCode:function(cw){if(cw>=this._charCodeA&&cw<=this._charCodeZ){return true;
}if(cw>=this._charCode0&&cw<=this._charCode9){return true;
}if(this._specialCharCodeMap[cw]){return true;
}if(this._numpadToCharCode[cw]){return true;
}if(this._isNonPrintableKeyCode(cw)){return true;
}return false;
},_keyCodeToIdentifier:function(cj){if(this._isIdentifiableKeyCode(cj)){var ck=this._numpadToCharCode[cj];

if(ck){return String.fromCharCode(ck);
}return (this._keyCodeToIdentifierMap[cj]||this._specialCharCodeMap[cj]||String.fromCharCode(cj));
}else{return U;
}},_charCodeToIdentifier:function(d){return this._specialCharCodeMap[d]||String.fromCharCode(d).toUpperCase();
},_identifierToKeyCode:function(cF){return qx.event.handler.Keyboard._identifierToKeyCodeMap[cF]||cF.charCodeAt(0);
}},destruct:function(){this._stopKeyObserver();
this.__lastKeyCode=this.__manager=this.__window=this.__root=this.__lastUpDownType=null;
},defer:function(cg,ch){qx.event.Registration.addHandler(cg);
if(!cg._identifierToKeyCodeMap){cg._identifierToKeyCodeMap={};

for(var ci in ch._keyCodeToIdentifierMap){cg._identifierToKeyCodeMap[ch._keyCodeToIdentifierMap[ci]]=parseInt(ci,10);
}
for(var ci in ch._specialCharCodeMap){cg._identifierToKeyCodeMap[ch._specialCharCodeMap[ci]]=parseInt(ci,10);
}}
if(qx.core.Variant.isSet(p,g)){ch._charCode2KeyCode={13:13,27:27};
}else if(qx.core.Variant.isSet(p,bw)){ch._keyCodeFix={12:ch._identifierToKeyCode(n)};
}else if(qx.core.Variant.isSet(p,T)){if(qx.bom.client.Engine.VERSION<525.13){ch._charCode2KeyCode={63289:ch._identifierToKeyCode(n),63276:ch._identifierToKeyCode(h),63277:ch._identifierToKeyCode(K),63275:ch._identifierToKeyCode(r),63273:ch._identifierToKeyCode(V),63234:ch._identifierToKeyCode(bt),63232:ch._identifierToKeyCode(bq),63235:ch._identifierToKeyCode(M),63233:ch._identifierToKeyCode(br),63272:ch._identifierToKeyCode(F),63302:ch._identifierToKeyCode(t),63236:ch._identifierToKeyCode(O),63237:ch._identifierToKeyCode(bl),63238:ch._identifierToKeyCode(v),63239:ch._identifierToKeyCode(bb),63240:ch._identifierToKeyCode(bs),63241:ch._identifierToKeyCode(x),63242:ch._identifierToKeyCode(bo),63243:ch._identifierToKeyCode(u),63244:ch._identifierToKeyCode(bm),63245:ch._identifierToKeyCode(J),63246:ch._identifierToKeyCode(bp),63247:ch._identifierToKeyCode(bg),63248:ch._identifierToKeyCode(bx),3:ch._identifierToKeyCode(l),12:ch._identifierToKeyCode(n),13:ch._identifierToKeyCode(l)};
}else{ch._charCode2KeyCode={13:13,27:27};
}}}});
})();
(function(){var T="qx.client",S="mouseup",R="click",Q="mousedown",P="contextmenu",O="mousewheel",N="dblclick",M="mshtml",L="mouseover",K="mouseout",F="DOMMouseScroll",J="mousemove",I="on",E="mshtml|webkit|opera",D="useraction",H="gecko|webkit",G="qx.event.handler.Mouse";
qx.Class.define(G,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(x){qx.core.Object.call(this);
this.__manager=x;
this.__window=x.getWindow();
this.__root=this.__window.document;
this._initButtonObserver();
this._initMoveObserver();
this._initWheelObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__onButtonEventWrapper:null,__onMoveEventWrapper:null,__onWheelEventWrapper:null,__lastEventType:null,__lastMouseDownTarget:null,__manager:null,__window:null,__root:null,canHandleEvent:function(V,W){},registerEvent:qx.bom.client.System.IPHONE?
function(a,b,c){a[I+b]=qx.lang.Function.returnNull;
}:qx.lang.Function.returnNull,unregisterEvent:qx.bom.client.System.IPHONE?
function(f,g,h){f[I+g]=undefined;
}:qx.lang.Function.returnNull,__fireEvent:function(o,p,q){if(!q){q=o.target||o.srcElement;
}if(q&&q.nodeType){qx.event.Registration.fireEvent(q,p||o.type,p==O?qx.event.type.MouseWheel:qx.event.type.Mouse,[o,q,null,true,true]);
}qx.event.Registration.fireEvent(this.__window,D,qx.event.type.Data,[p||o.type]);
},_initButtonObserver:function(){this.__onButtonEventWrapper=qx.lang.Function.listener(this._onButtonEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__root,Q,this.__onButtonEventWrapper);
Event.addNativeListener(this.__root,S,this.__onButtonEventWrapper);
Event.addNativeListener(this.__root,R,this.__onButtonEventWrapper);
Event.addNativeListener(this.__root,N,this.__onButtonEventWrapper);
Event.addNativeListener(this.__root,P,this.__onButtonEventWrapper);
},_initMoveObserver:function(){this.__onMoveEventWrapper=qx.lang.Function.listener(this._onMoveEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__root,J,this.__onMoveEventWrapper);
Event.addNativeListener(this.__root,L,this.__onMoveEventWrapper);
Event.addNativeListener(this.__root,K,this.__onMoveEventWrapper);
},_initWheelObserver:function(){this.__onWheelEventWrapper=qx.lang.Function.listener(this._onWheelEvent,this);
var Event=qx.bom.Event;
var d=qx.core.Variant.isSet(T,E)?O:F;
var e=qx.core.Variant.isSet(T,M)?this.__root:this.__window;
Event.addNativeListener(e,d,this.__onWheelEventWrapper);
},_stopButtonObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__root,Q,this.__onButtonEventWrapper);
Event.removeNativeListener(this.__root,S,this.__onButtonEventWrapper);
Event.removeNativeListener(this.__root,R,this.__onButtonEventWrapper);
Event.removeNativeListener(this.__root,N,this.__onButtonEventWrapper);
Event.removeNativeListener(this.__root,P,this.__onButtonEventWrapper);
},_stopMoveObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__root,J,this.__onMoveEventWrapper);
Event.removeNativeListener(this.__root,L,this.__onMoveEventWrapper);
Event.removeNativeListener(this.__root,K,this.__onMoveEventWrapper);
},_stopWheelObserver:function(){var Event=qx.bom.Event;
var m=qx.core.Variant.isSet(T,E)?O:F;
var n=qx.core.Variant.isSet(T,M)?this.__root:this.__window;
Event.removeNativeListener(n,m,this.__onWheelEventWrapper);
},_onMoveEvent:qx.event.GlobalError.observeMethod(function(C){this.__fireEvent(C);
}),_onButtonEvent:qx.event.GlobalError.observeMethod(function(X){var Y=X.type;
var ba=X.target||X.srcElement;
if(qx.core.Variant.isSet(T,H)){if(ba&&ba.nodeType==3){ba=ba.parentNode;
}}
if(this.__rightClickFixPre){this.__rightClickFixPre(X,Y,ba);
}
if(this.__doubleClickFixPre){this.__doubleClickFixPre(X,Y,ba);
}this.__fireEvent(X,Y,ba);

if(this.__rightClickFixPost){this.__rightClickFixPost(X,Y,ba);
}
if(this.__differentTargetClickFixPost){this.__differentTargetClickFixPost(X,Y,ba);
}this.__lastEventType=Y;
}),_onWheelEvent:qx.event.GlobalError.observeMethod(function(U){this.__fireEvent(U,O);
}),__rightClickFixPre:qx.core.Variant.select(T,{"webkit":function(i,j,k){if(qx.bom.client.Engine.VERSION<530){if(j==P){this.__fireEvent(i,S,k);
}}},"default":null}),__rightClickFixPost:qx.core.Variant.select(T,{"opera":function(u,v,w){if(v==S&&u.button==2){this.__fireEvent(u,P,w);
}},"default":null}),__doubleClickFixPre:qx.core.Variant.select(T,{"mshtml":function(r,s,t){if(s==S&&this.__lastEventType==R){this.__fireEvent(r,Q,t);
}else if(s==N){this.__fireEvent(r,R,t);
}},"default":null}),__differentTargetClickFixPost:qx.core.Variant.select(T,{"mshtml":null,"default":function(y,z,A){switch(z){case Q:this.__lastMouseDownTarget=A;
break;
case S:if(A!==this.__lastMouseDownTarget){var B=qx.dom.Hierarchy.getCommonParent(A,this.__lastMouseDownTarget);
this.__fireEvent(y,R,B);
}}}})},destruct:function(){this._stopButtonObserver();
this._stopMoveObserver();
this._stopWheelObserver();
this.__manager=this.__window=this.__root=this.__lastMouseDownTarget=null;
},defer:function(l){qx.event.Registration.addHandler(l);
}});
})();
(function(){var a="qx.event.handler.Capture";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(h,i){},registerEvent:function(b,c,d){},unregisterEvent:function(e,f,g){}},defer:function(j){qx.event.Registration.addHandler(j);
}});
})();
(function(){var S="alias",R="copy",Q="blur",P="mouseout",O="keydown",N="Ctrl",M="Shift",L="mousemove",K="move",J="mouseover",bj="Alt",bi="keyup",bh="mouseup",bg="dragend",bf="on",be="mousedown",bd="qxDraggable",bc="drag",bb="drop",ba="qxDroppable",X="qx.event.handler.DragDrop",Y="droprequest",V="dragstart",W="dragchange",T="dragleave",U="dragover";
qx.Class.define(X,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(k){qx.core.Object.call(this);
this.__manager=k;
this.__root=k.getWindow().document.documentElement;
this.__manager.addListener(this.__root,be,this._onMouseDown,this);
this.__rebuildStructures();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__manager:null,__root:null,__dropTarget:null,__dragTarget:null,__types:null,__actions:null,__keys:null,__cache:null,__currentType:null,__currentAction:null,__sessionActive:false,__startLeft:0,__startTop:0,canHandleEvent:function(C,D){},registerEvent:function(G,H,I){},unregisterEvent:function(u,v,w){},addType:function(g){this.__types[g]=true;
},addAction:function(m){this.__actions[m]=true;
},supportsType:function(E){return !!this.__types[E];
},supportsAction:function(bm){return !!this.__actions[bm];
},getData:function(B){if(!this.__validDrop||!this.__dropTarget){throw new Error("This method must not be used outside the drop event listener!");
}
if(!this.__types[B]){throw new Error("Unsupported data type: "+B+"!");
}
if(!this.__cache[B]){this.__currentType=B;
this.__fireEvent(Y,this.__dragTarget,this.__dropTarget,false);
}
if(!this.__cache[B]){throw new Error("Please use a droprequest listener to the drag source to fill the manager with data!");
}return this.__cache[B]||null;
},getCurrentAction:function(){return this.__currentAction;
},addData:function(bk,bl){this.__cache[bk]=bl;
},getCurrentType:function(){return this.__currentType;
},isSessionActive:function(){return this.__sessionActive;
},__rebuildStructures:function(){this.__types={};
this.__actions={};
this.__keys={};
this.__cache={};
},__detectAction:function(){if(this.__dragTarget==null){return;
}var c=this.__actions;
var a=this.__keys;
var b=null;

if(this.__validDrop){if(a.Shift&&a.Ctrl&&c.alias){b=S;
}else if(a.Shift&&a.Alt&&c.copy){b=R;
}else if(a.Shift&&c.move){b=K;
}else if(a.Alt&&c.alias){b=S;
}else if(a.Ctrl&&c.copy){b=R;
}else if(c.move){b=K;
}else if(c.copy){b=R;
}else if(c.alias){b=S;
}}
if(b!=this.__currentAction){this.__currentAction=b;
this.__fireEvent(W,this.__dragTarget,this.__dropTarget,false);
}},__fireEvent:function(n,o,p,q,r){var t=qx.event.Registration;
var s=t.createEvent(n,qx.event.type.Drag,[q,r]);

if(o!==p){s.setRelatedTarget(p);
}return t.dispatchEvent(o,s);
},__findDraggable:function(d){while(d&&d.nodeType==1){if(d.getAttribute(bd)==bf){return d;
}d=d.parentNode;
}return null;
},__findDroppable:function(l){while(l&&l.nodeType==1){if(l.getAttribute(ba)==bf){return l;
}l=l.parentNode;
}return null;
},__clearInit:function(){this.__dragTarget=null;
this.__manager.removeListener(this.__root,L,this._onMouseMove,this,true);
this.__manager.removeListener(this.__root,bh,this._onMouseUp,this,true);
qx.event.Registration.removeListener(window,Q,this._onWindowBlur,this);
this.__rebuildStructures();
},__clearSession:function(){if(this.__sessionActive){this.__manager.removeListener(this.__root,J,this._onMouseOver,this,true);
this.__manager.removeListener(this.__root,P,this._onMouseOut,this,true);
this.__manager.removeListener(this.__root,O,this._onKeyDown,this,true);
this.__manager.removeListener(this.__root,bi,this._onKeyUp,this,true);
this.__fireEvent(bg,this.__dragTarget,this.__dropTarget,false);
this.__sessionActive=false;
}this.__validDrop=false;
this.__dropTarget=null;
this.__clearInit();
},__validDrop:false,_onWindowBlur:function(e){this.__clearSession();
},_onKeyDown:function(e){var y=e.getKeyIdentifier();

switch(y){case bj:case N:case M:if(!this.__keys[y]){this.__keys[y]=true;
this.__detectAction();
}}},_onKeyUp:function(e){var f=e.getKeyIdentifier();

switch(f){case bj:case N:case M:if(this.__keys[f]){this.__keys[f]=false;
this.__detectAction();
}}},_onMouseDown:function(e){if(this.__sessionActive){return;
}var F=this.__findDraggable(e.getTarget());

if(F){this.__startLeft=e.getDocumentLeft();
this.__startTop=e.getDocumentTop();
this.__dragTarget=F;
this.__manager.addListener(this.__root,L,this._onMouseMove,this,true);
this.__manager.addListener(this.__root,bh,this._onMouseUp,this,true);
qx.event.Registration.addListener(window,Q,this._onWindowBlur,this);
}},_onMouseUp:function(e){if(this.__validDrop){this.__fireEvent(bb,this.__dropTarget,this.__dragTarget,false,e);
}if(this.__sessionActive){e.stopPropagation();
}this.__clearSession();
},_onMouseMove:function(e){if(this.__sessionActive){if(!this.__fireEvent(bc,this.__dragTarget,this.__dropTarget,true,e)){this.__clearSession();
}}else{if(Math.abs(e.getDocumentLeft()-this.__startLeft)>3||Math.abs(e.getDocumentTop()-this.__startTop)>3){if(this.__fireEvent(V,this.__dragTarget,this.__dropTarget,true,e)){this.__sessionActive=true;
this.__manager.addListener(this.__root,J,this._onMouseOver,this,true);
this.__manager.addListener(this.__root,P,this._onMouseOut,this,true);
this.__manager.addListener(this.__root,O,this._onKeyDown,this,true);
this.__manager.addListener(this.__root,bi,this._onKeyUp,this,true);
var h=this.__keys;
h.Ctrl=e.isCtrlPressed();
h.Shift=e.isShiftPressed();
h.Alt=e.isAltPressed();
this.__detectAction();
}else{this.__fireEvent(bg,this.__dragTarget,this.__dropTarget,false);
this.__clearInit();
}}}},_onMouseOver:function(e){var i=e.getTarget();
var j=this.__findDroppable(i);

if(j&&j!=this.__dropTarget){this.__validDrop=this.__fireEvent(U,j,this.__dragTarget,true,e);
this.__dropTarget=j;
this.__detectAction();
}},_onMouseOut:function(e){var A=this.__findDroppable(e.getTarget());
var z=this.__findDroppable(e.getRelatedTarget());

if(A&&A!==z&&A==this.__dropTarget){this.__fireEvent(T,this.__dropTarget,z,false,e);
this.__dropTarget=null;
this.__validDrop=false;
qx.event.Timer.once(this.__detectAction,this,0);
}}},destruct:function(){this.__dragTarget=this.__dropTarget=this.__manager=this.__root=this.__types=this.__actions=this.__keys=this.__cache=null;
},defer:function(x){qx.event.Registration.addHandler(x);
}});
})();
(function(){var b="-",a="qx.event.handler.Element";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(c){qx.core.Object.call(this);
this._manager=c;
this._registeredEvents={};
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,scroll:true,select:true,reset:true,submit:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(g,h){},registerEvent:function(n,o,p){var s=qx.core.ObjectRegistry.toHashCode(n);
var q=s+b+o;
var r=qx.lang.Function.listener(this._onNative,this,q);
qx.bom.Event.addNativeListener(n,o,r);
this._registeredEvents[q]={element:n,type:o,listener:r};
},unregisterEvent:function(t,u,v){var y=this._registeredEvents;

if(!y){return;
}var z=qx.core.ObjectRegistry.toHashCode(t);
var w=z+b+u;
var x=this._registeredEvents[w];

if(x){qx.bom.Event.removeNativeListener(t,u,x.listener);
}delete this._registeredEvents[w];
},_onNative:qx.event.GlobalError.observeMethod(function(i,j){var l=this._registeredEvents;

if(!l){return;
}var k=l[j];
qx.event.Registration.fireNonBubblingEvent(k.element,k.type,qx.event.type.Native,[i]);
})},destruct:function(){var d;
var e=this._registeredEvents;

for(var f in e){d=e[f];
qx.bom.Event.removeNativeListener(d.element,d.type,d.listener);
}this._manager=this._registeredEvents=null;
},defer:function(m){qx.event.Registration.addHandler(m);
}});
})();
(function(){var c="qx.event.handler.Appear",b="disappear",a="appear";
qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);
this.__manager=d;
this.__targets={};
qx.event.handler.Appear.__instances[this.$$hash]=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__instances:{},refresh:function(){var e=this.__instances;

for(var f in e){e[f].refresh();
}}},members:{__manager:null,__targets:null,canHandleEvent:function(m,n){},registerEvent:function(h,i,j){var k=qx.core.ObjectRegistry.toHashCode(h)+i;
var l=this.__targets;

if(l&&!l[k]){l[k]=h;
h.$$displayed=h.offsetWidth>0;
}},unregisterEvent:function(o,p,q){var r=qx.core.ObjectRegistry.toHashCode(o)+p;
var s=this.__targets;

if(!s){return;
}
if(s[r]){delete s[r];
}},refresh:function(){var w=this.__targets;
var x;

for(var v in w){x=w[v];
var t=x.offsetWidth>0;

if((!!x.$$displayed)!==t){x.$$displayed=t;
var u=qx.event.Registration.createEvent(t?a:b);
this.__manager.dispatchEvent(x,u);
}}}},destruct:function(){this.__manager=this.__targets=null;
delete qx.event.handler.Appear.__instances[this.$$hash];
},defer:function(g){qx.event.Registration.addHandler(g);
}});
})();
(function(){var p="mshtml",o="",n="qx.client",m=">",k=" ",h="<",g="='",f="none",e="qx.bom.Element",d="' ",b="div",c="></";
qx.Class.define(e,{statics:{__initialAttributes:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},__helperElement:{},getHelperElement:function(R){if(!R){R=window;
}var T=R.location.href;

if(!qx.bom.Element.__helperElement[T]){var S=qx.bom.Element.__helperElement[T]=R.document.createElement(b);
if(qx.bom.client.Engine.WEBKIT){S.style.display=f;
R.document.body.appendChild(S);
}}return qx.bom.Element.__helperElement[T];
},create:function(name,K,L){if(!L){L=window;
}
if(!name){throw new Error("The tag name is missing!");
}var N=this.__initialAttributes;
var M=o;

for(var P in K){if(N[P]){M+=P+g+K[P]+d;
}}var Q;
if(M!=o){if(qx.bom.client.Engine.MSHTML){Q=L.document.createElement(h+name+k+M+m);
}else{var O=qx.bom.Element.getHelperElement(L);
O.innerHTML=h+name+k+M+c+name+m;
Q=O.firstChild;
}}else{Q=L.document.createElement(name);
}
for(var P in K){if(!N[P]){qx.bom.element.Attribute.set(Q,P,K[P]);
}}return Q;
},empty:function(q){return q.innerHTML=o;
},addListener:function(t,u,v,self,w){return qx.event.Registration.addListener(t,u,v,self,w);
},removeListener:function(F,G,H,self,I){return qx.event.Registration.removeListener(F,G,H,self,I);
},removeListenerById:function(D,E){return qx.event.Registration.removeListenerById(D,E);
},hasListener:function(A,B,C){return qx.event.Registration.hasListener(A,B,C);
},focus:function(x){qx.event.Registration.getManager(x).getHandler(qx.event.handler.Focus).focus(x);
},blur:function(y){qx.event.Registration.getManager(y).getHandler(qx.event.handler.Focus).blur(y);
},activate:function(J){qx.event.Registration.getManager(J).getHandler(qx.event.handler.Focus).activate(J);
},deactivate:function(a){qx.event.Registration.getManager(a).getHandler(qx.event.handler.Focus).deactivate(a);
},capture:function(r,s){qx.event.Registration.getManager(r).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(r,s);
},releaseCapture:function(z){qx.event.Registration.getManager(z).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(z);
},clone:function(U,V){var Y;

if(V||(qx.core.Variant.isSet(n,p)&&!qx.xml.Document.isXmlDocument(U))){var bd=qx.event.Registration.getManager(U);
var W=qx.dom.Hierarchy.getDescendants(U);
W.push(U);
}if(qx.core.Variant.isSet(n,p)){for(var i=0,l=W.length;i<l;i++){bd.toggleAttachedEvents(W[i],false);
}}var Y=U.cloneNode(true);
if(qx.core.Variant.isSet(n,p)){for(var i=0,l=W.length;i<l;i++){bd.toggleAttachedEvents(W[i],true);
}}if(V===true){var bg=qx.dom.Hierarchy.getDescendants(Y);
bg.push(Y);
var X,bb,bf,ba;

for(var i=0,be=W.length;i<be;i++){bf=W[i];
X=bd.serializeListeners(bf);

if(X.length>0){bb=bg[i];

for(var j=0,bc=X.length;j<bc;j++){ba=X[j];
bd.addListener(bb,ba.type,ba.handler,ba.self,ba.capture);
}}}}return Y;
}}});
})();
(function(){var a="qx.event.type.Dom";
qx.Class.define(a,{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Native.prototype._cloneNativeEvent.call(this,b,c);
c.shiftKey=b.shiftKey;
c.ctrlKey=b.ctrlKey;
c.altKey=b.altKey;
c.metaKey=b.metaKey;
return c;
},getModifiers:function(){var e=0;
var d=this._native;

if(d.shiftKey){e|=qx.event.type.Dom.SHIFT_MASK;
}
if(d.ctrlKey){e|=qx.event.type.Dom.CTRL_MASK;
}
if(d.altKey){e|=qx.event.type.Dom.ALT_MASK;
}
if(d.metaKey){e|=qx.event.type.Dom.META_MASK;
}return e;
},isCtrlPressed:function(){return this._native.ctrlKey;
},isShiftPressed:function(){return this._native.shiftKey;
},isAltPressed:function(){return this._native.altKey;
},isMetaPressed:function(){return this._native.metaKey;
},isCtrlOrCommandPressed:function(){if(qx.bom.client.Platform.MAC){return this._native.metaKey;
}else{return this._native.ctrlKey;
}}}});
})();
(function(){var a="qx.event.type.KeyInput";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(d,e,f){qx.event.type.Dom.prototype.init.call(this,d,e,null,true,true);
this._charCode=f;
return this;
},clone:function(b){var c=qx.event.type.Dom.prototype.clone.call(this,b);
c._charCode=this._charCode;
return c;
},getCharCode:function(){return this._charCode;
},getChar:function(){return String.fromCharCode(this._charCode);
}}});
})();
(function(){var a="qx.event.type.KeySequence";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(d,e,f){qx.event.type.Dom.prototype.init.call(this,d,e,null,true,true);
this._identifier=f;
return this;
},clone:function(b){var c=qx.event.type.Dom.prototype.clone.call(this,b);
c._identifier=this._identifier;
return c;
},getKeyIdentifier:function(){return this._identifier;
}}});
})();
(function(){var I="qx.client",H="blur",G="focus",F="mousedown",E="on",D="mouseup",C="DOMFocusOut",B="DOMFocusIn",A="selectstart",z="onmousedown",bd="onfocusout",bc="onfocusin",bb="onmouseup",ba="onselectstart",Y="draggesture",X="qx.event.handler.Focus",W="_applyFocus",V="deactivate",U="textarea",T="_applyActive",P="input",Q="focusin",N="qxSelectable",O="tabIndex",L="off",M="activate",J="mshtml",K="focusout",R="qxKeepFocus",S="qxKeepActive";
qx.Class.define(X,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(br){qx.core.Object.call(this);
this._manager=br;
this._window=br.getWindow();
this._document=this._window.document;
this._root=this._document.documentElement;
this._body=this._document.body;
this._initObserver();
},properties:{active:{apply:T,nullable:true},focus:{apply:W,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Variant.select("qx.client",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__onNativeMouseDownWrapper:null,__onNativeMouseUpWrapper:null,__onNativeFocusWrapper:null,__onNativeBlurWrapper:null,__onNativeDragGestureWrapper:null,__onNativeSelectStartWrapper:null,__onNativeFocusInWrapper:null,__onNativeFocusOutWrapper:null,__previousFocus:null,__previousActive:null,canHandleEvent:function(bk,bl){},registerEvent:function(bD,bE,bF){},unregisterEvent:function(bh,bi,bj){},focus:function(l){if(qx.core.Variant.isSet(I,J)){window.setTimeout(function(){try{l.focus();
}catch(bH){}},0);
}else{try{l.focus();
}catch(bu){}}this.setFocus(l);
this.setActive(l);
},activate:function(p){this.setActive(p);
},blur:function(be){try{be.blur();
}catch(y){}
if(this.getActive()===be){this.resetActive();
}
if(this.getFocus()===be){this.resetFocus();
}},deactivate:function(bw){if(this.getActive()===bw){this.resetActive();
}},tryActivate:function(bL){var bM=this.__findActivatableElement(bL);

if(bM){this.setActive(bM);
}},__fireEvent:function(bx,by,bz,bA){var bC=qx.event.Registration;
var bB=bC.createEvent(bz,qx.event.type.Focus,[bx,by,bA]);
bC.dispatchEvent(bx,bB);
},_windowFocused:true,__doWindowBlur:function(){if(this._windowFocused){this._windowFocused=false;
this.__fireEvent(this._window,null,H,false);
}},__doWindowFocus:function(){if(!this._windowFocused){this._windowFocused=true;
this.__fireEvent(this._window,null,G,false);
}},_initObserver:qx.core.Variant.select(I,{"gecko":function(){this.__onNativeMouseDownWrapper=qx.lang.Function.listener(this.__onNativeMouseDown,this);
this.__onNativeMouseUpWrapper=qx.lang.Function.listener(this.__onNativeMouseUp,this);
this.__onNativeFocusWrapper=qx.lang.Function.listener(this.__onNativeFocus,this);
this.__onNativeBlurWrapper=qx.lang.Function.listener(this.__onNativeBlur,this);
this.__onNativeDragGestureWrapper=qx.lang.Function.listener(this.__onNativeDragGesture,this);
this._document.addEventListener(F,this.__onNativeMouseDownWrapper,true);
this._document.addEventListener(D,this.__onNativeMouseUpWrapper,true);
this._window.addEventListener(G,this.__onNativeFocusWrapper,true);
this._window.addEventListener(H,this.__onNativeBlurWrapper,true);
this._window.addEventListener(Y,this.__onNativeDragGestureWrapper,true);
},"mshtml":function(){this.__onNativeMouseDownWrapper=qx.lang.Function.listener(this.__onNativeMouseDown,this);
this.__onNativeMouseUpWrapper=qx.lang.Function.listener(this.__onNativeMouseUp,this);
this.__onNativeFocusInWrapper=qx.lang.Function.listener(this.__onNativeFocusIn,this);
this.__onNativeFocusOutWrapper=qx.lang.Function.listener(this.__onNativeFocusOut,this);
this.__onNativeSelectStartWrapper=qx.lang.Function.listener(this.__onNativeSelectStart,this);
this._document.attachEvent(z,this.__onNativeMouseDownWrapper);
this._document.attachEvent(bb,this.__onNativeMouseUpWrapper);
this._document.attachEvent(bc,this.__onNativeFocusInWrapper);
this._document.attachEvent(bd,this.__onNativeFocusOutWrapper);
this._document.attachEvent(ba,this.__onNativeSelectStartWrapper);
},"webkit":function(){this.__onNativeMouseDownWrapper=qx.lang.Function.listener(this.__onNativeMouseDown,this);
this.__onNativeMouseUpWrapper=qx.lang.Function.listener(this.__onNativeMouseUp,this);
this.__onNativeFocusOutWrapper=qx.lang.Function.listener(this.__onNativeFocusOut,this);
this.__onNativeFocusWrapper=qx.lang.Function.listener(this.__onNativeFocus,this);
this.__onNativeBlurWrapper=qx.lang.Function.listener(this.__onNativeBlur,this);
this.__onNativeSelectStartWrapper=qx.lang.Function.listener(this.__onNativeSelectStart,this);
this._document.addEventListener(F,this.__onNativeMouseDownWrapper,true);
this._document.addEventListener(D,this.__onNativeMouseUpWrapper,true);
this._document.addEventListener(A,this.__onNativeSelectStartWrapper,false);
this._window.addEventListener(C,this.__onNativeFocusOutWrapper,true);
this._window.addEventListener(G,this.__onNativeFocusWrapper,true);
this._window.addEventListener(H,this.__onNativeBlurWrapper,true);
},"opera":function(){this.__onNativeMouseDownWrapper=qx.lang.Function.listener(this.__onNativeMouseDown,this);
this.__onNativeMouseUpWrapper=qx.lang.Function.listener(this.__onNativeMouseUp,this);
this.__onNativeFocusInWrapper=qx.lang.Function.listener(this.__onNativeFocusIn,this);
this.__onNativeFocusOutWrapper=qx.lang.Function.listener(this.__onNativeFocusOut,this);
this._document.addEventListener(F,this.__onNativeMouseDownWrapper,true);
this._document.addEventListener(D,this.__onNativeMouseUpWrapper,true);
this._window.addEventListener(B,this.__onNativeFocusInWrapper,true);
this._window.addEventListener(C,this.__onNativeFocusOutWrapper,true);
}}),_stopObserver:qx.core.Variant.select(I,{"gecko":function(){this._document.removeEventListener(F,this.__onNativeMouseDownWrapper,true);
this._document.removeEventListener(D,this.__onNativeMouseUpWrapper,true);
this._window.removeEventListener(G,this.__onNativeFocusWrapper,true);
this._window.removeEventListener(H,this.__onNativeBlurWrapper,true);
this._window.removeEventListener(Y,this.__onNativeDragGestureWrapper,true);
},"mshtml":function(){qx.bom.Event.removeNativeListener(this._document,z,this.__onNativeMouseDownWrapper);
qx.bom.Event.removeNativeListener(this._document,bb,this.__onNativeMouseUpWrapper);
qx.bom.Event.removeNativeListener(this._document,bc,this.__onNativeFocusInWrapper);
qx.bom.Event.removeNativeListener(this._document,bd,this.__onNativeFocusOutWrapper);
qx.bom.Event.removeNativeListener(this._document,ba,this.__onNativeSelectStartWrapper);
},"webkit":function(){this._document.removeEventListener(F,this.__onNativeMouseDownWrapper,true);
this._document.removeEventListener(A,this.__onNativeSelectStartWrapper,false);
this._window.removeEventListener(B,this.__onNativeFocusInWrapper,true);
this._window.removeEventListener(C,this.__onNativeFocusOutWrapper,true);
this._window.removeEventListener(G,this.__onNativeFocusWrapper,true);
this._window.removeEventListener(H,this.__onNativeBlurWrapper,true);
},"opera":function(){this._document.removeEventListener(F,this.__onNativeMouseDownWrapper,true);
this._window.removeEventListener(B,this.__onNativeFocusInWrapper,true);
this._window.removeEventListener(C,this.__onNativeFocusOutWrapper,true);
this._window.removeEventListener(G,this.__onNativeFocusWrapper,true);
this._window.removeEventListener(H,this.__onNativeBlurWrapper,true);
}}),__onNativeDragGesture:qx.event.GlobalError.observeMethod(qx.core.Variant.select(I,{"gecko":function(e){if(!this.__isSelectable(e.target)){qx.bom.Event.preventDefault(e);
}},"default":null})),__onNativeFocusIn:qx.event.GlobalError.observeMethod(qx.core.Variant.select(I,{"mshtml":function(e){this.__doWindowFocus();
var s=e.srcElement;
var r=this.__findFocusableElement(s);

if(r){this.setFocus(r);
}this.tryActivate(s);
},"opera":function(e){var q=e.target;

if(q==this._document||q==this._window){this.__doWindowFocus();

if(this.__previousFocus){this.setFocus(this.__previousFocus);
delete this.__previousFocus;
}
if(this.__previousActive){this.setActive(this.__previousActive);
delete this.__previousActive;
}}else{this.setFocus(q);
this.tryActivate(q);
if(!this.__isSelectable(q)){q.selectionStart=0;
q.selectionEnd=0;
}}},"default":null})),__onNativeFocusOut:qx.event.GlobalError.observeMethod(qx.core.Variant.select(I,{"mshtml":function(e){if(!e.toElement){this.__doWindowBlur();
this.resetFocus();
this.resetActive();
}},"webkit":function(e){var bG=e.target;

if(bG===this.getFocus()){this.resetFocus();
}
if(bG===this.getActive()){this.resetActive();
}},"opera":function(e){var t=e.target;

if(t==this._document){this.__doWindowBlur();
this.__previousFocus=this.getFocus();
this.__previousActive=this.getActive();
this.resetFocus();
this.resetActive();
}else{if(t===this.getFocus()){this.resetFocus();
}
if(t===this.getActive()){this.resetActive();
}}},"default":null})),__onNativeBlur:qx.event.GlobalError.observeMethod(qx.core.Variant.select(I,{"gecko":function(e){if(e.target===this._window||e.target===this._document){this.__doWindowBlur();
this.resetActive();
this.resetFocus();
}},"webkit":function(e){if(e.target===this._window||e.target===this._document){this.__doWindowBlur();
this.__previousFocus=this.getFocus();
this.__previousActive=this.getActive();
this.resetActive();
this.resetFocus();
}},"default":null})),__onNativeFocus:qx.event.GlobalError.observeMethod(qx.core.Variant.select(I,{"gecko":function(e){var bN=e.target;

if(bN===this._window||bN===this._document){this.__doWindowFocus();
bN=this._body;
}this.setFocus(bN);
this.tryActivate(bN);
},"webkit":function(e){var o=e.target;

if(o===this._window||o===this._document){this.__doWindowFocus();

if(this.__previousFocus){this.setFocus(this.__previousFocus);
delete this.__previousFocus;
}
if(this.__previousActive){this.setActive(this.__previousActive);
delete this.__previousActive;
}}else{this.setFocus(o);
this.tryActivate(o);
}},"default":null})),__onNativeMouseDown:qx.event.GlobalError.observeMethod(qx.core.Variant.select(I,{"gecko":function(e){var n=this.__findFocusableElement(e.target);

if(!n){qx.bom.Event.preventDefault(e);
}else if(n===this._body){this.setFocus(n);
}},"mshtml":function(e){var bt=e.srcElement;
var bs=this.__findFocusableElement(bt);

if(bs){if(!this.__isSelectable(bt)){bt.unselectable=E;
try{document.selection.empty();
}catch(e){}try{bs.focus();
}catch(e){}}}else{qx.bom.Event.preventDefault(e);
if(!this.__isSelectable(bt)){bt.unselectable=E;
}}},"webkit":function(e){var bp=e.target;
var bo=this.__findFocusableElement(bp);

if(bo){this.setFocus(bo);
}else{qx.bom.Event.preventDefault(e);
}},"opera":function(e){var bK=e.target;
var bI=this.__findFocusableElement(bK);

if(!this.__isSelectable(bK)){qx.bom.Event.preventDefault(e);
if(bI){var bJ=this.getFocus();

if(bJ&&bJ.selectionEnd){bJ.selectionStart=0;
bJ.selectionEnd=0;
bJ.blur();
}if(bI){this.setFocus(bI);
}}}else if(bI){this.setFocus(bI);
}},"default":null})),__onNativeMouseUp:qx.event.GlobalError.observeMethod(qx.core.Variant.select(I,{"mshtml":function(e){var w=e.srcElement;

if(w.unselectable){w.unselectable=L;
}this.tryActivate(this.__fixFocus(w));
},"gecko":function(e){var x=e.target;

while(x&&x.offsetWidth===undefined){x=x.parentNode;
}
if(x){this.tryActivate(x);
}},"webkit|opera":function(e){this.tryActivate(this.__fixFocus(e.target));
},"default":null})),__fixFocus:qx.event.GlobalError.observeMethod(qx.core.Variant.select(I,{"mshtml|webkit":function(a){var b=this.getFocus();

if(b&&a!=b&&(b.nodeName.toLowerCase()===P||b.nodeName.toLowerCase()===U)){a=b;
}return a;
},"default":function(bq){return bq;
}})),__onNativeSelectStart:qx.event.GlobalError.observeMethod(qx.core.Variant.select(I,{"mshtml|webkit":function(e){var bv=qx.bom.client.Engine.MSHTML?e.srcElement:e.target;

if(!this.__isSelectable(bv)){qx.bom.Event.preventDefault(e);
}},"default":null})),__isFocusable:function(c){var d=qx.bom.element.Attribute.get(c,O);

if(d>=1){return true;
}var f=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(d>=0&&f[c.tagName]){return true;
}return false;
},__findFocusableElement:function(m){while(m&&m.nodeType===1){if(m.getAttribute(R)==E){return null;
}
if(this.__isFocusable(m)){return m;
}m=m.parentNode;
}return this._body;
},__findActivatableElement:function(j){var k=j;

while(j&&j.nodeType===1){if(j.getAttribute(S)==E){return null;
}j=j.parentNode;
}return k;
},__isSelectable:function(bf){while(bf&&bf.nodeType===1){var bg=bf.getAttribute(N);

if(bg!=null){return bg===E;
}bf=bf.parentNode;
}return true;
},_applyActive:function(u,v){if(v){this.__fireEvent(v,u,V,true);
}
if(u){this.__fireEvent(u,v,M,true);
}},_applyFocus:function(bm,bn){if(bn){this.__fireEvent(bn,bm,K,true);
}
if(bm){this.__fireEvent(bm,bn,Q,true);
}if(bn){this.__fireEvent(bn,bm,H,false);
}
if(bm){this.__fireEvent(bm,bn,G,false);
}}},destruct:function(){this._stopObserver();
this._manager=this._window=this._document=this._root=this._body=this.__mouseActive=null;
},defer:function(g){qx.event.Registration.addHandler(g);
var h=g.FOCUSABLE_ELEMENTS;

for(var i in h){h[i.toUpperCase()]=1;
}}});
})();
(function(){var a="qx.event.type.Focus";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,d,false);
this._target=b;
this._relatedTarget=c;
return this;
}}});
})();
(function(){var j="",i="undefined",h="qx.client",g="readOnly",f="accessKey",e="qx.bom.element.Attribute",d="rowSpan",c="vAlign",b="className",a="textContent",y="'",x="htmlFor",w="longDesc",v="cellSpacing",u="frameBorder",t="='",s="useMap",r="innerText",q="innerHTML",p="tabIndex",n="dateTime",o="maxLength",l="mshtml",m="cellPadding",k="colSpan";
qx.Class.define(e,{statics:{__hints:{names:{"class":b,"for":x,html:q,text:qx.core.Variant.isSet(h,l)?r:a,colspan:k,rowspan:d,valign:c,datetime:n,accesskey:f,tabindex:p,maxlength:o,readonly:g,longdesc:w,cellpadding:m,cellspacing:v,frameborder:u,usemap:s},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readOnly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},qxProperties:{$$widget:1,$$html:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:j,className:j,innerHTML:j,innerText:j,textContent:j,htmlFor:j,tabIndex:0,maxLength:qx.core.Variant.select(h,{"mshtml":2147483647,"webkit":524288,"default":-1})},removeableProperties:{disabled:1,multiple:1,maxLength:1},original:{href:1,src:1,type:1}},compile:function(A){var B=[];
var D=this.__hints.runtime;

for(var C in A){if(!D[C]){B.push(C,t,A[C],y);
}}return B.join(j);
},get:qx.core.Variant.select(h,{"mshtml":function(E,name){var G=this.__hints;
var F;
name=G.names[name]||name;
if(G.original[name]){F=E.getAttribute(name,2);
}else if(G.property[name]){F=E[name];

if(typeof G.propertyDefault[name]!==i&&F==G.propertyDefault[name]){if(typeof G.bools[name]===i){return null;
}else{return F;
}}}else{F=E.getAttribute(name);
}if(G.bools[name]){return !!F;
}return F;
},"default":function(K,name){var M=this.__hints;
var L;
name=M.names[name]||name;
if(M.property[name]){L=K[name];

if(typeof M.propertyDefault[name]!==i&&L==M.propertyDefault[name]){if(typeof M.bools[name]===i){return null;
}else{return L;
}}}else{L=K.getAttribute(name);
}if(M.bools[name]){return !!L;
}return L;
}}),set:function(H,name,I){var J=this.__hints;
name=J.names[name]||name;
if(J.bools[name]){I=!!I;
}if(J.property[name]&&(!(H[name]===undefined)||J.qxProperties[name])){if(I==null){if(J.removeableProperties[name]){H.removeAttribute(name);
return;
}else if(typeof J.propertyDefault[name]!==i){I=J.propertyDefault[name];
}}H[name]=I;
}else{if(I===true){H.setAttribute(name,name);
}else if(I===false||I===null){H.removeAttribute(name);
}else{H.setAttribute(name,I);
}}},reset:function(z,name){this.set(z,name,null);
}}});
})();
(function(){var i="left",h="right",g="middle",f="qx.client",e="dblclick",d="click",c="none",b="contextmenu",a="qx.event.type.Mouse";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(l,m,n,o,p){qx.event.type.Dom.prototype.init.call(this,l,m,n,o,p);

if(!n){this._relatedTarget=qx.bom.Event.getRelatedTarget(l);
}return this;
},_cloneNativeEvent:function(j,k){var k=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,j,k);
k.button=j.button;
k.clientX=j.clientX;
k.clientY=j.clientY;
k.pageX=j.pageX;
k.pageY=j.pageY;
k.screenX=j.screenX;
k.screenY=j.screenY;
k.wheelDelta=j.wheelDelta;
k.detail=j.detail;
k.srcElement=j.srcElement;
return k;
},__buttons:qx.core.Variant.select(f,{"mshtml":{1:i,2:h,4:g},"default":{0:i,2:h,1:g}}),stop:function(){this.stopPropagation();
},getButton:function(){switch(this._type){case d:case e:return i;
case b:return h;
default:return this.__buttons[this._native.button]||c;
}},isLeftPressed:function(){return this.getButton()===i;
},isMiddlePressed:function(){return this.getButton()===g;
},isRightPressed:function(){return this.getButton()===h;
},getRelatedTarget:function(){return this._relatedTarget;
},getViewportLeft:function(){return this._native.clientX;
},getViewportTop:function(){return this._native.clientY;
},getDocumentLeft:qx.core.Variant.select(f,{"mshtml":function(){var r=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(r);
},"default":function(){return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(f,{"mshtml":function(){var q=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(q);
},"default":function(){return this._native.pageY;
}}),getScreenLeft:function(){return this._native.screenX;
},getScreenTop:function(){return this._native.screenY;
}}});
})();
(function(){var c="qx.client",b="chrome",a="qx.event.type.MouseWheel";
qx.Class.define(a,{extend:qx.event.type.Mouse,members:{stop:function(){this.stopPropagation();
this.preventDefault();
},getWheelDelta:qx.core.Variant.select(c,{"default":function(){return -(this._native.wheelDelta/40);
},"gecko":function(){return this._native.detail;
},"webkit":function(){if(qx.bom.client.Browser.NAME==b){if(qx.bom.client.Platform.MAC){return -(this._native.wheelDelta/1200);
}else{return -(this._native.wheelDelta/120);
}}else{if(qx.bom.client.Platform.WIN){var d=120;
if(qx.bom.client.Engine.VERSION==533.16){d=1200;
}}else{d=40;
if(qx.bom.client.Engine.VERSION==533.16||qx.bom.client.Engine.VERSION==533.17){d=1200;
}}return -(this._native.wheelDelta/d);
}}})}});
})();
(function(){var d="qx.client",c="qx.bom.Viewport";
qx.Class.define(c,{statics:{getWidth:qx.core.Variant.select(d,{"opera":function(q){if(qx.bom.client.Engine.VERSION<9.5){return (q||window).document.body.clientWidth;
}else{var r=(q||window).document;
return qx.bom.Document.isStandardMode(q)?r.documentElement.clientWidth:r.body.clientWidth;
}},"webkit":function(g){if(qx.bom.client.Engine.VERSION<523.15){return (g||window).innerWidth;
}else{var h=(g||window).document;
return qx.bom.Document.isStandardMode(g)?h.documentElement.clientWidth:h.body.clientWidth;
}},"default":function(e){var f=(e||window).document;
return qx.bom.Document.isStandardMode(e)?f.documentElement.clientWidth:f.body.clientWidth;
}}),getHeight:qx.core.Variant.select(d,{"opera":function(l){if(qx.bom.client.Engine.VERSION<9.5){return (l||window).document.body.clientHeight;
}else{var m=(l||window).document;
return qx.bom.Document.isStandardMode(l)?m.documentElement.clientHeight:m.body.clientHeight;
}},"webkit":function(n){if(qx.bom.client.Engine.VERSION<523.15){return (n||window).innerHeight;
}else{var o=(n||window).document;
return qx.bom.Document.isStandardMode(n)?o.documentElement.clientHeight:o.body.clientHeight;
}},"default":function(a){var b=(a||window).document;
return qx.bom.Document.isStandardMode(a)?b.documentElement.clientHeight:b.body.clientHeight;
}}),getScrollLeft:qx.core.Variant.select(d,{"mshtml":function(i){var j=(i||window).document;
return j.documentElement.scrollLeft||j.body.scrollLeft;
},"default":function(k){return (k||window).pageXOffset;
}}),getScrollTop:qx.core.Variant.select(d,{"mshtml":function(s){var t=(s||window).document;
return t.documentElement.scrollTop||t.body.scrollTop;
},"default":function(p){return (p||window).pageYOffset;
}})}});
})();
(function(){var h="CSS1Compat",g="position:absolute;width:0;height:0;width:1",f="qx.bom.Document",e="1px",d="qx.client",c="div";
qx.Class.define(f,{statics:{isQuirksMode:qx.core.Variant.select(d,{"mshtml":function(p){if(qx.bom.client.Engine.VERSION>=8){return (p||window).document.documentMode===5;
}else{return (p||window).document.compatMode!==h;
}},"webkit":function(a){if(document.compatMode===undefined){var b=(a||window).document.createElement(c);
b.style.cssText=g;
return b.style.width===e?true:false;
}else{return (a||window).document.compatMode!==h;
}},"default":function(i){return (i||window).document.compatMode!==h;
}}),isStandardMode:function(q){return !this.isQuirksMode(q);
},getWidth:function(j){var k=(j||window).document;
var l=qx.bom.Viewport.getWidth(j);
var scroll=this.isStandardMode(j)?k.documentElement.scrollWidth:k.body.scrollWidth;
return Math.max(scroll,l);
},getHeight:function(m){var n=(m||window).document;
var o=qx.bom.Viewport.getHeight(m);
var scroll=this.isStandardMode(m)?n.documentElement.scrollHeight:n.body.scrollHeight;
return Math.max(scroll,o);
}}});
})();
(function(){var j="qx.client",i="ie",h="msie",g="android",f="operamini",e="mobile chrome",d=")(/| )([0-9]+\.[0-9])",c="iemobile",b="opera mobi",a="Mobile Safari",x="operamobile",w="mobile safari",v="IEMobile|Maxthon|MSIE",u="qx.bom.client.Browser",t="opera mini",s="(",r="opera",q="mshtml",p="Opera Mini|Opera Mobi|Opera",o="AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|OmniWeb|Maxthon|Pre|Mobile Safari|Safari",m="webkit",n="5.0",k="prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Firefox",l="Mobile/";
qx.Bootstrap.define(u,{statics:{UNKNOWN:true,NAME:"unknown",TITLE:"unknown 0.0",VERSION:0.0,FULLVERSION:"0.0.0",__detect:function(C){var D=navigator.userAgent;
var F=new RegExp(s+C+d);
var G=D.match(F);

if(!G){return;
}var name=G[1].toLowerCase();
var E=G[3];
if(D.match(/Version(\/| )([0-9]+\.[0-9])/)){E=RegExp.$2;
}
if(qx.core.Variant.isSet(j,m)){if(name===g){name=e;
}else if(D.indexOf(a)!==-1||D.indexOf(l)!==-1){name=w;
}}else if(qx.core.Variant.isSet(j,q)){if(name===h){name=i;
if(qx.bom.client.System.WINCE&&name===i){name=c;
E=n;
}}}else if(qx.core.Variant.isSet(j,r)){if(name===b){name=x;
}else if(name===t){name=f;
}}this.NAME=name;
this.FULLVERSION=E;
this.VERSION=parseFloat(E,10);
this.TITLE=name+" "+this.VERSION;
this.UNKNOWN=false;
}},defer:qx.core.Variant.select(j,{"webkit":function(B){B.__detect(o);
},"gecko":function(y){y.__detect(k);
},"mshtml":function(z){z.__detect(v);
},"opera":function(A){A.__detect(p);
}})});
})();
(function(){var O="qx.client",N="qx.dom.Hierarchy",M="previousSibling",L="*",K="nextSibling",J="parentNode";
qx.Class.define(N,{statics:{getNodeIndex:function(E){var F=0;

while(E&&(E=E.previousSibling)){F++;
}return F;
},getElementIndex:function(m){var n=0;
var o=qx.dom.Node.ELEMENT;

while(m&&(m=m.previousSibling)){if(m.nodeType==o){n++;
}}return n;
},getNextElementSibling:function(p){while(p&&(p=p.nextSibling)&&!qx.dom.Node.isElement(p)){continue;
}return p||null;
},getPreviousElementSibling:function(w){while(w&&(w=w.previousSibling)&&!qx.dom.Node.isElement(w)){continue;
}return w||null;
},contains:qx.core.Variant.select(O,{"webkit|mshtml|opera":function(f,g){if(qx.dom.Node.isDocument(f)){var h=qx.dom.Node.getDocument(g);
return f&&h==f;
}else if(qx.dom.Node.isDocument(g)){return false;
}else{return f.contains(g);
}},"gecko":function(x,y){return !!(x.compareDocumentPosition(y)&16);
},"default":function(i,j){while(j){if(i==j){return true;
}j=j.parentNode;
}return false;
}}),isRendered:function(t){if(!t.parentNode||!t.offsetParent){return false;
}var u=t.ownerDocument||t.document;
if(u.body.contains){return u.body.contains(t);
}if(u.compareDocumentPosition){return !!(u.compareDocumentPosition(t)&16);
}throw new Error("Missing support for isRendered()!");
},isDescendantOf:function(k,l){return this.contains(l,k);
},getCommonParent:qx.core.Variant.select(O,{"mshtml|opera":function(C,D){if(C===D){return C;
}
while(C&&qx.dom.Node.isElement(C)){if(C.contains(D)){return C;
}C=C.parentNode;
}return null;
},"default":function(P,Q){if(P===Q){return P;
}var R={};
var U=qx.core.ObjectRegistry;
var T,S;

while(P||Q){if(P){T=U.toHashCode(P);

if(R[T]){return R[T];
}R[T]=P;
P=P.parentNode;
}
if(Q){S=U.toHashCode(Q);

if(R[S]){return R[S];
}R[S]=Q;
Q=Q.parentNode;
}}return null;
}}),getAncestors:function(V){return this._recursivelyCollect(V,J);
},getChildElements:function(q){q=q.firstChild;

if(!q){return [];
}var r=this.getNextSiblings(q);

if(q.nodeType===1){r.unshift(q);
}return r;
},getDescendants:function(b){return qx.lang.Array.fromCollection(b.getElementsByTagName(L));
},getFirstDescendant:function(v){v=v.firstChild;

while(v&&v.nodeType!=1){v=v.nextSibling;
}return v;
},getLastDescendant:function(a){a=a.lastChild;

while(a&&a.nodeType!=1){a=a.previousSibling;
}return a;
},getPreviousSiblings:function(I){return this._recursivelyCollect(I,M);
},getNextSiblings:function(s){return this._recursivelyCollect(s,K);
},_recursivelyCollect:function(c,d){var e=[];

while(c=c[d]){if(c.nodeType==1){e.push(c);
}}return e;
},getSiblings:function(H){return this.getPreviousSiblings(H).reverse().concat(this.getNextSiblings(H));
},isEmpty:function(G){G=G.firstChild;

while(G){if(G.nodeType===qx.dom.Node.ELEMENT||G.nodeType===qx.dom.Node.TEXT){return false;
}G=G.nextSibling;
}return true;
},cleanWhitespace:function(z){var A=z.firstChild;

while(A){var B=A.nextSibling;

if(A.nodeType==3&&!/\S/.test(A.nodeValue)){z.removeChild(A);
}A=B;
}}}});
})();
(function(){var b="qx.client",a="qx.event.type.Drag";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(f,g){qx.event.type.Event.prototype.init.call(this,true,f);

if(g){this._native=g.getNativeEvent()||null;
this._originalTarget=g.getTarget()||null;
}else{this._native=null;
this._originalTarget=null;
}return this;
},clone:function(m){var n=qx.event.type.Event.prototype.clone.call(this,m);
n._native=this._native;
return n;
},getDocumentLeft:qx.core.Variant.select(b,{"mshtml":function(){if(this._native==null){return 0;
}var o=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(o);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(b,{"mshtml":function(){if(this._native==null){return 0;
}var j=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(j);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageY;
}}),getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);
},addType:function(i){this.getManager().addType(i);
},addAction:function(k){this.getManager().addAction(k);
},supportsType:function(e){return this.getManager().supportsType(e);
},supportsAction:function(l){return this.getManager().supportsAction(l);
},addData:function(c,d){this.getManager().addData(c,d);
},getData:function(h){return this.getManager().getData(h);
},getCurrentType:function(){return this.getManager().getCurrentType();
},getCurrentAction:function(){return this.getManager().getCurrentAction();
}}});
})();
(function(){var j="losecapture",i="qx.client",h="blur",g="focus",f="click",e="qx.event.dispatch.MouseCapture",d="capture",c="scroll";
qx.Class.define(e,{extend:qx.event.dispatch.AbstractBubbling,construct:function(p,q){qx.event.dispatch.AbstractBubbling.call(this,p);
this.__window=p.getWindow();
this.__registration=q;
p.addListener(this.__window,h,this.releaseCapture,this);
p.addListener(this.__window,g,this.releaseCapture,this);
p.addListener(this.__window,c,this.releaseCapture,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__registration:null,__captureElement:null,__containerCapture:true,__window:null,_getParent:function(r){return r.parentNode;
},canDispatchEvent:function(a,event,b){return (this.__captureElement&&this.__captureEvents[b]);
},dispatchEvent:function(u,event,v){if(v==f){event.stopPropagation();
this.releaseCapture();
return;
}
if(this.__containerCapture||!qx.dom.Hierarchy.contains(this.__captureElement,u)){u=this.__captureElement;
}qx.event.dispatch.AbstractBubbling.prototype.dispatchEvent.call(this,u,event,v);
},__captureEvents:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(s,t){var t=t!==false;

if(this.__captureElement===s&&this.__containerCapture==t){return;
}
if(this.__captureElement){this.releaseCapture();
}this.nativeSetCapture(s,t);

if(this.hasNativeCapture){var self=this;
qx.bom.Event.addNativeListener(s,j,function(){qx.bom.Event.removeNativeListener(s,j,arguments.callee);
self.releaseCapture();
});
}this.__containerCapture=t;
this.__captureElement=s;
this.__registration.fireEvent(s,d,qx.event.type.Event,[true,false]);
},getCaptureElement:function(){return this.__captureElement;
},releaseCapture:function(){var m=this.__captureElement;

if(!m){return;
}this.__captureElement=null;
this.__registration.fireEvent(m,j,qx.event.type.Event,[true,false]);
this.nativeReleaseCapture(m);
},hasNativeCapture:qx.bom.client.Engine.MSHTML,nativeSetCapture:qx.core.Variant.select(i,{"mshtml":function(k,l){k.setCapture(l!==false);
},"default":qx.lang.Function.empty}),nativeReleaseCapture:qx.core.Variant.select(i,{"mshtml":function(o){o.releaseCapture();
},"default":qx.lang.Function.empty})},destruct:function(){this.__captureElement=this.__window=this.__registration=null;
},defer:function(n){qx.event.Registration.addDispatcher(n);
}});
})();
(function(){var s="qx.client",r="",q="mshtml",p="'",o="SelectionLanguage",n="qx.xml.Document",m=" />",k="MSXML2.DOMDocument.3.0",j='<\?xml version="1.0" encoding="utf-8"?>\n<',h="MSXML2.XMLHTTP.3.0",d="MSXML2.XMLHTTP.6.0",g=" xmlns='",f="text/xml",c="XPath",b="MSXML2.DOMDocument.6.0",e="HTML";
qx.Class.define(n,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(a){if(a.nodeType===9){return a.documentElement.nodeName!==e;
}else if(a.ownerDocument){return this.isXmlDocument(a.ownerDocument);
}else{return false;
}},create:qx.core.Variant.select(s,{"mshtml":function(w,x){var y=new ActiveXObject(this.DOMDOC);
y.setProperty(o,c);

if(x){var z=j;
z+=x;

if(w){z+=g+w+p;
}z+=m;
y.loadXML(z);
}return y;
},"default":function(t,u){return document.implementation.createDocument(t||r,u||r,null);
}}),fromString:qx.core.Variant.select(s,{"mshtml":function(C){var D=qx.xml.Document.create();
D.loadXML(C);
return D;
},"default":function(A){var B=new DOMParser();
return B.parseFromString(A,f);
}})},defer:function(E){if(qx.core.Variant.isSet(s,q)){var F=[b,k];
var G=[d,h];

for(var i=0,l=F.length;i<l;i++){try{new ActiveXObject(F[i]);
new ActiveXObject(G[i]);
}catch(v){continue;
}E.DOMDOC=F[i];
E.XMLHTTP=G[i];
break;
}}}});
})();
(function(){var k="visible",j="scroll",i="borderBottomWidth",h="borderTopWidth",g="left",f="borderLeftWidth",e="bottom",d="top",c="right",b="qx.bom.element.Scroll",a="borderRightWidth";
qx.Class.define(b,{statics:{intoViewX:function(o,stop,p){var parent=o.parentNode;
var u=qx.dom.Node.getDocument(o);
var q=u.body;
var C,A,x;
var E,v,F;
var y,G,J;
var H,s,B,r;
var w,I,z;
var t=p===g;
var D=p===c;
stop=stop?stop.parentNode:u;
while(parent&&parent!=stop){if(parent.scrollWidth>parent.clientWidth&&(parent===q||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===q){A=parent.scrollLeft;
x=A+qx.bom.Viewport.getWidth();
E=qx.bom.Viewport.getWidth();
v=parent.clientWidth;
F=parent.scrollWidth;
y=0;
G=0;
J=0;
}else{C=qx.bom.element.Location.get(parent);
A=C.left;
x=C.right;
E=parent.offsetWidth;
v=parent.clientWidth;
F=parent.scrollWidth;
y=parseInt(qx.bom.element.Style.get(parent,f),10)||0;
G=parseInt(qx.bom.element.Style.get(parent,a),10)||0;
J=E-v-y-G;
}H=qx.bom.element.Location.get(o);
s=H.left;
B=H.right;
r=o.offsetWidth;
w=s-A-y;
I=B-x+G;
z=0;
if(t){z=w;
}else if(D){z=I+J;
}else if(w<0||r>v){z=w;
}else if(I>0){z=I+J;
}parent.scrollLeft+=z;
if(qx.bom.client.Engine.GECKO||qx.bom.client.Engine.OPERA){qx.event.Registration.fireNonBubblingEvent(parent,j);
}}
if(parent===q){break;
}parent=parent.parentNode;
}},intoViewY:function(K,stop,L){var parent=K.parentNode;
var R=qx.dom.Node.getDocument(K);
var M=R.body;
var ba,N,V;
var bc,Y,T;
var P,Q,O;
var be,bf,bb,U;
var X,S,bg;
var bd=L===d;
var W=L===e;
stop=stop?stop.parentNode:R;
while(parent&&parent!=stop){if(parent.scrollHeight>parent.clientHeight&&(parent===M||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===M){N=parent.scrollTop;
V=N+qx.bom.Viewport.getHeight();
bc=qx.bom.Viewport.getHeight();
Y=parent.clientHeight;
T=parent.scrollHeight;
P=0;
Q=0;
O=0;
}else{ba=qx.bom.element.Location.get(parent);
N=ba.top;
V=ba.bottom;
bc=parent.offsetHeight;
Y=parent.clientHeight;
T=parent.scrollHeight;
P=parseInt(qx.bom.element.Style.get(parent,h),10)||0;
Q=parseInt(qx.bom.element.Style.get(parent,i),10)||0;
O=bc-Y-P-Q;
}be=qx.bom.element.Location.get(K);
bf=be.top;
bb=be.bottom;
U=K.offsetHeight;
X=bf-N-P;
S=bb-V+Q;
bg=0;
if(bd){bg=X;
}else if(W){bg=S+O;
}else if(X<0||U>Y){bg=X;
}else if(S>0){bg=S+O;
}parent.scrollTop+=bg;
if(qx.bom.client.Engine.GECKO||qx.bom.client.Engine.OPERA){qx.event.Registration.fireNonBubblingEvent(parent,j);
}}
if(parent===M){break;
}parent=parent.parentNode;
}},intoView:function(l,stop,m,n){this.intoViewX(l,stop,m);
this.intoViewY(l,stop,n);
}}});
})();
(function(){var bD="",bC="qx.client",bB="hidden",bA="-moz-scrollbars-none",bz="overflow",by=";",bx="overflowY",bw=":",bv="overflowX",bu="overflow:",bP="none",bO="scroll",bN="borderLeftStyle",bM="borderRightStyle",bL="div",bK="borderRightWidth",bJ="overflow-y",bI="borderLeftWidth",bH="-moz-scrollbars-vertical",bG="100px",bE="qx.bom.element.Overflow",bF="overflow-x";
qx.Class.define(bE,{statics:{__scrollbarSize:null,getScrollbarWidth:function(){if(this.__scrollbarSize!==null){return this.__scrollbarSize;
}var m=qx.bom.element.Style;
var o=function(bT,bU){return parseInt(m.get(bT,bU))||0;
};
var p=function(E){return (m.get(E,bM)==bP?0:o(E,bK));
};
var n=function(ca){return (m.get(ca,bN)==bP?0:o(ca,bI));
};
var r=qx.core.Variant.select(bC,{"mshtml":function(bc){if(m.get(bc,bx)==bB||bc.clientWidth==0){return p(bc);
}return Math.max(0,bc.offsetWidth-bc.clientLeft-bc.clientWidth);
},"default":function(b){if(b.clientWidth==0){var d=m.get(b,bz);
var e=(d==bO||d==bH?16:0);
return Math.max(0,p(b)+e);
}return Math.max(0,(b.offsetWidth-b.clientWidth-n(b)));
}});
var q=function(j){return r(j)-p(j);
};
var t=document.createElement(bL);
var s=t.style;
s.height=s.width=bG;
s.overflow=bO;
document.body.appendChild(t);
var c=q(t);
this.__scrollbarSize=c?c:16;
document.body.removeChild(t);
return this.__scrollbarSize;
},_compile:qx.core.Variant.select(bC,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(R,S){if(S==bB){S=bA;
}return bu+S+by;
}:
function(bX,bY){return bX+bw+bY+by;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(f,g){return bu+g+by;
}:
function(br,bs){return br+bw+bs+by;
},"default":function(bn,bo){return bn+bw+bo+by;
}}),compileX:function(bt){return this._compile(bF,bt);
},compileY:function(K){return this._compile(bJ,K);
},getX:qx.core.Variant.select(bC,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(u,v){var w=qx.bom.element.Style.get(u,bz,v,false);

if(w===bA){w=bB;
}return w;
}:
function(F,G){return qx.bom.element.Style.get(F,bv,G,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(C,D){return qx.bom.element.Style.get(C,bz,D,false);
}:
function(T,U){return qx.bom.element.Style.get(T,bv,U,false);
},"default":function(bV,bW){return qx.bom.element.Style.get(bV,bv,bW,false);
}}),setX:qx.core.Variant.select(bC,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bj,bk){if(bk==bB){bk=bA;
}bj.style.overflow=bk;
}:
function(h,i){h.style.overflowX=i;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bQ,bR){bQ.style.overflow=bR;
}:
function(cb,cc){cb.style.overflowX=cc;
},"default":function(P,Q){P.style.overflowX=Q;
}}),resetX:qx.core.Variant.select(bC,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bq){bq.style.overflow=bD;
}:
function(bp){bp.style.overflowX=bD;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(L,M){L.style.overflow=bD;
}:
function(H,I){H.style.overflowX=bD;
},"default":function(cf){cf.style.overflowX=bD;
}}),getY:qx.core.Variant.select(bC,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(z,A){var B=qx.bom.element.Style.get(z,bz,A,false);

if(B===bA){B=bB;
}return B;
}:
function(bf,bg){return qx.bom.element.Style.get(bf,bx,bg,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(N,O){return qx.bom.element.Style.get(N,bz,O,false);
}:
function(k,l){return qx.bom.element.Style.get(k,bx,l,false);
},"default":function(bl,bm){return qx.bom.element.Style.get(bl,bx,bm,false);
}}),setY:qx.core.Variant.select(bC,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(X,Y){if(Y===bB){Y=bA;
}X.style.overflow=Y;
}:
function(x,y){x.style.overflowY=y;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(V,W){V.style.overflow=W;
}:
function(cd,ce){cd.style.overflowY=ce;
},"default":function(bh,bi){bh.style.overflowY=bi;
}}),resetY:qx.core.Variant.select(bC,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(a){a.style.overflow=bD;
}:
function(bS){bS.style.overflowY=bD;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(ba,bb){ba.style.overflow=bD;
}:
function(bd,be){bd.style.overflowY=bD;
},"default":function(J){J.style.overflowY=bD;
}})}});
})();
(function(){var n="auto",m="px",l=",",k="clip:auto;",j="rect(",i=");",h="",g=")",f="qx.bom.element.Clip",e="string",b="rect(auto)",d="clip:rect(",c="clip",a="rect(auto,auto,auto,auto)";
qx.Class.define(f,{statics:{compile:function(F){if(!F){return k;
}var K=F.left;
var top=F.top;
var J=F.width;
var I=F.height;
var G,H;

if(K==null){G=(J==null?n:J+m);
K=n;
}else{G=(J==null?n:K+J+m);
K=K+m;
}
if(top==null){H=(I==null?n:I+m);
top=n;
}else{H=(I==null?n:top+I+m);
top=top+m;
}return d+top+l+G+l+H+l+K+i;
},get:function(p,q){var s=qx.bom.element.Style.get(p,c,q,false);
var x,top,v,u;
var r,t;

if(typeof s===e&&s!==n&&s!==h){s=qx.lang.String.trim(s);
if(/\((.*)\)/.test(s)){var w=RegExp.$1.split(l);
top=qx.lang.String.trim(w[0]);
r=qx.lang.String.trim(w[1]);
t=qx.lang.String.trim(w[2]);
x=qx.lang.String.trim(w[3]);
if(x===n){x=null;
}
if(top===n){top=null;
}
if(r===n){r=null;
}
if(t===n){t=null;
}if(top!=null){top=parseInt(top,10);
}
if(r!=null){r=parseInt(r,10);
}
if(t!=null){t=parseInt(t,10);
}
if(x!=null){x=parseInt(x,10);
}if(r!=null&&x!=null){v=r-x;
}else if(r!=null){v=r;
}
if(t!=null&&top!=null){u=t-top;
}else if(t!=null){u=t;
}}else{throw new Error("Could not parse clip string: "+s);
}}return {left:x||null,top:top||null,width:v||null,height:u||null};
},set:function(y,z){if(!z){y.style.clip=a;
return;
}var E=z.left;
var top=z.top;
var D=z.width;
var C=z.height;
var A,B;

if(E==null){A=(D==null?n:D+m);
E=n;
}else{A=(D==null?n:E+D+m);
E=E+m;
}
if(top==null){B=(C==null?n:C+m);
top=n;
}else{B=(C==null?n:top+C+m);
top=top+m;
}y.style.clip=j+top+l+A+l+B+l+E+g;
},reset:function(o){o.style.clip=qx.bom.client.Engine.MSHTML?b:n;
}}});
})();
(function(){var k="n-resize",j="e-resize",i="nw-resize",h="ne-resize",g="",f="cursor:",e="qx.client",d=";",c="qx.bom.element.Cursor",b="cursor",a="hand";
qx.Class.define(c,{statics:{__map:qx.core.Variant.select(e,{"mshtml":{"cursor":a,"ew-resize":j,"ns-resize":k,"nesw-resize":h,"nwse-resize":i},"opera":{"col-resize":j,"row-resize":k,"ew-resize":j,"ns-resize":k,"nesw-resize":h,"nwse-resize":i},"default":{}}),compile:function(o){return f+(this.__map[o]||o)+d;
},get:function(p,q){return qx.bom.element.Style.get(p,b,q,false);
},set:function(l,m){l.style.cursor=this.__map[m]||m;
},reset:function(n){n.style.cursor=g;
}}});
})();
(function(){var m="",l="qx.client",k=";",j="filter",i="opacity:",h="opacity",g="MozOpacity",f=");",e=")",d="zoom:1;filter:alpha(opacity=",a="qx.bom.element.Opacity",c="alpha(opacity=",b="-moz-opacity:";
qx.Class.define(a,{statics:{compile:qx.core.Variant.select(l,{"mshtml":function(E){if(E>=1){return m;
}
if(E<0.00001){E=0;
}return d+(E*100)+f;
},"gecko":function(t){if(t==1){t=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){return b+t+k;
}else{return i+t+k;
}},"default":function(D){if(D==1){return m;
}return i+D+k;
}}),set:qx.core.Variant.select(l,{"mshtml":function(x,y){var z=qx.bom.element.Style.get(x,j,qx.bom.element.Style.COMPUTED_MODE,false);
if(y>=1){x.style.filter=z.replace(/alpha\([^\)]*\)/gi,m);
return;
}
if(y<0.00001){y=0;
}if(!x.currentStyle||!x.currentStyle.hasLayout){x.style.zoom=1;
}x.style.filter=z.replace(/alpha\([^\)]*\)/gi,m)+c+y*100+e;
},"gecko":function(A,B){if(B==1){B=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){A.style.MozOpacity=B;
}else{A.style.opacity=B;
}},"default":function(J,K){if(K==1){K=m;
}J.style.opacity=K;
}}),reset:qx.core.Variant.select(l,{"mshtml":function(q){var r=qx.bom.element.Style.get(q,j,qx.bom.element.Style.COMPUTED_MODE,false);
q.style.filter=r.replace(/alpha\([^\)]*\)/gi,m);
},"gecko":function(C){if(qx.bom.client.Engine.VERSION<1.7){C.style.MozOpacity=m;
}else{C.style.opacity=m;
}},"default":function(s){s.style.opacity=m;
}}),get:qx.core.Variant.select(l,{"mshtml":function(F,G){var H=qx.bom.element.Style.get(F,j,G,false);

if(H){var I=H.match(/alpha\(opacity=(.*)\)/);

if(I&&I[1]){return parseFloat(I[1])/100;
}}return 1.0;
},"gecko":function(n,o){var p=qx.bom.element.Style.get(n,qx.bom.client.Engine.VERSION<1.7?g:h,o,false);

if(p==0.999999){p=1.0;
}
if(p!=null){return parseFloat(p);
}return 1.0;
},"default":function(u,v){var w=qx.bom.element.Style.get(u,h,v,false);

if(w!=null){return parseFloat(w);
}return 1.0;
}})}});
})();
(function(){var q="qx.client",p="",o="boxSizing",n="box-sizing",m=":",k="border-box",j="qx.bom.element.BoxSizing",h="KhtmlBoxSizing",g="-moz-box-sizing",f="WebkitBoxSizing",c=";",e="-khtml-box-sizing",d="content-box",b="-webkit-box-sizing",a="MozBoxSizing";
qx.Class.define(j,{statics:{__styleProperties:qx.core.Variant.select(q,{"mshtml":null,"webkit":[o,h,f],"gecko":[a],"opera":[o]}),__cssProperties:qx.core.Variant.select(q,{"mshtml":null,"webkit":[n,e,b],"gecko":[g],"opera":[n]}),__nativeBorderBox:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__usesNativeBorderBox:function(s){var t=this.__nativeBorderBox;
return t.tags[s.tagName.toLowerCase()]||t.types[s.type];
},compile:qx.core.Variant.select(q,{"mshtml":function(A){{};
},"default":function(E){var G=this.__cssProperties;
var F=p;

if(G){for(var i=0,l=G.length;i<l;i++){F+=G[i]+m+E+c;
}}return F;
}}),get:qx.core.Variant.select(q,{"mshtml":function(B){if(qx.bom.Document.isStandardMode(qx.dom.Node.getDocument(B))){if(!this.__usesNativeBorderBox(B)){return d;
}}return k;
},"default":function(u){var w=this.__styleProperties;
var v;

if(w){for(var i=0,l=w.length;i<l;i++){v=qx.bom.element.Style.get(u,w[i],null,false);

if(v!=null&&v!==p){return v;
}}}return p;
}}),set:qx.core.Variant.select(q,{"mshtml":function(C,D){{};
},"default":function(x,y){var z=this.__styleProperties;

if(z){for(var i=0,l=z.length;i<l;i++){x.style[z[i]]=y;
}}}}),reset:function(r){this.set(r,p);
}}});
})();
(function(){var o="",n="qx.client",m="userSelect",k="style",h="MozUserModify",g="px",f="float",e="borderImage",d="styleFloat",c="appearance",H="pixelHeight",G='Ms',F=":",E="cssFloat",D="pixelTop",C="pixelLeft",B='O',A="qx.bom.element.Style",z='Khtml',y='string',v="pixelRight",w='Moz',t="pixelWidth",u="pixelBottom",r=";",s="textOverflow",p="userModify",q='Webkit',x="WebkitUserModify";
qx.Class.define(A,{statics:{__detectVendorProperties:function(){var bw=[c,m,s,e];
var bA={};
var bx=document.documentElement.style;
var bB=[w,q,z,B,G];

for(var i=0,l=bw.length;i<l;i++){var bC=bw[i];
var by=bC;

if(bx[bC]){bA[by]=bC;
continue;
}bC=qx.lang.String.firstUp(bC);

for(var j=0,bD=bB.length;j<bD;j++){var bz=bB[j]+bC;

if(typeof bx[bz]==y){bA[by]=bz;
break;
}}}this.__styleNames=bA;
this.__styleNames[p]=qx.core.Variant.select(n,{"gecko":h,"webkit":x,"default":m});
this.__cssNames={};

for(var by in bA){this.__cssNames[by]=this.__hyphenate(bA[by]);
}this.__styleNames[f]=qx.core.Variant.select(n,{"mshtml":d,"default":E});
},__mshtmlPixel:{width:t,height:H,left:C,right:v,top:D,bottom:u},__special:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing,overflowX:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setX,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getX,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetX,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileX,qx.bom.element.Overflow)},overflowY:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setY,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getY,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetY,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileY,qx.bom.element.Overflow)}},compile:function(bc){var be=[];
var bg=this.__special;
var bf=this.__cssNames;
var name,bd;

for(name in bc){bd=bc[name];

if(bd==null){continue;
}name=bf[name]||name;
if(bg[name]){be.push(bg[name].compile(bd));
}else{be.push(this.__hyphenate(name),F,bd,r);
}}return be.join(o);
},__hyphens:{},__hyphenate:function(bt){var bu=this.__hyphens;
var bv=bu[bt];

if(!bv){bv=bu[bt]=qx.lang.String.hyphenate(bt);
}return bv;
},setCss:qx.core.Variant.select(n,{"mshtml":function(a,b){a.style.cssText=b;
},"default":function(X,Y){X.setAttribute(k,Y);
}}),getCss:qx.core.Variant.select(n,{"mshtml":function(bq){return bq.style.cssText.toLowerCase();
},"default":function(bs){return bs.getAttribute(k);
}}),isPropertySupported:function(br){return (this.__special[br]||this.__styleNames[br]||br in document.documentElement.style);
},COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(P,name,Q,R){{};
name=this.__styleNames[name]||name;
if(R!==false&&this.__special[name]){return this.__special[name].set(P,Q);
}else{P.style[name]=Q!==null?Q:o;
}},setStyles:function(bh,bi,bj){{};
var bm=this.__styleNames;
var bo=this.__special;
var bk=bh.style;

for(var bn in bi){var bl=bi[bn];
var name=bm[bn]||bn;

if(bl===undefined){if(bj!==false&&bo[name]){bo[name].reset(bh);
}else{bk[name]=o;
}}else{if(bj!==false&&bo[name]){bo[name].set(bh,bl);
}else{bk[name]=bl!==null?bl:o;
}}}},reset:function(ba,name,bb){name=this.__styleNames[name]||name;
if(bb!==false&&this.__special[name]){return this.__special[name].reset(ba);
}else{ba.style[name]=o;
}},get:qx.core.Variant.select(n,{"mshtml":function(I,name,J,K){name=this.__styleNames[name]||name;
if(K!==false&&this.__special[name]){return this.__special[name].get(I,J);
}if(!I.currentStyle){return I.style[name]||o;
}switch(J){case this.LOCAL_MODE:return I.style[name]||o;
case this.CASCADED_MODE:return I.currentStyle[name]||o;
default:var O=I.currentStyle[name]||o;
if(/^-?[\.\d]+(px)?$/i.test(O)){return O;
}var N=this.__mshtmlPixel[name];

if(N){var L=I.style[name];
I.style[name]=O||0;
var M=I.style[N]+g;
I.style[name]=L;
return M;
}if(/^-?[\.\d]+(em|pt|%)?$/i.test(O)){throw new Error("Untranslated computed property value: "+name+". Only pixel values work well across different clients.");
}return O;
}},"default":function(S,name,T,U){name=this.__styleNames[name]||name;
if(U!==false&&this.__special[name]){return this.__special[name].get(S,T);
}switch(T){case this.LOCAL_MODE:return S.style[name]||o;
case this.CASCADED_MODE:if(S.currentStyle){return S.currentStyle[name]||o;
}throw new Error("Cascaded styles are not supported in this browser!");
default:var V=qx.dom.Node.getDocument(S);
var W=V.defaultView.getComputedStyle(S,null);
return W?W[name]:o;
}}})},defer:function(bp){bp.__detectVendorProperties();
}});
})();
(function(){var bt="borderTopWidth",bs="borderLeftWidth",br="marginTop",bq="marginLeft",bp="scroll",bo="qx.client",bn="border-box",bm="borderBottomWidth",bl="borderRightWidth",bk="auto",bI="padding",bH="qx.bom.element.Location",bG="paddingLeft",bF="static",bE="marginBottom",bD="visible",bC="BODY",bB="paddingBottom",bA="paddingTop",bz="marginRight",bx="position",by="margin",bv="overflow",bw="paddingRight",bu="border";
qx.Class.define(bH,{statics:{__style:function(bg,bh){return qx.bom.element.Style.get(bg,bh,qx.bom.element.Style.COMPUTED_MODE,false);
},__num:function(a,b){return parseInt(qx.bom.element.Style.get(a,b,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;
},__computeScroll:function(h){var k=0,top=0;
if(h.getBoundingClientRect&&!qx.bom.client.Engine.OPERA){var j=qx.dom.Node.getWindow(h);
k-=qx.bom.Viewport.getScrollLeft(j);
top-=qx.bom.Viewport.getScrollTop(j);
}else{var i=qx.dom.Node.getDocument(h).body;
h=h.parentNode;
while(h&&h!=i){k+=h.scrollLeft;
top+=h.scrollTop;
h=h.parentNode;
}}return {left:k,top:top};
},__computeBody:qx.core.Variant.select(bo,{"mshtml":function(H){var J=qx.dom.Node.getDocument(H);
var I=J.body;
var K=0;
var top=0;
K-=I.clientLeft+J.documentElement.clientLeft;
top-=I.clientTop+J.documentElement.clientTop;

if(qx.bom.client.Feature.STANDARD_MODE){K+=this.__num(I,bs);
top+=this.__num(I,bt);
}return {left:K,top:top};
},"webkit":function(bM){var bO=qx.dom.Node.getDocument(bM);
var bN=bO.body;
var bP=bN.offsetLeft;
var top=bN.offsetTop;
if(qx.bom.client.Engine.VERSION<530.17){bP+=this.__num(bN,bs);
top+=this.__num(bN,bt);
}return {left:bP,top:top};
},"gecko":function(B){var C=qx.dom.Node.getDocument(B).body;
var D=C.offsetLeft;
var top=C.offsetTop;
if(qx.bom.client.Engine.VERSION<1.9){D+=this.__num(C,bq);
top+=this.__num(C,br);
}if(qx.bom.element.BoxSizing.get(C)!==bn){D+=this.__num(C,bs);
top+=this.__num(C,bt);
}return {left:D,top:top};
},"default":function(E){var F=qx.dom.Node.getDocument(E).body;
var G=F.offsetLeft;
var top=F.offsetTop;
return {left:G,top:top};
}}),__computeOffset:qx.core.Variant.select(bo,{"mshtml|webkit":function(Y){var bb=qx.dom.Node.getDocument(Y);
if(Y.getBoundingClientRect){var bc=Y.getBoundingClientRect();
var bd=bc.left;
var top=bc.top;
}else{var bd=Y.offsetLeft;
var top=Y.offsetTop;
Y=Y.offsetParent;
var ba=bb.body;
while(Y&&Y!=ba){bd+=Y.offsetLeft;
top+=Y.offsetTop;
bd+=this.__num(Y,bs);
top+=this.__num(Y,bt);
Y=Y.offsetParent;
}}return {left:bd,top:top};
},"gecko":function(w){if(w.getBoundingClientRect){var z=w.getBoundingClientRect();
var A=Math.round(z.left);
var top=Math.round(z.top);
}else{var A=0;
var top=0;
var x=qx.dom.Node.getDocument(w).body;
var y=qx.bom.element.BoxSizing;

if(y.get(w)!==bn){A-=this.__num(w,bs);
top-=this.__num(w,bt);
}
while(w&&w!==x){A+=w.offsetLeft;
top+=w.offsetTop;
if(y.get(w)!==bn){A+=this.__num(w,bs);
top+=this.__num(w,bt);
}if(w.parentNode&&this.__style(w.parentNode,bv)!=bD){A+=this.__num(w.parentNode,bs);
top+=this.__num(w.parentNode,bt);
}w=w.offsetParent;
}}return {left:A,top:top};
},"default":function(l){var n=0;
var top=0;
var m=qx.dom.Node.getDocument(l).body;
while(l&&l!==m){n+=l.offsetLeft;
top+=l.offsetTop;
l=l.offsetParent;
}return {left:n,top:top};
}}),get:function(N,O){if(N.tagName==bC){var location=this.__getBodyLocation(N);
var V=location.left;
var top=location.top;
}else{var P=this.__computeBody(N);
var U=this.__computeOffset(N);
var scroll=this.__computeScroll(N);
var V=U.left+P.left-scroll.left;
var top=U.top+P.top-scroll.top;
}var Q=V+N.offsetWidth;
var R=top+N.offsetHeight;

if(O){if(O==bI||O==bp){var S=qx.bom.element.Overflow.getX(N);

if(S==bp||S==bk){Q+=N.scrollWidth-N.offsetWidth+this.__num(N,bs)+this.__num(N,bl);
}var T=qx.bom.element.Overflow.getY(N);

if(T==bp||T==bk){R+=N.scrollHeight-N.offsetHeight+this.__num(N,bt)+this.__num(N,bm);
}}
switch(O){case bI:V+=this.__num(N,bG);
top+=this.__num(N,bA);
Q-=this.__num(N,bw);
R-=this.__num(N,bB);
case bp:V-=N.scrollLeft;
top-=N.scrollTop;
Q-=N.scrollLeft;
R-=N.scrollTop;
case bu:V+=this.__num(N,bs);
top+=this.__num(N,bt);
Q-=this.__num(N,bl);
R-=this.__num(N,bm);
break;
case by:V-=this.__num(N,bq);
top-=this.__num(N,br);
Q+=this.__num(N,bz);
R+=this.__num(N,bE);
break;
}}return {left:V,top:top,right:Q,bottom:R};
},__getBodyLocation:qx.core.Variant.select(bo,{"default":function(L){var top=L.offsetTop+this.__num(L,br);
var M=L.offsetLeft+this.__num(L,bq);
return {left:M,top:top};
},"mshtml":function(u){var top=u.offsetTop;
var v=u.offsetLeft;

if(!((qx.bom.client.Engine.VERSION<8||qx.bom.client.Engine.DOCUMENT_MODE<8)&&!qx.bom.client.Feature.QUIRKS_MODE)){top+=this.__num(u,br);
v+=this.__num(u,bq);
}return {left:v,top:top};
},"gecko":function(bJ){var top=bJ.offsetTop+this.__num(bJ,br)+this.__num(bJ,bs);
var bK=bJ.offsetLeft+this.__num(bJ,bq)+this.__num(bJ,bt);
return {left:bK,top:top};
}}),getLeft:function(f,g){return this.get(f,g).left;
},getTop:function(be,bf){return this.get(be,bf).top;
},getRight:function(bi,bj){return this.get(bi,bj).right;
},getBottom:function(W,X){return this.get(W,X).bottom;
},getRelative:function(o,p,q,r){var t=this.get(o,q);
var s=this.get(p,r);
return {left:t.left-s.left,top:t.top-s.top,right:t.right-s.right,bottom:t.bottom-s.bottom};
},getPosition:function(bL){return this.getRelative(bL,this.getOffsetParent(bL));
},getOffsetParent:function(c){var e=c.offsetParent||document.body;
var d=qx.bom.element.Style;

while(e&&(!/^body|html$/i.test(e.tagName)&&d.get(e,bx)===bF)){e=e.offsetParent;
}return e;
}}});
})();
(function(){var l="qx.client",k="character",j="EndToEnd",i="input",h="textarea",g="StartToStart",f='character',e="qx.bom.Selection",d="button",c="#text",b="body";
qx.Class.define(e,{statics:{getSelectionObject:qx.core.Variant.select(l,{"mshtml":function(R){return R.selection;
},"default":function(n){return qx.dom.Node.getWindow(n).getSelection();
}}),get:qx.core.Variant.select(l,{"mshtml":function(ba){var bb=qx.bom.Range.get(qx.dom.Node.getDocument(ba));
return bb.text;
},"default":function(bs){if(this.__isInputOrTextarea(bs)){return bs.value.substring(bs.selectionStart,bs.selectionEnd);
}else{return this.getSelectionObject(qx.dom.Node.getDocument(bs)).toString();
}}}),getLength:qx.core.Variant.select(l,{"mshtml":function(O){var Q=this.get(O);
var P=qx.util.StringSplit.split(Q,/\r\n/);
return Q.length-(P.length-1);
},"opera":function(H){var M,K,I;

if(this.__isInputOrTextarea(H)){var L=H.selectionStart;
var J=H.selectionEnd;
M=H.value.substring(L,J);
K=J-L;
}else{M=qx.bom.Selection.get(H);
K=M.length;
}I=qx.util.StringSplit.split(M,/\r\n/);
return K-(I.length-1);
},"default":function(N){if(this.__isInputOrTextarea(N)){return N.selectionEnd-N.selectionStart;
}else{return this.get(N).length;
}}}),getStart:qx.core.Variant.select(l,{"mshtml":function(p){if(this.__isInputOrTextarea(p)){var u=qx.bom.Range.get();
if(!p.contains(u.parentElement())){return -1;
}var v=qx.bom.Range.get(p);
var t=p.value.length;
v.moveToBookmark(u.getBookmark());
v.moveEnd(f,t);
return t-v.text.length;
}else{var v=qx.bom.Range.get(p);
var r=v.parentElement();
var w=qx.bom.Range.get();
w.moveToElementText(r);
var q=qx.bom.Range.get(qx.dom.Node.getBodyElement(p));
q.setEndPoint(g,v);
q.setEndPoint(j,w);
if(w.compareEndPoints(g,q)==0){return 0;
}var s;
var x=0;

while(true){s=q.moveStart(k,-1);
if(w.compareEndPoints(g,q)==0){break;
}if(s==0){break;
}else{x++;
}}return ++x;
}},"gecko|webkit":function(bk){if(this.__isInputOrTextarea(bk)){return bk.selectionStart;
}else{var bm=qx.dom.Node.getDocument(bk);
var bl=this.getSelectionObject(bm);
if(bl.anchorOffset<bl.focusOffset){return bl.anchorOffset;
}else{return bl.focusOffset;
}}},"default":function(o){if(this.__isInputOrTextarea(o)){return o.selectionStart;
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(o)).anchorOffset;
}}}),getEnd:qx.core.Variant.select(l,{"mshtml":function(y){if(this.__isInputOrTextarea(y)){var D=qx.bom.Range.get();
if(!y.contains(D.parentElement())){return -1;
}var E=qx.bom.Range.get(y);
var C=y.value.length;
E.moveToBookmark(D.getBookmark());
E.moveStart(f,-C);
return E.text.length;
}else{var E=qx.bom.Range.get(y);
var A=E.parentElement();
var F=qx.bom.Range.get();
F.moveToElementText(A);
var C=F.text.length;
var z=qx.bom.Range.get(qx.dom.Node.getBodyElement(y));
z.setEndPoint(j,E);
z.setEndPoint(g,F);
if(F.compareEndPoints(j,z)==0){return C-1;
}var B;
var G=0;

while(true){B=z.moveEnd(k,1);
if(F.compareEndPoints(j,z)==0){break;
}if(B==0){break;
}else{G++;
}}return C-(++G);
}},"gecko|webkit":function(bh){if(this.__isInputOrTextarea(bh)){return bh.selectionEnd;
}else{var bj=qx.dom.Node.getDocument(bh);
var bi=this.getSelectionObject(bj);
if(bi.focusOffset>bi.anchorOffset){return bi.focusOffset;
}else{return bi.anchorOffset;
}}},"default":function(a){if(this.__isInputOrTextarea(a)){return a.selectionEnd;
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(a)).focusOffset;
}}}),__isInputOrTextarea:function(m){return qx.dom.Node.isElement(m)&&(m.nodeName.toLowerCase()==i||m.nodeName.toLowerCase()==h);
},set:qx.core.Variant.select(l,{"mshtml":function(bc,bd,be){var bf;
if(qx.dom.Node.isDocument(bc)){bc=bc.body;
}
if(qx.dom.Node.isElement(bc)||qx.dom.Node.isText(bc)){switch(bc.nodeName.toLowerCase()){case i:case h:case d:if(be===undefined){be=bc.value.length;
}
if(bd>=0&&bd<=bc.value.length&&be>=0&&be<=bc.value.length){bf=qx.bom.Range.get(bc);
bf.collapse(true);
bf.moveStart(k,bd);
bf.moveEnd(k,be-bd);
bf.select();
return true;
}break;
case c:if(be===undefined){be=bc.nodeValue.length;
}
if(bd>=0&&bd<=bc.nodeValue.length&&be>=0&&be<=bc.nodeValue.length){bf=qx.bom.Range.get(qx.dom.Node.getBodyElement(bc));
bf.moveToElementText(bc.parentNode);
bf.collapse(true);
bf.moveStart(k,bd);
bf.moveEnd(k,be-bd);
bf.select();
return true;
}break;
default:if(be===undefined){be=bc.childNodes.length-1;
}if(bc.childNodes[bd]&&bc.childNodes[be]){bf=qx.bom.Range.get(qx.dom.Node.getBodyElement(bc));
bf.moveToElementText(bc.childNodes[bd]);
bf.collapse(true);
var bg=qx.bom.Range.get(qx.dom.Node.getBodyElement(bc));
bg.moveToElementText(bc.childNodes[be]);
bf.setEndPoint(j,bg);
bf.select();
return true;
}}}return false;
},"default":function(S,T,U){var Y=S.nodeName.toLowerCase();

if(qx.dom.Node.isElement(S)&&(Y==i||Y==h)){if(U===undefined){U=S.value.length;
}if(T>=0&&T<=S.value.length&&U>=0&&U<=S.value.length){S.focus();
S.select();
S.setSelectionRange(T,U);
return true;
}}else{var W=false;
var X=qx.dom.Node.getWindow(S).getSelection();
var V=qx.bom.Range.get(S);
if(qx.dom.Node.isText(S)){if(U===undefined){U=S.length;
}
if(T>=0&&T<S.length&&U>=0&&U<=S.length){W=true;
}}else if(qx.dom.Node.isElement(S)){if(U===undefined){U=S.childNodes.length-1;
}
if(T>=0&&S.childNodes[T]&&U>=0&&S.childNodes[U]){W=true;
}}else if(qx.dom.Node.isDocument(S)){S=S.body;

if(U===undefined){U=S.childNodes.length-1;
}
if(T>=0&&S.childNodes[T]&&U>=0&&S.childNodes[U]){W=true;
}}
if(W){if(!X.isCollapsed){X.collapseToStart();
}V.setStart(S,T);
if(qx.dom.Node.isText(S)){V.setEnd(S,U);
}else{V.setEndAfter(S.childNodes[U]);
}if(X.rangeCount>0){X.removeAllRanges();
}X.addRange(V);
return true;
}}return false;
}}),setAll:function(br){return qx.bom.Selection.set(br,0);
},clear:qx.core.Variant.select(l,{"mshtml":function(bn){var bo=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bn));
var bp=qx.bom.Range.get(bn);
var parent=bp.parentElement();
var bq=qx.bom.Range.get(qx.dom.Node.getDocument(bn));
if(parent==bq.parentElement()&&parent==bn){bo.empty();
}},"default":function(bt){var bv=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bt));
var bx=bt.nodeName.toLowerCase();
if(qx.dom.Node.isElement(bt)&&(bx==i||bx==h)){bt.setSelectionRange(0,0);
qx.bom.Element.blur(bt);
}else if(qx.dom.Node.isDocument(bt)||bx==b){bv.collapse(bt.body?bt.body:bt,0);
}else{var bw=qx.bom.Range.get(bt);

if(!bw.collapsed){var by;
var bu=bw.commonAncestorContainer;
if(qx.dom.Node.isElement(bt)&&qx.dom.Node.isText(bu)){by=bu.parentNode;
}else{by=bu;
}
if(by==bt){bv.collapse(bt,0);
}}}}})}});
})();
(function(){var l="button",k="qx.bom.Range",j="text",i="password",h="file",g="submit",f="reset",e="textarea",d="input",c="hidden",a="qx.client",b="body";
qx.Class.define(k,{statics:{get:qx.core.Variant.select(a,{"mshtml":function(m){if(qx.dom.Node.isElement(m)){switch(m.nodeName.toLowerCase()){case d:switch(m.type){case j:case i:case c:case l:case f:case h:case g:return m.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();
}break;
case e:case b:case l:return m.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();
}}else{if(m==null){m=window;
}return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();
}},"default":function(n){var o=qx.dom.Node.getDocument(n);
var p=qx.bom.Selection.getSelectionObject(o);

if(p.rangeCount>0){return p.getRangeAt(0);
}else{return o.createRange();
}}})}});
})();
(function(){var j="",h="m",g="g",f="^",e="qx.util.StringSplit",d="i",c="$(?!\\s)",b="[object RegExp]",a="y";
qx.Class.define(e,{statics:{split:function(k,l,m){if(Object.prototype.toString.call(l)!==b){return String.prototype.split.call(k,l,m);
}var t=[],n=0,r=(l.ignoreCase?d:j)+(l.multiline?h:j)+(l.sticky?a:j),l=RegExp(l.source,r+g),q,u,o,p,s=/()??/.exec(j)[1]===undefined;
k=k+j;

if(!s){q=RegExp(f+l.source+c,r);
}if(m===undefined||+m<0){m=Infinity;
}else{m=Math.floor(+m);

if(!m){return [];
}}
while(u=l.exec(k)){o=u.index+u[0].length;

if(o>n){t.push(k.slice(n,u.index));
if(!s&&u.length>1){u[0].replace(q,function(){for(var i=1;i<arguments.length-2;i++){if(arguments[i]===undefined){u[i]=undefined;
}}});
}
if(u.length>1&&u.index<k.length){Array.prototype.push.apply(t,u.slice(1));
}p=u[0].length;
n=o;

if(t.length>=m){break;
}}
if(l.lastIndex===u.index){l.lastIndex++;
}}
if(n===k.length){if(p||!l.test(j)){t.push(j);
}}else{t.push(k.slice(n));
}return t.length>m?t.slice(0,m):t;
}}});
})();
(function(){var b="qx.ui.core.queue.Widget",a="widget";
qx.Class.define(b,{statics:{__queue:{},remove:function(h){delete this.__queue[h.$$hash];
},add:function(f){var g=this.__queue;

if(g[f.$$hash]){return;
}g[f.$$hash]=f;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var c=this.__queue;
var e;

for(var d in c){e=c[d];
delete c[d];
e.syncWidget();
}for(var d in c){return;
}this.__queue={};
}}});
})();
(function(){var f="qx.ui.core.queue.Visibility",e="visibility";
qx.Class.define(f,{statics:{__queue:{},__data:{},remove:function(j){var k=j.$$hash;
delete this.__data[k];
delete this.__queue[k];
},isVisible:function(i){return this.__data[i.$$hash]||false;
},__computeVisible:function(a){var c=this.__data;
var b=a.$$hash;
var d;
if(a.isExcluded()){d=false;
}else{var parent=a.$$parent;

if(parent){d=this.__computeVisible(parent);
}else{d=a.isRootWidget();
}}return c[b]=d;
},add:function(g){var h=this.__queue;

if(h[g.$$hash]){return;
}h[g.$$hash]=g;
qx.ui.core.queue.Manager.scheduleFlush(e);
},flush:function(){var l=this.__queue;
var p=this.__data;
for(var m in l){if(p[m]!=null){l[m].addChildrenToQueue(l);
}}var o={};

for(var m in l){o[m]=p[m];
p[m]=null;
}for(var m in l){var n=l[m];
delete l[m];
if(p[m]==null){this.__computeVisible(n);
}if(p[m]&&p[m]!=o[m]){n.checkAppearanceNeeds();
}}this.__queue={};
}}});
})();
(function(){var b="appearance",a="qx.ui.core.queue.Appearance";
qx.Class.define(a,{statics:{__queue:{},remove:function(d){delete this.__queue[d.$$hash];
},add:function(e){var f=this.__queue;

if(f[e.$$hash]){return;
}f[e.$$hash]=e;
qx.ui.core.queue.Manager.scheduleFlush(b);
},has:function(c){return !!this.__queue[c.$$hash];
},flush:function(){var j=qx.ui.core.queue.Visibility;
var g=this.__queue;
var i;

for(var h in g){i=g[h];
delete g[h];
if(j.isVisible(i)){i.syncAppearance();
}else{i.$$stateChanges=true;
}}}}});
})();
(function(){var b="dispose",a="qx.ui.core.queue.Dispose";
qx.Class.define(a,{statics:{__queue:{},add:function(f){var g=this.__queue;

if(g[f.$$hash]){return;
}g[f.$$hash]=f;
qx.ui.core.queue.Manager.scheduleFlush(b);
},flush:function(){var c=this.__queue;

for(var e in c){var d=c[e];
delete c[e];
d.dispose();
}for(var e in c){return;
}this.__queue={};
}}});
})();
(function(){var c="none",b="qx.html.Decorator",a="absolute";
qx.Class.define(b,{extend:qx.html.Element,construct:function(d,e){var f={position:a,top:0,left:0};

if(qx.bom.client.Feature.CSS_POINTER_EVENTS){f.pointerEvents=c;
}qx.html.Element.call(this,null,f);
this.__decorator=d;
this.__id=e||d.toHashCode();
this.useMarkup(d.getMarkup());
},members:{__id:null,__decorator:null,getId:function(){return this.__id;
},getDecorator:function(){return this.__decorator;
},resize:function(h,i){this.__decorator.resize(this.getDomElement(),h,i);
},tint:function(g){this.__decorator.tint(this.getDomElement(),g);
},getInsets:function(){return this.__decorator.getInsets();
}},destruct:function(){this.__decorator=null;
}});
})();
(function(){var f="blur",e="focus",d="input",c="load",b="qx.ui.core.EventHandler",a="activate";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);
this.__manager=qx.event.Registration.getManager(window);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:false},members:{__manager:null,__focusEvents:{focusin:1,focusout:1,focus:1,blur:1},__ignoreDisabled:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(g,h){return g instanceof qx.ui.core.Widget;
},_dispatchEvent:function(o){var t=o.getTarget();
var s=qx.ui.core.Widget.getWidgetByElement(t);
var u=false;

while(s&&s.isAnonymous()){var u=true;
s=s.getLayoutParent();
}if(s&&u&&o.getType()==a){s.getContainerElement().activate();
}if(this.__focusEvents[o.getType()]){s=s&&s.getFocusTarget();
if(!s){return;
}}if(o.getRelatedTarget){var B=o.getRelatedTarget();
var A=qx.ui.core.Widget.getWidgetByElement(B);

while(A&&A.isAnonymous()){A=A.getLayoutParent();
}
if(A){if(this.__focusEvents[o.getType()]){A=A.getFocusTarget();
}if(A===s){return;
}}}var w=o.getCurrentTarget();
var y=qx.ui.core.Widget.getWidgetByElement(w);

if(!y||y.isAnonymous()){return;
}if(this.__focusEvents[o.getType()]){y=y.getFocusTarget();
}var z=o.getType();

if(!y||!(y.isEnabled()||this.__ignoreDisabled[z])){return;
}var p=o.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;
var v=this.__manager.getListeners(y,z,p);

if(!v||v.length===0){return;
}var q=qx.event.Pool.getInstance().getObject(o.constructor);
o.clone(q);
q.setTarget(s);
q.setRelatedTarget(A||null);
q.setCurrentTarget(y);
var C=o.getOriginalTarget();

if(C){var r=qx.ui.core.Widget.getWidgetByElement(C);

while(r&&r.isAnonymous()){r=r.getLayoutParent();
}q.setOriginalTarget(r);
}else{q.setOriginalTarget(t);
}for(var i=0,l=v.length;i<l;i++){var x=v[i].context||y;
v[i].handler.call(x,q);
}if(q.getPropagationStopped()){o.stopPropagation();
}
if(q.getDefaultPrevented()){o.preventDefault();
}qx.event.Pool.getInstance().poolObject(q);
},registerEvent:function(j,k,m){var n;

if(k===e||k===f){n=j.getFocusElement();
}else if(k===c||k===d){n=j.getContentElement();
}else{n=j.getContainerElement();
}
if(n){n.addListener(k,this._dispatchEvent,this,m);
}},unregisterEvent:function(E,F,G){var H;

if(F===e||F===f){H=E.getFocusElement();
}else if(F===c||F===d){H=E.getContentElement();
}else{H=E.getContainerElement();
}
if(H){H.removeListener(F,this._dispatchEvent,this,G);
}}},destruct:function(){this.__manager=null;
},defer:function(D){qx.event.Registration.addHandler(D);
}});
})();
(function(){var j="/",i="mshtml",h="",g="qx.client",f="?",e="string",d="qx.util.ResourceManager",c="singleton";
qx.Class.define(d,{extend:qx.core.Object,type:c,statics:{__registry:qx.$$resources||{},__urlPrefix:{}},members:{has:function(q){return !!this.self(arguments).__registry[q];
},getData:function(B){return this.self(arguments).__registry[B]||null;
},getImageWidth:function(r){var s=this.self(arguments).__registry[r];
return s?s[0]:null;
},getImageHeight:function(z){var A=this.self(arguments).__registry[z];
return A?A[1]:null;
},getImageFormat:function(a){var b=this.self(arguments).__registry[a];
return b?b[2]:null;
},isClippedImage:function(k){var l=this.self(arguments).__registry[k];
return l&&l.length>4;
},toUri:function(m){if(m==null){return m;
}var n=this.self(arguments).__registry[m];

if(!n){return m;
}
if(typeof n===e){var p=n;
}else{var p=n[3];
if(!p){return m;
}}var o=h;

if(qx.core.Variant.isSet(g,i)&&qx.bom.client.Feature.SSL){o=this.self(arguments).__urlPrefix[p];
}return o+qx.$$libraries[p].resourceUri+j+m;
}},defer:function(t){if(qx.core.Variant.isSet(g,i)){if(qx.bom.client.Feature.SSL){for(var x in qx.$$libraries){var v;

if(qx.$$libraries[x].resourceUri){v=qx.$$libraries[x].resourceUri;
}else{t.__urlPrefix[x]=h;
continue;
}if(v.match(/^\/\//)!=null){t.__urlPrefix[x]=window.location.protocol;
}else if(v.match(/^\.\//)!=null){var u=document.URL;
t.__urlPrefix[x]=u.substring(0,u.lastIndexOf(j)+1);
}else if(v.match(/^http/)!=null){}else{var y=window.location.href.indexOf(f);
var w;

if(y==-1){w=window.location.href;
}else{w=window.location.href.substring(0,y);
}t.__urlPrefix[x]=w.substring(0,w.lastIndexOf(j)+1);
}}}}}});
})();
(function(){var c="qx.bom.client.Locale",b="-",a="";
qx.Class.define(c,{statics:{LOCALE:"",VARIANT:"",__init:function(){var e=(navigator.userLanguage||navigator.language).toLowerCase();
var g=a;
var f=e.indexOf(b);

if(f!=-1){g=e.substr(f+1);
e=e.substr(0,f);
}this.LOCALE=e;
this.VARIANT=g;
}},defer:function(d){d.__init();
}});
})();
(function(){var t="",s='indexOf',r='slice',q='concat',p='toLocaleLowerCase',o="qx.type.BaseString",n='match',m='toLocaleUpperCase',k='search',j='replace',c='toLowerCase',h='charCodeAt',f='split',b='substring',a='lastIndexOf',e='substr',d='toUpperCase',g='charAt';
qx.Class.define(o,{extend:Object,construct:function(w){var w=w||t;
this.__txt=w;
this.length=w.length;
},members:{$$isString:true,length:0,__txt:null,toString:function(){return this.__txt;
},charAt:null,valueOf:null,charCodeAt:null,concat:null,indexOf:null,lastIndexOf:null,match:null,replace:null,search:null,slice:null,split:null,substr:null,substring:null,toLowerCase:null,toUpperCase:null,toHashCode:function(){return qx.core.ObjectRegistry.toHashCode(this);
},toLocaleLowerCase:null,toLocaleUpperCase:null,base:function(u,v){return qx.core.Object.prototype.base.apply(this,arguments);
}},defer:function(x,y){{};
var z=[g,h,q,s,a,n,j,k,r,f,e,b,c,d,p,m];
y.valueOf=y.toString;

if(new x(t).valueOf()==null){delete y.valueOf;
}
for(var i=0,l=z.length;i<l;i++){y[z[i]]=String.prototype[z[i]];
}}});
})();
(function(){var a="qx.locale.LocalizedString";
qx.Class.define(a,{extend:qx.type.BaseString,construct:function(b,c,d){qx.type.BaseString.call(this,b);
this.__messageId=c;
this.__args=d;
},members:{__messageId:null,__args:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__messageId,this.__args);
}}});
})();
(function(){var o="_",n="",m="_applyLocale",l="changeLocale",k="C",j="qx.dynlocale",h="on",g="qx.locale.Manager",f="String",e="singleton";
qx.Class.define(g,{type:e,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__translations=qx.$$translations||{};
this.__locales=qx.$$locales||{};
var x=qx.bom.client.Locale;
var v=x.LOCALE;
var w=x.VARIANT;

if(w!==n){v+=o+w;
}this.setLocale(v||this.__defaultLocale);
},statics:{tr:function(y,z){var A=qx.lang.Array.fromArguments(arguments);
A.splice(0,1);
return qx.locale.Manager.getInstance().translate(y,A);
},trn:function(X,Y,ba,bb){var bc=qx.lang.Array.fromArguments(arguments);
bc.splice(0,3);
if(ba!=1){return qx.locale.Manager.getInstance().translate(Y,bc);
}else{return qx.locale.Manager.getInstance().translate(X,bc);
}},trc:function(F,G,H){var I=qx.lang.Array.fromArguments(arguments);
I.splice(0,2);
return qx.locale.Manager.getInstance().translate(G,I);
},marktr:function(T){return T;
}},properties:{locale:{check:f,nullable:true,apply:m,event:l}},members:{__defaultLocale:k,__locale:null,__language:null,__translations:null,__locales:null,getLanguage:function(){return this.__language;
},getTerritory:function(){return this.getLocale().split(o)[1]||n;
},getAvailableLocales:function(){var u=[];

for(var t in this.__locales){if(t!=this.__defaultLocale){u.push(t);
}}return u;
},__extractLanguage:function(U){var W;
var V=U.indexOf(o);

if(V==-1){W=U;
}else{W=U.substring(0,V);
}return W;
},_applyLocale:function(J,K){this.__locale=J;
this.__language=this.__extractLanguage(J);
},addTranslation:function(B,C){var D=this.__translations;

if(D[B]){for(var E in C){D[B][E]=C[E];
}}else{D[B]=C;
}},addLocale:function(p,q){var r=this.__locales;

if(r[p]){for(var s in q){r[p][s]=q[s];
}}else{r[p]=q;
}},translate:function(a,b,c){var d=this.__translations;
return this.__lookupAndExpand(d,a,b,c);
},localize:function(bd,be,bf){var bg=this.__locales;
return this.__lookupAndExpand(bg,bd,be,bf);
},__lookupAndExpand:function(L,M,N,O){var P;

if(!L){return M;
}
if(O){var R=this.__extractLanguage(O);
}else{O=this.__locale;
R=this.__language;
}if(!P&&L[O]){P=L[O][M];
}if(!P&&L[R]){P=L[R][M];
}if(!P&&L[this.__defaultLocale]){P=L[this.__defaultLocale][M];
}
if(!P){P=M;
}
if(N.length>0){var Q=[];

for(var i=0;i<N.length;i++){var S=N[i];

if(S&&S.translate){Q[i]=S.translate();
}else{Q[i]=S;
}}P=qx.lang.String.format(P,Q);
}
if(qx.core.Variant.isSet(j,h)){P=new qx.locale.LocalizedString(P,M,N);
}return P;
}},destruct:function(){this.__translations=this.__locales=null;
}});
})();
(function(){var n="px",m="qx.client",l="div",k="img",j="",i="no-repeat",h="scale-x",g="mshtml",f="scale",d="scale-y",J="qx/icon",I="repeat",H=".png",G="crop",F="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",E='<div style="',D="repeat-y",C='<img src="',B="qx.bom.element.Decoration",A="', sizingMethod='",u="png",v="')",s='"></div>',t='"/>',q='" style="',r="none",o="webkit",p=" ",w="repeat-x",x="DXImageTransform.Microsoft.AlphaImageLoader",z="qx/static/blank.gif",y="absolute";
qx.Class.define(B,{statics:{DEBUG:false,__warnings:{},__enableAlphaFix:qx.core.Variant.isSet(m,g),__alphaFixRepeats:qx.core.Variant.select(m,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__repeatToTagname:{"scale-x":k,"scale-y":k,"scale":k,"repeat":l,"no-repeat":l,"repeat-x":l,"repeat-y":l},update:function(bf,bh,bi,bj){var bl=this.getTagName(bi,bh);

if(bl!=bf.tagName.toLowerCase()){throw new Error("Image modification not possible because elements could not be replaced at runtime anymore!");
}var bm=this.getAttributes(bh,bi,bj);

if(bl===k){bf.src=bm.src||qx.util.ResourceManager.getInstance().toUri(z);
}if(bf.style.backgroundPosition!=j&&bm.style.backgroundPosition===undefined){bm.style.backgroundPosition=null;
}if(bf.style.clip!=j&&bm.style.clip===undefined){bm.style.clip=null;
}var bk=qx.bom.element.Style;
bk.setStyles(bf,bm.style);
if(this.__enableAlphaFix){try{bf.filters[x].apply();
}catch(e){}}},create:function(bH,bI,bJ){var bK=this.getTagName(bI,bH);
var bM=this.getAttributes(bH,bI,bJ);
var bL=qx.bom.element.Style.compile(bM.style);

if(bK===k){return C+bM.src+q+bL+t;
}else{return E+bL+s;
}},getTagName:function(bz,bA){if(qx.core.Variant.isSet(m,g)){if(bA&&this.__enableAlphaFix&&this.__alphaFixRepeats[bz]&&qx.lang.String.endsWith(bA,H)){return l;
}}return this.__repeatToTagname[bz];
},getAttributes:function(ba,bb,bc){if(!bc){bc={};
}
if(!bc.position){bc.position=y;
}
if(qx.core.Variant.isSet(m,g)){bc.fontSize=0;
bc.lineHeight=0;
}else if(qx.core.Variant.isSet(m,o)){bc.WebkitUserDrag=r;
}var be=qx.util.ResourceManager.getInstance().getImageFormat(ba)||qx.io.ImageLoader.getFormat(ba);
{};
var bd;
if(this.__enableAlphaFix&&this.__alphaFixRepeats[bb]&&be===u){bd=this.__processAlphaFix(bc,bb,ba);
}else{if(bb===f){bd=this.__processScale(bc,bb,ba);
}else if(bb===h||bb===d){bd=this.__processScaleXScaleY(bc,bb,ba);
}else{bd=this.__processRepeats(bc,bb,ba);
}}return bd;
},__normalizeWidthHeight:function(W,X,Y){if(W.width==null&&X!=null){W.width=X+n;
}
if(W.height==null&&Y!=null){W.height=Y+n;
}return W;
},__getDimension:function(a){var b=qx.util.ResourceManager.getInstance().getImageWidth(a)||qx.io.ImageLoader.getWidth(a);
var c=qx.util.ResourceManager.getInstance().getImageHeight(a)||qx.io.ImageLoader.getHeight(a);
return {width:b,height:c};
},__processAlphaFix:function(bB,bC,bD){var bG=this.__getDimension(bD);
bB=this.__normalizeWidthHeight(bB,bG.width,bG.height);
var bF=bC==i?G:f;
var bE=F+qx.util.ResourceManager.getInstance().toUri(bD)+A+bF+v;
bB.filter=bE;
bB.backgroundImage=bB.backgroundRepeat=j;
return {style:bB};
},__processScale:function(K,L,M){var N=qx.util.ResourceManager.getInstance().toUri(M);
var O=this.__getDimension(M);
K=this.__normalizeWidthHeight(K,O.width,O.height);
return {src:N,style:K};
},__processScaleXScaleY:function(bO,bP,bQ){var bU=qx.util.ResourceManager.getInstance();
var bT=bU.isClippedImage(bQ);
var bV=this.__getDimension(bQ);

if(bT){var bS=bU.getData(bQ);
var bR=bU.toUri(bS[4]);

if(bP===h){bO=this.__getStylesForClippedScaleX(bO,bS,bV.height);
}else{bO=this.__getStylesForClippedScaleY(bO,bS,bV.width);
}return {src:bR,style:bO};
}else{{};

if(bP==h){bO.height=bV.height==null?null:bV.height+n;
}else if(bP==d){bO.width=bV.width==null?null:bV.width+n;
}var bR=bU.toUri(bQ);
return {src:bR,style:bO};
}},__getStylesForClippedScaleX:function(bn,bo,bp){var bq=qx.util.ResourceManager.getInstance().getImageHeight(bo[4]);
bn.clip={top:-bo[6],height:bp};
bn.height=bq+n;
if(bn.top!=null){bn.top=(parseInt(bn.top,10)+bo[6])+n;
}else if(bn.bottom!=null){bn.bottom=(parseInt(bn.bottom,10)+bp-bq-bo[6])+n;
}return bn;
},__getStylesForClippedScaleY:function(bW,bX,bY){var ca=qx.util.ResourceManager.getInstance().getImageWidth(bX[4]);
bW.clip={left:-bX[5],width:bY};
bW.width=ca+n;
if(bW.left!=null){bW.left=(parseInt(bW.left,10)+bX[5])+n;
}else if(bW.right!=null){bW.right=(parseInt(bW.right,10)+bY-ca-bX[5])+n;
}return bW;
},__processRepeats:function(br,bs,bt){var by=qx.util.ResourceManager.getInstance().isClippedImage(bt);
var bx=this.__getDimension(bt);
if(by&&bs!==I){var bw=qx.util.ResourceManager.getInstance().getData(bt);
var bv=qx.bom.element.Background.getStyles(bw[4],bs,bw[5],bw[6]);

for(var bu in bv){br[bu]=bv[bu];
}
if(bx.width!=null&&br.width==null&&(bs==D||bs===i)){br.width=bx.width+n;
}
if(bx.height!=null&&br.height==null&&(bs==w||bs===i)){br.height=bx.height+n;
}return {style:br};
}else{{};
br=this.__normalizeWidthHeight(br,bx.width,bx.height);
br=this.__getStylesForSingleRepeat(br,bt,bs);
return {style:br};
}},__getStylesForSingleRepeat:function(P,Q,R){var top=null;
var V=null;

if(P.backgroundPosition){var S=P.backgroundPosition.split(p);
V=parseInt(S[0]);

if(isNaN(V)){V=S[0];
}top=parseInt(S[1]);

if(isNaN(top)){top=S[1];
}}var U=qx.bom.element.Background.getStyles(Q,R,V,top);

for(var T in U){P[T]=U[T];
}if(P.filter){P.filter=j;
}return P;
},__checkForPotentialClippedImage:function(bN){if(this.DEBUG&&qx.util.ResourceManager.getInstance().has(bN)&&bN.indexOf(J)==-1){if(!this.__warnings[bN]){qx.log.Logger.debug("Potential clipped image candidate: "+bN);
this.__warnings[bN]=true;
}}},isAlphaImageLoaderEnabled:qx.core.Variant.select(m,{"mshtml":function(){return qx.bom.element.Decoration.__enableAlphaFix;
},"default":function(){return false;
}})}});
})();
(function(){var c="qx.client",b="load",a="qx.io.ImageLoader";
qx.Bootstrap.define(a,{statics:{__data:{},__defaultSize:{width:null,height:null},__knownImageTypesRegExp:/\.(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(q){var r=this.__data[q];
return !!(r&&r.loaded);
},isFailed:function(m){var n=this.__data[m];
return !!(n&&n.failed);
},isLoading:function(u){var v=this.__data[u];
return !!(v&&v.loading);
},getFormat:function(x){var y=this.__data[x];
return y?y.format:null;
},getSize:function(B){var C=this.__data[B];
return C?
{width:C.width,height:C.height}:this.__defaultSize;
},getWidth:function(o){var p=this.__data[o];
return p?p.width:null;
},getHeight:function(s){var t=this.__data[s];
return t?t.height:null;
},load:function(d,e,f){var g=this.__data[d];

if(!g){g=this.__data[d]={};
}if(e&&!f){f=window;
}if(g.loaded||g.loading||g.failed){if(e){if(g.loading){g.callbacks.push(e,f);
}else{e.call(f,d,g);
}}}else{g.loading=true;
g.callbacks=[];

if(e){g.callbacks.push(e,f);
}var j=new Image();
var h=qx.lang.Function.listener(this.__onload,this,j,d);
j.onload=h;
j.onerror=h;
j.src=d;
}},__onload:qx.event.GlobalError.observeMethod(function(event,D,E){var F=this.__data[E];
if(event.type===b){F.loaded=true;
F.width=this.__getWidth(D);
F.height=this.__getHeight(D);
var G=this.__knownImageTypesRegExp.exec(E);

if(G!=null){F.format=G[1];
}}else{F.failed=true;
}D.onload=D.onerror=null;
var H=F.callbacks;
delete F.loading;
delete F.callbacks;
for(var i=0,l=H.length;i<l;i+=2){H[i].call(H[i+1],E,F);
}}),__getWidth:qx.core.Variant.select(c,{"gecko":function(k){return k.naturalWidth;
},"default":function(A){return A.width;
}}),__getHeight:qx.core.Variant.select(c,{"gecko":function(w){return w.naturalHeight;
},"default":function(z){return z.height;
}})}});
})();
(function(){var m="number",l="0",k="px",j=";",i="background-image:url(",h=");",g="",f=")",e="background-repeat:",d=" ",a="qx.bom.element.Background",c="url(",b="background-position:";
qx.Class.define(a,{statics:{__tmpl:[i,null,h,b,null,j,e,null,j],__emptyStyles:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__computePosition:function(t,top){var u=qx.bom.client.Engine;

if(u.GECKO&&u.VERSION<1.9&&t==top&&typeof t==m){top+=0.01;
}
if(t){var v=(typeof t==m)?t+k:t;
}else{v=l;
}
if(top){var w=(typeof top==m)?top+k:top;
}else{w=l;
}return v+d+w;
},compile:function(D,E,F,top){var G=this.__computePosition(F,top);
var H=qx.util.ResourceManager.getInstance().toUri(D);
var I=this.__tmpl;
I[1]=H;
I[4]=G;
I[7]=E;
return I.join(g);
},getStyles:function(n,o,p,top){if(!n){return this.__emptyStyles;
}var q=this.__computePosition(p,top);
var r=qx.util.ResourceManager.getInstance().toUri(n);
var s={backgroundPosition:q,backgroundImage:c+r+f};

if(o!=null){s.backgroundRepeat=o;
}return s;
},set:function(x,y,z,A,top){var B=this.getStyles(y,z,A,top);

for(var C in B){x.style[C]=B[C];
}}}});
})();
(function(){var j="source",i="scale",h="no-repeat",g="qx.client",f="mshtml",e="webkit",d="backgroundImage",c="div",b="qx.html.Image",a="qx/static/blank.gif";
qx.Class.define(b,{extend:qx.html.Element,members:{tagNameHint:null,_applyProperty:function(name,p){qx.html.Element.prototype._applyProperty.call(this,name,p);

if(name===j){var t=this.getDomElement();
var q=this.getAllStyles();

if(this.getNodeName()==c&&this.getStyle(d)){q.backgroundPosition=null;
q.backgroundRepeat=null;
}var r=this._getProperty(j);
var s=this._getProperty(i);
var u=s?i:h;
if(r!=null){qx.bom.element.Decoration.update(t,r,u,q);
}}},_createDomElement:function(){var l=this._getProperty(i);
var m=l?i:h;

if(qx.core.Variant.isSet(g,f)){var k=this._getProperty(j);

if(this.tagNameHint!=null){this.setNodeName(this.tagNameHint);
}else{this.setNodeName(qx.bom.element.Decoration.getTagName(m,k));
}}else{this.setNodeName(qx.bom.element.Decoration.getTagName(m));
}return qx.html.Element.prototype._createDomElement.call(this);
},_copyData:function(o){return qx.html.Element.prototype._copyData.call(this,true);
},setSource:function(v){this._setProperty(j,v);
return this;
},getSource:function(){return this._getProperty(j);
},resetSource:function(){if(qx.core.Variant.isSet(g,e)){this._setProperty(j,qx.util.ResourceManager.getInstance().toUri(a));
}else{this._removeProperty(j,true);
}return this;
},setScale:function(n){this._setProperty(i,n);
return this;
},getScale:function(){return this._getProperty(i);
}}});
})();
(function(){var K="nonScaled",J="scaled",I="alphaScaled",H=".png",G="qx.client",F="div",E="replacement",D="qx.event.type.Event",C="hidden",B="Boolean",ba="px",Y="scale",X="changeSource",W="qx.ui.basic.Image",V="loaded",U="-disabled.$1",T="loadingFailed",S="String",R="_applySource",Q="img",O="__contentElements",P="image",M="mshtml",N="_applyScale",L="no-repeat";
qx.Class.define(W,{extend:qx.ui.core.Widget,construct:function(bp){this.__contentElements={};
qx.ui.core.Widget.call(this);

if(bp){this.setSource(bp);
}},properties:{source:{check:S,init:null,nullable:true,event:X,apply:R,themeable:true},scale:{check:B,init:false,themeable:true,apply:N},appearance:{refine:true,init:P},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},events:{loadingFailed:D,loaded:D},members:{__width:null,__height:null,__mode:null,__contentElements:null,getContentElement:function(){return this.__getSuitableContentElement();
},_createContentElement:function(){return this.__getSuitableContentElement();
},_getContentHint:function(){return {width:this.__width||0,height:this.__height||0};
},_applyEnabled:function(bm,bn){qx.ui.core.Widget.prototype._applyEnabled.call(this,bm,bn);

if(this.getSource()){this._styleSource();
}},_applySource:function(bo){this._styleSource();
},_applyScale:function(bi){this._styleSource();
},__setMode:function(o){this.__mode=o;
},__getMode:function(){if(this.__mode==null){var l=this.getSource();
var k=false;

if(l!=null){k=qx.lang.String.endsWith(l,H);
}
if(this.getScale()&&k&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){this.__mode=I;
}else if(this.getScale()){this.__mode=J;
}else{this.__mode=K;
}}return this.__mode;
},__createSuitableContentElement:function(p){var q;
var r;

if(p==I){q=true;
r=F;
}else if(p==K){q=false;
r=F;
}else{q=true;
r=Q;
}var s=new qx.html.Image(r);
s.setScale(q);
s.setStyles({"overflowX":C,"overflowY":C});
return s;
},__getSuitableContentElement:function(){var j=this.__getMode();

if(this.__contentElements[j]==null){this.__contentElements[j]=this.__createSuitableContentElement(j);
}return this.__contentElements[j];
},_styleSource:function(){var bg=qx.util.AliasManager.getInstance().resolve(this.getSource());

if(!bg){this.getContentElement().resetSource();
return;
}this.__checkForContentElementSwitch(bg);

if(qx.core.Variant.isSet(G,M)){var bh=this.getScale()?Y:L;
this.getContentElement().tagNameHint=qx.bom.element.Decoration.getTagName(bh,bg);
}if(qx.util.ResourceManager.getInstance().has(bg)){this.__setManagedImage(this.getContentElement(),bg);
}else if(qx.io.ImageLoader.isLoaded(bg)){this.__setUnmanagedImage(this.getContentElement(),bg);
}else{this.__loadUnmanagedImage(this.getContentElement(),bg);
}},__checkForContentElementSwitch:qx.core.Variant.select(G,{"mshtml":function(u){var w=qx.bom.element.Decoration.isAlphaImageLoaderEnabled();
var v=qx.lang.String.endsWith(u,H);

if(w&&v){if(this.getScale()&&this.__getMode()!=I){this.__setMode(I);
}else if(!this.getScale()&&this.__getMode()!=K){this.__setMode(K);
}}else{if(this.getScale()&&this.__getMode()!=J){this.__setMode(J);
}else if(!this.getScale()&&this.__getMode()!=K){this.__setMode(K);
}}this.__checkForContentElementReplacement(this.__getSuitableContentElement());
},"default":function(t){if(this.getScale()&&this.__getMode()!=J){this.__setMode(J);
}else if(!this.getScale()&&this.__getMode(K)){this.__setMode(K);
}this.__checkForContentElementReplacement(this.__getSuitableContentElement());
}}),__checkForContentElementReplacement:function(c){var f=this.getContainerElement();
var g=f.getChild(0);

if(g!=c){if(g!=null){var i=ba;
var d={};
var e=this.getInnerSize();

if(e!=null){d.width=e.width+i;
d.height=e.height+i;
}var h=this.getInsets();
d.left=h.left+i;
d.top=h.top+i;
d.zIndex=10;
c.setStyles(d,true);
c.setSelectable(this.getSelectable());
}f.removeAt(0);
f.addAt(c,0);
}},__setManagedImage:function(x,y){var A=qx.util.ResourceManager.getInstance();
if(!this.getEnabled()){var z=y.replace(/\.([a-z]+)$/,U);

if(A.has(z)){y=z;
this.addState(E);
}else{this.removeState(E);
}}if(x.getSource()===y){return;
}x.setSource(y);
this.__updateContentHint(A.getImageWidth(y),A.getImageHeight(y));
},__setUnmanagedImage:function(bb,bc){var be=qx.io.ImageLoader;
bb.setSource(bc);
var bd=be.getWidth(bc);
var bf=be.getHeight(bc);
this.__updateContentHint(bd,bf);
},__loadUnmanagedImage:function(bj,bk){var self;
var bl=qx.io.ImageLoader;
{};
if(!bl.isFailed(bk)){bl.load(bk,this.__loaderCallback,this);
}else{if(bj!=null){bj.resetSource();
}}},__loaderCallback:function(a,b){if(this.$$disposed===true){return;
}if(a!==qx.util.AliasManager.getInstance().resolve(this.getSource())){return;
}if(b.failed){this.warn("Image could not be loaded: "+a);
this.fireEvent(T);
}else{this.fireEvent(V);
}this._styleSource();
},__updateContentHint:function(m,n){if(m!==this.__width||n!==this.__height){this.__width=m;
this.__height=n;
qx.ui.core.queue.Layout.add(this);
}}},destruct:function(){this._disposeMap(O);
}});
})();
(function(){var g="dragdrop-cursor",f="_applyAction",e="alias",d="qx.ui.core.DragDropCursor",c="move",b="singleton",a="copy";
qx.Class.define(d,{extend:qx.ui.basic.Image,include:qx.ui.core.MPlacement,type:b,construct:function(){qx.ui.basic.Image.call(this);
this.setZIndex(1e8);
this.setDomMove(true);
var h=this.getApplicationRoot();
h.add(this,{left:-1000,top:-1000});
},properties:{appearance:{refine:true,init:g},action:{check:[e,a,c],apply:f,nullable:true}},members:{_applyAction:function(i,j){if(j){this.removeState(j);
}
if(i){this.addState(i);
}}}});
})();
(function(){var f="interval",e="Number",d="_applyTimeoutInterval",c="qx.event.type.Event",b="qx.event.Idle",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,construct:function(){qx.core.Object.call(this);
var g=new qx.event.Timer(this.getTimeoutInterval());
g.addListener(f,this._onInterval,this);
g.start();
this.__timer=g;
},events:{"interval":c},properties:{timeoutInterval:{check:e,init:100,apply:d}},members:{__timer:null,_applyTimeoutInterval:function(h){this.__timer.setInterval(h);
},_onInterval:function(){this.fireEvent(f);
}},destruct:function(){if(this.__timer){this.__timer.stop();
}this.__timer=null;
}});
})();
(function(){var o="top",n="right",m="bottom",l="left",k="align-start",j="qx.util.placement.AbstractAxis",i="edge-start",h="align-end",g="edge-end",f="-",c="best-fit",e="qx.util.placement.Placement",d="keep-align",b="direct",a='__defaultAxis';
qx.Class.define(e,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__defaultAxis=new qx.util.placement.DirectAxis();
},properties:{axisX:{check:j},axisY:{check:j},edge:{check:[o,n,m,l],init:o},align:{check:[o,n,m,l],init:n}},statics:{__instance:null,compute:function(p,q,r,s,t,u,v){this.__instance=this.__instance||new qx.util.placement.Placement();
var y=t.split(f);
var x=y[0];
var w=y[1];
this.__instance.set({axisX:this.__getAxis(u),axisY:this.__getAxis(v),edge:x,align:w});
return this.__instance.compute(p,q,r,s);
},__direct:null,__keepAlign:null,__bestFit:null,__getAxis:function(G){switch(G){case b:this.__direct=this.__direct||new qx.util.placement.DirectAxis();
return this.__direct;
case d:this.__keepAlign=this.__keepAlign||new qx.util.placement.KeepAlignAxis();
return this.__keepAlign;
case c:this.__bestFit=this.__bestFit||new qx.util.placement.BestFitAxis();
return this.__bestFit;
default:throw new Error("Invalid 'mode' argument!'");
}}},members:{__defaultAxis:null,compute:function(z,A,B,C){{};
var D=this.getAxisX()||this.__defaultAxis;
var F=D.computeStart(z.width,{start:B.left,end:B.right},{start:C.left,end:C.right},A.width,this.__getPositionX());
var E=this.getAxisY()||this.__defaultAxis;
var top=E.computeStart(z.height,{start:B.top,end:B.bottom},{start:C.top,end:C.bottom},A.height,this.__getPositionY());
return {left:F,top:top};
},__getPositionX:function(){var I=this.getEdge();
var H=this.getAlign();

if(I==l){return i;
}else if(I==n){return g;
}else if(H==l){return k;
}else if(H==n){return h;
}},__getPositionY:function(){var K=this.getEdge();
var J=this.getAlign();

if(K==o){return i;
}else if(K==m){return g;
}else if(J==o){return k;
}else if(J==m){return h;
}}},destruct:function(){this._disposeObjects(a);
}});
})();
(function(){var e="edge-start",d="align-start",c="align-end",b="edge-end",a="qx.util.placement.AbstractAxis";
qx.Class.define(a,{extend:qx.core.Object,members:{computeStart:function(f,g,h,i,j){throw new Error("abstract method call!");
},_moveToEdgeAndAlign:function(k,l,m,n){switch(n){case e:return l.start-m.end-k;
case b:return l.end+m.start;
case d:return l.start+m.start;
case c:return l.end-m.end-k;
}},_isInRange:function(o,p,q){return o>=0&&o+p<=q;
}}});
})();
(function(){var a="qx.util.placement.DirectAxis";
qx.Class.define(a,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(b,c,d,e,f){return this._moveToEdgeAndAlign(b,c,d,f);
}}});
})();
(function(){var c="qx.util.placement.KeepAlignAxis",b="edge-start",a="edge-end";
qx.Class.define(c,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(d,e,f,g,h){var i=this._moveToEdgeAndAlign(d,e,f,h);
var j,k;

if(this._isInRange(i,d,g)){return i;
}
if(h==b||h==a){j=e.start-f.end;
k=e.end+f.start;
}else{j=e.end-f.end;
k=e.start+f.start;
}
if(j>g-k){i=j-d;
}else{i=k;
}return i;
}}});
})();
(function(){var a="qx.util.placement.BestFitAxis";
qx.Class.define(a,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(b,c,d,e,f){var g=this._moveToEdgeAndAlign(b,c,d,f);

if(this._isInRange(g,b,e)){return g;
}
if(g<0){g=Math.min(0,e-b);
}
if(g+b>e){g=Math.max(0,e-b);
}return g;
}}});
})();
(function(){var f="mousedown",d="__objects",c="blur",b="singleton",a="qx.ui.popup.Manager";
qx.Class.define(a,{type:b,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__objects={};
qx.event.Registration.addListener(document.documentElement,f,this.__onMouseDown,this,true);
qx.bom.Element.addListener(window,c,this.hideAll,this);
},members:{__objects:null,add:function(p){{};
this.__objects[p.$$hash]=p;
this.__updateIndexes();
},remove:function(q){{};
var r=this.__objects;

if(r){delete r[q.$$hash];
this.__updateIndexes();
}},hideAll:function(){var o=this.__objects;

if(o){for(var n in o){o[n].exclude();
}}},__updateIndexes:function(){var m=1e7;
var l=this.__objects;

for(var k in l){l[k].setZIndex(m++);
}},__onMouseDown:function(e){var i=qx.ui.core.Widget.getWidgetByElement(e.getTarget());
var j=this.__objects;

for(var h in j){var g=j[h];

if(!g.getAutoHide()||i==g||qx.ui.core.Widget.contains(g,i)){continue;
}g.exclude();
}}},destruct:function(){qx.event.Registration.removeListener(document.documentElement,f,this.__onMouseDown,this,true);
this._disposeMap(d);
}});
})();
(function(){var c="abstract",b="qx.ui.layout.Abstract";
qx.Class.define(b,{type:c,extend:qx.core.Object,members:{__sizeHint:null,_invalidChildrenCache:null,__widget:null,invalidateLayoutCache:function(){this.__sizeHint=null;
},renderLayout:function(h,i){this.warn("Missing renderLayout() implementation!");
},getSizeHint:function(){if(this.__sizeHint){return this.__sizeHint;
}return this.__sizeHint=this._computeSizeHint();
},hasHeightForWidth:function(){return false;
},getHeightForWidth:function(a){this.warn("Missing getHeightForWidth() implementation!");
return null;
},_computeSizeHint:function(){return null;
},invalidateChildrenCache:function(){this._invalidChildrenCache=true;
},verifyLayoutProperty:null,_clearSeparators:function(){var d=this.__widget;

if(d instanceof qx.ui.core.LayoutItem){d.clearSeparators();
}},_renderSeparator:function(f,g){this.__widget.renderSeparator(f,g);
},connectToWidget:function(e){if(e&&this.__widget){throw new Error("It is not possible to manually set the connected widget.");
}this.__widget=e;
this.invalidateChildrenCache();
},_getWidget:function(){return this.__widget;
},_applyLayoutChange:function(){if(this.__widget){this.__widget.scheduleLayoutUpdate();
}},_getLayoutChildren:function(){return this.__widget.getLayoutChildren();
}},destruct:function(){this.__widget=this.__sizeHint=null;
}});
})();
(function(){var a="qx.ui.layout.Grow";
qx.Class.define(a,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(m,n){var r=this._getLayoutChildren();
var q,s,p,o;
for(var i=0,l=r.length;i<l;i++){q=r[i];
s=q.getSizeHint();
p=m;

if(p<s.minWidth){p=s.minWidth;
}else if(p>s.maxWidth){p=s.maxWidth;
}o=n;

if(o<s.minHeight){o=s.minHeight;
}else if(o>s.maxHeight){o=s.maxHeight;
}q.renderLayout(0,0,p,o);
}},_computeSizeHint:function(){var h=this._getLayoutChildren();
var f,k;
var j=0,g=0;
var e=0,c=0;
var b=Infinity,d=Infinity;
for(var i=0,l=h.length;i<l;i++){f=h[i];
k=f.getSizeHint();
j=Math.max(j,k.width);
g=Math.max(g,k.height);
e=Math.max(e,k.minWidth);
c=Math.max(c,k.minHeight);
b=Math.min(b,k.maxWidth);
d=Math.min(d,k.maxHeight);
}return {width:j,height:g,minWidth:e,minHeight:c,maxWidth:b,maxHeight:d};
}}});
})();
(function(){var m="label",l="icon",k="Boolean",j="both",i="String",h="left",g="changeGap",f="changeShow",e="bottom",d="_applyCenter",z="changeIcon",y="qx.ui.basic.Atom",x="changeLabel",w="Integer",v="_applyIconPosition",u="top",t="right",s="_applyRich",r="_applyIcon",q="_applyShow",o="_applyLabel",p="_applyGap",n="atom";
qx.Class.define(y,{extend:qx.ui.core.Widget,construct:function(A,B){{};
qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.Atom());

if(A!=null){this.setLabel(A);
}
if(B!=null){this.setIcon(B);
}},properties:{appearance:{refine:true,init:n},label:{apply:o,nullable:true,check:i,event:x},rich:{check:k,init:false,apply:s},icon:{check:i,apply:r,nullable:true,themeable:true,event:z},gap:{check:w,nullable:false,event:g,apply:p,themeable:true,init:4},show:{init:j,check:[j,m,l],themeable:true,inheritable:true,apply:q,event:f},iconPosition:{init:h,check:[u,t,e,h],themeable:true,apply:v},center:{init:false,check:k,themeable:true,apply:d}},members:{_createChildControlImpl:function(M){var N;

switch(M){case m:N=new qx.ui.basic.Label(this.getLabel());
N.setAnonymous(true);
N.setRich(this.getRich());
this._add(N);

if(this.getLabel()==null||this.getShow()===l){N.exclude();
}break;
case l:N=new qx.ui.basic.Image(this.getIcon());
N.setAnonymous(true);
this._addAt(N,0);

if(this.getIcon()==null||this.getShow()===m){N.exclude();
}break;
}return N||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,M);
},_forwardStates:{focused:true,hovered:true},_handleLabel:function(){if(this.getLabel()==null||this.getShow()===l){this._excludeChildControl(m);
}else{this._showChildControl(m);
}},_handleIcon:function(){if(this.getIcon()==null||this.getShow()===m){this._excludeChildControl(l);
}else{this._showChildControl(l);
}},_applyLabel:function(C,D){var E=this.getChildControl(m,true);

if(E){E.setValue(C);
}this._handleLabel();
},_applyRich:function(a,b){var c=this.getChildControl(m,true);

if(c){c.setRich(a);
}},_applyIcon:function(F,G){var H=this.getChildControl(l,true);

if(H){H.setSource(F);
}this._handleIcon();
},_applyGap:function(K,L){this._getLayout().setGap(K);
},_applyShow:function(O,P){this._handleLabel();
this._handleIcon();
},_applyIconPosition:function(I,J){this._getLayout().setIconPosition(I);
},_applyCenter:function(Q,R){this._getLayout().setCenter(Q);
}}});
})();
(function(){var k="bottom",j="_applyLayoutChange",h="top",g="left",f="right",e="middle",d="center",c="qx.ui.layout.Atom",b="Integer",a="Boolean";
qx.Class.define(c,{extend:qx.ui.layout.Abstract,properties:{gap:{check:b,init:4,apply:j},iconPosition:{check:[g,h,f,k],init:g,apply:j},center:{check:a,init:false,apply:j}},members:{verifyLayoutProperty:null,renderLayout:function(l,m){var v=qx.ui.layout.Util;
var o=this.getIconPosition();
var r=this._getLayoutChildren();
var length=r.length;
var F,top,E,p;
var A,u;
var y=this.getGap();
var D=this.getCenter();
if(o===k||o===f){var w=length-1;
var s=-1;
var q=-1;
}else{var w=0;
var s=length;
var q=1;
}if(o==h||o==k){if(D){var z=0;

for(var i=w;i!=s;i+=q){p=r[i].getSizeHint().height;

if(p>0){z+=p;

if(i!=w){z+=y;
}}}top=Math.round((m-z)/2);
}else{top=0;
}
for(var i=w;i!=s;i+=q){A=r[i];
u=A.getSizeHint();
E=Math.min(u.maxWidth,Math.max(l,u.minWidth));
p=u.height;
F=v.computeHorizontalAlignOffset(d,E,l);
A.renderLayout(F,top,E,p);
if(p>0){top+=p+y;
}}}else{var t=l;
var n=null;
var C=0;

for(var i=w;i!=s;i+=q){A=r[i];
E=A.getSizeHint().width;

if(E>0){if(!n&&A instanceof qx.ui.basic.Label){n=A;
}else{t-=E;
}C++;
}}
if(C>1){var B=(C-1)*y;
t-=B;
}
if(n){var u=n.getSizeHint();
var x=Math.max(u.minWidth,Math.min(t,u.maxWidth));
t-=x;
}
if(D&&t>0){F=Math.round(t/2);
}else{F=0;
}
for(var i=w;i!=s;i+=q){A=r[i];
u=A.getSizeHint();
p=Math.min(u.maxHeight,Math.max(m,u.minHeight));

if(A===n){E=x;
}else{E=u.width;
}top=v.computeVerticalAlignOffset(e,u.height,m);
A.renderLayout(F,top,E,p);
if(E>0){F+=E+y;
}}}},_computeSizeHint:function(){var Q=this._getLayoutChildren();
var length=Q.length;
var I,O;
if(length===1){var I=Q[0].getSizeHint();
O={width:I.width,height:I.height,minWidth:I.minWidth,minHeight:I.minHeight};
}else{var M=0,N=0;
var J=0,L=0;
var K=this.getIconPosition();
var P=this.getGap();

if(K===h||K===k){var G=0;

for(var i=0;i<length;i++){I=Q[i].getSizeHint();
N=Math.max(N,I.width);
M=Math.max(M,I.minWidth);
if(I.height>0){L+=I.height;
J+=I.minHeight;
G++;
}}
if(G>1){var H=(G-1)*P;
L+=H;
J+=H;
}}else{var G=0;

for(var i=0;i<length;i++){I=Q[i].getSizeHint();
L=Math.max(L,I.height);
J=Math.max(J,I.minHeight);
if(I.width>0){N+=I.width;
M+=I.minWidth;
G++;
}}
if(G>1){var H=(G-1)*P;
N+=H;
M+=H;
}}O={minWidth:M,width:N,minHeight:J,height:L};
}return O;
}}});
})();
(function(){var q="middle",p="qx.ui.layout.Util",o="left",n="center",m="top",k="bottom",j="right";
qx.Class.define(p,{statics:{PERCENT_VALUE:/[0-9]+(?:\.[0-9]+)?%/,computeFlexOffsets:function(R,S,T){var V,ba,U,bb;
var W=S>T;
var bc=Math.abs(S-T);
var bd,X;
var Y={};

for(ba in R){V=R[ba];
Y[ba]={potential:W?V.max-V.value:V.value-V.min,flex:W?V.flex:1/V.flex,offset:0};
}while(bc!=0){bb=Infinity;
U=0;

for(ba in Y){V=Y[ba];

if(V.potential>0){U+=V.flex;
bb=Math.min(bb,V.potential/V.flex);
}}if(U==0){break;
}bb=Math.min(bc,bb*U)/U;
bd=0;

for(ba in Y){V=Y[ba];

if(V.potential>0){X=Math.min(bc,V.potential,Math.ceil(bb*V.flex));
bd+=X-bb*V.flex;

if(bd>=1){bd-=1;
X-=1;
}V.potential-=X;

if(W){V.offset+=X;
}else{V.offset-=X;
}bc-=X;
}}}return Y;
},computeHorizontalAlignOffset:function(bk,bl,bm,bn,bo){if(bn==null){bn=0;
}
if(bo==null){bo=0;
}var bp=0;

switch(bk){case o:bp=bn;
break;
case j:bp=bm-bl-bo;
break;
case n:bp=Math.round((bm-bl)/2);
if(bp<bn){bp=bn;
}else if(bp<bo){bp=Math.max(bn,bm-bl-bo);
}break;
}return bp;
},computeVerticalAlignOffset:function(be,bf,bg,bh,bi){if(bh==null){bh=0;
}
if(bi==null){bi=0;
}var bj=0;

switch(be){case m:bj=bh;
break;
case k:bj=bg-bf-bi;
break;
case q:bj=Math.round((bg-bf)/2);
if(bj<bh){bj=bh;
}else if(bj<bi){bj=Math.max(bh,bg-bf-bi);
}break;
}return bj;
},collapseMargins:function(N){var O=0,Q=0;

for(var i=0,l=arguments.length;i<l;i++){var P=arguments[i];

if(P<0){Q=Math.min(Q,P);
}else if(P>0){O=Math.max(O,P);
}}return O+Q;
},computeHorizontalGaps:function(z,A,B){if(A==null){A=0;
}var C=0;

if(B){C+=z[0].getMarginLeft();

for(var i=1,l=z.length;i<l;i+=1){C+=this.collapseMargins(A,z[i-1].getMarginRight(),z[i].getMarginLeft());
}C+=z[l-1].getMarginRight();
}else{for(var i=1,l=z.length;i<l;i+=1){C+=z[i].getMarginLeft()+z[i].getMarginRight();
}C+=(A*(l-1));
}return C;
},computeVerticalGaps:function(D,E,F){if(E==null){E=0;
}var G=0;

if(F){G+=D[0].getMarginTop();

for(var i=1,l=D.length;i<l;i+=1){G+=this.collapseMargins(E,D[i-1].getMarginBottom(),D[i].getMarginTop());
}G+=D[l-1].getMarginBottom();
}else{for(var i=1,l=D.length;i<l;i+=1){G+=D[i].getMarginTop()+D[i].getMarginBottom();
}G+=(E*(l-1));
}return G;
},computeHorizontalSeparatorGaps:function(a,b,c){var f=qx.theme.manager.Decoration.getInstance().resolve(c);
var e=f.getInsets();
var d=e.left+e.right;
var g=0;

for(var i=0,l=a.length;i<l;i++){var h=a[i];
g+=h.getMarginLeft()+h.getMarginRight();
}g+=(b+d+b)*(l-1);
return g;
},computeVerticalSeparatorGaps:function(r,s,t){var w=qx.theme.manager.Decoration.getInstance().resolve(t);
var v=w.getInsets();
var u=v.top+v.bottom;
var x=0;

for(var i=0,l=r.length;i<l;i++){var y=r[i];
x+=y.getMarginTop()+y.getMarginBottom();
}x+=(s+u+s)*(l-1);
return x;
},arrangeIdeals:function(H,I,J,K,L,M){if(I<H||L<K){if(I<H&&L<K){I=H;
L=K;
}else if(I<H){L-=(H-I);
I=H;
if(L<K){L=K;
}}else if(L<K){I-=(K-L);
L=K;
if(I<H){I=H;
}}}
if(I>J||L>M){if(I>J&&L>M){I=J;
L=M;
}else if(I>J){L+=(I-J);
I=J;
if(L>M){L=M;
}}else if(L>M){I+=(L-M);
L=M;
if(I>J){I=J;
}}}return {begin:I,end:L};
}}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IStringForm";
qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var l="qx.dynlocale",k="text",j="Boolean",i="qx.client",h="color",g="userSelect",f="changeLocale",d="enabled",c="none",b="on",J="_applyTextAlign",I="qx.ui.core.Widget",H="nowrap",G="gecko",F="changeTextAlign",E="_applyWrap",D="changeValue",C="changeContent",B="qx.ui.basic.Label",A="A",s="whiteSpace",t="_applyValue",q="center",r="_applyBuddy",o="String",p="textAlign",m="right",n="changeRich",u="normal",v="_applyRich",x="click",w="label",z="webkit",y="left";
qx.Class.define(B,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(bf){qx.ui.core.Widget.call(this);

if(bf!=null){this.setValue(bf);
}
if(qx.core.Variant.isSet(l,b)){qx.locale.Manager.getInstance().addListener(f,this._onChangeLocale,this);
}},properties:{rich:{check:j,init:false,event:n,apply:v},wrap:{check:j,init:true,apply:E},value:{check:o,apply:t,event:D,nullable:true},buddy:{check:I,apply:r,nullable:true,init:null,dereference:true},textAlign:{check:[y,q,m],nullable:true,themeable:true,apply:J,event:F},appearance:{refine:true,init:w},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__font:null,__invalidContentSize:null,__buddyEnabledBinding:null,__clickListenerId:null,_getContentHint:function(){if(this.__invalidContentSize){this.__contentSize=this.__computeContentSize();
delete this.__invalidContentSize;
}return {width:this.__contentSize.width,height:this.__contentSize.height};
},_hasHeightForWidth:function(){return this.getRich()&&this.getWrap();
},_applySelectable:function(N){if(qx.core.Variant.isSet(i,G)){if(N&&!this.isRich()){{};
return;
}}qx.ui.core.Widget.prototype._applySelectable.call(this,N);
if(qx.core.Variant.isSet(i,z)){this.getContainerElement().setStyle(g,N?k:c);
this.getContentElement().setStyle(g,N?k:c);
}},_getContentHeightForWidth:function(V){if(!this.getRich()&&!this.getWrap()){return null;
}return this.__computeContentSize(V).height;
},_createContentElement:function(){return new qx.html.Label;
},_applyTextAlign:function(O,P){this.getContentElement().setStyle(p,O);
},_applyTextColor:function(K,L){if(K){this.getContentElement().setStyle(h,qx.theme.manager.Color.getInstance().resolve(K));
}else{this.getContentElement().removeStyle(h);
}},__contentSize:{width:0,height:0},_applyFont:function(bc,bd){var be;

if(bc){this.__font=qx.theme.manager.Font.getInstance().resolve(bc);
be=this.__font.getStyles();
}else{this.__font=null;
be=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(be);
this.__invalidContentSize=true;
qx.ui.core.queue.Layout.add(this);
},__computeContentSize:function(W){var bb=qx.bom.Label;
var Y=this.getFont();
var X=Y?this.__font.getStyles():qx.bom.Font.getDefaultStyles();
var content=this.getValue()||A;
var ba=this.getRich();
return ba?bb.getHtmlSize(content,X,W):bb.getTextSize(content,X);
},_applyBuddy:function(Q,R){if(R!=null){R.removeBinding(this.__buddyEnabledBinding);
this.__buddyEnabledBinding=null;
this.removeListenerById(this.__clickListenerId);
this.__clickListenerId=null;
}
if(Q!=null){this.__buddyEnabledBinding=Q.bind(d,this,d);
this.__clickListenerId=this.addListener(x,function(){if(Q.isFocusable()){Q.focus.apply(Q);
}},this);
}},_applyRich:function(M){this.getContentElement().setRich(M);
this.__invalidContentSize=true;
qx.ui.core.queue.Layout.add(this);
},_applyWrap:function(S,T){if(S&&!this.isRich()){{};
}
if(this.isRich()){var U=S?u:H;
this.getContentElement().setStyle(s,U);
}},_onChangeLocale:qx.core.Variant.select(l,{"on":function(e){var content=this.getValue();

if(content&&content.translate){this.setValue(content.translate());
}},"off":null}),_applyValue:function(bg,bh){this.getContentElement().setValue(bg);
this.__invalidContentSize=true;
qx.ui.core.queue.Layout.add(this);
this.fireDataEvent(C,bg,bh);
}},destruct:function(){if(qx.core.Variant.isSet(l,b)){qx.locale.Manager.getInstance().removeListener(f,this._onChangeLocale,this);
}if(this.__buddyEnabledBinding!=null){var a=this.getBuddy();

if(a!=null&&!a.isDisposed()){a.removeBinding(this.__buddyEnabledBinding);
}}this.__font=this.__buddyEnabledBinding=null;
}});
})();
(function(){var b="value",a="qx.html.Label";
qx.Class.define(a,{extend:qx.html.Element,members:{__rich:null,_applyProperty:function(name,c){qx.html.Element.prototype._applyProperty.call(this,name,c);

if(name==b){var d=this.getDomElement();
qx.bom.Label.setValue(d,c);
}},_createDomElement:function(){var f=this.__rich;
var e=qx.bom.Label.create(this._content,f);
return e;
},_copyData:function(g){return qx.html.Element.prototype._copyData.call(this,true);
},setRich:function(i){var j=this.getDomElement();

if(j){throw new Error("The label mode cannot be modified after initial creation");
}i=!!i;

if(this.__rich==i){return;
}this.__rich=i;
return this;
},setValue:function(h){this._setProperty(b,h);
return this;
},getValue:function(){return this._getProperty(b);
}}});
})();
(function(){var j="qx.client",i="gecko",h="div",g="inherit",f="text",e="value",d="",c="hidden",b="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",a="nowrap",z="auto",y="0",x="ellipsis",w="normal",v="label",u="px",t="crop",s="end",r="100%",q="visible",o="qx.bom.Label",p="opera",m="block",n="none",k="-1000px",l="absolute";
qx.Class.define(o,{statics:{__styles:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__prepareText:function(){var J=this.__createMeasureElement(false);
document.body.insertBefore(J,document.body.firstChild);
return this._textElement=J;
},__prepareHtml:function(){var ba=this.__createMeasureElement(true);
document.body.insertBefore(ba,document.body.firstChild);
return this._htmlElement=ba;
},__createMeasureElement:function(U){var V=qx.bom.Element.create(h);
var W=V.style;
W.width=W.height=z;
W.left=W.top=k;
W.visibility=c;
W.position=l;
W.overflow=q;

if(U){W.whiteSpace=w;
}else{W.whiteSpace=a;

if(qx.core.Variant.isSet(j,i)){var X=document.createElementNS(b,v);
var W=X.style;
W.padding=y;

for(var Y in this.__styles){W[Y]=g;
}V.appendChild(X);
}}return V;
},__getStyles:function(S){var T={};

if(S){T.whiteSpace=w;
}else if(qx.core.Variant.isSet(j,i)){T.display=m;
}else{T.overflow=c;
T.whiteSpace=a;
T.textOverflow=x;
T.userSelect=n;
if(qx.core.Variant.isSet(j,p)){T.OTextOverflow=x;
}}return T;
},create:function(content,M,N){if(!N){N=window;
}
if(M){var O=N.document.createElement(h);
O.useHtml=true;
}else if(qx.core.Variant.isSet(j,i)){var O=N.document.createElement(h);
var Q=N.document.createElementNS(b,v);
var P=Q.style;
P.cursor=g;
P.color=g;
P.overflow=c;
P.maxWidth=r;
P.padding=y;
for(var R in this.__styles){Q.style[R]=g;
}Q.setAttribute(t,s);
O.appendChild(Q);
}else{var O=N.document.createElement(h);
qx.bom.element.Style.setStyles(O,this.__getStyles(M));
}
if(content){this.setValue(O,content);
}return O;
},setValue:function(K,L){L=L||d;

if(K.useHtml){K.innerHTML=L;
}else if(qx.core.Variant.isSet(j,i)){K.firstChild.setAttribute(e,L);
}else{qx.bom.element.Attribute.set(K,f,L);
}},getValue:function(D){if(D.useHtml){return D.innerHTML;
}else if(qx.core.Variant.isSet(j,i)){return D.firstChild.getAttribute(e)||d;
}else{return qx.bom.element.Attribute.get(D,f);
}},getHtmlSize:function(content,bb,bc){var bd=this._htmlElement||this.__prepareHtml();
bd.style.width=bc!==undefined?bc+u:z;
bd.innerHTML=content;
return this.__measureSize(bd,bb);
},getTextSize:function(A,B){var C=this._textElement||this.__prepareText();

if(qx.core.Variant.isSet(j,i)){C.firstChild.setAttribute(e,A);
}else{qx.bom.element.Attribute.set(C,f,A);
}return this.__measureSize(C,B);
},__measureSize:function(E,F){var G=this.__styles;

if(!F){F={};
}
for(var H in G){E.style[H]=F[H]||d;
}var I=qx.bom.element.Dimension.getSize(E);

if(qx.core.Variant.isSet(j,i)){if(!qx.bom.client.Platform.WIN){I.width++;
}}return I;
}}});
})();
(function(){var h="0px",g="mshtml",f="qx.client",e="qx.bom.element.Dimension",d="paddingRight",c="paddingLeft",b="paddingTop",a="paddingBottom";
qx.Class.define(e,{statics:{getWidth:qx.core.Variant.select(f,{"gecko":function(q){if(q.getBoundingClientRect){var r=q.getBoundingClientRect();
return Math.round(r.right)-Math.round(r.left);
}else{return q.offsetWidth;
}},"default":function(i){return i.offsetWidth;
}}),getHeight:qx.core.Variant.select(f,{"gecko":function(u){if(u.getBoundingClientRect){var v=u.getBoundingClientRect();
return Math.round(v.bottom)-Math.round(v.top);
}else{return u.offsetHeight;
}},"default":function(w){return w.offsetHeight;
}}),getSize:function(t){return {width:this.getWidth(t),height:this.getHeight(t)};
},__hiddenScrollbars:{visible:true,hidden:true},getContentWidth:function(x){var z=qx.bom.element.Style;
var A=qx.bom.element.Overflow.getX(x);
var B=parseInt(z.get(x,c)||h,10);
var D=parseInt(z.get(x,d)||h,10);

if(this.__hiddenScrollbars[A]){return x.clientWidth-B-D;
}else{if(x.clientWidth>=x.scrollWidth){return Math.max(x.clientWidth,x.scrollWidth)-B-D;
}else{var C=x.scrollWidth-B;
var y=qx.bom.client.Engine;

if(y.NAME===g&&y.VERSION==6){C-=D;
}return C;
}}},getContentHeight:function(j){var l=qx.bom.element.Style;
var n=qx.bom.element.Overflow.getY(j);
var o=parseInt(l.get(j,b)||h,10);
var m=parseInt(l.get(j,a)||h,10);

if(this.__hiddenScrollbars[n]){return j.clientHeight-o-m;
}else{if(j.clientHeight>=j.scrollHeight){return Math.max(j.clientHeight,j.scrollHeight)-o-m;
}else{var p=j.scrollHeight-o;
var k=qx.bom.client.Engine;

if(k.NAME===g&&k.VERSION==6){p-=m;
}return p;
}}},getContentSize:function(s){return {width:this.getContentWidth(s),height:this.getContentHeight(s)};
}}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IForm";
qx.Interface.define(a,{events:{"changeEnabled":b,"changeValid":b,"changeInvalidMessage":b,"changeRequired":b},members:{setEnabled:function(e){return arguments.length==1;
},getEnabled:function(){},setRequired:function(g){return arguments.length==1;
},getRequired:function(){},setValid:function(d){return arguments.length==1;
},getValid:function(){},setInvalidMessage:function(f){return arguments.length==1;
},getInvalidMessage:function(){},setRequiredInvalidMessage:function(c){return arguments.length==1;
},getRequiredInvalidMessage:function(){}}});
})();
(function(){var g="_applyBlockerColor",f="Number",e="__blocker",d="qx.ui.core.MBlocker",c="_applyBlockerOpacity",b="Color";
qx.Mixin.define(d,{construct:function(){this.__blocker=new qx.ui.core.Blocker(this);
},properties:{blockerColor:{check:b,init:null,nullable:true,apply:g,themeable:true},blockerOpacity:{check:f,init:1,apply:c,themeable:true}},members:{__blocker:null,_applyBlockerColor:function(j,k){this.__blocker.setColor(j);
},_applyBlockerOpacity:function(h,i){this.__blocker.setOpacity(h);
},block:function(){this.__blocker.block();
},isBlocked:function(){return this.__blocker.isBlocked();
},unblock:function(){this.__blocker.unblock();
},forceUnblock:function(){this.__blocker.forceUnblock();
},blockContent:function(a){this.__blocker.blockContent(a);
},isContentBlocked:function(){return this.__blocker.isContentBlocked();
},unblockContent:function(){this.__blocker.unblockContent();
},forceUnblockContent:function(){this.__blocker.forceUnblockContent();
},getBlocker:function(){return this.__blocker;
}},destruct:function(){this._disposeObjects(e);
}});
})();
(function(){var i="qx.ui.window.Window",h="changeModal",g="changeVisibility",f="changeActive",d="_applyActiveWindow",c="__windows",b="qx.ui.window.MDesktop",a="__manager";
qx.Mixin.define(b,{properties:{activeWindow:{check:i,apply:d,init:null,nullable:true}},members:{__windows:null,__manager:null,getWindowManager:function(){if(!this.__manager){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());
}return this.__manager;
},supportsMaximize:function(){return true;
},setWindowManager:function(k){if(this.__manager){this.__manager.setDesktop(null);
}k.setDesktop(this);
this.__manager=k;
},_onChangeActive:function(e){if(e.getData()){this.setActiveWindow(e.getTarget());
}else if(this.getActiveWindow()==e.getTarget()){this.setActiveWindow(null);
}},_applyActiveWindow:function(l,m){this.getWindowManager().changeActiveWindow(l,m);
},_onChangeModal:function(e){this.getWindowManager().updateStack();
},_onChangeVisibility:function(){this.getWindowManager().updateStack();
},_afterAddChild:function(o){if(qx.Class.isDefined(i)&&o instanceof qx.ui.window.Window){this._addWindow(o);
}},_addWindow:function(j){if(!qx.lang.Array.contains(this.getWindows(),j)){this.getWindows().push(j);
j.addListener(f,this._onChangeActive,this);
j.addListener(h,this._onChangeModal,this);
j.addListener(g,this._onChangeVisibility,this);
}
if(j.getActive()){this.setActiveWindow(j);
}this.getWindowManager().updateStack();
},_afterRemoveChild:function(n){if(qx.Class.isDefined(i)&&n instanceof qx.ui.window.Window){this._removeWindow(n);
}},_removeWindow:function(p){qx.lang.Array.remove(this.getWindows(),p);
p.removeListener(f,this._onChangeActive,this);
p.removeListener(h,this._onChangeModal,this);
p.removeListener(g,this._onChangeVisibility,this);
this.getWindowManager().updateStack();
},getWindows:function(){if(!this.__windows){this.__windows=[];
}return this.__windows;
}},destruct:function(){this._disposeArray(c);
this._disposeObjects(a);
}});
})();
(function(){var p="contextmenu",o="help",n="qx.client",m="changeGlobalCursor",l="abstract",k="Boolean",j="root",i="",h=" !important",g="_applyGlobalCursor",c="_applyNativeHelp",f=";",d="qx.ui.root.Abstract",b="String",a="*";
qx.Class.define(d,{type:l,extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){qx.ui.core.Widget.call(this);
qx.ui.core.FocusHandler.getInstance().addRoot(this);
qx.ui.core.queue.Visibility.add(this);
this.initNativeHelp();
},properties:{appearance:{refine:true,init:j},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:b,nullable:true,themeable:true,apply:g,event:m},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:k,init:false,apply:c}},members:{__globalCursorStyleSheet:null,isRootWidget:function(){return true;
},getLayout:function(){return this._getLayout();
},_applyGlobalCursor:qx.core.Variant.select(n,{"mshtml":function(A,B){},"default":function(u,v){var w=qx.bom.Stylesheet;
var x=this.__globalCursorStyleSheet;

if(!x){this.__globalCursorStyleSheet=x=w.createElement();
}w.removeAllRules(x);

if(u){w.addRule(x,a,qx.bom.element.Cursor.compile(u).replace(f,i)+h);
}}}),_applyNativeContextMenu:function(y,z){if(y){this.removeListener(p,this._onNativeContextMenu,this,true);
}else{this.addListener(p,this._onNativeContextMenu,this,true);
}},_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;
}e.preventDefault();
},_applyNativeHelp:qx.core.Variant.select(n,{"mshtml":function(s,t){if(t===false){qx.bom.Event.removeNativeListener(document,o,qx.lang.Function.returnFalse);
}
if(s===false){qx.bom.Event.addNativeListener(document,o,qx.lang.Function.returnFalse);
}},"default":function(){}})},destruct:function(){this.__globalCursorStyleSheet=null;
},defer:function(q,r){qx.ui.core.MChildrenHandling.remap(r);
}});
})();
(function(){var n="resize",m="position",l="0px",k="webkit",j="paddingLeft",i="$$widget",h="qx.ui.root.Application",g="hidden",f="qx.client",d="div",a="paddingTop",c="100%",b="absolute";
qx.Class.define(h,{extend:qx.ui.root.Abstract,construct:function(o){this.__window=qx.dom.Node.getWindow(o);
this.__doc=o;
qx.ui.root.Abstract.call(this);
qx.event.Registration.addListener(this.__window,n,this._onResize,this);
this._setLayout(new qx.ui.layout.Canvas());
qx.ui.core.queue.Layout.add(this);
qx.ui.core.FocusHandler.getInstance().connectTo(this);
this.getContentElement().disableScrolling();
},members:{__window:null,__doc:null,_createContainerElement:function(){var w=this.__doc;
if(qx.core.Variant.isSet(f,k)){if(!w.body){alert("The application could not be started due to a missing body tag in the HTML file!");
}}var A=w.documentElement.style;
var x=w.body.style;
A.overflow=x.overflow=g;
A.padding=A.margin=x.padding=x.margin=l;
A.width=A.height=x.width=x.height=c;
var z=w.createElement(d);
w.body.appendChild(z);
var y=new qx.html.Root(z);
y.setStyle(m,b);
y.setAttribute(i,this.toHashCode());
return y;
},_onResize:function(e){qx.ui.core.queue.Layout.add(this);
},_computeSizeHint:function(){var r=qx.bom.Viewport.getWidth(this.__window);
var s=qx.bom.Viewport.getHeight(this.__window);
return {minWidth:r,width:r,maxWidth:r,minHeight:s,height:s,maxHeight:s};
},_applyPadding:function(p,q,name){if(p&&(name==a||name==j)){throw new Error("The root widget does not support 'left', or 'top' paddings!");
}qx.ui.root.Abstract.prototype._applyPadding.call(this,p,q,name);
},_applyDecorator:function(t,u){qx.ui.root.Abstract.prototype._applyDecorator.call(this,t,u);

if(!t){return;
}var v=this.getDecoratorElement().getInsets();

if(v.left||v.top){throw new Error("The root widget does not support decorators with 'left', or 'top' insets!");
}}},destruct:function(){this.__window=this.__doc=null;
}});
})();
(function(){var H="zIndex",G="px",F="keydown",E="deactivate",D="resize",C="keyup",B="keypress",A="backgroundColor",z="_applyOpacity",y="Boolean",T="__timer",S="__contentBlocker",R="__blocker",Q="opacity",P="interval",O="Tab",N="Color",M="qx.ui.root.Page",L="Number",K="qx.ui.core.Blocker",I="qx.ui.root.Application",J="_applyColor";
qx.Class.define(K,{extend:qx.core.Object,construct:function(o){qx.core.Object.call(this);
this._widget=o;
this._isPageRoot=(qx.Class.isDefined(M)&&o instanceof qx.ui.root.Page);

if(this._isPageRoot){o.addListener(D,this.__onResize,this);
}
if(qx.Class.isDefined(I)&&o instanceof qx.ui.root.Application){this.setKeepBlockerActive(true);
}this.__activeElements=[];
this.__focusElements=[];
this.__contentBlockerCount=[];
},properties:{color:{check:N,init:null,nullable:true,apply:J,themeable:true},opacity:{check:L,init:1,apply:z,themeable:true},keepBlockerActive:{check:y,init:false}},members:{__blocker:null,__blockerCount:0,__contentBlocker:null,__contentBlockerCount:null,__activeElements:null,__focusElements:null,__oldAnonymous:null,__timer:null,_isPageRoot:false,_widget:null,__onResize:function(e){var U=e.getData();

if(this.isContentBlocked()){this.getContentBlockerElement().setStyles({width:U.width,height:U.height});
}
if(this.isBlocked()){this.getBlockerElement().setStyles({width:U.width,height:U.height});
}},_applyColor:function(a,b){var c=qx.theme.manager.Color.getInstance().resolve(a);
this.__setBlockersStyle(A,c);
},_applyOpacity:function(m,n){this.__setBlockersStyle(Q,m);
},__setBlockersStyle:function(d,f){var g=[];
this.__blocker&&g.push(this.__blocker);
this.__contentBlocker&&g.push(this.__contentBlocker);

for(var i=0;i<g.length;i++){g[i].setStyle(d,f);
}},_backupActiveWidget:function(){var v=qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);
this.__activeElements.push(v.getActive());
this.__focusElements.push(v.getFocus());

if(this._widget.isFocusable()){this._widget.focus();
}},_restoreActiveWidget:function(){var r=this.__activeElements.length;

if(r>0){var q=this.__activeElements[r-1];

if(q){qx.bom.Element.activate(q);
}this.__activeElements.pop();
}var p=this.__focusElements.length;

if(p>0){var q=this.__focusElements[p-1];

if(q){qx.bom.Element.focus(this.__focusElements[p-1]);
}this.__focusElements.pop();
}},__createBlockerElement:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());
},getBlockerElement:function(){if(!this.__blocker){this.__blocker=this.__createBlockerElement();
this.__blocker.setStyle(H,15);
this._widget.getContainerElement().add(this.__blocker);
this.__blocker.exclude();
}return this.__blocker;
},block:function(){this.__blockerCount++;

if(this.__blockerCount<2){this._backupActiveWidget();
var u=this.getBlockerElement();
u.include();
u.activate();
u.addListener(E,this.__activateBlockerElement,this);
u.addListener(B,this.__stopTabEvent,this);
u.addListener(F,this.__stopTabEvent,this);
u.addListener(C,this.__stopTabEvent,this);
}},isBlocked:function(){return this.__blockerCount>0;
},unblock:function(){if(!this.isBlocked()){return;
}this.__blockerCount--;

if(this.__blockerCount<1){this.__unblock();
this.__blockerCount=0;
}},forceUnblock:function(){if(!this.isBlocked()){return;
}this.__blockerCount=0;
this.__unblock();
},__unblock:function(){this._restoreActiveWidget();
var t=this.getBlockerElement();
t.removeListener(E,this.__activateBlockerElement,this);
t.removeListener(B,this.__stopTabEvent,this);
t.removeListener(F,this.__stopTabEvent,this);
t.removeListener(C,this.__stopTabEvent,this);
t.exclude();
},getContentBlockerElement:function(){if(!this.__contentBlocker){this.__contentBlocker=this.__createBlockerElement();
this._widget.getContentElement().add(this.__contentBlocker);
this.__contentBlocker.exclude();
}return this.__contentBlocker;
},blockContent:function(k){var l=this.getContentBlockerElement();
l.setStyle(H,k);
this.__contentBlockerCount.push(k);

if(this.__contentBlockerCount.length<2){l.include();

if(this._isPageRoot){if(!this.__timer){this.__timer=new qx.event.Timer(300);
this.__timer.addListener(P,this.__syncBlocker,this);
}this.__timer.start();
this.__syncBlocker();
}}},isContentBlocked:function(){return this.__contentBlockerCount.length>0;
},unblockContent:function(){if(!this.isContentBlocked()){return;
}this.__contentBlockerCount.pop();
var w=this.__contentBlockerCount[this.__contentBlockerCount.length-1];
var x=this.getContentBlockerElement();
x.setStyle(H,w);

if(this.__contentBlockerCount.length<1){this.__unblockContent();
this.__contentBlockerCount=[];
}},forceUnblockContent:function(){if(!this.isContentBlocked()){return;
}this.__contentBlockerCount=[];
var s=this.getContentBlockerElement();
s.setStyle(H,null);
this.__unblockContent();
},__unblockContent:function(){this.getContentBlockerElement().exclude();

if(this._isPageRoot){this.__timer.stop();
}},__syncBlocker:function(){var h=this._widget.getContainerElement().getDomElement();
var j=qx.dom.Node.getDocument(h);
this.getContentBlockerElement().setStyles({height:j.documentElement.scrollHeight+G,width:j.documentElement.scrollWidth+G});
},__stopTabEvent:function(e){if(e.getKeyIdentifier()==O){e.stop();
}},__activateBlockerElement:function(){if(this.getKeepBlockerActive()){this.getBlockerElement().activate();
}}},destruct:function(){if(this._isPageRoot){this._widget.removeListener(D,this.__onResize,this);
}this._disposeObjects(S,R,T);
this.__oldAnonymous=this.__activeElements=this.__focusElements=this._widget=this.__contentBlockerCount=null;
}});
})();
(function(){var k="cursor",j="100%",i="repeat",h="mousedown",g="url(",f=")",d="mouseout",c="qx.client",b="div",a="dblclick",w="mousewheel",v="qx.html.Blocker",u="mousemove",t="mouseover",s="appear",r="click",q="mshtml",p="mouseup",o="contextmenu",n="disappear",l="qx/static/blank.gif",m="absolute";
qx.Class.define(v,{extend:qx.html.Element,construct:function(x,y){var x=x?qx.theme.manager.Color.getInstance().resolve(x):null;
var z={position:m,width:j,height:j,opacity:y||0,backgroundColor:x};
if(qx.core.Variant.isSet(c,q)){z.backgroundImage=g+qx.util.ResourceManager.getInstance().toUri(l)+f;
z.backgroundRepeat=i;
}qx.html.Element.call(this,b,z);
this.addListener(h,this._stopPropagation,this);
this.addListener(p,this._stopPropagation,this);
this.addListener(r,this._stopPropagation,this);
this.addListener(a,this._stopPropagation,this);
this.addListener(u,this._stopPropagation,this);
this.addListener(t,this._stopPropagation,this);
this.addListener(d,this._stopPropagation,this);
this.addListener(w,this._stopPropagation,this);
this.addListener(o,this._stopPropagation,this);
this.addListener(s,this.__refreshCursor,this);
this.addListener(n,this.__refreshCursor,this);
},members:{_stopPropagation:function(e){e.stopPropagation();
},__refreshCursor:function(){var A=this.getStyle(k);
this.setStyle(k,null,true);
this.setStyle(k,A,true);
}}});
})();
(function(){var bg="keypress",bf="__roots",be="focusout",bd="activate",bc="Tab",bb="singleton",ba="deactivate",Y="focusin",X="qx.ui.core.FocusHandler";
qx.Class.define(X,{extend:qx.core.Object,type:bb,construct:function(){qx.core.Object.call(this);
this.__roots={};
},members:{__roots:null,__activeChild:null,__focusedChild:null,__currentRoot:null,connectTo:function(p){p.addListener(bg,this.__onKeyPress,this);
p.addListener(Y,this._onFocusIn,this,true);
p.addListener(be,this._onFocusOut,this,true);
p.addListener(bd,this._onActivate,this,true);
p.addListener(ba,this._onDeactivate,this,true);
},addRoot:function(bh){this.__roots[bh.$$hash]=bh;
},removeRoot:function(G){delete this.__roots[G.$$hash];
},getActiveWidget:function(){return this.__activeChild;
},isActive:function(W){return this.__activeChild==W;
},getFocusedWidget:function(){return this.__focusedChild;
},isFocused:function(g){return this.__focusedChild==g;
},isFocusRoot:function(H){return !!this.__roots[H.$$hash];
},_onActivate:function(e){var R=e.getTarget();
this.__activeChild=R;
var Q=this.__findFocusRoot(R);

if(Q!=this.__currentRoot){this.__currentRoot=Q;
}},_onDeactivate:function(e){var o=e.getTarget();

if(this.__activeChild==o){this.__activeChild=null;
}},_onFocusIn:function(e){var f=e.getTarget();

if(f!=this.__focusedChild){this.__focusedChild=f;
f.visualizeFocus();
}},_onFocusOut:function(e){var bi=e.getTarget();

if(bi==this.__focusedChild){this.__focusedChild=null;
bi.visualizeBlur();
}},__onKeyPress:function(e){if(e.getKeyIdentifier()!=bc){return;
}
if(!this.__currentRoot){return;
}e.stopPropagation();
e.preventDefault();
var h=this.__focusedChild;

if(!e.isShiftPressed()){var j=h?this.__getWidgetAfter(h):this.__getFirstWidget();
}else{var j=h?this.__getWidgetBefore(h):this.__getLastWidget();
}if(j){j.tabFocus();
}},__findFocusRoot:function(E){var F=this.__roots;

while(E){if(F[E.$$hash]){return E;
}E=E.getLayoutParent();
}return null;
},__compareTabOrder:function(q,r){if(q===r){return 0;
}var t=q.getTabIndex()||0;
var s=r.getTabIndex()||0;

if(t!=s){return t-s;
}var y=q.getContainerElement().getDomElement();
var x=r.getContainerElement().getDomElement();
var w=qx.bom.element.Location;
var v=w.get(y);
var u=w.get(x);
if(v.top!=u.top){return v.top-u.top;
}if(v.left!=u.left){return v.left-u.left;
}var z=q.getZIndex();
var A=r.getZIndex();

if(z!=A){return z-A;
}return 0;
},__getFirstWidget:function(){return this.__getFirst(this.__currentRoot,null);
},__getLastWidget:function(){return this.__getLast(this.__currentRoot,null);
},__getWidgetAfter:function(M){var N=this.__currentRoot;

if(N==M){return this.__getFirstWidget();
}
while(M&&M.getAnonymous()){M=M.getLayoutParent();
}
if(M==null){return [];
}var O=[];
this.__collectAllAfter(N,M,O);
O.sort(this.__compareTabOrder);
var P=O.length;
return P>0?O[0]:this.__getFirstWidget();
},__getWidgetBefore:function(a){var b=this.__currentRoot;

if(b==a){return this.__getLastWidget();
}
while(a&&a.getAnonymous()){a=a.getLayoutParent();
}
if(a==null){return [];
}var c=[];
this.__collectAllBefore(b,a,c);
c.sort(this.__compareTabOrder);
var d=c.length;
return d>0?c[d-1]:this.__getLastWidget();
},__collectAllAfter:function(parent,I,J){var K=parent.getLayoutChildren();
var L;

for(var i=0,l=K.length;i<l;i++){L=K[i];
if(!(L instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(L)&&L.isEnabled()&&L.isVisible()){if(L.isTabable()&&this.__compareTabOrder(I,L)<0){J.push(L);
}this.__collectAllAfter(L,I,J);
}}},__collectAllBefore:function(parent,S,T){var U=parent.getLayoutChildren();
var V;

for(var i=0,l=U.length;i<l;i++){V=U[i];
if(!(V instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(V)&&V.isEnabled()&&V.isVisible()){if(V.isTabable()&&this.__compareTabOrder(S,V)>0){T.push(V);
}this.__collectAllBefore(V,S,T);
}}},__getFirst:function(parent,k){var m=parent.getLayoutChildren();
var n;

for(var i=0,l=m.length;i<l;i++){n=m[i];
if(!(n instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(n)&&n.isEnabled()&&n.isVisible()){if(n.isTabable()){if(k==null||this.__compareTabOrder(n,k)<0){k=n;
}}k=this.__getFirst(n,k);
}}return k;
},__getLast:function(parent,B){var C=parent.getLayoutChildren();
var D;

for(var i=0,l=C.length;i<l;i++){D=C[i];
if(!(D instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(D)&&D.isEnabled()&&D.isVisible()){if(D.isTabable()){if(B==null||this.__compareTabOrder(D,B)>0){B=D;
}}B=this.__getLast(D,B);
}}return B;
}},destruct:function(){this._disposeMap(bf);
this.__focusedChild=this.__activeChild=this.__currentRoot=null;
}});
})();
(function(){var n="qx.client",m="head",l="text/css",k="stylesheet",j="}",h='@import "',g="{",f='";',e="qx.bom.Stylesheet",d="link",c="style";
qx.Class.define(e,{statics:{includeFile:function(z,A){if(!A){A=document;
}var B=A.createElement(d);
B.type=l;
B.rel=k;
B.href=qx.util.ResourceManager.getInstance().toUri(z);
var C=A.getElementsByTagName(m)[0];
C.appendChild(B);
},createElement:qx.core.Variant.select(n,{"mshtml":function(bf){var bg=document.createStyleSheet();

if(bf){bg.cssText=bf;
}return bg;
},"default":function(P){var Q=document.createElement(c);
Q.type=l;

if(P){Q.appendChild(document.createTextNode(P));
}document.getElementsByTagName(m)[0].appendChild(Q);
return Q.sheet;
}}),addRule:qx.core.Variant.select(n,{"mshtml":function(bc,bd,be){bc.addRule(bd,be);
},"default":function(o,p,q){o.insertRule(p+g+q+j,o.cssRules.length);
}}),removeRule:qx.core.Variant.select(n,{"mshtml":function(L,M){var N=L.rules;
var O=N.length;

for(var i=O-1;i>=0;--i){if(N[i].selectorText==M){L.removeRule(i);
}}},"default":function(D,E){var F=D.cssRules;
var G=F.length;

for(var i=G-1;i>=0;--i){if(F[i].selectorText==E){D.deleteRule(i);
}}}}),removeAllRules:qx.core.Variant.select(n,{"mshtml":function(r){var s=r.rules;
var t=s.length;

for(var i=t-1;i>=0;i--){r.removeRule(i);
}},"default":function(u){var v=u.cssRules;
var w=v.length;

for(var i=w-1;i>=0;i--){u.deleteRule(i);
}}}),addImport:qx.core.Variant.select(n,{"mshtml":function(x,y){x.addImport(y);
},"default":function(a,b){a.insertRule(h+b+f,a.cssRules.length);
}}),removeImport:qx.core.Variant.select(n,{"mshtml":function(U,V){var W=U.imports;
var X=W.length;

for(var i=X-1;i>=0;i--){if(W[i].href==V){U.removeImport(i);
}}},"default":function(H,I){var J=H.cssRules;
var K=J.length;

for(var i=K-1;i>=0;i--){if(J[i].href==I){H.deleteRule(i);
}}}}),removeAllImports:qx.core.Variant.select(n,{"mshtml":function(R){var S=R.imports;
var T=S.length;

for(var i=T-1;i>=0;i--){R.removeImport(i);
}},"default":function(Y){var ba=Y.cssRules;
var bb=ba.length;

for(var i=bb-1;i>=0;i--){if(ba[i].type==ba[i].IMPORT_RULE){Y.deleteRule(i);
}}}})}});
})();
(function(){var b="number",a="qx.ui.layout.Canvas";
qx.Class.define(a,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(v,w){var H=this._getLayoutChildren();
var z,G,E;
var J,top,x,y,B,A;
var F,D,I,C;

for(var i=0,l=H.length;i<l;i++){z=H[i];
G=z.getSizeHint();
E=z.getLayoutProperties();
F=z.getMarginTop();
D=z.getMarginRight();
I=z.getMarginBottom();
C=z.getMarginLeft();
J=E.left!=null?E.left:E.edge;

if(qx.lang.Type.isString(J)){J=Math.round(parseFloat(J)*v/100);
}x=E.right!=null?E.right:E.edge;

if(qx.lang.Type.isString(x)){x=Math.round(parseFloat(x)*v/100);
}top=E.top!=null?E.top:E.edge;

if(qx.lang.Type.isString(top)){top=Math.round(parseFloat(top)*w/100);
}y=E.bottom!=null?E.bottom:E.edge;

if(qx.lang.Type.isString(y)){y=Math.round(parseFloat(y)*w/100);
}if(J!=null&&x!=null){B=v-J-x-C-D;
if(B<G.minWidth){B=G.minWidth;
}else if(B>G.maxWidth){B=G.maxWidth;
}J+=C;
}else{B=E.width;

if(B==null){B=G.width;
}else{B=Math.round(parseFloat(B)*v/100);
if(B<G.minWidth){B=G.minWidth;
}else if(B>G.maxWidth){B=G.maxWidth;
}}
if(x!=null){J=v-B-x-D-C;
}else if(J==null){J=C;
}else{J+=C;
}}if(top!=null&&y!=null){A=w-top-y-F-I;
if(A<G.minHeight){A=G.minHeight;
}else if(A>G.maxHeight){A=G.maxHeight;
}top+=F;
}else{A=E.height;

if(A==null){A=G.height;
}else{A=Math.round(parseFloat(A)*w/100);
if(A<G.minHeight){A=G.minHeight;
}else if(A>G.maxHeight){A=G.maxHeight;
}}
if(y!=null){top=w-A-y-I-F;
}else if(top==null){top=F;
}else{top+=F;
}}z.renderLayout(J,top,B,A);
}},_computeSizeHint:function(){var t=0,s=0;
var q=0,o=0;
var m,k;
var j,g;
var c=this._getLayoutChildren();
var f,r,e;
var u,top,d,h;

for(var i=0,l=c.length;i<l;i++){f=c[i];
r=f.getLayoutProperties();
e=f.getSizeHint();
var p=f.getMarginLeft()+f.getMarginRight();
var n=f.getMarginTop()+f.getMarginBottom();
m=e.width+p;
k=e.minWidth+p;
u=r.left!=null?r.left:r.edge;

if(u&&typeof u===b){m+=u;
k+=u;
}d=r.right!=null?r.right:r.edge;

if(d&&typeof d===b){m+=d;
k+=d;
}t=Math.max(t,m);
s=Math.max(s,k);
j=e.height+n;
g=e.minHeight+n;
top=r.top!=null?r.top:r.edge;

if(top&&typeof top===b){j+=top;
g+=top;
}h=r.bottom!=null?r.bottom:r.edge;

if(h&&typeof h===b){j+=h;
g+=h;
}q=Math.max(q,j);
o=Math.max(o,g);
}return {width:t,minWidth:s,height:q,minHeight:o};
}}});
})();
(function(){var a="qx.html.Root";
qx.Class.define(a,{extend:qx.html.Element,construct:function(c){qx.html.Element.call(this);

if(c!=null){this.useElement(c);
}},members:{useElement:function(b){qx.html.Element.prototype.useElement.call(this,b);
this.setRoot(true);
qx.html.Element._modified[this.$$hash]=this;
}}});
})();
(function(){var a="qx.data.marshal.IMarshaler";
qx.Interface.define(a,{members:{toClass:function(b,c){},toModel:function(d){}}});
})();
(function(){var h="qx.data.model.",g="",f="_validate",e='"',d="change",c="qx.data.marshal.Json",b="set",a="_applyEventPropagation";
qx.Class.define(c,{extend:qx.core.Object,implement:[qx.data.marshal.IMarshaler],construct:function(r){qx.core.Object.call(this);
this.__delegate=r;
},statics:{__instance:null,createModel:function(p,q){if(this.__instance===null){this.__instance=new qx.data.marshal.Json();
}this.__instance.toClass(p,q);
return this.__instance.toModel(p);
}},members:{__delegate:null,__jsonToHash:function(m){var n=[];

for(var o in m){n.push(o);
}return n.sort().join(e);
},toClass:function(s,t){if(qx.lang.Type.isNumber(s)||qx.lang.Type.isString(s)||qx.lang.Type.isBoolean(s)||s==null||s instanceof qx.core.Object){return;
}if(qx.lang.Type.isArray(s)){for(var i=0;i<s.length;i++){this.toClass(s[i],t);
}return ;
}var v=this.__jsonToHash(s);
if(this.__delegate&&this.__delegate.getModelClass&&this.__delegate.getModelClass(v)!=null){return;
}for(var w in s){this.toClass(s[w],t);
}if(qx.Class.isDefined(h+v)){return;
}var C={};
var B={};

for(var w in s){w=w.replace(/-/g,g);
C[w]={};
C[w].nullable=true;
C[w].event=d+qx.lang.String.firstUp(w);
if(t){C[w].apply=a;
}if(this.__delegate&&this.__delegate.getValidationRule){var y=this.__delegate.getValidationRule(v,w);

if(y){C[w].validate=f+w;
B[f+w]=y;
}}}if(this.__delegate&&this.__delegate.getModelSuperClass){var A=this.__delegate.getModelSuperClass(v)||qx.core.Object;
}else{var A=qx.core.Object;
}var x=[];

if(this.__delegate&&this.__delegate.getModelMixins){var z=this.__delegate.getModelMixins(v);
if(!qx.lang.Type.isArray(z)){if(z!=null){x=[z];
}}}if(t){x.push(qx.data.marshal.MEventBubbling);
}var u={extend:A,include:x,properties:C,members:B};
qx.Class.define(h+v,u);
},__createInstance:function(j){var k;
if(this.__delegate&&this.__delegate.getModelClass){k=this.__delegate.getModelClass(j);
}
if(k!=null){return (new k());
}else{var l=qx.Class.getByName(h+j);
return (new l());
}},toModel:function(D){if(qx.lang.Type.isNumber(D)||qx.lang.Type.isString(D)||qx.lang.Type.isBoolean(D)||qx.lang.Type.isDate(D)||D==null||D instanceof qx.core.Object){return D;
}else if(qx.lang.Type.isArray(D)){var H=new qx.data.Array();

for(var i=0;i<D.length;i++){H.push(this.toModel(D[i]));
}return H;
}else if(qx.lang.Type.isObject(D)){var E=this.__jsonToHash(D);
var I=this.__createInstance(E);
for(var G in D){var F=G.replace(/-/g,g);
I[b+qx.lang.String.firstUp(F)](this.toModel(D[G]));
}return I;
}throw new Error("Unsupported type!");
}},destruct:function(){this.__delegate=null;
}});
})();
(function(){var h="[",g="]",f=".",d="idBubble",c="changeBubble",b="qx.data.marshal.MEventBubbling",a="qx.event.type.Data";
qx.Mixin.define(b,{events:{"changeBubble":a},members:{_applyEventPropagation:function(i,j,name){this.fireDataEvent(c,{value:i,name:name,old:j});
this._registerEventChaining(i,j,name);
},_registerEventChaining:function(k,l,name){if((k instanceof qx.core.Object)&&qx.Class.hasMixin(k.constructor,qx.data.marshal.MEventBubbling)){var m=qx.lang.Function.bind(this.__changePropertyListener,this,name);
var n=k.addListener(c,m,this);
k.setUserData(d,n);
}if(l!=null&&l.getUserData&&l.getUserData(d)!=null){l.removeListenerById(l.getUserData(d));
}},__changePropertyListener:function(name,e){var v=e.getData();
var r=v.value;
var p=v.old;
if(qx.Class.hasInterface(e.getTarget().constructor,qx.data.IListData)){if(v.name.indexOf){var u=v.name.indexOf(f)!=-1?v.name.indexOf(f):v.name.length;
var s=v.name.indexOf(h)!=-1?v.name.indexOf(h):v.name.length;

if(u<s){var o=v.name.substring(0,u);
var t=v.name.substring(u+1,v.name.length);

if(t[0]!=h){t=f+t;
}var q=name+h+o+g+t;
}else if(s<u){var o=v.name.substring(0,s);
var t=v.name.substring(s,v.name.length);
var q=name+h+o+g+t;
}else{var q=name+h+v.name+g;
}}else{var q=name+h+v.name+g;
}}else{var q=name+f+v.name;
}this.fireDataEvent(c,{value:r,name:q,old:p});
}}});
})();
(function(){var D="change",C="add",B="remove",A="order",z="qx.event.type.Data",y="",x="qx.data.Array",w="?",v="changeBubble",u="number",t="changeLength";
qx.Class.define(x,{extend:qx.core.Object,include:qx.data.marshal.MEventBubbling,implement:[qx.data.IListData],construct:function(h){qx.core.Object.call(this);
if(h==undefined){this.__array=[];
}else if(arguments.length>1){this.__array=[];

for(var i=0;i<arguments.length;i++){this.__array.push(arguments[i]);
}}else if(typeof h==u){this.__array=new Array(h);
}else if(h instanceof Array){this.__array=qx.lang.Array.clone(h);
}else{this.__array=[];
throw new Error("Type of the parameter not supported!");
}for(var i=0;i<this.__array.length;i++){this._applyEventPropagation(this.__array[i],null,i);
}this.__updateLength();
},events:{"change":z,"changeLength":z},members:{__array:null,concat:function(bg){if(bg){var bh=this.__array.concat(bg);
}else{var bh=this.__array.concat();
}return new qx.data.Array(bh);
},join:function(j){return this.__array.join(j);
},pop:function(){var bc=this.__array.pop();
this.__updateLength();
this._applyEventPropagation(null,bc,this.length-1);
this.fireDataEvent(D,{start:this.length-1,end:this.length-1,type:B,items:[bc]},null);
return bc;
},push:function(K){for(var i=0;i<arguments.length;i++){this.__array.push(arguments[i]);
this.__updateLength();
this._applyEventPropagation(arguments[i],null,this.length-1);
this.fireDataEvent(D,{start:this.length-1,end:this.length-1,type:C,items:[arguments[i]]},null);
}return this.length;
},reverse:function(){this.__array.reverse();
this.fireDataEvent(D,{start:0,end:this.length-1,type:A,items:null},null);
},shift:function(){var bd=this.__array.shift();
this.__updateLength();
this._applyEventPropagation(null,bd,this.length-1);
this.fireDataEvent(D,{start:0,end:this.length-1,type:B,items:[bd]},null);
return bd;
},slice:function(f,g){return new qx.data.Array(this.__array.slice(f,g));
},splice:function(k,l,m){var s=this.__array.length;
var p=this.__array.splice.apply(this.__array,arguments);
if(this.__array.length!=s){this.__updateLength();
}var q=l>0;
var n=arguments.length>2;
var o=null;

if(q||n){if(this.__array.length>s){var r=C;
}else if(this.__array.length<s){var r=B;
o=p;
}else{var r=A;
}this.fireDataEvent(D,{start:k,end:this.length-1,type:r,items:o},null);
}for(var i=2;i<arguments.length;i++){this._registerEventChaining(arguments[i],null,k+i);
}this.fireDataEvent(v,{value:this,name:w,old:p});
for(var i=0;i<p.length;i++){this._applyEventPropagation(null,p[i],i);
}return (new qx.data.Array(p));
},sort:function(c){this.__array.sort.apply(this.__array,arguments);
this.fireDataEvent(D,{start:0,end:this.length-1,type:A,items:null},null);
},unshift:function(E){for(var i=arguments.length-1;i>=0;i--){this.__array.unshift(arguments[i]);
this.__updateLength();
this._applyEventPropagation(arguments[i],null,0);
this.fireDataEvent(D,{start:0,end:this.length-1,type:C,items:[arguments[i]]},null);
}return this.length;
},toArray:function(){return this.__array;
},getItem:function(M){return this.__array[M];
},setItem:function(F,G){var H=this.__array[F];
this.__array[F]=G;
this._applyEventPropagation(G,H,F);
if(this.length!=this.__array.length){this.__updateLength();
}this.fireDataEvent(D,{start:F,end:F,type:C,items:[G]},null);
},getLength:function(){return this.length;
},indexOf:function(be){return this.__array.indexOf(be);
},toString:function(){if(this.__array!=null){return this.__array.toString();
}return y;
},contains:function(bi){return this.__array.indexOf(bi)!==-1;
},copy:function(){return this.concat();
},insertAt:function(O,P){this.splice(O,0,P);
},insertBefore:function(Y,ba){var bb=this.indexOf(Y);

if(bb==-1){this.push(ba);
}else{this.splice(bb,0,ba);
}},insertAfter:function(T,U){var V=this.indexOf(T);

if(V==-1||V==(this.length-1)){this.push(U);
}else{this.splice(V+1,0,U);
}},removeAt:function(a){return this.splice(a,1)[0];
},removeAll:function(){for(var i=0;i<this.__array.length;i++){this._applyEventPropagation(null,this.__array[i],i);
}var J=this.getLength();
var I=this.__array.concat();
this.__array.length=0;
this.__updateLength();
this.fireDataEvent(D,{start:0,end:J-1,type:B,items:I},null);
},append:function(W){if(W instanceof qx.data.Array){W=W.toArray();
}{};
for(var i=0;i<W.length;i++){this._applyEventPropagation(W[i],null,this.__array.length+i);
}Array.prototype.push.apply(this.__array,W);
var X=this.length;
this.__updateLength();
this.fireDataEvent(D,{start:X,end:this.length-1,type:C,items:W},null);
},remove:function(d){var e=this.indexOf(d);

if(e!=-1){this.splice(e,1);
return d;
}},equals:function(N){if(this.length!==N.length){return false;
}
for(var i=0;i<this.length;i++){if(this.getItem(i)!==N.getItem(i)){return false;
}}return true;
},sum:function(){var S=0;

for(var i=0;i<this.length;i++){S+=this.getItem(i);
}return S;
},max:function(){var L=this.getItem(0);

for(var i=1;i<this.length;i++){if(this.getItem(i)>L){L=this.getItem(i);
}}return L===undefined?null:L;
},min:function(){var bf=this.getItem(0);

for(var i=1;i<this.length;i++){if(this.getItem(i)<bf){bf=this.getItem(i);
}}return bf===undefined?null:bf;
},forEach:function(Q,R){for(var i=0;i<this.__array.length;i++){Q.call(R,this.__array[i]);
}},__updateLength:function(){var b=this.length;
this.length=this.__array.length;
this.fireDataEvent(t,this.length,b);
}},destruct:function(){for(var i=0;i<this.__array.length;i++){this._applyEventPropagation(null,this.__array[i],i);
}this.__array=null;
}});
})();
(function(){var s="_applyLayoutChange",r="left",q="top",p="Decorator",o="Integer",n="x",m="y",l="auto",k="qx.ui.layout.Dock",j="_applySort",c="west",h="north",f="south",b="center",a="east",e="Boolean",d="bottom",g="right";
qx.Class.define(k,{extend:qx.ui.layout.Abstract,construct:function(t,u,v,w){qx.ui.layout.Abstract.call(this);

if(t){this.setSpacingX(t);
}
if(u){this.setSpacingY(u);
}
if(v){this.setSeparatorX(v);
}
if(w){this.setSeparatorY(w);
}},properties:{sort:{check:[l,m,n],init:l,apply:j},separatorX:{check:p,nullable:true,apply:s},separatorY:{check:p,nullable:true,apply:s},connectSeparators:{check:e,init:false,apply:s},spacingX:{check:o,init:0,apply:s},spacingY:{check:o,init:0,apply:s}},members:{__children:null,__edges:null,verifyLayoutProperty:null,_applySort:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__edgeMap:{north:1,south:2,west:3,east:4,center:5},__alignMap:{1:q,2:d,3:r,4:g},__rebuildCache:function(){var U=this._getLayoutChildren();
var bd,W;
var length=U.length;
var Y=[];
var bc=[];
var ba=[];
var V=this.getSort()===m;
var bb=this.getSort()===n;

for(var i=0;i<length;i++){bd=U[i];
ba=bd.getLayoutProperties().edge;

if(ba===b){if(W){throw new Error("It is not allowed to have more than one child aligned to 'center'!");
}W=bd;
}else if(bb||V){if(ba===h||ba===f){V?Y.push(bd):bc.push(bd);
}else if(ba===c||ba===a){V?bc.push(bd):Y.push(bd);
}}else{Y.push(bd);
}}var be=Y.concat(bc);

if(W){be.push(W);
}this.__children=be;
var X=[];

for(var i=0;i<length;i++){ba=be[i].getLayoutProperties().edge;
X[i]=this.__edgeMap[ba]||5;
}this.__edges=X;
delete this._invalidChildrenCache;
},renderLayout:function(bo,bp){if(this._invalidChildrenCache){this.__rebuildCache();
}var bI=qx.ui.layout.Util;
var bv=this.__children;
var bJ=this.__edges;
var length=bv.length;
var by,br,bx,bD,bE,bO,bB,bs,bL;
var bS=[];
var bA=[];
var bR=this._getSeparatorWidths();
var bW=this.getSpacingX();
var bV=this.getSpacingY();
var bw=-bW;
var bK=-bV;

if(bR.x){bw-=bR.x+bW;
}
if(bR.y){bK-=bR.y+bV;
}
for(var i=0;i<length;i++){br=bv[i];
bD=br.getLayoutProperties();
bx=br.getSizeHint();
bB=bx.width;
bs=bx.height;

if(bD.width!=null){bB=Math.floor(bo*parseFloat(bD.width)/100);

if(bB<bx.minWidth){bB=bx.minWidth;
}else if(bB>bx.maxWidth){bB=bx.maxWidth;
}}
if(bD.height!=null){bs=Math.floor(bp*parseFloat(bD.height)/100);

if(bs<bx.minHeight){bs=bx.minHeight;
}else if(bs>bx.maxHeight){bs=bx.maxHeight;
}}bS[i]=bB;
bA[i]=bs;
switch(bJ[i]){case 1:case 2:bK+=bs+br.getMarginTop()+br.getMarginBottom()+bV;

if(bR.y){bK+=bR.y+bV;
}break;
case 3:case 4:bw+=bB+br.getMarginLeft()+br.getMarginRight()+bW;

if(bR.x){bw+=bR.x+bW;
}break;
default:bw+=bB+br.getMarginLeft()+br.getMarginRight()+bW;
bK+=bs+br.getMarginTop()+br.getMarginBottom()+bV;

if(bR.x){bw+=bR.x+bW;
}
if(bR.y){bK+=bR.y+bV;
}}}if(bw!=bo){by={};
bO=bw<bo;

for(var i=0;i<length;i++){br=bv[i];

switch(bJ[i]){case 3:case 4:case 5:bE=br.getLayoutProperties().flex;
if(bE==null&&bJ[i]==5){bE=1;
}
if(bE>0){bx=br.getSizeHint();
by[i]={min:bx.minWidth,value:bS[i],max:bx.maxWidth,flex:bE};
}}}var bt=bI.computeFlexOffsets(by,bo,bw);

for(var i in bt){bL=bt[i].offset;
bS[i]+=bL;
bw+=bL;
}}if(bK!=bp){by=[];
bO=bK<bp;

for(var i=0;i<length;i++){br=bv[i];

switch(bJ[i]){case 1:case 2:case 5:bE=br.getLayoutProperties().flex;
if(bE==null&&bJ[i]==5){bE=1;
}
if(bE>0){bx=br.getSizeHint();
by[i]={min:bx.minHeight,value:bA[i],max:bx.maxHeight,flex:bE};
}}}var bt=bI.computeFlexOffsets(by,bp,bK);

for(var i in bt){bL=bt[i].offset;
bA[i]+=bL;
bK+=bL;
}}this._clearSeparators();
var bP=this.getSeparatorX(),bQ=this.getSeparatorY();
var bT=this.getConnectSeparators();
var bG=0,bN=0;
var cb,top,bB,bs,bF,bX;
var bH,bU,ca,bq;
var bY,bz,bC,bu;
var bM=this.__alignMap;

for(var i=0;i<length;i++){br=bv[i];
bX=bJ[i];
bx=br.getSizeHint();
bY=br.getMarginTop();
bz=br.getMarginBottom();
bC=br.getMarginLeft();
bu=br.getMarginRight();
switch(bX){case 1:case 2:bB=bo-bC-bu;
if(bB<bx.minWidth){bB=bx.minWidth;
}else if(bB>bx.maxWidth){bB=bx.maxWidth;
}bs=bA[i];
top=bG+bI.computeVerticalAlignOffset(bM[bX],bs,bp,bY,bz);
cb=bN+bI.computeHorizontalAlignOffset(br.getAlignX()||r,bB,bo,bC,bu);
if(bR.y){if(bX==1){bU=bG+bs+bY+bV+bz;
}else{bU=bG+bp-bs-bY-bV-bz-bR.y;
}bH=cb;
ca=bo;

if(bT&&bH>0){bH-=bW+bC;
ca+=(bW)*2;
}else{bH-=bC;
}this._renderSeparator(bQ,{left:bH,top:bU,width:ca,height:bR.y});
}bF=bs+bY+bz+bV;

if(bR.y){bF+=bR.y+bV;
}bp-=bF;
if(bX==1){bG+=bF;
}break;
case 3:case 4:bs=bp-bY-bz;
if(bs<bx.minHeight){bs=bx.minHeight;
}else if(bs>bx.maxHeight){bs=bx.maxHeight;
}bB=bS[i];
cb=bN+bI.computeHorizontalAlignOffset(bM[bX],bB,bo,bC,bu);
top=bG+bI.computeVerticalAlignOffset(br.getAlignY()||q,bs,bp,bY,bz);
if(bR.x){if(bX==3){bH=bN+bB+bC+bW+bu;
}else{bH=bN+bo-bB-bC-bW-bu-bR.x;
}bU=top;
bq=bp;

if(bT&&bU>0){bU-=bV+bY;
bq+=(bV)*2;
}else{bU-=bY;
}this._renderSeparator(bP,{left:bH,top:bU,width:bR.x,height:bq});
}bF=bB+bC+bu+bW;

if(bR.x){bF+=bR.x+bW;
}bo-=bF;
if(bX==3){bN+=bF;
}break;
default:bB=bo-bC-bu;
bs=bp-bY-bz;
if(bB<bx.minWidth){bB=bx.minWidth;
}else if(bB>bx.maxWidth){bB=bx.maxWidth;
}if(bs<bx.minHeight){bs=bx.minHeight;
}else if(bs>bx.maxHeight){bs=bx.maxHeight;
}cb=bN+bI.computeHorizontalAlignOffset(br.getAlignX()||r,bB,bo,bC,bu);
top=bG+bI.computeVerticalAlignOffset(br.getAlignY()||q,bs,bp,bY,bz);
}br.renderLayout(cb,top,bB,bs);
}},_getSeparatorWidths:function(){var bg=this.getSeparatorX(),bf=this.getSeparatorY();

if(bg||bf){var bl=qx.theme.manager.Decoration.getInstance();
}
if(bg){var bm=bl.resolve(bg);
var bi=bm.getInsets();
var bj=bi.left+bi.right;
}
if(bf){var bn=bl.resolve(bf);
var bh=bn.getInsets();
var bk=bh.top+bh.bottom;
}return {x:bj||0,y:bk||0};
},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__rebuildCache();
}var A=this.__children;
var K=this.__edges;
var length=A.length;
var E,L;
var G,F;
var H=0,S=0;
var x=0,N=0;
var I=0,R=0;
var y=0,M=0;
var O=this._getSeparatorWidths();
var Q=this.getSpacingX(),P=this.getSpacingY();
var C=-Q,B=-P;

if(O.x){C-=O.x+Q;
}
if(O.y){B-=O.y+P;
}for(var i=0;i<length;i++){L=A[i];
E=L.getSizeHint();
G=L.getMarginLeft()+L.getMarginRight();
F=L.getMarginTop()+L.getMarginBottom();
switch(K[i]){case 1:case 2:I=Math.max(I,E.width+H+G);
R=Math.max(R,E.minWidth+S+G);
y+=E.height+F;
M+=E.minHeight+F;
B+=P;

if(O.y){B+=O.y+P;
}break;
case 3:case 4:x=Math.max(x,E.height+y+F);
N=Math.max(N,E.minHeight+M+F);
H+=E.width+G;
S+=E.minWidth+G;
C+=Q;

if(O.x){C+=O.x+Q;
}break;
default:H+=E.width+G;
S+=E.minWidth+G;
y+=E.height+F;
M+=E.minHeight+F;
C+=Q;

if(O.x){C+=O.x+Q;
}B+=P;

if(O.y){B+=O.y+P;
}}}var D=Math.max(S,R)+C;
var T=Math.max(H,I)+C;
var J=Math.max(N,M)+B;
var z=Math.max(x,y)+B;
return {minWidth:D,width:T,minHeight:J,height:z};
}},destruct:function(){this.__edges=this.__children=null;
}});
})();
(function(){var t="qx.core.Object",s="Boolean",r="changeClipboardManager",q="moduleId",p="String",o="A qooxdoo application",n="changeConfigManager",m="qooxdoo",l="qcl.application.Core",k="changeRpcManager",e="sessionId",j="changeSessionManager",h="changePluginManager",d="changeEventTransportManager",c="Do you really want to quit %1?",g="changeStateManager",f="changeAccessManager",i="changeNativeWindowManager";
qx.Class.define(l,{extend:qx.core.Object,properties:{applicationId:{check:p,nullable:false,init:m},applicationName:{check:p,nullable:false,init:o},mainApplication:{check:s,init:true},sessionManager:{check:t,nullable:false,event:j},rpcManager:{check:t,nullable:false,event:k},accessManager:{check:t,nullable:false,event:f},configManager:{check:t,nullable:false,event:n},stateManager:{check:t,nullable:false,event:g},clipboardManager:{check:t,nullable:false,event:r},pluginManager:{check:t,nullable:false,event:h},nativeWindowManager:{check:t,nullable:false,event:i},eventTransportManager:{check:t,nullable:false,event:d},clipboardManager:{check:t,nullable:false,event:r},confirmQuit:{check:s,init:true}},construct:function(){qx.core.Object.call(this);
this.__modules={};
this.__widgets={};
qx.Class.include(qx.core.Object,qcl.application.MGetApplication);
qx.Class.include(qx.core.Object,qcl.application.MWidgetId);
},members:{__widgets:null,__modules:null,register:function(a,b){if(!qx.Class.implementsInterface(b,qcl.application.IModule)){this.error("Invalid parameter: must be instance of qcl.application.IModule");
}this.__modules[a]=b;
b.setUserData(q,a);
b.init(new qcl.application.Sandbox(this));
},unregister:function(H){if(!qx.Class.implementsInterface(H,qcl.application.IModule)){this.error("Invalid parameter: must be instance of qcl.application.IModule");
}var I=H.getUserData(q);

if(!I){this.error("Cannot unregister module: no module id.");
}H.destruct();
this.__modules[I]=null;
},buildModules:function(){for(var w in this.__modules){var v=this.__modules[w];

if(qx.Class.implementsInterface(v,qcl.application.IWidgetModule)){v.build();
}}},startModules:function(){for(var u in this.__modules){this.__modules[u].start();
}},stopModules:function(){for(var x in this.__modules){this.__modules[x].stop();
}},subscribe:function(name,E,F){qx.event.message.Bus.subscribe(name,E,F);
},unsubscribe:function(name,y,z){qx.event.message.Bus.unsubscribe(name,y,z);
},publish:function(name,A){qx.event.message.Bus.dispatchByName(name,A);
},initializeManagers:function(){this.setSessionManager(new qcl.application.SessionManager);
this.setStateManager(new qcl.application.StateManager);
this.setRpcManager(new qcl.io.RpcManager);
this.setAccessManager(new qcl.access.AccessManager);
this.setConfigManager(new qcl.application.ConfigManager);
this.setPluginManager(new qcl.application.PluginManager);
var G=this.getStateManager().getState(e);

if(G){this.getSessionManager().setSessionId(G);
}},setWidgetById:function(B,C){this.__widgets[B]=C;
},getWidgetById:function(D){return this.__widgets[D];
},getActiveUser:function(){this.getAccessManager().getActiveUser();
},getLayoutConfig:function(){return qx.core.Init.getApplication().getLayoutConfig();
},close:function(){if(this.isMainApplication()&&this.isConfirmQuit()){return this.tr(c,this.getApplicationName());
}return undefined;
},terminate:function(){this.getRpcManager().terminate();
}}});
})();
(function(){var a="qcl.application.MGetApplication";
qx.Mixin.define(a,{members:{getApplication:function(){return qx.core.Init.getApplication();
}}});
})();
(function(){var c="_applyWidgetId",b="String",a="qcl.application.MWidgetId";
qx.Mixin.define(a,{properties:{widgetId:{check:b,nullable:true,apply:c}},members:{_applyWidgetId:function(d,e){this.getApplication().setWidgetById(d,this);
}}});
})();
(function(){var a="qcl.application.IModule";
qx.Interface.define(a,{members:{init:function(b){},start:function(){},stop:function(){}}});
})();
(function(){var a="qcl.application.Sandbox";
qx.Class.define(a,{extend:qx.core.Object,properties:{},construct:function(b){qx.core.Object.call(this);

if(!qx.Class.implementsInterface(b,qcl.application.Core)){this.error("Sandbox must be instantiated with an instance of qcl.application.Core");
}this.__core=b;
},members:{__core:null,subscribe:function(name,f,g){this.__core.subscribe(name,f,g);
},unsubscribe:function(name,d,e){this.__core.unsubscribe(name,d,e);
},publish:function(name,c){this.__core.publish(name,c);
},getActiveUser:function(){return this.__core.getActiveUser();
},getLayoutConfig:function(){return this.__core.getLayoutConfig();
}}});
})();
(function(){var a="qcl.application.IWidgetModule";
qx.Interface.define(a,{members:{build:function(){},show:function(){},hide:function(){}}});
})();
(function(){var f="function",e="qx.event.message.Bus",d="*",c="undefined",b="string",a="singleton";
qx.Class.define(e,{type:a,extend:qx.core.Object,statics:{getSubscriptions:function(){return this.getInstance().getSubscriptions();
},subscribe:function(N,O,P){return this.getInstance().subscribe(N,O,P);
},checkSubscription:function(Q,R,S){return this.getInstance().checkSubscription(Q,R,S);
},unsubscribe:function(E,F,G){return this.getInstance().unsubscribe(E,F,G);
},dispatch:function(s){return this.getInstance().dispatch.apply(this.getInstance(),arguments);
},dispatchByName:function(name,D){return this.getInstance().dispatchByName.apply(this.getInstance(),arguments);
}},construct:function(){this.__subscriptions={};
},members:{__subscriptions:null,getSubscriptions:function(){return this.__subscriptions;
},subscribe:function(t,u,v){if(!t||typeof u!=f){this.error("Invalid parameters! "+[t,u,v]);
return false;
}var w=this.getSubscriptions();

if(this.checkSubscription(t)){if(this.checkSubscription(t,u,v)){this.warn("Object method already subscribed to "+t);
return false;
}w[t].push({subscriber:u,context:v||null});
return true;
}else{w[t]=[{subscriber:u,context:v||null}];
return true;
}},checkSubscription:function(z,A,B){var C=this.getSubscriptions();

if(!C[z]||C[z].length===0){return false;
}
if(A){for(var i=0;i<C[z].length;i++){if(C[z][i].subscriber===A&&C[z][i].context===(B||null)){return true;
}}return false;
}return true;
},unsubscribe:function(H,I,J){var L=this.getSubscriptions();
var K=L[H];

if(K){if(!J){J=null;
}var i=K.length;
var M;

do{M=K[--i];

if(M.subscriber===I&&M.context===J){K.splice(i,1);

if(K.length===0){L[H]=null;
delete L[H];
}return true;
}}while(i);
}return false;
},dispatch:function(l){if(typeof l==b){{};
var q=typeof arguments[1]!=c?arguments[1]:true;
l=new qx.event.message.Message(l,q);
}var m=this.getSubscriptions();
var n=l.getName();
var o=false;

for(var r in m){var p=r.indexOf(d);

if(p>-1){if(p===0||r.substr(0,p)===n.substr(0,p)){this.__callSubscribers(m[r],l);
o=true;
}}else{if(r===n){this.__callSubscribers(m[n],l);
o=true;
}}}return o;
},dispatchByName:function(name,x){var y=new qx.event.message.Message(name,x);
return this.dispatch(y);
},__callSubscribers:function(g,h){for(var i=0;i<g.length;i++){var j=g[i].subscriber;
var k=g[i].context;
if(k&&k.isDisposed){if(k.isDisposed()){g.splice(i,1);
i--;
}else{j.call(k,h);
}}else{j.call(k,h);
}}}}});
})();
(function(){var c="Object",b="qx.event.message.Message",a="String";
qx.Class.define(b,{extend:qx.core.Object,construct:function(name,d){qx.core.Object.call(this);

if(name!=null){this.setName(name);
}
if(d!=null){this.setData(d);
}},properties:{name:{check:a},data:{init:null,nullable:true},sender:{check:c}}});
})();
(function(){var g="sessionId",f="qcl.application.SessionManager",d="_applySessionId",c="setSessionId",b="changeSessionId",a="String";
qx.Class.define(f,{extend:qx.core.Object,properties:{sessionId:{check:a,nullable:true,event:b,apply:d}},construct:function(){qx.core.Object.call(this);
qx.event.message.Bus.subscribe(c,function(e){this.setSessionId(e.getData());
},this);
},members:{_applySessionId:function(h,i){if(h){qx.core.Init.getApplication().getStateManager().setState(g,h);
}else{qx.core.Init.getApplication().getStateManager().removeState(g);
}}}});
})();
(function(){var S="string",R="%",Q="String",P="Boolean",O="Array",N="",M=' ',L="object",K="request",J="_applyHistorySupport",bi="^",bh="true",bg="Integer",bf="Object",be="changeHistorySupport",bd="null",bc="qcl.application.StateManager",bb="qcl=1",ba="false",Y="undefined",W="changeServerStateNames",X="~",U="sessionId",V="NaN",T=",";
qx.Class.define(bc,{extend:qx.core.Object,properties:{stateSeparatorChar:{check:Q,init:bi,nullable:false},stateDefineChar:{check:Q,init:X,nullable:false},historySupport:{check:P,init:false,apply:J,event:be},serverStateNames:{check:O,event:W}},construct:function(){qx.core.Object.call(this);
this.__backHistoryStack=[];
this.__forwardHistoryStack=[];
this.setServerStateNames([U]);
},members:{__lastHash:null,__hashParams:null,__backHistoryStack:null,__forwardHistoryStack:null,_analyzeSearchString:function(){var g=window.location.search;
var h=window.location.parameters={};

if(g){var f=decodeURIComponent(g.substr(1));
var j=f.split(this.getStateSeparatorChar());

for(var i=0;i<j.length;i++){var p=j[i].split(this.getStateDefineChar());
h[p[0]]=typeof p[1]==S?p[1].replace(/\+/g,M):true;
}}return h;
},getGetParam:function(bp){return this._analyzeSearchString()[bp];
},setGetParam:function(w,x){var z=this._analyzeSearchString();

if(typeof w==L){for(var y in w){z[y]=w[y];
}}else{z[w]=x;
}var p=[];

for(var y in z){p.push(y+this.getStateDefineChar()+encodeURIComponent(z[y]));
}window.location.search=p.join(this.getStateSeparatorChar());
},_analyzeHashString:function(B){var E=B||location.hash.substr(1)||N;
while(E.search(/%25/)!=-1){E=E.replace(/%25/g,R);
}E=decodeURIComponent(E);
var C={};

if(E){var D=E.split(this.getStateSeparatorChar());

for(var i=0;i<D.length;i++){var p=D[i].split(this.getStateDefineChar());
C[p[0]]=typeof p[1]==S?p[1].replace(/\+/g,M):true;
}}
if(!B)location.hashParams=C;
return C;
},getHashParam:function(A){return this._analyzeHashString()[A];
},setHashParam:function(F,G){var H=this._analyzeHashString();

if(typeof F==L){for(var I in F){H[I]=F[I];
}}else{H[F]=G;
}var p=[];

for(var I in H){p.push(I+this.getStateDefineChar()+encodeURIComponent(H[I]));
}window.location.hash=p.join(this.getStateSeparatorChar());
while(window.location.hash.search(/%25/)!=-1){window.location.hash=window.location.hash.replace(/%25/g,R);
}return H;
},removeHashParam:function(name){var r=this._analyzeHashString();

if(r[name]!=undefined){delete r[name];
var p=[];

for(var s in r){p.push(s+this.getStateDefineChar()+encodeURIComponent(r[s]));
}
if(p.length){window.location.hash=p.join(this.getStateSeparatorChar());
}else{window.location.hash=bb;
}while(window.location.hash.search(/%25/)!=-1){window.location.hash=window.location.hash.replace(/%25/g,R);
}}return r;
},setState:function(name,bm,bn){if(typeof name!=S){this.error("Invalid parameters");
}if(typeof bm!=S){bm=new String(bm).toString();
}var bo=this.getState(name);
if(bm!=bo){this.setHashParam(name,bm);
this._set(name,bm);
this.addToHistory(location.hash.substr(1),bn);
}},_set:function(name,bq){var br=qx.core.Init.getApplication();
var bt=qx.Class.getByName(br.classname);

if(qx.Class.hasProperty(bt,name)){var bs=qx.Class.getPropertyDefinition(bt,name).check;

switch(bs){case bg:if(isNaN(parseInt(bq))){this.error("Trying to set non-integer state property to integer application property");
}bq=parseInt(bq);
break;
case P:bq=new Boolean(bq);
break;
case O:if(bq==N){bq=[];
}else{bq=bq.split(T);
}break;
case undefined:case Q:case bf:break;
default:this.error("Cannot set application property for state '"+name+"': invalid type '"+bs+"'");
}br.set(name,bq);
}},getState:function(name){var a=this.getHashParam(name);

switch(a){case bd:return null;
case ba:return false;
case bh:return true;
case Y:return undefined;
case V:return undefined;
default:return a;
}},getStates:function(){return this._analyzeHashString();
},getServerStates:function(){var k=this.getStates();
var m=this.getServerStateNames();
var l={};

for(key in k){if(qx.lang.Array.contains(m,key)){l[key]=k[key];
}}return l;
},updateState:function(){var bj={};
var bk=this._analyzeHashString();

if(arguments[0] instanceof Array){arguments[0].forEach(function(name){bj[name]=true;
});
}else if(arguments.length){for(var i=0;i<arguments.length;i++){bj[arguments[i]]=true;
}}else{bj=null;
}
for(var bl in bk){if(bj&&!bj[bl])continue;
this._set(bl,bk[bl]);
}return bk;
},removeState:function(name){this.removeHashParam(name);
this.addToHistory(location.hash.substr(1),null);
},_applyHistorySupport:function(bu,bv){if(bu&&!bv){var bw=qx.bom.History.getInstance().getState();
this.__lastHash=bw;
this.__hashParams=this._analyzeHashString();
qx.bom.History.getInstance().addListener(K,function(e){this.updateState();
},this);
}},navigateBack:function(){var v=this.__backHistoryStack;
var t=this.__forwardHistoryStack;
if(v.length){var u=v.shift();
t.unshift(u);
qx.bom.History.getInstance().navigateBack();
qx.bom.History.getInstance().navigateBack();
return true;
}return false;
},navigateForward:function(){var b=this.__forwardHistoryStack;
var d=this.__backHistoryStack;
if(b.length){var c=b.shift();
d.unshift(c);
qx.bom.History.getInstance().navigateForward();
qx.bom.History.getInstance().navigateForward();
return true;
}return false;
},addToHistory:function(n,o){if(n==this.__lastHash){return ;
}this.__lastHash=n;
var q=this.__backHistoryStack;
q.unshift(n);
qx.bom.History.getInstance().addToHistory(n,o);
},canNavigateBack:function(){return (this.__backHistoryStack.length>1);
},canNavigateForward:function(){return (this.__forwardHistoryStack.length>1);
}}});
})();
(function(){var m="",l='#',k="String",j="request",i="mshtml",h="changeTitle",g="abstract",f="_applyState",e="qx.client",d="changeState",a="qx.bom.History",c="_applyTitle",b="qx.event.type.Data";
qx.Class.define(a,{extend:qx.core.Object,type:g,construct:function(){qx.core.Object.call(this);
this._baseUrl=window.location.href.split(l)[0]+l;
this.__titles={};
this._setInitialState();
},events:{"request":b},statics:{SUPPORTS_HASH_CHANGE_EVENT:(qx.bom.client.Engine.MSHTML&&document.documentMode>=8)||(!qx.bom.client.Engine.MSHTML&&document.documentMode&&"onhashchange" in window),getInstance:function(){if(!this.$$instance){if(this.SUPPORTS_HASH_CHANGE_EVENT){this.$$instance=new qx.bom.NativeHistory();
}else if(qx.core.Variant.isSet(e,i)){this.$$instance=new qx.bom.IframeHistory();
}else{this.$$instance=new qx.bom.NativeHistory();
}}return this.$$instance;
}},properties:{title:{check:k,event:h,nullable:true,apply:c},state:{check:k,event:d,nullable:true,apply:f}},members:{__titles:null,_applyState:function(n,o){this._writeState(n);
},_setInitialState:function(){this.setState(this._readState());
},_encode:function(y){if(qx.lang.Type.isString(y)){return encodeURIComponent(y);
}return m;
},_decode:function(q){if(qx.lang.Type.isString(q)){return decodeURIComponent(q);
}return m;
},_applyTitle:function(p){if(p!=null){document.title=p||m;
}},addToHistory:function(r,s){if(!qx.lang.Type.isString(r)){r=r+m;
}
if(qx.lang.Type.isString(s)){this.setTitle(s);
this.__titles[r]=s;
}
if(this.getState()!==r){this._writeState(r);
}},navigateBack:function(){qx.event.Timer.once(function(){history.back();
},0);
},navigateForward:function(){qx.event.Timer.once(function(){history.forward();
},0);
},_onHistoryLoad:function(x){this.setState(x);
this.fireDataEvent(j,x);

if(this.__titles[x]!=null){this.setTitle(this.__titles[x]);
}},_readState:function(){throw new Error("Abstract method call");
},_writeState:function(){throw new Error("Abstract method call");
},_setHash:function(u){var v=this._baseUrl+(u||m);
var w=window.location;

if(v!=w.href){w.href=v;
}},_getHash:function(){var t=/#(.*)$/.exec(window.location.href);
return t&&t[1]?t[1]:m;
}},destruct:function(){this.__titles=null;
}});
})();
(function(){var e="hashchange",d="interval",c="qx.bom.NativeHistory",b="qx.client";
qx.Class.define(c,{extend:qx.bom.History,construct:function(){qx.bom.History.call(this);
this.__attachListeners();
},members:{__checkOnHashChange:null,__attachListeners:function(){if(qx.bom.History.SUPPORTS_HASH_CHANGE_EVENT){this.__checkOnHashChange=qx.lang.Function.bind(this.__onHashChange,this);
qx.bom.Event.addNativeListener(window,e,this.__checkOnHashChange);
}else{qx.event.Idle.getInstance().addListener(d,this.__onHashChange,this);
}},__detatchListeners:function(){if(qx.bom.History.SUPPORTS_HASH_CHANGE_EVENT){qx.bom.Event.removeNativeListener(window,e,this.__checkOnHashChange);
}else{qx.event.Idle.getInstance().removeListener(d,this.__onHashChange,this);
}},__onHashChange:function(){var g=this._readState();

if(qx.lang.Type.isString(g)&&g!=this.getState()){this._onHistoryLoad(g);
}},_readState:function(){return this._decode(this._getHash());
},_writeState:qx.core.Variant.select(b,{"opera":function(f){qx.event.Timer.once(function(){this._setHash(this._encode(f));
},this,0);
},"default":function(a){this._setHash(this._encode(a));
}})},destruct:function(){this.__detatchListeners();
}});
})();
(function(){var q="interval",p="-1000px",o="mshtml",n="",m="qx.bom.IframeHistory",l="qx/static/blank.html",k="state",j='<html><body><div id="state">',i='</div></body></html>',h="hidden",d="qx.client",g="undefined",f="absolute";
if(qx.core.Variant.isSet(d,o)){qx.Class.define(m,{extend:qx.bom.History,construct:function(){qx.bom.History.call(this);
this.__initTimer();
},members:{__iframe:null,__iframeReady:false,__locationState:null,_setInitialState:function(){qx.bom.History.prototype._setInitialState.call(this);
this.__locationState=this._getHash();
},_setHash:function(A){qx.bom.History.prototype._setHash.call(this,A);
this.__locationState=this._encode(A);
},_readState:function(){if(!this.__iframeReady){return this._decode(this._getHash());
}var r=this.__iframe.contentWindow.document;
var s=r.getElementById(k);
return s?this._decode(s.innerText):n;
},_writeState:function(u){var u=this._encode(u);
this._setHash(u);
this.__locationState=u;

try{var v=this.__iframe.contentWindow.document;
v.open();
v.write(j+u+i);
v.close();
}catch(C){}},__initTimer:function(){this.__initIframe(function(){qx.event.Idle.getInstance().addListener(q,this.__onHashChange,this);
});
},__onHashChange:function(e){var z=null;
var y=this._getHash();

if(!this.__isCurrentLocationState(y)){z=this.__storeLocationState(y);
}else{z=this._readState();
}
if(qx.lang.Type.isString(z)&&z!=this.getState()){this._onHistoryLoad(z);
}},__storeLocationState:function(B){B=this._decode(B);
this._writeState(B);
return B;
},__isCurrentLocationState:function(w){return qx.lang.Type.isString(w)&&w==this.__locationState;
},__initIframe:function(x){this.__iframe=this.__createIframe();
document.body.appendChild(this.__iframe);
this.__waitForIFrame(function(){this._writeState(this.getState());

if(x){x.call(this);
}},this);
},__createIframe:function(){var t=qx.bom.Iframe.create({src:qx.util.ResourceManager.getInstance().toUri(l)});
t.style.visibility=h;
t.style.position=f;
t.style.left=p;
t.style.top=p;
return t;
},__waitForIFrame:function(a,b,c){if(typeof c===g){c=0;
}
if(!this.__iframe.contentWindow||!this.__iframe.contentWindow.document){if(c>20){throw new Error("can't initialize iframe");
}qx.event.Timer.once(function(){this.__waitForIFrame(a,b,++c);
},this,10);
return;
}this.__iframeReady=true;
a.call(b||window);
}},destruct:function(){this.__iframe=null;
qx.event.Idle.getInstance().addListener(q,this.__onHashChange,this);
}});
}})();
(function(){var c="qx.event.handler.Iframe",b="load",a="iframe";
qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{load:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false,onevent:qx.event.GlobalError.observeMethod(function(m){qx.event.Registration.fireEvent(m,b);
})},members:{canHandleEvent:function(d,e){return d.tagName.toLowerCase()===a;
},registerEvent:function(j,k,l){},unregisterEvent:function(f,g,h){}},defer:function(i){qx.event.Registration.addHandler(i);
}});
})();
(function(){var g="qx.client",f="webkit",e="body",d="iframe",c="qx.bom.Iframe";
qx.Class.define(c,{statics:{DEFAULT_ATTRIBUTES:{onload:"qx.event.handler.Iframe.onevent(this)",frameBorder:0,frameSpacing:0,marginWidth:0,marginHeight:0,hspace:0,vspace:0,border:0,allowTransparency:true},create:function(v,w){var v=v?qx.lang.Object.clone(v):{};
var x=qx.bom.Iframe.DEFAULT_ATTRIBUTES;

for(var y in x){if(v[y]==null){v[y]=x[y];
}}return qx.bom.Element.create(d,v,w);
},getWindow:qx.core.Variant.select(g,{"mshtml|gecko":function(o){try{return o.contentWindow;
}catch(B){return null;
}},"default":function(m){try{var n=this.getDocument(m);
return n?n.defaultView:null;
}catch(A){return null;
}}}),getDocument:qx.core.Variant.select(g,{"mshtml":function(k){try{var l=this.getWindow(k);
return l?l.document:null;
}catch(C){return null;
}},"default":function(h){try{return h.contentDocument;
}catch(i){return null;
}}}),getBody:function(p){try{var q=this.getDocument(p);
return q?q.getElementsByTagName(e)[0]:null;
}catch(u){return null;
}},setSource:function(r,s){try{if(this.getWindow(r)&&qx.dom.Hierarchy.isRendered(r)){try{if(qx.core.Variant.isSet(g,f)&&qx.bom.client.Platform.MAC){var t=this.getContentWindow();

if(t){t.stop();
}}this.getWindow(r).location.replace(s);
}catch(D){r.src=s;
}}else{r.src=s;
}}catch(j){qx.log.Logger.warn("Iframe source could not be set!");
}},queryCurrentUrl:function(a){var b=this.getDocument(a);

try{if(b&&b.location){return b.location.href;
}}catch(z){}return null;
}}});
})();
(function(){var g="String",f="qx.io.remote.Rpc",e="qcl.io.RpcManager",d="function",c="changeRpcObject",b="register",a="unregister";
qx.Class.define(e,{extend:qx.core.Object,properties:{rpcObject:{check:f,nullable:true,event:c},serverUrl:{check:g,nullable:false},serviceMethodOnTerminate:{check:g,nullable:true}},construct:function(){qx.core.Object.call(this);
if(!this.getRpcObject()){this.setRpcObject(new qx.io.remote.Rpc());
}},members:{_rpc:null,_appStore:null,_applyServerUrl:function(h,i){if(!this.getRpcObject()){this.setRpcObject(new qx.io.remote.Rpc);
}this.getRpcObject().setUrl(h);
},terminate:function(){if(this.getServiceMethodOnTerminate()&&this.getRpcObject()){this.execute(this.getServiceMethodOnTerminate());
}if(typeof this._terminate==d){this._terminate();
}},execute:function(m,n,o,p,q){if(!this._appStore){this._appStore=new qcl.data.store.JsonRpc(null,null,null,null,this.getRpcObject());
}this._appStore.setServiceName(m);
this._appStore.execute(n,o,p,q);
},registerStore:function(j){this.load(b,[j.getStoreId()],function(l){},this);
},unregisterStore:function(k){this.load(a,[k.getStoreId()],function(r){},this);
}}});
})();
(function(){var p=": ",o="qx.event.type.Event",n="failed",m="String",l="Boolean",k="application/json",j="aborted",h="refreshSession",g="completed",f="Content-Type",L="timeout",K=")",J="application/x-www-form-urlencoded",I="?instanceId=",H="Integer",G="Object",F="qx.io.remote.Rpc",E="error",D=" error ",C="Aborted",w="Local error ",x="Application error ",u="",v="Transport error ",s="(",t="/.qxrpc",q="Local time-out expired",r="POST",y="result",z="UNEXPECTED origin ",B="Server error ",A="id";
qx.Class.define(F,{extend:qx.core.Object,construct:function(bE,bF){qx.core.Object.call(this);

if(bE!==undefined){this.setUrl(bE);
}
if(bF!=null){this.setServiceName(bF);
}
if(qx.core.ServerSettings){this.__currentServerSuffix=qx.core.ServerSettings.serverPathSuffix;
}},events:{"completed":o,"aborted":o,"failed":o,"timeout":o},statics:{origin:{server:1,application:2,transport:3,local:4},localError:{timeout:1,abort:2},makeServerURL:function(V){var W=null;

if(qx.core.ServerSettings){W=qx.core.ServerSettings.serverPathPrefix+t+qx.core.ServerSettings.serverPathSuffix;

if(V!=null){W+=I+V;
}}return W;
}},properties:{timeout:{check:H,nullable:true},crossDomain:{check:l,init:false},url:{check:m,nullable:true},serviceName:{check:m,nullable:true},serverData:{check:G,nullable:true},username:{check:m,nullable:true},password:{check:m,nullable:true},useBasicHttpAuth:{check:l,nullable:true}},members:{__previousServerSuffix:null,__currentServerSuffix:null,createRequest:function(){return new qx.io.remote.Request(this.getUrl(),r,k);
},createRpcData:function(a,b,c,d){var e={"service":b==h?null:this.getServiceName(),"method":b,"id":a,"params":c};
if(d){e.server_data=d;
}return e;
},_callInternal:function(Y,ba,bb){var self=this;
var bn=(ba==0?0:1);
var br=(bb?h:Y[bn]);
var bk=Y[0];
var be=[];
var bi=this;

for(var i=bn+1;i<Y.length;++i){be.push(Y[i]);
}var bf=this.createRequest();
var bq=this.getServerData();
var bg=this.createRpcData(bf.getSequenceNumber(),br,be,bq);
bf.setCrossDomain(this.getCrossDomain());

if(this.getUsername()){bf.setUseBasicHttpAuth(this.getUseBasicHttpAuth());
bf.setUsername(this.getUsername());
bf.setPassword(this.getPassword());
}bf.setTimeout(this.getTimeout());
var bl=null;
var bh=null;
var bc=null;
var bo=null;
var bd=function(bH,bI){switch(ba){case 0:break;
case 1:bk(bc,bl,bh);
break;
case 2:if(!bl){bI.fireDataEvent(bH,bo);
}else{bl.id=bh;

if(Y[0]){bI.fireDataEvent(n,bl);
}else{bI.fireDataEvent(bH,bl);
}}}};
var bj=function(bG){bG.toString=function(){switch(bG.origin){case qx.io.remote.Rpc.origin.server:return B+bG.code+p+bG.message;
case qx.io.remote.Rpc.origin.application:return x+bG.code+p+bG.message;
case qx.io.remote.Rpc.origin.transport:return v+bG.code+p+bG.message;
case qx.io.remote.Rpc.origin.local:return w+bG.code+p+bG.message;
default:return (z+bG.origin+D+bG.code+p+bG.message);
}};
};
var bp=function(bA,bB,bC){var bD=new Object();
bD.origin=bA;
bD.code=bB;
bD.message=bC;
bj(bD);
return bD;
};
bf.addListener(n,function(M){var N=M.getStatusCode();
bl=bp(qx.io.remote.Rpc.origin.transport,N,qx.io.remote.Exchange.statusCodeToString(N));
bh=this.getSequenceNumber();
bd(n,bi);
});
bf.addListener(L,function(U){this.debug("TIMEOUT OCCURRED");
bl=bp(qx.io.remote.Rpc.origin.local,qx.io.remote.Rpc.localError.timeout,q);
bh=this.getSequenceNumber();
bd(L,bi);
});
bf.addListener(j,function(X){bl=bp(qx.io.remote.Rpc.origin.local,qx.io.remote.Rpc.localError.abort,C);
bh=this.getSequenceNumber();
bd(j,bi);
});
bf.addListener(g,function(O){bo=O.getContent();
bh=bo[A];

if(bh!=this.getSequenceNumber()){this.warn("Received id ("+bh+") does not match requested id "+"("+this.getSequenceNumber()+")!");
}var Q=g;
var R=bo[E];

if(R!=null){bc=null;
bj(R);
bl=R;
Q=n;
}else{bc=bo[y];

if(bb){bc=eval(s+bc+K);
var P=qx.core.ServerSettings.serverPathSuffix;

if(self.__currentServerSuffix!=P){self.__previousServerSuffix=self.__currentServerSuffix;
self.__currentServerSuffix=P;
}self.setUrl(self.fixUrl(self.getUrl()));
}}bd(Q,bi);
});
bf.setData(qx.util.Json.stringify(bg));
bf.setAsynchronous(ba>0);

if(bf.getCrossDomain()){bf.setRequestHeader(f,J);
}else{bf.setRequestHeader(f,k);
}bf.send();

if(ba==0){if(bl!=null){var bm=new Error(bl.toString());
bm.rpcdetails=bl;
throw bm;
}return bc;
}else{return bf;
}},fixUrl:function(bt){if(this.__previousServerSuffix==null||this.__currentServerSuffix==null||this.__previousServerSuffix==u||this.__previousServerSuffix==this.__currentServerSuffix){return bt;
}var bu=bt.indexOf(this.__previousServerSuffix);

if(bu==-1){return bt;
}return (bt.substring(0,bu)+this.__currentServerSuffix+bt.substring(bu+this.__previousServerSuffix.length));
},callSync:function(bs){return this._callInternal(arguments,0);
},callAsync:function(S,T){return this._callInternal(arguments,1);
},callAsyncListeners:function(bx,by){return this._callInternal(arguments,2);
},refreshSession:function(bv){if(qx.core.ServerSettings&&qx.core.ServerSettings.serverPathSuffix){var bw=(new Date()).getTime()-qx.core.ServerSettings.lastSessionRefresh;

if(bw/1000>(qx.core.ServerSettings.sessionTimeoutInSeconds-30)){this._callInternal([bv],1,true);
}else{bv(true);
}}else{bv(false);
}},abort:function(bz){bz.abort();
}}});
})();
(function(){var O="Boolean",N="qx.event.type.Event",M="queued",L="String",K="sending",J="receiving",I="aborted",H="failed",G="nocache",F="completed",bt="qx.io.remote.Response",bs="POST",br="configured",bq="timeout",bp="GET",bo="Pragma",bn="no-url-params-on-post",bm="PUT",bl="no-cache",bk="Cache-Control",V="Content-Type",W="text/plain",T="application/xml",U="application/json",R="text/html",S="application/x-www-form-urlencoded",P="qx.io.remote.Exchange",Q="Integer",X="X-Qooxdoo-Response-Type",Y="HEAD",bc="qx.io.remote.Request",bb="_applyResponseType",be="_applyState",bd="text/javascript",bg="changeState",bf="_applyProhibitCaching",ba="",bj="_applyMethod",bi="DELETE",bh="boolean";
qx.Class.define(bc,{extend:qx.core.Object,construct:function(z,A,B){qx.core.Object.call(this);
this.__requestHeaders={};
this.__urlParameters={};
this.__dataParameters={};
this.__formFields={};

if(z!==undefined){this.setUrl(z);
}
if(A!==undefined){this.setMethod(A);
}
if(B!==undefined){this.setResponseType(B);
}this.setProhibitCaching(true);
this.__seqNum=++qx.io.remote.Request.__seqNum;
},events:{"created":N,"configured":N,"sending":N,"receiving":N,"completed":bt,"aborted":N,"failed":bt,"timeout":bt},statics:{__seqNum:0,methodAllowsRequestBody:function(h){return (h==bs)||(h==bm);
}},properties:{url:{check:L,init:ba},method:{check:[bp,bs,bm,Y,bi],apply:bj,init:bp},asynchronous:{check:O,init:true},data:{check:L,nullable:true},username:{check:L,nullable:true},password:{check:L,nullable:true},state:{check:[br,M,K,J,F,I,bq,H],init:br,apply:be,event:bg},responseType:{check:[W,bd,U,T,R],init:W,apply:bb},timeout:{check:Q,nullable:true},prohibitCaching:{check:function(v){return typeof v==bh||v===bn;
},init:true,apply:bf},crossDomain:{check:O,init:false},fileUpload:{check:O,init:false},transport:{check:P,nullable:true},useBasicHttpAuth:{check:O,init:false},parseJson:{check:O,init:true}},members:{__requestHeaders:null,__urlParameters:null,__dataParameters:null,__formFields:null,__seqNum:null,send:function(){qx.io.remote.RequestQueue.getInstance().add(this);
},abort:function(){qx.io.remote.RequestQueue.getInstance().abort(this);
},reset:function(){switch(this.getState()){case K:case J:this.error("Aborting already sent request!");
case M:this.abort();
break;
}},isConfigured:function(){return this.getState()===br;
},isQueued:function(){return this.getState()===M;
},isSending:function(){return this.getState()===K;
},isReceiving:function(){return this.getState()===J;
},isCompleted:function(){return this.getState()===F;
},isAborted:function(){return this.getState()===I;
},isTimeout:function(){return this.getState()===bq;
},isFailed:function(){return this.getState()===H;
},__forwardEvent:function(e){var bu=e.clone();
bu.setTarget(this);
this.dispatchEvent(bu);
},_onqueued:function(e){this.setState(M);
this.__forwardEvent(e);
},_onsending:function(e){this.setState(K);
this.__forwardEvent(e);
},_onreceiving:function(e){this.setState(J);
this.__forwardEvent(e);
},_oncompleted:function(e){this.setState(F);
this.__forwardEvent(e);
this.dispose();
},_onaborted:function(e){this.setState(I);
this.__forwardEvent(e);
this.dispose();
},_ontimeout:function(e){this.setState(bq);
this.__forwardEvent(e);
this.dispose();
},_onfailed:function(e){this.setState(H);
this.__forwardEvent(e);
this.dispose();
},_applyState:function(w,x){{};
},_applyProhibitCaching:function(o,p){if(!o){this.removeParameter(G);
this.removeRequestHeader(bo);
this.removeRequestHeader(bk);
return;
}if(o!==bn||this.getMethod()!=bs){this.setParameter(G,new Date().valueOf());
}else{this.removeParameter(G);
}this.setRequestHeader(bo,bl);
this.setRequestHeader(bk,bl);
},_applyMethod:function(C,D){if(qx.io.remote.Request.methodAllowsRequestBody(C)){this.setRequestHeader(V,S);
}else{this.removeRequestHeader(V);
}var E=this.getProhibitCaching();
this._applyProhibitCaching(E,E);
},_applyResponseType:function(f,g){this.setRequestHeader(X,f);
},setRequestHeader:function(m,n){this.__requestHeaders[m]=n;
},removeRequestHeader:function(y){delete this.__requestHeaders[y];
},getRequestHeader:function(c){return this.__requestHeaders[c]||null;
},getRequestHeaders:function(){return this.__requestHeaders;
},setParameter:function(i,j,k){if(k){this.__dataParameters[i]=j;
}else{this.__urlParameters[i]=j;
}},removeParameter:function(q,r){if(r){delete this.__dataParameters[q];
}else{delete this.__urlParameters[q];
}},getParameter:function(t,u){if(u){return this.__dataParameters[t]||null;
}else{return this.__urlParameters[t]||null;
}},getParameters:function(s){return (s?this.__dataParameters:this.__urlParameters);
},setFormField:function(a,b){this.__formFields[a]=b;
},removeFormField:function(l){delete this.__formFields[l];
},getFormField:function(d){return this.__formFields[d]||null;
},getFormFields:function(){return this.__formFields;
},getSequenceNumber:function(){return this.__seqNum;
}},destruct:function(){this.setTransport(null);
this.__requestHeaders=this.__urlParameters=this.__dataParameters=this.__formFields=null;
}});
})();
(function(){var b=".",a="qx.bom.client.Transport";
qx.Class.define(a,{statics:{getMaxConcurrentRequestCount:function(){var h;
var c=qx.bom.client.Engine;
var g=c.FULLVERSION.split(b);
var e=0;
var d=0;
var f=0;
if(g[0]){e=g[0];
}if(g[1]){d=g[1];
}if(g[2]){f=g[2];
}if(window.maxConnectionsPerServer){h=window.maxConnectionsPerServer;
}else if(c.OPERA){h=8;
}else if(c.WEBKIT){h=4;
}else if(c.GECKO&&((e>1)||((e==1)&&(d>9))||((e==1)&&(d==9)&&(f>=1)))){h=6;
}else{h=2;
}return h;
}}});
})();
(function(){var s="Integer",r="aborted",q="_onaborted",p="_on",o="_applyEnabled",n="Boolean",m="__timer",l="sending",k="interval",j="failed",c="qx.io.remote.RequestQueue",h="timeout",g="completed",b="queued",a="__active",f="receiving",d="singleton";
qx.Class.define(c,{type:d,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__queue=[];
this.__active=[];
this.__totalRequests=0;
this.__timer=new qx.event.Timer(500);
this.__timer.addListener(k,this._oninterval,this);
},properties:{enabled:{init:true,check:n,apply:o},maxTotalRequests:{check:s,nullable:true},maxConcurrentRequests:{check:s,init:qx.bom.client.Transport.getMaxConcurrentRequestCount()},defaultTimeout:{check:s,init:5000}},members:{__queue:null,__active:null,__totalRequests:null,__timer:null,getRequestQueue:function(){return this.__queue;
},getActiveQueue:function(){return this.__active;
},_debug:function(){var D;
{};
},_check:function(){this._debug();
if(this.__active.length==0&&this.__queue.length==0){this.__timer.stop();
}if(!this.getEnabled()){return;
}if(this.__queue.length==0||(this.__queue[0].isAsynchronous()&&this.__active.length>=this.getMaxConcurrentRequests())){return;
}if(this.getMaxTotalRequests()!=null&&this.__totalRequests>=this.getMaxTotalRequests()){return;
}var v=this.__queue.shift();
var w=new qx.io.remote.Exchange(v);
this.__totalRequests++;
this.__active.push(w);
this._debug();
w.addListener(l,this._onsending,this);
w.addListener(f,this._onreceiving,this);
w.addListener(g,this._oncompleted,this);
w.addListener(r,this._oncompleted,this);
w.addListener(h,this._oncompleted,this);
w.addListener(j,this._oncompleted,this);
w._start=(new Date).valueOf();
w.send();
if(this.__queue.length>0){this._check();
}},_remove:function(N){qx.lang.Array.remove(this.__active,N);
N.dispose();
this._check();
},__activeCount:0,_onsending:function(e){{};
e.getTarget().getRequest()._onsending(e);
},_onreceiving:function(e){e.getTarget().getRequest()._onreceiving(e);
},_oncompleted:function(e){{};
var z=e.getTarget().getRequest();
var y=p+e.getType();
try{if(z[y]){z[y](e);
}}catch(L){var x=qx.dev.StackTrace.getStackTraceFromError(L);
this.error("Request "+z+" handler "+y+" threw an error: "+L+"\nStack Trace:\n"+x);
try{if(z[q]){var event=qx.event.Registration.createEvent(r,qx.event.type.Event);
z[q](event);
}}catch(M){}}finally{this._remove(e.getTarget());
}},_oninterval:function(e){var K=this.__active;

if(K.length==0){this.__timer.stop();
return;
}var F=(new Date).valueOf();
var I;
var G;
var J=this.getDefaultTimeout();
var H;
var E;

for(var i=K.length-1;i>=0;i--){I=K[i];
G=I.getRequest();

if(G.isAsynchronous()){H=G.getTimeout();
if(H==0){continue;
}
if(H==null){H=J;
}E=F-I._start;

if(E>H){this.warn("Timeout: transport "+I.toHashCode());
this.warn(E+"ms > "+H+"ms");
I.timeout();
}}}},_applyEnabled:function(B,C){if(B){this._check();
}this.__timer.setEnabled(B);
},add:function(A){A.setState(b);

if(A.isAsynchronous()){this.__queue.push(A);
}else{this.__queue.unshift(A);
}this._check();

if(this.getEnabled()){this.__timer.start();
}},abort:function(t){var u=t.getTransport();

if(u){u.abort();
}else if(qx.lang.Array.contains(this.__queue,t)){qx.lang.Array.remove(this.__queue,t);
}}},destruct:function(){this._disposeArray(a);
this._disposeObjects(m);
this.__queue=null;
}});
})();
(function(){var Y="failed",X="sending",W="completed",V="receiving",U="aborted",T="timeout",S="qx.event.type.Event",R="Connection dropped",Q="qx.io.remote.Response",P="configured",ca="Unknown status code. ",bY="=",bX="qx.io.remote.transport.XmlHttp",bW="qx.io.remote.transport.Abstract",bV="Request-URL too large",bU="MSHTML-specific HTTP status code",bT="Not available",bS="Precondition failed",bR="Server error",bQ="Moved temporarily",bg="&",bh="qx.io.remote.Exchange",be="Possibly due to a cross-domain request?",bf="Bad gateway",bc="Gone",bd="See other",ba="Partial content",bb="Server timeout",bm="qx.io.remote.transport.Script",bn="HTTP version not supported",bw="Unauthorized",bt="Possibly due to application URL using 'file:' protocol?",bE="Multiple choices",bz="Payment required",bM="Not implemented",bJ="Proxy authentication required",bp="Length required",bP="_applyState",bO="changeState",bN="Not modified",bo="qx.io.remote.Request",br="Connection closed by server",bs="Moved permanently",bv="_applyImplementation",bx="Method not allowed",bA="Forbidden",bG="Use proxy",bL="Ok",bi="Conflict",bj="Not found",bq="Not acceptable",bD="Request time-out",bC="Bad request",bB="No content",bI="file:",bH="qx.io.remote.transport.Iframe",by="Request entity too large",bF="Unknown status code",O="Unsupported media type",bK="Gateway time-out",bk="created",bl="Out of resources",bu="undefined";
qx.Class.define(bh,{extend:qx.core.Object,construct:function(cb){qx.core.Object.call(this);
this.setRequest(cb);
cb.setTransport(this);
},events:{"sending":S,"receiving":S,"completed":Q,"aborted":S,"failed":Q,"timeout":Q},statics:{typesOrder:[bX,bH,bm],typesReady:false,typesAvailable:{},typesSupported:{},registerType:function(L,M){qx.io.remote.Exchange.typesAvailable[M]=L;
},initTypes:function(){if(qx.io.remote.Exchange.typesReady){return;
}
for(var H in qx.io.remote.Exchange.typesAvailable){var G=qx.io.remote.Exchange.typesAvailable[H];

if(G.isSupported()){qx.io.remote.Exchange.typesSupported[H]=G;
}}qx.io.remote.Exchange.typesReady=true;

if(qx.lang.Object.isEmpty(qx.io.remote.Exchange.typesSupported)){throw new Error("No supported transport types were found!");
}},canHandle:function(w,x,y){if(!qx.lang.Array.contains(w.handles.responseTypes,y)){return false;
}
for(var z in x){if(!w.handles[z]){return false;
}}return true;
},_nativeMap:{0:bk,1:P,2:X,3:V,4:W},wasSuccessful:function(I,J,K){if(K){switch(I){case null:case 0:return true;
case -1:return J<4;
default:return typeof I===bu;
}}else{switch(I){case -1:{};
return J<4;
case 200:case 304:return true;
case 201:case 202:case 203:case 204:case 205:return true;
case 206:{};
return J!==4;
case 300:case 301:case 302:case 303:case 305:case 400:case 401:case 402:case 403:case 404:case 405:case 406:case 407:case 408:case 409:case 410:case 411:case 412:case 413:case 414:case 415:case 500:case 501:case 502:case 503:case 504:case 505:{};
return false;
case 12002:case 12007:case 12029:case 12030:case 12031:case 12152:case 13030:{};
return false;
default:if(I>206&&I<300){return true;
}qx.log.Logger.debug(this,"Unknown status code: "+I+" ("+J+")");
return false;
}}},statusCodeToString:function(a){switch(a){case -1:return bT;
case 0:var b=window.location.href;
if(qx.lang.String.startsWith(b.toLowerCase(),bI)){return (ca+bt);
}else{return (ca+be);
}break;
case 200:return bL;
case 304:return bN;
case 206:return ba;
case 204:return bB;
case 300:return bE;
case 301:return bs;
case 302:return bQ;
case 303:return bd;
case 305:return bG;
case 400:return bC;
case 401:return bw;
case 402:return bz;
case 403:return bA;
case 404:return bj;
case 405:return bx;
case 406:return bq;
case 407:return bJ;
case 408:return bD;
case 409:return bi;
case 410:return bc;
case 411:return bp;
case 412:return bS;
case 413:return by;
case 414:return bV;
case 415:return O;
case 500:return bR;
case 501:return bM;
case 502:return bf;
case 503:return bl;
case 504:return bK;
case 505:return bn;
case 12002:return bb;
case 12029:return R;
case 12030:return R;
case 12031:return R;
case 12152:return br;
case 13030:return bU;
default:return bF;
}}},properties:{request:{check:bo,nullable:true},implementation:{check:bW,nullable:true,apply:bv},state:{check:[P,X,V,W,U,T,Y],init:P,event:bO,apply:bP}},members:{send:function(){var h=this.getRequest();

if(!h){return this.error("Please attach a request object first");
}qx.io.remote.Exchange.initTypes();
var f=qx.io.remote.Exchange.typesOrder;
var d=qx.io.remote.Exchange.typesSupported;
var k=h.getResponseType();
var m={};

if(h.getAsynchronous()){m.asynchronous=true;
}else{m.synchronous=true;
}
if(h.getCrossDomain()){m.crossDomain=true;
}
if(h.getFileUpload()){m.fileUpload=true;
}for(var j in h.getFormFields()){m.programaticFormFields=true;
break;
}var n,g;

for(var i=0,l=f.length;i<l;i++){n=d[f[i]];

if(n){if(!qx.io.remote.Exchange.canHandle(n,m,k)){continue;
}
try{{};
g=new n;
this.setImplementation(g);
g.setUseBasicHttpAuth(h.getUseBasicHttpAuth());
g.send();
return true;
}catch(N){this.error("Request handler throws error");
this.error(N);
return;
}}}this.error("There is no transport implementation available to handle this request: "+h);
},abort:function(){var A=this.getImplementation();

if(A){{};
A.abort();
}else{{};
this.setState(U);
}},timeout:function(){var cd=this.getImplementation();

if(cd){this.warn("Timeout: implementation "+cd.toHashCode());
cd.timeout();
}else{this.warn("Timeout: forcing state to timeout");
this.setState(T);
}this.__disableRequestTimeout();
},__disableRequestTimeout:function(){var cc=this.getRequest();

if(cc){cc.setTimeout(0);
}},_onsending:function(e){this.setState(X);
},_onreceiving:function(e){this.setState(V);
},_oncompleted:function(e){this.setState(W);
},_onabort:function(e){this.setState(U);
},_onfailed:function(e){this.setState(Y);
},_ontimeout:function(e){this.setState(T);
},_applyImplementation:function(o,p){if(p){p.removeListener(X,this._onsending,this);
p.removeListener(V,this._onreceiving,this);
p.removeListener(W,this._oncompleted,this);
p.removeListener(U,this._onabort,this);
p.removeListener(T,this._ontimeout,this);
p.removeListener(Y,this._onfailed,this);
}
if(o){var r=this.getRequest();
o.setUrl(r.getUrl());
o.setMethod(r.getMethod());
o.setAsynchronous(r.getAsynchronous());
o.setUsername(r.getUsername());
o.setPassword(r.getPassword());
o.setParameters(r.getParameters(false));
o.setFormFields(r.getFormFields());
o.setRequestHeaders(r.getRequestHeaders());
if(o instanceof qx.io.remote.transport.XmlHttp){o.setParseJson(r.getParseJson());
}var u=r.getData();

if(u===null){var v=r.getParameters(true);
var t=[];

for(var q in v){var s=v[q];

if(s instanceof Array){for(var i=0;i<s.length;i++){t.push(encodeURIComponent(q)+bY+encodeURIComponent(s[i]));
}}else{t.push(encodeURIComponent(q)+bY+encodeURIComponent(s));
}}
if(t.length>0){o.setData(t.join(bg));
}}else{o.setData(u);
}o.setResponseType(r.getResponseType());
o.addListener(X,this._onsending,this);
o.addListener(V,this._onreceiving,this);
o.addListener(W,this._oncompleted,this);
o.addListener(U,this._onabort,this);
o.addListener(T,this._ontimeout,this);
o.addListener(Y,this._onfailed,this);
}},_applyState:function(B,C){{};

switch(B){case X:this.fireEvent(X);
break;
case V:this.fireEvent(V);
break;
case W:case U:case T:case Y:var E=this.getImplementation();

if(!E){break;
}this.__disableRequestTimeout();

if(this.hasListener(B)){var F=qx.event.Registration.createEvent(B,qx.io.remote.Response);

if(B==W){var D=E.getResponseContent();
F.setContent(D);
if(D===null){{};
B=Y;
}}else if(B==Y){F.setContent(E.getResponseContent());
}F.setStatusCode(E.getStatusCode());
F.setResponseHeaders(E.getResponseHeaders());
this.dispatchEvent(F);
}this.setImplementation(null);
E.dispose();
break;
}}},settings:{"qx.ioRemoteDebug":false,"qx.ioRemoteDebugData":false},destruct:function(){var c=this.getImplementation();

if(c){this.setImplementation(null);
c.dispose();
}this.setRequest(null);
}});
})();
(function(){var q="qx.event.type.Event",p="String",o="failed",n="timeout",m="created",l="aborted",k="sending",j="configured",i="receiving",h="completed",c="Object",g="Boolean",f="abstract",b="_applyState",a="GET",e="changeState",d="qx.io.remote.transport.Abstract";
qx.Class.define(d,{type:f,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.setRequestHeaders({});
this.setParameters({});
this.setFormFields({});
},events:{"created":q,"configured":q,"sending":q,"receiving":q,"completed":q,"aborted":q,"failed":q,"timeout":q},properties:{url:{check:p,nullable:true},method:{check:p,nullable:true,init:a},asynchronous:{check:g,nullable:true,init:true},data:{check:p,nullable:true},username:{check:p,nullable:true},password:{check:p,nullable:true},state:{check:[m,j,k,i,h,l,n,o],init:m,event:e,apply:b},requestHeaders:{check:c,nullable:true},parameters:{check:c,nullable:true},formFields:{check:c,nullable:true},responseType:{check:p,nullable:true},useBasicHttpAuth:{check:g,nullable:true}},members:{send:function(){throw new Error("send is abstract");
},abort:function(){{};
this.setState(l);
},timeout:function(){{};
this.setState(n);
},failed:function(){{};
this.setState(o);
},setRequestHeader:function(u,v){throw new Error("setRequestHeader is abstract");
},getResponseHeader:function(t){throw new Error("getResponseHeader is abstract");
},getResponseHeaders:function(){throw new Error("getResponseHeaders is abstract");
},getStatusCode:function(){throw new Error("getStatusCode is abstract");
},getStatusText:function(){throw new Error("getStatusText is abstract");
},getResponseText:function(){throw new Error("getResponseText is abstract");
},getResponseXml:function(){throw new Error("getResponseXml is abstract");
},getFetchedLength:function(){throw new Error("getFetchedLength is abstract");
},_applyState:function(r,s){{};

switch(r){case m:this.fireEvent(m);
break;
case j:this.fireEvent(j);
break;
case k:this.fireEvent(k);
break;
case i:this.fireEvent(i);
break;
case h:this.fireEvent(h);
break;
case l:this.fireEvent(l);
break;
case o:this.fireEvent(o);
break;
case n:this.fireEvent(n);
break;
}return true;
}},destruct:function(){this.setRequestHeaders(null);
this.setParameters(null);
this.setFormFields(null);
}});
})();
(function(){var n="=",m="&",l="application/xml",k="application/json",j="text/html",h="qx.client",g="textarea",f="none",d="text/plain",c="text/javascript",H="",G="completed",F="?",E="qx.io.remote.transport.Iframe",D="gecko",C="frame_",B="aborted",A="_data_",z="pre",y="javascript:void(0)",u="sending",v="form",s="failed",t='<iframe name="',q="mshtml",r="form_",o='"></iframe>',p="iframe",w="timeout",x="qx/static/blank.gif";
qx.Class.define(E,{extend:qx.io.remote.transport.Abstract,construct:function(){qx.io.remote.transport.Abstract.call(this);
var J=(new Date).valueOf();
var K=C+J;
var L=r+J;
if(qx.core.Variant.isSet(h,q)){this.__frame=document.createElement(t+K+o);
}else{this.__frame=document.createElement(p);
}this.__frame.src=y;
this.__frame.id=this.__frame.name=K;
this.__frame.onload=qx.lang.Function.bind(this._onload,this);
this.__frame.style.display=f;
document.body.appendChild(this.__frame);
this.__form=document.createElement(v);
this.__form.target=K;
this.__form.id=this.__form.name=L;
this.__form.style.display=f;
document.body.appendChild(this.__form);
this.__data=document.createElement(g);
this.__data.id=this.__data.name=A;
this.__form.appendChild(this.__data);
this.__frame.onreadystatechange=qx.lang.Function.bind(this._onreadystatechange,this);
},statics:{handles:{synchronous:false,asynchronous:true,crossDomain:false,fileUpload:true,programaticFormFields:true,responseTypes:[d,c,k,l,j]},isSupported:function(){return true;
},_numericMap:{"uninitialized":1,"loading":2,"loaded":2,"interactive":3,"complete":4}},members:{__data:null,__lastReadyState:0,__form:null,__frame:null,send:function(){var P=this.getMethod();
var R=this.getUrl();
var V=this.getParameters(false);
var U=[];

for(var Q in V){var S=V[Q];

if(S instanceof Array){for(var i=0;i<S.length;i++){U.push(encodeURIComponent(Q)+n+encodeURIComponent(S[i]));
}}else{U.push(encodeURIComponent(Q)+n+encodeURIComponent(S));
}}
if(U.length>0){R+=(R.indexOf(F)>=0?m:F)+U.join(m);
}if(this.getData()===null){var V=this.getParameters(true);
var U=[];

for(var Q in V){var S=V[Q];

if(S instanceof Array){for(var i=0;i<S.length;i++){U.push(encodeURIComponent(Q)+n+encodeURIComponent(S[i]));
}}else{U.push(encodeURIComponent(Q)+n+encodeURIComponent(S));
}}
if(U.length>0){this.setData(U.join(m));
}}var O=this.getFormFields();

for(var Q in O){var T=document.createElement(g);
T.name=Q;
T.appendChild(document.createTextNode(O[Q]));
this.__form.appendChild(T);
}this.__form.action=R;
this.__form.method=P;
this.__data.appendChild(document.createTextNode(this.getData()));
this.__form.submit();
this.setState(u);
},_onload:qx.event.GlobalError.observeMethod(function(e){if(this.__form.src){return;
}this._switchReadyState(qx.io.remote.transport.Iframe._numericMap.complete);
}),_onreadystatechange:qx.event.GlobalError.observeMethod(function(e){this._switchReadyState(qx.io.remote.transport.Iframe._numericMap[this.__frame.readyState]);
}),_switchReadyState:function(M){switch(this.getState()){case G:case B:case s:case w:this.warn("Ignore Ready State Change");
return;
}while(this.__lastReadyState<M){this.setState(qx.io.remote.Exchange._nativeMap[++this.__lastReadyState]);
}},setRequestHeader:function(W,X){},getResponseHeader:function(I){return null;
},getResponseHeaders:function(){return {};
},getStatusCode:function(){return 200;
},getStatusText:function(){return H;
},getIframeWindow:function(){return qx.bom.Iframe.getWindow(this.__frame);
},getIframeDocument:function(){return qx.bom.Iframe.getDocument(this.__frame);
},getIframeBody:function(){return qx.bom.Iframe.getBody(this.__frame);
},getIframeTextContent:function(){var b=this.getIframeBody();

if(!b){return null;
}
if(!b.firstChild){return H;
}if(b.firstChild.tagName&&b.firstChild.tagName.toLowerCase()==z){return b.firstChild.innerHTML;
}else{return b.innerHTML;
}},getIframeHtmlContent:function(){var N=this.getIframeBody();
return N?N.innerHTML:null;
},getFetchedLength:function(){return 0;
},getResponseContent:function(){if(this.getState()!==G){{};
return null;
}{};
var Y=this.getIframeTextContent();

switch(this.getResponseType()){case d:{};
return Y;
break;
case j:Y=this.getIframeHtmlContent();
{};
return Y;
break;
case k:Y=this.getIframeHtmlContent();
{};

try{return Y&&Y.length>0?qx.util.Json.parse(Y,false):null;
}catch(a){return this.error("Could not execute json: ("+Y+")",a);
}case c:Y=this.getIframeHtmlContent();
{};

try{return Y&&Y.length>0?window.eval(Y):null;
}catch(ba){return this.error("Could not execute javascript: ("+Y+")",ba);
}case l:Y=this.getIframeDocument();
{};
return Y;
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}}},defer:function(){qx.io.remote.Exchange.registerType(qx.io.remote.transport.Iframe,E);
},destruct:function(){if(this.__frame){this.__frame.onload=null;
this.__frame.onreadystatechange=null;
if(qx.core.Variant.isSet(h,D)){this.__frame.src=qx.util.ResourceManager.getInstance().toUri(x);
}document.body.removeChild(this.__frame);
}
if(this.__form){document.body.removeChild(this.__form);
}this.__frame=this.__form=this.__data=null;
}});
})();
(function(){var n=",",m="",k="string",j="null",h="new Date(Date.UTC(",g='"',f="))",e=':',d="qx.jsonDebugging",c='-',O='\\u00',N="__convertObject",M="__convertUndefined",L="__convertFunction",K='\\\\',J="__convertBoolean",I='\\f',H='\\"',G='Z',F='T',u="}",v='(',s='.',t="{",q='\\r',r=":",o='\\t',p="__convertNumber",w="The default returned parsed date format will change. Use the CONVERT_DATES flag to change the behavior.",x="]",A="[",z="qx.jsonEncodeUndefined",C='\\b',B="qx.util.Json",E=')',D='\\n',y="__convertString";
qx.Class.define(B,{statics:{__nativeDateToJSON:null,BEAUTIFYING_INDENT:"  ",BEAUTIFYING_LINE_END:"\n",CONVERT_DATES:null,__map:{"function":L,"boolean":J,"number":p,"string":y,"object":N,"undefined":M},__convertFunction:function(bh,bi){return String(bh);
},__convertBoolean:function(X,Y){return String(X);
},__convertNumber:function(bx,by){return isFinite(bx)?String(bx):j;
},__convertString:function(bE,bF){var bG;

if(/["\\\x00-\x1f]/.test(bE)){bG=bE.replace(/([\x00-\x1f\\"])/g,qx.util.Json.__convertStringHelper);
}else{bG=bE;
}return g+bG+g;
},__convertStringEscape:{'\b':C,'\t':o,'\n':D,'\f':I,'\r':q,'"':H,'\\':K},__convertStringHelper:function(a,b){var P=qx.util.Json.__convertStringEscape[b];

if(P){return P;
}P=b.charCodeAt();
return O+Math.floor(P/16).toString(16)+(P%16).toString(16);
},__convertArray:function(Q,R){var T=[],W=true,V,S;
var U=qx.util.Json.__beautify;
T.push(A);

if(U){qx.util.Json.__indent+=qx.util.Json.BEAUTIFYING_INDENT;
T.push(qx.util.Json.__indent);
}
for(var i=0,l=Q.length;i<l;i++){S=Q[i];
V=this.__map[typeof S];

if(V){S=this[V](S,i+m);

if(typeof S==k){if(!W){T.push(n);

if(U){T.push(qx.util.Json.__indent);
}}T.push(S);
W=false;
}}}
if(U){qx.util.Json.__indent=qx.util.Json.__indent.substring(0,qx.util.Json.__indent.length-qx.util.Json.BEAUTIFYING_INDENT.length);
T.push(qx.util.Json.__indent);
}T.push(x);
return T.join(m);
},__convertDate:function(bz,bA){if(qx.util.Json.CONVERT_DATES===null){qx.log.Logger.deprecatedMethodWarning(arguments.callee,w);
var bC=bz.getUTCFullYear()+n+bz.getUTCMonth()+n+bz.getUTCDate()+n+bz.getUTCHours()+n+bz.getUTCMinutes()+n+bz.getUTCSeconds()+n+bz.getUTCMilliseconds();
return h+bC+f;
}else if(!qx.util.Json.CONVERT_DATES){if(bz.toJSON){return bz.toJSON();
}var bB=qx.util.format.NumberFormat.getInstance();
bB.setMinimumIntegerDigits(2);
var bD=bz.getUTCFullYear()+c+bB.format(bz.getUTCMonth()+1)+c+bB.format(bz.getUTCDate())+F+bB.format(bz.getUTCHours())+e+bB.format(bz.getUTCMinutes())+e+bB.format(bz.getUTCSeconds())+s;
bB.setMinimumIntegerDigits(3);
return bD+bB.format(bz.getUTCMilliseconds())+G;
}else{var bC=bz.getUTCFullYear()+n+bz.getUTCMonth()+n+bz.getUTCDate()+n+bz.getUTCHours()+n+bz.getUTCMinutes()+n+bz.getUTCSeconds()+n+bz.getUTCMilliseconds();
return h+bC+f;
}},__convertMap:function(bl,bm){var bp=[],br=true,bo,bn;
var bq=qx.util.Json.__beautify;
bp.push(t);

if(bq){qx.util.Json.__indent+=qx.util.Json.BEAUTIFYING_INDENT;
bp.push(qx.util.Json.__indent);
}
for(var bm in bl){bn=bl[bm];
bo=this.__map[typeof bn];

if(bo){bn=this[bo](bn,bm);

if(typeof bn==k){if(!br){bp.push(n);

if(bq){bp.push(qx.util.Json.__indent);
}}bp.push(this.__convertString(bm),r,bn);
br=false;
}}}
if(bq){qx.util.Json.__indent=qx.util.Json.__indent.substring(0,qx.util.Json.__indent.length-qx.util.Json.BEAUTIFYING_INDENT.length);
bp.push(qx.util.Json.__indent);
}bp.push(u);
return bp.join(m);
},__convertObject:function(bj,bk){if(bj){if(qx.lang.Type.isFunction(bj.toJSON)&&bj.toJSON!==this.__nativeDateToJSON){return this.__convert(bj.toJSON(bk),bk);
}else if(qx.lang.Type.isDate(bj)){return this.__convertDate(bj,bk);
}else if(qx.lang.Type.isArray(bj)){return this.__convertArray(bj,bk);
}else if(qx.lang.Type.isObject(bj)){return this.__convertMap(bj,bk);
}return m;
}return j;
},__convertUndefined:function(bu,bv){if(qx.core.Setting.get(z)){return j;
}},__convert:function(bs,bt){return this[this.__map[typeof bs]](bs,bt);
},stringify:function(ba,bb){this.__beautify=bb;
this.__indent=this.BEAUTIFYING_LINE_END;
var bc=this.__convert(ba,m);

if(typeof bc!=k){bc=null;
}if(qx.core.Setting.get(d)){qx.log.Logger.debug(this,"JSON request: "+bc);
}return bc;
},parse:function(be,bf){if(bf===undefined){bf=true;
}
if(qx.core.Setting.get(d)){qx.log.Logger.debug(this,"JSON response: "+be);
}
if(bf){if(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(be.replace(/"(\\.|[^"\\])*"/g,m))){throw new Error("Could not parse JSON string!");
}}
try{var bg=(be&&be.length>0)?eval(v+be+E):null;
return bg;
}catch(bd){throw new Error("Could not evaluate JSON string: "+bd.message);
}}},settings:{"qx.jsonEncodeUndefined":true,"qx.jsonDebugging":false},defer:function(bw){bw.__nativeDateToJSON=Date.prototype.toJSON;
}});
})();
(function(){var a="qx.util.format.IFormat";
qx.Interface.define(a,{members:{format:function(c){},parse:function(b){}}});
})();
(function(){var t="",s="Number",r="-",q="0",p="String",o="changeNumberFormat",n='(',m="g",l="Boolean",k="$",d="NaN",j='([0-9]{1,3}(?:',g='{0,1}[0-9]{3}){0,})',c='\\d+){0,1}',b="qx.util.format.NumberFormat",f="Infinity",e="^",h=".",a="-Infinity",i='([-+]){0,1}';
qx.Class.define(b,{extend:qx.core.Object,implement:qx.util.format.IFormat,construct:function(P){qx.core.Object.call(this);
this.__locale=P;
},statics:{getIntegerInstance:function(){var Q=qx.util.format.NumberFormat;

if(Q._integerInstance==null){Q._integerInstance=new Q();
Q._integerInstance.setMaximumFractionDigits(0);
}return Q._integerInstance;
},getInstance:function(){if(!this._instance){this._instance=new this;
}return this._instance;
}},properties:{minimumIntegerDigits:{check:s,init:0},maximumIntegerDigits:{check:s,nullable:true},minimumFractionDigits:{check:s,init:0},maximumFractionDigits:{check:s,nullable:true},groupingUsed:{check:l,init:true},prefix:{check:p,init:t,event:o},postfix:{check:p,init:t,event:o}},members:{__locale:null,format:function(D){switch(D){case Infinity:return f;
case -Infinity:return a;
case NaN:return d;
}var H=(D<0);

if(H){D=-D;
}
if(this.getMaximumFractionDigits()!=null){var O=Math.pow(10,this.getMaximumFractionDigits());
D=Math.round(D*O)/O;
}var N=String(Math.floor(D)).length;
var E=t+D;
var K=E.substring(0,N);

while(K.length<this.getMinimumIntegerDigits()){K=q+K;
}
if(this.getMaximumIntegerDigits()!=null&&K.length>this.getMaximumIntegerDigits()){K=K.substring(K.length-this.getMaximumIntegerDigits());
}var J=E.substring(N+1);

while(J.length<this.getMinimumFractionDigits()){J+=q;
}
if(this.getMaximumFractionDigits()!=null&&J.length>this.getMaximumFractionDigits()){J=J.substring(0,this.getMaximumFractionDigits());
}if(this.getGroupingUsed()){var G=K;
K=t;
var M;

for(M=G.length;M>3;M-=3){K=t+qx.locale.Number.getGroupSeparator(this.__locale)+G.substring(M-3,M)+K;
}K=G.substring(0,M)+K;
}var I=this.getPrefix()?this.getPrefix():t;
var F=this.getPostfix()?this.getPostfix():t;
var L=I+(H?r:t)+K;

if(J.length>0){L+=t+qx.locale.Number.getDecimalSeparator(this.__locale)+J;
}L+=F;
return L;
},parse:function(u){var z=qx.lang.String.escapeRegexpChars(qx.locale.Number.getGroupSeparator(this.__locale)+t);
var x=qx.lang.String.escapeRegexpChars(qx.locale.Number.getDecimalSeparator(this.__locale)+t);
var v=new RegExp(e+qx.lang.String.escapeRegexpChars(this.getPrefix())+i+j+z+g+n+x+c+qx.lang.String.escapeRegexpChars(this.getPostfix())+k);
var y=v.exec(u);

if(y==null){throw new Error("Number string '"+u+"' does not match the number format");
}var A=(y[1]==r);
var C=y[2];
var B=y[3];
C=C.replace(new RegExp(z,m),t);
var w=(A?r:t)+C;

if(B!=null&&B.length!=0){B=B.replace(new RegExp(x),t);
w+=h+B;
}return parseFloat(w);
}}});
})();
(function(){var d="cldr_number_decimal_separator",c="cldr_number_percent_format",b="qx.locale.Number",a="cldr_number_group_separator";
qx.Class.define(b,{statics:{getDecimalSeparator:function(e){return qx.locale.Manager.getInstance().localize(d,[],e);
},getGroupSeparator:function(f){return qx.locale.Manager.getInstance().localize(a,[],f);
},getPercentFormat:function(g){return qx.locale.Manager.getInstance().localize(c,[],g);
}}});
})();
(function(){var r="&",q="=",p="?",o="application/json",n="completed",m="text/plain",l="text/javascript",k="qx.io.remote.transport.Script",j="",h="_ScriptTransport_data",c="script",g="timeout",f="_ScriptTransport_",b="_ScriptTransport_id",a="aborted",e="utf-8",d="failed";
qx.Class.define(k,{extend:qx.io.remote.transport.Abstract,construct:function(){qx.io.remote.transport.Abstract.call(this);
var s=++qx.io.remote.transport.Script.__uniqueId;

if(s>=2000000000){qx.io.remote.transport.Script.__uniqueId=s=1;
}this.__element=null;
this.__uniqueId=s;
},statics:{__uniqueId:0,_instanceRegistry:{},ScriptTransport_PREFIX:f,ScriptTransport_ID_PARAM:b,ScriptTransport_DATA_PARAM:h,handles:{synchronous:false,asynchronous:true,crossDomain:true,fileUpload:false,programaticFormFields:false,responseTypes:[m,l,o]},isSupported:function(){return true;
},_numericMap:{"uninitialized":1,"loading":2,"loaded":2,"interactive":3,"complete":4},_requestFinished:qx.event.GlobalError.observeMethod(function(y,content){var z=qx.io.remote.transport.Script._instanceRegistry[y];

if(z==null){{};
}else{z._responseContent=content;
z._switchReadyState(qx.io.remote.transport.Script._numericMap.complete);
}})},members:{__lastReadyState:0,__element:null,__uniqueId:null,send:function(){var C=this.getUrl();
C+=(C.indexOf(p)>=0?r:p)+qx.io.remote.transport.Script.ScriptTransport_ID_PARAM+q+this.__uniqueId;
var F=this.getParameters();
var E=[];

for(var B in F){if(B.indexOf(qx.io.remote.transport.Script.ScriptTransport_PREFIX)==0){this.error("Illegal parameter name. The following prefix is used internally by qooxdoo): "+qx.io.remote.transport.Script.ScriptTransport_PREFIX);
}var D=F[B];

if(D instanceof Array){for(var i=0;i<D.length;i++){E.push(encodeURIComponent(B)+q+encodeURIComponent(D[i]));
}}else{E.push(encodeURIComponent(B)+q+encodeURIComponent(D));
}}
if(E.length>0){C+=r+E.join(r);
}var A=this.getData();

if(A!=null){C+=r+qx.io.remote.transport.Script.ScriptTransport_DATA_PARAM+q+encodeURIComponent(A);
}qx.io.remote.transport.Script._instanceRegistry[this.__uniqueId]=this;
this.__element=document.createElement(c);
this.__element.charset=e;
this.__element.src=C;
{};
document.body.appendChild(this.__element);
},_switchReadyState:function(u){switch(this.getState()){case n:case a:case d:case g:this.warn("Ignore Ready State Change");
return;
}while(this.__lastReadyState<u){this.setState(qx.io.remote.Exchange._nativeMap[++this.__lastReadyState]);
}},setRequestHeader:function(v,w){},getResponseHeader:function(x){return null;
},getResponseHeaders:function(){return {};
},getStatusCode:function(){return 200;
},getStatusText:function(){return j;
},getFetchedLength:function(){return 0;
},getResponseContent:function(){if(this.getState()!==n){{};
return null;
}{};

switch(this.getResponseType()){case m:case o:case l:{};
var t=this._responseContent;
return (t===0?0:(t||null));
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}}},defer:function(){qx.io.remote.Exchange.registerType(qx.io.remote.transport.Script,k);
},destruct:function(){if(this.__element){delete qx.io.remote.transport.Script._instanceRegistry[this.__uniqueId];
document.body.removeChild(this.__element);
}this.__element=this._responseContent=null;
}});
})();
(function(){var T="failed",S="completed",R="=",Q="aborted",P="",O="sending",N="&",M="configured",L="timeout",K="application/xml",bq="qx.io.remote.transport.XmlHttp",bp="application/json",bo="text/html",bn="qx.client",bm="receiving",bl="text/plain",bk="text/javascript",bj="?",bi="created",bh="Boolean",bb='Referer',bc='Basic ',Y="\n</pre>",ba="string",W='Authorization',X="<pre>Could not execute json: \n",U="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",V=':',bd="parseerror",be="file:",bg="webkit",bf="object";
qx.Class.define(bq,{extend:qx.io.remote.transport.Abstract,statics:{handles:{synchronous:true,asynchronous:true,crossDomain:false,fileUpload:false,programaticFormFields:false,responseTypes:[bl,bk,bp,K,bo]},requestObjects:[],requestObjectCount:0,createRequestObject:qx.core.Variant.select(bn,{"default":function(){return new XMLHttpRequest;
},"mshtml":function(){if(window.ActiveXObject&&qx.xml.Document.XMLHTTP){return new ActiveXObject(qx.xml.Document.XMLHTTP);
}
if(window.XMLHttpRequest){return new XMLHttpRequest;
}}}),isSupported:function(){return !!this.createRequestObject();
}},properties:{parseJson:{check:bh,init:true}},members:{__localRequest:false,__lastReadyState:0,__request:null,getRequest:function(){if(this.__request===null){this.__request=qx.io.remote.transport.XmlHttp.createRequestObject();
this.__request.onreadystatechange=qx.lang.Function.bind(this._onreadystatechange,this);
}return this.__request;
},send:function(){this.__lastReadyState=0;
var h=this.getRequest();
var c=this.getMethod();
var m=this.getAsynchronous();
var k=this.getUrl();
var f=(window.location.protocol===be&&!(/^http(s){0,1}\:/.test(k)));
this.__localRequest=f;
var p=this.getParameters(false);
var n=[];

for(var d in p){var j=p[d];

if(j instanceof Array){for(var i=0;i<j.length;i++){n.push(encodeURIComponent(d)+R+encodeURIComponent(j[i]));
}}else{n.push(encodeURIComponent(d)+R+encodeURIComponent(j));
}}
if(n.length>0){k+=(k.indexOf(bj)>=0?N:bj)+n.join(N);
}if(this.getData()===null){var p=this.getParameters(true);
var n=[];

for(var d in p){var j=p[d];

if(j instanceof Array){for(var i=0;i<j.length;i++){n.push(encodeURIComponent(d)+R+encodeURIComponent(j[i]));
}}else{n.push(encodeURIComponent(d)+R+encodeURIComponent(j));
}}
if(n.length>0){this.setData(n.join(N));
}}var o=function(A){var F=U;
var J=P;
var D,C,B;
var G,H,I,E;
var i=0;

do{D=A.charCodeAt(i++);
C=A.charCodeAt(i++);
B=A.charCodeAt(i++);
G=D>>2;
H=((D&3)<<4)|(C>>4);
I=((C&15)<<2)|(B>>6);
E=B&63;

if(isNaN(C)){I=E=64;
}else if(isNaN(B)){E=64;
}J+=F.charAt(G)+F.charAt(H)+F.charAt(I)+F.charAt(E);
}while(i<A.length);
return J;
};
try{if(this.getUsername()){if(this.getUseBasicHttpAuth()){h.open(c,k,m);
h.setRequestHeader(W,bc+o(this.getUsername()+V+this.getPassword()));
}else{h.open(c,k,m,this.getUsername(),this.getPassword());
}}else{h.open(c,k,m);
}}catch(x){this.error("Failed with exception: "+x);
this.failed();
return;
}if(!qx.core.Variant.isSet(bn,bg)){h.setRequestHeader(bb,window.location.href);
}var g=this.getRequestHeaders();

for(var d in g){h.setRequestHeader(d,g[d]);
}try{{};
h.send(this.getData());
}catch(u){if(f){this.failedLocally();
}else{this.error("Failed to send data: "+u,"send");
this.failed();
}return;
}if(!m){this._onreadystatechange();
}},failedLocally:function(){if(this.getState()===T){return;
}this.warn("Could not load from file: "+this.getUrl());
this.failed();
},_onreadystatechange:qx.event.GlobalError.observeMethod(function(e){switch(this.getState()){case S:case Q:case T:case L:{};
return;
}var br=this.getReadyState();

if(br==4){if(!qx.io.remote.Exchange.wasSuccessful(this.getStatusCode(),br,this.__localRequest)){if(this.getState()===M){this.setState(O);
}this.failed();
return;
}}while(this.__lastReadyState<br){this.setState(qx.io.remote.Exchange._nativeMap[++this.__lastReadyState]);
}}),getReadyState:function(){var bD=null;

try{bD=this.getRequest().readyState;
}catch(w){}return bD;
},setRequestHeader:function(bF,bG){this.getRequestHeaders()[bF]=bG;
},getResponseHeader:function(q){var r=null;

try{r=this.getRequest().getResponseHeader(q)||null;
}catch(t){}return r;
},getStringResponseHeaders:function(){var bC=null;

try{var bB=this.getRequest().getAllResponseHeaders();

if(bB){bC=bB;
}}catch(bH){}return bC;
},getResponseHeaders:function(){var bO=this.getStringResponseHeaders();
var bP={};

if(bO){var bM=bO.split(/[\r\n]+/g);

for(var i=0,l=bM.length;i<l;i++){var bN=bM[i].match(/^([^:]+)\s*:\s*(.+)$/i);

if(bN){bP[bN[1]]=bN[2];
}}}return bP;
},getStatusCode:function(){var bs=-1;

try{bs=this.getRequest().status;
}catch(bK){}return bs;
},getStatusText:function(){var y=P;

try{y=this.getRequest().statusText;
}catch(bE){}return y;
},getResponseText:function(){var bt=null;

try{bt=this.getRequest().responseText;
}catch(bJ){bt=null;
}return bt;
},getResponseXml:function(){var bw=null;
var bu=this.getStatusCode();
var bv=this.getReadyState();

if(qx.io.remote.Exchange.wasSuccessful(bu,bv,this.__localRequest)){try{bw=this.getRequest().responseXML;
}catch(z){}}if(typeof bw==bf&&bw!=null){if(!bw.documentElement){var s=String(this.getRequest().responseText).replace(/<\?xml[^\?]*\?>/,P);
bw.loadXML(s);
}if(!bw.documentElement){throw new Error("Missing Document Element!");
}
if(bw.documentElement.tagName==bd){throw new Error("XML-File is not well-formed!");
}}else{throw new Error("Response was not a valid xml document ["+this.getRequest().responseText+"]");
}return bw;
},getFetchedLength:function(){var bx=this.getResponseText();
return typeof bx==ba?bx.length:0;
},getResponseContent:function(){var by=this.getState();

if(by!==S&&by!=T){{};
return null;
}{};
var bA=this.getResponseText();

if(by==T){{};
return bA;
}
switch(this.getResponseType()){case bl:case bo:{};
return bA;
case bp:{};

try{if(bA&&bA.length>0){var bz;

if(this.getParseJson()){bz=qx.util.Json.parse(bA,false);
bz=(bz===0?0:(bz||null));
}else{bz=bA;
}return bz;
}else{return null;
}}catch(bL){this.error("Could not execute json: ["+bA+"]",bL);
return X+bA+Y;
}case bk:{};

try{if(bA&&bA.length>0){var bz=window.eval(bA);
return (bz===0?0:(bz||null));
}else{return null;
}}catch(v){this.error("Could not execute javascript: ["+bA+"]",v);
return null;
}case K:bA=this.getResponseXml();
{};
return (bA===0?0:(bA||null));
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}},_applyState:function(a,b){{};

switch(a){case bi:this.fireEvent(bi);
break;
case M:this.fireEvent(M);
break;
case O:this.fireEvent(O);
break;
case bm:this.fireEvent(bm);
break;
case S:this.fireEvent(S);
break;
case T:this.fireEvent(T);
break;
case Q:this.getRequest().abort();
this.fireEvent(Q);
break;
case L:this.getRequest().abort();
this.fireEvent(L);
break;
}}},defer:function(){qx.io.remote.Exchange.registerType(qx.io.remote.transport.XmlHttp,bq);
},destruct:function(){var bI=this.getRequest();

if(bI){bI.onreadystatechange=qx.lang.Function.empty;
switch(bI.readyState){case 1:case 2:case 3:bI.abort();
}}this.__request=null;
}});
})();
(function(){var c="Integer",b="Object",a="qx.io.remote.Response";
qx.Class.define(a,{extend:qx.event.type.Event,properties:{state:{check:c,nullable:true},statusCode:{check:c,nullable:true},content:{nullable:true},responseHeaders:{check:b,nullable:true}},members:{clone:function(d){var e=qx.event.type.Event.prototype.clone.call(this,d);
e.setType(this.getType());
e.setState(this.getState());
e.setStatusCode(this.getStatusCode());
e.setContent(this.getContent());
e.setResponseHeaders(this.getResponseHeaders());
return e;
},getResponseHeader:function(f){var g=this.getResponseHeaders();

if(g){return g[f]||null;
}return null;
}}});
})();
(function(){var A="String",z="qx.event.type.Data",y="loaded",x="changeModel",w="changeAutoLoadMethod",v="qcl.data.store.JsonRpc",u="changeServiceName",t="error",s="Boolean",r="_applyAutoLoadMethod",k="wait",q="Integer",n="function",j="default",h="_applyAutoLoadParams",m=",",l="load",o="changeAutoLoadParams",g="changeLoadMethod",p="Object";
qx.Class.define(v,{extend:qx.core.Object,construct:function(a,b,c,d,f){qx.core.Object.call(this);
if(a!=null){this.setUrl(a);
}
if(b!=null){this.setServiceName(b);
}if(!c){this.setMarshaler(new qx.data.marshal.Json(d));
}else{this.setMarshaler(c);
}if(f){this.__rpc=f;
}else if(qx.Class.hasMixin(qx.Class.getByName(qx.core.Init.getApplication().classname),qcl.application.MAppManagerProvider)){this.__rpc=this.getApplication().getRpcManager().getRpcObject();
}else{this.__rpc=new qx.io.remote.Rpc();
}},events:{"loaded":z,"change":z,"changeBubble":z,"error":z},properties:{storeId:{check:A,nullable:true,init:null},model:{nullable:true,event:x},url:{check:A,nullable:true},serviceName:{check:A,event:u,nullable:true},loadMethod:{check:A,init:l,event:g},marshaler:{check:p,nullable:true},timeout:{check:q,init:180000},allowCrossDomainRequests:{check:s,init:false},autoLoadMethod:{check:A,nullable:true,apply:r,event:w},autoLoadParams:{nullable:true,apply:h,event:o}},members:{_responseData:null,__request:null,__pool:null,__opaqueCallRef:null,__rpc:null,__requestId:0,__requestCounter:0,__lastMethod:null,__lastParams:null,_applyAutoLoadMethod:function(N,O){if(this.getAutoLoadParams()){this.load(N,this.getAutoLoadParams());
}},_applyAutoLoadParams:function(bn,bo){if(qx.lang.Type.isString(bn)){var bn=bn.split(m);
}
if(bn&&this.getAutoLoadMethod()){this.load(this.getAutoLoadMethod(),bn);
}},_configureRequest:function(){var L=qx.core.Init.getApplication();
var M=this.__rpc;
M.setTimeout(this.getTimeout());

if(this.getUrl()){M.setUrl(this.getUrl());
}else if(qx.Class.hasMixin(qx.Class.getByName(L.classname),qcl.application.MAppManagerProvider)){M.setUrl(this.getApplication().getRpcManager().getServerUrl());
}else{this.error("Cannot determine URL for request.");
}M.setServiceName(this.getServiceName());
M.setCrossDomain(this.getAllowCrossDomainRequests());
if(qx.Class.hasMixin(qx.Class.getByName(L.classname),qcl.application.MAppManagerProvider)){M.setServerData(L.getStateManager().getServerStates());
}return M;
},_sendJsonRpcRequest:function(bd,be,bf,bg,bh){var bi=this._configureRequest();
qx.core.Init.getApplication().getRoot().setGlobalCursor(k);
this.__requestCounter++;
var bk=qx.lang.Function.bind(function(P,Q,R){if(--this.__requestCounter<1){qx.core.Init.getApplication().getRoot().setGlobalCursor(j);
}this._responseData=P;
this.__opaqueCallRef=null;
if(Q==null){var T;

if(this._is_qcl_result(P)){if(P.messages||P.events){this.__handleEventsAndMessages(this,P);
}T=P.data;
}else{T=P;
}if(bh){try{this.getMarshaler().toClass(T,true);
var S=this.getMarshaler().toModel(T);
if(this.getModel()){}this.setModel(S);
}catch(e){this.warn("Error during marshaling of data: ");
this.info(qx.dev.StackTrace.getStackTrace().join("\n"));
this.error(e);
return;
}this.fireDataEvent(y,this.getModel());
}if(typeof bf==n){try{bf.call(bg,T);
}catch(e){this.warn("Error in final callback: ");
this.error(e);
}}}else{this.fireDataEvent(t,Q);
this._handleError(Q,R);
this.fireDataEvent(y,null);
}},this);
var bj=[bk,bd].concat(be||[]);
this.__opaqueCallRef=bi.callAsync.apply(bi,bj);
},_is_qcl_result:function(K){return (qx.lang.Type.isObject(K)&&K.__qcl===true);
},__handleEventsAndMessages:function(bl,bm){if(bm.messages&&bm.messages instanceof Array){bm.messages.forEach(function(Y){qx.event.message.Bus.dispatchByName(Y.name,Y.data);
});
}if(bm.events&&bm.events instanceof Array){bm.events.forEach(function(event){if(event.data){var F=new qx.event.type.Data;
F.init(event.data);
}else{var F=new qx.event.type.Event;
}F.setType(event.Type);
bl.dispatchEvent(F);
});
}return;
},_handleError:function(B,C){this.warn("Async exception (#"+C+"): "+B.message);
if(qx.lang.Type.isObject(window.dialog)&&qx.lang.Type.isFunction(dialog.alert)){dialog.alert(B.message);
}},_handleServerEvents:function(ba){for(var i=0;i<ba.length;i++){var bb=ba[i];
bb.isServerEvent=true;
var bc=bb.eventType;
delete bb.eventType;
var event=new qx.event.type.Data;
event.init(bb);
event.setType(bc);
event.setTarget(this);
this.dispatchEvent(event);
}},getNextRequestId:function(){return this.__requestId++;
},load:function(U,V,W,X){this.__lastMethod=U;
this.__lastParams=V;
this._sendJsonRpcRequest(U||this.getLoadMethod(),V,W,X,true);
},reload:function(D,E){this.load(this.__lastMethod,this.__lastParams,D,E);
},execute:function(G,H,I,J){this._sendJsonRpcRequest(G||this.getServiceMethod(),H,I,J,false);
},abort:function(){if(this.__opaqueCallRef){this.getCurrentRequest().abort(this.__opaqueCallRef);
}}}});
})();
(function(){var s="qx.core.Object",r="Boolean",q="changeClipboardManager",p="String",o="A qooxdoo application",n="qcl.application.MAppManagerProvider",m="changeConfigManager",l="qooxdoo",k="changeSessionManager",j="changeRpcManager",e="sessionId",i="changeEventTransportManager",h="Do you really want to quit %1?",d="changePluginManager",c="changeStateManager",g="changeAccessManager",f="changeNativeWindowManager";
qx.Mixin.define(n,{properties:{applicationId:{check:p,nullable:false,init:l},applicationName:{check:p,nullable:false,init:o},mainApplication:{check:r,init:true},sessionManager:{check:s,nullable:false,event:k},rpcManager:{check:s,nullable:false,event:j},accessManager:{check:s,nullable:false,event:g},configManager:{check:s,nullable:false,event:m},stateManager:{check:s,nullable:false,event:c},clipboardManager:{check:s,nullable:false,event:q},pluginManager:{check:s,nullable:false,event:d},nativeWindowManager:{check:s,nullable:false,event:f},eventTransportManager:{check:s,nullable:false,event:i},clipboardManager:{check:s,nullable:false,event:q},confirmQuit:{check:r,init:true}},construct:function(){this._widgetById={};
qx.Class.include(qx.core.Object,qcl.application.MGetApplication);
qx.Class.include(qx.core.Object,qcl.application.MWidgetId);
},members:{initializeManagers:function(){this.setSessionManager(new qcl.application.SessionManager);
this.setStateManager(new qcl.application.StateManager);
this.setRpcManager(new qcl.io.RpcManager);
this.setAccessManager(new qcl.access.AccessManager);
this.setConfigManager(new qcl.application.ConfigManager);
this.setPluginManager(new qcl.application.PluginManager);
var t=this.getStateManager().getState(e);

if(t){this.getSessionManager().setSessionId(t);
}},_widgetById:{},setWidgetById:function(a,b){this._widgetById[a]=b;
},getWidgetById:function(u){return this._widgetById[u];
},close:function(){if(this.isMainApplication()&&this.isConfirmQuit()){return this.tr(h,this.getApplicationName());
}return undefined;
},terminate:function(){this.getRpcManager().terminate();
}}});
})();
(function(){var o="qx.core.Object",n="model",m="authenticate",l="logout",k="qcl.data.store.JsonRpc",j="Boolean",i="model.sessionId",h="sessionId",g="activeUser",f="changePermissionManager",c="qcl.access.AccessManager",e="authenticatedUser",d="changeStore",b="changeUserManager",a="changeAuthenticatedUser";
qx.Class.define(c,{extend:qx.core.Object,properties:{store:{check:k,nullable:true,event:d},userManager:{check:o,nullable:true,event:b},permissionManager:{check:o,nullable:true,event:f},authenticatedUser:{check:j,init:false,event:a}},construct:function(){qx.core.Object.call(this);
},members:{_authenticationSetup:false,getSessionId:function(){qx.core.Init.getApplication().getSessionManager().getSessionId();
},init:function(v){if(this._authenticationSetup){this.error("Authentication already set up");
}this._authenticationSetup=true;
if(!this.getUserManager()){this.setUserManager(qcl.access.UserManager.getInstance());
}
if(!this.getPermissionManager()){this.setPermissionManager(qcl.access.PermissionManager.getInstance());
}
if(!this.getStore()){this.setStore(new qcl.data.store.JsonRpc(null,v));
}this.getStore().bind(n,this.getUserManager(),n);
this.getStore().bind(i,qx.core.Init.getApplication().getSessionManager(),h);
this.getUserManager().bind(g,this,e,{converter:function(p){return (!p||p.isAnonymous()?false:true);
}});
},setService:function(s){this.getStore().setServiceName(s);
},connect:function(t,u){this.getStore().load(m,[this.getSessionId()||null],t,u);
},authenticate:function(w,x,y,z){this.getStore().load(m,[w,x],y,z);
},getActiveUser:function(){return this.getUserManager().getActiveUser();
},getPermission:function(name){return this.getPermissionManager().create(name);
},getPermissionState:function(name){return this.getPermissionManager().create(name).getState();
},updatePermission:function(name){this.getPermission(name).update();
},logout:function(q,r){qx.event.message.Bus.dispatch(new qx.event.message.Message(l,true));
this.getStore().load(l,null,q,r);
}}});
})();
(function(){var n="string",m="_objects",l="&lt;",k="",j='excluded',i="_index",h="&gt;",g='visible',f="qcl.access.AbstractManager",e="\n",c="textarea",d="object";
qx.Class.define(f,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this._index={};
this._objects={};
},members:{_index:null,_objects:null,_managedObjectClassName:null,_instance:null,add:function(G){var H=G.toHashCode();
this._objects[H]=G;
this._index[G.getNamedId()]=H;
},remove:function(a){var b=a.toHashCode();
delete this._objects[b];
delete this._index[a.getNamedId()];
return true;
},has:function(I){return this._objects[I.toHashCode()]!=null;
},getAll:function(){return this._objects;
},getObject:function(r){if(typeof r==d){var s=this.get(r);
return s?s:null;
}else if(typeof r==n){var t=this._index[r];
return t?this.getAll()[t]:null;
}return null;
},getByName:function(u){if(typeof u!=n){this.error("getByName requires string argument!");
}var v=this._index[u];
return v?this.getAll()[v]:null;
},getNamedId:function(p){var q=this.getObject(p);
return q?q.getNamedId():null;
},getNamedIds:function(){var w=this.getAll();
var x=[];

for(var y in w){x.push(w[y].getNamedId());
}return x;
},create:function(name){if(typeof name!=n){this.warn("Argument for create method must be a string, got '"+name+"'.");
return;
}var o=this.getObject(name);

if(!qx.lang.Type.isObject(o)){o=new qcl.access[this._type](name);

if(!qx.lang.Type.isObject(o)){this.error("Could not create object");
}}return o;
},deleteAll:function(){var B=this.getAll();

for(var C in B){if(B[C]){B[C].dispose();
}delete B[C];
B=[];
}}},defer:function(){qcl.bool2visibility=function(K){return K?g:j;
};
qcl.utf8_encode=function(E){return unescape(encodeURIComponent(E));
};
qcl.utf8_decode=function(F){return decodeURIComponent(escape(F));
};
qcl.html_entity_decode=function(z){var A=document.createElement(c);
A.innerHTML=z.replace(/</g,l).replace(/>/g,h);
return A.value;
};
qcl.strip_tags=function(J){return J.replace(/(<([^>]+)>)/ig,k);
};
qcl.br2nl=function(D){return D.replace(/<br[\s]*\/?>/ig,e);
};
},destruct:function(){this._disposeArray(i);
this._disposeMap(m);
}});
})();
(function(){var h="Object",g="qcl.access.UserManager",f="changeModel",e="User",d="_applyActiveUser",c="changeActiveUser",b="_applyModel",a="singleton";
qx.Class.define(g,{extend:qcl.access.AbstractManager,type:a,construct:function(){qcl.access.AbstractManager.call(this);
this._type=e;
},properties:{activeUser:{check:h,event:c,apply:d,nullable:true},model:{check:h,nullable:true,init:null,apply:b,event:f}},members:{getByUsername:function(n){return this.getObject(n);
},_applyModel:function(i,j){if(i&&!i.getError()){var k=this.create(i.getUsername());
k.setFullname(i.getFullname());
k.setAnonymous(i.getAnonymous());
k.setEditable(i.getEditable());
k.setPermissions([]);
k.addPermissionsByName(i.getPermissions().toArray());
this.setActiveUser(k);
}},_applyActiveUser:function(l,m){if(m){m.revokePermissions();
}
if(l instanceof qcl.access.User){l.grantPermissions();
}else if(l!==null){this.error("activeUser property must be null or of type qcl.access.User ");
}},logout:function(){this.setActiveUser(null);
}}});
})();
(function(){var h="String",g="changePermissions",f="Boolean",e="changeFullname",d="changeUsername",c="Array",b="qcl.access.User",a="_applyNamedId";
qx.Class.define(b,{extend:qx.core.Object,construct:function(l){qx.core.Object.call(this);
this.setNamedId(l);
this._manager=qx.core.Init.getApplication().getAccessManager().getUserManager();
this._manager.add(this);
this.setPermissions([]);
},properties:{namedId:{check:h,nullable:false,apply:a},username:{check:h,nullable:false,event:d},fullname:{check:h,event:e},anonymous:{check:f,init:true},editable:{check:f,init:false},permissions:{check:c,nullable:false,event:g}},members:{_manager:null,_applyNamedId:function(j,k){this.setUsername(j);
},hasPermission:function(s){var t=false;
var u=this.getPermissions();

for(var i=0;i<u.length;i++){var v=u[i];

if(s instanceof qcl.access.Permission&&s===v)return true;
else if(s==v.getNamedId())return true;
}return false;
},getPermissionNames:function(){var q=[];
var p=this.getPermissions();

for(var i=0;i<p.length;i++){q.push(p[i].getNamedId());
}return q;
},addPermissionsByName:function(n){var o=qx.core.Init.getApplication().getAccessManager().getPermissionManager();

for(var i=0;i<n.length;i++){this.getPermissions().push(o.create(n[i]));
}this.fireDataEvent(g,this.getPermissions());
},grantPermissions:function(){this.getPermissions().forEach(function(r){r.setGranted(true);
},this);
},revokePermissions:function(){this.getPermissions().forEach(function(m){m.setGranted(false);
},this);
this.setPermissions([]);
}},destruct:function(){this._manager.remove(this);
}});
})();
(function(){var c="qcl.access.PermissionManager",b="singleton",a="Permission";
qx.Class.define(c,{extend:qcl.access.AbstractManager,type:b,construct:function(){qcl.access.AbstractManager.call(this);
this._type=a;
},members:{}});
})();
(function(){var m="changeState",l="String",k="*",j="function",h="Boolean",g="_applyGranted",f="__conditions",d="qcl.access.Permission",c="object",b="changeGranted",a="qx.event.type.Data";
qx.Class.define(d,{extend:qx.core.Object,construct:function(C){qx.core.Object.call(this);
this.setNamedId(C);
this.__conditions=[];
this.__state=false;
this._manager=qx.core.Init.getApplication().getAccessManager().getPermissionManager();
this._manager.add(this);
},properties:{namedId:{check:l,nullable:false},description:{check:l,nullable:true},granted:{check:h,init:false,event:b,apply:g}},events:{"changeState":a},members:{_manager:null,getConditions:function(){return this.__conditions;
},addCondition:function(v,w){if(typeof v!=j){this.error("No callback function supplied!");
return false;
}
if(this.hasCondition(v,w)){this.warn("Condition has already been added.");
return false;
}else{this.getConditions().push({'condition':v,'context':w||null});
return true;
}},hasCondition:function(F,G){var H=this.getConditions();

for(var i=0;i<H.length;i++){if(F&&typeof F==c&&H[i].condition==F&&H[i].context==(G||null)){return true;
}}return false;
},removeCondition:function(r,s){var t=this.getConditions();

for(var i=0;i<t.length;i++){if(t[i].condition==r&&t[i].context==(s||null)){t.splice(i,1);
return true;
}}return false;
},_satifiesAllConditions:function(n){var p=this.getConditions();
for(var i=0;i<p.length;i++){var o=p[i].condition;
var q=p[i].context;
if(!n||n==q){if(!o.call(q)){return false;
}}}return true;
},_applyGranted:function(x,y){var A=this.getNamedId();
var B=A.indexOf(k);

if(B>-1){this._manager.getNamedIds().forEach(function(name){if(B==0||A.substr(0,B)==name.substr(0,B)){if(name.indexOf(k)<0){try{this._manager.getByName(name).setGranted(x);
}catch(e){this.warn("Invalid manager:"+this._manager);
}}}},this);
}var z=this.getState();
this.fireDataEvent(m,z);
},getState:function(u){return this.isGranted()&&this._satifiesAllConditions(u);
},resetState:function(){},update:function(D){var E=this.getState(D);
this.fireDataEvent(m,E);
}},destruct:function(){this._disposeArray(f);
this._manager.remove(this);
}});
})();
(function(){var t="change",s="model",r="clientChange",q="model.values[",p="]",o="qx.event.type.Data",n="changeModel",m="ready",l="qcl.data.store.JsonRpc",k="qx.core.Object",c="qcl.application.ConfigManager",j="set",g="_index",b="qx.event.type.Event",a="changeBubble",f=".",d="changeStore",h="_applyModel";
qx.Class.define(c,{extend:qx.core.Object,properties:{store:{check:l,nullable:true,event:d},model:{check:k,nullable:true,event:n,apply:h}},events:{"ready":b,"change":o,"clientChange":o},construct:function(){qx.core.Object.call(this);
},members:{_configSetup:false,_index:null,_applyModel:function(y,z){this._index={};
var A=y.getKeys();

for(var i=0;i<A.length;i++){var B=A.getItem(i);
this._index[B]=i;
this.fireDataEvent(t,B);
}y.getValues().addListener(a,function(event){var H=event.getData();
var I=y.getKeys().getItem(H.name);

if(H.value!=H.old){this.fireDataEvent(t,I);
}},this);
this.fireEvent(m);
},_getIndex:function(T){if(!this._index){this.error("Model has not yet finished loading.");
}var U=this._index[T];

if(U==undefined){throw new Error("Invalid config key '"+T+"'.");
}return U;
},init:function(S){if(this._configSetup){this.error("Configuration already set up");
}this._configSetup=true;
if(!this.getStore()){this.setStore(new qcl.data.store.JsonRpc(null,S));
}this.getStore().bind(s,this,s);
this.addListener(r,function(event){var M=event.getData();
this.getStore().execute(j,[M.key,M.value]);
},this);
},setService:function(G){this.getStore().setServiceName(G);
},load:function(w,x){this.getStore().load(null,null,w,x);
},keyExists:function(L){try{this._getIndex(L);
return true;
}catch(e){return false;
}},getKey:function(u){var v=this._getIndex(u);
return this.getModel().getValues().getItem(v);
},setKey:function(C,D){var E=this._getIndex(C);
var F=this.getModel().getValues().getItem(E);

if(D!=F){this.getModel().getValues().setItem(E,D);
this.fireDataEvent(r,{'key':C,'value':D,'old':F});
}},bindKey:function(N,O,P,Q){if(!this.getModel()){this.error("You cannot bind a config key before config values have been loaded!");
}
if(!O instanceof qx.core.Object){this.error("Invalid target object.");
}
if(!qx.lang.Type.isString(P)){this.error("Invalid target path.");
}if(P.indexOf(f)==-1){O.set(P,this.getKey(N));
this.addListener(t,function(e){var K=e.getData();

if(K==N){O.set(P,this.getKey(N));
}},this);
if(Q){O.addListener(t+P.substr(0,1).toUpperCase()+P.substr(1),function(e){var J=e.getData();
this.setKey(N,J);
},this);
}}else{var R=this._getIndex(N);
O.bind(P,this,q+R+p);
if(Q){this.bind(q+R+p,O,P);
}}}},destruct:function(){this._disposeArray(g);
}});
})();
(function(){var k=".plugin",j="function",i="qx.event.message.Message",h="?nocache=",g="getPluginData",f="loadingPlugin",e="qcl.application.PluginManager",d="false",c="pluginsLoaded",b="qx.event.type.Data",a="Boolean";
qx.Class.define(e,{extend:qx.core.Object,properties:{preventCache:{check:a,init:d}},events:{"loadingPlugin":b,"pluginsLoaded":i},construct:function(){qx.core.Object.call(this);
},members:{loadPlugins:function(s,t){var u=this.getApplication();
var v=u.getApplicationId()+k;
u.getRpcManager().execute(v,g,[],function(o){if(!qx.lang.Type.isArray(o)){this.error(v+".getPluginData did not return an array.");
}var q=o.length;
var p=0;
var self=this;
(function r(){if(!o.length){qx.event.message.Bus.dispatch(new qx.event.message.Message(c));
if(typeof s==j){s.call(t);
}return;
}var m=o.shift();
p++;
self.fireDataEvent(f,{'name':m.name,'url':m.url,'count':p,'sum':q});
var n=new qx.io.ScriptLoader();
var l=self.getPreventCache()?m.url+h+(new Date).getTime():m.url;
n.load(l,r);
})();
},this);
}}});
})();
(function(){var o="success",n="complete",m="error",l="load",k="fail",j="qx.client",i="loaded",h="readystatechange",g="head",f="qx.io.ScriptLoader",b="mshtml|webkit",d="script",c="text/javascript",a="abort";
qx.Bootstrap.define(f,{construct:function(){this.__oneventWrapped=qx.Bootstrap.bind(this.__onevent,this);
this.__elem=document.createElement(d);
},members:{__running:null,__callback:null,__context:null,__oneventWrapped:null,__elem:null,load:function(p,q,r){if(this.__running){throw new Error("Another request is still running!");
}this.__running=true;
var s=document.getElementsByTagName(g)[0];
var t=this.__elem;
this.__callback=q||null;
this.__context=r||window;
t.type=c;
t.onerror=t.onload=t.onreadystatechange=this.__oneventWrapped;
t.src=p;
setTimeout(function(){s.appendChild(t);
},0);
},abort:function(){if(this.__running){this.dispose(a);
}},dispose:function(status){if(this._disposed){return;
}this._disposed=true;
var v=this.__elem;
v.onerror=v.onload=v.onreadystatechange=null;
var u=v.parentNode;

if(u){u.removeChild(v);
}delete this.__running;
if(this.__callback){if(qx.core.Variant.isSet(j,b)){var self=this;
setTimeout(qx.event.GlobalError.observeMethod(function(){self.__callback.call(self.__context,status);
delete self.__callback;
}),0);
}else{this.__callback.call(this.__context,status);
delete this.__callback;
}}},__onevent:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"mshtml":function(e){var w=this.__elem.readyState;

if(w==i){this.dispose(o);
}else if(w==n){this.dispose(o);
}else{return;
}},"opera":function(e){if(qx.Bootstrap.isString(e)||e.type===m){return this.dispose(k);
}else if(e.type===l){return this.dispose(o);
}else{return;
}},"default":function(e){if(qx.Bootstrap.isString(e)||e.type===m){this.dispose(k);
}else if(e.type===l){this.dispose(o);
}else if(e.type===h&&(e.target.readyState===n||e.target.readyState===i)){this.dispose(o);
}else{return;
}}}))}});
})();
(function(){var k="title-project",j="logbuch.module.Header",i="logbuch-header",h="logBUCH",g="icon/32/actions/dialog-close.png",f="execute",e="Sustainable Business Travel",d="bottom",c="Max Mustermann, TÜVRheinland",b="logout",a="title-application";
qx.Class.define(j,{extend:qx.ui.container.Composite,implement:[qcl.application.IModule,qcl.application.IWidgetModule],construct:function(){qx.ui.container.Composite.call(this);
this.set({layout:new qx.ui.layout.HBox(20),height:80,decorator:i,padding:10,marginBottom:20});
this.getLayout().setAlignY(d);
},members:{__sandbox:null,init:function(p){this.__sandbox=p;
},build:function(){var m=h;
this.add(new qx.ui.basic.Label(m).set({appearance:a}));
var o=e;
this.add(new qx.ui.basic.Label(o).set({appearance:k}));
this.add(new qx.ui.core.Spacer,{flex:1});
var l=c;
userNameLabel=new qx.ui.basic.Label(l).set({appearance:k});
this.add(userNameLabel);
var n=new qx.ui.form.Button(null,g).set({maxHeight:38});
n.addListener(f,function(){this.__sandbox.publish(b);
},this);
this.add(n);
},start:function(){},stop:function(){}}});
})();
(function(){var n="_applyLayoutChange",m="left",k="center",j="top",h="Decorator",g="middle",f="_applyReversed",e="bottom",d="Boolean",c="right",a="Integer",b="qx.ui.layout.HBox";
qx.Class.define(b,{extend:qx.ui.layout.Abstract,construct:function(D,E,F){qx.ui.layout.Abstract.call(this);

if(D){this.setSpacing(D);
}
if(E){this.setAlignX(E);
}
if(F){this.setSeparator(F);
}},properties:{alignX:{check:[m,k,c],init:m,apply:n},alignY:{check:[j,g,e],init:j,apply:n},spacing:{check:a,init:0,apply:n},separator:{check:h,nullable:true,apply:n},reversed:{check:d,init:false,apply:f}},members:{__widths:null,__flexs:null,__enableFlex:null,__children:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__rebuildCache:function(){var bk=this._getLayoutChildren();
var length=bk.length;
var bh=false;
var bf=this.__widths&&this.__widths.length!=length&&this.__flexs&&this.__widths;
var bi;
var bg=bf?this.__widths:new Array(length);
var bj=bf?this.__flexs:new Array(length);
if(this.getReversed()){bk=bk.concat().reverse();
}for(var i=0;i<length;i++){bi=bk[i].getLayoutProperties();

if(bi.width!=null){bg[i]=parseFloat(bi.width)/100;
}
if(bi.flex!=null){bj[i]=bi.flex;
bh=true;
}else{bj[i]=0;
}}if(!bf){this.__widths=bg;
this.__flexs=bj;
}this.__enableFlex=bh;
this.__children=bk;
delete this._invalidChildrenCache;
},verifyLayoutProperty:null,renderLayout:function(G,H){if(this._invalidChildrenCache){this.__rebuildCache();
}var N=this.__children;
var length=N.length;
var W=qx.ui.layout.Util;
var V=this.getSpacing();
var ba=this.getSeparator();

if(ba){var K=W.computeHorizontalSeparatorGaps(N,V,ba);
}else{var K=W.computeHorizontalGaps(N,V,true);
}var i,I,T,S;
var Y=[];
var O=K;

for(i=0;i<length;i+=1){S=this.__widths[i];
T=S!=null?Math.floor((G-K)*S):N[i].getSizeHint().width;
Y.push(T);
O+=T;
}if(this.__enableFlex&&O!=G){var Q={};
var U,X;

for(i=0;i<length;i+=1){U=this.__flexs[i];

if(U>0){P=N[i].getSizeHint();
Q[i]={min:P.minWidth,value:Y[i],max:P.maxWidth,flex:U};
}}var L=W.computeFlexOffsets(Q,G,O);

for(i in L){X=L[i].offset;
Y[i]+=X;
O+=X;
}}var be=N[0].getMarginLeft();
if(O<G&&this.getAlignX()!=m){be=G-O;

if(this.getAlignX()===k){be=Math.round(be/2);
}}var P,top,J,T,M,bc,R;
var V=this.getSpacing();
this._clearSeparators();
if(ba){var bb=qx.theme.manager.Decoration.getInstance().resolve(ba).getInsets();
var bd=bb.left+bb.right;
}for(i=0;i<length;i+=1){I=N[i];
T=Y[i];
P=I.getSizeHint();
bc=I.getMarginTop();
R=I.getMarginBottom();
J=Math.max(P.minHeight,Math.min(H-bc-R,P.maxHeight));
top=W.computeVerticalAlignOffset(I.getAlignY()||this.getAlignY(),J,H,bc,R);
if(i>0){if(ba){be+=M+V;
this._renderSeparator(ba,{left:be,top:0,width:bd,height:H});
be+=bd+V+I.getMarginLeft();
}else{be+=W.collapseMargins(V,M,I.getMarginLeft());
}}I.renderLayout(be,top,T,J);
be+=T;
M=I.getMarginRight();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__rebuildCache();
}var u=qx.ui.layout.Util;
var C=this.__children;
var o=0,v=0,s=0;
var r=0,t=0;
var z,p,B;
for(var i=0,l=C.length;i<l;i+=1){z=C[i];
p=z.getSizeHint();
v+=p.width;
var y=this.__flexs[i];
var q=this.__widths[i];

if(y){o+=p.minWidth;
}else if(q){s=Math.max(s,Math.round(p.minWidth/q));
}else{o+=p.width;
}B=z.getMarginTop()+z.getMarginBottom();
if((p.height+B)>t){t=p.height+B;
}if((p.minHeight+B)>r){r=p.minHeight+B;
}}o+=s;
var x=this.getSpacing();
var A=this.getSeparator();

if(A){var w=u.computeHorizontalSeparatorGaps(C,x,A);
}else{var w=u.computeHorizontalGaps(C,x,true);
}return {minWidth:o+w,width:v+w,minHeight:r,height:t};
}},destruct:function(){this.__widths=this.__flexs=this.__children=null;
}});
})();
(function(){var a="qx.ui.core.Spacer";
qx.Class.define(a,{extend:qx.ui.core.LayoutItem,construct:function(c,d){qx.ui.core.LayoutItem.call(this);
this.setWidth(c!=null?c:0);
this.setHeight(d!=null?d:0);
},members:{checkAppearanceNeeds:function(){},addChildrenToQueue:function(b){},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
}}});
})();
(function(){var n="execute",m="toolTipText",l="icon",k="label",j="qx.ui.core.MExecutable",h="value",g="qx.event.type.Event",f="_applyCommand",d="enabled",c="menu",a="changeCommand",b="qx.ui.core.Command";
qx.Mixin.define(j,{events:{"execute":g},properties:{command:{check:b,apply:f,event:a,nullable:true}},members:{__executableBindingIds:null,__semaphore:false,__executeListenerId:null,_bindableProperties:[d,k,l,m,h,c],execute:function(){var o=this.getCommand();

if(o){if(this.__semaphore){this.__semaphore=false;
}else{this.__semaphore=true;
o.execute(this);
}}this.fireEvent(n);
},__onCommandExecute:function(e){if(this.__semaphore){this.__semaphore=false;
return;
}this.__semaphore=true;
this.execute();
},_applyCommand:function(p,q){if(q!=null){q.removeListenerById(this.__executeListenerId);
}
if(p!=null){this.__executeListenerId=p.addListener(n,this.__onCommandExecute,this);
}var t=this.__executableBindingIds;

if(t==null){this.__executableBindingIds=t={};
}
for(var i=0;i<this._bindableProperties.length;i++){var s=this._bindableProperties[i];
if(q!=null&&t[s]!=null){q.removeBinding(t[s]);
t[s]=null;
}if(p!=null&&qx.Class.hasProperty(this.constructor,s)){var r=p.get(s);

if(r==null){var u=this.get(s);
}t[s]=p.bind(s,this,s);
if(u){this.set(s,u);
}}}}},destruct:function(){this.__executableBindingIds=null;
}});
})();
(function(){var b="qx.ui.form.IExecutable",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"execute":a},members:{setCommand:function(c){return arguments.length==1;
},getCommand:function(){},execute:function(){}}});
})();
(function(){var o="pressed",n="abandoned",m="hovered",l="Enter",k="Space",j="dblclick",i="qx.ui.form.Button",h="mouseup",g="mousedown",f="mouseover",b="mouseout",d="keydown",c="button",a="keyup";
qx.Class.define(i,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],construct:function(p,q,r){qx.ui.basic.Atom.call(this,p,q);

if(r!=null){this.setCommand(r);
}this.addListener(f,this._onMouseOver);
this.addListener(b,this._onMouseOut);
this.addListener(g,this._onMouseDown);
this.addListener(h,this._onMouseUp);
this.addListener(d,this._onKeyDown);
this.addListener(a,this._onKeyUp);
this.addListener(j,this._onStopEvent);
},properties:{appearance:{refine:true,init:c},focusable:{refine:true,init:true}},members:{_forwardStates:{focused:true,hovered:true,pressed:true,disabled:true},press:function(){if(this.hasState(n)){return;
}this.addState(o);
},release:function(){if(this.hasState(o)){this.removeState(o);
}},reset:function(){this.removeState(o);
this.removeState(n);
this.removeState(m);
},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(n)){this.removeState(n);
this.addState(o);
}this.addState(m);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(m);

if(this.hasState(o)){this.removeState(o);
this.addState(n);
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}e.stopPropagation();
this.capture();
this.removeState(n);
this.addState(o);
},_onMouseUp:function(e){this.releaseCapture();
var s=this.hasState(o);
var t=this.hasState(n);

if(s){this.removeState(o);
}
if(t){this.removeState(n);
}else{this.addState(m);

if(s){this.execute();
}}e.stopPropagation();
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case l:case k:this.removeState(n);
this.addState(o);
e.stopPropagation();
}},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case l:case k:if(this.hasState(o)){this.removeState(n);
this.removeState(o);
this.execute();
e.stopPropagation();
}}}}});
})();
(function(){var p="execute",o="change-date",n="Calendar",m="Admin",l="logbuch-label-box",k="logbuch/icon/16/button-arrow-left.png",j="logbuch/image/tuev_logo.png",i="Print",h="change-date-today",g="changeValue",c='Today',f="logbuch.module.Footer",d="right",b="logbuch/icon/16/button-arrow-right.png",a="abc";
qx.Class.define(f,{extend:qx.ui.container.Composite,implement:[qcl.application.IModule,qcl.application.IWidgetModule],construct:function(){qx.ui.container.Composite.call(this);
},members:{__sandbox:null,init:function(q){this.__sandbox=q;
},build:function(){var v=this.__sandbox.getLayoutConfig();
this.set({layout:new qx.ui.layout.HBox(5),height:50});
this.add(new qx.ui.basic.Label(this.tr(n)).set({appearance:l,textAlign:d,maxHeight:v.getFooter().getControlsHeight(),width:v.getSidebar().getWidth(),marginLeft:v.getSidebar().getMarginLeft(),marginTop:v.getFooter().getMarginTop()}));
var A=new qx.ui.form.Button(null,k);
A.set({maxHeight:v.getFooter().getControlsHeight(),marginTop:v.getFooter().getMarginTop()});
A.addListener(p,function(){var r=u.getValue();
r.setDate(r.getDate()-7);
u.setValue(r);
},this);
this.add(A);
var u=new qx.ui.form.DateField().set({value:new Date(),maxHeight:v.getFooter().getControlsHeight(),marginTop:v.getFooter().getMarginTop()});
u.addListener(g,function(e){this.__sandbox.publish(o,e.getData());
},this);
this.__sandbox.subscribe(o,function(e){var t=e.getData();

if(t instanceof Date){u.setValue(t);
}},this);
this.add(u);
var x=new qx.ui.form.Button(this.tr(c));
x.set({maxHeight:v.getFooter().getControlsHeight(),marginTop:v.getFooter().getMarginTop()});
x.addListener(p,function(){this.__sandbox.publish(h);
},this);
this.add(x);
var B=new qx.ui.form.Button(null,b);
B.set({maxHeight:v.getFooter().getControlsHeight(),marginTop:v.getFooter().getMarginTop()});
B.addListener(p,function(){var s=u.getValue();
s.setDate(s.getDate()+7);
u.setValue(s);
},this);
this.add(B);
this.add(new qx.ui.core.Spacer(),{flex:1});
var y=new qx.ui.form.Button(a);
y.set({maxHeight:v.getFooter().getControlsHeight(),width:v.getFooter().getButtonWidth(),marginTop:v.getFooter().getMarginTop()});
this.add(y);
var z=new qx.ui.form.Button(this.tr(i));
z.set({maxHeight:v.getFooter().getControlsHeight(),width:v.getFooter().getButtonWidth(),marginTop:v.getFooter().getMarginTop()});
this.add(z);
var w=new qx.ui.form.Button(this.tr(m));
w.set({maxHeight:v.getFooter().getControlsHeight(),width:v.getFooter().getButtonWidth(),marginTop:v.getFooter().getMarginTop()});
this.add(w);
this.add(new qx.ui.core.Spacer(),{flex:1});
this.add(new qx.ui.basic.Image(j),{flex:1});
},start:function(){},stop:function(){}}});
})();
(function(){var l="indexOf",k="addAfter",j="add",i="addBefore",h="_",g="addAt",f="hasChildren",e="removeAt",d="removeAll",c="getChildren",a="remove",b="qx.ui.core.MRemoteChildrenHandling";
qx.Mixin.define(b,{members:{__forward:function(p,q,r,s){var t=this.getChildrenContainer();

if(t===this){p=h+p;
}return (t[p])(q,r,s);
},getChildren:function(){return this.__forward(c);
},hasChildren:function(){return this.__forward(f);
},add:function(B,C){return this.__forward(j,B,C);
},remove:function(D){return this.__forward(a,D);
},removeAll:function(){return this.__forward(d);
},indexOf:function(x){return this.__forward(l,x);
},addAt:function(y,z,A){this.__forward(g,y,z,A);
},addBefore:function(u,v,w){this.__forward(i,u,v,w);
},addAfter:function(m,n,o){this.__forward(k,m,n,o);
},removeAt:function(E){this.__forward(e,E);
}}});
})();
(function(){var i="Boolean",h="changeInvalidMessage",g="String",f="invalid",e="qx.ui.form.MForm",d="_applyValid",c="",b="changeRequired",a="changeValid";
qx.Mixin.define(e,{properties:{valid:{check:i,init:true,apply:d,event:a},required:{check:i,init:false,event:b},invalidMessage:{check:g,init:c,event:h},requiredInvalidMessage:{check:g,nullable:true,event:h}},members:{_applyValid:function(j,k){j?this.removeState(f):this.addState(f);
}}});
})();
(function(){var v="popup",u="list",t="",s="mousewheel",r="resize",q="Function",p="blur",o="abstract",n="keypress",m="Number",f="changeSelection",l="PageUp",i="_applyMaxListHeight",c="PageDown",b="mouseup",h="Escape",g="changeVisibility",j="one",a="middle",k="qx.ui.form.AbstractSelectBox",d="mousedown";
qx.Class.define(k,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.form.MForm],implement:[qx.ui.form.IForm],type:o,construct:function(){qx.ui.core.Widget.call(this);
var J=new qx.ui.layout.HBox();
this._setLayout(J);
J.setAlignY(a);
this.addListener(n,this._onKeyPress);
this.addListener(p,this._onBlur,this);
var I=qx.core.Init.getApplication().getRoot();
I.addListener(s,this._onMousewheel,this,true);
this.addListener(r,this._onResize,this);
},properties:{focusable:{refine:true,init:true},width:{refine:true,init:120},maxListHeight:{check:m,apply:i,nullable:true,init:200},format:{check:q,init:function(z){return this._defaultFormat(z);
},nullable:true}},members:{_createChildControlImpl:function(x){var y;

switch(x){case u:y=new qx.ui.form.List().set({focusable:false,keepFocus:true,height:null,width:null,maxHeight:this.getMaxListHeight(),selectionMode:j,quickSelection:true});
y.addListener(f,this._onListChangeSelection,this);
y.addListener(d,this._onListMouseDown,this);
break;
case v:y=new qx.ui.popup.Popup(new qx.ui.layout.VBox);
y.setAutoHide(false);
y.setKeepActive(true);
y.addListener(b,this.close,this);
y.add(this.getChildControl(u));
y.addListener(g,this._onPopupChangeVisibility,this);
break;
}return y||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,x);
},_applyMaxListHeight:function(E,F){this.getChildControl(u).setMaxHeight(E);
},getChildrenContainer:function(){return this.getChildControl(u);
},open:function(){var w=this.getChildControl(v);
w.placeToWidget(this,true);
w.show();
},close:function(){this.getChildControl(v).hide();
},toggle:function(){var K=this.getChildControl(v).isVisible();

if(K){this.close();
}else{this.open();
}},_defaultFormat:function(A){var B=A?A.getLabel():t;
var C=A?A.getRich():false;

if(C){B=B.replace(/<[^>]+?>/g,t);
B=qx.bom.String.unescape(B);
}return B;
},_onBlur:function(e){this.close();
},_onKeyPress:function(e){var L=e.getKeyIdentifier();
var M=this.getChildControl(v);
if(M.isHidden()&&(L==c||L==l)){e.stopPropagation();
}else if(!M.isHidden()&&L==h){this.close();
e.stop();
}else{this.getChildControl(u).handleKeyPress(e);
}},_onMousewheel:function(e){var H=e.getTarget();
var G=this.getChildControl(v,true);

if(G==null){return;
}
if(qx.ui.core.Widget.contains(G,H)){e.preventDefault();
}else{this.close();
}},_onResize:function(e){this.getChildControl(v).setMinWidth(e.getData().width);
},_onListChangeSelection:function(e){throw new Error("Abstract method: _onListChangeSelection()");
},_onListMouseDown:function(e){throw new Error("Abstract method: _onListMouseDown()");
},_onPopupChangeVisibility:function(e){throw new Error("Abstract method: _onPopupChangeVisibility()");
}},destruct:function(){var D=qx.core.Init.getApplication().getRoot();

if(D){D.removeListener(s,this._onMousewheel,this,true);
}}});
})();
(function(){var A="textfield",z="button",y="list",x="selected",w="focusout",v="inner",u="changeValue",t="popup",s="focusin",r="combobox",k="click",q="blur",n="Enter",j="quick",i="_applyPlaceholder",m="qx.ui.form.ComboBox",l="single",o="Down",h="String",p="qx.event.type.Data";
qx.Class.define(m,{extend:qx.ui.form.AbstractSelectBox,implement:[qx.ui.form.IStringForm],construct:function(){qx.ui.form.AbstractSelectBox.call(this);
var M=this._createChildControl(A);
this._createChildControl(z);
this.addListener(k,this._onClick);
this.addListener(s,function(e){M.fireNonBubblingEvent(s,qx.event.type.Focus);
},this);
this.addListener(w,function(e){M.fireNonBubblingEvent(w,qx.event.type.Focus);
},this);
},properties:{appearance:{refine:true,init:r},placeholder:{check:h,nullable:true,apply:i}},events:{"changeValue":p},members:{__preSelectedItem:null,__onInputId:null,_applyPlaceholder:function(K,L){this.getChildControl(A).setPlaceholder(K);
},_createChildControlImpl:function(a){var b;

switch(a){case A:b=new qx.ui.form.TextField();
b.setFocusable(false);
b.addState(v);
b.addListener(u,this._onTextFieldChangeValue,this);
b.addListener(q,this.close,this);
this._add(b,{flex:1});
break;
case z:b=new qx.ui.form.Button();
b.setFocusable(false);
b.setKeepActive(true);
b.addState(v);
this._add(b);
break;
case y:b=qx.ui.form.AbstractSelectBox.prototype._createChildControlImpl.call(this,a);
b.setSelectionMode(l);
break;
}return b||qx.ui.form.AbstractSelectBox.prototype._createChildControlImpl.call(this,a);
},_forwardStates:{focused:true},tabFocus:function(){var c=this.getChildControl(A);
c.getFocusElement().focus();
c.selectAllText();
},setValue:function(H){var I=this.getChildControl(A);

if(I.getValue()==H){return;
}I.setValue(H);
},getValue:function(){return this.getChildControl(A).getValue();
},resetValue:function(){this.getChildControl(A).setValue(null);
},_onKeyPress:function(e){var O=this.getChildControl(t);
var N=e.getKeyIdentifier();

if(N==o&&e.isAltPressed()){this.getChildControl(z).addState(x);
this.toggle();
e.stopPropagation();
}else if(N==n){if(O.isVisible()){this.close();
e.stop();
}}else if(O.isVisible()){qx.ui.form.AbstractSelectBox.prototype._onKeyPress.call(this,e);
}},_onClick:function(e){var G=e.getTarget();

if(G==this.getChildControl(z)){this.toggle();
}else{this.close();
}},_onListMouseDown:function(e){if(this.__preSelectedItem){var J=this.__preSelectedItem.getLabel();

if(this.getFormat()!=null){J=this.getFormat().call(this,this.__preSelectedItem);
}if(J&&J.translate){J=J.translate();
}this.setValue(J);
this.__preSelectedItem=null;
}},_onListChangeSelection:function(e){var d=e.getData();

if(d.length>0){var f=this.getChildControl(y);

if(f.getSelectionContext()==j){this.__preSelectedItem=d[0];
}else{var g=d[0].getLabel();

if(this.getFormat()!=null){g=this.getFormat().call(this,d[0]);
}if(g&&g.translate){g=g.translate();
}this.setValue(g);
this.__preSelectedItem=null;
}}},_onPopupChangeVisibility:function(e){var Q=this.getChildControl(t);

if(Q.isVisible()){var R=this.getChildControl(y);
var S=this.getValue();
var P=null;

if(S){P=R.findItem(S);
}
if(P){R.setSelection([P]);
}else{R.resetSelection();
}}else{this.tabFocus();
}this.getChildControl(z).removeState(x);
},_onTextFieldChangeValue:function(e){var D=e.getData();
var C=this.getChildControl(y);

if(D!=null){var B=C.findItem(D,false);

if(B){C.setSelection([B]);
}else{C.resetSelection();
}}else{C.resetSelection();
}this.fireDataEvent(u,D,e.getOldData());
},getTextSelection:function(){return this.getChildControl(A).getTextSelection();
},getTextSelectionLength:function(){return this.getChildControl(A).getTextSelectionLength();
},setTextSelection:function(E,F){this.getChildControl(A).setTextSelection(E,F);
},clearTextSelection:function(){this.getChildControl(A).clearTextSelection();
},selectAllText:function(){this.getChildControl(A).selectAllText();
}}});
})();
(function(){var b="qx.ui.form.IDateForm",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var l="list",k="textfield",j="popup",i="Down",h="",g="Escape",f="qx.util.format.DateFormat",d="changeValue",c="Left",b="Up",x="execute",w="changeLocale",v="_applyDateFormat",u="changeVisibility",t="qx.dynlocale",s="medium",r="mouseup",q="qx.ui.form.DateField",p="datefield",o="hidden",m="on",n="Right";
qx.Class.define(q,{extend:qx.ui.form.ComboBox,implement:[qx.ui.form.IDateForm],construct:function(){qx.ui.form.ComboBox.call(this);
this.setDateFormat(qx.ui.form.DateField.getDefaultDateFormatter());
if(qx.core.Variant.isSet(t,m)){qx.locale.Manager.getInstance().addListener(w,function(){this.setDateFormat(qx.ui.form.DateField.getDefaultDateFormatter());
},this);
}},properties:{appearance:{refine:true,init:p},dateFormat:{check:f,apply:v}},statics:{__dateFormat:null,__formatter:null,getDefaultDateFormatter:function(){var C=qx.locale.Date.getDateFormat(s).toString();

if(C==this.__dateFormat){return this.__formatter;
}
if(this.__formatter){this.__formatter.dispose();
}this.__formatter=new qx.util.format.DateFormat(C,qx.locale.Manager.getInstance().getLocale());
this.__dateFormat=C;
return this.__formatter;
}},members:{setValue:function(U){var V=this.getChildControl(k);
V.setValue(this.getDateFormat().format(U));
var W=this.getChildControl(l);
W.setValue(U);
},getValue:function(){var a=this.getChildControl(k).getValue();
try{return this.getDateFormat().parse(a);
}catch(G){return null;
}},resetValue:function(){var S=this.getChildControl(k);
S.setValue(h);
var T=this.getChildControl(l);
T.setValue(null);
},_applyDateFormat:function(J,K){try{var M=this.getChildControl(k);
var N=M.getValue();
var L=K.parse(N);
M.setValue(J.format(L));
}catch(B){}},_createChildControlImpl:function(H){var I;

switch(H){case l:I=new qx.ui.control.DateChooser();
I.setFocusable(false);
I.setKeepFocus(true);
I.addListener(x,this._onChangeDate,this);
break;
case j:I=new qx.ui.popup.Popup(new qx.ui.layout.VBox);
I.setAutoHide(false);
I.add(this.getChildControl(l));
I.addListener(r,this._onChangeDate,this);
I.addListener(u,this._onPopupChangeVisibility,this);
break;
}return I||qx.ui.form.ComboBox.prototype._createChildControlImpl.call(this,H);
},_onChangeDate:function(e){var z=this.getChildControl(k);
var A=this.getChildControl(l).getValue();
z.setValue(this.getDateFormat().format(A));
this.close();
},_onKeyPress:function(e){var O=e.getKeyIdentifier();

if(O==i&&e.isAltPressed()){this.toggle();
e.stopPropagation();
return;
}var P=this.getChildControl(j);

if(P.getVisibility()==o){return;
}if(O==g){this.close();
e.stopPropagation();
return;
}if(O===c||O===n||O===i||O===b){e.preventDefault();
}this.getChildControl(l).handleKeyPress(e);
},_onPopupChangeVisibility:function(e){var E=this.getChildControl(j);

if(E.isVisible()){var F=this.getChildControl(l);
var D=this.getValue();
F.setValue(D);
}},_onTextFieldChangeValue:function(e){var Q=this.getValue();

if(Q!=null){var R=this.getChildControl(l);
R.setValue(Q);
}this.fireDataEvent(d,this.getValue());
},isEmpty:function(){var y=this.getChildControl(k).getValue();
return y==null||y==h;
}}});
})();
(function(){var b="qx.nativeScrollBars",a="qx.ui.core.scroll.MScrollBarFactory";
qx.core.Setting.define(b,false);
qx.Mixin.define(a,{members:{_createScrollBar:function(c){if(qx.core.Setting.get(b)){return new qx.ui.core.scroll.NativeScrollBar(c);
}else{return new qx.ui.core.scroll.ScrollBar(c);
}}}});
})();
(function(){var y="scrollbar-y",x="scrollbar-x",w="pane",v="auto",u="corner",t="on",s="changeVisibility",r="scroll",q="_computeScrollbars",p="off",i="scrollY",o="qx.ui.core.scroll.AbstractScrollArea",l="abstract",g="update",f="scrollX",k="mousewheel",j="scrollbarY",m="scrollbarX",d="horizontal",n="scrollarea",h="vertical";
qx.Class.define(o,{extend:qx.ui.core.Widget,include:qx.ui.core.scroll.MScrollBarFactory,type:l,construct:function(){qx.ui.core.Widget.call(this);
var T=new qx.ui.layout.Grid();
T.setColumnFlex(0,1);
T.setRowFlex(0,1);
this._setLayout(T);
this.addListener(k,this._onMouseWheel,this);
},properties:{appearance:{refine:true,init:n},width:{refine:true,init:100},height:{refine:true,init:200},scrollbarX:{check:[v,t,p],init:v,themeable:true,apply:q},scrollbarY:{check:[v,t,p],init:v,themeable:true,apply:q},scrollbar:{group:[m,j]}},members:{_createChildControlImpl:function(A){var B;

switch(A){case w:B=new qx.ui.core.scroll.ScrollPane();
B.addListener(g,this._computeScrollbars,this);
B.addListener(f,this._onScrollPaneX,this);
B.addListener(i,this._onScrollPaneY,this);
this._add(B,{row:0,column:0});
break;
case x:B=this._createScrollBar(d);
B.setMinWidth(0);
B.exclude();
B.addListener(r,this._onScrollBarX,this);
B.addListener(s,this._onChangeScrollbarXVisibility,this);
this._add(B,{row:1,column:0});
break;
case y:B=this._createScrollBar(h);
B.setMinHeight(0);
B.exclude();
B.addListener(r,this._onScrollBarY,this);
B.addListener(s,this._onChangeScrollbarYVisibility,this);
this._add(B,{row:0,column:1});
break;
case u:B=new qx.ui.core.Widget();
B.setWidth(0);
B.setHeight(0);
B.exclude();
this._add(B,{row:1,column:1});
break;
}return B||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,A);
},getPaneSize:function(){return this.getChildControl(w).getInnerSize();
},getItemTop:function(C){return this.getChildControl(w).getItemTop(C);
},getItemBottom:function(c){return this.getChildControl(w).getItemBottom(c);
},getItemLeft:function(E){return this.getChildControl(w).getItemLeft(E);
},getItemRight:function(H){return this.getChildControl(w).getItemRight(H);
},scrollToX:function(ba){qx.ui.core.queue.Manager.flush();
this.getChildControl(x).scrollTo(ba);
},scrollByX:function(z){qx.ui.core.queue.Manager.flush();
this.getChildControl(x).scrollBy(z);
},getScrollX:function(){var F=this.getChildControl(x,true);
return F?F.getPosition():0;
},scrollToY:function(D){qx.ui.core.queue.Manager.flush();
this.getChildControl(y).scrollTo(D);
},scrollByY:function(I){qx.ui.core.queue.Manager.flush();
this.getChildControl(y).scrollBy(I);
},getScrollY:function(){var G=this.getChildControl(y,true);
return G?G.getPosition():0;
},_onScrollBarX:function(e){this.getChildControl(w).scrollToX(e.getData());
},_onScrollBarY:function(e){this.getChildControl(w).scrollToY(e.getData());
},_onScrollPaneX:function(e){this.scrollToX(e.getData());
},_onScrollPaneY:function(e){this.scrollToY(e.getData());
},_onMouseWheel:function(e){var V=this._isChildControlVisible(x);
var W=this._isChildControlVisible(y);
var U=(W)?this.getChildControl(y,true):(V?this.getChildControl(x,true):null);

if(U){U.scrollBySteps(e.getWheelDelta());
}e.stop();
},_onChangeScrollbarXVisibility:function(e){var X=this._isChildControlVisible(x);
var Y=this._isChildControlVisible(y);

if(!X){this.scrollToX(0);
}X&&Y?this._showChildControl(u):this._excludeChildControl(u);
},_onChangeScrollbarYVisibility:function(e){var a=this._isChildControlVisible(x);
var b=this._isChildControlVisible(y);

if(!b){this.scrollToY(0);
}a&&b?this._showChildControl(u):this._excludeChildControl(u);
},_computeScrollbars:function(){var P=this.getChildControl(w);
var content=P.getChildren()[0];

if(!content){this._excludeChildControl(x);
this._excludeChildControl(y);
return;
}var J=this.getInnerSize();
var O=P.getInnerSize();
var M=P.getScrollSize();
if(!O||!M){return;
}var Q=this.getScrollbarX();
var R=this.getScrollbarY();

if(Q===v&&R===v){var N=M.width>J.width;
var S=M.height>J.height;
if((N||S)&&!(N&&S)){if(N){S=M.height>O.height;
}else if(S){N=M.width>O.width;
}}}else{var N=Q===t;
var S=R===t;
if(M.width>(N?O.width:J.width)&&Q===v){N=true;
}
if(M.height>(N?O.height:J.height)&&R===v){S=true;
}}if(N){var L=this.getChildControl(x);
L.show();
L.setMaximum(Math.max(0,M.width-O.width));
L.setKnobFactor((M.width===0)?0:O.width/M.width);
}else{this._excludeChildControl(x);
}
if(S){var K=this.getChildControl(y);
K.show();
K.setMaximum(Math.max(0,M.height-O.height));
K.setKnobFactor((M.height===0)?0:O.height/M.height);
}else{this._excludeChildControl(y);
}}}});
})();
(function(){var b="qx.ui.core.ISingleSelection",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeSelection":a},members:{getSelection:function(){return true;
},setSelection:function(d){return arguments.length==1;
},resetSelection:function(){return true;
},isSelected:function(e){return arguments.length==1;
},isSelectionEmpty:function(){return true;
},getSelectables:function(c){return arguments.length==1;
}}});
})();
(function(){var a="qx.ui.core.IMultiSelection";
qx.Interface.define(a,{extend:qx.ui.core.ISingleSelection,members:{selectAll:function(){return true;
},addToSelection:function(c){return arguments.length==1;
},removeFromSelection:function(b){return arguments.length==1;
}}});
})();
(function(){var a="qx.ui.form.IModelSelection";
qx.Interface.define(a,{members:{setModelSelection:function(b){},getModelSelection:function(){}}});
})();
(function(){var M="single",L="Boolean",K="one",J="changeSelection",I="mouseup",H="mousedown",G="losecapture",F="multi",E="_applyQuickSelection",D="__manager",w="mouseover",C="_applySelectionMode",z="_applyDragSelection",v="qx.ui.core.MMultiSelectionHandling",u="removeItem",y="keypress",x="qx.event.type.Data",A="addItem",t="additive",B="mousemove";
qx.Mixin.define(v,{construct:function(){var o=this.SELECTION_MANAGER;
var n=this.__manager=new o(this);
this.addListener(H,n.handleMouseDown,n);
this.addListener(I,n.handleMouseUp,n);
this.addListener(w,n.handleMouseOver,n);
this.addListener(B,n.handleMouseMove,n);
this.addListener(G,n.handleLoseCapture,n);
this.addListener(y,n.handleKeyPress,n);
this.addListener(A,n.handleAddItem,n);
this.addListener(u,n.handleRemoveItem,n);
n.addListener(J,this._onSelectionChange,this);
},events:{"changeSelection":x},properties:{selectionMode:{check:[M,F,t,K],init:M,apply:C},dragSelection:{check:L,init:false,apply:z},quickSelection:{check:L,init:false,apply:E}},members:{__manager:null,selectAll:function(){this.__manager.selectAll();
},isSelected:function(c){if(!qx.ui.core.Widget.contains(this,c)){throw new Error("Could not test if "+c+" is selected, because it is not a child element!");
}return this.__manager.isItemSelected(c);
},addToSelection:function(k){if(!qx.ui.core.Widget.contains(this,k)){throw new Error("Could not add + "+k+" to selection, because it is not a child element!");
}this.__manager.addItem(k);
},removeFromSelection:function(j){if(!qx.ui.core.Widget.contains(this,j)){throw new Error("Could not remove "+j+" from selection, because it is not a child element!");
}this.__manager.removeItem(j);
},selectRange:function(g,h){this.__manager.selectItemRange(g,h);
},resetSelection:function(){this.__manager.clearSelection();
},setSelection:function(a){for(var i=0;i<a.length;i++){if(!qx.ui.core.Widget.contains(this,a[i])){throw new Error("Could not select "+a[i]+", because it is not a child element!");
}}
if(a.length===0){this.resetSelection();
}else{var b=this.getSelection();

if(!qx.lang.Array.equals(b,a)){this.__manager.replaceSelection(a);
}}},getSelection:function(){return this.__manager.getSelection();
},getSortedSelection:function(){return this.__manager.getSortedSelection();
},isSelectionEmpty:function(){return this.__manager.isSelectionEmpty();
},getSelectionContext:function(){return this.__manager.getSelectionContext();
},_getManager:function(){return this.__manager;
},getSelectables:function(q){return this.__manager.getSelectables(q);
},invertSelection:function(){this.__manager.invertSelection();
},_getLeadItem:function(){var p=this.__manager.getMode();

if(p===M||p===K){return this.__manager.getSelectedItem();
}else{return this.__manager.getLeadItem();
}},_applySelectionMode:function(r,s){this.__manager.setMode(r);
},_applyDragSelection:function(d,f){this.__manager.setDrag(d);
},_applyQuickSelection:function(l,m){this.__manager.setQuick(l);
},_onSelectionChange:function(e){this.fireDataEvent(J,e.getData());
}},destruct:function(){this._disposeObjects(D);
}});
})();
(function(){var e="change",d="__modelSelection",c="qx.event.type.Data",b="qx.ui.form.MModelSelection",a="changeSelection";
qx.Mixin.define(b,{construct:function(){this.__modelSelection=new qx.data.Array();
this.__modelSelection.addListener(e,this.__onModelSelectionArrayChange,this);
this.addListener(a,this.__onModelSelectionChange,this);
},events:{changeModelSelection:c},members:{__modelSelection:null,__inSelectionChange:false,__onModelSelectionChange:function(){if(this.__inSelectionChange){return;
}var s=this.getSelection();
var q=[];

for(var i=0;i<s.length;i++){var t=s[i];
var r=t.getModel?t.getModel():null;

if(r!==null){q.push(r);
}}if(q.length===s.length){this.setModelSelection(q);
}},__onModelSelectionArrayChange:function(){this.__inSelectionChange=true;
var g=this.getSelectables(true);
var k=[];
var h=this.__modelSelection.toArray();

for(var i=0;i<h.length;i++){var m=h[i];

for(var j=0;j<g.length;j++){var n=g[j];
var f=n.getModel?n.getModel():null;

if(m===f){k.push(n);
break;
}}}this.setSelection(k);
this.__inSelectionChange=false;
var l=this.getSelection();

if(!qx.lang.Array.equals(l,k)){this.__onModelSelectionChange();
}},getModelSelection:function(){return this.__modelSelection;
},setModelSelection:function(o){if(!o){this.__modelSelection.removeAll();
return;
}{};
o.unshift(this.__modelSelection.getLength());
o.unshift(0);
var p=this.__modelSelection.splice.apply(this.__modelSelection,o);
p.dispose();
}},destruct:function(){this._disposeObjects(d);
}});
})();
(function(){var cn="one",cm="single",cl="selected",ck="additive",cj="multi",ci="PageUp",ch="under",cg="Left",cf="lead",ce="Down",cL="Up",cK="Boolean",cJ="PageDown",cI="anchor",cH="End",cG="Home",cF="Right",cE="right",cD="click",cC="above",cu="left",cv="Escape",cs="A",ct="Space",cq="_applyMode",cr="interval",co="changeSelection",cp="qx.event.type.Data",cw="quick",cx="key",cz="abstract",cy="__scrollTimer",cB="drag",cA="qx.ui.core.selection.Abstract";
qx.Class.define(cA,{type:cz,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__selection={};
},events:{"changeSelection":cp},properties:{mode:{check:[cm,cj,ck,cn],init:cm,apply:cq},drag:{check:cK,init:false},quick:{check:cK,init:false}},members:{__scrollStepX:0,__scrollStepY:0,__scrollTimer:null,__frameScroll:null,__lastRelX:null,__lastRelY:null,__frameLocation:null,__dragStartX:null,__dragStartY:null,__inCapture:null,__mouseX:null,__mouseY:null,__moveDirectionX:null,__moveDirectionY:null,__selectionModified:null,__selectionContext:null,__leadItem:null,__selection:null,__anchorItem:null,__mouseDownOnSelected:null,_userInteraction:false,getSelectionContext:function(){return this.__selectionContext;
},selectAll:function(){var bY=this.getMode();

if(bY==cm||bY==cn){throw new Error("Can not select all items in selection mode: "+bY);
}this._selectAllItems();
this._fireChange();
},selectItem:function(ca){this._setSelectedItem(ca);
var cb=this.getMode();

if(cb!==cm&&cb!==cn){this._setLeadItem(ca);
this._setAnchorItem(ca);
}this._scrollItemIntoView(ca);
this._fireChange();
},addItem:function(bC){var bD=this.getMode();

if(bD===cm||bD===cn){this._setSelectedItem(bC);
}else{if(!this._getAnchorItem()){this._setAnchorItem(bC);
}this._setLeadItem(bC);
this._addToSelection(bC);
}this._scrollItemIntoView(bC);
this._fireChange();
},removeItem:function(bF){this._removeFromSelection(bF);

if(this.getMode()===cn&&this.isSelectionEmpty()){var bG=this._getFirstSelectable();

if(bG){this.addItem(bG);
}if(bG==bF){return;
}}
if(this.getLeadItem()==bF){this._setLeadItem(null);
}
if(this._getAnchorItem()==bF){this._setAnchorItem(null);
}this._fireChange();
},selectItemRange:function(bN,bO){var bP=this.getMode();

if(bP==cm||bP==cn){throw new Error("Can not select multiple items in selection mode: "+bP);
}this._selectItemRange(bN,bO);
this._setAnchorItem(bN);
this._setLeadItem(bO);
this._scrollItemIntoView(bO);
this._fireChange();
},clearSelection:function(){if(this.getMode()==cn){return;
}this._clearSelection();
this._setLeadItem(null);
this._setAnchorItem(null);
this._fireChange();
},replaceSelection:function(H){var I=this.getMode();

if(I==cn||I===cm){if(H.length>1){throw new Error("Could not select more than one items in mode: "+I+"!");
}
if(H.length==1){this.selectItem(H[0]);
}else{this.clearSelection();
}return;
}else{this._replaceMultiSelection(H);
}},getSelectedItem:function(){var g=this.getMode();

if(g===cm||g===cn){return this._getSelectedItem()||null;
}throw new Error("The method getSelectedItem() is only supported in 'single' and 'one' selection mode!");
},getSelection:function(){return qx.lang.Object.getValues(this.__selection);
},getSortedSelection:function(){var bd=this.getSelectables();
var bc=qx.lang.Object.getValues(this.__selection);
bc.sort(function(a,b){return bd.indexOf(a)-bd.indexOf(b);
});
return bc;
},isItemSelected:function(be){var bf=this._selectableToHashCode(be);
return this.__selection[bf]!==undefined;
},isSelectionEmpty:function(){return qx.lang.Object.isEmpty(this.__selection);
},invertSelection:function(){var bU=this.getMode();

if(bU===cm||bU===cn){throw new Error("The method invertSelection() is only supported in 'multi' and 'additive' selection mode!");
}var bT=this.getSelectables();

for(var i=0;i<bT.length;i++){this._toggleInSelection(bT[i]);
}this._fireChange();
},_setLeadItem:function(E){var F=this.__leadItem;

if(F!==null){this._styleSelectable(F,cf,false);
}
if(E!==null){this._styleSelectable(E,cf,true);
}this.__leadItem=E;
},getLeadItem:function(){return this.__leadItem!==null?this.__leadItem:null;
},_setAnchorItem:function(Y){var ba=this.__anchorItem;

if(ba){this._styleSelectable(ba,cI,false);
}
if(Y){this._styleSelectable(Y,cI,true);
}this.__anchorItem=Y;
},_getAnchorItem:function(){return this.__anchorItem!==null?this.__anchorItem:null;
},_isSelectable:function(bs){throw new Error("Abstract method call: _isSelectable()");
},_getSelectableFromMouseEvent:function(event){var bL=event.getTarget();
return this._isSelectable(bL)?bL:null;
},_selectableToHashCode:function(cY){throw new Error("Abstract method call: _selectableToHashCode()");
},_styleSelectable:function(h,j,k){throw new Error("Abstract method call: _styleSelectable()");
},_capture:function(){throw new Error("Abstract method call: _capture()");
},_releaseCapture:function(){throw new Error("Abstract method call: _releaseCapture()");
},_getLocation:function(){throw new Error("Abstract method call: _getLocation()");
},_getDimension:function(){throw new Error("Abstract method call: _getDimension()");
},_getSelectableLocationX:function(bE){throw new Error("Abstract method call: _getSelectableLocationX()");
},_getSelectableLocationY:function(bb){throw new Error("Abstract method call: _getSelectableLocationY()");
},_getScroll:function(){throw new Error("Abstract method call: _getScroll()");
},_scrollBy:function(W,X){throw new Error("Abstract method call: _scrollBy()");
},_scrollItemIntoView:function(m){throw new Error("Abstract method call: _scrollItemIntoView()");
},getSelectables:function(B){throw new Error("Abstract method call: getSelectables()");
},_getSelectableRange:function(U,V){throw new Error("Abstract method call: _getSelectableRange()");
},_getFirstSelectable:function(){throw new Error("Abstract method call: _getFirstSelectable()");
},_getLastSelectable:function(){throw new Error("Abstract method call: _getLastSelectable()");
},_getRelatedSelectable:function(cM,cN){throw new Error("Abstract method call: _getRelatedSelectable()");
},_getPage:function(cc,cd){throw new Error("Abstract method call: _getPage()");
},_applyMode:function(bQ,bR){this._setLeadItem(null);
this._setAnchorItem(null);
this._clearSelection();
if(bQ===cn){var bS=this._getFirstSelectable();

if(bS){this._setSelectedItem(bS);
this._scrollItemIntoView(bS);
}}this._fireChange();
},handleMouseOver:function(event){this._userInteraction=true;

if(!this.getQuick()){this._userInteraction=false;
return;
}var S=this.getMode();

if(S!==cn&&S!==cm){this._userInteraction=false;
return;
}var R=this._getSelectableFromMouseEvent(event);

if(R===null){this._userInteraction=false;
return;
}this._setSelectedItem(R);
this._fireChange(cw);
this._userInteraction=false;
},handleMouseDown:function(event){this._userInteraction=true;
var N=this._getSelectableFromMouseEvent(event);

if(N===null){this._userInteraction=false;
return;
}var P=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var M=event.isShiftPressed();
if(this.isItemSelected(N)&&!M&&!P&&!this.getDrag()){this.__mouseDownOnSelected=N;
this._userInteraction=false;
return;
}else{this.__mouseDownOnSelected=null;
}this._scrollItemIntoView(N);
switch(this.getMode()){case cm:case cn:this._setSelectedItem(N);
break;
case ck:this._setLeadItem(N);
this._setAnchorItem(N);
this._toggleInSelection(N);
break;
case cj:this._setLeadItem(N);
if(M){var O=this._getAnchorItem();

if(O===null){O=this._getFirstSelectable();
this._setAnchorItem(O);
}this._selectItemRange(O,N,P);
}else if(P){this._setAnchorItem(N);
this._toggleInSelection(N);
}else{this._setAnchorItem(N);
this._setSelectedItem(N);
}break;
}var Q=this.getMode();

if(this.getDrag()&&Q!==cm&&Q!==cn&&!M&&!P){this.__frameLocation=this._getLocation();
this.__frameScroll=this._getScroll();
this.__dragStartX=event.getDocumentLeft()+this.__frameScroll.left;
this.__dragStartY=event.getDocumentTop()+this.__frameScroll.top;
this.__inCapture=true;
this._capture();
}this._fireChange(cD);
this._userInteraction=false;
},handleMouseUp:function(event){this._userInteraction=true;
var bK=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var bH=event.isShiftPressed();

if(!bK&&!bH&&this.__mouseDownOnSelected){var bI=this._getSelectableFromMouseEvent(event);

if(bI===null||!this.isItemSelected(bI)){this._userInteraction=false;
return;
}var bJ=this.getMode();

if(bJ===ck){this._removeFromSelection(bI);
}else{this._setSelectedItem(bI);

if(this.getMode()===cj){this._setLeadItem(bI);
this._setAnchorItem(bI);
}}this._userInteraction=false;
}this._cleanup();
},handleLoseCapture:function(event){this._cleanup();
},handleMouseMove:function(event){if(!this.__inCapture){return;
}this.__mouseX=event.getDocumentLeft();
this.__mouseY=event.getDocumentTop();
this._userInteraction=true;
var bh=this.__mouseX+this.__frameScroll.left;

if(bh>this.__dragStartX){this.__moveDirectionX=1;
}else if(bh<this.__dragStartX){this.__moveDirectionX=-1;
}else{this.__moveDirectionX=0;
}var bg=this.__mouseY+this.__frameScroll.top;

if(bg>this.__dragStartY){this.__moveDirectionY=1;
}else if(bg<this.__dragStartY){this.__moveDirectionY=-1;
}else{this.__moveDirectionY=0;
}var location=this.__frameLocation;

if(this.__mouseX<location.left){this.__scrollStepX=this.__mouseX-location.left;
}else if(this.__mouseX>location.right){this.__scrollStepX=this.__mouseX-location.right;
}else{this.__scrollStepX=0;
}
if(this.__mouseY<location.top){this.__scrollStepY=this.__mouseY-location.top;
}else if(this.__mouseY>location.bottom){this.__scrollStepY=this.__mouseY-location.bottom;
}else{this.__scrollStepY=0;
}if(!this.__scrollTimer){this.__scrollTimer=new qx.event.Timer(100);
this.__scrollTimer.addListener(cr,this._onInterval,this);
}this.__scrollTimer.start();
this._autoSelect();
event.stopPropagation();
this._userInteraction=false;
},handleAddItem:function(e){var G=e.getData();

if(this.getMode()===cn&&this.isSelectionEmpty()){this.addItem(G);
}},handleRemoveItem:function(e){this.removeItem(e.getData());
},_cleanup:function(){if(!this.getDrag()&&this.__inCapture){return;
}if(this.__selectionModified){this._fireChange(cD);
}delete this.__inCapture;
delete this.__lastRelX;
delete this.__lastRelY;
this._releaseCapture();
if(this.__scrollTimer){this.__scrollTimer.stop();
}},_onInterval:function(e){this._scrollBy(this.__scrollStepX,this.__scrollStepY);
this.__frameScroll=this._getScroll();
this._autoSelect();
},_autoSelect:function(){var x=this._getDimension();
var q=Math.max(0,Math.min(this.__mouseX-this.__frameLocation.left,x.width))+this.__frameScroll.left;
var p=Math.max(0,Math.min(this.__mouseY-this.__frameLocation.top,x.height))+this.__frameScroll.top;
if(this.__lastRelX===q&&this.__lastRelY===p){return;
}this.__lastRelX=q;
this.__lastRelY=p;
var z=this._getAnchorItem();
var s=z;
var v=this.__moveDirectionX;
var y,r;

while(v!==0){y=v>0?this._getRelatedSelectable(s,cE):this._getRelatedSelectable(s,cu);
if(y!==null){r=this._getSelectableLocationX(y);
if((v>0&&r.left<=q)||(v<0&&r.right>=q)){s=y;
continue;
}}break;
}var w=this.__moveDirectionY;
var u,t;

while(w!==0){u=w>0?this._getRelatedSelectable(s,ch):this._getRelatedSelectable(s,cC);
if(u!==null){t=this._getSelectableLocationY(u);
if((w>0&&t.top<=p)||(w<0&&t.bottom>=p)){s=u;
continue;
}}break;
}var A=this.getMode();

if(A===cj){this._selectItemRange(z,s);
}else if(A===ck){if(this.isItemSelected(z)){this._selectItemRange(z,s,true);
}else{this._deselectItemRange(z,s);
}this._setAnchorItem(s);
}this._fireChange(cB);
},__navigationKeys:{Home:1,Down:1,Right:1,PageDown:1,End:1,Up:1,Left:1,PageUp:1},handleKeyPress:function(event){this._userInteraction=true;
var by,bx;
var bA=event.getKeyIdentifier();
var bz=this.getMode();
var bu=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var bv=event.isShiftPressed();
var bw=false;

if(bA===cs&&bu){if(bz!==cm&&bz!==cn){this._selectAllItems();
bw=true;
}}else if(bA===cv){if(bz!==cm&&bz!==cn){this._clearSelection();
bw=true;
}}else if(bA===ct){var bt=this.getLeadItem();

if(bt&&!bv){if(bu||bz===ck){this._toggleInSelection(bt);
}else{this._setSelectedItem(bt);
}bw=true;
}}else if(this.__navigationKeys[bA]){bw=true;

if(bz===cm||bz==cn){by=this._getSelectedItem();
}else{by=this.getLeadItem();
}
if(by!==null){switch(bA){case cG:bx=this._getFirstSelectable();
break;
case cH:bx=this._getLastSelectable();
break;
case cL:bx=this._getRelatedSelectable(by,cC);
break;
case ce:bx=this._getRelatedSelectable(by,ch);
break;
case cg:bx=this._getRelatedSelectable(by,cu);
break;
case cF:bx=this._getRelatedSelectable(by,cE);
break;
case ci:bx=this._getPage(by,true);
break;
case cJ:bx=this._getPage(by,false);
break;
}}else{switch(bA){case cG:case ce:case cF:case cJ:bx=this._getFirstSelectable();
break;
case cH:case cL:case cg:case ci:bx=this._getLastSelectable();
break;
}}if(bx!==null){switch(bz){case cm:case cn:this._setSelectedItem(bx);
break;
case ck:this._setLeadItem(bx);
break;
case cj:if(bv){var bB=this._getAnchorItem();

if(bB===null){this._setAnchorItem(bB=this._getFirstSelectable());
}this._setLeadItem(bx);
this._selectItemRange(bB,bx,bu);
}else{this._setAnchorItem(bx);
this._setLeadItem(bx);

if(!bu){this._setSelectedItem(bx);
}}break;
}this._scrollItemIntoView(bx);
}}
if(bw){event.stop();
this._fireChange(cx);
}this._userInteraction=false;
},_selectAllItems:function(){var bM=this.getSelectables();

for(var i=0,l=bM.length;i<l;i++){this._addToSelection(bM[i]);
}},_clearSelection:function(){var C=this.__selection;

for(var D in C){this._removeFromSelection(C[D]);
}this.__selection={};
},_selectItemRange:function(cR,cS,cT){var cW=this._getSelectableRange(cR,cS);
if(!cT){var cV=this.__selection;
var cX=this.__rangeToMap(cW);

for(var cU in cV){if(!cX[cU]){this._removeFromSelection(cV[cU]);
}}}for(var i=0,l=cW.length;i<l;i++){this._addToSelection(cW[i]);
}},_deselectItemRange:function(cO,cP){var cQ=this._getSelectableRange(cO,cP);

for(var i=0,l=cQ.length;i<l;i++){this._removeFromSelection(cQ[i]);
}},__rangeToMap:function(J){var L={};
var K;

for(var i=0,l=J.length;i<l;i++){K=J[i];
L[this._selectableToHashCode(K)]=K;
}return L;
},_getSelectedItem:function(){for(var T in this.__selection){return this.__selection[T];
}return null;
},_setSelectedItem:function(bV){if(this._isSelectable(bV)){var bW=this.__selection;
var bX=this._selectableToHashCode(bV);

if(!bW[bX]||qx.lang.Object.hasMinLength(bW,2)){this._clearSelection();
this._addToSelection(bV);
}}},_addToSelection:function(d){var f=this._selectableToHashCode(d);

if(!this.__selection[f]&&this._isSelectable(d)){this.__selection[f]=d;
this._styleSelectable(d,cl,true);
this.__selectionModified=true;
}},_toggleInSelection:function(n){var o=this._selectableToHashCode(n);

if(!this.__selection[o]){this.__selection[o]=n;
this._styleSelectable(n,cl,true);
}else{delete this.__selection[o];
this._styleSelectable(n,cl,false);
}this.__selectionModified=true;
},_removeFromSelection:function(bi){var bj=this._selectableToHashCode(bi);

if(this.__selection[bj]!=null){delete this.__selection[bj];
this._styleSelectable(bi,cl,false);
this.__selectionModified=true;
}},_replaceMultiSelection:function(bk){var bn=false;
var bq,bp;
var bl={};

for(var i=0,l=bk.length;i<l;i++){bq=bk[i];

if(this._isSelectable(bq)){bp=this._selectableToHashCode(bq);
bl[bp]=bq;
}}var br=bk[0];
var bm=bq;
var bo=this.__selection;

for(var bp in bo){if(bl[bp]){delete bl[bp];
}else{bq=bo[bp];
delete bo[bp];
this._styleSelectable(bq,cl,false);
bn=true;
}}for(var bp in bl){bq=bo[bp]=bl[bp];
this._styleSelectable(bq,cl,true);
bn=true;
}if(!bn){return false;
}this._scrollItemIntoView(bm);
this._setLeadItem(br);
this._setAnchorItem(br);
this.__selectionModified=true;
this._fireChange();
},_fireChange:function(c){if(this.__selectionModified){this.__selectionContext=c||null;
this.fireDataEvent(co,this.getSelection());
delete this.__selectionModified;
}}},destruct:function(){this._disposeObjects(cy);
this.__selection=this.__mouseDownOnSelected=this.__anchorItem=null;
this.__leadItem=null;
}});
})();
(function(){var v="vertical",u="under",t="above",s="qx.ui.core.selection.Widget",r="left",q="right";
qx.Class.define(s,{extend:qx.ui.core.selection.Abstract,construct:function(c){qx.ui.core.selection.Abstract.call(this);
this.__widget=c;
},members:{__widget:null,_isSelectable:function(P){return this._isItemSelectable(P)&&P.getLayoutParent()===this.__widget;
},_selectableToHashCode:function(N){return N.$$hash;
},_styleSelectable:function(d,e,f){f?d.addState(e):d.removeState(e);
},_capture:function(){this.__widget.capture();
},_releaseCapture:function(){this.__widget.releaseCapture();
},_isItemSelectable:function(y){if(this._userInteraction){return y.isVisible()&&y.isEnabled();
}else{return y.isVisible();
}},_getWidget:function(){return this.__widget;
},_getLocation:function(){var O=this.__widget.getContentElement().getDomElement();
return O?qx.bom.element.Location.get(O):null;
},_getDimension:function(){return this.__widget.getInnerSize();
},_getSelectableLocationX:function(a){var b=a.getBounds();

if(b){return {left:b.left,right:b.left+b.width};
}},_getSelectableLocationY:function(w){var x=w.getBounds();

if(x){return {top:x.top,bottom:x.top+x.height};
}},_getScroll:function(){return {left:0,top:0};
},_scrollBy:function(o,p){},_scrollItemIntoView:function(L){this.__widget.scrollChildIntoView(L);
},getSelectables:function(A){var B=false;

if(!A){B=this._userInteraction;
this._userInteraction=true;
}var E=this.__widget.getChildren();
var C=[];
var D;

for(var i=0,l=E.length;i<l;i++){D=E[i];

if(this._isItemSelectable(D)){C.push(D);
}}this._userInteraction=B;
return C;
},_getSelectableRange:function(F,G){if(F===G){return [F];
}var K=this.__widget.getChildren();
var H=[];
var J=false;
var I;

for(var i=0,l=K.length;i<l;i++){I=K[i];

if(I===F||I===G){if(J){H.push(I);
break;
}else{J=true;
}}
if(J&&this._isItemSelectable(I)){H.push(I);
}}return H;
},_getFirstSelectable:function(){var z=this.__widget.getChildren();

for(var i=0,l=z.length;i<l;i++){if(this._isItemSelectable(z[i])){return z[i];
}}return null;
},_getLastSelectable:function(){var M=this.__widget.getChildren();

for(var i=M.length-1;i>0;i--){if(this._isItemSelectable(M[i])){return M[i];
}}return null;
},_getRelatedSelectable:function(g,h){var m=this.__widget.getOrientation()===v;
var k=this.__widget.getChildren();
var j=k.indexOf(g);
var n;

if((m&&h===t)||(!m&&h===r)){for(var i=j-1;i>=0;i--){n=k[i];

if(this._isItemSelectable(n)){return n;
}}}else if((m&&h===u)||(!m&&h===q)){for(var i=j+1;i<k.length;i++){n=k[i];

if(this._isItemSelectable(n)){return n;
}}}return null;
},_getPage:function(Q,R){if(R){return this._getFirstSelectable();
}else{return this._getLastSelectable();
}}},destruct:function(){this.__widget=null;
}});
})();
(function(){var a="qx.ui.core.selection.ScrollArea";
qx.Class.define(a,{extend:qx.ui.core.selection.Widget,members:{_isSelectable:function(c){return this._isItemSelectable(c)&&c.getLayoutParent()===this._getWidget().getChildrenContainer();
},_getDimension:function(){return this._getWidget().getPaneSize();
},_getScroll:function(){var b=this._getWidget();
return {left:b.getScrollX(),top:b.getScrollY()};
},_scrollBy:function(d,e){var f=this._getWidget();
f.scrollByX(d);
f.scrollByY(e);
},_getPage:function(g,h){var m=this.getSelectables();
var length=m.length;
var p=m.indexOf(g);
if(p===-1){throw new Error("Invalid lead item: "+g);
}var j=this._getWidget();
var r=j.getScrollY();
var innerHeight=j.getInnerSize().height;
var top,l,q;

if(h){var o=r;
var i=p;
while(1){for(;i>=0;i--){top=j.getItemTop(m[i]);
if(top<o){q=i+1;
break;
}}if(q==null){var s=this._getFirstSelectable();
return s==g?null:s;
}if(q>=p){o-=innerHeight+r-j.getItemBottom(g);
q=null;
continue;
}return m[q];
}}else{var n=innerHeight+r;
var i=p;
while(1){for(;i<length;i++){l=j.getItemBottom(m[i]);
if(l>n){q=i-1;
break;
}}if(q==null){var k=this._getLastSelectable();
return k==g?null:k;
}if(q<=p){n+=j.getItemTop(g)-r;
q=null;
continue;
}return m[q];
}}}}});
})();
(function(){var m="horizontal",k="qx.event.type.Data",j="vertical",h="",g="qx.ui.form.List",f="__content",d="Enter",c="one",b="addChildWidget",a="_applySpacing",y="Boolean",x="Integer",w="action",v="keyinput",u="addItem",t="removeChildWidget",s="_applyOrientation",r="single",q="keypress",p="list",n="pane",o="removeItem";
qx.Class.define(g,{extend:qx.ui.core.scroll.AbstractScrollArea,implement:[qx.ui.core.IMultiSelection,qx.ui.form.IForm,qx.ui.form.IModelSelection],include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MMultiSelectionHandling,qx.ui.form.MForm,qx.ui.form.MModelSelection],construct:function(M){qx.ui.core.scroll.AbstractScrollArea.call(this);
this.__content=new qx.ui.container.Composite();
this.__content.addListener(b,this._onAddChild,this);
this.__content.addListener(t,this._onRemoveChild,this);
this.getChildControl(n).add(this.__content);
if(M){this.setOrientation(m);
}else{this.initOrientation();
}this.addListener(q,this._onKeyPress);
this.addListener(v,this._onKeyInput);
this.__pressedString=h;
},events:{addItem:k,removeItem:k},properties:{appearance:{refine:true,init:p},focusable:{refine:true,init:true},orientation:{check:[m,j],init:j,apply:s},spacing:{check:x,init:0,apply:a,themeable:true},enableInlineFind:{check:y,init:true}},members:{__pressedString:null,__lastKeyPress:null,__content:null,SELECTION_MANAGER:qx.ui.core.selection.ScrollArea,getChildrenContainer:function(){return this.__content;
},_onAddChild:function(e){this.fireDataEvent(u,e.getData());
},_onRemoveChild:function(e){this.fireDataEvent(o,e.getData());
},handleKeyPress:function(e){if(!this._onKeyPress(e)){this._getManager().handleKeyPress(e);
}},_applyOrientation:function(N,O){var P=N===m;
var Q=P?new qx.ui.layout.HBox():new qx.ui.layout.VBox();
var content=this.__content;
content.setLayout(Q);
content.setAllowGrowX(!P);
content.setAllowGrowY(P);
this._applySpacing(this.getSpacing());
},_applySpacing:function(z,A){this.__content.getLayout().setSpacing(z);
},_onKeyPress:function(e){if(e.getKeyIdentifier()==d&&!e.isAltPressed()){var L=this.getSelection();

for(var i=0;i<L.length;i++){L[i].fireEvent(w);
}return true;
}return false;
},_onKeyInput:function(e){if(!this.getEnableInlineFind()){return;
}var B=this.getSelectionMode();

if(!(B===r||B===c)){return;
}if(((new Date).valueOf()-this.__lastKeyPress)>1000){this.__pressedString=h;
}this.__pressedString+=e.getChar();
var C=this.findItemByLabelFuzzy(this.__pressedString);
if(C){this.setSelection([C]);
}this.__lastKeyPress=(new Date).valueOf();
},findItemByLabelFuzzy:function(I){I=I.toLowerCase();
var J=this.getChildren();
for(var i=0,l=J.length;i<l;i++){var K=J[i].getLabel();
if(K&&K.toLowerCase().indexOf(I)==0){return J[i];
}}return null;
},findItem:function(D,E){if(E!==false){D=D.toLowerCase();
}var F=this.getChildren();
var H;
for(var i=0,l=F.length;i<l;i++){H=F[i];
var G=H.getLabel();

if(G!=null){if(G.translate){G=G.translate();
}
if(E!==false){G=G.toLowerCase();
}
if(G.toString()==D.toString()){return H;
}}}return null;
}},destruct:function(){this._disposeObjects(f);
}});
})();
(function(){var b="qx.ui.core.scroll.IScrollBar",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"scroll":a},properties:{orientation:{},maximum:{},position:{},knobFactor:{}},members:{scrollTo:function(c){this.assertNumber(c);
},scrollBy:function(d){this.assertNumber(d);
},scrollBySteps:function(e){this.assertNumber(e);
}}});
})();
(function(){var l="horizontal",k="px",j="scroll",i="vertical",h="-1px",g="qx.client",f="0",d="hidden",c="mousedown",b="qx.ui.core.scroll.NativeScrollBar",A="PositiveNumber",z="Integer",y="mousemove",x="_applyMaximum",w="_applyOrientation",v="appear",u="opera",t="PositiveInteger",s="mshtml",r="mouseup",p="Number",q="_applyPosition",n="scrollbar",o="__scrollPaneElement",m="native";
qx.Class.define(b,{extend:qx.ui.core.Widget,implement:qx.ui.core.scroll.IScrollBar,construct:function(R){qx.ui.core.Widget.call(this);
this.addState(m);
this.getContentElement().addListener(j,this._onScroll,this);
this.addListener(c,this._stopPropagation,this);
this.addListener(r,this._stopPropagation,this);
this.addListener(y,this._stopPropagation,this);

if(qx.core.Variant.isSet(g,u)){this.addListener(v,this._onAppear,this);
}this.getContentElement().add(this._getScrollPaneElement());
if(R!=null){this.setOrientation(R);
}else{this.initOrientation();
}},properties:{appearance:{refine:true,init:n},orientation:{check:[l,i],init:l,apply:w},maximum:{check:t,apply:x,init:100},position:{check:p,init:0,apply:q,event:j},singleStep:{check:z,init:20},knobFactor:{check:A,nullable:true}},members:{__isHorizontal:null,__scrollPaneElement:null,_getScrollPaneElement:function(){if(!this.__scrollPaneElement){this.__scrollPaneElement=new qx.html.Element();
}return this.__scrollPaneElement;
},renderLayout:function(E,top,F,G){var H=qx.ui.core.Widget.prototype.renderLayout.call(this,E,top,F,G);
this._updateScrollBar();
return H;
},_getContentHint:function(){var D=qx.bom.element.Overflow.getScrollbarWidth();
return {width:this.__isHorizontal?100:D,maxWidth:this.__isHorizontal?null:D,minWidth:this.__isHorizontal?null:D,height:this.__isHorizontal?D:100,maxHeight:this.__isHorizontal?D:null,minHeight:this.__isHorizontal?D:null};
},_applyEnabled:function(P,Q){qx.ui.core.Widget.prototype._applyEnabled.call(this,P,Q);
this._updateScrollBar();
},_applyMaximum:function(B){this._updateScrollBar();
},_applyPosition:function(M){var content=this.getContentElement();

if(this.__isHorizontal){content.scrollToX(M);
}else{content.scrollToY(M);
}},_applyOrientation:function(S,T){var U=this.__isHorizontal=S===l;
this.set({allowGrowX:U,allowShrinkX:U,allowGrowY:!U,allowShrinkY:!U});

if(U){this.replaceState(i,l);
}else{this.replaceState(l,i);
}this.getContentElement().setStyles({overflowX:U?j:d,overflowY:U?d:j});
qx.ui.core.queue.Layout.add(this);
},_updateScrollBar:function(){var J=this.__isHorizontal;
var K=this.getBounds();

if(!K){return;
}
if(this.isEnabled()){var L=J?K.width:K.height;
var I=this.getMaximum()+L;
}else{I=0;
}if(qx.core.Variant.isSet(g,s)){var K=this.getBounds();
this.getContentElement().setStyles({left:J?f:h,top:J?h:f,width:(J?K.width:K.width+1)+k,height:(J?K.height+1:K.height)+k});
}this._getScrollPaneElement().setStyles({left:0,top:0,width:(J?I:1)+k,height:(J?1:I)+k});
this.scrollTo(this.getPosition());
},scrollTo:function(C){this.setPosition(Math.max(0,Math.min(this.getMaximum(),C)));
},scrollBy:function(a){this.scrollTo(this.getPosition()+a);
},scrollBySteps:function(V){var W=this.getSingleStep();
this.scrollBy(V*W);
},_onScroll:function(e){var O=this.getContentElement();
var N=this.__isHorizontal?O.getScrollX():O.getScrollY();
this.setPosition(N);
},_onAppear:function(e){this.scrollTo(this.getPosition());
},_stopPropagation:function(e){e.stopPropagation();
}},destruct:function(){this._disposeObjects(o);
}});
})();
(function(){var k="slider",j="horizontal",i="button-begin",h="vertical",g="button-end",f="Integer",d="execute",c="right",b="left",a="down",z="up",y="PositiveNumber",x="changeValue",w="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getMaximum()",v="_applyKnobFactor",u="knob",t="qx.ui.core.scroll.ScrollBar",s="resize",r="_applyOrientation",q="_applyPageStep",o="PositiveInteger",p="scroll",m="_applyPosition",n="scrollbar",l="_applyMaximum";
qx.Class.define(t,{extend:qx.ui.core.Widget,implement:qx.ui.core.scroll.IScrollBar,construct:function(O){qx.ui.core.Widget.call(this);
this._createChildControl(i);
this._createChildControl(k).addListener(s,this._onResizeSlider,this);
this._createChildControl(g);
if(O!=null){this.setOrientation(O);
}else{this.initOrientation();
}},properties:{appearance:{refine:true,init:n},orientation:{check:[j,h],init:j,apply:r},maximum:{check:o,apply:l,init:100},position:{check:w,init:0,apply:m,event:p},singleStep:{check:f,init:20},pageStep:{check:f,init:10,apply:q},knobFactor:{check:y,apply:v,nullable:true}},members:{__offset:2,_createChildControlImpl:function(C){var D;

switch(C){case k:D=new qx.ui.core.scroll.ScrollSlider();
D.setPageStep(100);
D.setFocusable(false);
D.addListener(x,this._onChangeSliderValue,this);
this._add(D,{flex:1});
break;
case i:D=new qx.ui.form.RepeatButton();
D.setFocusable(false);
D.addListener(d,this._onExecuteBegin,this);
this._add(D);
break;
case g:D=new qx.ui.form.RepeatButton();
D.setFocusable(false);
D.addListener(d,this._onExecuteEnd,this);
this._add(D);
break;
}return D||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,C);
},_applyMaximum:function(A){this.getChildControl(k).setMaximum(A);
},_applyPosition:function(E){this.getChildControl(k).setValue(E);
},_applyKnobFactor:function(R){this.getChildControl(k).setKnobFactor(R);
},_applyPageStep:function(B){this.getChildControl(k).setPageStep(B);
},_applyOrientation:function(F,G){var H=this._getLayout();

if(H){H.dispose();
}if(F===j){this._setLayout(new qx.ui.layout.HBox());
this.setAllowStretchX(true);
this.setAllowStretchY(false);
this.replaceState(h,j);
this.getChildControl(i).replaceState(z,b);
this.getChildControl(g).replaceState(a,c);
}else{this._setLayout(new qx.ui.layout.VBox());
this.setAllowStretchX(false);
this.setAllowStretchY(true);
this.replaceState(j,h);
this.getChildControl(i).replaceState(b,z);
this.getChildControl(g).replaceState(c,a);
}this.getChildControl(k).setOrientation(F);
},scrollTo:function(M){this.getChildControl(k).slideTo(M);
},scrollBy:function(N){this.getChildControl(k).slideBy(N);
},scrollBySteps:function(P){var Q=this.getSingleStep();
this.getChildControl(k).slideBy(P*Q);
},_onExecuteBegin:function(e){this.scrollBy(-this.getSingleStep());
},_onExecuteEnd:function(e){this.scrollBy(this.getSingleStep());
},_onChangeSliderValue:function(e){this.setPosition(e.getData());
},_onResizeSlider:function(e){var I=this.getChildControl(k).getChildControl(u);
var L=I.getSizeHint();
var J=false;
var K=this.getChildControl(k).getInnerSize();

if(this.getOrientation()==h){if(K.height<L.minHeight+this.__offset){J=true;
}}else{if(K.width<L.minWidth+this.__offset){J=true;
}}
if(J){I.exclude();
}else{I.show();
}}}});
})();
(function(){var b="qx.ui.form.INumberForm",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var a="qx.ui.form.IRange";
qx.Interface.define(a,{members:{setMinimum:function(e){return arguments.length==1;
},getMinimum:function(){},setMaximum:function(b){return arguments.length==1;
},getMaximum:function(){},setSingleStep:function(d){return arguments.length==1;
},getSingleStep:function(){},setPageStep:function(c){return arguments.length==1;
},getPageStep:function(){}}});
})();
(function(){var v="knob",u="horizontal",t="vertical",s="Integer",r="hovered",q="left",p="top",o="mouseup",n="pressed",m="px",bh="changeValue",bg="interval",bf="mousemove",be="resize",bd="slider",bc="mousedown",bb="PageUp",ba="mouseout",Y='qx.event.type.Data',X="Left",C="Down",D="Up",A="dblclick",B="qx.ui.form.Slider",y="PageDown",z="mousewheel",w="_applyValue",x="_applyKnobFactor",E="End",F="height",M="Right",K="width",Q="_applyOrientation",O="Home",T="mouseover",S="floor",H="_applyMinimum",W="click",V="typeof value==='number'&&value>=this.getMinimum()&&value<=this.getMaximum()",U="keypress",G="ceil",I="losecapture",J="contextmenu",L="_applyMaximum",N="Number",P="changeMaximum",R="changeMinimum";
qx.Class.define(B,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IForm,qx.ui.form.INumberForm,qx.ui.form.IRange],include:[qx.ui.form.MForm],construct:function(by){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.Canvas());
this.addListener(U,this._onKeyPress);
this.addListener(z,this._onMouseWheel);
this.addListener(bc,this._onMouseDown);
this.addListener(o,this._onMouseUp);
this.addListener(I,this._onMouseUp);
this.addListener(be,this._onUpdate);
this.addListener(J,this._onStopEvent);
this.addListener(W,this._onStopEvent);
this.addListener(A,this._onStopEvent);
if(by!=null){this.setOrientation(by);
}else{this.initOrientation();
}},events:{changeValue:Y},properties:{appearance:{refine:true,init:bd},focusable:{refine:true,init:true},orientation:{check:[u,t],init:u,apply:Q},value:{check:V,init:0,apply:w,nullable:true},minimum:{check:s,init:0,apply:H,event:R},maximum:{check:s,init:100,apply:L,event:P},singleStep:{check:s,init:1},pageStep:{check:s,init:10},knobFactor:{check:N,apply:x,nullable:true}},members:{__sliderLocation:null,__knobLocation:null,__knobSize:null,__dragMode:null,__dragOffset:null,__trackingMode:null,__trackingDirection:null,__trackingEnd:null,__timer:null,__dragTimer:null,__lastValueEvent:null,__dragValue:null,_forwardStates:{invalid:true},_createChildControlImpl:function(bM){var bN;

switch(bM){case v:bN=new qx.ui.core.Widget();
bN.addListener(be,this._onUpdate,this);
bN.addListener(T,this._onMouseOver);
bN.addListener(ba,this._onMouseOut);
this._add(bN);
break;
}return bN||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,bM);
},_onMouseOver:function(e){this.addState(r);
},_onMouseOut:function(e){this.removeState(r);
},_onMouseWheel:function(e){var bk=e.getWheelDelta()>0?1:-1;
this.slideBy(bk*this.getSingleStep());
e.stop();
},_onKeyPress:function(e){var bH=this.getOrientation()===u;
var bG=bH?X:D;
var forward=bH?M:C;

switch(e.getKeyIdentifier()){case forward:this.slideForward();
break;
case bG:this.slideBack();
break;
case y:this.slidePageForward();
break;
case bb:this.slidePageBack();
break;
case O:this.slideToBegin();
break;
case E:this.slideToEnd();
break;
default:return;
}e.stop();
},_onMouseDown:function(e){if(this.__dragMode){return;
}var g=this.__isHorizontal;
var d=this.getChildControl(v);
var f=g?q:p;
var i=g?e.getDocumentLeft():e.getDocumentTop();
var j=this.__sliderLocation=qx.bom.element.Location.get(this.getContentElement().getDomElement())[f];
var h=this.__knobLocation=qx.bom.element.Location.get(d.getContainerElement().getDomElement())[f];

if(e.getTarget()===d){this.__dragMode=true;

if(!this.__dragTimer){this.__dragTimer=new qx.event.Timer(100);
this.__dragTimer.addListener(bg,this._fireValue,this);
}this.__dragTimer.start();
this.__dragOffset=i+j-h;
d.addState(n);
}else{this.__trackingMode=true;
this.__trackingDirection=i<=h?-1:1;
this.__computeTrackingEnd(e);
this._onInterval();
if(!this.__timer){this.__timer=new qx.event.Timer(100);
this.__timer.addListener(bg,this._onInterval,this);
}this.__timer.start();
}this.addListener(bf,this._onMouseMove);
this.capture();
e.stopPropagation();
},_onMouseUp:function(e){if(this.__dragMode){this.releaseCapture();
delete this.__dragMode;
this.__dragTimer.stop();
this._fireValue();
delete this.__dragOffset;
this.getChildControl(v).removeState(n);
if(e.getType()===o){var bR;
var bS;
var bQ;

if(this.__isHorizontal){bR=e.getDocumentLeft()-(this._valueToPosition(this.getValue())+this.__sliderLocation);
bQ=qx.bom.element.Location.get(this.getContentElement().getDomElement())[p];
bS=e.getDocumentTop()-(bQ+this.getChildControl(v).getBounds().top);
}else{bR=e.getDocumentTop()-(this._valueToPosition(this.getValue())+this.__sliderLocation);
bQ=qx.bom.element.Location.get(this.getContentElement().getDomElement())[q];
bS=e.getDocumentLeft()-(bQ+this.getChildControl(v).getBounds().left);
}
if(bS<0||bS>this.__knobSize||bR<0||bR>this.__knobSize){this.getChildControl(v).removeState(r);
}}}else if(this.__trackingMode){this.__timer.stop();
this.releaseCapture();
delete this.__trackingMode;
delete this.__trackingDirection;
delete this.__trackingEnd;
}this.removeListener(bf,this._onMouseMove);
if(e.getType()===o){e.stopPropagation();
}},_onMouseMove:function(e){if(this.__dragMode){var bm=this.__isHorizontal?e.getDocumentLeft():e.getDocumentTop();
var bl=bm-this.__dragOffset;
this.slideTo(this._positionToValue(bl));
}else if(this.__trackingMode){this.__computeTrackingEnd(e);
}e.stopPropagation();
},_onInterval:function(e){var bs=this.getValue()+(this.__trackingDirection*this.getPageStep());
if(bs<this.getMinimum()){bs=this.getMinimum();
}else if(bs>this.getMaximum()){bs=this.getMaximum();
}var bt=this.__trackingDirection==-1;

if((bt&&bs<=this.__trackingEnd)||(!bt&&bs>=this.__trackingEnd)){bs=this.__trackingEnd;
}this.slideTo(bs);
},_onUpdate:function(e){var bq=this.getInnerSize();
var br=this.getChildControl(v).getBounds();
var bp=this.__isHorizontal?K:F;
this._updateKnobSize();
this.__slidingSpace=bq[bp]-br[bp];
this.__knobSize=br[bp];
this._updateKnobPosition();
},__isHorizontal:false,__slidingSpace:0,__computeTrackingEnd:function(e){var bT=this.__isHorizontal;
var cb=bT?e.getDocumentLeft():e.getDocumentTop();
var cd=this.__sliderLocation;
var bU=this.__knobLocation;
var cf=this.__knobSize;
var cc=cb-cd;

if(cb>=bU){cc-=cf;
}var bY=this._positionToValue(cc);
var bV=this.getMinimum();
var bW=this.getMaximum();

if(bY<bV){bY=bV;
}else if(bY>bW){bY=bW;
}else{var ca=this.getValue();
var bX=this.getPageStep();
var ce=this.__trackingDirection<0?S:G;
bY=ca+(Math[ce]((bY-ca)/bX)*bX);
}if(this.__trackingEnd==null||(this.__trackingDirection==-1&&bY<=this.__trackingEnd)||(this.__trackingDirection==1&&bY>=this.__trackingEnd)){this.__trackingEnd=bY;
}},_positionToValue:function(bI){var bJ=this.__slidingSpace;
if(bJ==null||bJ==0){return 0;
}var bL=bI/bJ;

if(bL<0){bL=0;
}else if(bL>1){bL=1;
}var bK=this.getMaximum()-this.getMinimum();
return this.getMinimum()+Math.round(bK*bL);
},_valueToPosition:function(bC){var bD=this.__slidingSpace;

if(bD==null){return 0;
}var bE=this.getMaximum()-this.getMinimum();
if(bE==0){return 0;
}var bC=bC-this.getMinimum();
var bF=bC/bE;

if(bF<0){bF=0;
}else if(bF>1){bF=1;
}return Math.round(bD*bF);
},_updateKnobPosition:function(){this._setKnobPosition(this._valueToPosition(this.getValue()));
},_setKnobPosition:function(bz){var bA=this.getChildControl(v).getContainerElement();

if(this.__isHorizontal){bA.setStyle(q,bz+m,true);
}else{bA.setStyle(p,bz+m,true);
}},_updateKnobSize:function(){var bj=this.getKnobFactor();

if(bj==null){return;
}var bi=this.getInnerSize();

if(bi==null){return;
}if(this.__isHorizontal){this.getChildControl(v).setWidth(Math.round(bj*bi.width));
}else{this.getChildControl(v).setHeight(Math.round(bj*bi.height));
}},slideToBegin:function(){this.slideTo(this.getMinimum());
},slideToEnd:function(){this.slideTo(this.getMaximum());
},slideForward:function(){this.slideBy(this.getSingleStep());
},slideBack:function(){this.slideBy(-this.getSingleStep());
},slidePageForward:function(){this.slideBy(this.getPageStep());
},slidePageBack:function(){this.slideBy(-this.getPageStep());
},slideBy:function(c){this.slideTo(this.getValue()+c);
},slideTo:function(bB){if(bB<this.getMinimum()){bB=this.getMinimum();
}else if(bB>this.getMaximum()){bB=this.getMaximum();
}else{bB=this.getMinimum()+Math.round((bB-this.getMinimum())/this.getSingleStep())*this.getSingleStep();
}this.setValue(bB);
},_applyOrientation:function(bv,bw){var bx=this.getChildControl(v);
this.__isHorizontal=bv===u;
if(this.__isHorizontal){this.removeState(t);
bx.removeState(t);
this.addState(u);
bx.addState(u);
bx.setLayoutProperties({top:0,right:null,bottom:0});
}else{this.removeState(u);
bx.removeState(u);
this.addState(t);
bx.addState(t);
bx.setLayoutProperties({right:0,bottom:null,left:0});
}this._updateKnobPosition();
},_applyKnobFactor:function(bO,bP){if(bO!=null){this._updateKnobSize();
}else{if(this.__isHorizontal){this.getChildControl(v).resetWidth();
}else{this.getChildControl(v).resetHeight();
}}},_applyValue:function(bn,bo){if(bn!=null){this._updateKnobPosition();

if(this.__dragMode){this.__dragValue=[bn,bo];
}else{this.fireEvent(bh,qx.event.type.Data,[bn,bo]);
}}else{this.resetValue();
}},_fireValue:function(){if(!this.__dragValue){return;
}var bu=this.__dragValue;
this.__dragValue=null;
this.fireEvent(bh,qx.event.type.Data,bu);
},_applyMinimum:function(a,b){if(this.getValue()<a){this.setValue(a);
}this._updateKnobPosition();
},_applyMaximum:function(k,l){if(this.getValue()>k){this.setValue(k);
}this._updateKnobPosition();
}}});
})();
(function(){var d="horizontal",c="mousewheel",b="qx.ui.core.scroll.ScrollSlider",a="keypress";
qx.Class.define(b,{extend:qx.ui.form.Slider,construct:function(e){qx.ui.form.Slider.call(this,e);
this.removeListener(a,this._onKeyPress);
this.removeListener(c,this._onMouseWheel);
},members:{getSizeHint:function(f){var g=qx.ui.form.Slider.prototype.getSizeHint.call(this);
if(this.getOrientation()===d){g.width=0;
}else{g.height=0;
}return g;
}}});
})();
(function(){var n="pressed",m="abandoned",l="Integer",k="hovered",j="qx.event.type.Event",i="Enter",h="Space",g="press",f="qx.ui.form.RepeatButton",d="release",a="__timer",c="interval",b="execute";
qx.Class.define(f,{extend:qx.ui.form.Button,construct:function(r,s){qx.ui.form.Button.call(this,r,s);
this.__timer=new qx.event.AcceleratingTimer();
this.__timer.addListener(c,this._onInterval,this);
},events:{"execute":j,"press":j,"release":j},properties:{interval:{check:l,init:100},firstInterval:{check:l,init:500},minTimer:{check:l,init:20},timerDecrease:{check:l,init:2}},members:{__executed:null,__timer:null,press:function(){if(this.isEnabled()){if(!this.hasState(n)){this.__startInternalTimer();
}this.removeState(m);
this.addState(n);
}},release:function(o){if(!this.isEnabled()){return;
}if(this.hasState(n)){if(!this.__executed){this.execute();
}}this.removeState(n);
this.removeState(m);
this.__stopInternalTimer();
},_applyEnabled:function(p,q){qx.ui.form.Button.prototype._applyEnabled.call(this,p,q);

if(!p){this.removeState(n);
this.removeState(m);
this.__stopInternalTimer();
}},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(m)){this.removeState(m);
this.addState(n);
this.__timer.start();
}this.addState(k);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(k);

if(this.hasState(n)){this.removeState(n);
this.addState(m);
this.__timer.stop();
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}this.capture();
this.__startInternalTimer();
e.stopPropagation();
},_onMouseUp:function(e){this.releaseCapture();

if(!this.hasState(m)){this.addState(k);

if(this.hasState(n)&&!this.__executed){this.execute();
}}this.__stopInternalTimer();
e.stopPropagation();
},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case i:case h:if(this.hasState(n)){if(!this.__executed){this.execute();
}this.removeState(n);
this.removeState(m);
e.stopPropagation();
this.__stopInternalTimer();
}}},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case i:case h:this.removeState(m);
this.addState(n);
e.stopPropagation();
this.__startInternalTimer();
}},_onInterval:function(e){this.__executed=true;
this.fireEvent(b);
},__startInternalTimer:function(){this.fireEvent(g);
this.__executed=false;
this.__timer.set({interval:this.getInterval(),firstInterval:this.getFirstInterval(),minimum:this.getMinTimer(),decrease:this.getTimerDecrease()}).start();
this.removeState(m);
this.addState(n);
},__stopInternalTimer:function(){this.fireEvent(d);
this.__timer.stop();
this.removeState(m);
this.removeState(n);
}},destruct:function(){this._disposeObjects(a);
}});
})();
(function(){var e="Integer",d="interval",c="qx.event.type.Event",b="__timer",a="qx.event.AcceleratingTimer";
qx.Class.define(a,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__timer=new qx.event.Timer(this.getInterval());
this.__timer.addListener(d,this._onInterval,this);
},events:{"interval":c},properties:{interval:{check:e,init:100},firstInterval:{check:e,init:500},minimum:{check:e,init:20},decrease:{check:e,init:2}},members:{__timer:null,__currentInterval:null,start:function(){this.__timer.setInterval(this.getFirstInterval());
this.__timer.start();
},stop:function(){this.__timer.stop();
this.__currentInterval=null;
},_onInterval:function(){this.__timer.stop();

if(this.__currentInterval==null){this.__currentInterval=this.getInterval();
}this.__currentInterval=Math.max(this.getMinimum(),this.__currentInterval-this.getDecrease());
this.__timer.setInterval(this.__currentInterval);
this.__timer.start();
this.fireEvent(d);
}},destruct:function(){this._disposeObjects(b);
}});
})();
(function(){var n="_applyLayoutChange",m="top",k="left",j="middle",h="Decorator",g="center",f="_applyReversed",e="bottom",d="qx.ui.layout.VBox",c="Integer",a="right",b="Boolean";
qx.Class.define(d,{extend:qx.ui.layout.Abstract,construct:function(D,E,F){qx.ui.layout.Abstract.call(this);

if(D){this.setSpacing(D);
}
if(E){this.setAlignY(E);
}
if(F){this.setSeparator(F);
}},properties:{alignY:{check:[m,j,e],init:m,apply:n},alignX:{check:[k,g,a],init:k,apply:n},spacing:{check:c,init:0,apply:n},separator:{check:h,nullable:true,apply:n},reversed:{check:b,init:false,apply:f}},members:{__heights:null,__flexs:null,__enableFlex:null,__children:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__rebuildCache:function(){var bk=this._getLayoutChildren();
var length=bk.length;
var bg=false;
var bf=this.__heights&&this.__heights.length!=length&&this.__flexs&&this.__heights;
var bi;
var bh=bf?this.__heights:new Array(length);
var bj=bf?this.__flexs:new Array(length);
if(this.getReversed()){bk=bk.concat().reverse();
}for(var i=0;i<length;i++){bi=bk[i].getLayoutProperties();

if(bi.height!=null){bh[i]=parseFloat(bi.height)/100;
}
if(bi.flex!=null){bj[i]=bi.flex;
bg=true;
}else{bj[i]=0;
}}if(!bf){this.__heights=bh;
this.__flexs=bj;
}this.__enableFlex=bg;
this.__children=bk;
delete this._invalidChildrenCache;
},verifyLayoutProperty:null,renderLayout:function(G,H){if(this._invalidChildrenCache){this.__rebuildCache();
}var O=this.__children;
var length=O.length;
var Y=qx.ui.layout.Util;
var X=this.getSpacing();
var bc=this.getSeparator();

if(bc){var L=Y.computeVerticalSeparatorGaps(O,X,bc);
}else{var L=Y.computeVerticalGaps(O,X,true);
}var i,J,K,S;
var T=[];
var ba=L;

for(i=0;i<length;i+=1){S=this.__heights[i];
K=S!=null?Math.floor((H-L)*S):O[i].getSizeHint().height;
T.push(K);
ba+=K;
}if(this.__enableFlex&&ba!=H){var Q={};
var W,bb;

for(i=0;i<length;i+=1){W=this.__flexs[i];

if(W>0){P=O[i].getSizeHint();
Q[i]={min:P.minHeight,value:T[i],max:P.maxHeight,flex:W};
}}var M=Y.computeFlexOffsets(Q,H,ba);

for(i in M){bb=M[i].offset;
T[i]+=bb;
ba+=bb;
}}var top=O[0].getMarginTop();
if(ba<H&&this.getAlignY()!=m){top=H-ba;

if(this.getAlignY()===j){top=Math.round(top/2);
}}var P,be,U,K,R,V,N;
this._clearSeparators();
if(bc){var bd=qx.theme.manager.Decoration.getInstance().resolve(bc).getInsets();
var I=bd.top+bd.bottom;
}for(i=0;i<length;i+=1){J=O[i];
K=T[i];
P=J.getSizeHint();
V=J.getMarginLeft();
N=J.getMarginRight();
U=Math.max(P.minWidth,Math.min(G-V-N,P.maxWidth));
be=Y.computeHorizontalAlignOffset(J.getAlignX()||this.getAlignX(),U,G,V,N);
if(i>0){if(bc){top+=R+X;
this._renderSeparator(bc,{top:top,left:0,height:I,width:G});
top+=I+X+J.getMarginTop();
}else{top+=Y.collapseMargins(X,R,J.getMarginTop());
}}J.renderLayout(be,top,U,K);
top+=K;
R=J.getMarginBottom();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__rebuildCache();
}var u=qx.ui.layout.Util;
var C=this.__children;
var q=0,t=0,s=0;
var o=0,v=0;
var z,p,B;
for(var i=0,l=C.length;i<l;i+=1){z=C[i];
p=z.getSizeHint();
t+=p.height;
var y=this.__flexs[i];
var r=this.__heights[i];

if(y){q+=p.minHeight;
}else if(r){s=Math.max(s,Math.round(p.minHeight/r));
}else{q+=p.height;
}B=z.getMarginLeft()+z.getMarginRight();
if((p.width+B)>v){v=p.width+B;
}if((p.minWidth+B)>o){o=p.minWidth+B;
}}q+=s;
var x=this.getSpacing();
var A=this.getSeparator();

if(A){var w=u.computeVerticalSeparatorGaps(C,x,A);
}else{var w=u.computeVerticalGaps(C,x,true);
}return {minHeight:q+w,height:t+w,minWidth:o,width:v};
}},destruct:function(){this.__heights=this.__flexs=this.__children=null;
}});
})();
(function(){var be="left",bd="top",bc="_applyLayoutChange",bb="hAlign",ba="flex",Y="vAlign",X="Integer",W="minWidth",V="width",U="minHeight",R="qx.ui.layout.Grid",T="height",S="maxHeight",Q="maxWidth";
qx.Class.define(R,{extend:qx.ui.layout.Abstract,construct:function(ch,ci){qx.ui.layout.Abstract.call(this);
this.__rowData=[];
this.__colData=[];

if(ch){this.setSpacingX(ch);
}
if(ci){this.setSpacingY(ci);
}},properties:{spacingX:{check:X,init:0,apply:bc},spacingY:{check:X,init:0,apply:bc}},members:{__grid:null,__rowData:null,__colData:null,__colSpans:null,__rowSpans:null,__maxRowIndex:null,__maxColIndex:null,__rowHeights:null,__colWidths:null,verifyLayoutProperty:null,__buildGrid:function(){var cU=[];
var cT=[];
var cV=[];
var cR=-1;
var cQ=-1;
var cX=this._getLayoutChildren();

for(var i=0,l=cX.length;i<l;i++){var cS=cX[i];
var cW=cS.getLayoutProperties();
var cY=cW.row;
var cP=cW.column;
cW.colSpan=cW.colSpan||1;
cW.rowSpan=cW.rowSpan||1;
if(cY==null||cP==null){throw new Error("The layout properties 'row' and 'column' of the child widget '"+cS+"' must be defined!");
}
if(cU[cY]&&cU[cY][cP]){throw new Error("Cannot add widget '"+cS+"'!. "+"There is already a widget '"+cU[cY][cP]+"' in this cell ("+cY+", "+cP+")");
}
for(var x=cP;x<cP+cW.colSpan;x++){for(var y=cY;y<cY+cW.rowSpan;y++){if(cU[y]==undefined){cU[y]=[];
}cU[y][x]=cS;
cQ=Math.max(cQ,x);
cR=Math.max(cR,y);
}}
if(cW.rowSpan>1){cV.push(cS);
}
if(cW.colSpan>1){cT.push(cS);
}}for(var y=0;y<=cR;y++){if(cU[y]==undefined){cU[y]=[];
}}this.__grid=cU;
this.__colSpans=cT;
this.__rowSpans=cV;
this.__maxRowIndex=cR;
this.__maxColIndex=cQ;
this.__rowHeights=null;
this.__colWidths=null;
delete this._invalidChildrenCache;
},_setRowData:function(dW,dX,dY){var ea=this.__rowData[dW];

if(!ea){this.__rowData[dW]={};
this.__rowData[dW][dX]=dY;
}else{ea[dX]=dY;
}},_setColumnData:function(cb,cc,cd){var ce=this.__colData[cb];

if(!ce){this.__colData[cb]={};
this.__colData[cb][cc]=cd;
}else{ce[cc]=cd;
}},setSpacing:function(dO){this.setSpacingY(dO);
this.setSpacingX(dO);
return this;
},setColumnAlign:function(dD,dE,dF){{};
this._setColumnData(dD,bb,dE);
this._setColumnData(dD,Y,dF);
this._applyLayoutChange();
return this;
},getColumnAlign:function(dm){var dn=this.__colData[dm]||{};
return {vAlign:dn.vAlign||bd,hAlign:dn.hAlign||be};
},setRowAlign:function(dG,dH,dI){{};
this._setRowData(dG,bb,dH);
this._setRowData(dG,Y,dI);
this._applyLayoutChange();
return this;
},getRowAlign:function(da){var db=this.__rowData[da]||{};
return {vAlign:db.vAlign||bd,hAlign:db.hAlign||be};
},getCellWidget:function(bY,ca){if(this._invalidChildrenCache){this.__buildGrid();
}var bY=this.__grid[bY]||{};
return bY[ca]||null;
},getRowCount:function(){if(this._invalidChildrenCache){this.__buildGrid();
}return this.__maxRowIndex+1;
},getColumnCount:function(){if(this._invalidChildrenCache){this.__buildGrid();
}return this.__maxColIndex+1;
},getCellAlign:function(de,df){var dl=bd;
var dj=be;
var dk=this.__rowData[de];
var dh=this.__colData[df];
var dg=this.__grid[de][df];

if(dg){var di={vAlign:dg.getAlignY(),hAlign:dg.getAlignX()};
}else{di={};
}if(di.vAlign){dl=di.vAlign;
}else if(dk&&dk.vAlign){dl=dk.vAlign;
}else if(dh&&dh.vAlign){dl=dh.vAlign;
}if(di.hAlign){dj=di.hAlign;
}else if(dh&&dh.hAlign){dj=dh.hAlign;
}else if(dk&&dk.hAlign){dj=dk.hAlign;
}return {vAlign:dl,hAlign:dj};
},setColumnFlex:function(cj,ck){this._setColumnData(cj,ba,ck);
this._applyLayoutChange();
return this;
},getColumnFlex:function(cl){var cm=this.__colData[cl]||{};
return cm.flex!==undefined?cm.flex:0;
},setRowFlex:function(bm,bn){this._setRowData(bm,ba,bn);
this._applyLayoutChange();
return this;
},getRowFlex:function(bj){var bk=this.__rowData[bj]||{};
var bl=bk.flex!==undefined?bk.flex:0;
return bl;
},setColumnMaxWidth:function(cn,co){this._setColumnData(cn,Q,co);
this._applyLayoutChange();
return this;
},getColumnMaxWidth:function(bC){var bD=this.__colData[bC]||{};
return bD.maxWidth!==undefined?bD.maxWidth:Infinity;
},setColumnWidth:function(cN,cO){this._setColumnData(cN,V,cO);
this._applyLayoutChange();
return this;
},getColumnWidth:function(bW){var bX=this.__colData[bW]||{};
return bX.width!==undefined?bX.width:null;
},setColumnMinWidth:function(bf,bg){this._setColumnData(bf,W,bg);
this._applyLayoutChange();
return this;
},getColumnMinWidth:function(a){var b=this.__colData[a]||{};
return b.minWidth||0;
},setRowMaxHeight:function(O,P){this._setRowData(O,S,P);
this._applyLayoutChange();
return this;
},getRowMaxHeight:function(c){var d=this.__rowData[c]||{};
return d.maxHeight||Infinity;
},setRowHeight:function(dc,dd){this._setRowData(dc,T,dd);
this._applyLayoutChange();
return this;
},getRowHeight:function(cA){var cB=this.__rowData[cA]||{};
return cB.height!==undefined?cB.height:null;
},setRowMinHeight:function(cf,cg){this._setRowData(cf,U,cg);
this._applyLayoutChange();
return this;
},getRowMinHeight:function(bh){var bi=this.__rowData[bh]||{};
return bi.minHeight||0;
},__getOuterSize:function(dJ){var dN=dJ.getSizeHint();
var dM=dJ.getMarginLeft()+dJ.getMarginRight();
var dL=dJ.getMarginTop()+dJ.getMarginBottom();
var dK={height:dN.height+dL,width:dN.width+dM,minHeight:dN.minHeight+dL,minWidth:dN.minWidth+dM,maxHeight:dN.maxHeight+dL,maxWidth:dN.maxWidth+dM};
return dK;
},_fixHeightsRowSpan:function(dp){var dA=this.getSpacingY();

for(var i=0,l=this.__rowSpans.length;i<l;i++){var ds=this.__rowSpans[i];
var du=this.__getOuterSize(ds);
var dv=ds.getLayoutProperties();
var dr=dv.row;
var dy=dA*(dv.rowSpan-1);
var dq=dy;
var dx={};

for(var j=0;j<dv.rowSpan;j++){var dC=dv.row+j;
var dt=dp[dC];
var dB=this.getRowFlex(dC);

if(dB>0){dx[dC]={min:dt.minHeight,value:dt.height,max:dt.maxHeight,flex:dB};
}dy+=dt.height;
dq+=dt.minHeight;
}if(dy<du.height){var dz=qx.ui.layout.Util.computeFlexOffsets(dx,du.height,dy);

for(var j=0;j<dv.rowSpan;j++){var dw=dz[dr+j]?dz[dr+j].offset:0;
dp[dr+j].height+=dw;
}}if(dq<du.minHeight){var dz=qx.ui.layout.Util.computeFlexOffsets(dx,du.minHeight,dq);

for(var j=0;j<dv.rowSpan;j++){var dw=dz[dr+j]?dz[dr+j].offset:0;
dp[dr+j].minHeight+=dw;
}}}},_fixWidthsColSpan:function(bo){var bs=this.getSpacingX();

for(var i=0,l=this.__colSpans.length;i<l;i++){var bp=this.__colSpans[i];
var br=this.__getOuterSize(bp);
var bu=bp.getLayoutProperties();
var bq=bu.column;
var bA=bs*(bu.colSpan-1);
var bt=bA;
var bv={};
var bx;

for(var j=0;j<bu.colSpan;j++){var bB=bu.column+j;
var bz=bo[bB];
var by=this.getColumnFlex(bB);
if(by>0){bv[bB]={min:bz.minWidth,value:bz.width,max:bz.maxWidth,flex:by};
}bA+=bz.width;
bt+=bz.minWidth;
}if(bA<br.width){var bw=qx.ui.layout.Util.computeFlexOffsets(bv,br.width,bA);

for(var j=0;j<bu.colSpan;j++){bx=bw[bq+j]?bw[bq+j].offset:0;
bo[bq+j].width+=bx;
}}if(bt<br.minWidth){var bw=qx.ui.layout.Util.computeFlexOffsets(bv,br.minWidth,bt);

for(var j=0;j<bu.colSpan;j++){bx=bw[bq+j]?bw[bq+j].offset:0;
bo[bq+j].minWidth+=bx;
}}}},_getRowHeights:function(){if(this.__rowHeights!=null){return this.__rowHeights;
}var cy=[];
var cr=this.__maxRowIndex;
var cq=this.__maxColIndex;

for(var cz=0;cz<=cr;cz++){var cs=0;
var cu=0;
var ct=0;

for(var cx=0;cx<=cq;cx++){var cp=this.__grid[cz][cx];

if(!cp){continue;
}var cv=cp.getLayoutProperties().rowSpan||0;

if(cv>1){continue;
}var cw=this.__getOuterSize(cp);

if(this.getRowFlex(cz)>0){cs=Math.max(cs,cw.minHeight);
}else{cs=Math.max(cs,cw.height);
}cu=Math.max(cu,cw.height);
}var cs=Math.max(cs,this.getRowMinHeight(cz));
var ct=this.getRowMaxHeight(cz);

if(this.getRowHeight(cz)!==null){var cu=this.getRowHeight(cz);
}else{var cu=Math.max(cs,Math.min(cu,ct));
}cy[cz]={minHeight:cs,height:cu,maxHeight:ct};
}
if(this.__rowSpans.length>0){this._fixHeightsRowSpan(cy);
}this.__rowHeights=cy;
return cy;
},_getColWidths:function(){if(this.__colWidths!=null){return this.__colWidths;
}var cG=[];
var cD=this.__maxColIndex;
var cF=this.__maxRowIndex;

for(var cL=0;cL<=cD;cL++){var cJ=0;
var cI=0;
var cE=Infinity;

for(var cM=0;cM<=cF;cM++){var cC=this.__grid[cM][cL];

if(!cC){continue;
}var cH=cC.getLayoutProperties().colSpan||0;

if(cH>1){continue;
}var cK=this.__getOuterSize(cC);

if(this.getColumnFlex(cL)>0){cI=Math.max(cI,cK.minWidth);
}else{cI=Math.max(cI,cK.width);
}cJ=Math.max(cJ,cK.width);
}var cI=Math.max(cI,this.getColumnMinWidth(cL));
var cE=this.getColumnMaxWidth(cL);

if(this.getColumnWidth(cL)!==null){var cJ=this.getColumnWidth(cL);
}else{var cJ=Math.max(cI,Math.min(cJ,cE));
}cG[cL]={minWidth:cI,width:cJ,maxWidth:cE};
}
if(this.__colSpans.length>0){this._fixWidthsColSpan(cG);
}this.__colWidths=cG;
return cG;
},_getColumnFlexOffsets:function(bP){var bQ=this.getSizeHint();
var bU=bP-bQ.width;

if(bU==0){return {};
}var bS=this._getColWidths();
var bR={};

for(var i=0,l=bS.length;i<l;i++){var bV=bS[i];
var bT=this.getColumnFlex(i);

if((bT<=0)||(bV.width==bV.maxWidth&&bU>0)||(bV.width==bV.minWidth&&bU<0)){continue;
}bR[i]={min:bV.minWidth,value:bV.width,max:bV.maxWidth,flex:bT};
}return qx.ui.layout.Util.computeFlexOffsets(bR,bP,bQ.width);
},_getRowFlexOffsets:function(dP){var dQ=this.getSizeHint();
var dT=dP-dQ.height;

if(dT==0){return {};
}var dU=this._getRowHeights();
var dR={};

for(var i=0,l=dU.length;i<l;i++){var dV=dU[i];
var dS=this.getRowFlex(i);

if((dS<=0)||(dV.height==dV.maxHeight&&dT>0)||(dV.height==dV.minHeight&&dT<0)){continue;
}dR[i]={min:dV.minHeight,value:dV.height,max:dV.maxHeight,flex:dS};
}return qx.ui.layout.Util.computeFlexOffsets(dR,dP,dQ.height);
},renderLayout:function(e,f){if(this._invalidChildrenCache){this.__buildGrid();
}var w=qx.ui.layout.Util;
var h=this.getSpacingX();
var q=this.getSpacingY();
var D=this._getColWidths();
var C=this._getColumnFlexOffsets(e);
var k=[];
var F=this.__maxColIndex;
var g=this.__maxRowIndex;
var E;

for(var G=0;G<=F;G++){E=C[G]?C[G].offset:0;
k[G]=D[G].width+E;
}var t=this._getRowHeights();
var v=this._getRowFlexOffsets(f);
var M=[];

for(var r=0;r<=g;r++){E=v[r]?v[r].offset:0;
M[r]=t[r].height+E;
}var N=0;

for(var G=0;G<=F;G++){var top=0;

for(var r=0;r<=g;r++){var A=this.__grid[r][G];
if(!A){top+=M[r]+q;
continue;
}var m=A.getLayoutProperties();
if(m.row!==r||m.column!==G){top+=M[r]+q;
continue;
}var L=h*(m.colSpan-1);

for(var i=0;i<m.colSpan;i++){L+=k[G+i];
}var B=q*(m.rowSpan-1);

for(var i=0;i<m.rowSpan;i++){B+=M[r+i];
}var n=A.getSizeHint();
var J=A.getMarginTop();
var z=A.getMarginLeft();
var u=A.getMarginBottom();
var p=A.getMarginRight();
var s=Math.max(n.minWidth,Math.min(L-z-p,n.maxWidth));
var K=Math.max(n.minHeight,Math.min(B-J-u,n.maxHeight));
var H=this.getCellAlign(r,G);
var I=N+w.computeHorizontalAlignOffset(H.hAlign,s,L,z,p);
var o=top+w.computeVerticalAlignOffset(H.vAlign,K,B,J,u);
A.renderLayout(I,o,s,K);
top+=M[r]+q;
}N+=k[G]+h;
}},invalidateLayoutCache:function(){qx.ui.layout.Abstract.prototype.invalidateLayoutCache.call(this);
this.__colWidths=null;
this.__rowHeights=null;
},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__buildGrid();
}var bI=this._getColWidths();
var bK=0,bL=0;

for(var i=0,l=bI.length;i<l;i++){var bM=bI[i];

if(this.getColumnFlex(i)>0){bK+=bM.minWidth;
}else{bK+=bM.width;
}bL+=bM.width;
}var bN=this._getRowHeights();
var bG=0,bJ=0;

for(var i=0,l=bN.length;i<l;i++){var bO=bN[i];

if(this.getRowFlex(i)>0){bG+=bO.minHeight;
}else{bG+=bO.height;
}bJ+=bO.height;
}var bF=this.getSpacingX()*(bI.length-1);
var bE=this.getSpacingY()*(bN.length-1);
var bH={minWidth:bK+bF,width:bL+bF,minHeight:bG+bE,height:bJ+bE};
return bH;
}},destruct:function(){this.__grid=this.__rowData=this.__colData=this.__colSpans=this.__rowSpans=this.__colWidths=this.__rowHeights=null;
}});
})();
(function(){var A="resize",z="scrollY",w="update",v="scrollX",u="_applyScrollX",t="_applyScrollY",s="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxX()",r="appear",q="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxY()",p="qx.event.type.Event",n="qx.ui.core.scroll.ScrollPane",o="scroll";
qx.Class.define(n,{extend:qx.ui.core.Widget,construct:function(){qx.ui.core.Widget.call(this);
this.set({minWidth:0,minHeight:0});
this._setLayout(new qx.ui.layout.Grow());
this.addListener(A,this._onUpdate);
var I=this.getContentElement();
I.addListener(o,this._onScroll,this);
I.addListener(r,this._onAppear,this);
},events:{update:p},properties:{scrollX:{check:s,apply:u,event:v,init:0},scrollY:{check:q,apply:t,event:z,init:0}},members:{add:function(G){var H=this._getChildren()[0];

if(H){this._remove(H);
H.removeListener(A,this._onUpdate,this);
}
if(G){this._add(G);
G.addListener(A,this._onUpdate,this);
}},remove:function(D){if(D){this._remove(D);
D.removeListener(A,this._onUpdate,this);
}},getChildren:function(){return this._getChildren();
},_onUpdate:function(e){this.fireEvent(w);
},_onScroll:function(e){var N=this.getContentElement();
this.setScrollX(N.getScrollX());
this.setScrollY(N.getScrollY());
},_onAppear:function(e){var l=this.getContentElement();
var i=this.getScrollX();
var j=l.getScrollX();

if(i!=j){l.scrollToX(i);
}var m=this.getScrollY();
var k=l.getScrollY();

if(m!=k){l.scrollToY(m);
}},getItemTop:function(h){var top=0;

do{top+=h.getBounds().top;
h=h.getLayoutParent();
}while(h&&h!==this);
return top;
},getItemBottom:function(d){return this.getItemTop(d)+d.getBounds().height;
},getItemLeft:function(B){var C=0;
var parent;

do{C+=B.getBounds().left;
parent=B.getLayoutParent();

if(parent){C+=parent.getInsets().left;
}B=parent;
}while(B&&B!==this);
return C;
},getItemRight:function(a){return this.getItemLeft(a)+a.getBounds().width;
},getScrollSize:function(){return this.getChildren()[0].getBounds();
},getScrollMaxX:function(){var g=this.getInnerSize();
var f=this.getScrollSize();

if(g&&f){return Math.max(0,f.width-g.width);
}return 0;
},getScrollMaxY:function(){var L=this.getInnerSize();
var K=this.getScrollSize();

if(L&&K){return Math.max(0,K.height-L.height);
}return 0;
},scrollToX:function(b){var c=this.getScrollMaxX();

if(b<0){b=0;
}else if(b>c){b=c;
}this.setScrollX(b);
},scrollToY:function(E){var F=this.getScrollMaxY();

if(E<0){E=0;
}else if(E>F){E=F;
}this.setScrollY(E);
},scrollByX:function(x){this.scrollToX(this.getScrollX()+x);
},scrollByY:function(y){this.scrollToY(this.getScrollY()+y);
},_applyScrollX:function(M){this.getContentElement().scrollToX(M);
},_applyScrollY:function(J){this.getContentElement().scrollToY(J);
}}});
})();
(function(){var g="",f="<br",e=" &nbsp;",d="<br>",c=" ",b="\n",a="qx.bom.String";
qx.Class.define(a,{statics:{TO_CHARCODE:{"quot":34,"amp":38,"lt":60,"gt":62,"nbsp":160,"iexcl":161,"cent":162,"pound":163,"curren":164,"yen":165,"brvbar":166,"sect":167,"uml":168,"copy":169,"ordf":170,"laquo":171,"not":172,"shy":173,"reg":174,"macr":175,"deg":176,"plusmn":177,"sup2":178,"sup3":179,"acute":180,"micro":181,"para":182,"middot":183,"cedil":184,"sup1":185,"ordm":186,"raquo":187,"frac14":188,"frac12":189,"frac34":190,"iquest":191,"Agrave":192,"Aacute":193,"Acirc":194,"Atilde":195,"Auml":196,"Aring":197,"AElig":198,"Ccedil":199,"Egrave":200,"Eacute":201,"Ecirc":202,"Euml":203,"Igrave":204,"Iacute":205,"Icirc":206,"Iuml":207,"ETH":208,"Ntilde":209,"Ograve":210,"Oacute":211,"Ocirc":212,"Otilde":213,"Ouml":214,"times":215,"Oslash":216,"Ugrave":217,"Uacute":218,"Ucirc":219,"Uuml":220,"Yacute":221,"THORN":222,"szlig":223,"agrave":224,"aacute":225,"acirc":226,"atilde":227,"auml":228,"aring":229,"aelig":230,"ccedil":231,"egrave":232,"eacute":233,"ecirc":234,"euml":235,"igrave":236,"iacute":237,"icirc":238,"iuml":239,"eth":240,"ntilde":241,"ograve":242,"oacute":243,"ocirc":244,"otilde":245,"ouml":246,"divide":247,"oslash":248,"ugrave":249,"uacute":250,"ucirc":251,"uuml":252,"yacute":253,"thorn":254,"yuml":255,"fnof":402,"Alpha":913,"Beta":914,"Gamma":915,"Delta":916,"Epsilon":917,"Zeta":918,"Eta":919,"Theta":920,"Iota":921,"Kappa":922,"Lambda":923,"Mu":924,"Nu":925,"Xi":926,"Omicron":927,"Pi":928,"Rho":929,"Sigma":931,"Tau":932,"Upsilon":933,"Phi":934,"Chi":935,"Psi":936,"Omega":937,"alpha":945,"beta":946,"gamma":947,"delta":948,"epsilon":949,"zeta":950,"eta":951,"theta":952,"iota":953,"kappa":954,"lambda":955,"mu":956,"nu":957,"xi":958,"omicron":959,"pi":960,"rho":961,"sigmaf":962,"sigma":963,"tau":964,"upsilon":965,"phi":966,"chi":967,"psi":968,"omega":969,"thetasym":977,"upsih":978,"piv":982,"bull":8226,"hellip":8230,"prime":8242,"Prime":8243,"oline":8254,"frasl":8260,"weierp":8472,"image":8465,"real":8476,"trade":8482,"alefsym":8501,"larr":8592,"uarr":8593,"rarr":8594,"darr":8595,"harr":8596,"crarr":8629,"lArr":8656,"uArr":8657,"rArr":8658,"dArr":8659,"hArr":8660,"forall":8704,"part":8706,"exist":8707,"empty":8709,"nabla":8711,"isin":8712,"notin":8713,"ni":8715,"prod":8719,"sum":8721,"minus":8722,"lowast":8727,"radic":8730,"prop":8733,"infin":8734,"ang":8736,"and":8743,"or":8744,"cap":8745,"cup":8746,"int":8747,"there4":8756,"sim":8764,"cong":8773,"asymp":8776,"ne":8800,"equiv":8801,"le":8804,"ge":8805,"sub":8834,"sup":8835,"sube":8838,"supe":8839,"oplus":8853,"otimes":8855,"perp":8869,"sdot":8901,"lceil":8968,"rceil":8969,"lfloor":8970,"rfloor":8971,"lang":9001,"rang":9002,"loz":9674,"spades":9824,"clubs":9827,"hearts":9829,"diams":9830,"OElig":338,"oelig":339,"Scaron":352,"scaron":353,"Yuml":376,"circ":710,"tilde":732,"ensp":8194,"emsp":8195,"thinsp":8201,"zwnj":8204,"zwj":8205,"lrm":8206,"rlm":8207,"ndash":8211,"mdash":8212,"lsquo":8216,"rsquo":8217,"sbquo":8218,"ldquo":8220,"rdquo":8221,"bdquo":8222,"dagger":8224,"Dagger":8225,"permil":8240,"lsaquo":8249,"rsaquo":8250,"euro":8364},escape:function(i){return qx.util.StringEscape.escape(i,qx.bom.String.FROM_CHARCODE);
},unescape:function(l){return qx.util.StringEscape.unescape(l,qx.bom.String.TO_CHARCODE);
},fromText:function(j){return qx.bom.String.escape(j).replace(/(  |\n)/g,function(n){var o={"  ":e,"\n":d};
return o[n]||n;
});
},toText:function(m){return qx.bom.String.unescape(m.replace(/\s+|<([^>])+>/gi,function(h){if(h.indexOf(f)===0){return b;
}else if(h.length>0&&h.replace(/^\s*/,g).replace(/\s*$/,g)==g){return c;
}else{return g;
}}));
}},defer:function(k){k.FROM_CHARCODE=qx.lang.Object.invert(k.TO_CHARCODE);
}});
})();
(function(){var g=";",f="&",e='X',d="",c='#',b="&#",a="qx.util.StringEscape";
qx.Class.define(a,{statics:{escape:function(h,j){var m,o=d;

for(var i=0,l=h.length;i<l;i++){var n=h.charAt(i);
var k=n.charCodeAt(0);

if(j[k]){m=f+j[k]+g;
}else{if(k>0x7F){m=b+k+g;
}else{m=n;
}}o+=m;
}return o;
},unescape:function(p,q){return p.replace(/&[#\w]+;/gi,function(r){var s=r;
var r=r.substring(1,r.length-1);
var t=q[r];

if(t){s=String.fromCharCode(t);
}else{if(r.charAt(0)==c){if(r.charAt(1).toUpperCase()==e){t=r.substring(2);
if(t.match(/^[0-9A-Fa-f]+$/gi)){s=String.fromCharCode(parseInt(t,16));
}}else{t=r.substring(1);
if(t.match(/^\d+$/gi)){s=String.fromCharCode(parseInt(t,10));
}}}}return s;
});
}}});
})();
(function(){var N="showingPlaceholder",M="color",L="",K="none",J="qx.dynlocale",I="Boolean",H="qx.client",G="qx.event.type.Data",F="readonly",E="input",bC="focusin",bB="visibility",bA="focusout",bz="changeLocale",by="hidden",bx="on",bw="absolute",bv="readOnly",bu="text",bt="_applyTextAlign",U="px",V="RegExp",S=")",T="syncAppearance",Q="changeValue",R="A",O="change",P="textAlign",Y="focused",ba="center",bh="visible",bf="disabled",bl="url(",bj="off",bp="String",bn="resize",bc="qx.ui.form.AbstractField",bs="transparent",br="spellcheck",bq="false",bb="right",bd="PositiveInteger",be="mshtml",bg="abstract",bi="block",bk="webkit",bm="_applyReadOnly",bo="_applyPlaceholder",W="left",X="qx/static/blank.gif";
qx.Class.define(bc,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm,qx.ui.form.IForm],include:[qx.ui.form.MForm],type:bg,construct:function(bF){qx.ui.core.Widget.call(this);

if(bF!=null){this.setValue(bF);
}this.getContentElement().addListener(O,this._onChangeContent,this);
this.addListener(T,this._syncPlaceholder,this);
if(qx.core.Variant.isSet(J,bx)){qx.locale.Manager.getInstance().addListener(bz,this._onChangeLocale,this);
}},events:{"input":G,"changeValue":G},properties:{textAlign:{check:[W,ba,bb],nullable:true,themeable:true,apply:bt},readOnly:{check:I,apply:bm,init:false},selectable:{refine:true,init:true},focusable:{refine:true,init:true},maxLength:{check:bd,init:Infinity},liveUpdate:{check:I,init:false},placeholder:{check:bp,nullable:true,apply:bo},filter:{check:V,nullable:true,init:null}},members:{__nullValue:true,__placeholder:null,__oldValue:null,__oldInputValue:null,getFocusElement:function(){var m=this.getContentElement();

if(m){return m;
}},_createInputElement:function(){return new qx.html.Input(bu);
},renderLayout:function(n,top,o,p){var q=this._updateInsets;
var u=qx.ui.core.Widget.prototype.renderLayout.call(this,n,top,o,p);
if(!u){return;
}var s=u.size||q;
var v=U;

if(s||u.local||u.margin){var r=this.getInsets();
var innerWidth=o-r.left-r.right;
var innerHeight=p-r.top-r.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}var t=this.getContentElement();

if(q){this.__getPlaceholderElement().setStyles({"left":r.left+v,"top":r.top+v});
}
if(s){this.__getPlaceholderElement().setStyles({"width":innerWidth+v,"height":innerHeight+v});
t.setStyles({"width":innerWidth+v,"height":innerHeight+v});
}},_createContentElement:function(){var g=this._createInputElement();
g.setStyles({"border":K,"padding":0,"margin":0,"display":bi,"background":bs,"outline":K,"appearance":K,"position":bw,"autoComplete":bj});
g.setSelectable(this.getSelectable());
g.setEnabled(this.getEnabled());
g.addListener(E,this._onHtmlInput,this);
g.setAttribute(br,bq);
if(qx.core.Variant.isSet(H,bk)){g.setStyle(bn,K);
}if(qx.core.Variant.isSet(H,be)){g.setStyles({backgroundImage:bl+qx.util.ResourceManager.getInstance().toUri(X)+S});
}return g;
},_applyEnabled:function(d,f){qx.ui.core.Widget.prototype._applyEnabled.call(this,d,f);
this.getContentElement().setEnabled(d);

if(d){this._showPlaceholder();
}else{this._removePlaceholder();
}},__textSize:{width:16,height:16},_getContentHint:function(){return {width:this.__textSize.width*10,height:this.__textSize.height||16};
},_applyFont:function(bI,bJ){var bK;

if(bI){var bL=qx.theme.manager.Font.getInstance().resolve(bI);
bK=bL.getStyles();
}else{bK=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(bK);
this.__getPlaceholderElement().setStyles(bK);
if(bI){this.__textSize=qx.bom.Label.getTextSize(R,bK);
}else{delete this.__textSize;
}qx.ui.core.queue.Layout.add(this);
},_applyTextColor:function(bD,bE){if(bD){this.getContentElement().setStyle(M,qx.theme.manager.Color.getInstance().resolve(bD));
this.__getPlaceholderElement().setStyle(M,qx.theme.manager.Color.getInstance().resolve(bD));
}else{this.getContentElement().removeStyle(M);
this.__getPlaceholderElement().removeStyle(M);
}},tabFocus:function(){qx.ui.core.Widget.prototype.tabFocus.call(this);
this.selectAllText();
},_getTextSize:function(){return this.__textSize;
},_onHtmlInput:function(e){var k=e.getData();
var j=true;
this.__nullValue=false;
if(this.getFilter()!=null){var l=L;
var h=k.search(this.getFilter());
var i=k;

while(h>=0){l=l+(i.charAt(h));
i=i.substring(h+1,i.length);
h=i.search(this.getFilter());
}
if(l!=k){j=false;
k=l;
this.getContentElement().setValue(k);
}}if(k.length>this.getMaxLength()){var j=false;
this.getContentElement().setValue(k.substr(0,this.getMaxLength()));
}if(j){this.fireDataEvent(E,k,this.__oldInputValue);
this.__oldInputValue=k;
if(this.getLiveUpdate()){this.__fireChangeValueEvent(k);
}}},__fireChangeValueEvent:function(y){if(this.__oldValue!=y){this.fireNonBubblingEvent(Q,qx.event.type.Data,[y,this.__oldValue]);
this.__oldValue=y;
}},setValue:function(bM){if(bM===null){if(this.__nullValue){return bM;
}bM=L;
this.__nullValue=true;
}else{this.__nullValue=false;
this._removePlaceholder();
}
if(qx.lang.Type.isString(bM)){var bO=this.getContentElement();

if(bM.length>this.getMaxLength()){bM=bM.substr(0,this.getMaxLength());
}
if(bO.getValue()!=bM){var bP=bO.getValue();
bO.setValue(bM);
var bN=this.__nullValue?null:bM;
this.__oldValue=bP;
this.__fireChangeValueEvent(bN);
}this._showPlaceholder();
return bM;
}throw new Error("Invalid value type: "+bM);
},getValue:function(){var c=this.getContentElement().getValue();
return this.__nullValue?null:c;
},resetValue:function(){this.setValue(null);
},_onChangeContent:function(e){this.__nullValue=e.getData()===null;
this.__fireChangeValueEvent(e.getData());
},getTextSelection:function(){return this.getContentElement().getTextSelection();
},getTextSelectionLength:function(){return this.getContentElement().getTextSelectionLength();
},getTextSelectionStart:function(){return this.getContentElement().getTextSelectionStart();
},getTextSelectionEnd:function(){return this.getContentElement().getTextSelectionEnd();
},setTextSelection:function(a,b){this.getContentElement().setTextSelection(a,b);
},clearTextSelection:function(){this.getContentElement().clearTextSelection();
},selectAllText:function(){this.setTextSelection(0);
},_showPlaceholder:function(){var x=this.getValue()||L;
var w=this.getPlaceholder();

if(w!=null&&x==L&&!this.hasState(Y)&&!this.hasState(bf)){if(this.hasState(N)){this._syncPlaceholder();
}else{this.addState(N);
}}},_removePlaceholder:function(){if(this.hasState(N)){this.__getPlaceholderElement().setStyle(bB,by);
this.removeState(N);
}},_syncPlaceholder:function(){if(this.hasState(N)){this.__getPlaceholderElement().setStyle(bB,bh);
}},__getPlaceholderElement:function(){if(this.__placeholder==null){this.__placeholder=new qx.html.Label();
this.__placeholder.setStyles({"visibility":by,"zIndex":6,"position":bw});
this.getContainerElement().add(this.__placeholder);
}return this.__placeholder;
},_onChangeLocale:qx.core.Variant.select(J,{"on":function(e){var content=this.getPlaceholder();

if(content&&content.translate){this.setPlaceholder(content.translate());
}},"off":null}),_applyPlaceholder:function(z,A){this.__getPlaceholderElement().setValue(z);

if(z!=null){this.addListener(bC,this._removePlaceholder,this);
this.addListener(bA,this._showPlaceholder,this);
this._showPlaceholder();
}else{this.removeListener(bC,this._removePlaceholder,this);
this.removeListener(bA,this._showPlaceholder,this);
this._removePlaceholder();
}},_applyTextAlign:function(bG,bH){this.getContentElement().setStyle(P,bG);
},_applyReadOnly:function(B,C){var D=this.getContentElement();
D.setAttribute(bv,B);

if(B){this.addState(F);
this.setFocusable(false);
}else{this.removeState(F);
this.setFocusable(true);
}}},destruct:function(){this.__placeholder=null;

if(qx.core.Variant.isSet(J,bx)){qx.locale.Manager.getInstance().removeListener(bz,this._onChangeLocale,this);
}}});
})();
(function(){var b="qx.ui.form.TextField",a="textfield";
qx.Class.define(b,{extend:qx.ui.form.AbstractField,properties:{appearance:{refine:true,init:a},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}}});
})();
(function(){var p="none",o="wrap",n="value",m="qx.client",l="textarea",k="off",j="on",i="qxSelectable",h="",g="webkit",c="input",f="qx.html.Input",e="select",b="disabled",a="read-only",d="userSelect";
qx.Class.define(f,{extend:qx.html.Element,construct:function(x,y,z){if(x===e||x===l){var A=x;
}else{A=c;
}qx.html.Element.call(this,A,y,z);
this.__type=x;
},members:{__type:null,__selectable:null,__enabled:null,_createDomElement:function(){return qx.bom.Input.create(this.__type);
},_applyProperty:function(name,v){qx.html.Element.prototype._applyProperty.call(this,name,v);
var w=this.getDomElement();

if(name===n){qx.bom.Input.setValue(w,v);
}else if(name===o){qx.bom.Input.setWrap(w,v);
}},setEnabled:qx.core.Variant.select(m,{"webkit":function(q){this.__enabled=q;

if(!q){this.setStyles({"userModify":a,"userSelect":p});
}else{this.setStyles({"userModify":null,"userSelect":this.__selectable?null:p});
}},"default":function(u){this.setAttribute(b,u===false);
}}),setSelectable:qx.core.Variant.select(m,{"webkit":function(r){this.__selectable=r;
this.setAttribute(i,r?j:k);
if(qx.core.Variant.isSet(m,g)){var s=this.__enabled?r?null:p:p;
this.setStyle(d,s);
}},"default":function(E){this.setAttribute(i,E?j:k);
}}),setValue:function(B){var C=this.getDomElement();

if(C){if(C.value!=B){qx.bom.Input.setValue(C,B);
}}else{this._setProperty(n,B);
}return this;
},getValue:function(){var D=this.getDomElement();

if(D){return qx.bom.Input.getValue(D);
}return this._getProperty(n)||h;
},setWrap:function(t){if(this.__type===l){this._setProperty(o,t);
}else{throw new Error("Text wrapping is only support by textareas!");
}return this;
},getWrap:function(){if(this.__type===l){return this._getProperty(o);
}else{throw new Error("Text wrapping is only support by textareas!");
}}}});
})();
(function(){var x="change",w="input",v="qx.client",u="text",t="password",s="checkbox",r="radio",q="textarea",p="keypress",n="opera",f="propertychange",m="blur",j="keydown",d="keyup",c="select-multiple",h="checked",g="value",k="select",b="qx.event.handler.Input";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);
this._onChangeCheckedWrapper=qx.lang.Function.listener(this._onChangeChecked,this);
this._onChangeValueWrapper=qx.lang.Function.listener(this._onChangeValue,this);
this._onInputWrapper=qx.lang.Function.listener(this._onInput,this);
this._onPropertyWrapper=qx.lang.Function.listener(this._onProperty,this);
if(qx.core.Variant.isSet(v,n)){this._onKeyDownWrapper=qx.lang.Function.listener(this._onKeyDown,this);
this._onKeyUpWrapper=qx.lang.Function.listener(this._onKeyUp,this);
this._onBlurWrapper=qx.lang.Function.listener(this._onBlur,this);
}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{input:1,change:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{__enter:false,__onInputTimeoutId:null,__oldValue:null,canHandleEvent:function(A,B){var C=A.tagName.toLowerCase();

if(B===w&&(C===w||C===q)){return true;
}
if(B===x&&(C===w||C===q||C===k)){return true;
}return false;
},registerEvent:qx.core.Variant.select(v,{"mshtml":function(G,H,I){if(!G.__inputHandlerAttached){var J=G.tagName.toLowerCase();
var K=G.type;

if(K===u||K===t||J===q||K===s||K===r){qx.bom.Event.addNativeListener(G,f,this._onPropertyWrapper);
}
if(K!==s&&K!==r){qx.bom.Event.addNativeListener(G,x,this._onChangeValueWrapper);
}
if(K===u||K===t){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,G);
qx.bom.Event.addNativeListener(G,p,this._onKeyPressWrapped);
}G.__inputHandlerAttached=true;
}},"default":function(M,N,O){if(N===w){this.__registerInputListener(M);
}else if(N===x){if(M.type===r||M.type===s){qx.bom.Event.addNativeListener(M,x,this._onChangeCheckedWrapper);
}else{qx.bom.Event.addNativeListener(M,x,this._onChangeValueWrapper);
}if(qx.core.Variant.isSet(v,n)){if(M.type===u||M.type===t){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,M);
qx.bom.Event.addNativeListener(M,p,this._onKeyPressWrapped);
}}}}}),__registerInputListener:qx.core.Variant.select(v,{"mshtml":null,"webkit":function(Y){var ba=Y.tagName.toLowerCase();
if(qx.bom.client.Engine.VERSION<532&&ba==q){qx.bom.Event.addNativeListener(Y,p,this._onInputWrapper);
}qx.bom.Event.addNativeListener(Y,w,this._onInputWrapper);
},"opera":function(be){qx.bom.Event.addNativeListener(be,d,this._onKeyUpWrapper);
qx.bom.Event.addNativeListener(be,j,this._onKeyDownWrapper);
qx.bom.Event.addNativeListener(be,m,this._onBlurWrapper);
qx.bom.Event.addNativeListener(be,w,this._onInputWrapper);
},"default":function(L){qx.bom.Event.addNativeListener(L,w,this._onInputWrapper);
}}),unregisterEvent:qx.core.Variant.select(v,{"mshtml":function(R,S){if(R.__inputHandlerAttached){var T=R.tagName.toLowerCase();
var U=R.type;

if(U===u||U===t||T===q||U===s||U===r){qx.bom.Event.removeNativeListener(R,f,this._onPropertyWrapper);
}
if(U!==s&&U!==r){qx.bom.Event.removeNativeListener(R,x,this._onChangeValueWrapper);
}
if(U===u||U===t){qx.bom.Event.removeNativeListener(R,p,this._onKeyPressWrapped);
}
try{delete R.__inputHandlerAttached;
}catch(a){R.__inputHandlerAttached=null;
}}},"default":function(bc,bd){if(bd===w){this.__registerInputListener(bc);
}else if(bd===x){if(bc.type===r||bc.type===s){qx.bom.Event.removeNativeListener(bc,x,this._onChangeCheckedWrapper);
}else{qx.bom.Event.removeNativeListener(bc,x,this._onChangeValueWrapper);
}}
if(qx.core.Variant.isSet(v,n)){if(bc.type===u||bc.type===t){qx.bom.Event.removeNativeListener(bc,p,this._onKeyPressWrapped);
}}}}),__unregisterInputListener:qx.core.Variant.select(v,{"mshtml":null,"webkit":function(D){var E=D.tagName.toLowerCase();
if(qx.bom.client.Engine.VERSION<532&&E==q){qx.bom.Event.removeNativeListener(D,p,this._onInputWrapper);
}qx.bom.Event.removeNativeListener(D,w,this._onInputWrapper);
},"opera":function(X){qx.bom.Event.removeNativeListener(X,d,this._onKeyUpWrapper);
qx.bom.Event.removeNativeListener(X,j,this._onKeyDownWrapper);
qx.bom.Event.removeNativeListener(X,m,this._onBlurWrapper);
qx.bom.Event.removeNativeListener(X,w,this._onInputWrapper);
},"default":function(F){qx.bom.Event.removeNativeListener(F,w,this._onInputWrapper);
}}),_onKeyPress:qx.core.Variant.select(v,{"mshtml|opera":function(e,bb){if(e.keyCode===13){if(bb.value!==this.__oldValue){this.__oldValue=bb.value;
qx.event.Registration.fireEvent(bb,x,qx.event.type.Data,[bb.value]);
}}},"default":null}),_onKeyDown:qx.core.Variant.select(v,{"opera":function(e){if(e.keyCode===13){this.__enter=true;
}},"default":null}),_onKeyUp:qx.core.Variant.select(v,{"opera":function(e){if(e.keyCode===13){this.__enter=false;
}},"default":null}),_onBlur:qx.core.Variant.select(v,{"opera":function(e){if(this.__onInputTimeoutId){window.clearTimeout(this.__onInputTimeoutId);
}},"default":null}),_onInput:qx.event.GlobalError.observeMethod(function(e){var W=e.target;
if(!this.__enter){if(qx.core.Variant.isSet(v,n)){this.__onInputTimeoutId=window.setTimeout(function(){qx.event.Registration.fireEvent(W,w,qx.event.type.Data,[W.value]);
},0);
}else{qx.event.Registration.fireEvent(W,w,qx.event.type.Data,[W.value]);
}}}),_onChangeValue:qx.event.GlobalError.observeMethod(function(e){var Q=e.target||e.srcElement;
var P=Q.value;

if(Q.type===c){var P=[];

for(var i=0,o=Q.options,l=o.length;i<l;i++){if(o[i].selected){P.push(o[i].value);
}}}qx.event.Registration.fireEvent(Q,x,qx.event.type.Data,[P]);
}),_onChangeChecked:qx.event.GlobalError.observeMethod(function(e){var bf=e.target;

if(bf.type===r){if(bf.checked){qx.event.Registration.fireEvent(bf,x,qx.event.type.Data,[bf.value]);
}}else{qx.event.Registration.fireEvent(bf,x,qx.event.type.Data,[bf.checked]);
}}),_onProperty:qx.core.Variant.select(v,{"mshtml":qx.event.GlobalError.observeMethod(function(e){var y=e.target||e.srcElement;
var z=e.propertyName;

if(z===g&&(y.type===u||y.type===t||y.tagName.toLowerCase()===q)){if(!y.$$inValueSet){qx.event.Registration.fireEvent(y,w,qx.event.type.Data,[y.value]);
}}else if(z===h){if(y.type===s){qx.event.Registration.fireEvent(y,x,qx.event.type.Data,[y.checked]);
}else if(y.checked){qx.event.Registration.fireEvent(y,x,qx.event.type.Data,[y.value]);
}}}),"default":function(){}})},defer:function(V){qx.event.Registration.addHandler(V);
}});
})();
(function(){var v="",u="select",t="soft",s="off",r="qx.client",q="wrap",p="text",o="mshtml",n="number",m="checkbox",d="select-one",k="input",g="option",c="value",b="radio",f="qx.bom.Input",e="nowrap",h="textarea",a="auto",j="normal";
qx.Class.define(f,{statics:{__types:{text:1,textarea:1,select:1,checkbox:1,radio:1,password:1,hidden:1,submit:1,image:1,file:1,search:1,reset:1,button:1},create:function(R,S,T){{};
var S=S?qx.lang.Object.clone(S):{};
var U;

if(R===h||R===u){U=R;
}else{U=k;
S.type=R;
}return qx.bom.Element.create(U,S,T);
},setValue:function(I,J){var O=I.nodeName.toLowerCase();
var L=I.type;
var Array=qx.lang.Array;
var P=qx.lang.Type;

if(typeof J===n){J+=v;
}
if((L===m||L===b)){if(P.isArray(J)){I.checked=Array.contains(J,I.value);
}else{I.checked=I.value==J;
}}else if(O===u){var K=P.isArray(J);
var Q=I.options;
var M,N;

for(var i=0,l=Q.length;i<l;i++){M=Q[i];
N=M.getAttribute(c);

if(N==null){N=M.text;
}M.selected=K?Array.contains(J,N):J==N;
}
if(K&&J.length==0){I.selectedIndex=-1;
}}else if(L===p&&qx.core.Variant.isSet(r,o)){I.$$inValueSet=true;
I.value=J;
I.$$inValueSet=null;
}else{I.value=J;
}},getValue:function(w){var C=w.nodeName.toLowerCase();

if(C===g){return (w.attributes.value||{}).specified?w.value:w.text;
}
if(C===u){var x=w.selectedIndex;
if(x<0){return null;
}var D=[];
var F=w.options;
var E=w.type==d;
var B=qx.bom.Input;
var A;
for(var i=E?x:0,z=E?x+1:F.length;i<z;i++){var y=F[i];

if(y.selected){A=B.getValue(y);
if(E){return A;
}D.push(A);
}}return D;
}else{return (w.value||v).replace(/\r/g,v);
}},setWrap:qx.core.Variant.select(r,{"mshtml":function(G,H){G.wrap=H?t:s;
},"gecko|webkit":function(X,Y){var bb=Y?t:s;
var ba=Y?v:a;
X.setAttribute(q,bb);
X.style.overflow=ba;
},"default":function(V,W){V.style.whiteSpace=W?j:e;
}})}});
})();
(function(){var p="_",o="format",n="thu",m="sat",l="cldr_day_",k="cldr_month_",j="wed",h="fri",g="tue",f="mon",G="sun",F="short",E="HH:mm",D="HHmmsszz",C="HHmm",B="HHmmss",A="cldr_date_format_",z="HH:mm:ss zz",y="full",x="cldr_pm",v="long",w="medium",t="cldr_am",u="qx.locale.Date",r="cldr_date_time_format_",s="cldr_time_format_",q="HH:mm:ss";
qx.Class.define(u,{statics:{__mgr:qx.locale.Manager.getInstance(),getAmMarker:function(bp){return this.__mgr.localize(t,[],bp);
},getPmMarker:function(H){return this.__mgr.localize(x,[],H);
},getDayNames:function(length,M,N){var N=N?N:o;
{};
var P=[G,f,g,j,n,h,m];
var Q=[];

for(var i=0;i<P.length;i++){var O=l+N+p+length+p+P[i];
Q.push(this.__mgr.localize(O,[],M));
}return Q;
},getDayName:function(length,V,W,X){var X=X?X:o;
{};
var ba=[G,f,g,j,n,h,m];
var Y=l+X+p+length+p+ba[V];
return this.__mgr.localize(Y,[],W);
},getMonthNames:function(length,I,J){var J=J?J:o;
{};
var L=[];

for(var i=0;i<12;i++){var K=k+J+p+length+p+(i+1);
L.push(this.__mgr.localize(K,[],I));
}return L;
},getMonthName:function(length,bi,bj,bk){var bk=bk?bk:o;
{};
var bl=k+bk+p+length+p+(bi+1);
return this.__mgr.localize(bl,[],bj);
},getDateFormat:function(bt,bu){{};
var bv=A+bt;
return this.__mgr.localize(bv,[],bu);
},getDateTimeFormat:function(a,b,c){var e=r+a;
var d=this.__mgr.localize(e,[],c);

if(d==e){d=b;
}return d;
},getTimeFormat:function(R,S){{};
var U=s+R;
var T=this.__mgr.localize(U,[],S);

if(T!=U){return T;
}
switch(R){case F:case w:return qx.locale.Date.getDateTimeFormat(C,E);
case v:return qx.locale.Date.getDateTimeFormat(B,q);
case y:return qx.locale.Date.getDateTimeFormat(D,z);
default:throw new Error("This case should never happen.");
}},getWeekStart:function(bm){var bn={"MV":5,"AE":6,"AF":6,"BH":6,"DJ":6,"DZ":6,"EG":6,"ER":6,"ET":6,"IQ":6,"IR":6,"JO":6,"KE":6,"KW":6,"LB":6,"LY":6,"MA":6,"OM":6,"QA":6,"SA":6,"SD":6,"SO":6,"TN":6,"YE":6,"AS":0,"AU":0,"AZ":0,"BW":0,"CA":0,"CN":0,"FO":0,"GE":0,"GL":0,"GU":0,"HK":0,"IE":0,"IL":0,"IS":0,"JM":0,"JP":0,"KG":0,"KR":0,"LA":0,"MH":0,"MN":0,"MO":0,"MP":0,"MT":0,"NZ":0,"PH":0,"PK":0,"SG":0,"TH":0,"TT":0,"TW":0,"UM":0,"US":0,"UZ":0,"VI":0,"ZA":0,"ZW":0,"MW":0,"NG":0,"TJ":0};
var bo=qx.locale.Date._getTerritory(bm);
return bn[bo]!=null?bn[bo]:1;
},getWeekendStart:function(bq){var bs={"EG":5,"IL":5,"SY":5,"IN":0,"AE":4,"BH":4,"DZ":4,"IQ":4,"JO":4,"KW":4,"LB":4,"LY":4,"MA":4,"OM":4,"QA":4,"SA":4,"SD":4,"TN":4,"YE":4};
var br=qx.locale.Date._getTerritory(bq);
return bs[br]!=null?bs[br]:6;
},getWeekendEnd:function(bf){var bg={"AE":5,"BH":5,"DZ":5,"IQ":5,"JO":5,"KW":5,"LB":5,"LY":5,"MA":5,"OM":5,"QA":5,"SA":5,"SD":5,"TN":5,"YE":5,"AF":5,"IR":5,"EG":6,"IL":6,"SY":6};
var bh=qx.locale.Date._getTerritory(bf);
return bg[bh]!=null?bg[bh]:0;
},isWeekend:function(bb,bc){var be=qx.locale.Date.getWeekendStart(bc);
var bd=qx.locale.Date.getWeekendEnd(bc);

if(bd>be){return ((bb>=be)&&(bb<=bd));
}else{return ((bb>=be)||(bb<=bd));
}},_getTerritory:function(bw){if(bw){var bx=bw.split(p)[1]||bw;
}else{bx=this.__mgr.getTerritory()||this.__mgr.getLanguage();
}return bx.toUpperCase();
}}});
})();
(function(){var bM="(\\d\\d?)",bL="format",bK="",bJ="abbreviated",bI="wide",bH="(",bG=")",bF="|",bE="stand-alone",bD="wildcard",bs="default",br="literal",bq="'",bp="hour",bo="(\\d\\d?\\d?)",bn="ms",bm="narrow",bl="-",bk="quoted_literal",bj='a',bT="HH:mm:ss",bU="+",bR="HHmmss",bS="long",bP='z',bQ="0",bN="sec",bO="day",bV='Z',bW=" ",bw="min",bv="mm",by="(\\d+)",bx="h",bA="KK",bz='L',bC="Z",bB="(\\d\\d+)",bu="EEEE",bt="^",k=":",l='y',m="K",n="a",o="([\\+\\-]\\d\\d:?\\d\\d)",p="GMT",q="dd",r="qx.util.format.DateFormat",s="yyy",t="H",cb="YYYY",ca="y",bY="HH",bX="EE",cf='h',ce="S",cd='s',cc='A',ch="yyyyyy",cg="kk",S="ss",T='H',Q='S',R="MMMM",W='c',X="d",U="([a-zA-Z]+)",V='k',O="m",P='Y',B='D',A="yyyyy",D='K',C="hh",x="SSS",w="MM",z="yy",y="(\\d\\d\\d\\d\\d\\d+)",v="yyyy-MM-dd HH:mm:ss",u="(\\d\\d\\d\\d\\d+)",bd="short",be='d',bf="unkown",bg='m',Y="(\\d\\d\\d\\d)",ba="(\\d\\d\\d+)",bb="k",bc='M',bh="(\\d\\d\\d\\d+)",bi="SS",L="MMM",K="s",J="M",I='w',H="EEE",G="$",F="?",E='E',N="z",M="yyyy";
qx.Class.define(r,{extend:qx.core.Object,implement:qx.util.format.IFormat,construct:function(cX,cY){qx.core.Object.call(this);

if(!cY){this.__locale=qx.locale.Manager.getInstance().getLocale();
}else{this.__locale=cY;
}
if(cX!=null){this.__format=cX.toString();
}else{this.__format=qx.locale.Date.getDateFormat(bS,this.__locale)+bW+qx.locale.Date.getDateTimeFormat(bR,bT,this.__locale);
}},statics:{getDateTimeInstance:function(){var cW=qx.util.format.DateFormat;
var cV=qx.locale.Date.getDateFormat(bS)+bW+qx.locale.Date.getDateTimeFormat(bR,bT);

if(cW._dateInstance==null||cW._dateInstance.__format!=cV){cW._dateTimeInstance=new cW();
}return cW._dateTimeInstance;
},getDateInstance:function(){var ec=qx.util.format.DateFormat;
var eb=qx.locale.Date.getDateFormat(bd)+bK;

if(ec._dateInstance==null||ec._dateInstance.__format!=eb){ec._dateInstance=new ec(eb);
}return ec._dateInstance;
},ASSUME_YEAR_2000_THRESHOLD:30,LOGGING_DATE_TIME__format:v,AM_MARKER:"am",PM_MARKER:"pm",MEDIUM_TIMEZONE_NAMES:["GMT"],FULL_TIMEZONE_NAMES:["Greenwich Mean Time"]},members:{__locale:null,__format:null,__parseFeed:null,__parseRules:null,__formatTree:null,__fillNumber:function(di,dj){var dk=bK+di;

while(dk.length<dj){dk=bQ+dk;
}return dk;
},__getDayInYear:function(dX){var dY=new Date(dX.getTime());
var ea=dY.getDate();

while(dY.getMonth()!=0){dY.setDate(-1);
ea+=dY.getDate()+1;
}return ea;
},__thursdayOfSameWeek:function(cD){return new Date(cD.getTime()+(3-((cD.getDay()+6)%7))*86400000);
},__getWeekInYear:function(dl){var dn=this.__thursdayOfSameWeek(dl);
var dp=dn.getFullYear();
var dm=this.__thursdayOfSameWeek(new Date(dp,0,4));
return Math.floor(1.5+(dn.getTime()-dm.getTime())/86400000/7);
},format:function(dq){if(dq==null){return null;
}var dw=qx.util.format.DateFormat;
var dx=this.__locale;
var dH=dq.getFullYear();
var dB=dq.getMonth();
var dJ=dq.getDate();
var dr=dq.getDay();
var dC=dq.getHours();
var dy=dq.getMinutes();
var dD=dq.getSeconds();
var dF=dq.getMilliseconds();
var dI=dq.getTimezoneOffset();
var du=dI>0?1:-1;
var ds=Math.floor(Math.abs(dI)/60);
var dz=Math.abs(dI)%60;
this.__initFormatTree();
var dG=bK;

for(var i=0;i<this.__formatTree.length;i++){var dE=this.__formatTree[i];

if(dE.type==br){dG+=dE.text;
}else{var dv=dE.character;
var dA=dE.size;
var dt=F;

switch(dv){case l:case P:if(dA==2){dt=this.__fillNumber(dH%100,2);
}else{dt=dH+bK;

if(dA>dt.length){for(var i=dt.length;i<dA;i++){dt=bQ+dt;
}}}break;
case B:dt=this.__fillNumber(this.__getDayInYear(dq),dA);
break;
case be:dt=this.__fillNumber(dJ,dA);
break;
case I:dt=this.__fillNumber(this.__getWeekInYear(dq),dA);
break;
case E:if(dA==2){dt=qx.locale.Date.getDayName(bm,dr,dx,bL);
}else if(dA==3){dt=qx.locale.Date.getDayName(bJ,dr,dx,bL);
}else if(dA==4){dt=qx.locale.Date.getDayName(bI,dr,dx,bL);
}break;
case W:if(dA==2){dt=qx.locale.Date.getDayName(bm,dr,dx,bE);
}else if(dA==3){dt=qx.locale.Date.getDayName(bJ,dr,dx,bE);
}else if(dA==4){dt=qx.locale.Date.getDayName(bI,dr,dx,bE);
}break;
case bc:if(dA==1||dA==2){dt=this.__fillNumber(dB+1,dA);
}else if(dA==3){dt=qx.locale.Date.getMonthName(bJ,dB,dx,bL);
}else if(dA==4){dt=qx.locale.Date.getMonthName(bI,dB,dx,bL);
}break;
case bz:if(dA==1||dA==2){dt=this.__fillNumber(dB+1,dA);
}else if(dA==3){dt=qx.locale.Date.getMonthName(bJ,dB,dx,bE);
}else if(dA==4){dt=qx.locale.Date.getMonthName(bI,dB,dx,bE);
}break;
case bj:dt=(dC<12)?qx.locale.Date.getAmMarker(dx):qx.locale.Date.getPmMarker(dx);
break;
case T:dt=this.__fillNumber(dC,dA);
break;
case V:dt=this.__fillNumber((dC==0)?24:dC,dA);
break;
case D:dt=this.__fillNumber(dC%12,dA);
break;
case cf:dt=this.__fillNumber(((dC%12)==0)?12:(dC%12),dA);
break;
case bg:dt=this.__fillNumber(dy,dA);
break;
case cd:dt=this.__fillNumber(dD,dA);
break;
case Q:dt=this.__fillNumber(dF,dA);
break;
case bP:if(dA==1){dt=p+((du>0)?bl:bU)+this.__fillNumber(Math.abs(ds))+k+this.__fillNumber(dz,2);
}else if(dA==2){dt=dw.MEDIUM_TIMEZONE_NAMES[ds];
}else if(dA==3){dt=dw.FULL_TIMEZONE_NAMES[ds];
}break;
case bV:dt=((du>0)?bl:bU)+this.__fillNumber(Math.abs(ds),2)+this.__fillNumber(dz,2);
break;
}dG+=dt;
}}return dG;
},parse:function(a){this.__initParseFeed();
var g=this.__parseFeed.regex.exec(a);

if(g==null){throw new Error("Date string '"+a+"' does not match the date format: "+this.__format);
}var b={year:1970,month:0,day:1,hour:0,ispm:false,min:0,sec:0,ms:0};
var c=1;

for(var i=0;i<this.__parseFeed.usedRules.length;i++){var e=this.__parseFeed.usedRules[i];
var d=g[c];

if(e.field!=null){b[e.field]=parseInt(d,10);
}else{e.manipulator(b,d);
}c+=(e.groups==null)?1:e.groups;
}var f=new Date(b.year,b.month,b.day,(b.ispm)?(b.hour+12):b.hour,b.min,b.sec,b.ms);

if(b.month!=f.getMonth()||b.year!=f.getFullYear()){throw new Error("Error parsing date '"+a+"': the value for day or month is too large");
}return f;
},__initFormatTree:function(){if(this.__formatTree!=null){return;
}this.__formatTree=[];
var dS;
var dQ=0;
var dU=bK;
var dO=this.__format;
var dR=bs;
var i=0;

while(i<dO.length){var dT=dO.charAt(i);

switch(dR){case bk:if(dT==bq){if(i+1>=dO.length){i++;
break;
}var dP=dO.charAt(i+1);

if(dP==bq){dU+=dT;
i++;
}else{i++;
dR=bf;
}}else{dU+=dT;
i++;
}break;
case bD:if(dT==dS){dQ++;
i++;
}else{this.__formatTree.push({type:bD,character:dS,size:dQ});
dS=null;
dQ=0;
dR=bs;
}break;
default:if((dT>=bj&&dT<=bP)||(dT>=cc&&dT<=bV)){dS=dT;
dR=bD;
}else if(dT==bq){if(i+1>=dO.length){dU+=dT;
i++;
break;
}var dP=dO.charAt(i+1);

if(dP==bq){dU+=dT;
i++;
}i++;
dR=bk;
}else{dR=bs;
}
if(dR!=bs){if(dU.length>0){this.__formatTree.push({type:br,text:dU});
dU=bK;
}}else{dU+=dT;
i++;
}break;
}}if(dS!=null){this.__formatTree.push({type:bD,character:dS,size:dQ});
}else if(dU.length>0){this.__formatTree.push({type:br,text:dU});
}},__initParseFeed:function(){if(this.__parseFeed!=null){return ;
}var cM=this.__format;
this.__initParseRules();
this.__initFormatTree();
var cS=[];
var cO=bt;

for(var cK=0;cK<this.__formatTree.length;cK++){var cT=this.__formatTree[cK];

if(cT.type==br){cO+=qx.lang.String.escapeRegexpChars(cT.text);
}else{var cL=cT.character;
var cP=cT.size;
var cN;

for(var cU=0;cU<this.__parseRules.length;cU++){var cQ=this.__parseRules[cU];

if(cL==cQ.pattern.charAt(0)&&cP==cQ.pattern.length){cN=cQ;
break;
}}if(cN==null){var cR=bK;

for(var i=0;i<cP;i++){cR+=cL;
}throw new Error("Malformed date format: "+cM+". Wildcard "+cR+" is not supported");
}else{cS.push(cN);
cO+=cN.regex;
}}}cO+=G;
var cJ;

try{cJ=new RegExp(cO);
}catch(cG){throw new Error("Malformed date format: "+cM);
}this.__parseFeed={regex:cJ,"usedRules":cS,pattern:cO};
},__initParseRules:function(){var cp=qx.util.format.DateFormat;
var cv=qx.lang.String;

if(this.__parseRules!=null){return ;
}var cq=this.__parseRules=[];
var cC=function(cE,cF){cF=parseInt(cF,10);

if(cF<cp.ASSUME_YEAR_2000_THRESHOLD){cF+=2000;
}else if(cF<100){cF+=1900;
}cE.year=cF;
};
var cw=function(da,db){da.month=parseInt(db,10)-1;
};
var ct=function(dM,dN){dM.ispm=(dN==cp.PM_MARKER);
};
var cs=function(dg,dh){dg.hour=parseInt(dh,10)%24;
};
var cr=function(dK,dL){dK.hour=parseInt(dL,10)%12;
};
var cz=function(dc,dd){return;
};
var cx=qx.locale.Date.getMonthNames(bJ,this.__locale,bL);

for(var i=0;i<cx.length;i++){cx[i]=cv.escapeRegexpChars(cx[i].toString());
}var cy=function(h,j){j=cv.escapeRegexpChars(j);
h.month=cx.indexOf(j);
};
var cm=qx.locale.Date.getMonthNames(bI,this.__locale,bL);

for(var i=0;i<cm.length;i++){cm[i]=cv.escapeRegexpChars(cm[i].toString());
}var cl=function(dV,dW){dW=cv.escapeRegexpChars(dW);
dV.month=cm.indexOf(dW);
};
var co=qx.locale.Date.getDayNames(bm,this.__locale,bL);

for(var i=0;i<co.length;i++){co[i]=cv.escapeRegexpChars(co[i].toString());
}var ck=function(cH,cI){cI=cv.escapeRegexpChars(cI);
cH.month=co.indexOf(cI);
};
var cA=qx.locale.Date.getDayNames(bJ,this.__locale,bL);

for(var i=0;i<cA.length;i++){cA[i]=cv.escapeRegexpChars(cA[i].toString());
}var cu=function(de,df){df=cv.escapeRegexpChars(df);
de.month=cA.indexOf(df);
};
var cB=qx.locale.Date.getDayNames(bI,this.__locale,bL);

for(var i=0;i<cB.length;i++){cB[i]=cv.escapeRegexpChars(cB[i].toString());
}var cn=function(ci,cj){cj=cv.escapeRegexpChars(cj);
ci.month=cB.indexOf(cj);
};
cq.push({pattern:cb,regex:Y,manipulator:cC});
cq.push({pattern:ca,regex:by,manipulator:cC});
cq.push({pattern:z,regex:bB,manipulator:cC});
cq.push({pattern:s,regex:ba,manipulator:cC});
cq.push({pattern:M,regex:bh,manipulator:cC});
cq.push({pattern:A,regex:u,manipulator:cC});
cq.push({pattern:ch,regex:y,manipulator:cC});
cq.push({pattern:J,regex:bM,manipulator:cw});
cq.push({pattern:w,regex:bM,manipulator:cw});
cq.push({pattern:L,regex:bH+cx.join(bF)+bG,manipulator:cy});
cq.push({pattern:R,regex:bH+cm.join(bF)+bG,manipulator:cl});
cq.push({pattern:q,regex:bM,field:bO});
cq.push({pattern:X,regex:bM,field:bO});
cq.push({pattern:bX,regex:bH+co.join(bF)+bG,manipulator:ck});
cq.push({pattern:H,regex:bH+cA.join(bF)+bG,manipulator:cu});
cq.push({pattern:bu,regex:bH+cB.join(bF)+bG,manipulator:cn});
cq.push({pattern:n,regex:bH+cp.AM_MARKER+bF+cp.PM_MARKER+bG,manipulator:ct});
cq.push({pattern:bY,regex:bM,field:bp});
cq.push({pattern:t,regex:bM,field:bp});
cq.push({pattern:cg,regex:bM,manipulator:cs});
cq.push({pattern:bb,regex:bM,manipulator:cs});
cq.push({pattern:bA,regex:bM,field:bp});
cq.push({pattern:m,regex:bM,field:bp});
cq.push({pattern:C,regex:bM,manipulator:cr});
cq.push({pattern:bx,regex:bM,manipulator:cr});
cq.push({pattern:bv,regex:bM,field:bw});
cq.push({pattern:O,regex:bM,field:bw});
cq.push({pattern:S,regex:bM,field:bN});
cq.push({pattern:K,regex:bM,field:bN});
cq.push({pattern:x,regex:bo,field:bn});
cq.push({pattern:bi,regex:bo,field:bn});
cq.push({pattern:ce,regex:bo,field:bn});
cq.push({pattern:bC,regex:o,manipulator:cz});
cq.push({pattern:N,regex:U,manipulator:cz});
}},destruct:function(){this.__formatTree=this.__parseFeed=this.__parseRules=null;
}});
})();
(function(){var m="selected",l="click",k="last-month-button",j="default",h="next-month-button",g="otherMonth",f="month-year-label",d="last-year-button",c="navigation-bar",b="next-year-button",bm="date-pane",bl="PageUp",bk="mousedown",bj="today",bi="Integer",bh="PageDown",bg="changeLocale",bf="next-month-button-tooltip",be="last-month-button-tooltip",bd="qx.dynlocale",t="last-year-button-tooltip",u="next-year-button-tooltip",r="on",s="weekend",p="day",q="lastMonth",n="Next month",o="Escape",z="Left",A="weekday",I="changeValue",G="Space",Q="Down",L="qx.ui.control.DateChooser",Y="Date",V="Enter",C="dblclick",bc="day#",bb="Next year",ba="ww",B="_applyValue",E="Up",F="weekday#",H="datechooser",J="header",M="week",S="lastYear",X="nextYear",v="changeShownYear",w="week#",D="Last month",P="Right",O="Last year",N="EE",U="mouseup",T="keypress",K="",R="nextMonth",a="week#0",W="changeShownMonth";
qx.Class.define(L,{extend:qx.ui.core.Widget,include:[qx.ui.core.MExecutable,qx.ui.form.MForm],implement:[qx.ui.form.IExecutable,qx.ui.form.IForm,qx.ui.form.IDateForm],construct:function(bn){qx.ui.core.Widget.call(this);
var bp=new qx.ui.layout.VBox();
this._setLayout(bp);
this._createChildControl(c);
this._createChildControl(bm);
this.addListener(T,this._onKeyPress);
var bo=(bn!=null)?bn:new Date();
this.showMonth(bo.getMonth(),bo.getFullYear());
if(qx.core.Variant.isSet(bd,r)){qx.locale.Manager.getInstance().addListener(bg,this._updateDatePane,this);
}this.addListener(bk,this._onMouseUpDown,this);
this.addListener(U,this._onMouseUpDown,this);
},statics:{MONTH_YEAR_FORMAT:qx.locale.Date.getDateTimeFormat("yyyyMMMM","MMMM yyyy")},properties:{appearance:{refine:true,init:H},width:{refine:true,init:200},height:{refine:true,init:150},shownMonth:{check:bi,init:null,nullable:true,event:W},shownYear:{check:bi,init:null,nullable:true,event:v},value:{check:Y,init:null,nullable:true,event:I,apply:B}},members:{__weekdayLabelArr:null,__dayLabelArr:null,__weekLabelArr:null,_forwardStates:{invalid:true},_createChildControlImpl:function(cg){var ch;

switch(cg){case c:ch=new qx.ui.container.Composite(new qx.ui.layout.HBox());
ch.add(this.getChildControl(d));
ch.add(this.getChildControl(k));
ch.add(this.getChildControl(f),{flex:1});
ch.add(this.getChildControl(h));
ch.add(this.getChildControl(b));
this._add(ch);
break;
case t:ch=new qx.ui.tooltip.ToolTip(this.tr(O));
break;
case d:ch=new qx.ui.form.Button();
ch.addState(S);
ch.setFocusable(false);
ch.setToolTip(this.getChildControl(t));
ch.addListener(l,this._onNavButtonClicked,this);
break;
case be:ch=new qx.ui.tooltip.ToolTip(this.tr(D));
break;
case k:ch=new qx.ui.toolbar.Button();
ch.addState(q);
ch.setFocusable(false);
ch.setToolTip(this.getChildControl(be));
ch.addListener(l,this._onNavButtonClicked,this);
break;
case bf:ch=new qx.ui.tooltip.ToolTip(this.tr(n));
break;
case h:ch=new qx.ui.toolbar.Button();
ch.addState(R);
ch.setFocusable(false);
ch.setToolTip(this.getChildControl(bf));
ch.addListener(l,this._onNavButtonClicked,this);
break;
case u:ch=new qx.ui.tooltip.ToolTip(this.tr(bb));
break;
case b:ch=new qx.ui.toolbar.Button();
ch.addState(X);
ch.setFocusable(false);
ch.setToolTip(this.getChildControl(u));
ch.addListener(l,this._onNavButtonClicked,this);
break;
case f:ch=new qx.ui.basic.Label();
ch.setAllowGrowX(true);
ch.setAnonymous(true);
break;
case M:ch=new qx.ui.basic.Label();
ch.setAllowGrowX(true);
ch.setAllowGrowY(true);
ch.setSelectable(false);
ch.setAnonymous(true);
ch.setCursor(j);
break;
case A:ch=new qx.ui.basic.Label();
ch.setAllowGrowX(true);
ch.setAllowGrowY(true);
ch.setSelectable(false);
ch.setAnonymous(true);
ch.setCursor(j);
break;
case p:ch=new qx.ui.basic.Label();
ch.setAllowGrowX(true);
ch.setAllowGrowY(true);
ch.setCursor(j);
ch.addListener(bk,this._onDayClicked,this);
ch.addListener(C,this._onDayDblClicked,this);
break;
case bm:var ci=new qx.ui.layout.Grid();
ch=new qx.ui.container.Composite(ci);

for(var i=0;i<8;i++){ci.setColumnFlex(i,1);
}
for(var i=0;i<7;i++){ci.setRowFlex(i,1);
}var cj=this.getChildControl(a);
cj.addState(J);
ch.add(cj,{column:0,row:0});
this.__weekdayLabelArr=[];

for(var i=0;i<7;i++){cj=this.getChildControl(F+i);
ch.add(cj,{column:i+1,row:0});
this.__weekdayLabelArr.push(cj);
}this.__dayLabelArr=[];
this.__weekLabelArr=[];

for(var y=0;y<6;y++){var cj=this.getChildControl(w+(y+1));
ch.add(cj,{column:0,row:y+1});
this.__weekLabelArr.push(cj);
for(var x=0;x<7;x++){var cj=this.getChildControl(bc+((y*7)+x));
ch.add(cj,{column:x+1,row:y+1});
this.__dayLabelArr.push(cj);
}}this._add(ch);
break;
}return ch||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,cg);
},_applyValue:function(bt,bu){if((bt!=null)&&(this.getShownMonth()!=bt.getMonth()||this.getShownYear()!=bt.getFullYear())){this.showMonth(bt.getMonth(),bt.getFullYear());
}else{var bw=(bt==null)?-1:bt.getDate();

for(var i=0;i<6*7;i++){var bv=this.__dayLabelArr[i];

if(bv.hasState(g)){if(bv.hasState(m)){bv.removeState(m);
}}else{var bx=parseInt(bv.getValue());

if(bx==bw){bv.addState(m);
}else if(bv.hasState(m)){bv.removeState(m);
}}}}},_onMouseUpDown:function(e){var by=e.getTarget();

if(by==this.getChildControl(c)||by==this.getChildControl(bm)){e.stopPropagation();
return;
}},_onNavButtonClicked:function(bq){var bs=this.getShownYear();
var br=this.getShownMonth();

switch(bq.getCurrentTarget()){case this.getChildControl(d):bs--;
break;
case this.getChildControl(k):br--;

if(br<0){br=11;
bs--;
}break;
case this.getChildControl(h):br++;

if(br>=12){br=0;
bs++;
}break;
case this.getChildControl(b):bs++;
break;
}this.showMonth(br,bs);
},_onDayClicked:function(cm){var cn=cm.getCurrentTarget().dateTime;
this.setValue(new Date(cn));
},_onDayDblClicked:function(){this.execute();
},_onKeyPress:function(bz){var bD=null;
var bB=null;
var bC=null;

if(bz.getModifiers()==0){switch(bz.getKeyIdentifier()){case z:bD=-1;
break;
case P:bD=1;
break;
case E:bD=-7;
break;
case Q:bD=7;
break;
case bl:bB=-1;
break;
case bh:bB=1;
break;
case o:if(this.getValue()!=null){this.setValue(null);
return true;
}break;
case V:case G:if(this.getValue()!=null){this.execute();
}return;
}}else if(bz.isShiftPressed()){switch(bz.getKeyIdentifier()){case bl:bC=-1;
break;
case bh:bC=1;
break;
}}
if(bD!=null||bB!=null||bC!=null){var bA=this.getValue();

if(bA!=null){bA=new Date(bA.getTime());
}
if(bA==null){bA=new Date();
}else{if(bD!=null){bA.setDate(bA.getDate()+bD);
}
if(bB!=null){bA.setMonth(bA.getMonth()+bB);
}
if(bC!=null){bA.setFullYear(bA.getFullYear()+bC);
}}this.setValue(bA);
}},showMonth:function(ck,cl){if((ck!=null&&ck!=this.getShownMonth())||(cl!=null&&cl!=this.getShownYear())){if(ck!=null){this.setShownMonth(ck);
}
if(cl!=null){this.setShownYear(cl);
}this._updateDatePane();
}},handleKeyPress:function(e){this._onKeyPress(e);
},_updateDatePane:function(){var bT=qx.ui.control.DateChooser;
var bQ=new Date();
var bJ=bQ.getFullYear();
var bO=bQ.getMonth();
var bM=bQ.getDate();
var bU=this.getValue();
var bX=(bU==null)?-1:bU.getFullYear();
var cf=(bU==null)?-1:bU.getMonth();
var bR=(bU==null)?-1:bU.getDate();
var bN=this.getShownMonth();
var cc=this.getShownYear();
var bK=qx.locale.Date.getWeekStart();
var bV=new Date(this.getShownYear(),this.getShownMonth(),1);
var bS=new qx.util.format.DateFormat(bT.MONTH_YEAR_FORMAT);
this.getChildControl(f).setValue(bS.format(bV));
var ce=bV.getDay();
var bP=1+((7-ce)%7);
var bW=new qx.util.format.DateFormat(N);

for(var i=0;i<7;i++){var bY=(i+bK)%7;
var cb=this.__weekdayLabelArr[i];
bV.setDate(bP+bY);
cb.setValue(bW.format(bV));

if(qx.locale.Date.isWeekend(bY)){cb.addState(s);
}else{cb.removeState(s);
}}bV=new Date(cc,bN,1,12,0,0);
var bF=(7+ce-bK)%7;
bV.setDate(bV.getDate()-bF);
var ca=new qx.util.format.DateFormat(ba);

for(var bE=0;bE<6;bE++){this.__weekLabelArr[bE].setValue(ca.format(bV));

for(var i=0;i<7;i++){var cb=this.__dayLabelArr[bE*7+i];
var bI=bV.getFullYear();
var bH=bV.getMonth();
var bL=bV.getDate();
var bG=(bX==bI&&cf==bH&&bR==bL);

if(bG){cb.addState(m);
}else{cb.removeState(m);
}
if(bH!=bN){cb.addState(g);
}else{cb.removeState(g);
}var cd=(bI==bJ&&bH==bO&&bL==bM);

if(cd){cb.addState(bj);
}else{cb.removeState(bj);
}cb.setValue(K+bL);
cb.dateTime=bV.getTime();
bV.setDate(bV.getDate()+1);
}}bS.dispose();
bW.dispose();
ca.dispose();
}},destruct:function(){if(qx.core.Variant.isSet(bd,r)){qx.locale.Manager.getInstance().removeListener(bg,this._updateDatePane,this);
}this.__weekdayLabelArr=this.__dayLabelArr=this.__weekLabelArr=null;
}});
})();
(function(){var e="inherit",d="toolbar-button",c="keydown",b="qx.ui.toolbar.Button",a="keyup";
qx.Class.define(b,{extend:qx.ui.form.Button,construct:function(f,g,h){qx.ui.form.Button.call(this,f,g,h);
this.removeListener(c,this._onKeyDown);
this.removeListener(a,this._onKeyUp);
},properties:{appearance:{refine:true,init:d},show:{refine:true,init:e},focusable:{refine:true,init:false}}});
})();
(function(){var l="Dokumentation",k="Zielplanung",j="logbuch.module.Sidebar",h="Termine",g="Inspiration",f="Tagebuch";
qx.Class.define(j,{extend:qx.ui.container.Composite,implement:[qcl.application.IModule,qcl.application.IWidgetModule],construct:function(){qx.ui.container.Composite.call(this);
this.__index={};
},members:{__index:null,__sandbox:null,init:function(m){this.__sandbox=m;
},build:function(){var e=this.__sandbox.getLayoutConfig();
this.set({layout:new qx.ui.layout.VBox(e.getCalendarDayBox().getHorizontalGridLineWidth()),width:e.getSidebar().getWidth(),marginTop:e.getSidebar().getMarginTop(),marginRight:e.getCalendarDayBox().getHorizontalGridLineWidth(),marginLeft:e.getSidebar().getMarginLeft()});
var d=[h,k,l,f,g];

for(var i=0;i<d.length;i++){var c=d[i];
var a=d[i];
var b=new logbuch.module.Category(a,this.__sandbox);
b.setHeight(e.getCalendarDayBox().getHeight()-5);
this.__index[c]=b;
this.add(b);
}},start:function(){},stop:function(){}}});
})();
(function(){var d="logbuch-label-box",c="logbuch.module.Category",b="white",a="right";
qx.Class.define(c,{extend:qx.ui.container.Composite,construct:function(name,f){this.__name=name;
this.__sandbox=f;
qx.ui.container.Composite.call(this);
this.set({layout:new qx.ui.layout.VBox(1),appearance:d});
this.build();
},members:{build:function(){this.add(new qx.ui.core.Spacer(),{flex:1});
var e=new qx.ui.basic.Label(this.__name);
e.set({textColor:b,font:d,alignX:a});
this.add(e);
}}});
})();
(function(){var n="Date",m="change-date",l="Integer",k="change-date-today",j="#EEE",h="manager",g="#999999",f="logbuch.module.Calendar",c="vertical",b="Setting date: ",J="__cellRenderer",I="first loaded: ",H="",G="logbuch-background-calendar-current-date",F="Bitte Text eingeben",E="Array",D="transparent",C="change first visible: ",B="center",A="last loaded: ",u="scrollX",v="ccc dd.MM.yyyy",s="changeDate",t="multi",q="logbuch-background-calendar",r="cellDblclick",o="logbuch-background-calendar-selected",p="horizontal",w="logbuch-background-calendar-weekend",x="white",z="_applyDate",y="change last visible: ";
qx.Class.define(f,{extend:qx.ui.container.Composite,implement:[qcl.application.IModule,qcl.application.IWidgetModule],properties:{date:{check:n,nullable:true,apply:z,event:s},dateColumn:{check:l,nullable:true},firstDateVisible:{check:n,nullable:true},lastDateVisible:{check:n,nullable:true},firstDateLoaded:{check:n,nullable:true},lastDateLoaded:{check:n,nullable:true},daysLoaded:{check:l,init:90},notAWorkDayCols:{check:E,nullable:true}},construct:function(){qx.ui.container.Composite.call(this);
this.__data=[];
},members:{__scroller:null,__cellRenderer:null,__data:null,__sandbox:null,init:function(bz){this.__sandbox=bz;
},build:function(){var bB=this.__sandbox.getLayoutConfig();
this.set({layout:new qx.ui.layout.Grow(),marginRight:bB.getWorkspace().getMarginRight(),marginTop:bB.getWorkspace().getMarginTop()});
this.__scroller=this.createScroller();
var bC=this.__scroller.getPane();
bC.addListener(r,this._onCellDblclick,this);
bC.addListener(u,this._onScrollX,this);
this.add(this.__scroller);
this.setDate(new Date());
},start:function(){this.__sandbox.subscribe(m,this._onSandboxChangeDate,this);
this.__sandbox.subscribe(k,this._onSandboxChangeDateToday,this);
},stop:function(){this.__sandbox.unsubscribe(m,this._onSandboxChangeDate,this);
this.__sandbox.unsubscribe(k,this._onSandboxChangeDateToday,this);
},_applyDate:function(O,P){var R=new qx.util.format.DateFormat();
console.log(b+R.format(O));
this.__sandbox.publish(m,O);
if(!P||O<this.getFirstDateLoaded()||O>this.getLastDateLoaded()){var ba=Math.floor(this.getDaysLoaded()/2)*86400000;
var Y=new Date(O.getTime()-ba);
this.setFirstDateLoaded(Y);
console.log(I+R.format(Y));
var U=new Date(O.getTime()+ba);
this.setLastDateLoaded(U);
console.log(A+R.format(U));
var T=[];
var d=new Date(this.getFirstDateLoaded().getTime());

for(var i=0;i<this.getDaysLoaded();i++){if(qx.locale.Date.isWeekend(d.getDay())){T.push(i);
}d.setDate(d.getDate()+1);
}this.setNotAWorkDayCols(T);
}if(!P||O<this.getFirstDateVisible()||O>this.getLastDateVisible()){var W=O.getDay()-qx.locale.Date.getWeekStart();
var S=new Date(O.getTime()-W*86400000);
this.setFirstDateVisible(S);
console.log(C+R.format(S));
var X=new Date(S.getTime()+(6*86400000));
this.setLastDateVisible(X);
console.log(y+R.format(X));
}this.setDateColumn(this.getColumnFromDate(O));
var V=this.__scroller.getPane();
var Q=this.getColumnFromDate(this.getFirstDateVisible());
qx.util.TimerManager.getInstance().start(function(){V.setScrollX(this.getScrollXFromColumn(Q));
V.fullUpdate();
},null,this,null,100);
},getColumnFromDate:function(bA){if(!this.getFirstDateLoaded()||bA<this.getFirstDateLoaded()||bA>this.getLastDateLoaded()){this.error("Date is not within loaded period");
}return Math.floor((bA.getTime()-this.getFirstDateLoaded().getTime())/86400000);
},getScrollXFromColumn:function(by){return by*this.__sandbox.getLayoutConfig().getCalendarDayBox().getWidth();
},_onSandboxChangeDate:function(e){this.setDate(e.getData());
},_onSandboxChangeDateToday:function(e){var K=new Date();
this.setDate(K);
this.__scroller.getPane().scrollColumnIntoView(this.getColumnFromDate(K));
},_onCellDblclick:function(e){var bb,bd,bc;
bb=prompt(F);
bd=e.getRow();
bc=e.getColumn();

if(!this.__data[bd]){this.__data[bd]=[];
}this.__data[bd][bc]=bb;
this.__scroller.getPane().fullUpdate();
},_onScrollX:function(e){},createScroller:function(){var bg=this.__sandbox.getLayoutConfig(),bt=bg.getCalendarDayBox(),bm=6,bw=this.getDaysLoaded(),bf=bt.getHeight(),bi=bt.getWidth(),bp=bt.getHorizontalGridLineWidth();
var bh=new qx.ui.virtual.core.Scroller(bm,bw,bf,bi);
var br=bh.getPane();
var bo=new qx.ui.virtual.layer.Row(j,j);
bo.setColor(0,D);
br.addLayer(bo);
br.getRowConfig().setItemSize(0,30);
var bx=new qx.ui.virtual.cell.Date(new qx.util.format.DateFormat(v));
bx.set({textColor:x,textAlign:B});
var bq=new qx.ui.virtual.cell.Cell().set({backgroundColor:q});
var be=new qx.ui.virtual.cell.Cell().set({backgroundColor:G});
var bv=new qx.ui.virtual.cell.Cell().set({backgroundColor:w});
var bn=new qx.ui.virtual.cell.Cell().set({backgroundColor:o});
var bk=new qx.ui.virtual.selection.CellRectangle(bh.getPane(),{styleSelectable:function(bG,bH,bI){bj.updateLayerData();
}});
bk.attachMouseEvents(bh.getPane());
bk.attachKeyEvents(bh);
bk.set({mode:t,drag:true});
bh.setUserData(h,bk);
var bl=this;
var bj=new qx.ui.virtual.layer.HtmlCell({getCellProperties:function(L,M){var N={};

if(bk.isItemSelected({row:L,column:M})){N.selected=true;
}if(L==0){return bx.getCellProperties(bl._getCellDate(M),N);
}else if(N.selected){return bn.getCellProperties(bl._getCellHtml(L,M),N);
}else if(M==bl.getDateColumn()){return be.getCellProperties(bl._getCellHtml(L,M),N);
}else{if(qx.lang.Array.contains(bl.getNotAWorkDayCols(),M)){return bv.getCellProperties(bl._getCellHtml(L,M),N);
}else{return bq.getCellProperties(bl._getCellHtml(L,M),N);
}}}});
br.addLayer(bj);
var bs=new qx.ui.virtual.layer.GridLines(p,g,bp);
bs.setZIndex(1E7);
var bu=new qx.ui.virtual.layer.GridLines(c);
bu.setZIndex(1E7);
br.addLayer(bs);
br.addLayer(bu);
return bh;
},_getCellDate:function(a){return new Date(this.getFirstDateLoaded().getTime()+86400000*a);
},_getCellHtml:function(bD,bE){var bF=H;

if(this.__data[bD]&&this.__data[bD][bE]){bF=this.__data[bD][bE];
}return bF;
}},destruct:function(){this._disposeObjects(J);
}});
})();
(function(){var c="interval",b="qx.util.TimerManager",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,statics:{__timerQueue:[],__timerData:{},__timerId:0},members:{__timerListenerActive:false,start:function(m,n,o,p,q){if(!q){q=n||0;
}var r=(new Date()).getTime()+q;
this.self(arguments).__timerData[++this.self(arguments).__timerId]={callback:m,userData:p||null,expireAt:r,recurTime:n,context:o||this};
this.__insertNewTimer(r,this.self(arguments).__timerId);
return this.self(arguments).__timerId;
},stop:function(k){var l=this.self(arguments).__timerQueue;
var length=l.length;

for(var i=0;i<length;i++){if(l[i]==k){l.splice(i,1);
break;
}}delete this.self(arguments).__timerData[k];
if(l.length==0&&this.__timerListenerActive){qx.event.Idle.getInstance().removeListener(c,this.__processQueue,this);
this.__timerListenerActive=false;
}},__insertNewTimer:function(s,t){var v=this.self(arguments).__timerQueue;
var u=this.self(arguments).__timerData;
var length=v.length;

for(var i=0;i<length;i++){if(u[v[i]].expireAt>s){v.splice(i,0,t);
break;
}}if(v.length==length){v.push(t);
}if(!this.__timerListenerActive){qx.event.Idle.getInstance().addListener(c,this.__processQueue,this);
this.__timerListenerActive=true;
}},__processQueue:function(){var g=(new Date()).getTime();
var e=this.self(arguments).__timerQueue;
var f=this.self(arguments).__timerData;
while(e.length>0&&f[e[0]].expireAt<=g){var j=e.shift();
var d=f[j];
d.callback.call(d.context,d.userData,j);
if(d.recurTime&&f[j]){var h=(new Date()).getTime();
d.expireAt=h+d.recurTime;
this.__insertNewTimer(d.expireAt,j);
}else{delete f[j];
}}if(e.length==0&&this.__timerListenerActive){qx.event.Idle.getInstance().removeListener(c,this.__processQueue,this);
this.__timerListenerActive=false;
}}}});
})();
(function(){var g="scrollY",f="update",d="scrollX",c="pane",b="__pane",a="qx.ui.virtual.core.Scroller";
qx.Class.define(a,{extend:qx.ui.core.scroll.AbstractScrollArea,construct:function(h,i,j,k){qx.ui.core.scroll.AbstractScrollArea.call(this);
this.__pane=new qx.ui.virtual.core.Pane(h,i,j,k);
this.__pane.addListener(f,this._computeScrollbars,this);
this.__pane.addListener(d,this._onScrollPaneX,this);
this.__pane.addListener(g,this._onScrollPaneY,this);
this._add(this.__pane,{row:0,column:0});
},properties:{width:{refine:true,init:null},height:{refine:true,init:null}},members:{__pane:null,getPane:function(){return this.__pane;
},_createChildControlImpl:function(m){if(m==c){return this.__pane;
}else{return qx.ui.core.scroll.AbstractScrollArea.prototype._createChildControlImpl.call(this,m);
}},getItemTop:function(p){throw new Error("The method 'getItemTop' is not implemented!");
},getItemBottom:function(o){throw new Error("The method 'getItemBottom' is not implemented!");
},getItemLeft:function(l){throw new Error("The method 'getItemLeft' is not implemented!");
},getItemRight:function(n){throw new Error("The method 'getItemRight' is not implemented!");
},_onScrollBarX:function(e){this.__pane.setScrollX(e.getData());
},_onScrollBarY:function(e){this.__pane.setScrollY(e.getData());
}},destruct:function(){this._disposeObjects(b);
}});
})();
(function(){var bI="appear",bH="qx.ui.virtual.core.CellEvent",bG="qx.event.type.Data",bF="change",bE="update",bD="scrollY",bC="full update",bB="__columnConfig",bA="dblclick",bz="update layer window",bX="qx.event.type.Event",bW="__layerContainer",bV="cellContextmenu",bU="resize",bT="scrollX",bS="__rowConfig",bR="cellDblclick",bQ="qx.ui.virtual.core.Pane",bP="click",bO="__layers",bM="prefetch x",bN="contextmenu",bK="cellClick",bL="prefetch y",bJ="scroll";
qx.Class.define(bQ,{extend:qx.ui.core.Widget,construct:function(bb,bc,bd,be){qx.ui.core.Widget.call(this);
this.__rowConfig=new qx.ui.virtual.core.Axis(bd,bb);
this.__columnConfig=new qx.ui.virtual.core.Axis(be,bc);
this.__scrollTop=0;
this.__scrollLeft=0;
this.__paneHeight=0;
this.__paneWidth=0;
this.__layerWindow={};
this.__jobs={};
this.__layerContainer=new qx.ui.container.Composite();
this.__layerContainer.setUserBounds(0,0,0,0);
this._add(this.__layerContainer);
this.__layers=[];
this.__rowConfig.addListener(bF,this.fullUpdate,this);
this.__columnConfig.addListener(bF,this.fullUpdate,this);
this.addListener(bU,this._onResize,this);
this.addListenerOnce(bI,this._onAppear,this);
this.addListener(bP,this._onClick,this);
this.addListener(bA,this._onDblclick,this);
this.addListener(bN,this._onContextmenu,this);
},events:{cellClick:bH,cellContextmenu:bH,cellDblclick:bH,update:bX,scrollX:bG,scrollY:bG},properties:{width:{refine:true,init:400},height:{refine:true,init:300}},members:{__rowConfig:null,__columnConfig:null,__scrollTop:null,__scrollLeft:null,__paneHeight:null,__paneWidth:null,__layerWindow:null,__jobs:null,__layerContainer:null,__layers:null,__dontFireUpdate:null,__columnSizes:null,__rowSizes:null,DEBUG:false,getRowConfig:function(){return this.__rowConfig;
},getColumnConfig:function(){return this.__columnConfig;
},getChildren:function(){return [this.__layerContainer];
},addLayer:function(bi){{};
this.__layers.push(bi);
bi.setUserBounds(0,0,0,0);
this.__layerContainer.add(bi);
},getLayers:function(){return this.__layers;
},getVisibleLayers:function(){var k=[];

for(var i=0;i<this.__layers.length;i++){var l=this.__layers[i];

if(l.isVisible()){k.push(l);
}}return k;
},getScrollMaxX:function(){var bj=this.getBounds();

if(bj){return Math.max(0,this.__columnConfig.getTotalSize()-bj.width);
}return 0;
},getScrollMaxY:function(){var w=this.getBounds();

if(w){return Math.max(0,this.__rowConfig.getTotalSize()-w.height);
}return 0;
},setScrollY:function(t){var u=this.getScrollMaxY();

if(t<0){t=0;
}else if(t>u){t=u;
}
if(this.__scrollTop!==t){var v=this.__scrollTop;
this.__scrollTop=t;
this._deferredUpdateScrollPosition();
this.fireDataEvent(bD,t,v);
}},getScrollY:function(){return this.__scrollTop;
},setScrollX:function(o){var p=this.getScrollMaxX();

if(o<0){o=0;
}else if(o>p){o=p;
}
if(o!==this.__scrollLeft){var q=this.__scrollLeft;
this.__scrollLeft=o;
this._deferredUpdateScrollPosition();
this.fireDataEvent(bT,o,q);
}},getScrollX:function(){return this.__scrollLeft;
},getScrollSize:function(){return {width:this.__columnConfig.getTotalSize(),height:this.__rowConfig.getTotalSize()};
},scrollRowIntoView:function(bk){var bn=this.getBounds();

if(!bn){this.addListenerOnce(bI,function(){this.scrollRowIntoView(bk);
},this);
return;
}var bo=this.__rowConfig.getItemPosition(bk);
var bm=bo+this.__rowConfig.getItemSize(bk);
var bl=this.getScrollY();

if(bo<bl){this.setScrollY(bo);
}else if(bm>bl+bn.height){this.setScrollY(bm-bn.height);
}},scrollColumnIntoView:function(bY){var cc=this.getBounds();

if(!cc){this.addListenerOnce(bI,function(){this.scrollColumnIntoView(bY);
},this);
return;
}var cb=this.__columnConfig.getItemPosition(bY);
var ca=cb+this.__columnConfig.getItemSize(bY);
var cd=this.getScrollX();

if(cb<cd){this.setScrollX(cb);
}else if(ca>cd+cc.width){this.setScrollX(ca-cc.width);
}},scrollCellIntoView:function(bf,bg){var bh=this.getBounds();

if(!bh){this.addListenerOnce(bI,function(){this.scrollCellIntoView(bf,bg);
},this);
return;
}this.scrollColumnIntoView(bf);
this.scrollRowIntoView(bg);
},getCellAtPosition:function(a,b){var c,d;
var f=this.getContentLocation();

if(!f||b<f.top||b>=f.bottom||a<f.left||a>=f.right){return null;
}c=this.__rowConfig.getItemAtPosition(this.getScrollY()+b-f.top);
d=this.__columnConfig.getItemAtPosition(this.getScrollX()+a-f.left);

if(!c||!d){return null;
}return {row:c.index,column:d.index};
},prefetchX:function(bp,bq,br,bs){var bt=this.getVisibleLayers();

if(bt.length==0){return;
}var bv=this.getBounds();

if(!bv){return;
}var bw=this.__scrollLeft+bv.width;
var bx=this.__paneWidth-bw;

if(this.__scrollLeft-this.__layerWindow.left<Math.min(this.__scrollLeft,bp)||this.__layerWindow.right-bw<Math.min(bx,br)){this.DEBUG&&console.log(bM);
var by=Math.min(this.__scrollLeft,bq);
var bu=Math.min(bx,bs);
this._setLayerWindow(bt,this.__scrollLeft-by,this.__scrollTop,bv.width+by+bu,bv.height,false);
}},prefetchY:function(x,y,z,A){var B=this.getVisibleLayers();

if(B.length==0){return;
}var E=this.getBounds();

if(!E){return;
}var C=this.__scrollTop+E.height;
var D=this.__paneHeight-C;

if(this.__scrollTop-this.__layerWindow.top<Math.min(this.__scrollTop,x)||this.__layerWindow.bottom-C<Math.min(D,z)){this.DEBUG&&console.log(bL);
var G=Math.min(this.__scrollTop,y);
var F=Math.min(D,A);
this._setLayerWindow(B,this.__scrollLeft,this.__scrollTop-G,E.width,E.height+G+F,false);
}},_onResize:function(){if(this.getContainerElement().getDomElement()){this.__dontFireUpdate=true;
this._updateScrollPosition();
this.__dontFireUpdate=null;
this.fireEvent(bE);
}},_onAppear:function(){this.fullUpdate();
},_onClick:function(e){this.__handleMouseCellEvent(e,bK);
},_onContextmenu:function(e){this.__handleMouseCellEvent(e,bV);
},_onDblclick:function(e){this.__handleMouseCellEvent(e,bR);
},__handleMouseCellEvent:function(e,m){var n=this.getCellAtPosition(e.getDocumentLeft(),e.getDocumentTop());

if(!n){return;
}this.fireNonBubblingEvent(m,qx.ui.virtual.core.CellEvent,[this,e,n.row,n.column]);
},syncWidget:function(){if(this.__jobs._fullUpdate){this._fullUpdate();
}else if(this.__jobs._updateScrollPosition){this._updateScrollPosition();
}this.__jobs={};
},_setLayerWindow:function(H,I,top,J,K,L){var Q=this.__rowConfig.getItemAtPosition(top);

if(Q){var S=Q.index;
var X=this.__rowConfig.getItemSizes(S,K+Q.offset);
var R=qx.lang.Array.sum(X);
var ba=top-Q.offset;
var W=top-Q.offset+R;
}else{var S=0;
var X=[];
var R=0;
var ba=0;
var W=0;
}var U=this.__columnConfig.getItemAtPosition(I);

if(U){var O=U.index;
var N=this.__columnConfig.getItemSizes(O,J+U.offset);
var T=qx.lang.Array.sum(N);
var Y=I-U.offset;
var P=I-U.offset+T;
}else{var O=0;
var N=[];
var T=0;
var Y=0;
var P=0;
}this.__layerWindow={top:ba,bottom:W,left:Y,right:P};
this.__layerContainer.setUserBounds(this.__layerWindow.left-this.__scrollLeft,this.__layerWindow.top-this.__scrollTop,T,R);
this.__columnSizes=N;
this.__rowSizes=X;
this.DEBUG&&qx.ui.core.queue.Manager.flush();

for(var i=0;i<this.__layers.length;i++){var V=new Date();
var M=this.__layers[i];
M.setUserBounds(0,0,T,R);

if(L){M.fullUpdate(S,O,X,N);
}else{M.updateLayerWindow(S,O,X,N);
}if(this.DEBUG){this.debug("layer update ("+M.classname+"): "+(new Date()-V)+"ms");
var V=new Date();
qx.ui.core.queue.Manager.flush();
this.debug("layer flush ("+M.classname+"): "+(new Date()-V)+"ms");
}}},__checkPaneResize:function(){if(this.__dontFireUpdate){return;
}var ce=this.getScrollSize();

if(this.__paneHeight!==ce.height||this.__paneWidth!==ce.width){this.__paneHeight=ce.height;
this.__paneWidth=ce.width;
this.fireEvent(bE);
}},fullUpdate:function(){this.__jobs._fullUpdate=1;
qx.ui.core.queue.Widget.add(this);
},isUpdatePending:function(){return !!this.__jobs._fullUpdate;
},_fullUpdate:function(){var r=this.getVisibleLayers();

if(r.length==0){this.__checkPaneResize();
return;
}
if(!this.getContainerElement().getDomElement()){return ;
}var s=this.getBounds();
this.DEBUG&&console.log(bC);
this._setLayerWindow(r,this.__scrollLeft,this.__scrollTop,s.width,s.height,true);
this.__checkPaneResize();
},_deferredUpdateScrollPosition:function(){this.__jobs._updateScrollPosition=1;
qx.ui.core.queue.Widget.add(this);
},_updateScrollPosition:function(){var g=this.getVisibleLayers();

if(g.length==0){this.__checkPaneResize();
return;
}var j=this.getBounds();

if(!j){return ;
}var h={top:this.__scrollTop,bottom:this.__scrollTop+j.height,left:this.__scrollLeft,right:this.__scrollLeft+j.width};

if(this.__layerWindow.top<=h.top&&this.__layerWindow.bottom>=h.bottom&&this.__layerWindow.left<=h.left&&this.__layerWindow.right>=h.right){this.DEBUG&&console.log(bJ);
this.__layerContainer.setUserBounds(this.__layerWindow.left-h.left,this.__layerWindow.top-h.top,this.__layerWindow.right-this.__layerWindow.left,this.__layerWindow.bottom-this.__layerWindow.top);
}else{this.DEBUG&&console.log(bz);
this._setLayerWindow(g,this.__scrollLeft,this.__scrollTop,j.width,j.height,false);
}this.__checkPaneResize();
}},destruct:function(){this._disposeArray(bO);
this._disposeObjects(bS,bB,bW);
this.__layerWindow=this.__jobs=this.__columnSizes=this.__rowSizes=null;
}});
})();
(function(){var e="change",d="qx.event.type.Event",c="qx.ui.virtual.core.Axis";
qx.Class.define(c,{extend:qx.core.Object,construct:function(I,J){qx.core.Object.call(this);
this.itemCount=J;
this.defaultItemSize=I;
this.customSizes={};
},events:{"change":d},members:{__ranges:null,getDefaultItemSize:function(){return this.defaultItemSize;
},setDefaultItemSize:function(f){if(this.defaultItemSize!==f){this.defaultItemSize=f;
this.__ranges=null;
this.fireNonBubblingEvent(e);
}},getItemCount:function(){return this.itemCount;
},setItemCount:function(H){if(this.itemCount!==H){this.itemCount=H;
this.__ranges=null;
this.fireNonBubblingEvent(e);
}},setItemSize:function(L,M){{};

if(this.customSizes[L]==M){return;
}
if(M===null){delete this.customSizes[L];
}else{this.customSizes[L]=M;
}this.__ranges=null;
this.fireNonBubblingEvent(e);
},getItemSize:function(K){return this.customSizes[K]||this.defaultItemSize;
},resetItemSizes:function(){this.customSizes={};
this.__ranges=null;
this.fireNonBubblingEvent(e);
},__getRanges:function(){if(this.__ranges){return this.__ranges;
}var R=this.defaultItemSize;
var Y=this.itemCount;
var T=[];

for(var V in this.customSizes){var P=parseInt(V);

if(P<Y){T.push(P);
}}
if(T.length==0){var U=[{startIndex:0,endIndex:Y-1,firstItemSize:R,rangeStart:0,rangeEnd:Y*R-1}];
this.__ranges=U;
return U;
}T.sort(function(a,b){return a>b?1:-1;
});
var U=[];
var Q=0;

for(var i=0;i<T.length;i++){var P=T[i];

if(P>=Y){break;
}var X=this.customSizes[P];
var S=P*R+Q;
Q+=X-R;
U[i]={startIndex:P,firstItemSize:X,rangeStart:S};

if(i>0){U[i-1].rangeEnd=S-1;
U[i-1].endIndex=P-1;
}}if(U[0].rangeStart>0){U.unshift({startIndex:0,endIndex:U[0].startIndex-1,firstItemSize:R,rangeStart:0,rangeEnd:U[0].rangeStart-1});
}var ba=U[U.length-1];
var W=(Y-ba.startIndex-1)*R;
ba.rangeEnd=ba.rangeStart+ba.firstItemSize+W-1;
ba.endIndex=Y-1;
this.__ranges=U;
return U;
},__findRangeByPosition:function(g){var h=this.__ranges||this.__getRanges();
var j=0;
var l=h.length-1;
while(true){var m=j+((l-j)>>1);
var k=h[m];

if(k.rangeEnd<g){j=m+1;
}else if(k.rangeStart>g){l=m-1;
}else{return k;
}}},getItemAtPosition:function(B){if(B<0||B>=this.getTotalSize()){return null;
}var D=this.__findRangeByPosition(B);
var F=D.rangeStart;
var C=D.startIndex;
var G=D.firstItemSize;

if(F+G>B){return {index:C,offset:B-F};
}else{var E=this.defaultItemSize;
return {index:C+1+Math.floor((B-F-G)/E),offset:(B-F-G)%E};
}},__findRangeByIndex:function(v){var w=this.__ranges||this.__getRanges();
var x=0;
var z=w.length-1;
while(true){var A=x+((z-x)>>1);
var y=w[A];

if(y.endIndex<v){x=A+1;
}else if(y.startIndex>v){z=A-1;
}else{return y;
}}},getItemPosition:function(N){if(N<0||N>=this.itemCount){return null;
}var O=this.__findRangeByIndex(N);

if(O.startIndex==N){return O.rangeStart;
}else{return O.rangeStart+O.firstItemSize+(N-O.startIndex-1)*this.defaultItemSize;
}},getTotalSize:function(){var u=this.__ranges||this.__getRanges();
return u[u.length-1].rangeEnd+1;
},getItemSizes:function(n,o){var p=this.customSizes;
var s=this.defaultItemSize;
var r=0;
var q=[];
var i=0;

while(r<o){var t=p[n++]||s;
r+=t;
q[i++]=t;

if(n>=this.itemCount){break;
}}return q;
}},destruct:function(){this.customSizes=this.__ranges=null;
}});
})();
(function(){var b="Integer",a="qx.ui.virtual.core.CellEvent";
qx.Class.define(a,{extend:qx.event.type.Mouse,properties:{row:{check:b,nullable:true},column:{check:b,nullable:true}},members:{init:function(c,d,e,f){d.clone(this);
this.setBubbles(false);
this.setRow(e);
this.setColumn(f);
}}});
})();
(function(){var a="qx.ui.virtual.core.ILayer";
qx.Interface.define(a,{members:{fullUpdate:function(f,g,h,i){this.assertArgumentsCount(arguments,6,6);
this.assertPositiveInteger(f);
this.assertPositiveInteger(g);
this.assertArray(h);
this.assertArray(i);
},updateLayerWindow:function(b,c,d,e){this.assertArgumentsCount(arguments,6,6);
this.assertPositiveInteger(b);
this.assertPositiveInteger(c);
this.assertArray(d);
this.assertArray(e);
},updateLayerData:function(){}}});
})();
(function(){var b="qx.ui.virtual.layer.Abstract",a="abstract";
qx.Class.define(b,{extend:qx.ui.core.Widget,type:a,implement:[qx.ui.virtual.core.ILayer],construct:function(){qx.ui.core.Widget.call(this);
this.__jobs={};
},properties:{anonymous:{refine:true,init:true}},members:{__jobs:null,__arguments:null,__firstRow:null,__firstColumn:null,__rowSizes:null,__columnSizes:null,getFirstRow:function(){return this.__firstRow;
},getFirstColumn:function(){return this.__firstColumn;
},getRowSizes:function(){return this.__rowSizes||[];
},getColumnSizes:function(){return this.__columnSizes||[];
},syncWidget:function(){if(!this.getContentElement().getDomElement()){return;
}
if(this.__jobs.fullUpdate||this.__jobs.updateLayerWindow&&this.__jobs.updateLayerData){this._fullUpdate.apply(this,this.__arguments);
}else if(this.__jobs.updateLayerWindow){this._updateLayerWindow.apply(this,this.__arguments);
}else if(this.__jobs.updateLayerData&&this.__rowSizes){this._updateLayerData();
}
if(this.__jobs.fullUpdate||this.__jobs.updateLayerWindow){var c=this.__arguments;
this.__firstRow=c[0];
this.__firstColumn=c[1];
this.__rowSizes=c[2];
this.__columnSizes=c[3];
}this.__jobs={};
},_updateLayerData:function(){this._fullUpdate(this.__firstRow,this.__firstColumn,this.__rowSizes,this.__columnSizes);
},_fullUpdate:function(l,m,n,o){throw new Error("Abstract method '_fullUpdate' called!");
},_updateLayerWindow:function(h,i,j,k){this._fullUpdate(h,i,j,k);
},updateLayerData:function(){this.__jobs.updateLayerData=true;
qx.ui.core.queue.Widget.add(this);
},fullUpdate:function(d,e,f,g){this.__arguments=arguments;
this.__jobs.fullUpdate=true;
qx.ui.core.queue.Widget.add(this);
},updateLayerWindow:function(p,q,r,s){this.__arguments=arguments;
this.__jobs.updateLayerWindow=true;
qx.ui.core.queue.Widget.add(this);
}},destruct:function(){this.__jobs=this.__arguments=this.__rowSizes=this.__columnSizes=null;
}});
})();
(function(){var f="Color",e="_applyColorOdd",d="_applyColorEven",c="qx.ui.virtual.layer.AbstractBackground";
qx.Class.define(c,{extend:qx.ui.virtual.layer.Abstract,construct:function(g,h){qx.ui.virtual.layer.Abstract.call(this);

if(g){this.setColorEven(g);
}
if(h){this.setColorOdd(h);
}this.__customColors={};
this.__decorators={};
},properties:{colorEven:{nullable:true,check:f,apply:d,themeable:true},colorOdd:{nullable:true,check:f,apply:e,themeable:true}},members:{__colorEven:null,__colorOdd:null,__customColors:null,__decorators:null,setColor:function(l,m){if(m){this.__customColors[l]=qx.theme.manager.Color.getInstance().resolve(m);
}else{delete (this.__customColors[l]);
}},clearCustomColors:function(){this.__customColors={};
this.updateLayerData();
},getColor:function(n){var o=this.__customColors[n];

if(o){return o;
}else{return n%2==0?this.__colorEven:this.__colorOdd;
}},_applyColorEven:function(p,q){if(p){this.__colorEven=qx.theme.manager.Color.getInstance().resolve(p);
}else{this.__colorEven=null;
}this.updateLayerData();
},_applyColorOdd:function(i,j){if(i){this.__colorOdd=qx.theme.manager.Color.getInstance().resolve(i);
}else{this.__colorOdd=null;
}this.updateLayerData();
},setBackground:function(a,b){if(b){this.__decorators[a]=qx.theme.manager.Decoration.getInstance().resolve(b);
}else{delete (this.__decorators[a]);
}this.updateLayerData();
},getBackground:function(k){return this.__decorators[k];
}},destruct:function(){this.__customColors=this.__decorators=null;
}});
})();
(function(){var q="px;",p="left: 0;",o="</div>",n="top:",m="position: absolute;",k="<div style='",j="'>",h="background-color:",g="",f="qx.ui.virtual.layer.Row",c="block",e="width:",d="height:",b="row-layer",a="none";
qx.Class.define(f,{extend:qx.ui.virtual.layer.AbstractBackground,properties:{appearance:{refine:true,init:b}},members:{_fullUpdate:function(B,C,D,E){var K=[];
var J=qx.lang.Array.sum(E);
var L=[];
var top=0;
var N=B;
var H=0;

for(var y=0;y<D.length;y++){var M=this.getBackground(N);

if(M){L.push({childIndex:H,decorator:M,width:J,height:D[y]});
K.push(k,m,p,n,top,q,j,M.getMarkup(),o);
H++;
}else{var I=this.getColor(N);

if(I){K.push(k,m,p,n,top,q,d,D[y],q,e,J,q,h,I,j,o);
H++;
}}top+=D[y];
N+=1;
}var F=this.getContentElement().getDomElement();
F.style.display=a;
F.innerHTML=K.join(g);
for(var i=0,l=L.length;i<l;i++){var G=L[i];
G.decorator.resize(F.childNodes[G.childIndex].firstChild,G.width,G.height);
}F.style.display=c;
this._width=J;
},_updateLayerWindow:function(w,x,z,A){if(w!==this.getFirstRow()||z.length!==this.getRowSizes().length||this._width<qx.lang.Array.sum(A)){this._fullUpdate(w,x,z,A);
}},setColor:function(r,s){qx.ui.virtual.layer.AbstractBackground.prototype.setColor.call(this,r,s);

if(this.__isRowRendered(r)){this.updateLayerData();
}},setBackground:function(O,P){qx.ui.virtual.layer.AbstractBackground.prototype.setBackground.call(this,O,P);

if(this.__isRowRendered(O)){this.updateLayerData();
}},__isRowRendered:function(t){var v=this.getFirstRow();
var u=v+this.getRowSizes().length-1;
return t>=v&&t<=u;
}}});
})();
(function(){var a="qx.ui.virtual.cell.ICell";
qx.Interface.define(a,{members:{getCellProperties:function(b,c){}}});
})();
(function(){var f="",e="qx.ui.virtual.cell.Abstract",d="abstract",c="qx-cell";
qx.Class.define(e,{type:d,extend:qx.core.Object,implement:qx.ui.virtual.cell.ICell,construct:function(){qx.core.Object.call(this);
qx.ui.virtual.cell.CellStylesheet.getInstance();
},members:{getCssClasses:function(m,n){return c;
},getAttributes:function(i,j){return f;
},getStyles:function(k,l){return f;
},getInsets:function(o,p){return [0,0];
},getContent:function(a,b){return a;
},getCellProperties:function(g,h){return {classes:this.getCssClasses(g,h),style:this.getStyles(g,h),attributes:this.getAttributes(g,h),content:this.getContent(g,h),insets:this.getInsets(g,h)};
}}});
})();
(function(){var t="Integer",s="_applyPadding",r="paddingLeft",q="Color",p="",o="paddingBottom",n="paddingTop",m="paddingRight",l=";",k="-",S="backgroundColor",R="_applyTextAlign",Q="px",P="_applyFont",O="_applyBackgroundColor",N="cell",M="center",L="font",K=":",J="shorthand",A="String",B="_applyAppearance",y="background-color:",z="textAlign",w="qx-cell ",x="left",u="textColor",v="text-align:",C="Font",D="right",F="_applyTextColor",E="justify",H="color:",G=" ",I="qx.ui.virtual.cell.Cell";
qx.Class.define(I,{extend:qx.ui.virtual.cell.Abstract,construct:function(){qx.ui.virtual.cell.Abstract.call(this);
this.__stylesheet=qx.ui.virtual.cell.CellStylesheet.getInstance();
this.__userStyles={};
this.__themeStyles={};
this.__userPaddings={};
this.__themePaddings={};
this.__states={};
this.__themeValues={};
this.initAppearance();
this.__initializeThemableProperties();
},properties:{appearance:{check:A,init:N,apply:B},backgroundColor:{nullable:true,check:q,apply:O,themeable:true},textColor:{nullable:true,check:q,apply:F,themeable:true},textAlign:{check:[x,M,D,E],nullable:true,themeable:true,apply:R},font:{nullable:true,apply:P,check:C,themeable:true},paddingTop:{check:t,init:0,apply:s,themeable:true},paddingRight:{check:t,nullable:true,apply:s,themeable:true},paddingBottom:{check:t,nullable:true,apply:s,themeable:true},paddingLeft:{check:t,nullable:true,apply:s,themeable:true},padding:{group:[n,m,o,r],mode:J,themeable:true}},members:{__themableProperties:null,__statesKey:null,__states:null,__themeValues:null,__themeStyles:null,__userStyles:null,__userPaddings:null,__themePaddings:null,__isThemed:false,__stylesheet:null,__initializeThemableProperties:function(){var V=qx.util.PropertyUtil;
var X=qx.lang.Object.fromArray(this._getCssProperties());
this.__themableProperties=[];
var U=this.constructor;

while(U){var W=V.getProperties(U);

for(var T in W){if(!X[T]){this.__themableProperties.push(T);
}}U=U.superclass;
}},_getCssProperties:function(){return [S,u,L,z,n,m,o,r];
},_applyAppearance:function(c,d){if(d){this.__themeStyles={};
}},_getValue:function(bg){if(this.__isThemed){return qx.util.PropertyUtil.getThemeValue(this,bg);
}else{return qx.util.PropertyUtil.getUserValue(this,bg);
}},_storeStyle:function(bx,by){var bz;

if(this.__isThemed){bz=this.__themeStyles;
}else{bz=this.__userStyles;
}
if(by===null){delete bz[bx];
}else{bz[bx]=by;
}},_applyBackgroundColor:function(bP,bQ,name){var bP=this._getValue(name);

if(!bP){this._storeStyle(name,null);
}else{this._storeStyle(name,y+qx.theme.manager.Color.getInstance().resolve(bP));
}},_applyTextColor:function(bb,bc,name){var bb=this._getValue(name);

if(!bb){this._storeStyle(name,null);
}else{this._storeStyle(name,H+qx.theme.manager.Color.getInstance().resolve(bb));
}},_applyTextAlign:function(a,b,name){var a=this._getValue(name);

if(!a){this._storeStyle(name,null);
}else{this._storeStyle(name,v+a);
}},_applyFont:function(bA,bB,name){var bA=this._getValue(name);

if(!bA){this._storeStyle(name,null);
}else{var bC=qx.theme.manager.Font.getInstance().resolve(bA);
this._storeStyle(name,qx.bom.element.Style.compile(bC.getStyles()));
}},_applyPadding:function(bt,bu,name){var bt=this._getValue(name);

if(this.__isThemed){var bw=this.__themePaddings;
}else{bw=this.__userPaddings;
}
if(bt===null){delete bw[name];
}else{bw[name]=bt;
}
if(bt===null){this._storeStyle(name,null);
}else{var bv=qx.lang.String.hyphenate(name);
this._storeStyle(name,bv+K+bt+Q);
}},getCellProperties:function(bj,bk){this.__setStates(bk);
return {classes:this.getCssClasses(bj,bk),style:this.getStyles(bj,bk),attributes:this.getAttributes(bj,bk),content:this.getContent(bj,bk),insets:this.getInsets(bj,bk)};
},getAttributes:function(bh,bi){return p;
},getContent:function(e,f){return e;
},getCssClasses:function(g,h){var j=this.__stylesheet.getCssClass(this.__statesKey)||p;
return w+j;
},__setStates:function(bR){if(!bR){bR={};
}var bT=this.getAppearance();
var bS=bT+k+qx.lang.Object.getKeys(bR).sort().join(G);

if(this.__statesKey==bS){return;
}this.__statesKey=bS;
var bU=this.__states[this.__statesKey];

if(!bU){this.__clearThemedPropertyValues();
this.__updateThemeableProperties(bR);
this.__computeCssClassForStates(bR);
this.__cacheThemedValues();
this.__states[this.__statesKey]=1;
}this.__applyThemeValues();
},__clearThemedPropertyValues:function(){var bI=qx.util.PropertyUtil;
var bJ=this._getCssProperties();

for(var i=0;i<bJ.length;i++){bI.deleteThemeValue(this,bJ[i]);
}},__updateThemeableProperties:function(bK){this.__themeStyles={};
this.__isThemed=true;
var bN=this.getAppearance();
var bM=qx.util.PropertyUtil;
var bL=qx.theme.manager.Appearance.getInstance().styleFrom(bN,bK);

for(var bO in bL){if(bL[bO]!==undefined){bM.setThemed(this,bO,bL[bO]);
}}this.__isThemed=false;
},__computeCssClassForStates:function(){var bl=qx.lang.Object.getValues(this.__themeStyles).join(l);
this.__stylesheet.computeClassForStyles(this.__statesKey,bl);
},__cacheThemedValues:function(){var bH=this.__themableProperties;
var bD=qx.util.PropertyUtil;
var bF={};

for(var i=0;i<bH.length;i++){var bG=bH[i];
var bE=bD.getThemeValue(this,bG);

if(bE!==undefined){bF[bG]=bE;
}}this.__themeValues[this.__statesKey]=bF;
},__applyThemeValues:function(){var be=qx.util.PropertyUtil;
var bd=this.__themeValues[this.__statesKey]||{};

for(var bf in bd){be.setThemed(this,bf,bd[bf]);
}},getStyles:function(Y,ba){return qx.lang.Object.getValues(this.__userStyles).join(l);
},getInsets:function(bm,bn){var br=this.__userPaddings;
var bq=this.__themePaddings;
var top=(br.paddingTop!==undefined?br.paddingTop:bq.paddingTop)||0;
var bo=(br.paddingRight!==undefined?br.paddingRight:bq.paddingRight)||0;
var bp=(br.paddingBottom!==undefined?br.paddingBottom:bq.paddingBottom)||0;
var bs=(br.paddingLeft!==undefined?br.paddingLeft:bq.paddingLeft)||0;
return [bs+bo,top+bp];
}},destruct:function(){this.__stylesheet=this.__userStyles=this.__themeStyles=this.__userPaddings=this.__themePaddings=this.__states=this.__themeValues=this.__themableProperties=null;
}});
})();
(function(){var d="qx.util.format.DateFormat",c="cell-date",b="",a="qx.ui.virtual.cell.Date";
qx.Class.define(a,{extend:qx.ui.virtual.cell.Cell,construct:function(e){qx.ui.virtual.cell.Cell.call(this);

if(e){this.setDateFormat(e);
}else{this.initDateFormat(qx.util.format.DateFormat.getDateTimeInstance());
}},properties:{appearance:{refine:true,init:c},dateFormat:{check:d,deferredInit:true}},members:{getContent:function(f,g){return f?this.getDateFormat().format(f):b;
}}});
})();
(function(){var p=".qx-cell {",o="-",n="mshtml",m="qx.ui.virtual.cell.CellStylesheet",l="none",k="qx-cell-",j="default",i="ellipsis",h="}",g="hidden",c="} ",f=".",e="qx.client",b="content-box",a="singleton",d="absolute";
qx.Class.define(m,{extend:qx.core.Object,type:a,construct:function(){qx.core.Object.call(this);
var u=p+
qx.bom.element.Style.compile({position:d,overflow:g,cursor:j,textOverflow:i,userSelect:l})+c;

if(!qx.core.Variant.isSet(e,n)){u+=p+qx.bom.element.BoxSizing.compile(b)+h;
}this.__stylesheet=qx.bom.Stylesheet.createElement(u);
this.__classes={};
this.__styles={};
},members:{__stylesheet:null,__classes:null,__styles:null,getStylesheet:function(){return this.__stylesheet;
},getCssClass:function(t){return this.__classes[t]||null;
},computeClassForStyles:function(q,r){var s=this.__styles[r];

if(!s){var s=this.__getNextClassname();
qx.bom.Stylesheet.addRule(this.__stylesheet,f+s,r);
this.__styles[r]=s;
}this.__classes[q]=s;
return s;
},__getNextClassname:function(){return k+this.toHashCode()+o+(this.__classCounter++);
},__classCounter:0},destruct:function(){this.__stylesheet=this.__classes=this.__styles=null;
}});
})();
(function(){var d="$$theme_",c="$$user_",b="$$init_",a="qx.util.PropertyUtil";
qx.Class.define(a,{statics:{getProperties:function(g){return g.$$properties;
},getAllProperties:function(r){var u={};
var v=r;
while(v!=qx.core.Object){var t=this.getProperties(v);

for(var s in t){u[s]=t[s];
}v=v.superclass;
}return u;
},getUserValue:function(k,l){return k[c+l];
},setUserValue:function(w,x,y){w[c+x]=y;
},deleteUserValue:function(e,f){delete (e[c+f]);
},getInitValue:function(m,n){return m[b+n];
},setInitValue:function(o,p,q){o[b+p]=q;
},deleteInitValue:function(K,L){delete (K[b+L]);
},getThemeValue:function(z,A){return z[d+A];
},setThemeValue:function(h,i,j){h[d+i]=j;
},deleteThemeValue:function(E,F){delete (E[d+F]);
},setThemed:function(G,H,I){var J=qx.core.Property.$$method.setThemed;
G[J[H]](I);
},resetThemed:function(B,C){var D=qx.core.Property.$$method.resetThemed;
B[D[C]]();
}}});
})();
(function(){var i="mouseup",h="mousedown",g="losecapture",f="mouseover",e="mousemove",d="removeItem",c="keypress",b="addItem",a="qx.ui.virtual.selection.Abstract";
qx.Class.define(a,{extend:qx.ui.core.selection.Abstract,construct:function(j,k){qx.ui.core.selection.Abstract.call(this);
{};
this._pane=j;
this._delegate=k||{};
},members:{_isSelectable:function(x){return this._delegate.isItemSelectable?this._delegate.isItemSelectable(x):true;
},_styleSelectable:function(l,m,n){if(this._delegate.styleSelectable){this._delegate.styleSelectable(l,m,n);
}},attachMouseEvents:function(){var s=this._pane.getContainerElement();
s.addListener(h,this.handleMouseDown,this);
s.addListener(i,this.handleMouseUp,this);
s.addListener(f,this.handleMouseOver,this);
s.addListener(e,this.handleMouseMove,this);
s.addListener(g,this.handleLoseCapture,this);
},detatchMouseEvents:function(){var w=this._pane.getContainerElement();
w.removeListener(h,this.handleMouseDown,this);
w.removeListener(i,this.handleMouseUp,this);
w.removeListener(f,this.handleMouseOver,this);
w.removeListener(e,this.handleMouseMove,this);
w.removeListener(g,this.handleLoseCapture,this);
},attachKeyEvents:function(r){r.addListener(c,this.handleKeyPress,this);
},detachKeyEvents:function(u){u.removeListener(c,this.handleKeyPress,this);
},attachListEvents:function(v){v.addListener(b,this.handleAddItem,this);
v.addListener(d,this.handleRemoveItem,this);
},detachListEvents:function(q){q.removeListener(b,this.handleAddItem,this);
q.removeListener(d,this.handleRemoveItem,this);
},_capture:function(){this._pane.capture();
},_releaseCapture:function(){this._pane.releaseCapture();
},_getScroll:function(){return {left:this._pane.getScrollX(),top:this._pane.getScrollY()};
},_scrollBy:function(o,p){this._pane.setScrollX(this._pane.getScrollX()+o);
this._pane.setScrollY(this._pane.getScrollY()+p);
},_getLocation:function(){var t=this._pane.getContentElement().getDomElement();
return t?qx.bom.element.Location.get(t):null;
},_getDimension:function(){return this._pane.getInnerSize();
}},destruct:function(){this._pane=this._delegate=null;
}});
})();
(function(){var f="under",e="above",d="left",c="right",b="x",a="qx.ui.virtual.selection.CellRectangle";
qx.Class.define(a,{extend:qx.ui.virtual.selection.Abstract,members:{_getItemCount:function(){return this._pane.getRowConfig().getItemCount()*this._pane.getColumnConfig().getItemCount();
},_getSelectableFromMouseEvent:function(event){var r=this._pane.getCellAtPosition(event.getDocumentLeft(),event.getDocumentTop());

if(!r){return null;
}return this._isSelectable(r)?r:null;
},getSelectables:function(B){var D=[];
var G=this._pane.getRowConfig().getItemCount();
var C=this._pane.getColumnConfig().getItemCount();

for(var H=0;H<G;H++){for(var E=0;E<C;E++){var F={row:H,column:E};

if(this._isSelectable(F)){D.push(F);
}}}return D;
},_getSelectableRange:function(h,i){var l=[];
var m=Math.min(h.row,i.row);
var n=Math.max(h.row,i.row);
var k=Math.min(h.column,i.column);
var p=Math.max(h.column,i.column);

for(var q=m;q<=n;q++){for(var o=k;o<=p;o++){var j={row:q,column:o};

if(this._isSelectable(j)){l.push(j);
}}}return l;
},_getFirstSelectable:function(){var x=this._pane.getRowConfig().getItemCount();
var w=this._pane.getColumnConfig().getItemCount();

for(var A=0;A<x;A++){for(var z=0;z<w;z++){var y={row:A,column:z};

if(this._isSelectable(y)){return y;
}}}return null;
},_getLastSelectable:function(){var L=this._pane.getRowConfig().getItemCount();
var K=this._pane.getColumnConfig().getItemCount();

for(var N=K-1;N>=0;N--){for(var O=L-1;O>=0;O--){var M={row:O,column:N};

if(this._isSelectable(M)){return M;
}}}return null;
},_getRelatedSelectable:function(U,V){var W={row:U.row,column:U.column};

switch(V){case e:for(var bb=U.row-1;bb>=0;bb--){W.row=bb;

if(this._isSelectable(W)){return W;
}}break;
case f:var X=this._pane.getRowConfig().getItemCount();

for(var bb=U.row+1;bb<X;bb++){W.row=bb;

if(this._isSelectable(W)){return W;
}}break;
case d:for(var ba=U.column-1;ba>=0;ba--){W.column=ba;

if(this._isSelectable(W)){return W;
}}break;
case c:var Y=this._pane.getColumnConfig().getItemCount();

for(var ba=U.column+1;ba<Y;ba++){W.column=ba;

if(this._isSelectable(W)){return W;
}}break;
}return null;
},_getPage:function(I,J){if(J){return this._getFirstSelectable();
}else{return this._getLastSelectable();
}},_selectableToHashCode:function(T){return T.column+b+T.row;
},_scrollItemIntoView:function(g){this._pane.scrollCellIntoView(g.column,g.row);
},_getSelectableLocationX:function(P){var Q=this._pane.getColumnConfig();
var S=Q.getItemPosition(P.column);
var R=S+Q.getItemSize(P.column)-1;
return {left:S,right:R};
},_getSelectableLocationY:function(s){var v=this._pane.getRowConfig();
var u=v.getItemPosition(s.row);
var t=u+v.getItemSize(s.row)-1;
return {top:u,bottom:t};
}}});
})();
(function(){var n="",m="px;",l="' ",k="qx.ui.virtual.layer.HtmlCell",j="width:",i="top:",h=">",g="</div>",f="<div ",e="style='",b="height:",d="class='",c="left:",a="html";
qx.Class.define(k,{extend:qx.ui.virtual.layer.Abstract,construct:function(o){qx.ui.virtual.layer.Abstract.call(this);
this.setZIndex(2);
{};
this._cellProvider=o;
},members:{_getCellSizeStyle:function(D,E,F,G){var H=n;

if(qx.bom.client.Feature.CONTENT_BOX){D-=F;
E-=G;
}H+=j+D+m;
H+=b+E+m;
return H;
},_fullUpdate:function(p,q,r,s){var A=[];
var B=0;
var top=0;
var C=p;
var u=q;

for(var y=0;y<r.length;y++){var B=0;
var u=q;
var v=r[y];

for(var x=0;x<s.length;x++){var z=s[x];
var t=this._cellProvider.getCellProperties(C,u);
var w=t.insets||[0,0];
A.push(f,e,c,B,m,i,top,m,this._getCellSizeStyle(z,v,w[0],w[1]),t.style||n,l,d,t.classes||n,l,t.attributes||n,h,t.content||n,g);
u++;
B+=z;
}top+=v;
C++;
}this.getContentElement().setAttribute(a,A.join(n));
}},destruct:function(){this._cellProvider=null;
}});
})();
(function(){var u="px;",t="</div>",s="background-color:",r="horizontal",q="position: absolute;",p="<div style='",o="'>",n="top:",m="",l="height: ",e="gray",k="width: 100%;",h="width: ",d="height: 100%;",c="qx.ui.virtual.layer.GridLines",g="left:",f="html",i="Color",b="PositiveInteger",j="top: 0px;";
qx.Class.define(c,{extend:qx.ui.virtual.layer.Abstract,construct:function(z,A,B){qx.ui.virtual.layer.Abstract.call(this);
this.setZIndex(1);

if(A){this.setDefaultLineColor(A);
}
if(B!==undefined){this.setDefaultLineSize(B);
}this.__lineColors=[];
this.__lineSizes=[];
this._isHorizontal=(z||r)==r;
},properties:{defaultLineColor:{init:e,check:i,themeable:true},defaultLineSize:{init:1,check:b,themeable:true}},members:{__lineColors:null,__lineSizes:null,isHorizontal:function(){return this._isHorizontal;
},setLineColor:function(ba,bb){{};
this.__lineColors[ba]=bb;

if(this.__isLineRendered(ba)){this.updateLayerData();
}},setLineSize:function(v,w){{};
this.__lineSizes[v]=w;

if(this.__isLineRendered(v)){this.updateLayerData();
}},__isLineRendered:function(U){if(this._isHorizontal){var Y=this.getFirstColumn();
var W=Y+this.getColumnSizes().length-1;
return U>=Y&&U<=W;
}else{var X=this.getFirstRow();
var V=X+this.getRowSizes().length-1;
return U>=X&&U<=V;
}},getLineSize:function(T){return this.__lineSizes[T]||this.getDefaultLineSize();
},getLineColor:function(a){return this.__lineColors[a]||this.getDefaultLineColor();
},__renderHorizontalLines:function(bc,bd,be){var top=0;
var bf,bg;

for(var y=0;y<be.length-1;y++){bf=this.getLineColor(bd+y);
bg=this.getLineSize(bd+y);
top+=be[y];
bc.push(p,q,l+bg+u,k,n,top-((bg>1)?Math.floor(bg/2):1),u,s,bf,o,t);
}},__renderVerticalLines:function(H,I,J){var M=0;
var K,L;

for(var x=0;x<J.length-1;x++){K=this.getLineColor(I+x);
L=this.getLineSize(I+x);
M+=J[x];
H.push(p,q,h+L+u,d,j,g,M-((L>1)?Math.floor(L/2):1),u,s,K,o,t);
}},_fullUpdate:function(C,D,E,F){var G=[];

if(this._isHorizontal){this.__renderHorizontalLines(G,C,E);
}else{this.__renderVerticalLines(G,D,F);
}this.getContentElement().setAttribute(f,G.join(m));
},_updateLayerWindow:function(N,O,P,Q){var R=N!==this.getFirstRow()||P.length!==this.getRowSizes().length;
var S=O!==this.getFirstColumn()||Q.length!==this.getColumnSizes().length;

if((this._isHorizontal&&R)||(!this._isHorizontal&&S)){this._fullUpdate(N,O,P,Q);
}}},destruct:function(){this.__lineColors=this.__lineSizes=null;
}});
})();
(function(){var j="#CCCCCC",i="#F3F3F3",h="#E4E4E4",g="#1a1a1a",f="#084FAB",e="gray",d="#fffefe",c="white",b="#4a4a4a",a="#EEEEEE",K="#80B4EF",J="#C72B2B",I="#ffffdd",H="#334866",G="#00204D",F="#666666",E="#CBC8CD",D="#99C3FE",C="#808080",B="#F4F4F4",q="#001533",r="#909090",o="#FCFCFC",p="#314a6e",m="#B6B6B6",n="#0880EF",k="#4d4d4d",l="#DFDFDF",s="#000000",t="#FF9999",w="#7B7A7E",v="#26364D",y="#990000",x="#AFAFAF",A="#404955",z="#AAAAAA",u="qx.theme.modern.Color";
qx.Theme.define(u,{colors:{"background-application":l,"background-pane":i,"background-light":o,"background-medium":a,"background-splitpane":x,"background-tip":I,"background-tip-error":J,"background-odd":h,"text-light":r,"text-gray":b,"text-label":g,"text-title":p,"text-input":s,"text-hovered":q,"text-disabled":w,"text-selected":d,"text-active":v,"text-inactive":A,"text-placeholder":E,"border-main":k,"border-separator":C,"border-input":H,"border-disabled":m,"border-pane":G,"border-button":F,"border-column":j,"border-focused":D,"invalid":y,"border-focused-invalid":t,"table-pane":i,"table-focus-indicator":n,"table-row-background-focused-selected":f,"table-row-background-focused":K,"table-row-background-selected":f,"table-row-background-even":i,"table-row-background-odd":h,"table-row-selected":d,"table-row":g,"table-row-line":j,"table-column-line":j,"progressive-table-header":z,"progressive-table-row-background-even":B,"progressive-table-row-background-odd":h,"progressive-progressbar-background":e,"progressive-progressbar-indicator-done":j,"progressive-progressbar-indicator-undone":c,"progressive-progressbar-percent-background":e,"progressive-progressbar-percent-text":c}});
})();
(function(){var f="#FFCCCC",e="#CCCCCC",d="#EEEEEE",c="#999999",b="logbuch.theme.Color",a="#AAAAAA";
qx.Theme.define(b,{extend:qx.theme.modern.Color,colors:{"background-application":c,"logbuch-background-calendar":e,"logbuch-background-calendar-current-date":d,"logbuch-background-calendar-selected":a,"logbuch-background-calendar-weekend":f}});
})();
(function(){var i="Number",h="_applyInsets",g="abstract",f="insetRight",e="insetTop",d="insetBottom",c="qx.ui.decoration.Abstract",b="shorthand",a="insetLeft";
qx.Class.define(c,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:g,properties:{insetLeft:{check:i,nullable:true,apply:h},insetRight:{check:i,nullable:true,apply:h},insetBottom:{check:i,nullable:true,apply:h},insetTop:{check:i,nullable:true,apply:h},insets:{group:[e,f,d,a],mode:b}},members:{__insets:null,_getDefaultInsets:function(){throw new Error("Abstract method called.");
},_isInitialized:function(){throw new Error("Abstract method called.");
},_resetInsets:function(){this.__insets=null;
},getInsets:function(){if(this.__insets){return this.__insets;
}var j=this._getDefaultInsets();
return this.__insets={left:this.getInsetLeft()==null?j.left:this.getInsetLeft(),right:this.getInsetRight()==null?j.right:this.getInsetRight(),bottom:this.getInsetBottom()==null?j.bottom:this.getInsetBottom(),top:this.getInsetTop()==null?j.top:this.getInsetTop()};
},_applyInsets:function(){{};
this.__insets=null;
}},destruct:function(){this.__insets=null;
}});
})();
(function(){var q="_applyBackground",p="repeat",o="mshtml",n="backgroundPositionX",m="",l="backgroundPositionY",k="no-repeat",j="scale",i=" ",h="repeat-x",c="qx.client",g="repeat-y",f="hidden",b="qx.ui.decoration.MBackgroundImage",a="String",e='"></div>',d='<div style="';
qx.Mixin.define(b,{properties:{backgroundImage:{check:a,nullable:true,apply:q},backgroundRepeat:{check:[p,h,g,k,j],init:p,apply:q},backgroundPositionX:{nullable:true,apply:q},backgroundPositionY:{nullable:true,apply:q},backgroundPosition:{group:[l,n]}},members:{_generateBackgroundMarkup:function(r){var v=m;
var u=this.getBackgroundImage();
var t=this.getBackgroundRepeat();
var top=this.getBackgroundPositionY();

if(top==null){top=0;
}var w=this.getBackgroundPositionX();

if(w==null){w=0;
}r.backgroundPosition=w+i+top;
if(u){var s=qx.util.AliasManager.getInstance().resolve(u);
v=qx.bom.element.Decoration.create(s,t,r);
}else{if(r){if(qx.core.Variant.isSet(c,o)){if(qx.bom.client.Engine.VERSION<7||qx.bom.client.Feature.QUIRKS_MODE){r.overflow=f;
}}v=d+qx.bom.element.Style.compile(r)+e;
}}return v;
},_applyBackground:function(){{};
}}});
})();
(function(){var o="_applyStyle",n="",m="Color",l="px",k="solid",j="dotted",i="double",h="dashed",g="_applyWidth",f="qx.ui.decoration.Uniform",c="px ",e=" ",d="scale",b="PositiveInteger",a="absolute";
qx.Class.define(f,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(C,D,E){qx.ui.decoration.Abstract.call(this);
if(C!=null){this.setWidth(C);
}
if(D!=null){this.setStyle(D);
}
if(E!=null){this.setColor(E);
}},properties:{width:{check:b,init:0,apply:g},style:{nullable:true,check:[k,j,h,i],init:k,apply:o},color:{nullable:true,check:m,apply:o},backgroundColor:{check:m,nullable:true,apply:o}},members:{__markup:null,_getDefaultInsets:function(){var y=this.getWidth();
return {top:y,right:y,bottom:y,left:y};
},_isInitialized:function(){return !!this.__markup;
},getMarkup:function(){if(this.__markup){return this.__markup;
}var p={position:a,top:0,left:0};
var q=this.getWidth();
{};
var s=qx.theme.manager.Color.getInstance();
p.border=q+c+this.getStyle()+e+(s.resolve(this.getColor())||n);
var r=this._generateBackgroundMarkup(p);
return this.__markup=r;
},resize:function(t,u,v){var x=this.getBackgroundImage()&&this.getBackgroundRepeat()==d;

if(x||qx.bom.client.Feature.CONTENT_BOX){var w=this.getWidth()*2;
u-=w;
v-=w;
if(u<0){u=0;
}
if(v<0){v=0;
}}t.style.width=u+l;
t.style.height=v+l;
},tint:function(z,A){var B=qx.theme.manager.Color.getInstance();

if(A==null){A=this.getBackgroundColor();
}z.style.backgroundColor=B.resolve(A)||n;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this.__markup=null;
}});
})();
(function(){var f="px",e="qx.ui.decoration.Background",d="",c="_applyStyle",b="Color",a="absolute";
qx.Class.define(e,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(o){qx.ui.decoration.Abstract.call(this);

if(o!=null){this.setBackgroundColor(o);
}},properties:{backgroundColor:{check:b,nullable:true,apply:c}},members:{__markup:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__markup;
},getMarkup:function(){if(this.__markup){return this.__markup;
}var g={position:a,top:0,left:0};
var h=this._generateBackgroundMarkup(g);
return this.__markup=h;
},resize:function(l,m,n){l.style.width=m+f;
l.style.height=n+f;
},tint:function(i,j){var k=qx.theme.manager.Color.getInstance();

if(j==null){j=this.getBackgroundColor();
}i.style.backgroundColor=k.resolve(j)||d;
},_applyStyle:function(){{};
}},destruct:function(){this.__markup=null;
}});
})();
(function(){var j="_applyStyle",i="solid",h="Color",g="",f="double",e="px ",d="dotted",c="_applyWidth",b="dashed",a="Number",F=" ",E="shorthand",D="px",C="widthTop",B="styleRight",A="styleLeft",z="widthLeft",y="widthBottom",x="styleTop",w="colorBottom",q="styleBottom",r="widthRight",o="colorLeft",p="colorRight",m="colorTop",n="scale",k="border-top",l="border-left",s="border-right",t="qx.ui.decoration.Single",v="border-bottom",u="absolute";
qx.Class.define(t,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(O,P,Q){qx.ui.decoration.Abstract.call(this);
if(O!=null){this.setWidth(O);
}
if(P!=null){this.setStyle(P);
}
if(Q!=null){this.setColor(Q);
}},properties:{widthTop:{check:a,init:0,apply:c},widthRight:{check:a,init:0,apply:c},widthBottom:{check:a,init:0,apply:c},widthLeft:{check:a,init:0,apply:c},styleTop:{nullable:true,check:[i,d,b,f],init:i,apply:j},styleRight:{nullable:true,check:[i,d,b,f],init:i,apply:j},styleBottom:{nullable:true,check:[i,d,b,f],init:i,apply:j},styleLeft:{nullable:true,check:[i,d,b,f],init:i,apply:j},colorTop:{nullable:true,check:h,apply:j},colorRight:{nullable:true,check:h,apply:j},colorBottom:{nullable:true,check:h,apply:j},colorLeft:{nullable:true,check:h,apply:j},backgroundColor:{check:h,nullable:true,apply:j},left:{group:[z,A,o]},right:{group:[r,B,p]},top:{group:[C,x,m]},bottom:{group:[y,q,w]},width:{group:[C,r,y,z],mode:E},style:{group:[x,B,q,A],mode:E},color:{group:[m,p,w,o],mode:E}},members:{__markup:null,_getDefaultInsets:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};
},_isInitialized:function(){return !!this.__markup;
},getMarkup:function(R){if(this.__markup){return this.__markup;
}var S=qx.theme.manager.Color.getInstance();
var T={};
var V=this.getWidthTop();

if(V>0){T[k]=V+e+this.getStyleTop()+F+(S.resolve(this.getColorTop())||g);
}var V=this.getWidthRight();

if(V>0){T[s]=V+e+this.getStyleRight()+F+(S.resolve(this.getColorRight())||g);
}var V=this.getWidthBottom();

if(V>0){T[v]=V+e+this.getStyleBottom()+F+(S.resolve(this.getColorBottom())||g);
}var V=this.getWidthLeft();

if(V>0){T[l]=V+e+this.getStyleLeft()+F+(S.resolve(this.getColorLeft())||g);
}{};
T.position=u;
T.top=0;
T.left=0;
var U=this._generateBackgroundMarkup(T);
return this.__markup=U;
},resize:function(G,H,I){var K=this.getBackgroundImage()&&this.getBackgroundRepeat()==n;

if(K||qx.bom.client.Feature.CONTENT_BOX){var J=this.getInsets();
H-=J.left+J.right;
I-=J.top+J.bottom;
if(H<0){H=0;
}
if(I<0){I=0;
}}G.style.width=H+D;
G.style.height=I+D;
},tint:function(L,M){var N=qx.theme.manager.Color.getInstance();

if(M==null){M=this.getBackgroundColor();
}L.style.backgroundColor=N.resolve(M)||g;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this.__markup=null;
}});
})();
(function(){var m="Number",l="_applyInsets",k="-l",j="insetRight",i="insetTop",h="_applyBaseImage",g="insetBottom",f="set",e="shorthand",d="-t",a="insetLeft",c="String",b="qx.ui.decoration.Grid";
qx.Class.define(b,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],construct:function(n,o){qx.core.Object.call(this);

if(qx.ui.decoration.css3.BorderImage.IS_SUPPORTED){this.__impl=new qx.ui.decoration.css3.BorderImage();

if(n){this.__setBorderImage(n);
}}else{this.__impl=new qx.ui.decoration.GridDiv(n);
}
if(o!=null){this.__impl.setInsets(o);
}},properties:{baseImage:{check:c,nullable:true,apply:h},insetLeft:{check:m,nullable:true,apply:l},insetRight:{check:m,nullable:true,apply:l},insetBottom:{check:m,nullable:true,apply:l},insetTop:{check:m,nullable:true,apply:l},insets:{group:[i,j,g,a],mode:e}},members:{__impl:null,getMarkup:function(){return this.__impl.getMarkup();
},resize:function(u,v,w){this.__impl.resize(u,v,w);
},tint:function(p,q){},getInsets:function(){return this.__impl.getInsets();
},_applyInsets:function(r,s,name){var t=f+qx.lang.String.firstUp(name);
this.__impl[t](r);
},_applyBaseImage:function(F,G){if(this.__impl instanceof qx.ui.decoration.GridDiv){this.__impl.setBaseImage(F);
}else{this.__setBorderImage(F);
}},__setBorderImage:function(x){this.__impl.setBorderImage(x);
var B=qx.util.AliasManager.getInstance().resolve(x);
var C=/(.*)(\.[a-z]+)$/.exec(B);
var z=C[1];
var A=C[2];
var y=qx.util.ResourceManager.getInstance();
var D=y.getImageHeight(z+d+A);
var E=y.getImageWidth(z+k+A);
this.__impl.setSlice([D,E]);
}},destruct:function(){this.__impl=null;
}});
})();
(function(){var j="_applyStyle",i='"></div>',h="Color",g="1px",f='<div style="',e='border:',d="1px solid ",c="",b=";",a="px",v='</div>',u="qx.ui.decoration.Beveled",t='<div style="position:absolute;top:1px;left:1px;',s='border-bottom:',r='border-right:',q='border-left:',p='border-top:',o="Number",n='<div style="position:absolute;top:1px;left:0px;',m='position:absolute;top:0px;left:1px;',k='<div style="overflow:hidden;font-size:0;line-height:0;">',l="absolute";
qx.Class.define(u,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(B,C,D){qx.ui.decoration.Abstract.call(this);
if(B!=null){this.setOuterColor(B);
}
if(C!=null){this.setInnerColor(C);
}
if(D!=null){this.setInnerOpacity(D);
}},properties:{innerColor:{check:h,nullable:true,apply:j},innerOpacity:{check:o,init:1,apply:j},outerColor:{check:h,nullable:true,apply:j},backgroundColor:{check:h,nullable:true,apply:j}},members:{__markup:null,_getDefaultInsets:function(){return {top:2,right:2,bottom:2,left:2};
},_isInitialized:function(){return !!this.__markup;
},_applyStyle:function(){{};
},getMarkup:function(){if(this.__markup){return this.__markup;
}var w=qx.theme.manager.Color.getInstance();
var x=[];
var A=d+w.resolve(this.getOuterColor())+b;
var z=d+w.resolve(this.getInnerColor())+b;
x.push(k);
x.push(f);
x.push(e,A);
x.push(qx.bom.element.Opacity.compile(0.35));
x.push(i);
x.push(n);
x.push(q,A);
x.push(r,A);
x.push(i);
x.push(f);
x.push(m);
x.push(p,A);
x.push(s,A);
x.push(i);
var y={position:l,top:g,left:g};
x.push(this._generateBackgroundMarkup(y));
x.push(t);
x.push(e,z);
x.push(qx.bom.element.Opacity.compile(this.getInnerOpacity()));
x.push(i);
x.push(v);
return this.__markup=x.join(c);
},resize:function(E,F,G){if(F<4){F=4;
}
if(G<4){G=4;
}if(qx.bom.client.Feature.CONTENT_BOX){var outerWidth=F-2;
var outerHeight=G-2;
var M=outerWidth;
var L=outerHeight;
var innerWidth=F-4;
var innerHeight=G-4;
}else{var outerWidth=F;
var outerHeight=G;
var M=F-2;
var L=G-2;
var innerWidth=M;
var innerHeight=L;
}var O=a;
var K=E.childNodes[0].style;
K.width=outerWidth+O;
K.height=outerHeight+O;
var J=E.childNodes[1].style;
J.width=outerWidth+O;
J.height=L+O;
var I=E.childNodes[2].style;
I.width=M+O;
I.height=outerHeight+O;
var H=E.childNodes[3].style;
H.width=M+O;
H.height=L+O;
var N=E.childNodes[4].style;
N.width=innerWidth+O;
N.height=innerHeight+O;
},tint:function(P,Q){var R=qx.theme.manager.Color.getInstance();

if(Q==null){Q=this.getBackgroundColor();
}P.childNodes[3].style.backgroundColor=R.resolve(Q)||c;
}},destruct:function(){this.__markup=null;
}});
})();
(function(){var m="solid",l="scale",k="border-main",j="white",i="repeat-x",h="border-separator",g="background-light",f="invalid",e="border-focused-invalid",d="border-disabled",bs="decoration/table/header-cell.png",br="decoration/form/input.png",bq="#f8f8f8",bp="decoration/scrollbar/scrollbar-button-bg-horizontal.png",bo="#b6b6b6",bn="background-pane",bm="repeat-y",bl="decoration/form/input-focused.png",bk="#33508D",bj="decoration/selection.png",t="border-input",u="decoration/scrollbar/scrollbar-button-bg-vertical.png",r="decoration/tabview/tab-button-top-active.png",s="black",p="decoration/form/button-c.png",q="decoration/scrollbar/scrollbar-bg-vertical.png",n="decoration/form/button.png",o="decoration/form/button-checked.png",B="decoration/tabview/tab-button-left-inactive.png",C="decoration/groupbox/groupbox.png",O="#FAFAFA",K="decoration/pane/pane.png",W="dotted",R="decoration/toolbar/toolbar-part.gif",bf="decoration/tabview/tab-button-top-inactive.png",bc="decoration/menu/bar-background.png",G="center",bi="decoration/tabview/tab-button-bottom-active.png",bh="decoration/form/button-hovered.png",bg="decoration/form/tooltip-error-arrow.png",F="decoration/window/captionbar-inactive.png",I="qx/decoration/Modern",J="decoration/menu/background.png",M="decoration/window/statusbar.png",P="border-focused",S="table-focus-indicator",Y="#F2F2F2",be="decoration/form/button-checked-c.png",v="decoration/scrollbar/scrollbar-bg-horizontal.png",w="qx.theme.modern.Decoration",H="#f4f4f4",V="decoration/shadow/shadow-small.png",U="decoration/app-header.png",T="decoration/tabview/tabview-pane.png",bb="decoration/form/tooltip-error.png",ba="decoration/form/button-focused.png",Q="decoration/tabview/tab-button-bottom-inactive.png",X="decoration/form/button-disabled.png",a="decoration/tabview/tab-button-right-active.png",bd="decoration/form/button-pressed.png",x="no-repeat",y="decoration/window/captionbar-active.png",L="decoration/tabview/tab-button-left-active.png",b="background-splitpane",c="decoration/form/button-checked-focused.png",E="#C5C5C5",z="decoration/toolbar/toolbar-gradient.png",A="decoration/tabview/tab-button-right-inactive.png",D="#b8b8b8",N="decoration/shadow/shadow.png";
qx.Theme.define(w,{aliases:{decoration:I},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:k}},"selected":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bj,backgroundRepeat:l}},"selected-dragover":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bj,backgroundRepeat:l,bottom:[2,m,bk]}},"dragover":{decorator:qx.ui.decoration.Single,style:{bottom:[2,m,bk]}},"pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:K,insets:[0,2,3,0]}},"group":{decorator:qx.ui.decoration.Grid,style:{baseImage:C}},"border-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"keyboard-focus":{decorator:qx.ui.decoration.Single,style:{width:1,color:s,style:W}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:h}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:h}},"tooltip-error":{decorator:qx.ui.decoration.Grid,style:{baseImage:bb,insets:[2,5,5,2]}},"tooltip-error-arrow":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bg,backgroundPositionY:G,backgroundRepeat:x,insets:[0,0,0,10]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:N,insets:[4,8,8,4]}},"shadow-popup":{decorator:qx.ui.decoration.Grid,style:{baseImage:V,insets:[0,3,3,0]}},"scrollbar-horizontal":{decorator:qx.ui.decoration.Background,style:{backgroundImage:v,backgroundRepeat:i}},"scrollbar-vertical":{decorator:qx.ui.decoration.Background,style:{backgroundImage:q,backgroundRepeat:bm}},"scrollbar-slider-horizontal":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bp,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-horizontal-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bp,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"scrollbar-slider-vertical":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:u,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-vertical-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:u,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"button":{decorator:qx.ui.decoration.Grid,style:{baseImage:n,insets:2}},"button-disabled":{decorator:qx.ui.decoration.Grid,style:{baseImage:X,insets:2}},"button-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:ba,insets:2}},"button-hovered":{decorator:qx.ui.decoration.Grid,style:{baseImage:bh,insets:2}},"button-pressed":{decorator:qx.ui.decoration.Grid,style:{baseImage:bd,insets:2}},"button-checked":{decorator:qx.ui.decoration.Grid,style:{baseImage:o,insets:2}},"button-checked-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:c,insets:2}},"button-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[1]}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[0]}},"input":{decorator:qx.ui.decoration.Beveled,style:{outerColor:t,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"input-focused":{decorator:qx.ui.decoration.Beveled,style:{outerColor:t,innerColor:P,backgroundImage:bl,backgroundRepeat:i,backgroundColor:g}},"input-focused-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,backgroundImage:bl,backgroundRepeat:i,backgroundColor:g,insets:[2]}},"input-disabled":{decorator:qx.ui.decoration.Beveled,style:{outerColor:d,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"toolbar":{decorator:qx.ui.decoration.Background,style:{backgroundImage:z,backgroundRepeat:l}},"toolbar-button-hovered":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bo,innerColor:bq,backgroundImage:p,backgroundRepeat:l}},"toolbar-button-checked":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bo,innerColor:bq,backgroundImage:be,backgroundRepeat:l}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,widthRight:1,colorLeft:D,colorRight:H,styleLeft:m,styleRight:m}},"toolbar-part":{decorator:qx.ui.decoration.Background,style:{backgroundImage:R,backgroundRepeat:bm}},"tabview-pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:T,insets:[4,6,7,4]}},"tabview-page-button-top-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:r}},"tabview-page-button-top-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:bf}},"tabview-page-button-bottom-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:bi}},"tabview-page-button-bottom-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:Q}},"tabview-page-button-left-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:L}},"tabview-page-button-left-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:B}},"tabview-page-button-right-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:a}},"tabview-page-button-right-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:A}},"splitpane":{decorator:qx.ui.decoration.Uniform,style:{backgroundColor:bn,width:3,color:b,style:m}},"window":{decorator:qx.ui.decoration.Single,style:{backgroundColor:bn,width:1,color:k,widthTop:0}},"window-captionbar-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:y}},"window-captionbar-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:F}},"window-statusbar":{decorator:qx.ui.decoration.Grid,style:{baseImage:M}},"table":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:k,style:m}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m,widthBottom:1,colorBottom:j,styleBottom:m}},"table-column-button":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:S,style:m}},"progressive-table-header":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"progressive-table-header-cell":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthRight:1,colorRight:Y,style:m}},"menu":{decorator:qx.ui.decoration.Single,style:{backgroundImage:J,backgroundRepeat:l,width:1,color:k,style:m}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:E,widthBottom:1,colorBottom:O}},"menubar":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bc,backgroundRepeat:l,width:1,color:h,style:m}},"app-header":{decorator:qx.ui.decoration.Background,style:{backgroundImage:U,backgroundRepeat:l}}}});
})();
(function(){var d="white",c="resource/logbuch/image/logbuch-header.png",b="solid",a="logbuch.theme.Decoration";
qx.Theme.define(a,{extend:qx.theme.modern.Decoration,decorations:{"logbuch-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:c,bottom:[3,b,d]}},"logbuch-label-box":{decorator:qx.ui.decoration.Single,style:{width:1,color:d}}}});
})();
(function(){var n="Liberation Sans",m="Arial",l="Lucida Grande",k="sans-serif",j="Tahoma",i="Candara",h="Segoe UI",g="Consolas",f="Courier New",e="Monaco",b="monospace",d="Lucida Console",c="qx.theme.modern.Font",a="DejaVu Sans Mono";
qx.Theme.define(c,{fonts:{"default":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k]},"bold":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k],bold:true},"small":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?11:10,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k]},"monospace":{size:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[d,e]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[g]:[g,a,f,b]}}});
})();
(function(){var h="Liberation Sans",g="Lucida Grande",f="sans-serif",e="Tahoma",d="Candara",c="Segoe UI",b="Arial",a="logbuch.theme.Font";
qx.Theme.define(a,{extend:qx.theme.modern.Font,fonts:{"title-application":{size:25,family:qx.bom.client.Platform.MAC?[g]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[c,d]:[e,h,b,f],bold:true},"title-project":{size:16,family:qx.bom.client.Platform.MAC?[g]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[c,d]:[e,h,b,f],bold:true},"logbuch-category":{size:12,family:qx.bom.client.Platform.MAC?[g]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[c,d]:[e,h,b,f],bold:true},"logbuch-label-box":{size:12,family:qx.bom.client.Platform.MAC?[g]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[c,d]:[e,h,b,f],bold:true}}});
})();
(function(){var c="Tango",b="qx/icon/Tango",a="qx.theme.icon.Tango";
qx.Theme.define(a,{title:c,aliases:{"icon":b},icons:{}});
})();
(function(){var go="button-frame",gn="atom",gm="widget",gl="main",gk="button",gj="text-selected",gi="image",gh="bold",gg="middle",gf="background-light",eS="text-disabled",eR="groupbox",eQ="decoration/arrows/down.png",eP="cell",eO="selected",eN="border-invalid",eM="input",eL="input-disabled",eK="menu-button",eJ="input-focused-invalid",gv="toolbar-button",gw="spinner",gt="input-focused",gu="popup",gr="tooltip",gs="label",gp="list",gq="white",gx="tree-item",gy="treevirtual-contract",fN="scrollbar",fM="datechooser/nav-button",fP="text-hovered",fO="center",fR="treevirtual-expand",fQ="textfield",fT="decoration/arrows/right.png",fS="background-application",fL="radiobutton",fK="invalid",cO="combobox",cP="right-top",cQ="checkbox",cR="text-title",cS="qx/static/blank.gif",cT="scrollbar/button",cU="right",cV="combobox/button",cW="icon/16/places/folder.png",cX="text-label",gM="decoration/tree/closed.png",gL="scrollbar-slider-horizontal",gK="decoration/arrows/left.png",gJ="button-focused",gQ="text-light",gP="menu-slidebar-button",gO="text-input",gN="slidebar/button-forward",gS="background-splitpane",gR=".png",dR="decoration/tree/open.png",dS="default",dP="decoration/arrows/down-small.png",dQ="datechooser",dV="slidebar/button-backward",dW="selectbox",dT="treevirtual-folder",dU="shadow-popup",dN="icon/16/mimetypes/office-document.png",dO="background-medium",dt="table",ds="decoration/arrows/up.png",dv="decoration/form/",du="",dp="-invalid",dn="icon/16/places/folder-open.png",dr="button-checked",dq="decoration/window/maximize-active-hovered.png",dm="radiobutton-hovered",dl="keyboard-focus",ed="decoration/cursors/",ee="slidebar",ef="tooltip-error-arrow",eg="table-scroller-focus-indicator",dY="move-frame",ea="nodrop",eb="decoration/table/boolean-true.png",ec="table-header-cell",eh="menu",ei="app-header",dG="row-layer",dF="text-inactive",dE="move",dD="radiobutton-checked-focused",dC="decoration/window/restore-active-hovered.png",dB="shadow-window",dA="table-column-button",dz="right.png",dK="tabview-page-button-bottom-inactive",dJ="tooltip-error",ej="window-statusbar",ek="button-hovered",el="decoration/scrollbar/scrollbar-",em="background-tip",en="scrollbar-slider-horizontal-disabled",eo="table-scroller-header",ep="button-pressed",eq="table-pane",er="decoration/window/close-active.png",es="native",fb="checkbox-hovered",fa="button-invalid-shadow",eY="checkbox-checked",eX="decoration/window/minimize-active-hovered.png",ff="menubar",fe="icon/16/actions/dialog-cancel.png",fd="tabview-page-button-top-inactive",fc="tabview-page-button-left-inactive",fj="menu-slidebar",fi="toolbar-button-checked",fG="decoration/tree/open-selected.png",fH="radiobutton-checked",fE="decoration/window/minimize-inactive.png",fF="icon/16/apps/office-calendar.png",fC="group",fD="tabview-page-button-right-inactive",fA="decoration/window/minimize-active.png",fB="decoration/window/restore-inactive.png",fI="checkbox-checked-focused",fJ="splitpane",fX="combobox/textfield",fW="button-preselected-focused",ga="decoration/window/close-active-hovered.png",fY="qx/icon/Tango/16/actions/window-close.png",gc="checkbox-pressed",gb="button-disabled",ge="selected-dragover",gd="border-separator",fV="decoration/window/maximize-inactive.png",fU="dragover",gF="scrollarea",gG="scrollbar-vertical",gH="decoration/menu/checkbox-invert.gif",gI="decoration/toolbar/toolbar-handle-knob.gif",gB="icon/22/mimetypes/office-document.png",gC="button-preselected",gD="button-checked-focused",gE="up.png",gz="best-fit",gA="decoration/tree/closed-selected.png",cN="qx.theme.modern.Appearance",cM="text-active",cL="toolbar-button-hovered",cK="progressive-table-header",cJ="decoration/table/select-column-order.png",cI="decoration/menu/radiobutton.gif",cH="decoration/arrows/forward.png",cG="decoration/table/descending.png",cF="window-captionbar-active",cE="checkbox-checked-hovered",db="scrollbar-slider-vertical",dc="toolbar",cY="alias",da="decoration/window/restore-active.png",df="decoration/table/boolean-false.png",dg="checkbox-checked-disabled",dd="icon/32/mimetypes/office-document.png",de="radiobutton-checked-disabled",di="tabview-pane",dj="decoration/arrows/rewind.png",fn="checkbox-focused",fh="top",fu="icon/16/actions/dialog-ok.png",fq="radiobutton-checked-hovered",eV="table-header-cell-hovered",eT="window",dx="text-gray",eW="decoration/menu/radiobutton-invert.gif",dI="text-placeholder",dH="slider",eB="keep-align",eC="down.png",eD="tabview-page-button-top-active",eE="icon/32/places/folder-open.png",eF="icon/22/places/folder.png",eG="decoration/window/maximize-active.png",eH="checkbox-checked-pressed",eI="decoration/window/close-inactive.png",ez="tabview-page-button-left-active",eA="toolbar-part",eU="decoration/splitpane/knob-vertical.png",ft=".gif",fs="icon/22/places/folder-open.png",fr="radiobutton-checked-pressed",fy="table-statusbar",fx="radiobutton-pressed",fw="window-captionbar-inactive",fv="copy",fp="radiobutton-focused",fo="decoration/arrows/down-invert.png",dh="decoration/menu/checkbox.gif",dM="decoration/splitpane/knob-horizontal.png",dL="icon/32/places/folder.png",fg="toolbar-separator",dX="tabview-page-button-bottom-active",fm="decoration/arrows/up-small.png",fl="decoration/table/ascending.png",fk="decoration/arrows/up-invert.png",dw="small",fz="tabview-page-button-right-active",dk="-disabled",dy="scrollbar-horizontal",et="progressive-table-header-cell",eu="menu-separator",ev="pane",ew="decoration/arrows/right-invert.png",ex="left.png",ey="icon/16/actions/view-refresh.png";
qx.Theme.define(cN,{appearances:{"widget":{},"root":{style:function(H){return {backgroundColor:fS,textColor:cX,font:dS};
}},"label":{style:function(hq){return {textColor:hq.disabled?eS:undefined};
}},"move-frame":{style:function(a){return {decorator:gl};
}},"resize-frame":dY,"dragdrop-cursor":{style:function(ho){var hp=ea;

if(ho.copy){hp=fv;
}else if(ho.move){hp=dE;
}else if(ho.alias){hp=cY;
}return {source:ed+hp+ft,position:cP,offset:[2,16,2,6]};
}},"image":{style:function(hP){return {opacity:!hP.replacement&&hP.disabled?0.3:1};
}},"atom":{},"atom/label":gs,"atom/icon":gi,"popup":{style:function(bG){return {decorator:gl,backgroundColor:gf,shadow:dU};
}},"button-frame":{alias:gn,style:function(hw){var hy,hx;

if(hw.checked&&hw.focused&&!hw.inner){hy=gD;
hx=undefined;
}else if(hw.disabled){hy=gb;
hx=undefined;
}else if(hw.pressed){hy=ep;
hx=fP;
}else if(hw.checked){hy=dr;
hx=undefined;
}else if(hw.hovered){hy=ek;
hx=fP;
}else if(hw.preselected&&hw.focused&&!hw.inner){hy=fW;
hx=fP;
}else if(hw.preselected){hy=gC;
hx=fP;
}else if(hw.focused&&!hw.inner){hy=gJ;
hx=undefined;
}else{hy=gk;
hx=undefined;
}return {decorator:hy,textColor:hx,shadow:hw.invalid&&!hw.disabled?fa:undefined};
}},"button-frame/image":{style:function(ch){return {opacity:!ch.replacement&&ch.disabled?0.5:1};
}},"button":{alias:go,include:go,style:function(cu){return {padding:[2,8],center:true};
}},"hover-button":{alias:gn,include:gn,style:function(t){return {decorator:t.hovered?eO:undefined,textColor:t.hovered?gj:undefined};
}},"splitbutton":{},"splitbutton/button":gk,"splitbutton/arrow":{alias:gk,include:gk,style:function(hR){return {icon:eQ,padding:2,marginLeft:1};
}},"checkbox":{alias:gn,style:function(bW){var bY;

if(bW.checked&&bW.focused){bY=fI;
}else if(bW.checked&&bW.disabled){bY=dg;
}else if(bW.checked&&bW.pressed){bY=eH;
}else if(bW.checked&&bW.hovered){bY=cE;
}else if(bW.checked){bY=eY;
}else if(bW.focused){bY=fn;
}else if(bW.pressed){bY=gc;
}else if(bW.hovered){bY=fb;
}else{bY=cQ;
}var bX=bW.invalid&&!bW.disabled?dp:du;
return {icon:dv+bY+bX+gR,gap:6};
}},"radiobutton":{alias:gn,style:function(c){var e;

if(c.checked&&c.focused){e=dD;
}else if(c.checked&&c.disabled){e=de;
}else if(c.checked&&c.pressed){e=fr;
}else if(c.checked&&c.hovered){e=fq;
}else if(c.checked){e=fH;
}else if(c.focused){e=fp;
}else if(c.pressed){e=fx;
}else if(c.hovered){e=dm;
}else{e=fL;
}var d=c.invalid&&!c.disabled?dp:du;
return {icon:dv+e+d+gR,gap:6};
}},"textfield":{style:function(bc){var bh;
var bf=!!bc.focused;
var bg=!!bc.invalid;
var bd=!!bc.disabled;

if(bf&&bg&&!bd){bh=eJ;
}else if(bf&&!bg&&!bd){bh=gt;
}else if(bd){bh=eL;
}else if(!bf&&bg&&!bd){bh=eN;
}else{bh=eM;
}var be;

if(bc.disabled){be=eS;
}else if(bc.showingPlaceholder){be=dI;
}else{be=gO;
}return {decorator:bh,padding:[2,4,1],textColor:be};
}},"textarea":{include:fQ,style:function(J){return {padding:4};
}},"spinner":{style:function(bl){var bp;
var bn=!!bl.focused;
var bo=!!bl.invalid;
var bm=!!bl.disabled;

if(bn&&bo&&!bm){bp=eJ;
}else if(bn&&!bo&&!bm){bp=gt;
}else if(bm){bp=eL;
}else if(!bn&&bo&&!bm){bp=eN;
}else{bp=eM;
}return {decorator:bp};
}},"spinner/textfield":{style:function(bM){return {marginRight:2,padding:[2,4,1],textColor:bM.disabled?eS:gO};
}},"spinner/upbutton":{alias:go,include:go,style:function(bt){return {icon:fm,padding:bt.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"spinner/downbutton":{alias:go,include:go,style:function(gV){return {icon:dP,padding:gV.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"datefield":cO,"datefield/button":{alias:cV,include:cV,style:function(bO){return {icon:fF,padding:[0,3],decorator:undefined};
}},"datefield/textfield":fX,"datefield/list":{alias:dQ,include:dQ,style:function(hU){return {decorator:undefined};
}},"groupbox":{style:function(cD){return {legendPosition:fh};
}},"groupbox/legend":{alias:gn,style:function(bq){return {padding:[1,0,1,4],textColor:bq.invalid?fK:cR,font:gh};
}},"groupbox/frame":{style:function(hl){return {padding:12,decorator:fC};
}},"check-groupbox":eR,"check-groupbox/legend":{alias:cQ,include:cQ,style:function(Y){return {padding:[1,0,1,4],textColor:Y.invalid?fK:cR,font:gh};
}},"radio-groupbox":eR,"radio-groupbox/legend":{alias:fL,include:fL,style:function(hs){return {padding:[1,0,1,4],textColor:hs.invalid?fK:cR,font:gh};
}},"scrollarea":{style:function(hM){return {minWidth:50,minHeight:50};
}},"scrollarea/corner":{style:function(cp){return {backgroundColor:fS};
}},"scrollarea/pane":gm,"scrollarea/scrollbar-x":fN,"scrollarea/scrollbar-y":fN,"scrollbar":{style:function(cb){if(cb[es]){return {};
}return {width:cb.horizontal?undefined:16,height:cb.horizontal?16:undefined,decorator:cb.horizontal?dy:gG,padding:1};
}},"scrollbar/slider":{alias:dH,style:function(hN){return {padding:hN.horizontal?[0,1,0,1]:[1,0,1,0]};
}},"scrollbar/slider/knob":{include:go,style:function(L){var M=L.horizontal?gL:db;

if(L.disabled){M+=dk;
}return {decorator:M,minHeight:L.horizontal?undefined:9,minWidth:L.horizontal?9:undefined};
}},"scrollbar/button":{alias:go,include:go,style:function(bQ){var bR=el;

if(bQ.left){bR+=ex;
}else if(bQ.right){bR+=dz;
}else if(bQ.up){bR+=gE;
}else{bR+=eC;
}
if(bQ.left||bQ.right){return {padding:[0,0,0,bQ.left?3:4],icon:bR,width:15,height:14};
}else{return {padding:[0,0,0,2],icon:bR,width:14,height:15};
}}},"scrollbar/button-begin":cT,"scrollbar/button-end":cT,"slider":{style:function(bw){var bA;
var by=!!bw.focused;
var bz=!!bw.invalid;
var bx=!!bw.disabled;

if(by&&bz&&!bx){bA=eJ;
}else if(by&&!bz&&!bx){bA=gt;
}else if(bx){bA=eL;
}else if(!by&&bz&&!bx){bA=eN;
}else{bA=eM;
}return {decorator:bA};
}},"slider/knob":{include:go,style:function(bL){return {decorator:bL.disabled?en:gL,shadow:undefined,height:14,width:14};
}},"list":{alias:gF,style:function(z){var D;
var B=!!z.focused;
var C=!!z.invalid;
var A=!!z.disabled;

if(B&&C&&!A){D=eJ;
}else if(B&&!C&&!A){D=gt;
}else if(A){D=eL;
}else if(!B&&C&&!A){D=eN;
}else{D=eM;
}return {backgroundColor:gf,decorator:D};
}},"list/pane":gm,"listitem":{alias:gn,style:function(j){var k;

if(j.dragover){k=j.selected?ge:fU;
}else{k=j.selected?eO:undefined;
}return {padding:j.dragover?[4,4,2,4]:4,textColor:j.selected?gj:undefined,decorator:k};
}},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:go,include:go,style:function(bC){return {padding:5,center:true,icon:bC.vertical?eQ:fT};
}},"slidebar/button-backward":{alias:go,include:go,style:function(S){return {padding:5,center:true,icon:S.vertical?ds:gK};
}},"tabview":{style:function(I){return {contentPadding:16};
}},"tabview/bar":{alias:ee,style:function(cz){var cA={marginBottom:cz.barTop?-1:0,marginTop:cz.barBottom?-4:0,marginLeft:cz.barRight?-3:0,marginRight:cz.barLeft?-1:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};

if(cz.barTop||cz.barBottom){cA.paddingLeft=5;
cA.paddingRight=7;
}else{cA.paddingTop=5;
cA.paddingBottom=7;
}return cA;
}},"tabview/bar/button-forward":{include:gN,alias:gN,style:function(R){if(R.barTop||R.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/button-backward":{include:dV,alias:dV,style:function(T){if(T.barTop||T.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(hJ){return {decorator:di,minHeight:100,marginBottom:hJ.barBottom?-1:0,marginTop:hJ.barTop?-1:0,marginLeft:hJ.barLeft?-1:0,marginRight:hJ.barRight?-1:0};
}},"tabview-page":gm,"tabview-page/button":{alias:gn,style:function(l){var r,n=0;
var q=0,m=0,o=0,p=0;

if(l.checked){if(l.barTop){r=eD;
n=[6,14];
o=l.firstTab?0:-5;
p=l.lastTab?0:-5;
}else if(l.barBottom){r=dX;
n=[6,14];
o=l.firstTab?0:-5;
p=l.lastTab?0:-5;
}else if(l.barRight){r=fz;
n=[6,13];
q=l.firstTab?0:-5;
m=l.lastTab?0:-5;
}else{r=ez;
n=[6,13];
q=l.firstTab?0:-5;
m=l.lastTab?0:-5;
}}else{if(l.barTop){r=fd;
n=[4,10];
q=4;
o=l.firstTab?5:1;
p=1;
}else if(l.barBottom){r=dK;
n=[4,10];
m=4;
o=l.firstTab?5:1;
p=1;
}else if(l.barRight){r=fD;
n=[4,10];
p=5;
q=l.firstTab?5:1;
m=1;
o=1;
}else{r=fc;
n=[4,10];
o=5;
q=l.firstTab?5:1;
m=1;
p=1;
}}return {zIndex:l.checked?10:5,decorator:r,padding:n,marginTop:q,marginBottom:m,marginLeft:o,marginRight:p,textColor:l.checked?cM:dF};
}},"tabview-page/button/label":{alias:gs,style:function(u){return {padding:[0,1,0,1],margin:u.focused?0:1,decorator:u.focused?dl:undefined};
}},"tabview-page/button/close-button":{alias:gn,style:function(hA){return {icon:fY};
}},"toolbar":{style:function(ce){return {decorator:dc,spacing:2};
}},"toolbar/part":{style:function(cg){return {decorator:eA,spacing:2};
}},"toolbar/part/container":{style:function(cs){return {paddingLeft:2,paddingRight:2};
}},"toolbar/part/handle":{style:function(G){return {source:gI,marginLeft:3,marginRight:3};
}},"toolbar-button":{alias:gn,style:function(hT){return {marginTop:2,marginBottom:2,padding:(hT.pressed||hT.checked||hT.hovered)&&!hT.disabled||(hT.disabled&&hT.checked)?3:5,decorator:hT.pressed||(hT.checked&&!hT.hovered)||(hT.checked&&hT.disabled)?fi:hT.hovered&&!hT.disabled?cL:undefined};
}},"toolbar-menubutton":{alias:gv,include:gv,style:function(gT){return {showArrow:true};
}},"toolbar-menubutton/arrow":{alias:gi,include:gi,style:function(W){return {source:dP};
}},"toolbar-splitbutton":{style:function(hd){return {marginTop:2,marginBottom:2};
}},"toolbar-splitbutton/button":{alias:gv,include:gv,style:function(cn){return {icon:eQ,marginTop:undefined,marginBottom:undefined};
}},"toolbar-splitbutton/arrow":{alias:gv,include:gv,style:function(hu){return {padding:hu.pressed||hu.checked?1:hu.hovered?1:3,icon:eQ,marginTop:undefined,marginBottom:undefined};
}},"toolbar-separator":{style:function(bj){return {decorator:fg,margin:7};
}},"tree":gp,"tree-item":{style:function(bP){return {padding:[2,6],textColor:bP.selected?gj:undefined,decorator:bP.selected?eO:undefined};
}},"tree-item/icon":{include:gi,style:function(hI){return {paddingRight:5};
}},"tree-item/label":gs,"tree-item/open":{include:gi,style:function(bH){var bI;

if(bH.selected&&bH.opened){bI=fG;
}else if(bH.selected&&!bH.opened){bI=gA;
}else if(bH.opened){bI=dR;
}else{bI=gM;
}return {padding:[0,5,0,2],source:bI};
}},"tree-folder":{include:gx,alias:gx,style:function(bT){var bU;

if(bT.small){bU=bT.opened?dn:cW;
}else if(bT.large){bU=bT.opened?eE:dL;
}else{bU=bT.opened?fs:eF;
}return {icon:bU};
}},"tree-file":{include:gx,alias:gx,style:function(id){return {icon:id.small?dN:id.large?dd:gB};
}},"treevirtual":dt,"treevirtual-folder":{style:function(bs){return {icon:bs.opened?dn:cW};
}},"treevirtual-file":{include:dT,alias:dT,style:function(he){return {icon:dN};
}},"treevirtual-line":{style:function(gU){return {icon:cS};
}},"treevirtual-contract":{style:function(cw){return {icon:dR,paddingLeft:5,paddingTop:2};
}},"treevirtual-expand":{style:function(X){return {icon:gM,paddingLeft:5,paddingTop:2};
}},"treevirtual-only-contract":gy,"treevirtual-only-expand":fR,"treevirtual-start-contract":gy,"treevirtual-start-expand":fR,"treevirtual-end-contract":gy,"treevirtual-end-expand":fR,"treevirtual-cross-contract":gy,"treevirtual-cross-expand":fR,"treevirtual-end":{style:function(hV){return {icon:cS};
}},"treevirtual-cross":{style:function(bv){return {icon:cS};
}},"tooltip":{include:gu,style:function(cB){return {backgroundColor:em,padding:[1,3,2,3],offset:[15,5,5,5]};
}},"tooltip/atom":gn,"tooltip-error":{include:gr,style:function(g){return {textColor:gj,placeMethod:gm,offset:[0,0,0,14],marginTop:-2,position:cP,showTimeout:100,hideTimeout:10000,decorator:dJ,shadow:ef,font:gh};
}},"tooltip-error/atom":gn,"window":{style:function(ie){return {shadow:dB,contentPadding:[10,10,10,10]};
}},"window/pane":{style:function(h){return {decorator:eT};
}},"window/captionbar":{style:function(cm){return {decorator:cm.active?cF:fw,textColor:cm.active?gq:dx,minHeight:26,paddingRight:2};
}},"window/icon":{style:function(cx){return {margin:[5,0,3,6]};
}},"window/title":{style:function(Q){return {alignY:gg,font:gh,marginLeft:6,marginRight:12};
}},"window/minimize-button":{alias:gn,style:function(cd){return {icon:cd.active?cd.hovered?eX:fA:fE,margin:[4,8,2,0]};
}},"window/restore-button":{alias:gn,style:function(cr){return {icon:cr.active?cr.hovered?dC:da:fB,margin:[5,8,2,0]};
}},"window/maximize-button":{alias:gn,style:function(i){return {icon:i.active?i.hovered?dq:eG:fV,margin:[4,8,2,0]};
}},"window/close-button":{alias:gn,style:function(ic){return {icon:ic.active?ic.hovered?ga:er:eI,margin:[4,8,2,0]};
}},"window/statusbar":{style:function(ib){return {padding:[2,6],decorator:ej,minHeight:18};
}},"window/statusbar-text":{style:function(hK){return {font:dw};
}},"iframe":{style:function(ck){return {decorator:gl};
}},"resizer":{style:function(U){return {decorator:ev};
}},"splitpane":{style:function(hH){return {decorator:fJ};
}},"splitpane/splitter":{style:function(hf){return {width:hf.horizontal?3:undefined,height:hf.vertical?3:undefined,backgroundColor:gS};
}},"splitpane/splitter/knob":{style:function(hG){return {source:hG.horizontal?dM:eU};
}},"splitpane/slider":{style:function(hg){return {width:hg.horizontal?3:undefined,height:hg.vertical?3:undefined,backgroundColor:gS};
}},"selectbox":{alias:go,include:go,style:function(hc){return {padding:[2,8]};
}},"selectbox/atom":gn,"selectbox/popup":gu,"selectbox/list":{alias:gp},"selectbox/arrow":{include:gi,style:function(bN){return {source:eQ,paddingLeft:5};
}},"datechooser":{style:function(gW){var hb;
var gY=!!gW.focused;
var ha=!!gW.invalid;
var gX=!!gW.disabled;

if(gY&&ha&&!gX){hb=eJ;
}else if(gY&&!ha&&!gX){hb=gt;
}else if(gX){hb=eL;
}else if(!gY&&ha&&!gX){hb=eN;
}else{hb=eM;
}return {padding:2,decorator:hb,backgroundColor:gf};
}},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:go,alias:go,style:function(hj){var hk={padding:[2,4],shadow:undefined};

if(hj.lastYear){hk.icon=dj;
hk.marginRight=1;
}else if(hj.lastMonth){hk.icon=gK;
}else if(hj.nextYear){hk.icon=cH;
hk.marginLeft=1;
}else if(hj.nextMonth){hk.icon=fT;
}return hk;
}},"datechooser/last-year-button-tooltip":gr,"datechooser/last-month-button-tooltip":gr,"datechooser/next-year-button-tooltip":gr,"datechooser/next-month-button-tooltip":gr,"datechooser/last-year-button":fM,"datechooser/last-month-button":fM,"datechooser/next-month-button":fM,"datechooser/next-year-button":fM,"datechooser/month-year-label":{style:function(bJ){return {font:gh,textAlign:fO,textColor:bJ.disabled?eS:undefined};
}},"datechooser/date-pane":{style:function(cc){return {textColor:cc.disabled?eS:undefined,marginTop:2};
}},"datechooser/weekday":{style:function(hS){return {textColor:hS.disabled?eS:hS.weekend?gQ:undefined,textAlign:fO,paddingTop:2,backgroundColor:dO};
}},"datechooser/week":{style:function(hL){return {textAlign:fO,padding:[2,4],backgroundColor:dO};
}},"datechooser/day":{style:function(cC){return {textAlign:fO,decorator:cC.disabled?undefined:cC.selected?eO:undefined,textColor:cC.disabled?eS:cC.selected?gj:cC.otherMonth?gQ:undefined,font:cC.today?gh:undefined,padding:[2,4]};
}},"combobox":{style:function(hB){var hF;
var hD=!!hB.focused;
var hE=!!hB.invalid;
var hC=!!hB.disabled;

if(hD&&hE&&!hC){hF=eJ;
}else if(hD&&!hE&&!hC){hF=gt;
}else if(hC){hF=eL;
}else if(!hD&&hE&&!hC){hF=eN;
}else{hF=eM;
}return {decorator:hF};
}},"combobox/popup":gu,"combobox/list":{alias:gp},"combobox/button":{include:go,alias:go,style:function(hm){var hn={icon:eQ,padding:2};

if(hm.selected){hn.decorator=gJ;
}return hn;
}},"combobox/textfield":{include:fQ,style:function(cv){return {decorator:undefined};
}},"menu":{style:function(N){var O={decorator:eh,shadow:dU,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,placementModeY:N.submenu||N.contextmenu?gz:eB};

if(N.submenu){O.position=cP;
O.offset=[-2,-3];
}return O;
}},"menu/slidebar":fj,"menu-slidebar":gm,"menu-slidebar-button":{style:function(ct){return {decorator:ct.hovered?eO:undefined,padding:7,center:true};
}},"menu-slidebar/button-backward":{include:gP,style:function(bi){return {icon:bi.hovered?fk:ds};
}},"menu-slidebar/button-forward":{include:gP,style:function(bS){return {icon:bS.hovered?fo:eQ};
}},"menu-separator":{style:function(bF){return {height:0,decorator:eu,margin:[4,2]};
}},"menu-button":{alias:gn,style:function(hX){return {decorator:hX.selected?eO:undefined,textColor:hX.selected?gj:undefined,padding:[4,6]};
}},"menu-button/icon":{include:gi,style:function(y){return {alignY:gg};
}},"menu-button/label":{include:gs,style:function(hr){return {alignY:gg,padding:1};
}},"menu-button/shortcut":{include:gs,style:function(b){return {alignY:gg,marginLeft:14,padding:1};
}},"menu-button/arrow":{include:gi,style:function(K){return {source:K.selected?ew:fT,alignY:gg};
}},"menu-checkbox":{alias:eK,include:eK,style:function(bb){return {icon:!bb.checked?undefined:bb.selected?gH:dh};
}},"menu-radiobutton":{alias:eK,include:eK,style:function(cf){return {icon:!cf.checked?undefined:cf.selected?eW:cI};
}},"menubar":{style:function(E){return {decorator:ff};
}},"menubar-button":{alias:gn,style:function(bK){return {decorator:bK.pressed||bK.hovered?eO:undefined,textColor:bK.pressed||bK.hovered?gj:undefined,padding:[3,8]};
}},"colorselector":gm,"colorselector/control-bar":gm,"colorselector/control-pane":gm,"colorselector/visual-pane":eR,"colorselector/preset-grid":gm,"colorselector/colorbucket":{style:function(cq){return {decorator:gl,width:16,height:16};
}},"colorselector/preset-field-set":eR,"colorselector/input-field-set":eR,"colorselector/preview-field-set":eR,"colorselector/hex-field-composite":gm,"colorselector/hex-field":fQ,"colorselector/rgb-spinner-composite":gm,"colorselector/rgb-spinner-red":gw,"colorselector/rgb-spinner-green":gw,"colorselector/rgb-spinner-blue":gw,"colorselector/hsb-spinner-composite":gm,"colorselector/hsb-spinner-hue":gw,"colorselector/hsb-spinner-saturation":gw,"colorselector/hsb-spinner-brightness":gw,"colorselector/preview-content-old":{style:function(hY){return {decorator:gl,width:50,height:10};
}},"colorselector/preview-content-new":{style:function(F){return {decorator:gl,backgroundColor:gf,width:50,height:10};
}},"colorselector/hue-saturation-field":{style:function(hQ){return {decorator:gl,margin:5};
}},"colorselector/brightness-field":{style:function(hv){return {decorator:gl,margin:[5,7]};
}},"colorselector/hue-saturation-pane":gm,"colorselector/hue-saturation-handle":gm,"colorselector/brightness-pane":gm,"colorselector/brightness-handle":gm,"colorpopup":{alias:gu,include:gu,style:function(cy){return {padding:5,backgroundColor:fS};
}},"colorpopup/field":{style:function(V){return {decorator:gl,margin:2,width:14,height:14,backgroundColor:gf};
}},"colorpopup/selector-button":gk,"colorpopup/auto-button":gk,"colorpopup/preview-pane":eR,"colorpopup/current-preview":{style:function(ci){return {height:20,padding:4,marginLeft:4,decorator:gl,allowGrowX:true};
}},"colorpopup/selected-preview":{style:function(w){return {height:20,padding:4,marginRight:4,decorator:gl,allowGrowX:true};
}},"colorpopup/colorselector-okbutton":{alias:gk,include:gk,style:function(hh){return {icon:fu};
}},"colorpopup/colorselector-cancelbutton":{alias:gk,include:gk,style:function(ia){return {icon:fe};
}},"table":{alias:gm,style:function(ba){return {decorator:dt};
}},"table-header":{},"table/statusbar":{style:function(hi){return {decorator:fy,padding:[0,2]};
}},"table/column-button":{alias:go,style:function(v){return {decorator:dA,padding:3,icon:cJ};
}},"table-column-reset-button":{include:eK,alias:eK,style:function(){return {icon:ey};
}},"table-scroller":gm,"table-scroller/scrollbar-x":fN,"table-scroller/scrollbar-y":fN,"table-scroller/header":{style:function(co){return {decorator:eo};
}},"table-scroller/pane":{style:function(bV){return {backgroundColor:eq};
}},"table-scroller/focus-indicator":{style:function(bE){return {decorator:eg};
}},"table-scroller/resize-line":{style:function(bk){return {backgroundColor:gd,width:2};
}},"table-header-cell":{alias:gn,style:function(bu){return {minWidth:13,minHeight:20,padding:bu.hovered?[3,4,2,4]:[3,4],decorator:bu.hovered?eV:ec,sortIcon:bu.sorted?(bu.sortedAscending?fl:cG):undefined};
}},"table-header-cell/label":{style:function(hz){return {minWidth:0,alignY:gg,paddingRight:5};
}},"table-header-cell/sort-icon":{style:function(f){return {alignY:gg,alignX:cU};
}},"table-header-cell/icon":{style:function(s){return {minWidth:0,alignY:gg,paddingRight:5};
}},"table-editor-textfield":{include:fQ,style:function(ca){return {decorator:undefined,padding:[2,2],backgroundColor:gf};
}},"table-editor-selectbox":{include:dW,alias:dW,style:function(cl){return {padding:[0,2],backgroundColor:gf};
}},"table-editor-combobox":{include:cO,alias:cO,style:function(x){return {decorator:undefined,backgroundColor:gf};
}},"progressive-table-header":{alias:gm,style:function(hO){return {decorator:cK};
}},"progressive-table-header-cell":{alias:gn,style:function(ht){return {minWidth:40,minHeight:25,paddingLeft:6,decorator:et};
}},"app-header":{style:function(bD){return {font:gh,textColor:gj,padding:[8,12],decorator:ei};
}},"virtual-list":gp,"virtual-list/row-layer":dG,"row-layer":{style:function(hW){return {colorEven:gq,colorOdd:gq};
}},"column-layer":gm,"cell":{style:function(cj){return {textColor:cj.selected?gj:cX,padding:[3,6],font:dS};
}},"cell-string":eP,"cell-number":{include:eP,style:function(br){return {textAlign:cU};
}},"cell-image":eP,"cell-boolean":{include:eP,style:function(bB){return {iconTrue:eb,iconFalse:df};
}},"cell-atom":eP,"cell-date":eP,"cell-html":eP,"htmlarea":{"include":gm,style:function(P){return {backgroundColor:gq};
}}}});
})();
(function(){var h="logbuch-label-box",g="white",f="title-project",e="#666666",d="logbuch-category",c="logbuch.theme.Appearance",b="#336699",a="title-application";
qx.Theme.define(c,{extend:qx.theme.modern.Appearance,appearances:{"logbuch-cell-date":{style:function(i){return {textColor:g,decorator:d};
}},"title-application":{style:function(l){return {font:a,textColor:b};
}},"title-project":{style:function(k){return {font:f,textColor:e};
}},"logbuch-label-box":{style:function(j){return {font:h,textColor:g,decorator:h,padding:2};
}}}});
})();
(function(){var a="logbuch.theme.Theme";
qx.Theme.define(a,{meta:{color:logbuch.theme.Color,decoration:logbuch.theme.Decoration,font:logbuch.theme.Font,icon:qx.theme.icon.Tango,appearance:logbuch.theme.Appearance}});
})();
(function(){var j="_applyStyle",i="stretch",h="Integer",g="px",f=" ",e="repeat",d="round",c="shorthand",b="px ",a="sliceBottom",y=";'></div>",x="<div style='",w="sliceLeft",v="sliceRight",u="repeatX",t="String",s="qx.ui.decoration.css3.BorderImage",r="border-box",q="",p='") ',n="sliceTop",o='url("',l="hidden",m="repeatY",k="absolute";
qx.Class.define(s,{extend:qx.ui.decoration.Abstract,construct:function(C,D){qx.ui.decoration.Abstract.call(this);
if(C!=null){this.setBorderImage(C);
}
if(D!=null){this.setSlice(D);
}},statics:{IS_SUPPORTED:qx.bom.element.Style.isPropertySupported("borderImage")},properties:{borderImage:{check:t,nullable:true,apply:j},sliceTop:{check:h,init:0,apply:j},sliceRight:{check:h,init:0,apply:j},sliceBottom:{check:h,init:0,apply:j},sliceLeft:{check:h,init:0,apply:j},slice:{group:[n,v,a,w],mode:c},repeatX:{check:[i,e,d],init:i,apply:j},repeatY:{check:[i,e,d],init:i,apply:j},repeat:{group:[u,m],mode:c}},members:{__markup:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__markup;
},getMarkup:function(){if(this.__markup){return this.__markup;
}var z=this._resolveImageUrl(this.getBorderImage());
var A=[this.getSliceTop(),this.getSliceRight(),this.getSliceBottom(),this.getSliceLeft()];
var B=[this.getRepeatX(),this.getRepeatY()].join(f);
this.__markup=[x,qx.bom.element.Style.compile({"borderImage":o+z+p+A.join(f)+f+B,position:k,lineHeight:0,fontSize:0,overflow:l,boxSizing:r,borderWidth:A.join(b)+g}),y].join(q);
return this.__markup;
},resize:function(H,I,J){H.style.width=I+g;
H.style.height=J+g;
},tint:function(E,F){},_applyStyle:function(){{};
},_resolveImageUrl:function(G){return qx.util.ResourceManager.getInstance().toUri(qx.util.AliasManager.getInstance().resolve(G));
}},destruct:function(){this.__markup=null;
}});
})();
(function(){var j="px",i="0px",h="-1px",g="no-repeat",f="scale-x",e="scale-y",d="-tr",c="-l",b='</div>',a="scale",x="qx.client",w="-br",v="-t",u="-tl",t="-r",s='<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">',r="_applyBaseImage",q="-b",p="String",o="",m="-bl",n="qx.ui.decoration.GridDiv",k="-c",l="mshtml";
qx.Class.define(n,{extend:qx.ui.decoration.Abstract,construct:function(M,N){qx.ui.decoration.Abstract.call(this);
if(M!=null){this.setBaseImage(M);
}
if(N!=null){this.setInsets(N);
}},properties:{baseImage:{check:p,nullable:true,apply:r}},members:{__markup:null,__images:null,__edges:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__markup;
},getMarkup:function(){if(this.__markup){return this.__markup;
}var z=qx.bom.element.Decoration;
var A=this.__images;
var B=this.__edges;
var C=[];
C.push(s);
C.push(z.create(A.tl,g,{top:0,left:0}));
C.push(z.create(A.t,f,{top:0,left:B.left+j}));
C.push(z.create(A.tr,g,{top:0,right:0}));
C.push(z.create(A.bl,g,{bottom:0,left:0}));
C.push(z.create(A.b,f,{bottom:0,left:B.left+j}));
C.push(z.create(A.br,g,{bottom:0,right:0}));
C.push(z.create(A.l,e,{top:B.top+j,left:0}));
C.push(z.create(A.c,a,{top:B.top+j,left:B.left+j}));
C.push(z.create(A.r,e,{top:B.top+j,right:0}));
C.push(b);
return this.__markup=C.join(o);
},resize:function(O,P,Q){var R=this.__edges;
var innerWidth=P-R.left-R.right;
var innerHeight=Q-R.top-R.bottom;
if(innerWidth<0){innerWidth=0;
}
if(innerHeight<0){innerHeight=0;
}O.style.width=P+j;
O.style.height=Q+j;
O.childNodes[1].style.width=innerWidth+j;
O.childNodes[4].style.width=innerWidth+j;
O.childNodes[7].style.width=innerWidth+j;
O.childNodes[6].style.height=innerHeight+j;
O.childNodes[7].style.height=innerHeight+j;
O.childNodes[8].style.height=innerHeight+j;

if(qx.core.Variant.isSet(x,l)){if(qx.bom.client.Engine.VERSION<7||(qx.bom.client.Feature.QUIRKS_MODE&&qx.bom.client.Engine.VERSION<8)){if(P%2==1){O.childNodes[2].style.marginRight=h;
O.childNodes[5].style.marginRight=h;
O.childNodes[8].style.marginRight=h;
}else{O.childNodes[2].style.marginRight=i;
O.childNodes[5].style.marginRight=i;
O.childNodes[8].style.marginRight=i;
}
if(Q%2==1){O.childNodes[3].style.marginBottom=h;
O.childNodes[4].style.marginBottom=h;
O.childNodes[5].style.marginBottom=h;
}else{O.childNodes[3].style.marginBottom=i;
O.childNodes[4].style.marginBottom=i;
O.childNodes[5].style.marginBottom=i;
}}}},tint:function(S,T){},_applyBaseImage:function(D,E){{};

if(D){var I=this._resolveImageUrl(D);
var J=/(.*)(\.[a-z]+)$/.exec(I);
var H=J[1];
var G=J[2];
var F=this.__images={tl:H+u+G,t:H+v+G,tr:H+d+G,bl:H+m+G,b:H+q+G,br:H+w+G,l:H+c+G,c:H+k+G,r:H+t+G};
this.__edges=this._computeEdgeSizes(F);
}},_resolveImageUrl:function(y){return qx.util.AliasManager.getInstance().resolve(y);
},_computeEdgeSizes:function(K){var L=qx.util.ResourceManager.getInstance();
return {top:L.getImageHeight(K.t),bottom:L.getImageHeight(K.b),left:L.getImageWidth(K.l),right:L.getImageWidth(K.r)};
}},destruct:function(){this.__markup=this.__images=this.__edges=null;
}});
})();


qx.$$loader.init();

