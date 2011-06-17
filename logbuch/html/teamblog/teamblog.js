//parser
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
dojo.require("dojox.form.uploader.plugins.Flash");

// Misc
dojo.require("dojox.timing");
dojo.require("dojo.fx");
dojo.require("dijit.Tooltip");
dojo.require("dojox.widget.Standby");
dojo.require("dojox.dtl.filter.htmlstrings");

// Plugins
dojo.registerModulePath("dowl", "../../lib/dowl");
dojo.require("dowl.Notification");

var locale = {
  "__index__"       : {},
  "event"           : "Termin",
  "consult"         : "Beratungsprozess",
  "stumble"         : "Stolperstein",
  "document"        : "Dokument",
  "minutes"         : "Protokoll",
  "result"          : "Ergebnis",
  "idea"            : "Idee",
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

dojo.ready(function()
{
  if ( ! dojo.cookie("sessionId")  )
  {
    dijit.byId("loginDialog").show();
  }
  else
  {
    authenticate( dojo.cookie("sessionId") );
  }
});

function authenticate(token)
{
  dojo.xhrGet({
    url: "../../services/server.php",
    content:{
      service: "logbuch.access",
      method : "authenticate",
      params : token
    },
    handleAs: "json",
    load: function(response) {
      var error;
      if( response.result)
      {
        init(response.result.data);
      } 
      else 
      {
        if( response.error ){
          error = response.error.message;
        }
        else
        {
          error = "Unbekannter Fehler.";
        }
        dijit.byId("loginDialog").show();
        alert(error);
      }
    },
    error: function(message) {
      alert(message);
    }
  });
}

var editorDirty = false;
  
function init( userData )
{
   
  if ( ! window.console )
  {
    window.console = { log:function(){}, warn:function(){} };
  }
  
  // locale
  initLocale();
  
  window.__preventLoadingOfEntries = true;
  
  // querybox
  initQueryBox();
  
  // handle userdata
  dojo.cookie("sessionId",userData.sessionId);
  dojo.byId("username").innerHTML = userData.fullname;
 
  // user grids 
  initGrids();
  
  // prepare editor   
  initEditor();
  
  // reset filters, this also loads the entries
  resetEntryFilter();

  // show main app
  dojo.query("#appLayout").style({ visibility:"visible" });
  
  window.setTimeout(function(){
    window.__preventLoadingOfEntries = false;
    loadEntries();
    
    // start the message transport
    subscribeToServerChannels(startPolling);
  },500);    
    
  
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
  queryBox  = new marumushi.widget.QueryBox(url,"qbox");  
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
  var userListServiceUrl = "../../services/server.php?service=logbuch.record&method=getUserItemList&params=[]&qcl_output_format=raw";
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
        selectedUsers.splice( selectedUsers.indexOf( name ),1 );
        selectedIds.splice( selectedIds.indexOf( id ),1 );
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
        selectedUsers.splice( selectedUsers.indexOf( name ),1 );
        selectedIds.splice( selectedIds.indexOf( id ),1 );
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
    "limit"      : 10
  };
  
  queryBox.clear();
  resetTimeFilter();
  dijit.byId("filter-categories-all").set("value",true);
  dijit.byId("filter-group-all").set("value",true);
  
  var store1 = dijit.byId("filterAuthorGrid").store;
  store1.fetch({onComplete: function(items){
    items.forEach( function(item){
      store1.setValue(item,"selected", false);
    }); 
  }});
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
      service: "logbuch.entry",
      method : "list",
      params : params
    },
    handleAs: "json",
    failOk : true,
    load: function(response) 
    {
      window.__activeRequest = null;
      entryFilter.id = null;
      dijit.byId("centerColStandByOverlay").hide();
      handleMessages(response);
      if( response && response.result ) {
        dojo.byId("newsContainerNode").innerHTML = createContent( response.result.data );
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
        dojo.create("div",{innerHTML:createContent( response.result.data )},"nextEntries"+offset,"replace");
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
  dojo.query('input[name="'+ name +'"]').forEach(function(node){
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

function updateFilter(wgt)
{
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
      entryFilter.from = dojo.date.stamp.toISOString( wgt.value );
      break;
    case "filter-date-to":
      entryFilter.to = dojo.date.stamp.toISOString( wgt.value );
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
  updateEntries();
}

function handleMessages(response)
{
  if( response && response.result && dojo.isArray(response.result.messages) )
  {
    response.result.messages.forEach(function(message){
      switch( message.name )
      {
        case "entry.updated": 
          replaceEntry( message.data );
          break;
          
        case "entry.created":
          insertNewEntry( message.data );
          break;
        
        case "entry.deleted":
          removeEntryNode( message.data );
          break;
      }
    });
  }
}

function createContent( data )
{
  if ( data.length == 0 )
  {
    return "Keine Einträge vorhanden";
  }
  var content = "";
  var loadNext = false;
  dojo.forEach( data,function(entry) {
    if ( entry.id )
    {
      content+= '<div id="containerEntry' + entry.id + '">'
      content+= '<div id="entry' + entry.id + '">';
      content+= createEntryBody( entry );
      content+= "</div>"; // End of message  
      content+= "<div class='entry-toolbar'>";
      content+= '<img onmouseover="explain(this)" '+ 
        'onclick="replyToEntry('+ entry.id + ')" ' +
        'alt="Beantworten" src="img/email_go.png"/>'; 
      if( entry.editable ) content+= '&nbsp;| <img onmouseover="explain(this)" '+ 
        'onclick="editEntry('+ entry.id + ')" ' +
        'alt="Eintrag bearbeiten" src="img/page_edit.png"/>'; 
      if( entry.deletable ) content+= '&nbsp;| <img onmouseover="explain(this)" '+ 
        'onclick="deleteEntry('+ entry.id + ')" ' +
        'alt="Eintrag löschen" src="img/cross.png"/>';         
      if( entry.comments ) content+= "&nbsp;| " + entry.comments + 
        '&nbsp;<img onmouseover="explain(this)" ' + 
        'onclick="loadSingleEntry('+ entry.id + ')" ' +
        'alt="' + entry.comments + ' Antworten" src="img/email.png"/>'; 
      if( entry.attachments) content+= "&nbsp;| " + entry.attachments + 
        '&nbsp;<img onmouseover="explain(this)" ' + 
        'onclick="loadSingleEntry('+ entry.id + ')" ' +
        'alt="' + entry.attachments + ' Anhänge" " src="img/email_attach.png"/>'; 
      content+= "</div>"; 
      content+= "</div>";
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
    content+= "<div class='entry-event'>Zeit: " + 
      entry.dateStart + " " + entry.timeStart + " - " +
      ( entry.dateStart != entry.dateEnd ? entry.dateEnd : "" ) +
      entry.timeEnd +
    "</div>";
  }
  
  content+= "<div class='entry-author'>Verfasser/in: " + entry.author + "</div>";
  content+= "<div class='entry-date'>Eingetragen am " + entry.created;
  if( entry.created != entry.updated) content+= " (aktualisiert am " + entry.updated + ")";
  content+= "</div>";
  content+= "<div class='entry-categories'>Kategorien: ";
  var categories=[];
  entry.categories.forEach(function(c){
    categories.push(locale[c]);
  });
  content+= categories.join(", ");
  content+= "</div>";
  if(entry.replyToId)
  {
    content+="<div class='entry-reply'>Antwort auf: <a href='void(0)' onclick='loadSingleEntry("+ entry.replyToId + "); return false;'>" + 
      entry.replyToSubject + "</a>" + " von " + entry.replyToAuthor + "</div>";
  }
  content+="<div class='entry-text'>" + entry.text + "</div>";
  return content;
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
  var entry = dojo.byId("entry"+id);
  fadeOut( entry );
  animateFocusBox( entry, ed.domNode );
  
  // load messages
  dojo.xhrGet({
    url: "../../services/server.php",
    content:{
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
        ed.setValue("<div class='entry-headline'>" + entry.subject + "</div>" + entry.text);
        ed.entryId = entry.id;
        dojo.query('input[name="categories"]').forEach(function(node){
          var widget = dijit.getEnclosingWidget(node);
          widget.set("value", entry.categories.indexOf(node.value) != -1 );
        });
        dojo.query('input[name="access"]').forEach(function(node){
          var widget = dijit.getEnclosingWidget(node);
          if( node.value == "moreMembers" )
          {
            widget.set("value", entry.acl[node.value].length > 0 );
            var store = dijit.byId("chooseUsersGrid").store;
            var memberIds = entry.acl.moreMembers;
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
        if( entry.timeStampStart )
        {
          dijit.byId("entry-date").set("value",new Date( entry.timeStampStart) );
          dijit.byId("entry-time-from").set("value",new Date( entry.timeStampStart) );
          dijit.byId("entry-time-to").set("value",new Date( entry.timeStampEnd) );
        }
        editorDirty = true;
        dijit.byId("submitEntryButton").set("label","Aktualisieren");
        dijit.byId("rightCol").domNode.style.backgroundColor = "#DBEDFF";
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
  var entry = dojo.byId("entry"+id);
  if (ed.entryId) resetEditor();
  ed.replyToId = id;  
  dijit.byId("editorStandByOverlay").show();
  ed.set("disabled",true);
  var entry = dojo.byId("entry"+id);
  animateFocusBox( entry, ed.domNode );
  dojo.byId("rightColHeader").innerHTML = "Eintrag beantworten";
  
  // load messages
  dojo.xhrGet({
    url: "../../services/server.php",
    content:{
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
        
        dojo.query('input[name="categories"]').forEach(function(node){
          var widget = dijit.getEnclosingWidget(node);
          widget.set("value", entry.categories.indexOf(node.value) != -1 );
        });
        dojo.query('input[name="access"]').forEach(function(node){
          var widget = dijit.getEnclosingWidget(node);
          if( node.value == "moreMembers" )
          {
            widget.set("value", entry.acl[node.value].length > 0 );
            var store = dijit.byId("chooseUsersGrid").store;
            var memberIds = entry.acl.moreMembers;
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
  var entryNode = dojo.byId("entry"+id);
  var containerNode = dojo.byId("containerEntry"+id);
  fadeOut( containerNode );
  
  if( !confirm("Wollen Sie die Nachricht wirklich löschen?") )
  {
    fadeIn(containerNode);
    return;
  }
  
  var standby = new dojox.widget.Standby({
    target: entryNode
  });
  document.body.appendChild(standby.domNode);
  standby.startup();
  standby.show();
  dojo.xhrGet({
    url: "../../services/server.php",
    content:{
      service: "logbuch.entry",
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
  var containerNode = dojo.byId("containerEntry"+id);
  if( containerNode )
  {
    dojo.fx.wipeOut({ node:containerNode }).play();  
  }
}

function explain(node)
{
  var bgColor = node.style.backgroundColor;
  dojo.animateProperty({
    node: node,
    duration: 300,
    properties: {
        backgroundColor: {
            start: bgColor,
            end: "black"
        }
    },
    onEnd: function() {
      dojo.animateProperty({
        node: node,
        duration: 300,
        properties: {
            backgroundColor: {
                start: "black",
                end: bgColor
            }
        }
      }).play();       
    }
  }).play();
  new dijit.Tooltip({
     connectId: [node],
     label: node.alt
  });
  
}

function subscribeToServerChannels(callback)
{
  dojo.xhrGet({
    url: "../../services/server.php",
    content:{
      service: "logbuch.message",
      method : "subscribe",
      params : '[["entry.updated","entry.created","entry.deleted"]]'
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

function startPolling()
{
  window.__timer = new dojox.timing.Timer( 10000 );
  window.__timer.onTick = function(){
    dojo.xhrGet({
      url: "../../services/server.php",
      content:{
        service: "logbuch.message",
        method : "broadcast",
        params : "[]"
      },
      failOk : true,
      handleAs: "json",
      load: function(response) {
        handleMessages(response);
      },
      error: function(message) {
        console.log( "Error:" + message);
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
  dojo.query('input[id^="c-"]').forEach(function(node){
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
  editorDirty = false;
  if( ed.entryId ){
    fadeIn( "entry" + ed.entryId );
  }
  ed.entryId = null;
  ed.replyToId = null;
  dojo.byId("rightColHeader").innerHTML = "Neuen Eintrag schreiben";
  dijit.byId("submitEntryButton").set('label',"Senden");
  dijit.byId("cancelEntryButton").set("disabled",true);
  dijit.byId("rightCol").domNode.style.backgroundColor = "transparent";
  dijit.byId("editorStandByOverlay").hide();
}

function logout()
{
  dojo.cookie("sessionId","",{expire:-1});
  dojo.query("#appLayout").style({ visibility:"hidden" });
  dijit.byId("loginDialog").show();
  unsubscribeFromServerChannels(function(){
    stopPolling();
    dojo.xhrGet({
        url: "../../services/server.php",
        content:{
          service: "logbuch.access",
          method : "logout",
          params : "[]"
        }
    });  
  });
  
}




/**
 * 
 */
function updateMessageData( widget )
{

  var attUploader    = dijit.byId("entryAttachmentUploader");
  var data = {
    'categories'  : dijit.byId("entryCategories").get("value").categories,
    'eventTime'   : dijit.byId("entryEventTime").get("value"),
    'text'        : dijit.byId("entryEditor").get("value"),
    'acl'         : {},
    'replyToId'   : dijit.byId("entryEditor").replyToId
  };
  var access = dijit.byId("entryAccess").get("value").access;
  
  // clean data
  if ( data.categories.indexOf("event") == -1 )
  {
    data.eventTime = null;
  }
  
  var allowSend = true;
  
  // Create informational message from data
  var info = "", categories = [];
  data.categories.forEach(function(c){
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
  access.forEach(function(a){
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
    info += "Der Eintrag wird veröffentlicht unter den Kategorien <b>" + categories.join(", ") + "</b> ";
  }
  else
  {
    info += "<span style='color:red'>Der Eintrag ist noch keiner Kategorie zugeordnet</span> ";
    allowSend = false;
  }
  
  if ( groups.length )
  {
     info += "und ist für folgende Personengruppen sichtbar: <b>" + groups.join(", ") + "</b>.";   
  }
  else
  {
    info += "und ist zur Zeit <b>nur für Sie sichtbar</b>.";
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
  dojo.byId("newsContainerNode").innerHTML = content + dojo.byId("newsContainerNode").innerHTML;
  var entryNode = dojo.byId("entry"+data.id);
  var ed = dijit.byId("entryEditor");  
  dojo.fx.wipeIn({ node:entryNode }).play();
  if ( ed.entryId == data.id )
  {
    animateFocusBox( ed.domNode, entryNode );  
  }
}

function updateEntryOnServer()
{
  var ed = dijit.byId("entryEditor");
  dijit.byId("editorStandByOverlay").show();
  dojo.xhrPost({
    url: "../../services/server.php",
    content:{
      service: "logbuch.entry",
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
  var content = createContent([data]);
  var entryNode = dojo.byId("entry"+data.id);
  if(entryNode){
    entryNode.innerHTML = createEntryBody(data);
    var ed = dijit.byId("entryEditor");
    if ( ed.entryId == data.id )
    {
      animateFocusBox( ed.domNode, entryNode ); 
    }
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
