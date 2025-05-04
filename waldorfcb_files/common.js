
document.is_chrome=(navigator.userAgent.indexOf("Chrome")!=-1);document.is_opera=(/opera/i.test(navigator.userAgent));document.is_ie=(/(msie|opera|khtml)/i.test(navigator.userAgent))&&!document.is_chrome;function $(el)
{return(typeof(el)=='string'?document.getElementById(el):el);}
function $$()
{var t;if(typeof(arguments[0])=='array'){arguments=arguments[0];}
for(var i=0;i<arguments.length;i++){t=arguments[i];if(typeof(t)=='string')
arguments[i]=document.getElementById(t);}
return arguments;}
function selectall(name,checked)
{var e;var i=0;if(name.substring(name.length-1,name.length)=='*'){var name=name.substring(0,name.length-1);var a=[];var elements=document.form.elements;while((e=elements[i++]))
if(e.type=='checkbox'&&!e.disabled&&e.name.indexOf(name)==0)
a.push(e);if(checked==null){checked=true;i=0;while((e=a[i++]))
if(e.checked){checked=false;break;}}
i=0;while((e=a[i++]))
e.checked=checked;}else{var elements=document.getElementsByName(name);if(checked==null){checked=true;while((e=elements[i++]))
if(!e.disabled&&e.checked){checked=false;break;}}
i=0;while((e=elements[i++]))
if(!e.disabled)
e.checked=checked;}}
function window_scroll_x()
{return(window.scrollX==undefined)?document.body.scrollLeft:window.scrollX;}
function window_scroll_y()
{return(window.scrollY==undefined)?document.body.scrollTop:window.scrollY;}
document.form_safe_submit=function(args){var form=this.form;if(!args){args={};}
if(form&&form.loaded)
{this.form_want_submit=null;if(form.onsubmit){form.onsubmit();}
$('webtk_id').value=(args.id||'');$('webtk_value').value=(args.value||'');var t=$('webtk_prompt');if(t){t.value=(args.prompt||'');}
t=$('webtk_scroll');if(t){t.value=''+window_scroll_x()+':'+window_scroll_y();}
form.target=(args.form_target||'_self');if(args.callback){YAHOO.util.Connect.setForm(form);if(args.callback.form_data&&args.callback.form_data()===false){return false;}
YAHOO.util.Connect.asyncRequest('POST',form.action,args.callback);}else{form.submit();}}
else
{this.form_want_submit=args;}
return false;};document.form_set_loaded=function(){this.form.loaded=true;if(this.form_want_submit){this.form_safe_submit(this.form_want_submit);}};document.document_set_loaded=function(){document.loaded=true;var t=$('webtk_scroll');if(t&&(t=(/^(\d+):(\d+)$/).exec(t.value))&&window_scroll_x()<50&&window_scroll_y()<50)
window.scrollTo(t[1],t[2]);};function webtk_submit(button,value,add,args)
{var h={id:button,value:(add?value+'+'+add:value)};if(typeof args=='object'){hash_update(h,args);}
document.form_safe_submit(h);return false;}
function button_submit(button,add,args)
{var match=/^([^+]+)(\+(.*))?$/.exec(button.id);return match?webtk_submit(match[1],match[3],add,args):false;}
function button_submit_cond(button,add,cond)
{if(!cond){return false;}
return button_submit(button,add,(typeof cond=='object')?cond:null);}
function save_prompt(message,default_value)
{if(default_value==undefined){default_value='';}
var s=window.prompt(message,default_value);if(s!=null){return({prompt:s});}
return false;}
function submit_on_enter(evt,button)
{if(evt.keyCode==13){var b;if(button==''||button==null){document.form_safe_submit();}else if((b=$(button))){b.onclick?b.onclick():document.form_safe_submit();}else{var a=button.split('+');webtk_submit(a[0],a[1],a[2]);}
Utils.stop_event(evt);return false;}
return true;};function new_window(url,width,height,params,window_name)
{if(params==null){params="status=yes,scrollbars=yes,resizable=yes,left=0,top=0"}
if(width!=null){if(width>screen.width)
width=screen.width;params+=",width="+width;}
if(height!=null){var minus=document.is_ie?80:0;if(height>screen.height-minus)
height=screen.height-minus;params+=",height="+height;}
if(!window_name){window_name='_blank';}
eval("name = window.open(url, window_name, params)");if(!eval("name.opener"))
eval("name.opener = self");return false;}
function new_window_submit(width,height,params)
{var window_name='autowindow'+(new Date).getTime();new_window("about:blank",width,height,params,window_name);return({form_target:window_name});}
function boolfield_value(name)
{var a=document.getElementsByName(name);for(var i=0;i<a.length;i++)
if(a[i].checked)
return a[i].value;return null;}
function selected_checkboxes(name)
{var result=new Array;var a=document.getElementsByName(name);for(var i=0;i<a.length;i++)
if(a[i].checked)
result.push(a[i].value);return result;}
function uriescape(s)
{return encodeURIComponent(s);}
function window_close_and_reload()
{if(parent.opener&&!parent.opener.closed)
parent.opener.document.form_safe_submit();window.close();}
function window_set_quick_info(str,time)
{var e=$("window_quick_info");if(str===false){Utils.hide_show_covered(e,true);Element.add_class(e,'display_none');return false;}
if(str){e.innerHTML=str;Element.remove_class(e,'display_none');Utils.hide_show_covered(e,false);}
setTimeout("window_set_quick_info(false)",time||5000);}
function array_index_of(a,item)
{for(var i=0;i<a.length;i++)
if((typeof a[i]==typeof item)&&(a[i]==item))
return i;return-1;}
function array_contains(a,s)
{for(var i=0;i<a.length;i++)
if(a[i]===s)
return true;return false;}
function hash_merge(h,h1)
{var result={};for(property in h)
result[property]=h[property];for(property in h1)
result[property]=h1[property];return result;}
function hash_update(h,h1)
{for(property in h1)
h[property]=h1[property];return h;}