/**
 * ...
 * 
 * 
 * Dokumentation of messgages that are passed through the sandbox
 * (with the type of data that is sent as message, if any)
 * 
 * ready
 *    Published when all server communication needed to set up the app has 
 *    been finished.
 * 
 * authenticated (Boolean)
 *    Published when the user information is updated after a login attempt
 *    or a passive authentication using the session id. True when an authenticated
 *    user exists, false if anonymous
 *    
 * logout
 *    dispatched when user logs out or is logged out 
 * 
 * change-date (Date)
 *    The date that is currently selected in the calendar
 *   
 * activate-category (String|null)
 *    If string, show the controls connected with a category and hide all controls
 *    unrelated to it. If null, hide all category controls and show calendar
 *    
 * activate-calender-cell (Object)
 *    Published when user double-clicks on a calendar cell. Data is an object with
 *    key "date" (Date) and "category" (String).    
 * 
 * message (Object) FIXME
 *    Publishes a new category item as a message item. The message object has the 
 *    following structure: {
 *      subject     : String,           // The message subject
 *      body        : String,           // The message body
 *      tags        : Array|null        // (Optional) An array of tags associated with the message
 *      category    : String,           // The logbuch category that created this message  
 *      itemDateStart   : Date,             // The date connected with this message
 *      itemDateEnd     : Date|undefined,   // (Events only) The date of the end of the event 
 *    }
 *    
 *  new-category-item (Object)
 *    {
 *      category : String,
 *      date     : Date
 *    }
 *    
 *  organizations-updated 
 *      When there has been an update to the organization data
 *      
 *  users-updated
 *      When there has been an update to the user data
 */
