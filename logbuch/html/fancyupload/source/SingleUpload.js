/**
 * Single File upload
 *
 * @license		MIT License
 * @author		Harald Kirschner <mail [at] digitarald [dot] de>
 *            Christian Boulanger
 * @copyright	Authors
 */

window.addEvent('domready', function() {
  
  var dialog = top.dialog.Dialog;
  
  var target = $('photo');

	// Uploader instance
	var swf = new Swiff.Uploader({
    
    /*
     * properties
     */
		path          : 'source/Swiff.Uploader.swf',
		url           : 'server/script.php',
		verbose       : true,
		queued        : false,
		multiple      : false,
		target        : target,
		instantStart  : true,
		
    typeFilter    : {
											'Images (*.jpg, *.jpeg, *.gif, *.png)': '*.jpg; *.jpeg; *.gif; *.png'
										},
		
    fileSizeMax   : 2 * 1024 * 1024,
    
    /*
     * event handlers
     */
		onSelectSuccess: function(files) {
			//console.log('Starting Upload', 'Uploading <em>' + files[0].name + '</em> (' + Swiff.Uploader.formatUnit(files[0].size, 'b') + ')');
			this.setEnabled(false);
		},
    
    onSelectFail: function(files) {
			dialog.alert('<em>' + files[0].name + '</em> was not added!', 'Please select an image smaller than 2 Mb. (Error: #' + files[0].validationError + ')');
		},
		
    appendCookieData: true,
		
    onQueue: function(){},
		
    /*
     * when finished
     */
    onFileComplete: function(file) 
    {
			
			if (file.response.error) 
      {
        //console.log(file.response)
				dialog.alert( 'Uploading <em>' + this.fileList[0].name + '</em> failed, please try again. (Error: #' + this.fileList[0].response.code + ' ' + this.fileList[0].response.error + ')');
			} 
      else 
      {
				var name = file.name;
        //console.log('Successful Upload of ' + name );
        document.body.__imageField.setValue(name);
			}
			
			file.remove();
			this.setEnabled(true);
		},
    
		onComplete: function() 
    {
			//
		}
	});

	// Image 
	target.addEvents({
    
		click: function() {
			return false;
		},
		
    mouseenter: function() {
			swf.reposition();
		},
		
    mouseleave: function() {
			this.blur();
		},
		
    mousedown: function() {
			this.focus();
		}
	});

});