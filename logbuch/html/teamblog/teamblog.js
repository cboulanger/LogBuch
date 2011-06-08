
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
  var queryBox  = new marumushi.widget.QueryBox("querybox/tests/csv_search.php?q=","qbox");
  //queryBox.cssClass = 'QueryBoxBlue';
  //queryBox.searchIconImageURL = "querybox/images/querybox/query-box_icon-24px.png";
  
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
  
function init( userData )
{
  // create reverse lookup index
  for ( var entry in locale )
  {
    if ( entry != "__index__" )
    {
      locale.__index__[locale[entry].toLowerCase()] = entry;
    }
  }
  
  // handle userdata
  dojo.cookie("sessionId",userData.sessionId);
  dojo.byId("username").innerHTML = userData.fullname;
  dijit.byId("entryEditor").onLoadDeferred.then(entryEditorReady);

  // grids
  
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
  
  // handle editor input
  var ed = dijit.byId("entryEditor");
  dojo.connect(ed, "onKeyUp", function(e){ 
     switch( e.keyCode ){
        case 13: analyseEntryText(); break;
     }
  });
  // handle editor click
    dojo.connect(ed, "onClick", function(e){ 
    var target = e.target || e.srcElement || e.originalTarget;
    //var selected = dojo.withGlobal(ed.window, "getSelectedText", dijit._editor.selection, [null]);
    if( dojo.hasClass(target,"dummyText") )
    {
      var range = rangy.createRange();
      range.selectNodeContents(target);
      var sel = rangy.getIframeSelection(dojo.byId("entryEditor_iframe"));
      sel.setSingleRange(range);
      if ( dojo.hasClass(target,"entry-body"))
      {
        dojo.removeClass(target,"dummyText");
      }
    }
  });
  
  resetEditor();
  
  
  // show main app
  dojo.query("#appLayout").style({ visibility:"visible" });
  
  // load messages
  dojo.xhrGet({
    url: "../../services/server.php",
    content:{
      service: "logbuch.message",
      method : "testMessages",
      params : "[]"
    },
    handleAs: "json",
    load: function(jsonData) {
        var content = "";
        dojo.forEach(jsonData.result.data.newsItems,function(newsItem) {
            content+= "<h4>" + newsItem.subject + "</h4>";
            content+= "<div>Verfasser: XXX am x.y.2011</div>";
            content+= "<div style='width:100%;text-align:right'>Idee, Stolperstein</div>";
            content+= "<p>" + newsItem.body + "</p>";
            content+= "<p style='text-align:right; font-weight:bold'>";
            content+= "<a href='javascript:alert(\"Nicht implementiert\");'>Ändern</a>&nbsp;";
            content+= "<a href='javascript:alert(\"Nicht implementiert\");'>Kommentar</a>&nbsp;";
            content+= "</p>";
        });
        dojo.byId("newsContainerNode").innerHTML = content;
    },
    error: function(message) {
        dojo.byId("newsContainerNode").innerHTML = "Error:" + message;
    }
  });
  
  
  
}

function resetEditor()
{
  var ed = dijit.byId("entryEditor");
  ed.setValue("<h3 class='dummyText entry-subject'>Zum Eingeben der Überschrift hier klicken</h3><p class='dummyText entry-body'>Zum Eingeben des Haupttextes hier klicken.</p>");
  dojo.query('input[id^="c-"]').forEach(function(node){
    var widget = dijit.getEnclosingWidget(node);
    if( widget.get("value")) widget.set("value",false);
  });
}

function poll()
{
// Timer to load new messages
  var timer = new dojox.timing.Timer( 5000 );
  timer.onTick = function(){
  dojo.xhrGet({
      url: "../../services/server.php",
      content:{
        service: "logbuch.message",
        method : "testMessages",
        params : "[]"
      },
      handleAs: "json",
      load: function(jsonData) {
          
          var newsItem = jsonData.result.data.newsItems[0];
          var content = "";
          var id = "news-" + newsItem.id;
          content+= "<div id='" + id + "' style='height:0px;'><h4>" + newsItem.subject + "</h4>";
          content+= "<p>" + newsItem.body + "</p></div>";
          dojo.byId("newsContainerNode").innerHTML = content + dojo.byId("newsContainerNode").innerHTML;
          dojo.fx.wipeIn({ node: dojo.byId(id) }).play();
      },
      error: function(message) {
          dojo.byId("newsContainerNode").innerHTML = "Error:" + message;
      }
    });
  };
  //timer.start();  
}

function logout()
{
  dojo.cookie("sessionId","",{expire:-1});
  dojo.query("#appLayout").style({ visibility:"hidden" });
  dijit.byId("loginDialog").show();
  dojo.xhrGet({
      url: "../../services/server.php",
      content:{
        service: "logbuch.access",
        method : "logout",
        params : "[]"
      }
  });
}

function entryEditorReady()
{
  var editor = dijit.byId("entryEditor");
  console.log("Entry editor ready");
  
}

function loadEditor()
{

}



/**
 * 
 */
function updateMessageData()
{

  var attUploader    = dijit.byId("entryAttachmentUploader");
  
  var data = {
    'categories'  : dijit.byId("entryCategories").get("value").categories,
    'eventTime'   : dijit.byId("entryEventTime").get("value"),
    'text'        : dijit.byId("entryEditor").get("value"),
    'acl'         : {}
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
          data.acl.moreMembers = users;
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



function submitEntry()
{
  function sendEntryToServer()
  {
    dojo.xhrPost({
      url: "../../services/server.php",
      content:{
        service: "logbuch.entry",
        method : "create",
        params : dojo.toJson( [ updateMessageData() ] ),
        qcl_output_format : "raw" 
      },
      handleAs: "json",
      load: function(jsonData) {
        new dowl.Notification({
            message: "Nachricht gesendet!"
        });
        resetEditor();
        updateMessageData();
        dojo.byId("entryInformationMessage").innerHTML="";
        dijit.byId("entryEditor").set("disabled",false);
      },
      // The error handler
      error: function(message) {
         alert(message);
      }
    });    
  }
  sendEntryToServer();
  dijit.byId("entryEditor").set("disabled",true);
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

function analyseEntryText()
{
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
}
