/**
 * ...
 * 
 * 
 * Dokumentation of messgages that are passed through the sandbox
 * (with the type of data that is sent as message)
 * 
 * ready
 *    Published when all server communication needed to set up the app has 
 *    been finished.
 * 
 * authenticated
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
 */
