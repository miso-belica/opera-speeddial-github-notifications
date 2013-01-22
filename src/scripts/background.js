window.addEventListener("load", function() {
	"use strict"

	var Requests = {
		get : function(url, callback) {
			var request = new XMLHttpRequest()
			request.open("GET", url, false)
			request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
			request.setRequestHeader("Connection", "close")
			request.onreadystatechange = function() {
				if(request.readyState !== XMLHttpRequest.DONE) {
					return
				}

				if(request.status === 200) {
					callback(request.responseText)
				}
			}
			request.send()
		}
	}

	function getGithubNotificationsCount() {
		var count = NaN

		Requests.get(widget.preferences["notifications-url"], function(data) {
			var documentFragment = document.createElement("div")
			documentFragment.innerHTML = data
			var countElement =  documentFragment.querySelector('a[href="/notifications"] .count')

			if(countElement) {
				count = parseInt(countElement.textContent, 10)
			}
		})

		return count
	}

	function update() {
		var count = getGithubNotificationsCount(),
			outputElement = document.getElementById("notifications-count")

		if(isNaN(count) || count === 0) {
			outputElement.innerText = ""
			opera.contexts.speeddial.title = "GitHub"
			opera.contexts.speeddial.url = widget.preferences["notifications-url"]
		}
		else {
			outputElement.innerText = count
			opera.contexts.speeddial.title = "GitHub (" + count + ")"
			opera.contexts.speeddial.url = widget.preferences["base-url"]
		}
	}

	setInterval(update, widget.preferences["update-interval"])
	update()
}, false)