opera.isReady(function(){
if (!widget.preferences.getItem("_OPERA_INTERNAL_defaultPrefsSet")){
widget.preferences.setItem("update-interval", "120");
widget.preferences.setItem("base-url", "https://github.com/");
widget.preferences.setItem("notifications-url", "https://github.com/notifications");
}
widget.preferences.setItem("_OPERA_INTERNAL_defaultPrefsSet", true);

});
