/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

(function(){
var _1=null;
if((_1||(typeof djConfig!="undefined"&&djConfig.scopeMap))&&(typeof window!="undefined")){
var _2="",_3="",_4="",_5={},_6={};
_1=_1||djConfig.scopeMap;
for(var i=0;i<_1.length;i++){
var _7=_1[i];
_2+="var "+_7[0]+" = {}; "+_7[1]+" = "+_7[0]+";"+_7[1]+"._scopeName = '"+_7[1]+"';";
_3+=(i==0?"":",")+_7[0];
_4+=(i==0?"":",")+_7[1];
_5[_7[0]]=_7[1];
_6[_7[1]]=_7[0];
}
eval(_2+"dojo._scopeArgs = ["+_4+"];");
dojo._scopePrefixArgs=_3;
dojo._scopePrefix="(function("+_3+"){";
dojo._scopeSuffix="})("+_4+")";
dojo._scopeMap=_5;
dojo._scopeMapRev=_6;
}
(function(){
if(typeof this["loadFirebugConsole"]=="function"){
this["loadFirebugConsole"]();
}else{
this.console=this.console||{};
var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];
var i=0,tn;
while((tn=cn[i++])){
if(!console[tn]){
(function(){
var _8=tn+"";
console[_8]=("log" in console)?function(){
var a=Array.apply({},arguments);
a.unshift(_8+":");
console["log"](a.join(" "));
}:function(){
};
console[_8]._fake=true;
})();
}
}
}
if(typeof dojo=="undefined"){
dojo={_scopeName:"dojo",_scopePrefix:"",_scopePrefixArgs:"",_scopeSuffix:"",_scopeMap:{},_scopeMapRev:{}};
}
var d=dojo;
if(typeof dijit=="undefined"){
dijit={_scopeName:"dijit"};
}
if(typeof dojox=="undefined"){
dojox={_scopeName:"dojox"};
}
if(!d._scopeArgs){
d._scopeArgs=[dojo,dijit,dojox];
}
d.global=this;
d.config={isDebug:false,debugAtAllCosts:false};
var _9=typeof djConfig!="undefined"?djConfig:typeof dojoConfig!="undefined"?dojoConfig:null;
if(_9){
for(var c in _9){
d.config[c]=_9[c];
}
}
dojo.locale=d.config.locale;
var _a="$Rev: 23917 $".match(/\d+/);
dojo.version={major:1,minor:6,patch:0,flag:"",revision:_a?+_a[0]:NaN,toString:function(){
with(d.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
if(typeof OpenAjax!="undefined"){
OpenAjax.hub.registerLibrary(dojo._scopeName,"http://dojotoolkit.org",d.version.toString());
}
var _b,_c,_d={};
for(var i in {toString:1}){
_b=[];
break;
}
dojo._extraNames=_b=_b||["hasOwnProperty","valueOf","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","constructor"];
_c=_b.length;
dojo._mixin=function(_e,_f){
var _10,s,i;
for(_10 in _f){
s=_f[_10];
if(!(_10 in _e)||(_e[_10]!==s&&(!(_10 in _d)||_d[_10]!==s))){
_e[_10]=s;
}
}
if(_c&&_f){
for(i=0;i<_c;++i){
_10=_b[i];
s=_f[_10];
if(!(_10 in _e)||(_e[_10]!==s&&(!(_10 in _d)||_d[_10]!==s))){
_e[_10]=s;
}
}
}
return _e;
};
dojo.mixin=function(obj,_11){
if(!obj){
obj={};
}
for(var i=1,l=arguments.length;i<l;i++){
d._mixin(obj,arguments[i]);
}
return obj;
};
dojo._getProp=function(_12,_13,_14){
var obj=_14||d.global;
for(var i=0,p;obj&&(p=_12[i]);i++){
if(i==0&&d._scopeMap[p]){
p=d._scopeMap[p];
}
obj=(p in obj?obj[p]:(_13?obj[p]={}:undefined));
}
return obj;
};
dojo.setObject=function(_15,_16,_17){
var _18=_15.split("."),p=_18.pop(),obj=d._getProp(_18,true,_17);
return obj&&p?(obj[p]=_16):undefined;
};
dojo.getObject=function(_19,_1a,_1b){
return d._getProp(_19.split("."),_1a,_1b);
};
dojo.exists=function(_1c,obj){
return d.getObject(_1c,false,obj)!==undefined;
};
dojo["eval"]=function(_1d){
return d.global.eval?d.global.eval(_1d):eval(_1d);
};
d.deprecated=d.experimental=function(){
};
})();
(function(){
var d=dojo,_1e;
d.mixin(d,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(_1f){
var mp=d._modulePrefixes;
return !!(mp[_1f]&&mp[_1f].value);
},_getModulePrefix:function(_20){
var mp=d._modulePrefixes;
if(d._moduleHasPrefix(_20)){
return mp[_20].value;
}
return _20;
},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});
dojo._loadPath=function(_21,_22,cb){
var uri=((_21.charAt(0)=="/"||_21.match(/^\w+:/))?"":d.baseUrl)+_21;
try{
_1e=_22;
return !_22?d._loadUri(uri,cb):d._loadUriAndCheck(uri,_22,cb);
}
catch(e){
return false;
}
finally{
_1e=null;
}
};
dojo._loadUri=function(uri,cb){
if(d._loadedUrls[uri]){
return true;
}
d._inFlightCount++;
var _23=d._getText(uri,true);
if(_23){
d._loadedUrls[uri]=true;
d._loadedUrls.push(uri);
if(cb){
_23=/^define\(/.test(_23)?_23:"("+_23+")";
}else{
_23=d._scopePrefix+_23+d._scopeSuffix;
}
if(!d.isIE){
_23+="\r\n//@ sourceURL="+uri;
}
var _24=d["eval"](_23);
if(cb){
cb(_24);
}
}
if(--d._inFlightCount==0&&d._postLoad&&d._loaders.length){
setTimeout(function(){
if(d._inFlightCount==0){
d._callLoaded();
}
},0);
}
return !!_23;
};
dojo._loadUriAndCheck=function(uri,_25,cb){
var ok=false;
try{
ok=d._loadUri(uri,cb);
}
catch(e){
}
return !!(ok&&d._loadedModules[_25]);
};
dojo.loaded=function(){
d._loadNotifying=true;
d._postLoad=true;
var mll=d._loaders;
d._loaders=[];
for(var x=0;x<mll.length;x++){
mll[x]();
}
d._loadNotifying=false;
if(d._postLoad&&d._inFlightCount==0&&mll.length){
d._callLoaded();
}
};
dojo.unloaded=function(){
var mll=d._unloaders;
while(mll.length){
(mll.pop())();
}
};
d._onto=function(arr,obj,fn){
if(!fn){
arr.push(obj);
}else{
if(fn){
var _26=(typeof fn=="string")?obj[fn]:fn;
arr.push(function(){
_26.call(obj);
});
}
}
};
dojo.ready=dojo.addOnLoad=function(obj,_27){
d._onto(d._loaders,obj,_27);
if(d._postLoad&&d._inFlightCount==0&&!d._loadNotifying){
d._callLoaded();
}
};
var dca=d.config.addOnLoad;
if(dca){
d.addOnLoad[(dca instanceof Array?"apply":"call")](d,dca);
}
dojo._modulesLoaded=function(){
if(d._postLoad){
return;
}
if(d._inFlightCount>0){
return;
}
d._callLoaded();
};
dojo._callLoaded=function(){
if(typeof setTimeout=="object"||(d.config.useXDomain&&d.isOpera)){
setTimeout(d.isAIR?function(){
d.loaded();
}:d._scopeName+".loaded();",0);
}else{
d.loaded();
}
};
dojo._getModuleSymbols=function(_28){
var _29=_28.split(".");
for(var i=_29.length;i>0;i--){
var _2a=_29.slice(0,i).join(".");
if(i==1&&!d._moduleHasPrefix(_2a)){
_29[0]="../"+_29[0];
}else{
var _2b=d._getModulePrefix(_2a);
if(_2b!=_2a){
_29.splice(0,i,_2b);
break;
}
}
}
return _29;
};
dojo._global_omit_module_check=false;
dojo.loadInit=function(_2c){
_2c();
};
dojo._loadModule=dojo.require=function(_2d,_2e){
_2e=d._global_omit_module_check||_2e;
var _2f=d._loadedModules[_2d];
if(_2f){
return _2f;
}
var _30=d._getModuleSymbols(_2d).join("/")+".js";
var _31=!_2e?_2d:null;
var ok=d._loadPath(_30,_31);
if(!ok&&!_2e){
throw new Error("Could not load '"+_2d+"'; last tried '"+_30+"'");
}
if(!_2e&&!d._isXDomain){
_2f=d._loadedModules[_2d];
if(!_2f){
throw new Error("symbol '"+_2d+"' is not defined after loading '"+_30+"'");
}
}
return _2f;
};
dojo.provide=function(_32){
_32=_32+"";
return (d._loadedModules[_32]=d.getObject(_32,true));
};
dojo.platformRequire=function(_33){
var _34=_33.common||[];
var _35=_34.concat(_33[d._name]||_33["default"]||[]);
for(var x=0;x<_35.length;x++){
var _36=_35[x];
if(_36.constructor==Array){
d._loadModule.apply(d,_36);
}else{
d._loadModule(_36);
}
}
};
dojo.requireIf=function(_37,_38){
if(_37===true){
var _39=[];
for(var i=1;i<arguments.length;i++){
_39.push(arguments[i]);
}
d.require.apply(d,_39);
}
};
dojo.requireAfterIf=d.requireIf;
dojo.registerModulePath=function(_3a,_3b){
d._modulePrefixes[_3a]={name:_3a,value:_3b};
};
dojo.requireLocalization=function(_3c,_3d,_3e,_3f){
d.require("dojo.i18n");
d.i18n._requireLocalization.apply(d.hostenv,arguments);
};
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");
dojo._Url=function(){
var n=null,_40=arguments,uri=[_40[0]];
for(var i=1;i<_40.length;i++){
if(!_40[i]){
continue;
}
var _41=new d._Url(_40[i]+""),_42=new d._Url(uri[0]+"");
if(_41.path==""&&!_41.scheme&&!_41.authority&&!_41.query){
if(_41.fragment!=n){
_42.fragment=_41.fragment;
}
_41=_42;
}else{
if(!_41.scheme){
_41.scheme=_42.scheme;
if(!_41.authority){
_41.authority=_42.authority;
if(_41.path.charAt(0)!="/"){
var _43=_42.path.substring(0,_42.path.lastIndexOf("/")+1)+_41.path;
var _44=_43.split("/");
for(var j=0;j<_44.length;j++){
if(_44[j]=="."){
if(j==_44.length-1){
_44[j]="";
}else{
_44.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&_44[0]=="")&&_44[j]==".."&&_44[j-1]!=".."){
if(j==(_44.length-1)){
_44.splice(j,1);
_44[j-1]="";
}else{
_44.splice(j-1,2);
j-=2;
}
}
}
}
_41.path=_44.join("/");
}
}
}
}
uri=[];
if(_41.scheme){
uri.push(_41.scheme,":");
}
if(_41.authority){
uri.push("//",_41.authority);
}
uri.push(_41.path);
if(_41.query){
uri.push("?",_41.query);
}
if(_41.fragment){
uri.push("#",_41.fragment);
}
}
this.uri=uri.join("");
var r=this.uri.match(ore);
this.scheme=r[2]||(r[1]?"":n);
this.authority=r[4]||(r[3]?"":n);
this.path=r[5];
this.query=r[7]||(r[6]?"":n);
this.fragment=r[9]||(r[8]?"":n);
if(this.authority!=n){
r=this.authority.match(ire);
this.user=r[3]||n;
this.password=r[4]||n;
this.host=r[6]||r[7];
this.port=r[9]||n;
}
};
dojo._Url.prototype.toString=function(){
return this.uri;
};
dojo.moduleUrl=function(_45,url){
var loc=d._getModuleSymbols(_45).join("/");
if(!loc){
return null;
}
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
var _46=loc.indexOf(":");
if(loc.charAt(0)!="/"&&(_46==-1||_46>loc.indexOf("/"))){
loc=d.baseUrl+loc;
}
return new d._Url(loc,url);
};
})();
if(typeof window!="undefined"){
dojo.isBrowser=true;
dojo._name="browser";
(function(){
var d=dojo;
if(document&&document.getElementsByTagName){
var _47=document.getElementsByTagName("script");
var _48=/dojo(\.xd)?\.js(\W|$)/i;
for(var i=0;i<_47.length;i++){
var src=_47[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_48);
if(m){
if(!d.config.baseUrl){
d.config.baseUrl=src.substring(0,m.index);
}
var cfg=(_47[i].getAttribute("djConfig")||_47[i].getAttribute("data-dojo-config"));
if(cfg){
var _49=eval("({ "+cfg+" })");
for(var x in _49){
dojo.config[x]=_49[x];
}
}
break;
}
}
}
d.baseUrl=d.config.baseUrl;
var n=navigator;
var dua=n.userAgent,dav=n.appVersion,tv=parseFloat(dav);
if(dua.indexOf("Opera")>=0){
d.isOpera=tv;
}
if(dua.indexOf("AdobeAIR")>=0){
d.isAIR=1;
}
d.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:0;
d.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;
d.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;
d.isMac=dav.indexOf("Macintosh")>=0;
var _4a=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);
if(_4a&&!dojo.isChrome){
d.isSafari=parseFloat(dav.split("Version/")[1]);
if(!d.isSafari||parseFloat(dav.substr(_4a+7))<=419.3){
d.isSafari=2;
}
}
if(dua.indexOf("Gecko")>=0&&!d.isKhtml&&!d.isWebKit){
d.isMozilla=d.isMoz=tv;
}
if(d.isMoz){
d.isFF=parseFloat(dua.split("Firefox/")[1]||dua.split("Minefield/")[1])||undefined;
}
if(document.all&&!d.isOpera){
d.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;
var _4b=document.documentMode;
if(_4b&&_4b!=5&&Math.floor(d.isIE)!=_4b){
d.isIE=_4b;
}
}
if(dojo.isIE&&window.location.protocol==="file:"){
dojo.config.ieForceActiveXXhr=true;
}
d.isQuirks=document.compatMode=="BackCompat";
d.locale=dojo.config.locale||(d.isIE?n.userLanguage:n.language).toLowerCase();
d._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
d._xhrObj=function(){
var _4c,_4d;
if(!dojo.isIE||!dojo.config.ieForceActiveXXhr){
try{
_4c=new XMLHttpRequest();
}
catch(e){
}
}
if(!_4c){
for(var i=0;i<3;++i){
var _4e=d._XMLHTTP_PROGIDS[i];
try{
_4c=new ActiveXObject(_4e);
}
catch(e){
_4d=e;
}
if(_4c){
d._XMLHTTP_PROGIDS=[_4e];
break;
}
}
}
if(!_4c){
throw new Error("XMLHTTP not available: "+_4d);
}
return _4c;
};
d._isDocumentOk=function(_4f){
var _50=_4f.status||0;
return (_50>=200&&_50<300)||_50==304||_50==1223||!_50;
};
var _51=window.location+"";
var _52=document.getElementsByTagName("base");
var _53=(_52&&_52.length>0);
d._getText=function(uri,_54){
var _55=d._xhrObj();
if(!_53&&dojo._Url){
uri=(new dojo._Url(_51,uri)).toString();
}
if(d.config.cacheBust){
uri+="";
uri+=(uri.indexOf("?")==-1?"?":"&")+String(d.config.cacheBust).replace(/\W+/g,"");
}
_55.open("GET",uri,false);
try{
_55.send(null);
if(!d._isDocumentOk(_55)){
var err=Error("Unable to load "+uri+" status:"+_55.status);
err.status=_55.status;
err.responseText=_55.responseText;
throw err;
}
}
catch(e){
if(_54){
return null;
}
throw e;
}
return _55.responseText;
};
var _56=window;
var _57=function(_58,fp){
var _59=_56.attachEvent||_56.addEventListener;
_58=_56.attachEvent?_58:_58.substring(2);
_59(_58,function(){
fp.apply(_56,arguments);
},false);
};
d._windowUnloaders=[];
d.windowUnloaded=function(){
var mll=d._windowUnloaders;
while(mll.length){
(mll.pop())();
}
d=null;
};
var _5a=0;
d.addOnWindowUnload=function(obj,_5b){
d._onto(d._windowUnloaders,obj,_5b);
if(!_5a){
_5a=1;
_57("onunload",d.windowUnloaded);
}
};
var _5c=0;
d.addOnUnload=function(obj,_5d){
d._onto(d._unloaders,obj,_5d);
if(!_5c){
_5c=1;
_57("onbeforeunload",dojo.unloaded);
}
};
})();
dojo._initFired=false;
dojo._loadInit=function(e){
if(dojo._scrollIntervalId){
clearInterval(dojo._scrollIntervalId);
dojo._scrollIntervalId=0;
}
if(!dojo._initFired){
dojo._initFired=true;
if(!dojo.config.afterOnLoad&&window.detachEvent){
window.detachEvent("onload",dojo._loadInit);
}
if(dojo._inFlightCount==0){
dojo._modulesLoaded();
}
}
};
if(!dojo.config.afterOnLoad){
if(document.addEventListener){
document.addEventListener("DOMContentLoaded",dojo._loadInit,false);
window.addEventListener("load",dojo._loadInit,false);
}else{
if(window.attachEvent){
window.attachEvent("onload",dojo._loadInit);
if(!dojo.config.skipIeDomLoaded&&self===self.top){
dojo._scrollIntervalId=setInterval(function(){
try{
if(document.body){
document.documentElement.doScroll("left");
dojo._loadInit();
}
}
catch(e){
}
},30);
}
}
}
}
if(dojo.isIE){
try{
(function(){
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
var _5e=["*","group","roundrect","oval","shape","rect","imagedata","path","textpath","text"],i=0,l=1,s=document.createStyleSheet();
if(dojo.isIE>=8){
i=1;
l=_5e.length;
}
for(;i<l;++i){
s.addRule("v\\:"+_5e[i],"behavior:url(#default#VML); display:inline-block");
}
})();
}
catch(e){
}
}
}
(function(){
var mp=dojo.config["modulePaths"];
if(mp){
for(var _5f in mp){
dojo.registerModulePath(_5f,mp[_5f]);
}
}
})();
if(dojo.config.isDebug){
dojo.require("dojo._firebug.firebug");
}
if(dojo.config.debugAtAllCosts){
dojo.require("dojo._base._loader.loader_debug");
}
dojo.provide("dojo._base.lang");
(function(){
var d=dojo,_60=Object.prototype.toString;
dojo.isString=function(it){
return (typeof it=="string"||it instanceof String);
};
dojo.isArray=function(it){
return it&&(it instanceof Array||typeof it=="array");
};
dojo.isFunction=function(it){
return _60.call(it)==="[object Function]";
};
dojo.isObject=function(it){
return it!==undefined&&(it===null||typeof it=="object"||d.isArray(it)||d.isFunction(it));
};
dojo.isArrayLike=function(it){
return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));
};
dojo.isAlien=function(it){
return it&&!d.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.extend=function(_61,_62){
for(var i=1,l=arguments.length;i<l;i++){
d._mixin(_61.prototype,arguments[i]);
}
return _61;
};
dojo._hitchArgs=function(_63,_64){
var pre=d._toArray(arguments,2);
var _65=d.isString(_64);
return function(){
var _66=d._toArray(arguments);
var f=_65?(_63||d.global)[_64]:_64;
return f&&f.apply(_63||this,pre.concat(_66));
};
};
dojo.hitch=function(_67,_68){
if(arguments.length>2){
return d._hitchArgs.apply(d,arguments);
}
if(!_68){
_68=_67;
_67=null;
}
if(d.isString(_68)){
_67=_67||d.global;
if(!_67[_68]){
throw (["dojo.hitch: scope[\"",_68,"\"] is null (scope=\"",_67,"\")"].join(""));
}
return function(){
return _67[_68].apply(_67,arguments||[]);
};
}
return !_67?_68:function(){
return _68.apply(_67,arguments||[]);
};
};
dojo.delegate=dojo._delegate=(function(){
function TMP(){
};
return function(obj,_69){
TMP.prototype=obj;
var tmp=new TMP();
TMP.prototype=null;
if(_69){
d._mixin(tmp,_69);
}
return tmp;
};
})();
var _6a=function(obj,_6b,_6c){
return (_6c||[]).concat(Array.prototype.slice.call(obj,_6b||0));
};
var _6d=function(obj,_6e,_6f){
var arr=_6f||[];
for(var x=_6e||0;x<obj.length;x++){
arr.push(obj[x]);
}
return arr;
};
dojo._toArray=d.isIE?function(obj){
return ((obj.item)?_6d:_6a).apply(this,arguments);
}:_6a;
dojo.partial=function(_70){
var arr=[null];
return d.hitch.apply(d,arr.concat(d._toArray(arguments)));
};
var _71=d._extraNames,_72=_71.length,_73={};
dojo.clone=function(o){
if(!o||typeof o!="object"||d.isFunction(o)){
return o;
}
if(o.nodeType&&"cloneNode" in o){
return o.cloneNode(true);
}
if(o instanceof Date){
return new Date(o.getTime());
}
if(o instanceof RegExp){
return new RegExp(o);
}
var r,i,l,s,_74;
if(d.isArray(o)){
r=[];
for(i=0,l=o.length;i<l;++i){
if(i in o){
r.push(d.clone(o[i]));
}
}
}else{
r=o.constructor?new o.constructor():{};
}
for(_74 in o){
s=o[_74];
if(!(_74 in r)||(r[_74]!==s&&(!(_74 in _73)||_73[_74]!==s))){
r[_74]=d.clone(s);
}
}
if(_72){
for(i=0;i<_72;++i){
_74=_71[i];
s=o[_74];
if(!(_74 in r)||(r[_74]!==s&&(!(_74 in _73)||_73[_74]!==s))){
r[_74]=s;
}
}
}
return r;
};
dojo.trim=String.prototype.trim?function(str){
return str.trim();
}:function(str){
return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");
};
var _75=/\{([^\}]+)\}/g;
dojo.replace=function(_76,map,_77){
return _76.replace(_77||_75,d.isFunction(map)?map:function(_78,k){
return d.getObject(k,false,map);
});
};
})();
dojo.provide("dojo._base.array");
(function(){
var _79=function(arr,obj,cb){
return [(typeof arr=="string")?arr.split(""):arr,obj||dojo.global,(typeof cb=="string")?new Function("item","index","array",cb):cb];
};
var _7a=function(_7b,arr,_7c,_7d){
var _7e=_79(arr,_7d,_7c);
arr=_7e[0];
for(var i=0,l=arr.length;i<l;++i){
var _7f=!!_7e[2].call(_7e[1],arr[i],i,arr);
if(_7b^_7f){
return _7f;
}
}
return _7b;
};
dojo.mixin(dojo,{indexOf:function(_80,_81,_82,_83){
var _84=1,end=_80.length||0,i=0;
if(_83){
i=end-1;
_84=end=-1;
}
if(_82!=undefined){
i=_82;
}
if((_83&&i>end)||i<end){
for(;i!=end;i+=_84){
if(_80[i]==_81){
return i;
}
}
}
return -1;
},lastIndexOf:function(_85,_86,_87){
return dojo.indexOf(_85,_86,_87,true);
},forEach:function(arr,_88,_89){
if(!arr||!arr.length){
return;
}
var _8a=_79(arr,_89,_88);
arr=_8a[0];
for(var i=0,l=arr.length;i<l;++i){
_8a[2].call(_8a[1],arr[i],i,arr);
}
},every:function(arr,_8b,_8c){
return _7a(true,arr,_8b,_8c);
},some:function(arr,_8d,_8e){
return _7a(false,arr,_8d,_8e);
},map:function(arr,_8f,_90){
var _91=_79(arr,_90,_8f);
arr=_91[0];
var _92=(arguments[3]?(new arguments[3]()):[]);
for(var i=0,l=arr.length;i<l;++i){
_92.push(_91[2].call(_91[1],arr[i],i,arr));
}
return _92;
},filter:function(arr,_93,_94){
var _95=_79(arr,_94,_93);
arr=_95[0];
var _96=[];
for(var i=0,l=arr.length;i<l;++i){
if(_95[2].call(_95[1],arr[i],i,arr)){
_96.push(arr[i]);
}
}
return _96;
}});
})();
dojo.provide("dojo._base.declare");
(function(){
var d=dojo,mix=d._mixin,op=Object.prototype,_97=op.toString,_98=new Function,_99=0,_9a="constructor";
function err(msg,cls){
throw new Error("declare"+(cls?" "+cls:"")+": "+msg);
};
function _9b(_9c,_9d){
var _9e=[],_9f=[{cls:0,refs:[]}],_a0={},_a1=1,l=_9c.length,i=0,j,lin,_a2,top,_a3,rec,_a4,_a5;
for(;i<l;++i){
_a2=_9c[i];
if(!_a2){
err("mixin #"+i+" is unknown. Did you use dojo.require to pull it in?",_9d);
}else{
if(_97.call(_a2)!="[object Function]"){
err("mixin #"+i+" is not a callable constructor.",_9d);
}
}
lin=_a2._meta?_a2._meta.bases:[_a2];
top=0;
for(j=lin.length-1;j>=0;--j){
_a3=lin[j].prototype;
if(!_a3.hasOwnProperty("declaredClass")){
_a3.declaredClass="uniqName_"+(_99++);
}
_a4=_a3.declaredClass;
if(!_a0.hasOwnProperty(_a4)){
_a0[_a4]={count:0,refs:[],cls:lin[j]};
++_a1;
}
rec=_a0[_a4];
if(top&&top!==rec){
rec.refs.push(top);
++top.count;
}
top=rec;
}
++top.count;
_9f[0].refs.push(top);
}
while(_9f.length){
top=_9f.pop();
_9e.push(top.cls);
--_a1;
while(_a5=top.refs,_a5.length==1){
top=_a5[0];
if(!top||--top.count){
top=0;
break;
}
_9e.push(top.cls);
--_a1;
}
if(top){
for(i=0,l=_a5.length;i<l;++i){
top=_a5[i];
if(!--top.count){
_9f.push(top);
}
}
}
}
if(_a1){
err("can't build consistent linearization",_9d);
}
_a2=_9c[0];
_9e[0]=_a2?_a2._meta&&_a2===_9e[_9e.length-_a2._meta.bases.length]?_a2._meta.bases.length:1:0;
return _9e;
};
function _a6(_a7,a,f){
var _a8,_a9,_aa,_ab,_ac,_ad,_ae,opf,pos,_af=this._inherited=this._inherited||{};
if(typeof _a7=="string"){
_a8=_a7;
_a7=a;
a=f;
}
f=0;
_ab=_a7.callee;
_a8=_a8||_ab.nom;
if(!_a8){
err("can't deduce a name to call inherited()",this.declaredClass);
}
_ac=this.constructor._meta;
_aa=_ac.bases;
pos=_af.p;
if(_a8!=_9a){
if(_af.c!==_ab){
pos=0;
_ad=_aa[0];
_ac=_ad._meta;
if(_ac.hidden[_a8]!==_ab){
_a9=_ac.chains;
if(_a9&&typeof _a9[_a8]=="string"){
err("calling chained method with inherited: "+_a8,this.declaredClass);
}
do{
_ac=_ad._meta;
_ae=_ad.prototype;
if(_ac&&(_ae[_a8]===_ab&&_ae.hasOwnProperty(_a8)||_ac.hidden[_a8]===_ab)){
break;
}
}while(_ad=_aa[++pos]);
pos=_ad?pos:-1;
}
}
_ad=_aa[++pos];
if(_ad){
_ae=_ad.prototype;
if(_ad._meta&&_ae.hasOwnProperty(_a8)){
f=_ae[_a8];
}else{
opf=op[_a8];
do{
_ae=_ad.prototype;
f=_ae[_a8];
if(f&&(_ad._meta?_ae.hasOwnProperty(_a8):f!==opf)){
break;
}
}while(_ad=_aa[++pos]);
}
}
f=_ad&&f||op[_a8];
}else{
if(_af.c!==_ab){
pos=0;
_ac=_aa[0]._meta;
if(_ac&&_ac.ctor!==_ab){
_a9=_ac.chains;
if(!_a9||_a9.constructor!=="manual"){
err("calling chained constructor with inherited",this.declaredClass);
}
while(_ad=_aa[++pos]){
_ac=_ad._meta;
if(_ac&&_ac.ctor===_ab){
break;
}
}
pos=_ad?pos:-1;
}
}
while(_ad=_aa[++pos]){
_ac=_ad._meta;
f=_ac?_ac.ctor:_ad;
if(f){
break;
}
}
f=_ad&&f;
}
_af.c=f;
_af.p=pos;
if(f){
return a===true?f:f.apply(this,a||_a7);
}
};
function _b0(_b1,_b2){
if(typeof _b1=="string"){
return this.inherited(_b1,_b2,true);
}
return this.inherited(_b1,true);
};
function _b3(cls){
var _b4=this.constructor._meta.bases;
for(var i=0,l=_b4.length;i<l;++i){
if(_b4[i]===cls){
return true;
}
}
return this instanceof cls;
};
function _b5(_b6,_b7){
var _b8,i=0,l=d._extraNames.length;
for(_b8 in _b7){
if(_b8!=_9a&&_b7.hasOwnProperty(_b8)){
_b6[_b8]=_b7[_b8];
}
}
for(;i<l;++i){
_b8=d._extraNames[i];
if(_b8!=_9a&&_b7.hasOwnProperty(_b8)){
_b6[_b8]=_b7[_b8];
}
}
};
function _b9(_ba,_bb){
var _bc,t,i=0,l=d._extraNames.length;
for(_bc in _bb){
t=_bb[_bc];
if((t!==op[_bc]||!(_bc in op))&&_bc!=_9a){
if(_97.call(t)=="[object Function]"){
t.nom=_bc;
}
_ba[_bc]=t;
}
}
for(;i<l;++i){
_bc=d._extraNames[i];
t=_bb[_bc];
if((t!==op[_bc]||!(_bc in op))&&_bc!=_9a){
if(_97.call(t)=="[object Function]"){
t.nom=_bc;
}
_ba[_bc]=t;
}
}
return _ba;
};
function _bd(_be){
_b9(this.prototype,_be);
return this;
};
function _bf(_c0,_c1){
return function(){
var a=arguments,_c2=a,a0=a[0],f,i,m,l=_c0.length,_c3;
if(!(this instanceof a.callee)){
return _c4(a);
}
if(_c1&&(a0&&a0.preamble||this.preamble)){
_c3=new Array(_c0.length);
_c3[0]=a;
for(i=0;;){
a0=a[0];
if(a0){
f=a0.preamble;
if(f){
a=f.apply(this,a)||a;
}
}
f=_c0[i].prototype;
f=f.hasOwnProperty("preamble")&&f.preamble;
if(f){
a=f.apply(this,a)||a;
}
if(++i==l){
break;
}
_c3[i]=a;
}
}
for(i=l-1;i>=0;--i){
f=_c0[i];
m=f._meta;
f=m?m.ctor:f;
if(f){
f.apply(this,_c3?_c3[i]:a);
}
}
f=this.postscript;
if(f){
f.apply(this,_c2);
}
};
};
function _c5(_c6,_c7){
return function(){
var a=arguments,t=a,a0=a[0],f;
if(!(this instanceof a.callee)){
return _c4(a);
}
if(_c7){
if(a0){
f=a0.preamble;
if(f){
t=f.apply(this,t)||t;
}
}
f=this.preamble;
if(f){
f.apply(this,t);
}
}
if(_c6){
_c6.apply(this,a);
}
f=this.postscript;
if(f){
f.apply(this,a);
}
};
};
function _c8(_c9){
return function(){
var a=arguments,i=0,f,m;
if(!(this instanceof a.callee)){
return _c4(a);
}
for(;f=_c9[i];++i){
m=f._meta;
f=m?m.ctor:f;
if(f){
f.apply(this,a);
break;
}
}
f=this.postscript;
if(f){
f.apply(this,a);
}
};
};
function _ca(_cb,_cc,_cd){
return function(){
var b,m,f,i=0,_ce=1;
if(_cd){
i=_cc.length-1;
_ce=-1;
}
for(;b=_cc[i];i+=_ce){
m=b._meta;
f=(m?m.hidden:b.prototype)[_cb];
if(f){
f.apply(this,arguments);
}
}
};
};
function _cf(_d0){
_98.prototype=_d0.prototype;
var t=new _98;
_98.prototype=null;
return t;
};
function _c4(_d1){
var _d2=_d1.callee,t=_cf(_d2);
_d2.apply(t,_d1);
return t;
};
d.declare=function(_d3,_d4,_d5){
if(typeof _d3!="string"){
_d5=_d4;
_d4=_d3;
_d3="";
}
_d5=_d5||{};
var _d6,i,t,_d7,_d8,_d9,_da,_db=1,_dc=_d4;
if(_97.call(_d4)=="[object Array]"){
_d9=_9b(_d4,_d3);
t=_d9[0];
_db=_d9.length-t;
_d4=_d9[_db];
}else{
_d9=[0];
if(_d4){
if(_97.call(_d4)=="[object Function]"){
t=_d4._meta;
_d9=_d9.concat(t?t.bases:_d4);
}else{
err("base class is not a callable constructor.",_d3);
}
}else{
if(_d4!==null){
err("unknown base class. Did you use dojo.require to pull it in?",_d3);
}
}
}
if(_d4){
for(i=_db-1;;--i){
_d6=_cf(_d4);
if(!i){
break;
}
t=_d9[i];
(t._meta?_b5:mix)(_d6,t.prototype);
_d7=new Function;
_d7.superclass=_d4;
_d7.prototype=_d6;
_d4=_d6.constructor=_d7;
}
}else{
_d6={};
}
_b9(_d6,_d5);
t=_d5.constructor;
if(t!==op.constructor){
t.nom=_9a;
_d6.constructor=t;
}
for(i=_db-1;i;--i){
t=_d9[i]._meta;
if(t&&t.chains){
_da=mix(_da||{},t.chains);
}
}
if(_d6["-chains-"]){
_da=mix(_da||{},_d6["-chains-"]);
}
t=!_da||!_da.hasOwnProperty(_9a);
_d9[0]=_d7=(_da&&_da.constructor==="manual")?_c8(_d9):(_d9.length==1?_c5(_d5.constructor,t):_bf(_d9,t));
_d7._meta={bases:_d9,hidden:_d5,chains:_da,parents:_dc,ctor:_d5.constructor};
_d7.superclass=_d4&&_d4.prototype;
_d7.extend=_bd;
_d7.prototype=_d6;
_d6.constructor=_d7;
_d6.getInherited=_b0;
_d6.inherited=_a6;
_d6.isInstanceOf=_b3;
if(_d3){
_d6.declaredClass=_d3;
d.setObject(_d3,_d7);
}
if(_da){
for(_d8 in _da){
if(_d6[_d8]&&typeof _da[_d8]=="string"&&_d8!=_9a){
t=_d6[_d8]=_ca(_d8,_d9,_da[_d8]==="after");
t.nom=_d8;
}
}
}
return _d7;
};
d.safeMixin=_b9;
})();
dojo.provide("dojo._base.connect");
dojo._listener={getDispatcher:function(){
return function(){
var ap=Array.prototype,c=arguments.callee,ls=c._listeners,t=c.target,r=t&&t.apply(this,arguments),i,lls=[].concat(ls);
for(i in lls){
if(!(i in ap)){
lls[i].apply(this,arguments);
}
}
return r;
};
},add:function(_dd,_de,_df){
_dd=_dd||dojo.global;
var f=_dd[_de];
if(!f||!f._listeners){
var d=dojo._listener.getDispatcher();
d.target=f;
d._listeners=[];
f=_dd[_de]=d;
}
return f._listeners.push(_df);
},remove:function(_e0,_e1,_e2){
var f=(_e0||dojo.global)[_e1];
if(f&&f._listeners&&_e2--){
delete f._listeners[_e2];
}
}};
dojo.connect=function(obj,_e3,_e4,_e5,_e6){
var a=arguments,_e7=[],i=0;
_e7.push(dojo.isString(a[0])?null:a[i++],a[i++]);
var a1=a[i+1];
_e7.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);
for(var l=a.length;i<l;i++){
_e7.push(a[i]);
}
return dojo._connect.apply(this,_e7);
};
dojo._connect=function(obj,_e8,_e9,_ea){
var l=dojo._listener,h=l.add(obj,_e8,dojo.hitch(_e9,_ea));
return [obj,_e8,h,l];
};
dojo.disconnect=function(_eb){
if(_eb&&_eb[0]!==undefined){
dojo._disconnect.apply(this,_eb);
delete _eb[0];
}
};
dojo._disconnect=function(obj,_ec,_ed,_ee){
_ee.remove(obj,_ec,_ed);
};
dojo._topics={};
dojo.subscribe=function(_ef,_f0,_f1){
return [_ef,dojo._listener.add(dojo._topics,_ef,dojo.hitch(_f0,_f1))];
};
dojo.unsubscribe=function(_f2){
if(_f2){
dojo._listener.remove(dojo._topics,_f2[0],_f2[1]);
}
};
dojo.publish=function(_f3,_f4){
var f=dojo._topics[_f3];
if(f){
f.apply(this,_f4||[]);
}
};
dojo.connectPublisher=function(_f5,obj,_f6){
var pf=function(){
dojo.publish(_f5,arguments);
};
return _f6?dojo.connect(obj,_f6,pf):dojo.connect(obj,pf);
};
dojo.provide("dojo._base.Deferred");
(function(){
var _f7=function(){
};
var _f8=Object.freeze||function(){
};
dojo.Deferred=function(_f9){
var _fa,_fb,_fc,_fd,_fe;
var _ff=(this.promise={});
function _100(_101){
if(_fb){
throw new Error("This deferred has already been resolved");
}
_fa=_101;
_fb=true;
_102();
};
function _102(){
var _103;
while(!_103&&_fe){
var _104=_fe;
_fe=_fe.next;
if((_103=(_104.progress==_f7))){
_fb=false;
}
var func=(_fc?_104.error:_104.resolved);
if(func){
try{
var _105=func(_fa);
if(_105&&typeof _105.then==="function"){
_105.then(dojo.hitch(_104.deferred,"resolve"),dojo.hitch(_104.deferred,"reject"));
continue;
}
var _106=_103&&_105===undefined;
if(_103&&!_106){
_fc=_105 instanceof Error;
}
_104.deferred[_106&&_fc?"reject":"resolve"](_106?_fa:_105);
}
catch(e){
_104.deferred.reject(e);
}
}else{
if(_fc){
_104.deferred.reject(_fa);
}else{
_104.deferred.resolve(_fa);
}
}
}
};
this.resolve=this.callback=function(_107){
this.fired=0;
this.results=[_107,null];
_100(_107);
};
this.reject=this.errback=function(_108){
_fc=true;
this.fired=1;
_100(_108);
this.results=[null,_108];
if(!_108||_108.log!==false){
(dojo.config.deferredOnError||function(x){
})(_108);
}
};
this.progress=function(_109){
var _10a=_fe;
while(_10a){
var _10b=_10a.progress;
_10b&&_10b(_109);
_10a=_10a.next;
}
};
this.addCallbacks=function(_10c,_10d){
this.then(_10c,_10d,_f7);
return this;
};
this.then=_ff.then=function(_10e,_10f,_110){
var _111=_110==_f7?this:new dojo.Deferred(_ff.cancel);
var _112={resolved:_10e,error:_10f,progress:_110,deferred:_111};
if(_fe){
_fd=_fd.next=_112;
}else{
_fe=_fd=_112;
}
if(_fb){
_102();
}
return _111.promise;
};
var _113=this;
this.cancel=_ff.cancel=function(){
if(!_fb){
var _114=_f9&&_f9(_113);
if(!_fb){
if(!(_114 instanceof Error)){
_114=new Error(_114);
}
_114.log=false;
_113.reject(_114);
}
}
};
_f8(_ff);
};
dojo.extend(dojo.Deferred,{addCallback:function(_115){
return this.addCallbacks(dojo.hitch.apply(dojo,arguments));
},addErrback:function(_116){
return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));
},addBoth:function(_117){
var _118=dojo.hitch.apply(dojo,arguments);
return this.addCallbacks(_118,_118);
},fired:-1});
})();
dojo.when=function(_119,_11a,_11b,_11c){
if(_119&&typeof _119.then==="function"){
return _119.then(_11a,_11b,_11c);
}
return _11a(_119);
};
dojo.provide("dojo._base.json");
dojo.fromJson=function(json){
return eval("("+json+")");
};
dojo._escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.toJsonIndentStr="\t";
dojo.toJson=function(it,_11d,_11e){
if(it===undefined){
return "undefined";
}
var _11f=typeof it;
if(_11f=="number"||_11f=="boolean"){
return it+"";
}
if(it===null){
return "null";
}
if(dojo.isString(it)){
return dojo._escapeString(it);
}
var _120=arguments.callee;
var _121;
_11e=_11e||"";
var _122=_11d?_11e+dojo.toJsonIndentStr:"";
var tf=it.__json__||it.json;
if(dojo.isFunction(tf)){
_121=tf.call(it);
if(it!==_121){
return _120(_121,_11d,_122);
}
}
if(it.nodeType&&it.cloneNode){
throw new Error("Can't serialize DOM nodes");
}
var sep=_11d?" ":"";
var _123=_11d?"\n":"";
if(dojo.isArray(it)){
var res=dojo.map(it,function(obj){
var val=_120(obj,_11d,_122);
if(typeof val!="string"){
val="undefined";
}
return _123+_122+val;
});
return "["+res.join(","+sep)+_123+_11e+"]";
}
if(_11f=="function"){
return null;
}
var _124=[],key;
for(key in it){
var _125,val;
if(typeof key=="number"){
_125="\""+key+"\"";
}else{
if(typeof key=="string"){
_125=dojo._escapeString(key);
}else{
continue;
}
}
val=_120(it[key],_11d,_122);
if(typeof val!="string"){
continue;
}
_124.push(_123+_122+_125+":"+sep+val);
}
return "{"+_124.join(","+sep)+_123+_11e+"}";
};
dojo.provide("dojo._base.Color");
(function(){
var d=dojo;
dojo.Color=function(_126){
if(_126){
this.setColor(_126);
}
};
dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:d.config.transparentColor||[255,255,255]};
dojo.extend(dojo.Color,{r:255,g:255,b:255,a:1,_set:function(r,g,b,a){
var t=this;
t.r=r;
t.g=g;
t.b=b;
t.a=a;
},setColor:function(_127){
if(d.isString(_127)){
d.colorFromString(_127,this);
}else{
if(d.isArray(_127)){
d.colorFromArray(_127,this);
}else{
this._set(_127.r,_127.g,_127.b,_127.a);
if(!(_127 instanceof d.Color)){
this.sanitize();
}
}
}
return this;
},sanitize:function(){
return this;
},toRgb:function(){
var t=this;
return [t.r,t.g,t.b];
},toRgba:function(){
var t=this;
return [t.r,t.g,t.b,t.a];
},toHex:function(){
var arr=d.map(["r","g","b"],function(x){
var s=this[x].toString(16);
return s.length<2?"0"+s:s;
},this);
return "#"+arr.join("");
},toCss:function(_128){
var t=this,rgb=t.r+", "+t.g+", "+t.b;
return (_128?"rgba("+rgb+", "+t.a:"rgb("+rgb)+")";
},toString:function(){
return this.toCss(true);
}});
dojo.blendColors=function(_129,end,_12a,obj){
var t=obj||new d.Color();
d.forEach(["r","g","b","a"],function(x){
t[x]=_129[x]+(end[x]-_129[x])*_12a;
if(x!="a"){
t[x]=Math.round(t[x]);
}
});
return t.sanitize();
};
dojo.colorFromRgb=function(_12b,obj){
var m=_12b.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
return m&&dojo.colorFromArray(m[1].split(/\s*,\s*/),obj);
};
dojo.colorFromHex=function(_12c,obj){
var t=obj||new d.Color(),bits=(_12c.length==4)?4:8,mask=(1<<bits)-1;
_12c=Number("0x"+_12c.substr(1));
if(isNaN(_12c)){
return null;
}
d.forEach(["b","g","r"],function(x){
var c=_12c&mask;
_12c>>=bits;
t[x]=bits==4?17*c:c;
});
t.a=1;
return t;
};
dojo.colorFromArray=function(a,obj){
var t=obj||new d.Color();
t._set(Number(a[0]),Number(a[1]),Number(a[2]),Number(a[3]));
if(isNaN(t.a)){
t.a=1;
}
return t.sanitize();
};
dojo.colorFromString=function(str,obj){
var a=d.Color.named[str];
return a&&d.colorFromArray(a,obj)||d.colorFromRgb(str,obj)||d.colorFromHex(str,obj);
};
})();
dojo.provide("dojo._base.window");
dojo.doc=window["document"]||null;
dojo.body=function(){
return dojo.doc.body||dojo.doc.getElementsByTagName("body")[0];
};
dojo.setContext=function(_12d,_12e){
dojo.global=_12d;
dojo.doc=_12e;
};
dojo.withGlobal=function(_12f,_130,_131,_132){
var _133=dojo.global;
try{
dojo.global=_12f;
return dojo.withDoc.call(null,_12f.document,_130,_131,_132);
}
finally{
dojo.global=_133;
}
};
dojo.withDoc=function(_134,_135,_136,_137){
var _138=dojo.doc,_139=dojo._bodyLtr,oldQ=dojo.isQuirks;
try{
dojo.doc=_134;
delete dojo._bodyLtr;
dojo.isQuirks=dojo.doc.compatMode=="BackCompat";
if(_136&&typeof _135=="string"){
_135=_136[_135];
}
return _135.apply(_136,_137||[]);
}
finally{
dojo.doc=_138;
delete dojo._bodyLtr;
if(_139!==undefined){
dojo._bodyLtr=_139;
}
dojo.isQuirks=oldQ;
}
};
dojo.provide("dojo._base.event");
(function(){
var del=(dojo._event_listener={add:function(node,name,fp){
if(!node){
return;
}
name=del._normalizeEventName(name);
fp=del._fixCallback(name,fp);
var _13a=name;
if(!dojo.isIE&&(name=="mouseenter"||name=="mouseleave")){
var ofp=fp;
name=(name=="mouseenter")?"mouseover":"mouseout";
fp=function(e){
if(!dojo.isDescendant(e.relatedTarget,node)){
return ofp.call(this,e);
}
};
}
node.addEventListener(name,fp,false);
return fp;
},remove:function(node,_13b,_13c){
if(node){
_13b=del._normalizeEventName(_13b);
if(!dojo.isIE&&(_13b=="mouseenter"||_13b=="mouseleave")){
_13b=(_13b=="mouseenter")?"mouseover":"mouseout";
}
node.removeEventListener(_13b,_13c,false);
}
},_normalizeEventName:function(name){
return name.slice(0,2)=="on"?name.slice(2):name;
},_fixCallback:function(name,fp){
return name!="keypress"?fp:function(e){
return fp.call(this,del._fixEvent(e,this));
};
},_fixEvent:function(evt,_13d){
switch(evt.type){
case "keypress":
del._setKeyChar(evt);
break;
}
return evt;
},_setKeyChar:function(evt){
evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39}});
dojo.fixEvent=function(evt,_13e){
return del._fixEvent(evt,_13e);
};
dojo.stopEvent=function(evt){
evt.preventDefault();
evt.stopPropagation();
};
var _13f=dojo._listener;
dojo._connect=function(obj,_140,_141,_142,_143){
var _144=obj&&(obj.nodeType||obj.attachEvent||obj.addEventListener);
var lid=_144?(_143?2:1):0,l=[dojo._listener,del,_13f][lid];
var h=l.add(obj,_140,dojo.hitch(_141,_142));
return [obj,_140,h,lid];
};
dojo._disconnect=function(obj,_145,_146,_147){
([dojo._listener,del,_13f][_147]).remove(obj,_145,_146);
};
dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,META:dojo.isSafari?91:224,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145,copyKey:dojo.isMac&&!dojo.isAIR?(dojo.isSafari?91:224):17};
var _148=dojo.isMac?"metaKey":"ctrlKey";
dojo.isCopyKey=function(e){
return e[_148];
};
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
dojo.mouseButtons={LEFT:1,MIDDLE:4,RIGHT:2,isButton:function(e,_149){
return e.button&_149;
},isLeft:function(e){
return e.button&1;
},isMiddle:function(e){
return e.button&4;
},isRight:function(e){
return e.button&2;
}};
}else{
dojo.mouseButtons={LEFT:0,MIDDLE:1,RIGHT:2,isButton:function(e,_14a){
return e.button==_14a;
},isLeft:function(e){
return e.button==0;
},isMiddle:function(e){
return e.button==1;
},isRight:function(e){
return e.button==2;
}};
}
if(dojo.isIE){
var _14b=function(e,code){
try{
return (e.keyCode=code);
}
catch(e){
return 0;
}
};
var iel=dojo._listener;
var _14c=(dojo._ieListenersName="_"+dojo._scopeName+"_listeners");
if(!dojo.config._allow_leaks){
_13f=iel=dojo._ie_listener={handlers:[],add:function(_14d,_14e,_14f){
_14d=_14d||dojo.global;
var f=_14d[_14e];
if(!f||!f[_14c]){
var d=dojo._getIeDispatcher();
d.target=f&&(ieh.push(f)-1);
d[_14c]=[];
f=_14d[_14e]=d;
}
return f[_14c].push(ieh.push(_14f)-1);
},remove:function(_150,_151,_152){
var f=(_150||dojo.global)[_151],l=f&&f[_14c];
if(f&&l&&_152--){
delete ieh[l[_152]];
delete l[_152];
}
}};
var ieh=iel.handlers;
}
dojo.mixin(del,{add:function(node,_153,fp){
if(!node){
return;
}
_153=del._normalizeEventName(_153);
if(_153=="onkeypress"){
var kd=node.onkeydown;
if(!kd||!kd[_14c]||!kd._stealthKeydownHandle){
var h=del.add(node,"onkeydown",del._stealthKeyDown);
kd=node.onkeydown;
kd._stealthKeydownHandle=h;
kd._stealthKeydownRefs=1;
}else{
kd._stealthKeydownRefs++;
}
}
return iel.add(node,_153,del._fixCallback(fp));
},remove:function(node,_154,_155){
_154=del._normalizeEventName(_154);
iel.remove(node,_154,_155);
if(_154=="onkeypress"){
var kd=node.onkeydown;
if(--kd._stealthKeydownRefs<=0){
iel.remove(node,"onkeydown",kd._stealthKeydownHandle);
delete kd._stealthKeydownHandle;
}
}
},_normalizeEventName:function(_156){
return _156.slice(0,2)!="on"?"on"+_156:_156;
},_nop:function(){
},_fixEvent:function(evt,_157){
if(!evt){
var w=_157&&(_157.ownerDocument||_157.document||_157).parentWindow||window;
evt=w.event;
}
if(!evt){
return (evt);
}
evt.target=evt.srcElement;
evt.currentTarget=(_157||evt.srcElement);
evt.layerX=evt.offsetX;
evt.layerY=evt.offsetY;
var se=evt.srcElement,doc=(se&&se.ownerDocument)||document;
var _158=((dojo.isIE<6)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
var _159=dojo._getIeDocumentElementOffset();
evt.pageX=evt.clientX+dojo._fixIeBiDiScrollLeft(_158.scrollLeft||0)-_159.x;
evt.pageY=evt.clientY+(_158.scrollTop||0)-_159.y;
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
if(dojo.isIE<9||dojo.isQuirks){
evt.stopPropagation=del._stopPropagation;
evt.preventDefault=del._preventDefault;
}
return del._fixKeys(evt);
},_fixKeys:function(evt){
switch(evt.type){
case "keypress":
var c=("charCode" in evt?evt.charCode:evt.keyCode);
if(c==10){
c=0;
evt.keyCode=13;
}else{
if(c==13||c==27){
c=0;
}else{
if(c==3){
c=99;
}
}
}
evt.charCode=c;
del._setKeyChar(evt);
break;
}
return evt;
},_stealthKeyDown:function(evt){
var kp=evt.currentTarget.onkeypress;
if(!kp||!kp[_14c]){
return;
}
var k=evt.keyCode;
var _15a=k!=13&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_15a||evt.ctrlKey){
var c=_15a?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return;
}else{
if(c>95&&c<106){
c-=48;
}else{
if((!evt.shiftKey)&&(c>=65&&c<=90)){
c+=32;
}else{
c=del._punctMap[c]||c;
}
}
}
}
var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});
kp.call(evt.currentTarget,faux);
evt.cancelBubble=faux.cancelBubble;
evt.returnValue=faux.returnValue;
_14b(evt,faux.keyCode);
}
},_stopPropagation:function(){
this.cancelBubble=true;
},_preventDefault:function(){
this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){
_14b(this,0);
}
this.returnValue=false;
}});
dojo.stopEvent=(dojo.isIE<9||dojo.isQuirks)?function(evt){
evt=evt||window.event;
del._stopPropagation.call(evt);
del._preventDefault.call(evt);
}:dojo.stopEvent;
}
del._synthesizeEvent=function(evt,_15b){
var faux=dojo.mixin({},evt,_15b);
del._setKeyChar(faux);
faux.preventDefault=function(){
evt.preventDefault();
};
faux.stopPropagation=function(){
evt.stopPropagation();
};
return faux;
};
if(dojo.isOpera){
dojo.mixin(del,{_fixEvent:function(evt,_15c){
switch(evt.type){
case "keypress":
var c=evt.which;
if(c==3){
c=99;
}
c=c<41&&!evt.shiftKey?0:c;
if(evt.ctrlKey&&!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}
return del._synthesizeEvent(evt,{charCode:c});
}
return evt;
}});
}
if(dojo.isWebKit){
del._add=del.add;
del._remove=del.remove;
dojo.mixin(del,{add:function(node,_15d,fp){
if(!node){
return;
}
var _15e=del._add(node,_15d,fp);
if(del._normalizeEventName(_15d)=="keypress"){
_15e._stealthKeyDownHandle=del._add(node,"keydown",function(evt){
var k=evt.keyCode;
var _15f=k!=13&&k!=32&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_15f||evt.ctrlKey){
var c=_15f?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return;
}else{
if(c>95&&c<106){
c-=48;
}else{
if(!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}else{
c=del._punctMap[c]||c;
}
}
}
}
var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});
fp.call(evt.currentTarget,faux);
}
});
}
return _15e;
},remove:function(node,_160,_161){
if(node){
if(_161._stealthKeyDownHandle){
del._remove(node,"keydown",_161._stealthKeyDownHandle);
}
del._remove(node,_160,_161);
}
},_fixEvent:function(evt,_162){
switch(evt.type){
case "keypress":
if(evt.faux){
return evt;
}
var c=evt.charCode;
c=c>=32?c:0;
return del._synthesizeEvent(evt,{charCode:c,faux:true});
}
return evt;
}});
}
})();
if(dojo.isIE){
dojo._ieDispatcher=function(args,_163){
var ap=Array.prototype,h=dojo._ie_listener.handlers,c=args.callee,ls=c[dojo._ieListenersName],t=h[c.target];
var r=t&&t.apply(_163,args);
var lls=[].concat(ls);
for(var i in lls){
var f=h[lls[i]];
if(!(i in ap)&&f){
f.apply(_163,args);
}
}
return r;
};
dojo._getIeDispatcher=function(){
return new Function(dojo._scopeName+"._ieDispatcher(arguments, this)");
};
dojo._event_listener._fixCallback=function(fp){
var f=dojo._event_listener._fixEvent;
return function(e){
return fp.call(this,f(e,this));
};
};
}
dojo.provide("dojo._base.html");
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
if(dojo.isIE){
dojo.byId=function(id,doc){
if(typeof id!="string"){
return id;
}
var _164=doc||dojo.doc,te=_164.getElementById(id);
if(te&&(te.attributes.id.value==id||te.id==id)){
return te;
}else{
var eles=_164.all[id];
if(!eles||eles.nodeName){
eles=[eles];
}
var i=0;
while((te=eles[i++])){
if((te.attributes&&te.attributes.id&&te.attributes.id.value==id)||te.id==id){
return te;
}
}
}
};
}else{
dojo.byId=function(id,doc){
return ((typeof id=="string")?(doc||dojo.doc).getElementById(id):id)||null;
};
}
(function(){
var d=dojo;
var byId=d.byId;
var _165=null,_166;
d.addOnWindowUnload(function(){
_165=null;
});
dojo._destroyElement=dojo.destroy=function(node){
node=byId(node);
try{
var doc=node.ownerDocument;
if(!_165||_166!=doc){
_165=doc.createElement("div");
_166=doc;
}
_165.appendChild(node.parentNode?node.parentNode.removeChild(node):node);
_165.innerHTML="";
}
catch(e){
}
};
dojo.isDescendant=function(node,_167){
try{
node=byId(node);
_167=byId(_167);
while(node){
if(node==_167){
return true;
}
node=node.parentNode;
}
}
catch(e){
}
return false;
};
dojo.setSelectable=function(node,_168){
node=byId(node);
if(d.isMozilla){
node.style.MozUserSelect=_168?"":"none";
}else{
if(d.isKhtml||d.isWebKit){
node.style.KhtmlUserSelect=_168?"auto":"none";
}else{
if(d.isIE){
var v=(node.unselectable=_168?"":"on");
d.query("*",node).forEach("item.unselectable = '"+v+"'");
}
}
}
};
var _169=function(node,ref){
var _16a=ref.parentNode;
if(_16a){
_16a.insertBefore(node,ref);
}
};
var _16b=function(node,ref){
var _16c=ref.parentNode;
if(_16c){
if(_16c.lastChild==ref){
_16c.appendChild(node);
}else{
_16c.insertBefore(node,ref.nextSibling);
}
}
};
dojo.place=function(node,_16d,_16e){
_16d=byId(_16d);
if(typeof node=="string"){
node=/^\s*</.test(node)?d._toDom(node,_16d.ownerDocument):byId(node);
}
if(typeof _16e=="number"){
var cn=_16d.childNodes;
if(!cn.length||cn.length<=_16e){
_16d.appendChild(node);
}else{
_169(node,cn[_16e<0?0:_16e]);
}
}else{
switch(_16e){
case "before":
_169(node,_16d);
break;
case "after":
_16b(node,_16d);
break;
case "replace":
_16d.parentNode.replaceChild(node,_16d);
break;
case "only":
d.empty(_16d);
_16d.appendChild(node);
break;
case "first":
if(_16d.firstChild){
_169(node,_16d.firstChild);
break;
}
default:
_16d.appendChild(node);
}
}
return node;
};
dojo.boxModel="content-box";
if(d.isIE){
d.boxModel=document.compatMode=="BackCompat"?"border-box":"content-box";
}
var gcs;
if(d.isWebKit){
gcs=function(node){
var s;
if(node.nodeType==1){
var dv=node.ownerDocument.defaultView;
s=dv.getComputedStyle(node,null);
if(!s&&node.style){
node.style.display="";
s=dv.getComputedStyle(node,null);
}
}
return s||{};
};
}else{
if(d.isIE){
gcs=function(node){
return node.nodeType==1?node.currentStyle:{};
};
}else{
gcs=function(node){
return node.nodeType==1?node.ownerDocument.defaultView.getComputedStyle(node,null):{};
};
}
}
dojo.getComputedStyle=gcs;
if(!d.isIE){
d._toPixelValue=function(_16f,_170){
return parseFloat(_170)||0;
};
}else{
d._toPixelValue=function(_171,_172){
if(!_172){
return 0;
}
if(_172=="medium"){
return 4;
}
if(_172.slice&&_172.slice(-2)=="px"){
return parseFloat(_172);
}
with(_171){
var _173=style.left;
var _174=runtimeStyle.left;
runtimeStyle.left=currentStyle.left;
try{
style.left=_172;
_172=style.pixelLeft;
}
catch(e){
_172=0;
}
style.left=_173;
runtimeStyle.left=_174;
}
return _172;
};
}
var px=d._toPixelValue;
var astr="DXImageTransform.Microsoft.Alpha";
var af=function(n,f){
try{
return n.filters.item(astr);
}
catch(e){
return f?{}:null;
}
};
dojo._getOpacity=d.isIE?function(node){
try{
return af(node).Opacity/100;
}
catch(e){
return 1;
}
}:function(node){
return gcs(node).opacity;
};
dojo._setOpacity=d.isIE?function(node,_175){
var ov=_175*100,_176=_175==1;
node.style.zoom=_176?"":1;
if(!af(node)){
if(_176){
return _175;
}
node.style.filter+=" progid:"+astr+"(Opacity="+ov+")";
}else{
af(node,1).Opacity=ov;
}
af(node,1).Enabled=!_176;
if(node.nodeName.toLowerCase()=="tr"){
d.query("> td",node).forEach(function(i){
d._setOpacity(i,_175);
});
}
return _175;
}:function(node,_177){
return node.style.opacity=_177;
};
var _178={left:true,top:true};
var _179=/margin|padding|width|height|max|min|offset/;
var _17a=function(node,type,_17b){
type=type.toLowerCase();
if(d.isIE){
if(_17b=="auto"){
if(type=="height"){
return node.offsetHeight;
}
if(type=="width"){
return node.offsetWidth;
}
}
if(type=="fontweight"){
switch(_17b){
case 700:
return "bold";
case 400:
default:
return "normal";
}
}
}
if(!(type in _178)){
_178[type]=_179.test(type);
}
return _178[type]?px(node,_17b):_17b;
};
var _17c=d.isIE?"styleFloat":"cssFloat",_17d={"cssFloat":_17c,"styleFloat":_17c,"float":_17c};
dojo.style=function(node,_17e,_17f){
var n=byId(node),args=arguments.length,op=(_17e=="opacity");
_17e=_17d[_17e]||_17e;
if(args==3){
return op?d._setOpacity(n,_17f):n.style[_17e]=_17f;
}
if(args==2&&op){
return d._getOpacity(n);
}
var s=gcs(n);
if(args==2&&typeof _17e!="string"){
for(var x in _17e){
d.style(node,x,_17e[x]);
}
return s;
}
return (args==1)?s:_17a(n,_17e,s[_17e]||n.style[_17e]);
};
dojo._getPadExtents=function(n,_180){
var s=_180||gcs(n),l=px(n,s.paddingLeft),t=px(n,s.paddingTop);
return {l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};
};
dojo._getBorderExtents=function(n,_181){
var ne="none",s=_181||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);
return {l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};
};
dojo._getPadBorderExtents=function(n,_182){
var s=_182||gcs(n),p=d._getPadExtents(n,s),b=d._getBorderExtents(n,s);
return {l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};
};
dojo._getMarginExtents=function(n,_183){
var s=_183||gcs(n),l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);
if(d.isWebKit&&(s.position!="absolute")){
r=l;
}
return {l:l,t:t,w:l+r,h:t+b};
};
dojo._getMarginBox=function(node,_184){
var s=_184||gcs(node),me=d._getMarginExtents(node,s);
var l=node.offsetLeft-me.l,t=node.offsetTop-me.t,p=node.parentNode;
if(d.isMoz){
var sl=parseFloat(s.left),st=parseFloat(s.top);
if(!isNaN(sl)&&!isNaN(st)){
l=sl,t=st;
}else{
if(p&&p.style){
var pcs=gcs(p);
if(pcs.overflow!="visible"){
var be=d._getBorderExtents(p,pcs);
l+=be.l,t+=be.t;
}
}
}
}else{
if(d.isOpera||(d.isIE>7&&!d.isQuirks)){
if(p){
be=d._getBorderExtents(p);
l-=be.l;
t-=be.t;
}
}
}
return {l:l,t:t,w:node.offsetWidth+me.w,h:node.offsetHeight+me.h};
};
dojo._getMarginSize=function(node,_185){
node=byId(node);
var me=d._getMarginExtents(node,_185||gcs(node));
var size=node.getBoundingClientRect();
return {w:(size.right-size.left)+me.w,h:(size.bottom-size.top)+me.h};
};
dojo._getContentBox=function(node,_186){
var s=_186||gcs(node),pe=d._getPadExtents(node,s),be=d._getBorderExtents(node,s),w=node.clientWidth,h;
if(!w){
w=node.offsetWidth,h=node.offsetHeight;
}else{
h=node.clientHeight,be.w=be.h=0;
}
if(d.isOpera){
pe.l+=be.l;
pe.t+=be.t;
}
return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};
};
dojo._getBorderBox=function(node,_187){
var s=_187||gcs(node),pe=d._getPadExtents(node,s),cb=d._getContentBox(node,s);
return {l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h};
};
dojo._setBox=function(node,l,t,w,h,u){
u=u||"px";
var s=node.style;
if(!isNaN(l)){
s.left=l+u;
}
if(!isNaN(t)){
s.top=t+u;
}
if(w>=0){
s.width=w+u;
}
if(h>=0){
s.height=h+u;
}
};
dojo._isButtonTag=function(node){
return node.tagName=="BUTTON"||node.tagName=="INPUT"&&(node.getAttribute("type")||"").toUpperCase()=="BUTTON";
};
dojo._usesBorderBox=function(node){
var n=node.tagName;
return d.boxModel=="border-box"||n=="TABLE"||d._isButtonTag(node);
};
dojo._setContentSize=function(node,_188,_189,_18a){
if(d._usesBorderBox(node)){
var pb=d._getPadBorderExtents(node,_18a);
if(_188>=0){
_188+=pb.w;
}
if(_189>=0){
_189+=pb.h;
}
}
d._setBox(node,NaN,NaN,_188,_189);
};
dojo._setMarginBox=function(node,_18b,_18c,_18d,_18e,_18f){
var s=_18f||gcs(node),bb=d._usesBorderBox(node),pb=bb?_190:d._getPadBorderExtents(node,s);
if(d.isWebKit){
if(d._isButtonTag(node)){
var ns=node.style;
if(_18d>=0&&!ns.width){
ns.width="4px";
}
if(_18e>=0&&!ns.height){
ns.height="4px";
}
}
}
var mb=d._getMarginExtents(node,s);
if(_18d>=0){
_18d=Math.max(_18d-pb.w-mb.w,0);
}
if(_18e>=0){
_18e=Math.max(_18e-pb.h-mb.h,0);
}
d._setBox(node,_18b,_18c,_18d,_18e);
};
var _190={l:0,t:0,w:0,h:0};
dojo.marginBox=function(node,box){
var n=byId(node),s=gcs(n),b=box;
return !b?d._getMarginBox(n,s):d._setMarginBox(n,b.l,b.t,b.w,b.h,s);
};
dojo.contentBox=function(node,box){
var n=byId(node),s=gcs(n),b=box;
return !b?d._getContentBox(n,s):d._setContentSize(n,b.w,b.h,s);
};
var _191=function(node,prop){
if(!(node=(node||0).parentNode)){
return 0;
}
var val,_192=0,_193=d.body();
while(node&&node.style){
if(gcs(node).position=="fixed"){
return 0;
}
val=node[prop];
if(val){
_192+=val-0;
if(node==_193){
break;
}
}
node=node.parentNode;
}
return _192;
};
dojo._docScroll=function(){
var n=d.global;
return "pageXOffset" in n?{x:n.pageXOffset,y:n.pageYOffset}:(n=d.isQuirks?d.doc.body:d.doc.documentElement,{x:d._fixIeBiDiScrollLeft(n.scrollLeft||0),y:n.scrollTop||0});
};
dojo._isBodyLtr=function(){
return "_bodyLtr" in d?d._bodyLtr:d._bodyLtr=(d.body().dir||d.doc.documentElement.dir||"ltr").toLowerCase()=="ltr";
};
dojo._getIeDocumentElementOffset=function(){
var de=d.doc.documentElement;
if(d.isIE<8){
var r=de.getBoundingClientRect();
var l=r.left,t=r.top;
if(d.isIE<7){
l+=de.clientLeft;
t+=de.clientTop;
}
return {x:l<0?0:l,y:t<0?0:t};
}else{
return {x:0,y:0};
}
};
dojo._fixIeBiDiScrollLeft=function(_194){
var ie=d.isIE;
if(ie&&!d._isBodyLtr()){
var qk=d.isQuirks,de=qk?d.doc.body:d.doc.documentElement;
if(ie==6&&!qk&&d.global.frameElement&&de.scrollHeight>de.clientHeight){
_194+=de.clientLeft;
}
return (ie<8||qk)?(_194+de.clientWidth-de.scrollWidth):-_194;
}
return _194;
};
dojo._abs=dojo.position=function(node,_195){
node=byId(node);
var db=d.body(),dh=db.parentNode,ret=node.getBoundingClientRect();
ret={x:ret.left,y:ret.top,w:ret.right-ret.left,h:ret.bottom-ret.top};
if(d.isIE){
var _196=d._getIeDocumentElementOffset();
ret.x-=_196.x+(d.isQuirks?db.clientLeft+db.offsetLeft:0);
ret.y-=_196.y+(d.isQuirks?db.clientTop+db.offsetTop:0);
}else{
if(d.isFF==3){
var cs=gcs(dh);
ret.x-=px(dh,cs.marginLeft)+px(dh,cs.borderLeftWidth);
ret.y-=px(dh,cs.marginTop)+px(dh,cs.borderTopWidth);
}
}
if(_195){
var _197=d._docScroll();
ret.x+=_197.x;
ret.y+=_197.y;
}
return ret;
};
dojo.coords=function(node,_198){
var n=byId(node),s=gcs(n),mb=d._getMarginBox(n,s);
var abs=d.position(n,_198);
mb.x=abs.x;
mb.y=abs.y;
return mb;
};
var _199={"class":"className","for":"htmlFor",tabindex:"tabIndex",readonly:"readOnly",colspan:"colSpan",frameborder:"frameBorder",rowspan:"rowSpan",valuetype:"valueType"},_19a={classname:"class",htmlfor:"for",tabindex:"tabIndex",readonly:"readOnly"},_19b={innerHTML:1,className:1,htmlFor:d.isIE,value:1};
var _19c=function(name){
return _19a[name.toLowerCase()]||name;
};
var _19d=function(node,name){
var attr=node.getAttributeNode&&node.getAttributeNode(name);
return attr&&attr.specified;
};
dojo.hasAttr=function(node,name){
var lc=name.toLowerCase();
return _19b[_199[lc]||name]||_19d(byId(node),_19a[lc]||name);
};
var _19e={},_19f=0,_1a0=dojo._scopeName+"attrid",_1a1={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};
dojo.attr=function(node,name,_1a2){
node=byId(node);
var args=arguments.length,prop;
if(args==2&&typeof name!="string"){
for(var x in name){
d.attr(node,x,name[x]);
}
return node;
}
var lc=name.toLowerCase(),_1a3=_199[lc]||name,_1a4=_19b[_1a3],_1a5=_19a[lc]||name;
if(args==3){
do{
if(_1a3=="style"&&typeof _1a2!="string"){
d.style(node,_1a2);
break;
}
if(_1a3=="innerHTML"){
if(d.isIE&&node.tagName.toLowerCase() in _1a1){
d.empty(node);
node.appendChild(d._toDom(_1a2,node.ownerDocument));
}else{
node[_1a3]=_1a2;
}
break;
}
if(d.isFunction(_1a2)){
var _1a6=d.attr(node,_1a0);
if(!_1a6){
_1a6=_19f++;
d.attr(node,_1a0,_1a6);
}
if(!_19e[_1a6]){
_19e[_1a6]={};
}
var h=_19e[_1a6][_1a3];
if(h){
d.disconnect(h);
}else{
try{
delete node[_1a3];
}
catch(e){
}
}
_19e[_1a6][_1a3]=d.connect(node,_1a3,_1a2);
break;
}
if(_1a4||typeof _1a2=="boolean"){
node[_1a3]=_1a2;
break;
}
node.setAttribute(_1a5,_1a2);
}while(false);
return node;
}
_1a2=node[_1a3];
if(_1a4&&typeof _1a2!="undefined"){
return _1a2;
}
if(_1a3!="href"&&(typeof _1a2=="boolean"||d.isFunction(_1a2))){
return _1a2;
}
return _19d(node,_1a5)?node.getAttribute(_1a5):null;
};
dojo.removeAttr=function(node,name){
byId(node).removeAttribute(_19c(name));
};
dojo.getNodeProp=function(node,name){
node=byId(node);
var lc=name.toLowerCase(),_1a7=_199[lc]||name;
if((_1a7 in node)&&_1a7!="href"){
return node[_1a7];
}
var _1a8=_19a[lc]||name;
return _19d(node,_1a8)?node.getAttribute(_1a8):null;
};
dojo.create=function(tag,_1a9,_1aa,pos){
var doc=d.doc;
if(_1aa){
_1aa=byId(_1aa);
doc=_1aa.ownerDocument;
}
if(typeof tag=="string"){
tag=doc.createElement(tag);
}
if(_1a9){
d.attr(tag,_1a9);
}
if(_1aa){
d.place(tag,_1aa,pos);
}
return tag;
};
d.empty=d.isIE?function(node){
node=byId(node);
for(var c;c=node.lastChild;){
d.destroy(c);
}
}:function(node){
byId(node).innerHTML="";
};
var _1ab={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_1ac=/<\s*([\w\:]+)/,_1ad={},_1ae=0,_1af="__"+d._scopeName+"ToDomId";
for(var _1b0 in _1ab){
if(_1ab.hasOwnProperty(_1b0)){
var tw=_1ab[_1b0];
tw.pre=_1b0=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";
tw.post="</"+tw.reverse().join("></")+">";
}
}
d._toDom=function(frag,doc){
doc=doc||d.doc;
var _1b1=doc[_1af];
if(!_1b1){
doc[_1af]=_1b1=++_1ae+"";
_1ad[_1b1]=doc.createElement("div");
}
frag+="";
var _1b2=frag.match(_1ac),tag=_1b2?_1b2[1].toLowerCase():"",_1b3=_1ad[_1b1],wrap,i,fc,df;
if(_1b2&&_1ab[tag]){
wrap=_1ab[tag];
_1b3.innerHTML=wrap.pre+frag+wrap.post;
for(i=wrap.length;i;--i){
_1b3=_1b3.firstChild;
}
}else{
_1b3.innerHTML=frag;
}
if(_1b3.childNodes.length==1){
return _1b3.removeChild(_1b3.firstChild);
}
df=doc.createDocumentFragment();
while(fc=_1b3.firstChild){
df.appendChild(fc);
}
return df;
};
var _1b4="className";
dojo.hasClass=function(node,_1b5){
return ((" "+byId(node)[_1b4]+" ").indexOf(" "+_1b5+" ")>=0);
};
var _1b6=/\s+/,a1=[""],_1b7={},_1b8=function(s){
if(typeof s=="string"||s instanceof String){
if(s.indexOf(" ")<0){
a1[0]=s;
return a1;
}else{
return s.split(_1b6);
}
}
return s||"";
};
dojo.addClass=function(node,_1b9){
node=byId(node);
_1b9=_1b8(_1b9);
var cls=node[_1b4],_1ba;
cls=cls?" "+cls+" ":" ";
_1ba=cls.length;
for(var i=0,len=_1b9.length,c;i<len;++i){
c=_1b9[i];
if(c&&cls.indexOf(" "+c+" ")<0){
cls+=c+" ";
}
}
if(_1ba<cls.length){
node[_1b4]=cls.substr(1,cls.length-2);
}
};
dojo.removeClass=function(node,_1bb){
node=byId(node);
var cls;
if(_1bb!==undefined){
_1bb=_1b8(_1bb);
cls=" "+node[_1b4]+" ";
for(var i=0,len=_1bb.length;i<len;++i){
cls=cls.replace(" "+_1bb[i]+" "," ");
}
cls=d.trim(cls);
}else{
cls="";
}
if(node[_1b4]!=cls){
node[_1b4]=cls;
}
};
dojo.replaceClass=function(node,_1bc,_1bd){
node=byId(node);
_1b7.className=node.className;
dojo.removeClass(_1b7,_1bd);
dojo.addClass(_1b7,_1bc);
if(node.className!==_1b7.className){
node.className=_1b7.className;
}
};
dojo.toggleClass=function(node,_1be,_1bf){
if(_1bf===undefined){
_1bf=!d.hasClass(node,_1be);
}
d[_1bf?"addClass":"removeClass"](node,_1be);
};
})();
dojo.provide("dojo._base.NodeList");
(function(){
var d=dojo;
var ap=Array.prototype,aps=ap.slice,apc=ap.concat;
var tnl=function(a,_1c0,_1c1){
if(!a.sort){
a=aps.call(a,0);
}
var ctor=_1c1||this._NodeListCtor||d._NodeListCtor;
a.constructor=ctor;
dojo._mixin(a,ctor.prototype);
a._NodeListCtor=ctor;
return _1c0?a._stash(_1c0):a;
};
var _1c2=function(f,a,o){
a=[0].concat(aps.call(a,0));
o=o||d.global;
return function(node){
a[0]=node;
return f.apply(o,a);
};
};
var _1c3=function(f,o){
return function(){
this.forEach(_1c2(f,arguments,o));
return this;
};
};
var _1c4=function(f,o){
return function(){
return this.map(_1c2(f,arguments,o));
};
};
var _1c5=function(f,o){
return function(){
return this.filter(_1c2(f,arguments,o));
};
};
var _1c6=function(f,g,o){
return function(){
var a=arguments,body=_1c2(f,a,o);
if(g.call(o||d.global,a)){
return this.map(body);
}
this.forEach(body);
return this;
};
};
var _1c7=function(a){
return a.length==1&&(typeof a[0]=="string");
};
var _1c8=function(node){
var p=node.parentNode;
if(p){
p.removeChild(node);
}
};
dojo.NodeList=function(){
return tnl(Array.apply(null,arguments));
};
d._NodeListCtor=d.NodeList;
var nl=d.NodeList,nlp=nl.prototype;
nl._wrap=nlp._wrap=tnl;
nl._adaptAsMap=_1c4;
nl._adaptAsForEach=_1c3;
nl._adaptAsFilter=_1c5;
nl._adaptWithCondition=_1c6;
d.forEach(["slice","splice"],function(name){
var f=ap[name];
nlp[name]=function(){
return this._wrap(f.apply(this,arguments),name=="slice"?this:null);
};
});
d.forEach(["indexOf","lastIndexOf","every","some"],function(name){
var f=d[name];
nlp[name]=function(){
return f.apply(d,[this].concat(aps.call(arguments,0)));
};
});
d.forEach(["attr","style"],function(name){
nlp[name]=_1c6(d[name],_1c7);
});
d.forEach(["connect","addClass","removeClass","replaceClass","toggleClass","empty","removeAttr"],function(name){
nlp[name]=_1c3(d[name]);
});
dojo.extend(dojo.NodeList,{_normalize:function(_1c9,_1ca){
var _1cb=_1c9.parse===true?true:false;
if(typeof _1c9.template=="string"){
var _1cc=_1c9.templateFunc||(dojo.string&&dojo.string.substitute);
_1c9=_1cc?_1cc(_1c9.template,_1c9):_1c9;
}
var type=(typeof _1c9);
if(type=="string"||type=="number"){
_1c9=dojo._toDom(_1c9,(_1ca&&_1ca.ownerDocument));
if(_1c9.nodeType==11){
_1c9=dojo._toArray(_1c9.childNodes);
}else{
_1c9=[_1c9];
}
}else{
if(!dojo.isArrayLike(_1c9)){
_1c9=[_1c9];
}else{
if(!dojo.isArray(_1c9)){
_1c9=dojo._toArray(_1c9);
}
}
}
if(_1cb){
_1c9._runParse=true;
}
return _1c9;
},_cloneNode:function(node){
return node.cloneNode(true);
},_place:function(ary,_1cd,_1ce,_1cf){
if(_1cd.nodeType!=1&&_1ce=="only"){
return;
}
var _1d0=_1cd,_1d1;
var _1d2=ary.length;
for(var i=_1d2-1;i>=0;i--){
var node=(_1cf?this._cloneNode(ary[i]):ary[i]);
if(ary._runParse&&dojo.parser&&dojo.parser.parse){
if(!_1d1){
_1d1=_1d0.ownerDocument.createElement("div");
}
_1d1.appendChild(node);
dojo.parser.parse(_1d1);
node=_1d1.firstChild;
while(_1d1.firstChild){
_1d1.removeChild(_1d1.firstChild);
}
}
if(i==_1d2-1){
dojo.place(node,_1d0,_1ce);
}else{
_1d0.parentNode.insertBefore(node,_1d0);
}
_1d0=node;
}
},_stash:function(_1d3){
this._parent=_1d3;
return this;
},end:function(){
if(this._parent){
return this._parent;
}else{
return new this._NodeListCtor();
}
},concat:function(item){
var t=d.isArray(this)?this:aps.call(this,0),m=d.map(arguments,function(a){
return a&&!d.isArray(a)&&(typeof NodeList!="undefined"&&a.constructor===NodeList||a.constructor===this._NodeListCtor)?aps.call(a,0):a;
});
return this._wrap(apc.apply(t,m),this);
},map:function(func,obj){
return this._wrap(d.map(this,func,obj),this);
},forEach:function(_1d4,_1d5){
d.forEach(this,_1d4,_1d5);
return this;
},coords:_1c4(d.coords),position:_1c4(d.position),place:function(_1d6,_1d7){
var item=d.query(_1d6)[0];
return this.forEach(function(node){
d.place(node,item,_1d7);
});
},orphan:function(_1d8){
return (_1d8?d._filterQueryResult(this,_1d8):this).forEach(_1c8);
},adopt:function(_1d9,_1da){
return d.query(_1d9).place(this[0],_1da)._stash(this);
},query:function(_1db){
if(!_1db){
return this;
}
var ret=this.map(function(node){
return d.query(_1db,node).filter(function(_1dc){
return _1dc!==undefined;
});
});
return this._wrap(apc.apply([],ret),this);
},filter:function(_1dd){
var a=arguments,_1de=this,_1df=0;
if(typeof _1dd=="string"){
_1de=d._filterQueryResult(this,a[0]);
if(a.length==1){
return _1de._stash(this);
}
_1df=1;
}
return this._wrap(d.filter(_1de,a[_1df],a[_1df+1]),this);
},addContent:function(_1e0,_1e1){
_1e0=this._normalize(_1e0,this[0]);
for(var i=0,node;(node=this[i]);i++){
this._place(_1e0,node,_1e1,i>0);
}
return this;
},instantiate:function(_1e2,_1e3){
var c=d.isFunction(_1e2)?_1e2:d.getObject(_1e2);
_1e3=_1e3||{};
return this.forEach(function(node){
new c(_1e3,node);
});
},at:function(){
var t=new this._NodeListCtor();
d.forEach(arguments,function(i){
if(i<0){
i=this.length+i;
}
if(this[i]){
t.push(this[i]);
}
},this);
return t._stash(this);
}});
nl.events=["blur","focus","change","click","error","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","submit"];
d.forEach(nl.events,function(evt){
var _1e4="on"+evt;
nlp[_1e4]=function(a,b){
return this.connect(_1e4,a,b);
};
});
})();
(function(){
var _1e5=function(d){
var trim=d.trim;
var each=d.forEach;
var qlc=(d._NodeListCtor=d.NodeList);
var _1e6=function(){
return d.doc;
};
var _1e7=((d.isWebKit||d.isMozilla)&&((_1e6().compatMode)=="BackCompat"));
var _1e8=!!_1e6().firstChild["children"]?"children":"childNodes";
var _1e9=">~+";
var _1ea=false;
var _1eb=function(){
return true;
};
var _1ec=function(_1ed){
if(_1e9.indexOf(_1ed.slice(-1))>=0){
_1ed+=" * ";
}else{
_1ed+=" ";
}
var ts=function(s,e){
return trim(_1ed.slice(s,e));
};
var _1ee=[];
var _1ef=-1,_1f0=-1,_1f1=-1,_1f2=-1,_1f3=-1,inId=-1,_1f4=-1,lc="",cc="",_1f5;
var x=0,ql=_1ed.length,_1f6=null,_1f7=null;
var _1f8=function(){
if(_1f4>=0){
var tv=(_1f4==x)?null:ts(_1f4,x);
_1f6[(_1e9.indexOf(tv)<0)?"tag":"oper"]=tv;
_1f4=-1;
}
};
var _1f9=function(){
if(inId>=0){
_1f6.id=ts(inId,x).replace(/\\/g,"");
inId=-1;
}
};
var _1fa=function(){
if(_1f3>=0){
_1f6.classes.push(ts(_1f3+1,x).replace(/\\/g,""));
_1f3=-1;
}
};
var _1fb=function(){
_1f9();
_1f8();
_1fa();
};
var _1fc=function(){
_1fb();
if(_1f2>=0){
_1f6.pseudos.push({name:ts(_1f2+1,x)});
}
_1f6.loops=(_1f6.pseudos.length||_1f6.attrs.length||_1f6.classes.length);
_1f6.oquery=_1f6.query=ts(_1f5,x);
_1f6.otag=_1f6.tag=(_1f6["oper"])?null:(_1f6.tag||"*");
if(_1f6.tag){
_1f6.tag=_1f6.tag.toUpperCase();
}
if(_1ee.length&&(_1ee[_1ee.length-1].oper)){
_1f6.infixOper=_1ee.pop();
_1f6.query=_1f6.infixOper.query+" "+_1f6.query;
}
_1ee.push(_1f6);
_1f6=null;
};
for(;lc=cc,cc=_1ed.charAt(x),x<ql;x++){
if(lc=="\\"){
continue;
}
if(!_1f6){
_1f5=x;
_1f6={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){
return (_1ea)?this.otag:this.tag;
}};
_1f4=x;
}
if(_1ef>=0){
if(cc=="]"){
if(!_1f7.attr){
_1f7.attr=ts(_1ef+1,x);
}else{
_1f7.matchFor=ts((_1f1||_1ef+1),x);
}
var cmf=_1f7.matchFor;
if(cmf){
if((cmf.charAt(0)=="\"")||(cmf.charAt(0)=="'")){
_1f7.matchFor=cmf.slice(1,-1);
}
}
_1f6.attrs.push(_1f7);
_1f7=null;
_1ef=_1f1=-1;
}else{
if(cc=="="){
var _1fd=("|~^$*".indexOf(lc)>=0)?lc:"";
_1f7.type=_1fd+cc;
_1f7.attr=ts(_1ef+1,x-_1fd.length);
_1f1=x+1;
}
}
}else{
if(_1f0>=0){
if(cc==")"){
if(_1f2>=0){
_1f7.value=ts(_1f0+1,x);
}
_1f2=_1f0=-1;
}
}else{
if(cc=="#"){
_1fb();
inId=x+1;
}else{
if(cc=="."){
_1fb();
_1f3=x;
}else{
if(cc==":"){
_1fb();
_1f2=x;
}else{
if(cc=="["){
_1fb();
_1ef=x;
_1f7={};
}else{
if(cc=="("){
if(_1f2>=0){
_1f7={name:ts(_1f2+1,x),value:null};
_1f6.pseudos.push(_1f7);
}
_1f0=x;
}else{
if((cc==" ")&&(lc!=cc)){
_1fc();
}
}
}
}
}
}
}
}
}
return _1ee;
};
var _1fe=function(_1ff,_200){
if(!_1ff){
return _200;
}
if(!_200){
return _1ff;
}
return function(){
return _1ff.apply(window,arguments)&&_200.apply(window,arguments);
};
};
var _201=function(i,arr){
var r=arr||[];
if(i){
r.push(i);
}
return r;
};
var _202=function(n){
return (1==n.nodeType);
};
var _203="";
var _204=function(elem,attr){
if(!elem){
return _203;
}
if(attr=="class"){
return elem.className||_203;
}
if(attr=="for"){
return elem.htmlFor||_203;
}
if(attr=="style"){
return elem.style.cssText||_203;
}
return (_1ea?elem.getAttribute(attr):elem.getAttribute(attr,2))||_203;
};
var _205={"*=":function(attr,_206){
return function(elem){
return (_204(elem,attr).indexOf(_206)>=0);
};
},"^=":function(attr,_207){
return function(elem){
return (_204(elem,attr).indexOf(_207)==0);
};
},"$=":function(attr,_208){
var tval=" "+_208;
return function(elem){
var ea=" "+_204(elem,attr);
return (ea.lastIndexOf(_208)==(ea.length-_208.length));
};
},"~=":function(attr,_209){
var tval=" "+_209+" ";
return function(elem){
var ea=" "+_204(elem,attr)+" ";
return (ea.indexOf(tval)>=0);
};
},"|=":function(attr,_20a){
var _20b=" "+_20a+"-";
return function(elem){
var ea=" "+_204(elem,attr);
return ((ea==_20a)||(ea.indexOf(_20b)==0));
};
},"=":function(attr,_20c){
return function(elem){
return (_204(elem,attr)==_20c);
};
}};
var _20d=(typeof _1e6().firstChild.nextElementSibling=="undefined");
var _20e=!_20d?"nextElementSibling":"nextSibling";
var _20f=!_20d?"previousElementSibling":"previousSibling";
var _210=(_20d?_202:_1eb);
var _211=function(node){
while(node=node[_20f]){
if(_210(node)){
return false;
}
}
return true;
};
var _212=function(node){
while(node=node[_20e]){
if(_210(node)){
return false;
}
}
return true;
};
var _213=function(node){
var root=node.parentNode;
var i=0,tret=root[_1e8],ci=(node["_i"]||-1),cl=(root["_l"]||-1);
if(!tret){
return -1;
}
var l=tret.length;
if(cl==l&&ci>=0&&cl>=0){
return ci;
}
root["_l"]=l;
ci=-1;
for(var te=root["firstElementChild"]||root["firstChild"];te;te=te[_20e]){
if(_210(te)){
te["_i"]=++i;
if(node===te){
ci=i;
}
}
}
return ci;
};
var _214=function(elem){
return !((_213(elem))%2);
};
var _215=function(elem){
return ((_213(elem))%2);
};
var _216={"checked":function(name,_217){
return function(elem){
return !!("checked" in elem?elem.checked:elem.selected);
};
},"first-child":function(){
return _211;
},"last-child":function(){
return _212;
},"only-child":function(name,_218){
return function(node){
if(!_211(node)){
return false;
}
if(!_212(node)){
return false;
}
return true;
};
},"empty":function(name,_219){
return function(elem){
var cn=elem.childNodes;
var cnl=elem.childNodes.length;
for(var x=cnl-1;x>=0;x--){
var nt=cn[x].nodeType;
if((nt===1)||(nt==3)){
return false;
}
}
return true;
};
},"contains":function(name,_21a){
var cz=_21a.charAt(0);
if(cz=="\""||cz=="'"){
_21a=_21a.slice(1,-1);
}
return function(elem){
return (elem.innerHTML.indexOf(_21a)>=0);
};
},"not":function(name,_21b){
var p=_1ec(_21b)[0];
var _21c={el:1};
if(p.tag!="*"){
_21c.tag=1;
}
if(!p.classes.length){
_21c.classes=1;
}
var ntf=_21d(p,_21c);
return function(elem){
return (!ntf(elem));
};
},"nth-child":function(name,_21e){
var pi=parseInt;
if(_21e=="odd"){
return _215;
}else{
if(_21e=="even"){
return _214;
}
}
if(_21e.indexOf("n")!=-1){
var _21f=_21e.split("n",2);
var pred=_21f[0]?((_21f[0]=="-")?-1:pi(_21f[0])):1;
var idx=_21f[1]?pi(_21f[1]):0;
var lb=0,ub=-1;
if(pred>0){
if(idx<0){
idx=(idx%pred)&&(pred+(idx%pred));
}else{
if(idx>0){
if(idx>=pred){
lb=idx-idx%pred;
}
idx=idx%pred;
}
}
}else{
if(pred<0){
pred*=-1;
if(idx>0){
ub=idx;
idx=idx%pred;
}
}
}
if(pred>0){
return function(elem){
var i=_213(elem);
return (i>=lb)&&(ub<0||i<=ub)&&((i%pred)==idx);
};
}else{
_21e=idx;
}
}
var _220=pi(_21e);
return function(elem){
return (_213(elem)==_220);
};
}};
var _221=(d.isIE<9||(dojo.isIE&&dojo.isQuirks))?function(cond){
var clc=cond.toLowerCase();
if(clc=="class"){
cond="className";
}
return function(elem){
return (_1ea?elem.getAttribute(cond):elem[cond]||elem[clc]);
};
}:function(cond){
return function(elem){
return (elem&&elem.getAttribute&&elem.hasAttribute(cond));
};
};
var _21d=function(_222,_223){
if(!_222){
return _1eb;
}
_223=_223||{};
var ff=null;
if(!("el" in _223)){
ff=_1fe(ff,_202);
}
if(!("tag" in _223)){
if(_222.tag!="*"){
ff=_1fe(ff,function(elem){
return (elem&&(elem.tagName==_222.getTag()));
});
}
}
if(!("classes" in _223)){
each(_222.classes,function(_224,idx,arr){
var re=new RegExp("(?:^|\\s)"+_224+"(?:\\s|$)");
ff=_1fe(ff,function(elem){
return re.test(elem.className);
});
ff.count=idx;
});
}
if(!("pseudos" in _223)){
each(_222.pseudos,function(_225){
var pn=_225.name;
if(_216[pn]){
ff=_1fe(ff,_216[pn](pn,_225.value));
}
});
}
if(!("attrs" in _223)){
each(_222.attrs,function(attr){
var _226;
var a=attr.attr;
if(attr.type&&_205[attr.type]){
_226=_205[attr.type](a,attr.matchFor);
}else{
if(a.length){
_226=_221(a);
}
}
if(_226){
ff=_1fe(ff,_226);
}
});
}
if(!("id" in _223)){
if(_222.id){
ff=_1fe(ff,function(elem){
return (!!elem&&(elem.id==_222.id));
});
}
}
if(!ff){
if(!("default" in _223)){
ff=_1eb;
}
}
return ff;
};
var _227=function(_228){
return function(node,ret,bag){
while(node=node[_20e]){
if(_20d&&(!_202(node))){
continue;
}
if((!bag||_229(node,bag))&&_228(node)){
ret.push(node);
}
break;
}
return ret;
};
};
var _22a=function(_22b){
return function(root,ret,bag){
var te=root[_20e];
while(te){
if(_210(te)){
if(bag&&!_229(te,bag)){
break;
}
if(_22b(te)){
ret.push(te);
}
}
te=te[_20e];
}
return ret;
};
};
var _22c=function(_22d){
_22d=_22d||_1eb;
return function(root,ret,bag){
var te,x=0,tret=root[_1e8];
while(te=tret[x++]){
if(_210(te)&&(!bag||_229(te,bag))&&(_22d(te,x))){
ret.push(te);
}
}
return ret;
};
};
var _22e=function(node,root){
var pn=node.parentNode;
while(pn){
if(pn==root){
break;
}
pn=pn.parentNode;
}
return !!pn;
};
var _22f={};
var _230=function(_231){
var _232=_22f[_231.query];
if(_232){
return _232;
}
var io=_231.infixOper;
var oper=(io?io.oper:"");
var _233=_21d(_231,{el:1});
var qt=_231.tag;
var _234=("*"==qt);
var ecs=_1e6()["getElementsByClassName"];
if(!oper){
if(_231.id){
_233=(!_231.loops&&_234)?_1eb:_21d(_231,{el:1,id:1});
_232=function(root,arr){
var te=d.byId(_231.id,(root.ownerDocument||root));
if(!te||!_233(te)){
return;
}
if(9==root.nodeType){
return _201(te,arr);
}else{
if(_22e(te,root)){
return _201(te,arr);
}
}
};
}else{
if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&_231.classes.length&&!_1e7){
_233=_21d(_231,{el:1,classes:1,id:1});
var _235=_231.classes.join(" ");
_232=function(root,arr,bag){
var ret=_201(0,arr),te,x=0;
var tret=root.getElementsByClassName(_235);
while((te=tret[x++])){
if(_233(te,root)&&_229(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
if(!_234&&!_231.loops){
_232=function(root,arr,bag){
var ret=_201(0,arr),te,x=0;
var tret=root.getElementsByTagName(_231.getTag());
while((te=tret[x++])){
if(_229(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
_233=_21d(_231,{el:1,tag:1,id:1});
_232=function(root,arr,bag){
var ret=_201(0,arr),te,x=0;
var tret=root.getElementsByTagName(_231.getTag());
while((te=tret[x++])){
if(_233(te,root)&&_229(te,bag)){
ret.push(te);
}
}
return ret;
};
}
}
}
}else{
var _236={el:1};
if(_234){
_236.tag=1;
}
_233=_21d(_231,_236);
if("+"==oper){
_232=_227(_233);
}else{
if("~"==oper){
_232=_22a(_233);
}else{
if(">"==oper){
_232=_22c(_233);
}
}
}
}
return _22f[_231.query]=_232;
};
var _237=function(root,_238){
var _239=_201(root),qp,x,te,qpl=_238.length,bag,ret;
for(var i=0;i<qpl;i++){
ret=[];
qp=_238[i];
x=_239.length-1;
if(x>0){
bag={};
ret.nozip=true;
}
var gef=_230(qp);
for(var j=0;(te=_239[j]);j++){
gef(te,ret,bag);
}
if(!ret.length){
break;
}
_239=ret;
}
return ret;
};
var _23a={},_23b={};
var _23c=function(_23d){
var _23e=_1ec(trim(_23d));
if(_23e.length==1){
var tef=_230(_23e[0]);
return function(root){
var r=tef(root,new qlc());
if(r){
r.nozip=true;
}
return r;
};
}
return function(root){
return _237(root,_23e);
};
};
var nua=navigator.userAgent;
var wk="WebKit/";
var _23f=(d.isWebKit&&(nua.indexOf(wk)>0)&&(parseFloat(nua.split(wk)[1])>528));
var _240=d.isIE?"commentStrip":"nozip";
var qsa="querySelectorAll";
var _241=(!!_1e6()[qsa]&&(!d.isSafari||(d.isSafari>3.1)||_23f));
var _242=/n\+\d|([^ ])?([>~+])([^ =])?/g;
var _243=function(_244,pre,ch,post){
return ch?(pre?pre+" ":"")+ch+(post?" "+post:""):_244;
};
var _245=function(_246,_247){
_246=_246.replace(_242,_243);
if(_241){
var _248=_23b[_246];
if(_248&&!_247){
return _248;
}
}
var _249=_23a[_246];
if(_249){
return _249;
}
var qcz=_246.charAt(0);
var _24a=(-1==_246.indexOf(" "));
if((_246.indexOf("#")>=0)&&(_24a)){
_247=true;
}
var _24b=(_241&&(!_247)&&(_1e9.indexOf(qcz)==-1)&&(!d.isIE||(_246.indexOf(":")==-1))&&(!(_1e7&&(_246.indexOf(".")>=0)))&&(_246.indexOf(":contains")==-1)&&(_246.indexOf(":checked")==-1)&&(_246.indexOf("|=")==-1));
if(_24b){
var tq=(_1e9.indexOf(_246.charAt(_246.length-1))>=0)?(_246+" *"):_246;
return _23b[_246]=function(root){
try{
if(!((9==root.nodeType)||_24a)){
throw "";
}
var r=root[qsa](tq);
r[_240]=true;
return r;
}
catch(e){
return _245(_246,true)(root);
}
};
}else{
var _24c=_246.split(/\s*,\s*/);
return _23a[_246]=((_24c.length<2)?_23c(_246):function(root){
var _24d=0,ret=[],tp;
while((tp=_24c[_24d++])){
ret=ret.concat(_23c(tp)(root));
}
return ret;
});
}
};
var _24e=0;
var _24f=d.isIE?function(node){
if(_1ea){
return (node.getAttribute("_uid")||node.setAttribute("_uid",++_24e)||_24e);
}else{
return node.uniqueID;
}
}:function(node){
return (node._uid||(node._uid=++_24e));
};
var _229=function(node,bag){
if(!bag){
return 1;
}
var id=_24f(node);
if(!bag[id]){
return bag[id]=1;
}
return 0;
};
var _250="_zipIdx";
var _251=function(arr){
if(arr&&arr.nozip){
return (qlc._wrap)?qlc._wrap(arr):arr;
}
var ret=new qlc();
if(!arr||!arr.length){
return ret;
}
if(arr[0]){
ret.push(arr[0]);
}
if(arr.length<2){
return ret;
}
_24e++;
if(d.isIE&&_1ea){
var _252=_24e+"";
arr[0].setAttribute(_250,_252);
for(var x=1,te;te=arr[x];x++){
if(arr[x].getAttribute(_250)!=_252){
ret.push(te);
}
te.setAttribute(_250,_252);
}
}else{
if(d.isIE&&arr.commentStrip){
try{
for(var x=1,te;te=arr[x];x++){
if(_202(te)){
ret.push(te);
}
}
}
catch(e){
}
}else{
if(arr[0]){
arr[0][_250]=_24e;
}
for(var x=1,te;te=arr[x];x++){
if(arr[x][_250]!=_24e){
ret.push(te);
}
te[_250]=_24e;
}
}
}
return ret;
};
d.query=function(_253,root){
qlc=d._NodeListCtor;
if(!_253){
return new qlc();
}
if(_253.constructor==qlc){
return _253;
}
if(typeof _253!="string"){
return new qlc(_253);
}
if(typeof root=="string"){
root=d.byId(root);
if(!root){
return new qlc();
}
}
root=root||_1e6();
var od=root.ownerDocument||root.documentElement;
_1ea=(root.contentType&&root.contentType=="application/xml")||(d.isOpera&&(root.doctype||od.toString()=="[object XMLDocument]"))||(!!od)&&(d.isIE?od.xml:(root.xmlVersion||od.xmlVersion));
var r=_245(_253)(root);
if(r&&r.nozip&&!qlc._wrap){
return r;
}
return _251(r);
};
d.query.pseudos=_216;
d._filterQueryResult=function(_254,_255,root){
var _256=new d._NodeListCtor(),_257=_1ec(_255),_258=(_257.length==1&&!/[^\w#\.]/.test(_255))?_21d(_257[0]):function(node){
return dojo.query(_255,root).indexOf(node)!=-1;
};
for(var x=0,te;te=_254[x];x++){
if(_258(te)){
_256.push(te);
}
}
return _256;
};
};
var _259=function(){
acme={trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
},forEach:function(arr,_25a,_25b){
if(!arr||!arr.length){
return;
}
for(var i=0,l=arr.length;i<l;++i){
_25a.call(_25b||window,arr[i],i,arr);
}
},byId:function(id,doc){
if(typeof id=="string"){
return (doc||document).getElementById(id);
}else{
return id;
}
},doc:document,NodeList:Array};
var n=navigator;
var dua=n.userAgent;
var dav=n.appVersion;
var tv=parseFloat(dav);
acme.isOpera=(dua.indexOf("Opera")>=0)?tv:undefined;
acme.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:undefined;
acme.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;
acme.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;
var _25c=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);
if(_25c&&!acme.isChrome){
acme.isSafari=parseFloat(dav.split("Version/")[1]);
if(!acme.isSafari||parseFloat(dav.substr(_25c+7))<=419.3){
acme.isSafari=2;
}
}
if(document.all&&!acme.isOpera){
acme.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;
}
Array._wrap=function(arr){
return arr;
};
return acme;
};
if(this["dojo"]){
dojo.provide("dojo._base.query");
_1e5(this["queryPortability"]||this["acme"]||dojo);
}else{
_1e5(this["queryPortability"]||this["acme"]||_259());
}
})();
dojo.provide("dojo._base.xhr");
(function(){
var _25d=dojo,cfg=_25d.config;
function _25e(obj,name,_25f){
if(_25f===null){
return;
}
var val=obj[name];
if(typeof val=="string"){
obj[name]=[val,_25f];
}else{
if(_25d.isArray(val)){
val.push(_25f);
}else{
obj[name]=_25f;
}
}
};
dojo.fieldToObject=function(_260){
var ret=null;
var item=_25d.byId(_260);
if(item){
var _261=item.name;
var type=(item.type||"").toLowerCase();
if(_261&&type&&!item.disabled){
if(type=="radio"||type=="checkbox"){
if(item.checked){
ret=item.value;
}
}else{
if(item.multiple){
ret=[];
_25d.query("option",item).forEach(function(opt){
if(opt.selected){
ret.push(opt.value);
}
});
}else{
ret=item.value;
}
}
}
}
return ret;
};
dojo.formToObject=function(_262){
var ret={};
var _263="file|submit|image|reset|button|";
_25d.forEach(dojo.byId(_262).elements,function(item){
var _264=item.name;
var type=(item.type||"").toLowerCase();
if(_264&&type&&_263.indexOf(type)==-1&&!item.disabled){
_25e(ret,_264,_25d.fieldToObject(item));
if(type=="image"){
ret[_264+".x"]=ret[_264+".y"]=ret[_264].x=ret[_264].y=0;
}
}
});
return ret;
};
dojo.objectToQuery=function(map){
var enc=encodeURIComponent;
var _265=[];
var _266={};
for(var name in map){
var _267=map[name];
if(_267!=_266[name]){
var _268=enc(name)+"=";
if(_25d.isArray(_267)){
for(var i=0;i<_267.length;i++){
_265.push(_268+enc(_267[i]));
}
}else{
_265.push(_268+enc(_267));
}
}
}
return _265.join("&");
};
dojo.formToQuery=function(_269){
return _25d.objectToQuery(_25d.formToObject(_269));
};
dojo.formToJson=function(_26a,_26b){
return _25d.toJson(_25d.formToObject(_26a),_26b);
};
dojo.queryToObject=function(str){
var ret={};
var qp=str.split("&");
var dec=decodeURIComponent;
_25d.forEach(qp,function(item){
if(item.length){
var _26c=item.split("=");
var name=dec(_26c.shift());
var val=dec(_26c.join("="));
if(typeof ret[name]=="string"){
ret[name]=[ret[name]];
}
if(_25d.isArray(ret[name])){
ret[name].push(val);
}else{
ret[name]=val;
}
}
});
return ret;
};
dojo._blockAsync=false;
var _26d=_25d._contentHandlers=dojo.contentHandlers={text:function(xhr){
return xhr.responseText;
},json:function(xhr){
return _25d.fromJson(xhr.responseText||null);
},"json-comment-filtered":function(xhr){
if(!dojo.config.useCommentedJson){
}
var _26e=xhr.responseText;
var _26f=_26e.indexOf("/*");
var _270=_26e.lastIndexOf("*/");
if(_26f==-1||_270==-1){
throw new Error("JSON was not comment filtered");
}
return _25d.fromJson(_26e.substring(_26f+2,_270));
},javascript:function(xhr){
return _25d.eval(xhr.responseText);
},xml:function(xhr){
var _271=xhr.responseXML;
if(_25d.isIE&&(!_271||!_271.documentElement)){
var ms=function(n){
return "MSXML"+n+".DOMDocument";
};
var dp=["Microsoft.XMLDOM",ms(6),ms(4),ms(3),ms(2)];
_25d.some(dp,function(p){
try{
var dom=new ActiveXObject(p);
dom.async=false;
dom.loadXML(xhr.responseText);
_271=dom;
}
catch(e){
return false;
}
return true;
});
}
return _271;
},"json-comment-optional":function(xhr){
if(xhr.responseText&&/^[^{\[]*\/\*/.test(xhr.responseText)){
return _26d["json-comment-filtered"](xhr);
}else{
return _26d["json"](xhr);
}
}};
dojo._ioSetArgs=function(args,_272,_273,_274){
var _275={args:args,url:args.url};
var _276=null;
if(args.form){
var form=_25d.byId(args.form);
var _277=form.getAttributeNode("action");
_275.url=_275.url||(_277?_277.value:null);
_276=_25d.formToObject(form);
}
var _278=[{}];
if(_276){
_278.push(_276);
}
if(args.content){
_278.push(args.content);
}
if(args.preventCache){
_278.push({"dojo.preventCache":new Date().valueOf()});
}
_275.query=_25d.objectToQuery(_25d.mixin.apply(null,_278));
_275.handleAs=args.handleAs||"text";
var d=new _25d.Deferred(_272);
d.addCallbacks(_273,function(_279){
return _274(_279,d);
});
var ld=args.load;
if(ld&&_25d.isFunction(ld)){
d.addCallback(function(_27a){
return ld.call(args,_27a,_275);
});
}
var err=args.error;
if(err&&_25d.isFunction(err)){
d.addErrback(function(_27b){
return err.call(args,_27b,_275);
});
}
var _27c=args.handle;
if(_27c&&_25d.isFunction(_27c)){
d.addBoth(function(_27d){
return _27c.call(args,_27d,_275);
});
}
if(cfg.ioPublish&&_25d.publish&&_275.args.ioPublish!==false){
d.addCallbacks(function(res){
_25d.publish("/dojo/io/load",[d,res]);
return res;
},function(res){
_25d.publish("/dojo/io/error",[d,res]);
return res;
});
d.addBoth(function(res){
_25d.publish("/dojo/io/done",[d,res]);
return res;
});
}
d.ioArgs=_275;
return d;
};
var _27e=function(dfd){
dfd.canceled=true;
var xhr=dfd.ioArgs.xhr;
var _27f=typeof xhr.abort;
if(_27f=="function"||_27f=="object"||_27f=="unknown"){
xhr.abort();
}
var err=dfd.ioArgs.error;
if(!err){
err=new Error("xhr cancelled");
err.dojoType="cancel";
}
return err;
};
var _280=function(dfd){
var ret=_26d[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
return ret===undefined?null:ret;
};
var _281=function(_282,dfd){
if(!dfd.ioArgs.args.failOk){
}
return _282;
};
var _283=null;
var _284=[];
var _285=0;
var _286=function(dfd){
if(_285<=0){
_285=0;
if(cfg.ioPublish&&_25d.publish&&(!dfd||dfd&&dfd.ioArgs.args.ioPublish!==false)){
_25d.publish("/dojo/io/stop");
}
}
};
var _287=function(){
var now=(new Date()).getTime();
if(!_25d._blockAsync){
for(var i=0,tif;i<_284.length&&(tif=_284[i]);i++){
var dfd=tif.dfd;
var func=function(){
if(!dfd||dfd.canceled||!tif.validCheck(dfd)){
_284.splice(i--,1);
_285-=1;
}else{
if(tif.ioCheck(dfd)){
_284.splice(i--,1);
tif.resHandle(dfd);
_285-=1;
}else{
if(dfd.startTime){
if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){
_284.splice(i--,1);
var err=new Error("timeout exceeded");
err.dojoType="timeout";
dfd.errback(err);
dfd.cancel();
_285-=1;
}
}
}
}
};
if(dojo.config.debugAtAllCosts){
func.call(this);
}else{
try{
func.call(this);
}
catch(e){
dfd.errback(e);
}
}
}
}
_286(dfd);
if(!_284.length){
clearInterval(_283);
_283=null;
return;
}
};
dojo._ioCancelAll=function(){
try{
_25d.forEach(_284,function(i){
try{
i.dfd.cancel();
}
catch(e){
}
});
}
catch(e){
}
};
if(_25d.isIE){
_25d.addOnWindowUnload(_25d._ioCancelAll);
}
_25d._ioNotifyStart=function(dfd){
if(cfg.ioPublish&&_25d.publish&&dfd.ioArgs.args.ioPublish!==false){
if(!_285){
_25d.publish("/dojo/io/start");
}
_285+=1;
_25d.publish("/dojo/io/send",[dfd]);
}
};
_25d._ioWatch=function(dfd,_288,_289,_28a){
var args=dfd.ioArgs.args;
if(args.timeout){
dfd.startTime=(new Date()).getTime();
}
_284.push({dfd:dfd,validCheck:_288,ioCheck:_289,resHandle:_28a});
if(!_283){
_283=setInterval(_287,50);
}
if(args.sync){
_287();
}
};
var _28b="application/x-www-form-urlencoded";
var _28c=function(dfd){
return dfd.ioArgs.xhr.readyState;
};
var _28d=function(dfd){
return 4==dfd.ioArgs.xhr.readyState;
};
var _28e=function(dfd){
var xhr=dfd.ioArgs.xhr;
if(_25d._isDocumentOk(xhr)){
dfd.callback(dfd);
}else{
var err=new Error("Unable to load "+dfd.ioArgs.url+" status:"+xhr.status);
err.status=xhr.status;
err.responseText=xhr.responseText;
dfd.errback(err);
}
};
dojo._ioAddQueryToUrl=function(_28f){
if(_28f.query.length){
_28f.url+=(_28f.url.indexOf("?")==-1?"?":"&")+_28f.query;
_28f.query=null;
}
};
dojo.xhr=function(_290,args,_291){
var dfd=_25d._ioSetArgs(args,_27e,_280,_281);
var _292=dfd.ioArgs;
var xhr=_292.xhr=_25d._xhrObj(_292.args);
if(!xhr){
dfd.cancel();
return dfd;
}
if("postData" in args){
_292.query=args.postData;
}else{
if("putData" in args){
_292.query=args.putData;
}else{
if("rawBody" in args){
_292.query=args.rawBody;
}else{
if((arguments.length>2&&!_291)||"POST|PUT".indexOf(_290.toUpperCase())==-1){
_25d._ioAddQueryToUrl(_292);
}
}
}
}
xhr.open(_290,_292.url,args.sync!==true,args.user||undefined,args.password||undefined);
if(args.headers){
for(var hdr in args.headers){
if(hdr.toLowerCase()==="content-type"&&!args.contentType){
args.contentType=args.headers[hdr];
}else{
if(args.headers[hdr]){
xhr.setRequestHeader(hdr,args.headers[hdr]);
}
}
}
}
xhr.setRequestHeader("Content-Type",args.contentType||_28b);
if(!args.headers||!("X-Requested-With" in args.headers)){
xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
}
_25d._ioNotifyStart(dfd);
if(dojo.config.debugAtAllCosts){
xhr.send(_292.query);
}else{
try{
xhr.send(_292.query);
}
catch(e){
_292.error=e;
dfd.cancel();
}
}
_25d._ioWatch(dfd,_28c,_28d,_28e);
xhr=null;
return dfd;
};
dojo.xhrGet=function(args){
return _25d.xhr("GET",args);
};
dojo.rawXhrPost=dojo.xhrPost=function(args){
return _25d.xhr("POST",args,true);
};
dojo.rawXhrPut=dojo.xhrPut=function(args){
return _25d.xhr("PUT",args,true);
};
dojo.xhrDelete=function(args){
return _25d.xhr("DELETE",args);
};
})();
dojo.provide("dojo._base.fx");
(function(){
var d=dojo;
var _293=d._mixin;
dojo._Line=function(_294,end){
this.start=_294;
this.end=end;
};
dojo._Line.prototype.getValue=function(n){
return ((this.end-this.start)*n)+this.start;
};
dojo.Animation=function(args){
_293(this,args);
if(d.isArray(this.curve)){
this.curve=new d._Line(this.curve[0],this.curve[1]);
}
};
d._Animation=d.Animation;
d.extend(dojo.Animation,{duration:350,repeat:0,rate:20,_percent:0,_startRepeatCount:0,_getStep:function(){
var _295=this._percent,_296=this.easing;
return _296?_296(_295):_295;
},_fire:function(evt,args){
var a=args||[];
if(this[evt]){
if(d.config.debugAtAllCosts){
this[evt].apply(this,a);
}else{
try{
this[evt].apply(this,a);
}
catch(e){
}
}
}
return this;
},play:function(_297,_298){
var _299=this;
if(_299._delayTimer){
_299._clearTimer();
}
if(_298){
_299._stopTimer();
_299._active=_299._paused=false;
_299._percent=0;
}else{
if(_299._active&&!_299._paused){
return _299;
}
}
_299._fire("beforeBegin",[_299.node]);
var de=_297||_299.delay,_29a=dojo.hitch(_299,"_play",_298);
if(de>0){
_299._delayTimer=setTimeout(_29a,de);
return _299;
}
_29a();
return _299;
},_play:function(_29b){
var _29c=this;
if(_29c._delayTimer){
_29c._clearTimer();
}
_29c._startTime=new Date().valueOf();
if(_29c._paused){
_29c._startTime-=_29c.duration*_29c._percent;
}
_29c._active=true;
_29c._paused=false;
var _29d=_29c.curve.getValue(_29c._getStep());
if(!_29c._percent){
if(!_29c._startRepeatCount){
_29c._startRepeatCount=_29c.repeat;
}
_29c._fire("onBegin",[_29d]);
}
_29c._fire("onPlay",[_29d]);
_29c._cycle();
return _29c;
},pause:function(){
var _29e=this;
if(_29e._delayTimer){
_29e._clearTimer();
}
_29e._stopTimer();
if(!_29e._active){
return _29e;
}
_29e._paused=true;
_29e._fire("onPause",[_29e.curve.getValue(_29e._getStep())]);
return _29e;
},gotoPercent:function(_29f,_2a0){
var _2a1=this;
_2a1._stopTimer();
_2a1._active=_2a1._paused=true;
_2a1._percent=_29f;
if(_2a0){
_2a1.play();
}
return _2a1;
},stop:function(_2a2){
var _2a3=this;
if(_2a3._delayTimer){
_2a3._clearTimer();
}
if(!_2a3._timer){
return _2a3;
}
_2a3._stopTimer();
if(_2a2){
_2a3._percent=1;
}
_2a3._fire("onStop",[_2a3.curve.getValue(_2a3._getStep())]);
_2a3._active=_2a3._paused=false;
return _2a3;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}
return "stopped";
},_cycle:function(){
var _2a4=this;
if(_2a4._active){
var curr=new Date().valueOf();
var step=(curr-_2a4._startTime)/(_2a4.duration);
if(step>=1){
step=1;
}
_2a4._percent=step;
if(_2a4.easing){
step=_2a4.easing(step);
}
_2a4._fire("onAnimate",[_2a4.curve.getValue(step)]);
if(_2a4._percent<1){
_2a4._startTimer();
}else{
_2a4._active=false;
if(_2a4.repeat>0){
_2a4.repeat--;
_2a4.play(null,true);
}else{
if(_2a4.repeat==-1){
_2a4.play(null,true);
}else{
if(_2a4._startRepeatCount){
_2a4.repeat=_2a4._startRepeatCount;
_2a4._startRepeatCount=0;
}
}
}
_2a4._percent=0;
_2a4._fire("onEnd",[_2a4.node]);
!_2a4.repeat&&_2a4._stopTimer();
}
}
return _2a4;
},_clearTimer:function(){
clearTimeout(this._delayTimer);
delete this._delayTimer;
}});
var ctr=0,_2a5=null,_2a6={run:function(){
}};
d.extend(d.Animation,{_startTimer:function(){
if(!this._timer){
this._timer=d.connect(_2a6,"run",this,"_cycle");
ctr++;
}
if(!_2a5){
_2a5=setInterval(d.hitch(_2a6,"run"),this.rate);
}
},_stopTimer:function(){
if(this._timer){
d.disconnect(this._timer);
this._timer=null;
ctr--;
}
if(ctr<=0){
clearInterval(_2a5);
_2a5=null;
ctr=0;
}
}});
var _2a7=d.isIE?function(node){
var ns=node.style;
if(!ns.width.length&&d.style(node,"width")=="auto"){
ns.width="auto";
}
}:function(){
};
dojo._fade=function(args){
args.node=d.byId(args.node);
var _2a8=_293({properties:{}},args),_2a9=(_2a8.properties.opacity={});
_2a9.start=!("start" in _2a8)?function(){
return +d.style(_2a8.node,"opacity")||0;
}:_2a8.start;
_2a9.end=_2a8.end;
var anim=d.animateProperty(_2a8);
d.connect(anim,"beforeBegin",d.partial(_2a7,_2a8.node));
return anim;
};
dojo.fadeIn=function(args){
return d._fade(_293({end:1},args));
};
dojo.fadeOut=function(args){
return d._fade(_293({end:0},args));
};
dojo._defaultEasing=function(n){
return 0.5+((Math.sin((n+1.5)*Math.PI))/2);
};
var _2aa=function(_2ab){
this._properties=_2ab;
for(var p in _2ab){
var prop=_2ab[p];
if(prop.start instanceof d.Color){
prop.tempColor=new d.Color();
}
}
};
_2aa.prototype.getValue=function(r){
var ret={};
for(var p in this._properties){
var prop=this._properties[p],_2ac=prop.start;
if(_2ac instanceof d.Color){
ret[p]=d.blendColors(_2ac,prop.end,r,prop.tempColor).toCss();
}else{
if(!d.isArray(_2ac)){
ret[p]=((prop.end-_2ac)*r)+_2ac+(p!="opacity"?prop.units||"px":0);
}
}
}
return ret;
};
dojo.animateProperty=function(args){
var n=args.node=d.byId(args.node);
if(!args.easing){
args.easing=d._defaultEasing;
}
var anim=new d.Animation(args);
d.connect(anim,"beforeBegin",anim,function(){
var pm={};
for(var p in this.properties){
if(p=="width"||p=="height"){
this.node.display="block";
}
var prop=this.properties[p];
if(d.isFunction(prop)){
prop=prop(n);
}
prop=pm[p]=_293({},(d.isObject(prop)?prop:{end:prop}));
if(d.isFunction(prop.start)){
prop.start=prop.start(n);
}
if(d.isFunction(prop.end)){
prop.end=prop.end(n);
}
var _2ad=(p.toLowerCase().indexOf("color")>=0);
function _2ae(node,p){
var v={height:node.offsetHeight,width:node.offsetWidth}[p];
if(v!==undefined){
return v;
}
v=d.style(node,p);
return (p=="opacity")?+v:(_2ad?v:parseFloat(v));
};
if(!("end" in prop)){
prop.end=_2ae(n,p);
}else{
if(!("start" in prop)){
prop.start=_2ae(n,p);
}
}
if(_2ad){
prop.start=new d.Color(prop.start);
prop.end=new d.Color(prop.end);
}else{
prop.start=(p=="opacity")?+prop.start:parseFloat(prop.start);
}
}
this.curve=new _2aa(pm);
});
d.connect(anim,"onAnimate",d.hitch(d,"style",anim.node));
return anim;
};
dojo.anim=function(node,_2af,_2b0,_2b1,_2b2,_2b3){
return d.animateProperty({node:node,duration:_2b0||d.Animation.prototype.duration,properties:_2af,easing:_2b1,onEnd:_2b2}).play(_2b3||0);
};
})();
dojo.provide("dojo._base.browser");
dojo.forEach(dojo.config.require,function(i){
dojo["require"](i);
});
dojo.provide("dojo._base");
dojo.provide("dojo.dnd.common");
dojo.getObject("dnd",true,dojo);
dojo.dnd.getCopyKeyState=dojo.isCopyKey;
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){
var id;
do{
id=dojo._scopeName+"Unique"+(++dojo.dnd._uniqueId);
}while(dojo.byId(id));
return id;
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
dojo.provide("dojo.window");
dojo.getObject("window",true,dojo);
dojo.window.getBox=function(){
var _2b4=(dojo.doc.compatMode=="BackCompat")?dojo.body():dojo.doc.documentElement;
var _2b5=dojo._docScroll();
return {w:_2b4.clientWidth,h:_2b4.clientHeight,l:_2b5.x,t:_2b5.y};
};
dojo.window.get=function(doc){
if(dojo.isIE&&window!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
};
dojo.window.scrollIntoView=function(node,pos){
try{
node=dojo.byId(node);
var doc=node.ownerDocument||dojo.doc,body=doc.body||dojo.body(),html=doc.documentElement||body.parentNode,isIE=dojo.isIE,isWK=dojo.isWebKit;
if((!(dojo.isMoz||isIE||isWK||dojo.isOpera)||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _2b6=doc.compatMode=="BackCompat",_2b7=_2b6?body:html,_2b8=isWK?body:_2b7,_2b9=_2b7.clientWidth,_2ba=_2b7.clientHeight,rtl=!dojo._isBodyLtr(),_2bb=pos||dojo.position(node),el=node.parentNode,_2bc=function(el){
return ((isIE<=6||(isIE&&_2b6))?false:(dojo.style(el,"position").toLowerCase()=="fixed"));
};
if(_2bc(node)){
return;
}
while(el){
if(el==body){
el=_2b8;
}
var _2bd=dojo.position(el),_2be=_2bc(el);
if(el==_2b8){
_2bd.w=_2b9;
_2bd.h=_2ba;
if(_2b8==html&&isIE&&rtl){
_2bd.x+=_2b8.offsetWidth-_2bd.w;
}
if(_2bd.x<0||!isIE){
_2bd.x=0;
}
if(_2bd.y<0||!isIE){
_2bd.y=0;
}
}else{
var pb=dojo._getPadBorderExtents(el);
_2bd.w-=pb.w;
_2bd.h-=pb.h;
_2bd.x+=pb.l;
_2bd.y+=pb.t;
}
if(el!=_2b8){
var _2bf=el.clientWidth,_2c0=_2bd.w-_2bf;
if(_2bf>0&&_2c0>0){
_2bd.w=_2bf;
if(isIE&&rtl){
_2bd.x+=_2c0;
}
}
_2bf=el.clientHeight;
_2c0=_2bd.h-_2bf;
if(_2bf>0&&_2c0>0){
_2bd.h=_2bf;
}
}
if(_2be){
if(_2bd.y<0){
_2bd.h+=_2bd.y;
_2bd.y=0;
}
if(_2bd.x<0){
_2bd.w+=_2bd.x;
_2bd.x=0;
}
if(_2bd.y+_2bd.h>_2ba){
_2bd.h=_2ba-_2bd.y;
}
if(_2bd.x+_2bd.w>_2b9){
_2bd.w=_2b9-_2bd.x;
}
}
var l=_2bb.x-_2bd.x,t=_2bb.y-Math.max(_2bd.y,0),r=l+_2bb.w-_2bd.w,bot=t+_2bb.h-_2bd.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
_2bb.x+=el.scrollLeft;
el.scrollLeft+=(isIE>=8&&!_2b6&&rtl)?-s:s;
_2bb.x-=el.scrollLeft;
}
if(bot*t>0){
_2bb.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_2bb.y-=el.scrollTop;
}
el=(el!=_2b8)&&!_2be&&el.parentNode;
}
}
catch(error){
node.scrollIntoView(false);
}
};
dojo.provide("dojo.dnd.autoscroll");
dojo.getObject("dnd",true,dojo);
dojo.dnd.getViewport=dojo.window.getBox;
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(e){
var v=dojo.window.getBox(),dx=0,dy=0;
if(e.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=-dojo.dnd.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=dojo.dnd.H_AUTOSCROLL_VALUE;
}
}
if(e.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=-dojo.dnd.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=dojo.dnd.V_AUTOSCROLL_VALUE;
}
}
window.scrollBy(dx,dy);
};
dojo.dnd._validNodes={"div":1,"p":1,"td":1};
dojo.dnd._validOverflow={"auto":1,"scroll":1};
dojo.dnd.autoScrollNodes=function(e){
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in dojo.dnd._validNodes)){
var s=dojo.getComputedStyle(n);
if(s.overflow.toLowerCase() in dojo.dnd._validOverflow){
var b=dojo._getContentBox(n,s),t=dojo.position(n,true);
var w=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,b.w/2),h=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,b.h/2),rx=e.pageX-t.x,ry=e.pageY-t.y,dx=0,dy=0;
if(dojo.isWebKit||dojo.isOpera){
rx+=dojo.body().scrollLeft;
ry+=dojo.body().scrollTop;
}
if(rx>0&&rx<b.w){
if(rx<w){
dx=-w;
}else{
if(rx>b.w-w){
dx=w;
}
}
}
if(ry>0&&ry<b.h){
if(ry<h){
dy=-h;
}else{
if(ry>b.h-h){
dy=h;
}
}
}
var _2c1=n.scrollLeft,_2c2=n.scrollTop;
n.scrollLeft=n.scrollLeft+dx;
n.scrollTop=n.scrollTop+dy;
if(_2c1!=n.scrollLeft||_2c2!=n.scrollTop){
return;
}
}
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
dojo.dnd.autoScroll(e);
};
dojo.provide("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(node,e,host){
this.node=dojo.byId(node);
var pos=e.touches?e.touches[0]:e;
this.marginBox={l:pos.pageX,t:pos.pageY};
this.mouseButton=e.button;
var h=(this.host=host),d=node.ownerDocument;
this.events=[dojo.connect(d,"onmousemove",this,"onFirstMove"),dojo.connect(d,"ontouchmove",this,"onFirstMove"),dojo.connect(d,"onmousemove",this,"onMouseMove"),dojo.connect(d,"ontouchmove",this,"onMouseMove"),dojo.connect(d,"onmouseup",this,"onMouseUp"),dojo.connect(d,"ontouchend",this,"onMouseUp"),dojo.connect(d,"ondragstart",dojo.stopEvent),dojo.connect(d.body,"onselectstart",dojo.stopEvent)];
if(h&&h.onMoveStart){
h.onMoveStart(this);
}
},onMouseMove:function(e){
dojo.dnd.autoScroll(e);
var m=this.marginBox,pos=e.touches?e.touches[0]:e;
this.host.onMove(this,{l:m.l+pos.pageX,t:m.t+pos.pageY},e);
dojo.stopEvent(e);
},onMouseUp:function(e){
if(dojo.isWebKit&&dojo.isMac&&this.mouseButton==2?e.button==0:this.mouseButton==e.button){
this.destroy();
}
dojo.stopEvent(e);
},onFirstMove:function(e){
var s=this.node.style,l,t,h=this.host;
switch(s.position){
case "relative":
case "absolute":
l=Math.round(parseFloat(s.left))||0;
t=Math.round(parseFloat(s.top))||0;
break;
default:
s.position="absolute";
var m=dojo.marginBox(this.node);
var b=dojo.doc.body;
var bs=dojo.getComputedStyle(b);
var bm=dojo._getMarginBox(b,bs);
var bc=dojo._getContentBox(b,bs);
l=m.l-(bc.l-bm.l);
t=m.t-(bc.t-bm.t);
break;
}
this.marginBox.l=l-this.marginBox.l;
this.marginBox.t=t-this.marginBox.t;
if(h&&h.onFirstMove){
h.onFirstMove(this,e);
}
dojo.disconnect(this.events.shift());
dojo.disconnect(this.events.shift());
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
var h=this.host;
if(h&&h.onMoveStop){
h.onMoveStop(this);
}
this.events=this.node=this.host=null;
}});
dojo.provide("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(node,_2c3){
this.node=dojo.byId(node);
if(!_2c3){
_2c3={};
}
this.handle=_2c3.handle?dojo.byId(_2c3.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_2c3.delay>0?_2c3.delay:0;
this.skip=_2c3.skip;
this.mover=_2c3.mover?_2c3.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ontouchstart",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")];
},markupFactory:function(_2c4,node){
return new dojo.dnd.Moveable(node,_2c4);
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dojo.dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"),dojo.connect(this.handle,"ontouchmove",this,"onMouseMove"),dojo.connect(this.handle,"onmouseup",this,"onMouseUp"),dojo.connect(this.handle,"ontouchend",this,"onMouseUp"));
var pos=e.touches?e.touches[0]:e;
this._lastX=pos.pageX;
this._lastY=pos.pageY;
}else{
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseMove:function(e){
var pos=e.touches?e.touches[0]:e;
if(Math.abs(pos.pageX-this._lastX)>this.delay||Math.abs(pos.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseUp:function(e){
for(var i=0;i<2;++i){
dojo.disconnect(this.events.pop());
}
dojo.stopEvent(e);
},onSelectStart:function(e){
if(!this.skip||!dojo.dnd.isFormElement(e)){
dojo.stopEvent(e);
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_2c5){
dojo.publish("/dnd/move/start",[_2c5]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem");
},onMoveStop:function(_2c6){
dojo.publish("/dnd/move/stop",[_2c6]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem");
},onFirstMove:function(_2c7,e){
},onMove:function(_2c8,_2c9,e){
this.onMoving(_2c8,_2c9);
var s=_2c8.node.style;
s.left=_2c9.l+"px";
s.top=_2c9.t+"px";
this.onMoved(_2c8,_2c9);
},onMoving:function(_2ca,_2cb){
},onMoved:function(_2cc,_2cd){
}});
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){
},within:false,markupFactory:function(_2ce,node){
return new dojo.dnd.move.constrainedMoveable(node,_2ce);
},constructor:function(node,_2cf){
if(!_2cf){
_2cf={};
}
this.constraints=_2cf.constraints;
this.within=_2cf.within;
},onFirstMove:function(_2d0){
var c=this.constraintBox=this.constraints.call(this,_2d0);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=dojo._getMarginSize(_2d0.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_2d1,_2d2){
var c=this.constraintBox,s=_2d1.node.style;
this.onMoving(_2d1,_2d2);
_2d2.l=_2d2.l<c.l?c.l:c.r<_2d2.l?c.r:_2d2.l;
_2d2.t=_2d2.t<c.t?c.t:c.b<_2d2.t?c.b:_2d2.t;
s.left=_2d2.l+"px";
s.top=_2d2.t+"px";
this.onMoved(_2d1,_2d2);
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(_2d3,node){
return new dojo.dnd.move.boxConstrainedMoveable(node,_2d3);
},constructor:function(node,_2d4){
var box=_2d4&&_2d4.box;
this.constraints=function(){
return box;
};
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(_2d5,node){
return new dojo.dnd.move.parentConstrainedMoveable(node,_2d5);
},constructor:function(node,_2d6){
var area=_2d6&&_2d6.area;
this.constraints=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(area=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="padding"){
return mb;
}
t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb;
};
}});
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover;
dojo.provide("dojo.dnd.TimedMoveable");
(function(){
var _2d7=dojo.dnd.Moveable.prototype.onMove;
dojo.declare("dojo.dnd.TimedMoveable",dojo.dnd.Moveable,{timeout:40,constructor:function(node,_2d8){
if(!_2d8){
_2d8={};
}
if(_2d8.timeout&&typeof _2d8.timeout=="number"&&_2d8.timeout>=0){
this.timeout=_2d8.timeout;
}
},markupFactory:function(_2d9,node){
return new dojo.dnd.TimedMoveable(node,_2d9);
},onMoveStop:function(_2da){
if(_2da._timer){
clearTimeout(_2da._timer);
_2d7.call(this,_2da,_2da._leftTop);
}
dojo.dnd.Moveable.prototype.onMoveStop.apply(this,arguments);
},onMove:function(_2db,_2dc){
_2db._leftTop=_2dc;
if(!_2db._timer){
var _2dd=this;
_2db._timer=setTimeout(function(){
_2db._timer=null;
_2d7.call(_2dd,_2db,_2db._leftTop);
},this.timeout);
}
}});
})();
dojo.provide("dojo.fx.Toggler");
dojo.declare("dojo.fx.Toggler",null,{node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,constructor:function(args){
var _2de=this;
dojo.mixin(_2de,args);
_2de.node=args.node;
_2de._showArgs=dojo.mixin({},args);
_2de._showArgs.node=_2de.node;
_2de._showArgs.duration=_2de.showDuration;
_2de.showAnim=_2de.showFunc(_2de._showArgs);
_2de._hideArgs=dojo.mixin({},args);
_2de._hideArgs.node=_2de.node;
_2de._hideArgs.duration=_2de.hideDuration;
_2de.hideAnim=_2de.hideFunc(_2de._hideArgs);
dojo.connect(_2de.showAnim,"beforeBegin",dojo.hitch(_2de.hideAnim,"stop",true));
dojo.connect(_2de.hideAnim,"beforeBegin",dojo.hitch(_2de.showAnim,"stop",true));
},show:function(_2df){
return this.showAnim.play(_2df||0);
},hide:function(_2e0){
return this.hideAnim.play(_2e0||0);
}});
dojo.provide("dojo.fx");
(function(){
var d=dojo,_2e1={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _2e2=function(_2e3){
this._index=-1;
this._animations=_2e3||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
d.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
d.extend(_2e2,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
d.disconnect(this._onAnimateCtx);
d.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(_2e4,_2e5){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_2e5&&this._current.status()=="playing"){
return this;
}
var _2e6=d.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_2e7=d.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_2e8=d.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
d.disconnect(_2e6);
d.disconnect(_2e7);
d.disconnect(_2e8);
});
if(this._onAnimateCtx){
d.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
d.disconnect(this._onEndCtx);
}
this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=d.connect(this._current,"onPause",this,function(arg){
this._fire("onPause",arguments);
d.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_2e9,_2ea){
this.pause();
var _2eb=this.duration*_2e9;
this._current=null;
d.some(this._animations,function(a){
if(a.duration<=_2eb){
this._current=a;
return true;
}
_2eb-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_2eb/this._current.duration,_2ea);
}
return this;
},stop:function(_2ec){
if(this._current){
if(_2ec){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=d.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
d.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
d.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
d.disconnect(this._onEndCtx);
}
}});
d.extend(_2e2,_2e1);
dojo.fx.chain=function(_2ed){
return new _2e2(_2ed);
};
var _2ee=function(_2ef){
this._animations=_2ef||[];
this._connects=[];
this._finished=0;
this.duration=0;
d.forEach(_2ef,function(a){
var _2f0=a.duration;
if(a.delay){
_2f0+=a.delay;
}
if(this.duration<_2f0){
this.duration=_2f0;
}
this._connects.push(d.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new d.Animation({curve:[0,1],duration:this.duration});
var self=this;
d.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
self._connects.push(d.connect(self._pseudoAnimation,evt,function(){
self._fire(evt,arguments);
}));
});
};
d.extend(_2ee,{_doAction:function(_2f1,args){
d.forEach(this._animations,function(a){
a[_2f1].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_2f2,args){
var t=this._pseudoAnimation;
t[_2f2].apply(t,args);
},play:function(_2f3,_2f4){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_2f5,_2f6){
var ms=this.duration*_2f5;
d.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_2f6);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_2f7){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
d.forEach(this._connects,dojo.disconnect);
}});
d.extend(_2ee,_2e1);
dojo.fx.combine=function(_2f8){
return new _2ee(_2f8);
};
dojo.fx.wipeIn=function(args){
var node=args.node=d.byId(args.node),s=node.style,o;
var anim=d.animateProperty(d.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _2f9=d.style(node,"height");
return Math.max(_2f9,1);
}
},end:function(){
return node.scrollHeight;
}}}},args));
d.connect(anim,"onEnd",function(){
s.height="auto";
s.overflow=o;
});
return anim;
};
dojo.fx.wipeOut=function(args){
var node=args.node=d.byId(args.node),s=node.style,o;
var anim=d.animateProperty(d.mixin({properties:{height:{end:1}}},args));
d.connect(anim,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
d.connect(anim,"onEnd",function(){
s.overflow=o;
s.height="auto";
s.display="none";
});
return anim;
};
dojo.fx.slideTo=function(args){
var node=args.node=d.byId(args.node),top=null,left=null;
var init=(function(n){
return function(){
var cs=d.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=d.position(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
init();
var anim=d.animateProperty(d.mixin({properties:{top:args.top||0,left:args.left||0}},args));
d.connect(anim,"beforeBegin",anim,init);
return anim;
};
})();
dojo.provide("dijit._base.manager");
dojo.declare("dijit.WidgetSet",null,{constructor:function(){
this._hash={};
this.length=0;
},add:function(_2fa){
if(this._hash[_2fa.id]){
throw new Error("Tried to register widget with id=="+_2fa.id+" but that id is already registered");
}
this._hash[_2fa.id]=_2fa;
this.length++;
},remove:function(id){
if(this._hash[id]){
delete this._hash[id];
this.length--;
}
},forEach:function(func,_2fb){
_2fb=_2fb||dojo.global;
var i=0,id;
for(id in this._hash){
func.call(_2fb,this._hash[id],i++,this._hash);
}
return this;
},filter:function(_2fc,_2fd){
_2fd=_2fd||dojo.global;
var res=new dijit.WidgetSet(),i=0,id;
for(id in this._hash){
var w=this._hash[id];
if(_2fc.call(_2fd,w,i++,this._hash)){
res.add(w);
}
}
return res;
},byId:function(id){
return this._hash[id];
},byClass:function(cls){
var res=new dijit.WidgetSet(),id,_2fe;
for(id in this._hash){
_2fe=this._hash[id];
if(_2fe.declaredClass==cls){
res.add(_2fe);
}
}
return res;
},toArray:function(){
var ar=[];
for(var id in this._hash){
ar.push(this._hash[id]);
}
return ar;
},map:function(func,_2ff){
return dojo.map(this.toArray(),func,_2ff);
},every:function(func,_300){
_300=_300||dojo.global;
var x=0,i;
for(i in this._hash){
if(!func.call(_300,this._hash[i],x++,this._hash)){
return false;
}
}
return true;
},some:function(func,_301){
_301=_301||dojo.global;
var x=0,i;
for(i in this._hash){
if(func.call(_301,this._hash[i],x++,this._hash)){
return true;
}
}
return false;
}});
(function(){
dijit.registry=new dijit.WidgetSet();
var hash=dijit.registry._hash,attr=dojo.attr,_302=dojo.hasAttr,_303=dojo.style;
dijit.byId=function(id){
return typeof id=="string"?hash[id]:id;
};
var _304={};
dijit.getUniqueId=function(_305){
var id;
do{
id=_305+"_"+(_305 in _304?++_304[_305]:_304[_305]=0);
}while(hash[id]);
return dijit._scopeName=="dijit"?id:dijit._scopeName+"_"+id;
};
dijit.findWidgets=function(root){
var _306=[];
function _307(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _308=node.getAttribute("widgetId");
if(_308){
var _309=hash[_308];
if(_309){
_306.push(_309);
}
}else{
_307(node);
}
}
}
};
_307(root);
return _306;
};
dijit._destroyAll=function(){
dijit._curFocus=null;
dijit._prevFocus=null;
dijit._activeStack=[];
dojo.forEach(dijit.findWidgets(dojo.body()),function(_30a){
if(!_30a._destroyed){
if(_30a.destroyRecursive){
_30a.destroyRecursive();
}else{
if(_30a.destroy){
_30a.destroy();
}
}
}
});
};
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
dijit._destroyAll();
});
}
dijit.byNode=function(node){
return hash[node.getAttribute("widgetId")];
};
dijit.getEnclosingWidget=function(node){
while(node){
var id=node.getAttribute&&node.getAttribute("widgetId");
if(id){
return hash[id];
}
node=node.parentNode;
}
return null;
};
var _30b=(dijit._isElementShown=function(elem){
var s=_303(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(attr(elem,"type")!="hidden");
});
dijit.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _302(elem,"href");
case "area":
case "button":
case "input":
case "object":
case "select":
case "textarea":
return true;
case "iframe":
var body;
try{
var _30c=elem.contentDocument;
if("designMode" in _30c&&_30c.designMode=="on"){
return true;
}
body=_30c.body;
}
catch(e1){
try{
body=elem.contentWindow.document.body;
}
catch(e2){
return false;
}
}
return body.contentEditable=="true"||(body.firstChild&&body.firstChild.contentEditable=="true");
default:
return elem.contentEditable=="true";
}
};
var _30d=(dijit.isTabNavigable=function(elem){
if(attr(elem,"disabled")){
return false;
}else{
if(_302(elem,"tabIndex")){
return attr(elem,"tabIndex")>=0;
}else{
return dijit.hasDefaultTabStop(elem);
}
}
});
dijit._getTabNavigable=function(root){
var _30e,last,_30f,_310,_311,_312,_313={};
function _314(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _315=function(_316){
dojo.query("> *",_316).forEach(function(_317){
if((dojo.isIE&&_317.scopeName!=="HTML")||!_30b(_317)){
return;
}
if(_30d(_317)){
var _318=attr(_317,"tabIndex");
if(!_302(_317,"tabIndex")||_318==0){
if(!_30e){
_30e=_317;
}
last=_317;
}else{
if(_318>0){
if(!_30f||_318<_310){
_310=_318;
_30f=_317;
}
if(!_311||_318>=_312){
_312=_318;
_311=_317;
}
}
}
var rn=_314(_317);
if(dojo.attr(_317,"checked")&&rn){
_313[rn]=_317;
}
}
if(_317.nodeName.toUpperCase()!="SELECT"){
_315(_317);
}
});
};
if(_30b(root)){
_315(root);
}
function rs(node){
return _313[_314(node)]||node;
};
return {first:rs(_30e),last:rs(last),lowest:rs(_30f),highest:rs(_311)};
};
dijit.getFirstInTabbingOrder=function(root){
var _319=dijit._getTabNavigable(dojo.byId(root));
return _319.lowest?_319.lowest:_319.first;
};
dijit.getLastInTabbingOrder=function(root){
var _31a=dijit._getTabNavigable(dojo.byId(root));
return _31a.last?_31a.last:_31a.highest;
};
dijit.defaultDuration=dojo.config["defaultDuration"]||200;
})();
dojo.provide("dojo.Stateful");
dojo.declare("dojo.Stateful",null,{postscript:function(_31b){
if(_31b){
dojo.mixin(this,_31b);
}
},get:function(name){
return this[name];
},set:function(name,_31c){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _31d=this[name];
this[name]=_31c;
if(this._watchCallbacks){
this._watchCallbacks(name,_31d,_31c);
}
return this;
},watch:function(name,_31e){
var _31f=this._watchCallbacks;
if(!_31f){
var self=this;
_31f=this._watchCallbacks=function(name,_320,_321,_322){
var _323=function(_324){
if(_324){
_324=_324.slice();
for(var i=0,l=_324.length;i<l;i++){
try{
_324[i].call(self,name,_320,_321);
}
catch(e){
}
}
}
};
_323(_31f["_"+name]);
if(!_322){
_323(_31f["*"]);
}
};
}
if(!_31e&&typeof name==="function"){
_31e=name;
name="*";
}else{
name="_"+name;
}
var _325=_31f[name];
if(typeof _325!=="object"){
_325=_31f[name]=[];
}
_325.push(_31e);
return {unwatch:function(){
_325.splice(dojo.indexOf(_325,_31e),1);
}};
}});
dojo.provide("dijit._WidgetBase");
(function(){
dojo.declare("dijit._WidgetBase",dojo.Stateful,{id:"",lang:"",dir:"","class":"",style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},_blankGif:(dojo.config.blankGif||dojo.moduleUrl("dojo","resources/blank.gif")).toString(),postscript:function(_326,_327){
this.create(_326,_327);
},create:function(_328,_329){
this.srcNodeRef=dojo.byId(_329);
this._connects=[];
this._subscribes=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_328){
this.params=_328;
dojo._mixin(this,_328);
}
this.postMixInProperties();
if(!this.id){
this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
dijit.registry.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _32a=this.srcNodeRef;
if(_32a&&_32a.parentNode&&this.domNode!==_32a){
_32a.parentNode.replaceChild(this.domNode,_32a);
}
}
if(this.domNode){
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){
delete this.srcNodeRef;
}
this._created=true;
},_applyAttributes:function(){
var _32b=function(attr,_32c){
if((_32c.params&&attr in _32c.params)||_32c[attr]){
_32c.set(attr,_32c[attr]);
}
};
for(var attr in this.attributeMap){
_32b(attr,this);
}
dojo.forEach(this._getSetterAttributes(),function(a){
if(!(a in this.attributeMap)){
_32b(a,this);
}
},this);
},_getSetterAttributes:function(){
var ctor=this.constructor;
if(!ctor._setterAttrs){
var r=(ctor._setterAttrs=[]),_32d,_32e=ctor.prototype;
for(var _32f in _32e){
if(dojo.isFunction(_32e[_32f])&&(_32d=_32f.match(/^_set([a-zA-Z]*)Attr$/))&&_32d[1]){
r.push(_32d[1].charAt(0).toLowerCase()+_32d[1].substr(1));
}
}
}
return ctor._setterAttrs;
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||dojo.create("div");
}
if(this.baseClass){
var _330=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_330=_330.concat(dojo.map(_330,function(name){
return name+"Rtl";
}));
}
dojo.addClass(this.domNode,_330);
}
},postCreate:function(){
},startup:function(){
this._started=true;
},destroyRecursive:function(_331){
this._beingDestroyed=true;
this.destroyDescendants(_331);
this.destroy(_331);
},destroy:function(_332){
this._beingDestroyed=true;
this.uninitialize();
var d=dojo,dfe=d.forEach,dun=d.unsubscribe;
dfe(this._connects,function(_333){
dfe(_333,d.disconnect);
});
dfe(this._subscribes,function(_334){
dun(_334);
});
dfe(this._supportingWidgets||[],function(w){
if(w.destroyRecursive){
w.destroyRecursive();
}else{
if(w.destroy){
w.destroy();
}
}
});
this.destroyRendering(_332);
dijit.registry.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_335){
if(this.bgIframe){
this.bgIframe.destroy(_335);
delete this.bgIframe;
}
if(this.domNode){
if(_335){
dojo.removeAttr(this.domNode,"widgetId");
}else{
dojo.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_335){
dojo.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_336){
dojo.forEach(this.getChildren(),function(_337){
if(_337.destroyRecursive){
_337.destroyRecursive(_336);
}
});
},uninitialize:function(){
return false;
},_setClassAttr:function(_338){
var _339=this[this.attributeMap["class"]||"domNode"];
dojo.replaceClass(_339,_338,this["class"]);
this._set("class",_338);
},_setStyleAttr:function(_33a){
var _33b=this[this.attributeMap.style||"domNode"];
if(dojo.isObject(_33a)){
dojo.style(_33b,_33a);
}else{
if(_33b.style.cssText){
_33b.style.cssText+="; "+_33a;
}else{
_33b.style.cssText=_33a;
}
}
this._set("style",_33a);
},_attrToDom:function(attr,_33c){
var _33d=this.attributeMap[attr];
dojo.forEach(dojo.isArray(_33d)?_33d:[_33d],function(_33e){
var _33f=this[_33e.node||_33e||"domNode"];
var type=_33e.type||"attribute";
switch(type){
case "attribute":
if(dojo.isFunction(_33c)){
_33c=dojo.hitch(this,_33c);
}
var _340=_33e.attribute?_33e.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
dojo.attr(_33f,_340,_33c);
break;
case "innerText":
_33f.innerHTML="";
_33f.appendChild(dojo.doc.createTextNode(_33c));
break;
case "innerHTML":
_33f.innerHTML=_33c;
break;
case "class":
dojo.replaceClass(_33f,_33c,this[attr]);
break;
}
},this);
},get:function(name){
var _341=this._getAttrNames(name);
return this[_341.g]?this[_341.g]():this[name];
},set:function(name,_342){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _343=this._getAttrNames(name);
if(this[_343.s]){
var _344=this[_343.s].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(name in this.attributeMap){
this._attrToDom(name,_342);
}
this._set(name,_342);
}
return _344||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.charAt(0).toUpperCase()+name.substr(1);
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr"});
},_set:function(name,_345){
var _346=this[name];
this[name]=_345;
if(this._watchCallbacks&&this._created&&_345!==_346){
this._watchCallbacks(name,_346,_345);
}
},toString:function(){
return "[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]";
},getDescendants:function(){
return this.containerNode?dojo.query("[widgetId]",this.containerNode).map(dijit.byNode):[];
},getChildren:function(){
return this.containerNode?dijit.findWidgets(this.containerNode):[];
},connect:function(obj,_347,_348){
var _349=[dojo._connect(obj,_347,this,_348)];
this._connects.push(_349);
return _349;
},disconnect:function(_34a){
for(var i=0;i<this._connects.length;i++){
if(this._connects[i]==_34a){
dojo.forEach(_34a,dojo.disconnect);
this._connects.splice(i,1);
return;
}
}
},subscribe:function(_34b,_34c){
var _34d=dojo.subscribe(_34b,this,_34c);
this._subscribes.push(_34d);
return _34d;
},unsubscribe:function(_34e){
for(var i=0;i<this._subscribes.length;i++){
if(this._subscribes[i]==_34e){
dojo.unsubscribe(_34e);
this._subscribes.splice(i,1);
return;
}
}
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):dojo._isBodyLtr();
},placeAt:function(_34f,_350){
if(_34f.declaredClass&&_34f.addChild){
_34f.addChild(this,_350);
}else{
dojo.place(this.domNode,_34f,_350);
}
return this;
}});
})();
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){
return dijit.getBookmark().isCollapsed;
},getBookmark:function(){
var bm,rg,tg,sel=dojo.doc.selection,cf=dijit._curFocus;
if(dojo.global.getSelection){
sel=dojo.global.getSelection();
if(sel){
if(sel.isCollapsed){
tg=cf?cf.tagName:"";
if(tg){
tg=tg.toLowerCase();
if(tg=="textarea"||(tg=="input"&&(!cf.type||cf.type.toLowerCase()=="text"))){
sel={start:cf.selectionStart,end:cf.selectionEnd,node:cf,pRange:true};
return {isCollapsed:(sel.end<=sel.start),mark:sel};
}
}
bm={isCollapsed:true};
}else{
rg=sel.getRangeAt(0);
bm={isCollapsed:false,mark:rg.cloneRange()};
}
}
}else{
if(sel){
tg=cf?cf.tagName:"";
tg=tg.toLowerCase();
if(cf&&tg&&(tg=="button"||tg=="textarea"||tg=="input")){
if(sel.type&&sel.type.toLowerCase()=="none"){
return {isCollapsed:true,mark:null};
}else{
rg=sel.createRange();
return {isCollapsed:rg.text&&rg.text.length?false:true,mark:{range:rg,pRange:true}};
}
}
bm={};
try{
rg=sel.createRange();
bm.isCollapsed=!(sel.type=="Text"?rg.htmlText.length:rg.length);
}
catch(e){
bm.isCollapsed=true;
return bm;
}
if(sel.type.toUpperCase()=="CONTROL"){
if(rg.length){
bm.mark=[];
var i=0,len=rg.length;
while(i<len){
bm.mark.push(rg.item(i++));
}
}else{
bm.isCollapsed=true;
bm.mark=null;
}
}else{
bm.mark=rg.getBookmark();
}
}else{
}
}
return bm;
},moveToBookmark:function(_351){
var _352=dojo.doc,mark=_351.mark;
if(mark){
if(dojo.global.getSelection){
var sel=dojo.global.getSelection();
if(sel&&sel.removeAllRanges){
if(mark.pRange){
var r=mark;
var n=r.node;
n.selectionStart=r.start;
n.selectionEnd=r.end;
}else{
sel.removeAllRanges();
sel.addRange(mark);
}
}else{
}
}else{
if(_352.selection&&mark){
var rg;
if(mark.pRange){
rg=mark.range;
}else{
if(dojo.isArray(mark)){
rg=_352.body.createControlRange();
dojo.forEach(mark,function(n){
rg.addElement(n);
});
}else{
rg=_352.body.createTextRange();
rg.moveToBookmark(mark);
}
}
rg.select();
}
}
}
},getFocus:function(menu,_353){
var node=!dijit._curFocus||(menu&&dojo.isDescendant(dijit._curFocus,menu.domNode))?dijit._prevFocus:dijit._curFocus;
return {node:node,bookmark:(node==dijit._curFocus)&&dojo.withGlobal(_353||dojo.global,dijit.getBookmark),openedForWindow:_353};
},focus:function(_354){
if(!_354){
return;
}
var node="node" in _354?_354.node:_354,_355=_354.bookmark,_356=_354.openedForWindow,_357=_355?_355.isCollapsed:false;
if(node){
var _358=(node.tagName.toLowerCase()=="iframe")?node.contentWindow:node;
if(_358&&_358.focus){
try{
_358.focus();
}
catch(e){
}
}
dijit._onFocusNode(node);
}
if(_355&&dojo.withGlobal(_356||dojo.global,dijit.isCollapsed)&&!_357){
if(_356){
_356.focus();
}
try{
dojo.withGlobal(_356||dojo.global,dijit.moveToBookmark,null,[_355]);
}
catch(e2){
}
}
},_activeStack:[],registerIframe:function(_359){
return dijit.registerWin(_359.contentWindow,_359);
},unregisterIframe:function(_35a){
dijit.unregisterWin(_35a);
},registerWin:function(_35b,_35c){
var _35d=function(evt){
dijit._justMouseDowned=true;
setTimeout(function(){
dijit._justMouseDowned=false;
},0);
if(dojo.isIE&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
dijit._onTouchNode(_35c||evt.target||evt.srcElement,"mouse");
};
var doc=dojo.isIE?_35b.document.documentElement:_35b.document;
if(doc){
if(dojo.isIE){
_35b.document.body.attachEvent("onmousedown",_35d);
var _35e=function(evt){
if(evt.srcElement.tagName.toLowerCase()!="#document"&&dijit.isTabNavigable(evt.srcElement)){
dijit._onFocusNode(_35c||evt.srcElement);
}else{
dijit._onTouchNode(_35c||evt.srcElement);
}
};
doc.attachEvent("onactivate",_35e);
var _35f=function(evt){
dijit._onBlurNode(_35c||evt.srcElement);
};
doc.attachEvent("ondeactivate",_35f);
return function(){
_35b.document.detachEvent("onmousedown",_35d);
doc.detachEvent("onactivate",_35e);
doc.detachEvent("ondeactivate",_35f);
doc=null;
};
}else{
doc.body.addEventListener("mousedown",_35d,true);
var _360=function(evt){
dijit._onFocusNode(_35c||evt.target);
};
doc.addEventListener("focus",_360,true);
var _361=function(evt){
dijit._onBlurNode(_35c||evt.target);
};
doc.addEventListener("blur",_361,true);
return function(){
doc.body.removeEventListener("mousedown",_35d,true);
doc.removeEventListener("focus",_360,true);
doc.removeEventListener("blur",_361,true);
doc=null;
};
}
}
},unregisterWin:function(_362){
_362&&_362();
},_onBlurNode:function(node){
dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
if(dijit._justMouseDowned){
return;
}
if(dijit._clearActiveWidgetsTimer){
clearTimeout(dijit._clearActiveWidgetsTimer);
}
dijit._clearActiveWidgetsTimer=setTimeout(function(){
delete dijit._clearActiveWidgetsTimer;
dijit._setStack([]);
dijit._prevFocus=null;
},100);
},_onTouchNode:function(node,by){
if(dijit._clearActiveWidgetsTimer){
clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer;
}
var _363=[];
try{
while(node){
var _364=dojo.attr(node,"dijitPopupParent");
if(_364){
node=dijit.byId(_364).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===dojo.body()){
break;
}
node=dojo.window.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_365=id&&dijit.byId(id);
if(_365&&!(by=="mouse"&&_365.get("disabled"))){
_363.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
dijit._setStack(_363,by);
},_onFocusNode:function(node){
if(!node){
return;
}
if(node.nodeType==9){
return;
}
dijit._onTouchNode(node);
if(node==dijit._curFocus){
return;
}
if(dijit._curFocus){
dijit._prevFocus=dijit._curFocus;
}
dijit._curFocus=node;
dojo.publish("focusNode",[node]);
},_setStack:function(_366,by){
var _367=dijit._activeStack;
dijit._activeStack=_366;
for(var _368=0;_368<Math.min(_367.length,_366.length);_368++){
if(_367[_368]!=_366[_368]){
break;
}
}
var _369;
for(var i=_367.length-1;i>=_368;i--){
_369=dijit.byId(_367[i]);
if(_369){
_369._focused=false;
_369.set("focused",false);
_369._hasBeenBlurred=true;
if(_369._onBlur){
_369._onBlur(by);
}
dojo.publish("widgetBlur",[_369,by]);
}
}
for(i=_368;i<_366.length;i++){
_369=dijit.byId(_366[i]);
if(_369){
_369._focused=true;
_369.set("focused",true);
if(_369._onFocus){
_369._onFocus(by);
}
dojo.publish("widgetFocus",[_369,by]);
}
}
}});
dojo.addOnLoad(function(){
var _36a=dijit.registerWin(window);
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
dijit.unregisterWin(_36a);
_36a=null;
});
}
});
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(_36b){
this.pairs=[];
this.returnWrappers=_36b||false;
};
dojo.extend(dojo.AdapterRegistry,{register:function(name,_36c,wrap,_36d,_36e){
this.pairs[((_36e)?"unshift":"push")]([name,_36c,wrap,_36d]);
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[1].apply(this,arguments)){
if((pair[3])||(this.returnWrappers)){
return pair[2];
}else{
return pair[2].apply(this,arguments);
}
}
}
throw new Error("No match found");
},unregister:function(name){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[0]==name){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
dojo.provide("dijit._base.place");
dijit.getViewport=function(){
return dojo.window.getBox();
};
dijit.placeOnScreen=function(node,pos,_36f,_370){
var _371=dojo.map(_36f,function(_372){
var c={corner:_372,pos:{x:pos.x,y:pos.y}};
if(_370){
c.pos.x+=_372.charAt(1)=="L"?_370.x:-_370.x;
c.pos.y+=_372.charAt(0)=="T"?_370.y:-_370.y;
}
return c;
});
return dijit._place(node,_371);
};
dijit._place=function(node,_373,_374,_375){
var view=dojo.window.getBox();
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
dojo.body().appendChild(node);
}
var best=null;
dojo.some(_373,function(_376){
var _377=_376.corner;
var pos=_376.pos;
var _378=0;
var _379={w:_377.charAt(1)=="L"?(view.l+view.w)-pos.x:pos.x-view.l,h:_377.charAt(1)=="T"?(view.t+view.h)-pos.y:pos.y-view.t};
if(_374){
var res=_374(node,_376.aroundCorner,_377,_379,_375);
_378=typeof res=="undefined"?0:res;
}
var _37a=node.style;
var _37b=_37a.display;
var _37c=_37a.visibility;
_37a.visibility="hidden";
_37a.display="";
var mb=dojo.marginBox(node);
_37a.display=_37b;
_37a.visibility=_37c;
var _37d=Math.max(view.l,_377.charAt(1)=="L"?pos.x:(pos.x-mb.w)),_37e=Math.max(view.t,_377.charAt(0)=="T"?pos.y:(pos.y-mb.h)),endX=Math.min(view.l+view.w,_377.charAt(1)=="L"?(_37d+mb.w):pos.x),endY=Math.min(view.t+view.h,_377.charAt(0)=="T"?(_37e+mb.h):pos.y),_37f=endX-_37d,_380=endY-_37e;
_378+=(mb.w-_37f)+(mb.h-_380);
if(best==null||_378<best.overflow){
best={corner:_377,aroundCorner:_376.aroundCorner,x:_37d,y:_37e,w:_37f,h:_380,overflow:_378,spaceAvailable:_379};
}
return !_378;
});
if(best.overflow&&_374){
_374(node,best.aroundCorner,best.corner,best.spaceAvailable,_375);
}
var l=dojo._isBodyLtr(),s=node.style;
s.top=best.y+"px";
s[l?"left":"right"]=(l?best.x:view.w-best.x-best.w)+"px";
return best;
};
dijit.placeOnScreenAroundNode=function(node,_381,_382,_383){
_381=dojo.byId(_381);
var _384=dojo.position(_381,true);
return dijit._placeOnScreenAroundRect(node,_384.x,_384.y,_384.w,_384.h,_382,_383);
};
dijit.placeOnScreenAroundRectangle=function(node,_385,_386,_387){
return dijit._placeOnScreenAroundRect(node,_385.x,_385.y,_385.width,_385.height,_386,_387);
};
dijit._placeOnScreenAroundRect=function(node,x,y,_388,_389,_38a,_38b){
var _38c=[];
for(var _38d in _38a){
_38c.push({aroundCorner:_38d,corner:_38a[_38d],pos:{x:x+(_38d.charAt(1)=="L"?0:_388),y:y+(_38d.charAt(0)=="T"?0:_389)}});
}
return dijit._place(node,_38c,_38b,{w:_388,h:_389});
};
dijit.placementRegistry=new dojo.AdapterRegistry();
dijit.placementRegistry.register("node",function(n,x){
return typeof x=="object"&&typeof x.offsetWidth!="undefined"&&typeof x.offsetHeight!="undefined";
},dijit.placeOnScreenAroundNode);
dijit.placementRegistry.register("rect",function(n,x){
return typeof x=="object"&&"x" in x&&"y" in x&&"width" in x&&"height" in x;
},dijit.placeOnScreenAroundRectangle);
dijit.placeOnScreenAroundElement=function(node,_38e,_38f,_390){
return dijit.placementRegistry.match.apply(dijit.placementRegistry,arguments);
};
dijit.getPopupAroundAlignment=function(_391,_392){
var _393={};
dojo.forEach(_391,function(pos){
switch(pos){
case "after":
_393[_392?"BR":"BL"]=_392?"BL":"BR";
break;
case "before":
_393[_392?"BL":"BR"]=_392?"BR":"BL";
break;
case "below-alt":
_392=!_392;
case "below":
_393[_392?"BL":"BR"]=_392?"TL":"TR";
_393[_392?"BR":"BL"]=_392?"TR":"TL";
break;
case "above-alt":
_392=!_392;
case "above":
default:
_393[_392?"TL":"TR"]=_392?"BL":"BR";
_393[_392?"TR":"TL"]=_392?"BR":"BL";
break;
}
});
return _393;
};
dojo.provide("dijit._base.window");
dijit.getDocumentWindow=function(doc){
return dojo.window.get(doc);
};
dojo.provide("dijit._base.popup");
dijit.popup={_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_394){
var _395=_394.declaredClass?_394._popupWrapper:(dojo.hasClass(_394.parentNode,"dijitPopup")&&_394.parentNode),node=_394.domNode||_394;
if(!_395){
_395=dojo.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},dojo.body());
_395.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
if(_394.declaredClass){
_394._popupWrapper=_395;
dojo.connect(_394,"destroy",function(){
dojo.destroy(_395);
delete _394._popupWrapper;
});
}
}
return _395;
},moveOffScreen:function(_396){
var _397=this._createWrapper(_396);
dojo.style(_397,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_398){
var _399=this._createWrapper(_398);
dojo.style(_399,"display","none");
},getTopPopup:function(){
var _39a=this._stack;
for(var pi=_39a.length-1;pi>0&&_39a[pi].parent===_39a[pi-1].widget;pi--){
}
return _39a[pi];
},open:function(args){
var _39b=this._stack,_39c=args.popup,_39d=args.orient||((args.parent?args.parent.isLeftToRight():dojo._isBodyLtr())?{"BL":"TL","BR":"TR","TL":"BL","TR":"BR"}:{"BR":"TR","BL":"TL","TR":"BR","TL":"BL"}),_39e=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_39b.length&&(!args.parent||!dojo.isDescendant(args.parent.domNode,_39b[_39b.length-1].widget.domNode))){
dijit.popup.close(_39b[_39b.length-1].widget);
}
var _39f=this._createWrapper(_39c);
dojo.attr(_39f,{id:id,style:{zIndex:this._beginZIndex+_39b.length},"class":"dijitPopup "+(_39c.baseClass||_39c["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(dojo.isIE||dojo.isMoz){
if(!_39c.bgIframe){
_39c.bgIframe=new dijit.BackgroundIframe(_39f);
}
}
var best=_39e?dijit.placeOnScreenAroundElement(_39f,_39e,_39d,_39c.orient?dojo.hitch(_39c,"orient"):null):dijit.placeOnScreen(_39f,args,_39d=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_39f.style.display="";
_39f.style.visibility="visible";
_39c.domNode.style.visibility="visible";
var _3a0=[];
_3a0.push(dojo.connect(_39f,"onkeypress",this,function(evt){
if(evt.charOrCode==dojo.keys.ESCAPE&&args.onCancel){
dojo.stopEvent(evt);
args.onCancel();
}else{
if(evt.charOrCode===dojo.keys.TAB){
dojo.stopEvent(evt);
var _3a1=this.getTopPopup();
if(_3a1&&_3a1.onCancel){
_3a1.onCancel();
}
}
}
}));
if(_39c.onCancel){
_3a0.push(dojo.connect(_39c,"onCancel",args.onCancel));
}
_3a0.push(dojo.connect(_39c,_39c.onExecute?"onExecute":"onChange",this,function(){
var _3a2=this.getTopPopup();
if(_3a2&&_3a2.onExecute){
_3a2.onExecute();
}
}));
_39b.push({widget:_39c,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_3a0});
if(_39c.onOpen){
_39c.onOpen(best);
}
return best;
},close:function(_3a3){
var _3a4=this._stack;
while((_3a3&&dojo.some(_3a4,function(elem){
return elem.widget==_3a3;
}))||(!_3a3&&_3a4.length)){
var top=_3a4.pop(),_3a5=top.widget,_3a6=top.onClose;
if(_3a5.onClose){
_3a5.onClose();
}
dojo.forEach(top.handlers,dojo.disconnect);
if(_3a5&&_3a5.domNode){
this.hide(_3a5);
}
if(_3a6){
_3a6();
}
}
}};
dijit._frames=new function(){
var _3a7=[];
this.pop=function(){
var _3a8;
if(_3a7.length){
_3a8=_3a7.pop();
_3a8.style.display="";
}else{
if(dojo.isIE<9){
var burl=dojo.config["dojoBlankHtmlUrl"]||(dojo.moduleUrl("dojo","resources/blank.html")+"")||"javascript:\"\"";
var html="<iframe src='"+burl+"'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_3a8=dojo.doc.createElement(html);
}else{
_3a8=dojo.create("iframe");
_3a8.src="javascript:\"\"";
_3a8.className="dijitBackgroundIframe";
dojo.style(_3a8,"opacity",0.1);
}
_3a8.tabIndex=-1;
dijit.setWaiRole(_3a8,"presentation");
}
return _3a8;
};
this.push=function(_3a9){
_3a9.style.display="none";
_3a7.push(_3a9);
};
}();
dijit.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(dojo.isIE||dojo.isMoz){
var _3aa=(this.iframe=dijit._frames.pop());
node.appendChild(_3aa);
if(dojo.isIE<7||dojo.isQuirks){
this.resize(node);
this._conn=dojo.connect(node,"onresize",this,function(){
this.resize(node);
});
}else{
dojo.style(_3aa,{width:"100%",height:"100%"});
}
}
};
dojo.extend(dijit.BackgroundIframe,{resize:function(node){
if(this.iframe){
dojo.style(this.iframe,{width:node.offsetWidth+"px",height:node.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
dojo.disconnect(this._conn);
this._conn=null;
}
if(this.iframe){
dijit._frames.push(this.iframe);
delete this.iframe;
}
}});
dojo.provide("dijit._base.scroll");
dijit.scrollIntoView=function(node,pos){
dojo.window.scrollIntoView(node,pos);
};
dojo.provide("dojo.uacss");
(function(){
var d=dojo,html=d.doc.documentElement,ie=d.isIE,_3ab=d.isOpera,maj=Math.floor,ff=d.isFF,_3ac=d.boxModel.replace(/-/,""),_3ad={dj_ie:ie,dj_ie6:maj(ie)==6,dj_ie7:maj(ie)==7,dj_ie8:maj(ie)==8,dj_ie9:maj(ie)==9,dj_quirks:d.isQuirks,dj_iequirks:ie&&d.isQuirks,dj_opera:_3ab,dj_khtml:d.isKhtml,dj_webkit:d.isWebKit,dj_safari:d.isSafari,dj_chrome:d.isChrome,dj_gecko:d.isMozilla,dj_ff3:maj(ff)==3};
_3ad["dj_"+_3ac]=true;
var _3ae="";
for(var clz in _3ad){
if(_3ad[clz]){
_3ae+=clz+" ";
}
}
html.className=d.trim(html.className+" "+_3ae);
dojo._loaders.unshift(function(){
if(!dojo._isBodyLtr()){
var _3af="dj_rtl dijitRtl "+_3ae.replace(/ /g,"-rtl ");
html.className=d.trim(html.className+" "+_3af);
}
});
})();
dojo.provide("dijit._base.sniff");
dojo.provide("dijit._base.typematic");
dijit.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=Math.max(this._currentTimeout<0?this._initialDelay:(this._subsequentDelay>1?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay)),this._minDelay);
this._timer=setTimeout(dojo.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(evt,_3b0,node,_3b1,obj,_3b2,_3b3,_3b4){
if(obj!=this._obj){
this.stop();
this._initialDelay=_3b3||500;
this._subsequentDelay=_3b2||0.9;
this._minDelay=_3b4||10;
this._obj=obj;
this._evt=evt;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(_3b0,_3b1);
this._fireEventAndReload();
this._evt=dojo.mixin({faux:true},evt);
}
},stop:function(){
if(this._timer){
clearTimeout(this._timer);
this._timer=null;
}
if(this._obj){
this._callback(-1,this._node,this._evt);
this._obj=null;
}
},addKeyListener:function(node,_3b5,_3b6,_3b7,_3b8,_3b9,_3ba){
if(_3b5.keyCode){
_3b5.charOrCode=_3b5.keyCode;
dojo.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}else{
if(_3b5.charCode){
_3b5.charOrCode=String.fromCharCode(_3b5.charCode);
dojo.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}
}
return [dojo.connect(node,"onkeypress",this,function(evt){
if(evt.charOrCode==_3b5.charOrCode&&(_3b5.ctrlKey===undefined||_3b5.ctrlKey==evt.ctrlKey)&&(_3b5.altKey===undefined||_3b5.altKey==evt.altKey)&&(_3b5.metaKey===undefined||_3b5.metaKey==(evt.metaKey||false))&&(_3b5.shiftKey===undefined||_3b5.shiftKey==evt.shiftKey)){
dojo.stopEvent(evt);
dijit.typematic.trigger(evt,_3b6,node,_3b7,_3b5,_3b8,_3b9,_3ba);
}else{
if(dijit.typematic._obj==_3b5){
dijit.typematic.stop();
}
}
}),dojo.connect(node,"onkeyup",this,function(evt){
if(dijit.typematic._obj==_3b5){
dijit.typematic.stop();
}
})];
},addMouseListener:function(node,_3bb,_3bc,_3bd,_3be,_3bf){
var dc=dojo.connect;
return [dc(node,"mousedown",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.trigger(evt,_3bb,node,_3bc,node,_3bd,_3be,_3bf);
}),dc(node,"mouseup",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.stop();
}),dc(node,"mouseout",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.stop();
}),dc(node,"mousemove",this,function(evt){
evt.preventDefault();
}),dc(node,"dblclick",this,function(evt){
dojo.stopEvent(evt);
if(dojo.isIE){
dijit.typematic.trigger(evt,_3bb,node,_3bc,node,_3bd,_3be,_3bf);
setTimeout(dojo.hitch(this,dijit.typematic.stop),50);
}
})];
},addListener:function(_3c0,_3c1,_3c2,_3c3,_3c4,_3c5,_3c6,_3c7){
return this.addKeyListener(_3c1,_3c2,_3c3,_3c4,_3c5,_3c6,_3c7).concat(this.addMouseListener(_3c0,_3c3,_3c4,_3c5,_3c6,_3c7));
}};
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){
var div=dojo.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(dojo.config.blankGif||dojo.moduleUrl("dojo","resources/blank.gif"))+"\");"}},dojo.body());
var cs=dojo.getComputedStyle(div);
if(cs){
var _3c8=cs.backgroundImage;
var _3c9=(cs.borderTopColor==cs.borderRightColor)||(_3c8!=null&&(_3c8=="none"||_3c8=="url(invalid-url:)"));
dojo[_3c9?"addClass":"removeClass"](dojo.body(),"dijit_a11y");
if(dojo.isIE){
div.outerHTML="";
}else{
dojo.body().removeChild(div);
}
}
}};
if(dojo.isIE||dojo.isMoz){
dojo._loaders.unshift(dijit.wai.onload);
}
dojo.mixin(dijit,{hasWaiRole:function(elem,role){
var _3ca=this.getWaiRole(elem);
return role?(_3ca.indexOf(role)>-1):(_3ca.length>0);
},getWaiRole:function(elem){
return dojo.trim((dojo.attr(elem,"role")||"").replace("wairole:",""));
},setWaiRole:function(elem,role){
dojo.attr(elem,"role",role);
},removeWaiRole:function(elem,role){
var _3cb=dojo.attr(elem,"role");
if(!_3cb){
return;
}
if(role){
var t=dojo.trim((" "+_3cb+" ").replace(" "+role+" "," "));
dojo.attr(elem,"role",t);
}else{
elem.removeAttribute("role");
}
},hasWaiState:function(elem,_3cc){
return elem.hasAttribute?elem.hasAttribute("aria-"+_3cc):!!elem.getAttribute("aria-"+_3cc);
},getWaiState:function(elem,_3cd){
return elem.getAttribute("aria-"+_3cd)||"";
},setWaiState:function(elem,_3ce,_3cf){
elem.setAttribute("aria-"+_3ce,_3cf);
},removeWaiState:function(elem,_3d0){
elem.removeAttribute("aria-"+_3d0);
}});
dojo.provide("dijit._base");
dojo.provide("dijit._Widget");
dojo.connect(dojo,"_connect",function(_3d1,_3d2){
if(_3d1&&dojo.isFunction(_3d1._onConnect)){
_3d1._onConnect(_3d2);
}
});
dijit._connectOnUseEventHandler=function(_3d3){
};
dijit._lastKeyDownNode=null;
if(dojo.isIE){
(function(){
var _3d4=function(evt){
dijit._lastKeyDownNode=evt.srcElement;
};
dojo.doc.attachEvent("onkeydown",_3d4);
dojo.addOnWindowUnload(function(){
dojo.doc.detachEvent("onkeydown",_3d4);
});
})();
}else{
dojo.doc.addEventListener("keydown",function(evt){
dijit._lastKeyDownNode=evt.target;
},true);
}
(function(){
dojo.declare("dijit._Widget",dijit._WidgetBase,{_deferredConnects:{onClick:"",onDblClick:"",onKeyDown:"",onKeyPress:"",onKeyUp:"",onMouseMove:"",onMouseDown:"",onMouseOut:"",onMouseOver:"",onMouseLeave:"",onMouseEnter:"",onMouseUp:""},onClick:dijit._connectOnUseEventHandler,onDblClick:dijit._connectOnUseEventHandler,onKeyDown:dijit._connectOnUseEventHandler,onKeyPress:dijit._connectOnUseEventHandler,onKeyUp:dijit._connectOnUseEventHandler,onMouseDown:dijit._connectOnUseEventHandler,onMouseMove:dijit._connectOnUseEventHandler,onMouseOut:dijit._connectOnUseEventHandler,onMouseOver:dijit._connectOnUseEventHandler,onMouseLeave:dijit._connectOnUseEventHandler,onMouseEnter:dijit._connectOnUseEventHandler,onMouseUp:dijit._connectOnUseEventHandler,create:function(_3d5,_3d6){
this._deferredConnects=dojo.clone(this._deferredConnects);
for(var attr in this.attributeMap){
delete this._deferredConnects[attr];
}
for(attr in this._deferredConnects){
if(this[attr]!==dijit._connectOnUseEventHandler){
delete this._deferredConnects[attr];
}
}
this.inherited(arguments);
if(this.domNode){
for(attr in this.params){
this._onConnect(attr);
}
}
},_onConnect:function(_3d7){
if(_3d7 in this._deferredConnects){
var _3d8=this[this._deferredConnects[_3d7]||"domNode"];
this.connect(_3d8,_3d7.toLowerCase(),_3d7);
delete this._deferredConnects[_3d7];
}
},focused:false,isFocusable:function(){
return this.focus&&(dojo.style(this.domNode,"display")!="none");
},onFocus:function(){
},onBlur:function(){
},_onFocus:function(e){
this.onFocus();
},_onBlur:function(){
this.onBlur();
},setAttribute:function(attr,_3d9){
dojo.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_3d9);
},attr:function(name,_3da){
if(dojo.config.isDebug){
var _3db=arguments.callee._ach||(arguments.callee._ach={}),_3dc=(arguments.callee.caller||"unknown caller").toString();
if(!_3db[_3dc]){
dojo.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_3dc,"","2.0");
_3db[_3dc]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},nodesWithKeyClick:["input","button"],connect:function(obj,_3dd,_3de){
var d=dojo,dc=d._connect,_3df=this.inherited(arguments,[obj,_3dd=="ondijitclick"?"onclick":_3dd,_3de]);
if(_3dd=="ondijitclick"){
if(d.indexOf(this.nodesWithKeyClick,obj.nodeName.toLowerCase())==-1){
var m=d.hitch(this,_3de);
_3df.push(dc(obj,"onkeydown",this,function(e){
if((e.keyCode==d.keys.ENTER||e.keyCode==d.keys.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
dijit._lastKeyDownNode=e.target;
if(!("openDropDown" in this&&obj==this._buttonNode)){
e.preventDefault();
}
}
}),dc(obj,"onkeyup",this,function(e){
if((e.keyCode==d.keys.ENTER||e.keyCode==d.keys.SPACE)&&e.target==dijit._lastKeyDownNode&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
dijit._lastKeyDownNode=null;
return m(e);
}
}));
}
}
return _3df;
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
})();
dojo.provide("dojo.string");
dojo.getObject("string",true,dojo);
dojo.string.rep=function(str,num){
if(num<=0||!str){
return "";
}
var buf=[];
for(;;){
if(num&1){
buf.push(str);
}
if(!(num>>=1)){
break;
}
str+=str;
}
return buf.join("");
};
dojo.string.pad=function(text,size,ch,end){
if(!ch){
ch="0";
}
var out=String(text),pad=dojo.string.rep(ch,Math.ceil((size-out.length)/ch.length));
return end?out+pad:pad+out;
};
dojo.string.substitute=function(_3e0,map,_3e1,_3e2){
_3e2=_3e2||dojo.global;
_3e1=_3e1?dojo.hitch(_3e2,_3e1):function(v){
return v;
};
return _3e0.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_3e3,key,_3e4){
var _3e5=dojo.getObject(key,false,map);
if(_3e4){
_3e5=dojo.getObject(_3e4,false,_3e2).call(_3e2,_3e5,key);
}
return _3e1(_3e5,key).toString();
});
};
dojo.string.trim=String.prototype.trim?dojo.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
dojo.provide("dojo.date.stamp");
dojo.getObject("date.stamp",true,dojo);
dojo.date.stamp.fromISOString=function(_3e6,_3e7){
if(!dojo.date.stamp._isoRegExp){
dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _3e8=dojo.date.stamp._isoRegExp.exec(_3e6),_3e9=null;
if(_3e8){
_3e8.shift();
if(_3e8[1]){
_3e8[1]--;
}
if(_3e8[6]){
_3e8[6]*=1000;
}
if(_3e7){
_3e7=new Date(_3e7);
dojo.forEach(dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _3e7["get"+prop]();
}),function(_3ea,_3eb){
_3e8[_3eb]=_3e8[_3eb]||_3ea;
});
}
_3e9=new Date(_3e8[0]||1970,_3e8[1]||0,_3e8[2]||1,_3e8[3]||0,_3e8[4]||0,_3e8[5]||0,_3e8[6]||0);
if(_3e8[0]<100){
_3e9.setFullYear(_3e8[0]||1970);
}
var _3ec=0,_3ed=_3e8[7]&&_3e8[7].charAt(0);
if(_3ed!="Z"){
_3ec=((_3e8[8]||0)*60)+(Number(_3e8[9])||0);
if(_3ed!="-"){
_3ec*=-1;
}
}
if(_3ed){
_3ec-=_3e9.getTimezoneOffset();
}
if(_3ec){
_3e9.setTime(_3e9.getTime()+_3ec*60000);
}
}
return _3e9;
};
dojo.date.stamp.toISOString=function(_3ee,_3ef){
var _3f0=function(n){
return (n<10)?"0"+n:n;
};
_3ef=_3ef||{};
var _3f1=[],_3f2=_3ef.zulu?"getUTC":"get",date="";
if(_3ef.selector!="time"){
var year=_3ee[_3f2+"FullYear"]();
date=["0000".substr((year+"").length)+year,_3f0(_3ee[_3f2+"Month"]()+1),_3f0(_3ee[_3f2+"Date"]())].join("-");
}
_3f1.push(date);
if(_3ef.selector!="date"){
var time=[_3f0(_3ee[_3f2+"Hours"]()),_3f0(_3ee[_3f2+"Minutes"]()),_3f0(_3ee[_3f2+"Seconds"]())].join(":");
var _3f3=_3ee[_3f2+"Milliseconds"]();
if(_3ef.milliseconds){
time+="."+(_3f3<100?"0":"")+_3f0(_3f3);
}
if(_3ef.zulu){
time+="Z";
}else{
if(_3ef.selector!="time"){
var _3f4=_3ee.getTimezoneOffset();
var _3f5=Math.abs(_3f4);
time+=(_3f4>0?"-":"+")+_3f0(Math.floor(_3f5/60))+":"+_3f0(_3f5%60);
}
}
_3f1.push(time);
}
return _3f1.join("T");
};
dojo.provide("dojo.parser");
new Date("X");
dojo.parser=new function(){
var d=dojo;
function _3f6(_3f7){
if(d.isString(_3f7)){
return "string";
}
if(typeof _3f7=="number"){
return "number";
}
if(typeof _3f7=="boolean"){
return "boolean";
}
if(d.isFunction(_3f7)){
return "function";
}
if(d.isArray(_3f7)){
return "array";
}
if(_3f7 instanceof Date){
return "date";
}
if(_3f7 instanceof d._Url){
return "url";
}
return "object";
};
function _3f8(_3f9,type){
switch(type){
case "string":
return _3f9;
case "number":
return _3f9.length?Number(_3f9):NaN;
case "boolean":
return typeof _3f9=="boolean"?_3f9:!(_3f9.toLowerCase()=="false");
case "function":
if(d.isFunction(_3f9)){
_3f9=_3f9.toString();
_3f9=d.trim(_3f9.substring(_3f9.indexOf("{")+1,_3f9.length-1));
}
try{
if(_3f9===""||_3f9.search(/[^\w\.]+/i)!=-1){
return new Function(_3f9);
}else{
return d.getObject(_3f9,false)||new Function(_3f9);
}
}
catch(e){
return new Function();
}
case "array":
return _3f9?_3f9.split(/\s*,\s*/):[];
case "date":
switch(_3f9){
case "":
return new Date("");
case "now":
return new Date();
default:
return d.date.stamp.fromISOString(_3f9);
}
case "url":
return d.baseUrl+_3f9;
default:
return d.fromJson(_3f9);
}
};
var _3fa={},_3fb={};
d.connect(d,"extend",function(){
_3fb={};
});
function _3fc(cls,_3fd){
for(var name in cls){
if(name.charAt(0)=="_"){
continue;
}
if(name in _3fa){
continue;
}
_3fd[name]=_3f6(cls[name]);
}
return _3fd;
};
function _3fe(_3ff,_400){
var c=_3fb[_3ff];
if(!c){
var cls=d.getObject(_3ff),_401=null;
if(!cls){
return null;
}
if(!_400){
_401=_3fc(cls.prototype,{});
}
c={cls:cls,params:_401};
}else{
if(!_400&&!c.params){
c.params=_3fc(c.cls.prototype,{});
}
}
return c;
};
this._functionFromScript=function(_402,_403){
var _404="";
var _405="";
var _406=(_402.getAttribute(_403+"args")||_402.getAttribute("args"));
if(_406){
d.forEach(_406.split(/\s*,\s*/),function(part,idx){
_404+="var "+part+" = arguments["+idx+"]; ";
});
}
var _407=_402.getAttribute("with");
if(_407&&_407.length){
d.forEach(_407.split(/\s*,\s*/),function(part){
_404+="with("+part+"){";
_405+="}";
});
}
return new Function(_404+_402.innerHTML+_405);
};
this.instantiate=function(_408,_409,args){
var _40a=[],_409=_409||{};
args=args||{};
var _40b=(args.scope||d._scopeName)+"Type",_40c="data-"+(args.scope||d._scopeName)+"-";
d.forEach(_408,function(obj){
if(!obj){
return;
}
var node,type,_40d,_40e,_40f,_410;
if(obj.node){
node=obj.node;
type=obj.type;
_410=obj.fastpath;
_40d=obj.clsInfo||(type&&_3fe(type,_410));
_40e=_40d&&_40d.cls;
_40f=obj.scripts;
}else{
node=obj;
type=_40b in _409?_409[_40b]:node.getAttribute(_40b);
_40d=type&&_3fe(type);
_40e=_40d&&_40d.cls;
_40f=(_40e&&(_40e._noScript||_40e.prototype._noScript)?[]:d.query("> script[type^='dojo/']",node));
}
if(!_40d){
throw new Error("Could not load class '"+type);
}
var _411={};
if(args.defaults){
d._mixin(_411,args.defaults);
}
if(obj.inherited){
d._mixin(_411,obj.inherited);
}
if(_410){
var _412=node.getAttribute(_40c+"props");
if(_412&&_412.length){
try{
_412=d.fromJson.call(args.propsThis,"{"+_412+"}");
d._mixin(_411,_412);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+_412+"'");
}
}
var _413=node.getAttribute(_40c+"attach-point");
if(_413){
_411.dojoAttachPoint=_413;
}
var _414=node.getAttribute(_40c+"attach-event");
if(_414){
_411.dojoAttachEvent=_414;
}
dojo.mixin(_411,_409);
}else{
var _415=node.attributes;
for(var name in _40d.params){
var item=name in _409?{value:_409[name],specified:true}:_415.getNamedItem(name);
if(!item||(!item.specified&&(!dojo.isIE||name.toLowerCase()!="value"))){
continue;
}
var _416=item.value;
switch(name){
case "class":
_416="className" in _409?_409.className:node.className;
break;
case "style":
_416="style" in _409?_409.style:(node.style&&node.style.cssText);
}
var _417=_40d.params[name];
if(typeof _416=="string"){
_411[name]=_3f8(_416,_417);
}else{
_411[name]=_416;
}
}
}
var _418=[],_419=[];
d.forEach(_40f,function(_41a){
node.removeChild(_41a);
var _41b=(_41a.getAttribute(_40c+"event")||_41a.getAttribute("event")),type=_41a.getAttribute("type"),nf=d.parser._functionFromScript(_41a,_40c);
if(_41b){
if(type=="dojo/connect"){
_418.push({event:_41b,func:nf});
}else{
_411[_41b]=nf;
}
}else{
_419.push(nf);
}
});
var _41c=_40e.markupFactory||_40e.prototype&&_40e.prototype.markupFactory;
var _41d=_41c?_41c(_411,node,_40e):new _40e(_411,node);
_40a.push(_41d);
var _41e=(node.getAttribute(_40c+"id")||node.getAttribute("jsId"));
if(_41e){
d.setObject(_41e,_41d);
}
d.forEach(_418,function(_41f){
d.connect(_41d,_41f.event,null,_41f.func);
});
d.forEach(_419,function(func){
func.call(_41d);
});
});
if(!_409._started){
d.forEach(_40a,function(_420){
if(!args.noStart&&_420&&dojo.isFunction(_420.startup)&&!_420._started&&(!_420.getParent||!_420.getParent())){
_420.startup();
}
});
}
return _40a;
};
this.parse=function(_421,args){
var root;
if(!args&&_421&&_421.rootNode){
args=_421;
root=args.rootNode;
}else{
root=_421;
}
args=args||{};
var _422=(args.scope||d._scopeName)+"Type",_423="data-"+(args.scope||d._scopeName)+"-";
function scan(_424,list){
var _425=dojo.clone(_424.inherited);
dojo.forEach(["dir","lang"],function(name){
var val=_424.node.getAttribute(name);
if(val){
_425[name]=val;
}
});
var _426=_424.clsInfo&&!_424.clsInfo.cls.prototype._noScript?_424.scripts:null;
var _427=(!_424.clsInfo||!_424.clsInfo.cls.prototype.stopParser)||(args&&args.template);
for(var _428=_424.node.firstChild;_428;_428=_428.nextSibling){
if(_428.nodeType==1){
var type,_429=_427&&_428.getAttribute(_423+"type");
if(_429){
type=_429;
}else{
type=_427&&_428.getAttribute(_422);
}
var _42a=_429==type;
if(type){
var _42b={"type":type,fastpath:_42a,clsInfo:_3fe(type,_42a),node:_428,scripts:[],inherited:_425};
list.push(_42b);
scan(_42b,list);
}else{
if(_426&&_428.nodeName.toLowerCase()=="script"){
type=_428.getAttribute("type");
if(type&&/^dojo\/\w/i.test(type)){
_426.push(_428);
}
}else{
if(_427){
scan({node:_428,inherited:_425},list);
}
}
}
}
}
};
var list=[];
scan({node:root?dojo.byId(root):dojo.body(),inherited:(args&&args.inherited)||{dir:dojo._isBodyLtr()?"ltr":"rtl"}},list);
var _42c=args&&args.template?{template:true}:null;
return this.instantiate(list,_42c,args);
};
}();
(function(){
var _42d=function(){
if(dojo.config.parseOnLoad){
dojo.parser.parse();
}
};
if(dojo.getObject("dijit.wai.onload")===dojo._loaders[0]){
dojo._loaders.splice(1,0,_42d);
}else{
dojo._loaders.unshift(_42d);
}
})();
dojo.provide("dojo.cache");
var _42e={};
dojo.cache=function(_42f,url,_430){
if(typeof _42f=="string"){
var _431=dojo.moduleUrl(_42f,url);
}else{
_431=_42f;
_430=url;
}
var key=_431.toString();
var val=_430;
if(_430!=undefined&&!dojo.isString(_430)){
val=("value" in _430?_430.value:undefined);
}
var _432=_430&&_430.sanitize?true:false;
if(typeof val=="string"){
val=_42e[key]=_432?dojo.cache._sanitize(val):val;
}else{
if(val===null){
delete _42e[key];
}else{
if(!(key in _42e)){
val=dojo._getText(key);
_42e[key]=_432?dojo.cache._sanitize(val):val;
}
val=_42e[key];
}
}
return val;
};
dojo.cache._sanitize=function(val){
if(val){
val=val.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _433=val.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_433){
val=_433[1];
}
}else{
val="";
}
return val;
};
dojo.provide("dijit._Templated");
dojo.declare("dijit._Templated",null,{templateString:null,templatePath:null,widgetsInTemplate:false,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},_stringRepl:function(tmpl){
var _434=this.declaredClass,_435=this;
return dojo.string.substitute(tmpl,this,function(_436,key){
if(key.charAt(0)=="!"){
_436=dojo.getObject(key.substr(1),false,_435);
}
if(typeof _436=="undefined"){
throw new Error(_434+" template:"+key);
}
if(_436==null){
return "";
}
return key.charAt(0)=="!"?_436:_436.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
var _437=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var node;
if(dojo.isString(_437)){
node=dojo._toDom(this._stringRepl(_437));
if(node.nodeType!=1){
throw new Error("Invalid template: "+_437);
}
}else{
node=_437.cloneNode(true);
}
this.domNode=node;
this.inherited(arguments);
this._attachTemplateNodes(node);
if(this.widgetsInTemplate){
var cw=(this._startupWidgets=dojo.parser.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang},propsThis:this,scope:"dojo"}));
this._supportingWidgets=dijit.findWidgets(node);
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
this._fillContent(this.srcNodeRef);
},_fillContent:function(_438){
var dest=this.containerNode;
if(_438&&dest){
while(_438.hasChildNodes()){
dest.appendChild(_438.firstChild);
}
}
},_attachTemplateNodes:function(_439,_43a){
_43a=_43a||function(n,p){
return n.getAttribute(p);
};
var _43b=dojo.isArray(_439)?_439:(_439.all||_439.getElementsByTagName("*"));
var x=dojo.isArray(_439)?0:-1;
for(;x<_43b.length;x++){
var _43c=(x==-1)?_439:_43b[x];
if(this.widgetsInTemplate&&(_43a(_43c,"dojoType")||_43a(_43c,"data-dojo-type"))){
continue;
}
var _43d=_43a(_43c,"dojoAttachPoint")||_43a(_43c,"data-dojo-attach-point");
if(_43d){
var _43e,_43f=_43d.split(/\s*,\s*/);
while((_43e=_43f.shift())){
if(dojo.isArray(this[_43e])){
this[_43e].push(_43c);
}else{
this[_43e]=_43c;
}
this._attachPoints.push(_43e);
}
}
var _440=_43a(_43c,"dojoAttachEvent")||_43a(_43c,"data-dojo-attach-event");
if(_440){
var _441,_442=_440.split(/\s*,\s*/);
var trim=dojo.trim;
while((_441=_442.shift())){
if(_441){
var _443=null;
if(_441.indexOf(":")!=-1){
var _444=_441.split(":");
_441=trim(_444[0]);
_443=trim(_444[1]);
}else{
_441=trim(_441);
}
if(!_443){
_443=_441;
}
this._attachEvents.push(this.connect(_43c,_441,_443));
}
}
}
var role=_43a(_43c,"waiRole");
if(role){
dijit.setWaiRole(_43c,role);
}
var _445=_43a(_43c,"waiState");
if(_445){
dojo.forEach(_445.split(/\s*,\s*/),function(_446){
if(_446.indexOf("-")!=-1){
var pair=_446.split("-");
dijit.setWaiState(_43c,pair[0],pair[1]);
}
});
}
}
},startup:function(){
dojo.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this.inherited(arguments);
},destroyRendering:function(){
dojo.forEach(this._attachPoints,function(_447){
delete this[_447];
},this);
this._attachPoints=[];
dojo.forEach(this._attachEvents,this.disconnect,this);
this._attachEvents=[];
this.inherited(arguments);
}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(_448,_449,_44a){
var _44b=dijit._Templated._templateCache;
var key=_449||_448;
var _44c=_44b[key];
if(_44c){
try{
if(!_44c.ownerDocument||_44c.ownerDocument==dojo.doc){
return _44c;
}
}
catch(e){
}
dojo.destroy(_44c);
}
if(!_449){
_449=dojo.cache(_448,{sanitize:true});
}
_449=dojo.string.trim(_449);
if(_44a||_449.match(/\$\{([^\}]+)\}/g)){
return (_44b[key]=_449);
}else{
var node=dojo._toDom(_449);
if(node.nodeType!=1){
throw new Error("Invalid template: "+_449);
}
return (_44b[key]=node);
}
};
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
var _44d=dijit._Templated._templateCache;
for(var key in _44d){
var _44e=_44d[key];
if(typeof _44e=="object"){
dojo.destroy(_44e);
}
delete _44d[key];
}
});
}
dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""});
dojo.provide("dijit._CssStateMixin");
dojo.declare("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
dojo.forEach(["onmouseenter","onmouseleave","onmousedown"],function(e){
this.connect(this.domNode,e,"_cssMouseEvent");
},this);
dojo.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active"],function(attr){
this.watch(attr,dojo.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._setStateClass();
},_cssMouseEvent:function(_44f){
if(!this.disabled){
switch(_44f.type){
case "mouseenter":
case "mouseover":
this._set("hovering",true);
this._set("active",this._mouseDown);
break;
case "mouseleave":
case "mouseout":
this._set("hovering",false);
this._set("active",false);
break;
case "mousedown":
this._set("active",true);
this._mouseDown=true;
var _450=this.connect(dojo.body(),"onmouseup",function(){
this._mouseDown=false;
this._set("active",false);
this.disconnect(_450);
});
break;
}
}
},_setStateClass:function(){
var _451=this.baseClass.split(" ");
function _452(_453){
_451=_451.concat(dojo.map(_451,function(c){
return c+_453;
}),"dijit"+_453);
};
if(!this.isLeftToRight()){
_452("Rtl");
}
if(this.checked){
_452("Checked");
}
if(this.state){
_452(this.state);
}
if(this.selected){
_452("Selected");
}
if(this.disabled){
_452("Disabled");
}else{
if(this.readOnly){
_452("ReadOnly");
}else{
if(this.active){
_452("Active");
}else{
if(this.hovering){
_452("Hover");
}
}
}
}
if(this._focused){
_452("Focused");
}
var tn=this.stateNode||this.domNode,_454={};
dojo.forEach(tn.className.split(" "),function(c){
_454[c]=true;
});
if("_stateClasses" in this){
dojo.forEach(this._stateClasses,function(c){
delete _454[c];
});
}
dojo.forEach(_451,function(c){
_454[c]=true;
});
var _455=[];
for(var c in _454){
_455.push(c);
}
tn.className=_455.join(" ");
this._stateClasses=_451;
},_trackMouseState:function(node,_456){
var _457=false,_458=false,_459=false;
var self=this,cn=dojo.hitch(this,"connect",node);
function _45a(){
var _45b=("disabled" in self&&self.disabled)||("readonly" in self&&self.readonly);
dojo.toggleClass(node,_456+"Hover",_457&&!_458&&!_45b);
dojo.toggleClass(node,_456+"Active",_458&&!_45b);
dojo.toggleClass(node,_456+"Focused",_459&&!_45b);
};
cn("onmouseenter",function(){
_457=true;
_45a();
});
cn("onmouseleave",function(){
_457=false;
_458=false;
_45a();
});
cn("onmousedown",function(){
_458=true;
_45a();
});
cn("onmouseup",function(){
_458=false;
_45a();
});
cn("onfocus",function(){
_459=true;
_45a();
});
cn("onblur",function(){
_459=false;
_45a();
});
this.watch("disabled",_45a);
this.watch("readOnly",_45a);
}});
dojo.provide("dijit.form._FormMixin");
dojo.declare("dijit.form._FormMixin",null,{state:"",reset:function(){
dojo.forEach(this.getDescendants(),function(_45c){
if(_45c.reset){
_45c.reset();
}
});
},validate:function(){
var _45d=false;
return dojo.every(dojo.map(this.getDescendants(),function(_45e){
_45e._hasBeenBlurred=true;
var _45f=_45e.disabled||!_45e.validate||_45e.validate();
if(!_45f&&!_45d){
dojo.window.scrollIntoView(_45e.containerNode||_45e.domNode);
_45e.focus();
_45d=true;
}
return _45f;
}),function(item){
return item;
});
},setValues:function(val){
dojo.deprecated(this.declaredClass+"::setValues() is deprecated. Use set('value', val) instead.","","2.0");
return this.set("value",val);
},_setValueAttr:function(obj){
var map={};
dojo.forEach(this.getDescendants(),function(_460){
if(!_460.name){
return;
}
var _461=map[_460.name]||(map[_460.name]=[]);
_461.push(_460);
});
for(var name in map){
if(!map.hasOwnProperty(name)){
continue;
}
var _462=map[name],_463=dojo.getObject(name,false,obj);
if(_463===undefined){
continue;
}
if(!dojo.isArray(_463)){
_463=[_463];
}
if(typeof _462[0].checked=="boolean"){
dojo.forEach(_462,function(w,i){
w.set("value",dojo.indexOf(_463,w.value)!=-1);
});
}else{
if(_462[0].multiple){
_462[0].set("value",_463);
}else{
dojo.forEach(_462,function(w,i){
w.set("value",_463[i]);
});
}
}
}
},getValues:function(){
dojo.deprecated(this.declaredClass+"::getValues() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_getValueAttr:function(){
var obj={};
dojo.forEach(this.getDescendants(),function(_464){
var name=_464.name;
if(!name||_464.disabled){
return;
}
var _465=_464.get("value");
if(typeof _464.checked=="boolean"){
if(/Radio/.test(_464.declaredClass)){
if(_465!==false){
dojo.setObject(name,_465,obj);
}else{
_465=dojo.getObject(name,false,obj);
if(_465===undefined){
dojo.setObject(name,null,obj);
}
}
}else{
var ary=dojo.getObject(name,false,obj);
if(!ary){
ary=[];
dojo.setObject(name,ary,obj);
}
if(_465!==false){
ary.push(_465);
}
}
}else{
var prev=dojo.getObject(name,false,obj);
if(typeof prev!="undefined"){
if(dojo.isArray(prev)){
prev.push(_465);
}else{
dojo.setObject(name,[prev,_465],obj);
}
}else{
dojo.setObject(name,_465,obj);
}
}
});
return obj;
},isValid:function(){
return this.state=="";
},onValidStateChange:function(_466){
},_getState:function(){
var _467=dojo.map(this._descendants,function(w){
return w.get("state")||"";
});
return dojo.indexOf(_467,"Error")>=0?"Error":dojo.indexOf(_467,"Incomplete")>=0?"Incomplete":"";
},disconnectChildren:function(){
dojo.forEach(this._childConnections||[],dojo.hitch(this,"disconnect"));
dojo.forEach(this._childWatches||[],function(w){
w.unwatch();
});
},connectChildren:function(_468){
var _469=this;
this.disconnectChildren();
this._descendants=this.getDescendants();
var set=_468?function(name,val){
_469[name]=val;
}:dojo.hitch(this,"_set");
set("value",this.get("value"));
set("state",this._getState());
var _46a=(this._childConnections=[]),_46b=(this._childWatches=[]);
dojo.forEach(dojo.filter(this._descendants,function(item){
return item.validate;
}),function(_46c){
dojo.forEach(["state","disabled"],function(attr){
_46b.push(_46c.watch(attr,function(attr,_46d,_46e){
_469.set("state",_469._getState());
}));
});
});
var _46f=function(){
if(_469._onChangeDelayTimer){
clearTimeout(_469._onChangeDelayTimer);
}
_469._onChangeDelayTimer=setTimeout(function(){
delete _469._onChangeDelayTimer;
_469._set("value",_469.get("value"));
},10);
};
dojo.forEach(dojo.filter(this._descendants,function(item){
return item.onChange;
}),function(_470){
_46a.push(_469.connect(_470,"onChange",_46f));
_46b.push(_470.watch("disabled",_46f));
});
},startup:function(){
this.inherited(arguments);
this.connectChildren(true);
this.watch("state",function(attr,_471,_472){
this.onValidStateChange(_472=="");
});
},destroy:function(){
this.disconnectChildren();
this.inherited(arguments);
}});
dojo.provide("dijit._DialogMixin");
dojo.declare("dijit._DialogMixin",null,{attributeMap:dijit._Widget.prototype.attributeMap,execute:function(_473){
},onCancel:function(){
},onExecute:function(){
},_onSubmit:function(){
this.onExecute();
this.execute(this.get("value"));
},_getFocusItems:function(){
var _474=dijit._getTabNavigable(this.containerNode);
this._firstFocusItem=_474.lowest||_474.first||this.closeButtonNode||this.domNode;
this._lastFocusItem=_474.last||_474.highest||this._firstFocusItem;
}});
dojo.provide("dijit.DialogUnderlay");
dojo.declare("dijit.DialogUnderlay",[dijit._Widget,dijit._Templated],{templateString:"<div class='dijitDialogUnderlayWrapper'><div class='dijitDialogUnderlay' dojoAttachPoint='node'></div></div>",dialogId:"","class":"",attributeMap:{id:"domNode"},_setDialogIdAttr:function(id){
dojo.attr(this.node,"id",id+"_underlay");
this._set("dialogId",id);
},_setClassAttr:function(_475){
this.node.className="dijitDialogUnderlay "+_475;
this._set("class",_475);
},postCreate:function(){
dojo.body().appendChild(this.domNode);
},layout:function(){
var is=this.node.style,os=this.domNode.style;
os.display="none";
var _476=dojo.window.getBox();
os.top=_476.t+"px";
os.left=_476.l+"px";
is.width=_476.w+"px";
is.height=_476.h+"px";
os.display="block";
},show:function(){
this.domNode.style.display="block";
this.layout();
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
},hide:function(){
this.bgIframe.destroy();
delete this.bgIframe;
this.domNode.style.display="none";
}});
dojo.provide("dijit._Container");
dojo.declare("dijit._Container",null,{isContainer:true,buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_477,_478){
var _479=this.containerNode;
if(_478&&typeof _478=="number"){
var _47a=this.getChildren();
if(_47a&&_47a.length>=_478){
_479=_47a[_478-1].domNode;
_478="after";
}
}
dojo.place(_477.domNode,_479,_478);
if(this._started&&!_477._started){
_477.startup();
}
},removeChild:function(_47b){
if(typeof _47b=="number"){
_47b=this.getChildren()[_47b];
}
if(_47b){
var node=_47b.domNode;
if(node&&node.parentNode){
node.parentNode.removeChild(node);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},destroyDescendants:function(_47c){
dojo.forEach(this.getChildren(),function(_47d){
_47d.destroyRecursive(_47c);
});
},_getSiblingOfChild:function(_47e,dir){
var node=_47e.domNode,_47f=(dir>0?"nextSibling":"previousSibling");
do{
node=node[_47f];
}while(node&&(node.nodeType!=1||!dijit.byNode(node)));
return node&&dijit.byNode(node);
},getIndexOfChild:function(_480){
return dojo.indexOf(this.getChildren(),_480);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_481){
_481.startup();
});
this.inherited(arguments);
}});
dojo.provide("dijit._Contained");
dojo.declare("dijit._Contained",null,{getParent:function(){
var _482=dijit.getEnclosingWidget(this.domNode.parentNode);
return _482&&_482.isContainer?_482:null;
},_getSibling:function(_483){
var node=this.domNode;
do{
node=node[_483+"Sibling"];
}while(node&&node.nodeType!=1);
return node&&dijit.byNode(node);
},getPreviousSibling:function(){
return this._getSibling("previous");
},getNextSibling:function(){
return this._getSibling("next");
},getIndexInParent:function(){
var p=this.getParent();
if(!p||!p.getIndexOfChild){
return -1;
}
return p.getIndexOfChild(this);
}});
dojo.provide("dijit.layout._LayoutWidget");
dojo.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,buildRendering:function(){
this.inherited(arguments);
dojo.addClass(this.domNode,"dijitContainer");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
var _484=this.getParent&&this.getParent();
if(!(_484&&_484.isLayoutContainer)){
this.resize();
this.connect(dojo.isIE?this.domNode:dojo.global,"onresize",function(){
this.resize();
});
}
},resize:function(_485,_486){
var node=this.domNode;
if(_485){
dojo.marginBox(node,_485);
if(_485.t){
node.style.top=_485.t+"px";
}
if(_485.l){
node.style.left=_485.l+"px";
}
}
var mb=_486||{};
dojo.mixin(mb,_485||{});
if(!("h" in mb)||!("w" in mb)){
mb=dojo.mixin(dojo.marginBox(node),mb);
}
var cs=dojo.getComputedStyle(node);
var me=dojo._getMarginExtents(node,cs);
var be=dojo._getBorderExtents(node,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=dojo._getPadExtents(node,cs);
this._contentBox={l:dojo._toPixelValue(node,cs.paddingLeft),t:dojo._toPixelValue(node,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_487){
var cls=this.baseClass+"-child "+(_487.baseClass?this.baseClass+"-"+_487.baseClass:"");
dojo.addClass(_487.domNode,cls);
},addChild:function(_488,_489){
this.inherited(arguments);
if(this._started){
this._setupChild(_488);
}
},removeChild:function(_48a){
var cls=this.baseClass+"-child"+(_48a.baseClass?" "+this.baseClass+"-"+_48a.baseClass:"");
dojo.removeClass(_48a.domNode,cls);
this.inherited(arguments);
}});
dijit.layout.marginBox2contentBox=function(node,mb){
var cs=dojo.getComputedStyle(node);
var me=dojo._getMarginExtents(node,cs);
var pb=dojo._getPadBorderExtents(node,cs);
return {l:dojo._toPixelValue(node,cs.paddingLeft),t:dojo._toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
(function(){
var _48b=function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
var size=function(_48c,dim){
_48c.resize?_48c.resize(dim):dojo.marginBox(_48c.domNode,dim);
dojo.mixin(_48c,dojo.marginBox(_48c.domNode));
dojo.mixin(_48c,dim);
};
dijit.layout.layoutChildren=function(_48d,dim,_48e,_48f,_490){
dim=dojo.mixin({},dim);
dojo.addClass(_48d,"dijitLayoutContainer");
_48e=dojo.filter(_48e,function(item){
return item.region!="center"&&item.layoutAlign!="client";
}).concat(dojo.filter(_48e,function(item){
return item.region=="center"||item.layoutAlign=="client";
}));
dojo.forEach(_48e,function(_491){
var elm=_491.domNode,pos=(_491.region||_491.layoutAlign);
var _492=elm.style;
_492.left=dim.l+"px";
_492.top=dim.t+"px";
_492.bottom=_492.right="auto";
dojo.addClass(elm,"dijitAlign"+_48b(pos));
var _493={};
if(_48f&&_48f==_491.id){
_493[_491.region=="top"||_491.region=="bottom"?"h":"w"]=_490;
}
if(pos=="top"||pos=="bottom"){
_493.w=dim.w;
size(_491,_493);
dim.h-=_491.h;
if(pos=="top"){
dim.t+=_491.h;
}else{
_492.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_493.h=dim.h;
size(_491,_493);
dim.w-=_491.w;
if(pos=="left"){
dim.l+=_491.w;
}else{
_492.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
size(_491,dim);
}
}
}
});
};
})();
dojo.provide("dijit.layout._ContentPaneResizeMixin");
dojo.declare("dijit.layout._ContentPaneResizeMixin",null,{doLayout:true,isContainer:true,isLayoutContainer:true,_startChildren:function(){
dojo.forEach(this.getChildren(),function(_494){
_494.startup();
_494._started=true;
});
},startup:function(){
if(this._started){
return;
}
var _495=dijit._Contained.prototype.getParent.call(this);
this._childOfLayoutWidget=_495&&_495.isLayoutContainer;
this._needLayout=!this._childOfLayoutWidget;
this.inherited(arguments);
this._startChildren();
},_checkIfSingleChild:function(){
var _496=dojo.query("> *",this.containerNode).filter(function(node){
return node.tagName!=="SCRIPT";
}),_497=_496.filter(function(node){
return dojo.hasAttr(node,"data-dojo-type")||dojo.hasAttr(node,"dojoType")||dojo.hasAttr(node,"widgetId");
}),_498=dojo.filter(_497.map(dijit.byNode),function(_499){
return _499&&_499.domNode&&_499.resize;
});
if(_496.length==_497.length&&_498.length==1){
this._singleChild=_498[0];
}else{
delete this._singleChild;
}
dojo.toggleClass(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild);
},resize:function(_49a,_49b){
this._layout(_49a,_49b);
},_layout:function(_49c,_49d){
if(_49c){
dojo.marginBox(this.domNode,_49c);
}
var cn=this.containerNode;
if(cn===this.domNode){
var mb=_49d||{};
dojo.mixin(mb,_49c||{});
if(!("h" in mb)||!("w" in mb)){
mb=dojo.mixin(dojo.marginBox(cn),mb);
}
this._contentBox=dijit.layout.marginBox2contentBox(cn,mb);
}else{
this._contentBox=dojo.contentBox(cn);
}
this._layoutChildren();
delete this._needLayout;
},_layoutChildren:function(){
if(this.doLayout){
this._checkIfSingleChild();
}
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||dojo.contentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
dojo.forEach(this.getChildren(),function(_49e){
if(_49e.resize){
_49e.resize();
}
});
}
}});
dojo.provide("dojo.html");
dojo.getObject("html",true,dojo);
(function(){
var _49f=0,d=dojo;
dojo.html._secureForInnerHtml=function(cont){
return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
dojo.html._emptyNode=dojo.empty;
dojo.html._setNodeContent=function(node,cont){
d.empty(node);
if(cont){
if(typeof cont=="string"){
cont=d._toDom(cont,node.ownerDocument);
}
if(!cont.nodeType&&d.isArrayLike(cont)){
for(var _4a0=cont.length,i=0;i<cont.length;i=_4a0==cont.length?i+1:0){
d.place(cont[i],node,"last");
}
}else{
d.place(cont,node,"last");
}
}
return node;
};
dojo.declare("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,parserScope:dojo._scopeName,startup:true,constructor:function(_4a1,node){
dojo.mixin(this,_4a1||{});
node=this.node=dojo.byId(this.node||node);
if(!this.id){
this.id=["Setter",(node)?node.id||node.tagName:"",_49f++].join("_");
}
},set:function(cont,_4a2){
if(undefined!==cont){
this.content=cont;
}
if(_4a2){
this._mixin(_4a2);
}
this.onBegin();
this.setContent();
this.onEnd();
return this.node;
},setContent:function(){
var node=this.node;
if(!node){
throw new Error(this.declaredClass+": setContent given no node");
}
try{
node=dojo.html._setNodeContent(node,this.content);
}
catch(e){
var _4a3=this.onContentError(e);
try{
node.innerHTML=_4a3;
}
catch(e){
}
}
this.node=node;
},empty:function(){
if(this.parseResults&&this.parseResults.length){
dojo.forEach(this.parseResults,function(w){
if(w.destroy){
w.destroy();
}
});
delete this.parseResults;
}
dojo.html._emptyNode(this.node);
},onBegin:function(){
var cont=this.content;
if(dojo.isString(cont)){
if(this.cleanContent){
cont=dojo.html._secureForInnerHtml(cont);
}
if(this.extractContent){
var _4a4=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_4a4){
cont=_4a4[1];
}
}
}
this.empty();
this.content=cont;
return this.node;
},onEnd:function(){
if(this.parseContent){
this._parse();
}
return this.node;
},tearDown:function(){
delete this.parseResults;
delete this.node;
delete this.content;
},onContentError:function(err){
return "Error occured setting content: "+err;
},_mixin:function(_4a5){
var _4a6={},key;
for(key in _4a5){
if(key in _4a6){
continue;
}
this[key]=_4a5[key];
}
},_parse:function(){
var _4a7=this.node;
try{
this.parseResults=dojo.parser.parse({rootNode:_4a7,noStart:!this.startup,inherited:{dir:this.dir,lang:this.lang},scope:this.parserScope});
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(type,err,_4a8){
var _4a9=this["on"+type+"Error"].call(this,err);
if(_4a8){
}else{
if(_4a9){
dojo.html._setNodeContent(this.node,_4a9,true);
}
}
}});
dojo.html.set=function(node,cont,_4aa){
if(undefined==cont){
cont="";
}
if(!_4aa){
return dojo.html._setNodeContent(node,cont,true);
}else{
var op=new dojo.html._ContentSetter(dojo.mixin(_4aa,{content:cont,node:node}));
return op.set();
}
};
})();
dojo.provide("dojo.i18n");
dojo.getObject("i18n",true,dojo);
dojo.i18n.getLocalization=dojo.i18n.getLocalization||function(_4ab,_4ac,_4ad){
_4ad=dojo.i18n.normalizeLocale(_4ad);
var _4ae=_4ad.split("-");
var _4af=[_4ab,"nls",_4ac].join(".");
var _4b0=dojo._loadedModules[_4af];
if(_4b0){
var _4b1;
for(var i=_4ae.length;i>0;i--){
var loc=_4ae.slice(0,i).join("_");
if(_4b0[loc]){
_4b1=_4b0[loc];
break;
}
}
if(!_4b1){
_4b1=_4b0.ROOT;
}
if(_4b1){
var _4b2=function(){
};
_4b2.prototype=_4b1;
return new _4b2();
}
}
throw new Error("Bundle not found: "+_4ac+" in "+_4ab+" , locale="+_4ad);
};
dojo.i18n.normalizeLocale=function(_4b3){
var _4b4=_4b3?_4b3.toLowerCase():dojo.locale;
if(_4b4=="root"){
_4b4="ROOT";
}
return _4b4;
};
dojo.i18n._requireLocalization=function(_4b5,_4b6,_4b7,_4b8){
var _4b9=dojo.i18n.normalizeLocale(_4b7);
var _4ba=[_4b5,"nls",_4b6].join(".");
var _4bb="";
if(_4b8){
var _4bc=_4b8.split(",");
for(var i=0;i<_4bc.length;i++){
if(_4b9["indexOf"](_4bc[i])==0){
if(_4bc[i].length>_4bb.length){
_4bb=_4bc[i];
}
}
}
if(!_4bb){
_4bb="ROOT";
}
}
var _4bd=_4b8?_4bb:_4b9;
var _4be=dojo._loadedModules[_4ba];
var _4bf=null;
if(_4be){
if(dojo.config.localizationComplete&&_4be._built){
return;
}
var _4c0=_4bd.replace(/-/g,"_");
var _4c1=_4ba+"."+_4c0;
_4bf=dojo._loadedModules[_4c1];
}
if(!_4bf){
_4be=dojo["provide"](_4ba);
var syms=dojo._getModuleSymbols(_4b5);
var _4c2=syms.concat("nls").join("/");
var _4c3;
dojo.i18n._searchLocalePath(_4bd,_4b8,function(loc){
var _4c4=loc.replace(/-/g,"_");
var _4c5=_4ba+"."+_4c4;
var _4c6=false;
if(!dojo._loadedModules[_4c5]){
dojo["provide"](_4c5);
var _4c7=[_4c2];
if(loc!="ROOT"){
_4c7.push(loc);
}
_4c7.push(_4b6);
var _4c8=_4c7.join("/")+".js";
_4c6=dojo._loadPath(_4c8,null,function(hash){
hash=hash.root||hash;
var _4c9=function(){
};
_4c9.prototype=_4c3;
_4be[_4c4]=new _4c9();
for(var j in hash){
_4be[_4c4][j]=hash[j];
}
});
}else{
_4c6=true;
}
if(_4c6&&_4be[_4c4]){
_4c3=_4be[_4c4];
}else{
_4be[_4c4]=_4c3;
}
if(_4b8){
return true;
}
});
}
if(_4b8&&_4b9!=_4bb){
_4be[_4b9.replace(/-/g,"_")]=_4be[_4bb.replace(/-/g,"_")];
}
};
(function(){
var _4ca=dojo.config.extraLocale;
if(_4ca){
if(!_4ca instanceof Array){
_4ca=[_4ca];
}
var req=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(m,b,_4cb,_4cc){
req(m,b,_4cb,_4cc);
if(_4cb){
return;
}
for(var i=0;i<_4ca.length;i++){
req(m,b,_4ca[i],_4cc);
}
};
}
})();
dojo.i18n._searchLocalePath=function(_4cd,down,_4ce){
_4cd=dojo.i18n.normalizeLocale(_4cd);
var _4cf=_4cd.split("-");
var _4d0=[];
for(var i=_4cf.length;i>0;i--){
_4d0.push(_4cf.slice(0,i).join("-"));
}
_4d0.push(false);
if(down){
_4d0.reverse();
}
for(var j=_4d0.length-1;j>=0;j--){
var loc=_4d0[j]||"ROOT";
var stop=_4ce(loc);
if(stop){
break;
}
}
};
dojo.i18n._preloadLocalizations=function(_4d1,_4d2){
function _4d3(_4d4){
_4d4=dojo.i18n.normalizeLocale(_4d4);
dojo.i18n._searchLocalePath(_4d4,true,function(loc){
for(var i=0;i<_4d2.length;i++){
if(_4d2[i]==loc){
dojo["require"](_4d1+"_"+loc);
return true;
}
}
return false;
});
};
_4d3();
var _4d5=dojo.config.extraLocale||[];
for(var i=0;i<_4d5.length;i++){
_4d3(_4d5[i]);
}
};
dojo.provide("dijit.layout.ContentPane");
dojo.declare("dijit.layout.ContentPane",[dijit._Widget,dijit.layout._ContentPaneResizeMixin],{href:"",extractContent:false,parseOnLoad:true,parserScope:dojo._scopeName,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",ioArgs:{},onLoadDeferred:null,attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{title:[]}),stopParser:true,template:false,create:function(_4d6,_4d7){
if((!_4d6||!_4d6.template)&&_4d7&&!("href" in _4d6)&&!("content" in _4d6)){
var df=dojo.doc.createDocumentFragment();
_4d7=dojo.byId(_4d7);
while(_4d7.firstChild){
df.appendChild(_4d7.firstChild);
}
_4d6=dojo.delegate(_4d6,{content:df});
}
this.inherited(arguments,[_4d6,_4d7]);
},postMixInProperties:function(){
this.inherited(arguments);
var _4d8=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,_4d8);
this.errorMessage=dojo.string.substitute(this.errorMessage,_4d8);
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
this.domNode.title="";
if(!dojo.attr(this.domNode,"role")){
dijit.setWaiRole(this.domNode,"group");
}
},_startChildren:function(){
this.inherited(arguments);
if(this._contentSetter){
dojo.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&dojo.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(this._isShown()){
this._onShow();
}
},setHref:function(href){
dojo.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.","","2.0");
return this.set("href",href);
},_setHrefAttr:function(href){
this.cancel();
this.onLoadDeferred=new dojo.Deferred(dojo.hitch(this,"cancel"));
this.onLoadDeferred.addCallback(dojo.hitch(this,"onLoad"));
this._set("href",href);
if(this.preload||(this._created&&this._isShown())){
this._load();
}else{
this._hrefChanged=true;
}
return this.onLoadDeferred;
},setContent:function(data){
dojo.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.","","2.0");
this.set("content",data);
},_setContentAttr:function(data){
this._set("href","");
this.cancel();
this.onLoadDeferred=new dojo.Deferred(dojo.hitch(this,"cancel"));
if(this._created){
this.onLoadDeferred.addCallback(dojo.hitch(this,"onLoad"));
}
this._setContent(data||"");
this._isDownloaded=false;
return this.onLoadDeferred;
},_getContentAttr:function(){
return this.containerNode.innerHTML;
},cancel:function(){
if(this._xhrDfd&&(this._xhrDfd.fired==-1)){
this._xhrDfd.cancel();
}
delete this._xhrDfd;
this.onLoadDeferred=null;
},uninitialize:function(){
if(this._beingDestroyed){
this.cancel();
}
this.inherited(arguments);
},destroyRecursive:function(_4d9){
if(this._beingDestroyed){
return;
}
this.inherited(arguments);
},resize:function(_4da,_4db){
if(!this._wasShown&&this.open!==false){
this._onShow();
}
this._resizeCalled=true;
this._scheduleLayout(_4da,_4db);
},_isShown:function(){
if(this._childOfLayoutWidget){
if(this._resizeCalled&&"open" in this){
return this.open;
}
return this._resizeCalled;
}else{
if("open" in this){
return this.open;
}else{
var node=this.domNode,_4dc=this.domNode.parentNode;
return (node.style.display!="none")&&(node.style.visibility!="hidden")&&!dojo.hasClass(node,"dijitHidden")&&_4dc&&_4dc.style&&(_4dc.style.display!="none");
}
}
},_onShow:function(){
if(this.href){
if(!this._xhrDfd&&(!this.isLoaded||this._hrefChanged||this.refreshOnShow)){
var d=this.refresh();
}
}else{
if(this._needLayout){
this._layout(this._changeSize,this._resultSize);
}
}
this.inherited(arguments);
this._wasShown=true;
return d;
},refresh:function(){
this.cancel();
this.onLoadDeferred=new dojo.Deferred(dojo.hitch(this,"cancel"));
this.onLoadDeferred.addCallback(dojo.hitch(this,"onLoad"));
this._load();
return this.onLoadDeferred;
},_load:function(){
this._setContent(this.onDownloadStart(),true);
var self=this;
var _4dd={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){
dojo.mixin(_4dd,this.ioArgs);
}
var hand=(this._xhrDfd=(this.ioMethod||dojo.xhrGet)(_4dd));
hand.addCallback(function(html){
try{
self._isDownloaded=true;
self._setContent(html,false);
self.onDownloadEnd();
}
catch(err){
self._onError("Content",err);
}
delete self._xhrDfd;
return html;
});
hand.addErrback(function(err){
if(!hand.canceled){
self._onError("Download",err);
}
delete self._xhrDfd;
return err;
});
delete this._hrefChanged;
},_onLoadHandler:function(data){
this._set("isLoaded",true);
try{
this.onLoadDeferred.callback(data);
}
catch(e){
}
},_onUnloadHandler:function(){
this._set("isLoaded",false);
try{
this.onUnload();
}
catch(e){
}
},destroyDescendants:function(){
if(this.isLoaded){
this._onUnloadHandler();
}
var _4de=this._contentSetter;
dojo.forEach(this.getChildren(),function(_4df){
if(_4df.destroyRecursive){
_4df.destroyRecursive();
}
});
if(_4de){
dojo.forEach(_4de.parseResults,function(_4e0){
if(_4e0.destroyRecursive&&_4e0.domNode&&_4e0.domNode.parentNode==dojo.body()){
_4e0.destroyRecursive();
}
});
delete _4de.parseResults;
}
dojo.html._emptyNode(this.containerNode);
delete this._singleChild;
},_setContent:function(cont,_4e1){
this.destroyDescendants();
var _4e2=this._contentSetter;
if(!(_4e2&&_4e2 instanceof dojo.html._ContentSetter)){
_4e2=this._contentSetter=new dojo.html._ContentSetter({node:this.containerNode,_onError:dojo.hitch(this,this._onError),onContentError:dojo.hitch(this,function(e){
var _4e3=this.onContentError(e);
try{
this.containerNode.innerHTML=_4e3;
}
catch(e){
}
})});
}
var _4e4=dojo.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:this.parseOnLoad,parserScope:this.parserScope,startup:false,dir:this.dir,lang:this.lang},this._contentSetterParams||{});
_4e2.set((dojo.isObject(cont)&&cont.domNode)?cont.domNode:cont,_4e4);
delete this._contentSetterParams;
if(this.doLayout){
this._checkIfSingleChild();
}
if(!_4e1){
if(this._started){
this._startChildren();
this._scheduleLayout();
}
this._onLoadHandler(cont);
}
},_onError:function(type,err,_4e5){
this.onLoadDeferred.errback(err);
var _4e6=this["on"+type+"Error"].call(this,err);
if(_4e5){
}else{
if(_4e6){
this._setContent(_4e6,true);
}
}
},_scheduleLayout:function(_4e7,_4e8){
if(this._isShown()){
this._layout(_4e7,_4e8);
}else{
this._needLayout=true;
this._changeSize=_4e7;
this._resultSize=_4e8;
}
},onLoad:function(data){
},onUnload:function(){
},onDownloadStart:function(){
return this.loadingMessage;
},onContentError:function(_4e9){
},onDownloadError:function(_4ea){
return this.errorMessage;
},onDownloadEnd:function(){
}});
dojo.provide("dijit.TooltipDialog");
dojo.declare("dijit.TooltipDialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin,dijit._DialogMixin],{title:"",doLayout:false,autofocus:true,baseClass:"dijitTooltipDialog",_firstFocusItem:null,_lastFocusItem:null,templateString:dojo.cache("dijit","templates/TooltipDialog.html","<div role=\"presentation\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" dojoAttachPoint=\"containerNode\" role=\"dialog\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\"></div>\n</div>\n"),_setTitleAttr:function(_4eb){
this.containerNode.title=_4eb;
this._set("title",_4eb);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
},orient:function(node,_4ec,_4ed){
var newC="dijitTooltipAB"+(_4ed.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(_4ed.charAt(0)=="T"?"Below":"Above");
dojo.replaceClass(this.domNode,newC,this._currentOrientClass||"");
this._currentOrientClass=newC;
},focus:function(){
this._getFocusItems(this.containerNode);
dijit.focus(this._firstFocusItem);
},onOpen:function(pos){
this.orient(this.domNode,pos.aroundCorner,pos.corner);
this._onShow();
},onClose:function(){
this.onHide();
},_onKey:function(evt){
var node=evt.target;
var dk=dojo.keys;
if(evt.charOrCode===dk.TAB){
this._getFocusItems(this.containerNode);
}
var _4ee=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==dk.ESCAPE){
setTimeout(dojo.hitch(this,"onCancel"),0);
dojo.stopEvent(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===dk.TAB){
if(!_4ee){
dijit.focus(this._lastFocusItem);
}
dojo.stopEvent(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===dk.TAB&&!evt.shiftKey){
if(!_4ee){
dijit.focus(this._firstFocusItem);
}
dojo.stopEvent(evt);
}else{
if(evt.charOrCode===dk.TAB){
evt.stopPropagation();
}
}
}
}
}});
dojo.provide("dijit.Dialog");
dojo.declare("dijit._DialogBase",[dijit._Templated,dijit.form._FormMixin,dijit._DialogMixin,dijit._CssStateMixin],{templateString:dojo.cache("dijit","templates/Dialog.html","<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div dojoAttachPoint=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t<span dojoAttachPoint=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\n\t<span dojoAttachPoint=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" dojoAttachEvent=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t<span dojoAttachPoint=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t</span>\n\t</div>\n\t\t<div dojoAttachPoint=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n"),baseClass:"dijitDialog",cssStateNodes:{closeButtonNode:"dijitDialogCloseIcon"},attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{title:[{node:"titleNode",type:"innerHTML"},{node:"titleBar",type:"attribute"}],"aria-describedby":""}),open:false,duration:dijit.defaultDuration,refocus:true,autofocus:true,_firstFocusItem:null,_lastFocusItem:null,doLayout:false,draggable:true,"aria-describedby":"",postMixInProperties:function(){
var _4ef=dojo.i18n.getLocalization("dijit","common");
dojo.mixin(this,_4ef);
this.inherited(arguments);
},postCreate:function(){
dojo.style(this.domNode,{display:"none",position:"absolute"});
dojo.body().appendChild(this.domNode);
this.inherited(arguments);
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide");
this._modalconnects=[];
},onLoad:function(){
this._position();
if(this.autofocus&&dijit._DialogLevelManager.isTop(this)){
this._getFocusItems(this.domNode);
dijit.focus(this._firstFocusItem);
}
this.inherited(arguments);
},_endDrag:function(e){
if(e&&e.node&&e.node===this.domNode){
this._relativePosition=dojo.position(e.node);
}
},_setup:function(){
var node=this.domNode;
if(this.titleBar&&this.draggable){
this._moveable=(dojo.isIE==6)?new dojo.dnd.TimedMoveable(node,{handle:this.titleBar}):new dojo.dnd.Moveable(node,{handle:this.titleBar,timeout:0});
this._dndListener=dojo.subscribe("/dnd/move/stop",this,"_endDrag");
}else{
dojo.addClass(node,"dijitDialogFixed");
}
this.underlayAttrs={dialogId:this.id,"class":dojo.map(this["class"].split(/\s/),function(s){
return s+"_underlay";
}).join(" ")};
},_size:function(){
this._checkIfSingleChild();
if(this._singleChild){
if(this._singleChildOriginalStyle){
this._singleChild.domNode.style.cssText=this._singleChildOriginalStyle;
}
delete this._singleChildOriginalStyle;
}else{
dojo.style(this.containerNode,{width:"auto",height:"auto"});
}
var mb=dojo._getMarginSize(this.domNode);
var _4f0=dojo.window.getBox();
if(mb.w>=_4f0.w||mb.h>=_4f0.h){
var w=Math.min(mb.w,Math.floor(_4f0.w*0.75)),h=Math.min(mb.h,Math.floor(_4f0.h*0.75));
if(this._singleChild&&this._singleChild.resize){
this._singleChildOriginalStyle=this._singleChild.domNode.style.cssText;
this._singleChild.resize({w:w,h:h});
}else{
dojo.style(this.containerNode,{width:w+"px",height:h+"px",overflow:"auto",position:"relative"});
}
}else{
if(this._singleChild&&this._singleChild.resize){
this._singleChild.resize();
}
}
},_position:function(){
if(!dojo.hasClass(dojo.body(),"dojoMove")){
var node=this.domNode,_4f1=dojo.window.getBox(),p=this._relativePosition,bb=p?null:dojo._getBorderBox(node),l=Math.floor(_4f1.l+(p?p.x:(_4f1.w-bb.w)/2)),t=Math.floor(_4f1.t+(p?p.y:(_4f1.h-bb.h)/2));
dojo.style(node,{left:l+"px",top:t+"px"});
}
},_onKey:function(evt){
if(evt.charOrCode){
var dk=dojo.keys;
var node=evt.target;
if(evt.charOrCode===dk.TAB){
this._getFocusItems(this.domNode);
}
var _4f2=(this._firstFocusItem==this._lastFocusItem);
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===dk.TAB){
if(!_4f2){
dijit.focus(this._lastFocusItem);
}
dojo.stopEvent(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===dk.TAB&&!evt.shiftKey){
if(!_4f2){
dijit.focus(this._firstFocusItem);
}
dojo.stopEvent(evt);
}else{
while(node){
if(node==this.domNode||dojo.hasClass(node,"dijitPopup")){
if(evt.charOrCode==dk.ESCAPE){
this.onCancel();
}else{
return;
}
}
node=node.parentNode;
}
if(evt.charOrCode!==dk.TAB){
dojo.stopEvent(evt);
}else{
if(!dojo.isOpera){
try{
this._firstFocusItem.focus();
}
catch(e){
}
}
}
}
}
}
},show:function(){
if(this.open){
return;
}
if(!this._started){
this.startup();
}
if(!this._alreadyInitialized){
this._setup();
this._alreadyInitialized=true;
}
if(this._fadeOutDeferred){
this._fadeOutDeferred.cancel();
}
this._modalconnects.push(dojo.connect(window,"onscroll",this,"layout"));
this._modalconnects.push(dojo.connect(window,"onresize",this,function(){
var _4f3=dojo.window.getBox();
if(!this._oldViewport||_4f3.h!=this._oldViewport.h||_4f3.w!=this._oldViewport.w){
this.layout();
this._oldViewport=_4f3;
}
}));
this._modalconnects.push(dojo.connect(this.domNode,"onkeypress",this,"_onKey"));
dojo.style(this.domNode,{opacity:0,display:""});
this._set("open",true);
this._onShow();
this._size();
this._position();
var _4f4;
this._fadeInDeferred=new dojo.Deferred(dojo.hitch(this,function(){
_4f4.stop();
delete this._fadeInDeferred;
}));
_4f4=dojo.fadeIn({node:this.domNode,duration:this.duration,beforeBegin:dojo.hitch(this,function(){
dijit._DialogLevelManager.show(this,this.underlayAttrs);
}),onEnd:dojo.hitch(this,function(){
if(this.autofocus&&dijit._DialogLevelManager.isTop(this)){
this._getFocusItems(this.domNode);
dijit.focus(this._firstFocusItem);
}
this._fadeInDeferred.callback(true);
delete this._fadeInDeferred;
})}).play();
return this._fadeInDeferred;
},hide:function(){
if(!this._alreadyInitialized){
return;
}
if(this._fadeInDeferred){
this._fadeInDeferred.cancel();
}
var _4f5;
this._fadeOutDeferred=new dojo.Deferred(dojo.hitch(this,function(){
_4f5.stop();
delete this._fadeOutDeferred;
}));
_4f5=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,function(){
this.domNode.style.display="none";
dijit._DialogLevelManager.hide(this);
this.onHide();
this._fadeOutDeferred.callback(true);
delete this._fadeOutDeferred;
})}).play();
if(this._scrollConnected){
this._scrollConnected=false;
}
dojo.forEach(this._modalconnects,dojo.disconnect);
this._modalconnects=[];
if(this._relativePosition){
delete this._relativePosition;
}
this._set("open",false);
return this._fadeOutDeferred;
},layout:function(){
if(this.domNode.style.display!="none"){
if(dijit._underlay){
dijit._underlay.layout();
}
this._position();
}
},destroy:function(){
if(this._fadeInDeferred){
this._fadeInDeferred.cancel();
}
if(this._fadeOutDeferred){
this._fadeOutDeferred.cancel();
}
if(this._moveable){
this._moveable.destroy();
}
if(this._dndListener){
dojo.unsubscribe(this._dndListener);
}
dojo.forEach(this._modalconnects,dojo.disconnect);
dijit._DialogLevelManager.hide(this);
this.inherited(arguments);
}});
dojo.declare("dijit.Dialog",[dijit.layout.ContentPane,dijit._DialogBase],{});
dijit._DialogLevelManager={show:function(_4f6,_4f7){
var ds=dijit._dialogStack;
ds[ds.length-1].focus=dijit.getFocus(_4f6);
var _4f8=dijit._underlay;
if(!_4f8||_4f8._destroyed){
_4f8=dijit._underlay=new dijit.DialogUnderlay(_4f7);
}else{
_4f8.set(_4f6.underlayAttrs);
}
var _4f9=ds[ds.length-1].dialog?ds[ds.length-1].zIndex+2:950;
if(ds.length==1){
_4f8.show();
}
dojo.style(dijit._underlay.domNode,"zIndex",_4f9-1);
dojo.style(_4f6.domNode,"zIndex",_4f9);
ds.push({dialog:_4f6,underlayAttrs:_4f7,zIndex:_4f9});
},hide:function(_4fa){
var ds=dijit._dialogStack;
if(ds[ds.length-1].dialog==_4fa){
ds.pop();
var pd=ds[ds.length-1];
if(ds.length==1){
if(!dijit._underlay._destroyed){
dijit._underlay.hide();
}
}else{
dojo.style(dijit._underlay.domNode,"zIndex",pd.zIndex-1);
dijit._underlay.set(pd.underlayAttrs);
}
if(_4fa.refocus){
var _4fb=pd.focus;
if(!_4fb||(pd.dialog&&!dojo.isDescendant(_4fb.node,pd.dialog.domNode))){
pd.dialog._getFocusItems(pd.dialog.domNode);
_4fb=pd.dialog._firstFocusItem;
}
try{
dijit.focus(_4fb);
}
catch(e){
}
}
}else{
var idx=dojo.indexOf(dojo.map(ds,function(elem){
return elem.dialog;
}),_4fa);
if(idx!=-1){
ds.splice(idx,1);
}
}
},isTop:function(_4fc){
var ds=dijit._dialogStack;
return ds[ds.length-1].dialog==_4fc;
}};
dijit._dialogStack=[{dialog:null,focus:null,underlayAttrs:null}];
dojo.provide("dijit._editor.selection");
dojo.getObject("_editor.selection",true,dijit);
dojo.mixin(dijit._editor.selection,{getType:function(){
if(dojo.isIE){
return dojo.doc.selection.type.toLowerCase();
}else{
var _4fd="text";
var oSel;
try{
oSel=dojo.global.getSelection();
}
catch(e){
}
if(oSel&&oSel.rangeCount==1){
var _4fe=oSel.getRangeAt(0);
if((_4fe.startContainer==_4fe.endContainer)&&((_4fe.endOffset-_4fe.startOffset)==1)&&(_4fe.startContainer.nodeType!=3)){
_4fd="control";
}
}
return _4fd;
}
},getSelectedText:function(){
if(dojo.isIE){
if(dijit._editor.selection.getType()=="control"){
return null;
}
return dojo.doc.selection.createRange().text;
}else{
var _4ff=dojo.global.getSelection();
if(_4ff){
return _4ff.toString();
}
}
return "";
},getSelectedHtml:function(){
if(dojo.isIE){
if(dijit._editor.selection.getType()=="control"){
return null;
}
return dojo.doc.selection.createRange().htmlText;
}else{
var _500=dojo.global.getSelection();
if(_500&&_500.rangeCount){
var i;
var html="";
for(i=0;i<_500.rangeCount;i++){
var frag=_500.getRangeAt(i).cloneContents();
var div=dojo.doc.createElement("div");
div.appendChild(frag);
html+=div.innerHTML;
}
return html;
}
return null;
}
},getSelectedElement:function(){
if(dijit._editor.selection.getType()=="control"){
if(dojo.isIE){
var _501=dojo.doc.selection.createRange();
if(_501&&_501.item){
return dojo.doc.selection.createRange().item(0);
}
}else{
var _502=dojo.global.getSelection();
return _502.anchorNode.childNodes[_502.anchorOffset];
}
}
return null;
},getParentElement:function(){
if(dijit._editor.selection.getType()=="control"){
var p=this.getSelectedElement();
if(p){
return p.parentNode;
}
}else{
if(dojo.isIE){
var r=dojo.doc.selection.createRange();
r.collapse(true);
return r.parentElement();
}else{
var _503=dojo.global.getSelection();
if(_503){
var node=_503.anchorNode;
while(node&&(node.nodeType!=1)){
node=node.parentNode;
}
return node;
}
}
}
return null;
},hasAncestorElement:function(_504){
return this.getAncestorElement.apply(this,arguments)!=null;
},getAncestorElement:function(_505){
var node=this.getSelectedElement()||this.getParentElement();
return this.getParentOfType(node,arguments);
},isTag:function(node,tags){
if(node&&node.tagName){
var _506=node.tagName.toLowerCase();
for(var i=0;i<tags.length;i++){
var _507=String(tags[i]).toLowerCase();
if(_506==_507){
return _507;
}
}
}
return "";
},getParentOfType:function(node,tags){
while(node){
if(this.isTag(node,tags).length){
return node;
}
node=node.parentNode;
}
return null;
},collapse:function(_508){
if(window.getSelection){
var _509=dojo.global.getSelection();
if(_509.removeAllRanges){
if(_508){
_509.collapseToStart();
}else{
_509.collapseToEnd();
}
}else{
_509.collapse(_508);
}
}else{
if(dojo.isIE){
var _50a=dojo.doc.selection.createRange();
_50a.collapse(_508);
_50a.select();
}
}
},remove:function(){
var sel=dojo.doc.selection;
if(dojo.isIE){
if(sel.type.toLowerCase()!="none"){
sel.clear();
}
return sel;
}else{
sel=dojo.global.getSelection();
sel.deleteFromDocument();
return sel;
}
},selectElementChildren:function(_50b,_50c){
var win=dojo.global;
var doc=dojo.doc;
var _50d;
_50b=dojo.byId(_50b);
if(doc.selection&&dojo.isIE&&dojo.body().createTextRange){
_50d=_50b.ownerDocument.body.createTextRange();
_50d.moveToElementText(_50b);
if(!_50c){
try{
_50d.select();
}
catch(e){
}
}
}else{
if(win.getSelection){
var _50e=dojo.global.getSelection();
if(dojo.isOpera){
if(_50e.rangeCount){
_50d=_50e.getRangeAt(0);
}else{
_50d=doc.createRange();
}
_50d.setStart(_50b,0);
_50d.setEnd(_50b,(_50b.nodeType==3)?_50b.length:_50b.childNodes.length);
_50e.addRange(_50d);
}else{
_50e.selectAllChildren(_50b);
}
}
}
},selectElement:function(_50f,_510){
var _511;
var doc=dojo.doc;
var win=dojo.global;
_50f=dojo.byId(_50f);
if(dojo.isIE&&dojo.body().createTextRange){
try{
_511=dojo.body().createControlRange();
_511.addElement(_50f);
if(!_510){
_511.select();
}
}
catch(e){
this.selectElementChildren(_50f,_510);
}
}else{
if(dojo.global.getSelection){
var _512=win.getSelection();
_511=doc.createRange();
if(_512.removeAllRanges){
if(dojo.isOpera){
if(_512.getRangeAt(0)){
_511=_512.getRangeAt(0);
}
}
_511.selectNode(_50f);
_512.removeAllRanges();
_512.addRange(_511);
}
}
}
},inSelection:function(node){
if(node){
var _513;
var doc=dojo.doc;
var _514;
if(dojo.global.getSelection){
var sel=dojo.global.getSelection();
if(sel&&sel.rangeCount>0){
_514=sel.getRangeAt(0);
}
if(_514&&_514.compareBoundaryPoints&&doc.createRange){
try{
_513=doc.createRange();
_513.setStart(node,0);
if(_514.compareBoundaryPoints(_514.START_TO_END,_513)===1){
return true;
}
}
catch(e){
}
}
}else{
if(doc.selection){
_514=doc.selection.createRange();
try{
_513=node.ownerDocument.body.createControlRange();
if(_513){
_513.addElement(node);
}
}
catch(e1){
try{
_513=node.ownerDocument.body.createTextRange();
_513.moveToElementText(node);
}
catch(e2){
}
}
if(_514&&_513){
if(_514.compareEndPoints("EndToStart",_513)===1){
return true;
}
}
}
}
}
return false;
}});
dojo.provide("dijit._editor.range");
dijit.range={};
dijit.range.getIndex=function(node,_515){
var ret=[],retR=[];
var stop=_515;
var _516=node;
var _517,n;
while(node!=stop){
var i=0;
_517=node.parentNode;
while((n=_517.childNodes[i++])){
if(n===node){
--i;
break;
}
}
ret.unshift(i);
retR.unshift(i-_517.childNodes.length);
node=_517;
}
if(ret.length>0&&_516.nodeType==3){
n=_516.previousSibling;
while(n&&n.nodeType==3){
ret[ret.length-1]--;
n=n.previousSibling;
}
n=_516.nextSibling;
while(n&&n.nodeType==3){
retR[retR.length-1]++;
n=n.nextSibling;
}
}
return {o:ret,r:retR};
};
dijit.range.getNode=function(_518,_519){
if(!dojo.isArray(_518)||_518.length==0){
return _519;
}
var node=_519;
dojo.every(_518,function(i){
if(i>=0&&i<node.childNodes.length){
node=node.childNodes[i];
}else{
node=null;
return false;
}
return true;
});
return node;
};
dijit.range.getCommonAncestor=function(n1,n2,root){
root=root||n1.ownerDocument.body;
var _51a=function(n){
var as=[];
while(n){
as.unshift(n);
if(n!==root){
n=n.parentNode;
}else{
break;
}
}
return as;
};
var n1as=_51a(n1);
var n2as=_51a(n2);
var m=Math.min(n1as.length,n2as.length);
var com=n1as[0];
for(var i=1;i<m;i++){
if(n1as[i]===n2as[i]){
com=n1as[i];
}else{
break;
}
}
return com;
};
dijit.range.getAncestor=function(node,_51b,root){
root=root||node.ownerDocument.body;
while(node&&node!==root){
var name=node.nodeName.toUpperCase();
if(_51b.test(name)){
return node;
}
node=node.parentNode;
}
return null;
};
dijit.range.BlockTagNames=/^(?:P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DT|DE)$/;
dijit.range.getBlockAncestor=function(node,_51c,root){
root=root||node.ownerDocument.body;
_51c=_51c||dijit.range.BlockTagNames;
var _51d=null,_51e;
while(node&&node!==root){
var name=node.nodeName.toUpperCase();
if(!_51d&&_51c.test(name)){
_51d=node;
}
if(!_51e&&(/^(?:BODY|TD|TH|CAPTION)$/).test(name)){
_51e=node;
}
node=node.parentNode;
}
return {blockNode:_51d,blockContainer:_51e||node.ownerDocument.body};
};
dijit.range.atBeginningOfContainer=function(_51f,node,_520){
var _521=false;
var _522=(_520==0);
if(!_522&&node.nodeType==3){
if(/^[\s\xA0]+$/.test(node.nodeValue.substr(0,_520))){
_522=true;
}
}
if(_522){
var _523=node;
_521=true;
while(_523&&_523!==_51f){
if(_523.previousSibling){
_521=false;
break;
}
_523=_523.parentNode;
}
}
return _521;
};
dijit.range.atEndOfContainer=function(_524,node,_525){
var _526=false;
var _527=(_525==(node.length||node.childNodes.length));
if(!_527&&node.nodeType==3){
if(/^[\s\xA0]+$/.test(node.nodeValue.substr(_525))){
_527=true;
}
}
if(_527){
var _528=node;
_526=true;
while(_528&&_528!==_524){
if(_528.nextSibling){
_526=false;
break;
}
_528=_528.parentNode;
}
}
return _526;
};
dijit.range.adjacentNoneTextNode=function(_529,next){
var node=_529;
var len=(0-_529.length)||0;
var prop=next?"nextSibling":"previousSibling";
while(node){
if(node.nodeType!=3){
break;
}
len+=node.length;
node=node[prop];
}
return [node,len];
};
dijit.range._w3c=Boolean(window["getSelection"]);
dijit.range.create=function(win){
if(dijit.range._w3c){
return (win||dojo.global).document.createRange();
}else{
return new dijit.range.W3CRange;
}
};
dijit.range.getSelection=function(win,_52a){
if(dijit.range._w3c){
return win.getSelection();
}else{
var s=new dijit.range.ie.selection(win);
if(!_52a){
s._getCurrentSelection();
}
return s;
}
};
if(!dijit.range._w3c){
dijit.range.ie={cachedSelection:{},selection:function(win){
this._ranges=[];
this.addRange=function(r,_52b){
this._ranges.push(r);
if(!_52b){
r._select();
}
this.rangeCount=this._ranges.length;
};
this.removeAllRanges=function(){
this._ranges=[];
this.rangeCount=0;
};
var _52c=function(){
var r=win.document.selection.createRange();
var type=win.document.selection.type.toUpperCase();
if(type=="CONTROL"){
return new dijit.range.W3CRange(dijit.range.ie.decomposeControlRange(r));
}else{
return new dijit.range.W3CRange(dijit.range.ie.decomposeTextRange(r));
}
};
this.getRangeAt=function(i){
return this._ranges[i];
};
this._getCurrentSelection=function(){
this.removeAllRanges();
var r=_52c();
if(r){
this.addRange(r,true);
}
};
},decomposeControlRange:function(_52d){
var _52e=_52d.item(0),_52f=_52d.item(_52d.length-1);
var _530=_52e.parentNode,_531=_52f.parentNode;
var _532=dijit.range.getIndex(_52e,_530).o;
var _533=dijit.range.getIndex(_52f,_531).o+1;
return [_530,_532,_531,_533];
},getEndPoint:function(_534,end){
var _535=_534.duplicate();
_535.collapse(!end);
var _536="EndTo"+(end?"End":"Start");
var _537=_535.parentElement();
var _538,_539,_53a;
if(_537.childNodes.length>0){
dojo.every(_537.childNodes,function(node,i){
var _53b;
if(node.nodeType!=3){
_535.moveToElementText(node);
if(_535.compareEndPoints(_536,_534)>0){
if(_53a&&_53a.nodeType==3){
_538=_53a;
_53b=true;
}else{
_538=_537;
_539=i;
return false;
}
}else{
if(i==_537.childNodes.length-1){
_538=_537;
_539=_537.childNodes.length;
return false;
}
}
}else{
if(i==_537.childNodes.length-1){
_538=node;
_53b=true;
}
}
if(_53b&&_538){
var _53c=dijit.range.adjacentNoneTextNode(_538)[0];
if(_53c){
_538=_53c.nextSibling;
}else{
_538=_537.firstChild;
}
var _53d=dijit.range.adjacentNoneTextNode(_538);
_53c=_53d[0];
var _53e=_53d[1];
if(_53c){
_535.moveToElementText(_53c);
_535.collapse(false);
}else{
_535.moveToElementText(_537);
}
_535.setEndPoint(_536,_534);
_539=_535.text.length-_53e;
return false;
}
_53a=node;
return true;
});
}else{
_538=_537;
_539=0;
}
if(!end&&_538.nodeType==1&&_539==_538.childNodes.length){
var _53f=_538.nextSibling;
if(_53f&&_53f.nodeType==3){
_538=_53f;
_539=0;
}
}
return [_538,_539];
},setEndPoint:function(_540,_541,_542){
var _543=_540.duplicate(),node,len;
if(_541.nodeType!=3){
if(_542>0){
node=_541.childNodes[_542-1];
if(node){
if(node.nodeType==3){
_541=node;
_542=node.length;
}else{
if(node.nextSibling&&node.nextSibling.nodeType==3){
_541=node.nextSibling;
_542=0;
}else{
_543.moveToElementText(node.nextSibling?node:_541);
var _544=node.parentNode;
var _545=_544.insertBefore(node.ownerDocument.createTextNode(" "),node.nextSibling);
_543.collapse(false);
_544.removeChild(_545);
}
}
}
}else{
_543.moveToElementText(_541);
_543.collapse(true);
}
}
if(_541.nodeType==3){
var _546=dijit.range.adjacentNoneTextNode(_541);
var _547=_546[0];
len=_546[1];
if(_547){
_543.moveToElementText(_547);
_543.collapse(false);
if(_547.contentEditable!="inherit"){
len++;
}
}else{
_543.moveToElementText(_541.parentNode);
_543.collapse(true);
}
_542+=len;
if(_542>0){
if(_543.move("character",_542)!=_542){
}
}
}
return _543;
},decomposeTextRange:function(_548){
var _549=dijit.range.ie.getEndPoint(_548);
var _54a=_549[0],_54b=_549[1];
var _54c=_549[0],_54d=_549[1];
if(_548.htmlText.length){
if(_548.htmlText==_548.text){
_54d=_54b+_548.text.length;
}else{
_549=dijit.range.ie.getEndPoint(_548,true);
_54c=_549[0],_54d=_549[1];
}
}
return [_54a,_54b,_54c,_54d];
},setRange:function(_54e,_54f,_550,_551,_552,_553){
var _554=dijit.range.ie.setEndPoint(_54e,_54f,_550);
_54e.setEndPoint("StartToStart",_554);
if(!_553){
var end=dijit.range.ie.setEndPoint(_54e,_551,_552);
}
_54e.setEndPoint("EndToEnd",end||_554);
return _54e;
}};
dojo.declare("dijit.range.W3CRange",null,{constructor:function(){
if(arguments.length>0){
this.setStart(arguments[0][0],arguments[0][1]);
this.setEnd(arguments[0][2],arguments[0][3]);
}else{
this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true;
}
},_updateInternal:function(){
if(this.startContainer!==this.endContainer){
this.commonAncestorContainer=dijit.range.getCommonAncestor(this.startContainer,this.endContainer);
}else{
this.commonAncestorContainer=this.startContainer;
}
this.collapsed=(this.startContainer===this.endContainer)&&(this.startOffset==this.endOffset);
},setStart:function(node,_555){
_555=parseInt(_555);
if(this.startContainer===node&&this.startOffset==_555){
return;
}
delete this._cachedBookmark;
this.startContainer=node;
this.startOffset=_555;
if(!this.endContainer){
this.setEnd(node,_555);
}else{
this._updateInternal();
}
},setEnd:function(node,_556){
_556=parseInt(_556);
if(this.endContainer===node&&this.endOffset==_556){
return;
}
delete this._cachedBookmark;
this.endContainer=node;
this.endOffset=_556;
if(!this.startContainer){
this.setStart(node,_556);
}else{
this._updateInternal();
}
},setStartAfter:function(node,_557){
this._setPoint("setStart",node,_557,1);
},setStartBefore:function(node,_558){
this._setPoint("setStart",node,_558,0);
},setEndAfter:function(node,_559){
this._setPoint("setEnd",node,_559,1);
},setEndBefore:function(node,_55a){
this._setPoint("setEnd",node,_55a,0);
},_setPoint:function(what,node,_55b,ext){
var _55c=dijit.range.getIndex(node,node.parentNode).o;
this[what](node.parentNode,_55c.pop()+ext);
},_getIERange:function(){
var r=(this._body||this.endContainer.ownerDocument.body).createTextRange();
dijit.range.ie.setRange(r,this.startContainer,this.startOffset,this.endContainer,this.endOffset,this.collapsed);
return r;
},getBookmark:function(body){
this._getIERange();
return this._cachedBookmark;
},_select:function(){
var r=this._getIERange();
r.select();
},deleteContents:function(){
var r=this._getIERange();
r.pasteHTML("");
this.endContainer=this.startContainer;
this.endOffset=this.startOffset;
this.collapsed=true;
},cloneRange:function(){
var r=new dijit.range.W3CRange([this.startContainer,this.startOffset,this.endContainer,this.endOffset]);
r._body=this._body;
return r;
},detach:function(){
this._body=null;
this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true;
}});
}
dojo.provide("dijit._editor.html");
dojo.getObject("_editor",true,dijit);
dijit._editor.escapeXml=function(str,_55d){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_55d){
str=str.replace(/'/gm,"&#39;");
}
return str;
};
dijit._editor.getNodeHtml=function(node){
var _55e;
switch(node.nodeType){
case 1:
var _55f=node.nodeName.toLowerCase();
if(!_55f||_55f.charAt(0)=="/"){
return "";
}
_55e="<"+_55f;
var _560=[];
var attr;
if(dojo.isIE&&node.outerHTML){
var s=node.outerHTML;
s=s.substr(0,s.indexOf(">")).replace(/(['"])[^"']*\1/g,"");
var reg=/(\b\w+)\s?=/g;
var m,key;
while((m=reg.exec(s))){
key=m[1];
if(key.substr(0,3)!="_dj"){
if(key=="src"||key=="href"){
if(node.getAttribute("_djrealurl")){
_560.push([key,node.getAttribute("_djrealurl")]);
continue;
}
}
var val,_561;
switch(key){
case "style":
val=node.style.cssText.toLowerCase();
break;
case "class":
val=node.className;
break;
case "width":
if(_55f==="img"){
_561=/width=(\S+)/i.exec(s);
if(_561){
val=_561[1];
}
break;
}
case "height":
if(_55f==="img"){
_561=/height=(\S+)/i.exec(s);
if(_561){
val=_561[1];
}
break;
}
default:
val=node.getAttribute(key);
}
if(val!=null){
_560.push([key,val.toString()]);
}
}
}
}else{
var i=0;
while((attr=node.attributes[i++])){
var n=attr.name;
if(n.substr(0,3)!="_dj"){
var v=attr.value;
if(n=="src"||n=="href"){
if(node.getAttribute("_djrealurl")){
v=node.getAttribute("_djrealurl");
}
}
_560.push([n,v]);
}
}
}
_560.sort(function(a,b){
return a[0]<b[0]?-1:(a[0]==b[0]?0:1);
});
var j=0;
while((attr=_560[j++])){
_55e+=" "+attr[0]+"=\""+(dojo.isString(attr[1])?dijit._editor.escapeXml(attr[1],true):attr[1])+"\"";
}
if(_55f==="script"){
_55e+=">"+node.innerHTML+"</"+_55f+">";
}else{
if(node.childNodes.length){
_55e+=">"+dijit._editor.getChildrenHtml(node)+"</"+_55f+">";
}else{
switch(_55f){
case "br":
case "hr":
case "img":
case "input":
case "base":
case "meta":
case "area":
case "basefont":
_55e+=" />";
break;
default:
_55e+="></"+_55f+">";
}
}
}
break;
case 4:
case 3:
_55e=dijit._editor.escapeXml(node.nodeValue,true);
break;
case 8:
_55e="<!--"+dijit._editor.escapeXml(node.nodeValue,true)+"-->";
break;
default:
_55e="<!-- Element not recognized - Type: "+node.nodeType+" Name: "+node.nodeName+"-->";
}
return _55e;
};
dijit._editor.getChildrenHtml=function(dom){
var out="";
if(!dom){
return out;
}
var _562=dom["childNodes"]||dom;
var _563=!dojo.isIE||_562!==dom;
var node,i=0;
while((node=_562[i++])){
if(!_563||node.parentNode==dom){
out+=dijit._editor.getNodeHtml(node);
}
}
return out;
};
dojo.provide("dijit._editor.RichText");
if(!dojo.config["useXDomain"]||dojo.config["allowXdRichTextSave"]){
if(dojo._postLoad){
(function(){
var _564=dojo.doc.createElement("textarea");
_564.id=dijit._scopeName+"._editor.RichText.value";
dojo.style(_564,{display:"none",position:"absolute",top:"-100px",height:"3px",width:"3px"});
dojo.body().appendChild(_564);
})();
}else{
try{
dojo.doc.write("<textarea id=\""+dijit._scopeName+"._editor.RichText.value\" "+"style=\"display:none;position:absolute;top:-100px;left:-100px;height:3px;width:3px;overflow:hidden;\"></textarea>");
}
catch(e){
}
}
}
dojo.declare("dijit._editor.RichText",[dijit._Widget,dijit._CssStateMixin],{constructor:function(_565){
this.contentPreFilters=[];
this.contentPostFilters=[];
this.contentDomPreFilters=[];
this.contentDomPostFilters=[];
this.editingAreaStyleSheets=[];
this.events=[].concat(this.events);
this._keyHandlers={};
if(_565&&dojo.isString(_565.value)){
this.value=_565.value;
}
this.onLoadDeferred=new dojo.Deferred();
},baseClass:"dijitEditor",inheritWidth:false,focusOnLoad:false,name:"",styleSheets:"",height:"300px",minHeight:"1em",isClosed:true,isLoaded:false,_SEPARATOR:"@@**%%__RICHTEXTBOUNDRY__%%**@@",_NAME_CONTENT_SEP:"@@**%%:%%**@@",onLoadDeferred:null,isTabIndent:false,disableSpellCheck:false,postCreate:function(){
if("textarea"==this.domNode.tagName.toLowerCase()){
}
this.contentPreFilters=[dojo.hitch(this,"_preFixUrlAttributes")].concat(this.contentPreFilters);
if(dojo.isMoz){
this.contentPreFilters=[this._normalizeFontStyle].concat(this.contentPreFilters);
this.contentPostFilters=[this._removeMozBogus].concat(this.contentPostFilters);
}
if(dojo.isWebKit){
this.contentPreFilters=[this._removeWebkitBogus].concat(this.contentPreFilters);
this.contentPostFilters=[this._removeWebkitBogus].concat(this.contentPostFilters);
}
if(dojo.isIE){
this.contentPostFilters=[this._normalizeFontStyle].concat(this.contentPostFilters);
}
this.inherited(arguments);
dojo.publish(dijit._scopeName+"._editor.RichText::init",[this]);
this.open();
this.setupDefaultShortcuts();
},setupDefaultShortcuts:function(){
var exec=dojo.hitch(this,function(cmd,arg){
return function(){
return !this.execCommand(cmd,arg);
};
});
var _566={b:exec("bold"),i:exec("italic"),u:exec("underline"),a:exec("selectall"),s:function(){
this.save(true);
},m:function(){
this.isTabIndent=!this.isTabIndent;
},"1":exec("formatblock","h1"),"2":exec("formatblock","h2"),"3":exec("formatblock","h3"),"4":exec("formatblock","h4"),"\\":exec("insertunorderedlist")};
if(!dojo.isIE){
_566.Z=exec("redo");
}
for(var key in _566){
this.addKeyHandler(key,true,false,_566[key]);
}
},events:["onKeyPress","onKeyDown","onKeyUp"],captureEvents:[],_editorCommandsLocalized:false,_localizeEditorCommands:function(){
if(this._editorCommandsLocalized){
return;
}
this._editorCommandsLocalized=true;
var _567=["div","p","pre","h1","h2","h3","h4","h5","h6","ol","ul","address"];
var _568="",_569,i=0;
while((_569=_567[i++])){
if(_569.charAt(1)!="l"){
_568+="<"+_569+"><span>content</span></"+_569+"><br/>";
}else{
_568+="<"+_569+"><li>content</li></"+_569+"><br/>";
}
}
var div=dojo.doc.createElement("div");
dojo.style(div,{position:"absolute",top:"-2000px"});
dojo.doc.body.appendChild(div);
div.innerHTML=_568;
var node=div.firstChild;
while(node){
dijit._editor.selection.selectElement(node.firstChild);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[node.firstChild]);
var _56a=node.tagName.toLowerCase();
this._local2NativeFormatNames[_56a]=document.queryCommandValue("formatblock");
this._native2LocalFormatNames[this._local2NativeFormatNames[_56a]]=_56a;
node=node.nextSibling.nextSibling;
}
dojo.body().removeChild(div);
},open:function(_56b){
if(!this.onLoadDeferred||this.onLoadDeferred.fired>=0){
this.onLoadDeferred=new dojo.Deferred();
}
if(!this.isClosed){
this.close();
}
dojo.publish(dijit._scopeName+"._editor.RichText::open",[this]);
if(arguments.length==1&&_56b.nodeName){
this.domNode=_56b;
}
var dn=this.domNode;
var html;
if(dojo.isString(this.value)){
html=this.value;
delete this.value;
dn.innerHTML="";
}else{
if(dn.nodeName&&dn.nodeName.toLowerCase()=="textarea"){
var ta=(this.textarea=dn);
this.name=ta.name;
html=ta.value;
dn=this.domNode=dojo.doc.createElement("div");
dn.setAttribute("widgetId",this.id);
ta.removeAttribute("widgetId");
dn.cssText=ta.cssText;
dn.className+=" "+ta.className;
dojo.place(dn,ta,"before");
var _56c=dojo.hitch(this,function(){
dojo.style(ta,{display:"block",position:"absolute",top:"-1000px"});
if(dojo.isIE){
var s=ta.style;
this.__overflow=s.overflow;
s.overflow="hidden";
}
});
if(dojo.isIE){
setTimeout(_56c,10);
}else{
_56c();
}
if(ta.form){
var _56d=ta.value;
this.reset=function(){
var _56e=this.getValue();
if(_56e!=_56d){
this.replaceValue(_56d);
}
};
dojo.connect(ta.form,"onsubmit",this,function(){
dojo.attr(ta,"disabled",this.disabled);
ta.value=this.getValue();
});
}
}else{
html=dijit._editor.getChildrenHtml(dn);
dn.innerHTML="";
}
}
var _56f=dojo.contentBox(dn);
this._oldHeight=_56f.h;
this._oldWidth=_56f.w;
this.value=html;
if(dn.nodeName&&dn.nodeName=="LI"){
dn.innerHTML=" <br>";
}
this.header=dn.ownerDocument.createElement("div");
dn.appendChild(this.header);
this.editingArea=dn.ownerDocument.createElement("div");
dn.appendChild(this.editingArea);
this.footer=dn.ownerDocument.createElement("div");
dn.appendChild(this.footer);
if(!this.name){
this.name=this.id+"_AUTOGEN";
}
if(this.name!==""&&(!dojo.config["useXDomain"]||dojo.config["allowXdRichTextSave"])){
var _570=dojo.byId(dijit._scopeName+"._editor.RichText.value");
if(_570&&_570.value!==""){
var _571=_570.value.split(this._SEPARATOR),i=0,dat;
while((dat=_571[i++])){
var data=dat.split(this._NAME_CONTENT_SEP);
if(data[0]==this.name){
html=data[1];
_571=_571.splice(i,1);
_570.value=_571.join(this._SEPARATOR);
break;
}
}
}
if(!dijit._editor._globalSaveHandler){
dijit._editor._globalSaveHandler={};
dojo.addOnUnload(function(){
var id;
for(id in dijit._editor._globalSaveHandler){
var f=dijit._editor._globalSaveHandler[id];
if(dojo.isFunction(f)){
f();
}
}
});
}
dijit._editor._globalSaveHandler[this.id]=dojo.hitch(this,"_saveContent");
}
this.isClosed=false;
var ifr=(this.editorObject=this.iframe=dojo.doc.createElement("iframe"));
ifr.id=this.id+"_iframe";
this._iframeSrc=this._getIframeDocTxt();
ifr.style.border="none";
ifr.style.width="100%";
if(this._layoutMode){
ifr.style.height="100%";
}else{
if(dojo.isIE>=7){
if(this.height){
ifr.style.height=this.height;
}
if(this.minHeight){
ifr.style.minHeight=this.minHeight;
}
}else{
ifr.style.height=this.height?this.height:this.minHeight;
}
}
ifr.frameBorder=0;
ifr._loadFunc=dojo.hitch(this,function(win){
this.window=win;
this.document=this.window.document;
if(dojo.isIE){
this._localizeEditorCommands();
}
this.onLoad(html);
});
var s="javascript:parent."+dijit._scopeName+".byId(\""+this.id+"\")._iframeSrc";
ifr.setAttribute("src",s);
this.editingArea.appendChild(ifr);
if(dojo.isSafari<=4){
var src=ifr.getAttribute("src");
if(!src||src.indexOf("javascript")==-1){
setTimeout(function(){
ifr.setAttribute("src",s);
},0);
}
}
if(dn.nodeName=="LI"){
dn.lastChild.style.marginTop="-1.2em";
}
dojo.addClass(this.domNode,this.baseClass);
},_local2NativeFormatNames:{},_native2LocalFormatNames:{},_getIframeDocTxt:function(){
var _572=dojo.getComputedStyle(this.domNode);
var html="";
var _573=true;
if(dojo.isIE||dojo.isWebKit||(!this.height&&!dojo.isMoz)){
html="<div id='dijitEditorBody'></div>";
_573=false;
}else{
if(dojo.isMoz){
this._cursorToStart=true;
html="&nbsp;";
}
}
var font=[_572.fontWeight,_572.fontSize,_572.fontFamily].join(" ");
var _574=_572.lineHeight;
if(_574.indexOf("px")>=0){
_574=parseFloat(_574)/parseFloat(_572.fontSize);
}else{
if(_574.indexOf("em")>=0){
_574=parseFloat(_574);
}else{
_574="normal";
}
}
var _575="";
var self=this;
this.style.replace(/(^|;)\s*(line-|font-?)[^;]+/ig,function(_576){
_576=_576.replace(/^;/ig,"")+";";
var s=_576.split(":")[0];
if(s){
s=dojo.trim(s);
s=s.toLowerCase();
var i;
var sC="";
for(i=0;i<s.length;i++){
var c=s.charAt(i);
switch(c){
case "-":
i++;
c=s.charAt(i).toUpperCase();
default:
sC+=c;
}
}
dojo.style(self.domNode,sC,"");
}
_575+=_576+";";
});
var _577=dojo.query("label[for=\""+this.id+"\"]");
return [this.isLeftToRight()?"<html>\n<head>\n":"<html dir='rtl'>\n<head>\n",(dojo.isMoz&&_577.length?"<title>"+_577[0].innerHTML+"</title>\n":""),"<meta http-equiv='Content-Type' content='text/html'>\n","<style>\n","\tbody,html {\n","\t\tbackground:transparent;\n","\t\tpadding: 1px 0 0 0;\n","\t\tmargin: -1px 0 0 0;\n",((dojo.isWebKit)?"\t\twidth: 100%;\n":""),((dojo.isWebKit)?"\t\theight: 100%;\n":""),"\t}\n","\tbody{\n","\t\ttop:0px;\n","\t\tleft:0px;\n","\t\tright:0px;\n","\t\tfont:",font,";\n",((this.height||dojo.isOpera)?"":"\t\tposition: fixed;\n"),"\t\tmin-height:",this.minHeight,";\n","\t\tline-height:",_574,";\n","\t}\n","\tp{ margin: 1em 0; }\n",(!_573&&!this.height?"\tbody,html {overflow-y: hidden;}\n":""),"\t#dijitEditorBody{overflow-x: auto; overflow-y:"+(this.height?"auto;":"hidden;")+" outline: 0px;}\n","\tli > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; }\n","\tli{ min-height:1.2em; }\n","</style>\n",this._applyEditingAreaStyleSheets(),"\n","</head>\n<body ",(_573?"id='dijitEditorBody' ":""),"onload='frameElement._loadFunc(window,document)' style='"+_575+"'>",html,"</body>\n</html>"].join("");
},_applyEditingAreaStyleSheets:function(){
var _578=[];
if(this.styleSheets){
_578=this.styleSheets.split(";");
this.styleSheets="";
}
_578=_578.concat(this.editingAreaStyleSheets);
this.editingAreaStyleSheets=[];
var text="",i=0,url;
while((url=_578[i++])){
var _579=(new dojo._Url(dojo.global.location,url)).toString();
this.editingAreaStyleSheets.push(_579);
text+="<link rel=\"stylesheet\" type=\"text/css\" href=\""+_579+"\"/>";
}
return text;
},addStyleSheet:function(uri){
var url=uri.toString();
if(url.charAt(0)=="."||(url.charAt(0)!="/"&&!uri.host)){
url=(new dojo._Url(dojo.global.location,url)).toString();
}
if(dojo.indexOf(this.editingAreaStyleSheets,url)>-1){
return;
}
this.editingAreaStyleSheets.push(url);
this.onLoadDeferred.addCallback(dojo.hitch(this,function(){
if(this.document.createStyleSheet){
this.document.createStyleSheet(url);
}else{
var head=this.document.getElementsByTagName("head")[0];
var _57a=this.document.createElement("link");
_57a.rel="stylesheet";
_57a.type="text/css";
_57a.href=url;
head.appendChild(_57a);
}
}));
},removeStyleSheet:function(uri){
var url=uri.toString();
if(url.charAt(0)=="."||(url.charAt(0)!="/"&&!uri.host)){
url=(new dojo._Url(dojo.global.location,url)).toString();
}
var _57b=dojo.indexOf(this.editingAreaStyleSheets,url);
if(_57b==-1){
return;
}
delete this.editingAreaStyleSheets[_57b];
dojo.withGlobal(this.window,"query",dojo,["link:[href=\""+url+"\"]"]).orphan();
},disabled:false,_mozSettingProps:{"styleWithCSS":false},_setDisabledAttr:function(_57c){
_57c=!!_57c;
this._set("disabled",_57c);
if(!this.isLoaded){
return;
}
if(dojo.isIE||dojo.isWebKit||dojo.isOpera){
var _57d=dojo.isIE&&(this.isLoaded||!this.focusOnLoad);
if(_57d){
this.editNode.unselectable="on";
}
this.editNode.contentEditable=!_57c;
if(_57d){
var _57e=this;
setTimeout(function(){
_57e.editNode.unselectable="off";
},0);
}
}else{
try{
this.document.designMode=(_57c?"off":"on");
}
catch(e){
return;
}
if(!_57c&&this._mozSettingProps){
var ps=this._mozSettingProps;
for(var n in ps){
if(ps.hasOwnProperty(n)){
try{
this.document.execCommand(n,false,ps[n]);
}
catch(e2){
}
}
}
}
}
this._disabledOK=true;
},onLoad:function(html){
if(!this.window.__registeredWindow){
this.window.__registeredWindow=true;
this._iframeRegHandle=dijit.registerIframe(this.iframe);
}
if(!dojo.isIE&&!dojo.isWebKit&&(this.height||dojo.isMoz)){
this.editNode=this.document.body;
}else{
this.editNode=this.document.body.firstChild;
var _57f=this;
if(dojo.isIE){
this.tabStop=dojo.create("div",{tabIndex:-1},this.editingArea);
this.iframe.onfocus=function(){
_57f.editNode.setActive();
};
}
}
this.focusNode=this.editNode;
var _580=this.events.concat(this.captureEvents);
var ap=this.iframe?this.document:this.editNode;
dojo.forEach(_580,function(item){
this.connect(ap,item.toLowerCase(),item);
},this);
this.connect(ap,"onmouseup","onClick");
if(dojo.isIE){
this.connect(this.document,"onmousedown","_onIEMouseDown");
this.editNode.style.zoom=1;
}else{
this.connect(this.document,"onmousedown",function(){
delete this._cursorToStart;
});
}
if(dojo.isWebKit){
this._webkitListener=this.connect(this.document,"onmouseup","onDisplayChanged");
this.connect(this.document,"onmousedown",function(e){
var t=e.target;
if(t&&(t===this.document.body||t===this.document)){
setTimeout(dojo.hitch(this,"placeCursorAtEnd"),0);
}
});
}
if(dojo.isIE){
try{
this.document.execCommand("RespectVisibilityInDesign",true,null);
}
catch(e){
}
}
this.isLoaded=true;
this.set("disabled",this.disabled);
var _581=dojo.hitch(this,function(){
this.setValue(html);
if(this.onLoadDeferred){
this.onLoadDeferred.callback(true);
}
this.onDisplayChanged();
if(this.focusOnLoad){
dojo.addOnLoad(dojo.hitch(this,function(){
setTimeout(dojo.hitch(this,"focus"),this.updateInterval);
}));
}
this.value=this.getValue(true);
});
if(this.setValueDeferred){
this.setValueDeferred.addCallback(_581);
}else{
_581();
}
},onKeyDown:function(e){
if(e.keyCode===dojo.keys.TAB&&this.isTabIndent){
dojo.stopEvent(e);
if(this.queryCommandEnabled((e.shiftKey?"outdent":"indent"))){
this.execCommand((e.shiftKey?"outdent":"indent"));
}
}
if(dojo.isIE){
if(e.keyCode==dojo.keys.TAB&&!this.isTabIndent){
if(e.shiftKey&&!e.ctrlKey&&!e.altKey){
this.iframe.focus();
}else{
if(!e.shiftKey&&!e.ctrlKey&&!e.altKey){
this.tabStop.focus();
}
}
}else{
if(e.keyCode===dojo.keys.BACKSPACE&&this.document.selection.type==="Control"){
dojo.stopEvent(e);
this.execCommand("delete");
}else{
if((65<=e.keyCode&&e.keyCode<=90)||(e.keyCode>=37&&e.keyCode<=40)){
e.charCode=e.keyCode;
this.onKeyPress(e);
}
}
}
}
return true;
},onKeyUp:function(e){
return;
},setDisabled:function(_582){
dojo.deprecated("dijit.Editor::setDisabled is deprecated","use dijit.Editor::attr(\"disabled\",boolean) instead",2);
this.set("disabled",_582);
},_setValueAttr:function(_583){
this.setValue(_583);
},_setDisableSpellCheckAttr:function(_584){
if(this.document){
dojo.attr(this.document.body,"spellcheck",!_584);
}else{
this.onLoadDeferred.addCallback(dojo.hitch(this,function(){
dojo.attr(this.document.body,"spellcheck",!_584);
}));
}
this._set("disableSpellCheck",_584);
},onKeyPress:function(e){
var c=(e.keyChar&&e.keyChar.toLowerCase())||e.keyCode,_585=this._keyHandlers[c],args=arguments;
if(_585&&!e.altKey){
dojo.some(_585,function(h){
if(!(h.shift^e.shiftKey)&&!(h.ctrl^(e.ctrlKey||e.metaKey))){
if(!h.handler.apply(this,args)){
e.preventDefault();
}
return true;
}
},this);
}
if(!this._onKeyHitch){
this._onKeyHitch=dojo.hitch(this,"onKeyPressed");
}
setTimeout(this._onKeyHitch,1);
return true;
},addKeyHandler:function(key,ctrl,_586,_587){
if(!dojo.isArray(this._keyHandlers[key])){
this._keyHandlers[key]=[];
}
this._keyHandlers[key].push({shift:_586||false,ctrl:ctrl||false,handler:_587});
},onKeyPressed:function(){
this.onDisplayChanged();
},onClick:function(e){
this.onDisplayChanged(e);
},_onIEMouseDown:function(e){
if(!this._focused&&!this.disabled){
this.focus();
}
},_onBlur:function(e){
this.inherited(arguments);
var _588=this.getValue(true);
if(_588!=this.value){
this.onChange(_588);
}
this._set("value",_588);
},_onFocus:function(e){
if(!this.disabled){
if(!this._disabledOK){
this.set("disabled",false);
}
this.inherited(arguments);
}
},blur:function(){
if(!dojo.isIE&&this.window.document.documentElement&&this.window.document.documentElement.focus){
this.window.document.documentElement.focus();
}else{
if(dojo.doc.body.focus){
dojo.doc.body.focus();
}
}
},focus:function(){
if(!this.isLoaded){
this.focusOnLoad=true;
return;
}
if(this._cursorToStart){
delete this._cursorToStart;
if(this.editNode.childNodes){
this.placeCursorAtStart();
return;
}
}
if(!dojo.isIE){
dijit.focus(this.iframe);
}else{
if(this.editNode&&this.editNode.focus){
this.iframe.fireEvent("onfocus",document.createEventObject());
}
}
},updateInterval:200,_updateTimer:null,onDisplayChanged:function(e){
if(this._updateTimer){
clearTimeout(this._updateTimer);
}
if(!this._updateHandler){
this._updateHandler=dojo.hitch(this,"onNormalizedDisplayChanged");
}
this._updateTimer=setTimeout(this._updateHandler,this.updateInterval);
},onNormalizedDisplayChanged:function(){
delete this._updateTimer;
},onChange:function(_589){
},_normalizeCommand:function(cmd,_58a){
var _58b=cmd.toLowerCase();
if(_58b=="formatblock"){
if(dojo.isSafari&&_58a===undefined){
_58b="heading";
}
}else{
if(_58b=="hilitecolor"&&!dojo.isMoz){
_58b="backcolor";
}
}
return _58b;
},_qcaCache:{},queryCommandAvailable:function(_58c){
var ca=this._qcaCache[_58c];
if(ca!==undefined){
return ca;
}
return (this._qcaCache[_58c]=this._queryCommandAvailable(_58c));
},_queryCommandAvailable:function(_58d){
var ie=1;
var _58e=1<<1;
var _58f=1<<2;
var _590=1<<3;
function _591(_592){
return {ie:Boolean(_592&ie),mozilla:Boolean(_592&_58e),webkit:Boolean(_592&_58f),opera:Boolean(_592&_590)};
};
var _593=null;
switch(_58d.toLowerCase()){
case "bold":
case "italic":
case "underline":
case "subscript":
case "superscript":
case "fontname":
case "fontsize":
case "forecolor":
case "hilitecolor":
case "justifycenter":
case "justifyfull":
case "justifyleft":
case "justifyright":
case "delete":
case "selectall":
case "toggledir":
_593=_591(_58e|ie|_58f|_590);
break;
case "createlink":
case "unlink":
case "removeformat":
case "inserthorizontalrule":
case "insertimage":
case "insertorderedlist":
case "insertunorderedlist":
case "indent":
case "outdent":
case "formatblock":
case "inserthtml":
case "undo":
case "redo":
case "strikethrough":
case "tabindent":
_593=_591(_58e|ie|_590|_58f);
break;
case "blockdirltr":
case "blockdirrtl":
case "dirltr":
case "dirrtl":
case "inlinedirltr":
case "inlinedirrtl":
_593=_591(ie);
break;
case "cut":
case "copy":
case "paste":
_593=_591(ie|_58e|_58f);
break;
case "inserttable":
_593=_591(_58e|ie);
break;
case "insertcell":
case "insertcol":
case "insertrow":
case "deletecells":
case "deletecols":
case "deleterows":
case "mergecells":
case "splitcell":
_593=_591(ie|_58e);
break;
default:
return false;
}
return (dojo.isIE&&_593.ie)||(dojo.isMoz&&_593.mozilla)||(dojo.isWebKit&&_593.webkit)||(dojo.isOpera&&_593.opera);
},execCommand:function(_594,_595){
var _596;
this.focus();
_594=this._normalizeCommand(_594,_595);
if(_595!==undefined){
if(_594=="heading"){
throw new Error("unimplemented");
}else{
if((_594=="formatblock")&&dojo.isIE){
_595="<"+_595+">";
}
}
}
var _597="_"+_594+"Impl";
if(this[_597]){
_596=this[_597](_595);
}else{
_595=arguments.length>1?_595:null;
if(_595||_594!="createlink"){
_596=this.document.execCommand(_594,false,_595);
}
}
this.onDisplayChanged();
return _596;
},queryCommandEnabled:function(_598){
if(this.disabled||!this._disabledOK){
return false;
}
_598=this._normalizeCommand(_598);
if(dojo.isMoz||dojo.isWebKit){
if(_598=="unlink"){
return this._sCall("hasAncestorElement",["a"]);
}else{
if(_598=="inserttable"){
return true;
}
}
}
if(dojo.isWebKit){
if(_598=="cut"||_598=="copy"){
var sel=this.window.getSelection();
if(sel){
sel=sel.toString();
}
return !!sel;
}else{
if(_598=="paste"){
return true;
}
}
}
var elem=dojo.isIE?this.document.selection.createRange():this.document;
try{
return elem.queryCommandEnabled(_598);
}
catch(e){
return false;
}
},queryCommandState:function(_599){
if(this.disabled||!this._disabledOK){
return false;
}
_599=this._normalizeCommand(_599);
try{
return this.document.queryCommandState(_599);
}
catch(e){
return false;
}
},queryCommandValue:function(_59a){
if(this.disabled||!this._disabledOK){
return false;
}
var r;
_59a=this._normalizeCommand(_59a);
if(dojo.isIE&&_59a=="formatblock"){
r=this._native2LocalFormatNames[this.document.queryCommandValue(_59a)];
}else{
if(dojo.isMoz&&_59a==="hilitecolor"){
var _59b;
try{
_59b=this.document.queryCommandValue("styleWithCSS");
}
catch(e){
_59b=false;
}
this.document.execCommand("styleWithCSS",false,true);
r=this.document.queryCommandValue(_59a);
this.document.execCommand("styleWithCSS",false,_59b);
}else{
r=this.document.queryCommandValue(_59a);
}
}
return r;
},_sCall:function(name,args){
return dojo.withGlobal(this.window,name,dijit._editor.selection,args);
},placeCursorAtStart:function(){
this.focus();
var _59c=false;
if(dojo.isMoz){
var _59d=this.editNode.firstChild;
while(_59d){
if(_59d.nodeType==3){
if(_59d.nodeValue.replace(/^\s+|\s+$/g,"").length>0){
_59c=true;
this._sCall("selectElement",[_59d]);
break;
}
}else{
if(_59d.nodeType==1){
_59c=true;
var tg=_59d.tagName?_59d.tagName.toLowerCase():"";
if(/br|input|img|base|meta|area|basefont|hr|link/.test(tg)){
this._sCall("selectElement",[_59d]);
}else{
this._sCall("selectElementChildren",[_59d]);
}
break;
}
}
_59d=_59d.nextSibling;
}
}else{
_59c=true;
this._sCall("selectElementChildren",[this.editNode]);
}
if(_59c){
this._sCall("collapse",[true]);
}
},placeCursorAtEnd:function(){
this.focus();
var _59e=false;
if(dojo.isMoz){
var last=this.editNode.lastChild;
while(last){
if(last.nodeType==3){
if(last.nodeValue.replace(/^\s+|\s+$/g,"").length>0){
_59e=true;
this._sCall("selectElement",[last]);
break;
}
}else{
if(last.nodeType==1){
_59e=true;
if(last.lastChild){
this._sCall("selectElement",[last.lastChild]);
}else{
this._sCall("selectElement",[last]);
}
break;
}
}
last=last.previousSibling;
}
}else{
_59e=true;
this._sCall("selectElementChildren",[this.editNode]);
}
if(_59e){
this._sCall("collapse",[false]);
}
},getValue:function(_59f){
if(this.textarea){
if(this.isClosed||!this.isLoaded){
return this.textarea.value;
}
}
return this._postFilterContent(null,_59f);
},_getValueAttr:function(){
return this.getValue(true);
},setValue:function(html){
if(!this.isLoaded){
this.onLoadDeferred.addCallback(dojo.hitch(this,function(){
this.setValue(html);
}));
return;
}
this._cursorToStart=true;
if(this.textarea&&(this.isClosed||!this.isLoaded)){
this.textarea.value=html;
}else{
html=this._preFilterContent(html);
var node=this.isClosed?this.domNode:this.editNode;
if(html&&dojo.isMoz&&html.toLowerCase()=="<p></p>"){
html="<p>&nbsp;</p>";
}
if(!html&&dojo.isWebKit){
html="&nbsp;";
}
node.innerHTML=html;
this._preDomFilterContent(node);
}
this.onDisplayChanged();
this._set("value",this.getValue(true));
},replaceValue:function(html){
if(this.isClosed){
this.setValue(html);
}else{
if(this.window&&this.window.getSelection&&!dojo.isMoz){
this.setValue(html);
}else{
if(this.window&&this.window.getSelection){
html=this._preFilterContent(html);
this.execCommand("selectall");
if(!html){
this._cursorToStart=true;
html="&nbsp;";
}
this.execCommand("inserthtml",html);
this._preDomFilterContent(this.editNode);
}else{
if(this.document&&this.document.selection){
this.setValue(html);
}
}
}
}
this._set("value",this.getValue(true));
},_preFilterContent:function(html){
var ec=html;
dojo.forEach(this.contentPreFilters,function(ef){
if(ef){
ec=ef(ec);
}
});
return ec;
},_preDomFilterContent:function(dom){
dom=dom||this.editNode;
dojo.forEach(this.contentDomPreFilters,function(ef){
if(ef&&dojo.isFunction(ef)){
ef(dom);
}
},this);
},_postFilterContent:function(dom,_5a0){
var ec;
if(!dojo.isString(dom)){
dom=dom||this.editNode;
if(this.contentDomPostFilters.length){
if(_5a0){
dom=dojo.clone(dom);
}
dojo.forEach(this.contentDomPostFilters,function(ef){
dom=ef(dom);
});
}
ec=dijit._editor.getChildrenHtml(dom);
}else{
ec=dom;
}
if(!dojo.trim(ec.replace(/^\xA0\xA0*/,"").replace(/\xA0\xA0*$/,"")).length){
ec="";
}
dojo.forEach(this.contentPostFilters,function(ef){
ec=ef(ec);
});
return ec;
},_saveContent:function(e){
var _5a1=dojo.byId(dijit._scopeName+"._editor.RichText.value");
if(_5a1.value){
_5a1.value+=this._SEPARATOR;
}
_5a1.value+=this.name+this._NAME_CONTENT_SEP+this.getValue(true);
},escapeXml:function(str,_5a2){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_5a2){
str=str.replace(/'/gm,"&#39;");
}
return str;
},getNodeHtml:function(node){
dojo.deprecated("dijit.Editor::getNodeHtml is deprecated","use dijit._editor.getNodeHtml instead",2);
return dijit._editor.getNodeHtml(node);
},getNodeChildrenHtml:function(dom){
dojo.deprecated("dijit.Editor::getNodeChildrenHtml is deprecated","use dijit._editor.getChildrenHtml instead",2);
return dijit._editor.getChildrenHtml(dom);
},close:function(save){
if(this.isClosed){
return;
}
if(!arguments.length){
save=true;
}
if(save){
this._set("value",this.getValue(true));
}
if(this.interval){
clearInterval(this.interval);
}
if(this._webkitListener){
this.disconnect(this._webkitListener);
delete this._webkitListener;
}
if(dojo.isIE){
this.iframe.onfocus=null;
}
this.iframe._loadFunc=null;
if(this._iframeRegHandle){
dijit.unregisterIframe(this._iframeRegHandle);
delete this._iframeRegHandle;
}
if(this.textarea){
var s=this.textarea.style;
s.position="";
s.left=s.top="";
if(dojo.isIE){
s.overflow=this.__overflow;
this.__overflow=null;
}
this.textarea.value=this.value;
dojo.destroy(this.domNode);
this.domNode=this.textarea;
}else{
this.domNode.innerHTML=this.value;
}
delete this.iframe;
dojo.removeClass(this.domNode,this.baseClass);
this.isClosed=true;
this.isLoaded=false;
delete this.editNode;
delete this.focusNode;
if(this.window&&this.window._frameElement){
this.window._frameElement=null;
}
this.window=null;
this.document=null;
this.editingArea=null;
this.editorObject=null;
},destroy:function(){
if(!this.isClosed){
this.close(false);
}
this.inherited(arguments);
if(dijit._editor._globalSaveHandler){
delete dijit._editor._globalSaveHandler[this.id];
}
},_removeMozBogus:function(html){
return html.replace(/\stype="_moz"/gi,"").replace(/\s_moz_dirty=""/gi,"").replace(/_moz_resizing="(true|false)"/gi,"");
},_removeWebkitBogus:function(html){
html=html.replace(/\sclass="webkit-block-placeholder"/gi,"");
html=html.replace(/\sclass="apple-style-span"/gi,"");
html=html.replace(/<meta charset=\"utf-8\" \/>/gi,"");
return html;
},_normalizeFontStyle:function(html){
return html.replace(/<(\/)?strong([ \>])/gi,"<$1b$2").replace(/<(\/)?em([ \>])/gi,"<$1i$2");
},_preFixUrlAttributes:function(html){
return html.replace(/(?:(<a(?=\s).*?\shref=)("|')(.*?)\2)|(?:(<a\s.*?href=)([^"'][^ >]+))/gi,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2").replace(/(?:(<img(?=\s).*?\ssrc=)("|')(.*?)\2)|(?:(<img\s.*?src=)([^"'][^ >]+))/gi,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
},_inserthorizontalruleImpl:function(_5a3){
if(dojo.isIE){
return this._inserthtmlImpl("<hr>");
}
return this.document.execCommand("inserthorizontalrule",false,_5a3);
},_unlinkImpl:function(_5a4){
if((this.queryCommandEnabled("unlink"))&&(dojo.isMoz||dojo.isWebKit)){
var a=this._sCall("getAncestorElement",["a"]);
this._sCall("selectElement",[a]);
return this.document.execCommand("unlink",false,null);
}
return this.document.execCommand("unlink",false,_5a4);
},_hilitecolorImpl:function(_5a5){
var _5a6;
if(dojo.isMoz){
this.document.execCommand("styleWithCSS",false,true);
_5a6=this.document.execCommand("hilitecolor",false,_5a5);
this.document.execCommand("styleWithCSS",false,false);
}else{
_5a6=this.document.execCommand("hilitecolor",false,_5a5);
}
return _5a6;
},_backcolorImpl:function(_5a7){
if(dojo.isIE){
_5a7=_5a7?_5a7:null;
}
return this.document.execCommand("backcolor",false,_5a7);
},_forecolorImpl:function(_5a8){
if(dojo.isIE){
_5a8=_5a8?_5a8:null;
}
return this.document.execCommand("forecolor",false,_5a8);
},_inserthtmlImpl:function(_5a9){
_5a9=this._preFilterContent(_5a9);
var rv=true;
if(dojo.isIE){
var _5aa=this.document.selection.createRange();
if(this.document.selection.type.toUpperCase()=="CONTROL"){
var n=_5aa.item(0);
while(_5aa.length){
_5aa.remove(_5aa.item(0));
}
n.outerHTML=_5a9;
}else{
_5aa.pasteHTML(_5a9);
}
_5aa.select();
}else{
if(dojo.isMoz&&!_5a9.length){
this._sCall("remove");
}else{
rv=this.document.execCommand("inserthtml",false,_5a9);
}
}
return rv;
},_boldImpl:function(_5ab){
if(dojo.isIE){
this._adaptIESelection();
}
return this.document.execCommand("bold",false,_5ab);
},_italicImpl:function(_5ac){
if(dojo.isIE){
this._adaptIESelection();
}
return this.document.execCommand("italic",false,_5ac);
},_underlineImpl:function(_5ad){
if(dojo.isIE){
this._adaptIESelection();
}
return this.document.execCommand("underline",false,_5ad);
},_strikethroughImpl:function(_5ae){
if(dojo.isIE){
this._adaptIESelection();
}
return this.document.execCommand("strikethrough",false,_5ae);
},getHeaderHeight:function(){
return this._getNodeChildrenHeight(this.header);
},getFooterHeight:function(){
return this._getNodeChildrenHeight(this.footer);
},_getNodeChildrenHeight:function(node){
var h=0;
if(node&&node.childNodes){
var i;
for(i=0;i<node.childNodes.length;i++){
var size=dojo.position(node.childNodes[i]);
h+=size.h;
}
}
return h;
},_isNodeEmpty:function(node,_5af){
if(node.nodeType==1){
if(node.childNodes.length>0){
return this._isNodeEmpty(node.childNodes[0],_5af);
}
return true;
}else{
if(node.nodeType==3){
return (node.nodeValue.substring(_5af)=="");
}
}
return false;
},_removeStartingRangeFromRange:function(node,_5b0){
if(node.nextSibling){
_5b0.setStart(node.nextSibling,0);
}else{
var _5b1=node.parentNode;
while(_5b1&&_5b1.nextSibling==null){
_5b1=_5b1.parentNode;
}
if(_5b1){
_5b0.setStart(_5b1.nextSibling,0);
}
}
return _5b0;
},_adaptIESelection:function(){
var _5b2=dijit.range.getSelection(this.window);
if(_5b2&&_5b2.rangeCount){
var _5b3=_5b2.getRangeAt(0);
var _5b4=_5b3.startContainer;
var _5b5=_5b3.startOffset;
while(_5b4.nodeType==3&&_5b5>=_5b4.length&&_5b4.nextSibling){
_5b5=_5b5-_5b4.length;
_5b4=_5b4.nextSibling;
}
var _5b6=null;
while(this._isNodeEmpty(_5b4,_5b5)&&_5b4!=_5b6){
_5b6=_5b4;
_5b3=this._removeStartingRangeFromRange(_5b4,_5b3);
_5b4=_5b3.startContainer;
_5b5=0;
}
_5b2.removeAllRanges();
_5b2.addRange(_5b3);
}
}});
dojo.provide("dijit._KeyNavContainer");
dojo.declare("dijit._KeyNavContainer",dijit._Container,{tabIndex:"0",_keyNavCodes:{},connectKeyNavHandlers:function(_5b7,_5b8){
var _5b9=(this._keyNavCodes={});
var prev=dojo.hitch(this,this.focusPrev);
var next=dojo.hitch(this,this.focusNext);
dojo.forEach(_5b7,function(code){
_5b9[code]=prev;
});
dojo.forEach(_5b8,function(code){
_5b9[code]=next;
});
_5b9[dojo.keys.HOME]=dojo.hitch(this,"focusFirstChild");
_5b9[dojo.keys.END]=dojo.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
dojo.forEach(this.getChildren(),dojo.hitch(this,"_startupChild"));
},addChild:function(_5ba,_5bb){
dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._startupChild(_5ba);
},focus:function(){
this.focusFirstChild();
},focusFirstChild:function(){
var _5bc=this._getFirstFocusableChild();
if(_5bc){
this.focusChild(_5bc);
}
},focusLastChild:function(){
var _5bd=this._getLastFocusableChild();
if(_5bd){
this.focusChild(_5bd);
}
},focusNext:function(){
var _5be=this._getNextFocusableChild(this.focusedChild,1);
this.focusChild(_5be);
},focusPrev:function(){
var _5bf=this._getNextFocusableChild(this.focusedChild,-1);
this.focusChild(_5bf,true);
},focusChild:function(_5c0,last){
if(this.focusedChild&&_5c0!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_5c0.focus(last?"end":"start");
this._set("focusedChild",_5c0);
},_startupChild:function(_5c1){
_5c1.set("tabIndex","-1");
this.connect(_5c1,"_onFocus",function(){
_5c1.set("tabIndex",this.tabIndex);
});
this.connect(_5c1,"_onBlur",function(){
_5c1.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode){
return;
}
this.focusFirstChild();
dojo.attr(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
dojo.attr(this.domNode,"tabIndex",this.tabIndex);
}
this.inherited(arguments);
},_onContainerKeypress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
var func=this._keyNavCodes[evt.charOrCode];
if(func){
func();
dojo.stopEvent(evt);
}
},_onChildBlur:function(_5c2){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},_getNextFocusableChild:function(_5c3,dir){
if(_5c3){
_5c3=this._getSiblingOfChild(_5c3,dir);
}
var _5c4=this.getChildren();
for(var i=0;i<_5c4.length;i++){
if(!_5c3){
_5c3=_5c4[(dir>0)?0:(_5c4.length-1)];
}
if(_5c3.isFocusable()){
return _5c3;
}
_5c3=this._getSiblingOfChild(_5c3,dir);
}
return null;
}});
dojo.provide("dijit.ToolbarSeparator");
dojo.declare("dijit.ToolbarSeparator",[dijit._Widget,dijit._Templated],{templateString:"<div class=\"dijitToolbarSeparator dijitInline\" role=\"presentation\"></div>",buildRendering:function(){
this.inherited(arguments);
dojo.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
dojo.provide("dijit.Toolbar");
dojo.declare("dijit.Toolbar",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{templateString:"<div class=\"dijit\" role=\"toolbar\" tabIndex=\"${tabIndex}\" dojoAttachPoint=\"containerNode\">"+"</div>",baseClass:"dijitToolbar",postCreate:function(){
this.inherited(arguments);
this.connectKeyNavHandlers(this.isLeftToRight()?[dojo.keys.LEFT_ARROW]:[dojo.keys.RIGHT_ARROW],this.isLeftToRight()?[dojo.keys.RIGHT_ARROW]:[dojo.keys.LEFT_ARROW]);
},startup:function(){
if(this._started){
return;
}
this.startupKeyNavChildren();
this.inherited(arguments);
}});
dojo.provide("dijit.form._FormWidget");
dojo.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated,dijit._CssStateMixin],{name:"",alt:"",value:"",type:"text",tabIndex:"0",disabled:false,intermediateChanges:false,scrollOnFocus:true,attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{value:"focusNode",id:"focusNode",tabIndex:"focusNode",alt:"focusNode",title:"focusNode"}),postMixInProperties:function(){
this.nameAttrSetting=this.name?("name=\""+this.name.replace(/'/g,"&quot;")+"\""):"";
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmousedown","_onMouseDown");
},_setDisabledAttr:function(_5c5){
this._set("disabled",_5c5);
dojo.attr(this.focusNode,"disabled",_5c5);
if(this.valueNode){
dojo.attr(this.valueNode,"disabled",_5c5);
}
dijit.setWaiState(this.focusNode,"disabled",_5c5);
if(_5c5){
this._set("hovering",false);
this._set("active",false);
var _5c6="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:"focusNode";
dojo.forEach(dojo.isArray(_5c6)?_5c6:[_5c6],function(_5c7){
var node=this[_5c7];
if(dojo.isWebKit||dijit.hasDefaultTabStop(node)){
node.setAttribute("tabIndex","-1");
}else{
node.removeAttribute("tabIndex");
}
},this);
}else{
if(this.tabIndex!=""){
this.focusNode.setAttribute("tabIndex",this.tabIndex);
}
}
},setDisabled:function(_5c8){
dojo.deprecated("setDisabled("+_5c8+") is deprecated. Use set('disabled',"+_5c8+") instead.","","2.0");
this.set("disabled",_5c8);
},_onFocus:function(e){
if(this.scrollOnFocus){
dojo.window.scrollIntoView(this.domNode);
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(dojo.style(this.domNode,"display")!="none");
},focus:function(){
if(!this.disabled){
dijit.focus(this.focusNode);
}
},compare:function(val1,val2){
if(typeof val1=="number"&&typeof val2=="number"){
return (isNaN(val1)&&isNaN(val2))?0:val1-val2;
}else{
if(val1>val2){
return 1;
}else{
if(val1<val2){
return -1;
}else{
return 0;
}
}
}
},onChange:function(_5c9){
},_onChangeActive:false,_handleOnChange:function(_5ca,_5cb){
if(this._lastValueReported==undefined&&(_5cb===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_5ca;
}
this._pendingOnChange=this._pendingOnChange||(typeof _5ca!=typeof this._lastValueReported)||(this.compare(_5ca,this._lastValueReported)!=0);
if((this.intermediateChanges||_5cb||_5cb===undefined)&&this._pendingOnChange){
this._lastValueReported=_5ca;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
clearTimeout(this._onChangeHandle);
}
this._onChangeHandle=setTimeout(dojo.hitch(this,function(){
this._onChangeHandle=null;
this.onChange(_5ca);
}),0);
}
}
},create:function(){
this.inherited(arguments);
this._onChangeActive=true;
},destroy:function(){
if(this._onChangeHandle){
clearTimeout(this._onChangeHandle);
this.onChange(this._lastValueReported);
}
this.inherited(arguments);
},setValue:function(_5cc){
dojo.deprecated("dijit.form._FormWidget:setValue("+_5cc+") is deprecated.  Use set('value',"+_5cc+") instead.","","2.0");
this.set("value",_5cc);
},getValue:function(){
dojo.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_onMouseDown:function(e){
if(!e.ctrlKey&&dojo.mouseButtons.isLeft(e)&&this.isFocusable()){
var _5cd=this.connect(dojo.body(),"onmouseup",function(){
if(this.isFocusable()){
this.focus();
}
this.disconnect(_5cd);
});
}
}});
dojo.declare("dijit.form._FormValueWidget",dijit.form._FormWidget,{readOnly:false,attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{value:"",readOnly:"focusNode"}),_setReadOnlyAttr:function(_5ce){
dojo.attr(this.focusNode,"readOnly",_5ce);
dijit.setWaiState(this.focusNode,"readonly",_5ce);
this._set("readOnly",_5ce);
},postCreate:function(){
this.inherited(arguments);
if(dojo.isIE){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._lastValueReported=this._resetValue=this.value;
}
},_setValueAttr:function(_5cf,_5d0){
this._handleOnChange(_5cf,_5d0);
},_handleOnChange:function(_5d1,_5d2){
this._set("value",_5d1);
this.inherited(arguments);
},undo:function(){
this._setValueAttr(this._lastValueReported,false);
},reset:function(){
this._hasBeenBlurred=false;
this._setValueAttr(this._resetValue,true);
},_onKeyDown:function(e){
if(e.keyCode==dojo.keys.ESCAPE&&!(e.ctrlKey||e.altKey||e.metaKey)){
var te;
if(dojo.isIE){
e.preventDefault();
te=document.createEventObject();
te.keyCode=dojo.keys.ESCAPE;
te.shiftKey=e.shiftKey;
e.srcElement.fireEvent("onkeypress",te);
}
}
},_layoutHackIE7:function(){
if(dojo.isIE==7){
var _5d3=this.domNode;
var _5d4=_5d3.parentNode;
var _5d5=_5d3.firstChild||_5d3;
var _5d6=_5d5.style.filter;
var _5d7=this;
while(_5d4&&_5d4.clientHeight==0){
(function ping(){
var _5d8=_5d7.connect(_5d4,"onscroll",function(e){
_5d7.disconnect(_5d8);
_5d5.style.filter=(new Date()).getMilliseconds();
setTimeout(function(){
_5d5.style.filter=_5d6;
},0);
});
})();
_5d4=_5d4.parentNode;
}
}
}});
dojo.provide("dijit._HasDropDown");
dojo.declare("dijit._HasDropDown",null,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
if(this.disabled||this.readOnly){
return;
}
this._docHandler=this.connect(dojo.doc,"onmouseup","_onDropDownMouseUp");
this.toggleDropDown();
},_onDropDownMouseUp:function(e){
if(e&&this._docHandler){
this.disconnect(this._docHandler);
}
var _5d9=this.dropDown,_5da=false;
if(e&&this._opened){
var c=dojo.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_5da){
if(dojo.hasClass(t,"dijitPopup")){
_5da=true;
}else{
t=t.parentNode;
}
}
if(_5da){
t=e.target;
if(_5d9.onItemClick){
var _5db;
while(t&&!(_5db=dijit.byNode(t))){
t=t.parentNode;
}
if(_5db&&_5db.onClick&&_5db.getParent){
_5db.getParent().onItemClick(_5db,e);
}
}
return;
}
}
}
if(this._opened&&_5d9.focus&&_5d9.autoFocus!==false){
window.setTimeout(dojo.hitch(_5d9,"focus"),1);
}
},_onDropDownClick:function(e){
if(this._stopClickEvents){
dojo.stopEvent(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _5dc={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
dojo.addClass(this._arrowWrapperNode||this._buttonNode,"dijit"+_5dc+"ArrowButton");
},postCreate:function(){
this.inherited(arguments);
this.connect(this._buttonNode,"onmousedown","_onDropDownMouseDown");
this.connect(this._buttonNode,"onclick","_onDropDownClick");
this.connect(this.focusNode,"onkeypress","_onKey");
},destroy:function(){
if(this.dropDown){
if(!this.dropDown._destroyed){
this.dropDown.destroyRecursive();
}
delete this.dropDown;
}
this.inherited(arguments);
},_onKey:function(e){
if(this.disabled||this.readOnly){
return;
}
var d=this.dropDown,_5dd=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
dojo.stopEvent(e);
return;
}
}
if(d&&this._opened&&e.charOrCode==dojo.keys.ESCAPE){
this.closeDropDown();
dojo.stopEvent(e);
}else{
if(!this._opened&&(e.charOrCode==dojo.keys.DOWN_ARROW||((e.charOrCode==dojo.keys.ENTER||e.charOrCode==" ")&&((_5dd.tagName||"").toLowerCase()!=="input"||(_5dd.type&&_5dd.type.toLowerCase()!=="text"))))){
this.toggleDropDown();
d=this.dropDown;
if(d&&d.focus){
setTimeout(dojo.hitch(d,"focus"),1);
}
dojo.stopEvent(e);
}
}
},_onBlur:function(){
var _5de=dijit._curFocus&&this.dropDown&&dojo.isDescendant(dijit._curFocus,this.dropDown.domNode);
this.closeDropDown(_5de);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_5df){
_5df();
},toggleDropDown:function(){
if(this.disabled||this.readOnly){
return;
}
if(!this._opened){
if(!this.isLoaded()){
this.loadDropDown(dojo.hitch(this,"openDropDown"));
return;
}else{
this.openDropDown();
}
}else{
this.closeDropDown();
}
},openDropDown:function(){
var _5e0=this.dropDown,_5e1=_5e0.domNode,_5e2=this._aroundNode||this.domNode,self=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_5e1.style.width){
this._explicitDDWidth=true;
}
if(_5e1.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _5e3={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_5e3.width="";
}
if(!this._explicitDDHeight){
_5e3.height="";
}
dojo.style(_5e1,_5e3);
var _5e4=this.maxHeight;
if(_5e4==-1){
var _5e5=dojo.window.getBox(),_5e6=dojo.position(_5e2,false);
_5e4=Math.floor(Math.max(_5e6.y,_5e5.h-(_5e6.y+_5e6.h)));
}
if(_5e0.startup&&!_5e0._started){
_5e0.startup();
}
dijit.popup.moveOffScreen(_5e0);
var mb=dojo._getMarginSize(_5e1);
var _5e7=(_5e4&&mb.h>_5e4);
dojo.style(_5e1,{overflowX:"hidden",overflowY:_5e7?"auto":"hidden"});
if(_5e7){
mb.h=_5e4;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_5e2.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_5e2.offsetWidth);
}else{
delete mb.w;
}
}
if(dojo.isFunction(_5e0.resize)){
_5e0.resize(mb);
}else{
dojo.marginBox(_5e1,mb);
}
}
var _5e8=dijit.popup.open({parent:this,popup:_5e0,around:_5e2,orient:dijit.getPopupAroundAlignment((this.dropDownPosition&&this.dropDownPosition.length)?this.dropDownPosition:["below"],this.isLeftToRight()),onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
dojo.attr(self._popupStateNode,"popupActive",false);
dojo.removeClass(self._popupStateNode,"dijitHasDropDownOpen");
self._opened=false;
}});
dojo.attr(this._popupStateNode,"popupActive","true");
dojo.addClass(self._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _5e8;
},closeDropDown:function(_5e9){
if(this._opened){
if(_5e9){
this.focus();
}
dijit.popup.close(this.dropDown);
this._opened=false;
}
}});
dojo.provide("dijit.form.Button");
dojo.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:dojo.cache("dijit.form","templates/Button.html","<span class=\"dijit dijitReset dijitInline\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdojoAttachEvent=\"ondijitclick:_onButtonClick\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdojoAttachPoint=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" dojoAttachPoint=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdojoAttachPoint=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\tdojoAttachPoint=\"valueNode\"\n/></span>\n"),attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{value:"valueNode"}),_onClick:function(e){
if(this.disabled){
return false;
}
this._clicked();
return this.onClick(e);
},_onButtonClick:function(e){
if(this._onClick(e)===false){
e.preventDefault();
}else{
if(this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _5ea=dijit.byNode(node);
if(_5ea&&typeof _5ea._onSubmit=="function"){
_5ea._onSubmit(e);
break;
}
}
}else{
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
}
}
}
},buildRendering:function(){
this.inherited(arguments);
dojo.setSelectable(this.focusNode,false);
},_fillContent:function(_5eb){
if(_5eb&&(!this.params||!("label" in this.params))){
this.set("label",_5eb.innerHTML);
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
dojo.toggleClass(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},onClick:function(e){
return true;
},_clicked:function(e){
},setLabel:function(_5ec){
dojo.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_5ec);
},_setLabelAttr:function(_5ed){
this._set("label",_5ed);
this.containerNode.innerHTML=_5ed;
if(this.showLabel==false&&!this.params.title){
this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
},_setIconClassAttr:function(val){
var _5ee=this.iconClass||"dijitNoIcon",_5ef=val||"dijitNoIcon";
dojo.replaceClass(this.iconNode,_5ef,_5ee);
this._set("iconClass",val);
}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container,dijit._HasDropDown],{baseClass:"dijitDropDownButton",templateString:dojo.cache("dijit.form","templates/DropDownButton.html","<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdojoAttachEvent=\"ondijitclick:_onButtonClick\" dojoAttachPoint=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdojoAttachPoint=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdojoAttachPoint=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdojoAttachPoint=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\tdojoAttachPoint=\"valueNode\"\n/></span>\n"),_fillContent:function(){
if(this.srcNodeRef){
var _5f0=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,_5f0[0]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _5f1=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(_5f1);
delete this.dropDownContainer;
}
if(this.dropDown){
dijit.popup.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _5f2=this.dropDown;
return (!!_5f2&&(!_5f2.href||_5f2.isLoaded));
},loadDropDown:function(){
var _5f3=this.dropDown;
if(!_5f3){
return;
}
if(!this.isLoaded()){
var _5f4=dojo.connect(_5f3,"onLoad",this,function(){
dojo.disconnect(_5f4);
this.openDropDown();
});
_5f3.refresh();
}else{
this.openDropDown();
}
},isFocusable:function(){
return this.inherited(arguments)&&!this._mouseDown;
}});
dojo.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:dojo.cache("dijit.form","templates/ComboButton.html","<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" dojoAttachPoint=\"buttonNode\" dojoAttachEvent=\"ondijitclick:_onButtonClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdojoAttachPoint=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" dojoAttachPoint=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" dojoAttachPoint=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdojoAttachPoint=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdojoAttachEvent=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" dojoAttachPoint=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n"),attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{id:"",tabIndex:["focusNode","titleNode"],title:"titleNode"}),optionsTitle:"",baseClass:"dijitComboButton",cssStateNodes:{"buttonNode":"dijitButtonNode","titleNode":"dijitButtonContents","_popupStateNode":"dijitDownArrowButton"},_focusedNode:null,_onButtonKeyPress:function(evt){
if(evt.charOrCode==dojo.keys[this.isLeftToRight()?"RIGHT_ARROW":"LEFT_ARROW"]){
dijit.focus(this._popupStateNode);
dojo.stopEvent(evt);
}
},_onArrowKeyPress:function(evt){
if(evt.charOrCode==dojo.keys[this.isLeftToRight()?"LEFT_ARROW":"RIGHT_ARROW"]){
dijit.focus(this.titleNode);
dojo.stopEvent(evt);
}
},focus:function(_5f5){
if(!this.disabled){
dijit.focus(_5f5=="start"?this.titleNode:this._popupStateNode);
}
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{checked:"focusNode"}),_clicked:function(evt){
this.set("checked",!this.checked);
},_setCheckedAttr:function(_5f6,_5f7){
this._set("checked",_5f6);
dojo.attr(this.focusNode||this.domNode,"checked",_5f6);
dijit.setWaiState(this.focusNode||this.domNode,"pressed",_5f6);
this._handleOnChange(_5f6,_5f7);
},setChecked:function(_5f8){
dojo.deprecated("setChecked("+_5f8+") is deprecated. Use set('checked',"+_5f8+") instead.","","2.0");
this.set("checked",_5f8);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
dojo.provide("dijit._editor._Plugin");
dojo.declare("dijit._editor._Plugin",null,{constructor:function(args,node){
this.params=args||{};
dojo.mixin(this,this.params);
this._connects=[];
this._attrPairNames={};
},editor:null,iconClassPrefix:"dijitEditorIcon",button:null,command:"",useDefaultCommand:true,buttonClass:dijit.form.Button,disabled:false,getLabel:function(key){
return this.editor.commands[key];
},_initButton:function(){
if(this.command.length){
var _5f9=this.getLabel(this.command),_5fa=this.editor,_5fb=this.iconClassPrefix+" "+this.iconClassPrefix+this.command.charAt(0).toUpperCase()+this.command.substr(1);
if(!this.button){
var _5fc=dojo.mixin({label:_5f9,dir:_5fa.dir,lang:_5fa.lang,showLabel:false,iconClass:_5fb,dropDown:this.dropDown,tabIndex:"-1"},this.params||{});
this.button=new this.buttonClass(_5fc);
}
}
if(this.get("disabled")&&this.button){
this.button.set("disabled",this.get("disabled"));
}
},destroy:function(){
dojo.forEach(this._connects,dojo.disconnect);
if(this.dropDown){
this.dropDown.destroyRecursive();
}
},connect:function(o,f,tf){
this._connects.push(dojo.connect(o,f,this,tf));
},updateState:function(){
var e=this.editor,c=this.command,_5fd,_5fe;
if(!e||!e.isLoaded||!c.length){
return;
}
var _5ff=this.get("disabled");
if(this.button){
try{
_5fe=!_5ff&&e.queryCommandEnabled(c);
if(this.enabled!==_5fe){
this.enabled=_5fe;
this.button.set("disabled",!_5fe);
}
if(typeof this.button.checked=="boolean"){
_5fd=e.queryCommandState(c);
if(this.checked!==_5fd){
this.checked=_5fd;
this.button.set("checked",e.queryCommandState(c));
}
}
}
catch(e){
}
}
},setEditor:function(_600){
this.editor=_600;
this._initButton();
if(this.button&&this.useDefaultCommand){
if(this.editor.queryCommandAvailable(this.command)){
this.connect(this.button,"onClick",dojo.hitch(this.editor,"execCommand",this.command,this.commandArg));
}else{
this.button.domNode.style.display="none";
}
}
this.connect(this.editor,"onNormalizedDisplayChanged","updateState");
},setToolbar:function(_601){
if(this.button){
_601.addChild(this.button);
}
},set:function(name,_602){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _603=this._getAttrNames(name);
if(this[_603.s]){
var _604=this[_603.s].apply(this,Array.prototype.slice.call(arguments,1));
}else{
this._set(name,_602);
}
return _604||this;
},get:function(name){
var _605=this._getAttrNames(name);
return this[_605.g]?this[_605.g]():this[name];
},_setDisabledAttr:function(_606){
this.disabled=_606;
this.updateState();
},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.charAt(0).toUpperCase()+name.substr(1);
return (apn[name]={s:"_set"+uc+"Attr",g:"_get"+uc+"Attr"});
},_set:function(name,_607){
var _608=this[name];
this[name]=_607;
}});
dojo.provide("dijit._editor.plugins.EnterKeyHandling");
dojo.declare("dijit._editor.plugins.EnterKeyHandling",dijit._editor._Plugin,{blockNodeForEnter:"BR",constructor:function(args){
if(args){
if("blockNodeForEnter" in args){
args.blockNodeForEnter=args.blockNodeForEnter.toUpperCase();
}
dojo.mixin(this,args);
}
},setEditor:function(_609){
if(this.editor===_609){
return;
}
this.editor=_609;
if(this.blockNodeForEnter=="BR"){
this.editor.customUndo=true;
_609.onLoadDeferred.addCallback(dojo.hitch(this,function(d){
this.connect(_609.document,"onkeypress",function(e){
if(e.charOrCode==dojo.keys.ENTER){
var ne=dojo.mixin({},e);
ne.shiftKey=true;
if(!this.handleEnterKey(ne)){
dojo.stopEvent(e);
}
}
});
return d;
}));
}else{
if(this.blockNodeForEnter){
var h=dojo.hitch(this,this.handleEnterKey);
_609.addKeyHandler(13,0,0,h);
_609.addKeyHandler(13,0,1,h);
this.connect(this.editor,"onKeyPressed","onKeyPressed");
}
}
},onKeyPressed:function(e){
if(this._checkListLater){
if(dojo.withGlobal(this.editor.window,"isCollapsed",dijit)){
var _60a=dojo.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,["LI"]);
if(!_60a){
dijit._editor.RichText.prototype.execCommand.call(this.editor,"formatblock",this.blockNodeForEnter);
var _60b=dojo.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,[this.blockNodeForEnter]);
if(_60b){
_60b.innerHTML=this.bogusHtmlContent;
if(dojo.isIE){
var r=this.editor.document.selection.createRange();
r.move("character",-1);
r.select();
}
}else{
}
}else{
if(dojo.isMoz){
if(_60a.parentNode.parentNode.nodeName=="LI"){
_60a=_60a.parentNode.parentNode;
}
}
var fc=_60a.firstChild;
if(fc&&fc.nodeType==1&&(fc.nodeName=="UL"||fc.nodeName=="OL")){
_60a.insertBefore(fc.ownerDocument.createTextNode("?"),fc);
var _60c=dijit.range.create(this.editor.window);
_60c.setStart(_60a.firstChild,0);
var _60d=dijit.range.getSelection(this.editor.window,true);
_60d.removeAllRanges();
_60d.addRange(_60c);
}
}
}
this._checkListLater=false;
}
if(this._pressedEnterInBlock){
if(this._pressedEnterInBlock.previousSibling){
this.removeTrailingBr(this._pressedEnterInBlock.previousSibling);
}
delete this._pressedEnterInBlock;
}
},bogusHtmlContent:"&nbsp;",blockNodes:/^(?:P|H1|H2|H3|H4|H5|H6|LI)$/,handleEnterKey:function(e){
var _60e,_60f,_610,doc=this.editor.document,br,rs,txt;
if(e.shiftKey){
var _611=dojo.withGlobal(this.editor.window,"getParentElement",dijit._editor.selection);
var _612=dijit.range.getAncestor(_611,this.blockNodes);
if(_612){
if(_612.tagName=="LI"){
return true;
}
_60e=dijit.range.getSelection(this.editor.window);
_60f=_60e.getRangeAt(0);
if(!_60f.collapsed){
_60f.deleteContents();
_60e=dijit.range.getSelection(this.editor.window);
_60f=_60e.getRangeAt(0);
}
if(dijit.range.atBeginningOfContainer(_612,_60f.startContainer,_60f.startOffset)){
br=doc.createElement("br");
_610=dijit.range.create(this.editor.window);
_612.insertBefore(br,_612.firstChild);
_610.setStartBefore(br.nextSibling);
_60e.removeAllRanges();
_60e.addRange(_610);
}else{
if(dijit.range.atEndOfContainer(_612,_60f.startContainer,_60f.startOffset)){
_610=dijit.range.create(this.editor.window);
br=doc.createElement("br");
_612.appendChild(br);
_612.appendChild(doc.createTextNode("?"));
_610.setStart(_612.lastChild,0);
_60e.removeAllRanges();
_60e.addRange(_610);
}else{
rs=_60f.startContainer;
if(rs&&rs.nodeType==3){
txt=rs.nodeValue;
dojo.withGlobal(this.editor.window,function(){
var _613=doc.createTextNode(txt.substring(0,_60f.startOffset));
var _614=doc.createTextNode(txt.substring(_60f.startOffset));
var _615=doc.createElement("br");
if(_614.nodeValue==""&&dojo.isWebKit){
_614=doc.createTextNode("?");
}
dojo.place(_613,rs,"after");
dojo.place(_615,_613,"after");
dojo.place(_614,_615,"after");
dojo.destroy(rs);
_610=dijit.range.create(dojo.gobal);
_610.setStart(_614,0);
_60e.removeAllRanges();
_60e.addRange(_610);
});
return false;
}
return true;
}
}
}else{
_60e=dijit.range.getSelection(this.editor.window);
if(_60e.rangeCount){
_60f=_60e.getRangeAt(0);
if(_60f&&_60f.startContainer){
if(!_60f.collapsed){
_60f.deleteContents();
_60e=dijit.range.getSelection(this.editor.window);
_60f=_60e.getRangeAt(0);
}
rs=_60f.startContainer;
var _616,_617,_618;
if(rs&&rs.nodeType==3){
dojo.withGlobal(this.editor.window,dojo.hitch(this,function(){
var _619=false;
var _61a=_60f.startOffset;
if(rs.length<_61a){
ret=this._adjustNodeAndOffset(rs,_61a);
rs=ret.node;
_61a=ret.offset;
}
txt=rs.nodeValue;
_616=doc.createTextNode(txt.substring(0,_61a));
_617=doc.createTextNode(txt.substring(_61a));
_618=doc.createElement("br");
if(!_617.length){
_617=doc.createTextNode("?");
_619=true;
}
if(_616.length){
dojo.place(_616,rs,"after");
}else{
_616=rs;
}
dojo.place(_618,_616,"after");
dojo.place(_617,_618,"after");
dojo.destroy(rs);
_610=dijit.range.create(dojo.gobal);
_610.setStart(_617,0);
_610.setEnd(_617,_617.length);
_60e.removeAllRanges();
_60e.addRange(_610);
if(_619&&!dojo.isWebKit){
dijit._editor.selection.remove();
}else{
dijit._editor.selection.collapse(true);
}
}));
}else{
dojo.withGlobal(this.editor.window,dojo.hitch(this,function(){
var _61b=doc.createElement("br");
rs.appendChild(_61b);
var _61c=doc.createTextNode("?");
rs.appendChild(_61c);
_610=dijit.range.create(dojo.global);
_610.setStart(_61c,0);
_610.setEnd(_61c,_61c.length);
_60e.removeAllRanges();
_60e.addRange(_610);
dijit._editor.selection.collapse(true);
}));
}
}
}else{
dijit._editor.RichText.prototype.execCommand.call(this.editor,"inserthtml","<br>");
}
}
return false;
}
var _61d=true;
_60e=dijit.range.getSelection(this.editor.window);
_60f=_60e.getRangeAt(0);
if(!_60f.collapsed){
_60f.deleteContents();
_60e=dijit.range.getSelection(this.editor.window);
_60f=_60e.getRangeAt(0);
}
var _61e=dijit.range.getBlockAncestor(_60f.endContainer,null,this.editor.editNode);
var _61f=_61e.blockNode;
if((this._checkListLater=(_61f&&(_61f.nodeName=="LI"||_61f.parentNode.nodeName=="LI")))){
if(dojo.isMoz){
this._pressedEnterInBlock=_61f;
}
if(/^(\s|&nbsp;|\xA0|<span\b[^>]*\bclass=['"]Apple-style-span['"][^>]*>(\s|&nbsp;|\xA0)<\/span>)?(<br>)?$/.test(_61f.innerHTML)){
_61f.innerHTML="";
if(dojo.isWebKit){
_610=dijit.range.create(this.editor.window);
_610.setStart(_61f,0);
_60e.removeAllRanges();
_60e.addRange(_610);
}
this._checkListLater=false;
}
return true;
}
if(!_61e.blockNode||_61e.blockNode===this.editor.editNode){
try{
dijit._editor.RichText.prototype.execCommand.call(this.editor,"formatblock",this.blockNodeForEnter);
}
catch(e2){
}
_61e={blockNode:dojo.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,[this.blockNodeForEnter]),blockContainer:this.editor.editNode};
if(_61e.blockNode){
if(_61e.blockNode!=this.editor.editNode&&(!(_61e.blockNode.textContent||_61e.blockNode.innerHTML).replace(/^\s+|\s+$/g,"").length)){
this.removeTrailingBr(_61e.blockNode);
return false;
}
}else{
_61e.blockNode=this.editor.editNode;
}
_60e=dijit.range.getSelection(this.editor.window);
_60f=_60e.getRangeAt(0);
}
var _620=doc.createElement(this.blockNodeForEnter);
_620.innerHTML=this.bogusHtmlContent;
this.removeTrailingBr(_61e.blockNode);
var _621=_60f.endOffset;
var node=_60f.endContainer;
if(node.length<_621){
var ret=this._adjustNodeAndOffset(node,_621);
node=ret.node;
_621=ret.offset;
}
if(dijit.range.atEndOfContainer(_61e.blockNode,node,_621)){
if(_61e.blockNode===_61e.blockContainer){
_61e.blockNode.appendChild(_620);
}else{
dojo.place(_620,_61e.blockNode,"after");
}
_61d=false;
_610=dijit.range.create(this.editor.window);
_610.setStart(_620,0);
_60e.removeAllRanges();
_60e.addRange(_610);
if(this.editor.height){
dojo.window.scrollIntoView(_620);
}
}else{
if(dijit.range.atBeginningOfContainer(_61e.blockNode,_60f.startContainer,_60f.startOffset)){
dojo.place(_620,_61e.blockNode,_61e.blockNode===_61e.blockContainer?"first":"before");
if(_620.nextSibling&&this.editor.height){
_610=dijit.range.create(this.editor.window);
_610.setStart(_620.nextSibling,0);
_60e.removeAllRanges();
_60e.addRange(_610);
dojo.window.scrollIntoView(_620.nextSibling);
}
_61d=false;
}else{
if(_61e.blockNode===_61e.blockContainer){
_61e.blockNode.appendChild(_620);
}else{
dojo.place(_620,_61e.blockNode,"after");
}
_61d=false;
if(_61e.blockNode.style){
if(_620.style){
if(_61e.blockNode.style.cssText){
_620.style.cssText=_61e.blockNode.style.cssText;
}
}
}
rs=_60f.startContainer;
if(rs&&rs.nodeType==3){
var _622,_623;
_621=_60f.endOffset;
if(rs.length<_621){
ret=this._adjustNodeAndOffset(rs,_621);
rs=ret.node;
_621=ret.offset;
}
txt=rs.nodeValue;
var _616=doc.createTextNode(txt.substring(0,_621));
var _617=doc.createTextNode(txt.substring(_621,txt.length));
dojo.place(_616,rs,"before");
dojo.place(_617,rs,"after");
dojo.destroy(rs);
var _624=_616.parentNode;
while(_624!==_61e.blockNode){
var tg=_624.tagName;
var _625=doc.createElement(tg);
if(_624.style){
if(_625.style){
if(_624.style.cssText){
_625.style.cssText=_624.style.cssText;
}
}
}
_622=_617;
while(_622){
_623=_622.nextSibling;
_625.appendChild(_622);
_622=_623;
}
dojo.place(_625,_624,"after");
_616=_624;
_617=_625;
_624=_624.parentNode;
}
_622=_617;
if(_622.nodeType==1||(_622.nodeType==3&&_622.nodeValue)){
_620.innerHTML="";
}
while(_622){
_623=_622.nextSibling;
_620.appendChild(_622);
_622=_623;
}
}
_610=dijit.range.create(this.editor.window);
_610.setStart(_620,0);
_60e.removeAllRanges();
_60e.addRange(_610);
if(this.editor.height){
dijit.scrollIntoView(_620);
}
if(dojo.isMoz){
this._pressedEnterInBlock=_61e.blockNode;
}
}
}
return _61d;
},_adjustNodeAndOffset:function(node,_626){
while(node.length<_626&&node.nextSibling&&node.nextSibling.nodeType==3){
_626=_626-node.length;
node=node.nextSibling;
}
var ret={"node":node,"offset":_626};
return ret;
},removeTrailingBr:function(_627){
var para=/P|DIV|LI/i.test(_627.tagName)?_627:dijit._editor.selection.getParentOfType(_627,["P","DIV","LI"]);
if(!para){
return;
}
if(para.lastChild){
if((para.childNodes.length>1&&para.lastChild.nodeType==3&&/^[\s\xAD]*$/.test(para.lastChild.nodeValue))||para.lastChild.tagName=="BR"){
dojo.destroy(para.lastChild);
}
}
if(!para.childNodes.length){
para.innerHTML=this.bogusHtmlContent;
}
}});
dojo.provide("dijit.Editor");
dojo.declare("dijit.Editor",dijit._editor.RichText,{plugins:null,extraPlugins:null,constructor:function(){
if(!dojo.isArray(this.plugins)){
this.plugins=["undo","redo","|","cut","copy","paste","|","bold","italic","underline","strikethrough","|","insertOrderedList","insertUnorderedList","indent","outdent","|","justifyLeft","justifyRight","justifyCenter","justifyFull","dijit._editor.plugins.EnterKeyHandling"];
}
this._plugins=[];
this._editInterval=this.editActionInterval*1000;
if(dojo.isIE){
this.events.push("onBeforeDeactivate");
this.events.push("onBeforeActivate");
}
},postMixInProperties:function(){
this.setValueDeferred=new dojo.Deferred();
this.inherited(arguments);
},postCreate:function(){
this._steps=this._steps.slice(0);
this._undoedSteps=this._undoedSteps.slice(0);
if(dojo.isArray(this.extraPlugins)){
this.plugins=this.plugins.concat(this.extraPlugins);
}
this.inherited(arguments);
this.commands=dojo.i18n.getLocalization("dijit._editor","commands",this.lang);
if(!this.toolbar){
this.toolbar=new dijit.Toolbar({dir:this.dir,lang:this.lang});
this.header.appendChild(this.toolbar.domNode);
}
dojo.forEach(this.plugins,this.addPlugin,this);
this.setValueDeferred.callback(true);
dojo.addClass(this.iframe.parentNode,"dijitEditorIFrameContainer");
dojo.addClass(this.iframe,"dijitEditorIFrame");
dojo.attr(this.iframe,"allowTransparency",true);
if(dojo.isWebKit){
dojo.style(this.domNode,"KhtmlUserSelect","none");
}
this.toolbar.startup();
this.onNormalizedDisplayChanged();
},destroy:function(){
dojo.forEach(this._plugins,function(p){
if(p&&p.destroy){
p.destroy();
}
});
this._plugins=[];
this.toolbar.destroyRecursive();
delete this.toolbar;
this.inherited(arguments);
},addPlugin:function(_628,_629){
var args=dojo.isString(_628)?{name:_628}:_628;
if(!args.setEditor){
var o={"args":args,"plugin":null,"editor":this};
dojo.publish(dijit._scopeName+".Editor.getPlugin",[o]);
if(!o.plugin){
var pc=dojo.getObject(args.name);
if(pc){
o.plugin=new pc(args);
}
}
if(!o.plugin){
return;
}
_628=o.plugin;
}
if(arguments.length>1){
this._plugins[_629]=_628;
}else{
this._plugins.push(_628);
}
_628.setEditor(this);
if(dojo.isFunction(_628.setToolbar)){
_628.setToolbar(this.toolbar);
}
},startup:function(){
},resize:function(size){
if(size){
dijit.layout._LayoutWidget.prototype.resize.apply(this,arguments);
}
},layout:function(){
var _62a=(this._contentBox.h-(this.getHeaderHeight()+this.getFooterHeight()+dojo._getPadBorderExtents(this.iframe.parentNode).h+dojo._getMarginExtents(this.iframe.parentNode).h));
this.editingArea.style.height=_62a+"px";
if(this.iframe){
this.iframe.style.height="100%";
}
this._layoutMode=true;
},_onIEMouseDown:function(e){
var _62b;
var b=this.document.body;
var _62c=b.clientWidth;
var _62d=b.clientHeight;
var _62e=b.clientLeft;
var _62f=b.offsetWidth;
var _630=b.offsetHeight;
var _631=b.offsetLeft;
bodyDir=b.dir?b.dir.toLowerCase():"";
if(bodyDir!="rtl"){
if(_62c<_62f&&e.x>_62c&&e.x<_62f){
_62b=true;
}
}else{
if(e.x<_62e&&e.x>_631){
_62b=true;
}
}
if(!_62b){
if(_62d<_630&&e.y>_62d&&e.y<_630){
_62b=true;
}
}
if(!_62b){
delete this._cursorToStart;
delete this._savedSelection;
if(e.target.tagName=="BODY"){
setTimeout(dojo.hitch(this,"placeCursorAtEnd"),0);
}
this.inherited(arguments);
}
},onBeforeActivate:function(e){
this._restoreSelection();
},onBeforeDeactivate:function(e){
if(this.customUndo){
this.endEditing(true);
}
if(e.target.tagName!="BODY"){
this._saveSelection();
}
},customUndo:true,editActionInterval:3,beginEditing:function(cmd){
if(!this._inEditing){
this._inEditing=true;
this._beginEditing(cmd);
}
if(this.editActionInterval>0){
if(this._editTimer){
clearTimeout(this._editTimer);
}
this._editTimer=setTimeout(dojo.hitch(this,this.endEditing),this._editInterval);
}
},_steps:[],_undoedSteps:[],execCommand:function(cmd){
if(this.customUndo&&(cmd=="undo"||cmd=="redo")){
return this[cmd]();
}else{
if(this.customUndo){
this.endEditing();
this._beginEditing();
}
var r;
var _632=/copy|cut|paste/.test(cmd);
try{
r=this.inherited(arguments);
if(dojo.isWebKit&&_632&&!r){
throw {code:1011};
}
}
catch(e){
if(e.code==1011&&_632){
var sub=dojo.string.substitute,_633={cut:"X",copy:"C",paste:"V"};
alert(sub(this.commands.systemShortcut,[this.commands[cmd],sub(this.commands[dojo.isMac?"appleKey":"ctrlKey"],[_633[cmd]])]));
}
r=false;
}
if(this.customUndo){
this._endEditing();
}
return r;
}
},queryCommandEnabled:function(cmd){
if(this.customUndo&&(cmd=="undo"||cmd=="redo")){
return cmd=="undo"?(this._steps.length>1):(this._undoedSteps.length>0);
}else{
return this.inherited(arguments);
}
},_moveToBookmark:function(b){
var _634=b.mark;
var mark=b.mark;
var col=b.isCollapsed;
var r,_635,_636,sel;
if(mark){
if(dojo.isIE){
if(dojo.isArray(mark)){
_634=[];
dojo.forEach(mark,function(n){
_634.push(dijit.range.getNode(n,this.editNode));
},this);
dojo.withGlobal(this.window,"moveToBookmark",dijit,[{mark:_634,isCollapsed:col}]);
}else{
if(mark.startContainer&&mark.endContainer){
sel=dijit.range.getSelection(this.window);
if(sel&&sel.removeAllRanges){
sel.removeAllRanges();
r=dijit.range.create(this.window);
_635=dijit.range.getNode(mark.startContainer,this.editNode);
_636=dijit.range.getNode(mark.endContainer,this.editNode);
if(_635&&_636){
r.setStart(_635,mark.startOffset);
r.setEnd(_636,mark.endOffset);
sel.addRange(r);
}
}
}
}
}else{
sel=dijit.range.getSelection(this.window);
if(sel&&sel.removeAllRanges){
sel.removeAllRanges();
r=dijit.range.create(this.window);
_635=dijit.range.getNode(mark.startContainer,this.editNode);
_636=dijit.range.getNode(mark.endContainer,this.editNode);
if(_635&&_636){
r.setStart(_635,mark.startOffset);
r.setEnd(_636,mark.endOffset);
sel.addRange(r);
}
}
}
}
},_changeToStep:function(from,to){
this.setValue(to.text);
var b=to.bookmark;
if(!b){
return;
}
this._moveToBookmark(b);
},undo:function(){
var ret=false;
if(!this._undoRedoActive){
this._undoRedoActive=true;
this.endEditing(true);
var s=this._steps.pop();
if(s&&this._steps.length>0){
this.focus();
this._changeToStep(s,this._steps[this._steps.length-1]);
this._undoedSteps.push(s);
this.onDisplayChanged();
delete this._undoRedoActive;
ret=true;
}
delete this._undoRedoActive;
}
return ret;
},redo:function(){
var ret=false;
if(!this._undoRedoActive){
this._undoRedoActive=true;
this.endEditing(true);
var s=this._undoedSteps.pop();
if(s&&this._steps.length>0){
this.focus();
this._changeToStep(this._steps[this._steps.length-1],s);
this._steps.push(s);
this.onDisplayChanged();
ret=true;
}
delete this._undoRedoActive;
}
return ret;
},endEditing:function(_637){
if(this._editTimer){
clearTimeout(this._editTimer);
}
if(this._inEditing){
this._endEditing(_637);
this._inEditing=false;
}
},_getBookmark:function(){
var b=dojo.withGlobal(this.window,dijit.getBookmark);
var tmp=[];
if(b&&b.mark){
var mark=b.mark;
if(dojo.isIE){
var sel=dijit.range.getSelection(this.window);
if(!dojo.isArray(mark)){
if(sel){
var _638;
if(sel.rangeCount){
_638=sel.getRangeAt(0);
}
if(_638){
b.mark=_638.cloneRange();
}else{
b.mark=dojo.withGlobal(this.window,dijit.getBookmark);
}
}
}else{
dojo.forEach(b.mark,function(n){
tmp.push(dijit.range.getIndex(n,this.editNode).o);
},this);
b.mark=tmp;
}
}
try{
if(b.mark&&b.mark.startContainer){
tmp=dijit.range.getIndex(b.mark.startContainer,this.editNode).o;
b.mark={startContainer:tmp,startOffset:b.mark.startOffset,endContainer:b.mark.endContainer===b.mark.startContainer?tmp:dijit.range.getIndex(b.mark.endContainer,this.editNode).o,endOffset:b.mark.endOffset};
}
}
catch(e){
b.mark=null;
}
}
return b;
},_beginEditing:function(cmd){
if(this._steps.length===0){
this._steps.push({"text":dijit._editor.getChildrenHtml(this.editNode),"bookmark":this._getBookmark()});
}
},_endEditing:function(_639){
var v=dijit._editor.getChildrenHtml(this.editNode);
this._undoedSteps=[];
this._steps.push({text:v,bookmark:this._getBookmark()});
},onKeyDown:function(e){
if(!dojo.isIE&&!this.iframe&&e.keyCode==dojo.keys.TAB&&!this.tabIndent){
this._saveSelection();
}
if(!this.customUndo){
this.inherited(arguments);
return;
}
var k=e.keyCode,ks=dojo.keys;
if(e.ctrlKey&&!e.altKey){
if(k==90||k==122){
dojo.stopEvent(e);
this.undo();
return;
}else{
if(k==89||k==121){
dojo.stopEvent(e);
this.redo();
return;
}
}
}
this.inherited(arguments);
switch(k){
case ks.ENTER:
case ks.BACKSPACE:
case ks.DELETE:
this.beginEditing();
break;
case 88:
case 86:
if(e.ctrlKey&&!e.altKey&&!e.metaKey){
this.endEditing();
if(e.keyCode==88){
this.beginEditing("cut");
setTimeout(dojo.hitch(this,this.endEditing),1);
}else{
this.beginEditing("paste");
setTimeout(dojo.hitch(this,this.endEditing),1);
}
break;
}
default:
if(!e.ctrlKey&&!e.altKey&&!e.metaKey&&(e.keyCode<dojo.keys.F1||e.keyCode>dojo.keys.F15)){
this.beginEditing();
break;
}
case ks.ALT:
this.endEditing();
break;
case ks.UP_ARROW:
case ks.DOWN_ARROW:
case ks.LEFT_ARROW:
case ks.RIGHT_ARROW:
case ks.HOME:
case ks.END:
case ks.PAGE_UP:
case ks.PAGE_DOWN:
this.endEditing(true);
break;
case ks.CTRL:
case ks.SHIFT:
case ks.TAB:
break;
}
},_onBlur:function(){
this.inherited(arguments);
this.endEditing(true);
},_saveSelection:function(){
try{
this._savedSelection=this._getBookmark();
}
catch(e){
}
},_restoreSelection:function(){
if(this._savedSelection){
delete this._cursorToStart;
if(dojo.withGlobal(this.window,"isCollapsed",dijit)){
this._moveToBookmark(this._savedSelection);
}
delete this._savedSelection;
}
},onClick:function(){
this.endEditing(true);
this.inherited(arguments);
},replaceValue:function(html){
if(!this.customUndo){
this.inherited(arguments);
}else{
if(this.isClosed){
this.setValue(html);
}else{
this.beginEditing();
if(!html){
html="&nbsp;";
}
this.setValue(html);
this.endEditing();
}
}
},_setDisabledAttr:function(_63a){
var _63b=dojo.hitch(this,function(){
if((!this.disabled&&_63a)||(!this._buttonEnabledPlugins&&_63a)){
dojo.forEach(this._plugins,function(p){
p.set("disabled",true);
});
}else{
if(this.disabled&&!_63a){
dojo.forEach(this._plugins,function(p){
p.set("disabled",false);
});
}
}
});
this.setValueDeferred.addCallback(_63b);
this.inherited(arguments);
},_setStateClass:function(){
try{
this.inherited(arguments);
if(this.document&&this.document.body){
dojo.style(this.document.body,"color",dojo.style(this.iframe,"color"));
}
}
catch(e){
}
}});
dojo.subscribe(dijit._scopeName+".Editor.getPlugin",null,function(o){
if(o.plugin){
return;
}
var args=o.args,p;
var _63c=dijit._editor._Plugin;
var name=args.name;
switch(name){
case "undo":
case "redo":
case "cut":
case "copy":
case "paste":
case "insertOrderedList":
case "insertUnorderedList":
case "indent":
case "outdent":
case "justifyCenter":
case "justifyFull":
case "justifyLeft":
case "justifyRight":
case "delete":
case "selectAll":
case "removeFormat":
case "unlink":
case "insertHorizontalRule":
p=new _63c({command:name});
break;
case "bold":
case "italic":
case "underline":
case "strikethrough":
case "subscript":
case "superscript":
p=new _63c({buttonClass:dijit.form.ToggleButton,command:name});
break;
case "|":
p=new _63c({button:new dijit.ToolbarSeparator(),setEditor:function(_63d){
this.editor=_63d;
}});
}
o.plugin=p;
});
dojo.provide("dijit.TitlePane");
dojo.declare("dijit.TitlePane",[dijit.layout.ContentPane,dijit._Templated,dijit._CssStateMixin],{title:"",open:true,toggleable:true,tabIndex:"0",duration:dijit.defaultDuration,baseClass:"dijitTitlePane",templateString:dojo.cache("dijit","templates/TitlePane.html","<div>\n\t<div dojoAttachEvent=\"onclick:_onTitleClick, onkeypress:_onTitleKey\"\n\t\t\tclass=\"dijitTitlePaneTitle\" dojoAttachPoint=\"titleBarNode\">\n\t\t<div class=\"dijitTitlePaneTitleFocus\" dojoAttachPoint=\"focusNode\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" dojoAttachPoint=\"arrowNode\" class=\"dijitArrowNode\" role=\"presentation\"\n\t\t\t/><span dojoAttachPoint=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span\n\t\t\t><span dojoAttachPoint=\"titleNode\" class=\"dijitTitlePaneTextNode\"></span>\n\t\t</div>\n\t</div>\n\t<div class=\"dijitTitlePaneContentOuter\" dojoAttachPoint=\"hideNode\" role=\"presentation\">\n\t\t<div class=\"dijitReset\" dojoAttachPoint=\"wipeNode\" role=\"presentation\">\n\t\t\t<div class=\"dijitTitlePaneContentInner\" dojoAttachPoint=\"containerNode\" role=\"region\" id=\"${id}_pane\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"),attributeMap:dojo.delegate(dijit.layout.ContentPane.prototype.attributeMap,{title:{node:"titleNode",type:"innerHTML"},tooltip:{node:"focusNode",type:"attribute",attribute:"title"},id:""}),buildRendering:function(){
this.inherited(arguments);
dojo.setSelectable(this.titleNode,false);
},postCreate:function(){
this.inherited(arguments);
if(this.toggleable){
this._trackMouseState(this.titleBarNode,"dijitTitlePaneTitle");
}
var _63e=this.hideNode,_63f=this.wipeNode;
this._wipeIn=dojo.fx.wipeIn({node:this.wipeNode,duration:this.duration,beforeBegin:function(){
_63e.style.display="";
}});
this._wipeOut=dojo.fx.wipeOut({node:this.wipeNode,duration:this.duration,onEnd:function(){
_63e.style.display="none";
}});
},_setOpenAttr:function(open,_640){
dojo.forEach([this._wipeIn,this._wipeOut],function(_641){
if(_641&&_641.status()=="playing"){
_641.stop();
}
});
if(_640){
var anim=this[open?"_wipeIn":"_wipeOut"];
anim.play();
}else{
this.hideNode.style.display=this.wipeNode.style.display=open?"":"none";
}
if(this._started){
if(open){
this._onShow();
}else{
this.onHide();
}
}
this.arrowNodeInner.innerHTML=open?"-":"+";
dijit.setWaiState(this.containerNode,"hidden",open?"false":"true");
dijit.setWaiState(this.focusNode,"pressed",open?"true":"false");
this._set("open",open);
this._setCss();
},_setToggleableAttr:function(_642){
dijit.setWaiRole(this.focusNode,_642?"button":"heading");
if(_642){
dijit.setWaiState(this.focusNode,"controls",this.id+"_pane");
dojo.attr(this.focusNode,"tabIndex",this.tabIndex);
}else{
dojo.removeAttr(this.focusNode,"tabIndex");
}
this._set("toggleable",_642);
this._setCss();
},_setContentAttr:function(_643){
if(!this.open||!this._wipeOut||this._wipeOut.status()=="playing"){
this.inherited(arguments);
}else{
if(this._wipeIn&&this._wipeIn.status()=="playing"){
this._wipeIn.stop();
}
dojo.marginBox(this.wipeNode,{h:dojo.marginBox(this.wipeNode).h});
this.inherited(arguments);
if(this._wipeIn){
this._wipeIn.play();
}else{
this.hideNode.style.display="";
}
}
},toggle:function(){
this._setOpenAttr(!this.open,true);
},_setCss:function(){
var node=this.titleBarNode||this.focusNode;
var _644=this._titleBarClass;
this._titleBarClass="dijit"+(this.toggleable?"":"Fixed")+(this.open?"Open":"Closed");
dojo.replaceClass(node,this._titleBarClass,_644||"");
this.arrowNodeInner.innerHTML=this.open?"-":"+";
},_onTitleKey:function(e){
if(e.charOrCode==dojo.keys.ENTER||e.charOrCode==" "){
if(this.toggleable){
this.toggle();
}
dojo.stopEvent(e);
}else{
if(e.charOrCode==dojo.keys.DOWN_ARROW&&this.open){
this.containerNode.focus();
e.preventDefault();
}
}
},_onTitleClick:function(){
if(this.toggleable){
this.toggle();
}
},setTitle:function(_645){
dojo.deprecated("dijit.TitlePane.setTitle() is deprecated.  Use set('title', ...) instead.","","2.0");
this.set("title",_645);
}});
dojo.provide("dijit.Tooltip");
dojo.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:dijit.defaultDuration,templateString:dojo.cache("dijit","templates/Tooltip.html","<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" dojoAttachPoint=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" dojoAttachPoint=\"connectorNode\"></div\n></div>\n"),postCreate:function(){
dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=dojo.fadeIn({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onShow")});
this.fadeOut=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onHide")});
},show:function(_646,_647,_648,rtl){
if(this.aroundNode&&this.aroundNode===_647){
return;
}
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_646;
var pos=dijit.placeOnScreenAroundElement(this.domNode,_647,dijit.getPopupAroundAlignment((_648&&_648.length)?_648:dijit.Tooltip.defaultPosition,!rtl),dojo.hitch(this,"orient"));
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_647;
},orient:function(node,_649,_64a,_64b,_64c){
this.connectorNode.style.top="";
var _64d=_64b.w-this.connectorNode.offsetWidth;
node.className="dijitTooltip "+{"BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_649+"-"+_64a];
this.domNode.style.width="auto";
var size=dojo.contentBox(this.domNode);
var _64e=Math.min((Math.max(_64d,1)),size.w);
var _64f=_64e<size.w;
this.domNode.style.width=_64e+"px";
if(_64f){
this.containerNode.style.overflow="auto";
var _650=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_650>_64e){
_650=_650+dojo.style(this.domNode,"paddingLeft")+dojo.style(this.domNode,"paddingRight");
this.domNode.style.width=_650+"px";
}
}
if(_64a.charAt(0)=="B"&&_649.charAt(0)=="B"){
var mb=dojo.marginBox(node);
var _651=this.connectorNode.offsetHeight;
if(mb.h>_64b.h){
var _652=_64b.h-(_64c.h/2)-(_651/2);
this.connectorNode.style.top=_652+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_64c.h/2-_651/2,0),mb.h-_651)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_64d);
},_onShow:function(){
if(dojo.isIE){
this.domNode.style.filter="";
}
},hide:function(_653){
if(this._onDeck&&this._onDeck[1]==_653){
this._onDeck=null;
}else{
if(this.aroundNode===_653){
this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play();
}else{
}
}
},_onHide:function(){
this.domNode.style.cssText="";
this.containerNode.innerHTML="";
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
}});
dijit.showTooltip=function(_654,_655,_656,rtl){
if(!dijit._masterTT){
dijit._masterTT=new dijit._MasterTooltip();
}
return dijit._masterTT.show(_654,_655,_656,rtl);
};
dijit.hideTooltip=function(_657){
if(!dijit._masterTT){
dijit._masterTT=new dijit._MasterTooltip();
}
return dijit._masterTT.hide(_657);
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],position:[],_setConnectIdAttr:function(_658){
dojo.forEach(this._connections||[],function(_659){
dojo.forEach(_659,dojo.hitch(this,"disconnect"));
},this);
var ary=dojo.isArrayLike(_658)?_658:(_658?[_658]:[]);
this._connections=dojo.map(ary,function(id){
var node=dojo.byId(id);
return node?[this.connect(node,"onmouseenter","_onTargetMouseEnter"),this.connect(node,"onmouseleave","_onTargetMouseLeave"),this.connect(node,"onfocus","_onTargetFocus"),this.connect(node,"onblur","_onTargetBlur")]:[];
},this);
this._set("connectId",_658);
this._connectIds=ary;
},addTarget:function(node){
var id=node.id||node;
if(dojo.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=dojo.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
dojo.addClass(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
dojo.forEach(dojo.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},_onTargetMouseEnter:function(e){
this._onHover(e);
},_onTargetMouseLeave:function(e){
this._onUnHover(e);
},_onTargetFocus:function(e){
this._focus=true;
this._onHover(e);
},_onTargetBlur:function(e){
this._focus=false;
this._onUnHover(e);
},_onHover:function(e){
if(!this._showTimer){
var _65a=e.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){
this.open(_65a);
}),this.showDelay);
}
},_onUnHover:function(e){
if(this._focus){
return;
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
this.close();
},open:function(_65b){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
dijit.showTooltip(this.label||this.domNode.innerHTML,_65b,this.position,!this.isLeftToRight());
this._connectNode=_65b;
this.onShow(_65b,this.position);
},close:function(){
if(this._connectNode){
dijit.hideTooltip(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
},onShow:function(_65c,_65d){
},onHide:function(){
},uninitialize:function(){
this.close();
this.inherited(arguments);
}});
dijit.Tooltip.defaultPosition=["after","before"];
dojo.provide("dijit._editor.plugins.FullScreen");
dojo.declare("dijit._editor.plugins.FullScreen",dijit._editor._Plugin,{zIndex:500,_origState:null,_origiFrameState:null,_resizeHandle:null,isFullscreen:false,toggle:function(){
this.button.set("checked",!this.button.get("checked"));
},_initButton:function(){
var _65e=dojo.i18n.getLocalization("dijit._editor","commands"),_65f=this.editor;
this.button=new dijit.form.ToggleButton({label:_65e["fullScreen"],dir:_65f.dir,lang:_65f.lang,showLabel:false,iconClass:this.iconClassPrefix+" "+this.iconClassPrefix+"FullScreen",tabIndex:"-1",onChange:dojo.hitch(this,"_setFullScreen")});
},setEditor:function(_660){
this.editor=_660;
this._initButton();
this.editor.addKeyHandler(dojo.keys.F11,true,true,dojo.hitch(this,function(e){
this.toggle();
dojo.stopEvent(e);
setTimeout(dojo.hitch(this,function(){
this.editor.focus();
}),250);
return true;
}));
this.connect(this.editor.domNode,"onkeydown","_containFocus");
},_containFocus:function(e){
if(this.isFullscreen){
var ed=this.editor;
if(!ed.isTabIndent&&ed._fullscreen_oldOnKeyDown&&e.keyCode===dojo.keys.TAB){
var f=dijit.getFocus();
var avn=this._getAltViewNode();
if(f.node==ed.iframe||(avn&&f.node===avn)){
setTimeout(dojo.hitch(this,function(){
ed.toolbar.focus();
}),10);
}else{
if(avn&&dojo.style(ed.iframe,"display")==="none"){
setTimeout(dojo.hitch(this,function(){
dijit.focus(avn);
}),10);
}else{
setTimeout(dojo.hitch(this,function(){
ed.focus();
}),10);
}
}
dojo.stopEvent(e);
}else{
if(ed._fullscreen_oldOnKeyDown){
ed._fullscreen_oldOnKeyDown(e);
}
}
}
},_resizeEditor:function(){
var vp=dojo.window.getBox();
dojo.marginBox(this.editor.domNode,{w:vp.w,h:vp.h});
var _661=this.editor.getHeaderHeight();
var _662=this.editor.getFooterHeight();
var _663=dojo._getPadBorderExtents(this.editor.domNode);
var _664=dojo._getPadBorderExtents(this.editor.iframe.parentNode);
var _665=dojo._getMarginExtents(this.editor.iframe.parentNode);
var _666=vp.h-(_661+_663.h+_662);
dojo.marginBox(this.editor.iframe.parentNode,{h:_666,w:vp.w});
dojo.marginBox(this.editor.iframe,{h:_666-(_664.h+_665.h)});
},_getAltViewNode:function(){
},_setFullScreen:function(full){
var vp=dojo.window.getBox();
var ed=this.editor;
var body=dojo.body();
var _667=ed.domNode.parentNode;
this.isFullscreen=full;
if(full){
while(_667&&_667!==dojo.body()){
dojo.addClass(_667,"dijitForceStatic");
_667=_667.parentNode;
}
this._editorResizeHolder=this.editor.resize;
ed.resize=function(){
};
ed._fullscreen_oldOnKeyDown=ed.onKeyDown;
ed.onKeyDown=dojo.hitch(this,this._containFocus);
this._origState={};
this._origiFrameState={};
var _668=ed.domNode,_669=_668&&_668.style||{};
this._origState={width:_669.width||"",height:_669.height||"",top:dojo.style(_668,"top")||"",left:dojo.style(_668,"left")||"",position:dojo.style(_668,"position")||"static",marginBox:dojo.marginBox(ed.domNode)};
var _66a=ed.iframe,_66b=_66a&&_66a.style||{};
var bc=dojo.style(ed.iframe,"backgroundColor");
this._origiFrameState={backgroundColor:bc||"transparent",width:_66b.width||"auto",height:_66b.height||"auto",zIndex:_66b.zIndex||""};
dojo.style(ed.domNode,{position:"absolute",top:"0px",left:"0px",zIndex:this.zIndex,width:vp.w+"px",height:vp.h+"px"});
dojo.style(ed.iframe,{height:"100%",width:"100%",zIndex:this.zIndex,backgroundColor:bc!=="transparent"&&bc!=="rgba(0, 0, 0, 0)"?bc:"white"});
dojo.style(ed.iframe.parentNode,{height:"95%",width:"100%"});
if(body.style&&body.style.overflow){
this._oldOverflow=dojo.style(body,"overflow");
}else{
this._oldOverflow="";
}
if(dojo.isIE&&!dojo.isQuirks){
if(body.parentNode&&body.parentNode.style&&body.parentNode.style.overflow){
this._oldBodyParentOverflow=body.parentNode.style.overflow;
}else{
try{
this._oldBodyParentOverflow=dojo.style(body.parentNode,"overflow");
}
catch(e){
this._oldBodyParentOverflow="scroll";
}
}
dojo.style(body.parentNode,"overflow","hidden");
}
dojo.style(body,"overflow","hidden");
var _66c=function(){
var vp=dojo.window.getBox();
if("_prevW" in this&&"_prevH" in this){
if(vp.w===this._prevW&&vp.h===this._prevH){
return;
}
}else{
this._prevW=vp.w;
this._prevH=vp.h;
}
if(this._resizer){
clearTimeout(this._resizer);
delete this._resizer;
}
this._resizer=setTimeout(dojo.hitch(this,function(){
delete this._resizer;
this._resizeEditor();
}),10);
};
this._resizeHandle=dojo.connect(window,"onresize",this,_66c);
this._resizeHandle2=dojo.connect(ed,"resize",dojo.hitch(this,function(){
if(this._resizer){
clearTimeout(this._resizer);
delete this._resizer;
}
this._resizer=setTimeout(dojo.hitch(this,function(){
delete this._resizer;
this._resizeEditor();
}),10);
}));
this._resizeEditor();
var dn=this.editor.toolbar.domNode;
setTimeout(function(){
dojo.window.scrollIntoView(dn);
},250);
}else{
if(this._resizeHandle){
dojo.disconnect(this._resizeHandle);
this._resizeHandle=null;
}
if(this._resizeHandle2){
dojo.disconnect(this._resizeHandle2);
this._resizeHandle2=null;
}
if(this._rst){
clearTimeout(this._rst);
this._rst=null;
}
while(_667&&_667!==dojo.body()){
dojo.removeClass(_667,"dijitForceStatic");
_667=_667.parentNode;
}
if(this._editorResizeHolder){
this.editor.resize=this._editorResizeHolder;
}
if(!this._origState&&!this._origiFrameState){
return;
}
if(ed._fullscreen_oldOnKeyDown){
ed.onKeyDown=ed._fullscreen_oldOnKeyDown;
delete ed._fullscreen_oldOnKeyDown;
}
var self=this;
setTimeout(function(){
var mb=self._origState.marginBox;
var oh=self._origState.height;
if(dojo.isIE&&!dojo.isQuirks){
body.parentNode.style.overflow=self._oldBodyParentOverflow;
delete self._oldBodyParentOverflow;
}
dojo.style(body,"overflow",self._oldOverflow);
delete self._oldOverflow;
dojo.style(ed.domNode,self._origState);
dojo.style(ed.iframe.parentNode,{height:"",width:""});
dojo.style(ed.iframe,self._origiFrameState);
delete self._origState;
delete self._origiFrameState;
var _66d=dijit.getEnclosingWidget(ed.domNode.parentNode);
if(_66d&&_66d.resize){
_66d.resize();
}else{
if(!oh||oh.indexOf("%")<0){
setTimeout(dojo.hitch(this,function(){
ed.resize({h:mb.h});
}),0);
}
}
dojo.window.scrollIntoView(self.editor.toolbar.domNode);
},100);
}
},updateState:function(){
this.button.set("disabled",this.get("disabled"));
},destroy:function(){
if(this._resizeHandle){
dojo.disconnect(this._resizeHandle);
this._resizeHandle=null;
}
if(this._resizeHandle2){
dojo.disconnect(this._resizeHandle2);
this._resizeHandle2=null;
}
if(this._resizer){
clearTimeout(this._resizer);
this._resizer=null;
}
this.inherited(arguments);
}});
dojo.subscribe(dijit._scopeName+".Editor.getPlugin",null,function(o){
if(o.plugin){
return;
}
var name=o.args.name.toLowerCase();
if(name==="fullscreen"){
o.plugin=new dijit._editor.plugins.FullScreen({zIndex:("zIndex" in o.args)?o.args.zIndex:500});
}
});
dojo.provide("dijit.form.TextBox");
dojo.declare("dijit.form.TextBox",dijit.form._FormValueWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",selectOnClick:false,placeHolder:"",templateString:dojo.cache("dijit.form","templates/TextBox.html","<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"),_singleNodeTemplate:"<input class=\"dijit dijitReset dijitLeft dijitInputField\" dojoAttachPoint=\"textbox,focusNode\" autocomplete=\"off\" type=\"${type}\" ${!nameAttrSetting} />",_buttonInputDisabled:dojo.isIE?"disabled":"",baseClass:"dijitTextBox",attributeMap:dojo.delegate(dijit.form._FormValueWidget.prototype.attributeMap,{maxLength:"focusNode"}),postMixInProperties:function(){
var type=this.type.toLowerCase();
if(this.templateString&&this.templateString.toLowerCase()=="input"||((type=="hidden"||type=="file")&&this.templateString==dijit.form.TextBox.prototype.templateString)){
this.templateString=this._singleNodeTemplate;
}
this.inherited(arguments);
},_setPlaceHolderAttr:function(v){
this._set("placeHolder",v);
if(!this._phspan){
this._attachPoints.push("_phspan");
this._phspan=dojo.create("span",{className:"dijitPlaceHolder dijitInputField"},this.textbox,"after");
}
this._phspan.innerHTML="";
this._phspan.appendChild(document.createTextNode(v));
this._updatePlaceHolder();
},_updatePlaceHolder:function(){
if(this._phspan){
this._phspan.style.display=(this.placeHolder&&!this._focused&&!this.textbox.value)?"":"none";
}
},_getValueAttr:function(){
return this.parse(this.get("displayedValue"),this.constraints);
},_setValueAttr:function(_66e,_66f,_670){
var _671;
if(_66e!==undefined){
_671=this.filter(_66e);
if(typeof _670!="string"){
if(_671!==null&&((typeof _671!="number")||!isNaN(_671))){
_670=this.filter(this.format(_671,this.constraints));
}else{
_670="";
}
}
}
if(_670!=null&&_670!=undefined&&((typeof _670)!="number"||!isNaN(_670))&&this.textbox.value!=_670){
this.textbox.value=_670;
this._set("displayedValue",this.get("displayedValue"));
}
this._updatePlaceHolder();
this.inherited(arguments,[_671,_66f]);
},displayedValue:"",getDisplayedValue:function(){
dojo.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use set('displayedValue') instead.","","2.0");
return this.get("displayedValue");
},_getDisplayedValueAttr:function(){
return this.filter(this.textbox.value);
},setDisplayedValue:function(_672){
dojo.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.","","2.0");
this.set("displayedValue",_672);
},_setDisplayedValueAttr:function(_673){
if(_673===null||_673===undefined){
_673="";
}else{
if(typeof _673!="string"){
_673=String(_673);
}
}
this.textbox.value=_673;
this._setValueAttr(this.get("value"),undefined);
this._set("displayedValue",this.get("displayedValue"));
},format:function(_674,_675){
return ((_674==null||_674==undefined)?"":(_674.toString?_674.toString():_674));
},parse:function(_676,_677){
return _676;
},_refreshState:function(){
},_onInput:function(e){
if(e&&e.type&&/key/i.test(e.type)&&e.keyCode){
switch(e.keyCode){
case dojo.keys.SHIFT:
case dojo.keys.ALT:
case dojo.keys.CTRL:
case dojo.keys.TAB:
return;
}
}
if(this.intermediateChanges){
var _678=this;
setTimeout(function(){
_678._handleOnChange(_678.get("value"),false);
},0);
}
this._refreshState();
this._set("displayedValue",this.get("displayedValue"));
},postCreate:function(){
if(dojo.isIE){
setTimeout(dojo.hitch(this,function(){
var s=dojo.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _679=this.domNode.getElementsByTagName("INPUT");
if(_679){
for(var i=0;i<_679.length;i++){
_679[i].style.fontFamily=ff;
}
}
}
}
}),0);
}
this.textbox.setAttribute("value",this.textbox.value);
this.inherited(arguments);
if(dojo.isMoz||dojo.isOpera){
this.connect(this.textbox,"oninput","_onInput");
}else{
this.connect(this.textbox,"onkeydown","_onInput");
this.connect(this.textbox,"onkeyup","_onInput");
this.connect(this.textbox,"onpaste","_onInput");
this.connect(this.textbox,"oncut","_onInput");
}
},_blankValue:"",filter:function(val){
if(val===null){
return this._blankValue;
}
if(typeof val!="string"){
return val;
}
if(this.trim){
val=dojo.trim(val);
}
if(this.uppercase){
val=val.toUpperCase();
}
if(this.lowercase){
val=val.toLowerCase();
}
if(this.propercase){
val=val.replace(/[^\s]+/g,function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
});
}
return val;
},_setBlurValue:function(){
this._setValueAttr(this.get("value"),true);
},_onBlur:function(e){
if(this.disabled){
return;
}
this._setBlurValue();
this.inherited(arguments);
if(this._selectOnClickHandle){
this.disconnect(this._selectOnClickHandle);
}
if(this.selectOnClick&&dojo.isMoz){
this.textbox.selectionStart=this.textbox.selectionEnd=undefined;
}
this._updatePlaceHolder();
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
if(this.selectOnClick&&by=="mouse"){
this._selectOnClickHandle=this.connect(this.domNode,"onmouseup",function(){
this.disconnect(this._selectOnClickHandle);
var _67a;
if(dojo.isIE){
var _67b=dojo.doc.selection.createRange();
var _67c=_67b.parentElement();
_67a=_67c==this.textbox&&_67b.text.length==0;
}else{
_67a=this.textbox.selectionStart==this.textbox.selectionEnd;
}
if(_67a){
dijit.selectInputText(this.textbox);
}
});
}
this._updatePlaceHolder();
this.inherited(arguments);
this._refreshState();
},reset:function(){
this.textbox.value="";
this.inherited(arguments);
}});
dijit.selectInputText=function(_67d,_67e,stop){
var _67f=dojo.global;
var _680=dojo.doc;
_67d=dojo.byId(_67d);
if(isNaN(_67e)){
_67e=0;
}
if(isNaN(stop)){
stop=_67d.value?_67d.value.length:0;
}
dijit.focus(_67d);
if(_680["selection"]&&dojo.body()["createTextRange"]){
if(_67d.createTextRange){
var r=_67d.createTextRange();
r.collapse(true);
r.moveStart("character",-99999);
r.moveStart("character",_67e);
r.moveEnd("character",stop-_67e);
r.select();
}
}else{
if(_67f["getSelection"]){
if(_67d.setSelectionRange){
_67d.setSelectionRange(_67e,stop);
}
}
}
};
dojo.provide("dijit.form.ValidationTextBox");
dojo.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:dojo.cache("dijit.form","templates/ValidationTextBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"),baseClass:"dijitTextBox dijitValidationTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",message:"",constraints:{},regExp:".*",regExpGen:function(_681){
return this.regExp;
},state:"",tooltipPosition:[],_setValueAttr:function(){
this.inherited(arguments);
this.validate(this._focused);
},validator:function(_682,_683){
return (new RegExp("^(?:"+this.regExpGen(_683)+")"+(this.required?"":"?")+"$")).test(_682)&&(!this.required||!this._isEmpty(_682))&&(this._isEmpty(_682)||this.parse(_682,_683)!==undefined);
},_isValidSubset:function(){
return this.textbox.value.search(this._partialre)==0;
},isValid:function(_684){
return this.validator(this.textbox.value,this.constraints);
},_isEmpty:function(_685){
return (this.trim?/^\s*$/:/^$/).test(_685);
},getErrorMessage:function(_686){
return (this.required&&this._isEmpty(this.textbox.value))?this.missingMessage:this.invalidMessage;
},getPromptMessage:function(_687){
return this.promptMessage;
},_maskValidSubsetError:true,validate:function(_688){
var _689="";
var _68a=this.disabled||this.isValid(_688);
if(_68a){
this._maskValidSubsetError=true;
}
var _68b=this._isEmpty(this.textbox.value);
var _68c=!_68a&&_688&&this._isValidSubset();
this._set("state",_68a?"":(((((!this._hasBeenBlurred||_688)&&_68b)||_68c)&&this._maskValidSubsetError)?"Incomplete":"Error"));
dijit.setWaiState(this.focusNode,"invalid",_68a?"false":"true");
if(this.state=="Error"){
this._maskValidSubsetError=_688&&_68c;
_689=this.getErrorMessage(_688);
}else{
if(this.state=="Incomplete"){
_689=this.getPromptMessage(_688);
this._maskValidSubsetError=!this._hasBeenBlurred||_688;
}else{
if(_68b){
_689=this.getPromptMessage(_688);
}
}
}
this.set("message",_689);
return _68a;
},displayMessage:function(_68d){
dijit.hideTooltip(this.domNode);
if(_68d&&this._focused){
dijit.showTooltip(_68d,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}
},_refreshState:function(){
this.validate(this._focused);
this.inherited(arguments);
},constructor:function(){
this.constraints={};
},_setConstraintsAttr:function(_68e){
if(!_68e.locale&&this.lang){
_68e.locale=this.lang;
}
this._set("constraints",_68e);
this._computePartialRE();
},_computePartialRE:function(){
var p=this.regExpGen(this.constraints);
this.regExp=p;
var _68f="";
if(p!=".*"){
this.regExp.replace(/\\.|\[\]|\[.*?[^\\]{1}\]|\{.*?\}|\(\?[=:!]|./g,function(re){
switch(re.charAt(0)){
case "{":
case "+":
case "?":
case "*":
case "^":
case "$":
case "|":
case "(":
_68f+=re;
break;
case ")":
_68f+="|$)";
break;
default:
_68f+="(?:"+re+"|$)";
break;
}
});
}
try{
"".search(_68f);
}
catch(e){
_68f=this.regExp;
}
this._partialre="^(?:"+_68f+")$";
},postMixInProperties:function(){
this.inherited(arguments);
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){
this.invalidMessage=this.messages.invalidMessage;
}
if(!this.invalidMessage){
this.invalidMessage=this.promptMessage;
}
if(this.missingMessage=="$_unset_$"){
this.missingMessage=this.messages.missingMessage;
}
if(!this.missingMessage){
this.missingMessage=this.invalidMessage;
}
this._setConstraintsAttr(this.constraints);
},_setDisabledAttr:function(_690){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_691){
this._set("required",_691);
dijit.setWaiState(this.focusNode,"required",_691);
this._refreshState();
},_setMessageAttr:function(_692){
this._set("message",_692);
this.displayMessage(_692);
},reset:function(){
this._maskValidSubsetError=true;
this.inherited(arguments);
},_onBlur:function(){
this.displayMessage("");
this.inherited(arguments);
}});
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{postMixInProperties:function(){
this.inherited(arguments);
this.nameAttrSetting="";
},serialize:function(val,_693){
return val.toString?val.toString():"";
},toString:function(){
var val=this.filter(this.get("value"));
return val!=null?(typeof val=="string"?val:this.serialize(val,this.constraints)):"";
},validate:function(){
this.valueNode.value=this.toString();
return this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.valueNode=dojo.place("<input type='hidden'"+(this.name?" name='"+this.name.replace(/'/g,"&quot;")+"'":"")+"/>",this.textbox,"after");
},reset:function(){
this.valueNode.value="";
this.inherited(arguments);
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",rangeCheck:function(_694,_695){
return ("min" in _695?(this.compare(_694,_695.min)>=0):true)&&("max" in _695?(this.compare(_694,_695.max)<=0):true);
},isInRange:function(_696){
return this.rangeCheck(this.get("value"),this.constraints);
},_isDefinitelyOutOfRange:function(){
var val=this.get("value");
var _697=false;
var _698=false;
if("min" in this.constraints){
var min=this.constraints.min;
min=this.compare(val,((typeof min=="number")&&min>=0&&val!=0)?0:min);
_697=(typeof min=="number")&&min<0;
}
if("max" in this.constraints){
var max=this.constraints.max;
max=this.compare(val,((typeof max!="number")||max>0)?max:0);
_698=(typeof max=="number")&&max>0;
}
return _697||_698;
},_isValidSubset:function(){
return this.inherited(arguments)&&!this._isDefinitelyOutOfRange();
},isValid:function(_699){
return this.inherited(arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(_699));
},getErrorMessage:function(_69a){
var v=this.get("value");
if(v!==null&&v!==""&&v!==undefined&&(typeof v!="number"||!isNaN(v))&&!this.isInRange(_69a)){
return this.rangeMessage;
}
return this.inherited(arguments);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.rangeMessage){
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage;
}
},_setConstraintsAttr:function(_69b){
this.inherited(arguments);
if(this.focusNode){
if(this.constraints.min!==undefined){
dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min);
}else{
dijit.removeWaiState(this.focusNode,"valuemin");
}
if(this.constraints.max!==undefined){
dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max);
}else{
dijit.removeWaiState(this.focusNode,"valuemax");
}
}
},_setValueAttr:function(_69c,_69d){
dijit.setWaiState(this.focusNode,"valuenow",_69c);
this.inherited(arguments);
}});
dojo.provide("dojo.data.util.sorter");
dojo.getObject("data.util.sorter",true,dojo);
dojo.data.util.sorter.basicComparator=function(a,b){
var r=-1;
if(a===null){
a=undefined;
}
if(b===null){
b=undefined;
}
if(a==b){
r=0;
}else{
if(a>b||a==null){
r=1;
}
}
return r;
};
dojo.data.util.sorter.createSortFunction=function(_69e,_69f){
var _6a0=[];
function _6a1(attr,dir,comp,s){
return function(_6a2,_6a3){
var a=s.getValue(_6a2,attr);
var b=s.getValue(_6a3,attr);
return dir*comp(a,b);
};
};
var _6a4;
var map=_69f.comparatorMap;
var bc=dojo.data.util.sorter.basicComparator;
for(var i=0;i<_69e.length;i++){
_6a4=_69e[i];
var attr=_6a4.attribute;
if(attr){
var dir=(_6a4.descending)?-1:1;
var comp=bc;
if(map){
if(typeof attr!=="string"&&("toString" in attr)){
attr=attr.toString();
}
comp=map[attr]||bc;
}
_6a0.push(_6a1(attr,dir,comp,_69f));
}
}
return function(rowA,rowB){
var i=0;
while(i<_6a0.length){
var ret=_6a0[i++](rowA,rowB);
if(ret!==0){
return ret;
}
}
return 0;
};
};
dojo.provide("dijit.form._FormSelectWidget");
dojo.declare("dijit.form._FormSelectWidget",dijit.form._FormValueWidget,{multiple:false,options:null,store:null,query:null,queryOptions:null,onFetch:null,sortByLabel:true,loadChildrenOnOpen:false,getOptions:function(_6a5){
var _6a6=_6a5,opts=this.options||[],l=opts.length;
if(_6a6===undefined){
return opts;
}
if(dojo.isArray(_6a6)){
return dojo.map(_6a6,"return this.getOptions(item);",this);
}
if(dojo.isObject(_6a5)){
if(!dojo.some(this.options,function(o,idx){
if(o===_6a6||(o.value&&o.value===_6a6.value)){
_6a6=idx;
return true;
}
return false;
})){
_6a6=-1;
}
}
if(typeof _6a6=="string"){
for(var i=0;i<l;i++){
if(opts[i].value===_6a6){
_6a6=i;
break;
}
}
}
if(typeof _6a6=="number"&&_6a6>=0&&_6a6<l){
return this.options[_6a6];
}
return null;
},addOption:function(_6a7){
if(!dojo.isArray(_6a7)){
_6a7=[_6a7];
}
dojo.forEach(_6a7,function(i){
if(i&&dojo.isObject(i)){
this.options.push(i);
}
},this);
this._loadChildren();
},removeOption:function(_6a8){
if(!dojo.isArray(_6a8)){
_6a8=[_6a8];
}
var _6a9=this.getOptions(_6a8);
dojo.forEach(_6a9,function(i){
if(i){
this.options=dojo.filter(this.options,function(node,idx){
return (node.value!==i.value||node.label!==i.label);
});
this._removeOptionItem(i);
}
},this);
this._loadChildren();
},updateOption:function(_6aa){
if(!dojo.isArray(_6aa)){
_6aa=[_6aa];
}
dojo.forEach(_6aa,function(i){
var _6ab=this.getOptions(i),k;
if(_6ab){
for(k in i){
_6ab[k]=i[k];
}
}
},this);
this._loadChildren();
},setStore:function(_6ac,_6ad,_6ae){
var _6af=this.store;
_6ae=_6ae||{};
if(_6af!==_6ac){
dojo.forEach(this._notifyConnections||[],dojo.disconnect);
delete this._notifyConnections;
if(_6ac&&_6ac.getFeatures()["dojo.data.api.Notification"]){
this._notifyConnections=[dojo.connect(_6ac,"onNew",this,"_onNewItem"),dojo.connect(_6ac,"onDelete",this,"_onDeleteItem"),dojo.connect(_6ac,"onSet",this,"_onSetItem")];
}
this._set("store",_6ac);
}
this._onChangeActive=false;
if(this.options&&this.options.length){
this.removeOption(this.options);
}
if(_6ac){
this._loadingStore=true;
_6ac.fetch(dojo.delegate(_6ae,{onComplete:function(_6b0,opts){
if(this.sortByLabel&&!_6ae.sort&&_6b0.length){
_6b0.sort(dojo.data.util.sorter.createSortFunction([{attribute:_6ac.getLabelAttributes(_6b0[0])[0]}],_6ac));
}
if(_6ae.onFetch){
_6b0=_6ae.onFetch.call(this,_6b0,opts);
}
dojo.forEach(_6b0,function(i){
this._addOptionForItem(i);
},this);
this._loadingStore=false;
this.set("value","_pendingValue" in this?this._pendingValue:_6ad);
delete this._pendingValue;
if(!this.loadChildrenOnOpen){
this._loadChildren();
}else{
this._pseudoLoadChildren(_6b0);
}
this._fetchedWith=opts;
this._lastValueReported=this.multiple?[]:null;
this._onChangeActive=true;
this.onSetStore();
this._handleOnChange(this.value);
},scope:this}));
}else{
delete this._fetchedWith;
}
return _6af;
},_setValueAttr:function(_6b1,_6b2){
if(this._loadingStore){
this._pendingValue=_6b1;
return;
}
var opts=this.getOptions()||[];
if(!dojo.isArray(_6b1)){
_6b1=[_6b1];
}
dojo.forEach(_6b1,function(i,idx){
if(!dojo.isObject(i)){
i=i+"";
}
if(typeof i==="string"){
_6b1[idx]=dojo.filter(opts,function(node){
return node.value===i;
})[0]||{value:"",label:""};
}
},this);
_6b1=dojo.filter(_6b1,function(i){
return i&&i.value;
});
if(!this.multiple&&(!_6b1[0]||!_6b1[0].value)&&opts.length){
_6b1[0]=opts[0];
}
dojo.forEach(opts,function(i){
i.selected=dojo.some(_6b1,function(v){
return v.value===i.value;
});
});
var val=dojo.map(_6b1,function(i){
return i.value;
}),disp=dojo.map(_6b1,function(i){
return i.label;
});
this._set("value",this.multiple?val:val[0]);
this._setDisplay(this.multiple?disp:disp[0]);
this._updateSelection();
this._handleOnChange(this.value,_6b2);
},_getDisplayedValueAttr:function(){
var val=this.get("value");
if(!dojo.isArray(val)){
val=[val];
}
var ret=dojo.map(this.getOptions(val),function(v){
if(v&&"label" in v){
return v.label;
}else{
if(v){
return v.value;
}
}
return null;
},this);
return this.multiple?ret:ret[0];
},_loadChildren:function(){
if(this._loadingStore){
return;
}
dojo.forEach(this._getChildren(),function(_6b3){
_6b3.destroyRecursive();
});
dojo.forEach(this.options,this._addOptionItem,this);
this._updateSelection();
},_updateSelection:function(){
this._set("value",this._getValueFromOpts());
var val=this.value;
if(!dojo.isArray(val)){
val=[val];
}
if(val&&val[0]){
dojo.forEach(this._getChildren(),function(_6b4){
var _6b5=dojo.some(val,function(v){
return _6b4.option&&(v===_6b4.option.value);
});
dojo.toggleClass(_6b4.domNode,this.baseClass+"SelectedOption",_6b5);
dijit.setWaiState(_6b4.domNode,"selected",_6b5);
},this);
}
},_getValueFromOpts:function(){
var opts=this.getOptions()||[];
if(!this.multiple&&opts.length){
var opt=dojo.filter(opts,function(i){
return i.selected;
})[0];
if(opt&&opt.value){
return opt.value;
}else{
opts[0].selected=true;
return opts[0].value;
}
}else{
if(this.multiple){
return dojo.map(dojo.filter(opts,function(i){
return i.selected;
}),function(i){
return i.value;
})||[];
}
}
return "";
},_onNewItem:function(item,_6b6){
if(!_6b6||!_6b6.parent){
this._addOptionForItem(item);
}
},_onDeleteItem:function(item){
var _6b7=this.store;
this.removeOption(_6b7.getIdentity(item));
},_onSetItem:function(item){
this.updateOption(this._getOptionObjForItem(item));
},_getOptionObjForItem:function(item){
var _6b8=this.store,_6b9=_6b8.getLabel(item),_6ba=(_6b9?_6b8.getIdentity(item):null);
return {value:_6ba,label:_6b9,item:item};
},_addOptionForItem:function(item){
var _6bb=this.store;
if(!_6bb.isItemLoaded(item)){
_6bb.loadItem({item:item,onComplete:function(i){
this._addOptionForItem(item);
},scope:this});
return;
}
var _6bc=this._getOptionObjForItem(item);
this.addOption(_6bc);
},constructor:function(_6bd){
this._oValue=(_6bd||{}).value||null;
},buildRendering:function(){
this.inherited(arguments);
dojo.setSelectable(this.focusNode,false);
},_fillContent:function(){
var opts=this.options;
if(!opts){
opts=this.options=this.srcNodeRef?dojo.query(">",this.srcNodeRef).map(function(node){
if(node.getAttribute("type")==="separator"){
return {value:"",label:"",selected:false,disabled:false};
}
return {value:(node.getAttribute("data-"+dojo._scopeName+"-value")||node.getAttribute("value")),label:String(node.innerHTML),selected:node.getAttribute("selected")||false,disabled:node.getAttribute("disabled")||false};
},this):[];
}
if(!this.value){
this._set("value",this._getValueFromOpts());
}else{
if(this.multiple&&typeof this.value=="string"){
this_set("value",this.value.split(","));
}
}
},postCreate:function(){
this.inherited(arguments);
this.connect(this,"onChange","_updateSelection");
this.connect(this,"startup","_loadChildren");
this._setValueAttr(this.value,null);
},startup:function(){
this.inherited(arguments);
var _6be=this.store,_6bf={};
dojo.forEach(["query","queryOptions","onFetch"],function(i){
if(this[i]){
_6bf[i]=this[i];
}
delete this[i];
},this);
if(_6be&&_6be.getFeatures()["dojo.data.api.Identity"]){
this.store=null;
this.setStore(_6be,this._oValue,_6bf);
}
},destroy:function(){
dojo.forEach(this._notifyConnections||[],dojo.disconnect);
this.inherited(arguments);
},_addOptionItem:function(_6c0){
},_removeOptionItem:function(_6c1){
},_setDisplay:function(_6c2){
},_getChildren:function(){
return [];
},_getSelectedOptionsAttr:function(){
return this.getOptions(this.get("value"));
},_pseudoLoadChildren:function(_6c3){
},onSetStore:function(){
}});
dojo.provide("dijit.MenuItem");
dojo.declare("dijit.MenuItem",[dijit._Widget,dijit._Templated,dijit._Contained,dijit._CssStateMixin],{templateString:dojo.cache("dijit","templates/MenuItem.html","<tr class=\"dijitReset dijitMenuItem\" dojoAttachPoint=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdojoAttachEvent=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" dojoAttachPoint=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" dojoAttachPoint=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" dojoAttachPoint=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div dojoAttachPoint=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"),attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{label:{node:"containerNode",type:"innerHTML"},iconClass:{node:"iconNode",type:"class"}}),baseClass:"dijitMenuItem",label:"",iconClass:"",accelKey:"",disabled:false,_fillContent:function(_6c4){
if(_6c4&&!("label" in this.params)){
this.set("label",_6c4.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _6c5=this.id+"_text";
dojo.attr(this.containerNode,"id",_6c5);
if(this.accelKeyNode){
dojo.attr(this.accelKeyNode,"id",this.id+"_accel");
_6c5+=" "+this.id+"_accel";
}
dijit.setWaiState(this.domNode,"labelledby",_6c5);
dojo.setSelectable(this.domNode,false);
},_onHover:function(){
this.getParent().onItemHover(this);
},_onUnhover:function(){
this.getParent().onItemUnhover(this);
this._set("hovering",false);
},_onClick:function(evt){
this.getParent().onItemClick(this,evt);
dojo.stopEvent(evt);
},onClick:function(evt){
},focus:function(){
try{
if(dojo.isIE==8){
this.containerNode.focus();
}
dijit.focus(this.focusNode);
}
catch(e){
}
},_onFocus:function(){
this._setSelected(true);
this.getParent()._onItemFocus(this);
this.inherited(arguments);
},_setSelected:function(_6c6){
dojo.toggleClass(this.domNode,"dijitMenuItemSelected",_6c6);
},setLabel:function(_6c7){
dojo.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_6c7);
},setDisabled:function(_6c8){
dojo.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_6c8);
},_setDisabledAttr:function(_6c9){
dijit.setWaiState(this.focusNode,"disabled",_6c9?"true":"false");
this._set("disabled",_6c9);
},_setAccelKeyAttr:function(_6ca){
this.accelKeyNode.style.display=_6ca?"":"none";
this.accelKeyNode.innerHTML=_6ca;
dojo.attr(this.containerNode,"colSpan",_6ca?"1":"2");
this._set("accelKey",_6ca);
}});
dojo.provide("dijit.PopupMenuItem");
dojo.declare("dijit.PopupMenuItem",dijit.MenuItem,{_fillContent:function(){
if(this.srcNodeRef){
var _6cb=dojo.query("*",this.srcNodeRef);
dijit.PopupMenuItem.superclass._fillContent.call(this,_6cb[0]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(!this.popup){
var node=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.popup=dijit.byNode(node);
}
dojo.body().appendChild(this.popup.domNode);
this.popup.startup();
this.popup.domNode.style.display="none";
if(this.arrowWrapper){
dojo.style(this.arrowWrapper,"visibility","");
}
dijit.setWaiState(this.focusNode,"haspopup","true");
},destroyDescendants:function(){
if(this.popup){
if(!this.popup._destroyed){
this.popup.destroyRecursive();
}
delete this.popup;
}
this.inherited(arguments);
}});
dojo.provide("dijit.CheckedMenuItem");
dojo.declare("dijit.CheckedMenuItem",dijit.MenuItem,{templateString:dojo.cache("dijit","templates/CheckedMenuItem.html","<tr class=\"dijitReset dijitMenuItem\" dojoAttachPoint=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\"\n\t\tdojoAttachEvent=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" dojoAttachPoint=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" dojoAttachPoint=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" dojoAttachPoint=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&nbsp;</td>\n</tr>\n"),checked:false,_setCheckedAttr:function(_6cc){
dojo.toggleClass(this.domNode,"dijitCheckedMenuItemChecked",_6cc);
dijit.setWaiState(this.domNode,"checked",_6cc);
this._set("checked",_6cc);
},onChange:function(_6cd){
},_onClick:function(e){
if(!this.disabled){
this.set("checked",!this.checked);
this.onChange(this.checked);
}
this.inherited(arguments);
}});
dojo.provide("dijit.MenuSeparator");
dojo.declare("dijit.MenuSeparator",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:dojo.cache("dijit","templates/MenuSeparator.html","<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>\n"),buildRendering:function(){
this.inherited(arguments);
dojo.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
dojo.provide("dijit.Menu");
dojo.declare("dijit._MenuBase",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{parentMenu:null,popupDelay:500,startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_6ce){
_6ce.startup();
});
this.startupKeyNavChildren();
this.inherited(arguments);
},onExecute:function(){
},onCancel:function(_6cf){
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.focusedChild._onClick(evt);
}else{
var _6d0=this._getTopMenu();
if(_6d0&&_6d0._isMenuBar){
_6d0.focusNext();
}
}
},_onPopupHover:function(evt){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _6d1=this.currentPopup.parentMenu;
if(_6d1.focusedChild){
_6d1.focusedChild._setSelected(false);
}
_6d1.focusedChild=this.currentPopup.from_item;
_6d1.focusedChild._setSelected(true);
this._stopPendingCloseTimer(this.currentPopup);
}
},onItemHover:function(item){
if(this.isActive){
this.focusChild(item);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){
this.hover_timer=setTimeout(dojo.hitch(this,"_openPopup"),this.popupDelay);
}
}
if(this.focusedChild){
this.focusChild(item);
}
this._hoveredChild=item;
},_onChildBlur:function(item){
this._stopPopupTimer();
item._setSelected(false);
var _6d2=item.popup;
if(_6d2){
this._stopPendingCloseTimer(_6d2);
_6d2._pendingClose_timer=setTimeout(function(){
_6d2._pendingClose_timer=null;
if(_6d2.parentMenu){
_6d2.parentMenu.currentPopup=null;
}
dijit.popup.close(_6d2);
},this.popupDelay);
}
},onItemUnhover:function(item){
if(this.isActive){
this._stopPopupTimer();
}
if(this._hoveredChild==item){
this._hoveredChild=null;
}
},_stopPopupTimer:function(){
if(this.hover_timer){
clearTimeout(this.hover_timer);
this.hover_timer=null;
}
},_stopPendingCloseTimer:function(_6d3){
if(_6d3._pendingClose_timer){
clearTimeout(_6d3._pendingClose_timer);
_6d3._pendingClose_timer=null;
}
},_stopFocusTimer:function(){
if(this._focus_timer){
clearTimeout(this._focus_timer);
this._focus_timer=null;
}
},_getTopMenu:function(){
for(var top=this;top.parentMenu;top=top.parentMenu){
}
return top;
},onItemClick:function(item,evt){
if(typeof this.isShowingNow=="undefined"){
this._markActive();
}
this.focusChild(item);
if(item.disabled){
return false;
}
if(item.popup){
this._openPopup();
}else{
this.onExecute();
item.onClick(evt);
}
},_openPopup:function(){
this._stopPopupTimer();
var _6d4=this.focusedChild;
if(!_6d4){
return;
}
var _6d5=_6d4.popup;
if(_6d5.isShowingNow){
return;
}
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
dijit.popup.close(this.currentPopup);
}
_6d5.parentMenu=this;
_6d5.from_item=_6d4;
var self=this;
dijit.popup.open({parent:this,popup:_6d5,around:_6d4.domNode,orient:this._orient||(this.isLeftToRight()?{"TR":"TL","TL":"TR","BR":"BL","BL":"BR"}:{"TL":"TR","TR":"TL","BL":"BR","BR":"BL"}),onCancel:function(){
self.focusChild(_6d4);
self._cleanUp();
_6d4._setSelected(true);
self.focusedChild=_6d4;
},onExecute:dojo.hitch(this,"_cleanUp")});
this.currentPopup=_6d5;
_6d5.connect(_6d5.domNode,"onmouseenter",dojo.hitch(self,"_onPopupHover"));
if(_6d5.focus){
_6d5._focus_timer=setTimeout(dojo.hitch(_6d5,function(){
this._focus_timer=null;
this.focus();
}),0);
}
},_markActive:function(){
this.isActive=true;
dojo.replaceClass(this.domNode,"dijitMenuActive","dijitMenuPassive");
},onOpen:function(e){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
dojo.replaceClass(this.domNode,"dijitMenuPassive","dijitMenuActive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
var _6d6=this.focusedChild&&this.focusedChild.from_item;
if(this.currentPopup){
if(dijit._curFocus&&dojo.isDescendant(dijit._curFocus,this.currentPopup.domNode)){
this.focusedChild.focusNode.focus();
}
dijit.popup.close(this.currentPopup);
this.currentPopup=null;
}
if(this.focusedChild){
this.focusedChild._setSelected(false);
this.focusedChild._onUnhover();
this.focusedChild=null;
}
},_onItemFocus:function(item){
if(this._hoveredChild&&this._hoveredChild!=item){
this._hoveredChild._onUnhover();
}
},_onBlur:function(){
this._cleanUp();
this.inherited(arguments);
},_cleanUp:function(){
this._closeChild();
if(typeof this.isShowingNow=="undefined"){
this._markInactive();
}
}});
dojo.declare("dijit.Menu",dijit._MenuBase,{constructor:function(){
this._bindings=[];
},templateString:dojo.cache("dijit","templates/Menu.html","<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" dojoAttachEvent=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" dojoAttachPoint=\"containerNode\"></tbody>\n</table>\n"),baseClass:"dijitMenu",targetNodeIds:[],contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(dojo.body());
}else{
dojo.forEach(this.targetNodeIds,this.bindDomNode,this);
}
var k=dojo.keys,l=this.isLeftToRight();
this._openSubMenuKey=l?k.RIGHT_ARROW:k.LEFT_ARROW;
this._closeSubMenuKey=l?k.LEFT_ARROW:k.RIGHT_ARROW;
this.connectKeyNavHandlers([k.UP_ARROW],[k.DOWN_ARROW]);
},_onKeyPress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
switch(evt.charOrCode){
case this._openSubMenuKey:
this._moveToPopup(evt);
dojo.stopEvent(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
dojo.stopEvent(evt);
}
break;
}
},_iframeContentWindow:function(_6d7){
var win=dojo.window.get(this._iframeContentDocument(_6d7))||this._iframeContentDocument(_6d7)["__parent__"]||(_6d7.name&&dojo.doc.frames[_6d7.name])||null;
return win;
},_iframeContentDocument:function(_6d8){
var doc=_6d8.contentDocument||(_6d8.contentWindow&&_6d8.contentWindow.document)||(_6d8.name&&dojo.doc.frames[_6d8.name]&&dojo.doc.frames[_6d8.name].document)||null;
return doc;
},bindDomNode:function(node){
node=dojo.byId(node);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _6d9=node,win=this._iframeContentWindow(_6d9);
cn=dojo.withGlobal(win,dojo.body);
}else{
cn=(node==dojo.body()?dojo.doc.documentElement:node);
}
var _6da={node:node,iframe:_6d9};
dojo.attr(node,"_dijitMenu"+this.id,this._bindings.push(_6da));
var _6db=dojo.hitch(this,function(cn){
return [dojo.connect(cn,this.leftClickToOpen?"onclick":"oncontextmenu",this,function(evt){
dojo.stopEvent(evt);
this._scheduleOpen(evt.target,_6d9,{x:evt.pageX,y:evt.pageY});
}),dojo.connect(cn,"onkeydown",this,function(evt){
if(evt.shiftKey&&evt.keyCode==dojo.keys.F10){
dojo.stopEvent(evt);
this._scheduleOpen(evt.target,_6d9);
}
})];
});
_6da.connects=cn?_6db(cn):[];
if(_6d9){
_6da.onloadHandler=dojo.hitch(this,function(){
var win=this._iframeContentWindow(_6d9);
cn=dojo.withGlobal(win,dojo.body);
_6da.connects=_6db(cn);
});
if(_6d9.addEventListener){
_6d9.addEventListener("load",_6da.onloadHandler,false);
}else{
_6d9.attachEvent("onload",_6da.onloadHandler);
}
}
},unBindDomNode:function(_6dc){
var node;
try{
node=dojo.byId(_6dc);
}
catch(e){
return;
}
var _6dd="_dijitMenu"+this.id;
if(node&&dojo.hasAttr(node,_6dd)){
var bid=dojo.attr(node,_6dd)-1,b=this._bindings[bid];
dojo.forEach(b.connects,dojo.disconnect);
var _6de=b.iframe;
if(_6de){
if(_6de.removeEventListener){
_6de.removeEventListener("load",b.onloadHandler,false);
}else{
_6de.detachEvent("onload",b.onloadHandler);
}
}
dojo.removeAttr(node,_6dd);
delete this._bindings[bid];
}
},_scheduleOpen:function(_6df,_6e0,_6e1){
if(!this._openTimer){
this._openTimer=setTimeout(dojo.hitch(this,function(){
delete this._openTimer;
this._openMyself({target:_6df,iframe:_6e0,coords:_6e1});
}),1);
}
},_openMyself:function(args){
var _6e2=args.target,_6e3=args.iframe,_6e4=args.coords;
if(_6e4){
if(_6e3){
var od=_6e2.ownerDocument,ifc=dojo.position(_6e3,true),win=this._iframeContentWindow(_6e3),_6e5=dojo.withGlobal(win,"_docScroll",dojo);
var cs=dojo.getComputedStyle(_6e3),tp=dojo._toPixelValue,left=(dojo.isIE&&dojo.isQuirks?0:tp(_6e3,cs.paddingLeft))+(dojo.isIE&&dojo.isQuirks?tp(_6e3,cs.borderLeftWidth):0),top=(dojo.isIE&&dojo.isQuirks?0:tp(_6e3,cs.paddingTop))+(dojo.isIE&&dojo.isQuirks?tp(_6e3,cs.borderTopWidth):0);
_6e4.x+=ifc.x+left-_6e5.x;
_6e4.y+=ifc.y+top-_6e5.y;
}
}else{
_6e4=dojo.position(_6e2,true);
_6e4.x+=10;
_6e4.y+=10;
}
var self=this;
var _6e6=dijit.getFocus(this);
function _6e7(){
if(self.refocus){
dijit.focus(_6e6);
}
dijit.popup.close(self);
};
dijit.popup.open({popup:this,x:_6e4.x,y:_6e4.y,onExecute:_6e7,onCancel:_6e7,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
dijit.popup.close(this);
};
},uninitialize:function(){
dojo.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
dojo.provide("dijit.form.Select");
dojo.declare("dijit.form._SelectMenu",dijit.Menu,{buildRendering:function(){
this.inherited(arguments);
var o=(this.menuTableNode=this.domNode);
var n=(this.domNode=dojo.create("div",{style:{overflowX:"hidden",overflowY:"scroll"}}));
if(o.parentNode){
o.parentNode.replaceChild(n,o);
}
dojo.removeClass(o,"dijitMenuTable");
n.className=o.className+" dijitSelectMenu";
o.className="dijitReset dijitMenuTable";
dijit.setWaiRole(o,"listbox");
dijit.setWaiRole(n,"presentation");
n.appendChild(o);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmousemove",dojo.stopEvent);
},resize:function(mb){
if(mb){
dojo.marginBox(this.domNode,mb);
if("w" in mb){
this.menuTableNode.style.width="100%";
}
}
}});
dojo.declare("dijit.form.Select",[dijit.form._FormSelectWidget,dijit._HasDropDown],{baseClass:"dijitSelect",templateString:dojo.cache("dijit.form","templates/Select.html","<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdojoAttachPoint=\"_buttonNode,tableNode,focusNode\" cellspacing='0' cellpadding='0'\n\trole=\"combobox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents dijitButtonNode\" role=\"presentation\"\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"  dojoAttachPoint=\"containerNode,_popupStateNode\"></span\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} dojoAttachPoint=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\t\tdojoAttachPoint=\"titleNode\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t></tr></tbody\n></table>\n"),attributeMap:dojo.mixin(dojo.clone(dijit.form._FormSelectWidget.prototype.attributeMap),{style:"tableNode"}),required:false,state:"",message:"",tooltipPosition:[],emptyLabel:"&nbsp;",_isLoaded:false,_childrenLoaded:false,_fillContent:function(){
this.inherited(arguments);
if(this.options.length&&!this.value&&this.srcNodeRef){
var si=this.srcNodeRef.selectedIndex||0;
this.value=this.options[si>=0?si:0].value;
}
this.dropDown=new dijit.form._SelectMenu({id:this.id+"_menu"});
dojo.addClass(this.dropDown.domNode,this.baseClass+"Menu");
},_getMenuItemForOption:function(_6e8){
if(!_6e8.value&&!_6e8.label){
return new dijit.MenuSeparator();
}else{
var _6e9=dojo.hitch(this,"_setValueAttr",_6e8);
var item=new dijit.MenuItem({option:_6e8,label:_6e8.label||this.emptyLabel,onClick:_6e9,disabled:_6e8.disabled||false});
dijit.setWaiRole(item.focusNode,"listitem");
return item;
}
},_addOptionItem:function(_6ea){
if(this.dropDown){
this.dropDown.addChild(this._getMenuItemForOption(_6ea));
}
},_getChildren:function(){
if(!this.dropDown){
return [];
}
return this.dropDown.getChildren();
},_loadChildren:function(_6eb){
if(_6eb===true){
if(this.dropDown){
delete this.dropDown.focusedChild;
}
if(this.options.length){
this.inherited(arguments);
}else{
dojo.forEach(this._getChildren(),function(_6ec){
_6ec.destroyRecursive();
});
var item=new dijit.MenuItem({label:"&nbsp;"});
this.dropDown.addChild(item);
}
}else{
this._updateSelection();
}
this._isLoaded=false;
this._childrenLoaded=true;
if(!this._loadingStore){
this._setValueAttr(this.value);
}
},_setValueAttr:function(_6ed){
this.inherited(arguments);
dojo.attr(this.valueNode,"value",this.get("value"));
},_setDisplay:function(_6ee){
var lbl=_6ee||this.emptyLabel;
this.containerNode.innerHTML="<span class=\"dijitReset dijitInline "+this.baseClass+"Label\">"+lbl+"</span>";
dijit.setWaiState(this.focusNode,"valuetext",lbl);
},validate:function(_6ef){
var _6f0=this.isValid(_6ef);
this._set("state",_6f0?"":"Error");
dijit.setWaiState(this.focusNode,"invalid",_6f0?"false":"true");
var _6f1=_6f0?"":this._missingMsg;
if(this.message!==_6f1){
this._set("message",_6f1);
dijit.hideTooltip(this.domNode);
if(_6f1){
dijit.showTooltip(_6f1,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}
}
return _6f0;
},isValid:function(_6f2){
return (!this.required||this.value===0||!(/^\s*$/.test(this.value||"")));
},reset:function(){
this.inherited(arguments);
dijit.hideTooltip(this.domNode);
this._set("state","");
this._set("message","");
},postMixInProperties:function(){
this.inherited(arguments);
this._missingMsg=dojo.i18n.getLocalization("dijit.form","validate",this.lang).missingMessage;
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmousemove",dojo.stopEvent);
},_setStyleAttr:function(_6f3){
this.inherited(arguments);
dojo.toggleClass(this.domNode,this.baseClass+"FixedWidth",!!this.tableNode.style.width);
},isLoaded:function(){
return this._isLoaded;
},loadDropDown:function(_6f4){
this._loadChildren(true);
this._isLoaded=true;
_6f4();
},closeDropDown:function(){
this.inherited(arguments);
if(this.dropDown&&this.dropDown.menuTableNode){
this.dropDown.menuTableNode.style.width="";
}
},uninitialize:function(_6f5){
if(this.dropDown&&!this.dropDown._destroyed){
this.dropDown.destroyRecursive(_6f5);
delete this.dropDown;
}
this.inherited(arguments);
}});
dojo.provide("dijit._editor.plugins.LinkDialog");
dojo.declare("dijit._editor.plugins.LinkDialog",dijit._editor._Plugin,{buttonClass:dijit.form.DropDownButton,useDefaultCommand:false,urlRegExp:"((https?|ftps?|file)\\://|./|/|)(/[a-zA-Z]{1,1}:/|)(((?:(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)\\.)*(?:[a-zA-Z](?:[-\\da-zA-Z]{0,80}[\\da-zA-Z])?)\\.?)|(((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])|(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]|(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]|(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])|0[xX]0*[\\da-fA-F]{1,8}|([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}|([\\da-fA-F]{1,4}\\:){6}((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])))(\\:\\d+)?(/(?:[^?#\\s/]+/)*(?:[^?#\\s/]{0,}(?:\\?[^?#\\s/]*)?(?:#.*)?)?)?",emailRegExp:"<?(mailto\\:)([!#-'*+\\-\\/-9=?A-Z^-~]+[.])*[!#-'*+\\-\\/-9=?A-Z^-~]+"+"@"+"((?:(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)\\.)+(?:[a-zA-Z](?:[-\\da-zA-Z]{0,6}[\\da-zA-Z])?)\\.?)|localhost|^[^-][a-zA-Z0-9_-]*>?",htmlTemplate:"<a href=\"${urlInput}\" _djrealurl=\"${urlInput}\""+" target=\"${targetSelect}\""+">${textInput}</a>",tag:"a",_hostRxp:new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),_userAtRxp:new RegExp("^([!#-'*+\\-\\/-9=?A-Z^-~]+[.])*[!#-'*+\\-\\/-9=?A-Z^-~]+@","i"),linkDialogTemplate:["<table><tr><td>","<label for='${id}_urlInput'>${url}</label>","</td><td>","<input dojoType='dijit.form.ValidationTextBox' required='true' "+"id='${id}_urlInput' name='urlInput' intermediateChanges='true'/>","</td></tr><tr><td>","<label for='${id}_textInput'>${text}</label>","</td><td>","<input dojoType='dijit.form.ValidationTextBox' required='true' id='${id}_textInput' "+"name='textInput' intermediateChanges='true'/>","</td></tr><tr><td>","<label for='${id}_targetSelect'>${target}</label>","</td><td>","<select id='${id}_targetSelect' name='targetSelect' dojoType='dijit.form.Select'>","<option selected='selected' value='_self'>${currentWindow}</option>","<option value='_blank'>${newWindow}</option>","<option value='_top'>${topWindow}</option>","<option value='_parent'>${parentWindow}</option>","</select>","</td></tr><tr><td colspan='2'>","<button dojoType='dijit.form.Button' type='submit' id='${id}_setButton'>${set}</button>","<button dojoType='dijit.form.Button' type='button' id='${id}_cancelButton'>${buttonCancel}</button>","</td></tr></table>"].join(""),_initButton:function(){
var _6f6=this;
this.tag=this.command=="insertImage"?"img":"a";
var _6f7=dojo.mixin(dojo.i18n.getLocalization("dijit","common",this.lang),dojo.i18n.getLocalization("dijit._editor","LinkDialog",this.lang));
var _6f8=(this.dropDown=new dijit.TooltipDialog({title:_6f7[this.command+"Title"],execute:dojo.hitch(this,"setValue"),onOpen:function(){
_6f6._onOpenDialog();
dijit.TooltipDialog.prototype.onOpen.apply(this,arguments);
},onCancel:function(){
setTimeout(dojo.hitch(_6f6,"_onCloseDialog"),0);
}}));
_6f7.urlRegExp=this.urlRegExp;
_6f7.id=dijit.getUniqueId(this.editor.id);
this._uniqueId=_6f7.id;
this._setContent(_6f8.title+"<div style='border-bottom: 1px black solid;padding-bottom:2pt;margin-bottom:4pt'></div>"+dojo.string.substitute(this.linkDialogTemplate,_6f7));
_6f8.startup();
this._urlInput=dijit.byId(this._uniqueId+"_urlInput");
this._textInput=dijit.byId(this._uniqueId+"_textInput");
this._setButton=dijit.byId(this._uniqueId+"_setButton");
this.connect(dijit.byId(this._uniqueId+"_cancelButton"),"onClick",function(){
this.dropDown.onCancel();
});
if(this._urlInput){
this.connect(this._urlInput,"onChange","_checkAndFixInput");
}
if(this._textInput){
this.connect(this._textInput,"onChange","_checkAndFixInput");
}
this._urlRegExp=new RegExp("^"+this.urlRegExp+"$","i");
this._emailRegExp=new RegExp("^"+this.emailRegExp+"$","i");
this._urlInput.isValid=dojo.hitch(this,function(){
var _6f9=this._urlInput.get("value");
return this._urlRegExp.test(_6f9)||this._emailRegExp.test(_6f9);
});
this._connectTagEvents();
this.inherited(arguments);
},_checkAndFixInput:function(){
var self=this;
var url=this._urlInput.get("value");
var _6fa=function(url){
var _6fb=false;
var _6fc=false;
if(url&&url.length>1){
url=dojo.trim(url);
if(url.indexOf("mailto:")!==0){
if(url.indexOf("/")>0){
if(url.indexOf("://")===-1){
if(url.charAt(0)!=="/"&&url.indexOf("./")!==0){
if(self._hostRxp.test(url)){
_6fb=true;
}
}
}
}else{
if(self._userAtRxp.test(url)){
_6fc=true;
}
}
}
}
if(_6fb){
self._urlInput.set("value","http://"+url);
}
if(_6fc){
self._urlInput.set("value","mailto:"+url);
}
self._setButton.set("disabled",!self._isValid());
};
if(this._delayedCheck){
clearTimeout(this._delayedCheck);
this._delayedCheck=null;
}
this._delayedCheck=setTimeout(function(){
_6fa(url);
},250);
},_connectTagEvents:function(){
this.editor.onLoadDeferred.addCallback(dojo.hitch(this,function(){
this.connect(this.editor.editNode,"ondblclick",this._onDblClick);
}));
},_isValid:function(){
return this._urlInput.isValid()&&this._textInput.isValid();
},_setContent:function(_6fd){
this.dropDown.set({parserScope:"dojo",content:_6fd});
},_checkValues:function(args){
if(args&&args.urlInput){
args.urlInput=args.urlInput.replace(/"/g,"&quot;");
}
return args;
},setValue:function(args){
this._onCloseDialog();
if(dojo.isIE){
var sel=dijit.range.getSelection(this.editor.window);
var _6fe=sel.getRangeAt(0);
var a=_6fe.endContainer;
if(a.nodeType===3){
a=a.parentNode;
}
if(a&&(a.nodeName&&a.nodeName.toLowerCase()!==this.tag)){
a=dojo.withGlobal(this.editor.window,"getSelectedElement",dijit._editor.selection,[this.tag]);
}
if(a&&(a.nodeName&&a.nodeName.toLowerCase()===this.tag)){
if(this.editor.queryCommandEnabled("unlink")){
dojo.withGlobal(this.editor.window,"selectElementChildren",dijit._editor.selection,[a]);
this.editor.execCommand("unlink");
}
}
}
args=this._checkValues(args);
this.editor.execCommand("inserthtml",dojo.string.substitute(this.htmlTemplate,args));
},_onCloseDialog:function(){
this.editor.focus();
},_getCurrentValues:function(a){
var url,text,_6ff;
if(a&&a.tagName.toLowerCase()===this.tag){
url=a.getAttribute("_djrealurl")||a.getAttribute("href");
_6ff=a.getAttribute("target")||"_self";
text=a.textContent||a.innerText;
dojo.withGlobal(this.editor.window,"selectElement",dijit._editor.selection,[a,true]);
}else{
text=dojo.withGlobal(this.editor.window,dijit._editor.selection.getSelectedText);
}
return {urlInput:url||"",textInput:text||"",targetSelect:_6ff||""};
},_onOpenDialog:function(){
var a;
if(dojo.isIE){
var sel=dijit.range.getSelection(this.editor.window);
var _700=sel.getRangeAt(0);
a=_700.endContainer;
if(a.nodeType===3){
a=a.parentNode;
}
if(a&&(a.nodeName&&a.nodeName.toLowerCase()!==this.tag)){
a=dojo.withGlobal(this.editor.window,"getSelectedElement",dijit._editor.selection,[this.tag]);
}
}else{
a=dojo.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,[this.tag]);
}
this.dropDown.reset();
this._setButton.set("disabled",true);
this.dropDown.set("value",this._getCurrentValues(a));
},_onDblClick:function(e){
if(e&&e.target){
var t=e.target;
var tg=t.tagName?t.tagName.toLowerCase():"";
if(tg===this.tag&&dojo.attr(t,"href")){
dojo.withGlobal(this.editor.window,"selectElement",dijit._editor.selection,[t]);
this.editor.onDisplayChanged();
setTimeout(dojo.hitch(this,function(){
this.button.set("disabled",false);
this.button.openDropDown();
}),10);
}
}
}});
dojo.declare("dijit._editor.plugins.ImgLinkDialog",[dijit._editor.plugins.LinkDialog],{linkDialogTemplate:["<table><tr><td>","<label for='${id}_urlInput'>${url}</label>","</td><td>","<input dojoType='dijit.form.ValidationTextBox' regExp='${urlRegExp}' "+"required='true' id='${id}_urlInput' name='urlInput' intermediateChanges='true'/>","</td></tr><tr><td>","<label for='${id}_textInput'>${text}</label>","</td><td>","<input dojoType='dijit.form.ValidationTextBox' required='false' id='${id}_textInput' "+"name='textInput' intermediateChanges='true'/>","</td></tr><tr><td>","</td><td>","</td></tr><tr><td colspan='2'>","<button dojoType='dijit.form.Button' type='submit' id='${id}_setButton'>${set}</button>","<button dojoType='dijit.form.Button' type='button' id='${id}_cancelButton'>${buttonCancel}</button>","</td></tr></table>"].join(""),htmlTemplate:"<img src=\"${urlInput}\" _djrealurl=\"${urlInput}\" alt=\"${textInput}\" />",tag:"img",_getCurrentValues:function(img){
var url,text;
if(img&&img.tagName.toLowerCase()===this.tag){
url=img.getAttribute("_djrealurl")||img.getAttribute("src");
text=img.getAttribute("alt");
dojo.withGlobal(this.editor.window,"selectElement",dijit._editor.selection,[img,true]);
}else{
text=dojo.withGlobal(this.editor.window,dijit._editor.selection.getSelectedText);
}
return {urlInput:url||"",textInput:text||""};
},_isValid:function(){
return this._urlInput.isValid();
},_connectTagEvents:function(){
this.inherited(arguments);
this.editor.onLoadDeferred.addCallback(dojo.hitch(this,function(){
this.connect(this.editor.editNode,"onmousedown",this._selectTag);
}));
},_selectTag:function(e){
if(e&&e.target){
var t=e.target;
var tg=t.tagName?t.tagName.toLowerCase():"";
if(tg===this.tag){
dojo.withGlobal(this.editor.window,"selectElement",dijit._editor.selection,[t]);
}
}
},_checkValues:function(args){
if(args&&args.urlInput){
args.urlInput=args.urlInput.replace(/"/g,"&quot;");
}
if(args&&args.textInput){
args.textInput=args.textInput.replace(/"/g,"&quot;");
}
return args;
},_onDblClick:function(e){
if(e&&e.target){
var t=e.target;
var tg=t.tagName?t.tagName.toLowerCase():"";
if(tg===this.tag&&dojo.attr(t,"src")){
dojo.withGlobal(this.editor.window,"selectElement",dijit._editor.selection,[t]);
this.editor.onDisplayChanged();
setTimeout(dojo.hitch(this,function(){
this.button.set("disabled",false);
this.button.openDropDown();
}),10);
}
}
}});
dojo.subscribe(dijit._scopeName+".Editor.getPlugin",null,function(o){
if(o.plugin){
return;
}
switch(o.args.name){
case "createLink":
o.plugin=new dijit._editor.plugins.LinkDialog({command:o.args.name});
break;
case "insertImage":
o.plugin=new dijit._editor.plugins.ImgLinkDialog({command:o.args.name});
break;
}
});
dojo.provide("dijit.form.ToggleButton");
dojo.provide("dijit.form.CheckBox");
dojo.declare("dijit.form.CheckBox",dijit.form.ToggleButton,{templateString:dojo.cache("dijit.form","templates/CheckBox.html","<div class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><input\n\t \t${!nameAttrSetting} type=\"${type}\" ${checkedAttrSetting}\n\t\tclass=\"dijitReset dijitCheckBoxInput\"\n\t\tdojoAttachPoint=\"focusNode\"\n\t \tdojoAttachEvent=\"onclick:_onClick\"\n/></div>\n"),baseClass:"dijitCheckBox",type:"checkbox",value:"on",readOnly:false,attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{readOnly:"focusNode"}),_setReadOnlyAttr:function(_701){
this._set("readOnly",_701);
dojo.attr(this.focusNode,"readOnly",_701);
dijit.setWaiState(this.focusNode,"readonly",_701);
},_setValueAttr:function(_702,_703){
if(typeof _702=="string"){
this._set("value",_702);
dojo.attr(this.focusNode,"value",_702);
_702=true;
}
if(this._created){
this.set("checked",_702,_703);
}
},_getValueAttr:function(){
return (this.checked?this.value:false);
},_setLabelAttr:undefined,postMixInProperties:function(){
if(this.value==""){
this.value="on";
}
this.checkedAttrSetting=this.checked?"checked":"";
this.inherited(arguments);
},_fillContent:function(_704){
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
this._set("value",this.params.value||"on");
dojo.attr(this.focusNode,"value",this.value);
},_onFocus:function(){
if(this.id){
dojo.query("label[for='"+this.id+"']").addClass("dijitFocusedLabel");
}
this.inherited(arguments);
},_onBlur:function(){
if(this.id){
dojo.query("label[for='"+this.id+"']").removeClass("dijitFocusedLabel");
}
this.inherited(arguments);
},_onClick:function(e){
if(this.readOnly){
dojo.stopEvent(e);
return false;
}
return this.inherited(arguments);
}});
dojo.declare("dijit.form.RadioButton",dijit.form.CheckBox,{type:"radio",baseClass:"dijitRadio",_setCheckedAttr:function(_705){
this.inherited(arguments);
if(!this._created){
return;
}
if(_705){
var _706=this;
dojo.query("INPUT[type=radio]",this.focusNode.form||dojo.doc).forEach(function(_707){
if(_707.name==_706.name&&_707!=_706.focusNode&&_707.form==_706.focusNode.form){
var _708=dijit.getEnclosingWidget(_707);
if(_708&&_708.checked){
_708.set("checked",false);
}
}
});
}
},_clicked:function(e){
if(!this.checked){
this.set("checked",true);
}
}});
dojo.provide("dojo.cldr.supplemental");
dojo.getObject("cldr.supplemental",true,dojo);
dojo.cldr.supplemental.getFirstDayOfWeek=function(_709){
var _70a={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,sy:6,tn:6,ye:6,ar:0,as:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,il:0,"in":0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mn:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,zw:0};
var _70b=dojo.cldr.supplemental._region(_709);
var dow=_70a[_70b];
return (dow===undefined)?1:dow;
};
dojo.cldr.supplemental._region=function(_70c){
_70c=dojo.i18n.normalizeLocale(_70c);
var tags=_70c.split("-");
var _70d=tags[1];
if(!_70d){
_70d={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",he:"il",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[tags[0]];
}else{
if(_70d.length==4){
_70d=tags[2];
}
}
return _70d;
};
dojo.cldr.supplemental.getWeekend=function(_70e){
var _70f={"in":0,af:4,dz:4,ir:4,om:4,sa:4,ye:4,ae:5,bh:5,eg:5,il:5,iq:5,jo:5,kw:5,ly:5,ma:5,qa:5,sd:5,sy:5,tn:5};
var _710={af:5,dz:5,ir:5,om:5,sa:5,ye:5,ae:6,bh:5,eg:6,il:6,iq:6,jo:6,kw:6,ly:6,ma:6,qa:6,sd:6,sy:6,tn:6};
var _711=dojo.cldr.supplemental._region(_70e);
var _712=_70f[_711];
var end=_710[_711];
if(_712===undefined){
_712=6;
}
if(end===undefined){
end=0;
}
return {start:_712,end:end};
};
dojo.provide("dojo.date");
dojo.getObject("date",true,dojo);
dojo.date.getDaysInMonth=function(_713){
var _714=_713.getMonth();
var days=[31,28,31,30,31,30,31,31,30,31,30,31];
if(_714==1&&dojo.date.isLeapYear(_713)){
return 29;
}
return days[_714];
};
dojo.date.isLeapYear=function(_715){
var year=_715.getFullYear();
return !(year%400)||(!(year%4)&&!!(year%100));
};
dojo.date.getTimezoneName=function(_716){
var str=_716.toString();
var tz="";
var _717;
var pos=str.indexOf("(");
if(pos>-1){
tz=str.substring(++pos,str.indexOf(")"));
}else{
var pat=/([A-Z\/]+) \d{4}$/;
if((_717=str.match(pat))){
tz=_717[1];
}else{
str=_716.toLocaleString();
pat=/ ([A-Z\/]+)$/;
if((_717=str.match(pat))){
tz=_717[1];
}
}
}
return (tz=="AM"||tz=="PM")?"":tz;
};
dojo.date.compare=function(_718,_719,_71a){
_718=new Date(+_718);
_719=new Date(+(_719||new Date()));
if(_71a=="date"){
_718.setHours(0,0,0,0);
_719.setHours(0,0,0,0);
}else{
if(_71a=="time"){
_718.setFullYear(0,0,0);
_719.setFullYear(0,0,0);
}
}
if(_718>_719){
return 1;
}
if(_718<_719){
return -1;
}
return 0;
};
dojo.date.add=function(date,_71b,_71c){
var sum=new Date(+date);
var _71d=false;
var _71e="Date";
switch(_71b){
case "day":
break;
case "weekday":
var days,_71f;
var mod=_71c%5;
if(!mod){
days=(_71c>0)?5:-5;
_71f=(_71c>0)?((_71c-5)/5):((_71c+5)/5);
}else{
days=mod;
_71f=parseInt(_71c/5);
}
var strt=date.getDay();
var adj=0;
if(strt==6&&_71c>0){
adj=1;
}else{
if(strt==0&&_71c<0){
adj=-1;
}
}
var trgt=strt+days;
if(trgt==0||trgt==6){
adj=(_71c>0)?2:-2;
}
_71c=(7*_71f)+days+adj;
break;
case "year":
_71e="FullYear";
_71d=true;
break;
case "week":
_71c*=7;
break;
case "quarter":
_71c*=3;
case "month":
_71d=true;
_71e="Month";
break;
default:
_71e="UTC"+_71b.charAt(0).toUpperCase()+_71b.substring(1)+"s";
}
if(_71e){
sum["set"+_71e](sum["get"+_71e]()+_71c);
}
if(_71d&&(sum.getDate()<date.getDate())){
sum.setDate(0);
}
return sum;
};
dojo.date.difference=function(_720,_721,_722){
_721=_721||new Date();
_722=_722||"day";
var _723=_721.getFullYear()-_720.getFullYear();
var _724=1;
switch(_722){
case "quarter":
var m1=_720.getMonth();
var m2=_721.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(_723*4);
_724=q2-q1;
break;
case "weekday":
var days=Math.round(dojo.date.difference(_720,_721,"day"));
var _725=parseInt(dojo.date.difference(_720,_721,"week"));
var mod=days%7;
if(mod==0){
days=_725*5;
}else{
var adj=0;
var aDay=_720.getDay();
var bDay=_721.getDay();
_725=parseInt(days/7);
mod=days%7;
var _726=new Date(_720);
_726.setDate(_726.getDate()+(_725*7));
var _727=_726.getDay();
if(days>0){
switch(true){
case aDay==6:
adj=-1;
break;
case aDay==0:
adj=0;
break;
case bDay==6:
adj=-1;
break;
case bDay==0:
adj=-2;
break;
case (_727+mod)>5:
adj=-2;
}
}else{
if(days<0){
switch(true){
case aDay==6:
adj=0;
break;
case aDay==0:
adj=1;
break;
case bDay==6:
adj=2;
break;
case bDay==0:
adj=1;
break;
case (_727+mod)<0:
adj=2;
}
}
}
days+=adj;
days-=(_725*2);
}
_724=days;
break;
case "year":
_724=_723;
break;
case "month":
_724=(_721.getMonth()-_720.getMonth())+(_723*12);
break;
case "week":
_724=parseInt(dojo.date.difference(_720,_721,"day")/7);
break;
case "day":
_724/=24;
case "hour":
_724/=60;
case "minute":
_724/=60;
case "second":
_724/=1000;
case "millisecond":
_724*=_721.getTime()-_720.getTime();
}
return Math.round(_724);
};
dojo.provide("dojo.regexp");
dojo.getObject("regexp",true,dojo);
dojo.regexp.escapeString=function(str,_728){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_728&&_728.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
dojo.regexp.buildGroupRE=function(arr,re,_729){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return dojo.regexp.group(b.join("|"),_729);
};
dojo.regexp.group=function(_72a,_72b){
return "("+(_72b?"?:":"")+_72a+")";
};
dojo.provide("dojo.date.locale");
dojo.getObject("date.locale",true,dojo);
(function(){
function _72c(_72d,_72e,_72f,_730){
return _730.replace(/([a-z])\1*/ig,function(_731){
var s,pad,c=_731.charAt(0),l=_731.length,_732=["abbr","wide","narrow"];
switch(c){
case "G":
s=_72e[(l<4)?"eraAbbr":"eraNames"][_72d.getFullYear()<0?0:1];
break;
case "y":
s=_72d.getFullYear();
switch(l){
case 1:
break;
case 2:
if(!_72f.fullYear){
s=String(s);
s=s.substr(s.length-2);
break;
}
default:
pad=true;
}
break;
case "Q":
case "q":
s=Math.ceil((_72d.getMonth()+1)/3);
pad=true;
break;
case "M":
var m=_72d.getMonth();
if(l<3){
s=m+1;
pad=true;
}else{
var _733=["months","format",_732[l-3]].join("-");
s=_72e[_733][m];
}
break;
case "w":
var _734=0;
s=dojo.date.locale._getWeekOfYear(_72d,_734);
pad=true;
break;
case "d":
s=_72d.getDate();
pad=true;
break;
case "D":
s=dojo.date.locale._getDayOfYear(_72d);
pad=true;
break;
case "E":
var d=_72d.getDay();
if(l<3){
s=d+1;
pad=true;
}else{
var _735=["days","format",_732[l-3]].join("-");
s=_72e[_735][d];
}
break;
case "a":
var _736=(_72d.getHours()<12)?"am":"pm";
s=_72f[_736]||_72e["dayPeriods-format-wide-"+_736];
break;
case "h":
case "H":
case "K":
case "k":
var h=_72d.getHours();
switch(c){
case "h":
s=(h%12)||12;
break;
case "H":
s=h;
break;
case "K":
s=(h%12);
break;
case "k":
s=h||24;
break;
}
pad=true;
break;
case "m":
s=_72d.getMinutes();
pad=true;
break;
case "s":
s=_72d.getSeconds();
pad=true;
break;
case "S":
s=Math.round(_72d.getMilliseconds()*Math.pow(10,l-3));
pad=true;
break;
case "v":
case "z":
s=dojo.date.locale._getZone(_72d,true,_72f);
if(s){
break;
}
l=4;
case "Z":
var _737=dojo.date.locale._getZone(_72d,false,_72f);
var tz=[(_737<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(_737)/60),2),dojo.string.pad(Math.abs(_737)%60,2)];
if(l==4){
tz.splice(0,0,"GMT");
tz.splice(3,0,":");
}
s=tz.join("");
break;
default:
throw new Error("dojo.date.locale.format: invalid pattern char: "+_730);
}
if(pad){
s=dojo.string.pad(s,l);
}
return s;
});
};
dojo.date.locale._getZone=function(_738,_739,_73a){
if(_739){
return dojo.date.getTimezoneName(_738);
}else{
return _738.getTimezoneOffset();
}
};
dojo.date.locale.format=function(_73b,_73c){
_73c=_73c||{};
var _73d=dojo.i18n.normalizeLocale(_73c.locale),_73e=_73c.formatLength||"short",_73f=dojo.date.locale._getGregorianBundle(_73d),str=[],_740=dojo.hitch(this,_72c,_73b,_73f,_73c);
if(_73c.selector=="year"){
return _741(_73f["dateFormatItem-yyyy"]||"yyyy",_740);
}
var _742;
if(_73c.selector!="date"){
_742=_73c.timePattern||_73f["timeFormat-"+_73e];
if(_742){
str.push(_741(_742,_740));
}
}
if(_73c.selector!="time"){
_742=_73c.datePattern||_73f["dateFormat-"+_73e];
if(_742){
str.push(_741(_742,_740));
}
}
return str.length==1?str[0]:_73f["dateTimeFormat-"+_73e].replace(/\{(\d+)\}/g,function(_743,key){
return str[key];
});
};
dojo.date.locale.regexp=function(_744){
return dojo.date.locale._parseInfo(_744).regexp;
};
dojo.date.locale._parseInfo=function(_745){
_745=_745||{};
var _746=dojo.i18n.normalizeLocale(_745.locale),_747=dojo.date.locale._getGregorianBundle(_746),_748=_745.formatLength||"short",_749=_745.datePattern||_747["dateFormat-"+_748],_74a=_745.timePattern||_747["timeFormat-"+_748],_74b;
if(_745.selector=="date"){
_74b=_749;
}else{
if(_745.selector=="time"){
_74b=_74a;
}else{
_74b=_747["dateTimeFormat-"+_748].replace(/\{(\d+)\}/g,function(_74c,key){
return [_74a,_749][key];
});
}
}
var _74d=[],re=_741(_74b,dojo.hitch(this,_74e,_74d,_747,_745));
return {regexp:re,tokens:_74d,bundle:_747};
};
dojo.date.locale.parse=function(_74f,_750){
var _751=/[\u200E\u200F\u202A\u202E]/g,info=dojo.date.locale._parseInfo(_750),_752=info.tokens,_753=info.bundle,re=new RegExp("^"+info.regexp.replace(_751,"")+"$",info.strict?"":"i"),_754=re.exec(_74f&&_74f.replace(_751,""));
if(!_754){
return null;
}
var _755=["abbr","wide","narrow"],_756=[1970,0,1,0,0,0,0],amPm="",_757=dojo.every(_754,function(v,i){
if(!i){
return true;
}
var _758=_752[i-1];
var l=_758.length;
switch(_758.charAt(0)){
case "y":
if(l!=2&&_750.strict){
_756[0]=v;
}else{
if(v<100){
v=Number(v);
var year=""+new Date().getFullYear(),_759=year.substring(0,2)*100,_75a=Math.min(Number(year.substring(2,4))+20,99),num=(v<_75a)?_759+v:_759-100+v;
_756[0]=num;
}else{
if(_750.strict){
return false;
}
_756[0]=v;
}
}
break;
case "M":
if(l>2){
var _75b=_753["months-format-"+_755[l-3]].concat();
if(!_750.strict){
v=v.replace(".","").toLowerCase();
_75b=dojo.map(_75b,function(s){
return s.replace(".","").toLowerCase();
});
}
v=dojo.indexOf(_75b,v);
if(v==-1){
return false;
}
}else{
v--;
}
_756[1]=v;
break;
case "E":
case "e":
var days=_753["days-format-"+_755[l-3]].concat();
if(!_750.strict){
v=v.toLowerCase();
days=dojo.map(days,function(d){
return d.toLowerCase();
});
}
v=dojo.indexOf(days,v);
if(v==-1){
return false;
}
break;
case "D":
_756[1]=0;
case "d":
_756[2]=v;
break;
case "a":
var am=_750.am||_753["dayPeriods-format-wide-am"],pm=_750.pm||_753["dayPeriods-format-wide-pm"];
if(!_750.strict){
var _75c=/\./g;
v=v.replace(_75c,"").toLowerCase();
am=am.replace(_75c,"").toLowerCase();
pm=pm.replace(_75c,"").toLowerCase();
}
if(_750.strict&&v!=am&&v!=pm){
return false;
}
amPm=(v==pm)?"p":(v==am)?"a":"";
break;
case "K":
if(v==24){
v=0;
}
case "h":
case "H":
case "k":
if(v>23){
return false;
}
_756[3]=v;
break;
case "m":
_756[4]=v;
break;
case "s":
_756[5]=v;
break;
case "S":
_756[6]=v;
}
return true;
});
var _75d=+_756[3];
if(amPm==="p"&&_75d<12){
_756[3]=_75d+12;
}else{
if(amPm==="a"&&_75d==12){
_756[3]=0;
}
}
var _75e=new Date(_756[0],_756[1],_756[2],_756[3],_756[4],_756[5],_756[6]);
if(_750.strict){
_75e.setFullYear(_756[0]);
}
var _75f=_752.join(""),_760=_75f.indexOf("d")!=-1,_761=_75f.indexOf("M")!=-1;
if(!_757||(_761&&_75e.getMonth()>_756[1])||(_760&&_75e.getDate()>_756[2])){
return null;
}
if((_761&&_75e.getMonth()<_756[1])||(_760&&_75e.getDate()<_756[2])){
_75e=dojo.date.add(_75e,"hour",1);
}
return _75e;
};
function _741(_762,_763,_764,_765){
var _766=function(x){
return x;
};
_763=_763||_766;
_764=_764||_766;
_765=_765||_766;
var _767=_762.match(/(''|[^'])+/g),_768=_762.charAt(0)=="'";
dojo.forEach(_767,function(_769,i){
if(!_769){
_767[i]="";
}else{
_767[i]=(_768?_764:_763)(_769.replace(/''/g,"'"));
_768=!_768;
}
});
return _765(_767.join(""));
};
function _74e(_76a,_76b,_76c,_76d){
_76d=dojo.regexp.escapeString(_76d);
if(!_76c.strict){
_76d=_76d.replace(" a"," ?a");
}
return _76d.replace(/([a-z])\1*/ig,function(_76e){
var s,c=_76e.charAt(0),l=_76e.length,p2="",p3="";
if(_76c.strict){
if(l>1){
p2="0"+"{"+(l-1)+"}";
}
if(l>2){
p3="0"+"{"+(l-2)+"}";
}
}else{
p2="0?";
p3="0{0,2}";
}
switch(c){
case "y":
s="\\d{2,4}";
break;
case "M":
s=(l>2)?"\\S+?":p2+"[1-9]|1[0-2]";
break;
case "D":
s=p2+"[1-9]|"+p3+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case "d":
s="3[01]|[12]\\d|"+p2+"[1-9]";
break;
case "w":
s=p2+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case "E":
s="\\S+";
break;
case "h":
s=p2+"[1-9]|1[0-2]";
break;
case "k":
s=p2+"\\d|1[01]";
break;
case "H":
s=p2+"\\d|1\\d|2[0-3]";
break;
case "K":
s=p2+"[1-9]|1\\d|2[0-4]";
break;
case "m":
case "s":
s="[0-5]\\d";
break;
case "S":
s="\\d{"+l+"}";
break;
case "a":
var am=_76c.am||_76b["dayPeriods-format-wide-am"],pm=_76c.pm||_76b["dayPeriods-format-wide-pm"];
if(_76c.strict){
s=am+"|"+pm;
}else{
s=am+"|"+pm;
if(am!=am.toLowerCase()){
s+="|"+am.toLowerCase();
}
if(pm!=pm.toLowerCase()){
s+="|"+pm.toLowerCase();
}
if(s.indexOf(".")!=-1){
s+="|"+s.replace(/\./g,"");
}
}
s=s.replace(/\./g,"\\.");
break;
default:
s=".*";
}
if(_76a){
_76a.push(_76e);
}
return "("+s+")";
}).replace(/[\xa0 ]/g,"[\\s\\xa0]");
};
})();
(function(){
var _76f=[];
dojo.date.locale.addCustomFormats=function(_770,_771){
_76f.push({pkg:_770,name:_771});
};
dojo.date.locale._getGregorianBundle=function(_772){
var _773={};
dojo.forEach(_76f,function(desc){
var _774=dojo.i18n.getLocalization(desc.pkg,desc.name,_772);
_773=dojo.mixin(_773,_774);
},this);
return _773;
};
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(item,type,_775,_776){
var _777,_778=dojo.date.locale._getGregorianBundle(_776),_779=[item,_775,type];
if(_775=="standAlone"){
var key=_779.join("-");
_777=_778[key];
if(_777[0]==1){
_777=undefined;
}
}
_779[1]="format";
return (_777||_778[_779.join("-")]).concat();
};
dojo.date.locale.isWeekend=function(_77a,_77b){
var _77c=dojo.cldr.supplemental.getWeekend(_77b),day=(_77a||new Date()).getDay();
if(_77c.end<_77c.start){
_77c.end+=7;
if(day<_77c.start){
day+=7;
}
}
return day>=_77c.start&&day<=_77c.end;
};
dojo.date.locale._getDayOfYear=function(_77d){
return dojo.date.difference(new Date(_77d.getFullYear(),0,1,_77d.getHours()),_77d)+1;
};
dojo.date.locale._getWeekOfYear=function(_77e,_77f){
if(arguments.length==1){
_77f=0;
}
var _780=new Date(_77e.getFullYear(),0,1).getDay(),adj=(_780-_77f+7)%7,week=Math.floor((dojo.date.locale._getDayOfYear(_77e)+adj-1)/7);
if(_780==_77f){
week++;
}
return week;
};
dojo.provide("dijit.form.DropDownButton");
dojo.provide("dijit.Calendar");
dojo.declare("dijit.Calendar",[dijit._Widget,dijit._Templated,dijit._CssStateMixin],{templateString:dojo.cache("dijit","templates/Calendar.html","<table cellspacing=\"0\" cellpadding=\"0\" class=\"dijitCalendarContainer\" role=\"grid\" dojoAttachEvent=\"onkeypress: _onKeyPress\" aria-labelledby=\"${id}_year\">\n\t<thead>\n\t\t<tr class=\"dijitReset dijitCalendarMonthContainer\" valign=\"top\">\n\t\t\t<th class='dijitReset dijitCalendarArrow' dojoAttachPoint=\"decrementMonth\">\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarDecrease\" role=\"presentation\"/>\n\t\t\t\t<span dojoAttachPoint=\"decreaseArrowNode\" class=\"dijitA11ySideArrow\">-</span>\n\t\t\t</th>\n\t\t\t<th class='dijitReset' colspan=\"5\">\n\t\t\t\t<div dojoType=\"dijit.form.DropDownButton\" dojoAttachPoint=\"monthDropDownButton\"\n\t\t\t\t\tid=\"${id}_mddb\" tabIndex=\"-1\">\n\t\t\t\t</div>\n\t\t\t</th>\n\t\t\t<th class='dijitReset dijitCalendarArrow' dojoAttachPoint=\"incrementMonth\">\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarIncrease\" role=\"presentation\"/>\n\t\t\t\t<span dojoAttachPoint=\"increaseArrowNode\" class=\"dijitA11ySideArrow\">+</span>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th class=\"dijitReset dijitCalendarDayLabelTemplate\" role=\"columnheader\"><span class=\"dijitCalendarDayLabel\"></span></th>\n\t\t</tr>\n\t</thead>\n\t<tbody dojoAttachEvent=\"onclick: _onDayClick, onmouseover: _onDayMouseOver, onmouseout: _onDayMouseOut, onmousedown: _onDayMouseDown, onmouseup: _onDayMouseUp\" class=\"dijitReset dijitCalendarBodyContainer\">\n\t\t<tr class=\"dijitReset dijitCalendarWeekTemplate\" role=\"row\">\n\t\t\t<td class=\"dijitReset dijitCalendarDateTemplate\" role=\"gridcell\"><span class=\"dijitCalendarDateLabel\"></span></td>\n\t\t</tr>\n\t</tbody>\n\t<tfoot class=\"dijitReset dijitCalendarYearContainer\">\n\t\t<tr>\n\t\t\t<td class='dijitReset' valign=\"top\" colspan=\"7\">\n\t\t\t\t<h3 class=\"dijitCalendarYearLabel\">\n\t\t\t\t\t<span dojoAttachPoint=\"previousYearLabelNode\" class=\"dijitInline dijitCalendarPreviousYear\"></span>\n\t\t\t\t\t<span dojoAttachPoint=\"currentYearLabelNode\" class=\"dijitInline dijitCalendarSelectedYear\" id=\"${id}_year\"></span>\n\t\t\t\t\t<span dojoAttachPoint=\"nextYearLabelNode\" class=\"dijitInline dijitCalendarNextYear\"></span>\n\t\t\t\t</h3>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\n"),widgetsInTemplate:true,value:new Date(""),datePackage:"dojo.date",dayWidth:"narrow",tabIndex:"0",currentFocus:new Date(),baseClass:"dijitCalendar",cssStateNodes:{"decrementMonth":"dijitCalendarArrow","incrementMonth":"dijitCalendarArrow","previousYearLabelNode":"dijitCalendarPreviousYear","nextYearLabelNode":"dijitCalendarNextYear"},_isValidDate:function(_781){
return _781&&!isNaN(_781)&&typeof _781=="object"&&_781.toString()!=this.constructor.prototype.value.toString();
},setValue:function(_782){
dojo.deprecated("dijit.Calendar:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
this.set("value",_782);
},_getValueAttr:function(){
var _783=new this.dateClassObj(this.value);
_783.setHours(0,0,0,0);
if(_783.getDate()<this.value.getDate()){
_783=this.dateFuncObj.add(_783,"hour",1);
}
return _783;
},_setValueAttr:function(_784,_785){
if(_784){
_784=new this.dateClassObj(_784);
}
if(this._isValidDate(_784)){
if(!this._isValidDate(this.value)||this.dateFuncObj.compare(_784,this.value)){
_784.setHours(1,0,0,0);
if(!this.isDisabledDate(_784,this.lang)){
this._set("value",_784);
this.set("currentFocus",_784);
if(_785||typeof _785=="undefined"){
this.onChange(this.get("value"));
this.onValueSelected(this.get("value"));
}
}
}
}else{
this._set("value",null);
this.set("currentFocus",this.currentFocus);
}
},_setText:function(node,text){
while(node.firstChild){
node.removeChild(node.firstChild);
}
node.appendChild(dojo.doc.createTextNode(text));
},_populateGrid:function(){
var _786=new this.dateClassObj(this.currentFocus);
_786.setDate(1);
var _787=_786.getDay(),_788=this.dateFuncObj.getDaysInMonth(_786),_789=this.dateFuncObj.getDaysInMonth(this.dateFuncObj.add(_786,"month",-1)),_78a=new this.dateClassObj(),_78b=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(_78b>_787){
_78b-=7;
}
dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(_78c,i){
i+=_78b;
var date=new this.dateClassObj(_786),_78d,_78e="dijitCalendar",adj=0;
if(i<_787){
_78d=_789-_787+i+1;
adj=-1;
_78e+="Previous";
}else{
if(i>=(_787+_788)){
_78d=i-_787-_788+1;
adj=1;
_78e+="Next";
}else{
_78d=i-_787+1;
_78e+="Current";
}
}
if(adj){
date=this.dateFuncObj.add(date,"month",adj);
}
date.setDate(_78d);
if(!this.dateFuncObj.compare(date,_78a,"date")){
_78e="dijitCalendarCurrentDate "+_78e;
}
if(this._isSelectedDate(date,this.lang)){
_78e="dijitCalendarSelectedDate "+_78e;
}
if(this.isDisabledDate(date,this.lang)){
_78e="dijitCalendarDisabledDate "+_78e;
}
var _78f=this.getClassForDate(date,this.lang);
if(_78f){
_78e=_78f+" "+_78e;
}
_78c.className=_78e+"Month dijitCalendarDateTemplate";
_78c.dijitDateValue=date.valueOf();
dojo.attr(_78c,"dijitDateValue",date.valueOf());
var _790=dojo.query(".dijitCalendarDateLabel",_78c)[0],text=date.getDateLocalized?date.getDateLocalized(this.lang):date.getDate();
this._setText(_790,text);
},this);
var _791=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,_786);
this.monthDropDownButton.dropDown.set("months",_791);
this.monthDropDownButton.containerNode.innerHTML=(dojo.isIE==6?"":"<div class='dijitSpacer'>"+this.monthDropDownButton.dropDown.domNode.innerHTML+"</div>")+"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>"+_791[_786.getMonth()]+"</div>";
var y=_786.getFullYear()-1;
var d=new this.dateClassObj();
dojo.forEach(["previous","current","next"],function(name){
d.setFullYear(y++);
this._setText(this[name+"YearLabelNode"],this.dateLocaleModule.format(d,{selector:"year",locale:this.lang}));
},this);
},goToToday:function(){
this.set("value",new this.dateClassObj());
},constructor:function(args){
var _792=(args.datePackage&&(args.datePackage!="dojo.date"))?args.datePackage+".Date":"Date";
this.dateClassObj=dojo.getObject(_792,false);
this.datePackage=args.datePackage||this.datePackage;
this.dateFuncObj=dojo.getObject(this.datePackage,false);
this.dateLocaleModule=dojo.getObject(this.datePackage+".locale",false);
},postMixInProperties:function(){
if(isNaN(this.value)){
delete this.value;
}
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
dojo.setSelectable(this.domNode,false);
var _793=dojo.hitch(this,function(_794,n){
var _795=dojo.query(_794,this.domNode)[0];
for(var i=0;i<n;i++){
_795.parentNode.appendChild(_795.cloneNode(true));
}
});
_793(".dijitCalendarDayLabelTemplate",6);
_793(".dijitCalendarDateTemplate",6);
_793(".dijitCalendarWeekTemplate",5);
var _796=this.dateLocaleModule.getNames("days",this.dayWidth,"standAlone",this.lang);
var _797=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(_798,i){
this._setText(_798,_796[(i+_797)%7]);
},this);
var _799=new this.dateClassObj(this.currentFocus);
this.monthDropDownButton.dropDown=new dijit.Calendar._MonthDropDown({id:this.id+"_mdd",onChange:dojo.hitch(this,"_onMonthSelect")});
this.set("currentFocus",_799,false);
var _79a=this;
var _79b=function(_79c,_79d,adj){
_79a._connects.push(dijit.typematic.addMouseListener(_79a[_79c],_79a,function(_79e){
if(_79e>=0){
_79a._adjustDisplay(_79d,adj);
}
},0.8,500));
};
_79b("incrementMonth","month",1);
_79b("decrementMonth","month",-1);
_79b("nextYearLabelNode","year",1);
_79b("previousYearLabelNode","year",-1);
},_adjustDisplay:function(part,_79f){
this._setCurrentFocusAttr(this.dateFuncObj.add(this.currentFocus,part,_79f));
},_setCurrentFocusAttr:function(date,_7a0){
var _7a1=this.currentFocus,_7a2=_7a1?dojo.query("[dijitDateValue="+_7a1.valueOf()+"]",this.domNode)[0]:null;
date=new this.dateClassObj(date);
date.setHours(1,0,0,0);
this._set("currentFocus",date);
this._populateGrid();
var _7a3=dojo.query("[dijitDateValue="+date.valueOf()+"]",this.domNode)[0];
_7a3.setAttribute("tabIndex",this.tabIndex);
if(this._focused||_7a0){
_7a3.focus();
}
if(_7a2&&_7a2!=_7a3){
if(dojo.isWebKit){
_7a2.setAttribute("tabIndex","-1");
}else{
_7a2.removeAttribute("tabIndex");
}
}
},focus:function(){
this._setCurrentFocusAttr(this.currentFocus,true);
},_onMonthSelect:function(_7a4){
this.currentFocus=this.dateFuncObj.add(this.currentFocus,"month",_7a4-this.currentFocus.getMonth());
this._populateGrid();
},_onDayClick:function(evt){
dojo.stopEvent(evt);
for(var node=evt.target;node&&!node.dijitDateValue;node=node.parentNode){
}
if(node&&!dojo.hasClass(node,"dijitCalendarDisabledDate")){
this.set("value",node.dijitDateValue);
}
},_onDayMouseOver:function(evt){
var node=dojo.hasClass(evt.target,"dijitCalendarDateLabel")?evt.target.parentNode:evt.target;
if(node&&(node.dijitDateValue||node==this.previousYearLabelNode||node==this.nextYearLabelNode)){
dojo.addClass(node,"dijitCalendarHoveredDate");
this._currentNode=node;
}
},_onDayMouseOut:function(evt){
if(!this._currentNode){
return;
}
if(evt.relatedTarget&&evt.relatedTarget.parentNode==this._currentNode){
return;
}
var cls="dijitCalendarHoveredDate";
if(dojo.hasClass(this._currentNode,"dijitCalendarActiveDate")){
cls+=" dijitCalendarActiveDate";
}
dojo.removeClass(this._currentNode,cls);
this._currentNode=null;
},_onDayMouseDown:function(evt){
var node=evt.target.parentNode;
if(node&&node.dijitDateValue){
dojo.addClass(node,"dijitCalendarActiveDate");
this._currentNode=node;
}
},_onDayMouseUp:function(evt){
var node=evt.target.parentNode;
if(node&&node.dijitDateValue){
dojo.removeClass(node,"dijitCalendarActiveDate");
}
},handleKey:function(evt){
var dk=dojo.keys,_7a5=-1,_7a6,_7a7=this.currentFocus;
switch(evt.keyCode){
case dk.RIGHT_ARROW:
_7a5=1;
case dk.LEFT_ARROW:
_7a6="day";
if(!this.isLeftToRight()){
_7a5*=-1;
}
break;
case dk.DOWN_ARROW:
_7a5=1;
case dk.UP_ARROW:
_7a6="week";
break;
case dk.PAGE_DOWN:
_7a5=1;
case dk.PAGE_UP:
_7a6=evt.ctrlKey||evt.altKey?"year":"month";
break;
case dk.END:
_7a7=this.dateFuncObj.add(_7a7,"month",1);
_7a6="day";
case dk.HOME:
_7a7=new this.dateClassObj(_7a7);
_7a7.setDate(1);
break;
case dk.ENTER:
case dk.SPACE:
this.set("value",this.currentFocus);
break;
default:
return true;
}
if(_7a6){
_7a7=this.dateFuncObj.add(_7a7,_7a6,_7a5);
}
this._setCurrentFocusAttr(_7a7);
return false;
},_onKeyPress:function(evt){
if(!this.handleKey(evt)){
dojo.stopEvent(evt);
}
},onValueSelected:function(date){
},onChange:function(date){
},_isSelectedDate:function(_7a8,_7a9){
return this._isValidDate(this.value)&&!this.dateFuncObj.compare(_7a8,this.value,"date");
},isDisabledDate:function(_7aa,_7ab){
},getClassForDate:function(_7ac,_7ad){
}});
dojo.declare("dijit.Calendar._MonthDropDown",[dijit._Widget,dijit._Templated],{months:[],templateString:"<div class='dijitCalendarMonthMenu dijitMenu' "+"dojoAttachEvent='onclick:_onClick,onmouseover:_onMenuHover,onmouseout:_onMenuHover'></div>",_setMonthsAttr:function(_7ae){
this.domNode.innerHTML=dojo.map(_7ae,function(_7af,idx){
return _7af?"<div class='dijitCalendarMonthLabel' month='"+idx+"'>"+_7af+"</div>":"";
}).join("");
},_onClick:function(evt){
this.onChange(dojo.attr(evt.target,"month"));
},onChange:function(_7b0){
},_onMenuHover:function(evt){
dojo.toggleClass(evt.target,"dijitCalendarMonthLabelHover",evt.type=="mouseover");
}});
dojo.provide("dijit.form._DateTimeTextBox");
new Date("X");
dojo.declare("dijit.form._DateTimeTextBox",[dijit.form.RangeBoundTextBox,dijit._HasDropDown],{templateString:dojo.cache("dijit.form","templates/DropDownBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdojoAttachPoint=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n"),hasDownArrow:true,openOnClick:true,regExpGen:dojo.date.locale.regexp,datePackage:"dojo.date",compare:function(val1,val2){
return dojo.date.compare(val1,val2,this._selector);
},forceWidth:true,format:function(_7b1,_7b2){
if(!_7b1){
return "";
}
return this.dateLocaleModule.format(_7b1,_7b2);
},"parse":function(_7b3,_7b4){
return this.dateLocaleModule.parse(_7b3,_7b4)||(this._isEmpty(_7b3)?null:undefined);
},serialize:function(val,_7b5){
if(val.toGregorian){
val=val.toGregorian();
}
return dojo.date.stamp.toISOString(val,_7b5);
},dropDownDefaultValue:new Date(),value:new Date(""),_blankValue:null,popupClass:"",_selector:"",constructor:function(args){
var _7b6=args.datePackage?args.datePackage+".Date":"Date";
this.dateClassObj=dojo.getObject(_7b6,false);
this.value=new this.dateClassObj("");
this.datePackage=args.datePackage||this.datePackage;
this.dateLocaleModule=dojo.getObject(this.datePackage+".locale",false);
this.regExpGen=this.dateLocaleModule.regexp;
this._invalidDate=dijit.form._DateTimeTextBox.prototype.value.toString();
},buildRendering:function(){
this.inherited(arguments);
if(!this.hasDownArrow){
this._buttonNode.style.display="none";
}
if(this.openOnClick||!this.hasDownArrow){
this._buttonNode=this.domNode;
this.baseClass+=" dijitComboBoxOpenOnClick";
}
},_setConstraintsAttr:function(_7b7){
_7b7.selector=this._selector;
_7b7.fullYear=true;
var _7b8=dojo.date.stamp.fromISOString;
if(typeof _7b7.min=="string"){
_7b7.min=_7b8(_7b7.min);
}
if(typeof _7b7.max=="string"){
_7b7.max=_7b8(_7b7.max);
}
this.inherited(arguments,[_7b7]);
},_isInvalidDate:function(_7b9){
return !_7b9||isNaN(_7b9)||typeof _7b9!="object"||_7b9.toString()==this._invalidDate;
},_setValueAttr:function(_7ba,_7bb,_7bc){
if(_7ba!==undefined){
if(typeof _7ba=="string"){
_7ba=dojo.date.stamp.fromISOString(_7ba);
}
if(this._isInvalidDate(_7ba)){
_7ba=null;
}
if(_7ba instanceof Date&&!(this.dateClassObj instanceof Date)){
_7ba=new this.dateClassObj(_7ba);
}
}
this.inherited(arguments,[_7ba,_7bb,_7bc]);
if(this.dropDown){
this.dropDown.set("value",_7ba,false);
}
},_set:function(attr,_7bd){
if(attr=="value"&&this.value instanceof Date&&((this._isInvalidDate(this.value)&&this._isInvalidDate(_7bd))||this.compare(_7bd,this.value)==0)){
return;
}
this.inherited(arguments);
},_setDropDownDefaultValueAttr:function(val){
if(this._isInvalidDate(val)){
val=new this.dateClassObj();
}
this.dropDownDefaultValue=val;
},openDropDown:function(_7be){
if(this.dropDown){
this.dropDown.destroy();
}
var _7bf=dojo.getObject(this.popupClass,false),_7c0=this,_7c1=this.get("value");
this.dropDown=new _7bf({onChange:function(_7c2){
dijit.form._DateTimeTextBox.superclass._setValueAttr.call(_7c0,_7c2,true);
},id:this.id+"_popup",dir:_7c0.dir,lang:_7c0.lang,value:_7c1,currentFocus:!this._isInvalidDate(_7c1)?_7c1:this.dropDownDefaultValue,constraints:_7c0.constraints,filterString:_7c0.filterString,datePackage:_7c0.datePackage,isDisabledDate:function(date){
return !_7c0.rangeCheck(date,_7c0.constraints);
}});
this.inherited(arguments);
},_getDisplayedValueAttr:function(){
return this.textbox.value;
},_setDisplayedValueAttr:function(_7c3,_7c4){
this._setValueAttr(this.parse(_7c3,this.constraints),_7c4,_7c3);
}});
dojo.provide("dijit.form.DateTextBox");
dojo.declare("dijit.form.DateTextBox",dijit.form._DateTimeTextBox,{baseClass:"dijitTextBox dijitComboBox dijitDateTextBox",popupClass:"dijit.Calendar",_selector:"date",value:new Date("")});
dojo.provide("dojo.data.util.simpleFetch");
dojo.getObject("data.util.simpleFetch",true,dojo);
dojo.data.util.simpleFetch.fetch=function(_7c5){
_7c5=_7c5||{};
if(!_7c5.store){
_7c5.store=this;
}
var self=this;
var _7c6=function(_7c7,_7c8){
if(_7c8.onError){
var _7c9=_7c8.scope||dojo.global;
_7c8.onError.call(_7c9,_7c7,_7c8);
}
};
var _7ca=function(_7cb,_7cc){
var _7cd=_7cc.abort||null;
var _7ce=false;
var _7cf=_7cc.start?_7cc.start:0;
var _7d0=(_7cc.count&&(_7cc.count!==Infinity))?(_7cf+_7cc.count):_7cb.length;
_7cc.abort=function(){
_7ce=true;
if(_7cd){
_7cd.call(_7cc);
}
};
var _7d1=_7cc.scope||dojo.global;
if(!_7cc.store){
_7cc.store=self;
}
if(_7cc.onBegin){
_7cc.onBegin.call(_7d1,_7cb.length,_7cc);
}
if(_7cc.sort){
_7cb.sort(dojo.data.util.sorter.createSortFunction(_7cc.sort,self));
}
if(_7cc.onItem){
for(var i=_7cf;(i<_7cb.length)&&(i<_7d0);++i){
var item=_7cb[i];
if(!_7ce){
_7cc.onItem.call(_7d1,item,_7cc);
}
}
}
if(_7cc.onComplete&&!_7ce){
var _7d2=null;
if(!_7cc.onItem){
_7d2=_7cb.slice(_7cf,_7d0);
}
_7cc.onComplete.call(_7d1,_7d2,_7cc);
}
};
this._fetchItems(_7c5,_7ca,_7c6);
return _7c5;
};
dojo.provide("dojo.data.util.filter");
dojo.getObject("data.util.filter",true,dojo);
dojo.data.util.filter.patternToRegExp=function(_7d3,_7d4){
var rxp="^";
var c=null;
for(var i=0;i<_7d3.length;i++){
c=_7d3.charAt(i);
switch(c){
case "\\":
rxp+=c;
i++;
rxp+=_7d3.charAt(i);
break;
case "*":
rxp+=".*";
break;
case "?":
rxp+=".";
break;
case "$":
case "^":
case "/":
case "+":
case ".":
case "|":
case "(":
case ")":
case "{":
case "}":
case "[":
case "]":
rxp+="\\";
default:
rxp+=c;
}
}
rxp+="$";
if(_7d4){
return new RegExp(rxp,"mi");
}else{
return new RegExp(rxp,"m");
}
};
dojo.provide("dijit.form.ComboBox");
dojo.declare("dijit.form.ComboBoxMixin",dijit._HasDropDown,{item:null,pageSize:Infinity,store:null,fetchProperties:{},query:{},autoComplete:true,highlightMatch:"first",searchDelay:100,searchAttr:"name",labelAttr:"",labelType:"text",queryExpr:"${0}*",ignoreCase:true,hasDownArrow:true,templateString:dojo.cache("dijit.form","templates/DropDownBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdojoAttachPoint=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n"),baseClass:"dijitTextBox dijitComboBox",dropDownClass:"dijit.form._ComboBoxMenu",cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},maxHeight:-1,_getCaretPos:function(_7d5){
var pos=0;
if(typeof (_7d5.selectionStart)=="number"){
pos=_7d5.selectionStart;
}else{
if(dojo.isIE){
var tr=dojo.doc.selection.createRange().duplicate();
var ntr=_7d5.createTextRange();
tr.move("character",0);
ntr.move("character",0);
try{
ntr.setEndPoint("EndToEnd",tr);
pos=String(ntr.text).replace(/\r/g,"").length;
}
catch(e){
}
}
}
return pos;
},_setCaretPos:function(_7d6,_7d7){
_7d7=parseInt(_7d7);
dijit.selectInputText(_7d6,_7d7,_7d7);
},_setDisabledAttr:function(_7d8){
this.inherited(arguments);
dijit.setWaiState(this.domNode,"disabled",_7d8);
},_abortQuery:function(){
if(this.searchTimer){
clearTimeout(this.searchTimer);
this.searchTimer=null;
}
if(this._fetchHandle){
if(this._fetchHandle.abort){
this._fetchHandle.abort();
}
this._fetchHandle=null;
}
},_onInput:function(evt){
if(!this.searchTimer&&(evt.type=="paste"||evt.type=="input")&&this._lastInput!=this.textbox.value){
this.searchTimer=setTimeout(dojo.hitch(this,function(){
this._onKey({charOrCode:229});
}),100);
}
this.inherited(arguments);
},_onKey:function(evt){
var key=evt.charOrCode;
if(evt.altKey||((evt.ctrlKey||evt.metaKey)&&(key!="x"&&key!="v"))||key==dojo.keys.SHIFT){
return;
}
var _7d9=false;
var pw=this.dropDown;
var dk=dojo.keys;
var _7da=null;
this._prev_key_backspace=false;
this._abortQuery();
this.inherited(arguments);
if(this._opened){
_7da=pw.getHighlightedOption();
}
switch(key){
case dk.PAGE_DOWN:
case dk.DOWN_ARROW:
case dk.PAGE_UP:
case dk.UP_ARROW:
if(this._opened){
this._announceOption(_7da);
}
dojo.stopEvent(evt);
break;
case dk.ENTER:
if(_7da){
if(_7da==pw.nextButton){
this._nextSearch(1);
dojo.stopEvent(evt);
break;
}else{
if(_7da==pw.previousButton){
this._nextSearch(-1);
dojo.stopEvent(evt);
break;
}
}
}else{
this._setBlurValue();
this._setCaretPos(this.focusNode,this.focusNode.value.length);
}
if(this._opened||this._fetchHandle){
evt.preventDefault();
}
case dk.TAB:
var _7db=this.get("displayedValue");
if(pw&&(_7db==pw._messages["previousMessage"]||_7db==pw._messages["nextMessage"])){
break;
}
if(_7da){
this._selectOption();
}
if(this._opened){
this._lastQuery=null;
this.closeDropDown();
}
break;
case " ":
if(_7da){
dojo.stopEvent(evt);
this._selectOption();
this.closeDropDown();
}else{
_7d9=true;
}
break;
case dk.DELETE:
case dk.BACKSPACE:
this._prev_key_backspace=true;
_7d9=true;
break;
default:
_7d9=typeof key=="string"||key==229;
}
if(_7d9){
this.item=undefined;
this.searchTimer=setTimeout(dojo.hitch(this,"_startSearchFromInput"),1);
}
},_autoCompleteText:function(text){
var fn=this.focusNode;
dijit.selectInputText(fn,fn.value.length);
var _7dc=this.ignoreCase?"toLowerCase":"substr";
if(text[_7dc](0).indexOf(this.focusNode.value[_7dc](0))==0){
var cpos=this._getCaretPos(fn);
if((cpos+1)>fn.value.length){
fn.value=text;
dijit.selectInputText(fn,cpos);
}
}else{
fn.value=text;
dijit.selectInputText(fn);
}
},_openResultList:function(_7dd,_7de){
this._fetchHandle=null;
if(this.disabled||this.readOnly||(_7de.query[this.searchAttr]!=this._lastQuery)){
return;
}
var _7df=this.dropDown._highlighted_option&&dojo.hasClass(this.dropDown._highlighted_option,"dijitMenuItemSelected");
this.dropDown.clearResultList();
if(!_7dd.length&&!this._maxOptions){
this.closeDropDown();
return;
}
_7de._maxOptions=this._maxOptions;
var _7e0=this.dropDown.createOptions(_7dd,_7de,dojo.hitch(this,"_getMenuLabelFromItem"));
this._showResultList();
if(_7de.direction){
if(1==_7de.direction){
this.dropDown.highlightFirstOption();
}else{
if(-1==_7de.direction){
this.dropDown.highlightLastOption();
}
}
if(_7df){
this._announceOption(this.dropDown.getHighlightedOption());
}
}else{
if(this.autoComplete&&!this._prev_key_backspace&&!/^[*]+$/.test(_7de.query[this.searchAttr])){
this._announceOption(_7e0[1]);
}
}
},_showResultList:function(){
this.closeDropDown(true);
this.displayMessage("");
this.openDropDown();
dijit.setWaiState(this.domNode,"expanded","true");
},loadDropDown:function(_7e1){
this._startSearchAll();
},isLoaded:function(){
return false;
},closeDropDown:function(){
this._abortQuery();
if(this._opened){
this.inherited(arguments);
dijit.setWaiState(this.domNode,"expanded","false");
dijit.removeWaiState(this.focusNode,"activedescendant");
}
},_setBlurValue:function(){
var _7e2=this.get("displayedValue");
var pw=this.dropDown;
if(pw&&(_7e2==pw._messages["previousMessage"]||_7e2==pw._messages["nextMessage"])){
this._setValueAttr(this._lastValueReported,true);
}else{
if(typeof this.item=="undefined"){
this.item=null;
this.set("displayedValue",_7e2);
}else{
if(this.value!=this._lastValueReported){
dijit.form._FormValueWidget.prototype._setValueAttr.call(this,this.value,true);
}
this._refreshState();
}
}
},_onBlur:function(){
this.closeDropDown();
this.inherited(arguments);
},_setItemAttr:function(item,_7e3,_7e4){
if(!_7e4){
var _7e5=this.labelFunc(item,this.store);
if(this.labelType=="html"){
var span=this._helperSpan;
span.innerHTML=_7e5;
_7e4=span.innerText||span.textContent;
}else{
_7e4=_7e5;
}
}
var _7e6=this._getValueField()!=this.searchAttr?this.store.getIdentity(item):_7e4;
this._set("item",item);
dijit.form.ComboBox.superclass._setValueAttr.call(this,_7e6,_7e3,_7e4);
},_announceOption:function(node){
if(!node){
return;
}
var _7e7;
if(node==this.dropDown.nextButton||node==this.dropDown.previousButton){
_7e7=node.innerHTML;
this.item=undefined;
this.value="";
}else{
_7e7=node.innerText||node.textContent||"";
this.set("item",node.item,false,_7e7);
}
this.focusNode.value=this.focusNode.value.substring(0,this._lastInput.length);
dijit.setWaiState(this.focusNode,"activedescendant",dojo.attr(node,"id"));
this._autoCompleteText(_7e7);
},_selectOption:function(evt){
if(evt){
this._announceOption(evt.target);
}
this.closeDropDown();
this._setCaretPos(this.focusNode,this.focusNode.value.length);
dijit.form._FormValueWidget.prototype._setValueAttr.call(this,this.value,true);
},_startSearchAll:function(){
this._startSearch("");
},_startSearchFromInput:function(){
this._startSearch(this.focusNode.value.replace(/([\\\*\?])/g,"\\$1"));
},_getQueryString:function(text){
return dojo.string.substitute(this.queryExpr,[text]);
},_startSearch:function(key){
if(!this.dropDown){
var _7e8=this.id+"_popup",_7e9=dojo.getObject(this.dropDownClass,false);
this.dropDown=new _7e9({onChange:dojo.hitch(this,this._selectOption),id:_7e8,dir:this.dir});
dijit.removeWaiState(this.focusNode,"activedescendant");
dijit.setWaiState(this.textbox,"owns",_7e8);
}
var _7ea=dojo.clone(this.query);
this._lastInput=key;
this._lastQuery=_7ea[this.searchAttr]=this._getQueryString(key);
this.searchTimer=setTimeout(dojo.hitch(this,function(_7eb,_7ec){
this.searchTimer=null;
var _7ed={queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:_7eb,onBegin:dojo.hitch(this,"_setMaxOptions"),onComplete:dojo.hitch(this,"_openResultList"),onError:function(_7ee){
_7ec._fetchHandle=null;
_7ec.closeDropDown();
},start:0,count:this.pageSize};
dojo.mixin(_7ed,_7ec.fetchProperties);
this._fetchHandle=_7ec.store.fetch(_7ed);
var _7ef=function(_7f0,_7f1){
_7f0.start+=_7f0.count*_7f1;
_7f0.direction=_7f1;
this._fetchHandle=this.store.fetch(_7f0);
this.focus();
};
this._nextSearch=this.dropDown.onPage=dojo.hitch(this,_7ef,this._fetchHandle);
},_7ea,this),this.searchDelay);
},_setMaxOptions:function(size,_7f2){
this._maxOptions=size;
},_getValueField:function(){
return this.searchAttr;
},constructor:function(){
this.query={};
this.fetchProperties={};
},postMixInProperties:function(){
if(!this.store){
var _7f3=this.srcNodeRef;
this.store=new dijit.form._ComboBoxDataStore(_7f3);
if(!("value" in this.params)){
var item=(this.item=this.store.fetchSelectedItem());
if(item){
var _7f4=this._getValueField();
this.value=_7f4!=this.searchAttr?this.store.getValue(item,_7f4):this.labelFunc(item,this.store);
}
}
}
this._helperSpan=dojo.create("span");
this.inherited(arguments);
},postCreate:function(){
var _7f5=dojo.query("label[for=\""+this.id+"\"]");
if(_7f5.length){
_7f5[0].id=(this.id+"_label");
dijit.setWaiState(this.domNode,"labelledby",_7f5[0].id);
}
this.inherited(arguments);
},destroy:function(){
dojo.destroy(this._helperSpan);
this.inherited(arguments);
},_setHasDownArrowAttr:function(val){
this.hasDownArrow=val;
this._buttonNode.style.display=val?"":"none";
},_getMenuLabelFromItem:function(item){
var _7f6=this.labelFunc(item,this.store),_7f7=this.labelType;
if(this.highlightMatch!="none"&&this.labelType=="text"&&this._lastInput){
_7f6=this.doHighlight(_7f6,this._escapeHtml(this._lastInput));
_7f7="html";
}
return {html:_7f7=="html",label:_7f6};
},doHighlight:function(_7f8,find){
var _7f9=(this.ignoreCase?"i":"")+(this.highlightMatch=="all"?"g":""),i=this.queryExpr.indexOf("${0}");
find=dojo.regexp.escapeString(find);
return this._escapeHtml(_7f8).replace(new RegExp((i==0?"^":"")+"("+find+")"+(i==(this.queryExpr.length-4)?"$":""),_7f9),"<span class=\"dijitComboBoxHighlightMatch\">$1</span>");
},_escapeHtml:function(str){
str=String(str).replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
return str;
},reset:function(){
this.item=null;
this.inherited(arguments);
},labelFunc:function(item,_7fa){
return _7fa.getValue(item,this.labelAttr||this.searchAttr).toString();
}});
dojo.declare("dijit.form._ComboBoxMenu",[dijit._Widget,dijit._Templated,dijit._CssStateMixin],{templateString:"<ul class='dijitReset dijitMenu' dojoAttachEvent='onmousedown:_onMouseDown,onmouseup:_onMouseUp,onmouseover:_onMouseOver,onmouseout:_onMouseOut' style='overflow: \"auto\"; overflow-x: \"hidden\";'>"+"<li class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton' role='option'></li>"+"<li class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton' role='option'></li>"+"</ul>",_messages:null,baseClass:"dijitComboBoxMenu",postMixInProperties:function(){
this.inherited(arguments);
this._messages=dojo.i18n.getLocalization("dijit.form","ComboBox",this.lang);
},buildRendering:function(){
this.inherited(arguments);
this.previousButton.innerHTML=this._messages["previousMessage"];
this.nextButton.innerHTML=this._messages["nextMessage"];
},_setValueAttr:function(_7fb){
this.value=_7fb;
this.onChange(_7fb);
},onChange:function(_7fc){
},onPage:function(_7fd){
},onClose:function(){
this._blurOptionNode();
},_createOption:function(item,_7fe){
var _7ff=dojo.create("li",{"class":"dijitReset dijitMenuItem"+(this.isLeftToRight()?"":" dijitMenuItemRtl"),role:"option"});
var _800=_7fe(item);
if(_800.html){
_7ff.innerHTML=_800.label;
}else{
_7ff.appendChild(dojo.doc.createTextNode(_800.label));
}
if(_7ff.innerHTML==""){
_7ff.innerHTML="&nbsp;";
}
_7ff.item=item;
return _7ff;
},createOptions:function(_801,_802,_803){
this.previousButton.style.display=(_802.start==0)?"none":"";
dojo.attr(this.previousButton,"id",this.id+"_prev");
dojo.forEach(_801,function(item,i){
var _804=this._createOption(item,_803);
dojo.attr(_804,"id",this.id+i);
this.domNode.insertBefore(_804,this.nextButton);
},this);
var _805=false;
if(_802._maxOptions&&_802._maxOptions!=-1){
if((_802.start+_802.count)<_802._maxOptions){
_805=true;
}else{
if((_802.start+_802.count)>_802._maxOptions&&_802.count==_801.length){
_805=true;
}
}
}else{
if(_802.count==_801.length){
_805=true;
}
}
this.nextButton.style.display=_805?"":"none";
dojo.attr(this.nextButton,"id",this.id+"_next");
return this.domNode.childNodes;
},clearResultList:function(){
while(this.domNode.childNodes.length>2){
this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2]);
}
this._blurOptionNode();
},_onMouseDown:function(evt){
dojo.stopEvent(evt);
},_onMouseUp:function(evt){
if(evt.target===this.domNode||!this._highlighted_option){
return;
}else{
if(evt.target==this.previousButton){
this._blurOptionNode();
this.onPage(-1);
}else{
if(evt.target==this.nextButton){
this._blurOptionNode();
this.onPage(1);
}else{
var tgt=evt.target;
while(!tgt.item){
tgt=tgt.parentNode;
}
this._setValueAttr({target:tgt},true);
}
}
}
},_onMouseOver:function(evt){
if(evt.target===this.domNode){
return;
}
var tgt=evt.target;
if(!(tgt==this.previousButton||tgt==this.nextButton)){
while(!tgt.item){
tgt=tgt.parentNode;
}
}
this._focusOptionNode(tgt);
},_onMouseOut:function(evt){
if(evt.target===this.domNode){
return;
}
this._blurOptionNode();
},_focusOptionNode:function(node){
if(this._highlighted_option!=node){
this._blurOptionNode();
this._highlighted_option=node;
dojo.addClass(this._highlighted_option,"dijitMenuItemSelected");
}
},_blurOptionNode:function(){
if(this._highlighted_option){
dojo.removeClass(this._highlighted_option,"dijitMenuItemSelected");
this._highlighted_option=null;
}
},_highlightNextOption:function(){
if(!this.getHighlightedOption()){
var fc=this.domNode.firstChild;
this._focusOptionNode(fc.style.display=="none"?fc.nextSibling:fc);
}else{
var ns=this._highlighted_option.nextSibling;
if(ns&&ns.style.display!="none"){
this._focusOptionNode(ns);
}else{
this.highlightFirstOption();
}
}
dojo.window.scrollIntoView(this._highlighted_option);
},highlightFirstOption:function(){
var _806=this.domNode.firstChild;
var _807=_806.nextSibling;
this._focusOptionNode(_807.style.display=="none"?_806:_807);
dojo.window.scrollIntoView(this._highlighted_option);
},highlightLastOption:function(){
this._focusOptionNode(this.domNode.lastChild.previousSibling);
dojo.window.scrollIntoView(this._highlighted_option);
},_highlightPrevOption:function(){
if(!this.getHighlightedOption()){
var lc=this.domNode.lastChild;
this._focusOptionNode(lc.style.display=="none"?lc.previousSibling:lc);
}else{
var ps=this._highlighted_option.previousSibling;
if(ps&&ps.style.display!="none"){
this._focusOptionNode(ps);
}else{
this.highlightLastOption();
}
}
dojo.window.scrollIntoView(this._highlighted_option);
},_page:function(up){
var _808=0;
var _809=this.domNode.scrollTop;
var _80a=dojo.style(this.domNode,"height");
if(!this.getHighlightedOption()){
this._highlightNextOption();
}
while(_808<_80a){
if(up){
if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){
break;
}
this._highlightPrevOption();
}else{
if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){
break;
}
this._highlightNextOption();
}
var _80b=this.domNode.scrollTop;
_808+=(_80b-_809)*(up?-1:1);
_809=_80b;
}
},pageUp:function(){
this._page(true);
},pageDown:function(){
this._page(false);
},getHighlightedOption:function(){
var ho=this._highlighted_option;
return (ho&&ho.parentNode)?ho:null;
},handleKey:function(evt){
switch(evt.charOrCode){
case dojo.keys.DOWN_ARROW:
this._highlightNextOption();
return false;
case dojo.keys.PAGE_DOWN:
this.pageDown();
return false;
case dojo.keys.UP_ARROW:
this._highlightPrevOption();
return false;
case dojo.keys.PAGE_UP:
this.pageUp();
return false;
default:
return true;
}
}});
dojo.declare("dijit.form.ComboBox",[dijit.form.ValidationTextBox,dijit.form.ComboBoxMixin],{_setValueAttr:function(_80c,_80d,_80e){
this._set("item",null);
if(!_80c){
_80c="";
}
dijit.form.ValidationTextBox.prototype._setValueAttr.call(this,_80c,_80d,_80e);
}});
dojo.declare("dijit.form._ComboBoxDataStore",null,{constructor:function(root){
this.root=root;
if(root.tagName!="SELECT"&&root.firstChild){
root=dojo.query("select",root);
if(root.length>0){
root=root[0];
}else{
this.root.innerHTML="<SELECT>"+this.root.innerHTML+"</SELECT>";
root=this.root.firstChild;
}
this.root=root;
}
dojo.query("> option",root).forEach(function(node){
node.innerHTML=dojo.trim(node.innerHTML);
});
},getValue:function(item,_80f,_810){
return (_80f=="value")?item.value:(item.innerText||item.textContent||"");
},isItemLoaded:function(_811){
return true;
},getFeatures:function(){
return {"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
},_fetchItems:function(args,_812,_813){
if(!args.query){
args.query={};
}
if(!args.query.name){
args.query.name="";
}
if(!args.queryOptions){
args.queryOptions={};
}
var _814=dojo.data.util.filter.patternToRegExp(args.query.name,args.queryOptions.ignoreCase),_815=dojo.query("> option",this.root).filter(function(_816){
return (_816.innerText||_816.textContent||"").match(_814);
});
if(args.sort){
_815.sort(dojo.data.util.sorter.createSortFunction(args.sort,this));
}
_812(_815,args);
},close:function(_817){
return;
},getLabel:function(item){
return item.innerHTML;
},getIdentity:function(item){
return dojo.attr(item,"value");
},fetchItemByIdentity:function(args){
var item=dojo.query("> option[value='"+args.identity+"']",this.root)[0];
args.onItem(item);
},fetchSelectedItem:function(){
var root=this.root,si=root.selectedIndex;
return typeof si=="number"?dojo.query("> option:nth-child("+(si!=-1?si+1:1)+")",root)[0]:null;
}});
dojo.extend(dijit.form._ComboBoxDataStore,dojo.data.util.simpleFetch);
dojo.provide("dijit.form.FilteringSelect");
dojo.declare("dijit.form.FilteringSelect",[dijit.form.MappedTextBox,dijit.form.ComboBoxMixin],{required:true,_lastDisplayedValue:"",_isValidSubset:function(){
return this._opened;
},isValid:function(){
return this.item||(!this.required&&this.get("displayedValue")=="");
},_refreshState:function(){
if(!this.searchTimer){
this.inherited(arguments);
}
},_callbackSetLabel:function(_818,_819,_81a){
if((_819&&_819.query[this.searchAttr]!=this._lastQuery)||(!_819&&_818.length&&this.store.getIdentity(_818[0])!=this._lastQuery)){
return;
}
if(!_818.length){
this.valueNode.value="";
dijit.form.TextBox.superclass._setValueAttr.call(this,"",_81a||(_81a===undefined&&!this._focused));
this._set("item",null);
this.validate(this._focused);
}else{
this.set("item",_818[0],_81a);
}
},_openResultList:function(_81b,_81c){
if(_81c.query[this.searchAttr]!=this._lastQuery){
return;
}
dijit.form.ComboBoxMixin.prototype._openResultList.apply(this,arguments);
if(this.item===undefined){
this.validate(true);
}
},_getValueAttr:function(){
return this.valueNode.value;
},_getValueField:function(){
return "value";
},_setValueAttr:function(_81d,_81e){
if(!this._onChangeActive){
_81e=null;
}
this._lastQuery=_81d;
if(_81d===null||_81d===""){
this._setDisplayedValueAttr("",_81e);
return;
}
var self=this;
this.store.fetchItemByIdentity({identity:_81d,onItem:function(item){
self._callbackSetLabel(item?[item]:[],undefined,_81e);
}});
},_setItemAttr:function(item,_81f,_820){
this.inherited(arguments);
this.valueNode.value=this.value;
this._lastDisplayedValue=this.textbox.value;
},_getDisplayQueryString:function(text){
return text.replace(/([\\\*\?])/g,"\\$1");
},_setDisplayedValueAttr:function(_821,_822){
if(_821==null){
_821="";
}
if(!this._created){
if(!("displayedValue" in this.params)){
return;
}
_822=false;
}
if(this.store){
this.closeDropDown();
var _823=dojo.clone(this.query);
this._lastQuery=_823[this.labelAttr||this.searchAttr]=this._getDisplayQueryString(_821);
this.textbox.value=_821;
this._lastDisplayedValue=_821;
var _824=this;
var _825={query:_823,queryOptions:{ignoreCase:this.ignoreCase,deep:true},onComplete:function(_826,_827){
_824._fetchHandle=null;
dojo.hitch(_824,"_callbackSetLabel")(_826,_827,_822);
},onError:function(_828){
_824._fetchHandle=null;
dojo.hitch(_824,"_callbackSetLabel")([],undefined,false);
}};
dojo.mixin(_825,this.fetchProperties);
this._fetchHandle=this.store.fetch(_825);
}
},undo:function(){
this.set("displayedValue",this._lastDisplayedValue);
}});
dojo.provide("dijit._TimePicker");
dojo.declare("dijit._TimePicker",[dijit._Widget,dijit._Templated],{templateString:dojo.cache("dijit","templates/TimePicker.html","<div id=\"widget_${id}\" class=\"dijitMenu\"\n    ><div dojoAttachPoint=\"upArrow\" class=\"dijitButtonNode dijitUpArrowButton\" dojoAttachEvent=\"onmouseenter:_buttonMouse,onmouseleave:_buttonMouse\"\n\t\t><div class=\"dijitReset dijitInline dijitArrowButtonInner\" role=\"presentation\">&nbsp;</div\n\t\t><div class=\"dijitArrowButtonChar\">&#9650;</div></div\n    ><div dojoAttachPoint=\"timeMenu,focusNode\" dojoAttachEvent=\"onclick:_onOptionSelected,onmouseover,onmouseout\"></div\n    ><div dojoAttachPoint=\"downArrow\" class=\"dijitButtonNode dijitDownArrowButton\" dojoAttachEvent=\"onmouseenter:_buttonMouse,onmouseleave:_buttonMouse\"\n\t\t><div class=\"dijitReset dijitInline dijitArrowButtonInner\" role=\"presentation\">&nbsp;</div\n\t\t><div class=\"dijitArrowButtonChar\">&#9660;</div></div\n></div>\n"),baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",visibleRange:"T05:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:dojo.date.stamp.toISOString,setValue:function(_829){
dojo.deprecated("dijit._TimePicker:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
this.set("value",_829);
},_setValueAttr:function(date){
this._set("value",date);
this._showText();
},_setFilterStringAttr:function(val){
this._set("filterString",val);
this._showText();
},isDisabledDate:function(_82a,_82b){
return false;
},_getFilteredNodes:function(_82c,_82d,_82e,_82f){
var _830=[],_831=_82f?_82f.date:this._refDate,n,i=_82c,max=this._maxIncrement+Math.abs(i),chk=_82e?-1:1,dec=_82e?1:0,inc=1-dec;
do{
i=i-dec;
n=this._createOption(i);
if(n){
if((_82e&&n.date>_831)||(!_82e&&n.date<_831)){
break;
}
_830[_82e?"unshift":"push"](n);
_831=n.date;
}
i=i+inc;
}while(_830.length<_82d&&(i*chk)<max);
return _830;
},_showText:function(){
var _832=dojo.date.stamp.fromISOString;
this.timeMenu.innerHTML="";
this._clickableIncrementDate=_832(this.clickableIncrement);
this._visibleIncrementDate=_832(this.visibleIncrement);
this._visibleRangeDate=_832(this.visibleRange);
var _833=function(date){
return date.getHours()*60*60+date.getMinutes()*60+date.getSeconds();
},_834=_833(this._clickableIncrementDate),_835=_833(this._visibleIncrementDate),_836=_833(this._visibleRangeDate),time=(this.value||this.currentFocus).getTime();
this._refDate=new Date(time-time%(_835*1000));
this._refDate.setFullYear(1970,0,1);
this._clickableIncrement=1;
this._totalIncrements=_836/_834;
this._visibleIncrement=_835/_834;
this._maxIncrement=(60*60*24)/_834;
var _837=this._getFilteredNodes(0,Math.min(this._totalIncrements>>1,10)-1),_838=this._getFilteredNodes(0,Math.min(this._totalIncrements,10)-_837.length,true,_837[0]);
dojo.forEach(_838.concat(_837),function(n){
this.timeMenu.appendChild(n);
},this);
},constructor:function(){
this.constraints={};
},postMixInProperties:function(){
this.inherited(arguments);
this._setConstraintsAttr(this.constraints);
},_setConstraintsAttr:function(_839){
dojo.mixin(this,_839);
if(!_839.locale){
_839.locale=this.lang;
}
},postCreate:function(){
this.connect(this.timeMenu,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
this._connects.push(dijit.typematic.addMouseListener(this.upArrow,this,"_onArrowUp",33,250));
this._connects.push(dijit.typematic.addMouseListener(this.downArrow,this,"_onArrowDown",33,250));
this.inherited(arguments);
},_buttonMouse:function(e){
dojo.toggleClass(e.currentTarget,e.currentTarget==this.upArrow?"dijitUpArrowHover":"dijitDownArrowHover",e.type=="mouseenter"||e.type=="mouseover");
},_createOption:function(_83a){
var date=new Date(this._refDate);
var _83b=this._clickableIncrementDate;
date.setHours(date.getHours()+_83b.getHours()*_83a,date.getMinutes()+_83b.getMinutes()*_83a,date.getSeconds()+_83b.getSeconds()*_83a);
if(this.constraints.selector=="time"){
date.setFullYear(1970,0,1);
}
var _83c=dojo.date.locale.format(date,this.constraints);
if(this.filterString&&_83c.toLowerCase().indexOf(this.filterString)!==0){
return null;
}
var div=dojo.create("div",{"class":this.baseClass+"Item"});
div.date=date;
div.index=_83a;
dojo.create("div",{"class":this.baseClass+"ItemInner",innerHTML:_83c},div);
if(_83a%this._visibleIncrement<1&&_83a%this._visibleIncrement>-1){
dojo.addClass(div,this.baseClass+"Marker");
}else{
if(!(_83a%this._clickableIncrement)){
dojo.addClass(div,this.baseClass+"Tick");
}
}
if(this.isDisabledDate(date)){
dojo.addClass(div,this.baseClass+"ItemDisabled");
}
if(this.value&&!dojo.date.compare(this.value,date,this.constraints.selector)){
div.selected=true;
dojo.addClass(div,this.baseClass+"ItemSelected");
if(dojo.hasClass(div,this.baseClass+"Marker")){
dojo.addClass(div,this.baseClass+"MarkerSelected");
}else{
dojo.addClass(div,this.baseClass+"TickSelected");
}
this._highlightOption(div,true);
}
return div;
},_onOptionSelected:function(tgt){
var _83d=tgt.target.date||tgt.target.parentNode.date;
if(!_83d||this.isDisabledDate(_83d)){
return;
}
this._highlighted_option=null;
this.set("value",_83d);
this.onChange(_83d);
},onChange:function(time){
},_highlightOption:function(node,_83e){
if(!node){
return;
}
if(_83e){
if(this._highlighted_option){
this._highlightOption(this._highlighted_option,false);
}
this._highlighted_option=node;
}else{
if(this._highlighted_option!==node){
return;
}else{
this._highlighted_option=null;
}
}
dojo.toggleClass(node,this.baseClass+"ItemHover",_83e);
if(dojo.hasClass(node,this.baseClass+"Marker")){
dojo.toggleClass(node,this.baseClass+"MarkerHover",_83e);
}else{
dojo.toggleClass(node,this.baseClass+"TickHover",_83e);
}
},onmouseover:function(e){
this._keyboardSelected=null;
var tgr=(e.target.parentNode===this.timeMenu)?e.target:e.target.parentNode;
if(!dojo.hasClass(tgr,this.baseClass+"Item")){
return;
}
this._highlightOption(tgr,true);
},onmouseout:function(e){
this._keyboardSelected=null;
var tgr=(e.target.parentNode===this.timeMenu)?e.target:e.target.parentNode;
this._highlightOption(tgr,false);
},_mouseWheeled:function(e){
this._keyboardSelected=null;
dojo.stopEvent(e);
var _83f=(dojo.isIE?e.wheelDelta:-e.detail);
this[(_83f>0?"_onArrowUp":"_onArrowDown")]();
},_onArrowUp:function(_840){
if(typeof _840=="number"&&_840==-1){
return;
}
if(!this.timeMenu.childNodes.length){
return;
}
var _841=this.timeMenu.childNodes[0].index;
var divs=this._getFilteredNodes(_841,1,true,this.timeMenu.childNodes[0]);
if(divs.length){
this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
this.timeMenu.insertBefore(divs[0],this.timeMenu.childNodes[0]);
}
},_onArrowDown:function(_842){
if(typeof _842=="number"&&_842==-1){
return;
}
if(!this.timeMenu.childNodes.length){
return;
}
var _843=this.timeMenu.childNodes[this.timeMenu.childNodes.length-1].index+1;
var divs=this._getFilteredNodes(_843,1,false,this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
if(divs.length){
this.timeMenu.removeChild(this.timeMenu.childNodes[0]);
this.timeMenu.appendChild(divs[0]);
}
},handleKey:function(e){
var dk=dojo.keys;
if(e.charOrCode==dk.DOWN_ARROW||e.charOrCode==dk.UP_ARROW){
dojo.stopEvent(e);
if(this._highlighted_option&&!this._highlighted_option.parentNode){
this._highlighted_option=null;
}
var _844=this.timeMenu,tgt=this._highlighted_option||dojo.query("."+this.baseClass+"ItemSelected",_844)[0];
if(!tgt){
tgt=_844.childNodes[0];
}else{
if(_844.childNodes.length){
if(e.charOrCode==dk.DOWN_ARROW&&!tgt.nextSibling){
this._onArrowDown();
}else{
if(e.charOrCode==dk.UP_ARROW&&!tgt.previousSibling){
this._onArrowUp();
}
}
if(e.charOrCode==dk.DOWN_ARROW){
tgt=tgt.nextSibling;
}else{
tgt=tgt.previousSibling;
}
}
}
this._highlightOption(tgt,true);
this._keyboardSelected=tgt;
return false;
}else{
if(e.charOrCode==dk.ENTER||e.charOrCode===dk.TAB){
if(!this._keyboardSelected&&e.charOrCode===dk.TAB){
return true;
}
if(this._highlighted_option){
this._onOptionSelected({target:this._highlighted_option});
}
return e.charOrCode===dk.TAB;
}
}
}});
dojo.provide("dijit.form.TimeTextBox");
dojo.declare("dijit.form.TimeTextBox",dijit.form._DateTimeTextBox,{baseClass:"dijitTextBox dijitComboBox dijitTimeTextBox",popupClass:"dijit._TimePicker",_selector:"time",value:new Date(""),_onKey:function(evt){
this.inherited(arguments);
switch(evt.keyCode){
case dojo.keys.ENTER:
case dojo.keys.TAB:
case dojo.keys.ESCAPE:
case dojo.keys.DOWN_ARROW:
case dojo.keys.UP_ARROW:
break;
default:
setTimeout(dojo.hitch(this,function(){
var val=this.get("displayedValue");
this.filterString=(val&&!this.parse(val,this.constraints))?val.toLowerCase():"";
if(this._opened){
this.closeDropDown();
}
this.openDropDown();
}),0);
}
}});
dojo.provide("dojo.cookie");
dojo.cookie=function(name,_845,_846){
var c=document.cookie;
if(arguments.length==1){
var _847=c.match(new RegExp("(?:^|; )"+dojo.regexp.escapeString(name)+"=([^;]*)"));
return _847?decodeURIComponent(_847[1]):undefined;
}else{
_846=_846||{};
var exp=_846.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_846.expires=d;
}
if(exp&&exp.toUTCString){
_846.expires=exp.toUTCString();
}
_845=encodeURIComponent(_845);
var _848=name+"="+_845,_849;
for(_849 in _846){
_848+="; "+_849;
var _84a=_846[_849];
if(_84a!==true){
_848+="="+_84a;
}
}
document.cookie=_848;
}
};
dojo.cookie.isSupported=function(){
if(!("cookieEnabled" in navigator)){
this("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed";
if(navigator.cookieEnabled){
this("__djCookieTest__","",{expires:-1});
}
}
return navigator.cookieEnabled;
};
dojo.provide("dijit.layout.BorderContainer");
dojo.declare("dijit.layout.BorderContainer",dijit.layout._LayoutWidget,{design:"headline",gutters:true,liveSplitters:true,persist:false,baseClass:"dijitBorderContainer",_splitterClass:"dijit.layout._Splitter",postMixInProperties:function(){
if(!this.gutters){
this.baseClass+="NoGutter";
}
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),this._setupChild,this);
this.inherited(arguments);
},_setupChild:function(_84b){
var _84c=_84b.region;
if(_84c){
this.inherited(arguments);
dojo.addClass(_84b.domNode,this.baseClass+"Pane");
var ltr=this.isLeftToRight();
if(_84c=="leading"){
_84c=ltr?"left":"right";
}
if(_84c=="trailing"){
_84c=ltr?"right":"left";
}
if(_84c!="center"&&(_84b.splitter||this.gutters)&&!_84b._splitterWidget){
var _84d=dojo.getObject(_84b.splitter?this._splitterClass:"dijit.layout._Gutter");
var _84e=new _84d({id:_84b.id+"_splitter",container:this,child:_84b,region:_84c,live:this.liveSplitters});
_84e.isSplitter=true;
_84b._splitterWidget=_84e;
dojo.place(_84e.domNode,_84b.domNode,"after");
_84e.startup();
}
_84b.region=_84c;
}
},layout:function(){
this._layoutChildren();
},addChild:function(_84f,_850){
this.inherited(arguments);
if(this._started){
this.layout();
}
},removeChild:function(_851){
var _852=_851.region;
var _853=_851._splitterWidget;
if(_853){
_853.destroy();
delete _851._splitterWidget;
}
this.inherited(arguments);
if(this._started){
this._layoutChildren();
}
dojo.removeClass(_851.domNode,this.baseClass+"Pane");
dojo.style(_851.domNode,{top:"auto",bottom:"auto",left:"auto",right:"auto",position:"static"});
dojo.style(_851.domNode,_852=="top"||_852=="bottom"?"width":"height","auto");
},getChildren:function(){
return dojo.filter(this.inherited(arguments),function(_854){
return !_854.isSplitter;
});
},getSplitter:function(_855){
return dojo.filter(this.getChildren(),function(_856){
return _856.region==_855;
})[0]._splitterWidget;
},resize:function(_857,_858){
if(!this.cs||!this.pe){
var node=this.domNode;
this.cs=dojo.getComputedStyle(node);
this.pe=dojo._getPadExtents(node,this.cs);
this.pe.r=dojo._toPixelValue(node,this.cs.paddingRight);
this.pe.b=dojo._toPixelValue(node,this.cs.paddingBottom);
dojo.style(node,"padding","0px");
}
this.inherited(arguments);
},_layoutChildren:function(_859,_85a){
if(!this._borderBox||!this._borderBox.h){
return;
}
var _85b=dojo.map(this.getChildren(),function(_85c,idx){
return {pane:_85c,weight:[_85c.region=="center"?Infinity:0,_85c.layoutPriority,(this.design=="sidebar"?1:-1)*(/top|bottom/.test(_85c.region)?1:-1),idx]};
},this);
_85b.sort(function(a,b){
var aw=a.weight,bw=b.weight;
for(var i=0;i<aw.length;i++){
if(aw[i]!=bw[i]){
return aw[i]-bw[i];
}
}
return 0;
});
var _85d=[];
dojo.forEach(_85b,function(_85e){
var pane=_85e.pane;
_85d.push(pane);
if(pane._splitterWidget){
_85d.push(pane._splitterWidget);
}
});
var dim={l:this.pe.l,t:this.pe.t,w:this._borderBox.w-this.pe.w,h:this._borderBox.h-this.pe.h};
dijit.layout.layoutChildren(this.domNode,dim,_85d,_859,_85a);
},destroyRecursive:function(){
dojo.forEach(this.getChildren(),function(_85f){
var _860=_85f._splitterWidget;
if(_860){
_860.destroy();
}
delete _85f._splitterWidget;
});
this.inherited(arguments);
}});
dojo.extend(dijit._Widget,{region:"",layoutPriority:0,splitter:false,minSize:0,maxSize:Infinity});
dojo.declare("dijit.layout._Splitter",[dijit._Widget,dijit._Templated],{live:true,templateString:"<div class=\"dijitSplitter\" dojoAttachEvent=\"onkeypress:_onKeyPress,onmousedown:_startDrag,onmouseenter:_onMouse,onmouseleave:_onMouse\" tabIndex=\"0\" role=\"separator\"><div class=\"dijitSplitterThumb\"></div></div>",postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
this._factor=/top|left/.test(this.region)?1:-1;
this._cookieName=this.container.id+"_"+this.region;
},buildRendering:function(){
this.inherited(arguments);
dojo.addClass(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V"));
if(this.container.persist){
var _861=dojo.cookie(this._cookieName);
if(_861){
this.child.domNode.style[this.horizontal?"height":"width"]=_861;
}
}
},_computeMaxSize:function(){
var dim=this.horizontal?"h":"w",_862=dojo.marginBox(this.child.domNode)[dim],_863=dojo.filter(this.container.getChildren(),function(_864){
return _864.region=="center";
})[0],_865=dojo.marginBox(_863.domNode)[dim];
return Math.min(this.child.maxSize,_862+_865);
},_startDrag:function(e){
if(!this.cover){
this.cover=dojo.doc.createElement("div");
dojo.addClass(this.cover,"dijitSplitterCover");
dojo.place(this.cover,this.child.domNode,"after");
}
dojo.addClass(this.cover,"dijitSplitterCoverActive");
if(this.fake){
dojo.destroy(this.fake);
}
if(!(this._resize=this.live)){
(this.fake=this.domNode.cloneNode(true)).removeAttribute("id");
dojo.addClass(this.domNode,"dijitSplitterShadow");
dojo.place(this.fake,this.domNode,"after");
}
dojo.addClass(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active");
if(this.fake){
dojo.removeClass(this.fake,"dijitSplitterHover dijitSplitter"+(this.horizontal?"H":"V")+"Hover");
}
var _866=this._factor,_867=this.horizontal,axis=_867?"pageY":"pageX",_868=e[axis],_869=this.domNode.style,dim=_867?"h":"w",_86a=dojo.marginBox(this.child.domNode)[dim],max=this._computeMaxSize(),min=this.child.minSize||20,_86b=this.region,_86c=_86b=="top"||_86b=="bottom"?"top":"left",_86d=parseInt(_869[_86c],10),_86e=this._resize,_86f=dojo.hitch(this.container,"_layoutChildren",this.child.id),de=dojo.doc;
this._handlers=(this._handlers||[]).concat([dojo.connect(de,"onmousemove",this._drag=function(e,_870){
var _871=e[axis]-_868,_872=_866*_871+_86a,_873=Math.max(Math.min(_872,max),min);
if(_86e||_870){
_86f(_873);
}
_869[_86c]=_871+_86d+_866*(_873-_872)+"px";
}),dojo.connect(de,"ondragstart",dojo.stopEvent),dojo.connect(dojo.body(),"onselectstart",dojo.stopEvent),dojo.connect(de,"onmouseup",this,"_stopDrag")]);
dojo.stopEvent(e);
},_onMouse:function(e){
var o=(e.type=="mouseover"||e.type=="mouseenter");
dojo.toggleClass(this.domNode,"dijitSplitterHover",o);
dojo.toggleClass(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V")+"Hover",o);
},_stopDrag:function(e){
try{
if(this.cover){
dojo.removeClass(this.cover,"dijitSplitterCoverActive");
}
if(this.fake){
dojo.destroy(this.fake);
}
dojo.removeClass(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active dijitSplitterShadow");
this._drag(e);
this._drag(e,true);
}
finally{
this._cleanupHandlers();
delete this._drag;
}
if(this.container.persist){
dojo.cookie(this._cookieName,this.child.domNode.style[this.horizontal?"height":"width"],{expires:365});
}
},_cleanupHandlers:function(){
dojo.forEach(this._handlers,dojo.disconnect);
delete this._handlers;
},_onKeyPress:function(e){
this._resize=true;
var _874=this.horizontal;
var tick=1;
var dk=dojo.keys;
switch(e.charOrCode){
case _874?dk.UP_ARROW:dk.LEFT_ARROW:
tick*=-1;
case _874?dk.DOWN_ARROW:dk.RIGHT_ARROW:
break;
default:
return;
}
var _875=dojo._getMarginSize(this.child.domNode)[_874?"h":"w"]+this._factor*tick;
this.container._layoutChildren(this.child.id,Math.max(Math.min(_875,this._computeMaxSize()),this.child.minSize));
dojo.stopEvent(e);
},destroy:function(){
this._cleanupHandlers();
delete this.child;
delete this.container;
delete this.cover;
delete this.fake;
this.inherited(arguments);
}});
dojo.declare("dijit.layout._Gutter",[dijit._Widget,dijit._Templated],{templateString:"<div class=\"dijitGutter\" role=\"presentation\"></div>",postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
},buildRendering:function(){
this.inherited(arguments);
dojo.addClass(this.domNode,"dijitGutter"+(this.horizontal?"H":"V"));
}});
dojo.provide("dijit.layout.StackController");
dojo.declare("dijit.layout.StackController",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<span role='tablist' dojoAttachEvent='onkeypress' class='dijitStackController'></span>",containerId:"",buttonWidget:"dijit.layout._StackButton",constructor:function(){
this.pane2button={};
this.pane2connects={};
this.pane2watches={};
},buildRendering:function(){
this.inherited(arguments);
dijit.setWaiRole(this.domNode,"tablist");
},postCreate:function(){
this.inherited(arguments);
this.subscribe(this.containerId+"-startup","onStartup");
this.subscribe(this.containerId+"-addChild","onAddChild");
this.subscribe(this.containerId+"-removeChild","onRemoveChild");
this.subscribe(this.containerId+"-selectChild","onSelectChild");
this.subscribe(this.containerId+"-containerKeyPress","onContainerKeyPress");
},onStartup:function(info){
dojo.forEach(info.children,this.onAddChild,this);
if(info.selected){
this.onSelectChild(info.selected);
}
},destroy:function(){
for(var pane in this.pane2button){
this.onRemoveChild(dijit.byId(pane));
}
this.inherited(arguments);
},onAddChild:function(page,_876){
var cls=dojo.getObject(this.buttonWidget);
var _877=new cls({id:this.id+"_"+page.id,label:page.title,dir:page.dir,lang:page.lang,showLabel:page.showTitle,iconClass:page.iconClass,closeButton:page.closable,title:page.tooltip});
dijit.setWaiState(_877.focusNode,"selected","false");
var _878=["title","showTitle","iconClass","closable","tooltip"],_879=["label","showLabel","iconClass","closeButton","title"];
this.pane2watches[page.id]=dojo.map(_878,function(_87a,idx){
return page.watch(_87a,function(name,_87b,_87c){
_877.set(_879[idx],_87c);
});
});
this.pane2connects[page.id]=[this.connect(_877,"onClick",dojo.hitch(this,"onButtonClick",page)),this.connect(_877,"onClickCloseButton",dojo.hitch(this,"onCloseButtonClick",page))];
this.addChild(_877,_876);
this.pane2button[page.id]=_877;
page.controlButton=_877;
if(!this._currentChild){
_877.focusNode.setAttribute("tabIndex","0");
dijit.setWaiState(_877.focusNode,"selected","true");
this._currentChild=page;
}
if(!this.isLeftToRight()&&dojo.isIE&&this._rectifyRtlTabList){
this._rectifyRtlTabList();
}
},onRemoveChild:function(page){
if(this._currentChild===page){
this._currentChild=null;
}
dojo.forEach(this.pane2connects[page.id],dojo.hitch(this,"disconnect"));
delete this.pane2connects[page.id];
dojo.forEach(this.pane2watches[page.id],function(w){
w.unwatch();
});
delete this.pane2watches[page.id];
var _87d=this.pane2button[page.id];
if(_87d){
this.removeChild(_87d);
delete this.pane2button[page.id];
_87d.destroy();
}
delete page.controlButton;
},onSelectChild:function(page){
if(!page){
return;
}
if(this._currentChild){
var _87e=this.pane2button[this._currentChild.id];
_87e.set("checked",false);
dijit.setWaiState(_87e.focusNode,"selected","false");
_87e.focusNode.setAttribute("tabIndex","-1");
}
var _87f=this.pane2button[page.id];
_87f.set("checked",true);
dijit.setWaiState(_87f.focusNode,"selected","true");
this._currentChild=page;
_87f.focusNode.setAttribute("tabIndex","0");
var _880=dijit.byId(this.containerId);
dijit.setWaiState(_880.containerNode,"labelledby",_87f.id);
},onButtonClick:function(page){
var _881=dijit.byId(this.containerId);
_881.selectChild(page);
},onCloseButtonClick:function(page){
var _882=dijit.byId(this.containerId);
_882.closeChild(page);
if(this._currentChild){
var b=this.pane2button[this._currentChild.id];
if(b){
dijit.focus(b.focusNode||b.domNode);
}
}
},adjacent:function(_883){
if(!this.isLeftToRight()&&(!this.tabPosition||/top|bottom/.test(this.tabPosition))){
_883=!_883;
}
var _884=this.getChildren();
var _885=dojo.indexOf(_884,this.pane2button[this._currentChild.id]);
var _886=_883?1:_884.length-1;
return _884[(_885+_886)%_884.length];
},onkeypress:function(e){
if(this.disabled||e.altKey){
return;
}
var _887=null;
if(e.ctrlKey||!e._djpage){
var k=dojo.keys;
switch(e.charOrCode){
case k.LEFT_ARROW:
case k.UP_ARROW:
if(!e._djpage){
_887=false;
}
break;
case k.PAGE_UP:
if(e.ctrlKey){
_887=false;
}
break;
case k.RIGHT_ARROW:
case k.DOWN_ARROW:
if(!e._djpage){
_887=true;
}
break;
case k.PAGE_DOWN:
if(e.ctrlKey){
_887=true;
}
break;
case k.HOME:
case k.END:
var _888=this.getChildren();
if(_888&&_888.length){
_888[e.charOrCode==k.HOME?0:_888.length-1].onClick();
}
dojo.stopEvent(e);
break;
case k.DELETE:
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
dojo.stopEvent(e);
break;
default:
if(e.ctrlKey){
if(e.charOrCode===k.TAB){
this.adjacent(!e.shiftKey).onClick();
dojo.stopEvent(e);
}else{
if(e.charOrCode=="w"){
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
dojo.stopEvent(e);
}
}
}
}
if(_887!==null){
this.adjacent(_887).onClick();
dojo.stopEvent(e);
}
}
},onContainerKeyPress:function(info){
info.e._djpage=info.page;
this.onkeypress(info.e);
}});
dojo.declare("dijit.layout._StackButton",dijit.form.ToggleButton,{tabIndex:"-1",buildRendering:function(evt){
this.inherited(arguments);
dijit.setWaiRole((this.focusNode||this.domNode),"tab");
},onClick:function(evt){
dijit.focus(this.focusNode);
},onClickCloseButton:function(evt){
evt.stopPropagation();
}});
dojo.provide("dijit.layout.StackContainer");
dojo.declare("dijit.layout.StackContainer",dijit.layout._LayoutWidget,{doLayout:true,persist:false,baseClass:"dijitStackContainer",buildRendering:function(){
this.inherited(arguments);
dojo.addClass(this.domNode,"dijitLayoutContainer");
dijit.setWaiRole(this.containerNode,"tabpanel");
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onkeypress",this._onKeyPress);
},startup:function(){
if(this._started){
return;
}
var _889=this.getChildren();
dojo.forEach(_889,this._setupChild,this);
if(this.persist){
this.selectedChildWidget=dijit.byId(dojo.cookie(this.id+"_selectedChild"));
}else{
dojo.some(_889,function(_88a){
if(_88a.selected){
this.selectedChildWidget=_88a;
}
return _88a.selected;
},this);
}
var _88b=this.selectedChildWidget;
if(!_88b&&_889[0]){
_88b=this.selectedChildWidget=_889[0];
_88b.selected=true;
}
dojo.publish(this.id+"-startup",[{children:_889,selected:_88b}]);
this.inherited(arguments);
},resize:function(){
var _88c=this.selectedChildWidget;
if(_88c&&!this._hasBeenShown){
this._hasBeenShown=true;
this._showChild(_88c);
}
this.inherited(arguments);
},_setupChild:function(_88d){
this.inherited(arguments);
dojo.replaceClass(_88d.domNode,"dijitHidden","dijitVisible");
_88d.domNode.title="";
},addChild:function(_88e,_88f){
this.inherited(arguments);
if(this._started){
dojo.publish(this.id+"-addChild",[_88e,_88f]);
this.layout();
if(!this.selectedChildWidget){
this.selectChild(_88e);
}
}
},removeChild:function(page){
this.inherited(arguments);
if(this._started){
dojo.publish(this.id+"-removeChild",[page]);
}
if(this._beingDestroyed){
return;
}
if(this.selectedChildWidget===page){
this.selectedChildWidget=undefined;
if(this._started){
var _890=this.getChildren();
if(_890.length){
this.selectChild(_890[0]);
}
}
}
if(this._started){
this.layout();
}
},selectChild:function(page,_891){
page=dijit.byId(page);
if(this.selectedChildWidget!=page){
var d=this._transition(page,this.selectedChildWidget,_891);
this._set("selectedChildWidget",page);
dojo.publish(this.id+"-selectChild",[page]);
if(this.persist){
dojo.cookie(this.id+"_selectedChild",this.selectedChildWidget.id);
}
}
return d;
},_transition:function(_892,_893,_894){
if(_893){
this._hideChild(_893);
}
var d=this._showChild(_892);
if(_892.resize){
if(this.doLayout){
_892.resize(this._containerContentBox||this._contentBox);
}else{
_892.resize();
}
}
return d;
},_adjacent:function(_895){
var _896=this.getChildren();
var _897=dojo.indexOf(_896,this.selectedChildWidget);
_897+=_895?1:_896.length-1;
return _896[_897%_896.length];
},forward:function(){
return this.selectChild(this._adjacent(true),true);
},back:function(){
return this.selectChild(this._adjacent(false),true);
},_onKeyPress:function(e){
dojo.publish(this.id+"-containerKeyPress",[{e:e,page:this}]);
},layout:function(){
if(this.doLayout&&this.selectedChildWidget&&this.selectedChildWidget.resize){
this.selectedChildWidget.resize(this._containerContentBox||this._contentBox);
}
},_showChild:function(page){
var _898=this.getChildren();
page.isFirstChild=(page==_898[0]);
page.isLastChild=(page==_898[_898.length-1]);
page._set("selected",true);
dojo.replaceClass(page.domNode,"dijitVisible","dijitHidden");
return page._onShow()||true;
},_hideChild:function(page){
page._set("selected",false);
dojo.replaceClass(page.domNode,"dijitHidden","dijitVisible");
page.onHide();
},closeChild:function(page){
var _899=page.onClose(this,page);
if(_899){
this.removeChild(page);
page.destroyRecursive();
}
},destroyDescendants:function(_89a){
dojo.forEach(this.getChildren(),function(_89b){
this.removeChild(_89b);
_89b.destroyRecursive(_89a);
},this);
}});
dojo.extend(dijit._Widget,{selected:false,closable:false,iconClass:"",showTitle:true});
dojo.provide("dijit.layout._TabContainerBase");
dojo.declare("dijit.layout._TabContainerBase",[dijit.layout.StackContainer,dijit._Templated],{tabPosition:"top",baseClass:"dijitTabContainer",tabStrip:false,nested:false,templateString:dojo.cache("dijit.layout","templates/TabContainer.html","<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" dojoAttachPoint=\"tablistNode\"></div>\n\t<div dojoAttachPoint=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" dojoAttachPoint=\"containerNode\"></div>\n</div>\n"),postMixInProperties:function(){
this.baseClass+=this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"");
this.srcNodeRef&&dojo.style(this.srcNodeRef,"visibility","hidden");
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.tablist=this._makeController(this.tablistNode);
if(!this.doLayout){
dojo.addClass(this.domNode,"dijitTabContainerNoLayout");
}
if(this.nested){
dojo.addClass(this.domNode,"dijitTabContainerNested");
dojo.addClass(this.tablist.containerNode,"dijitTabContainerTabListNested");
dojo.addClass(this.tablistSpacer,"dijitTabContainerSpacerNested");
dojo.addClass(this.containerNode,"dijitTabPaneWrapperNested");
}else{
dojo.addClass(this.domNode,"tabStrip-"+(this.tabStrip?"enabled":"disabled"));
}
},_setupChild:function(tab){
dojo.addClass(tab.domNode,"dijitTabPane");
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
this.tablist.startup();
this.inherited(arguments);
},layout:function(){
if(!this._contentBox||typeof (this._contentBox.l)=="undefined"){
return;
}
var sc=this.selectedChildWidget;
if(this.doLayout){
var _89c=this.tabPosition.replace(/-h/,"");
this.tablist.layoutAlign=_89c;
var _89d=[this.tablist,{domNode:this.tablistSpacer,layoutAlign:_89c},{domNode:this.containerNode,layoutAlign:"client"}];
dijit.layout.layoutChildren(this.domNode,this._contentBox,_89d);
this._containerContentBox=dijit.layout.marginBox2contentBox(this.containerNode,_89d[2]);
if(sc&&sc.resize){
sc.resize(this._containerContentBox);
}
}else{
if(this.tablist.resize){
var s=this.tablist.domNode.style;
s.width="0";
var _89e=dojo.contentBox(this.domNode).w;
s.width="";
this.tablist.resize({w:_89e});
}
if(sc&&sc.resize){
sc.resize();
}
}
},destroy:function(){
if(this.tablist){
this.tablist.destroy();
}
this.inherited(arguments);
}});
dojo.provide("dijit.layout.TabController");
dojo.declare("dijit.layout.TabController",dijit.layout.StackController,{templateString:"<div role='tablist' dojoAttachEvent='onkeypress:onkeypress'></div>",tabPosition:"top",buttonWidget:"dijit.layout._TabButton",_rectifyRtlTabList:function(){
if(0>=this.tabPosition.indexOf("-h")){
return;
}
if(!this.pane2button){
return;
}
var _89f=0;
for(var pane in this.pane2button){
var ow=this.pane2button[pane].innerDiv.scrollWidth;
_89f=Math.max(_89f,ow);
}
for(pane in this.pane2button){
this.pane2button[pane].innerDiv.style.width=_89f+"px";
}
}});
dojo.declare("dijit.layout._TabButton",dijit.layout._StackButton,{baseClass:"dijitTab",cssStateNodes:{closeNode:"dijitTabCloseButton"},templateString:dojo.cache("dijit.layout","templates/_TabButton.html","<div role=\"presentation\" dojoAttachPoint=\"titleNode\" dojoAttachEvent='onclick:onClick'>\n    <div role=\"presentation\" class='dijitTabInnerDiv' dojoAttachPoint='innerDiv'>\n        <div role=\"presentation\" class='dijitTabContent' dojoAttachPoint='tabContent'>\n        \t<div role=\"presentation\" dojoAttachPoint='focusNode'>\n\t\t        <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" dojoAttachPoint='iconNode' />\n\t\t        <span dojoAttachPoint='containerNode' class='tabLabel'></span>\n\t\t        <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" dojoAttachPoint='closeNode'\n\t\t        \t\tdojoAttachEvent='onclick: onClickCloseButton' role=\"presentation\">\n\t\t            <span dojoAttachPoint='closeText' class='dijitTabCloseText'>[x]</span\n\t\t        ></span>\n\t\t\t</div>\n        </div>\n    </div>\n</div>\n"),scrollOnFocus:false,buildRendering:function(){
this.inherited(arguments);
dojo.setSelectable(this.containerNode,false);
},startup:function(){
this.inherited(arguments);
var n=this.domNode;
setTimeout(function(){
n.className=n.className;
},1);
},_setCloseButtonAttr:function(disp){
this._set("closeButton",disp);
dojo.toggleClass(this.innerDiv,"dijitClosable",disp);
this.closeNode.style.display=disp?"":"none";
if(disp){
var _8a0=dojo.i18n.getLocalization("dijit","common");
if(this.closeNode){
dojo.attr(this.closeNode,"title",_8a0.itemClose);
}
var _8a0=dojo.i18n.getLocalization("dijit","common");
this._closeMenu=new dijit.Menu({id:this.id+"_Menu",dir:this.dir,lang:this.lang,targetNodeIds:[this.domNode]});
this._closeMenu.addChild(new dijit.MenuItem({label:_8a0.itemClose,dir:this.dir,lang:this.lang,onClick:dojo.hitch(this,"onClickCloseButton")}));
}else{
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
}
},_setLabelAttr:function(_8a1){
this.inherited(arguments);
if(this.showLabel==false&&!this.params.title){
this.iconNode.alt=dojo.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
},destroy:function(){
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
this.inherited(arguments);
}});
dojo.provide("dijit.layout.ScrollingTabController");
dojo.declare("dijit.layout.ScrollingTabController",dijit.layout.TabController,{templateString:dojo.cache("dijit.layout","templates/ScrollingTabController.html","<div class=\"dijitTabListContainer-${tabPosition}\" style=\"visibility:hidden\">\n\t<div dojoType=\"dijit.layout._ScrollingTabControllerMenuButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_menuBtn\" containerId=\"${containerId}\" iconClass=\"dijitTabStripMenuIcon\"\n\t\t\tdropDownPosition=\"below-alt, above-alt\"\n\t\t\tdojoAttachPoint=\"_menuBtn\" showLabel=false>&#9660;</div>\n\t<div dojoType=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_leftBtn\" iconClass=\"dijitTabStripSlideLeftIcon\"\n\t\t\tdojoAttachPoint=\"_leftBtn\" dojoAttachEvent=\"onClick: doSlideLeft\" showLabel=false>&#9664;</div>\n\t<div dojoType=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_rightBtn\" iconClass=\"dijitTabStripSlideRightIcon\"\n\t\t\tdojoAttachPoint=\"_rightBtn\" dojoAttachEvent=\"onClick: doSlideRight\" showLabel=false>&#9654;</div>\n\t<div class='dijitTabListWrapper' dojoAttachPoint='tablistWrapper'>\n\t\t<div role='tablist' dojoAttachEvent='onkeypress:onkeypress'\n\t\t\t\tdojoAttachPoint='containerNode' class='nowrapTabStrip'></div>\n\t</div>\n</div>\n"),useMenu:true,useSlider:true,tabStripClass:"",widgetsInTemplate:true,_minScroll:5,attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{"class":"containerNode"}),buildRendering:function(){
this.inherited(arguments);
var n=this.domNode;
this.scrollNode=this.tablistWrapper;
this._initButtons();
if(!this.tabStripClass){
this.tabStripClass="dijitTabContainer"+this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"")+"None";
dojo.addClass(n,"tabStrip-disabled");
}
dojo.addClass(this.tablistWrapper,this.tabStripClass);
},onStartup:function(){
this.inherited(arguments);
dojo.style(this.domNode,"visibility","visible");
this._postStartup=true;
},onAddChild:function(page,_8a2){
this.inherited(arguments);
dojo.forEach(["label","iconClass"],function(attr){
this.pane2watches[page.id].push(this.pane2button[page.id].watch(attr,dojo.hitch(this,function(name,_8a3,_8a4){
if(this._postStartup&&this._dim){
this.resize(this._dim);
}
})));
},this);
dojo.style(this.containerNode,"width",(dojo.style(this.containerNode,"width")+200)+"px");
},onRemoveChild:function(page,_8a5){
var _8a6=this.pane2button[page.id];
if(this._selectedTab===_8a6.domNode){
this._selectedTab=null;
}
this.inherited(arguments);
},_initButtons:function(){
this._btnWidth=0;
this._buttons=dojo.query("> .tabStripButton",this.domNode).filter(function(btn){
if((this.useMenu&&btn==this._menuBtn.domNode)||(this.useSlider&&(btn==this._rightBtn.domNode||btn==this._leftBtn.domNode))){
this._btnWidth+=dojo._getMarginSize(btn).w;
return true;
}else{
dojo.style(btn,"display","none");
return false;
}
},this);
},_getTabsWidth:function(){
var _8a7=this.getChildren();
if(_8a7.length){
var _8a8=_8a7[this.isLeftToRight()?0:_8a7.length-1].domNode,_8a9=_8a7[this.isLeftToRight()?_8a7.length-1:0].domNode;
return _8a9.offsetLeft+dojo.style(_8a9,"width")-_8a8.offsetLeft;
}else{
return 0;
}
},_enableBtn:function(_8aa){
var _8ab=this._getTabsWidth();
_8aa=_8aa||dojo.style(this.scrollNode,"width");
return _8ab>0&&_8aa<_8ab;
},resize:function(dim){
if(this.domNode.offsetWidth==0){
return;
}
this._dim=dim;
this.scrollNode.style.height="auto";
this._contentBox=dijit.layout.marginBox2contentBox(this.domNode,{h:0,w:dim.w});
this._contentBox.h=this.scrollNode.offsetHeight;
dojo.contentBox(this.domNode,this._contentBox);
var _8ac=this._enableBtn(this._contentBox.w);
this._buttons.style("display",_8ac?"":"none");
this._leftBtn.layoutAlign="left";
this._rightBtn.layoutAlign="right";
this._menuBtn.layoutAlign=this.isLeftToRight()?"right":"left";
dijit.layout.layoutChildren(this.domNode,this._contentBox,[this._menuBtn,this._leftBtn,this._rightBtn,{domNode:this.scrollNode,layoutAlign:"client"}]);
if(this._selectedTab){
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
var w=this.scrollNode,sl=this._convertToScrollLeft(this._getScrollForSelectedTab());
w.scrollLeft=sl;
}
this._setButtonClass(this._getScroll());
this._postResize=true;
},_getScroll:function(){
var sl=(this.isLeftToRight()||dojo.isIE<8||(dojo.isIE&&dojo.isQuirks)||dojo.isWebKit)?this.scrollNode.scrollLeft:dojo.style(this.containerNode,"width")-dojo.style(this.scrollNode,"width")+(dojo.isIE==8?-1:1)*this.scrollNode.scrollLeft;
return sl;
},_convertToScrollLeft:function(val){
if(this.isLeftToRight()||dojo.isIE<8||(dojo.isIE&&dojo.isQuirks)||dojo.isWebKit){
return val;
}else{
var _8ad=dojo.style(this.containerNode,"width")-dojo.style(this.scrollNode,"width");
return (dojo.isIE==8?-1:1)*(val-_8ad);
}
},onSelectChild:function(page){
var tab=this.pane2button[page.id];
if(!tab||!page){
return;
}
var node=tab.domNode;
if(this._postResize&&node!=this._selectedTab){
this._selectedTab=node;
var sl=this._getScroll();
if(sl>node.offsetLeft||sl+dojo.style(this.scrollNode,"width")<node.offsetLeft+dojo.style(node,"width")){
this.createSmoothScroll().play();
}
}
this.inherited(arguments);
},_getScrollBounds:function(){
var _8ae=this.getChildren(),_8af=dojo.style(this.scrollNode,"width"),_8b0=dojo.style(this.containerNode,"width"),_8b1=_8b0-_8af,_8b2=this._getTabsWidth();
if(_8ae.length&&_8b2>_8af){
return {min:this.isLeftToRight()?0:_8ae[_8ae.length-1].domNode.offsetLeft,max:this.isLeftToRight()?(_8ae[_8ae.length-1].domNode.offsetLeft+dojo.style(_8ae[_8ae.length-1].domNode,"width"))-_8af:_8b1};
}else{
var _8b3=this.isLeftToRight()?0:_8b1;
return {min:_8b3,max:_8b3};
}
},_getScrollForSelectedTab:function(){
var w=this.scrollNode,n=this._selectedTab,_8b4=dojo.style(this.scrollNode,"width"),_8b5=this._getScrollBounds();
var pos=(n.offsetLeft+dojo.style(n,"width")/2)-_8b4/2;
pos=Math.min(Math.max(pos,_8b5.min),_8b5.max);
return pos;
},createSmoothScroll:function(x){
if(arguments.length>0){
var _8b6=this._getScrollBounds();
x=Math.min(Math.max(x,_8b6.min),_8b6.max);
}else{
x=this._getScrollForSelectedTab();
}
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
var self=this,w=this.scrollNode,anim=new dojo._Animation({beforeBegin:function(){
if(this.curve){
delete this.curve;
}
var oldS=w.scrollLeft,newS=self._convertToScrollLeft(x);
anim.curve=new dojo._Line(oldS,newS);
},onAnimate:function(val){
w.scrollLeft=val;
}});
this._anim=anim;
this._setButtonClass(x);
return anim;
},_getBtnNode:function(e){
var n=e.target;
while(n&&!dojo.hasClass(n,"tabStripButton")){
n=n.parentNode;
}
return n;
},doSlideRight:function(e){
this.doSlide(1,this._getBtnNode(e));
},doSlideLeft:function(e){
this.doSlide(-1,this._getBtnNode(e));
},doSlide:function(_8b7,node){
if(node&&dojo.hasClass(node,"dijitTabDisabled")){
return;
}
var _8b8=dojo.style(this.scrollNode,"width");
var d=(_8b8*0.75)*_8b7;
var to=this._getScroll()+d;
this._setButtonClass(to);
this.createSmoothScroll(to).play();
},_setButtonClass:function(_8b9){
var _8ba=this._getScrollBounds();
this._leftBtn.set("disabled",_8b9<=_8ba.min);
this._rightBtn.set("disabled",_8b9>=_8ba.max);
}});
dojo.declare("dijit.layout._ScrollingTabControllerButtonMixin",null,{baseClass:"dijitTab tabStripButton",templateString:dojo.cache("dijit.layout","templates/_ScrollingTabControllerButton.html","<div dojoAttachEvent=\"onclick:_onButtonClick\">\n\t<div role=\"presentation\" class=\"dijitTabInnerDiv\" dojoattachpoint=\"innerDiv,focusNode\">\n\t\t<div role=\"presentation\" class=\"dijitTabContent dijitButtonContents\" dojoattachpoint=\"tabContent\">\n\t\t\t<img role=\"presentation\" alt=\"\" src=\"${_blankGif}\" class=\"dijitTabStripIcon\" dojoAttachPoint=\"iconNode\"/>\n\t\t\t<span dojoAttachPoint=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n\t\t</div>\n\t</div>\n</div>\n"),tabIndex:"",isFocusable:function(){
return false;
}});
dojo.declare("dijit.layout._ScrollingTabControllerButton",[dijit.form.Button,dijit.layout._ScrollingTabControllerButtonMixin]);
dojo.declare("dijit.layout._ScrollingTabControllerMenuButton",[dijit.form.Button,dijit._HasDropDown,dijit.layout._ScrollingTabControllerButtonMixin],{containerId:"",tabIndex:"-1",isLoaded:function(){
return false;
},loadDropDown:function(_8bb){
this.dropDown=new dijit.Menu({id:this.containerId+"_menu",dir:this.dir,lang:this.lang});
var _8bc=dijit.byId(this.containerId);
dojo.forEach(_8bc.getChildren(),function(page){
var _8bd=new dijit.MenuItem({id:page.id+"_stcMi",label:page.title,iconClass:page.iconClass,dir:page.dir,lang:page.lang,onClick:function(){
_8bc.selectChild(page);
}});
this.dropDown.addChild(_8bd);
},this);
_8bb();
},closeDropDown:function(_8be){
this.inherited(arguments);
if(this.dropDown){
this.dropDown.destroyRecursive();
delete this.dropDown;
}
}});
dojo.provide("dijit.layout.TabContainer");
dojo.declare("dijit.layout.TabContainer",dijit.layout._TabContainerBase,{useMenu:true,useSlider:true,controllerWidget:"",_makeController:function(_8bf){
var cls=this.baseClass+"-tabs"+(this.doLayout?"":" dijitTabNoLayout"),_8c0=dojo.getObject(this.controllerWidget);
return new _8c0({id:this.id+"_tablist",dir:this.dir,lang:this.lang,tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id,"class":cls,nested:this.nested,useMenu:this.useMenu,useSlider:this.useSlider,tabStripClass:this.tabStrip?this.baseClass+(this.tabStrip?"":"No")+"Strip":null},_8bf);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?"dijit.layout.ScrollingTabController":"dijit.layout.TabController";
}
}});
dojo.provide("dojo.data.ItemFileReadStore");
dojo.declare("dojo.data.ItemFileReadStore",null,{constructor:function(_8c1){
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=_8c1.url;
this._ccUrl=_8c1.url;
this.url=_8c1.url;
this._jsonData=_8c1.data;
this.data=null;
this._datatypeMap=_8c1.typeMap||{};
if(!this._datatypeMap["Date"]){
this._datatypeMap["Date"]={type:Date,deserialize:function(_8c2){
return dojo.date.stamp.fromISOString(_8c2);
}};
}
this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._reverseRefMap="_RRM";
this._loadInProgress=false;
this._queuedFetches=[];
if(_8c1.urlPreventCache!==undefined){
this.urlPreventCache=_8c1.urlPreventCache?true:false;
}
if(_8c1.hierarchical!==undefined){
this.hierarchical=_8c1.hierarchical?true:false;
}
if(_8c1.clearOnClose){
this.clearOnClose=true;
}
if("failOk" in _8c1){
this.failOk=_8c1.failOk?true:false;
}
},url:"",_ccUrl:"",data:null,typeMap:null,clearOnClose:false,urlPreventCache:false,failOk:false,hierarchical:true,_assertIsItem:function(item){
if(!this.isItem(item)){
throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.");
}
},_assertIsAttribute:function(_8c3){
if(typeof _8c3!=="string"){
throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.");
}
},getValue:function(item,_8c4,_8c5){
var _8c6=this.getValues(item,_8c4);
return (_8c6.length>0)?_8c6[0]:_8c5;
},getValues:function(item,_8c7){
this._assertIsItem(item);
this._assertIsAttribute(_8c7);
return (item[_8c7]||[]).slice(0);
},getAttributes:function(item){
this._assertIsItem(item);
var _8c8=[];
for(var key in item){
if((key!==this._storeRefPropName)&&(key!==this._itemNumPropName)&&(key!==this._rootItemPropName)&&(key!==this._reverseRefMap)){
_8c8.push(key);
}
}
return _8c8;
},hasAttribute:function(item,_8c9){
this._assertIsItem(item);
this._assertIsAttribute(_8c9);
return (_8c9 in item);
},containsValue:function(item,_8ca,_8cb){
var _8cc=undefined;
if(typeof _8cb==="string"){
_8cc=dojo.data.util.filter.patternToRegExp(_8cb,false);
}
return this._containsValue(item,_8ca,_8cb,_8cc);
},_containsValue:function(item,_8cd,_8ce,_8cf){
return dojo.some(this.getValues(item,_8cd),function(_8d0){
if(_8d0!==null&&!dojo.isObject(_8d0)&&_8cf){
if(_8d0.toString().match(_8cf)){
return true;
}
}else{
if(_8ce===_8d0){
return true;
}
}
});
},isItem:function(_8d1){
if(_8d1&&_8d1[this._storeRefPropName]===this){
if(this._arrayOfAllItems[_8d1[this._itemNumPropName]]===_8d1){
return true;
}
}
return false;
},isItemLoaded:function(_8d2){
return this.isItem(_8d2);
},loadItem:function(_8d3){
this._assertIsItem(_8d3.item);
},getFeatures:function(){
return this._features;
},getLabel:function(item){
if(this._labelAttr&&this.isItem(item)){
return this.getValue(item,this._labelAttr);
}
return undefined;
},getLabelAttributes:function(item){
if(this._labelAttr){
return [this._labelAttr];
}
return null;
},_fetchItems:function(_8d4,_8d5,_8d6){
var self=this,_8d7=function(_8d8,_8d9){
var _8da=[],i,key;
if(_8d8.query){
var _8db,_8dc=_8d8.queryOptions?_8d8.queryOptions.ignoreCase:false;
var _8dd={};
for(key in _8d8.query){
_8db=_8d8.query[key];
if(typeof _8db==="string"){
_8dd[key]=dojo.data.util.filter.patternToRegExp(_8db,_8dc);
}else{
if(_8db instanceof RegExp){
_8dd[key]=_8db;
}
}
}
for(i=0;i<_8d9.length;++i){
var _8de=true;
var _8df=_8d9[i];
if(_8df===null){
_8de=false;
}else{
for(key in _8d8.query){
_8db=_8d8.query[key];
if(!self._containsValue(_8df,key,_8db,_8dd[key])){
_8de=false;
}
}
}
if(_8de){
_8da.push(_8df);
}
}
_8d5(_8da,_8d8);
}else{
for(i=0;i<_8d9.length;++i){
var item=_8d9[i];
if(item!==null){
_8da.push(item);
}
}
_8d5(_8da,_8d8);
}
};
if(this._loadFinished){
_8d7(_8d4,this._getItemsArray(_8d4.queryOptions));
}else{
if(this._jsonFileUrl!==this._ccUrl){
dojo.deprecated("dojo.data.ItemFileReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
if(this._loadInProgress){
this._queuedFetches.push({args:_8d4,filter:_8d7});
}else{
this._loadInProgress=true;
var _8e0={url:self._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk};
var _8e1=dojo.xhrGet(_8e0);
_8e1.addCallback(function(data){
try{
self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
_8d7(_8d4,self._getItemsArray(_8d4.queryOptions));
self._handleQueuedFetches();
}
catch(e){
self._loadFinished=true;
self._loadInProgress=false;
_8d6(e,_8d4);
}
});
_8e1.addErrback(function(_8e2){
self._loadInProgress=false;
_8d6(_8e2,_8d4);
});
var _8e3=null;
if(_8d4.abort){
_8e3=_8d4.abort;
}
_8d4.abort=function(){
var df=_8e1;
if(df&&df.fired===-1){
df.cancel();
df=null;
}
if(_8e3){
_8e3.call(_8d4);
}
};
}
}else{
if(this._jsonData){
try{
this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
_8d7(_8d4,this._getItemsArray(_8d4.queryOptions));
}
catch(e){
_8d6(e,_8d4);
}
}else{
_8d6(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),_8d4);
}
}
}
},_handleQueuedFetches:function(){
if(this._queuedFetches.length>0){
for(var i=0;i<this._queuedFetches.length;i++){
var _8e4=this._queuedFetches[i],_8e5=_8e4.args,_8e6=_8e4.filter;
if(_8e6){
_8e6(_8e5,this._getItemsArray(_8e5.queryOptions));
}else{
this.fetchItemByIdentity(_8e5);
}
}
this._queuedFetches=[];
}
},_getItemsArray:function(_8e7){
if(_8e7&&_8e7.deep){
return this._arrayOfAllItems;
}
return this._arrayOfTopLevelItems;
},close:function(_8e8){
if(this.clearOnClose&&this._loadFinished&&!this._loadInProgress){
if(((this._jsonFileUrl==""||this._jsonFileUrl==null)&&(this.url==""||this.url==null))&&this.data==null){
}
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._itemsByIdentity=null;
this._loadInProgress=false;
this._queuedFetches=[];
}
},_getItemsFromLoadedData:function(_8e9){
var _8ea=false,self=this;
function _8eb(_8ec){
var _8ed=((_8ec!==null)&&(typeof _8ec==="object")&&(!dojo.isArray(_8ec)||_8ea)&&(!dojo.isFunction(_8ec))&&(_8ec.constructor==Object||dojo.isArray(_8ec))&&(typeof _8ec._reference==="undefined")&&(typeof _8ec._type==="undefined")&&(typeof _8ec._value==="undefined")&&self.hierarchical);
return _8ed;
};
function _8ee(_8ef){
self._arrayOfAllItems.push(_8ef);
for(var _8f0 in _8ef){
var _8f1=_8ef[_8f0];
if(_8f1){
if(dojo.isArray(_8f1)){
var _8f2=_8f1;
for(var k=0;k<_8f2.length;++k){
var _8f3=_8f2[k];
if(_8eb(_8f3)){
_8ee(_8f3);
}
}
}else{
if(_8eb(_8f1)){
_8ee(_8f1);
}
}
}
}
};
this._labelAttr=_8e9.label;
var i,item;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=_8e9.items;
for(i=0;i<this._arrayOfTopLevelItems.length;++i){
item=this._arrayOfTopLevelItems[i];
if(dojo.isArray(item)){
_8ea=true;
}
_8ee(item);
item[this._rootItemPropName]=true;
}
var _8f4={},key;
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
for(key in item){
if(key!==this._rootItemPropName){
var _8f5=item[key];
if(_8f5!==null){
if(!dojo.isArray(_8f5)){
item[key]=[_8f5];
}
}else{
item[key]=[null];
}
}
_8f4[key]=key;
}
}
while(_8f4[this._storeRefPropName]){
this._storeRefPropName+="_";
}
while(_8f4[this._itemNumPropName]){
this._itemNumPropName+="_";
}
while(_8f4[this._reverseRefMap]){
this._reverseRefMap+="_";
}
var _8f6;
var _8f7=_8e9.identifier;
if(_8f7){
this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=_8f7;
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
_8f6=item[_8f7];
var _8f8=_8f6[0];
if(!Object.hasOwnProperty.call(this._itemsByIdentity,_8f8)){
this._itemsByIdentity[_8f8]=item;
}else{
if(this._jsonFileUrl){
throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+_8f7+"].  Value collided: ["+_8f8+"]");
}else{
if(this._jsonData){
throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+_8f7+"].  Value collided: ["+_8f8+"]");
}
}
}
}
}else{
this._features["dojo.data.api.Identity"]=Number;
}
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
item[this._storeRefPropName]=this;
item[this._itemNumPropName]=i;
}
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
for(key in item){
_8f6=item[key];
for(var j=0;j<_8f6.length;++j){
_8f5=_8f6[j];
if(_8f5!==null&&typeof _8f5=="object"){
if(("_type" in _8f5)&&("_value" in _8f5)){
var type=_8f5._type;
var _8f9=this._datatypeMap[type];
if(!_8f9){
throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+type+"'");
}else{
if(dojo.isFunction(_8f9)){
_8f6[j]=new _8f9(_8f5._value);
}else{
if(dojo.isFunction(_8f9.deserialize)){
_8f6[j]=_8f9.deserialize(_8f5._value);
}else{
throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function");
}
}
}
}
if(_8f5._reference){
var _8fa=_8f5._reference;
if(!dojo.isObject(_8fa)){
_8f6[j]=this._getItemByIdentity(_8fa);
}else{
for(var k=0;k<this._arrayOfAllItems.length;++k){
var _8fb=this._arrayOfAllItems[k],_8fc=true;
for(var _8fd in _8fa){
if(_8fb[_8fd]!=_8fa[_8fd]){
_8fc=false;
}
}
if(_8fc){
_8f6[j]=_8fb;
}
}
}
if(this.referenceIntegrity){
var _8fe=_8f6[j];
if(this.isItem(_8fe)){
this._addReferenceToMap(_8fe,item,key);
}
}
}else{
if(this.isItem(_8f5)){
if(this.referenceIntegrity){
this._addReferenceToMap(_8f5,item,key);
}
}
}
}
}
}
}
},_addReferenceToMap:function(_8ff,_900,_901){
},getIdentity:function(item){
var _902=this._features["dojo.data.api.Identity"];
if(_902===Number){
return item[this._itemNumPropName];
}else{
var _903=item[_902];
if(_903){
return _903[0];
}
}
return null;
},fetchItemByIdentity:function(_904){
var item,_905;
if(!this._loadFinished){
var self=this;
if(this._jsonFileUrl!==this._ccUrl){
dojo.deprecated("dojo.data.ItemFileReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null&&this._jsonData==null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
if(this._loadInProgress){
this._queuedFetches.push({args:_904});
}else{
this._loadInProgress=true;
var _906={url:self._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk};
var _907=dojo.xhrGet(_906);
_907.addCallback(function(data){
var _908=_904.scope?_904.scope:dojo.global;
try{
self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
item=self._getItemByIdentity(_904.identity);
if(_904.onItem){
_904.onItem.call(_908,item);
}
self._handleQueuedFetches();
}
catch(error){
self._loadInProgress=false;
if(_904.onError){
_904.onError.call(_908,error);
}
}
});
_907.addErrback(function(_909){
self._loadInProgress=false;
if(_904.onError){
var _90a=_904.scope?_904.scope:dojo.global;
_904.onError.call(_90a,_909);
}
});
}
}else{
if(this._jsonData){
self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
item=self._getItemByIdentity(_904.identity);
if(_904.onItem){
_905=_904.scope?_904.scope:dojo.global;
_904.onItem.call(_905,item);
}
}
}
}else{
item=this._getItemByIdentity(_904.identity);
if(_904.onItem){
_905=_904.scope?_904.scope:dojo.global;
_904.onItem.call(_905,item);
}
}
},_getItemByIdentity:function(_90b){
var item=null;
if(this._itemsByIdentity&&Object.hasOwnProperty.call(this._itemsByIdentity,_90b)){
item=this._itemsByIdentity[_90b];
}else{
if(Object.hasOwnProperty.call(this._arrayOfAllItems,_90b)){
item=this._arrayOfAllItems[_90b];
}
}
if(item===undefined){
item=null;
}
return item;
},getIdentityAttributes:function(item){
var _90c=this._features["dojo.data.api.Identity"];
if(_90c===Number){
return null;
}else{
return [_90c];
}
},_forceLoad:function(){
var self=this;
if(this._jsonFileUrl!==this._ccUrl){
dojo.deprecated("dojo.data.ItemFileReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
var _90d={url:this._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk,sync:true};
var _90e=dojo.xhrGet(_90d);
_90e.addCallback(function(data){
try{
if(self._loadInProgress!==true&&!self._loadFinished){
self._getItemsFromLoadedData(data);
self._loadFinished=true;
}else{
if(self._loadInProgress){
throw new Error("dojo.data.ItemFileReadStore:  Unable to perform a synchronous load, an async load is in progress.");
}
}
}
catch(e){
throw e;
}
});
_90e.addErrback(function(_90f){
throw _90f;
});
}else{
if(this._jsonData){
self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
}
}
}});
dojo.extend(dojo.data.ItemFileReadStore,dojo.data.util.simpleFetch);
dojo.provide("dojo.data.ItemFileWriteStore");
dojo.declare("dojo.data.ItemFileWriteStore",dojo.data.ItemFileReadStore,{constructor:function(_910){
this._features["dojo.data.api.Write"]=true;
this._features["dojo.data.api.Notification"]=true;
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
if(!this._datatypeMap["Date"].serialize){
this._datatypeMap["Date"].serialize=function(obj){
return dojo.date.stamp.toISOString(obj,{zulu:true});
};
}
if(_910&&(_910.referenceIntegrity===false)){
this.referenceIntegrity=false;
}
this._saveInProgress=false;
},referenceIntegrity:true,_assert:function(_911){
if(!_911){
throw new Error("assertion failed in ItemFileWriteStore");
}
},_getIdentifierAttribute:function(){
var _912=this.getFeatures()["dojo.data.api.Identity"];
return _912;
},newItem:function(_913,_914){
this._assert(!this._saveInProgress);
if(!this._loadFinished){
this._forceLoad();
}
if(typeof _913!="object"&&typeof _913!="undefined"){
throw new Error("newItem() was passed something other than an object");
}
var _915=null;
var _916=this._getIdentifierAttribute();
if(_916===Number){
_915=this._arrayOfAllItems.length;
}else{
_915=_913[_916];
if(typeof _915==="undefined"){
throw new Error("newItem() was not passed an identity for the new item");
}
if(dojo.isArray(_915)){
throw new Error("newItem() was not passed an single-valued identity");
}
}
if(this._itemsByIdentity){
this._assert(typeof this._itemsByIdentity[_915]==="undefined");
}
this._assert(typeof this._pending._newItems[_915]==="undefined");
this._assert(typeof this._pending._deletedItems[_915]==="undefined");
var _917={};
_917[this._storeRefPropName]=this;
_917[this._itemNumPropName]=this._arrayOfAllItems.length;
if(this._itemsByIdentity){
this._itemsByIdentity[_915]=_917;
_917[_916]=[_915];
}
this._arrayOfAllItems.push(_917);
var _918=null;
if(_914&&_914.parent&&_914.attribute){
_918={item:_914.parent,attribute:_914.attribute,oldValue:undefined};
var _919=this.getValues(_914.parent,_914.attribute);
if(_919&&_919.length>0){
var _91a=_919.slice(0,_919.length);
if(_919.length===1){
_918.oldValue=_919[0];
}else{
_918.oldValue=_919.slice(0,_919.length);
}
_91a.push(_917);
this._setValueOrValues(_914.parent,_914.attribute,_91a,false);
_918.newValue=this.getValues(_914.parent,_914.attribute);
}else{
this._setValueOrValues(_914.parent,_914.attribute,_917,false);
_918.newValue=_917;
}
}else{
_917[this._rootItemPropName]=true;
this._arrayOfTopLevelItems.push(_917);
}
this._pending._newItems[_915]=_917;
for(var key in _913){
if(key===this._storeRefPropName||key===this._itemNumPropName){
throw new Error("encountered bug in ItemFileWriteStore.newItem");
}
var _91b=_913[key];
if(!dojo.isArray(_91b)){
_91b=[_91b];
}
_917[key]=_91b;
if(this.referenceIntegrity){
for(var i=0;i<_91b.length;i++){
var val=_91b[i];
if(this.isItem(val)){
this._addReferenceToMap(val,_917,key);
}
}
}
}
this.onNew(_917,_918);
return _917;
},_removeArrayElement:function(_91c,_91d){
var _91e=dojo.indexOf(_91c,_91d);
if(_91e!=-1){
_91c.splice(_91e,1);
return true;
}
return false;
},deleteItem:function(item){
this._assert(!this._saveInProgress);
this._assertIsItem(item);
var _91f=item[this._itemNumPropName];
var _920=this.getIdentity(item);
if(this.referenceIntegrity){
var _921=this.getAttributes(item);
if(item[this._reverseRefMap]){
item["backup_"+this._reverseRefMap]=dojo.clone(item[this._reverseRefMap]);
}
dojo.forEach(_921,function(_922){
dojo.forEach(this.getValues(item,_922),function(_923){
if(this.isItem(_923)){
if(!item["backupRefs_"+this._reverseRefMap]){
item["backupRefs_"+this._reverseRefMap]=[];
}
item["backupRefs_"+this._reverseRefMap].push({id:this.getIdentity(_923),attr:_922});
this._removeReferenceFromMap(_923,item,_922);
}
},this);
},this);
var _924=item[this._reverseRefMap];
if(_924){
for(var _925 in _924){
var _926=null;
if(this._itemsByIdentity){
_926=this._itemsByIdentity[_925];
}else{
_926=this._arrayOfAllItems[_925];
}
if(_926){
for(var _927 in _924[_925]){
var _928=this.getValues(_926,_927)||[];
var _929=dojo.filter(_928,function(_92a){
return !(this.isItem(_92a)&&this.getIdentity(_92a)==_920);
},this);
this._removeReferenceFromMap(item,_926,_927);
if(_929.length<_928.length){
this._setValueOrValues(_926,_927,_929,true);
}
}
}
}
}
}
this._arrayOfAllItems[_91f]=null;
item[this._storeRefPropName]=null;
if(this._itemsByIdentity){
delete this._itemsByIdentity[_920];
}
this._pending._deletedItems[_920]=item;
if(item[this._rootItemPropName]){
this._removeArrayElement(this._arrayOfTopLevelItems,item);
}
this.onDelete(item);
return true;
},setValue:function(item,_92b,_92c){
return this._setValueOrValues(item,_92b,_92c,true);
},setValues:function(item,_92d,_92e){
return this._setValueOrValues(item,_92d,_92e,true);
},unsetAttribute:function(item,_92f){
return this._setValueOrValues(item,_92f,[],true);
},_setValueOrValues:function(item,_930,_931,_932){
this._assert(!this._saveInProgress);
this._assertIsItem(item);
this._assert(dojo.isString(_930));
this._assert(typeof _931!=="undefined");
var _933=this._getIdentifierAttribute();
if(_930==_933){
throw new Error("ItemFileWriteStore does not have support for changing the value of an item's identifier.");
}
var _934=this._getValueOrValues(item,_930);
var _935=this.getIdentity(item);
if(!this._pending._modifiedItems[_935]){
var _936={};
for(var key in item){
if((key===this._storeRefPropName)||(key===this._itemNumPropName)||(key===this._rootItemPropName)){
_936[key]=item[key];
}else{
if(key===this._reverseRefMap){
_936[key]=dojo.clone(item[key]);
}else{
_936[key]=item[key].slice(0,item[key].length);
}
}
}
this._pending._modifiedItems[_935]=_936;
}
var _937=false;
if(dojo.isArray(_931)&&_931.length===0){
_937=delete item[_930];
_931=undefined;
if(this.referenceIntegrity&&_934){
var _938=_934;
if(!dojo.isArray(_938)){
_938=[_938];
}
for(var i=0;i<_938.length;i++){
var _939=_938[i];
if(this.isItem(_939)){
this._removeReferenceFromMap(_939,item,_930);
}
}
}
}else{
var _93a;
if(dojo.isArray(_931)){
var _93b=_931;
_93a=_931.slice(0,_931.length);
}else{
_93a=[_931];
}
if(this.referenceIntegrity){
if(_934){
var _938=_934;
if(!dojo.isArray(_938)){
_938=[_938];
}
var map={};
dojo.forEach(_938,function(_93c){
if(this.isItem(_93c)){
var id=this.getIdentity(_93c);
map[id.toString()]=true;
}
},this);
dojo.forEach(_93a,function(_93d){
if(this.isItem(_93d)){
var id=this.getIdentity(_93d);
if(map[id.toString()]){
delete map[id.toString()];
}else{
this._addReferenceToMap(_93d,item,_930);
}
}
},this);
for(var rId in map){
var _93e;
if(this._itemsByIdentity){
_93e=this._itemsByIdentity[rId];
}else{
_93e=this._arrayOfAllItems[rId];
}
this._removeReferenceFromMap(_93e,item,_930);
}
}else{
for(var i=0;i<_93a.length;i++){
var _939=_93a[i];
if(this.isItem(_939)){
this._addReferenceToMap(_939,item,_930);
}
}
}
}
item[_930]=_93a;
_937=true;
}
if(_932){
this.onSet(item,_930,_934,_931);
}
return _937;
},_addReferenceToMap:function(_93f,_940,_941){
var _942=this.getIdentity(_940);
var _943=_93f[this._reverseRefMap];
if(!_943){
_943=_93f[this._reverseRefMap]={};
}
var _944=_943[_942];
if(!_944){
_944=_943[_942]={};
}
_944[_941]=true;
},_removeReferenceFromMap:function(_945,_946,_947){
var _948=this.getIdentity(_946);
var _949=_945[this._reverseRefMap];
var _94a;
if(_949){
for(_94a in _949){
if(_94a==_948){
delete _949[_94a][_947];
if(this._isEmpty(_949[_94a])){
delete _949[_94a];
}
}
}
if(this._isEmpty(_949)){
delete _945[this._reverseRefMap];
}
}
},_dumpReferenceMap:function(){
var i;
for(i=0;i<this._arrayOfAllItems.length;i++){
var item=this._arrayOfAllItems[i];
if(item&&item[this._reverseRefMap]){
}
}
},_getValueOrValues:function(item,_94b){
var _94c=undefined;
if(this.hasAttribute(item,_94b)){
var _94d=this.getValues(item,_94b);
if(_94d.length==1){
_94c=_94d[0];
}else{
_94c=_94d;
}
}
return _94c;
},_flatten:function(_94e){
if(this.isItem(_94e)){
var item=_94e;
var _94f=this.getIdentity(item);
var _950={_reference:_94f};
return _950;
}else{
if(typeof _94e==="object"){
for(var type in this._datatypeMap){
var _951=this._datatypeMap[type];
if(dojo.isObject(_951)&&!dojo.isFunction(_951)){
if(_94e instanceof _951.type){
if(!_951.serialize){
throw new Error("ItemFileWriteStore:  No serializer defined for type mapping: ["+type+"]");
}
return {_type:type,_value:_951.serialize(_94e)};
}
}else{
if(_94e instanceof _951){
return {_type:type,_value:_94e.toString()};
}
}
}
}
return _94e;
}
},_getNewFileContentString:function(){
var _952={};
var _953=this._getIdentifierAttribute();
if(_953!==Number){
_952.identifier=_953;
}
if(this._labelAttr){
_952.label=this._labelAttr;
}
_952.items=[];
for(var i=0;i<this._arrayOfAllItems.length;++i){
var item=this._arrayOfAllItems[i];
if(item!==null){
var _954={};
for(var key in item){
if(key!==this._storeRefPropName&&key!==this._itemNumPropName&&key!==this._reverseRefMap&&key!==this._rootItemPropName){
var _955=key;
var _956=this.getValues(item,_955);
if(_956.length==1){
_954[_955]=this._flatten(_956[0]);
}else{
var _957=[];
for(var j=0;j<_956.length;++j){
_957.push(this._flatten(_956[j]));
_954[_955]=_957;
}
}
}
}
_952.items.push(_954);
}
}
var _958=true;
return dojo.toJson(_952,_958);
},_isEmpty:function(_959){
var _95a=true;
if(dojo.isObject(_959)){
var i;
for(i in _959){
_95a=false;
break;
}
}else{
if(dojo.isArray(_959)){
if(_959.length>0){
_95a=false;
}
}
}
return _95a;
},save:function(_95b){
this._assert(!this._saveInProgress);
this._saveInProgress=true;
var self=this;
var _95c=function(){
self._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
self._saveInProgress=false;
if(_95b&&_95b.onComplete){
var _95d=_95b.scope||dojo.global;
_95b.onComplete.call(_95d);
}
};
var _95e=function(err){
self._saveInProgress=false;
if(_95b&&_95b.onError){
var _95f=_95b.scope||dojo.global;
_95b.onError.call(_95f,err);
}
};
if(this._saveEverything){
var _960=this._getNewFileContentString();
this._saveEverything(_95c,_95e,_960);
}
if(this._saveCustom){
this._saveCustom(_95c,_95e);
}
if(!this._saveEverything&&!this._saveCustom){
_95c();
}
},revert:function(){
this._assert(!this._saveInProgress);
var _961;
for(_961 in this._pending._modifiedItems){
var _962=this._pending._modifiedItems[_961];
var _963=null;
if(this._itemsByIdentity){
_963=this._itemsByIdentity[_961];
}else{
_963=this._arrayOfAllItems[_961];
}
_962[this._storeRefPropName]=this;
for(key in _963){
delete _963[key];
}
dojo.mixin(_963,_962);
}
var _964;
for(_961 in this._pending._deletedItems){
_964=this._pending._deletedItems[_961];
_964[this._storeRefPropName]=this;
var _965=_964[this._itemNumPropName];
if(_964["backup_"+this._reverseRefMap]){
_964[this._reverseRefMap]=_964["backup_"+this._reverseRefMap];
delete _964["backup_"+this._reverseRefMap];
}
this._arrayOfAllItems[_965]=_964;
if(this._itemsByIdentity){
this._itemsByIdentity[_961]=_964;
}
if(_964[this._rootItemPropName]){
this._arrayOfTopLevelItems.push(_964);
}
}
for(_961 in this._pending._deletedItems){
_964=this._pending._deletedItems[_961];
if(_964["backupRefs_"+this._reverseRefMap]){
dojo.forEach(_964["backupRefs_"+this._reverseRefMap],function(_966){
var _967;
if(this._itemsByIdentity){
_967=this._itemsByIdentity[_966.id];
}else{
_967=this._arrayOfAllItems[_966.id];
}
this._addReferenceToMap(_967,_964,_966.attr);
},this);
delete _964["backupRefs_"+this._reverseRefMap];
}
}
for(_961 in this._pending._newItems){
var _968=this._pending._newItems[_961];
_968[this._storeRefPropName]=null;
this._arrayOfAllItems[_968[this._itemNumPropName]]=null;
if(_968[this._rootItemPropName]){
this._removeArrayElement(this._arrayOfTopLevelItems,_968);
}
if(this._itemsByIdentity){
delete this._itemsByIdentity[_961];
}
}
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
return true;
},isDirty:function(item){
if(item){
var _969=this.getIdentity(item);
return new Boolean(this._pending._newItems[_969]||this._pending._modifiedItems[_969]||this._pending._deletedItems[_969]).valueOf();
}else{
if(!this._isEmpty(this._pending._newItems)||!this._isEmpty(this._pending._modifiedItems)||!this._isEmpty(this._pending._deletedItems)){
return true;
}
return false;
}
},onSet:function(item,_96a,_96b,_96c){
},onNew:function(_96d,_96e){
},onDelete:function(_96f){
},close:function(_970){
if(this.clearOnClose){
if(!this.isDirty()){
this.inherited(arguments);
}else{
throw new Error("dojo.data.ItemFileWriteStore: There are unsaved changes present in the store.  Please save or revert the changes before invoking close.");
}
}
}});
dojo.provide("dojox.string.Builder");
dojox.string.Builder=function(str){
var b="";
this.length=0;
this.append=function(s){
if(arguments.length>1){
var tmp="",l=arguments.length;
switch(l){
case 9:
tmp=""+arguments[8]+tmp;
case 8:
tmp=""+arguments[7]+tmp;
case 7:
tmp=""+arguments[6]+tmp;
case 6:
tmp=""+arguments[5]+tmp;
case 5:
tmp=""+arguments[4]+tmp;
case 4:
tmp=""+arguments[3]+tmp;
case 3:
tmp=""+arguments[2]+tmp;
case 2:
b+=""+arguments[0]+arguments[1]+tmp;
break;
default:
var i=0;
while(i<arguments.length){
tmp+=arguments[i++];
}
b+=tmp;
}
}else{
b+=s;
}
this.length=b.length;
return this;
};
this.concat=function(s){
return this.append.apply(this,arguments);
};
this.appendArray=function(_971){
return this.append.apply(this,_971);
};
this.clear=function(){
b="";
this.length=0;
return this;
};
this.replace=function(_972,_973){
b=b.replace(_972,_973);
this.length=b.length;
return this;
};
this.remove=function(_974,len){
if(len===undefined){
len=b.length;
}
if(len==0){
return this;
}
b=b.substr(0,_974)+b.substr(_974+len);
this.length=b.length;
return this;
};
this.insert=function(_975,str){
if(_975==0){
b=str+b;
}else{
b=b.slice(0,_975)+str+b.slice(_975);
}
this.length=b.length;
return this;
};
this.toString=function(){
return b;
};
if(str){
this.append(str);
}
};
dojo.provide("dojox.string.tokenize");
dojox.string.tokenize=function(str,re,_976,_977){
var _978=[];
var _979,_97a,_97b=0;
while(_979=re.exec(str)){
_97a=str.slice(_97b,re.lastIndex-_979[0].length);
if(_97a.length){
_978.push(_97a);
}
if(_976){
if(dojo.isOpera){
var copy=_979.slice(0);
while(copy.length<_979.length){
copy.push(null);
}
_979=copy;
}
var _97c=_976.apply(_977,_979.slice(1).concat(_978.length));
if(typeof _97c!="undefined"){
_978.push(_97c);
}
}
_97b=re.lastIndex;
}
_97a=str.slice(_97b);
if(_97a.length){
_978.push(_97a);
}
return _978;
};
dojo.provide("dojox.dtl._base");
dojo.experimental("dojox.dtl");
(function(){
var dd=dojox.dtl;
dd.TOKEN_BLOCK=-1;
dd.TOKEN_VAR=-2;
dd.TOKEN_COMMENT=-3;
dd.TOKEN_TEXT=3;
dd._Context=dojo.extend(function(dict){
if(dict){
dojo._mixin(this,dict);
if(dict.get){
this._getter=dict.get;
delete this.get;
}
}
},{push:function(){
var last=this;
var _97d=dojo.delegate(this);
_97d.pop=function(){
return last;
};
return _97d;
},pop:function(){
throw new Error("pop() called on empty Context");
},get:function(key,_97e){
var n=this._normalize;
if(this._getter){
var got=this._getter(key);
if(typeof got!="undefined"){
return n(got);
}
}
if(typeof this[key]!="undefined"){
return n(this[key]);
}
return _97e;
},_normalize:function(_97f){
if(_97f instanceof Date){
_97f.year=_97f.getFullYear();
_97f.month=_97f.getMonth()+1;
_97f.day=_97f.getDate();
_97f.date=_97f.year+"-"+("0"+_97f.month).slice(-2)+"-"+("0"+_97f.day).slice(-2);
_97f.hour=_97f.getHours();
_97f.minute=_97f.getMinutes();
_97f.second=_97f.getSeconds();
_97f.microsecond=_97f.getMilliseconds();
}
return _97f;
},update:function(dict){
var _980=this.push();
if(dict){
dojo._mixin(this,dict);
}
return _980;
}});
var _981=/("(?:[^"\\]*(?:\\.[^"\\]*)*)"|'(?:[^'\\]*(?:\\.[^'\\]*)*)'|[^\s]+)/g;
var _982=/\s+/g;
var _983=function(_984,_985){
_984=_984||_982;
if(!(_984 instanceof RegExp)){
_984=new RegExp(_984,"g");
}
if(!_984.global){
throw new Error("You must use a globally flagged RegExp with split "+_984);
}
_984.exec("");
var part,_986=[],_987=0,i=0;
while(part=_984.exec(this)){
_986.push(this.slice(_987,_984.lastIndex-part[0].length));
_987=_984.lastIndex;
if(_985&&(++i>_985-1)){
break;
}
}
_986.push(this.slice(_987));
return _986;
};
dd.Token=function(_988,_989){
this.token_type=_988;
this.contents=new String(dojo.trim(_989));
this.contents.split=_983;
this.split=function(){
return String.prototype.split.apply(this.contents,arguments);
};
};
dd.Token.prototype.split_contents=function(_98a){
var bit,bits=[],i=0;
_98a=_98a||999;
while(i++<_98a&&(bit=_981.exec(this.contents))){
bit=bit[0];
if(bit.charAt(0)=="\""&&bit.slice(-1)=="\""){
bits.push("\""+bit.slice(1,-1).replace("\\\"","\"").replace("\\\\","\\")+"\"");
}else{
if(bit.charAt(0)=="'"&&bit.slice(-1)=="'"){
bits.push("'"+bit.slice(1,-1).replace("\\'","'").replace("\\\\","\\")+"'");
}else{
bits.push(bit);
}
}
}
return bits;
};
var ddt=dd.text={_get:function(_98b,name,_98c){
var _98d=dd.register.get(_98b,name.toLowerCase(),_98c);
if(!_98d){
if(!_98c){
throw new Error("No tag found for "+name);
}
return null;
}
var fn=_98d[1];
var _98e=_98d[2];
var _98f;
if(fn.indexOf(":")!=-1){
_98f=fn.split(":");
fn=_98f.pop();
}
dojo["require"](_98e);
var _990=dojo.getObject(_98e);
return _990[fn||name]||_990[name+"_"]||_990[fn+"_"];
},getTag:function(name,_991){
return ddt._get("tag",name,_991);
},getFilter:function(name,_992){
return ddt._get("filter",name,_992);
},getTemplate:function(file){
return new dd.Template(ddt.getTemplateString(file));
},getTemplateString:function(file){
return dojo._getText(file.toString())||"";
},_resolveLazy:function(_993,sync,json){
if(sync){
if(json){
return dojo.fromJson(dojo._getText(_993))||{};
}else{
return dd.text.getTemplateString(_993);
}
}else{
return dojo.xhrGet({handleAs:(json)?"json":"text",url:_993});
}
},_resolveTemplateArg:function(arg,sync){
if(ddt._isTemplate(arg)){
if(!sync){
var d=new dojo.Deferred();
d.callback(arg);
return d;
}
return arg;
}
return ddt._resolveLazy(arg,sync);
},_isTemplate:function(arg){
return (typeof arg=="undefined")||(typeof arg=="string"&&(arg.match(/^\s*[<{]/)||arg.indexOf(" ")!=-1));
},_resolveContextArg:function(arg,sync){
if(arg.constructor==Object){
if(!sync){
var d=new dojo.Deferred;
d.callback(arg);
return d;
}
return arg;
}
return ddt._resolveLazy(arg,sync,true);
},_re:/(?:\{\{\s*(.+?)\s*\}\}|\{%\s*(load\s*)?(.+?)\s*%\})/g,tokenize:function(str){
return dojox.string.tokenize(str,ddt._re,ddt._parseDelims);
},_parseDelims:function(varr,load,tag){
if(varr){
return [dd.TOKEN_VAR,varr];
}else{
if(load){
var _994=dojo.trim(tag).split(/\s+/g);
for(var i=0,part;part=_994[i];i++){
dojo["require"](part);
}
}else{
return [dd.TOKEN_BLOCK,tag];
}
}
}};
dd.Template=dojo.extend(function(_995,_996){
var str=_996?_995:ddt._resolveTemplateArg(_995,true)||"";
var _997=ddt.tokenize(str);
var _998=new dd._Parser(_997);
this.nodelist=_998.parse();
},{update:function(node,_999){
return ddt._resolveContextArg(_999).addCallback(this,function(_99a){
var _99b=this.render(new dd._Context(_99a));
if(node.forEach){
node.forEach(function(item){
item.innerHTML=_99b;
});
}else{
dojo.byId(node).innerHTML=_99b;
}
return this;
});
},render:function(_99c,_99d){
_99d=_99d||this.getBuffer();
_99c=_99c||new dd._Context({});
return this.nodelist.render(_99c,_99d)+"";
},getBuffer:function(){
return new dojox.string.Builder();
}});
var qfRe=/\{\{\s*(.+?)\s*\}\}/g;
dd.quickFilter=function(str){
if(!str){
return new dd._NodeList();
}
if(str.indexOf("{%")==-1){
return new dd._QuickNodeList(dojox.string.tokenize(str,qfRe,function(_99e){
return new dd._Filter(_99e);
}));
}
};
dd._QuickNodeList=dojo.extend(function(_99f){
this.contents=_99f;
},{render:function(_9a0,_9a1){
for(var i=0,l=this.contents.length;i<l;i++){
if(this.contents[i].resolve){
_9a1=_9a1.concat(this.contents[i].resolve(_9a0));
}else{
_9a1=_9a1.concat(this.contents[i]);
}
}
return _9a1;
},dummyRender:function(_9a2){
return this.render(_9a2,dd.Template.prototype.getBuffer()).toString();
},clone:function(_9a3){
return this;
}});
dd._Filter=dojo.extend(function(_9a4){
if(!_9a4){
throw new Error("Filter must be called with variable name");
}
this.contents=_9a4;
var _9a5=this._cache[_9a4];
if(_9a5){
this.key=_9a5[0];
this.filters=_9a5[1];
}else{
this.filters=[];
dojox.string.tokenize(_9a4,this._re,this._tokenize,this);
this._cache[_9a4]=[this.key,this.filters];
}
},{_cache:{},_re:/(?:^_\("([^\\"]*(?:\\.[^\\"])*)"\)|^"([^\\"]*(?:\\.[^\\"]*)*)"|^([a-zA-Z0-9_.]+)|\|(\w+)(?::(?:_\("([^\\"]*(?:\\.[^\\"])*)"\)|"([^\\"]*(?:\\.[^\\"]*)*)"|([a-zA-Z0-9_.]+)|'([^\\']*(?:\\.[^\\']*)*)'))?|^'([^\\']*(?:\\.[^\\']*)*)')/g,_values:{0:"\"",1:"\"",2:"",8:"\""},_args:{4:"\"",5:"\"",6:"",7:"'"},_tokenize:function(){
var pos,arg;
for(var i=0,has=[];i<arguments.length;i++){
has[i]=(typeof arguments[i]!="undefined"&&typeof arguments[i]=="string"&&arguments[i]);
}
if(!this.key){
for(pos in this._values){
if(has[pos]){
this.key=this._values[pos]+arguments[pos]+this._values[pos];
break;
}
}
}else{
for(pos in this._args){
if(has[pos]){
var _9a6=arguments[pos];
if(this._args[pos]=="'"){
_9a6=_9a6.replace(/\\'/g,"'");
}else{
if(this._args[pos]=="\""){
_9a6=_9a6.replace(/\\"/g,"\"");
}
}
arg=[!this._args[pos],_9a6];
break;
}
}
var fn=ddt.getFilter(arguments[3]);
if(!dojo.isFunction(fn)){
throw new Error(arguments[3]+" is not registered as a filter");
}
this.filters.push([fn,arg]);
}
},getExpression:function(){
return this.contents;
},resolve:function(_9a7){
if(typeof this.key=="undefined"){
return "";
}
var str=this.resolvePath(this.key,_9a7);
for(var i=0,_9a8;_9a8=this.filters[i];i++){
if(_9a8[1]){
if(_9a8[1][0]){
str=_9a8[0](str,this.resolvePath(_9a8[1][1],_9a7));
}else{
str=_9a8[0](str,_9a8[1][1]);
}
}else{
str=_9a8[0](str);
}
}
return str;
},resolvePath:function(path,_9a9){
var _9aa,_9ab;
var _9ac=path.charAt(0);
var last=path.slice(-1);
if(!isNaN(parseInt(_9ac))){
_9aa=(path.indexOf(".")==-1)?parseInt(path):parseFloat(path);
}else{
if(_9ac=="\""&&_9ac==last){
_9aa=path.slice(1,-1);
}else{
if(path=="true"){
return true;
}
if(path=="false"){
return false;
}
if(path=="null"||path=="None"){
return null;
}
_9ab=path.split(".");
_9aa=_9a9.get(_9ab[0]);
if(dojo.isFunction(_9aa)){
var self=_9a9.getThis&&_9a9.getThis();
if(_9aa.alters_data){
_9aa="";
}else{
if(self){
_9aa=_9aa.call(self);
}else{
_9aa="";
}
}
}
for(var i=1;i<_9ab.length;i++){
var part=_9ab[i];
if(_9aa){
var base=_9aa;
if(dojo.isObject(_9aa)&&part=="items"&&typeof _9aa[part]=="undefined"){
var _9ad=[];
for(var key in _9aa){
_9ad.push([key,_9aa[key]]);
}
_9aa=_9ad;
continue;
}
if(_9aa.get&&dojo.isFunction(_9aa.get)&&_9aa.get.safe){
_9aa=_9aa.get(part);
}else{
if(typeof _9aa[part]=="undefined"){
_9aa=_9aa[part];
break;
}else{
_9aa=_9aa[part];
}
}
if(dojo.isFunction(_9aa)){
if(_9aa.alters_data){
_9aa="";
}else{
_9aa=_9aa.call(base);
}
}else{
if(_9aa instanceof Date){
_9aa=dd._Context.prototype._normalize(_9aa);
}
}
}else{
return "";
}
}
}
}
return _9aa;
}});
dd._TextNode=dd._Node=dojo.extend(function(obj){
this.contents=obj;
},{set:function(data){
this.contents=data;
return this;
},render:function(_9ae,_9af){
return _9af.concat(this.contents);
},isEmpty:function(){
return !dojo.trim(this.contents);
},clone:function(){
return this;
}});
dd._NodeList=dojo.extend(function(_9b0){
this.contents=_9b0||[];
this.last="";
},{push:function(node){
this.contents.push(node);
return this;
},concat:function(_9b1){
this.contents=this.contents.concat(_9b1);
return this;
},render:function(_9b2,_9b3){
for(var i=0;i<this.contents.length;i++){
_9b3=this.contents[i].render(_9b2,_9b3);
if(!_9b3){
throw new Error("Template must return buffer");
}
}
return _9b3;
},dummyRender:function(_9b4){
return this.render(_9b4,dd.Template.prototype.getBuffer()).toString();
},unrender:function(){
return arguments[1];
},clone:function(){
return this;
},rtrim:function(){
while(1){
i=this.contents.length-1;
if(this.contents[i] instanceof dd._TextNode&&this.contents[i].isEmpty()){
this.contents.pop();
}else{
break;
}
}
return this;
}});
dd._VarNode=dojo.extend(function(str){
this.contents=new dd._Filter(str);
},{render:function(_9b5,_9b6){
var str=this.contents.resolve(_9b5);
if(!str.safe){
str=dd._base.escape(""+str);
}
return _9b6.concat(str);
}});
dd._noOpNode=new function(){
this.render=this.unrender=function(){
return arguments[1];
};
this.clone=function(){
return this;
};
};
dd._Parser=dojo.extend(function(_9b7){
this.contents=_9b7;
},{i:0,parse:function(_9b8){
var _9b9={},_9ba;
_9b8=_9b8||[];
for(var i=0;i<_9b8.length;i++){
_9b9[_9b8[i]]=true;
}
var _9bb=new dd._NodeList();
while(this.i<this.contents.length){
_9ba=this.contents[this.i++];
if(typeof _9ba=="string"){
_9bb.push(new dd._TextNode(_9ba));
}else{
var type=_9ba[0];
var text=_9ba[1];
if(type==dd.TOKEN_VAR){
_9bb.push(new dd._VarNode(text));
}else{
if(type==dd.TOKEN_BLOCK){
if(_9b9[text]){
--this.i;
return _9bb;
}
var cmd=text.split(/\s+/g);
if(cmd.length){
cmd=cmd[0];
var fn=ddt.getTag(cmd);
if(fn){
_9bb.push(fn(this,new dd.Token(type,text)));
}
}
}
}
}
}
if(_9b8.length){
throw new Error("Could not find closing tag(s): "+_9b8.toString());
}
this.contents.length=0;
return _9bb;
},next_token:function(){
var _9bc=this.contents[this.i++];
return new dd.Token(_9bc[0],_9bc[1]);
},delete_first_token:function(){
this.i++;
},skip_past:function(_9bd){
while(this.i<this.contents.length){
var _9be=this.contents[this.i++];
if(_9be[0]==dd.TOKEN_BLOCK&&_9be[1]==_9bd){
return;
}
}
throw new Error("Unclosed tag found when looking for "+_9bd);
},create_variable_node:function(expr){
return new dd._VarNode(expr);
},create_text_node:function(expr){
return new dd._TextNode(expr||"");
},getTemplate:function(file){
return new dd.Template(file);
}});
dd.register={_registry:{attributes:[],tags:[],filters:[]},get:function(_9bf,name){
var _9c0=dd.register._registry[_9bf+"s"];
for(var i=0,_9c1;_9c1=_9c0[i];i++){
if(typeof _9c1[0]=="string"){
if(_9c1[0]==name){
return _9c1;
}
}else{
if(name.match(_9c1[0])){
return _9c1;
}
}
}
},getAttributeTags:function(){
var tags=[];
var _9c2=dd.register._registry.attributes;
for(var i=0,_9c3;_9c3=_9c2[i];i++){
if(_9c3.length==3){
tags.push(_9c3);
}else{
var fn=dojo.getObject(_9c3[1]);
if(fn&&dojo.isFunction(fn)){
_9c3.push(fn);
tags.push(_9c3);
}
}
}
return tags;
},_any:function(type,base,_9c4){
for(var path in _9c4){
for(var i=0,fn;fn=_9c4[path][i];i++){
var key=fn;
if(dojo.isArray(fn)){
key=fn[0];
fn=fn[1];
}
if(typeof key=="string"){
if(key.substr(0,5)=="attr:"){
var attr=fn;
if(attr.substr(0,5)=="attr:"){
attr=attr.slice(5);
}
dd.register._registry.attributes.push([attr.toLowerCase(),base+"."+path+"."+attr]);
}
key=key.toLowerCase();
}
dd.register._registry[type].push([key,fn,base+"."+path]);
}
}
},tags:function(base,_9c5){
dd.register._any("tags",base,_9c5);
},filters:function(base,_9c6){
dd.register._any("filters",base,_9c6);
}};
var _9c7=/&/g;
var _9c8=/</g;
var _9c9=/>/g;
var _9ca=/'/g;
var _9cb=/"/g;
dd._base.escape=function(_9cc){
return dd.mark_safe(_9cc.replace(_9c7,"&amp;").replace(_9c8,"&lt;").replace(_9c9,"&gt;").replace(_9cb,"&quot;").replace(_9ca,"&#39;"));
};
dd._base.safe=function(_9cd){
if(typeof _9cd=="string"){
_9cd=new String(_9cd);
}
if(typeof _9cd=="object"){
_9cd.safe=true;
}
return _9cd;
};
dd.mark_safe=dd._base.safe;
dd.register.tags("dojox.dtl.tag",{"date":["now"],"logic":["if","for","ifequal","ifnotequal"],"loader":["extends","block","include","load","ssi"],"misc":["comment","debug","filter","firstof","spaceless","templatetag","widthratio","with"],"loop":["cycle","ifchanged","regroup"]});
dd.register.filters("dojox.dtl.filter",{"dates":["date","time","timesince","timeuntil"],"htmlstrings":["linebreaks","linebreaksbr","removetags","striptags"],"integers":["add","get_digit"],"lists":["dictsort","dictsortreversed","first","join","length","length_is","random","slice","unordered_list"],"logic":["default","default_if_none","divisibleby","yesno"],"misc":["filesizeformat","pluralize","phone2numeric","pprint"],"strings":["addslashes","capfirst","center","cut","fix_ampersands","floatformat","iriencode","linenumbers","ljust","lower","make_list","rjust","slugify","stringformat","title","truncatewords","truncatewords_html","upper","urlencode","urlize","urlizetrunc","wordcount","wordwrap"]});
dd.register.filters("dojox.dtl",{"_base":["escape","safe"]});
})();
dojo.provide("dojox.dtl.filter.htmlstrings");
dojo.mixin(dojox.dtl.filter.htmlstrings,{_linebreaksrn:/(\r\n|\n\r)/g,_linebreaksn:/\n{2,}/g,_linebreakss:/(^\s+|\s+$)/g,_linebreaksbr:/\n/g,_removetagsfind:/[a-z0-9]+/g,_striptags:/<[^>]*?>/g,linebreaks:function(_9ce){
var _9cf=[];
var dh=dojox.dtl.filter.htmlstrings;
_9ce=_9ce.replace(dh._linebreaksrn,"\n");
var _9d0=_9ce.split(dh._linebreaksn);
for(var i=0;i<_9d0.length;i++){
var part=_9d0[i].replace(dh._linebreakss,"").replace(dh._linebreaksbr,"<br />");
_9cf.push("<p>"+part+"</p>");
}
return _9cf.join("\n\n");
},linebreaksbr:function(_9d1){
var dh=dojox.dtl.filter.htmlstrings;
return _9d1.replace(dh._linebreaksrn,"\n").replace(dh._linebreaksbr,"<br />");
},removetags:function(_9d2,arg){
var dh=dojox.dtl.filter.htmlstrings;
var tags=[];
var _9d3;
while(_9d3=dh._removetagsfind.exec(arg)){
tags.push(_9d3[0]);
}
tags="("+tags.join("|")+")";
return _9d2.replace(new RegExp("</?s*"+tags+"s*[^>]*>","gi"),"");
},striptags:function(_9d4){
return _9d4.replace(dojox.dtl.filter.htmlstrings._striptags,"");
}});
dojo.provide("dojox.html.entities");
(function(){
var _9d5=function(str,map){
var _9d6,_9d7;
if(map._encCache&&map._encCache.regexp&&map._encCache.mapper&&map.length==map._encCache.length){
_9d6=map._encCache.mapper;
_9d7=map._encCache.regexp;
}else{
_9d6={};
_9d7=["["];
var i;
for(i=0;i<map.length;i++){
_9d6[map[i][0]]="&"+map[i][1]+";";
_9d7.push(map[i][0]);
}
_9d7.push("]");
_9d7=new RegExp(_9d7.join(""),"g");
map._encCache={mapper:_9d6,regexp:_9d7,length:map.length};
}
str=str.replace(_9d7,function(c){
return _9d6[c];
});
return str;
};
var _9d8=function(str,map){
var _9d9,_9da;
if(map._decCache&&map._decCache.regexp&&map._decCache.mapper&&map.length==map._decCache.length){
_9d9=map._decCache.mapper;
_9da=map._decCache.regexp;
}else{
_9d9={};
_9da=["("];
var i;
for(i=0;i<map.length;i++){
var e="&"+map[i][1]+";";
if(i){
_9da.push("|");
}
_9d9[e]=map[i][0];
_9da.push(e);
}
_9da.push(")");
_9da=new RegExp(_9da.join(""),"g");
map._decCache={mapper:_9d9,regexp:_9da,length:map.length};
}
str=str.replace(_9da,function(c){
return _9d9[c];
});
return str;
};
dojox.html.entities.html=[["&","amp"],["\"","quot"],["<","lt"],[">","gt"],["?","nbsp"]];
dojox.html.entities.latin=[["?","iexcl"],["?","cent"],["?","pound"],["?","euro"],["?","curren"],["?","yen"],["?","brvbar"],["?","sect"],["?","uml"],["?","copy"],["?","ordf"],["?","laquo"],["?","not"],["?","shy"],["?","reg"],["?","macr"],["?","deg"],["?","plusmn"],["?","sup2"],["?","sup3"],["?","acute"],["?","micro"],["?","para"],["?","middot"],["?","cedil"],["?","sup1"],["?","ordm"],["?","raquo"],["?","frac14"],["?","frac12"],["?","frac34"],["?","iquest"],["?","Agrave"],["?","Aacute"],["?","Acirc"],["?","Atilde"],["?","Auml"],["?","Aring"],["?","AElig"],["?","Ccedil"],["?","Egrave"],["?","Eacute"],["?","Ecirc"],["?","Euml"],["?","Igrave"],["?","Iacute"],["?","Icirc"],["?","Iuml"],["?","ETH"],["?","Ntilde"],["?","Ograve"],["?","Oacute"],["?","Ocirc"],["?","Otilde"],["?","Ouml"],["?","times"],["?","Oslash"],["?","Ugrave"],["?","Uacute"],["?","Ucirc"],["?","Uuml"],["?","Yacute"],["?","THORN"],["?","szlig"],["?","agrave"],["?","aacute"],["?","acirc"],["?","atilde"],["?","auml"],["?","aring"],["?","aelig"],["?","ccedil"],["?","egrave"],["?","eacute"],["?","ecirc"],["?","euml"],["?","igrave"],["?","iacute"],["?","icirc"],["?","iuml"],["?","eth"],["?","ntilde"],["?","ograve"],["?","oacute"],["?","ocirc"],["?","otilde"],["?","ouml"],["?","divide"],["?","oslash"],["?","ugrave"],["?","uacute"],["?","ucirc"],["?","uuml"],["?","yacute"],["?","thorn"],["?","yuml"],["?","fnof"],["?","Alpha"],["?","Beta"],["?","Gamma"],["?","Delta"],["?","Epsilon"],["?","Zeta"],["?","Eta"],["?","Theta"],["?","Iota"],["?","Kappa"],["?","Lambda"],["?","Mu"],["?","Nu"],["?","Xi"],["?","Omicron"],["?","Pi"],["?","Rho"],["?","Sigma"],["?","Tau"],["?","Upsilon"],["?","Phi"],["?","Chi"],["?","Psi"],["?","Omega"],["?","alpha"],["?","beta"],["?","gamma"],["?","delta"],["?","epsilon"],["?","zeta"],["?","eta"],["?","theta"],["?","iota"],["?","kappa"],["?","lambda"],["?","mu"],["?","nu"],["?","xi"],["?","omicron"],["?","pi"],["?","rho"],["?","sigmaf"],["?","sigma"],["?","tau"],["?","upsilon"],["?","phi"],["?","chi"],["?","psi"],["?","omega"],["?","thetasym"],["?","upsih"],["?","piv"],["?","bull"],["?","hellip"],["?","prime"],["?","Prime"],["?","oline"],["?","frasl"],["?","weierp"],["?","image"],["?","real"],["?","trade"],["?","alefsym"],["?","larr"],["?","uarr"],["?","rarr"],["?","darr"],["?","harr"],["?","crarr"],["?","lArr"],["?","uArr"],["?","rArr"],["?","dArr"],["?","hArr"],["?","forall"],["?","part"],["?","exist"],["?","empty"],["?","nabla"],["?","isin"],["?","notin"],["?","ni"],["?","prod"],["?","sum"],["?","minus"],["?","lowast"],["?","radic"],["?","prop"],["?","infin"],["?","ang"],["?","and"],["?","or"],["?","cap"],["?","cup"],["?","int"],["?","there4"],["?","sim"],["?","cong"],["?","asymp"],["?","ne"],["?","equiv"],["?","le"],["?","ge"],["?","sub"],["?","sup"],["?","nsub"],["?","sube"],["?","supe"],["?","oplus"],["?","otimes"],["?","perp"],["?","sdot"],["?","lceil"],["?","rceil"],["?","lfloor"],["?","rfloor"],["?","lang"],["?","rang"],["?","loz"],["?","spades"],["?","clubs"],["?","hearts"],["?","diams"],["?","Elig"],["?","oelig"],["?","Scaron"],["?","scaron"],["?","Yuml"],["?","circ"],["?","tilde"],["?","ensp"],["?","emsp"],["?","thinsp"],["?","zwnj"],["?","zwj"],["?","lrm"],["?","rlm"],["?","ndash"],["?","mdash"],["?","lsquo"],["?","rsquo"],["?","sbquo"],["?","ldquo"],["?","rdquo"],["?","bdquo"],["?","dagger"],["?","Dagger"],["?","permil"],["?","lsaquo"],["?","rsaquo"]];
dojox.html.entities.encode=function(str,m){
if(str){
if(!m){
str=_9d5(str,dojox.html.entities.html);
str=_9d5(str,dojox.html.entities.latin);
}else{
str=_9d5(str,m);
}
}
return str;
};
dojox.html.entities.decode=function(str,m){
if(str){
if(!m){
str=_9d8(str,dojox.html.entities.html);
str=_9d8(str,dojox.html.entities.latin);
}else{
str=_9d8(str,m);
}
}
return str;
};
})();
dojo.provide("dojox.html.format");
dojox.html.format.prettyPrint=function(html,_9db,_9dc,map,_9dd){
var _9de=[];
var _9df=0;
var _9e0=[];
var iTxt="\t";
var _9e1="";
var _9e2=[];
var i;
var _9e3=/[=]([^"']+?)(\s|>)/g;
var _9e4=/style=("[^"]*"|'[^']*'|\S*)/gi;
var _9e5=/[\w-]+=("[^"]*"|'[^']*'|\S*)/gi;
if(_9db&&_9db>0&&_9db<10){
iTxt="";
for(i=0;i<_9db;i++){
iTxt+=" ";
}
}
var _9e6=dojo.doc.createElement("div");
_9e6.innerHTML=html;
var _9e7=dojox.html.entities.encode;
var _9e8=dojox.html.entities.decode;
var _9e9=function(tag){
switch(tag){
case "a":
case "b":
case "strong":
case "s":
case "strike":
case "i":
case "u":
case "em":
case "sup":
case "sub":
case "span":
case "font":
case "big":
case "cite":
case "q":
case "small":
return true;
default:
return false;
}
};
var div=_9e6.ownerDocument.createElement("div");
var _9ea=function(node){
var _9eb=node.cloneNode(false);
div.appendChild(_9eb);
var html=div.innerHTML;
div.innerHTML="";
return html;
};
var _9ec=function(){
var i,txt="";
for(i=0;i<_9df;i++){
txt+=iTxt;
}
return txt.length;
};
var _9ed=function(){
var i;
for(i=0;i<_9df;i++){
_9de.push(iTxt);
}
};
var _9ee=function(){
_9de.push("\n");
};
var _9ef=function(n){
_9e1+=_9e7(n.nodeValue,map);
};
var _9f0=function(txt){
var i;
var _9f1;
var _9f2=txt.split("\n");
for(i=0;i<_9f2.length;i++){
_9f2[i]=dojo.trim(_9f2[i]);
}
txt=_9f2.join(" ");
txt=dojo.trim(txt);
if(txt!==""){
var _9f3=[];
if(_9dc&&_9dc>0){
var _9f4=_9ec();
var _9f5=_9dc;
if(_9dc>_9f4){
_9f5-=_9f4;
}
while(txt){
if(txt.length>_9dc){
for(i=_9f5;(i>0&&txt.charAt(i)!==" ");i--){
}
if(!i){
for(i=_9f5;(i<txt.length&&txt.charAt(i)!==" ");i++){
}
}
var line=txt.substring(0,i);
line=dojo.trim(line);
txt=dojo.trim(txt.substring((i==txt.length)?txt.length:i+1,txt.length));
if(line){
_9f1="";
for(i=0;i<_9df;i++){
_9f1+=iTxt;
}
line=_9f1+line+"\n";
}
_9f3.push(line);
}else{
_9f1="";
for(i=0;i<_9df;i++){
_9f1+=iTxt;
}
txt=_9f1+txt+"\n";
_9f3.push(txt);
txt=null;
}
}
return _9f3.join("");
}else{
_9f1="";
for(i=0;i<_9df;i++){
_9f1+=iTxt;
}
txt=_9f1+txt+"\n";
return txt;
}
}else{
return "";
}
};
var _9f6=function(txt){
if(txt){
txt=txt.replace(/&quot;/gi,"\"");
txt=txt.replace(/&gt;/gi,">");
txt=txt.replace(/&lt;/gi,"<");
txt=txt.replace(/&amp;/gi,"&");
}
return txt;
};
var _9f7=function(txt){
if(txt){
txt=_9f6(txt);
var i,t,c,_9f8;
var _9f9=0;
var _9fa=txt.split("\n");
var _9fb=[];
for(i=0;i<_9fa.length;i++){
var line=_9fa[i];
var _9fc=(line.indexOf("\n")>-1);
line=dojo.trim(line);
if(line){
var _9fd=_9f9;
for(c=0;c<line.length;c++){
var ch=line.charAt(c);
if(ch==="{"){
_9f9++;
}else{
if(ch==="}"){
_9f9--;
_9fd=_9f9;
}
}
}
_9f8="";
for(t=0;t<_9df+_9fd;t++){
_9f8+=iTxt;
}
_9fb.push(_9f8+line+"\n");
}else{
if(_9fc&&i===0){
_9fb.push("\n");
}
}
}
txt=_9fb.join("");
}
return txt;
};
var _9fe=function(node){
var name=node.nodeName.toLowerCase();
var _9ff=dojo.trim(_9ea(node));
var tag=_9ff.substring(0,_9ff.indexOf(">")+1);
tag=tag.replace(_9e3,"=\"$1\"$2");
tag=tag.replace(_9e4,function(_a00){
var sL=_a00.substring(0,6);
var _a01=_a00.substring(6,_a00.length);
var _a02=_a01.charAt(0);
_a01=dojo.trim(_a01.substring(1,_a01.length-1));
_a01=_a01.split(";");
var _a03=[];
dojo.forEach(_a01,function(s){
s=dojo.trim(s);
if(s){
s=s.substring(0,s.indexOf(":")).toLowerCase()+s.substring(s.indexOf(":"),s.length);
_a03.push(s);
}
});
_a03=_a03.sort();
_a01=_a03.join("; ");
var ts=dojo.trim(_a01);
if(!ts||ts===";"){
return "";
}else{
_a01+=";";
return sL+_a02+_a01+_a02;
}
});
var _a04=[];
tag=tag.replace(_9e5,function(attr){
_a04.push(dojo.trim(attr));
return "";
});
_a04=_a04.sort();
tag="<"+name;
if(_a04.length){
tag+=" "+_a04.join(" ");
}
if(_9ff.indexOf("</")!=-1){
_9e0.push(name);
tag+=">";
}else{
if(_9dd){
tag+=" />";
}else{
tag+=">";
}
_9e0.push(false);
}
var _a05=_9e9(name);
_9e2.push(_a05);
if(_9e1&&!_a05){
_9de.push(_9f0(_9e1));
_9e1="";
}
if(!_a05){
_9ed();
_9de.push(tag);
_9ee();
_9df++;
}else{
_9e1+=tag;
}
};
var _a06=function(){
var _a07=_9e2.pop();
if(_9e1&&!_a07){
_9de.push(_9f0(_9e1));
_9e1="";
}
var ct=_9e0.pop();
if(ct){
ct="</"+ct+">";
if(!_a07){
_9df--;
_9ed();
_9de.push(ct);
_9ee();
}else{
_9e1+=ct;
}
}else{
_9df--;
}
};
var _a08=function(n){
var _a09=_9e8(n.nodeValue,map);
_9ed();
_9de.push("<!--");
_9ee();
_9df++;
_9de.push(_9f0(_a09));
_9df--;
_9ed();
_9de.push("-->");
_9ee();
};
var _a0a=function(node){
var _a0b=node.childNodes;
if(_a0b){
var i;
for(i=0;i<_a0b.length;i++){
var n=_a0b[i];
if(n.nodeType===1){
var tg=dojo.trim(n.tagName.toLowerCase());
if(dojo.isIE&&n.parentNode!=node){
continue;
}
if(tg&&tg.charAt(0)==="/"){
continue;
}else{
_9fe(n);
if(tg==="script"){
_9de.push(_9f7(n.innerHTML));
}else{
if(tg==="pre"){
var _a0c=n.innerHTML;
if(dojo.isMoz){
_a0c=_a0c.replace("<br>","\n");
_a0c=_a0c.replace("<pre>","");
_a0c=_a0c.replace("</pre>","");
}
if(_a0c.charAt(_a0c.length-1)!=="\n"){
_a0c+="\n";
}
_9de.push(_a0c);
}else{
_a0a(n);
}
}
_a06();
}
}else{
if(n.nodeType===3||n.nodeType===4){
_9ef(n);
}else{
if(n.nodeType===8){
_a08(n);
}
}
}
}
}
};
_a0a(_9e6);
if(_9e1){
_9de.push(_9f0(_9e1));
_9e1="";
}
return _9de.join("");
};
dojo.provide("dojox.editor.plugins.PasteFromWord");
dojo.declare("dojox.editor.plugins.PasteFromWord",dijit._editor._Plugin,{iconClassPrefix:"dijitAdditionalEditorIcon",width:"400px",height:"300px",_template:["<div class='dijitPasteFromWordEmbeddedRTE'>","<div style='width: ${width}; padding-top: 5px; padding-bottom: 5px;'>${instructions}</div>","<div id='${uId}_rte' style='width: ${width}; height: ${height}'></div>","<table style='width: ${width}' tabindex='-1'>","<tbody>","<tr>","<td align='center'>","<button type='button' dojoType='dijit.form.Button' id='${uId}_paste'>${paste}</button>","&nbsp;","<button type='button' dojoType='dijit.form.Button' id='${uId}_cancel'>${cancel}</button>","</td>","</tr>","</tbody>","</table>","</div>"].join(""),_filters:[{regexp:/(<meta\s*[^>]*\s*>)|(<\s*link\s* href="file:[^>]*\s*>)|(<\/?\s*\w+:[^>]*\s*>)/gi,handler:""},{regexp:/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,handler:""},{regexp:/(class="Mso[^"]*")|(<!--(.|\s){1,}?-->)/gi,handler:""},{regexp:/(<p[^>]*>\s*(\&nbsp;|\u00A0)*\s*<\/p[^>]*>)|(<p[^>]*>\s*<font[^>]*>\s*(\&nbsp;|\u00A0)*\s*<\/\s*font\s*>\s<\/p[^>]*>)/ig,handler:""},{regexp:/(style="[^"]*mso-[^;][^"]*")|(style="margin:\s*[^;"]*;")/gi,handler:""},{regexp:/(<\s*script[^>]*>((.|\s)*?)<\\?\/\s*script\s*>)|(<\s*script\b([^<>]|\s)*>?)|(<[^>]*=(\s|)*[("|')]javascript:[^$1][(\s|.)]*[$1][^>]*>)/ig,handler:""}],_initButton:function(){
var _a0d=dojo.i18n.getLocalization("dojox.editor.plugins","PasteFromWord");
this.button=new dijit.form.Button({label:_a0d["pasteFromWord"],showLabel:false,iconClass:this.iconClassPrefix+" "+this.iconClassPrefix+"PasteFromWord",tabIndex:"-1",onClick:dojo.hitch(this,"_openDialog")});
this._uId=dijit.getUniqueId(this.editor.id);
_a0d.uId=this._uId;
_a0d.width=this.width||"400px";
_a0d.height=this.height||"300px";
this._dialog=new dijit.Dialog({title:_a0d["pasteFromWord"]}).placeAt(dojo.body());
this._dialog.set("content",dojo.string.substitute(this._template,_a0d));
dojo.style(dojo.byId(this._uId+"_rte"),"opacity",0.001);
this.connect(dijit.byId(this._uId+"_paste"),"onClick","_paste");
this.connect(dijit.byId(this._uId+"_cancel"),"onClick","_cancel");
this.connect(this._dialog,"onHide","_clearDialog");
},updateState:function(){
this.button.set("disabled",this.get("disabled"));
},setEditor:function(_a0e){
this.editor=_a0e;
this._initButton();
},_openDialog:function(){
this._dialog.show();
if(!this._rte){
setTimeout(dojo.hitch(this,function(){
this._rte=new dijit._editor.RichText({height:this.height||"300px"},this._uId+"_rte");
this._rte.onLoadDeferred.addCallback(dojo.hitch(this,function(){
dojo.animateProperty({node:this._rte.domNode,properties:{opacity:{start:0.001,end:1}}}).play();
}));
}),100);
}
},_paste:function(){
var _a0f=dojox.html.format.prettyPrint(this._rte.get("value"));
this._dialog.hide();
var i;
for(i=0;i<this._filters.length;i++){
var _a10=this._filters[i];
_a0f=_a0f.replace(_a10.regexp,_a10.handler);
}
_a0f=dojox.html.format.prettyPrint(_a0f);
this.editor.execCommand("inserthtml",_a0f);
},_cancel:function(){
this._dialog.hide();
},_clearDialog:function(){
this._rte.set("value","");
},destroy:function(){
if(this._rte){
this._rte.destroy();
}
if(this._dialog){
this._dialog.destroyRecursive();
}
delete this._dialog;
delete this._rte;
this.inherited(arguments);
}});
dojo.subscribe(dijit._scopeName+".Editor.getPlugin",null,function(o){
if(o.plugin){
return;
}
var name=o.args.name.toLowerCase();
if(name==="pastefromword"){
o.plugin=new dojox.editor.plugins.PasteFromWord({width:("width" in o.args)?o.args.width:"400px",height:("height" in o.args)?o.args.width:"300px"});
}
});
dojo.provide("dojox.editor.plugins.Save");
dojo.declare("dojox.editor.plugins.Save",dijit._editor._Plugin,{iconClassPrefix:"dijitAdditionalEditorIcon",url:"",logResults:true,_initButton:function(){
var _a11=dojo.i18n.getLocalization("dojox.editor.plugins","Save");
this.button=new dijit.form.Button({label:_a11["save"],showLabel:false,iconClass:this.iconClassPrefix+" "+this.iconClassPrefix+"Save",tabIndex:"-1",onClick:dojo.hitch(this,"_save")});
},updateState:function(){
this.button.set("disabled",this.get("disabled"));
},setEditor:function(_a12){
this.editor=_a12;
this._initButton();
},_save:function(){
var _a13=this.editor.get("value");
this.save(_a13);
},save:function(_a14){
var _a15={"Content-Type":"text/html"};
if(this.url){
var _a16={url:this.url,postData:_a14,headers:_a15,handleAs:"text"};
this.button.set("disabled",true);
var _a17=dojo.xhrPost(_a16);
_a17.addCallback(dojo.hitch(this,this.onSuccess));
_a17.addErrback(dojo.hitch(this,this.onError));
}else{
}
},onSuccess:function(resp,_a18){
this.button.set("disabled",false);
if(this.logResults){
}
},onError:function(_a19,_a1a){
this.button.set("disabled",false);
if(this.logResults){
}
}});
dojo.subscribe(dijit._scopeName+".Editor.getPlugin",null,function(o){
if(o.plugin){
return;
}
var name=o.args.name.toLowerCase();
if(name==="save"){
o.plugin=new dojox.editor.plugins.Save({url:("url" in o.args)?o.args.url:"",logResults:("logResults" in o.args)?o.args.logResults:true});
}
});
dojo.provide("dojox.form.uploader.Base");
dojo.declare("dojox.form.uploader.Base",[dijit._Widget,dijit._Templated],{getForm:function(){
if(!this.form){
var n=this.domNode;
while(n&&n.tagName&&n!==document.body){
if(n.tagName.toLowerCase()=="form"){
this.form=n;
break;
}
n=n.parentNode;
}
}
return this.form;
},getUrl:function(){
if(this.uploadUrl){
this.url=this.uploadUrl;
}
if(this.url){
return this.url;
}
if(this.getForm()){
this.url=this.form.action;
}
return this.url;
},connectForm:function(){
this.url=this.getUrl();
if(!this._fcon&&!!this.getForm()){
this._fcon=true;
this.connect(this.form,"onsubmit",function(evt){
dojo.stopEvent(evt);
this.submit(dojo.formToObject(this.form));
});
}
},supports:function(what){
if(!this._hascache){
this._hascache={testDiv:dojo.create("div"),testInput:dojo.create("input",{type:"file"}),xhr:!!window.XMLHttpRequest?new XMLHttpRequest():{}};
dojo.style(this._hascache.testDiv,"opacity",0.7);
}
switch(what){
case "FormData":
return !!window.FormData;
case "sendAsBinary":
return !!this._hascache.xhr.sendAsBinary;
case "opacity":
return dojo.style(this._hascache.testDiv,"opacity")==0.7;
case "multiple":
if(this.force=="flash"||this.force=="iframe"){
return false;
}
var res=dojo.attr(this._hascache.testInput,"multiple");
return res===true||res===false;
}
return false;
},getMimeType:function(){
return "application/octet-stream";
},getFileType:function(name){
return name.substring(name.lastIndexOf(".")+1).toUpperCase();
},convertBytes:function(_a1b){
var kb=Math.round(_a1b/1024*100000)/100000;
var mb=Math.round(_a1b/1048576*100000)/100000;
var gb=Math.round(_a1b/1073741824*100000)/100000;
var _a1c=_a1b;
if(kb>1){
_a1c=kb.toFixed(1)+" kb";
}
if(mb>1){
_a1c=mb.toFixed(1)+" mb";
}
if(gb>1){
_a1c=gb.toFixed(1)+" gb";
}
return {kb:kb,mb:mb,gb:gb,bytes:_a1b,value:_a1c};
}});
dojo.provide("dojox.form.Uploader");
dojo.experimental("dojox.form.Uploader");
dojo.declare("dojox.form.Uploader",[dojox.form.uploader.Base],{uploadOnSelect:false,tabIndex:0,multiple:false,label:"Upload...",url:"",name:"uploadedfile",flashFieldName:"",uploadType:"form",_nameIndex:0,widgetsInTemplate:true,templateString:"<div class=\"dojoxFileInput\"><div dojoType=\"dijit.form.Button\" dojoAttachPoint=\"button\">${label}</div></div>",postMixInProperties:function(){
this._inputs=[];
this._getButtonStyle(this.srcNodeRef);
this.inherited(arguments);
},postCreate:function(){
var _a1d=false;
var _a1e=this.domNode.parentNode;
var _a1f=this._getNodePosition(this.domNode);
if(!this.btnSize.w||!this.btnSize.h){
dojo.body().appendChild(this.domNode);
this._getButtonStyle(this.domNode);
_a1d=true;
}
this._setButtonStyle();
if(_a1d){
dojo.place(this.domNode,_a1f.node,_a1f.pos);
}
this.inherited(arguments);
},onChange:function(_a20){
},onBegin:function(_a21){
},onProgress:function(_a22){
},onComplete:function(_a23){
this.reset();
},onCancel:function(){
},onAbort:function(){
},onError:function(_a24){
},upload:function(_a25){
},submit:function(form){
},reset:function(){
this._disconnectButton();
dojo.forEach(this._inputs,dojo.destroy,dojo);
this._inputs=[];
this._nameIndex=0;
this._createInput();
},getFileList:function(){
var _a26=[];
if(this.supports("multiple")){
dojo.forEach(this.inputNode.files,function(f,i){
_a26.push({index:i,name:f.name,size:f.size,type:f.type});
},this);
}else{
dojo.forEach(this._inputs,function(n,i){
_a26.push({index:i,name:n.value.substring(n.value.lastIndexOf("\\")+1),size:0,type:n.value.substring(n.value.lastIndexOf(".")+1)});
},this);
}
return _a26;
},_getValueAttr:function(){
return this.getFileList();
},_setValueAttr:function(_a27){
},_getDisabledAttr:function(){
return this._disabled;
},_setDisabledAttr:function(_a28){
if(this._disabled==_a28){
return;
}
this.button.set("disabled",_a28);
dojo.style(this.inputNode,"display",_a28?"none":"block");
},_getNodePosition:function(node){
if(node.previousSibling){
return {node:node.previousSibling,pos:"after"};
}
return {node:node.nextSibling,pos:"before"};
},_getButtonStyle:function(node){
if(!node){
this.btnSize={w:200,h:25};
}else{
this.btnSize=dojo.marginBox(node);
}
},_setButtonStyle:function(){
var _a29=true;
if(!this.domNode.parentNode||!this.domNode.parentNode.tagName){
document.body.appendChild(this.domNode);
_a29=false;
}
dojo.style(this.domNode,{width:this.btnSize.w+"px",height:(this.btnSize.h+4)+"px",overflow:"hidden",position:"relative"});
this.inputNodeFontSize=Math.max(2,Math.max(Math.ceil(this.btnSize.w/60),Math.ceil(this.btnSize.h/15)));
this._createInput();
dojo.style(this.button.domNode,{margin:"0px",display:"block",verticalAlign:"top"});
dojo.style(this.button.domNode.firstChild,{margin:"0px",display:"block"});
if(!_a29){
document.body.removeChild(this.domNode);
}
},_createInput:function(){
if(this._inputs.length){
dojo.style(this.inputNode,{top:"500px"});
this._disconnectButton();
this._nameIndex++;
}
var name;
if(this.supports("multiple")){
name=this.name+"s[]";
}else{
name=this.name+(this.multiple?this._nameIndex:"");
}
this.inputNode=dojo.create("input",{type:"file",name:name,className:"dojoxInputNode"},this.domNode,"first");
if(this.supports("multiple")&&this.multiple){
dojo.attr(this.inputNode,"multiple",true);
}
this._inputs.push(this.inputNode);
dojo.style(this.inputNode,{fontSize:this.inputNodeFontSize+"em"});
var size=dojo.marginBox(this.inputNode);
dojo.style(this.inputNode,{position:"absolute",top:"-2px",left:"-"+(size.w-this.btnSize.w-2)+"px",opacity:0});
this._connectButton();
},_connectButton:function(){
this._cons=[];
var cs=dojo.hitch(this,function(nm){
this._cons.push(dojo.connect(this.inputNode,nm,this,function(evt){
this.button._cssMouseEvent({type:nm});
}));
});
cs("mouseover");
cs("mouseout");
cs("mousedown");
this._cons.push(dojo.connect(this.inputNode,"change",this,function(evt){
this.onChange(this.getFileList(evt));
if(!this.supports("multiple")&&this.multiple){
this._createInput();
}
}));
this.button.set("tabIndex",-1);
if(this.tabIndex>-1){
this.inputNode.tabIndex=this.tabIndex;
var _a2a=dojo.style(this.button.domNode.firstChild,"border");
this._cons.push(dojo.connect(this.inputNode,"focus",this,function(){
dojo.style(this.button.domNode.firstChild,"border","1px dashed #ccc");
}));
this._cons.push(dojo.connect(this.inputNode,"blur",this,function(){
dojo.style(this.button.domNode.firstChild,"border",_a2a);
}));
}
},_disconnectButton:function(){
dojo.forEach(this._cons,dojo.disconnect,dojo);
}});
(function(){
dojox.form.UploaderOrg=dojox.form.Uploader;
var _a2b=[dojox.form.UploaderOrg];
dojox.form.addUploaderPlugin=function(plug){
_a2b.push(plug);
dojo.declare("dojox.form.Uploader",_a2b,{});
};
})();
dojo.provide("dojox.form.uploader.FileList");
dojo.declare("dojox.form.uploader.FileList",[dojox.form.uploader.Base],{uploaderId:"",uploader:null,headerIndex:"#",headerType:"Type",headerFilename:"File Name",headerFilesize:"Size",_upCheckCnt:0,rowAmt:0,templateString:"<div class=\"dojoxUploaderFileList\">"+"<div dojoAttachPoint=\"progressNode\" class=\"dojoxUploaderFileListProgress\"><div dojoAttachPoint=\"percentBarNode\" class=\"dojoxUploaderFileListProgressBar\"></div><div dojoAttachPoint=\"percentTextNode\" class=\"dojoxUploaderFileListPercentText\">0%</div></div>"+"<table class=\"dojoxUploaderFileListTable\">"+"<tr class=\"dojoxUploaderFileListHeader\"><th class=\"dojoxUploaderIndex\">${headerIndex}</th><th class=\"dojoxUploaderIcon\">${headerType}</th><th class=\"dojoxUploaderFileName\">${headerFilename}</th><th class=\"dojoxUploaderFileSize\">${headerFilesize}</th></tr>"+"<tr ><td colSpan=\"4\" class=\"dojoxUploaderFileListContainer\" dojoAttachPoint=\"containerNode\">"+"<table class=\"dojoxUploaderFileListContent\" dojoAttachPoint=\"listNode\"></table>"+"</td><tr>"+"</table>"+"<div>",postCreate:function(){
this.setUploader();
this.hideProgress();
},reset:function(){
for(var i=0;i<this.rowAmt;i++){
this.listNode.deleteRow(0);
}
this.rowAmt=0;
},setUploader:function(){
if(!this.uploaderId&&!this.uploader){
}else{
if(this.uploaderId&&!this.uploader){
this.uploader=dijit.byId(this.uploaderId);
}else{
if(this._upCheckCnt>4){
return;
}
}
}
if(this.uploader){
this.connect(this.uploader,"onChange","_onUploaderChange");
this.connect(this.uploader,"reset","reset");
this.connect(this.uploader,"onBegin",function(){
this.showProgress(true);
});
this.connect(this.uploader,"onProgress","_progress");
this.connect(this.uploader,"onComplete",function(){
setTimeout(dojo.hitch(this,function(){
this.hideProgress(true);
}),1250);
});
}else{
this._upCheckCnt++;
setTimeout(dojo.hitch(this,"setUploader"),250);
}
},hideProgress:function(_a2c){
var o=_a2c?{ani:true,endDisp:"none",beg:15,end:0}:{endDisp:"none",ani:false};
this._hideShowProgress(o);
},showProgress:function(_a2d){
var o=_a2d?{ani:true,endDisp:"block",beg:0,end:15}:{endDisp:"block",ani:false};
this._hideShowProgress(o);
},_progress:function(_a2e){
this.percentTextNode.innerHTML=_a2e.percent;
dojo.style(this.percentBarNode,"width",_a2e.percent);
},_hideShowProgress:function(o){
var node=this.progressNode;
var _a2f=function(){
dojo.style(node,"display",o.endDisp);
};
if(o.ani){
dojo.style(node,"display","block");
dojo.animateProperty({node:node,properties:{height:{start:o.beg,end:o.end,units:"px"}},onEnd:_a2f}).play();
}else{
_a2f();
}
},_onUploaderChange:function(_a30){
this.reset();
dojo.forEach(_a30,function(f,i){
this._addRow(i+1,this.getFileType(f.name),f.name,f.size);
},this);
},_addRow:function(_a31,type,name,size){
var c,r=this.listNode.insertRow(-1);
c=r.insertCell(-1);
dojo.addClass(c,"dojoxUploaderIndex");
c.innerHTML=_a31;
c=r.insertCell(-1);
dojo.addClass(c,"dojoxUploaderIcon");
c.innerHTML=type;
c=r.insertCell(-1);
dojo.addClass(c,"dojoxUploaderFileName");
c.innerHTML=name;
c=r.insertCell(-1);
dojo.addClass(c,"dojoxUploaderSize");
c.innerHTML=this.convertBytes(size).value;
this.rowAmt++;
}});
dojo.provide("dojox.form.uploader.plugins.HTML5");
dojo.declare("dojox.form.uploader.plugins.HTML5",[],{errMsg:"Error uploading files. Try checking permissions",uploadType:"html5",postCreate:function(){
this.connectForm();
this.inherited(arguments);
if(this.uploadOnSelect){
this.connect(this,"onChange","upload");
}
},upload:function(_a32){
this.onBegin(this.getFileList());
if(this.supports("FormData")){
this.uploadWithFormData(_a32);
}else{
if(this.supports("sendAsBinary")){
this.sendAsBinary(_a32);
}
}
},submit:function(form){
form=!!form?form.tagName?form:this.getForm():this.getForm();
var data=dojo.formToObject(form);
this.upload(data);
},sendAsBinary:function(data){
if(!this.getUrl()){
return;
}
var _a33="---------------------------"+(new Date).getTime();
var xhr=this.createXhr();
xhr.setRequestHeader("Content-Type","multipart/form-data; boundary="+_a33);
var msg=this._buildRequestBody(data,_a33);
if(!msg){
this.onError(this.errMsg);
}else{
xhr.sendAsBinary(msg);
}
},uploadWithFormData:function(data){
if(!this.getUrl()){
return;
}
var fd=new FormData();
dojo.forEach(this.inputNode.files,function(f,i){
fd.append("uploadedfiles[]",f);
});
if(data){
for(var nm in data){
fd.append(nm,data[nm]);
}
}
var xhr=this.createXhr();
xhr.send(fd);
},_xhrProgress:function(evt){
if(evt.lengthComputable){
var o={bytesLoaded:evt.loaded,bytesTotal:evt.total,type:evt.type,timeStamp:evt.timeStamp};
if(evt.type=="load"){
o.percent="100%",o.decimal=1;
}else{
o.decimal=evt.loaded/evt.total;
o.percent=Math.ceil((evt.loaded/evt.total)*100)+"%";
}
this.onProgress(o);
}
},createXhr:function(){
var xhr=new XMLHttpRequest();
var _a34;
xhr.upload.addEventListener("progress",dojo.hitch(this,"_xhrProgress"),false);
xhr.addEventListener("load",dojo.hitch(this,"_xhrProgress"),false);
xhr.addEventListener("error",dojo.hitch(this,function(evt){
this.onError(evt);
clearInterval(_a34);
}),false);
xhr.addEventListener("abort",dojo.hitch(this,function(evt){
this.onAbort(evt);
clearInterval(_a34);
}),false);
xhr.onreadystatechange=dojo.hitch(this,function(){
if(xhr.readyState===4){
clearInterval(_a34);
this.onComplete(dojo.eval(xhr.responseText));
}
});
xhr.open("POST",this.getUrl());
_a34=setInterval(dojo.hitch(this,function(){
try{
if(typeof (xhr.statusText)){
}
}
catch(e){
clearInterval(_a34);
}
}),250);
return xhr;
},_buildRequestBody:function(data,_a35){
var EOL="\r\n";
var part="";
_a35="--"+_a35;
var _a36=[];
dojo.forEach(this.inputNode.files,function(f,i){
var _a37="uploadedfiles[]";
var _a38=this.inputNode.files[i].fileName;
var _a39;
try{
_a39=this.inputNode.files[i].getAsBinary()+EOL;
part+=_a35+EOL;
part+="Content-Disposition: form-data; ";
part+="name=\""+_a37+"\"; ";
part+="filename=\""+_a38+"\""+EOL;
part+="Content-Type: "+this.getMimeType()+EOL+EOL;
part+=_a39;
}
catch(e){
_a36.push({index:i,name:_a38});
}
},this);
if(_a36.length){
if(_a36.length>=this.inputNode.files.length){
this.onError({message:this.errMsg,filesInError:_a36});
part=false;
}
}
if(!part){
return false;
}
if(data){
for(var nm in data){
part+=_a35+EOL;
part+="Content-Disposition: form-data; ";
part+="name=\""+nm+"\""+EOL+EOL;
part+=data[nm]+EOL;
}
}
part+=_a35+"--"+EOL;
return part;
}});
dojox.form.addUploaderPlugin(dojox.form.uploader.plugins.HTML5);
dojo.provide("dojo.io.iframe");
dojo.getObject("io",true,dojo);
dojo.io.iframe={create:function(_a3a,_a3b,uri){
if(window[_a3a]){
return window[_a3a];
}
if(window.frames[_a3a]){
return window.frames[_a3a];
}
var _a3c=null;
var turi=uri;
if(!turi){
if(dojo.config["useXDomain"]&&!dojo.config["dojoBlankHtmlUrl"]){
}
turi=(dojo.config["dojoBlankHtmlUrl"]||dojo.moduleUrl("dojo","resources/blank.html"));
}
var _a3c=dojo.place("<iframe id=\""+_a3a+"\" name=\""+_a3a+"\" src=\""+turi+"\" onload=\""+_a3b+"\" style=\"position: absolute; left: 1px; top: 1px; height: 1px; width: 1px; visibility: hidden\">",dojo.body());
window[_a3a]=_a3c;
return _a3c;
},setSrc:function(_a3d,src,_a3e){
try{
if(!_a3e){
if(dojo.isWebKit){
_a3d.location=src;
}else{
frames[_a3d.name].location=src;
}
}else{
var idoc;
if(dojo.isIE||dojo.isWebKit){
idoc=_a3d.contentWindow.document;
}else{
idoc=_a3d.contentWindow;
}
if(!idoc){
_a3d.location=src;
return;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
}
},doc:function(_a3f){
var doc=_a3f.contentDocument||(((_a3f.name)&&(_a3f.document)&&(dojo.doc.getElementsByTagName("iframe")[_a3f.name].contentWindow)&&(dojo.doc.getElementsByTagName("iframe")[_a3f.name].contentWindow.document)))||((_a3f.name)&&(dojo.doc.frames[_a3f.name])&&(dojo.doc.frames[_a3f.name].document))||null;
return doc;
},send:function(args){
if(!this["_frame"]){
this._frame=this.create(this._iframeName,dojo._scopeName+".io.iframe._iframeOnload();");
}
var dfd=dojo._ioSetArgs(args,function(dfd){
dfd.canceled=true;
dfd.ioArgs._callNext();
},function(dfd){
var _a40=null;
try{
var _a41=dfd.ioArgs;
var dii=dojo.io.iframe;
var ifd=dii.doc(dii._frame);
var _a42=_a41.handleAs;
_a40=ifd;
if(_a42!="html"){
if(_a42=="xml"){
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
dojo.query("a",dii._frame.contentWindow.document.documentElement).orphan();
var _a43=(dii._frame.contentWindow.document).documentElement.innerText;
_a43=_a43.replace(/>\s+</g,"><");
_a43=dojo.trim(_a43);
var _a44={responseText:_a43};
_a40=dojo._contentHandlers["xml"](_a44);
}
}else{
_a40=ifd.getElementsByTagName("textarea")[0].value;
if(_a42=="json"){
_a40=dojo.fromJson(_a40);
}else{
if(_a42=="javascript"){
_a40=dojo.eval(_a40);
}
}
}
}
}
catch(e){
_a40=e;
}
finally{
_a41._callNext();
}
return _a40;
},function(_a45,dfd){
dfd.ioArgs._hasError=true;
dfd.ioArgs._callNext();
return _a45;
});
dfd.ioArgs._callNext=function(){
if(!this["_calledNext"]){
this._calledNext=true;
dojo.io.iframe._currentDfd=null;
dojo.io.iframe._fireNextRequest();
}
};
this._dfdQueue.push(dfd);
this._fireNextRequest();
dojo._ioWatch(dfd,function(dfd){
return !dfd.ioArgs["_hasError"];
},function(dfd){
return (!!dfd.ioArgs["_finished"]);
},function(dfd){
if(dfd.ioArgs._finished){
dfd.callback(dfd);
}else{
dfd.errback(new Error("Invalid dojo.io.iframe request state"));
}
});
return dfd;
},_currentDfd:null,_dfdQueue:[],_iframeName:dojo._scopeName+"IoIframe",_fireNextRequest:function(){
try{
if((this._currentDfd)||(this._dfdQueue.length==0)){
return;
}
do{
var dfd=this._currentDfd=this._dfdQueue.shift();
}while(dfd&&dfd.canceled&&this._dfdQueue.length);
if(!dfd||dfd.canceled){
this._currentDfd=null;
return;
}
var _a46=dfd.ioArgs;
var args=_a46.args;
_a46._contentToClean=[];
var fn=dojo.byId(args["form"]);
var _a47=args["content"]||{};
if(fn){
if(_a47){
var _a48=function(name,_a49){
dojo.create("input",{type:"hidden",name:name,value:_a49},fn);
_a46._contentToClean.push(name);
};
for(var x in _a47){
var val=_a47[x];
if(dojo.isArray(val)&&val.length>1){
var i;
for(i=0;i<val.length;i++){
_a48(x,val[i]);
}
}else{
if(!fn[x]){
_a48(x,val);
}else{
fn[x].value=val;
}
}
}
}
var _a4a=fn.getAttributeNode("action");
var _a4b=fn.getAttributeNode("method");
var _a4c=fn.getAttributeNode("target");
if(args["url"]){
_a46._originalAction=_a4a?_a4a.value:null;
if(_a4a){
_a4a.value=args.url;
}else{
fn.setAttribute("action",args.url);
}
}
if(!_a4b||!_a4b.value){
if(_a4b){
_a4b.value=(args["method"])?args["method"]:"post";
}else{
fn.setAttribute("method",(args["method"])?args["method"]:"post");
}
}
_a46._originalTarget=_a4c?_a4c.value:null;
if(_a4c){
_a4c.value=this._iframeName;
}else{
fn.setAttribute("target",this._iframeName);
}
fn.target=this._iframeName;
dojo._ioNotifyStart(dfd);
fn.submit();
}else{
var _a4d=args.url+(args.url.indexOf("?")>-1?"&":"?")+_a46.query;
dojo._ioNotifyStart(dfd);
this.setSrc(this._frame,_a4d,true);
}
}
catch(e){
dfd.errback(e);
}
},_iframeOnload:function(){
var dfd=this._currentDfd;
if(!dfd){
this._fireNextRequest();
return;
}
var _a4e=dfd.ioArgs;
var args=_a4e.args;
var _a4f=dojo.byId(args.form);
if(_a4f){
var _a50=_a4e._contentToClean;
for(var i=0;i<_a50.length;i++){
var key=_a50[i];
for(var j=0;j<_a4f.childNodes.length;j++){
var _a51=_a4f.childNodes[j];
if(_a51.name==key){
dojo.destroy(_a51);
break;
}
}
}
if(_a4e["_originalAction"]){
_a4f.setAttribute("action",_a4e._originalAction);
}
if(_a4e["_originalTarget"]){
_a4f.setAttribute("target",_a4e._originalTarget);
_a4f.target=_a4e._originalTarget;
}
}
_a4e._finished=true;
}};
dojo.provide("dojox.form.uploader.plugins.IFrame");
dojo.declare("dojox.form.uploader.plugins.IFrame",[],{force:"",postMixInProperties:function(){
this.inherited(arguments);
if(!this.supports("multiple")){
this.uploadType="iframe";
}
},upload:function(data){
if(!this.supports("multiple")||this.force=="iframe"){
this.uploadIFrame(data);
dojo.stopEvent(data);
return;
}
},uploadIFrame:function(){
var url=this.getUrl();
var dfd=dojo.io.iframe.send({url:this.getUrl(),form:this.form,handleAs:"json",error:dojo.hitch(this,function(err){
}),load:dojo.hitch(this,function(data,_a52,_a53){
this.onComplete(data);
})});
}});
dojox.form.addUploaderPlugin(dojox.form.uploader.plugins.IFrame);
dojo.provide("dijit.dijit");
dojo.provide("dojox.html.metrics");
(function(){
var dhm=dojox.html.metrics;
dhm.getFontMeasurements=function(){
var _a54={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,"small":0,"medium":0,"large":0,"x-large":0,"xx-large":0};
if(dojo.isIE){
dojo.doc.documentElement.style.fontSize="100%";
}
var div=dojo.doc.createElement("div");
var ds=div.style;
ds.position="absolute";
ds.left="-100px";
ds.top="0";
ds.width="30px";
ds.height="1000em";
ds.borderWidth="0";
ds.margin="0";
ds.padding="0";
ds.outline="0";
ds.lineHeight="1";
ds.overflow="hidden";
dojo.body().appendChild(div);
for(var p in _a54){
ds.fontSize=p;
_a54[p]=Math.round(div.offsetHeight*12/16)*16/12/1000;
}
dojo.body().removeChild(div);
div=null;
return _a54;
};
var _a55=null;
dhm.getCachedFontMeasurements=function(_a56){
if(_a56||!_a55){
_a55=dhm.getFontMeasurements();
}
return _a55;
};
var _a57=null,_a58={};
dhm.getTextBox=function(text,_a59,_a5a){
var m,s;
if(!_a57){
m=_a57=dojo.doc.createElement("div");
var c=dojo.doc.createElement("div");
c.appendChild(m);
s=c.style;
s.overflow="scroll";
s.position="absolute";
s.left="0px";
s.top="-10000px";
s.width="1px";
s.height="1px";
s.visibility="hidden";
s.borderWidth="0";
s.margin="0";
s.padding="0";
s.outline="0";
dojo.body().appendChild(c);
}else{
m=_a57;
}
m.className="";
s=m.style;
s.borderWidth="0";
s.margin="0";
s.padding="0";
s.outline="0";
if(arguments.length>1&&_a59){
for(var i in _a59){
if(i in _a58){
continue;
}
s[i]=_a59[i];
}
}
if(arguments.length>2&&_a5a){
m.className=_a5a;
}
m.innerHTML=text;
var box=dojo.position(m);
box.w=m.parentNode.scrollWidth;
return box;
};
var _a5b={w:16,h:16};
dhm.getScrollbar=function(){
return {w:_a5b.w,h:_a5b.h};
};
dhm._fontResizeNode=null;
dhm.initOnFontResize=function(_a5c){
var f=dhm._fontResizeNode=dojo.doc.createElement("iframe");
var fs=f.style;
fs.position="absolute";
fs.width="5em";
fs.height="10em";
fs.top="-10000px";
if(dojo.isIE){
f.onreadystatechange=function(){
if(f.contentWindow.document.readyState=="complete"){
f.onresize=f.contentWindow.parent[dojox._scopeName].html.metrics._fontresize;
}
};
}else{
f.onload=function(){
f.contentWindow.onresize=f.contentWindow.parent[dojox._scopeName].html.metrics._fontresize;
};
}
f.setAttribute("src","javascript:'<html><head><script>if(\"loadFirebugConsole\" in window){window.loadFirebugConsole();}</script></head><body></body></html>'");
dojo.body().appendChild(f);
dhm.initOnFontResize=function(){
};
};
dhm.onFontResize=function(){
};
dhm._fontresize=function(){
dhm.onFontResize();
};
dojo.addOnUnload(function(){
var f=dhm._fontResizeNode;
if(f){
if(dojo.isIE&&f.onresize){
f.onresize=null;
}else{
if(f.contentWindow&&f.contentWindow.onresize){
f.contentWindow.onresize=null;
}
}
dhm._fontResizeNode=null;
}
});
dojo.addOnLoad(function(){
try{
var n=dojo.doc.createElement("div");
n.style.cssText="top:0;left:0;width:100px;height:100px;overflow:scroll;position:absolute;visibility:hidden;";
dojo.body().appendChild(n);
_a5b.w=n.offsetWidth-n.clientWidth;
_a5b.h=n.offsetHeight-n.clientHeight;
dojo.body().removeChild(n);
delete n;
}
catch(e){
}
if("fontSizeWatch" in dojo.config&&!!dojo.config.fontSizeWatch){
dhm.initOnFontResize();
}
});
})();
dojo.provide("dojox.grid.util");
(function(){
var dgu=dojox.grid.util;
dgu.na="...";
dgu.rowIndexTag="gridRowIndex";
dgu.gridViewTag="gridView";
dgu.fire=function(ob,ev,args){
var fn=ob&&ev&&ob[ev];
return fn&&(args?fn.apply(ob,args):ob[ev]());
};
dgu.setStyleHeightPx=function(_a5d,_a5e){
if(_a5e>=0){
var s=_a5d.style;
var v=_a5e+"px";
if(_a5d&&s["height"]!=v){
s["height"]=v;
}
}
};
dgu.mouseEvents=["mouseover","mouseout","mousedown","mouseup","click","dblclick","contextmenu"];
dgu.keyEvents=["keyup","keydown","keypress"];
dgu.funnelEvents=function(_a5f,_a60,_a61,_a62){
var evts=(_a62?_a62:dgu.mouseEvents.concat(dgu.keyEvents));
for(var i=0,l=evts.length;i<l;i++){
_a60.connect(_a5f,"on"+evts[i],_a61);
}
};
dgu.removeNode=function(_a63){
_a63=dojo.byId(_a63);
_a63&&_a63.parentNode&&_a63.parentNode.removeChild(_a63);
return _a63;
};
dgu.arrayCompare=function(inA,inB){
for(var i=0,l=inA.length;i<l;i++){
if(inA[i]!=inB[i]){
return false;
}
}
return (inA.length==inB.length);
};
dgu.arrayInsert=function(_a64,_a65,_a66){
if(_a64.length<=_a65){
_a64[_a65]=_a66;
}else{
_a64.splice(_a65,0,_a66);
}
};
dgu.arrayRemove=function(_a67,_a68){
_a67.splice(_a68,1);
};
dgu.arraySwap=function(_a69,inI,inJ){
var _a6a=_a69[inI];
_a69[inI]=_a69[inJ];
_a69[inJ]=_a6a;
};
})();
dojo.provide("dojox.grid._Scroller");
(function(){
var _a6b=function(_a6c){
var i=0,n,p=_a6c.parentNode;
while((n=p.childNodes[i++])){
if(n==_a6c){
return i-1;
}
}
return -1;
};
var _a6d=function(_a6e){
if(!_a6e){
return;
}
var _a6f=function(inW){
return inW.domNode&&dojo.isDescendant(inW.domNode,_a6e,true);
};
var ws=dijit.registry.filter(_a6f);
for(var i=0,w;(w=ws[i]);i++){
w.destroy();
}
delete ws;
};
var _a70=function(_a71){
var node=dojo.byId(_a71);
return (node&&node.tagName?node.tagName.toLowerCase():"");
};
var _a72=function(_a73,_a74){
var _a75=[];
var i=0,n;
while((n=_a73.childNodes[i])){
i++;
if(_a70(n)==_a74){
_a75.push(n);
}
}
return _a75;
};
var _a76=function(_a77){
return _a72(_a77,"div");
};
dojo.declare("dojox.grid._Scroller",null,{constructor:function(_a78){
this.setContentNodes(_a78);
this.pageHeights=[];
this.pageNodes=[];
this.stack=[];
},rowCount:0,defaultRowHeight:32,keepRows:100,contentNode:null,scrollboxNode:null,defaultPageHeight:0,keepPages:10,pageCount:0,windowHeight:0,firstVisibleRow:0,lastVisibleRow:0,averageRowHeight:0,page:0,pageTop:0,init:function(_a79,_a7a,_a7b){
switch(arguments.length){
case 3:
this.rowsPerPage=_a7b;
case 2:
this.keepRows=_a7a;
case 1:
this.rowCount=_a79;
default:
break;
}
this.defaultPageHeight=this.defaultRowHeight*this.rowsPerPage;
this.pageCount=this._getPageCount(this.rowCount,this.rowsPerPage);
this.setKeepInfo(this.keepRows);
this.invalidate();
if(this.scrollboxNode){
this.scrollboxNode.scrollTop=0;
this.scroll(0);
this.scrollboxNode.onscroll=dojo.hitch(this,"onscroll");
}
},_getPageCount:function(_a7c,_a7d){
return _a7c?(Math.ceil(_a7c/_a7d)||1):0;
},destroy:function(){
this.invalidateNodes();
delete this.contentNodes;
delete this.contentNode;
delete this.scrollboxNode;
},setKeepInfo:function(_a7e){
this.keepRows=_a7e;
this.keepPages=!this.keepRows?this.keepPages:Math.max(Math.ceil(this.keepRows/this.rowsPerPage),2);
},setContentNodes:function(_a7f){
this.contentNodes=_a7f;
this.colCount=(this.contentNodes?this.contentNodes.length:0);
this.pageNodes=[];
for(var i=0;i<this.colCount;i++){
this.pageNodes[i]=[];
}
},getDefaultNodes:function(){
return this.pageNodes[0]||[];
},invalidate:function(){
this._invalidating=true;
this.invalidateNodes();
this.pageHeights=[];
this.height=(this.pageCount?(this.pageCount-1)*this.defaultPageHeight+this.calcLastPageHeight():0);
this.resize();
this._invalidating=false;
},updateRowCount:function(_a80){
this.invalidateNodes();
this.rowCount=_a80;
var _a81=this.pageCount;
if(_a81===0){
this.height=1;
}
this.pageCount=this._getPageCount(this.rowCount,this.rowsPerPage);
if(this.pageCount<_a81){
for(var i=_a81-1;i>=this.pageCount;i--){
this.height-=this.getPageHeight(i);
delete this.pageHeights[i];
}
}else{
if(this.pageCount>_a81){
this.height+=this.defaultPageHeight*(this.pageCount-_a81-1)+this.calcLastPageHeight();
}
}
this.resize();
},pageExists:function(_a82){
return Boolean(this.getDefaultPageNode(_a82));
},measurePage:function(_a83){
if(this.grid.rowHeight){
var _a84=this.grid.rowHeight+1;
return ((_a83+1)*this.rowsPerPage>this.rowCount?this.rowCount-_a83*this.rowsPerPage:this.rowsPerPage)*_a84;
}
var n=this.getDefaultPageNode(_a83);
return (n&&n.innerHTML)?n.offsetHeight:undefined;
},positionPage:function(_a85,_a86){
for(var i=0;i<this.colCount;i++){
this.pageNodes[i][_a85].style.top=_a86+"px";
}
},repositionPages:function(_a87){
var _a88=this.getDefaultNodes();
var last=0;
for(var i=0;i<this.stack.length;i++){
last=Math.max(this.stack[i],last);
}
var n=_a88[_a87];
var y=(n?this.getPageNodePosition(n)+this.getPageHeight(_a87):0);
for(var p=_a87+1;p<=last;p++){
n=_a88[p];
if(n){
if(this.getPageNodePosition(n)==y){
return;
}
this.positionPage(p,y);
}
y+=this.getPageHeight(p);
}
},installPage:function(_a89){
for(var i=0;i<this.colCount;i++){
this.contentNodes[i].appendChild(this.pageNodes[i][_a89]);
}
},preparePage:function(_a8a,_a8b){
var p=(_a8b?this.popPage():null);
for(var i=0;i<this.colCount;i++){
var _a8c=this.pageNodes[i];
var _a8d=(p===null?this.createPageNode():this.invalidatePageNode(p,_a8c));
_a8d.pageIndex=_a8a;
_a8c[_a8a]=_a8d;
}
},renderPage:function(_a8e){
var _a8f=[];
var i,j;
for(i=0;i<this.colCount;i++){
_a8f[i]=this.pageNodes[i][_a8e];
}
for(i=0,j=_a8e*this.rowsPerPage;(i<this.rowsPerPage)&&(j<this.rowCount);i++,j++){
this.renderRow(j,_a8f);
}
},removePage:function(_a90){
for(var i=0,j=_a90*this.rowsPerPage;i<this.rowsPerPage;i++,j++){
this.removeRow(j);
}
},destroyPage:function(_a91){
for(var i=0;i<this.colCount;i++){
var n=this.invalidatePageNode(_a91,this.pageNodes[i]);
if(n){
dojo.destroy(n);
}
}
},pacify:function(_a92){
},pacifying:false,pacifyTicks:200,setPacifying:function(_a93){
if(this.pacifying!=_a93){
this.pacifying=_a93;
this.pacify(this.pacifying);
}
},startPacify:function(){
this.startPacifyTicks=new Date().getTime();
},doPacify:function(){
var _a94=(new Date().getTime()-this.startPacifyTicks)>this.pacifyTicks;
this.setPacifying(true);
this.startPacify();
return _a94;
},endPacify:function(){
this.setPacifying(false);
},resize:function(){
if(this.scrollboxNode){
this.windowHeight=this.scrollboxNode.clientHeight;
}
for(var i=0;i<this.colCount;i++){
dojox.grid.util.setStyleHeightPx(this.contentNodes[i],Math.max(1,this.height));
}
var _a95=(!this._invalidating);
if(!_a95){
var ah=this.grid.get("autoHeight");
if(typeof ah=="number"&&ah<=Math.min(this.rowsPerPage,this.rowCount)){
_a95=true;
}
}
if(_a95){
this.needPage(this.page,this.pageTop);
}
var _a96=(this.page<this.pageCount-1)?this.rowsPerPage:((this.rowCount%this.rowsPerPage)||this.rowsPerPage);
var _a97=this.getPageHeight(this.page);
this.averageRowHeight=(_a97>0&&_a96>0)?(_a97/_a96):0;
},calcLastPageHeight:function(){
if(!this.pageCount){
return 0;
}
var _a98=this.pageCount-1;
var _a99=((this.rowCount%this.rowsPerPage)||(this.rowsPerPage))*this.defaultRowHeight;
this.pageHeights[_a98]=_a99;
return _a99;
},updateContentHeight:function(inDh){
this.height+=inDh;
this.resize();
},updatePageHeight:function(_a9a,_a9b,_a9c){
if(this.pageExists(_a9a)){
var oh=this.getPageHeight(_a9a);
var h=(this.measurePage(_a9a));
if(h===undefined){
h=oh;
}
this.pageHeights[_a9a]=h;
if(oh!=h){
this.updateContentHeight(h-oh);
var ah=this.grid.get("autoHeight");
if((typeof ah=="number"&&ah>this.rowCount)||(ah===true&&!_a9b)){
if(!_a9c){
this.grid.sizeChange();
}else{
var ns=this.grid.viewsNode.style;
ns.height=parseInt(ns.height)+h-oh+"px";
this.repositionPages(_a9a);
}
}else{
this.repositionPages(_a9a);
}
}
return h;
}
return 0;
},rowHeightChanged:function(_a9d,_a9e){
this.updatePageHeight(Math.floor(_a9d/this.rowsPerPage),false,_a9e);
},invalidateNodes:function(){
while(this.stack.length){
this.destroyPage(this.popPage());
}
},createPageNode:function(){
var p=document.createElement("div");
dojo.attr(p,"role","presentation");
p.style.position="absolute";
p.style[dojo._isBodyLtr()?"left":"right"]="0";
return p;
},getPageHeight:function(_a9f){
var ph=this.pageHeights[_a9f];
return (ph!==undefined?ph:this.defaultPageHeight);
},pushPage:function(_aa0){
return this.stack.push(_aa0);
},popPage:function(){
return this.stack.shift();
},findPage:function(_aa1){
var i=0,h=0;
for(var ph=0;i<this.pageCount;i++,h+=ph){
ph=this.getPageHeight(i);
if(h+ph>=_aa1){
break;
}
}
this.page=i;
this.pageTop=h;
},buildPage:function(_aa2,_aa3,_aa4){
this.preparePage(_aa2,_aa3);
this.positionPage(_aa2,_aa4);
this.installPage(_aa2);
this.renderPage(_aa2);
this.pushPage(_aa2);
},needPage:function(_aa5,_aa6){
var h=this.getPageHeight(_aa5),oh=h;
if(!this.pageExists(_aa5)){
this.buildPage(_aa5,(!this.grid._autoHeight&&this.keepPages&&(this.stack.length>=this.keepPages)),_aa6);
h=this.updatePageHeight(_aa5,true);
}else{
this.positionPage(_aa5,_aa6);
}
return h;
},onscroll:function(){
this.scroll(this.scrollboxNode.scrollTop);
},scroll:function(_aa7){
this.grid.scrollTop=_aa7;
if(this.colCount){
this.startPacify();
this.findPage(_aa7);
var h=this.height;
var b=this.getScrollBottom(_aa7);
for(var p=this.page,y=this.pageTop;(p<this.pageCount)&&((b<0)||(y<b));p++){
y+=this.needPage(p,y);
}
this.firstVisibleRow=this.getFirstVisibleRow(this.page,this.pageTop,_aa7);
this.lastVisibleRow=this.getLastVisibleRow(p-1,y,b);
if(h!=this.height){
this.repositionPages(p-1);
}
this.endPacify();
}
},getScrollBottom:function(_aa8){
return (this.windowHeight>=0?_aa8+this.windowHeight:-1);
},processNodeEvent:function(e,_aa9){
var t=e.target;
while(t&&(t!=_aa9)&&t.parentNode&&(t.parentNode.parentNode!=_aa9)){
t=t.parentNode;
}
if(!t||!t.parentNode||(t.parentNode.parentNode!=_aa9)){
return false;
}
var page=t.parentNode;
e.topRowIndex=page.pageIndex*this.rowsPerPage;
e.rowIndex=e.topRowIndex+_a6b(t);
e.rowTarget=t;
return true;
},processEvent:function(e){
return this.processNodeEvent(e,this.contentNode);
},renderRow:function(_aaa,_aab){
},removeRow:function(_aac){
},getDefaultPageNode:function(_aad){
return this.getDefaultNodes()[_aad];
},positionPageNode:function(_aae,_aaf){
},getPageNodePosition:function(_ab0){
return _ab0.offsetTop;
},invalidatePageNode:function(_ab1,_ab2){
var p=_ab2[_ab1];
if(p){
delete _ab2[_ab1];
this.removePage(_ab1,p);
_a6d(p);
p.innerHTML="";
}
return p;
},getPageRow:function(_ab3){
return _ab3*this.rowsPerPage;
},getLastPageRow:function(_ab4){
return Math.min(this.rowCount,this.getPageRow(_ab4+1))-1;
},getFirstVisibleRow:function(_ab5,_ab6,_ab7){
if(!this.pageExists(_ab5)){
return 0;
}
var row=this.getPageRow(_ab5);
var _ab8=this.getDefaultNodes();
var rows=_a76(_ab8[_ab5]);
for(var i=0,l=rows.length;i<l&&_ab6<_ab7;i++,row++){
_ab6+=rows[i].offsetHeight;
}
return (row?row-1:row);
},getLastVisibleRow:function(_ab9,_aba,_abb){
if(!this.pageExists(_ab9)){
return 0;
}
var _abc=this.getDefaultNodes();
var row=this.getLastPageRow(_ab9);
var rows=_a76(_abc[_ab9]);
for(var i=rows.length-1;i>=0&&_aba>_abb;i--,row--){
_aba-=rows[i].offsetHeight;
}
return row+1;
},findTopRow:function(_abd){
var _abe=this.getDefaultNodes();
var rows=_a76(_abe[this.page]);
for(var i=0,l=rows.length,t=this.pageTop,h;i<l;i++){
h=rows[i].offsetHeight;
t+=h;
if(t>=_abd){
this.offset=h-(t-_abd);
return i+this.page*this.rowsPerPage;
}
}
return -1;
},findScrollTop:function(_abf){
var _ac0=Math.floor(_abf/this.rowsPerPage);
var t=0;
var i,l;
for(i=0;i<_ac0;i++){
t+=this.getPageHeight(i);
}
this.pageTop=t;
this.page=_ac0;
this.needPage(_ac0,this.pageTop);
var _ac1=this.getDefaultNodes();
var rows=_a76(_ac1[_ac0]);
var r=_abf-this.rowsPerPage*_ac0;
for(i=0,l=rows.length;i<l&&i<r;i++){
t+=rows[i].offsetHeight;
}
return t;
},dummy:0});
})();
dojo.provide("dojox.grid.cells._base");
dojo.declare("dojox.grid._DeferredTextWidget",dijit._Widget,{deferred:null,_destroyOnRemove:true,postCreate:function(){
if(this.deferred){
this.deferred.addBoth(dojo.hitch(this,function(text){
if(this.domNode){
this.domNode.innerHTML=text;
}
}));
}
}});
(function(){
var _ac2=function(_ac3){
try{
dojox.grid.util.fire(_ac3,"focus");
dojox.grid.util.fire(_ac3,"select");
}
catch(e){
}
};
var _ac4=function(){
setTimeout(dojo.hitch.apply(dojo,arguments),0);
};
var dgc=dojox.grid.cells;
dojo.declare("dojox.grid.cells._Base",null,{styles:"",classes:"",editable:false,alwaysEditing:false,formatter:null,defaultValue:"...",value:null,hidden:false,noresize:false,draggable:true,_valueProp:"value",_formatPending:false,constructor:function(_ac5){
this._props=_ac5||{};
dojo.mixin(this,_ac5);
if(this.draggable===undefined){
this.draggable=true;
}
},_defaultFormat:function(_ac6,_ac7){
var s=this.grid.formatterScope||this;
var f=this.formatter;
if(f&&s&&typeof f=="string"){
f=this.formatter=s[f];
}
var v=(_ac6!=this.defaultValue&&f)?f.apply(s,_ac7):_ac6;
if(typeof v=="undefined"){
return this.defaultValue;
}
if(v&&v.addBoth){
v=new dojox.grid._DeferredTextWidget({deferred:v},dojo.create("span",{innerHTML:this.defaultValue}));
}
if(v&&v.declaredClass&&v.startup){
return "<div class='dojoxGridStubNode' linkWidget='"+v.id+"' cellIdx='"+this.index+"'>"+this.defaultValue+"</div>";
}
return v;
},format:function(_ac8,_ac9){
var f,i=this.grid.edit.info,d=this.get?this.get(_ac8,_ac9):(this.value||this.defaultValue);
d=(d&&d.replace&&this.grid.escapeHTMLInData)?d.replace(/&/g,"&amp;").replace(/</g,"&lt;"):d;
if(this.editable&&(this.alwaysEditing||(i.rowIndex==_ac8&&i.cell==this))){
return this.formatEditing(d,_ac8);
}else{
return this._defaultFormat(d,[d,_ac8,this]);
}
},formatEditing:function(_aca,_acb){
},getNode:function(_acc){
return this.view.getCellNode(_acc,this.index);
},getHeaderNode:function(){
return this.view.getHeaderCellNode(this.index);
},getEditNode:function(_acd){
return (this.getNode(_acd)||0).firstChild||0;
},canResize:function(){
var uw=this.unitWidth;
return uw&&(uw!=="auto");
},isFlex:function(){
var uw=this.unitWidth;
return uw&&dojo.isString(uw)&&(uw=="auto"||uw.slice(-1)=="%");
},applyEdit:function(_ace,_acf){
this.grid.edit.applyCellEdit(_ace,this,_acf);
},cancelEdit:function(_ad0){
this.grid.doCancelEdit(_ad0);
},_onEditBlur:function(_ad1){
if(this.grid.edit.isEditCell(_ad1,this.index)){
this.grid.edit.apply();
}
},registerOnBlur:function(_ad2,_ad3){
if(this.commitOnBlur){
dojo.connect(_ad2,"onblur",function(e){
setTimeout(dojo.hitch(this,"_onEditBlur",_ad3),250);
});
}
},needFormatNode:function(_ad4,_ad5){
this._formatPending=true;
_ac4(this,"_formatNode",_ad4,_ad5);
},cancelFormatNode:function(){
this._formatPending=false;
},_formatNode:function(_ad6,_ad7){
if(this._formatPending){
this._formatPending=false;
dojo.setSelectable(this.grid.domNode,true);
this.formatNode(this.getEditNode(_ad7),_ad6,_ad7);
}
},formatNode:function(_ad8,_ad9,_ada){
if(dojo.isIE){
_ac4(this,"focus",_ada,_ad8);
}else{
this.focus(_ada,_ad8);
}
},dispatchEvent:function(m,e){
if(m in this){
return this[m](e);
}
},getValue:function(_adb){
return this.getEditNode(_adb)[this._valueProp];
},setValue:function(_adc,_add){
var n=this.getEditNode(_adc);
if(n){
n[this._valueProp]=_add;
}
},focus:function(_ade,_adf){
_ac2(_adf||this.getEditNode(_ade));
},save:function(_ae0){
this.value=this.value||this.getValue(_ae0);
},restore:function(_ae1){
this.setValue(_ae1,this.value);
},_finish:function(_ae2){
dojo.setSelectable(this.grid.domNode,false);
this.cancelFormatNode();
},apply:function(_ae3){
this.applyEdit(this.getValue(_ae3),_ae3);
this._finish(_ae3);
},cancel:function(_ae4){
this.cancelEdit(_ae4);
this._finish(_ae4);
}});
dgc._Base.markupFactory=function(node,_ae5){
var d=dojo;
var _ae6=d.trim(d.attr(node,"formatter")||"");
if(_ae6){
_ae5.formatter=dojo.getObject(_ae6)||_ae6;
}
var get=d.trim(d.attr(node,"get")||"");
if(get){
_ae5.get=dojo.getObject(get);
}
var _ae7=function(attr,cell,_ae8){
var _ae9=d.trim(d.attr(node,attr)||"");
if(_ae9){
cell[_ae8||attr]=!(_ae9.toLowerCase()=="false");
}
};
_ae7("sortDesc",_ae5);
_ae7("editable",_ae5);
_ae7("alwaysEditing",_ae5);
_ae7("noresize",_ae5);
_ae7("draggable",_ae5);
var _aea=d.trim(d.attr(node,"loadingText")||d.attr(node,"defaultValue")||"");
if(_aea){
_ae5.defaultValue=_aea;
}
var _aeb=function(attr,cell,_aec){
var _aed=d.trim(d.attr(node,attr)||"")||undefined;
if(_aed){
cell[_aec||attr]=_aed;
}
};
_aeb("styles",_ae5);
_aeb("headerStyles",_ae5);
_aeb("cellStyles",_ae5);
_aeb("classes",_ae5);
_aeb("headerClasses",_ae5);
_aeb("cellClasses",_ae5);
};
dojo.declare("dojox.grid.cells.Cell",dgc._Base,{constructor:function(){
this.keyFilter=this.keyFilter;
},keyFilter:null,formatEditing:function(_aee,_aef){
this.needFormatNode(_aee,_aef);
return "<input class=\"dojoxGridInput\" type=\"text\" value=\""+_aee+"\">";
},formatNode:function(_af0,_af1,_af2){
this.inherited(arguments);
this.registerOnBlur(_af0,_af2);
},doKey:function(e){
if(this.keyFilter){
var key=String.fromCharCode(e.charCode);
if(key.search(this.keyFilter)==-1){
dojo.stopEvent(e);
}
}
},_finish:function(_af3){
this.inherited(arguments);
var n=this.getEditNode(_af3);
try{
dojox.grid.util.fire(n,"blur");
}
catch(e){
}
}});
dgc.Cell.markupFactory=function(node,_af4){
dgc._Base.markupFactory(node,_af4);
var d=dojo;
var _af5=d.trim(d.attr(node,"keyFilter")||"");
if(_af5){
_af4.keyFilter=new RegExp(_af5);
}
};
dojo.declare("dojox.grid.cells.RowIndex",dgc.Cell,{name:"Row",postscript:function(){
this.editable=false;
},get:function(_af6){
return _af6+1;
}});
dgc.RowIndex.markupFactory=function(node,_af7){
dgc.Cell.markupFactory(node,_af7);
};
dojo.declare("dojox.grid.cells.Select",dgc.Cell,{options:null,values:null,returnIndex:-1,constructor:function(_af8){
this.values=this.values||this.options;
},formatEditing:function(_af9,_afa){
this.needFormatNode(_af9,_afa);
var h=["<select class=\"dojoxGridSelect\">"];
for(var i=0,o,v;((o=this.options[i])!==undefined)&&((v=this.values[i])!==undefined);i++){
h.push("<option",(_af9==v?" selected":"")," value=\""+v+"\"",">",o,"</option>");
}
h.push("</select>");
return h.join("");
},getValue:function(_afb){
var n=this.getEditNode(_afb);
if(n){
var i=n.selectedIndex,o=n.options[i];
return this.returnIndex>-1?i:o.value||o.innerHTML;
}
}});
dgc.Select.markupFactory=function(node,cell){
dgc.Cell.markupFactory(node,cell);
var d=dojo;
var _afc=d.trim(d.attr(node,"options")||"");
if(_afc){
var o=_afc.split(",");
if(o[0]!=_afc){
cell.options=o;
}
}
var _afd=d.trim(d.attr(node,"values")||"");
if(_afd){
var v=_afd.split(",");
if(v[0]!=_afd){
cell.values=v;
}
}
};
dojo.declare("dojox.grid.cells.AlwaysEdit",dgc.Cell,{alwaysEditing:true,_formatNode:function(_afe,_aff){
this.formatNode(this.getEditNode(_aff),_afe,_aff);
},applyStaticValue:function(_b00){
var e=this.grid.edit;
e.applyCellEdit(this.getValue(_b00),this,_b00);
e.start(this,_b00,true);
}});
dgc.AlwaysEdit.markupFactory=function(node,cell){
dgc.Cell.markupFactory(node,cell);
};
dojo.declare("dojox.grid.cells.Bool",dgc.AlwaysEdit,{_valueProp:"checked",formatEditing:function(_b01,_b02){
return "<input class=\"dojoxGridInput\" type=\"checkbox\""+(_b01?" checked=\"checked\"":"")+" style=\"width: auto\" />";
},doclick:function(e){
if(e.target.tagName=="INPUT"){
this.applyStaticValue(e.rowIndex);
}
}});
dgc.Bool.markupFactory=function(node,cell){
dgc.AlwaysEdit.markupFactory(node,cell);
};
})();
dojo.provide("dojox.grid.cells");
dojo.provide("dojox.grid._Builder");
(function(){
var dg=dojox.grid;
var _b03=function(td){
return td.cellIndex>=0?td.cellIndex:dojo.indexOf(td.parentNode.cells,td);
};
var _b04=function(tr){
return tr.rowIndex>=0?tr.rowIndex:dojo.indexOf(tr.parentNode.childNodes,tr);
};
var _b05=function(_b06,_b07){
return _b06&&((_b06.rows||0)[_b07]||_b06.childNodes[_b07]);
};
var _b08=function(node){
for(var n=node;n&&n.tagName!="TABLE";n=n.parentNode){
}
return n;
};
var _b09=function(_b0a,_b0b){
for(var n=_b0a;n&&_b0b(n);n=n.parentNode){
}
return n;
};
var _b0c=function(_b0d){
var name=_b0d.toUpperCase();
return function(node){
return node.tagName!=name;
};
};
var _b0e=dojox.grid.util.rowIndexTag;
var _b0f=dojox.grid.util.gridViewTag;
dg._Builder=dojo.extend(function(view){
if(view){
this.view=view;
this.grid=view.grid;
}
},{view:null,_table:"<table class=\"dojoxGridRowTable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\"",getTableArray:function(){
var html=[this._table];
if(this.view.viewWidth){
html.push([" style=\"width:",this.view.viewWidth,";\""].join(""));
}
html.push(">");
return html;
},generateCellMarkup:function(_b10,_b11,_b12,_b13){
var _b14=[],html;
if(_b13){
var _b15=_b10.index!=_b10.grid.getSortIndex()?"":_b10.grid.sortInfo>0?"aria-sort=\"ascending\"":"aria-sort=\"descending\"";
if(!_b10.id){
_b10.id=this.grid.id+"Hdr"+_b10.index;
}
html=["<th tabIndex=\"-1\" aria-readonly=\"true\" role=\"columnheader\"",_b15,"id=\"",_b10.id,"\""];
}else{
var _b16=this.grid.editable&&!_b10.editable?"aria-readonly=\"true\"":"";
html=["<td tabIndex=\"-1\" role=\"gridcell\"",_b16];
}
if(_b10.colSpan){
html.push(" colspan=\"",_b10.colSpan,"\"");
}
if(_b10.rowSpan){
html.push(" rowspan=\"",_b10.rowSpan,"\"");
}
html.push(" class=\"dojoxGridCell ");
if(_b10.classes){
html.push(_b10.classes," ");
}
if(_b12){
html.push(_b12," ");
}
_b14.push(html.join(""));
_b14.push("");
html=["\" idx=\"",_b10.index,"\" style=\""];
if(_b11&&_b11[_b11.length-1]!=";"){
_b11+=";";
}
html.push(_b10.styles,_b11||"",_b10.hidden?"display:none;":"");
if(_b10.unitWidth){
html.push("width:",_b10.unitWidth,";");
}
_b14.push(html.join(""));
_b14.push("");
html=["\""];
if(_b10.attrs){
html.push(" ",_b10.attrs);
}
html.push(">");
_b14.push(html.join(""));
_b14.push("");
_b14.push(_b13?"</th>":"</td>");
return _b14;
},isCellNode:function(_b17){
return Boolean(_b17&&_b17!=dojo.doc&&dojo.attr(_b17,"idx"));
},getCellNodeIndex:function(_b18){
return _b18?Number(dojo.attr(_b18,"idx")):-1;
},getCellNode:function(_b19,_b1a){
for(var i=0,row;(row=_b05(_b19.firstChild,i));i++){
for(var j=0,cell;(cell=row.cells[j]);j++){
if(this.getCellNodeIndex(cell)==_b1a){
return cell;
}
}
}
return null;
},findCellTarget:function(_b1b,_b1c){
var n=_b1b;
while(n&&(!this.isCellNode(n)||(n.offsetParent&&_b0f in n.offsetParent.parentNode&&n.offsetParent.parentNode[_b0f]!=this.view.id))&&(n!=_b1c)){
n=n.parentNode;
}
return n!=_b1c?n:null;
},baseDecorateEvent:function(e){
e.dispatch="do"+e.type;
e.grid=this.grid;
e.sourceView=this.view;
e.cellNode=this.findCellTarget(e.target,e.rowNode);
e.cellIndex=this.getCellNodeIndex(e.cellNode);
e.cell=(e.cellIndex>=0?this.grid.getCell(e.cellIndex):null);
},findTarget:function(_b1d,_b1e){
var n=_b1d;
while(n&&(n!=this.domNode)&&(!(_b1e in n)||(_b0f in n&&n[_b0f]!=this.view.id))){
n=n.parentNode;
}
return (n!=this.domNode)?n:null;
},findRowTarget:function(_b1f){
return this.findTarget(_b1f,_b0e);
},isIntraNodeEvent:function(e){
try{
return (e.cellNode&&e.relatedTarget&&dojo.isDescendant(e.relatedTarget,e.cellNode));
}
catch(x){
return false;
}
},isIntraRowEvent:function(e){
try{
var row=e.relatedTarget&&this.findRowTarget(e.relatedTarget);
return !row&&(e.rowIndex==-1)||row&&(e.rowIndex==row.gridRowIndex);
}
catch(x){
return false;
}
},dispatchEvent:function(e){
if(e.dispatch in this){
return this[e.dispatch](e);
}
return false;
},domouseover:function(e){
if(e.cellNode&&(e.cellNode!=this.lastOverCellNode)){
this.lastOverCellNode=e.cellNode;
this.grid.onMouseOver(e);
}
this.grid.onMouseOverRow(e);
},domouseout:function(e){
if(e.cellNode&&(e.cellNode==this.lastOverCellNode)&&!this.isIntraNodeEvent(e,this.lastOverCellNode)){
this.lastOverCellNode=null;
this.grid.onMouseOut(e);
if(!this.isIntraRowEvent(e)){
this.grid.onMouseOutRow(e);
}
}
},domousedown:function(e){
if(e.cellNode){
this.grid.onMouseDown(e);
}
this.grid.onMouseDownRow(e);
}});
dg._ContentBuilder=dojo.extend(function(view){
dg._Builder.call(this,view);
},dg._Builder.prototype,{update:function(){
this.prepareHtml();
},prepareHtml:function(){
var _b20=this.grid.get,_b21=this.view.structure.cells;
for(var j=0,row;(row=_b21[j]);j++){
for(var i=0,cell;(cell=row[i]);i++){
cell.get=cell.get||(cell.value==undefined)&&_b20;
cell.markup=this.generateCellMarkup(cell,cell.cellStyles,cell.cellClasses,false);
if(!this.grid.editable&&cell.editable){
this.grid.editable=true;
}
}
}
},generateHtml:function(_b22,_b23){
var html=this.getTableArray(),v=this.view,_b24=v.structure.cells,item=this.grid.getItem(_b23);
dojox.grid.util.fire(this.view,"onBeforeRow",[_b23,_b24]);
for(var j=0,row;(row=_b24[j]);j++){
if(row.hidden||row.header){
continue;
}
html.push(!row.invisible?"<tr>":"<tr class=\"dojoxGridInvisible\">");
for(var i=0,cell,m,cc,cs;(cell=row[i]);i++){
m=cell.markup;
cc=cell.customClasses=[];
cs=cell.customStyles=[];
m[5]=cell.format(_b23,item);
m[1]=cc.join(" ");
m[3]=cs.join(";");
html.push.apply(html,m);
}
html.push("</tr>");
}
html.push("</table>");
return html.join("");
},decorateEvent:function(e){
e.rowNode=this.findRowTarget(e.target);
if(!e.rowNode){
return false;
}
e.rowIndex=e.rowNode[_b0e];
this.baseDecorateEvent(e);
e.cell=this.grid.getCell(e.cellIndex);
return true;
}});
dg._HeaderBuilder=dojo.extend(function(view){
this.moveable=null;
dg._Builder.call(this,view);
},dg._Builder.prototype,{_skipBogusClicks:false,overResizeWidth:4,minColWidth:1,update:function(){
if(this.tableMap){
this.tableMap.mapRows(this.view.structure.cells);
}else{
this.tableMap=new dg._TableMap(this.view.structure.cells);
}
},generateHtml:function(_b25,_b26){
var html=this.getTableArray(),_b27=this.view.structure.cells;
dojox.grid.util.fire(this.view,"onBeforeRow",[-1,_b27]);
for(var j=0,row;(row=_b27[j]);j++){
if(row.hidden){
continue;
}
html.push(!row.invisible?"<tr>":"<tr class=\"dojoxGridInvisible\">");
for(var i=0,cell,_b28;(cell=row[i]);i++){
cell.customClasses=[];
cell.customStyles=[];
if(this.view.simpleStructure){
if(cell.draggable){
if(cell.headerClasses){
if(cell.headerClasses.indexOf("dojoDndItem")==-1){
cell.headerClasses+=" dojoDndItem";
}
}else{
cell.headerClasses="dojoDndItem";
}
}
if(cell.attrs){
if(cell.attrs.indexOf("dndType='gridColumn_")==-1){
cell.attrs+=" dndType='gridColumn_"+this.grid.id+"'";
}
}else{
cell.attrs="dndType='gridColumn_"+this.grid.id+"'";
}
}
_b28=this.generateCellMarkup(cell,cell.headerStyles,cell.headerClasses,true);
_b28[5]=(_b26!=undefined?_b26:_b25(cell));
_b28[3]=cell.customStyles.join(";");
_b28[1]=cell.customClasses.join(" ");
html.push(_b28.join(""));
}
html.push("</tr>");
}
html.push("</table>");
return html.join("");
},getCellX:function(e){
var n,x=e.layerX;
if(dojo.isMoz){
n=_b09(e.target,_b0c("th"));
x-=(n&&n.offsetLeft)||0;
var t=e.sourceView.getScrollbarWidth();
if(!dojo._isBodyLtr()){
table=_b09(n,_b0c("table"));
x-=(table&&table.offsetLeft)||0;
}
}
n=_b09(e.target,function(){
if(!n||n==e.cellNode){
return false;
}
x+=(n.offsetLeft<0?0:n.offsetLeft);
return true;
});
return x;
},decorateEvent:function(e){
this.baseDecorateEvent(e);
e.rowIndex=-1;
e.cellX=this.getCellX(e);
return true;
},prepareResize:function(e,mod){
do{
var i=_b03(e.cellNode);
e.cellNode=(i?e.cellNode.parentNode.cells[i+mod]:null);
e.cellIndex=(e.cellNode?this.getCellNodeIndex(e.cellNode):-1);
}while(e.cellNode&&e.cellNode.style.display=="none");
return Boolean(e.cellNode);
},canResize:function(e){
if(!e.cellNode||e.cellNode.colSpan>1){
return false;
}
var cell=this.grid.getCell(e.cellIndex);
return !cell.noresize&&cell.canResize();
},overLeftResizeArea:function(e){
if(dojo.hasClass(dojo.body(),"dojoDndMove")){
return false;
}
if(dojo.isIE){
var tN=e.target;
if(dojo.hasClass(tN,"dojoxGridArrowButtonNode")||dojo.hasClass(tN,"dojoxGridArrowButtonChar")){
return false;
}
}
if(dojo._isBodyLtr()){
return (e.cellIndex>0)&&(e.cellX>0&&e.cellX<this.overResizeWidth)&&this.prepareResize(e,-1);
}
var t=e.cellNode&&(e.cellX>0&&e.cellX<this.overResizeWidth);
return t;
},overRightResizeArea:function(e){
if(dojo.hasClass(dojo.body(),"dojoDndMove")){
return false;
}
if(dojo.isIE){
var tN=e.target;
if(dojo.hasClass(tN,"dojoxGridArrowButtonNode")||dojo.hasClass(tN,"dojoxGridArrowButtonChar")){
return false;
}
}
if(dojo._isBodyLtr()){
return e.cellNode&&(e.cellX>=e.cellNode.offsetWidth-this.overResizeWidth);
}
return (e.cellIndex>0)&&(e.cellX>=e.cellNode.offsetWidth-this.overResizeWidth)&&this.prepareResize(e,-1);
},domousemove:function(e){
if(!this.moveable){
var c=(this.overRightResizeArea(e)?"dojoxGridColResize":(this.overLeftResizeArea(e)?"dojoxGridColResize":""));
if(c&&!this.canResize(e)){
c="dojoxGridColNoResize";
}
dojo.toggleClass(e.sourceView.headerNode,"dojoxGridColNoResize",(c=="dojoxGridColNoResize"));
dojo.toggleClass(e.sourceView.headerNode,"dojoxGridColResize",(c=="dojoxGridColResize"));
if(dojo.isIE){
var t=e.sourceView.headerNode.scrollLeft;
e.sourceView.headerNode.scrollLeft=t;
}
if(c){
dojo.stopEvent(e);
}
}
},domousedown:function(e){
if(!this.moveable){
if((this.overRightResizeArea(e)||this.overLeftResizeArea(e))&&this.canResize(e)){
this.beginColumnResize(e);
}else{
this.grid.onMouseDown(e);
this.grid.onMouseOverRow(e);
}
}
},doclick:function(e){
if(this._skipBogusClicks){
dojo.stopEvent(e);
return true;
}
return false;
},colResizeSetup:function(e,_b29){
var _b2a=dojo.contentBox(e.sourceView.headerNode);
if(_b29){
this.lineDiv=document.createElement("div");
var vw=(dojo.position||dojo._abs)(e.sourceView.headerNode,true);
var _b2b=dojo.contentBox(e.sourceView.domNode);
var l=e.pageX;
if(!dojo._isBodyLtr()&&dojo.isIE<8){
l-=dojox.html.metrics.getScrollbar().w;
}
dojo.style(this.lineDiv,{top:vw.y+"px",left:l+"px",height:(_b2b.h+_b2a.h)+"px"});
dojo.addClass(this.lineDiv,"dojoxGridResizeColLine");
this.lineDiv._origLeft=l;
dojo.body().appendChild(this.lineDiv);
}
var _b2c=[],_b2d=this.tableMap.findOverlappingNodes(e.cellNode);
for(var i=0,cell;(cell=_b2d[i]);i++){
_b2c.push({node:cell,index:this.getCellNodeIndex(cell),width:cell.offsetWidth});
}
var view=e.sourceView;
var adj=dojo._isBodyLtr()?1:-1;
var _b2e=e.grid.views.views;
var _b2f=[];
for(var j=view.idx+adj,_b30;(_b30=_b2e[j]);j=j+adj){
_b2f.push({node:_b30.headerNode,left:window.parseInt(_b30.headerNode.style.left)});
}
var _b31=view.headerContentNode.firstChild;
var drag={scrollLeft:e.sourceView.headerNode.scrollLeft,view:view,node:e.cellNode,index:e.cellIndex,w:dojo.contentBox(e.cellNode).w,vw:_b2a.w,table:_b31,tw:dojo.contentBox(_b31).w,spanners:_b2c,followers:_b2f};
return drag;
},beginColumnResize:function(e){
this.moverDiv=document.createElement("div");
dojo.style(this.moverDiv,{position:"absolute",left:0});
dojo.body().appendChild(this.moverDiv);
dojo.addClass(this.grid.domNode,"dojoxGridColumnResizing");
var m=(this.moveable=new dojo.dnd.Moveable(this.moverDiv));
var drag=this.colResizeSetup(e,true);
m.onMove=dojo.hitch(this,"doResizeColumn",drag);
dojo.connect(m,"onMoveStop",dojo.hitch(this,function(){
this.endResizeColumn(drag);
if(drag.node.releaseCapture){
drag.node.releaseCapture();
}
this.moveable.destroy();
delete this.moveable;
this.moveable=null;
dojo.removeClass(this.grid.domNode,"dojoxGridColumnResizing");
}));
if(e.cellNode.setCapture){
e.cellNode.setCapture();
}
m.onMouseDown(e);
},doResizeColumn:function(_b32,_b33,_b34){
var _b35=_b34.l;
var data={deltaX:_b35,w:_b32.w+(dojo._isBodyLtr()?_b35:-_b35),vw:_b32.vw+_b35,tw:_b32.tw+_b35};
this.dragRecord={inDrag:_b32,mover:_b33,leftTop:_b34};
if(data.w>=this.minColWidth){
if(!_b33){
this.doResizeNow(_b32,data);
}else{
dojo.style(this.lineDiv,"left",(this.lineDiv._origLeft+data.deltaX)+"px");
}
}
},endResizeColumn:function(_b36){
if(this.dragRecord){
var _b37=this.dragRecord.leftTop;
var _b38=dojo._isBodyLtr()?_b37.l:-_b37.l;
_b38+=Math.max(_b36.w+_b38,this.minColWidth)-(_b36.w+_b38);
if(dojo.isWebKit&&_b36.spanners.length){
_b38+=dojo._getPadBorderExtents(_b36.spanners[0].node).w;
}
var data={deltaX:_b38,w:_b36.w+_b38,vw:_b36.vw+_b38,tw:_b36.tw+_b38};
this.doResizeNow(_b36,data);
delete this.dragRecord;
}
dojo.destroy(this.lineDiv);
dojo.destroy(this.moverDiv);
dojo.destroy(this.moverDiv);
delete this.moverDiv;
this._skipBogusClicks=true;
_b36.view.update();
this._skipBogusClicks=false;
this.grid.onResizeColumn(_b36.index);
},doResizeNow:function(_b39,data){
_b39.view.convertColPctToFixed();
if(_b39.view.flexCells&&!_b39.view.testFlexCells()){
var t=_b08(_b39.node);
if(t){
(t.style.width="");
}
}
var i,s,sw,f,fl;
for(i=0;(s=_b39.spanners[i]);i++){
sw=s.width+data.deltaX;
s.node.style.width=sw+"px";
_b39.view.setColWidth(s.index,sw);
}
if(dojo._isBodyLtr()||!dojo.isIE){
for(i=0;(f=_b39.followers[i]);i++){
fl=f.left+data.deltaX;
f.node.style.left=fl+"px";
}
}
_b39.node.style.width=data.w+"px";
_b39.view.setColWidth(_b39.index,data.w);
_b39.view.headerNode.style.width=data.vw+"px";
_b39.view.setColumnsWidth(data.tw);
if(!dojo._isBodyLtr()){
_b39.view.headerNode.scrollLeft=_b39.scrollLeft+data.deltaX;
}
}});
dg._TableMap=dojo.extend(function(rows){
this.mapRows(rows);
},{map:null,mapRows:function(_b3a){
var _b3b=_b3a.length;
if(!_b3b){
return;
}
this.map=[];
var row;
for(var k=0;(row=_b3a[k]);k++){
this.map[k]=[];
}
for(var j=0;(row=_b3a[j]);j++){
for(var i=0,x=0,cell,_b3c,_b3d;(cell=row[i]);i++){
while(this.map[j][x]){
x++;
}
this.map[j][x]={c:i,r:j};
_b3d=cell.rowSpan||1;
_b3c=cell.colSpan||1;
for(var y=0;y<_b3d;y++){
for(var s=0;s<_b3c;s++){
this.map[j+y][x+s]=this.map[j][x];
}
}
x+=_b3c;
}
}
},dumpMap:function(){
for(var j=0,row,h="";(row=this.map[j]);j++,h=""){
for(var i=0,cell;(cell=row[i]);i++){
h+=cell.r+","+cell.c+"   ";
}
}
},getMapCoords:function(_b3e,_b3f){
for(var j=0,row;(row=this.map[j]);j++){
for(var i=0,cell;(cell=row[i]);i++){
if(cell.c==_b3f&&cell.r==_b3e){
return {j:j,i:i};
}
}
}
return {j:-1,i:-1};
},getNode:function(_b40,_b41,_b42){
var row=_b40&&_b40.rows[_b41];
return row&&row.cells[_b42];
},_findOverlappingNodes:function(_b43,_b44,_b45){
var _b46=[];
var m=this.getMapCoords(_b44,_b45);
for(var j=0,row;(row=this.map[j]);j++){
if(j==m.j){
continue;
}
var rw=row[m.i];
var n=(rw?this.getNode(_b43,rw.r,rw.c):null);
if(n){
_b46.push(n);
}
}
return _b46;
},findOverlappingNodes:function(_b47){
return this._findOverlappingNodes(_b08(_b47),_b04(_b47.parentNode),_b03(_b47));
}});
})();
dojo.provide("dojo.dnd.Container");
dojo.declare("dojo.dnd.Container",null,{skipForm:false,constructor:function(node,_b48){
this.node=dojo.byId(node);
if(!_b48){
_b48={};
}
this.creator=_b48.creator||null;
this.skipForm=_b48.skipForm;
this.parent=_b48.dropParent&&dojo.byId(_b48.dropParent);
this.map={};
this.current=null;
this.containerState="";
dojo.addClass(this.node,"dojoDndContainer");
if(!(_b48&&_b48._skipStartup)){
this.startup();
}
this.events=[dojo.connect(this.node,"onmouseover",this,"onMouseOver"),dojo.connect(this.node,"onmouseout",this,"onMouseOut"),dojo.connect(this.node,"ondragstart",this,"onSelectStart"),dojo.connect(this.node,"onselectstart",this,"onSelectStart")];
},creator:function(){
},getItem:function(key){
return this.map[key];
},setItem:function(key,data){
this.map[key]=data;
},delItem:function(key){
delete this.map[key];
},forInItems:function(f,o){
o=o||dojo.global;
var m=this.map,e=dojo.dnd._empty;
for(var i in m){
if(i in e){
continue;
}
f.call(o,m[i],i,this);
}
return o;
},clearItems:function(){
this.map={};
},getAllNodes:function(){
return dojo.query("> .dojoDndItem",this.parent);
},sync:function(){
var map={};
this.getAllNodes().forEach(function(node){
if(node.id){
var item=this.getItem(node.id);
if(item){
map[node.id]=item;
return;
}
}else{
node.id=dojo.dnd.getUniqueId();
}
var type=node.getAttribute("dndType"),data=node.getAttribute("dndData");
map[node.id]={data:data||node.innerHTML,type:type?type.split(/\s*,\s*/):["text"]};
},this);
this.map=map;
return this;
},insertNodes:function(data,_b49,_b4a){
if(!this.parent.firstChild){
_b4a=null;
}else{
if(_b49){
if(!_b4a){
_b4a=this.parent.firstChild;
}
}else{
if(_b4a){
_b4a=_b4a.nextSibling;
}
}
}
if(_b4a){
for(var i=0;i<data.length;++i){
var t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.insertBefore(t.node,_b4a);
}
}else{
for(var i=0;i<data.length;++i){
var t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.appendChild(t.node);
}
}
return this;
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.clearItems();
this.node=this.parent=this.current=null;
},markupFactory:function(_b4b,node){
_b4b._skipStartup=true;
return new dojo.dnd.Container(node,_b4b);
},startup:function(){
if(!this.parent){
this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){
var c=this.parent.getElementsByTagName("tbody");
if(c&&c.length){
this.parent=c[0];
}
}
}
this.defaultCreator=dojo.dnd._defaultCreator(this.parent);
this.sync();
},onMouseOver:function(e){
var n=e.relatedTarget;
while(n){
if(n==this.node){
break;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(!n){
this._changeState("Container","Over");
this.onOverEvent();
}
n=this._getChildByEvent(e);
if(this.current==n){
return;
}
if(this.current){
this._removeItemClass(this.current,"Over");
}
if(n){
this._addItemClass(n,"Over");
}
this.current=n;
},onMouseOut:function(e){
for(var n=e.relatedTarget;n;){
if(n==this.node){
return;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(this.current){
this._removeItemClass(this.current,"Over");
this.current=null;
}
this._changeState("Container","");
this.onOutEvent();
},onSelectStart:function(e){
if(!this.skipForm||!dojo.dnd.isFormElement(e)){
dojo.stopEvent(e);
}
},onOverEvent:function(){
},onOutEvent:function(){
},_changeState:function(type,_b4c){
var _b4d="dojoDnd"+type;
var _b4e=type.toLowerCase()+"State";
dojo.replaceClass(this.node,_b4d+_b4c,_b4d+this[_b4e]);
this[_b4e]=_b4c;
},_addItemClass:function(node,type){
dojo.addClass(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
dojo.removeClass(node,"dojoDndItem"+type);
},_getChildByEvent:function(e){
var node=e.target;
if(node){
for(var _b4f=node.parentNode;_b4f;node=_b4f,_b4f=node.parentNode){
if(_b4f==this.parent&&dojo.hasClass(node,"dojoDndItem")){
return node;
}
}
}
return null;
},_normalizedCreator:function(item,hint){
var t=(this.creator||this.defaultCreator).call(this,item,hint);
if(!dojo.isArray(t.type)){
t.type=["text"];
}
if(!t.node.id){
t.node.id=dojo.dnd.getUniqueId();
}
dojo.addClass(t.node,"dojoDndItem");
return t;
}});
dojo.dnd._createNode=function(tag){
if(!tag){
return dojo.dnd._createSpan;
}
return function(text){
return dojo.create(tag,{innerHTML:text});
};
};
dojo.dnd._createTrTd=function(text){
var tr=dojo.create("tr");
dojo.create("td",{innerHTML:text},tr);
return tr;
};
dojo.dnd._createSpan=function(text){
return dojo.create("span",{innerHTML:text});
};
dojo.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dojo.dnd._defaultCreator=function(node){
var tag=node.tagName.toLowerCase();
var c=tag=="tbody"||tag=="thead"?dojo.dnd._createTrTd:dojo.dnd._createNode(dojo.dnd._defaultCreatorNodes[tag]);
return function(item,hint){
var _b50=item&&dojo.isObject(item),data,type,n;
if(_b50&&item.tagName&&item.nodeType&&item.getAttribute){
data=item.getAttribute("dndData")||item.innerHTML;
type=item.getAttribute("dndType");
type=type?type.split(/\s*,\s*/):["text"];
n=item;
}else{
data=(_b50&&item.data)?item.data:item;
type=(_b50&&item.type)?item.type:["text"];
n=(hint=="avatar"?dojo.dnd._createSpan:c)(String(data));
}
if(!n.id){
n.id=dojo.dnd.getUniqueId();
}
return {node:n,data:data,type:type};
};
};
dojo.provide("dojo.dnd.Selector");
dojo.declare("dojo.dnd.Selector",dojo.dnd.Container,{constructor:function(node,_b51){
if(!_b51){
_b51={};
}
this.singular=_b51.singular;
this.autoSync=_b51.autoSync;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(dojo.connect(this.node,"onmousedown",this,"onMouseDown"),dojo.connect(this.node,"onmouseup",this,"onMouseUp"));
},singular:false,getSelectedNodes:function(){
var t=new dojo.NodeList();
var e=dojo.dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
t.push(dojo.byId(i));
}
return t;
},selectNone:function(){
return this._removeSelection()._removeAnchor();
},selectAll:function(){
this.forInItems(function(data,id){
this._addItemClass(dojo.byId(id),"Selected");
this.selection[id]=1;
},this);
return this._removeAnchor();
},deleteSelectedNodes:function(){
var e=dojo.dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
var n=dojo.byId(i);
this.delItem(i);
dojo.destroy(n);
}
this.anchor=null;
this.selection={};
return this;
},forInSelectedItems:function(f,o){
o=o||dojo.global;
var s=this.selection,e=dojo.dnd._empty;
for(var i in s){
if(i in e){
continue;
}
f.call(o,this.getItem(i),i,this);
}
},sync:function(){
dojo.dnd.Selector.superclass.sync.call(this);
if(this.anchor){
if(!this.getItem(this.anchor.id)){
this.anchor=null;
}
}
var t=[],e=dojo.dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
if(!this.getItem(i)){
t.push(i);
}
}
dojo.forEach(t,function(i){
delete this.selection[i];
},this);
return this;
},insertNodes:function(_b52,data,_b53,_b54){
var _b55=this._normalizedCreator;
this._normalizedCreator=function(item,hint){
var t=_b55.call(this,item,hint);
if(_b52){
if(!this.anchor){
this.anchor=t.node;
this._removeItemClass(t.node,"Selected");
this._addItemClass(this.anchor,"Anchor");
}else{
if(this.anchor!=t.node){
this._removeItemClass(t.node,"Anchor");
this._addItemClass(t.node,"Selected");
}
}
this.selection[t.node.id]=1;
}else{
this._removeItemClass(t.node,"Selected");
this._removeItemClass(t.node,"Anchor");
}
return t;
};
dojo.dnd.Selector.superclass.insertNodes.call(this,data,_b53,_b54);
this._normalizedCreator=_b55;
return this;
},destroy:function(){
dojo.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null;
},markupFactory:function(_b56,node){
_b56._skipStartup=true;
return new dojo.dnd.Selector(node,_b56);
},onMouseDown:function(e){
if(this.autoSync){
this.sync();
}
if(!this.current){
return;
}
if(!this.singular&&!dojo.isCopyKey(e)&&!e.shiftKey&&(this.current.id in this.selection)){
this.simpleSelection=true;
if(e.button===dojo.mouseButtons.LEFT){
dojo.stopEvent(e);
}
return;
}
if(!this.singular&&e.shiftKey){
if(!dojo.isCopyKey(e)){
this._removeSelection();
}
var c=this.getAllNodes();
if(c.length){
if(!this.anchor){
this.anchor=c[0];
this._addItemClass(this.anchor,"Anchor");
}
this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){
var i=0;
for(;i<c.length;++i){
var node=c[i];
if(node==this.anchor||node==this.current){
break;
}
}
for(++i;i<c.length;++i){
var node=c[i];
if(node==this.anchor||node==this.current){
break;
}
this._addItemClass(node,"Selected");
this.selection[node.id]=1;
}
this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1;
}
}
}else{
if(this.singular){
if(this.anchor==this.current){
if(dojo.isCopyKey(e)){
this.selectNone();
}
}else{
this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1;
}
}else{
if(dojo.isCopyKey(e)){
if(this.anchor==this.current){
delete this.selection[this.anchor.id];
this._removeAnchor();
}else{
if(this.current.id in this.selection){
this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id];
}else{
if(this.anchor){
this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected");
}
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1;
}
}
}else{
if(!(this.current.id in this.selection)){
this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1;
}
}
}
}
dojo.stopEvent(e);
},onMouseUp:function(e){
if(!this.simpleSelection){
return;
}
this.simpleSelection=false;
this.selectNone();
if(this.current){
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1;
}
},onMouseMove:function(e){
this.simpleSelection=false;
},onOverEvent:function(){
this.onmousemoveEvent=dojo.connect(this.node,"onmousemove",this,"onMouseMove");
},onOutEvent:function(){
dojo.disconnect(this.onmousemoveEvent);
delete this.onmousemoveEvent;
},_removeSelection:function(){
var e=dojo.dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
var node=dojo.byId(i);
if(node){
this._removeItemClass(node,"Selected");
}
}
this.selection={};
return this;
},_removeAnchor:function(){
if(this.anchor){
this._removeItemClass(this.anchor,"Anchor");
this.anchor=null;
}
return this;
}});
dojo.provide("dojo.dnd.Avatar");
dojo.declare("dojo.dnd.Avatar",null,{constructor:function(_b57){
this.manager=_b57;
this.construct();
},construct:function(){
this.isA11y=dojo.hasClass(dojo.body(),"dijit_a11y");
var a=dojo.create("table",{"class":"dojoDndAvatar",style:{position:"absolute",zIndex:"1999",margin:"0px"}}),_b58=this.manager.source,node,b=dojo.create("tbody",null,a),tr=dojo.create("tr",null,b),td=dojo.create("td",null,tr),icon=this.isA11y?dojo.create("span",{id:"a11yIcon",innerHTML:this.manager.copy?"+":"<"},td):null,span=dojo.create("span",{innerHTML:_b58.generateText?this._generateText():""},td),k=Math.min(5,this.manager.nodes.length),i=0;
dojo.attr(tr,{"class":"dojoDndAvatarHeader",style:{opacity:0.9}});
for(;i<k;++i){
if(_b58.creator){
node=_b58._normalizedCreator(_b58.getItem(this.manager.nodes[i].id).data,"avatar").node;
}else{
node=this.manager.nodes[i].cloneNode(true);
if(node.tagName.toLowerCase()=="tr"){
var _b59=dojo.create("table"),_b5a=dojo.create("tbody",null,_b59);
_b5a.appendChild(node);
node=_b59;
}
}
node.id="";
tr=dojo.create("tr",null,b);
td=dojo.create("td",null,tr);
td.appendChild(node);
dojo.attr(tr,{"class":"dojoDndAvatarItem",style:{opacity:(9-i)/10}});
}
this.node=a;
},destroy:function(){
dojo.destroy(this.node);
this.node=false;
},update:function(){
dojo[(this.manager.canDropFlag?"add":"remove")+"Class"](this.node,"dojoDndAvatarCanDrop");
if(this.isA11y){
var icon=dojo.byId("a11yIcon");
var text="+";
if(this.manager.canDropFlag&&!this.manager.copy){
text="< ";
}else{
if(!this.manager.canDropFlag&&!this.manager.copy){
text="o";
}else{
if(!this.manager.canDropFlag){
text="x";
}
}
}
icon.innerHTML=text;
}
dojo.query(("tr.dojoDndAvatarHeader td span"+(this.isA11y?" span":"")),this.node).forEach(function(node){
node.innerHTML=this._generateText();
},this);
},_generateText:function(){
return this.manager.nodes.length.toString();
}});
dojo.provide("dojo.dnd.Manager");
dojo.declare("dojo.dnd.Manager",null,{constructor:function(){
this.avatar=null;
this.source=null;
this.nodes=[];
this.copy=true;
this.target=null;
this.canDropFlag=false;
this.events=[];
},OFFSET_X:16,OFFSET_Y:16,overSource:function(_b5b){
if(this.avatar){
this.target=(_b5b&&_b5b.targetState!="Disabled")?_b5b:null;
this.canDropFlag=Boolean(this.target);
this.avatar.update();
}
dojo.publish("/dnd/source/over",[_b5b]);
},outSource:function(_b5c){
if(this.avatar){
if(this.target==_b5c){
this.target=null;
this.canDropFlag=false;
this.avatar.update();
dojo.publish("/dnd/source/over",[null]);
}
}else{
dojo.publish("/dnd/source/over",[null]);
}
},startDrag:function(_b5d,_b5e,copy){
this.source=_b5d;
this.nodes=_b5e;
this.copy=Boolean(copy);
this.avatar=this.makeAvatar();
dojo.body().appendChild(this.avatar.node);
dojo.publish("/dnd/start",[_b5d,_b5e,this.copy]);
this.events=[dojo.connect(dojo.doc,"onmousemove",this,"onMouseMove"),dojo.connect(dojo.doc,"onmouseup",this,"onMouseUp"),dojo.connect(dojo.doc,"onkeydown",this,"onKeyDown"),dojo.connect(dojo.doc,"onkeyup",this,"onKeyUp"),dojo.connect(dojo.doc,"ondragstart",dojo.stopEvent),dojo.connect(dojo.body(),"onselectstart",dojo.stopEvent)];
var c="dojoDnd"+(copy?"Copy":"Move");
dojo.addClass(dojo.body(),c);
},canDrop:function(flag){
var _b5f=Boolean(this.target&&flag);
if(this.canDropFlag!=_b5f){
this.canDropFlag=_b5f;
this.avatar.update();
}
},stopDrag:function(){
dojo.removeClass(dojo.body(),["dojoDndCopy","dojoDndMove"]);
dojo.forEach(this.events,dojo.disconnect);
this.events=[];
this.avatar.destroy();
this.avatar=null;
this.source=this.target=null;
this.nodes=[];
},makeAvatar:function(){
return new dojo.dnd.Avatar(this);
},updateAvatar:function(){
this.avatar.update();
},onMouseMove:function(e){
var a=this.avatar;
if(a){
dojo.dnd.autoScrollNodes(e);
var s=a.node.style;
s.left=(e.pageX+this.OFFSET_X)+"px";
s.top=(e.pageY+this.OFFSET_Y)+"px";
var copy=Boolean(this.source.copyState(dojo.isCopyKey(e)));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
}
},onMouseUp:function(e){
if(this.avatar){
if(this.target&&this.canDropFlag){
var copy=Boolean(this.source.copyState(dojo.isCopyKey(e))),_b60=[this.source,this.nodes,copy,this.target,e];
dojo.publish("/dnd/drop/before",_b60);
dojo.publish("/dnd/drop",_b60);
}else{
dojo.publish("/dnd/cancel");
}
this.stopDrag();
}
},onKeyDown:function(e){
if(this.avatar){
switch(e.keyCode){
case dojo.keys.CTRL:
var copy=Boolean(this.source.copyState(true));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
break;
case dojo.keys.ESCAPE:
dojo.publish("/dnd/cancel");
this.stopDrag();
break;
}
}
},onKeyUp:function(e){
if(this.avatar&&e.keyCode==dojo.keys.CTRL){
var copy=Boolean(this.source.copyState(false));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
}
},_setCopyStatus:function(copy){
this.copy=copy;
this.source._markDndStatus(this.copy);
this.updateAvatar();
dojo.replaceClass(dojo.body(),"dojoDnd"+(this.copy?"Copy":"Move"),"dojoDnd"+(this.copy?"Move":"Copy"));
}});
dojo.dnd._manager=null;
dojo.dnd.manager=function(){
if(!dojo.dnd._manager){
dojo.dnd._manager=new dojo.dnd.Manager();
}
return dojo.dnd._manager;
};
dojo.provide("dojo.dnd.Source");
dojo.declare("dojo.dnd.Source",dojo.dnd.Selector,{isSource:true,horizontal:false,copyOnly:false,selfCopy:false,selfAccept:true,skipForm:false,withHandles:false,autoSync:false,delay:0,accept:["text"],generateText:true,constructor:function(node,_b61){
dojo.mixin(this,dojo.mixin({},_b61));
var type=this.accept;
if(type.length){
this.accept={};
for(var i=0;i<type.length;++i){
this.accept[type[i]]=1;
}
}
this.isDragging=false;
this.mouseDown=false;
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
this._lastX=0;
this._lastY=0;
this.sourceState="";
if(this.isSource){
dojo.addClass(this.node,"dojoDndSource");
}
this.targetState="";
if(this.accept){
dojo.addClass(this.node,"dojoDndTarget");
}
if(this.horizontal){
dojo.addClass(this.node,"dojoDndHorizontal");
}
this.topics=[dojo.subscribe("/dnd/source/over",this,"onDndSourceOver"),dojo.subscribe("/dnd/start",this,"onDndStart"),dojo.subscribe("/dnd/drop",this,"onDndDrop"),dojo.subscribe("/dnd/cancel",this,"onDndCancel")];
},checkAcceptance:function(_b62,_b63){
if(this==_b62){
return !this.copyOnly||this.selfAccept;
}
for(var i=0;i<_b63.length;++i){
var type=_b62.getItem(_b63[i].id).type;
var flag=false;
for(var j=0;j<type.length;++j){
if(type[j] in this.accept){
flag=true;
break;
}
}
if(!flag){
return false;
}
}
return true;
},copyState:function(_b64,self){
if(_b64){
return true;
}
if(arguments.length<2){
self=this==dojo.dnd.manager().target;
}
if(self){
if(this.copyOnly){
return this.selfCopy;
}
}else{
return this.copyOnly;
}
return false;
},destroy:function(){
dojo.dnd.Source.superclass.destroy.call(this);
dojo.forEach(this.topics,dojo.unsubscribe);
this.targetAnchor=null;
},markupFactory:function(_b65,node){
_b65._skipStartup=true;
return new dojo.dnd.Source(node,_b65);
},onMouseMove:function(e){
if(this.isDragging&&this.targetState=="Disabled"){
return;
}
dojo.dnd.Source.superclass.onMouseMove.call(this,e);
var m=dojo.dnd.manager();
if(!this.isDragging){
if(this.mouseDown&&this.isSource&&(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay)){
var _b66=this.getSelectedNodes();
if(_b66.length){
m.startDrag(this,_b66,this.copyState(dojo.isCopyKey(e),true));
}
}
}
if(this.isDragging){
var _b67=false;
if(this.current){
if(!this.targetBox||this.targetAnchor!=this.current){
this.targetBox=dojo.position(this.current,true);
}
if(this.horizontal){
_b67=(e.pageX-this.targetBox.x)<(this.targetBox.w/2);
}else{
_b67=(e.pageY-this.targetBox.y)<(this.targetBox.h/2);
}
}
if(this.current!=this.targetAnchor||_b67!=this.before){
this._markTargetAnchor(_b67);
m.canDrop(!this.current||m.source!=this||!(this.current.id in this.selection));
}
}
},onMouseDown:function(e){
if(!this.mouseDown&&this._legalMouseDown(e)&&(!this.skipForm||!dojo.dnd.isFormElement(e))){
this.mouseDown=true;
this._lastX=e.pageX;
this._lastY=e.pageY;
dojo.dnd.Source.superclass.onMouseDown.call(this,e);
}
},onMouseUp:function(e){
if(this.mouseDown){
this.mouseDown=false;
dojo.dnd.Source.superclass.onMouseUp.call(this,e);
}
},onDndSourceOver:function(_b68){
if(this!=_b68){
this.mouseDown=false;
if(this.targetAnchor){
this._unmarkTargetAnchor();
}
}else{
if(this.isDragging){
var m=dojo.dnd.manager();
m.canDrop(this.targetState!="Disabled"&&(!this.current||m.source!=this||!(this.current.id in this.selection)));
}
}
},onDndStart:function(_b69,_b6a,copy){
if(this.autoSync){
this.sync();
}
if(this.isSource){
this._changeState("Source",this==_b69?(copy?"Copied":"Moved"):"");
}
var _b6b=this.accept&&this.checkAcceptance(_b69,_b6a);
this._changeState("Target",_b6b?"":"Disabled");
if(this==_b69){
dojo.dnd.manager().overSource(this);
}
this.isDragging=true;
},onDndDrop:function(_b6c,_b6d,copy,_b6e){
if(this==_b6e){
this.onDrop(_b6c,_b6d,copy);
}
this.onDndCancel();
},onDndCancel:function(){
if(this.targetAnchor){
this._unmarkTargetAnchor();
this.targetAnchor=null;
}
this.before=true;
this.isDragging=false;
this.mouseDown=false;
this._changeState("Source","");
this._changeState("Target","");
},onDrop:function(_b6f,_b70,copy){
if(this!=_b6f){
this.onDropExternal(_b6f,_b70,copy);
}else{
this.onDropInternal(_b70,copy);
}
},onDropExternal:function(_b71,_b72,copy){
var _b73=this._normalizedCreator;
if(this.creator){
this._normalizedCreator=function(node,hint){
return _b73.call(this,_b71.getItem(node.id).data,hint);
};
}else{
if(copy){
this._normalizedCreator=function(node,hint){
var t=_b71.getItem(node.id);
var n=node.cloneNode(true);
n.id=dojo.dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}else{
this._normalizedCreator=function(node,hint){
var t=_b71.getItem(node.id);
_b71.delItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
}
this.selectNone();
if(!copy&&!this.creator){
_b71.selectNone();
}
this.insertNodes(true,_b72,this.before,this.current);
if(!copy&&this.creator){
_b71.deleteSelectedNodes();
}
this._normalizedCreator=_b73;
},onDropInternal:function(_b74,copy){
var _b75=this._normalizedCreator;
if(this.current&&this.current.id in this.selection){
return;
}
if(copy){
if(this.creator){
this._normalizedCreator=function(node,hint){
return _b75.call(this,this.getItem(node.id).data,hint);
};
}else{
this._normalizedCreator=function(node,hint){
var t=this.getItem(node.id);
var n=node.cloneNode(true);
n.id=dojo.dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}
}else{
if(!this.current){
return;
}
this._normalizedCreator=function(node,hint){
var t=this.getItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
this._removeSelection();
this.insertNodes(true,_b74,this.before,this.current);
this._normalizedCreator=_b75;
},onDraggingOver:function(){
},onDraggingOut:function(){
},onOverEvent:function(){
dojo.dnd.Source.superclass.onOverEvent.call(this);
dojo.dnd.manager().overSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOver();
}
},onOutEvent:function(){
dojo.dnd.Source.superclass.onOutEvent.call(this);
dojo.dnd.manager().outSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOut();
}
},_markTargetAnchor:function(_b76){
if(this.current==this.targetAnchor&&this.before==_b76){
return;
}
if(this.targetAnchor){
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
}
this.targetAnchor=this.current;
this.targetBox=null;
this.before=_b76;
if(this.targetAnchor){
this._addItemClass(this.targetAnchor,this.before?"Before":"After");
}
},_unmarkTargetAnchor:function(){
if(!this.targetAnchor){
return;
}
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
},_markDndStatus:function(copy){
this._changeState("Source",copy?"Copied":"Moved");
},_legalMouseDown:function(e){
if(!dojo.mouseButtons.isLeft(e)){
return false;
}
if(!this.withHandles){
return true;
}
for(var node=e.target;node&&node!==this.node;node=node.parentNode){
if(dojo.hasClass(node,"dojoDndHandle")){
return true;
}
if(dojo.hasClass(node,"dojoDndItem")||dojo.hasClass(node,"dojoDndIgnore")){
break;
}
}
return false;
}});
dojo.declare("dojo.dnd.Target",dojo.dnd.Source,{constructor:function(node,_b77){
this.isSource=false;
dojo.removeClass(this.node,"dojoDndSource");
},markupFactory:function(_b78,node){
_b78._skipStartup=true;
return new dojo.dnd.Target(node,_b78);
}});
dojo.declare("dojo.dnd.AutoSource",dojo.dnd.Source,{constructor:function(node,_b79){
this.autoSync=true;
},markupFactory:function(_b7a,node){
_b7a._skipStartup=true;
return new dojo.dnd.AutoSource(node,_b7a);
}});
dojo.provide("dojox.grid._View");
(function(){
var _b7b=function(_b7c,_b7d){
return _b7c.style.cssText==undefined?_b7c.getAttribute("style"):_b7c.style.cssText;
};
dojo.declare("dojox.grid._View",[dijit._Widget,dijit._Templated],{defaultWidth:"18em",viewWidth:"",templateString:"<div class=\"dojoxGridView\" role=\"presentation\">\n\t<div class=\"dojoxGridHeader\" dojoAttachPoint=\"headerNode\" role=\"presentation\">\n\t\t<div dojoAttachPoint=\"headerNodeContainer\" style=\"width:9000em\" role=\"presentation\">\n\t\t\t<div dojoAttachPoint=\"headerContentNode\" role=\"row\"></div>\n\t\t</div>\n\t</div>\n\t<input type=\"checkbox\" class=\"dojoxGridHiddenFocus\" dojoAttachPoint=\"hiddenFocusNode\" role=\"presentation\" />\n\t<input type=\"checkbox\" class=\"dojoxGridHiddenFocus\" role=\"presentation\" />\n\t<div class=\"dojoxGridScrollbox\" dojoAttachPoint=\"scrollboxNode\" role=\"presentation\">\n\t\t<div class=\"dojoxGridContent\" dojoAttachPoint=\"contentNode\" hidefocus=\"hidefocus\" role=\"presentation\"></div>\n\t</div>\n</div>\n",themeable:false,classTag:"dojoxGrid",marginBottom:0,rowPad:2,_togglingColumn:-1,_headerBuilderClass:dojox.grid._HeaderBuilder,_contentBuilderClass:dojox.grid._ContentBuilder,postMixInProperties:function(){
this.rowNodes={};
},postCreate:function(){
this.connect(this.scrollboxNode,"onscroll","doscroll");
dojox.grid.util.funnelEvents(this.contentNode,this,"doContentEvent",["mouseover","mouseout","click","dblclick","contextmenu","mousedown"]);
dojox.grid.util.funnelEvents(this.headerNode,this,"doHeaderEvent",["dblclick","mouseover","mouseout","mousemove","mousedown","click","contextmenu"]);
this.content=new this._contentBuilderClass(this);
this.header=new this._headerBuilderClass(this);
if(!dojo._isBodyLtr()){
this.headerNodeContainer.style.width="";
}
},destroy:function(){
dojo.destroy(this.headerNode);
delete this.headerNode;
for(var i in this.rowNodes){
dojo.destroy(this.rowNodes[i]);
}
this.rowNodes={};
if(this.source){
this.source.destroy();
}
this.inherited(arguments);
},focus:function(){
if(dojo.isIE||dojo.isWebKit||dojo.isOpera){
this.hiddenFocusNode.focus();
}else{
this.scrollboxNode.focus();
}
},setStructure:function(_b7e){
var vs=(this.structure=_b7e);
if(vs.width&&!isNaN(vs.width)){
this.viewWidth=vs.width+"em";
}else{
this.viewWidth=vs.width||(vs.noscroll?"auto":this.viewWidth);
}
this._onBeforeRow=vs.onBeforeRow||function(){
};
this._onAfterRow=vs.onAfterRow||function(){
};
this.noscroll=vs.noscroll;
if(this.noscroll){
this.scrollboxNode.style.overflow="hidden";
}
this.simpleStructure=Boolean(vs.cells.length==1);
this.testFlexCells();
this.updateStructure();
},_cleanupRowWidgets:function(_b7f){
if(_b7f){
dojo.forEach(dojo.query("[widgetId]",_b7f).map(dijit.byNode),function(w){
if(w._destroyOnRemove){
w.destroy();
delete w;
}else{
if(w.domNode&&w.domNode.parentNode){
w.domNode.parentNode.removeChild(w.domNode);
}
}
});
}
},onBeforeRow:function(_b80,_b81){
this._onBeforeRow(_b80,_b81);
if(_b80>=0){
this._cleanupRowWidgets(this.getRowNode(_b80));
}
},onAfterRow:function(_b82,_b83,_b84){
this._onAfterRow(_b82,_b83,_b84);
var g=this.grid;
dojo.forEach(dojo.query(".dojoxGridStubNode",_b84),function(n){
if(n&&n.parentNode){
var lw=n.getAttribute("linkWidget");
var _b85=window.parseInt(dojo.attr(n,"cellIdx"),10);
var _b86=g.getCell(_b85);
var w=dijit.byId(lw);
if(w){
n.parentNode.replaceChild(w.domNode,n);
if(!w._started){
w.startup();
}
}else{
n.innerHTML="";
}
}
},this);
},testFlexCells:function(){
this.flexCells=false;
for(var j=0,row;(row=this.structure.cells[j]);j++){
for(var i=0,cell;(cell=row[i]);i++){
cell.view=this;
this.flexCells=this.flexCells||cell.isFlex();
}
}
return this.flexCells;
},updateStructure:function(){
this.header.update();
this.content.update();
},getScrollbarWidth:function(){
var _b87=this.hasVScrollbar();
var _b88=dojo.style(this.scrollboxNode,"overflow");
if(this.noscroll||!_b88||_b88=="hidden"){
_b87=false;
}else{
if(_b88=="scroll"){
_b87=true;
}
}
return (_b87?dojox.html.metrics.getScrollbar().w:0);
},getColumnsWidth:function(){
var h=this.headerContentNode;
return h&&h.firstChild?h.firstChild.offsetWidth:0;
},setColumnsWidth:function(_b89){
this.headerContentNode.firstChild.style.width=_b89+"px";
if(this.viewWidth){
this.viewWidth=_b89+"px";
}
},getWidth:function(){
return this.viewWidth||(this.getColumnsWidth()+this.getScrollbarWidth())+"px";
},getContentWidth:function(){
return Math.max(0,dojo._getContentBox(this.domNode).w-this.getScrollbarWidth())+"px";
},render:function(){
this.scrollboxNode.style.height="";
this.renderHeader();
if(this._togglingColumn>=0){
this.setColumnsWidth(this.getColumnsWidth()-this._togglingColumn);
this._togglingColumn=-1;
}
var _b8a=this.grid.layout.cells;
var _b8b=dojo.hitch(this,function(node,_b8c){
!dojo._isBodyLtr()&&(_b8c=!_b8c);
var inc=_b8c?-1:1;
var idx=this.header.getCellNodeIndex(node)+inc;
var cell=_b8a[idx];
while(cell&&cell.getHeaderNode()&&cell.getHeaderNode().style.display=="none"){
idx+=inc;
cell=_b8a[idx];
}
if(cell){
return cell.getHeaderNode();
}
return null;
});
if(this.grid.columnReordering&&this.simpleStructure){
if(this.source){
this.source.destroy();
}
var _b8d="dojoxGrid_bottomMarker";
var _b8e="dojoxGrid_topMarker";
if(this.bottomMarker){
dojo.destroy(this.bottomMarker);
}
this.bottomMarker=dojo.byId(_b8d);
if(this.topMarker){
dojo.destroy(this.topMarker);
}
this.topMarker=dojo.byId(_b8e);
if(!this.bottomMarker){
this.bottomMarker=dojo.create("div",{"id":_b8d,"class":"dojoxGridColPlaceBottom"},dojo.body());
this._hide(this.bottomMarker);
this.topMarker=dojo.create("div",{"id":_b8e,"class":"dojoxGridColPlaceTop"},dojo.body());
this._hide(this.topMarker);
}
this.arrowDim=dojo.contentBox(this.bottomMarker);
var _b8f=dojo.contentBox(this.headerContentNode.firstChild.rows[0]).h;
this.source=new dojo.dnd.Source(this.headerContentNode.firstChild.rows[0],{horizontal:true,accept:["gridColumn_"+this.grid.id],viewIndex:this.index,generateText:false,onMouseDown:dojo.hitch(this,function(e){
this.header.decorateEvent(e);
if((this.header.overRightResizeArea(e)||this.header.overLeftResizeArea(e))&&this.header.canResize(e)&&!this.header.moveable){
this.header.beginColumnResize(e);
}else{
if(this.grid.headerMenu){
this.grid.headerMenu.onCancel(true);
}
if(e.button===(dojo.isIE?1:0)){
dojo.dnd.Source.prototype.onMouseDown.call(this.source,e);
}
}
}),onMouseOver:dojo.hitch(this,function(e){
var src=this.source;
if(src._getChildByEvent(e)){
dojo.dnd.Source.prototype.onMouseOver.apply(src,arguments);
}
}),_markTargetAnchor:dojo.hitch(this,function(_b90){
var src=this.source;
if(src.current==src.targetAnchor&&src.before==_b90){
return;
}
if(src.targetAnchor&&_b8b(src.targetAnchor,src.before)){
src._removeItemClass(_b8b(src.targetAnchor,src.before),src.before?"After":"Before");
}
dojo.dnd.Source.prototype._markTargetAnchor.call(src,_b90);
var _b91=_b90?src.targetAnchor:_b8b(src.targetAnchor,src.before);
var _b92=0;
if(!_b91){
_b91=src.targetAnchor;
_b92=dojo.contentBox(_b91).w+this.arrowDim.w/2+2;
}
var pos=(dojo.position||dojo._abs)(_b91,true);
var left=Math.floor(pos.x-this.arrowDim.w/2+_b92);
dojo.style(this.bottomMarker,"visibility","visible");
dojo.style(this.topMarker,"visibility","visible");
dojo.style(this.bottomMarker,{"left":left+"px","top":(_b8f+pos.y)+"px"});
dojo.style(this.topMarker,{"left":left+"px","top":(pos.y-this.arrowDim.h)+"px"});
if(src.targetAnchor&&_b8b(src.targetAnchor,src.before)){
src._addItemClass(_b8b(src.targetAnchor,src.before),src.before?"After":"Before");
}
}),_unmarkTargetAnchor:dojo.hitch(this,function(){
var src=this.source;
if(!src.targetAnchor){
return;
}
if(src.targetAnchor&&_b8b(src.targetAnchor,src.before)){
src._removeItemClass(_b8b(src.targetAnchor,src.before),src.before?"After":"Before");
}
this._hide(this.bottomMarker);
this._hide(this.topMarker);
dojo.dnd.Source.prototype._unmarkTargetAnchor.call(src);
}),destroy:dojo.hitch(this,function(){
dojo.disconnect(this._source_conn);
dojo.unsubscribe(this._source_sub);
dojo.dnd.Source.prototype.destroy.call(this.source);
if(this.bottomMarker){
dojo.destroy(this.bottomMarker);
delete this.bottomMarker;
}
if(this.topMarker){
dojo.destroy(this.topMarker);
delete this.topMarker;
}
}),onDndCancel:dojo.hitch(this,function(){
dojo.dnd.Source.prototype.onDndCancel.call(this.source);
this._hide(this.bottomMarker);
this._hide(this.topMarker);
})});
this._source_conn=dojo.connect(this.source,"onDndDrop",this,"_onDndDrop");
this._source_sub=dojo.subscribe("/dnd/drop/before",this,"_onDndDropBefore");
this.source.startup();
}
},_hide:function(node){
dojo.style(node,{left:"-10000px",top:"-10000px","visibility":"hidden"});
},_onDndDropBefore:function(_b93,_b94,copy){
if(dojo.dnd.manager().target!==this.source){
return;
}
this.source._targetNode=this.source.targetAnchor;
this.source._beforeTarget=this.source.before;
var _b95=this.grid.views.views;
var _b96=_b95[_b93.viewIndex];
var _b97=_b95[this.index];
if(_b97!=_b96){
_b96.convertColPctToFixed();
_b97.convertColPctToFixed();
}
},_onDndDrop:function(_b98,_b99,copy){
if(dojo.dnd.manager().target!==this.source){
if(dojo.dnd.manager().source===this.source){
this._removingColumn=true;
}
return;
}
this._hide(this.bottomMarker);
this._hide(this.topMarker);
var _b9a=function(n){
return n?dojo.attr(n,"idx"):null;
};
var w=dojo.marginBox(_b99[0]).w;
if(_b98.viewIndex!==this.index){
var _b9b=this.grid.views.views;
var _b9c=_b9b[_b98.viewIndex];
var _b9d=_b9b[this.index];
if(_b9c.viewWidth&&_b9c.viewWidth!="auto"){
_b9c.setColumnsWidth(_b9c.getColumnsWidth()-w);
}
if(_b9d.viewWidth&&_b9d.viewWidth!="auto"){
_b9d.setColumnsWidth(_b9d.getColumnsWidth());
}
}
var stn=this.source._targetNode;
var stb=this.source._beforeTarget;
!dojo._isBodyLtr()&&(stb=!stb);
var _b9e=this.grid.layout;
var idx=this.index;
delete this.source._targetNode;
delete this.source._beforeTarget;
_b9e.moveColumn(_b98.viewIndex,idx,_b9a(_b99[0]),_b9a(stn),stb);
},renderHeader:function(){
this.headerContentNode.innerHTML=this.header.generateHtml(this._getHeaderContent);
if(this.flexCells){
this.contentWidth=this.getContentWidth();
this.headerContentNode.firstChild.style.width=this.contentWidth;
}
dojox.grid.util.fire(this,"onAfterRow",[-1,this.structure.cells,this.headerContentNode]);
},_getHeaderContent:function(_b9f){
var n=_b9f.name||_b9f.grid.getCellName(_b9f);
var ret=["<div class=\"dojoxGridSortNode"];
if(_b9f.index!=_b9f.grid.getSortIndex()){
ret.push("\">");
}else{
ret=ret.concat([" ",_b9f.grid.sortInfo>0?"dojoxGridSortUp":"dojoxGridSortDown","\"><div class=\"dojoxGridArrowButtonChar\">",_b9f.grid.sortInfo>0?"&#9650;":"&#9660;","</div><div class=\"dojoxGridArrowButtonNode\" role=\"presentation\"></div>","<div class=\"dojoxGridColCaption\">"]);
}
ret=ret.concat([n,"</div></div>"]);
return ret.join("");
},resize:function(){
this.adaptHeight();
this.adaptWidth();
},hasHScrollbar:function(_ba0){
var _ba1=this._hasHScroll||false;
if(this._hasHScroll==undefined||_ba0){
if(this.noscroll){
this._hasHScroll=false;
}else{
var _ba2=dojo.style(this.scrollboxNode,"overflow");
if(_ba2=="hidden"){
this._hasHScroll=false;
}else{
if(_ba2=="scroll"){
this._hasHScroll=true;
}else{
this._hasHScroll=(this.scrollboxNode.offsetWidth-this.getScrollbarWidth()<this.contentNode.offsetWidth);
}
}
}
}
if(_ba1!==this._hasHScroll){
this.grid.update();
}
return this._hasHScroll;
},hasVScrollbar:function(_ba3){
var _ba4=this._hasVScroll||false;
if(this._hasVScroll==undefined||_ba3){
if(this.noscroll){
this._hasVScroll=false;
}else{
var _ba5=dojo.style(this.scrollboxNode,"overflow");
if(_ba5=="hidden"){
this._hasVScroll=false;
}else{
if(_ba5=="scroll"){
this._hasVScroll=true;
}else{
this._hasVScroll=(this.scrollboxNode.scrollHeight>this.scrollboxNode.clientHeight);
}
}
}
}
if(_ba4!==this._hasVScroll){
this.grid.update();
}
return this._hasVScroll;
},convertColPctToFixed:function(){
var _ba6=false;
this.grid.initialWidth="";
var _ba7=dojo.query("th",this.headerContentNode);
var _ba8=dojo.map(_ba7,function(c,vIdx){
var w=c.style.width;
dojo.attr(c,"vIdx",vIdx);
if(w&&w.slice(-1)=="%"){
_ba6=true;
}else{
if(w&&w.slice(-2)=="px"){
return window.parseInt(w,10);
}
}
return dojo.contentBox(c).w;
});
if(_ba6){
dojo.forEach(this.grid.layout.cells,function(cell,idx){
if(cell.view==this){
var _ba9=cell.view.getHeaderCellNode(cell.index);
if(_ba9&&dojo.hasAttr(_ba9,"vIdx")){
var vIdx=window.parseInt(dojo.attr(_ba9,"vIdx"));
this.setColWidth(idx,_ba8[vIdx]);
dojo.removeAttr(_ba9,"vIdx");
}
}
},this);
return true;
}
return false;
},adaptHeight:function(_baa){
if(!this.grid._autoHeight){
var h=(this.domNode.style.height&&parseInt(this.domNode.style.height.replace(/px/,""),10))||this.domNode.clientHeight;
var self=this;
var _bab=function(){
var v;
for(var i in self.grid.views.views){
v=self.grid.views.views[i];
if(v!==self&&v.hasHScrollbar()){
return true;
}
}
return false;
};
if(_baa||(this.noscroll&&_bab())){
h-=dojox.html.metrics.getScrollbar().h;
}
dojox.grid.util.setStyleHeightPx(this.scrollboxNode,h);
}
this.hasVScrollbar(true);
},adaptWidth:function(){
if(this.flexCells){
this.contentWidth=this.getContentWidth();
this.headerContentNode.firstChild.style.width=this.contentWidth;
}
var w=this.scrollboxNode.offsetWidth-this.getScrollbarWidth();
if(!this._removingColumn){
w=Math.max(w,this.getColumnsWidth())+"px";
}else{
w=Math.min(w,this.getColumnsWidth())+"px";
this._removingColumn=false;
}
var cn=this.contentNode;
cn.style.width=w;
this.hasHScrollbar(true);
},setSize:function(w,h){
var ds=this.domNode.style;
var hs=this.headerNode.style;
if(w){
ds.width=w;
hs.width=w;
}
ds.height=(h>=0?h+"px":"");
},renderRow:function(_bac){
var _bad=this.createRowNode(_bac);
this.buildRow(_bac,_bad);
this.grid.edit.restore(this,_bac);
return _bad;
},createRowNode:function(_bae){
var node=document.createElement("div");
node.className=this.classTag+"Row";
if(this instanceof dojox.grid._RowSelector){
dojo.attr(node,"role","presentation");
}else{
dojo.attr(node,"role","row");
if(this.grid.selectionMode!="none"){
dojo.attr(node,"aria-selected","false");
}
}
node[dojox.grid.util.gridViewTag]=this.id;
node[dojox.grid.util.rowIndexTag]=_bae;
this.rowNodes[_bae]=node;
return node;
},buildRow:function(_baf,_bb0){
this.buildRowContent(_baf,_bb0);
this.styleRow(_baf,_bb0);
},buildRowContent:function(_bb1,_bb2){
_bb2.innerHTML=this.content.generateHtml(_bb1,_bb1);
if(this.flexCells&&this.contentWidth){
_bb2.firstChild.style.width=this.contentWidth;
}
dojox.grid.util.fire(this,"onAfterRow",[_bb1,this.structure.cells,_bb2]);
},rowRemoved:function(_bb3){
if(_bb3>=0){
this._cleanupRowWidgets(this.getRowNode(_bb3));
}
this.grid.edit.save(this,_bb3);
delete this.rowNodes[_bb3];
},getRowNode:function(_bb4){
return this.rowNodes[_bb4];
},getCellNode:function(_bb5,_bb6){
var row=this.getRowNode(_bb5);
if(row){
return this.content.getCellNode(row,_bb6);
}
},getHeaderCellNode:function(_bb7){
if(this.headerContentNode){
return this.header.getCellNode(this.headerContentNode,_bb7);
}
},styleRow:function(_bb8,_bb9){
_bb9._style=_b7b(_bb9);
this.styleRowNode(_bb8,_bb9);
},styleRowNode:function(_bba,_bbb){
if(_bbb){
this.doStyleRowNode(_bba,_bbb);
}
},doStyleRowNode:function(_bbc,_bbd){
this.grid.styleRowNode(_bbc,_bbd);
},updateRow:function(_bbe){
var _bbf=this.getRowNode(_bbe);
if(_bbf){
_bbf.style.height="";
this.buildRow(_bbe,_bbf);
}
return _bbf;
},updateRowStyles:function(_bc0){
this.styleRowNode(_bc0,this.getRowNode(_bc0));
},lastTop:0,firstScroll:0,doscroll:function(_bc1){
var _bc2=dojo._isBodyLtr();
if(this.firstScroll<2){
if((!_bc2&&this.firstScroll==1)||(_bc2&&this.firstScroll===0)){
var s=dojo.marginBox(this.headerNodeContainer);
if(dojo.isIE){
this.headerNodeContainer.style.width=s.w+this.getScrollbarWidth()+"px";
}else{
if(dojo.isMoz){
this.headerNodeContainer.style.width=s.w-this.getScrollbarWidth()+"px";
this.scrollboxNode.scrollLeft=_bc2?this.scrollboxNode.clientWidth-this.scrollboxNode.scrollWidth:this.scrollboxNode.scrollWidth-this.scrollboxNode.clientWidth;
}
}
}
this.firstScroll++;
}
this.headerNode.scrollLeft=this.scrollboxNode.scrollLeft;
var top=this.scrollboxNode.scrollTop;
if(top!==this.lastTop){
this.grid.scrollTo(top);
}
},setScrollTop:function(_bc3){
this.lastTop=_bc3;
this.scrollboxNode.scrollTop=_bc3;
return this.scrollboxNode.scrollTop;
},doContentEvent:function(e){
if(this.content.decorateEvent(e)){
this.grid.onContentEvent(e);
}
},doHeaderEvent:function(e){
if(this.header.decorateEvent(e)){
this.grid.onHeaderEvent(e);
}
},dispatchContentEvent:function(e){
return this.content.dispatchEvent(e);
},dispatchHeaderEvent:function(e){
return this.header.dispatchEvent(e);
},setColWidth:function(_bc4,_bc5){
this.grid.setCellWidth(_bc4,_bc5+"px");
},update:function(){
if(!this.domNode){
return;
}
this.content.update();
this.grid.update();
var left=this.scrollboxNode.scrollLeft;
this.scrollboxNode.scrollLeft=left;
this.headerNode.scrollLeft=left;
}});
dojo.declare("dojox.grid._GridAvatar",dojo.dnd.Avatar,{construct:function(){
var dd=dojo.doc;
var a=dd.createElement("table");
a.cellPadding=a.cellSpacing="0";
a.className="dojoxGridDndAvatar";
a.style.position="absolute";
a.style.zIndex=1999;
a.style.margin="0px";
var b=dd.createElement("tbody");
var tr=dd.createElement("tr");
var td=dd.createElement("td");
var img=dd.createElement("td");
tr.className="dojoxGridDndAvatarItem";
img.className="dojoxGridDndAvatarItemImage";
img.style.width="16px";
var _bc6=this.manager.source,node;
if(_bc6.creator){
node=_bc6._normalizedCreator(_bc6.getItem(this.manager.nodes[0].id).data,"avatar").node;
}else{
node=this.manager.nodes[0].cloneNode(true);
var _bc7,_bc8;
if(node.tagName.toLowerCase()=="tr"){
_bc7=dd.createElement("table");
_bc8=dd.createElement("tbody");
_bc8.appendChild(node);
_bc7.appendChild(_bc8);
node=_bc7;
}else{
if(node.tagName.toLowerCase()=="th"){
_bc7=dd.createElement("table");
_bc8=dd.createElement("tbody");
var r=dd.createElement("tr");
_bc7.cellPadding=_bc7.cellSpacing="0";
r.appendChild(node);
_bc8.appendChild(r);
_bc7.appendChild(_bc8);
node=_bc7;
}
}
}
node.id="";
td.appendChild(node);
tr.appendChild(img);
tr.appendChild(td);
dojo.style(tr,"opacity",0.9);
b.appendChild(tr);
a.appendChild(b);
this.node=a;
var m=dojo.dnd.manager();
this.oldOffsetY=m.OFFSET_Y;
m.OFFSET_Y=1;
},destroy:function(){
dojo.dnd.manager().OFFSET_Y=this.oldOffsetY;
this.inherited(arguments);
}});
var _bc9=dojo.dnd.manager().makeAvatar;
dojo.dnd.manager().makeAvatar=function(){
var src=this.source;
if(src.viewIndex!==undefined&&!dojo.hasClass(dojo.body(),"dijit_a11y")){
return new dojox.grid._GridAvatar(this);
}
return _bc9.call(dojo.dnd.manager());
};
})();
dojo.provide("dojox.grid._RowSelector");
dojo.declare("dojox.grid._RowSelector",dojox.grid._View,{defaultWidth:"2em",noscroll:true,padBorderWidth:2,buildRendering:function(){
this.inherited("buildRendering",arguments);
this.scrollboxNode.style.overflow="hidden";
this.headerNode.style.visibility="hidden";
},getWidth:function(){
return this.viewWidth||this.defaultWidth;
},buildRowContent:function(_bca,_bcb){
var w=this.contentWidth||0;
_bcb.innerHTML="<table class=\"dojoxGridRowbarTable\" style=\"width:"+w+"px;height:1px;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\"><tr><td class=\"dojoxGridRowbarInner\">&nbsp;</td></tr></table>";
},renderHeader:function(){
},updateRow:function(){
},resize:function(){
this.adaptHeight();
},adaptWidth:function(){
if(!("contentWidth" in this)&&this.contentNode){
this.contentWidth=this.contentNode.offsetWidth-this.padBorderWidth;
}
},doStyleRowNode:function(_bcc,_bcd){
var n=["dojoxGridRowbar dojoxGridNonNormalizedCell"];
if(this.grid.rows.isOver(_bcc)){
n.push("dojoxGridRowbarOver");
}
if(this.grid.selection.isSelected(_bcc)){
n.push("dojoxGridRowbarSelected");
}
_bcd.className=n.join(" ");
},domouseover:function(e){
this.grid.onMouseOverRow(e);
},domouseout:function(e){
if(!this.isIntraRowEvent(e)){
this.grid.onMouseOutRow(e);
}
}});
dojo.provide("dojox.grid._Layout");
dojo.declare("dojox.grid._Layout",null,{constructor:function(_bce){
this.grid=_bce;
},cells:[],structure:null,defaultWidth:"6em",moveColumn:function(_bcf,_bd0,_bd1,_bd2,_bd3){
var _bd4=this.structure[_bcf].cells[0];
var _bd5=this.structure[_bd0].cells[0];
var cell=null;
var _bd6=0;
var _bd7=0;
for(var i=0,c;c=_bd4[i];i++){
if(c.index==_bd1){
_bd6=i;
break;
}
}
cell=_bd4.splice(_bd6,1)[0];
cell.view=this.grid.views.views[_bd0];
for(i=0,c=null;c=_bd5[i];i++){
if(c.index==_bd2){
_bd7=i;
break;
}
}
if(!_bd3){
_bd7+=1;
}
_bd5.splice(_bd7,0,cell);
var _bd8=this.grid.getCell(this.grid.getSortIndex());
if(_bd8){
_bd8._currentlySorted=this.grid.getSortAsc();
}
this.cells=[];
_bd1=0;
var v;
for(i=0;v=this.structure[i];i++){
for(var j=0,cs;cs=v.cells[j];j++){
for(var k=0;c=cs[k];k++){
c.index=_bd1;
this.cells.push(c);
if("_currentlySorted" in c){
var si=_bd1+1;
si*=c._currentlySorted?1:-1;
this.grid.sortInfo=si;
delete c._currentlySorted;
}
_bd1++;
}
}
}
dojo.forEach(this.cells,function(c){
var _bd9=c.markup[2].split(" ");
var _bda=parseInt(_bd9[1].substring(5));
if(_bda!=c.index){
_bd9[1]="idx=\""+c.index+"\"";
c.markup[2]=_bd9.join(" ");
}
});
this.grid.setupHeaderMenu();
},setColumnVisibility:function(_bdb,_bdc){
var cell=this.cells[_bdb];
if(cell.hidden==_bdc){
cell.hidden=!_bdc;
var v=cell.view,w=v.viewWidth;
if(w&&w!="auto"){
v._togglingColumn=dojo.marginBox(cell.getHeaderNode()).w||0;
}
v.update();
return true;
}else{
return false;
}
},addCellDef:function(_bdd,_bde,_bdf){
var self=this;
var _be0=function(_be1){
var w=0;
if(_be1.colSpan>1){
w=0;
}else{
w=_be1.width||self._defaultCellProps.width||self.defaultWidth;
if(!isNaN(w)){
w=w+"em";
}
}
return w;
};
var _be2={grid:this.grid,subrow:_bdd,layoutIndex:_bde,index:this.cells.length};
if(_bdf&&_bdf instanceof dojox.grid.cells._Base){
var _be3=dojo.clone(_bdf);
_be2.unitWidth=_be0(_be3._props);
_be3=dojo.mixin(_be3,this._defaultCellProps,_bdf._props,_be2);
return _be3;
}
var _be4=_bdf.type||_bdf.cellType||this._defaultCellProps.type||this._defaultCellProps.cellType||dojox.grid.cells.Cell;
_be2.unitWidth=_be0(_bdf);
return new _be4(dojo.mixin({},this._defaultCellProps,_bdf,_be2));
},addRowDef:function(_be5,_be6){
var _be7=[];
var _be8=0,_be9=0,_bea=true;
for(var i=0,def,cell;(def=_be6[i]);i++){
cell=this.addCellDef(_be5,i,def);
_be7.push(cell);
this.cells.push(cell);
if(_bea&&cell.relWidth){
_be8+=cell.relWidth;
}else{
if(cell.width){
var w=cell.width;
if(typeof w=="string"&&w.slice(-1)=="%"){
_be9+=window.parseInt(w,10);
}else{
if(w=="auto"){
_bea=false;
}
}
}
}
}
if(_be8&&_bea){
dojo.forEach(_be7,function(cell){
if(cell.relWidth){
cell.width=cell.unitWidth=((cell.relWidth/_be8)*(100-_be9))+"%";
}
});
}
return _be7;
},addRowsDef:function(_beb){
var _bec=[];
if(dojo.isArray(_beb)){
if(dojo.isArray(_beb[0])){
for(var i=0,row;_beb&&(row=_beb[i]);i++){
_bec.push(this.addRowDef(i,row));
}
}else{
_bec.push(this.addRowDef(0,_beb));
}
}
return _bec;
},addViewDef:function(_bed){
this._defaultCellProps=_bed.defaultCell||{};
if(_bed.width&&_bed.width=="auto"){
delete _bed.width;
}
return dojo.mixin({},_bed,{cells:this.addRowsDef(_bed.rows||_bed.cells)});
},setStructure:function(_bee){
this.fieldIndex=0;
this.cells=[];
var s=this.structure=[];
if(this.grid.rowSelector){
var sel={type:dojox._scopeName+".grid._RowSelector"};
if(dojo.isString(this.grid.rowSelector)){
var _bef=this.grid.rowSelector;
if(_bef=="false"){
sel=null;
}else{
if(_bef!="true"){
sel["width"]=_bef;
}
}
}else{
if(!this.grid.rowSelector){
sel=null;
}
}
if(sel){
s.push(this.addViewDef(sel));
}
}
var _bf0=function(def){
return ("name" in def||"field" in def||"get" in def);
};
var _bf1=function(def){
if(dojo.isArray(def)){
if(dojo.isArray(def[0])||_bf0(def[0])){
return true;
}
}
return false;
};
var _bf2=function(def){
return (def!==null&&dojo.isObject(def)&&("cells" in def||"rows" in def||("type" in def&&!_bf0(def))));
};
if(dojo.isArray(_bee)){
var _bf3=false;
for(var i=0,st;(st=_bee[i]);i++){
if(_bf2(st)){
_bf3=true;
break;
}
}
if(!_bf3){
s.push(this.addViewDef({cells:_bee}));
}else{
for(i=0;(st=_bee[i]);i++){
if(_bf1(st)){
s.push(this.addViewDef({cells:st}));
}else{
if(_bf2(st)){
s.push(this.addViewDef(st));
}
}
}
}
}else{
if(_bf2(_bee)){
s.push(this.addViewDef(_bee));
}
}
this.cellCount=this.cells.length;
this.grid.setupHeaderMenu();
}});
dojo.provide("dojox.grid._ViewManager");
dojo.declare("dojox.grid._ViewManager",null,{constructor:function(_bf4){
this.grid=_bf4;
},defaultWidth:200,views:[],resize:function(){
this.onEach("resize");
},render:function(){
this.onEach("render");
},addView:function(_bf5){
_bf5.idx=this.views.length;
this.views.push(_bf5);
},destroyViews:function(){
for(var i=0,v;v=this.views[i];i++){
v.destroy();
}
this.views=[];
},getContentNodes:function(){
var _bf6=[];
for(var i=0,v;v=this.views[i];i++){
_bf6.push(v.contentNode);
}
return _bf6;
},forEach:function(_bf7){
for(var i=0,v;v=this.views[i];i++){
_bf7(v,i);
}
},onEach:function(_bf8,_bf9){
_bf9=_bf9||[];
for(var i=0,v;v=this.views[i];i++){
if(_bf8 in v){
v[_bf8].apply(v,_bf9);
}
}
},normalizeHeaderNodeHeight:function(){
var _bfa=[];
for(var i=0,v;(v=this.views[i]);i++){
if(v.headerContentNode.firstChild){
_bfa.push(v.headerContentNode);
}
}
this.normalizeRowNodeHeights(_bfa);
},normalizeRowNodeHeights:function(_bfb){
var h=0;
var _bfc=[];
if(this.grid.rowHeight){
h=this.grid.rowHeight;
}else{
if(_bfb.length<=1){
return;
}
for(var i=0,n;(n=_bfb[i]);i++){
if(!dojo.hasClass(n,"dojoxGridNonNormalizedCell")){
_bfc[i]=n.firstChild.offsetHeight;
h=Math.max(h,_bfc[i]);
}
}
h=(h>=0?h:0);
if(dojo.isMoz&&h){
h++;
}
}
for(i=0;(n=_bfb[i]);i++){
if(_bfc[i]!=h){
n.firstChild.style.height=h+"px";
}
}
},resetHeaderNodeHeight:function(){
for(var i=0,v,n;(v=this.views[i]);i++){
n=v.headerContentNode.firstChild;
if(n){
n.style.height="";
}
}
},renormalizeRow:function(_bfd){
var _bfe=[];
for(var i=0,v,n;(v=this.views[i])&&(n=v.getRowNode(_bfd));i++){
n.firstChild.style.height="";
_bfe.push(n);
}
this.normalizeRowNodeHeights(_bfe);
},getViewWidth:function(_bff){
return this.views[_bff].getWidth()||this.defaultWidth;
},measureHeader:function(){
this.resetHeaderNodeHeight();
this.forEach(function(_c00){
_c00.headerContentNode.style.height="";
});
var h=0;
this.forEach(function(_c01){
h=Math.max(_c01.headerNode.offsetHeight,h);
});
return h;
},measureContent:function(){
var h=0;
this.forEach(function(_c02){
h=Math.max(_c02.domNode.offsetHeight,h);
});
return h;
},findClient:function(_c03){
var c=this.grid.elasticView||-1;
if(c<0){
for(var i=1,v;(v=this.views[i]);i++){
if(v.viewWidth){
for(i=1;(v=this.views[i]);i++){
if(!v.viewWidth){
c=i;
break;
}
}
break;
}
}
}
if(c<0){
c=Math.floor(this.views.length/2);
}
return c;
},arrange:function(l,w){
var i,v,vw,len=this.views.length;
var c=(w<=0?len:this.findClient());
var _c04=function(v,l){
var ds=v.domNode.style;
var hs=v.headerNode.style;
if(!dojo._isBodyLtr()){
ds.right=l+"px";
if(dojo.isMoz){
hs.right=l+v.getScrollbarWidth()+"px";
hs.width=parseInt(hs.width,10)-v.getScrollbarWidth()+"px";
}else{
hs.right=l+"px";
}
}else{
ds.left=l+"px";
hs.left=l+"px";
}
ds.top=0+"px";
hs.top=0;
};
for(i=0;(v=this.views[i])&&(i<c);i++){
vw=this.getViewWidth(i);
v.setSize(vw,0);
_c04(v,l);
if(v.headerContentNode&&v.headerContentNode.firstChild){
vw=v.getColumnsWidth()+v.getScrollbarWidth();
}else{
vw=v.domNode.offsetWidth;
}
l+=vw;
}
i++;
var r=w;
for(var j=len-1;(v=this.views[j])&&(i<=j);j--){
vw=this.getViewWidth(j);
v.setSize(vw,0);
vw=v.domNode.offsetWidth;
r-=vw;
_c04(v,r);
}
if(c<len){
v=this.views[c];
vw=Math.max(1,r-l);
v.setSize(vw+"px",0);
_c04(v,l);
}
return l;
},renderRow:function(_c05,_c06,_c07){
var _c08=[];
for(var i=0,v,n,_c09;(v=this.views[i])&&(n=_c06[i]);i++){
_c09=v.renderRow(_c05);
n.appendChild(_c09);
_c08.push(_c09);
}
if(!_c07){
this.normalizeRowNodeHeights(_c08);
}
},rowRemoved:function(_c0a){
this.onEach("rowRemoved",[_c0a]);
},updateRow:function(_c0b,_c0c){
for(var i=0,v;v=this.views[i];i++){
v.updateRow(_c0b);
}
if(!_c0c){
this.renormalizeRow(_c0b);
}
},updateRowStyles:function(_c0d){
this.onEach("updateRowStyles",[_c0d]);
},setScrollTop:function(_c0e){
var top=_c0e;
for(var i=0,v;v=this.views[i];i++){
top=v.setScrollTop(_c0e);
if(dojo.isIE&&v.headerNode&&v.scrollboxNode){
v.headerNode.scrollLeft=v.scrollboxNode.scrollLeft;
}
}
return top;
},getFirstScrollingView:function(){
for(var i=0,v;(v=this.views[i]);i++){
if(v.hasHScrollbar()||v.hasVScrollbar()){
return v;
}
}
return null;
}});
dojo.provide("dojox.grid._RowManager");
(function(){
var _c0f=function(_c10,_c11){
if(_c10.style.cssText==undefined){
_c10.setAttribute("style",_c11);
}else{
_c10.style.cssText=_c11;
}
};
dojo.declare("dojox.grid._RowManager",null,{constructor:function(_c12){
this.grid=_c12;
},linesToEms:2,overRow:-2,prepareStylingRow:function(_c13,_c14){
return {index:_c13,node:_c14,odd:Boolean(_c13&1),selected:!!this.grid.selection.isSelected(_c13),over:this.isOver(_c13),customStyles:"",customClasses:"dojoxGridRow"};
},styleRowNode:function(_c15,_c16){
var row=this.prepareStylingRow(_c15,_c16);
this.grid.onStyleRow(row);
this.applyStyles(row);
},applyStyles:function(_c17){
var i=_c17;
i.node.className=i.customClasses;
var h=i.node.style.height;
_c0f(i.node,i.customStyles+";"+(i.node._style||""));
i.node.style.height=h;
},updateStyles:function(_c18){
this.grid.updateRowStyles(_c18);
},setOverRow:function(_c19){
var last=this.overRow;
this.overRow=_c19;
if((last!=this.overRow)&&(dojo.isString(last)||last>=0)){
this.updateStyles(last);
}
this.updateStyles(this.overRow);
},isOver:function(_c1a){
return (this.overRow==_c1a&&!dojo.hasClass(this.grid.domNode,"dojoxGridColumnResizing"));
}});
})();
dojo.provide("dojox.grid._FocusManager");
dojo.declare("dojox.grid._FocusManager",null,{constructor:function(_c1b){
this.grid=_c1b;
this.cell=null;
this.rowIndex=-1;
this._connects=[];
this._headerConnects=[];
this.headerMenu=this.grid.headerMenu;
this._connects.push(dojo.connect(this.grid.domNode,"onfocus",this,"doFocus"));
this._connects.push(dojo.connect(this.grid.domNode,"onblur",this,"doBlur"));
this._connects.push(dojo.connect(this.grid.domNode,"oncontextmenu",this,"doContextMenu"));
this._connects.push(dojo.connect(this.grid.lastFocusNode,"onfocus",this,"doLastNodeFocus"));
this._connects.push(dojo.connect(this.grid.lastFocusNode,"onblur",this,"doLastNodeBlur"));
this._connects.push(dojo.connect(this.grid,"_onFetchComplete",this,"_delayedCellFocus"));
this._connects.push(dojo.connect(this.grid,"postrender",this,"_delayedHeaderFocus"));
},destroy:function(){
dojo.forEach(this._connects,dojo.disconnect);
dojo.forEach(this._headerConnects,dojo.disconnect);
delete this.grid;
delete this.cell;
},_colHeadNode:null,_colHeadFocusIdx:null,_contextMenuBindNode:null,tabbingOut:false,focusClass:"dojoxGridCellFocus",focusView:null,initFocusView:function(){
this.focusView=this.grid.views.getFirstScrollingView()||this.focusView||this.grid.views.views[0];
this._initColumnHeaders();
},isFocusCell:function(_c1c,_c1d){
return (this.cell==_c1c)&&(this.rowIndex==_c1d);
},isLastFocusCell:function(){
if(this.cell){
return (this.rowIndex==this.grid.rowCount-1)&&(this.cell.index==this.grid.layout.cellCount-1);
}
return false;
},isFirstFocusCell:function(){
if(this.cell){
return (this.rowIndex===0)&&(this.cell.index===0);
}
return false;
},isNoFocusCell:function(){
return (this.rowIndex<0)||!this.cell;
},isNavHeader:function(){
return (!!this._colHeadNode);
},getHeaderIndex:function(){
if(this._colHeadNode){
return dojo.indexOf(this._findHeaderCells(),this._colHeadNode);
}else{
return -1;
}
},_focusifyCellNode:function(_c1e){
var n=this.cell&&this.cell.getNode(this.rowIndex);
if(n){
dojo.toggleClass(n,this.focusClass,_c1e);
if(_c1e){
var sl=this.scrollIntoView();
try{
if(!this.grid.edit.isEditing()){
dojox.grid.util.fire(n,"focus");
if(sl){
this.cell.view.scrollboxNode.scrollLeft=sl;
}
}
}
catch(e){
}
}
}
},_delayedCellFocus:function(){
if(this.isNavHeader()||!this.grid._focused){
return;
}
var n=this.cell&&this.cell.getNode(this.rowIndex);
if(n){
try{
if(!this.grid.edit.isEditing()){
dojo.toggleClass(n,this.focusClass,true);
this.blurHeader();
dojox.grid.util.fire(n,"focus");
}
}
catch(e){
}
}
},_delayedHeaderFocus:function(){
if(this.isNavHeader()){
this.focusHeader();
this.grid.domNode.focus();
}
},_initColumnHeaders:function(){
dojo.forEach(this._headerConnects,dojo.disconnect);
this._headerConnects=[];
var _c1f=this._findHeaderCells();
for(var i=0;i<_c1f.length;i++){
this._headerConnects.push(dojo.connect(_c1f[i],"onfocus",this,"doColHeaderFocus"));
this._headerConnects.push(dojo.connect(_c1f[i],"onblur",this,"doColHeaderBlur"));
}
},_findHeaderCells:function(){
var _c20=dojo.query("th",this.grid.viewsHeaderNode);
var _c21=[];
for(var i=0;i<_c20.length;i++){
var _c22=_c20[i];
var _c23=dojo.hasAttr(_c22,"tabIndex");
var _c24=dojo.attr(_c22,"tabIndex");
if(_c23&&_c24<0){
_c21.push(_c22);
}
}
return _c21;
},_setActiveColHeader:function(_c25,_c26,_c27){
dojo.attr(this.grid.domNode,"aria-activedescendant",_c25.id);
if(_c27!=null&&_c27>=0&&_c27!=_c26){
dojo.toggleClass(this._findHeaderCells()[_c27],this.focusClass,false);
}
dojo.toggleClass(_c25,this.focusClass,true);
this._colHeadNode=_c25;
this._colHeadFocusIdx=_c26;
this._scrollHeader(this._colHeadFocusIdx);
},scrollIntoView:function(){
var info=(this.cell?this._scrollInfo(this.cell):null);
if(!info||!info.s){
return null;
}
var rt=this.grid.scroller.findScrollTop(this.rowIndex);
if(info.n&&info.sr){
if(info.n.offsetLeft+info.n.offsetWidth>info.sr.l+info.sr.w){
info.s.scrollLeft=info.n.offsetLeft+info.n.offsetWidth-info.sr.w;
}else{
if(info.n.offsetLeft<info.sr.l){
info.s.scrollLeft=info.n.offsetLeft;
}
}
}
if(info.r&&info.sr){
if(rt+info.r.offsetHeight>info.sr.t+info.sr.h){
this.grid.setScrollTop(rt+info.r.offsetHeight-info.sr.h);
}else{
if(rt<info.sr.t){
this.grid.setScrollTop(rt);
}
}
}
return info.s.scrollLeft;
},_scrollInfo:function(cell,_c28){
if(cell){
var cl=cell,sbn=cl.view.scrollboxNode,sbnr={w:sbn.clientWidth,l:sbn.scrollLeft,t:sbn.scrollTop,h:sbn.clientHeight},rn=cl.view.getRowNode(this.rowIndex);
return {c:cl,s:sbn,sr:sbnr,n:(_c28?_c28:cell.getNode(this.rowIndex)),r:rn};
}
return null;
},_scrollHeader:function(_c29){
var info=null;
if(this._colHeadNode){
var cell=this.grid.getCell(_c29);
info=this._scrollInfo(cell,cell.getNode(0));
}
if(info&&info.s&&info.sr&&info.n){
var _c2a=info.sr.l+info.sr.w;
if(info.n.offsetLeft+info.n.offsetWidth>_c2a){
info.s.scrollLeft=info.n.offsetLeft+info.n.offsetWidth-info.sr.w;
}else{
if(info.n.offsetLeft<info.sr.l){
info.s.scrollLeft=info.n.offsetLeft;
}else{
if(dojo.isIE<=7&&cell&&cell.view.headerNode){
cell.view.headerNode.scrollLeft=info.s.scrollLeft;
}
}
}
}
},_isHeaderHidden:function(){
var _c2b=this.focusView;
if(!_c2b){
for(var i=0,_c2c;(_c2c=this.grid.views.views[i]);i++){
if(_c2c.headerNode){
_c2b=_c2c;
break;
}
}
}
return (_c2b&&dojo.getComputedStyle(_c2b.headerNode).display=="none");
},colSizeAdjust:function(e,_c2d,_c2e){
var _c2f=this._findHeaderCells();
var view=this.focusView;
if(!view){
for(var i=0,_c30;(_c30=this.grid.views.views[i]);i++){
if(_c30.header.tableMap.map){
view=_c30;
break;
}
}
}
var _c31=_c2f[_c2d];
if(!view||(_c2d==_c2f.length-1&&_c2d===0)){
return;
}
view.content.baseDecorateEvent(e);
e.cellNode=_c31;
e.cellIndex=view.content.getCellNodeIndex(e.cellNode);
e.cell=(e.cellIndex>=0?this.grid.getCell(e.cellIndex):null);
if(view.header.canResize(e)){
var _c32={l:_c2e};
var drag=view.header.colResizeSetup(e,false);
view.header.doResizeColumn(drag,null,_c32);
view.update();
}
},styleRow:function(_c33){
return;
},setFocusIndex:function(_c34,_c35){
this.setFocusCell(this.grid.getCell(_c35),_c34);
},setFocusCell:function(_c36,_c37){
if(_c36&&!this.isFocusCell(_c36,_c37)){
this.tabbingOut=false;
if(this._colHeadNode){
this.blurHeader();
}
this._colHeadNode=this._colHeadFocusIdx=null;
this.focusGridView();
this._focusifyCellNode(false);
this.cell=_c36;
this.rowIndex=_c37;
this._focusifyCellNode(true);
}
if(dojo.isOpera){
setTimeout(dojo.hitch(this.grid,"onCellFocus",this.cell,this.rowIndex),1);
}else{
this.grid.onCellFocus(this.cell,this.rowIndex);
}
},next:function(){
if(this.cell){
var row=this.rowIndex,col=this.cell.index+1,cc=this.grid.layout.cellCount-1,rc=this.grid.rowCount-1;
if(col>cc){
col=0;
row++;
}
if(row>rc){
col=cc;
row=rc;
}
if(this.grid.edit.isEditing()){
var _c38=this.grid.getCell(col);
if(!this.isLastFocusCell()&&(!_c38.editable||this.grid.canEdit&&!this.grid.canEdit(_c38,row))){
this.cell=_c38;
this.rowIndex=row;
this.next();
return;
}
}
this.setFocusIndex(row,col);
}
},previous:function(){
if(this.cell){
var row=(this.rowIndex||0),col=(this.cell.index||0)-1;
if(col<0){
col=this.grid.layout.cellCount-1;
row--;
}
if(row<0){
row=0;
col=0;
}
if(this.grid.edit.isEditing()){
var _c39=this.grid.getCell(col);
if(!this.isFirstFocusCell()&&!_c39.editable){
this.cell=_c39;
this.rowIndex=row;
this.previous();
return;
}
}
this.setFocusIndex(row,col);
}
},move:function(_c3a,_c3b){
var _c3c=_c3b<0?-1:1;
if(this.isNavHeader()){
var _c3d=this._findHeaderCells();
var _c3e=currentIdx=dojo.indexOf(_c3d,this._colHeadNode);
currentIdx+=_c3b;
while(currentIdx>=0&&currentIdx<_c3d.length&&_c3d[currentIdx].style.display=="none"){
currentIdx+=_c3c;
}
if((currentIdx>=0)&&(currentIdx<_c3d.length)){
this._setActiveColHeader(_c3d[currentIdx],currentIdx,_c3e);
}
}else{
if(this.cell){
var sc=this.grid.scroller,r=this.rowIndex,rc=this.grid.rowCount-1,row=Math.min(rc,Math.max(0,r+_c3a));
if(_c3a){
if(_c3a>0){
if(row>sc.getLastPageRow(sc.page)){
this.grid.setScrollTop(this.grid.scrollTop+sc.findScrollTop(row)-sc.findScrollTop(r));
}
}else{
if(_c3a<0){
if(row<=sc.getPageRow(sc.page)){
this.grid.setScrollTop(this.grid.scrollTop-sc.findScrollTop(r)-sc.findScrollTop(row));
}
}
}
}
var cc=this.grid.layout.cellCount-1,i=this.cell.index,col=Math.min(cc,Math.max(0,i+_c3b));
var cell=this.grid.getCell(col);
while(col>=0&&col<cc&&cell&&cell.hidden===true){
col+=_c3c;
cell=this.grid.getCell(col);
}
if(!cell||cell.hidden===true){
col=i;
}
this.setFocusIndex(row,col);
if(_c3a){
this.grid.updateRow(r);
}
}
}
},previousKey:function(e){
if(this.grid.edit.isEditing()){
dojo.stopEvent(e);
this.previous();
}else{
if(!this.isNavHeader()&&!this._isHeaderHidden()){
this.grid.domNode.focus();
dojo.stopEvent(e);
}else{
this.tabOut(this.grid.domNode);
if(this._colHeadFocusIdx!=null){
dojo.toggleClass(this._findHeaderCells()[this._colHeadFocusIdx],this.focusClass,false);
this._colHeadFocusIdx=null;
}
this._focusifyCellNode(false);
}
}
},nextKey:function(e){
var _c3f=(this.grid.rowCount===0);
if(e.target===this.grid.domNode&&this._colHeadFocusIdx==null){
this.focusHeader();
dojo.stopEvent(e);
}else{
if(this.isNavHeader()){
this.blurHeader();
if(!this.findAndFocusGridCell()){
this.tabOut(this.grid.lastFocusNode);
}
this._colHeadNode=this._colHeadFocusIdx=null;
}else{
if(this.grid.edit.isEditing()){
dojo.stopEvent(e);
this.next();
}else{
this.tabOut(this.grid.lastFocusNode);
}
}
}
},tabOut:function(_c40){
this.tabbingOut=true;
_c40.focus();
},focusGridView:function(){
dojox.grid.util.fire(this.focusView,"focus");
},focusGrid:function(_c41){
this.focusGridView();
this._focusifyCellNode(true);
},findAndFocusGridCell:function(){
var _c42=true;
var _c43=(this.grid.rowCount===0);
if(this.isNoFocusCell()&&!_c43){
var _c44=0;
var cell=this.grid.getCell(_c44);
if(cell.hidden){
_c44=this.isNavHeader()?this._colHeadFocusIdx:0;
}
this.setFocusIndex(0,_c44);
}else{
if(this.cell&&!_c43){
if(this.focusView&&!this.focusView.rowNodes[this.rowIndex]){
this.grid.scrollToRow(this.rowIndex);
}
this.focusGrid();
}else{
_c42=false;
}
}
this._colHeadNode=this._colHeadFocusIdx=null;
return _c42;
},focusHeader:function(){
var _c45=this._findHeaderCells();
var _c46=this._colHeadFocusIdx;
if(this._isHeaderHidden()){
this.findAndFocusGridCell();
}else{
if(!this._colHeadFocusIdx){
if(this.isNoFocusCell()){
this._colHeadFocusIdx=0;
}else{
this._colHeadFocusIdx=this.cell.index;
}
}
}
this._colHeadNode=_c45[this._colHeadFocusIdx];
while(this._colHeadNode&&this._colHeadFocusIdx>=0&&this._colHeadFocusIdx<_c45.length&&this._colHeadNode.style.display=="none"){
this._colHeadFocusIdx++;
this._colHeadNode=_c45[this._colHeadFocusIdx];
}
if(this._colHeadNode&&this._colHeadNode.style.display!="none"){
if(this.headerMenu&&this._contextMenuBindNode!=this.grid.domNode){
this.headerMenu.unBindDomNode(this.grid.viewsHeaderNode);
this.headerMenu.bindDomNode(this.grid.domNode);
this._contextMenuBindNode=this.grid.domNode;
}
this._setActiveColHeader(this._colHeadNode,this._colHeadFocusIdx,_c46);
this._scrollHeader(this._colHeadFocusIdx);
this._focusifyCellNode(false);
}else{
this.findAndFocusGridCell();
}
},blurHeader:function(){
dojo.removeClass(this._colHeadNode,this.focusClass);
dojo.removeAttr(this.grid.domNode,"aria-activedescendant");
if(this.headerMenu&&this._contextMenuBindNode==this.grid.domNode){
var _c47=this.grid.viewsHeaderNode;
this.headerMenu.unBindDomNode(this.grid.domNode);
this.headerMenu.bindDomNode(_c47);
this._contextMenuBindNode=_c47;
}
},doFocus:function(e){
if(e&&e.target!=e.currentTarget){
dojo.stopEvent(e);
return;
}
if(!this.tabbingOut){
this.focusHeader();
}
this.tabbingOut=false;
dojo.stopEvent(e);
},doBlur:function(e){
dojo.stopEvent(e);
},doContextMenu:function(e){
if(!this.headerMenu){
dojo.stopEvent(e);
}
},doLastNodeFocus:function(e){
if(this.tabbingOut){
this._focusifyCellNode(false);
}else{
if(this.grid.rowCount>0){
if(this.isNoFocusCell()){
this.setFocusIndex(0,0);
}
this._focusifyCellNode(true);
}else{
this.focusHeader();
}
}
this.tabbingOut=false;
dojo.stopEvent(e);
},doLastNodeBlur:function(e){
dojo.stopEvent(e);
},doColHeaderFocus:function(e){
this._setActiveColHeader(e.target,dojo.attr(e.target,"idx"),this._colHeadFocusIdx);
this._scrollHeader(this.getHeaderIndex());
dojo.stopEvent(e);
},doColHeaderBlur:function(e){
dojo.toggleClass(e.target,this.focusClass,false);
}});
dojo.provide("dojox.grid._EditManager");
dojo.declare("dojox.grid._EditManager",null,{constructor:function(_c48){
this.grid=_c48;
if(dojo.isIE){
this.connections=[dojo.connect(document.body,"onfocus",dojo.hitch(this,"_boomerangFocus"))];
}else{
this.connections=[dojo.connect(this.grid,"onBlur",this,"apply")];
}
},info:{},destroy:function(){
dojo.forEach(this.connections,dojo.disconnect);
},cellFocus:function(_c49,_c4a){
if(this.grid.singleClickEdit||this.isEditRow(_c4a)){
this.setEditCell(_c49,_c4a);
}else{
this.apply();
}
if(this.isEditing()||(_c49&&_c49.editable&&_c49.alwaysEditing)){
this._focusEditor(_c49,_c4a);
}
},rowClick:function(e){
if(this.isEditing()&&!this.isEditRow(e.rowIndex)){
this.apply();
}
},styleRow:function(_c4b){
if(_c4b.index==this.info.rowIndex){
_c4b.customClasses+=" dojoxGridRowEditing";
}
},dispatchEvent:function(e){
var c=e.cell,ed=(c&&c["editable"])?c:0;
return ed&&ed.dispatchEvent(e.dispatch,e);
},isEditing:function(){
return this.info.rowIndex!==undefined;
},isEditCell:function(_c4c,_c4d){
return (this.info.rowIndex===_c4c)&&(this.info.cell.index==_c4d);
},isEditRow:function(_c4e){
return this.info.rowIndex===_c4e;
},setEditCell:function(_c4f,_c50){
if(!this.isEditCell(_c50,_c4f.index)&&this.grid.canEdit&&this.grid.canEdit(_c4f,_c50)){
this.start(_c4f,_c50,this.isEditRow(_c50)||_c4f.editable);
}
},_focusEditor:function(_c51,_c52){
dojox.grid.util.fire(_c51,"focus",[_c52]);
},focusEditor:function(){
if(this.isEditing()){
this._focusEditor(this.info.cell,this.info.rowIndex);
}
},_boomerangWindow:500,_shouldCatchBoomerang:function(){
return this._catchBoomerang>new Date().getTime();
},_boomerangFocus:function(){
if(this._shouldCatchBoomerang()){
this.grid.focus.focusGrid();
this.focusEditor();
this._catchBoomerang=0;
}
},_doCatchBoomerang:function(){
if(dojo.isIE){
this._catchBoomerang=new Date().getTime()+this._boomerangWindow;
}
},start:function(_c53,_c54,_c55){
this.grid.beginUpdate();
this.editorApply();
if(this.isEditing()&&!this.isEditRow(_c54)){
this.applyRowEdit();
this.grid.updateRow(_c54);
}
if(_c55){
this.info={cell:_c53,rowIndex:_c54};
this.grid.doStartEdit(_c53,_c54);
this.grid.updateRow(_c54);
}else{
this.info={};
}
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._focusEditor(_c53,_c54);
this._doCatchBoomerang();
},_editorDo:function(_c56){
var c=this.info.cell;
if(c&&c.editable){
c[_c56](this.info.rowIndex);
}
},editorApply:function(){
this._editorDo("apply");
},editorCancel:function(){
this._editorDo("cancel");
},applyCellEdit:function(_c57,_c58,_c59){
if(this.grid.canEdit(_c58,_c59)){
this.grid.doApplyCellEdit(_c57,_c59,_c58.field);
}
},applyRowEdit:function(){
this.grid.doApplyEdit(this.info.rowIndex,this.info.cell.field);
},apply:function(){
if(this.isEditing()){
this.grid.beginUpdate();
this.editorApply();
this.applyRowEdit();
this.info={};
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._doCatchBoomerang();
}
},cancel:function(){
if(this.isEditing()){
this.grid.beginUpdate();
this.editorCancel();
this.info={};
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._doCatchBoomerang();
}
},save:function(_c5a,_c5b){
var c=this.info.cell;
if(this.isEditRow(_c5a)&&(!_c5b||c.view==_c5b)&&c.editable){
c.save(c,this.info.rowIndex);
}
},restore:function(_c5c,_c5d){
var c=this.info.cell;
if(this.isEditRow(_c5d)&&c.view==_c5c&&c.editable){
c.restore(c,this.info.rowIndex);
}
}});
dojo.provide("dojox.grid.Selection");
dojo.declare("dojox.grid.Selection",null,{constructor:function(_c5e){
this.grid=_c5e;
this.selected=[];
this.setMode(_c5e.selectionMode);
},mode:"extended",selected:null,updating:0,selectedIndex:-1,setMode:function(mode){
if(this.selected.length){
this.deselectAll();
}
if(mode!="extended"&&mode!="multiple"&&mode!="single"&&mode!="none"){
this.mode="extended";
}else{
this.mode=mode;
}
},onCanSelect:function(_c5f){
return this.grid.onCanSelect(_c5f);
},onCanDeselect:function(_c60){
return this.grid.onCanDeselect(_c60);
},onSelected:function(_c61){
},onDeselected:function(_c62){
},onChanging:function(){
},onChanged:function(){
},isSelected:function(_c63){
if(this.mode=="none"){
return false;
}
return this.selected[_c63];
},getFirstSelected:function(){
if(!this.selected.length||this.mode=="none"){
return -1;
}
for(var i=0,l=this.selected.length;i<l;i++){
if(this.selected[i]){
return i;
}
}
return -1;
},getNextSelected:function(_c64){
if(this.mode=="none"){
return -1;
}
for(var i=_c64+1,l=this.selected.length;i<l;i++){
if(this.selected[i]){
return i;
}
}
return -1;
},getSelected:function(){
var _c65=[];
for(var i=0,l=this.selected.length;i<l;i++){
if(this.selected[i]){
_c65.push(i);
}
}
return _c65;
},getSelectedCount:function(){
var c=0;
for(var i=0;i<this.selected.length;i++){
if(this.selected[i]){
c++;
}
}
return c;
},_beginUpdate:function(){
if(this.updating===0){
this.onChanging();
}
this.updating++;
},_endUpdate:function(){
this.updating--;
if(this.updating===0){
this.onChanged();
}
},select:function(_c66){
if(this.mode=="none"){
return;
}
if(this.mode!="multiple"){
this.deselectAll(_c66);
this.addToSelection(_c66);
}else{
this.toggleSelect(_c66);
}
},addToSelection:function(_c67){
if(this.mode=="none"){
return;
}
if(dojo.isArray(_c67)){
dojo.forEach(_c67,this.addToSelection,this);
return;
}
_c67=Number(_c67);
if(this.selected[_c67]){
this.selectedIndex=_c67;
}else{
if(this.onCanSelect(_c67)!==false){
this.selectedIndex=_c67;
var _c68=this.grid.getRowNode(_c67);
if(_c68){
dojo.attr(_c68,"aria-selected","true");
}
this._beginUpdate();
this.selected[_c67]=true;
this.onSelected(_c67);
this._endUpdate();
}
}
},deselect:function(_c69){
if(this.mode=="none"){
return;
}
if(dojo.isArray(_c69)){
dojo.forEach(_c69,this.deselect,this);
return;
}
_c69=Number(_c69);
if(this.selectedIndex==_c69){
this.selectedIndex=-1;
}
if(this.selected[_c69]){
if(this.onCanDeselect(_c69)===false){
return;
}
var _c6a=this.grid.getRowNode(_c69);
if(_c6a){
dojo.attr(_c6a,"aria-selected","false");
}
this._beginUpdate();
delete this.selected[_c69];
this.onDeselected(_c69);
this._endUpdate();
}
},setSelected:function(_c6b,_c6c){
this[(_c6c?"addToSelection":"deselect")](_c6b);
},toggleSelect:function(_c6d){
if(dojo.isArray(_c6d)){
dojo.forEach(_c6d,this.toggleSelect,this);
return;
}
this.setSelected(_c6d,!this.selected[_c6d]);
},_range:function(_c6e,inTo,func){
var s=(_c6e>=0?_c6e:inTo),e=inTo;
if(s>e){
e=s;
s=inTo;
}
for(var i=s;i<=e;i++){
func(i);
}
},selectRange:function(_c6f,inTo){
this._range(_c6f,inTo,dojo.hitch(this,"addToSelection"));
},deselectRange:function(_c70,inTo){
this._range(_c70,inTo,dojo.hitch(this,"deselect"));
},insert:function(_c71){
this.selected.splice(_c71,0,false);
if(this.selectedIndex>=_c71){
this.selectedIndex++;
}
},remove:function(_c72){
this.selected.splice(_c72,1);
if(this.selectedIndex>=_c72){
this.selectedIndex--;
}
},deselectAll:function(_c73){
for(var i in this.selected){
if((i!=_c73)&&(this.selected[i]===true)){
this.deselect(i);
}
}
},clickSelect:function(_c74,_c75,_c76){
if(this.mode=="none"){
return;
}
this._beginUpdate();
if(this.mode!="extended"){
this.select(_c74);
}else{
var _c77=this.selectedIndex;
if(!_c75){
this.deselectAll(_c74);
}
if(_c76){
this.selectRange(_c77,_c74);
}else{
if(_c75){
this.toggleSelect(_c74);
}else{
this.addToSelection(_c74);
}
}
}
this._endUpdate();
},clickSelectEvent:function(e){
this.clickSelect(e.rowIndex,dojo.isCopyKey(e),e.shiftKey);
},clear:function(){
this._beginUpdate();
this.deselectAll();
this._endUpdate();
}});
dojo.provide("dojox.grid._Events");
dojo.declare("dojox.grid._Events",null,{cellOverClass:"dojoxGridCellOver",onKeyEvent:function(e){
this.dispatchKeyEvent(e);
},onContentEvent:function(e){
this.dispatchContentEvent(e);
},onHeaderEvent:function(e){
this.dispatchHeaderEvent(e);
},onStyleRow:function(_c78){
var i=_c78;
i.customClasses+=(i.odd?" dojoxGridRowOdd":"")+(i.selected?" dojoxGridRowSelected":"")+(i.over?" dojoxGridRowOver":"");
this.focus.styleRow(_c78);
this.edit.styleRow(_c78);
},onKeyDown:function(e){
if(e.altKey||e.metaKey){
return;
}
var dk=dojo.keys;
var _c79;
switch(e.keyCode){
case dk.ESCAPE:
this.edit.cancel();
break;
case dk.ENTER:
if(!this.edit.isEditing()){
_c79=this.focus.getHeaderIndex();
if(_c79>=0){
this.setSortIndex(_c79);
break;
}else{
this.selection.clickSelect(this.focus.rowIndex,dojo.isCopyKey(e),e.shiftKey);
}
dojo.stopEvent(e);
}
if(!e.shiftKey){
var _c7a=this.edit.isEditing();
this.edit.apply();
if(!_c7a){
this.edit.setEditCell(this.focus.cell,this.focus.rowIndex);
}
}
if(!this.edit.isEditing()){
var _c7b=this.focus.focusView||this.views.views[0];
_c7b.content.decorateEvent(e);
this.onRowClick(e);
}
break;
case dk.SPACE:
if(!this.edit.isEditing()){
_c79=this.focus.getHeaderIndex();
if(_c79>=0){
this.setSortIndex(_c79);
break;
}else{
this.selection.clickSelect(this.focus.rowIndex,dojo.isCopyKey(e),e.shiftKey);
}
dojo.stopEvent(e);
}
break;
case dk.TAB:
this.focus[e.shiftKey?"previousKey":"nextKey"](e);
break;
case dk.LEFT_ARROW:
case dk.RIGHT_ARROW:
if(!this.edit.isEditing()){
var _c7c=e.keyCode;
dojo.stopEvent(e);
_c79=this.focus.getHeaderIndex();
if(_c79>=0&&(e.shiftKey&&e.ctrlKey)){
this.focus.colSizeAdjust(e,_c79,(_c7c==dk.LEFT_ARROW?-1:1)*5);
}else{
var _c7d=(_c7c==dk.LEFT_ARROW)?1:-1;
if(dojo._isBodyLtr()){
_c7d*=-1;
}
this.focus.move(0,_c7d);
}
}
break;
case dk.UP_ARROW:
if(!this.edit.isEditing()&&this.focus.rowIndex!==0){
dojo.stopEvent(e);
this.focus.move(-1,0);
}
break;
case dk.DOWN_ARROW:
if(!this.edit.isEditing()&&this.focus.rowIndex+1!=this.rowCount){
dojo.stopEvent(e);
this.focus.move(1,0);
}
break;
case dk.PAGE_UP:
if(!this.edit.isEditing()&&this.focus.rowIndex!==0){
dojo.stopEvent(e);
if(this.focus.rowIndex!=this.scroller.firstVisibleRow+1){
this.focus.move(this.scroller.firstVisibleRow-this.focus.rowIndex,0);
}else{
this.setScrollTop(this.scroller.findScrollTop(this.focus.rowIndex-1));
this.focus.move(this.scroller.firstVisibleRow-this.scroller.lastVisibleRow+1,0);
}
}
break;
case dk.PAGE_DOWN:
if(!this.edit.isEditing()&&this.focus.rowIndex+1!=this.rowCount){
dojo.stopEvent(e);
if(this.focus.rowIndex!=this.scroller.lastVisibleRow-1){
this.focus.move(this.scroller.lastVisibleRow-this.focus.rowIndex-1,0);
}else{
this.setScrollTop(this.scroller.findScrollTop(this.focus.rowIndex+1));
this.focus.move(this.scroller.lastVisibleRow-this.scroller.firstVisibleRow-1,0);
}
}
break;
default:
break;
}
},onMouseOver:function(e){
e.rowIndex==-1?this.onHeaderCellMouseOver(e):this.onCellMouseOver(e);
},onMouseOut:function(e){
e.rowIndex==-1?this.onHeaderCellMouseOut(e):this.onCellMouseOut(e);
},onMouseDown:function(e){
e.rowIndex==-1?this.onHeaderCellMouseDown(e):this.onCellMouseDown(e);
},onMouseOverRow:function(e){
if(!this.rows.isOver(e.rowIndex)){
this.rows.setOverRow(e.rowIndex);
e.rowIndex==-1?this.onHeaderMouseOver(e):this.onRowMouseOver(e);
}
},onMouseOutRow:function(e){
if(this.rows.isOver(-1)){
this.onHeaderMouseOut(e);
}else{
if(!this.rows.isOver(-2)){
this.rows.setOverRow(-2);
this.onRowMouseOut(e);
}
}
},onMouseDownRow:function(e){
if(e.rowIndex!=-1){
this.onRowMouseDown(e);
}
},onCellMouseOver:function(e){
if(e.cellNode){
dojo.addClass(e.cellNode,this.cellOverClass);
}
},onCellMouseOut:function(e){
if(e.cellNode){
dojo.removeClass(e.cellNode,this.cellOverClass);
}
},onCellMouseDown:function(e){
},onCellClick:function(e){
this._click[0]=this._click[1];
this._click[1]=e;
if(!this.edit.isEditCell(e.rowIndex,e.cellIndex)){
this.focus.setFocusCell(e.cell,e.rowIndex);
}
this.onRowClick(e);
},onCellDblClick:function(e){
if(this._click.length>1&&dojo.isIE){
this.edit.setEditCell(this._click[1].cell,this._click[1].rowIndex);
}else{
if(this._click.length>1&&this._click[0].rowIndex!=this._click[1].rowIndex){
this.edit.setEditCell(this._click[0].cell,this._click[0].rowIndex);
}else{
this.edit.setEditCell(e.cell,e.rowIndex);
}
}
this.onRowDblClick(e);
},onCellContextMenu:function(e){
this.onRowContextMenu(e);
},onCellFocus:function(_c7e,_c7f){
this.edit.cellFocus(_c7e,_c7f);
},onRowClick:function(e){
this.edit.rowClick(e);
this.selection.clickSelectEvent(e);
},onRowDblClick:function(e){
},onRowMouseOver:function(e){
},onRowMouseOut:function(e){
},onRowMouseDown:function(e){
},onRowContextMenu:function(e){
dojo.stopEvent(e);
},onHeaderMouseOver:function(e){
},onHeaderMouseOut:function(e){
},onHeaderCellMouseOver:function(e){
if(e.cellNode){
dojo.addClass(e.cellNode,this.cellOverClass);
}
},onHeaderCellMouseOut:function(e){
if(e.cellNode){
dojo.removeClass(e.cellNode,this.cellOverClass);
}
},onHeaderCellMouseDown:function(e){
},onHeaderClick:function(e){
},onHeaderCellClick:function(e){
this.setSortIndex(e.cell.index);
this.onHeaderClick(e);
},onHeaderDblClick:function(e){
},onHeaderCellDblClick:function(e){
this.onHeaderDblClick(e);
},onHeaderCellContextMenu:function(e){
this.onHeaderContextMenu(e);
},onHeaderContextMenu:function(e){
if(!this.headerMenu){
dojo.stopEvent(e);
}
},onStartEdit:function(_c80,_c81){
},onApplyCellEdit:function(_c82,_c83,_c84){
},onCancelEdit:function(_c85){
},onApplyEdit:function(_c86){
},onCanSelect:function(_c87){
return true;
},onCanDeselect:function(_c88){
return true;
},onSelected:function(_c89){
this.updateRowStyles(_c89);
},onDeselected:function(_c8a){
this.updateRowStyles(_c8a);
},onSelectionChanged:function(){
}});
dojo.provide("dojox.grid._Grid");
(function(){
if(!dojo.isCopyKey){
dojo.isCopyKey=dojo.dnd.getCopyKeyState;
}
dojo.declare("dojox.grid._Grid",[dijit._Widget,dijit._Templated,dojox.grid._Events],{templateString:"<div hidefocus=\"hidefocus\" role=\"grid\" dojoAttachEvent=\"onmouseout:_mouseOut\">\n\t<div class=\"dojoxGridMasterHeader\" dojoAttachPoint=\"viewsHeaderNode\" role=\"presentation\"></div>\n\t<div class=\"dojoxGridMasterView\" dojoAttachPoint=\"viewsNode\" role=\"presentation\"></div>\n\t<div class=\"dojoxGridMasterMessages\" style=\"display: none;\" dojoAttachPoint=\"messagesNode\"></div>\n\t<span dojoAttachPoint=\"lastFocusNode\" tabindex=\"0\"></span>\n</div>\n",classTag:"dojoxGrid",rowCount:5,keepRows:75,rowsPerPage:25,autoWidth:false,initialWidth:"",autoHeight:"",rowHeight:0,autoRender:true,defaultHeight:"15em",height:"",structure:null,elasticView:-1,singleClickEdit:false,selectionMode:"extended",rowSelector:"",columnReordering:false,headerMenu:null,placeholderLabel:"GridColumns",selectable:false,_click:null,loadingMessage:"<span class='dojoxGridLoading'>${loadingState}</span>",errorMessage:"<span class='dojoxGridError'>${errorState}</span>",noDataMessage:"",escapeHTMLInData:true,formatterScope:null,editable:false,sortInfo:0,themeable:true,_placeholders:null,_layoutClass:dojox.grid._Layout,buildRendering:function(){
this.inherited(arguments);
if(!this.domNode.getAttribute("tabIndex")){
this.domNode.tabIndex="0";
}
this.createScroller();
this.createLayout();
this.createViews();
this.createManagers();
this.createSelection();
this.connect(this.selection,"onSelected","onSelected");
this.connect(this.selection,"onDeselected","onDeselected");
this.connect(this.selection,"onChanged","onSelectionChanged");
dojox.html.metrics.initOnFontResize();
this.connect(dojox.html.metrics,"onFontResize","textSizeChanged");
dojox.grid.util.funnelEvents(this.domNode,this,"doKeyEvent",dojox.grid.util.keyEvents);
if(this.selectionMode!="none"){
dojo.attr(this.domNode,"aria-multiselectable",this.selectionMode=="single"?"false":"true");
}
dojo.addClass(this.domNode,this.classTag);
if(!this.isLeftToRight()){
dojo.addClass(this.domNode,this.classTag+"Rtl");
}
},postMixInProperties:function(){
this.inherited(arguments);
var _c8b=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,_c8b);
this.errorMessage=dojo.string.substitute(this.errorMessage,_c8b);
if(this.srcNodeRef&&this.srcNodeRef.style.height){
this.height=this.srcNodeRef.style.height;
}
this._setAutoHeightAttr(this.autoHeight,true);
this.lastScrollTop=this.scrollTop=0;
},postCreate:function(){
this._placeholders=[];
this._setHeaderMenuAttr(this.headerMenu);
this._setStructureAttr(this.structure);
this._click=[];
this.inherited(arguments);
if(this.domNode&&this.autoWidth&&this.initialWidth){
this.domNode.style.width=this.initialWidth;
}
if(this.domNode&&!this.editable){
dojo.attr(this.domNode,"aria-readonly","true");
}
},destroy:function(){
this.domNode.onReveal=null;
this.domNode.onSizeChange=null;
delete this._click;
this.edit.destroy();
delete this.edit;
this.views.destroyViews();
if(this.scroller){
this.scroller.destroy();
delete this.scroller;
}
if(this.focus){
this.focus.destroy();
delete this.focus;
}
if(this.headerMenu&&this._placeholders.length){
dojo.forEach(this._placeholders,function(p){
p.unReplace(true);
});
this.headerMenu.unBindDomNode(this.viewsHeaderNode);
}
this.inherited(arguments);
},_setAutoHeightAttr:function(ah,_c8c){
if(typeof ah=="string"){
if(!ah||ah=="false"){
ah=false;
}else{
if(ah=="true"){
ah=true;
}else{
ah=window.parseInt(ah,10);
}
}
}
if(typeof ah=="number"){
if(isNaN(ah)){
ah=false;
}
if(ah<0){
ah=true;
}else{
if(ah===0){
ah=false;
}
}
}
this.autoHeight=ah;
if(typeof ah=="boolean"){
this._autoHeight=ah;
}else{
if(typeof ah=="number"){
this._autoHeight=(ah>=this.get("rowCount"));
}else{
this._autoHeight=false;
}
}
if(this._started&&!_c8c){
this.render();
}
},_getRowCountAttr:function(){
return this.updating&&this.invalidated&&this.invalidated.rowCount!=undefined?this.invalidated.rowCount:this.rowCount;
},textSizeChanged:function(){
this.render();
},sizeChange:function(){
this.update();
},createManagers:function(){
this.rows=new dojox.grid._RowManager(this);
this.focus=new dojox.grid._FocusManager(this);
this.edit=new dojox.grid._EditManager(this);
},createSelection:function(){
this.selection=new dojox.grid.Selection(this);
},createScroller:function(){
this.scroller=new dojox.grid._Scroller();
this.scroller.grid=this;
this.scroller.renderRow=dojo.hitch(this,"renderRow");
this.scroller.removeRow=dojo.hitch(this,"rowRemoved");
},createLayout:function(){
this.layout=new this._layoutClass(this);
this.connect(this.layout,"moveColumn","onMoveColumn");
},onMoveColumn:function(){
this.render();
},onResizeColumn:function(_c8d){
},createViews:function(){
this.views=new dojox.grid._ViewManager(this);
this.views.createView=dojo.hitch(this,"createView");
},createView:function(_c8e,idx){
var c=dojo.getObject(_c8e);
var view=new c({grid:this,index:idx});
this.viewsNode.appendChild(view.domNode);
this.viewsHeaderNode.appendChild(view.headerNode);
this.views.addView(view);
dojo.attr(this.domNode,"align",dojo._isBodyLtr()?"left":"right");
return view;
},buildViews:function(){
for(var i=0,vs;(vs=this.layout.structure[i]);i++){
this.createView(vs.type||dojox._scopeName+".grid._View",i).setStructure(vs);
}
this.scroller.setContentNodes(this.views.getContentNodes());
},_setStructureAttr:function(_c8f){
var s=_c8f;
if(s&&dojo.isString(s)){
dojo.deprecated("dojox.grid._Grid.set('structure', 'objVar')","use dojox.grid._Grid.set('structure', objVar) instead","2.0");
s=dojo.getObject(s);
}
this.structure=s;
if(!s){
if(this.layout.structure){
s=this.layout.structure;
}else{
return;
}
}
this.views.destroyViews();
if(s!==this.layout.structure){
this.layout.setStructure(s);
}
this._structureChanged();
},setStructure:function(_c90){
dojo.deprecated("dojox.grid._Grid.setStructure(obj)","use dojox.grid._Grid.set('structure', obj) instead.","2.0");
this._setStructureAttr(_c90);
},getColumnTogglingItems:function(){
return dojo.map(this.layout.cells,function(cell){
if(!cell.menuItems){
cell.menuItems=[];
}
var self=this;
var item=new dijit.CheckedMenuItem({label:cell.name,checked:!cell.hidden,_gridCell:cell,onChange:function(_c91){
if(self.layout.setColumnVisibility(this._gridCell.index,_c91)){
var _c92=this._gridCell.menuItems;
if(_c92.length>1){
dojo.forEach(_c92,function(item){
if(item!==this){
item.setAttribute("checked",_c91);
}
},this);
}
_c91=dojo.filter(self.layout.cells,function(c){
if(c.menuItems.length>1){
dojo.forEach(c.menuItems,"item.set('disabled', false);");
}else{
c.menuItems[0].set("disabled",false);
}
return !c.hidden;
});
if(_c91.length==1){
dojo.forEach(_c91[0].menuItems,"item.set('disabled', true);");
}
}
},destroy:function(){
var _c93=dojo.indexOf(this._gridCell.menuItems,this);
this._gridCell.menuItems.splice(_c93,1);
delete this._gridCell;
dijit.CheckedMenuItem.prototype.destroy.apply(this,arguments);
}});
cell.menuItems.push(item);
return item;
},this);
},_setHeaderMenuAttr:function(menu){
if(this._placeholders&&this._placeholders.length){
dojo.forEach(this._placeholders,function(p){
p.unReplace(true);
});
this._placeholders=[];
}
if(this.headerMenu){
this.headerMenu.unBindDomNode(this.viewsHeaderNode);
}
this.headerMenu=menu;
if(!menu){
return;
}
this.headerMenu.bindDomNode(this.viewsHeaderNode);
if(this.headerMenu.getPlaceholders){
this._placeholders=this.headerMenu.getPlaceholders(this.placeholderLabel);
}
},setHeaderMenu:function(menu){
dojo.deprecated("dojox.grid._Grid.setHeaderMenu(obj)","use dojox.grid._Grid.set('headerMenu', obj) instead.","2.0");
this._setHeaderMenuAttr(menu);
},setupHeaderMenu:function(){
if(this._placeholders&&this._placeholders.length){
dojo.forEach(this._placeholders,function(p){
if(p._replaced){
p.unReplace(true);
}
p.replace(this.getColumnTogglingItems());
},this);
}
},_fetch:function(_c94){
this.setScrollTop(0);
},getItem:function(_c95){
return null;
},showMessage:function(_c96){
if(_c96){
this.messagesNode.innerHTML=_c96;
this.messagesNode.style.display="";
}else{
this.messagesNode.innerHTML="";
this.messagesNode.style.display="none";
}
},_structureChanged:function(){
this.buildViews();
if(this.autoRender&&this._started){
this.render();
}
},hasLayout:function(){
return this.layout.cells.length;
},resize:function(_c97,_c98){
this._pendingChangeSize=_c97;
this._pendingResultSize=_c98;
this.sizeChange();
},_getPadBorder:function(){
this._padBorder=this._padBorder||dojo._getPadBorderExtents(this.domNode);
return this._padBorder;
},_getHeaderHeight:function(){
var vns=this.viewsHeaderNode.style,t=vns.display=="none"?0:this.views.measureHeader();
vns.height=t+"px";
this.views.normalizeHeaderNodeHeight();
return t;
},_resize:function(_c99,_c9a){
_c99=_c99||this._pendingChangeSize;
_c9a=_c9a||this._pendingResultSize;
delete this._pendingChangeSize;
delete this._pendingResultSize;
if(!this.domNode){
return;
}
var pn=this.domNode.parentNode;
if(!pn||pn.nodeType!=1||!this.hasLayout()||pn.style.visibility=="hidden"||pn.style.display=="none"){
return;
}
var _c9b=this._getPadBorder();
var hh=undefined;
var h;
if(this._autoHeight){
this.domNode.style.height="auto";
}else{
if(typeof this.autoHeight=="number"){
h=hh=this._getHeaderHeight();
h+=(this.scroller.averageRowHeight*this.autoHeight);
this.domNode.style.height=h+"px";
}else{
if(this.domNode.clientHeight<=_c9b.h){
if(pn==document.body){
this.domNode.style.height=this.defaultHeight;
}else{
if(this.height){
this.domNode.style.height=this.height;
}else{
this.fitTo="parent";
}
}
}
}
}
if(_c9a){
_c99=_c9a;
}
if(_c99){
dojo.marginBox(this.domNode,_c99);
this.height=this.domNode.style.height;
delete this.fitTo;
}else{
if(this.fitTo=="parent"){
h=this._parentContentBoxHeight=this._parentContentBoxHeight||dojo._getContentBox(pn).h;
this.domNode.style.height=Math.max(0,h)+"px";
}
}
var _c9c=dojo.some(this.views.views,function(v){
return v.flexCells;
});
if(!this._autoHeight&&(h||dojo._getContentBox(this.domNode).h)===0){
this.viewsHeaderNode.style.display="none";
}else{
this.viewsHeaderNode.style.display="block";
if(!_c9c&&hh===undefined){
hh=this._getHeaderHeight();
}
}
if(_c9c){
hh=undefined;
}
this.adaptWidth();
this.adaptHeight(hh);
this.postresize();
},adaptWidth:function(){
var _c9d=(!this.initialWidth&&this.autoWidth);
var w=_c9d?0:this.domNode.clientWidth||(this.domNode.offsetWidth-this._getPadBorder().w),vw=this.views.arrange(1,w);
this.views.onEach("adaptWidth");
if(_c9d){
this.domNode.style.width=vw+"px";
}
},adaptHeight:function(_c9e){
var t=_c9e===undefined?this._getHeaderHeight():_c9e;
var h=(this._autoHeight?-1:Math.max(this.domNode.clientHeight-t,0)||0);
this.views.onEach("setSize",[0,h]);
this.views.onEach("adaptHeight");
if(!this._autoHeight){
var _c9f=0,_ca0=0;
var _ca1=dojo.filter(this.views.views,function(v){
var has=v.hasHScrollbar();
if(has){
_c9f++;
}else{
_ca0++;
}
return (!has);
});
if(_c9f>0&&_ca0>0){
dojo.forEach(_ca1,function(v){
v.adaptHeight(true);
});
}
}
if(this.autoHeight===true||h!=-1||(typeof this.autoHeight=="number"&&this.autoHeight>=this.get("rowCount"))){
this.scroller.windowHeight=h;
}else{
this.scroller.windowHeight=Math.max(this.domNode.clientHeight-t,0);
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(this.autoRender){
this.render();
}
},render:function(){
if(!this.domNode){
return;
}
if(!this._started){
return;
}
if(!this.hasLayout()){
this.scroller.init(0,this.keepRows,this.rowsPerPage);
return;
}
this.update=this.defaultUpdate;
this._render();
},_render:function(){
this.scroller.init(this.get("rowCount"),this.keepRows,this.rowsPerPage);
this.prerender();
this.setScrollTop(0);
this.postrender();
},prerender:function(){
this.keepRows=this._autoHeight?0:this.keepRows;
this.scroller.setKeepInfo(this.keepRows);
this.views.render();
this._resize();
},postrender:function(){
this.postresize();
this.focus.initFocusView();
dojo.setSelectable(this.domNode,this.selectable);
},postresize:function(){
if(this._autoHeight){
var size=Math.max(this.views.measureContent())+"px";
this.viewsNode.style.height=size;
}
},renderRow:function(_ca2,_ca3){
this.views.renderRow(_ca2,_ca3,this._skipRowRenormalize);
},rowRemoved:function(_ca4){
this.views.rowRemoved(_ca4);
},invalidated:null,updating:false,beginUpdate:function(){
this.invalidated=[];
this.updating=true;
},endUpdate:function(){
this.updating=false;
var i=this.invalidated,r;
if(i.all){
this.update();
}else{
if(i.rowCount!=undefined){
this.updateRowCount(i.rowCount);
}else{
for(r in i){
this.updateRow(Number(r));
}
}
}
this.invalidated=[];
},defaultUpdate:function(){
if(!this.domNode){
return;
}
if(this.updating){
this.invalidated.all=true;
return;
}
this.lastScrollTop=this.scrollTop;
this.prerender();
this.scroller.invalidateNodes();
this.setScrollTop(this.lastScrollTop);
this.postrender();
},update:function(){
this.render();
},updateRow:function(_ca5){
_ca5=Number(_ca5);
if(this.updating){
this.invalidated[_ca5]=true;
}else{
this.views.updateRow(_ca5);
this.scroller.rowHeightChanged(_ca5);
}
},updateRows:function(_ca6,_ca7){
_ca6=Number(_ca6);
_ca7=Number(_ca7);
var i;
if(this.updating){
for(i=0;i<_ca7;i++){
this.invalidated[i+_ca6]=true;
}
}else{
for(i=0;i<_ca7;i++){
this.views.updateRow(i+_ca6,this._skipRowRenormalize);
}
this.scroller.rowHeightChanged(_ca6);
}
},updateRowCount:function(_ca8){
if(this.updating){
this.invalidated.rowCount=_ca8;
}else{
this.rowCount=_ca8;
this._setAutoHeightAttr(this.autoHeight,true);
if(this.layout.cells.length){
this.scroller.updateRowCount(_ca8);
}
this._resize();
if(this.layout.cells.length){
this.setScrollTop(this.scrollTop);
}
}
},updateRowStyles:function(_ca9){
this.views.updateRowStyles(_ca9);
},getRowNode:function(_caa){
if(this.focus.focusView&&!(this.focus.focusView instanceof dojox.grid._RowSelector)){
return this.focus.focusView.rowNodes[_caa];
}else{
for(var i=0,_cab;(_cab=this.views.views[i]);i++){
if(!(_cab instanceof dojox.grid._RowSelector)){
return _cab.rowNodes[_caa];
}
}
}
return null;
},rowHeightChanged:function(_cac){
this.views.renormalizeRow(_cac);
this.scroller.rowHeightChanged(_cac);
},fastScroll:true,delayScroll:false,scrollRedrawThreshold:(dojo.isIE?100:50),scrollTo:function(_cad){
if(!this.fastScroll){
this.setScrollTop(_cad);
return;
}
var _cae=Math.abs(this.lastScrollTop-_cad);
this.lastScrollTop=_cad;
if(_cae>this.scrollRedrawThreshold||this.delayScroll){
this.delayScroll=true;
this.scrollTop=_cad;
this.views.setScrollTop(_cad);
if(this._pendingScroll){
window.clearTimeout(this._pendingScroll);
}
var _caf=this;
this._pendingScroll=window.setTimeout(function(){
delete _caf._pendingScroll;
_caf.finishScrollJob();
},200);
}else{
this.setScrollTop(_cad);
}
},finishScrollJob:function(){
this.delayScroll=false;
this.setScrollTop(this.scrollTop);
},setScrollTop:function(_cb0){
this.scroller.scroll(this.views.setScrollTop(_cb0));
},scrollToRow:function(_cb1){
this.setScrollTop(this.scroller.findScrollTop(_cb1)+1);
},styleRowNode:function(_cb2,_cb3){
if(_cb3){
this.rows.styleRowNode(_cb2,_cb3);
}
},_mouseOut:function(e){
this.rows.setOverRow(-2);
},getCell:function(_cb4){
return this.layout.cells[_cb4];
},setCellWidth:function(_cb5,_cb6){
this.getCell(_cb5).unitWidth=_cb6;
},getCellName:function(_cb7){
return "Cell "+_cb7.index;
},canSort:function(_cb8){
},sort:function(){
},getSortAsc:function(_cb9){
_cb9=_cb9==undefined?this.sortInfo:_cb9;
return Boolean(_cb9>0);
},getSortIndex:function(_cba){
_cba=_cba==undefined?this.sortInfo:_cba;
return Math.abs(_cba)-1;
},setSortIndex:function(_cbb,_cbc){
var si=_cbb+1;
if(_cbc!=undefined){
si*=(_cbc?1:-1);
}else{
if(this.getSortIndex()==_cbb){
si=-this.sortInfo;
}
}
this.setSortInfo(si);
},setSortInfo:function(_cbd){
if(this.canSort(_cbd)){
this.sortInfo=_cbd;
this.sort();
this.update();
}
},doKeyEvent:function(e){
e.dispatch="do"+e.type;
this.onKeyEvent(e);
},_dispatch:function(m,e){
if(m in this){
return this[m](e);
}
return false;
},dispatchKeyEvent:function(e){
this._dispatch(e.dispatch,e);
},dispatchContentEvent:function(e){
this.edit.dispatchEvent(e)||e.sourceView.dispatchContentEvent(e)||this._dispatch(e.dispatch,e);
},dispatchHeaderEvent:function(e){
e.sourceView.dispatchHeaderEvent(e)||this._dispatch("doheader"+e.type,e);
},dokeydown:function(e){
this.onKeyDown(e);
},doclick:function(e){
if(e.cellNode){
this.onCellClick(e);
}else{
this.onRowClick(e);
}
},dodblclick:function(e){
if(e.cellNode){
this.onCellDblClick(e);
}else{
this.onRowDblClick(e);
}
},docontextmenu:function(e){
if(e.cellNode){
this.onCellContextMenu(e);
}else{
this.onRowContextMenu(e);
}
},doheaderclick:function(e){
if(e.cellNode){
this.onHeaderCellClick(e);
}else{
this.onHeaderClick(e);
}
},doheaderdblclick:function(e){
if(e.cellNode){
this.onHeaderCellDblClick(e);
}else{
this.onHeaderDblClick(e);
}
},doheadercontextmenu:function(e){
if(e.cellNode){
this.onHeaderCellContextMenu(e);
}else{
this.onHeaderContextMenu(e);
}
},doStartEdit:function(_cbe,_cbf){
this.onStartEdit(_cbe,_cbf);
},doApplyCellEdit:function(_cc0,_cc1,_cc2){
this.onApplyCellEdit(_cc0,_cc1,_cc2);
},doCancelEdit:function(_cc3){
this.onCancelEdit(_cc3);
},doApplyEdit:function(_cc4){
this.onApplyEdit(_cc4);
},addRow:function(){
this.updateRowCount(this.get("rowCount")+1);
},removeSelectedRows:function(){
if(this.allItemsSelected){
this.updateRowCount(0);
}else{
this.updateRowCount(Math.max(0,this.get("rowCount")-this.selection.getSelected().length));
}
this.selection.clear();
}});
dojox.grid._Grid.markupFactory=function(_cc5,node,ctor,_cc6){
var d=dojo;
var _cc7=function(n){
var w=d.attr(n,"width")||"auto";
if((w!="auto")&&(w.slice(-2)!="em")&&(w.slice(-1)!="%")){
w=parseInt(w,10)+"px";
}
return w;
};
if(!_cc5.structure&&node.nodeName.toLowerCase()=="table"){
_cc5.structure=d.query("> colgroup",node).map(function(cg){
var sv=d.attr(cg,"span");
var v={noscroll:(d.attr(cg,"noscroll")=="true")?true:false,__span:(!!sv?parseInt(sv,10):1),cells:[]};
if(d.hasAttr(cg,"width")){
v.width=_cc7(cg);
}
return v;
});
if(!_cc5.structure.length){
_cc5.structure.push({__span:Infinity,cells:[]});
}
d.query("thead > tr",node).forEach(function(tr,_cc8){
var _cc9=0;
var _cca=0;
var _ccb;
var _ccc=null;
d.query("> th",tr).map(function(th){
if(!_ccc){
_ccb=0;
_ccc=_cc5.structure[0];
}else{
if(_cc9>=(_ccb+_ccc.__span)){
_cca++;
_ccb+=_ccc.__span;
var _ccd=_ccc;
_ccc=_cc5.structure[_cca];
}
}
var cell={name:d.trim(d.attr(th,"name")||th.innerHTML),colSpan:parseInt(d.attr(th,"colspan")||1,10),type:d.trim(d.attr(th,"cellType")||""),id:d.trim(d.attr(th,"id")||"")};
_cc9+=cell.colSpan;
var _cce=d.attr(th,"rowspan");
if(_cce){
cell.rowSpan=_cce;
}
if(d.hasAttr(th,"width")){
cell.width=_cc7(th);
}
if(d.hasAttr(th,"relWidth")){
cell.relWidth=window.parseInt(dojo.attr(th,"relWidth"),10);
}
if(d.hasAttr(th,"hidden")){
cell.hidden=(d.attr(th,"hidden")=="true"||d.attr(th,"hidden")===true);
}
if(_cc6){
_cc6(th,cell);
}
cell.type=cell.type?dojo.getObject(cell.type):dojox.grid.cells.Cell;
if(cell.type&&cell.type.markupFactory){
cell.type.markupFactory(th,cell);
}
if(!_ccc.cells[_cc8]){
_ccc.cells[_cc8]=[];
}
_ccc.cells[_cc8].push(cell);
});
});
}
return new ctor(_cc5,node);
};
})();
dojo.provide("dojox.grid.DataSelection");
dojo.declare("dojox.grid.DataSelection",dojox.grid.Selection,{getFirstSelected:function(){
var idx=dojox.grid.Selection.prototype.getFirstSelected.call(this);
if(idx==-1){
return null;
}
return this.grid.getItem(idx);
},getNextSelected:function(_ccf){
var _cd0=this.grid.getItemIndex(_ccf);
var idx=dojox.grid.Selection.prototype.getNextSelected.call(this,_cd0);
if(idx==-1){
return null;
}
return this.grid.getItem(idx);
},getSelected:function(){
var _cd1=[];
for(var i=0,l=this.selected.length;i<l;i++){
if(this.selected[i]){
_cd1.push(this.grid.getItem(i));
}
}
return _cd1;
},addToSelection:function(_cd2){
if(this.mode=="none"){
return;
}
var idx=null;
if(typeof _cd2=="number"||typeof _cd2=="string"){
idx=_cd2;
}else{
idx=this.grid.getItemIndex(_cd2);
}
dojox.grid.Selection.prototype.addToSelection.call(this,idx);
},deselect:function(_cd3){
if(this.mode=="none"){
return;
}
var idx=null;
if(typeof _cd3=="number"||typeof _cd3=="string"){
idx=_cd3;
}else{
idx=this.grid.getItemIndex(_cd3);
}
dojox.grid.Selection.prototype.deselect.call(this,idx);
},deselectAll:function(_cd4){
var idx=null;
if(_cd4||typeof _cd4=="number"){
if(typeof _cd4=="number"||typeof _cd4=="string"){
idx=_cd4;
}else{
idx=this.grid.getItemIndex(_cd4);
}
dojox.grid.Selection.prototype.deselectAll.call(this,idx);
}else{
this.inherited(arguments);
}
}});
dojo.provide("dojox.grid.DataGrid");
dojo.declare("dojox.grid.DataGrid",dojox.grid._Grid,{store:null,query:null,queryOptions:null,fetchText:"...",sortFields:null,updateDelay:1,items:null,_store_connects:null,_by_idty:null,_by_idx:null,_cache:null,_pages:null,_pending_requests:null,_bop:-1,_eop:-1,_requests:0,rowCount:0,_isLoaded:false,_isLoading:false,postCreate:function(){
this._pages=[];
this._store_connects=[];
this._by_idty={};
this._by_idx=[];
this._cache=[];
this._pending_requests={};
this._setStore(this.store);
this.inherited(arguments);
},createSelection:function(){
this.selection=new dojox.grid.DataSelection(this);
},get:function(_cd5,_cd6){
if(_cd6&&this.field=="_item"&&!this.fields){
return _cd6;
}else{
if(_cd6&&this.fields){
var ret=[];
var s=this.grid.store;
dojo.forEach(this.fields,function(f){
ret=ret.concat(s.getValues(_cd6,f));
});
return ret;
}else{
if(!_cd6&&typeof _cd5==="string"){
return this.inherited(arguments);
}
}
}
return (!_cd6?this.defaultValue:(!this.field?this.value:(this.field=="_item"?_cd6:this.grid.store.getValue(_cd6,this.field))));
},_checkUpdateStatus:function(){
if(this.updateDelay>0){
var _cd7=false;
if(this._endUpdateDelay){
clearTimeout(this._endUpdateDelay);
delete this._endUpdateDelay;
_cd7=true;
}
if(!this.updating){
this.beginUpdate();
_cd7=true;
}
if(_cd7){
var _cd8=this;
this._endUpdateDelay=setTimeout(function(){
delete _cd8._endUpdateDelay;
_cd8.endUpdate();
},this.updateDelay);
}
}
},_onSet:function(item,_cd9,_cda,_cdb){
this._checkUpdateStatus();
var idx=this.getItemIndex(item);
if(idx>-1){
this.updateRow(idx);
}
},_createItem:function(item,_cdc){
var idty=this._hasIdentity?this.store.getIdentity(item):dojo.toJson(this.query)+":idx:"+_cdc+":sort:"+dojo.toJson(this.getSortProps());
var o=this._by_idty[idty]={idty:idty,item:item};
return o;
},_addItem:function(item,_cdd,_cde){
this._by_idx[_cdd]=this._createItem(item,_cdd);
if(!_cde){
this.updateRow(_cdd);
}
},_onNew:function(item,_cdf){
this._checkUpdateStatus();
var _ce0=this.get("rowCount");
this._addingItem=true;
this.updateRowCount(_ce0+1);
this._addingItem=false;
this._addItem(item,_ce0);
this.showMessage();
},_onDelete:function(item){
this._checkUpdateStatus();
var idx=this._getItemIndex(item,true);
if(idx>=0){
this._pages=[];
this._bop=-1;
this._eop=-1;
var o=this._by_idx[idx];
this._by_idx.splice(idx,1);
delete this._by_idty[o.idty];
this.updateRowCount(this.get("rowCount")-1);
if(this.get("rowCount")===0){
this.showMessage(this.noDataMessage);
}
}
},_onRevert:function(){
this._refresh();
},setStore:function(_ce1,_ce2,_ce3){
this._setQuery(_ce2,_ce3);
this._setStore(_ce1);
this._refresh(true);
},setQuery:function(_ce4,_ce5){
this._setQuery(_ce4,_ce5);
this._refresh(true);
},setItems:function(_ce6){
this.items=_ce6;
this._setStore(this.store);
this._refresh(true);
},_setQuery:function(_ce7,_ce8){
this.query=_ce7;
this.queryOptions=_ce8||this.queryOptions;
},_setStore:function(_ce9){
if(this.store&&this._store_connects){
dojo.forEach(this._store_connects,this.disconnect,this);
}
this.store=_ce9;
if(this.store){
var f=this.store.getFeatures();
var h=[];
this._canEdit=!!f["dojo.data.api.Write"]&&!!f["dojo.data.api.Identity"];
this._hasIdentity=!!f["dojo.data.api.Identity"];
if(!!f["dojo.data.api.Notification"]&&!this.items){
h.push(this.connect(this.store,"onSet","_onSet"));
h.push(this.connect(this.store,"onNew","_onNew"));
h.push(this.connect(this.store,"onDelete","_onDelete"));
}
if(this._canEdit){
h.push(this.connect(this.store,"revert","_onRevert"));
}
this._store_connects=h;
}
},_onFetchBegin:function(size,req){
if(!this.scroller){
return;
}
if(this.rowCount!=size){
if(req.isRender){
this.scroller.init(size,this.keepRows,this.rowsPerPage);
this.rowCount=size;
this._setAutoHeightAttr(this.autoHeight,true);
this._skipRowRenormalize=true;
this.prerender();
this._skipRowRenormalize=false;
}else{
this.updateRowCount(size);
}
}
if(!size){
this.views.render();
this._resize();
this.showMessage(this.noDataMessage);
this.focus.initFocusView();
}else{
this.showMessage();
}
},_onFetchComplete:function(_cea,req){
if(!this.scroller){
return;
}
if(_cea&&_cea.length>0){
dojo.forEach(_cea,function(item,idx){
this._addItem(item,req.start+idx,true);
},this);
this.updateRows(req.start,_cea.length);
if(req.isRender){
this.setScrollTop(0);
this.postrender();
}else{
if(this._lastScrollTop){
this.setScrollTop(this._lastScrollTop);
}
}
}
delete this._lastScrollTop;
if(!this._isLoaded){
this._isLoading=false;
this._isLoaded=true;
}
this._pending_requests[req.start]=false;
},_onFetchError:function(err,req){
delete this._lastScrollTop;
if(!this._isLoaded){
this._isLoading=false;
this._isLoaded=true;
this.showMessage(this.errorMessage);
}
this._pending_requests[req.start]=false;
this.onFetchError(err,req);
},onFetchError:function(err,req){
},_fetch:function(_ceb,_cec){
_ceb=_ceb||0;
if(this.store&&!this._pending_requests[_ceb]){
if(!this._isLoaded&&!this._isLoading){
this._isLoading=true;
this.showMessage(this.loadingMessage);
}
this._pending_requests[_ceb]=true;
try{
if(this.items){
var _ced=this.items;
var _cee=this.store;
this.rowsPerPage=_ced.length;
var req={start:_ceb,count:this.rowsPerPage,isRender:_cec};
this._onFetchBegin(_ced.length,req);
var _cef=0;
dojo.forEach(_ced,function(i){
if(!_cee.isItemLoaded(i)){
_cef++;
}
});
if(_cef===0){
this._onFetchComplete(_ced,req);
}else{
var _cf0=function(item){
_cef--;
if(_cef===0){
this._onFetchComplete(_ced,req);
}
};
dojo.forEach(_ced,function(i){
if(!_cee.isItemLoaded(i)){
_cee.loadItem({item:i,onItem:_cf0,scope:this});
}
},this);
}
}else{
this.store.fetch({start:_ceb,count:this.rowsPerPage,query:this.query,sort:this.getSortProps(),queryOptions:this.queryOptions,isRender:_cec,onBegin:dojo.hitch(this,"_onFetchBegin"),onComplete:dojo.hitch(this,"_onFetchComplete"),onError:dojo.hitch(this,"_onFetchError")});
}
}
catch(e){
this._onFetchError(e,{start:_ceb,count:this.rowsPerPage});
}
}
},_clearData:function(){
this.updateRowCount(0);
this._by_idty={};
this._by_idx=[];
this._pages=[];
this._bop=this._eop=-1;
this._isLoaded=false;
this._isLoading=false;
},getItem:function(idx){
var data=this._by_idx[idx];
if(!data||(data&&!data.item)){
this._preparePage(idx);
return null;
}
return data.item;
},getItemIndex:function(item){
return this._getItemIndex(item,false);
},_getItemIndex:function(item,_cf1){
if(!_cf1&&!this.store.isItem(item)){
return -1;
}
var idty=this._hasIdentity?this.store.getIdentity(item):null;
for(var i=0,l=this._by_idx.length;i<l;i++){
var d=this._by_idx[i];
if(d&&((idty&&d.idty==idty)||(d.item===item))){
return i;
}
}
return -1;
},filter:function(_cf2,_cf3){
this.query=_cf2;
if(_cf3){
this._clearData();
}
this._fetch();
},_getItemAttr:function(idx,attr){
var item=this.getItem(idx);
return (!item?this.fetchText:this.store.getValue(item,attr));
},_render:function(){
if(this.domNode.parentNode){
this.scroller.init(this.get("rowCount"),this.keepRows,this.rowsPerPage);
this.prerender();
this._fetch(0,true);
}
},_requestsPending:function(_cf4){
return this._pending_requests[_cf4];
},_rowToPage:function(_cf5){
return (this.rowsPerPage?Math.floor(_cf5/this.rowsPerPage):_cf5);
},_pageToRow:function(_cf6){
return (this.rowsPerPage?this.rowsPerPage*_cf6:_cf6);
},_preparePage:function(_cf7){
if((_cf7<this._bop||_cf7>=this._eop)&&!this._addingItem){
var _cf8=this._rowToPage(_cf7);
this._needPage(_cf8);
this._bop=_cf8*this.rowsPerPage;
this._eop=this._bop+(this.rowsPerPage||this.get("rowCount"));
}
},_needPage:function(_cf9){
if(!this._pages[_cf9]){
this._pages[_cf9]=true;
this._requestPage(_cf9);
}
},_requestPage:function(_cfa){
var row=this._pageToRow(_cfa);
var _cfb=Math.min(this.rowsPerPage,this.get("rowCount")-row);
if(_cfb>0){
this._requests++;
if(!this._requestsPending(row)){
setTimeout(dojo.hitch(this,"_fetch",row,false),1);
}
}
},getCellName:function(_cfc){
return _cfc.field;
},_refresh:function(_cfd){
this._clearData();
this._fetch(0,_cfd);
},sort:function(){
this.edit.apply();
this._lastScrollTop=this.scrollTop;
this._refresh();
},canSort:function(){
return (!this._isLoading);
},getSortProps:function(){
var c=this.getCell(this.getSortIndex());
if(!c){
if(this.sortFields){
return this.sortFields;
}
return null;
}else{
var desc=c["sortDesc"];
var si=!(this.sortInfo>0);
if(typeof desc=="undefined"){
desc=si;
}else{
desc=si?!desc:desc;
}
return [{attribute:c.field,descending:desc}];
}
},styleRowState:function(_cfe){
if(this.store&&this.store.getState){
var _cff=this.store.getState(_cfe.index),c="";
for(var i=0,ss=["inflight","error","inserting"],s;s=ss[i];i++){
if(_cff[s]){
c=" dojoxGridRow-"+s;
break;
}
}
_cfe.customClasses+=c;
}
},onStyleRow:function(_d00){
this.styleRowState(_d00);
this.inherited(arguments);
},canEdit:function(_d01,_d02){
return this._canEdit;
},_copyAttr:function(idx,attr){
var row={};
var _d03={};
var src=this.getItem(idx);
return this.store.getValue(src,attr);
},doStartEdit:function(_d04,_d05){
if(!this._cache[_d05]){
this._cache[_d05]=this._copyAttr(_d05,_d04.field);
}
this.onStartEdit(_d04,_d05);
},doApplyCellEdit:function(_d06,_d07,_d08){
this.store.fetchItemByIdentity({identity:this._by_idx[_d07].idty,onItem:dojo.hitch(this,function(item){
var _d09=this.store.getValue(item,_d08);
if(typeof _d09=="number"){
_d06=isNaN(_d06)?_d06:parseFloat(_d06);
}else{
if(typeof _d09=="boolean"){
_d06=_d06=="true"?true:_d06=="false"?false:_d06;
}else{
if(_d09 instanceof Date){
var _d0a=new Date(_d06);
_d06=isNaN(_d0a.getTime())?_d06:_d0a;
}
}
}
this.store.setValue(item,_d08,_d06);
this.onApplyCellEdit(_d06,_d07,_d08);
})});
},doCancelEdit:function(_d0b){
var _d0c=this._cache[_d0b];
if(_d0c){
this.updateRow(_d0b);
delete this._cache[_d0b];
}
this.onCancelEdit.apply(this,arguments);
},doApplyEdit:function(_d0d,_d0e){
var _d0f=this._cache[_d0d];
this.onApplyEdit(_d0d);
},removeSelectedRows:function(){
if(this._canEdit){
this.edit.apply();
var fx=dojo.hitch(this,function(_d10){
if(_d10.length){
dojo.forEach(_d10,this.store.deleteItem,this.store);
this.selection.clear();
}
});
if(this.allItemsSelected){
this.store.fetch({query:this.query,queryOptions:this.queryOptions,onComplete:fx});
}else{
fx(this.selection.getSelected());
}
}
}});
dojox.grid.DataGrid.cell_markupFactory=function(_d11,node,_d12){
var _d13=dojo.trim(dojo.attr(node,"field")||"");
if(_d13){
_d12.field=_d13;
}
_d12.field=_d12.field||_d12.name;
var _d14=dojo.trim(dojo.attr(node,"fields")||"");
if(_d14){
_d12.fields=_d14.split(",");
}
if(_d11){
_d11(node,_d12);
}
};
dojox.grid.DataGrid.markupFactory=function(_d15,node,ctor,_d16){
return dojox.grid._Grid.markupFactory(_d15,node,ctor,dojo.partial(dojox.grid.DataGrid.cell_markupFactory,_d16));
};
dojo.provide("dijit.form._Spinner");
dojo.declare("dijit.form._Spinner",dijit.form.RangeBoundTextBox,{defaultTimeout:500,minimumTimeout:10,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:dojo.cache("dijit.form","templates/Spinner.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitButtonNode dijitSpinnerButtonContainer\"\n\t\t><input class=\"dijitReset dijitInputField dijitSpinnerButtonInner\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t/><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitUpArrowButton\"\n\t\t\tdojoAttachPoint=\"upArrowNode\"\n\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9650;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t></div\n\t\t><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\tdojoAttachPoint=\"downArrowNode\"\n\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9660;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t></div\n\t></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' dojoAttachPoint=\"textbox,focusNode\" type=\"${type}\" dojoAttachEvent=\"onkeypress:_onKeyPress\"\n\t\t\trole=\"spinbutton\" autocomplete=\"off\" ${!nameAttrSetting}\n\t/></div\n></div>\n"),baseClass:"dijitTextBox dijitSpinner",cssStateNodes:{"upArrowNode":"dijitUpArrowButton","downArrowNode":"dijitDownArrowButton"},adjust:function(val,_d17){
return val;
},_arrowPressed:function(_d18,_d19,_d1a){
if(this.disabled||this.readOnly){
return;
}
this._setValueAttr(this.adjust(this.get("value"),_d19*_d1a),false);
dijit.selectInputText(this.textbox,this.textbox.value.length);
},_arrowReleased:function(node){
this._wheelTimer=null;
if(this.disabled||this.readOnly){
return;
}
},_typematicCallback:function(_d1b,node,evt){
var inc=this.smallDelta;
if(node==this.textbox){
var k=dojo.keys;
var key=evt.charOrCode;
inc=(key==k.PAGE_UP||key==k.PAGE_DOWN)?this.largeDelta:this.smallDelta;
node=(key==k.UP_ARROW||key==k.PAGE_UP)?this.upArrowNode:this.downArrowNode;
}
if(_d1b==-1){
this._arrowReleased(node);
}else{
this._arrowPressed(node,(node==this.upArrowNode)?1:-1,inc);
}
},_wheelTimer:null,_mouseWheeled:function(evt){
dojo.stopEvent(evt);
var _d1c=evt.detail?(evt.detail*-1):(evt.wheelDelta/120);
if(_d1c!==0){
var node=this[(_d1c>0?"upArrowNode":"downArrowNode")];
this._arrowPressed(node,_d1c,this.smallDelta);
if(!this._wheelTimer){
clearTimeout(this._wheelTimer);
}
this._wheelTimer=setTimeout(dojo.hitch(this,"_arrowReleased",node),50);
}
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,!dojo.isMozilla?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
this._connects.push(dijit.typematic.addListener(this.upArrowNode,this.textbox,{charOrCode:dojo.keys.UP_ARROW,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout));
this._connects.push(dijit.typematic.addListener(this.downArrowNode,this.textbox,{charOrCode:dojo.keys.DOWN_ARROW,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout));
this._connects.push(dijit.typematic.addListener(this.upArrowNode,this.textbox,{charOrCode:dojo.keys.PAGE_UP,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout));
this._connects.push(dijit.typematic.addListener(this.downArrowNode,this.textbox,{charOrCode:dojo.keys.PAGE_DOWN,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout));
}});
dojo.provide("dojo.number");
dojo.getObject("number",true,dojo);
dojo.number.format=function(_d1d,_d1e){
_d1e=dojo.mixin({},_d1e||{});
var _d1f=dojo.i18n.normalizeLocale(_d1e.locale),_d20=dojo.i18n.getLocalization("dojo.cldr","number",_d1f);
_d1e.customs=_d20;
var _d21=_d1e.pattern||_d20[(_d1e.type||"decimal")+"Format"];
if(isNaN(_d1d)||Math.abs(_d1d)==Infinity){
return null;
}
return dojo.number._applyPattern(_d1d,_d21,_d1e);
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(_d22,_d23,_d24){
_d24=_d24||{};
var _d25=_d24.customs.group,_d26=_d24.customs.decimal,_d27=_d23.split(";"),_d28=_d27[0];
_d23=_d27[(_d22<0)?1:0]||("-"+_d28);
if(_d23.indexOf("%")!=-1){
_d22*=100;
}else{
if(_d23.indexOf("?")!=-1){
_d22*=1000;
}else{
if(_d23.indexOf("?")!=-1){
_d25=_d24.customs.currencyGroup||_d25;
_d26=_d24.customs.currencyDecimal||_d26;
_d23=_d23.replace(/\u00a4{1,3}/,function(_d29){
var prop=["symbol","currency","displayName"][_d29.length-1];
return _d24[prop]||_d24.currency||"";
});
}else{
if(_d23.indexOf("E")!=-1){
throw new Error("exponential notation not supported");
}
}
}
}
var _d2a=dojo.number._numberPatternRE;
var _d2b=_d28.match(_d2a);
if(!_d2b){
throw new Error("unable to find a number expression in pattern: "+_d23);
}
if(_d24.fractional===false){
_d24.places=0;
}
return _d23.replace(_d2a,dojo.number._formatAbsolute(_d22,_d2b[0],{decimal:_d26,group:_d25,places:_d24.places,round:_d24.round}));
};
dojo.number.round=function(_d2c,_d2d,_d2e){
var _d2f=10/(_d2e||10);
return (_d2f*+_d2c).toFixed(_d2d)/_d2f;
};
if((0.9).toFixed()==0){
(function(){
var _d30=dojo.number.round;
dojo.number.round=function(v,p,m){
var d=Math.pow(10,-p||0),a=Math.abs(v);
if(!v||a>=d||a*Math.pow(10,p+1)<5){
d=0;
}
return _d30(v,p,m)+(v>0?d:-d);
};
})();
}
dojo.number._formatAbsolute=function(_d31,_d32,_d33){
_d33=_d33||{};
if(_d33.places===true){
_d33.places=0;
}
if(_d33.places===Infinity){
_d33.places=6;
}
var _d34=_d32.split("."),_d35=typeof _d33.places=="string"&&_d33.places.indexOf(","),_d36=_d33.places;
if(_d35){
_d36=_d33.places.substring(_d35+1);
}else{
if(!(_d36>=0)){
_d36=(_d34[1]||[]).length;
}
}
if(!(_d33.round<0)){
_d31=dojo.number.round(_d31,_d36,_d33.round);
}
var _d37=String(Math.abs(_d31)).split("."),_d38=_d37[1]||"";
if(_d34[1]||_d33.places){
if(_d35){
_d33.places=_d33.places.substring(0,_d35);
}
var pad=_d33.places!==undefined?_d33.places:(_d34[1]&&_d34[1].lastIndexOf("0")+1);
if(pad>_d38.length){
_d37[1]=dojo.string.pad(_d38,pad,"0",true);
}
if(_d36<_d38.length){
_d37[1]=_d38.substr(0,_d36);
}
}else{
if(_d37[1]){
_d37.pop();
}
}
var _d39=_d34[0].replace(",","");
pad=_d39.indexOf("0");
if(pad!=-1){
pad=_d39.length-pad;
if(pad>_d37[0].length){
_d37[0]=dojo.string.pad(_d37[0],pad);
}
if(_d39.indexOf("#")==-1){
_d37[0]=_d37[0].substr(_d37[0].length-pad);
}
}
var _d3a=_d34[0].lastIndexOf(","),_d3b,_d3c;
if(_d3a!=-1){
_d3b=_d34[0].length-_d3a-1;
var _d3d=_d34[0].substr(0,_d3a);
_d3a=_d3d.lastIndexOf(",");
if(_d3a!=-1){
_d3c=_d3d.length-_d3a-1;
}
}
var _d3e=[];
for(var _d3f=_d37[0];_d3f;){
var off=_d3f.length-_d3b;
_d3e.push((off>0)?_d3f.substr(off):_d3f);
_d3f=(off>0)?_d3f.slice(0,off):"";
if(_d3c){
_d3b=_d3c;
delete _d3c;
}
}
_d37[0]=_d3e.reverse().join(_d33.group||",");
return _d37.join(_d33.decimal||".");
};
dojo.number.regexp=function(_d40){
return dojo.number._parseInfo(_d40).regexp;
};
dojo.number._parseInfo=function(_d41){
_d41=_d41||{};
var _d42=dojo.i18n.normalizeLocale(_d41.locale),_d43=dojo.i18n.getLocalization("dojo.cldr","number",_d42),_d44=_d41.pattern||_d43[(_d41.type||"decimal")+"Format"],_d45=_d43.group,_d46=_d43.decimal,_d47=1;
if(_d44.indexOf("%")!=-1){
_d47/=100;
}else{
if(_d44.indexOf("?")!=-1){
_d47/=1000;
}else{
var _d48=_d44.indexOf("?")!=-1;
if(_d48){
_d45=_d43.currencyGroup||_d45;
_d46=_d43.currencyDecimal||_d46;
}
}
}
var _d49=_d44.split(";");
if(_d49.length==1){
_d49.push("-"+_d49[0]);
}
var re=dojo.regexp.buildGroupRE(_d49,function(_d4a){
_d4a="(?:"+dojo.regexp.escapeString(_d4a,".")+")";
return _d4a.replace(dojo.number._numberPatternRE,function(_d4b){
var _d4c={signed:false,separator:_d41.strict?_d45:[_d45,""],fractional:_d41.fractional,decimal:_d46,exponent:false},_d4d=_d4b.split("."),_d4e=_d41.places;
if(_d4d.length==1&&_d47!=1){
_d4d[1]="###";
}
if(_d4d.length==1||_d4e===0){
_d4c.fractional=false;
}else{
if(_d4e===undefined){
_d4e=_d41.pattern?_d4d[1].lastIndexOf("0")+1:Infinity;
}
if(_d4e&&_d41.fractional==undefined){
_d4c.fractional=true;
}
if(!_d41.places&&(_d4e<_d4d[1].length)){
_d4e+=","+_d4d[1].length;
}
_d4c.places=_d4e;
}
var _d4f=_d4d[0].split(",");
if(_d4f.length>1){
_d4c.groupSize=_d4f.pop().length;
if(_d4f.length>1){
_d4c.groupSize2=_d4f.pop().length;
}
}
return "("+dojo.number._realNumberRegexp(_d4c)+")";
});
},true);
if(_d48){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_d50,_d51,_d52,_d53){
var prop=["symbol","currency","displayName"][_d52.length-1],_d54=dojo.regexp.escapeString(_d41[prop]||_d41.currency||"");
_d51=_d51?"[\\s\\xa0]":"";
_d53=_d53?"[\\s\\xa0]":"";
if(!_d41.strict){
if(_d51){
_d51+="*";
}
if(_d53){
_d53+="*";
}
return "(?:"+_d51+_d54+_d53+")?";
}
return _d51+_d54+_d53;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_d45,decimal:_d46,factor:_d47};
};
dojo.number.parse=function(_d55,_d56){
var info=dojo.number._parseInfo(_d56),_d57=(new RegExp("^"+info.regexp+"$")).exec(_d55);
if(!_d57){
return NaN;
}
var _d58=_d57[1];
if(!_d57[1]){
if(!_d57[2]){
return NaN;
}
_d58=_d57[2];
info.factor*=-1;
}
_d58=_d58.replace(new RegExp("["+info.group+"\\s\\xa0"+"]","g"),"").replace(info.decimal,".");
return _d58*info.factor;
};
dojo.number._realNumberRegexp=function(_d59){
_d59=_d59||{};
if(!("places" in _d59)){
_d59.places=Infinity;
}
if(typeof _d59.decimal!="string"){
_d59.decimal=".";
}
if(!("fractional" in _d59)||/^0/.test(_d59.places)){
_d59.fractional=[true,false];
}
if(!("exponent" in _d59)){
_d59.exponent=[true,false];
}
if(!("eSigned" in _d59)){
_d59.eSigned=[true,false];
}
var _d5a=dojo.number._integerRegexp(_d59),_d5b=dojo.regexp.buildGroupRE(_d59.fractional,function(q){
var re="";
if(q&&(_d59.places!==0)){
re="\\"+_d59.decimal;
if(_d59.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_d59.places+"}";
}
}
return re;
},true);
var _d5c=dojo.regexp.buildGroupRE(_d59.exponent,function(q){
if(q){
return "([eE]"+dojo.number._integerRegexp({signed:_d59.eSigned})+")";
}
return "";
});
var _d5d=_d5a+_d5b;
if(_d5b){
_d5d="(?:(?:"+_d5d+")|(?:"+_d5b+"))";
}
return _d5d+_d5c;
};
dojo.number._integerRegexp=function(_d5e){
_d5e=_d5e||{};
if(!("signed" in _d5e)){
_d5e.signed=[true,false];
}
if(!("separator" in _d5e)){
_d5e.separator="";
}else{
if(!("groupSize" in _d5e)){
_d5e.groupSize=3;
}
}
var _d5f=dojo.regexp.buildGroupRE(_d5e.signed,function(q){
return q?"[-+]":"";
},true);
var _d60=dojo.regexp.buildGroupRE(_d5e.separator,function(sep){
if(!sep){
return "(?:\\d+)";
}
sep=dojo.regexp.escapeString(sep);
if(sep==" "){
sep="\\s";
}else{
if(sep=="?"){
sep="\\s\\xa0";
}
}
var grp=_d5e.groupSize,grp2=_d5e.groupSize2;
if(grp2){
var _d61="(?:0|[1-9]\\d{0,"+(grp2-1)+"}(?:["+sep+"]\\d{"+grp2+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-grp2)>0)?"(?:"+_d61+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_d61;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _d5f+_d60;
};
dojo.provide("dijit.form.NumberTextBox");
dojo.declare("dijit.form.NumberTextBoxMixin",null,{regExpGen:dojo.number.regexp,value:NaN,editOptions:{pattern:"#.######"},_formatter:dojo.number.format,_setConstraintsAttr:function(_d62){
var _d63=typeof _d62.places=="number"?_d62.places:0;
if(_d63){
_d63++;
}
if(typeof _d62.max!="number"){
_d62.max=9*Math.pow(10,15-_d63);
}
if(typeof _d62.min!="number"){
_d62.min=-9*Math.pow(10,15-_d63);
}
this.inherited(arguments,[_d62]);
if(this.focusNode&&this.focusNode.value&&!isNaN(this.value)){
this.set("value",this.value);
}
},_onFocus:function(){
if(this.disabled){
return;
}
var val=this.get("value");
if(typeof val=="number"&&!isNaN(val)){
var _d64=this.format(val,this.constraints);
if(_d64!==undefined){
this.textbox.value=_d64;
}
}
this.inherited(arguments);
},format:function(_d65,_d66){
var _d67=String(_d65);
if(typeof _d65!="number"){
return _d67;
}
if(isNaN(_d65)){
return "";
}
if(!("rangeCheck" in this&&this.rangeCheck(_d65,_d66))&&_d66.exponent!==false&&/\de[-+]?\d/i.test(_d67)){
return _d67;
}
if(this.editOptions&&this._focused){
_d66=dojo.mixin({},_d66,this.editOptions);
}
return this._formatter(_d65,_d66);
},_parser:dojo.number.parse,parse:function(_d68,_d69){
var v=this._parser(_d68,dojo.mixin({},_d69,(this.editOptions&&this._focused)?this.editOptions:{}));
if(this.editOptions&&this._focused&&isNaN(v)){
v=this._parser(_d68,_d69);
}
return v;
},_getDisplayedValueAttr:function(){
var v=this.inherited(arguments);
return isNaN(v)?this.textbox.value:v;
},filter:function(_d6a){
return (_d6a===null||_d6a===""||_d6a===undefined)?NaN:this.inherited(arguments);
},serialize:function(_d6b,_d6c){
return (typeof _d6b!="number"||isNaN(_d6b))?"":this.inherited(arguments);
},_setBlurValue:function(){
var val=dojo.hitch(dojo.mixin({},this,{_focused:true}),"get")("value");
this._setValueAttr(val,true);
},_setValueAttr:function(_d6d,_d6e,_d6f){
if(_d6d!==undefined&&_d6f===undefined){
_d6f=String(_d6d);
if(typeof _d6d=="number"){
if(isNaN(_d6d)){
_d6f="";
}else{
if(("rangeCheck" in this&&this.rangeCheck(_d6d,this.constraints))||this.constraints.exponent===false||!/\de[-+]?\d/i.test(_d6f)){
_d6f=undefined;
}
}
}else{
if(!_d6d){
_d6f="";
_d6d=NaN;
}else{
_d6d=undefined;
}
}
}
this.inherited(arguments,[_d6d,_d6e,_d6f]);
},_getValueAttr:function(){
var v=this.inherited(arguments);
if(isNaN(v)&&this.textbox.value!==""){
if(this.constraints.exponent!==false&&/\de[-+]?\d/i.test(this.textbox.value)&&(new RegExp("^"+dojo.number._realNumberRegexp(dojo.mixin({},this.constraints))+"$").test(this.textbox.value))){
var n=Number(this.textbox.value);
return isNaN(n)?undefined:n;
}else{
return undefined;
}
}else{
return v;
}
},isValid:function(_d70){
if(!this._focused||this._isEmpty(this.textbox.value)){
return this.inherited(arguments);
}else{
var v=this.get("value");
if(!isNaN(v)&&this.rangeCheck(v,this.constraints)){
if(this.constraints.exponent!==false&&/\de[-+]?\d/i.test(this.textbox.value)){
return true;
}else{
return this.inherited(arguments);
}
}else{
return false;
}
}
}});
dojo.declare("dijit.form.NumberTextBox",[dijit.form.RangeBoundTextBox,dijit.form.NumberTextBoxMixin],{baseClass:"dijitTextBox dijitNumberTextBox"});
dojo.provide("dijit.form.NumberSpinner");
dojo.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{adjust:function(val,_d71){
var tc=this.constraints,v=isNaN(val),_d72=!isNaN(tc.max),_d73=!isNaN(tc.min);
if(v&&_d71!=0){
val=(_d71>0)?_d73?tc.min:_d72?tc.max:0:_d72?this.constraints.max:_d73?tc.min:0;
}
var _d74=val+_d71;
if(v||isNaN(_d74)){
return val;
}
if(_d72&&(_d74>tc.max)){
_d74=tc.max;
}
if(_d73&&(_d74<tc.min)){
_d74=tc.min;
}
return _d74;
},_onKeyPress:function(e){
if((e.charOrCode==dojo.keys.HOME||e.charOrCode==dojo.keys.END)&&!(e.ctrlKey||e.altKey||e.metaKey)&&typeof this.get("value")!="undefined"){
var _d75=this.constraints[(e.charOrCode==dojo.keys.HOME?"min":"max")];
if(typeof _d75=="number"){
this._setValueAttr(_d75,false);
}
dojo.stopEvent(e);
}
}});
dojo.provide("dojo.cldr.monetary");
dojo.getObject("cldr.monetary",true,dojo);
dojo.cldr.monetary.getData=function(code){
var _d76={ADP:0,AFN:0,ALL:0,AMD:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,COP:0,CRC:0,DJF:0,ESP:0,GNF:0,GYD:0,HUF:0,IDR:0,IQD:0,IRR:3,ISK:0,ITL:0,JOD:3,JPY:0,KMF:0,KPW:0,KRW:0,KWD:3,LAK:0,LBP:0,LUF:0,LYD:3,MGA:0,MGF:0,MMK:0,MNT:0,MRO:0,MUR:0,OMR:3,PKR:0,PYG:0,RSD:0,RWF:0,SLL:0,SOS:0,STD:0,SYP:0,TMM:0,TND:3,TRL:0,TZS:0,UGX:0,UZS:0,VND:0,VUV:0,XAF:0,XOF:0,XPF:0,YER:0,ZMK:0,ZWD:0};
var _d77={CHF:5};
var _d78=_d76[code],_d79=_d77[code];
if(typeof _d78=="undefined"){
_d78=2;
}
if(typeof _d79=="undefined"){
_d79=0;
}
return {places:_d78,round:_d79};
};
dojo.provide("dojo.currency");
dojo.getObject("currency",true,dojo);
dojo.currency._mixInDefaults=function(_d7a){
_d7a=_d7a||{};
_d7a.type="currency";
var _d7b=dojo.i18n.getLocalization("dojo.cldr","currency",_d7a.locale)||{};
var iso=_d7a.currency;
var data=dojo.cldr.monetary.getData(iso);
dojo.forEach(["displayName","symbol","group","decimal"],function(prop){
data[prop]=_d7b[iso+"_"+prop];
});
data.fractional=[true,false];
return dojo.mixin(data,_d7a);
};
dojo.currency.format=function(_d7c,_d7d){
return dojo.number.format(_d7c,dojo.currency._mixInDefaults(_d7d));
};
dojo.currency.regexp=function(_d7e){
return dojo.number.regexp(dojo.currency._mixInDefaults(_d7e));
};
dojo.currency.parse=function(_d7f,_d80){
return dojo.number.parse(_d7f,dojo.currency._mixInDefaults(_d80));
};
dojo.provide("dijit.form.CurrencyTextBox");
dojo.declare("dijit.form.CurrencyTextBox",dijit.form.NumberTextBox,{currency:"",baseClass:"dijitTextBox dijitCurrencyTextBox",regExpGen:function(_d81){
return "("+(this._focused?this.inherited(arguments,[dojo.mixin({},_d81,this.editOptions)])+"|":"")+dojo.currency.regexp(_d81)+")";
},_formatter:dojo.currency.format,_parser:dojo.currency.parse,parse:function(_d82,_d83){
var v=this.inherited(arguments);
if(isNaN(v)&&/\d+/.test(_d82)){
v=dojo.hitch(dojo.mixin({},this,{_parser:dijit.form.NumberTextBox.prototype._parser}),"inherited")(arguments);
}
return v;
},_setConstraintsAttr:function(_d84){
if(!_d84.currency&&this.currency){
_d84.currency=this.currency;
}
this.inherited(arguments,[dojo.currency._mixInDefaults(dojo.mixin(_d84,{exponent:false}))]);
}});
dojo.provide("dijit.form.HorizontalSlider");
dojo.declare("dijit.form.HorizontalSlider",[dijit.form._FormValueWidget,dijit._Container],{templateString:dojo.cache("dijit.form","templates/HorizontalSlider.html","<table class=\"dijit dijitReset dijitSlider dijitSliderH\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" dojoAttachEvent=\"onkeypress:_onKeyPress,onkeyup:_onKeyUp\"\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td dojoAttachPoint=\"topDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationT dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderDecrementIconH\" style=\"display:none\" dojoAttachPoint=\"decrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderLeftBumper\" dojoAttachEvent=\"onmousedown:_onClkDecBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><input dojoAttachPoint=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\n\t\t\t/><div class=\"dijitReset dijitSliderBarContainerH\" role=\"presentation\" dojoAttachPoint=\"sliderBarContainer\"\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"progressBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderProgressBar dijitSliderProgressBarH\" dojoAttachEvent=\"onmousedown:_onBarClick\"\n\t\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableH\"\n\t\t\t\t\t\t><div dojoAttachPoint=\"sliderHandle,focusNode\" class=\"dijitSliderImageHandle dijitSliderImageHandleH\" dojoAttachEvent=\"onmousedown:_onHandleClick\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"></div\n\t\t\t\t\t></div\n\t\t\t\t></div\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderRemainingBar dijitSliderRemainingBarH\" dojoAttachEvent=\"onmousedown:_onBarClick\"></div\n\t\t\t></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderRightBumper\" dojoAttachEvent=\"onmousedown:_onClkIncBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderIncrementIconH\" style=\"display:none\" dojoAttachPoint=\"incrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\n\t\t></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td dojoAttachPoint=\"containerNode,bottomDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationB dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n></table>\n"),value:0,showButtons:true,minimum:0,maximum:100,discreteValues:Infinity,pageIncrement:2,clickSelect:true,slideDuration:dijit.defaultDuration,widgetsInTemplate:true,attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{id:""}),baseClass:"dijitSlider",cssStateNodes:{incrementButton:"dijitSliderIncrementButton",decrementButton:"dijitSliderDecrementButton",focusNode:"dijitSliderThumb"},_mousePixelCoord:"pageX",_pixelCount:"w",_startingPixelCoord:"x",_startingPixelCount:"l",_handleOffsetCoord:"left",_progressPixelSize:"width",_onKeyUp:function(e){
if(this.disabled||this.readOnly||e.altKey||e.ctrlKey||e.metaKey){
return;
}
this._setValueAttr(this.value,true);
},_onKeyPress:function(e){
if(this.disabled||this.readOnly||e.altKey||e.ctrlKey||e.metaKey){
return;
}
switch(e.charOrCode){
case dojo.keys.HOME:
this._setValueAttr(this.minimum,false);
break;
case dojo.keys.END:
this._setValueAttr(this.maximum,false);
break;
case ((this._descending||this.isLeftToRight())?dojo.keys.RIGHT_ARROW:dojo.keys.LEFT_ARROW):
case (this._descending===false?dojo.keys.DOWN_ARROW:dojo.keys.UP_ARROW):
case (this._descending===false?dojo.keys.PAGE_DOWN:dojo.keys.PAGE_UP):
this.increment(e);
break;
case ((this._descending||this.isLeftToRight())?dojo.keys.LEFT_ARROW:dojo.keys.RIGHT_ARROW):
case (this._descending===false?dojo.keys.UP_ARROW:dojo.keys.DOWN_ARROW):
case (this._descending===false?dojo.keys.PAGE_UP:dojo.keys.PAGE_DOWN):
this.decrement(e);
break;
default:
return;
}
dojo.stopEvent(e);
},_onHandleClick:function(e){
if(this.disabled||this.readOnly){
return;
}
if(!dojo.isIE){
dijit.focus(this.sliderHandle);
}
dojo.stopEvent(e);
},_isReversed:function(){
return !this.isLeftToRight();
},_onBarClick:function(e){
if(this.disabled||this.readOnly||!this.clickSelect){
return;
}
dijit.focus(this.sliderHandle);
dojo.stopEvent(e);
var _d85=dojo.position(this.sliderBarContainer,true);
var _d86=e[this._mousePixelCoord]-_d85[this._startingPixelCoord];
this._setPixelValue(this._isReversed()?(_d85[this._pixelCount]-_d86):_d86,_d85[this._pixelCount],true);
this._movable.onMouseDown(e);
},_setPixelValue:function(_d87,_d88,_d89){
if(this.disabled||this.readOnly){
return;
}
_d87=_d87<0?0:_d88<_d87?_d88:_d87;
var _d8a=this.discreteValues;
if(_d8a<=1||_d8a==Infinity){
_d8a=_d88;
}
_d8a--;
var _d8b=_d88/_d8a;
var _d8c=Math.round(_d87/_d8b);
this._setValueAttr((this.maximum-this.minimum)*_d8c/_d8a+this.minimum,_d89);
},_setValueAttr:function(_d8d,_d8e){
this._set("value",_d8d);
this.valueNode.value=_d8d;
dijit.setWaiState(this.focusNode,"valuenow",_d8d);
this.inherited(arguments);
var _d8f=(_d8d-this.minimum)/(this.maximum-this.minimum);
var _d90=(this._descending===false)?this.remainingBar:this.progressBar;
var _d91=(this._descending===false)?this.progressBar:this.remainingBar;
if(this._inProgressAnim&&this._inProgressAnim.status!="stopped"){
this._inProgressAnim.stop(true);
}
if(_d8e&&this.slideDuration>0&&_d90.style[this._progressPixelSize]){
var _d92=this;
var _d93={};
var _d94=parseFloat(_d90.style[this._progressPixelSize]);
var _d95=this.slideDuration*(_d8f-_d94/100);
if(_d95==0){
return;
}
if(_d95<0){
_d95=0-_d95;
}
_d93[this._progressPixelSize]={start:_d94,end:_d8f*100,units:"%"};
this._inProgressAnim=dojo.animateProperty({node:_d90,duration:_d95,onAnimate:function(v){
_d91.style[_d92._progressPixelSize]=(100-parseFloat(v[_d92._progressPixelSize]))+"%";
},onEnd:function(){
delete _d92._inProgressAnim;
},properties:_d93});
this._inProgressAnim.play();
}else{
_d90.style[this._progressPixelSize]=(_d8f*100)+"%";
_d91.style[this._progressPixelSize]=((1-_d8f)*100)+"%";
}
},_bumpValue:function(_d96,_d97){
if(this.disabled||this.readOnly){
return;
}
var s=dojo.getComputedStyle(this.sliderBarContainer);
var c=dojo._getContentBox(this.sliderBarContainer,s);
var _d98=this.discreteValues;
if(_d98<=1||_d98==Infinity){
_d98=c[this._pixelCount];
}
_d98--;
var _d99=(this.value-this.minimum)*_d98/(this.maximum-this.minimum)+_d96;
if(_d99<0){
_d99=0;
}
if(_d99>_d98){
_d99=_d98;
}
_d99=_d99*(this.maximum-this.minimum)/_d98+this.minimum;
this._setValueAttr(_d99,_d97);
},_onClkBumper:function(val){
if(this.disabled||this.readOnly||!this.clickSelect){
return;
}
this._setValueAttr(val,true);
},_onClkIncBumper:function(){
this._onClkBumper(this._descending===false?this.minimum:this.maximum);
},_onClkDecBumper:function(){
this._onClkBumper(this._descending===false?this.maximum:this.minimum);
},decrement:function(e){
this._bumpValue(e.charOrCode==dojo.keys.PAGE_DOWN?-this.pageIncrement:-1);
},increment:function(e){
this._bumpValue(e.charOrCode==dojo.keys.PAGE_UP?this.pageIncrement:1);
},_mouseWheeled:function(evt){
dojo.stopEvent(evt);
var _d9a=!dojo.isMozilla;
var _d9b=evt[(_d9a?"wheelDelta":"detail")]*(_d9a?1:-1);
this._bumpValue(_d9b<0?-1:1,true);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_d9c){
if(this[_d9c.container]!=this.containerNode){
this[_d9c.container].appendChild(_d9c.domNode);
}
},this);
this.inherited(arguments);
},_typematicCallback:function(_d9d,_d9e,e){
if(_d9d==-1){
this._setValueAttr(this.value,true);
}else{
this[(_d9e==(this._descending?this.incrementButton:this.decrementButton))?"decrement":"increment"](e);
}
},buildRendering:function(){
this.inherited(arguments);
if(this.showButtons){
this.incrementButton.style.display="";
this.decrementButton.style.display="";
}
var _d9f=dojo.query("label[for=\""+this.id+"\"]");
if(_d9f.length){
_d9f[0].id=(this.id+"_label");
dijit.setWaiState(this.focusNode,"labelledby",_d9f[0].id);
}
dijit.setWaiState(this.focusNode,"valuemin",this.minimum);
dijit.setWaiState(this.focusNode,"valuemax",this.maximum);
},postCreate:function(){
this.inherited(arguments);
if(this.showButtons){
this._connects.push(dijit.typematic.addMouseListener(this.decrementButton,this,"_typematicCallback",25,500));
this._connects.push(dijit.typematic.addMouseListener(this.incrementButton,this,"_typematicCallback",25,500));
}
this.connect(this.domNode,!dojo.isMozilla?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
var _da0=dojo.declare(dijit.form._SliderMover,{widget:this});
this._movable=new dojo.dnd.Moveable(this.sliderHandle,{mover:_da0});
this._layoutHackIE7();
},destroy:function(){
this._movable.destroy();
if(this._inProgressAnim&&this._inProgressAnim.status!="stopped"){
this._inProgressAnim.stop(true);
}
this._supportingWidgets=dijit.findWidgets(this.domNode);
this.inherited(arguments);
}});
dojo.declare("dijit.form._SliderMover",dojo.dnd.Mover,{onMouseMove:function(e){
var _da1=this.widget;
var _da2=_da1._abspos;
if(!_da2){
_da2=_da1._abspos=dojo.position(_da1.sliderBarContainer,true);
_da1._setPixelValue_=dojo.hitch(_da1,"_setPixelValue");
_da1._isReversed_=_da1._isReversed();
}
var _da3=e.touches?e.touches[0]:e,_da4=_da3[_da1._mousePixelCoord]-_da2[_da1._startingPixelCoord];
_da1._setPixelValue_(_da1._isReversed_?(_da2[_da1._pixelCount]-_da4):_da4,_da2[_da1._pixelCount],false);
},destroy:function(e){
dojo.dnd.Mover.prototype.destroy.apply(this,arguments);
var _da5=this.widget;
_da5._abspos=null;
_da5._setValueAttr(_da5.value,true);
}});
dojo.provide("dojox.grid.cells.dijit");
(function(){
var dgc=dojox.grid.cells;
dojo.declare("dojox.grid.cells._Widget",dgc._Base,{widgetClass:dijit.form.TextBox,constructor:function(_da6){
this.widget=null;
if(typeof this.widgetClass=="string"){
dojo.deprecated("Passing a string to widgetClass is deprecated","pass the widget class object instead","2.0");
this.widgetClass=dojo.getObject(this.widgetClass);
}
},formatEditing:function(_da7,_da8){
this.needFormatNode(_da7,_da8);
return "<div></div>";
},getValue:function(_da9){
return this.widget.get("value");
},setValue:function(_daa,_dab){
if(this.widget&&this.widget.set){
if(this.widget.onLoadDeferred){
var self=this;
this.widget.onLoadDeferred.addCallback(function(){
self.widget.set("value",_dab===null?"":_dab);
});
}else{
this.widget.set("value",_dab);
}
}else{
this.inherited(arguments);
}
},getWidgetProps:function(_dac){
return dojo.mixin({dir:this.dir,lang:this.lang},this.widgetProps||{},{constraints:dojo.mixin({},this.constraint)||{},value:_dac});
},createWidget:function(_dad,_dae,_daf){
return new this.widgetClass(this.getWidgetProps(_dae),_dad);
},attachWidget:function(_db0,_db1,_db2){
_db0.appendChild(this.widget.domNode);
this.setValue(_db2,_db1);
},formatNode:function(_db3,_db4,_db5){
if(!this.widgetClass){
return _db4;
}
if(!this.widget){
this.widget=this.createWidget.apply(this,arguments);
}else{
this.attachWidget.apply(this,arguments);
}
this.sizeWidget.apply(this,arguments);
this.grid.views.renormalizeRow(_db5);
this.grid.scroller.rowHeightChanged(_db5,true);
this.focus();
return undefined;
},sizeWidget:function(_db6,_db7,_db8){
var p=this.getNode(_db8),box=dojo.contentBox(p);
dojo.marginBox(this.widget.domNode,{w:box.w});
},focus:function(_db9,_dba){
if(this.widget){
setTimeout(dojo.hitch(this.widget,function(){
dojox.grid.util.fire(this,"focus");
}),0);
}
},_finish:function(_dbb){
this.inherited(arguments);
dojox.grid.util.removeNode(this.widget.domNode);
if(dojo.isIE){
dojo.setSelectable(this.widget.domNode,true);
}
}});
dgc._Widget.markupFactory=function(node,cell){
dgc._Base.markupFactory(node,cell);
var d=dojo;
var _dbc=d.trim(d.attr(node,"widgetProps")||"");
var _dbd=d.trim(d.attr(node,"constraint")||"");
var _dbe=d.trim(d.attr(node,"widgetClass")||"");
if(_dbc){
cell.widgetProps=d.fromJson(_dbc);
}
if(_dbd){
cell.constraint=d.fromJson(_dbd);
}
if(_dbe){
cell.widgetClass=d.getObject(_dbe);
}
};
dojo.declare("dojox.grid.cells.ComboBox",dgc._Widget,{widgetClass:dijit.form.ComboBox,getWidgetProps:function(_dbf){
var _dc0=[];
dojo.forEach(this.options,function(o){
_dc0.push({name:o,value:o});
});
var _dc1=new dojo.data.ItemFileReadStore({data:{identifier:"name",items:_dc0}});
return dojo.mixin({},this.widgetProps||{},{value:_dbf,store:_dc1});
},getValue:function(){
var e=this.widget;
e.set("displayedValue",e.get("displayedValue"));
return e.get("value");
}});
dgc.ComboBox.markupFactory=function(node,cell){
dgc._Widget.markupFactory(node,cell);
var d=dojo;
var _dc2=d.trim(d.attr(node,"options")||"");
if(_dc2){
var o=_dc2.split(",");
if(o[0]!=_dc2){
cell.options=o;
}
}
};
dojo.declare("dojox.grid.cells.DateTextBox",dgc._Widget,{widgetClass:dijit.form.DateTextBox,setValue:function(_dc3,_dc4){
if(this.widget){
this.widget.set("value",new Date(_dc4));
}else{
this.inherited(arguments);
}
},getWidgetProps:function(_dc5){
return dojo.mixin(this.inherited(arguments),{value:new Date(_dc5)});
}});
dgc.DateTextBox.markupFactory=function(node,cell){
dgc._Widget.markupFactory(node,cell);
};
dojo.declare("dojox.grid.cells.CheckBox",dgc._Widget,{widgetClass:dijit.form.CheckBox,getValue:function(){
return this.widget.checked;
},setValue:function(_dc6,_dc7){
if(this.widget&&this.widget.attributeMap.checked){
this.widget.set("checked",_dc7);
}else{
this.inherited(arguments);
}
},sizeWidget:function(_dc8,_dc9,_dca){
return;
}});
dgc.CheckBox.markupFactory=function(node,cell){
dgc._Widget.markupFactory(node,cell);
};
dojo.declare("dojox.grid.cells.Editor",dgc._Widget,{widgetClass:dijit.Editor,getWidgetProps:function(_dcb){
return dojo.mixin({},this.widgetProps||{},{height:this.widgetHeight||"100px"});
},createWidget:function(_dcc,_dcd,_dce){
var _dcf=new this.widgetClass(this.getWidgetProps(_dcd),_dcc);
dojo.connect(_dcf,"onLoad",dojo.hitch(this,"populateEditor"));
return _dcf;
},formatNode:function(_dd0,_dd1,_dd2){
this.content=_dd1;
this.inherited(arguments);
if(dojo.isMoz){
var e=this.widget;
e.open();
if(this.widgetToolbar){
dojo.place(e.toolbar.domNode,e.editingArea,"before");
}
}
},populateEditor:function(){
this.widget.set("value",this.content);
this.widget.placeCursorAtEnd();
}});
dgc.Editor.markupFactory=function(node,cell){
dgc._Widget.markupFactory(node,cell);
var d=dojo;
var h=dojo.trim(dojo.attr(node,"widgetHeight")||"");
if(h){
if((h!="auto")&&(h.substr(-2)!="em")){
h=parseInt(h,10)+"px";
}
cell.widgetHeight=h;
}
};
})();
dojo.provide("dojox.fx._base");
dojo.mixin(dojox.fx,{anim:dojo.anim,animateProperty:dojo.animateProperty,fadeTo:dojo._fade,fadeIn:dojo.fadeIn,fadeOut:dojo.fadeOut,combine:dojo.fx.combine,chain:dojo.fx.chain,slideTo:dojo.fx.slideTo,wipeIn:dojo.fx.wipeIn,wipeOut:dojo.fx.wipeOut});
dojox.fx.sizeTo=function(args){
var node=args.node=dojo.byId(args.node),abs="absolute";
var _dd3=args.method||"chain";
if(!args.duration){
args.duration=500;
}
if(_dd3=="chain"){
args.duration=Math.floor(args.duration/2);
}
var top,_dd4,left,_dd5,_dd6,_dd7=null;
var init=(function(n){
return function(){
var cs=dojo.getComputedStyle(n),pos=cs.position,w=cs.width,h=cs.height;
top=(pos==abs?n.offsetTop:parseInt(cs.top)||0);
left=(pos==abs?n.offsetLeft:parseInt(cs.left)||0);
_dd6=(w=="auto"?0:parseInt(w));
_dd7=(h=="auto"?0:parseInt(h));
_dd5=left-Math.floor((args.width-_dd6)/2);
_dd4=top-Math.floor((args.height-_dd7)/2);
if(pos!=abs&&pos!="relative"){
var ret=dojo.coords(n,true);
top=ret.y;
left=ret.x;
n.style.position=abs;
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
var _dd8=dojo.animateProperty(dojo.mixin({properties:{height:function(){
init();
return {end:args.height||0,start:_dd7};
},top:function(){
return {start:top,end:_dd4};
}}},args));
var _dd9=dojo.animateProperty(dojo.mixin({properties:{width:function(){
return {start:_dd6,end:args.width||0};
},left:function(){
return {start:left,end:_dd5};
}}},args));
var anim=dojo.fx[(args.method=="combine"?"combine":"chain")]([_dd8,_dd9]);
return anim;
};
dojox.fx.slideBy=function(args){
var node=args.node=dojo.byId(args.node),top,left;
var init=(function(n){
return function(){
var cs=dojo.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=dojo.coords(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
init();
var _dda=dojo.animateProperty(dojo.mixin({properties:{top:top+(args.top||0),left:left+(args.left||0)}},args));
dojo.connect(_dda,"beforeBegin",_dda,init);
return _dda;
};
dojox.fx.crossFade=function(args){
var _ddb=args.nodes[0]=dojo.byId(args.nodes[0]),op1=dojo.style(_ddb,"opacity"),_ddc=args.nodes[1]=dojo.byId(args.nodes[1]),op2=dojo.style(_ddc,"opacity");
var _ddd=dojo.fx.combine([dojo[(op1==0?"fadeIn":"fadeOut")](dojo.mixin({node:_ddb},args)),dojo[(op1==0?"fadeOut":"fadeIn")](dojo.mixin({node:_ddc},args))]);
return _ddd;
};
dojox.fx.highlight=function(args){
var node=args.node=dojo.byId(args.node);
args.duration=args.duration||400;
var _dde=args.color||"#ffff99",_ddf=dojo.style(node,"backgroundColor");
if(_ddf=="rgba(0, 0, 0, 0)"){
_ddf="transparent";
}
var anim=dojo.animateProperty(dojo.mixin({properties:{backgroundColor:{start:_dde,end:_ddf}}},args));
if(_ddf=="transparent"){
dojo.connect(anim,"onEnd",anim,function(){
node.style.backgroundColor=_ddf;
});
}
return anim;
};
dojox.fx.wipeTo=function(args){
args.node=dojo.byId(args.node);
var node=args.node,s=node.style;
var dir=(args.width?"width":"height"),_de0=args[dir],_de1={};
_de1[dir]={start:function(){
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s[dir]="1px";
s.display="";
s.visibility="";
return 1;
}else{
var now=dojo.style(node,dir);
return Math.max(now,1);
}
},end:_de0};
var anim=dojo.animateProperty(dojo.mixin({properties:_de1},args));
return anim;
};
dojo.provide("dojox.image.Lightbox");
dojo.experimental("dojox.image.Lightbox");
dojo.declare("dojox.image.Lightbox",dijit._Widget,{group:"",title:"",href:"",duration:500,modal:false,_allowPassthru:false,_attachedDialog:null,startup:function(){
this.inherited(arguments);
var tmp=dijit.byId("dojoxLightboxDialog");
if(tmp){
this._attachedDialog=tmp;
}else{
this._attachedDialog=new dojox.image.LightboxDialog({id:"dojoxLightboxDialog"});
this._attachedDialog.startup();
}
if(!this.store){
this._addSelf();
this.connect(this.domNode,"onclick","_handleClick");
}
},_addSelf:function(){
this._attachedDialog.addImage({href:this.href,title:this.title},this.group||null);
},_handleClick:function(e){
if(!this._allowPassthru){
e.preventDefault();
}else{
return;
}
this.show();
},show:function(){
this._attachedDialog.show(this);
},hide:function(){
this._attachedDialog.hide();
},disable:function(){
this._allowPassthru=true;
},enable:function(){
this._allowPassthru=false;
},onClick:function(){
},destroy:function(){
this._attachedDialog.removeImage(this);
this.inherited(arguments);
}});
dojo.declare("dojox.image.LightboxDialog",dijit.Dialog,{title:"",inGroup:null,imgUrl:dijit._Widget.prototype._blankGif,errorMessage:"Image not found.",adjust:true,modal:false,errorImg:dojo.moduleUrl("dojox.image","resources/images/warning.png"),templateString:dojo.cache("dojox.image","resources/Lightbox.html","<div class=\"dojoxLightbox\" dojoAttachPoint=\"containerNode\">\n\t<div style=\"position:relative\">\n\t\t<div dojoAttachPoint=\"imageContainer\" class=\"dojoxLightboxContainer\" dojoAttachEvent=\"onclick: _onImageClick\">\n\t\t\t<img dojoAttachPoint=\"imgNode\" src=\"${imgUrl}\" class=\"dojoxLightboxImage\" alt=\"${title}\">\n\t\t\t<div class=\"dojoxLightboxFooter\" dojoAttachPoint=\"titleNode\">\n\t\t\t\t<div class=\"dijitInline LightboxClose\" dojoAttachPoint=\"closeButtonNode\"></div>\n\t\t\t\t<div class=\"dijitInline LightboxNext\" dojoAttachPoint=\"nextButtonNode\"></div>\t\n\t\t\t\t<div class=\"dijitInline LightboxPrev\" dojoAttachPoint=\"prevButtonNode\"></div>\n\t\t\t\t<div class=\"dojoxLightboxText\" dojoAttachPoint=\"titleTextNode\"><span dojoAttachPoint=\"textNode\">${title}</span><span dojoAttachPoint=\"groupCount\" class=\"dojoxLightboxGroupText\"></span></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"),constructor:function(args){
this._groups=this._groups||(args&&args._groups)||{XnoGroupX:[]};
},startup:function(){
this.inherited(arguments);
this._animConnects=[];
this.connect(this.nextButtonNode,"onclick","_nextImage");
this.connect(this.prevButtonNode,"onclick","_prevImage");
this.connect(this.closeButtonNode,"onclick","hide");
this._makeAnims();
this._vp=dojo.window.getBox();
return this;
},show:function(_de2){
var _de3=this;
this._lastGroup=_de2;
if(!_de3.open){
_de3.inherited(arguments);
_de3._modalconnects.push(dojo.connect(dojo.global,"onscroll",this,"_position"),dojo.connect(dojo.global,"onresize",this,"_position"),dojo.connect(dojo.body(),"onkeypress",this,"_handleKey"));
if(!_de2.modal){
_de3._modalconnects.push(dojo.connect(dijit._underlay.domNode,"onclick",this,"onCancel"));
}
}
if(this._wasStyled){
var _de4=dojo.create("img",null,_de3.imgNode,"after");
dojo.destroy(_de3.imgNode);
_de3.imgNode=_de4;
_de3._makeAnims();
_de3._wasStyled=false;
}
dojo.style(_de3.imgNode,"opacity","0");
dojo.style(_de3.titleNode,"opacity","0");
var src=_de2.href;
if((_de2.group&&_de2!=="XnoGroupX")||_de3.inGroup){
if(!_de3.inGroup){
_de3.inGroup=_de3._groups[(_de2.group)];
dojo.forEach(_de3.inGroup,function(g,i){
if(g.href==_de2.href){
_de3._index=i;
}
});
}
if(!_de3._index){
_de3._index=0;
var sr=_de3.inGroup[_de3._index];
src=(sr&&sr.href)||_de3.errorImg;
}
_de3.groupCount.innerHTML=" ("+(_de3._index+1)+" of "+Math.max(1,_de3.inGroup.length)+")";
_de3.prevButtonNode.style.visibility="visible";
_de3.nextButtonNode.style.visibility="visible";
}else{
_de3.groupCount.innerHTML="";
_de3.prevButtonNode.style.visibility="hidden";
_de3.nextButtonNode.style.visibility="hidden";
}
if(!_de2.leaveTitle){
_de3.textNode.innerHTML=_de2.title;
}
_de3._ready(src);
},_ready:function(src){
var _de5=this;
_de5._imgError=dojo.connect(_de5.imgNode,"error",_de5,function(){
dojo.disconnect(_de5._imgError);
_de5.imgNode.src=_de5.errorImg;
_de5.textNode.innerHTML=_de5.errorMessage;
});
_de5._imgConnect=dojo.connect(_de5.imgNode,"load",_de5,function(e){
_de5.resizeTo({w:_de5.imgNode.width,h:_de5.imgNode.height,duration:_de5.duration});
dojo.disconnect(_de5._imgConnect);
if(_de5._imgError){
dojo.disconnect(_de5._imgError);
}
});
_de5.imgNode.src=src;
},_nextImage:function(){
if(!this.inGroup){
return;
}
if(this._index+1<this.inGroup.length){
this._index++;
}else{
this._index=0;
}
this._loadImage();
},_prevImage:function(){
if(this.inGroup){
if(this._index==0){
this._index=this.inGroup.length-1;
}else{
this._index--;
}
this._loadImage();
}
},_loadImage:function(){
this._loadingAnim.play(1);
},_prepNodes:function(){
this._imageReady=false;
if(this.inGroup&&this.inGroup[this._index]){
this.show({href:this.inGroup[this._index].href,title:this.inGroup[this._index].title});
}else{
this.show({title:this.errorMessage,href:this.errorImg});
}
},_calcTitleSize:function(){
var _de6=dojo.map(dojo.query("> *",this.titleNode).position(),function(s){
return s.h;
});
return {h:Math.max.apply(Math,_de6)};
},resizeTo:function(size,_de7){
var _de8=dojo.boxModel=="border-box"?dojo._getBorderExtents(this.domNode).w:0,_de9=_de7||this._calcTitleSize();
this._lastTitleSize=_de9;
if(this.adjust&&(size.h+_de9.h+_de8+80>this._vp.h||size.w+_de8+60>this._vp.w)){
this._lastSize=size;
size=this._scaleToFit(size);
}
this._currentSize=size;
var _dea=dojox.fx.sizeTo({node:this.containerNode,duration:size.duration||this.duration,width:size.w+_de8,height:size.h+_de9.h+_de8});
this.connect(_dea,"onEnd","_showImage");
_dea.play(15);
},_scaleToFit:function(size){
var ns={},nvp={w:this._vp.w-80,h:this._vp.h-60-this._lastTitleSize.h};
var _deb=nvp.w/nvp.h,_dec=size.w/size.h;
if(_dec>=_deb){
ns.h=nvp.w/_dec;
ns.w=nvp.w;
}else{
ns.w=_dec*nvp.h;
ns.h=nvp.h;
}
this._wasStyled=true;
this._setImageSize(ns);
ns.duration=size.duration;
return ns;
},_setImageSize:function(size){
var s=this.imgNode;
s.height=size.h;
s.width=size.w;
},_size:function(){
},_position:function(e){
this._vp=dojo.window.getBox();
this.inherited(arguments);
if(e&&e.type=="resize"){
if(this._wasStyled){
this._setImageSize(this._lastSize);
this.resizeTo(this._lastSize);
}else{
if(this.imgNode.height+80>this._vp.h||this.imgNode.width+60>this._vp.h){
this.resizeTo({w:this.imgNode.width,h:this.imgNode.height});
}
}
}
},_showImage:function(){
this._showImageAnim.play(1);
},_showNav:function(){
var _ded=dojo.marginBox(this.titleNode);
if(_ded.h>this._lastTitleSize.h){
this.resizeTo(this._wasStyled?this._lastSize:this._currentSize,_ded);
}else{
this._showNavAnim.play(1);
}
},hide:function(){
dojo.fadeOut({node:this.titleNode,duration:200,onEnd:dojo.hitch(this,function(){
this.imgNode.src=this._blankGif;
})}).play(5);
this.inherited(arguments);
this.inGroup=null;
this._index=null;
},addImage:function(_dee,_def){
var g=_def;
if(!_dee.href){
return;
}
if(g){
if(!this._groups[g]){
this._groups[g]=[];
}
this._groups[g].push(_dee);
}else{
this._groups["XnoGroupX"].push(_dee);
}
},removeImage:function(_df0){
var g=_df0.group||"XnoGroupX";
dojo.every(this._groups[g],function(item,i,ar){
if(item.href==_df0.href){
ar.splice(i,1);
return false;
}
return true;
});
},removeGroup:function(_df1){
if(this._groups[_df1]){
this._groups[_df1]=[];
}
},_handleKey:function(e){
if(!this.open){
return;
}
var dk=dojo.keys;
switch(e.charOrCode){
case dk.ESCAPE:
this.hide();
break;
case dk.DOWN_ARROW:
case dk.RIGHT_ARROW:
case 78:
this._nextImage();
break;
case dk.UP_ARROW:
case dk.LEFT_ARROW:
case 80:
this._prevImage();
break;
}
},_makeAnims:function(){
dojo.forEach(this._animConnects,dojo.disconnect);
this._animConnects=[];
this._showImageAnim=dojo.fadeIn({node:this.imgNode,duration:this.duration});
this._animConnects.push(dojo.connect(this._showImageAnim,"onEnd",this,"_showNav"));
this._loadingAnim=dojo.fx.combine([dojo.fadeOut({node:this.imgNode,duration:175}),dojo.fadeOut({node:this.titleNode,duration:175})]);
this._animConnects.push(dojo.connect(this._loadingAnim,"onEnd",this,"_prepNodes"));
this._showNavAnim=dojo.fadeIn({node:this.titleNode,duration:225});
},onClick:function(_df2){
},_onImageClick:function(e){
if(e&&e.target==this.imgNode){
this.onClick(this._lastGroup);
if(this._lastGroup.declaredClass){
this._lastGroup.onClick(this._lastGroup);
}
}
}});
dojo.provide("dojox.timing._base");
dojo.experimental("dojox.timing");
dojox.timing.Timer=function(_df3){
this.timer=null;
this.isRunning=false;
this.interval=_df3;
this.onStart=null;
this.onStop=null;
};
dojo.extend(dojox.timing.Timer,{onTick:function(){
},setInterval:function(_df4){
if(this.isRunning){
window.clearInterval(this.timer);
}
this.interval=_df4;
if(this.isRunning){
this.timer=window.setInterval(dojo.hitch(this,"onTick"),this.interval);
}
},start:function(){
if(typeof this.onStart=="function"){
this.onStart();
}
this.isRunning=true;
this.timer=window.setInterval(dojo.hitch(this,"onTick"),this.interval);
},stop:function(){
if(typeof this.onStop=="function"){
this.onStop();
}
this.isRunning=false;
window.clearInterval(this.timer);
}});
dojo.provide("dojox.timing");
dojo.provide("dojox.widget.Standby");
dojo.experimental("dojox.widget.Standby");
dojo.declare("dojox.widget.Standby",[dijit._Widget,dijit._Templated],{templateString:"<div>"+"<div style=\"display: none; opacity: 0; z-index: 9999; "+"position: absolute; cursor:wait;\" dojoAttachPoint=\"_underlayNode\"></div>"+"<img src=\"${image}\" style=\"opacity: 0; display: none; z-index: -10000; "+"position: absolute; top: 0px; left: 0px; cursor:wait;\" "+"dojoAttachPoint=\"_imageNode\">"+"<div style=\"opacity: 0; display: none; z-index: -10000; position: absolute; "+"top: 0px;\" dojoAttachPoint=\"_textNode\"></div>"+"</div>",_underlayNode:null,_imageNode:null,_textNode:null,_centerNode:null,image:dojo.moduleUrl("dojox","widget/Standby/images/loading.gif").toString(),imageText:"Please Wait...",text:"Please wait...",centerIndicator:"image",_displayed:false,_resizeCheck:null,target:"",color:"#C0C0C0",duration:500,_started:false,_parent:null,zIndex:"auto",startup:function(args){
if(!this._started){
if(typeof this.target==="string"){
var w=dijit.byId(this.target);
if(w){
this.target=w.domNode;
}else{
this.target=dojo.byId(this.target);
}
}
if(this.text){
this._textNode.innerHTML=this.text;
}
if(this.centerIndicator==="image"){
this._centerNode=this._imageNode;
dojo.attr(this._imageNode,"src",this.image);
dojo.attr(this._imageNode,"alt",this.imageText);
}else{
this._centerNode=this._textNode;
}
dojo.style(this._underlayNode,{display:"none",backgroundColor:this.color});
dojo.style(this._centerNode,"display","none");
this.connect(this._underlayNode,"onclick","_ignore");
if(this.domNode.parentNode&&this.domNode.parentNode!=dojo.body()){
dojo.body().appendChild(this.domNode);
}
if(dojo.isIE==7){
this._ieFixNode=dojo.doc.createElement("div");
dojo.style(this._ieFixNode,{opacity:"0",zIndex:"-1000",position:"absolute",top:"-1000px"});
dojo.body().appendChild(this._ieFixNode);
}
}
},show:function(){
if(!this._displayed){
if(this._anim){
this._anim.stop();
delete this._anim;
}
this._displayed=true;
this._size();
this._disableOverflow();
this._fadeIn();
}
},hide:function(){
if(this._displayed){
if(this._anim){
this._anim.stop();
delete this._anim;
}
this._size();
this._fadeOut();
this._displayed=false;
if(this._resizeCheck!==null){
clearInterval(this._resizeCheck);
this._resizeCheck=null;
}
}
},isVisible:function(){
return this._displayed;
},onShow:function(){
},onHide:function(){
},uninitialize:function(){
this._displayed=false;
if(this._resizeCheck){
clearInterval(this._resizeCheck);
}
dojo.style(this._centerNode,"display","none");
dojo.style(this._underlayNode,"display","none");
if(dojo.isIE==7){
dojo.body().removeChild(this._ieFixNode);
delete this._ieFixNode;
}
if(this._anim){
this._anim.stop();
delete this._anim;
}
this.target=null;
this._imageNode=null;
this._textNode=null;
this._centerNode=null;
this.inherited(arguments);
},_size:function(){
if(this._displayed){
var dir=dojo.attr(dojo.body(),"dir");
if(dir){
dir=dir.toLowerCase();
}
var _df5;
var _df6=this._scrollerWidths();
var _df7=this.target;
var _df8=dojo.style(this._centerNode,"display");
dojo.style(this._centerNode,"display","block");
var box=dojo.position(_df7,true);
if(_df7===dojo.body()||_df7===dojo.doc){
box=dojo.window.getBox();
box.x=box.l;
box.y=box.t;
}
var _df9=dojo.marginBox(this._centerNode);
dojo.style(this._centerNode,"display",_df8);
if(this._ieFixNode){
_df5=-this._ieFixNode.offsetTop/1000;
box.x=Math.floor((box.x+0.9)/_df5);
box.y=Math.floor((box.y+0.9)/_df5);
box.w=Math.floor((box.w+0.9)/_df5);
box.h=Math.floor((box.h+0.9)/_df5);
}
var zi=dojo.style(_df7,"zIndex");
var ziUl=zi;
var ziIn=zi;
if(this.zIndex==="auto"){
if(zi!="auto"){
ziUl=parseInt(ziUl,10)+1;
ziIn=parseInt(ziIn,10)+2;
}else{
var _dfa=_df7.parentNode;
var _dfb=-100000;
while(_dfa&&_dfa!==dojo.body()){
zi=dojo.style(_dfa,"zIndex");
if(!zi||zi==="auto"){
_dfa=_dfa.parentNode;
}else{
var _dfc=parseInt(zi,10);
if(_dfb<_dfc){
_dfb=_dfc;
ziUl=_dfc+1;
ziIn=_dfc+2;
}
_dfa=_dfa.parentNode;
}
}
}
}else{
ziUl=parseInt(this.zIndex,10)+1;
ziIn=parseInt(this.zIndex,10)+2;
}
dojo.style(this._centerNode,"zIndex",ziIn);
dojo.style(this._underlayNode,"zIndex",ziUl);
var pn=_df7.parentNode;
if(pn&&pn!==dojo.body()&&_df7!==dojo.body()&&_df7!==dojo.doc){
var obh=box.h;
var obw=box.w;
var _dfd=dojo.position(pn,true);
if(this._ieFixNode){
_df5=-this._ieFixNode.offsetTop/1000;
_dfd.x=Math.floor((_dfd.x+0.9)/_df5);
_dfd.y=Math.floor((_dfd.y+0.9)/_df5);
_dfd.w=Math.floor((_dfd.w+0.9)/_df5);
_dfd.h=Math.floor((_dfd.h+0.9)/_df5);
}
_dfd.w-=pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_df6.v:0;
_dfd.h-=pn.scrollWidth>pn.clientWidth&&pn.clientWidth>0?_df6.h:0;
if(dir==="rtl"){
if(dojo.isOpera){
box.x+=pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_df6.v:0;
_dfd.x+=pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_df6.v:0;
}else{
if(dojo.isIE){
_dfd.x+=pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_df6.v:0;
}else{
if(dojo.isWebKit){
}
}
}
}
if(_dfd.w<box.w){
box.w=box.w-_dfd.w;
}
if(_dfd.h<box.h){
box.h=box.h-_dfd.h;
}
var _dfe=_dfd.y;
var _dff=_dfd.y+_dfd.h;
var bTop=box.y;
var _e00=box.y+obh;
var _e01=_dfd.x;
var _e02=_dfd.x+_dfd.w;
var _e03=box.x;
var _e04=box.x+obw;
var _e05;
if(_e00>_dfe&&bTop<_dfe){
box.y=_dfd.y;
_e05=_dfe-bTop;
var _e06=obh-_e05;
if(_e06<_dfd.h){
box.h=_e06;
}else{
box.h-=2*(pn.scrollWidth>pn.clientWidth&&pn.clientWidth>0?_df6.h:0);
}
}else{
if(bTop<_dff&&_e00>_dff){
box.h=_dff-bTop;
}else{
if(_e00<=_dfe||bTop>=_dff){
box.h=0;
}
}
}
if(_e04>_e01&&_e03<_e01){
box.x=_dfd.x;
_e05=_e01-_e03;
var _e07=obw-_e05;
if(_e07<_dfd.w){
box.w=_e07;
}else{
box.w-=2*(pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_df6.w:0);
}
}else{
if(_e03<_e02&&_e04>_e02){
box.w=_e02-_e03;
}else{
if(_e04<=_e01||_e03>=_e02){
box.w=0;
}
}
}
}
if(box.h>0&&box.w>0){
dojo.style(this._underlayNode,{display:"block",width:box.w+"px",height:box.h+"px",top:box.y+"px",left:box.x+"px"});
var _e08=["borderRadius","borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"];
this._cloneStyles(_e08);
if(!dojo.isIE){
_e08=["MozBorderRadius","MozBorderRadiusTopleft","MozBorderRadiusTopright","MozBorderRadiusBottomleft","MozBorderRadiusBottomright","WebkitBorderRadius","WebkitBorderTopLeftRadius","WebkitBorderTopRightRadius","WebkitBorderBottomLeftRadius","WebkitBorderBottomRightRadius"];
this._cloneStyles(_e08,this);
}
var _e09=(box.h/2)-(_df9.h/2);
var _e0a=(box.w/2)-(_df9.w/2);
if(box.h>=_df9.h&&box.w>=_df9.w){
dojo.style(this._centerNode,{top:(_e09+box.y)+"px",left:(_e0a+box.x)+"px",display:"block"});
}else{
dojo.style(this._centerNode,"display","none");
}
}else{
dojo.style(this._underlayNode,"display","none");
dojo.style(this._centerNode,"display","none");
}
if(this._resizeCheck===null){
var self=this;
this._resizeCheck=setInterval(function(){
self._size();
},100);
}
}
},_cloneStyles:function(list){
dojo.forEach(list,function(_e0b){
dojo.style(this._underlayNode,_e0b,dojo.style(this.target,_e0b));
},this);
},_fadeIn:function(){
var self=this;
var _e0c=dojo.animateProperty({duration:self.duration,node:self._underlayNode,properties:{opacity:{start:0,end:0.75}}});
var _e0d=dojo.animateProperty({duration:self.duration,node:self._centerNode,properties:{opacity:{start:0,end:1}},onEnd:function(){
self.onShow();
delete self._anim;
}});
this._anim=dojo.fx.combine([_e0c,_e0d]);
this._anim.play();
},_fadeOut:function(){
var self=this;
var _e0e=dojo.animateProperty({duration:self.duration,node:self._underlayNode,properties:{opacity:{start:0.75,end:0}},onEnd:function(){
dojo.style(this.node,{"display":"none","zIndex":"-1000"});
}});
var _e0f=dojo.animateProperty({duration:self.duration,node:self._centerNode,properties:{opacity:{start:1,end:0}},onEnd:function(){
dojo.style(this.node,{"display":"none","zIndex":"-1000"});
self.onHide();
self._enableOverflow();
delete self._anim;
}});
this._anim=dojo.fx.combine([_e0e,_e0f]);
this._anim.play();
},_ignore:function(_e10){
if(_e10){
dojo.stopEvent(_e10);
}
},_scrollerWidths:function(){
var div=dojo.doc.createElement("div");
dojo.style(div,{position:"absolute",opacity:0,overflow:"hidden",width:"50px",height:"50px",zIndex:"-100",top:"-200px",left:"-200px",padding:"0px",margin:"0px"});
var iDiv=dojo.doc.createElement("div");
dojo.style(iDiv,{width:"200px",height:"10px"});
div.appendChild(iDiv);
dojo.body().appendChild(div);
var b=dojo.contentBox(div);
dojo.style(div,"overflow","scroll");
var a=dojo.contentBox(div);
dojo.body().removeChild(div);
return {v:b.w-a.w,h:b.h-a.h};
},_setTextAttr:function(text){
this._textNode.innerHTML=text;
this.text=text;
},_setColorAttr:function(c){
dojo.style(this._underlayNode,"backgroundColor",c);
this.color=c;
},_setImageTextAttr:function(text){
dojo.attr(this._imageNode,"alt",text);
this.imageText=text;
},_setImageAttr:function(url){
dojo.attr(this._imageNode,"src",url);
this.image=url;
},_setCenterIndicatorAttr:function(_e11){
this.centerIndicator=_e11;
if(_e11==="image"){
this._centerNode=this._imageNode;
dojo.style(this._textNode,"display","none");
}else{
this._centerNode=this._textNode;
dojo.style(this._imageNode,"display","none");
}
},_disableOverflow:function(){
if(this.target===dojo.body()||this.target===dojo.doc){
this._overflowDisabled=true;
var body=dojo.body();
if(body.style&&body.style.overflow){
this._oldOverflow=dojo.style(body,"overflow");
}else{
this._oldOverflow="";
}
if(dojo.isIE&&!dojo.isQuirks){
if(body.parentNode&&body.parentNode.style&&body.parentNode.style.overflow){
this._oldBodyParentOverflow=body.parentNode.style.overflow;
}else{
try{
this._oldBodyParentOverflow=dojo.style(body.parentNode,"overflow");
}
catch(e){
this._oldBodyParentOverflow="scroll";
}
}
dojo.style(body.parentNode,"overflow","hidden");
}
dojo.style(body,"overflow","hidden");
}
},_enableOverflow:function(){
if(this._overflowDisabled){
delete this._overflowDisabled;
var body=dojo.body();
if(dojo.isIE&&!dojo.isQuirks){
body.parentNode.style.overflow=this._oldBodyParentOverflow;
delete this._oldBodyParentOverflow;
}
dojo.style(body,"overflow",this._oldOverflow);
if(dojo.isWebKit){
var div=dojo.create("div",{style:{height:"2px"}});
body.appendChild(div);
setTimeout(function(){
body.removeChild(div);
},0);
}
delete this._oldOverflow;
}
}});
dojo.i18n._preloadLocalizations("dojo.nls.dojo",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
if(dojo.isBrowser&&(document.readyState==="complete"||dojo.config.afterOnLoad)){
window.setTimeout(dojo._loadInit,100);
}
})();
