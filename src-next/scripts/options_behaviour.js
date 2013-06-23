var updateIntervalElement = document.getElementById("update-interval"),
	baseUrlElement = document.getElementById("base-url")

updateIntervalElement.addEventListener("change", function() {
  widget.preferences["update-interval"] = this.value
}, false)

baseUrlElement.addEventListener("change", function() {
  widget.preferences["base-url"] = this.value
}, false)

updateIntervalElement.value = widget.preferences["update-interval"]
baseUrlElement.value = widget.preferences["base-url"]
