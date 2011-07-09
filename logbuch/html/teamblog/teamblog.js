//toolkit
dojo.require("dojo.parser");

// Layout
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.TitlePane");

// Editor
dojo.require("dijit.Editor");
dojo.require("dijit._editor.plugins.LinkDialog");
dojo.require("dojox.editor.plugins.PasteFromWord");
//dojo.require("dojox.editor.plugins.UploadImage");
dojo.require("dijit._editor.plugins.FullScreen");
dojo.require("dojox.editor.plugins.Save");

// Dialog & Form
dojo.require("dijit.Dialog");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.TimeTextBox");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.DateTextBox");
dojo.require("dijit.form.FilteringSelect");

// Grid
dojo.require("dojox.grid.DataGrid");
dojo.require("dojox.grid.cells.dijit");
dojo.require("dojo.data.ItemFileWriteStore");

// Uploader
dojo.require("dojox.form.Uploader");  
dojo.require("dojox.form.uploader.FileList");
dojo.require("dojox.form.uploader.plugins.HTML5"); 
dojo.require("dojox.form.uploader.plugins.IFrame");


// Misc
dojo.require("dojox.timing");
dojo.require("dojo.fx");
dojo.require("dijit.Tooltip");
dojo.require("dojox.widget.Standby");
dojo.require("dojox.dtl.filter.htmlstrings");
dojo.require("dojox.image.Lightbox");

// Plugins
dojo.registerModulePath("dowl", "../../lib/dowl");
dojo.require("dowl.Notification");
dojo.registerModulePath("querybox", "../../lib/querybox");
dojo.require("querybox.QueryBox");
  


var locale = {
  "__index__"       : {},
  "event"           : "Termin",
  "consult"         : "Beratungsprozess",
  "stumble"         : "Stolperstein",
  "document"        : "Dokument",
  "minutes"         : "Protokoll",
  "result"          : "Ergebnis",
  "idea"            : "Idee",
  "question"        : "Frage",
  "coop"            : "Kooperation",
  "hint"            : "Tipps",
  "photo"           : "Photo",
  "misc"            : "Sonstiges",
  "ownCompany"      : "Eigenes Unternehmen",
  "ownConsultant"   : "Berater (Eigenes Unternehmen)",
  "allConsultants"  : "Alle Berater/innen",
  "analyst"         : "Wissenschaftliche Begleitung",
  "allMembers"      : "Alle",
  "moreMembers"     : "Einzelne Teilnehmer/innen"
};

/**
 * The session id
 * @type string
 */
var sessionId = null;

/**
 * The name of the datasource of the project passed
 * in the "ds" querystring parameter.
 * @type String
 */
var datasource = "";

var editorDirty = false;

dojo.ready(function()
{ 
  dojo.cookie("QCLSESSID","",{expire:-1});
  var hash = window.location.hash;
  if ( hash=="" )
  {
    dijit.byId("loginDialog").show();
  }
  else
  {
    sessionId = hash.substr(1);
    /*
     * sibling session suppport
     */
    if ( sessionId.substr(0,2) == "S_" )
    {
      sessionId += ("_" + qcl.crypto.md5.createRandom());
    }
    authenticate(sessionId);
  }
});

function authenticate(token)
{
  if ( ! ( token || sessionId ) )
  {
    sessionId = qcl.crypto.md5.createRandom();
    window.location.hash=sessionId;
  }
  
  dojo.xhrGet({
    url: "../../services/server.php",
    content:{
      QCLSESSID : sessionId,
      service: "logbuch.access",
      method : "authenticate",
      params : (token || sessionId)
    },
    handleAs: "json",
    load: function(response) {
      
      if( response.result && response.result.data )
      {
        if (  response.result.data.anonymous === false )
        {
          init(response.result.data);
        }
        else
        {
          dijit.byId("loginDialog").show();
        }
      } 
      else 
      {
        var error;
        if( response.error ){
          error = response.error.message;
        }
        else
        {
          error = "Unbekannter Fehler.";
        }
        alert(error);
        sessionId="";
        window.location.hash ="";
        dijit.byId("loginDialog").show();
      }
    },
    error: function(message) {
      alert("Error during authentication: " + message );
      window.location.hash ="";
    }
  });
}

function init( userData )
{
  console.log("Initializing application...");
    
  // handle userdata
  sessionId = userData.sessionId;
  window.location.hash = sessionId;
  dojo.byId("username").innerHTML = userData.fullname;  
  
  // parse querystring
  window.location.params = {};
  window.location.search.replace( 
    new RegExp( "([^?=&]+)(=([^&]*))?", "g" ), 
    function( $0, $1, $2, $3 ){
      window.location.params[ $1 ] = $3;
    }
  );

  // or use this?
  //var query = uri.substring(uri.indexOf("?") + 1, uri.length);
  //var queryObject = dojo.queryToObject(query);
  
  /*
   * datasource
   */
  datasource = window.location.params.ds || "";
  
  if ( ! window.console )
  {
    window.console = { log:function(){}, warn:function(){} };
  }

  // locale
  initLocale();
  
  // querybox
  initQueryBox();
  
  // file uploader
  initUploader(userData.sessionId);

  // user grids 
  initGrids();
  
  // prepare editor
  initEditor();

  // reset filter without loading entries
  window.__preventLoadingOfEntries = true;
  resetEntryFilter();

  // show main app
  dojo.query("#appLayout").style({ visibility:"visible" });

  window.setTimeout(function(){
  
    // load
    window.__preventLoadingOfEntries = false;
    loadEntries();
    
    // start the message transport
    subscribeToServerChannels(startPolling);
    
  },1000);    
    
  
}

function initUploader(sessionId)
{
  dojo.connect(dijit.byId("attachment_uploader"), "onBegin", function(){
    dijit.byId("attachment_uploader_sendbutton").set("disabled",false);
    dojo.byId("attachment_uploader_error").innerHTML = "Dokument wird hochgeladen";
  });    
  dojo.connect(dijit.byId("attachment_uploader"), "onComplete", onUploadComplete );
  dojo.connect(dijit.byId("attachment_uploader"), "onChange", function(){
    dijit.byId("attachment_uploader_sendbutton").set("disabled",false);
  });  
}

function initLocale()
{
  for ( var entry in locale )
  {
    if ( entry != "__index__" )
    {
      locale.__index__[locale[entry].toLowerCase()] = entry;
    }
  }
}

var queryBox;
function initQueryBox()
{
  var url = "../../services/server.php?&qcl_output_format=raw&service=logbuch.entry&method=querybox&params=";
  queryBox  = new querybox.QueryBox(url,"qbox");  
  queryBox.onFormSubmit = function(){
    this.hide();
    this.displayLoader(false);
    var selected = dojo.byId(this.selectedContainerID);
    if(selected){
      var url = selected.firstChild.getAttribute("href");
      window.location = url;
      return false;
    }else{
      entryFilter.search = dojo.byId(this.inputFieldID).value;
      if(this.activeRequest){
        this.activeRequest.cancel();
      }
      loadEntries();
      return  false;
    }
  };
}


function initGrids()
{
  //dijit.byId("filterAuthorGrid").viewsHeaderNode.style.display="none";
  var userListServiceUrl = "../../services/server.php?service=logbuch.record&method=getUserItemList&params=[]&qcl_output_format=raw&QCLSESSID="+sessionId;
  var store1 = new dojo.data.ItemFileWriteStore({
    url : userListServiceUrl,
    urlPreventCache : true
  });
  dojo.connect(store1,"onSet",function (item, attribute, oldValue, newValue){
    var selectedUsers = store1.selectedUsers || [];
    var selectedIds   = store1.selectedIds || [];
    if (attribute=="selected")
    {
      var name = store1.getValue(item,"name"), id = store1.getValue(item,"id");
      if( newValue )
      {
        selectedUsers.push(name);
        selectedIds.push(id);
      }
      if (oldValue)
      {
        selectedUsers.splice( dojo.indexOf( selectedUsers, name ),1 );
        selectedIds.splice( dojo.indexOf( selectedIds, id ),1 );
      }
    }
    store1.selectedUsers = selectedUsers;
    store1.selectedIds = selectedIds;
  });
  store1.name = "filter_author";
  dojo.connect(store1,"onSet",function(){updateFilter(store1);});
  dijit.byId("filterAuthorGrid").setStore(store1);
  dijit.byId("filterAuthorGrid").startup();
  
  
  //dijit.byId("chooseUsersGrid").viewsHeaderNode.style.display="none";
  var store2 = new dojo.data.ItemFileWriteStore({
    url : userListServiceUrl,
    urlPreventCache : true
  });
  dojo.connect(store2,"onSet",function (item, attribute, oldValue, newValue){
    var selectedUsers = store2.selectedUsers || [];
    var selectedIds   = store2.selectedIds || [];
    if (attribute=="selected")
    {
      var name = store2.getValue(item,"name"), id = store2.getValue(item,"id");
      if( newValue )
      {
        selectedUsers.push(name);
        selectedIds.push(id);
      }
      if (oldValue)
      {
        selectedUsers.splice( dojo.indexOf( selectedUsers, name ),1 );
        selectedIds.splice( dojo.indexOf( selectedIds, id ),1 );
      }
    }
    store2.selectedUsers = selectedUsers;
    store2.selectedIds = selectedIds;
  });
  dijit.byId("chooseUsersGrid").setStore(store2);
  dijit.byId("chooseUsersGrid").startup();  
}

function initEditor()
{
  //dijit.byId("entryEditor").onLoadDeferred.then(entryEditorReady);
  
  var ed = dijit.byId("entryEditor");
  ed.addStyleSheet("style.css");
  
  // handle editor input
  dojo.connect(ed, "onKeyUp", function(e){
    dijit.byId("cancelEntryButton").set("disabled",false);
    if ( editorDirty == false )
    {
      updateMessageData();
      editorDirty = true;
    }
     switch( e.keyCode ){
        case 13: 
          handleEditorEnterKey(e); break;
        case 8:
        case 46:
          //@todo: check if headline node is being deleted
          break;
        default: 
          break;
     }
  });
  
  // handle editor click
  dojo.connect(ed, "onClick", function(e){ 
    dijit.byId("cancelEntryButton").set("disabled",false);
    var target = e.target || e.srcElement || e.originalTarget;
    //var selected = dojo.withGlobal(ed.window, "getSelectedText", dijit._editor.selection, [null]);
    if( dojo.hasClass(target,"dummyText") )
    {
      var range = rangy.createRange();
      target.innerHTML="<span>&nbsp;</span>";
      range.selectNodeContents(target);
      var sel = rangy.getIframeSelection(dojo.byId("entryEditor_iframe"));
      sel.setSingleRange(range);
      dojo.removeClass(target,"dummyText");
    }
  });
  
  resetEditor();  
}

var entryFilter = {};
var showAll = true;

function onResetFilterButtonClick()
{
  if ( window.location.search )
  {
    // this reloads the page //FIXME
    window.location.search="";
  }
  previousParams="";
  resetEntryFilter();
}

function resetEntryFilter()
{
   
  entryFilter = {
    "id"         : null,
    "category"   : {},
    "from"       : null,
    "to"         : null,
    "group"      : {},
    "personId"   : [],
    "search"     : null,
    "offset"     : 0,
    "limit"      : 10,
    "orderBy"    : null
  };
  
  try
  {
    queryBox.clear();
  }catch(e){}
  resetTimeFilter();
  dijit.byId("filter-categories-all").set("value",true);
  dijit.byId("filter-group-all").set("value",true);
  
  var store1 = dijit.byId("filterAuthorGrid").store;
  store1.fetch({onComplete: function(items){
    dojo.forEach( items, function(item){
      store1.setValue(item,"selected", false);
    }); 
  }});
  showAll = true;
  if( window.location.params.showEntry )
  {
    entryFilter.id = new Number(window.location.params.showEntry) + 0;
  }
}

function showEntry(id)
{
  var entryNode = dojo.byId("entry"+id);
  if ( entryNode )
  {
    dojo.window.scrollIntoView( entryNode );
//    dojo.animateProperty({
//      node:"centerCol",
//      properties: {
//          scrollTop: dojo.byId("centerCol").scrollTop-400,
//      }
//    }).play();
    blink( entryNode, 3);
  }
  else
  {
    loadSingleEntry( id );
  }
}

function blink(node, count){
    var effects = new Array();
     
    var hide = dojo.fadeOut({node: node});
    var show = dojo.fadeIn({node: node});
     
    for(var i = 0; i < count; i++){
        effects.push(hide);
        effects.push(show);
    }
     
    dojo.fx.chain(effects).play();
}


function loadSingleEntry( id )
{
  entryFilter.id = id;
  updateEntries();
}

function findEntries( fragment )
{
  entryFilter.search = fragment;
  loadEntries();
}

var previousParams = "";

function loadEntries(forceReload)
{
  if ( window.__preventLoadingOfEntries ) return; 
  var params = dojo.toJson([entryFilter]);
  if ( params == previousParams && !forceReload ) return;
  
  if (window.__activeRequest) window.__activeRequest.cancel();
  previousParams = params;
  
  dojo.byId("newsContainerNode").innerHTML = "Lade Einträge...";
  dijit.byId("centerColStandByOverlay").show();
  // load messages
  window.__activeRequest = dojo.xhrGet({
    url: "../../services/server.php",
    content:{
      QCLSESSID : sessionId,
      ds : datasource,
      service: "logbuch.entry",
      method : "list",
      params : params
    },
    handleAs: "json",
    failOk : true,
    load: function(response) 
    {
      window.__activeRequest = null;
      dijit.byId("centerColStandByOverlay").hide();
      handleMessages(response);
      if( response && response.result ) {
        // sucess!
        var data = response.result.data.data;
        var from = new Date(response.result.data.from);
        var to   = new Date(response.result.data.to);
        dojo.byId("newsContainerNode").innerHTML = createContent( data );
        dojo.byId("filter-description").innerHTML = filterToText(from,to);
        if( window.location.params.showEntry )
        {
          toggleAttachments( window.location.params.showEntry );
          window.location.params.showEntry = false;
        }
      }
      else
      {
        dojo.byId("newsContainerNode").innerHTML = ( response && response.error ? response.error.message : "Unknown Error" );
      }
    },
    error: function(message) {
        dojo.byId("newsContainerNode").innerHTML = "Error:" + message;
    }
  });
}

function loadNextEntries(offset,limit)
{
  entryFilter.offset = offset;
  entryFilter.limit  = limit;
  var params = dojo.toJson([entryFilter]);  
  dijit.byId("centerColStandByOverlay").show();
  window.__activeRequest = dojo.xhrGet({
    url: "../../services/server.php",    
    content:{
      QCLSESSID : sessionId,
      ds : datasource,
      service: "logbuch.entry",
      method : "list",
      params : params
    },
    handleAs: "json",
    failOk : true,
    load: function(response) 
    {
      window.__activeRequest = null;
      entryFilter.offset = 0;
      entryFilter.limit = 10;//hardcoded
      dijit.byId("centerColStandByOverlay").hide();
      handleMessages(response);
      if( response && response.result ) {
        dojo.create("div",{innerHTML:createContent( response.result.data.data )},"nextEntries"+offset,"replace");
      }
      else
      {
        dojo.create("div",{innerHTML:"Unknown Error"},"nextEntries"+offset,"replace");
      }
    },
    error: function(message) {
      dojo.create("div",{innerHTML:"Error:" + message},"nextEntries"+offset,"replace");
    }
  });
}

function updateEntries()
{
  if (window.__loadEntriesTimer) {
    window.clearTimeout(window.__loadEntriesTimer);
  }
  window.__loadEntriesTimer = window.setTimeout(function(){
    loadEntries();
  },500);
}

function toggleFilter(wgt,name)
{
  dojo.forEach( dojo.query('input[name="'+ name +'"]'), function(node){
    var widget = dijit.getEnclosingWidget(node);
    if( wgt.checked) widget.set("value",false);
  });
  updateEntries();
}

function resetTimeFilter()
{
  try{
    dijit.byId("filter-date-from").reset();
  }catch(e){}
  try{
    dijit.byId("filter-date-to").reset();
  }catch(e){}
  entryFilter.from = null;
  entryFilter.to = null;
  updateEntries();
}

function isValidDate(d) {
  if ( Object.prototype.toString.call(d) !== "[object Date]" )
    return false;
  return !isNaN(d.getTime());
}


function updateFilter(wgt)
{
  var value;
  switch( wgt.name )
  {
    case "filter_category":
      if ( wgt.checked )
      {
        entryFilter.category[wgt.value] = true;
        dijit.byId("filter-categories-all").set("checked",false);
      }
      else
      {
        delete entryFilter.category[wgt.value];
      }
      break;
    case "filter-date-from":
      entryFilter.from = null;
      value = ( isValidDate(wgt.value) ) ? wgt.value : wgt._lastValueReported;
      if ( isValidDate(value) ) entryFilter.from = dojo.date.stamp.toISOString( value );
      break;
    case "filter-date-to":
      entryFilter.to = null;
      value = ( isValidDate(wgt.value)  ) ? wgt.value : wgt._lastValueReported;
      if ( isValidDate(value) ) entryFilter.to = dojo.date.stamp.toISOString( value );
      break;
    case "filter_group":
      if ( wgt.checked )
      {
        entryFilter.group[wgt.value] = true;
        dijit.byId("filter-group-all").set("checked",false);
      }
      else
      {
        delete entryFilter.group[wgt.value];
      }
      break;
    case "filter_author":
      entryFilter.personId = wgt.selectedIds;
      break;
  }
  dojo.byId("filter-description").innerHTML = filterToText();
  updateEntries();
  //showAll = false; //FIXME
}

function filterToText(from,to)
{
  var t = '<table class="filter-summary">';
 
  // time
  from = from || entryFilter.from;
  to   = to || entryFilter.to;
  t += "<tr><td><b>Zeitraum</b></td><td>" + 
    ( from ? dojo.date.locale.format( new Date(from), {selector:"date"}) : "" )+ 
    "-" +
    ( to ? dojo.date.locale.format( new Date(to), {selector:"date"}) : "" ) + 
    "</td></tr>";
  
  // categories
  var c=[];
  for( var category in entryFilter.category )
  {
    c.push( locale[category] );
  }
  t+="<tr><td><b>Kategorien</b></td><td>" + ( c.length ? c.join(", ") : "Alle" ) + "</td></tr>"; 
  
  // group
  var g=[];
  for( var group in entryFilter.group )
  {
    g.push( locale[group] );
  }
  t+="<tr><td><b>Gruppen</b></td><td>" + ( g.length ? g.join(", ") : "Alle" ) + "</td></tr>"; 
  
  // users
  var u = dijit.byId("filterAuthorGrid").store.selectedUsers;
  if (u )
  {
    t+="<tr><td><b>Benutzer/ innen</b></td><td>" + (u.length ? u.join(", ") : "Alle")  + "</td></tr>";
  }  
  t+="</table>";
  
  return t;
}
  

function handleMessages(response)
{
  if( response && response.result && dojo.isArray(response.result.messages) )
  {
    dojo.forEach( response.result.messages, function(message){
      switch( message.name )
      {
        case "entry.updated": 
          if ( dojo.byId("entryContainer" + message.data.id) )
          {
            replaceEntry( message.data ); 
            return;
          }
          // fallthrough
          
        case "entry.created":
          if( showAll )
          {
            insertNewEntry( message.data );
          }
          else
          {
            var entry = message.data;
            new dowl.Notification({
              message : "Neue Nachricht '" + entry.subject +  
                " von " + entry.author +
                "<br>Klicken zum Öffnen",
              onClick : function(){
                loadSingleEntry(entry.id);
              }
            });
          }
          break;
        
        case "entry.deleted":
          removeEntryNode( message.data );
          break;
        
        case "entry.reply":
          var entry = message.data;
          new dowl.Notification({
            message : "Neue Antwort auf:" + entry.replyToSubject +  
              "(" + entry.replyToAuthor + ") von " + entry.author +
              "<br>Klicken zum Öffnen",
            onClick : function(){
              loadSingleEntry(entry.replyToId);
            }
          });
          break;
          
        case "user.login":
          new dowl.Notification({
            message : message.data + " hat sich angemeldet."
          });
          break;
          
        case "user.logout":
          new dowl.Notification({
            message : message.data + " hat sich abgemeldet"
          });
          break;    
          
      }
    });
  }
}

function createContent( data, omitContainerNode )
{
  if ( data.length == 0 )
  {
    return "Keine Einträge vorhanden";
  }
  var content = "";
  var loadNext = false;
  dojo.forEach( data, function(entry) {
    if ( entry.id )
    {
      if ( ! omitContainerNode ) content+= '<div id="entryContainer' + entry.id + '">';
      content+= '<div id="entry' + entry.id + '">';
      content+= createEntryBody( entry );
      content+= "</div>"; // End of message  
      content+= createEntryToolbar(entry);
      content+= createEntryAttachmentHtml(entry.id, entry.attachments);
      content+= '<div class="entryLinkContainer" id="entryLinkContainer' + entry.id + '"></div>';
      if ( ! omitContainerNode ) content+= "</div>";
    }
    else
    {
      loadNext = entry; 
    }
  });
   
  
  if( loadNext )
  {
    content+="<div class='entry-more' id='nextEntries"+ loadNext.offset + "'>" + 
      ( loadNext.limit < loadNext.remaining ? "<a href='void(0)' onclick='loadNextEntries("+ loadNext.offset + "," + loadNext.limit +"); return false;'>" + 
      "Weitere " + loadNext.limit + " Einträge laden</a> | " : "" ) + 
      "<a href='void(0)' onclick='loadNextEntries("+ loadNext.offset + "," + loadNext.remaining +"); return false;'>" + 
      "Die übrigen " + loadNext.remaining + " Einträge laden</a>" + 
    "<div>";    
  }
  return content;
}

function createEntryBody( entry )
{
  var content="";
  content+= "<div class='entry-headline'>";
  content+= entry.subject + "</div>";
  
  if (entry.dateStart )
  {
    content+= "<div class='entry-event'><b>Zeit:</b> " + 
      entry.dateStart + " " + entry.timeStart + " - " +
      ( entry.dateStart != entry.dateEnd ? entry.dateEnd : "" ) +
      entry.timeEnd +
    "</div>";
  }
  
  content+= "<div class='entry-author'><b>Verfasser/in:</b> " + entry.author + "</div>";
  content+= "<div class='entry-date'><b>Eingetragen am </b>" + entry.created;
  if( entry.created != entry.updated) content+= " (aktualisiert am " + entry.updated + ")";
  content+= "</div>";
  content+= "<div class='entry-categories'><b>Kategorien:</b> ";
  var categories=[];
  dojo.forEach( entry.categories, function(c){
    categories.push(locale[c]);
  });
  content+= categories.join(", ");
  content+= "</div>";
  if(entry.replyToId)
  {
    content+="<div class='entry-reply'>" +
        "<b>Antwort auf:</b> " +
        "<a target=_blank href='" + createEntryLink(entry.id) + "' " +
          "onclick='showEntry("+ entry.replyToId + "); return false;'>" + 
      entry.replyToSubject + "</a>" + " von " + entry.replyToAuthor + "</div>";
  }
  
  
  if( entry.isPrivate )
  {
    content+= "<div class='entry-private'>Der Eintrag wurde noch nicht veröffentlicht.</div>";
  }
  else
  {
    content+=createAccessHtml(entry);
  }
  
  content+="<div class='entry-text'>" + entry.text + "</div>";
  return content;
}

function createAccessHtml(entry)
{
  var acl = entry.acl;
  var groups = [];
  for ( key in acl)
  {
    if ( key == "moreMembers" )
    {
      if( entry.members) groups.push( entry.members.join(", ") );
    }
    else if( acl[key] )
    {
      groups.push(locale[key]);
    }
  }

  return '<div class="entry-access"><b>Sichtbar für: </b>' +
    ( groups.length ? groups.join(", ") : "Niemand" ) +
    "</div>";
}

function createEntryToolbar(entry)
{
  var content = "<div class='entry-toolbar'>";

//  if( entry.replyToId ) content+= '<img onmouseover="explain(this)" '+ 
//    'onclick="replyToEntry('+ entry.replyToId + ')" ' +
//    'alt="Auf den ursprünglichen Eintrag antworten" src="img/mail-reply-all.png"/>&nbsp;| ';
  content+= '<img onmouseover="explain(this)" '+ 
    'onclick="replyToEntry('+ entry.id + ')" ' +
    'alt="Auf diesen Eintrag antworten" src="img/mail-reply-sender.png"/>';     
  if( entry.editable ) content+= '&nbsp;| <img onmouseover="explain(this)" '+ 
    'onclick="editEntry('+ entry.id + ')" ' +
    'alt="Eintrag bearbeiten" src="img/page_edit.png"/>'; 
  if( entry.deletable ) content+= '&nbsp;| <img onmouseover="explain(this)" '+ 
    'onclick="deleteEntry('+ entry.id + ')" ' +
    'alt="Eintrag löschen" src="img/cross.png"/>';         
  if( entry.comments ) content+= "&nbsp;| " + entry.comments + 
    '&nbsp;<img onmouseover="explain(this)" ' + 
    'onclick="dijit.hideTooltip(this);loadSingleEntry('+ entry.id + ');" ' +
    'alt="Klicken sie hier, um den Eintrag und ' + entry.comments +
    ( entry.comments > 1 ? " Antworten" : " Antwort" ) +
    ' anzuzeigen" src="img/email.png"/>'; 
  if( entry.attachments.length ) content+= "&nbsp;| " + entry.attachments.length + 
    '&nbsp;<img onmouseover="explain(this)" ' + 
    'onclick="toggleAttachments('+ entry.id + ')" ' +
    'alt="Klicken sie hier, um ' + entry.attachments.length +
    ( entry.attachments.length > 1 ? " Anhänge":" Anhang" ) +
    ' anzuzeigen." src="img/attach.png"/>'; 
  content+= '&nbsp;| <img onmouseover="explain(this)" ' + 
    'onclick="toggleLink('+ entry.id + ')" ' +
    'alt="Klicken sie hier, um den Link zu diesem Eintrag anzuzeigen." src="img/page_white_link.png"/>';     
  content+= "</div>"; 
  return content;
}

function toggleLink( entryId )
{
  var entryLinkContainerNode = dojo.byId("entryLinkContainer" + entryId);
  var url = createEntryLink( entryId );
  entryLinkContainerNode.innerHTML = '<b>Link zum Eintrag:</b><br><a href="' + url + '" target=_blank>' + url + '</a>';
  if( entryLinkContainerNode ){
    if ( entryLinkContainerNode.__visible )
    {
      dojo.fx.wipeOut({ node:entryLinkContainerNode }).play();
      entryLinkContainerNode.__visible = false;
    }
    else
    {
      dojo.fx.wipeIn({ node:entryLinkContainerNode }).play();
      entryLinkContainerNode.__visible = true;
    }
  }  
}

function createEntryLink( entryId )
{
  var l = window.location;
  var url = l.protocol + "//" + l.host + l.pathname + "?showEntry=" + entryId;
  return url;
}


function fadeOut( node )
{
  dojo.animateProperty({
    node:node,
    properties: {
      opacity: { end: 0.2 }
    }
  }).play();  
}

function fadeIn( node )
{
  dojo.animateProperty({
    node:node,
    properties: {
      opacity: { end: 1 }
    }
  }).play();  
}

function animateFocusBox( node1, node2 )
{
  var start = dojo.position( node1 );
  var end   = dojo.position( node2 );
  dojo.animateProperty({
    node: "focusBox",
    properties: {
      height: { start: start.h, end: end.h },
      width:  { start: start.w, end: end.w },
      top:    { start: start.y, end: end.y },
      left:   { start: start.x, end: end.x }
    },
    duration: 1000,
    onBegin : function(){
      dojo.byId("focusBox").style.display="block";
    },
    onEnd : function(){
      dojo.byId("focusBox").style.display="none";
    }
  }).play(); 
}

function editEntry(id)
{
  var ed = dijit.byId("entryEditor");
  if (ed.entryId) resetEditor();
  
  dijit.byId("editorStandByOverlay").show();
  dojo.byId("rightColHeader").innerHTML = "Eintrag bearbeiten";
  ed.set("disabled",true);
  
  var entryContainer = dojo.byId("entryContainer"+id);
  fadeOut( entryContainer );
  animateFocusBox( entryContainer, ed.domNode );
  
  // load messages
  dojo.xhrGet({
    url: "../../services/server.php",
    content:{
      QCLSESSID : sessionId,
      ds : datasource,
      service: "logbuch.entry",
      method : "read",
      params : dojo.toJson([id])
    },
    handleAs: "json",
    load: function(response) 
    {
      ed.set("disabled",false);
      dijit.byId("editorStandByOverlay").hide();
      dijit.byId("cancelEntryButton").set("disabled",false);
      handleMessages(response);
      if( response && response.result ) {
        window.__populatingForms = true;
        window.setTimeout(function(){
            window.__populatingForms = false;
        },500);        
        
        // populate form
        var entry = response.result.data;
        ed.setValue("<div class='entry-headline'>" + entry.subject + "</div>" + entry.text);
        ed.entryId = entry.id;
        dojo.query('input[name="categories"]').forEach(function(node){
          var widget = dijit.getEnclosingWidget(node);
          widget.set("value", dojo.indexOf( entry.categories, node.value ) != -1 );
        });
        dojo.forEach( dojo.query('input[name="access"]'), function(node){
          var widget = dijit.getEnclosingWidget(node);
          if( node.value == "moreMembers" )
          {
            widget.set("value", entry.acl[node.value].length > 0 );
            var store = dijit.byId("chooseUsersGrid").store;
            var memberIds = entry.acl.moreMembers;
            store.fetch({
              onItem: function(item){
                store.setValue( item, "selected", dojo.indexOf( memberIds, store.getValue( item, "id") ) != -1 );    
              }
            });
           }
           else
           {
             widget.set("value", entry.acl[node.value] );
           }
        });  
        if( entry.timestampStart )
        {
          dijit.byId("entry-date").set("value",new Date( entry.timestampStart ) );
          dijit.byId("entry-time-from").set("value",new Date( entry.timestampStart ) );
          dijit.byId("entry-time-to").set("value",new Date( entry.timestampEnd) );
        }
        editorDirty = true;
        dijit.byId("submitEntryButton").set("label","Aktualisieren");
        dijit.byId("rightCol").domNode.style.backgroundColor = "#DBEDFF";
        
        /*
         * attachments
         */
        updateAttachmentList( entry.attachments );
      }
      else
      {
        alert( response && response.error ? response.error.message : "Unknown Error" );
      }
    },
    error: function(message) {
        alert( "Error:" + message);
    }
  });
}

function replyToEntry(id)
{
  var ed = dijit.byId("entryEditor");
  if (ed.entryId) resetEditor();
  ed.replyToId = id;  
  dijit.byId("editorStandByOverlay").show();
  ed.set("disabled",true);
  
  var entryContainer = dojo.byId("entryContainer"+id);
  if( entryContainer )
  {
    animateFocusBox( entryContainer, ed.domNode );
  }
  
  dojo.byId("rightColHeader").innerHTML = "Eintrag beantworten";
  
  // load messages
  dojo.xhrGet({
    url: "../../services/server.php",
    content:{
      QCLSESSID : sessionId,
      ds : datasource,
      service: "logbuch.entry",
      method : "read",
      params : dojo.toJson([id])
    },
    handleAs: "json",
    load: function(response) 
    {
      ed.set("disabled",false);
      
      dijit.byId("editorStandByOverlay").hide();
      dijit.byId("cancelEntryButton").set("disabled",false);
      handleMessages(response);
      if( response && response.result ) {
        window.__populatingForms = true;
        window.setTimeout(function(){
            window.__populatingForms = false;
        },500);        

       
        
        var entry = response.result.data;
        ed.setValue( "<div class='entry-headline dummyText'>Antwort auf: " + entry.subject + "</div>" + 
          "<p class='dummyText entry-body'>Zum Eingeben des Antworttextes hier klicken.</p>");
          
        // @todo quote original
        
        dojo.forEach( dojo.query('input[name="categories"]'), function(node){
          var widget = dijit.getEnclosingWidget(node);
          widget.set("value", dojo.indexOf( entry.categories, node.value) != -1 );
        });
        dojo.forEach( dojo.query('input[name="access"]'), function(node){
          var widget = dijit.getEnclosingWidget(node);
          
          if( node.value == "moreMembers" )
          {
            widget.set("value", entry.acl[node.value].length > 0 );
            var store = dijit.byId("chooseUsersGrid").store;
            var memberIds = entry.acl.moreMembers;
            // add author to acl
            if( memberIds.indexOf(entry.authorId) == -1 )
            {
              memberIds.push(entry.authorId); 
            }
            store.fetch({
              onItem: function(item){
                store.setValue( item, "selected", memberIds.indexOf( store.getValue( item, "id") ) != -1 );    
              }
            });
           }
           else
           {
             widget.set("value", entry.acl[node.value] );
           }
        });        
        editorDirty = true;
        
        // disable checkboxes
        dojo.forEach( dojo.query('input[name="access"]'), function(node){
          var wgt = dijit.getEnclosingWidget(node);
          wgt.set("readOnly",true);
        });        
        dojo.byId("access-readonly-explanation").style.display="inline";
        
        dijit.byId("submitEntryButton").set("label","Antworten");
        dijit.byId("rightCol").domNode.style.backgroundColor = "#E5B39A";   // todo use class       

      }
      else
      {
        alert( response && response.error ? response.error.message : "Unknown Error" );
      }
    },
    error: function(message) {
        alert( "Error:" + message);
    }
  });  
}

function deleteEntry(id)
{
  var entryContainer = dojo.byId("entryContainer"+id);
  fadeOut( entryContainer );
  
  if( !confirm("Wollen Sie die Nachricht wirklich löschen?") )
  {
    fadeIn(entryContainer);
    return;
  }
  
  var standby = new dojox.widget.Standby({
    target: entryContainer
  });
  document.body.appendChild(standby.domNode);
  standby.startup();
  standby.show();
  dojo.xhrGet({
    url: "../../services/server.php", 
    content:{
      QCLSESSID : sessionId,
      service: "logbuch.entry",
      ds : datasource,
      method : "delete",
      params : dojo.toJson([id])
    },
    handleAs: "json",
    load: function(response) 
    {
      handleMessages(response);
      standby.hide();
      if( response && response.result ) {
        removeEntryNode(id);
      }
      else
      {
        alert( response && response.error ? response.error.message : "Unknown Error" );
      }
    },
    error: function(message) {
        alert( "Error:" + message);
    }
  });
}

function removeEntryNode(id)
{
  var entryContainer = dojo.byId("entryContainer"+id);
  if( entryContainer )
  {
    dojo.fx.wipeOut({ node:entryContainer }).play();  
  }
}

function explain(node)
{
  return new dijit.Tooltip({
     connectId: [node],
     label: node.alt,
     showDelay : 0
  });
  
}

function subscribeToServerChannels(callback)
{
  dojo.xhrGet({
    url: "../../services/server.php",
    content:{
      QCLSESSID : sessionId,
      ds : datasource,
      service: "logbuch.message",
      method : "subscribe",
      params : '[["entry.updated","entry.created","entry.deleted","entry.reply","user.login","user.logout"]]'
    },
    handleAs: "json",
    load: function(response) {
      if( typeof callback == "function") callback();
    },
    error: function(message) {
        alert( "Error:" + message);
    }
  });  
}

function unsubscribeFromServerChannels(callback)
{
  dojo.xhrGet({
    url: "../../services/server.php",
    content:{
      QCLSESSID : sessionId,
      ds : datasource,
      service: "logbuch.message",
      method : "unsubscribeAll",
      params : '[]'
    },
    handleAs: "json",
    load: function(response) {
      handleMessages(response);
      //console.log("Unsubscribed from server channels");
      if( typeof callback == "function") callback();
    },
    error: function(message) {
        alert( "Error:" + message);
    }
  });  
}

/**
 * Poll every 30s
 */
function startPolling()
{
  window.__timer = new dojox.timing.Timer( 20000 );
  window.__timer.onTick = function(){
    //var start = new Date().getTime();
    dojo.xhrGet({
      url: "../../services/server.php",
      content:{
        QCLSESSID : sessionId,
        ds : datasource,
        service: "logbuch.message",
        method : "broadcast",
        params : "[]"
      },
      failOk : true,
      timeout : 15000 ,
      handleAs: "json",
      load: function(response){
        //var elapsed = new Date().getTime() - start;
        //console.log("Request took " + elapsed/1000 + " seconds.");
        handleMessages(response);
      },
      error: function(message) {
        //var elapsed = new Date().getTime() - start;
        //console.log("Request took " + elapsed/1000 + " seconds.");
        console. log( message );
      }
    });
  };
  window.__timer.start();  
}

function stopPolling()
{
  window.__timer.stop();
}

function resetEditor()
{
  var ed = dijit.byId("entryEditor");
  ed.setValue("<div class='dummyText entry-headline'>Zum Eingeben der Überschrift hier klicken</div><p class='dummyText entry-body'>Zum Eingeben des Haupttextes hier klicken.</p>");
  dojo.forEach( dojo.query('input[id^="c-"]'), function(node){
    var widget = dijit.getEnclosingWidget(node);
    if( widget.get("value")) widget.set("value",false);
  });
  window.setTimeout(function(){
    dojo.byId("entryInformationMessage").innerHTML= 
      "Bitte geben Sie oben einen LogBuch-Eintrag ein. "+
      "Wählen Sie dann eine oder mehrere Kategorien für den Eintrag. " +
      "Wenn Sie den Eintrag veröffentlichen wollen, müssen Sie ihn freigeben (Menu 'Freigabe'). " +
      "Sie können für jeden Beitrag auch Anhänge hochladen.";  
  },500);

  // visual fx
  if( ed.entryId ){
    var entryContainer = dojo.byId("entryContainer" + ed.entryId);
    if( entryContainer )
    {
      fadeIn( entryContainer );
    }
    else
    {
      console.warn("could not find entry container for " + ed.entryId);
    }
  }
  
  editorDirty = false;
  ed.replyToId = null;   
  setEntryId(0);

  // appearance
  dojo.byId("rightColHeader").innerHTML = "Neuen Eintrag schreiben";
  dijit.byId("submitEntryButton").set('label',"Senden");
  dijit.byId("cancelEntryButton").set("disabled",true);
  dijit.byId("rightCol").domNode.style.backgroundColor = "transparent";
  dijit.byId("editorStandByOverlay").hide();
  
  // enable checkboxes
  dojo.forEach( dojo.query('input[name="access"]'), function(node){
    var wgt = dijit.getEnclosingWidget(node);
    wgt.set("readOnly",false);
  });  
  dojo.byId("access-readonly-explanation").style.display="none";

  // attachments
  ed.attachmentIds = [];
  dojo.byId("attachment_count").innerHTML = "0";
  dojo.byId("attachment_filelist").innerHTML = "<div class='infoText'>Keine Anhänge vorhanden.<div>";
  dojo.byId("attachment_uploader_error").innerHTML = "";
  
  // email
  dojo.forEach( dojo.query('input[name="notify"]'), function(node){
    var wgt = dijit.getEnclosingWidget(node);
    wgt.set("value",true);
  });  
}

function logout()
{
  
  dojo.query("#appLayout").style({ visibility:"hidden" });
  unsubscribeFromServerChannels(function(){
    stopPolling();
    dojo.xhrGet({
        url: "../../services/server.php",
        content:{
          QCLSESSID : sessionId,
          service: "logbuch.access",
          method : "logout",
          params : "[false]"
        },
        load: function(response) {
          sessionId = null;
          window.location.hash="";
          dijit.byId("loginDialog").show();
        },
        error: function(message) {
          sessionId = null;
          dijit.byId("loginDialog").show();          
          alert( "Error:" + message);
        }
    });  
  });  
}


/**
 * 
 */

function updateMessageData( widget )
{
  // toggle access  
  if ( widget && widget.name == "access" && widget.get("value") )
  {
    if( widget.id == "access-all"  )
    {
      dojo.forEach( dojo.query('input[name="access"]'), function(node){
        var wgt = dijit.getEnclosingWidget(node);
        if( wgt.id  != "access-all" ) wgt.set("value",false);
      });
    }
    else
    {
      dijit.byId("access-all").set("value", false); 
    }
  }
 
  var ed          = dijit.byId("entryEditor");
  var attUploader = dijit.byId("entryAttachmentUploader");
  var attCount    = new Number(dojo.byId("attachment_count").innerHTML);
  var access      = dijit.byId("entryAccess").get("value").access;
  var notify      = dijit.byId("entryNotifications").get("value").notify;
  var data = {
    'categories'    : dijit.byId("entryCategories").get("value").categories
                      .concat(dijit.byId("entryTopics").get("value").categories),
    'eventTime'     : dijit.byId("entryEventTime").get("value"),
    'text'          : ed.get("value"),
    'acl'           : {},
    'replyToId'     : ed.replyToId,
    'attachmentIds' : ed.attachmentIds
  };
  
  
  // clean data
  if ( dojo.indexOf( data.categories, "event") == -1 )
  {
    data.eventTime = null;
  }
  
  var allowSend = true;
  
  // Create informational message from data
  var info = "", categories = [];
  dojo.forEach( data.categories, function(c){
    var t = locale[c];
    if (c == "event" )
    {
      if ( data.eventTime && data.eventTime.date && data.eventTime.from && data.eventTime.to )
      {
        if( dojo.date.compare(data.eventTime.to,data.eventTime.from ) <1 )
        {
          allowSend = false;
          t += " (<span style='color:red'>Die Endzeit muss später als die Startzeit sein!</span>)";
        }
        else
        {
          t += " (" + 
                dojo.date.locale.format(data.eventTime.date,{selector:"date"}) +
                ", " + dojo.date.locale.format(data.eventTime.from,{selector:"time"}) +
                " - " + dojo.date.locale.format(data.eventTime.to,{selector:"time"}) +
             ")";
          var startTime = new Date(data.eventTime.date);
          startTime.setHours( data.eventTime.from.getHours() );
          startTime.setMinutes( data.eventTime.from.getMinutes() );
          var endTime = new Date(data.eventTime.date);
          endTime.setHours( data.eventTime.to.getHours() );
          endTime.setMinutes( data.eventTime.to.getMinutes() );
          data.eventTime = [dojo.date.stamp.toISOString(startTime),dojo.date.stamp.toISOString(endTime)];   
        }
      }
      else
      {
        allowSend = false;
        t += " (<span style='color:red'>Sie müssen noch Datum und Zeit des Termins festlegen</span>)";
      }
    }
    categories.push( t );
  });
  
  var groups =[];
  dojo.forEach( access, function(a){
    var t = locale[a];
    if ( a == "moreMembers" )
    {
      try{
        var users = dijit.byId("chooseUsersGrid").store.selectedUsers;
        if( users.length )
        {
          t += " (" + users.join(", ") + ")";
          data.acl.moreMembers = dijit.byId("chooseUsersGrid").store.selectedIds;
          groups.push(locale[a] + " (" + users.join("; ") + ")");
        }
        else
        {
          allowSend = false;
          t += " (<span style='color:red'>Sie müssen noch die Teilnehmer auswählen</span>)";
        }
      }catch(e){
        t += " (<span style='color:red'>Sie müssen noch die Teilnehmer auswählen</span>)";
      }
    }
    else
    {
      data.acl[a] = true;
      groups.push(locale[a]);
    }
  });
  
  if ( categories.length )
  {
    info += "Der Eintrag wird veröffentlicht unter den Kategorien <b>" + categories.join(", ") + "</b>";
  }
  else
  {
    info += "<span style='color:red'>Der Eintrag ist noch keiner Kategorie zugeordnet</span>";
    allowSend = false;
  }
  
  
  if ( attCount == 1 )
  {
    info += ", hat 1 Anhang ";
  }
  else if ( attCount > 1 )
  {
    info += ", hat " + attCount + " Anhänge ";
  }
  
  if ( groups.length )
  {
     info += " und ist für folgende Personengruppen sichtbar: <b>" + groups.join(", ") + "</b>. ";   
  }
  else
  {
    info += " und ist zur Zeit <b>nur für Sie sichtbar</b>. ";
  }
  
  if( notify.length )
  {
    if ( dojo.indexOf( notify, "recipients") != -1 )
    {
      data.notify_recipients = true;
      if ( dojo.indexOf( notify, "responses") != -1  )
      {
        info += " Leseberechtige Benutzer/innen werden per E-Mail über den Eintrag und Antworten auf den Eintrag benachrichtigt";
        data.notify_reply = true;
      }
      else
      {
        info += "Leseberechtige Benutzer/innen werden per E-Mail über den Eintrag benachrichtigt.";
      }
    }
    else if ( dojo.indexOf( notify, "responses") != -1  )
    {
      info += " Leseberechtige Benutzer/innen werden per E-Mail über Antworten auf diesen Eintrag benachrichtigt";
      data.notify_reply = true;
    }
  }
  
  dojo.byId("entryInformationMessage").innerHTML = info;
  dijit.byId("submitEntryButton").set("disabled",!allowSend);
  return data;
}

function createEntryOnServer()
{
  dijit.byId("editorStandByOverlay").show();
  var ed = dijit.byId("entryEditor");
  ed.set("disabled",true);
  dojo.xhrPost({
    url: "../../services/server.php",  
    content:{
      QCLSESSID : sessionId,
      ds : datasource,
      service: "logbuch.entry",
      method : "create",
      params : dojo.toJson( [ updateMessageData() ] )
    },
    handleAs: "json",
    load: function(response) {
      handleMessages(response);
      if( response && response.result )
      {
        var data = response.result.data;
        ed.entryId = data.id;
        insertNewEntry( data );
        resetEditor();
        updateMessageData();
      }
      else
      {
        alert( response && response.error ? response.error.message : "Unknown Error" );
      }
      ed.set("disabled",false);
    },
    // The error handler
    error: function(message) {
      alert(message);
      ed.set("disabled",false);
    }
  });    
}

function insertNewEntry( data )
{
  var content = createContent( [data] );
  if( entryFilter.id )
  {
    dojo.byId("newsContainerNode").innerHTML = dojo.byId("newsContainerNode").innerHTML + content;
  }
  else
  {
    dojo.byId("newsContainerNode").innerHTML = content + dojo.byId("newsContainerNode").innerHTML;
  }
  
  var entryContainer = dojo.byId("entryContainer"+data.id);
  dojo.window.scrollIntoView( entryContainer );
  var ed = dijit.byId("entryEditor");  
  dojo.fx.wipeIn({ node:entryContainer }).play();
  if ( ed.entryId == data.id )
  {
    animateFocusBox( ed.domNode, entryContainer );  
  }
}

function updateEntryOnServer()
{
  var ed = dijit.byId("entryEditor");
  dijit.byId("editorStandByOverlay").show();
  dojo.xhrPost({
    url: "../../services/server.php",  
    content:{
      QCLSESSID : sessionId,
      service: "logbuch.entry",
      ds : datasource,
      method : "update",
      params : dojo.toJson( [ ed.entryId, updateMessageData() ] )
    },
    handleAs: "json",
    load: function(response) {
      handleMessages(response);
      if( response && response.result )
      {
        replaceEntry( response.result.data );
        resetEditor();
        updateMessageData();
      }
      else
      {
        alert( response && response.error ? response.error.message : "Unknown Error" );
      }
      ed.set("disabled",false);
    },
    // The error handler
    error: function(message) {
      alert(message);
      ed.set("disabled",false);
    }
  });    
}

function replaceEntry( data )
{
  var entryContainer = dojo.byId("entryContainer"+data.id);
  if(entryContainer){
    var ed = dijit.byId("entryEditor");
    if ( ed.entryId == data.id )
    {
      animateFocusBox( ed.domNode, entryContainer );
      fadeIn( entryContainer );
    }
    entryContainer.innerHTML = createContent([data],true);
  }
}

function submitEntry()
{
  var ed = dijit.byId("entryEditor");
  if ( ed.entryId )
  {
    updateEntryOnServer();  
  }
  else
  {
    createEntryOnServer();  
  }
}

function getOnlineStatusHtml(value)
{
  return value ? "X" : "";
}

function formatUserName(name,index,cell)
{
  return ( cell.grid.store.getValue( cell.grid.getItem(index), "online" ) ) ? 
    ("<span class='user-online'>" + name + "</span>") :
    ("<span class='user-offline'>" + name + "</span>") ;
}

function toggleSelectUserTableOnRowClick(e)
{
  if( e.cellIndex > 0 )
  {
    var store = e.grid.store, item = e.grid.getItem(e.rowIndex);
    store.setValue( item, "selected", ! store.getValue(item, "selected" ) );
  }
}

function handleEditorEnterKey(e)
{
  
  if( ! dojo.isFF ) return;
  
  //console.log(e);
  var editor = dijit.byId("entryEditor");
  var text = editor.get("value");
  
  // check for tags
  var pattern = /\#(\w+)/g;
  while((result = pattern.exec(text)) != null)
  {
    var tag = result[1].toLowerCase();
    var c = locale.__index__[tag];
    if ( c && dijit.byId("c-" + c ) )
    {
      dijit.byId( "c-" + c ).set("value",true);
    }
  }
  
  var counter = 0;
  dojo.forEach( editor.document.body.childNodes, function(node){
    if( counter++ == 0)
    {
      var content = dojo.trim(dojox.dtl.filter.htmlstrings.striptags(node.innerHTML));
      node = dojo.create("div", { innerHTML: content, contentEditable : true  }, 
        node, "replace");
      dojo.addClass(node,"entry-headline");
      if( content == "" || content == "&nbsp;" )
      {
        dojo.addClass(node,"dummyText");
        node.innerHTML = "Zum Eingeben der Überschrift hier klicken";
      }
    }
    else
    {
      if( dojo.hasClass(node,"entry-headline") )
      {
        if( dojo.hasClass(node,"dummyText" ) )
        {
          node.parentNode.removeChild(node);
        }
        else
        {
          dojo.removeClass(node,"entry-headline");
        }
      } 
      else if( node.nodeType != 1 && typeof node.textContent != undefined )
      {
        var content =  dojo.trim(node.textContent);
        if( content == "" || content == "&nbsp;" )
        {
          node.parentNode.removeChild(node);
          counter--;
        }
        else
        {
          node = dojo.create("p", 
            {innerHTML: content, contentEditable : true }, 
            node, "replace");
        }
      }
    }
  });
  //if the second node has been deleted, recreate it
  if( counter == 1 )
  {
     var node = dojo.create("p", 
      {innerHTML: "Zum Eingeben des Haupttextes hier klicken", contentEditable : true }, 
      editor.document.body, "last");
     dojo.addClass(node,"dummyText");
  }
}

function setEntryId( id )
{
  dijit.byId("entryEditor").entryId = id;
  updateUploaderUrl( id );
}


function updateUploaderUrl(entryId)
{
  var url =  "../../services/server.php?QCLSESSID=" + sessionId +
    "&application=logbuch&service=logbuch.file&method=dojoUploader&params=[" + entryId + "]";
  dojo.byId("attachment_uploader_form").action = url;
  dijit.byId("attachment_uploader").set("url", url );    
}

function beginUpload( button )
{
  dojo.byId("attachment_uploader_error").innerHTML = "Dokument wird hochgeladen...";
  window.setTimeout(function(){button.setDisabled(true),0});
}

var previous_upload_data;
function onUploadComplete(data)
{
  // temporary hack to work around a bug that causes this
  // function to be called twice 
  if ( dojo.toJson(data) == previous_upload_data ) return;
  previous_upload_data = dojo.toJson(data);
   
  var ed = dijit.byId("entryEditor");
  dijit.byId("attachment_uploader_sendbutton").set("disabled",true);
  
  /*
   * Flash response
   */
  if ( false )
  {
    // todo
  }
  
  /*
   * json reponse
   */
  else
  {
    
    if ( data.error )
    {
      dojo.byId("attachment_uploader_error").innerHTML = data.error;
    }
    else
    {
      dojo.byId("attachment_uploader_error").innerHTML ="";
      new dowl.Notification({message: data.message});
      updateAttachmentList( data.files );
    }
  }
}

function updateAttachmentList(files)
{
  var ed = dijit.byId("entryEditor");
  var ids = [];
  var html = '<table class="entry-attachement-list">';
  dojo.forEach( files, function(file){
    var type = file.type ? file.type : file.mime;
    html+='<tr><td>' +
      ( type.substr(0,6) =="image/"  
        ? '<img src="' + file.icon + '" ' +
            'onmouseover="explain(this)" ' +
            'alt="Klicken, um Bild anzuzeigen" ' +
            'onClick="displayAttachment(' + file.id + ');">'
        : '<img src="' + file.icon + '" ' +
            'onmouseover="explain(this)" ' +
            'alt="Datei laden" ' +
            'onDblClick="downloadAttachment(' + file.id + ');">' ) +
      '</td><td>' +
      '<img src="img/cross.png" onmouseover="explain(this)" alt="Anhang löschen" onClick="removeAttachment(this,' + "\'"+  file.name + "\',"+ file.id + ');">' +
      '</td><td>' + file.name + 
      '</td></tr>';
      ids.push( file.id );
  });  
  html+="</table>";
  if( ed.attachmentIds.length == 0 )
  {
    dojo.byId("attachment_filelist").innerHTML = html;
    dijit.getEnclosingWidget( dojo.byId("c-document") ).set("value",false);
  }
  else
  {
    dojo.byId("attachment_filelist").innerHTML = dojo.byId("attachment_filelist").innerHTML + html;
    dijit.getEnclosingWidget( dojo.byId("c-document") ).set("value",true); // @todo doesn't work, why?
  }
  ed.attachmentIds = ed.attachmentIds.concat( ids );
  dojo.byId("attachment_count").innerHTML= ( ed.attachmentIds.length );
    updateMessageData();
  dijit.byId("cancelEntryButton").set("disabled",false);
  
}

function toggleAttachments( entryId )
{
  var attachmentContainer = dojo.byId("entryAttachment" +  entryId);
  if( attachmentContainer ){
    if ( attachmentContainer.__visible )
    {
      dojo.fx.wipeOut({ node:attachmentContainer }).play();
      attachmentContainer.__visible = false;
    }
    else
    {
      dojo.fx.wipeIn({ node:attachmentContainer }).play();
      attachmentContainer.__visible = true;
    }
  }
}

function removeAttachment(node,name,id)
{
  if( !confirm("Sind Sie sicher, dass sie die Datei '" + name + "' löschen möchten?") ) return;
  var ed = dijit.byId("entryEditor");
  var pos = dojo.indexOf( ed.attachmentIds, id);
  if( pos != -1 )
  {
    ed.attachmentIds.splice(pos,1);
  }
  var tr =  node.parentNode.parentNode;
  tr.parentNode.removeChild(tr);
  dojo.byId("attachment_count").innerHTML= ed.attachmentIds.length;
}

var lightboxes = [];
function createEntryAttachmentHtml( entryId, files )
{
  var html = '<div id="entryAttachment' +  entryId + 
    '" class="entry-attachment-container"><table class="entry-attachment">';
  dojo.forEach( files, function(file){
    var url = "../../services/server.php?" +
            "sessionId=" + sessionId +
            "&service=logbuch.file&method=download&params=[" + file.id + "]";
    html+='<tr><td>'; 
    if( file.mime && file.mime.substr(0,6) == "image/" )
    {
      if ( ! lightboxes[file.id] ){
        
        var lb = new dojox.image.Lightbox({ 
          title: file.name + " (" + file.size + ")", 
          group: "group" + entryId, 
          href: url
        });
        lb.startup();
        lightboxes[file.id] = lb;
      }
      html+= '<img src="' + file.icon + '"></td>' +
          '<td><a target=_blank href="' + url + '" ' +
          'onClick="displayAttachment(' + file.id + '); ' +
          'return false;">' + 
          file.name + '</a></td>';
    }
    else
    {
      html+= '<img src="' + file.icon + '"></td>' +
          '<td><a target=_blank href="' + url + '" ' +
          'onClick="downloadAttachment(' + file.id + '); ' +
          'return false;">' + 
          file.name + '</a></td>';   
    }
    html+= '<td>' + file.size +  '</td></tr>';
    
  });  
  html+="</table></div>";
  return html;
}

function displayAttachment( id )
{
  lightboxes[id].show();
}

function downloadAttachment(id)
{
  var url = "../../services/server.php?" +
      "sessionId=" + sessionId +
      "&service=logbuch.file&method=download&params=[" + id + "]";
  window.open(url);
}

function printEntries()
{
  var win = window.open();
  
  win.document.open();
  win.document.write("Ausdruck wird erstellt, bitte warten...");
  win.document.close();  
  
  entryFilter.limit   = null;
  entryFilter.orderBy = "created"; 
  
  var params = dojo.toJson([entryFilter]);
  dojo.xhrGet({
    url: "../../services/server.php",
    content:{
      QCLSESSID : sessionId,
      ds : datasource,
      service: "logbuch.entry",
      method : "list",
      params : params
    },
    handleAs: "json",
    failOk : true,
    load: function(response) 
    {
      handleMessages(response);
      entryFilter.orderBy = null;
      if( response && response.result ) {
        // write result
        var html = '<style type="text/css">' +
            '@import "style.css";' +
            'body {' +
              'padding:10px;' +
              'overflow:auto;' +
            '}' +
            '.entry-attachment-container{' +
              'height:auto !important;' +
            '}' +
            '.entry-toolbar, .entry-more {' +
              'display:none;' +
            '}' +      
            '</style>';
        
        var data = response.result.data.data;
        var from = new Date(response.result.data.from);
        var to   = new Date(response.result.data.to);
        
        html += "<h1>LogBuch Auszug</h1>" + 
          filterToText(from,to) +
          "<p>Stand vom " + dojo.date.locale.format( new Date(), {selector:"date"}) + "</p>";        
         
        win.document.open();
        win.document.write( html + createContent( data ).replace(/onclick/i,"dummy"));
        win.document.close();
      }
      else
      {
        win.document.write( response && response.error ? response.error.message : "Unknown Error" );
      }
    },
    error: function(message) {
        win.document.write("Error:" + message);
    }
  });    
  
}