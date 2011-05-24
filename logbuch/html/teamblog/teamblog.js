
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
  // handle userdata
  dojo.cookie("sessionId",userData.sessionId);
  dojo.byId("username").innerHTML = userData.fullname;
  dijit.byId("entryEditor").onLoadDeferred.then(entryEditorReady);

  dijit.byId("filterAuthorGrid").viewsHeaderNode.style.display="none";

  
  
  dojo.query("#appLayout").style({ visibility:"visible" });
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
            content+= "<p>" + newsItem.body + "</p>";
        });
        dojo.byId("newsContainerNode").innerHTML = content;
    },
    error: function(message) {
        dojo.byId("newsContainerNode").innerHTML = "Error:" + message;
    }
  });
  
  var timer = new dojox.timing.Timer( 5000 );
  timer.onTick = function(){
  dojo.xhrGet({
      // The URL of the request
      url: "../../services/server.php",
      // GET params content
      content:{
        service: "logbuch.message",
        method : "testMessages",
        params : "[]"
      },
      // Handle the result as JSON data
      handleAs: "json",
      // The success handler
      load: function(jsonData) {
          
          var newsItem = jsonData.result.data.newsItems[0];
          var content = "";
          var id = "news-" + newsItem.id;
          content+= "<div id='" + id + "' style='height:0px;'><h4>" + newsItem.subject + "</h4>";
          content+= "<p>" + newsItem.body + "</p></div>";
          dojo.byId("newsContainerNode").innerHTML = content + dojo.byId("newsContainerNode").innerHTML;
          dojo.fx.wipeIn({ node: dojo.byId(id) }).play();
          
          
      },
      // The error handler
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
}

function entryEditorReady()
{
  var editor = dijit.byId("entryEditor");
  console.log("Entry editor ready");
  
}

function loadEditor()
{

}

function submitEntry()
{
  var editor         = dijit.byId("entryEditor");
  var eventTimeForm  = dijit.byId("entryEventTime");
  var accessForm     = dijit.byId("entryAccess");
  var categoryForm   = dijit.byId("entryCategories");
  var attUploader    = dijit.byId("entryAttachmentUploader");
  console.log(editor.get("value"));
  console.log(eventTimeForm.get("value"));
  console.log(accessForm.get("value"));
  console.log(categoryForm.get("value"));
}
