
var YAHOO=window.YAHOO||{};YAHOO.namespace=function(sNameSpace){if(!sNameSpace||!sNameSpace.length){return null;}
var levels=sNameSpace.split(".");var currentNS=YAHOO;for(var i=(levels[0]=="YAHOO")?1:0;i<levels.length;++i){currentNS[levels[i]]=currentNS[levels[i]]||{};currentNS=currentNS[levels[i]];}
return currentNS;};YAHOO.log=function(sMsg,sCategory){if(YAHOO.widget.Logger){YAHOO.widget.Logger.log(null,sMsg,sCategory);}else{return false;}};YAHOO.namespace("util");YAHOO.namespace("widget");YAHOO.namespace("example");