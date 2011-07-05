<?php require "category.php"; ?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=IE8">
	<title>LogBuch TeamBlog</title>
	
  <style type="text/css"> 
    @import "dojo/dijit/themes/claro/claro.css";
    @import "dojo/dojox/editor/plugins/resources/css/PasteFromWord.css";
    @import "dojo/dojox/grid/resources/Grid.css";
    @import "dojo/dojox/grid/resources/claroGrid.css";
    @import "dojo/dojox/image/resources/image.css";
    @import "dojo/dojox/image/resources/Lightbox.css";  
  
    @import "lib/querybox/css/querybox.css";
    @import "lib/dowl/Notification.css";
    @import "style.css";
  </style>  

	<!-- dojo -->
	<script src="lib/dojo/dojo.js" data-dojo-config="isDebug: false, parseOnLoad: true"></script>

  <!-- libraries -->
  <script src="lib/rangy/rangy-core.js"></script>
  <script src="lib/md5.js"></script>
  	
	<!-- application code including dependency declaration -->
	<script src="teamblog.js"></script>
	
	<script type="text/javascript"><?php foreach($categoryData as $c):?>
		locale['<?php echo $c['namedId']?>']="<?php echo $c['name']?>";
<?php endforeach;?>
	</script>
	

</head>
<body class="claro">

  <!----------------------- layout container ----------------------->
	<div id="appLayout" class="demoLayout" style="visibility: hidden"
		data-dojo-type="dijit.layout.BorderContainer">
	
	 
		<!---------------------- center column ----------------------->
		<div 
		  id="centerCol"
		  class="centerPanel" 
		  data-dojo-type="dijit.layout.ContentPane"
			data-dojo-props="region: 'center'">
			<div id="newsContainerNode">
			 Nachrichten werden geladen...
			</div>
		</div>
		<div id="centerColStandByOverlay" dojoType="dojox.widget.Standby" target="centerCol" text="Bitte warten..."></div>
		
		<!----------------------- title bar ----------------------->
		<div id="titleBar" 
		  class="edgePanel" 
		  data-dojo-type="dijit.layout.ContentPane"
			data-dojo-props="region: 'top'">
			<table width="100%">
			 <tr heigth="0px">
			   <td width="50%">
			     <span id="appTitle">LogBuch TeamBlog</span>
			   </td>
			   <td style="width:40%;text-align:right;">
			     <span id="username">XXX</span>
			   </td>
			   <td style="text-align:right;">
			     <button dojoType="dijit.form.Button" onClick="logout();">Abmelden</button>
			   </td>
			 </tr>
			</table>
		</div>
			
		<!----------------------- left column ----------------------->
		<div id="leftCol" class="edgePanel"
			data-dojo-type="dijit.layout.ContentPane"
			data-dojo-props="region: 'left'">
			
    <!-- column header -->    
    <div class="column-header">Einträge filtern</div>   			
			
		<!-- Toolbar -->
    <div>
      <button
        id="clearFilterButton"
        dojoType="dijit.form.Button" 
        onClick="onResetFilterButtonClick()">Alle anzeigen</button>
     </div>
        
		<!-- Search Box -->
		<div id="qbox"></div>
			
		<!-- Time period -->
		  <div 
		    dojoType="dijit.TitlePane" title="Zeitraum" open="false">
		   <table>
		     <tr>
		       <td><label for="filter-date-from">Von:</label></td>
		       <td>
		        <input id="filter-date-from"
		          dojoType="dijit.form.DateTextBox" 
		          name="filter-date-from" 
		          onChange="updateFilter(this);"/>
		       </td>
		     </tr>
		     <tr>
		       <td><label for="filter-date-to">Bis:</label></td>
		       <td>
		        <input id="filter-date-to"
		          dojoType="dijit.form.DateTextBox"
		          name="filter-date-to"
		          onChange="updateFilter(this);"/>
		        </td>
		     </tr>            
		   </table>
		   <button dojoType="dijit.form.Button" onClick="resetTimeFilter()">Zurücksetzen</button>
		 </div>
           
		<!-- Categories -->
		<div dojoType="dijit.TitlePane" title="Kategorie" open="false">
        <table>
        
           <tr><td>
            <input id="filter-categories-all"
              dojoType="dijit.form.CheckBox" 
              onChange="toggleFilter(this,'filter_category')" 
              checked/>
          </td><td>
            <label for="filter-group-1">Alle</label><br/>
          </td></tr>
                  
          <tr><td>
            <input  id="filter-event" 
              dojoType="dijit.form.CheckBox" 
              name="filter_category" 
              value="event"
              onChange="updateFilter(this);"/>
          </td><td>
            <label for="filter-event">Termine</label><br/>
          </td></tr>

          <tr><td>
            <input 
              dojoType="dijit.form.CheckBox" 
              id="filter-document" name="filter_category" 
              value="document"
              onChange="updateFilter(this);"/>
          </td><td>
            <label for="filter-document">Dokumente</label><br/>
          </td></tr>

          <tr><td>
            <input 
              dojoType="dijit.form.CheckBox" 
              id="filter-minutes" 
              name="filter_category" 
              value="minutes"
              onChange="updateFilter(this);"/>
          </td><td>
            <label for="filter-minutes">Protokolle</label><br/>
          </td></tr>
          
          <tr><td>
            <input 
              dojoType="dijit.form.CheckBox" 
              id="filter-consult" 
              name="filter_category" 
              value="consult"
              onChange="updateFilter(this);"/>
          </td><td>
            <label for="filter-consult">Beratungsprozesse</label><br/>
          </td></tr>

          <tr><td>
            <input 
              dojoType="dijit.form.CheckBox" 
              id="filter-result" 
              name="filter_category" 
              value="result"
              onChange="updateFilter(this);"/>
          </td><td>
             <label for="filter-result">Ergebnisse</label><br/>
          </td></tr>
          
          <tr><td>
            <input 
              dojoType="dijit.form.CheckBox" 
              id="filter-stumble" name="filter_category" value="stumble" 
              onChange="updateFilter(this);"/>
          </td><td>
             <label for="filter-stumble">Stolpersteine</label><br/>
          </td></tr>
          
          <tr><td>
            <input 
              dojoType="dijit.form.CheckBox" 
              id="filter-hint" name="filter_category" value="hint"
              onChange="updateFilter(this);"/>
          </td><td>
            <label for="filter-hint">Tipps/Links</label><br/>
          </td></tr>            
          
          <tr><td>
            <input 
              dojoType="dijit.form.CheckBox" 
              id="filter-idea" name="filter_category" value="idea"
              onChange="updateFilter(this);"/>
          </td><td>
            <label for="filter-idea">Ideen</label><br/>
          </td></tr>                  

          <tr><td>
            <input 
              dojoType="dijit.form.CheckBox" 
              id="filter-coop" name="filter_category" value="coop"
              onChange="updateFilter(this);"/>
          </td><td>
             <label for="filter-coop">Kooperationen</label><br/>
          </td></tr>            

          <tr><td>
            <input dojoType="dijit.form.CheckBox" 
               id="filter-photo" name="filter_category" value="photo"
               onChange="updateFilter(this);"/>
          </td><td>
            <label for="filter-photo">Photos</label><br/>
          </td></tr>   

          <tr><td>
            <input dojoType="dijit.form.CheckBox" 
               id="filter-misc" name="filter_category" value="misc"
               onChange="updateFilter(this);"/>
          </td><td>
            <label for="filter-misc">Sonstiges</label><br/>
          </td></tr>                                     
          
        </table>
		  </div>
		  
		  <!-- Categories (Topics) -->
       <div dojoType="dijit.TitlePane" title="Themen" open="false">
        <table>
        	<?php foreach( $categoryData as $c ):?>
          <tr><td>
            <input dojoType="dijit.form.CheckBox" 
               id="filter-<?php echo $c['namedId']; ?>" name="filter_category" value="<?php echo $c['namedId']; ?>"
               onChange="updateFilter(this);"/>
          </td><td>
            <label for="filter-<?php echo $c['namedId']; ?>" id="l-<?php echo $c['namedId']; ?>"><?php echo $c['name']; ?></label><br/>
            <div dojoType="dijit.Tooltip" connectId="l-<?php echo $c['namedId']; ?>" position="above">
              <?php echo $c['description']; ?>
            </div>            
          </td></tr>
          <?php endforeach; ?>
        </table>
        </div>          
          
		  
		  <!-- group -->
      <div dojoType="dijit.TitlePane" title="Gruppe" open="false">
        <table>
          
           <tr><td>
            <input 
              id="filter-group-all"
              dojoType="dijit.form.CheckBox" 
              onChange="toggleFilter(this,'filter_group');" 
              checked/>
          </td><td>
            <label for="filter-group-all">Alle</label><br/>
          </td></tr>
          
          <tr><td>
            <input dojoType="dijit.form.CheckBox" 
               id="filter-group-2" name="filter_group" value="ownCompany"
               onChange="updateFilter(this);"/>
          </td><td>
            <label for="filter-group-2">Eigenes Unternehmen</label><br/>
          </td></tr>
          
          <tr><td>
            <input dojoType="dijit.form.CheckBox" 
               id="filter-group-3" name="filter_group" value="ownConsultant"
               onChange="updateFilter(this);"/>
          </td><td>
             <label for="filter-group-3">Berater (Eigenes Unternehmen)</label><br/>
          </td></tr>
          
          <tr><td>
            <input dojoType="dijit.form.CheckBox" 
               id="filter-group-4" name="filter_group" value="allConsultants"
               onChange="updateFilter(this);"/>
          </td><td>
            <label for="filter-group-4">Alle Berater/innen</label><br/>
          </td></tr>                          

          <tr><td>
            <input dojoType="dijit.form.CheckBox" 
               id="filter-group-5" name="filter_group" value="analyst"
               onChange="updateFilter(this);"/>
          </td><td>
             <label for="filter-group-5">Wissenschaftliche Begleitung</label><br/>
          </td></tr>                               
                
        </table>
      </div>		
      
      <!-- Author -->
      <div dojoType="dijit.TitlePane" title="Verfasser/innen" open="false">
        <div> 
	        <table 
	          id="filterAuthorGrid"
	          dojoType="dojox.grid.DataGrid" 
	          autowidth="true" 
	          height="200px"
	          onRowClick="toggleSelectUserTableOnRowClick">
						<thead>
							<tr>							 
								<th field="selected" cellType="dojox.grid.cells.Bool" width="16px" editable="true">☒</th>
								<th field="name" width="110px" formatter="formatUserName">Name</th>							
							</tr>
						</thead>	          
	        </table>
        </div>
      </div>
      
      <div dojoType="dijit.TitlePane" title="Zusammenfassung" open="true">
        <div id="filter-description" class="infoText"></div>
      </div>        
      
    </div>
			
	  <!----------------------- right column ----------------------->
	  
    <div id="rightCol" class="edgePanel"
      data-dojo-type="dijit.layout.ContentPane"
      data-dojo-props="region: 'right'">
      
      <!-- header -->
      <div class="column-header" id="rightColHeader">Neuen Eintrag schreiben</div>
      
      <!-- Toolbar -->
      <div>
				
        <!-- categories --> 
        <div dojoType="dijit.form.DropDownButton">
          <span>Kategorien</span>
          <div dojoType="dijit.TooltipDialog" id="entryCategories" 
            title="Kategorien:" >
            <table>
            
              <tr><td>
                <input 
                  dojoType="dijit.form.CheckBox" 
                  id="c-event" name="categories" value="event"
                  onChange="updateMessageData(this);dojo.style( dojo.byId('timeChooserContainer'), 'display', this.get('value')?'inline':'none' )"/>
              </td><td>
                <label for="c-event">Termin</label><br/>
              </td></tr>
              
              <tr><td>
                <input 
                  dojoType="dijit.form.CheckBox" 
                  id="c-document" name="categories" value="document"
                  onChange="updateMessageData(this);"/>
              </td><td>
                <label for="c-document">Dokument</label><br/>
              </td></tr>     
              
              <tr><td>
                <input 
                  dojoType="dijit.form.CheckBox" 
                  id="c-minutes" name="categories" value="minutes"
                  onChange="updateMessageData(this);"/>
              </td><td>
                <label for="c-minutes">Protokoll</label><br/>
              </td></tr>                          
              
              <tr><td>
                <input dojoType="dijit.form.CheckBox" 
                   id="c-consult" name="categories" value="consult"
                   onChange="updateMessageData(this);"/>
              </td><td>
                <label for="c-consult">Beratungsprozess</label><br/>
              </td></tr>

              <tr><td>
                <input dojoType="dijit.form.CheckBox" 
                   id="c-result" name="categories" value="result"
                   onChange="updateMessageData(this);"/>
              </td><td>
                 <label for="c-result">Ergebnis</label><br/>
              </td></tr>
              
              <tr><td>
                <input dojoType="dijit.form.CheckBox" 
                   id="c-stumble" name="categories" value="stumble"
                   onChange="updateMessageData(this);"/>
              </td><td>
                 <label for="c-stumble">Stolperstein</label><br/>
              </td></tr>
              
              <tr><td>
                <input dojoType="dijit.form.CheckBox" 
                   id="c-hint" name="categories" value="hint"
                   onChange="updateMessageData(this);"/>
              </td><td>
                <label for="c-hint">Tipps/Links</label><br/>
              </td></tr>                
              
              <tr><td>
                <input dojoType="dijit.form.CheckBox" 
                   id="c-idea" name="categories" value="idea"
                   onChange="updateMessageData(this);"/>
              </td><td>
                <label for="c-idea">Idee</label><br/>
              </td></tr>       
              
              <tr><td>
                <input dojoType="dijit.form.CheckBox" 
                   id="c-question" name="categories" value="question"
                   onChange="updateMessageData(this);"/>
              </td><td>
                <label for="c-question">Frage</label><br/>
              </td></tr> 
    
              <tr><td>
                <input dojoType="dijit.form.CheckBox" 
                   id="c-coop" name="categories" value="coop"
                   onChange="updateMessageData(this);"/>
              </td><td>
                 <label for="c-coop">Kooperation</label><br/>
              </td></tr>       
              
              <tr><td>
                <input dojoType="dijit.form.CheckBox" 
                   id="c-photo" name="categories" value="photo"
                   onChange="updateMessageData(this);"/>
              </td><td>
                 <label for="c-photo">Foto</label><br/>
              </td></tr>       
    
              <tr><td>
                <input dojoType="dijit.form.CheckBox" 
                   id="c-misc" name="categories" value="misc"
                   onChange="updateMessageData(this);"/>
              </td><td>
                <label for="c-misc">Sonstiges</label><br/>
              </td></tr>                                     
              
            </table>
          </div>
        </div>				
        
        <!-- time -->
        <span id="timeChooserContainer" style="display:none">
        <span 
          id="timeChooser"
          dojoType="dijit.form.DropDownButton">
          <span>Zeit</span>
          <div dojoType="dijit.TooltipDialog" id="entryEventTime" title="Zeitinformationen">
            <table>
              <tr>
                <td><label for="entry-date">Datum:</label></td>
                <td><input 
                  id="entry-date"
                  dojoType=dijit.form.DateTextBox name="date" 
                  onChange="updateMessageData(this);"/></td>
              </tr>
              <tr>
                <td><label for="entry-time-from">Beginnt:</label></td>
                <td><input 
                  id="entry-time-from"
                  dojoType=dijit.form.TimeTextBox name="from" 
                  onChange="updateMessageData(this);"/></td>
              </tr>
                <tr>
                  <td><label for="entry-time-to">Endet:</label></td>
                  <td><input 
                    id="entry-time-to"
                    dojoType=dijit.form.TimeTextBox name="to" 
                    onChange="updateMessageData(this);"/></td>
                </tr>               
            </table>
          </div>
        </span>   
       </span>        
				
  			<!-- categories --> 
        <div dojoType="dijit.form.DropDownButton">
          <span>Themen</span>
          <div dojoType="dijit.TooltipDialog" id="entryTopics" 
            title="Themen:" >
            <table>
            	<?php foreach( $categoryData as $c ):?>
              <tr><td>
                <input dojoType="dijit.form.CheckBox" 
                   id="c-<?php echo $c['namedId']; ?>" name="categories" value="<?php echo $c['namedId']; ?>"
                   onChange="updateMessageData(this);"/>
              </td><td>
                <label for="c-<?php echo $c['namedId']; ?>" id="l-<?php echo $c['namedId']; ?>"><?php echo $c['name']; ?></label><br/>
                <div dojoType="dijit.Tooltip" connectId="l-<?php echo $c['namedId']; ?>" position="above">
                  <?php echo $c['description']; ?>
                </div>            
              </td></tr>
              <?php endforeach; ?>            	
              </table>
            </div>
          </div>				
				
				<!-- Access -->
	        <div dojoType="dijit.form.DropDownButton">
	          <span>Freigabe</span>
	          <div 
	            id="entryAccess"
	            dojoType="dijit.TooltipDialog" title="Eintrag sichtbar für:">
			        <table>
			        
                <tr><td>
                  <input dojoType="dijit.form.CheckBox" 
                     id="access-all" name="access" value="allMembers"
                     onChange="updateMessageData(this);"/>
                </td><td>
                  <label for="access-all">Alle</label><br/>
                </td></tr>  			        
			          
			          <tr><td>
			            <input dojoType="dijit.form.CheckBox" 
			               id="access-2" name="access" value="ownCompany"
			               onChange="updateMessageData(this);"/>
			          </td><td>
			            <label for="access-2">Eigenes Unternehmen</label><br/>
			          </td></tr>
			          
			          <tr><td>
			            <input dojoType="dijit.form.CheckBox" 
			               id="access-3" name="access" value="ownConsultant"
			               onChange="updateMessageData(this);"/>
			          </td><td>
			             <label for="access-3">Berater (Eigenes Unternehmen)</label><br/>
			          </td></tr>
			          
			          <tr><td>
			            <input dojoType="dijit.form.CheckBox" 
			               id="access-4" name="access" value="allConsultants"
			               onChange="updateMessageData(this);"/>
			          </td><td>
			            <label for="access-4">Alle Berater/innen</label><br/>
			          </td></tr>                          
			
			          <tr><td>
			            <input dojoType="dijit.form.CheckBox" 
			               id="access-5" name="access" value="analyst"
			               onChange="updateMessageData(this);"/>
			          </td><td>
			             <label for="access-5">Wissenschaftliche Begleitung</label><br/>
			          </td></tr>       
			
		           <tr><td>
			            <input dojoType="dijit.form.CheckBox" 
			               id="access-moreMembers" name="access" value="moreMembers" 
			               onChange="updateMessageData(this);if(this.get('value')&& !this.get('readOnly') && !window.__populatingForms)dijit.byId('chooseUsersDialog').show()" />
			          </td><td>
			            <label onClick="if(!dijit.byId('access-moreMembers').get('readOnly'))dijit.byId('chooseUsersDialog').show()">Einzelne Teilnehmer</label><br/>
			          </td></tr>                                  
			        </table>
			        
			        <div id="access-readonly-explanation" class="infoTextSmall">
			          Die Freigabe folgt den Einstellungen<br> 
			          des Eintrags, auf den geantwortet wird,<br>
			          und kann nicht verändert werden.
			        </div>
	          </div>
	        </div>
	          
		<!-- uploader -->
        <div
           id="entryAttachmentUploader" 
           dojoType="dijit.form.DropDownButton">
            <span><span id="attachment_count">0</span>&nbsp;<img src="img/attach.png"/></span>
            <div 
             id="attachment_uploader_dialog"
              dojoType="dijit.TooltipDialog"  
              title="Anhänge"
              style="width:300px">
              
             <fieldset >
                 <legend>Anhänge</legend>
                 <div id="attachment_filelist">
                 </div>
             </fieldset>	              
              
			        <form 
			          id="attachment_uploader_form"
			          method="post" 
			          action="" 
			          enctype="multipart/form-data" >
			            <fieldset >
			                <legend>Dateien hochladen</legend>
			                <div class="infoTextSmall">
			                  Bitte wählen Sie einen Anhang aus (1.) und laden Sie ihn dann hoch (2.).
			                  Wenn Sie zusätzliche Dateien anhängen oder Dateien löschen, denken 
			                  Sie daran, den Beitrag danach abzuspeichern. 
			                </div>
			                <input 
			                  id="attachment_uploader"
			                  name="uploadedfile" 
			                  type="file" 
			                  force="iframe"
			                  dojoType="dojox.form.Uploader" 
			                  label="1. Datei auswählen" />
			                <div id="attachment_uploader_files" 
			                  dojoType="dojox.form.uploader.FileList"
			                  uploaderId="attachment_uploader"></div>
			                <input 
			                  id="attachment_uploader_sendbutton"
			                  dojoType="dijit.form.Button"
			                  type="submit" label="2. Datei hochladen"
			                  onClick="beginUpload(this)"
			                  disabled />
			                <div id="attachment_uploader_error"></div>
			            </fieldset>
			        </form> 

				    </div>        
					</div>  
				</div>            
        

        <!-- Message Editor -->
        <div 
          id="entryEditor"
          data-dojo-type="dijit.Editor"
          data-dojo-props="plugins:['bold','insertUnorderedList','createLink','unlink','pastefromword','fullscreen']">
        </div>
        <div id="editorStandByOverlay" dojoType="dojox.widget.Standby" target="entryEditor"></div>
        
 		
        <!-- send button -->
        <div id="submitEntryContainer">
          <button id="submitEntryButton" 
            dojoType="dijit.form.Button" 
            onClick="submitEntry();"
            disabled>Senden</button>
          <button id="cancelEntryButton" 
            disabled
            dojoType="dijit.form.Button" 
            onClick="resetEditor();">Abbrechen</button>  
        </div>
        
        <!-- Informational message -->
        <p id="entryInformationMessage" class="infoTextSmall"></p>
              
    </div>		
   <!----------------------- footer ----------------------->
    
    <div id="footer" class="edgePanel"
      data-dojo-type="dijit.layout.ContentPane"
      data-dojo-props="region: 'bottom'">
      <button id="printButton" 
        dojoType="dijit.form.Button" 
        onClick="printEntries();">Einträge drucken</button>      
      <button id="calenderButton" 
        dojoType="dijit.form.Button" 
        onClick="window.open('../../build?ds=' + (window.location.params.ds||'') + '#sessionId~S_' + sessionId,'logbuch');">Kalender</button>
      <button id="addressBookButton" 
        dojoType="dijit.form.Button" 
        onClick="window.open('../../build?ds=' + (window.location.params.ds||'') + '#view~users^sessionId~S_' + sessionId,'logbuch');">Teilnehmer/innen</button>
    </div> 	
	</div>
	
	<!----------------------- login dialog ----------------------->
	<div id="loginDialog" 
	 dojoType="dijit.Dialog"  
	 title="LogBuch TeamBlog: Bitte anmelden"
	 execute="authenticate(arguments[0].name +','+arguments[0].password);">
	  <table>
	    <tr>
	      <td width="70px"><label for="name">Name: </label></td>
	      <td width="200px"><input dojoType="dijit.form.TextBox" type="text" name="name" id="name"/></td>
	    </tr>
	    <tr>
	      <td><label for="loc">Passwort: </label></td>
	      <td><input dojoType="dijit.form.TextBox" type="password" name="password" id="password"/></td>
	    </tr>
	    <tr>
	      <td colspan="2" align="center">
	        <button dojoType="dijit.form.Button" type="submit">Anmelden</button>
	        <button dojoType="dijit.form.Button" onclick="window.open('../../build#view~register')">Registrieren</button>
	        
	      </td>
	    </tr>
	  </table>
	</div>	
	
	<!----------------------- choose user(s) dialog ----------------------->
  <div dojoType="dijit.Dialog" 
    id="chooseUsersDialog" 
    title="Bitte Benutzer/innen auswählen"
    execute="updateMessageData(this);">
    <table 
      id="chooseUsersGrid"
      dojoType="dojox.grid.DataGrid" 
      autoWidth="true" 
      height="300px"
      onRowClick="toggleSelectUserTableOnRowClick">
      <thead>
        <tr>
          <th field="selected" cellType="dojox.grid.cells.Bool" width="16px" editable="true">☒</th>
          <th field="name" width="200px">Name</th>
          <th field="organization" width="200px">Firma</th>
          <th field="online" width="50px" width="100px" formatter="getOnlineStatusHtml">Online</th>
        </tr>
      </thead>             
    </table>
    <button dojoType="dijit.form.Button" type="submit">Schließen</button>
  </div>  
	
	<!----------------------- focus box ----------------------->
  <div id="focusBox" ></div>
	
</body>
</html>