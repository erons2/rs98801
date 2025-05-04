
Try={these:function(){var returnValue;for(var i=0;i<arguments.length;i++){var lambda=arguments[i];try{returnValue=lambda();break;}catch(e){}}
return returnValue;}};Function.prototype.call_with_object=function(object){var method=this;return function(event){var e=object.events;object.event=event||window.event;e.push(object.event);try{var result=method.call(object);}finally{e.pop();object.event=e[e.length-1];}
return result;}};Utils=new Object;Utils.regexp_escape=function(str)
{return(str.replace(/([\\\^\$\*\+\.\?\.\(\)\[\]\|\{\}])/g,"\\$1"));};Utils.create_element=function(type,parent)
{return Element.create(type,parent);};Utils.add_event=function(el,evname,func)
{return Event.add(el,evname,func);};Utils.remove_event=function(el,evname,func)
{return Event.remove(el,evname,func);};Utils.get_event_element=function(event)
{return window.event?window.event.srcElement:event.target;};Utils.stop_event=function(event)
{Event.stop(event);}
Utils.get_mouse_pos=function(event)
{return Event.mouse_pos(event);};Utils.get_absolute_pos=function(el)
{return Element.absolute_pos(el);};Utils.hide_show_covered=function(el,hidden)
{if(!document.is_ie||document.is_opera)
return;function get_visib(obj)
{var value=obj.style.visibility;if(value)
return value;if(document.defaultView&&typeof(document.defaultView.getComputedStyle)=="function")
return document.defaultView.getComputedStyle(obj,"").getPropertyValue("visibility");else if(obj.currentStyle)
return obj.currentStyle.visibility;else
return'';};var tags=new Array("applet","iframe","select");var p=Utils.get_absolute_pos(el);var EX1=p.x;var EX2=el.offsetWidth+EX1;var EY1=p.y;var EY2=el.offsetHeight+EY1;for(var k=tags.length;k>0;)
{var ar=document.getElementsByTagName(tags[--k]);var cc=null;for(var i=ar.length;i>0;)
{cc=ar[--i];if(cc.noHidding){continue;}
p=Utils.get_absolute_pos(cc);var CX1=p.x;var CX2=cc.offsetWidth+CX1;var CY1=p.y;var CY2=cc.offsetHeight+CY1;if(hidden||(CX1>EX2)||(CX2<EX1)||(CY1>EY2)||(CY2<EY1))
{if(!cc.__msh_save_visibility)
cc.__msh_save_visibility=get_visib(cc);cc.style.visibility=cc.__msh_save_visibility;}
else
{if(!cc.__msh_save_visibility)
cc.__msh_save_visibility=get_visib(cc);cc.style.visibility="hidden";}}}};Utils.insert_at_cursor=function(field,value)
{if(document.selection){field.focus();sel=document.selection.createRange();sel.text=value;}else if(field.selectionStart!=undefined){var startPos=field.selectionStart;var endPos=field.selectionEnd;field.value=field.value.substring(0,startPos)+value+
field.value.substring(endPos,field.value.length);}else
field.value+=value;};Utils.set_selection_pos=function(input,selectionStart,selectionEnd)
{if(input.setSelectionRange){input.focus();input.setSelectionRange(selectionStart,selectionEnd);}else if(input.createTextRange){var range=input.createTextRange();range.collapse(true);range.moveEnd('character',selectionEnd);range.moveStart('character',selectionStart);range.select();}};Utils.set_caret_to_begin=function(input)
{Utils.set_selection_pos(input,0,0);};Utils.set_caret_to_end=function(input)
{Utils.set_selection_pos(input,input.value.length,input.value.length);};Utils.set_caret_pos=function(input,pos)
{Utils.set_selection_pos(input,pos,pos);};Utils.select_string=function(input,string)
{var match=new RegExp(string,"i").exec(input.value);if(match)
Utils.set_selection_pos(input,match.index,match.index+match[0].length);};Utils.replace_selection=function(input,replaceString)
{if(input.setSelectionRange){var selectionStart=input.selectionStart;var selectionEnd=input.selectionEnd;input.value=input.value.substring(0,selectionStart)+
replaceString+input.value.substring(selectionEnd);if(selectionStart!=selectionEnd)
Utils.set_selection_pos(input,selectionStart,selectionStart+
replaceString.length);else
Utils.set_caret_pos(input,selectionStart+replaceString.length);}else if(document.selection){var range=document.selection.createRange();if(range.parentElement()==input){var isCollapsed=range.text=='';range.text=replaceString;if(!isCollapsed){range.moveStart('character',-replaceString.length);range.select();}}}};Utils.get_cursor_pos=function(input)
{if(document.is_ie){input.focus();if(input.type=='text'){var i=0;var sel=document.selection.createRange().duplicate();while(sel.parentElement()==input&&sel.move("character",-1)==-1)
i++;return i;}else{var range=document.selection.createRange();var sel=range.duplicate();var t=range.duplicate();t.moveToElementText(input);sel.setEndPoint('StartToStart',t);return sel.text.length;}}else if(input.selectionStart!=undefined)
return input.selectionStart;else
return input.value.length;};Utils.string_count_char=function(str,chr)
{var count=0;var pos=-1;while((pos=str.indexOf(chr,pos+1))!=-1)
count++;return count;};Utils.firefox_fast_hide=function(iframe)
{var s=iframe.style;if(s.visibility=='hidden')
return false;s.visibility='hidden';iframe._width=s.width;iframe._height=s.height;iframe._bottom=s.bottom;iframe._right=s.right;iframe._zindex=s.zIndex;s.right='auto';s.width=0;s.bottom='auto';s.height=0;s.zIndex=-1;return true;};Utils.firefox_fast_show=function(iframe)
{var s=iframe.style;if(s.visibility!='hidden')
return false;s.width=iframe._width;s.height=iframe._height;s.bottom=iframe._bottom;s.right=iframe._right;s.zIndex=iframe._zindex;s.visibility='visible';return true;};Utils.input_onfocus_switch=function(i1,i2)
{i1.style.display='none';i2.style.display='block';i2.focus();};Utils.input_onblur_switch=function(i1,i2)
{if(!i1.value||i1.value==''){i1.style.display='none';i2.style.display='block';}};Utils.rtextfield_init=function(field_id,r1,r2)
{var field=$(field_id);field.rows1=r1;field.rows2=r2;Utils.add_event(field,'keyup',function(event){var key=event.keyCode;if(key==13||key==8||key==46||(event.ctrlKey&&(event.keyCode==86||event.keyCode==88)))
Utils.rtextfield_update_size(field);return true;});};Utils.rtextfield_update_size=function(field)
{if(field.rows1){var s=Utils.string_count_char(field.value,"\n")+2;if(s<field.rows1)
s=field.rows1;else if(s>field.rows2)
s=field.rows2;if(!document.is_ie||field.wrap=='off')
s--;if(field.rows!=s)
field.rows=s;}};Utils.autocomplete=function(input,url,min_chars)
{if(Utils.autoc_done){Utils.autoc_done=false;return;}
Utils.autocomplete_hide();var pos2=Utils.get_cursor_pos(input);if(pos2==0)
var pos1=0;else{var pos1=input.value.lastIndexOf("\n",pos2-1);pos1++;}
var text=input.value.substring(pos1,pos2);Utils.autoc_input=input;Utils.autoc_text=text;Utils.autoc_url=url;if(text.length<min_chars){Utils.autocomplete_hide();return;}
Utils.autoc_timeout_id=setTimeout("Utils.autoc_timeout()",300);};Utils.autoc_timeout=function()
{Utils.autoc_timeout_id=null;var input=Utils.autoc_input;var text=Utils.autoc_text;var url=Utils.autoc_url;var r=document.is_ie?new ActiveXObject("Msxml2.XMLHTTP"):new XMLHttpRequest();r.open('GET',Utils.autoc_url+uriescape(Utils.autoc_text),true);r.onreadystatechange=function(){if(r.readyState!=4||r.status!=200||r.responseText==null||r.responseText.match(/^\s*$/))
return;if(Utils.autoc_dialog==null){var e=Utils.autoc_dialog=Element.create('select');e.className='autocomplete';Element.hide(e);e.size=8;e.noHidding=true;Event.add(e,"keydown",Utils.autoc_dialog_keydown);Event.add(e,"click",Utils.autoc_dialog_click);document.getElementsByTagName("body")[0].appendChild(e);}
var d=Utils.autoc_dialog;var p=Utils.get_absolute_pos(Utils.autoc_input);d.style.left=p.x<0?0:p.x;d.style.top=p.y+Utils.autoc_input.offsetHeight;d.style.width=Utils.autoc_input.offsetWidth;if(Utils.autoc_opened||input!=Utils.autoc_input||text!=Utils.autoc_text||url!=Utils.autoc_url){return;}else{d.innerHTML='';var a=r.responseText.split(/\r?\n/);for(var i=0;i<a.length;i++)
if(a[i]!=''){var e=Element.create('option',d);e.text=e.value=a[i];}
Event.add(Utils.autoc_input,"keydown",Utils.autoc_keydown);Event.add(document,"blur",Utils.autoc_body_blur);Event.add_capture(document,document.is_ie?"activate":"focus",Utils.autoc_body_focus);Element.show(d);Utils.hide_show_covered(d,false);Utils.autoc_opened=true;}}
r.send('');};Utils.autocomplete_hide=function()
{if(Utils.autoc_timeout_id){clearTimeout(Utils.autoc_timeout_id);Utils.autoc_timeout_id=null;}
Utils.autoc_text=null;if(Utils.autoc_opened){Element.hide(Utils.autoc_dialog);Utils.hide_show_covered(Utils.autoc_dialog,true);Utils.autoc_opened=false;Event.remove(Utils.autoc_input,"keydown",Utils.autoc_keydown);Event.remove(document,"blur",Utils.autoc_body_blur);Event.remove_capture(document,document.is_ie?"activate":"focus",Utils.autoc_body_focus);}};Utils.autoc_keydown=function(event)
{if(Utils.autoc_opened){switch(event.keyCode){case 27:Utils.stop_event(event);Utils.autoc_done=true;Utils.autocomplete_hide();return;case 40:Utils.autoc_dialog.focus();return;}}};Utils.autoc_body_focus=function(event)
{var el=Event.target(event);if(el==Utils.autoc_dialog||el==Utils.autoc_input)
return;Utils.autocomplete_hide();};Utils.autoc_body_blur=function(event)
{var el=Event.target(event);if(el==document)
Utils.autocomplete_hide();};Utils.autoc_dialog_set_value=function(event)
{var input=Utils.autoc_input;if(input.rows1==null){input.value=Utils.autoc_dialog.value;}else{var pos2=Utils.get_cursor_pos(input);if(pos2==0)
var pos1=0;else{var pos1=input.value.lastIndexOf("\n",pos2-1);pos1++;}
pos2=input.value.indexOf("\n",pos1);if(pos2==-1)
pos2=input.value.length;else
pos2++;var t=input.value.substring(0,pos1)+
Utils.autoc_dialog.value+"\r\n"+
input.value.substring(pos2,input.value.length)
input.value=t.replace(/[\r\n]*$/,'')+"\n";if(document.is_ie){var range=input.createTextRange();range.collapse(false);range.select();}
Utils.rtextfield_update_size(input);}
Utils.stop_event(event);Utils.autoc_done=true;Utils.autocomplete_hide();setTimeout("Utils.autoc_input.focus ()",1);};Utils.autoc_dialog_keydown=function(event)
{switch(event.keyCode){case 13:Utils.autoc_dialog_set_value(event);break;case 27:Utils.stop_event(event);Utils.autoc_done=true;Utils.autoc_input.focus();Utils.autocomplete_hide();break;}};Utils.autoc_dialog_click=function(event)
{Utils.autoc_dialog_set_value(event);};Utils.list_set_row_class=function(element,class_name,push)
{while(element.nodeName!="TR")
element=element.parentNode;var a=element.old_class;if(push){if(a){if(!array_contains(a,class_name))
element.old_class.push(class_name);}else{element.old_class=[element.className,class_name];}
element.className=class_name;}else{if(a){if(class_name){for(var i=a.length-1;i>=0;i--)
if(a[i]==class_name){a.splice(i,1);break;}}else{a.splice(1,a.length);}
element.className=a[a.length-1];}}};Utils.list_has_row_class=function(element,class_name)
{if(element.nodeName!="TR")
element=element.parentNode.parentNode;if(element.old_class&&array_contains(element.old_class,class_name))
return true;return false;};Utils.list_set_checkbox=function(checkbox,checked)
{checked=Boolean(checked);if(checked!=checkbox.checked){checkbox.checked=checked;Utils.list_set_row_class(checkbox,'list_h',checked);}};Utils.list_set_all_checkboxes=function(name,checked)
{var a=document.getElementsByName(name+"_msel");for(var i=0;i<a.length;i++)
Utils.list_set_checkbox(a[i],checked);};Utils.list_update_hilight=function(name,multi_hilight)
{var a=document.getElementsByName(name+"_msel");if(multi_hilight){for(var i=0;i<a.length;i++)
Utils.list_set_row_class(a[i],'list_h',a[i].checked);}else{var e=document.getElementsByName(name);var tr=$(name+'_'+e[0].value);if(tr)
Utils.list_set_row_class(tr,'list_h',true);}};Utils.list_checkbox_onchange=function(checkbox,func)
{Utils.list_set_row_class(checkbox,'list_h',checkbox.checked);if(func)
func(checkbox);};Utils.list_selectall_onclick=function(name,func)
{var e=document.getElementsByName(name+"_msel");none=true;for(var i=0;i<e.length;i++)
if(e[i].checked){none=false;break;}
Utils.list_set_all_checkboxes(name,none);if(func)
func(name,none);};Utils.list_select_row=function(name,value,func)
{var v=document.getElementsByName(name)[0];var tr=$(name+'_'+v.value);if(tr)
Utils.list_set_row_class(tr,'list_h',false);var tr=$(name+'_'+value);if(tr){Utils.list_set_row_class(tr,'list_h',true);v.value=value;if(func)
func(name,value);}
return false;};Utils.list_onselection_call=function(name,func)
{var e=document.getElementsByName(name+"_msel");var checked=[];for(var i=0;i<e.length;i++)
if(e[i].checked)
checked.push(e[i]);func(name,checked,e.length>0&&checked.length==e.length);}
Utils._bubble_set_pos=function(e,pos)
{var a=Document.boundary_box();var p1=a[0],p2=a[1];var t=p2.x-e.offsetWidth;pos.x+=10;if(pos.x>t)
pos.x=t;if(pos.x<p1.x)
pos.x=p1.x;if(pos.y+10<p2.y-e.offsetHeight||pos.y-e.offsetHeight-4<p1.y)
pos.y+=10;else
pos.y-=e.offsetHeight+4;e.style.left=pos.x+"px";e.style.top=pos.y+"px";};Utils.bubble_show=function(event,e)
{var element=Utils.get_event_element(event);e=$(e);e.style.top="-10000px";Element.show(e);Utils._bubble_set_pos(e,Utils.get_mouse_pos(event));element.bubble=e;Utils.add_event(element,'mouseout',Utils.bubble_mouseout);Utils.add_event(element,'mousemove',Utils.bubble_mousemove);};Utils.bubble_mouseout=function(event)
{var element=Utils.get_event_element(event);Element.hide(element.bubble);Utils.remove_event(element,'mouseout',Utils.bubble_mouseout);Utils.remove_event(element,'mousemove',Utils.bubble_mousemove);};Utils.bubble_mousemove=function(event)
{Utils._bubble_set_pos(Utils.get_event_element(event).bubble,Utils.get_mouse_pos(event));};Utils.create_plaintext_htmlarea=function(name,add_styles,body_width)
{var t=new HTMLArea(name);var config=t.config;config.toolbar=[["formatblock","separator","insertorderedlist","insertunorderedlist","separator","outdent","indent","separator","justifyleft","justifycenter","justifyright","separator","undo","redo","separator"]];var h=config.formatblock={};if(document.is_ie){config.toolbar[0].push("copy","cut","paste");h[HTMLArea.I18N.formatblock["Normal"]||"Normal"]="p";}else{h[HTMLArea.I18N.formatblock["Normal"]||"Normal"]="p";}
h[HTMLArea.I18N.formatblock["Formatted"]||"Formatted"]="pre";config.statusBar=false;config.killWordOnPaste=true;config.pageStyle="\
* {\
    font-family: monospace, fixed;\
    font-size: 9pt;\
}\
p, pre, ul, ol, blockquote {\
    margin-top: 0px;\
    margin-bottom: 0px;\
}\
ul {\
    list-style-image: url("+_editor_url+"../icons/5x9/star.gif);\
    list-style-type: disc;\
}\
pre {\
    border-left: 1px solid rgb(80%,80%,80%);\
    padding: 2px;\
    background-color: rgb(95%,95%,95%);\
}\
img, hr, input, object, option, optgroup, script, select, textarea { display: none }\
\
a, abbr, acronym, address, applet, area, b, base, basefont,\
bdo, big, button, caption, center, cite, code, col, colgroup,\
dd, del, dir, dfn, dl, dt, em, fieldset, font, form, frame, frameset, h1, h2,\
h3, h4, h5, h6, i, ins, isindex, kbd, label, legend, link, map,\
menu, meta, noframes, noscript, param, q, s, samp, small, strike,\
strong, style, sub, sup, table, tbody, td, tfoot, th, thead, title,\
tr, tt, u, var, xmp {\
    display: inline;\
    text-color: black;\
    background: transparent;\
    border:  0px;\
    padding: 0px;\
    maring: 0px;\
}\
";if(body_width){if(document.is_ie){config.pageStyle+="body { padding: 8px; margin: 0px; margin-right: expression((document.body.offsetWidth - window.parent.document.getElementById('"+
body_width+"').offsetWidth - 16 - 20) + 'px') }\n";}else
config.pageStyle+="body { width:"+$(body_width).offsetWidth+"px }\n";}
if(add_styles)
config.pageStyle+=add_styles+"\n";config.keys={ctrl:{'b':[""],'s':[""],'l':["justifyleft"],'e':["justifycenter"],'r':["justifyright"],'z':["undo"],'y':["redo"],'p':["formatblock","p"],'f':["formatblock","pre"],'i':["insertorderedlist","ol"],'o':["insertunorderedlist","ul"],'n':["outdent"],'m':["indent"]}}
config.keys['alt']=config.keys['ctrl'];t.generate();};Utils.create_full_htmlarea=function(name,add_styles)
{var t=new HTMLArea(name);var h=t.config.formatblock={}
h[HTMLArea.I18N.formatblock["Normal"]||"Normal"]="p";h[HTMLArea.I18N.formatblock["Formatted"]||"Formatted"]="pre";t.config.statusBar=false;t.config.killWordOnPaste=true;t.generate();};Utils.execute_periodically=function(callback,frequency)
{var currently_executing=false;var on_timer=function(){if(!currently_executing){currently_executing=true;Try.these(callback);currently_executing=false;}
setTimeout(on_timer,frequency*1000);}
setTimeout(on_timer,frequency*1000);};Element={create:function(type,parent){var el=document.createElementNS?document.createElementNS("http://www.w3.org/1999/xhtml",type):document.createElement(type);if(typeof parent!="undefined")
$(parent).appendChild(el);return el;},create_text:function(text,parent){var el=document.createTextNode(text);if(typeof parent!="undefined")
$(parent).appendChild(el);return el;},toggle:function(el,type){$(el).style.display=(el.style.display=='none'?(type||'block'):'none');},hide:function(el){$(el).style.display='none';},show:function(el,type){$(el).style.display=type||'block';},append:function(parent,el){$(parent).appendChild($(el));},remove:function(el){el=$(el);el.parentNode.removeChild(el);},absolute_pos:function(el){el=$(el);var SL=0,ST=0;var is_div=(el.tagName.toLowerCase=='div');if(is_div&&el.scrollLeft)
SL=el.scrollLeft;if(is_div&&el.scrollTop)
ST=el.scrollTop;var r={x:el.offsetLeft-SL,y:el.offsetTop-ST};if(el.offsetParent)
{var tmp=Element.absolute_pos(el.offsetParent);r.x+=tmp.x;r.y+=tmp.y;}
return r;},set_absolute_pos:function(el,left,top,right,bottom){el=$(el).style;if(left!=undefined)
el.left=left+'px';if(top!=undefined)
el.top=top+'px';if(right!=undefined)
el.right=right+'px';if(bottom!=undefined)
el.bottom=bottom+'px';},boundary_box:function(el){el=$(el);var pos=Element.absolute_pos(el);return[pos,{x:pos.x+el.offsetWidth,y:pos.y+el.offsetHeight},];},add_class:function(e,class_name){e.className+=' '+class_name;},rename_class:function(e,class_name,to_name){e.className=e.className.replace(new RegExp('(^| )'+class_name+'($| )','g'),'$1'+to_name+'$2');},remove_class:function(e,class_name){e.className=e.className.replace(new RegExp('(^| +)'+class_name+'($| +)','g'),' ');}};Date.parseDateTime=function(d,t,fmt){fmt=fmt||Calendar._TT["DEF_DATE_FORMAT"];var a=/^(\d+)(:(\d+))?\s*$/;var date=Date.parseDate(d,Calendar._TT["DEF_DATE_FORMAT"]);if(a=a.exec(t))
date.setHours(a[1],a[3]||0,0);else
date.setHours(0,0,0);return date;};Date.prototype.printTime=function(){var m=this.getMinutes();return this.getHours()+':'+(m<10?'0'+m:m);};Date.prototype.dateEqualsTo=function(date){return((this.getFullYear()==date.getFullYear())&&(this.getMonth()==date.getMonth())&&(this.getDate()==date.getDate()))};Date.check_date_range_form=function(d1,t1,d2,t2,error_txt){var dt_d1=Date.parseDateTime(d1.value,t1.value);var dt_d2=Date.parseDateTime(d2.value,t2.value);var old_value=function(f){if(f.old_value==undefined)
return(f.defaultValue||f.getAttribute('value'));else
return f.old_value;};var odt_d2=Date.parseDateTime(old_value(d2),old_value(t2));if(!odt_d2.equalsTo(dt_d2))
{if(dt_d2<dt_d1)
{if(odt_d2.dateEqualsTo(dt_d2))
{dt_d2.setDate(dt_d1.getDate()+1);d2.value=dt_d2.print(Calendar._TT["DEF_DATE_FORMAT"]);}else{alert(error_txt);var reset=function(){d2.value=old_value(d2);t2.value=old_value(t2);d1.value=old_value(d1);t1.value=old_value(t1);};if(document.is_ie)
setTimeout(reset,100);else
reset();return;}}}else{var odt_d1=Date.parseDateTime(old_value(d1),old_value(t1));if(!odt_d1.equalsTo(dt_d1))
{if(odt_d1.dateEqualsTo(dt_d1))
{if(dt_d1.dateEqualsTo(dt_d2))
{dt_d2.setTime(dt_d1.getTime()+odt_d2.getTime()-odt_d1.getTime());d2.value=dt_d2.print(Calendar._TT["DEF_DATE_FORMAT"]);t2.value=dt_d2.printTime();}}else{odt_d1.setHours(12,0);odt_d2.setHours(12,0);dt_d1.setHours(12,0);dt_d2.setTime(dt_d1.getTime()+odt_d2.getTime()-odt_d1.getTime());d2.value=dt_d2.print(Calendar._TT["DEF_DATE_FORMAT"]);}}}
d1.old_value=d1.value;d2.old_value=d2.value;t1.old_value=t1.value;t2.old_value=t2.value;};Document={append:function(el){document.body.appendChild($(el));},boundary_box:function(){var left=document.body.scrollLeft;var top=document.body.scrollTop;return[{x:left,y:top},{x:left+document.body.clientWidth,y:top+document.body.clientHeight},];}};Event={add:function(el,evname,func){if(el.attachEvent){el.attachEvent("on"+evname,func);}else if(el.addEventListener){el.addEventListener(evname,func,false);}else{el["on"+evname]=func;}},add_capture:function(el,evname,func){if(el.attachEvent){el.attachEvent("on"+evname,func);}else if(el.addEventListener){el.addEventListener(evname,func,true);}else{el["on"+evname]=func;}},remove:function(el,evname,func){if(el.detachEvent)
el.detachEvent("on"+evname,func);else if(el.removeEventListener)
el.removeEventListener(evname,func,false);else
el["on"+evname]=null;},remove_capture:function(el,evname,func){if(el.detachEvent)
el.detachEvent("on"+evname,func);else if(el.removeEventListener)
el.removeEventListener(evname,func,true);else
el["on"+evname]=null;},related_target:function(event){return window.event?(window.event.fromElement||window.event.toElement):event.relatedTarget;},target:function(event){return window.event?window.event.srcElement:event.target;},stop_propag:function(event){event||(event=window.event);if(document.is_ie){event.cancelBubble=true;}else{event.stopPropagation();}
return false;},stop:function(event){event||(event=window.event);if(document.is_ie){event.cancelBubble=true;event.returnValue=false;}else{event.preventDefault();event.stopPropagation();}
event.canceled=true;return false;},mouse_pos:function(event){if(document.is_ie){event||(event=window.event);return{x:event.clientX+document.body.scrollLeft,y:event.clientY+document.body.scrollTop};}else if(event.pageX){return{x:event.pageX,y:event.pageY};}else{return{x:event.clientX,y:event.clientY};}}};Tr={find_tr:function(element){while(element.nodeName.toLowerCase()!="tr")
element=element.parentNode;return element;},add_class:function(element,class_name){element=Tr.find_tr(element);var nodes=element.childNodes;for(var i=0;i<nodes.length;i++)
nodes[i].className+=' '+class_name;},remove_class:function(element,class_name){element=Tr.find_tr(element);var reg=new RegExp('(^| )'+class_name+'($| )','g');var nodes=element.childNodes;for(var i=0;i<nodes.length;i++)
nodes[i].className=nodes[i].className.replace(reg,' ');}};FilterForm={menu_state_func:function(name){var a=[];var t=$(name+"_type").value;if(t!='')
a.push(t)
return a;},menu_click:function(name,menu,item,submit_func){$(name+"_type").value=item.name;menu.refresh_states();var l=$("_"+name+"_label_");if(l)
l.value=item.text;if(l&&l.style.display!='none')
l.focus();else if($(name).value=='')
$(name).focus();else if(submit_func)
submit_func(name);else
webtk_submit(name+'_go','go');return false;}};FloatBox=function(){};FloatBox.initialize=function(floatbox,args)
{floatbox.events=[];floatbox.displayed=false;floatbox.refresh_dom=true;floatbox.zindex=args.zindex||50;floatbox.direction=args.direction;floatbox.document_onmousedown_method=floatbox.document_onmousedown.call_with_object(floatbox);floatbox.document_onkeydown_method=floatbox.document_onkeydown.call_with_object(floatbox);if(args.element){floatbox.element=$(args.element);if(args.bind_to_element!=false)
{floatbox.bind_to_element=true;floatbox.element_onmousedown_method=floatbox.element_onmousedown.call_with_object(floatbox);Event.add(floatbox.element,"mousedown",floatbox.element_onmousedown_method);if(document.is_ie)
Event.add(floatbox.element,"dragstart",function(){return false});}}};FloatBox.prototype.create_dom=function(){alert("create_dom abstract method");};FloatBox.prototype.onshow=function(){};FloatBox.prototype.onhide=function(){};FloatBox.prototype.document_onmousedown=function()
{if(!this.displayed)
return;if(this.event.type=="mouseup"){Event.add(document,"mousedown",this.document_onmousedown_method);Event.add(document,document.is_ie?"activate":"focus",this.document_onmousedown_method);Event.add(document,"blur",this.document_onmousedown_method);}
var target=Event.target(this.event);if(!target.tagName&&this.event.type!="blur")
return;var el=target;for(;el!=null&&el!=this.dom&&el!=this.element;el=el.parentNode);if(el==null)
this.hide();};FloatBox.prototype.document_onkeydown=function()
{switch(this.event.keyCode){case 27:this.hide();break;}};FloatBox.prototype.element_onmousedown=function()
{this.togle();Event.stop(this.event);if(this.element&&this.element.focus)
this.element.focus();};FloatBox.prototype.init_dom=function()
{if(!this.dom||this.refresh_dom){this.create_dom();this.refresh_dom=false;this.dom.style.top="-10000px";this.dom.style.zIndex=this.zindex;Element.append(document.form,this.dom);}};FloatBox.prototype.show=function()
{if(this.displayed)
return;Event.add(document,"mouseup",this.document_onmousedown_method);Event.add(document,"keydown",this.document_onkeydown_method);this.init_dom();Element.show(this.dom);this.onshow();Utils.hide_show_covered(this.dom,false);this.displayed=true;return this;};FloatBox.prototype.hide=function()
{if(!this.displayed)
return;Event.remove(document,"mousedown",this.document_onmousedown_method);Event.remove(document,"mouseup",this.document_onmousedown_method);Event.remove(document,document.is_ie?"activate":"focus",this.document_onmousedown_method);Event.remove(document,"blur",this.document_onmousedown_method);Event.remove(document,"keydown",this.document_onkeydown_method);this.onhide();Element.hide(this.dom);this.dom.style.top="-10000px";Utils.hide_show_covered(this.dom,true);this.displayed=false;};FloatBox.prototype.togle=function()
{if(this.displayed)
this.hide();else
this.show();};FloatBox.prototype.refresh=function()
{this.refresh_dom=true;}
FloatBox.prototype.position_near_element=function(width,height)
{var t=Element.boundary_box(this.element);var e1=t[0],e2=t[1];t=Document.boundary_box();var d1=t[0],d2=t[1];if(e1.x+width>d2.x){if(e2.x-width>=d1.x){e1.x=e2.x-width;}else if(d2.x-width>=d1.x){e1.x=d2.x-width;}else{e1.x=d1.x;}}
if(this.direction=='up'){e1.y-=height;if(e1.y<d1.y&&e2.y+height<=d2.y){e1.y=e2.y+height;}}else{if(e2.y+height>d2.y&&e1.y-height>=d1.y){e2.y=e1.y-height;}
e1.y=e2.y;}
return e1;};FloatBox.prototype.position_in_center=function(width,height)
{var dbox=Document.boundary_box();var d1=dbox[0],d2=dbox[1];d2.x=d2.x-d1.x;d2.x=d2.x<width?d1.x:d1.x+(d2.x-width)/2;d2.y=d2.y-d1.y;d2.y=d2.y<height?d1.y:d1.y+(d2.y-height)/2;return d2;};Menu=function(args)
{if(args)
Menu.initialize(this,args);};Menu.prototype=new FloatBox();Menu.initialize=function(menu,args)
{FloatBox.initialize(menu,args);menu.items=args.items;menu.accesskey_width=args.accesskey_width||50;menu.states_func=args.states_func;menu.states=args.states||[];};Menu.prototype.tr_onmouseover=function()
{var tr=Tr.find_tr(Event.target(this.event));if(!this.actual_items[tr.webtk_item].disabled)
Tr.add_class(tr,'bg_h');this.active_tr=tr;};Menu.prototype.tr_onmouseout=function()
{var tr=Tr.find_tr(Event.target(this.event));if(!this.actual_items[tr.webtk_item].disabled)
Tr.remove_class(tr,'bg_h');this.active_tr=null;};Menu.prototype.tr_onmouseup=function()
{var menu=this;var item=this.active_tr.webtk_item;setTimeout(function(){menu.click_index(item);},1);};Menu.prototype.create_dom=function()
{var e=this.dom=Element.create('table');e.cellSpacing=0;e.cellPadding=0;e.className='pos_absolute border_menu medium cursor_pointer bg_menu';var tbody=Element.create("tbody",e);var mouseover=this.tr_onmouseover.call_with_object(this);var mouseout=this.tr_onmouseout.call_with_object(this);var mouseup=this.tr_onmouseup.call_with_object(this);var item,tr,disabled;var states;if(this.states_func)
{states=this.states_func(this);for(var i=0;i<this.states.length;i++)
states.push(this.states[i]);}else
states=this.states;this.actual_items=[];for(var i=0;i<this.items.length;i++){item=this.items[i];for(var s=0;s<states.length;s++){var t=item["state_"+states[s]];if(t)
item=hash_merge(item,t);}
this.actual_items.push(item);tr=Element.create('tr',tbody);tr.title=item.title||item.text||'';tr.webtk_item=i;e=Element.create('td',tr);e.className='bg_form_head middle center';e.width=24;if(item.img){e.height=24;e=Element.create('img',e);e.width=16;e.height=16;e.src=item.img;}
if(item.rule){e=Element.create('td',tr);e.className="pad_medium_r middle cursor_default";e.height=10;e.colSpan=2;e=Element.create('div',e);e.className='border_form_t';}else{if(item.disabled)
disabled=" disabled cursor_default";else
disabled='';Event.add(tr,"mouseover",mouseover);Event.add(tr,"mouseout",mouseout);Event.add(tr,"mouseup",mouseup);e=Element.create('td',tr);if(!this.flex_td)
this.flex_td=e;e.className="nowrap middle pad_large_l"+disabled;e.height=24;Element.create_text(item.text,e);e=Element.create('td',tr);e.className="nowrap pad_large_l pad_large_r middle right"+disabled;e.width=this.accesskey_width;Element.create_text(item.accesskey||'',e);}}};Menu.prototype.onshow=function()
{var e=this.element;if(e){var dom=this.dom;var dom_w=dom.offsetWidth;var dom_h=dom.offsetHeight;if(this.flex_td&&dom_w<e.offsetWidth)
{this.flex_td.width=this.flex_td.offsetWidth+(e.offsetWidth-dom_w);dom_w=dom.offsetWidth;}
var p=this.position_near_element(dom_w,dom_h);Element.set_absolute_pos(dom,p.x,p.y);dom.style.width=dom_w;dom.style.height=dom_h;}
if(this.active_tr){Tr.remove_class(this.active_tr,'bg_h');this.active_tr=null;}};Menu.prototype.item_index=function(name)
{for(var i=0;i<this.items.length;i++)
if(this.items[i].name==name)
return i;};Menu.prototype.click=function(name)
{var i=this.item_index(name);if(i)
this.click_index(i);};Menu.prototype.click_index=function(index)
{this.init_dom();var result=true;var item=this.actual_items[index];if(item.disabled){if(item.title){alert(item.title);}
result=false;}else if(item.onclick){result=eval('('+item.onclick+')');}
if(!item.noclose){this.hide();}
if(this.element){if(result&&item.submit_args){result=hash_merge(item.submit_args,(typeof result=='object')?result:{});}
button_submit_cond(this.element,item.name,result);}};Menu.prototype.refresh_states=function()
{this.refresh();};Menu.prototype.set_states=function(states)
{this.states=states;this.refresh_states();};Menu.prototype.add_states=function()
{if(typeof(arguments[0])=='array')
arguments=arguments[0];for(var i=0;i<arguments.length;i++)
this.states.push(arguments[i]);this.refresh_states();};Menu.prototype.remove_states=function()
{if(typeof(arguments[0])=='array')
arguments=arguments[0];var new_states=[];for(var i=0;i<this.states.length;i++)
if(!array_contains(arguments,this.states[i]))
new_states.push(this.states[i]);this.states=new_states;this.refresh_states();};Popup=function(args)
{if(args)
Popup.initialize(this,args);};Popup.prototype=new FloatBox();Popup.initialize=function(popup,args)
{FloatBox.initialize(popup,args);popup.html=args.html;popup.title=args.title;popup.position=args.position;popup.look=args.look;popup.close_button=args.close_button;};Popup.prototype.look_classes=function()
{switch(this.look)
{case'window':return{table:'medium bg_page border_window',title:'pad_small pad_medium_l pad_medium_r medium bold ext_window_title',content:'medium pad_x_large',button:'medium bold bg_form_head center cursor_pointer border_form'};case'form':return{table:'medium bg_page border_menu',title:'pad_small pad_medium_l pad_medium_r medium bold border_form_b',content:'medium pad_large bg_form',button:'medium bold bg_form_head center cursor_pointer border_form'};default:return{table:'medium bg_page border_menu',title:'pad_small pad_medium_l pad_medium_r x_small bold border_form_b',content:'medium pad_large',button:'x_small bold bg_form_head center cursor_pointer border_form'};}}
Popup.prototype.create_dom=function()
{classes=this.look_classes();var e=this.dom=Element.create('table');e.cellSpacing=0;e.cellPadding=0;e.className=classes.table;e.style.position='absolute';var tbody=Element.create("tbody",e);if(this.close_button!==false||this.title){e=Element.create('tr',tbody);e=Element.create('td',e);e.className=classes.title;e.style.paddingRight='20pt';e.innerHTML=this.title||'&nbsp;';}
e=Element.create('tr',tbody);e=Element.create('td',e);e.className=classes.content;e.innerHTML=this.html;if(this.close_button!==false){var cb=this.close_button_dom=Element.create('div',e);cb.className=classes.button;cb.style.width='14pt';cb.style.position='absolute';cb.style.right='1';cb.style.top='1';Element.create_text(' X ',cb);Event.add(cb,"mousedown",this.hide.call_with_object(this));Event.add(cb,"mouseover",function(){Element.add_class(cb,'bg_h');});Event.add(cb,"mouseout",function(){Element.remove_class(cb,'bg_h');});}};Popup.prototype.onshow=function()
{var dom=this.dom;var p;if(this.position=='window_center'){p=this.position_in_center(dom.offsetWidth,dom.offsetHeight);}else{p=this.position_near_element(dom.offsetWidth,dom.offsetHeight);}
Element.set_absolute_pos(dom,p.x,p.y);if(this.close_button_dom){Element.remove_class(this.close_button_dom,'bg_h');}};