window.addEventListener("load", function() {
  "use strict"

  function logError() {
    var message = Array.prototype.slice.call(arguments).join("")
    console.log("GitHub notifications: " + message)
  }

  var Requests = {
    get : function(url, callback) {
      var request = new XMLHttpRequest()
      request.open("GET", url, false)
      request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
      request.onreadystatechange = function() {
        if(request.readyState !== XMLHttpRequest.DONE) {
          return
        }

        if(request.status === 200) {
          callback(request.responseText)
        }
        else {
          logError("Request error = ", JSON.stringify(request, null, "\t"))
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
      else {
        logError("Element with count of notifications not found")
      }
    })

    return count
  }

  function update() {
    try {
      var count = getGithubNotificationsCount(),
        outputElement = document.getElementById("notifications-count")

      if(isNaN(count) || count === 0) {
        outputElement.innerText = ""
        opr.speeddial.update({
          title: "GitHub",
          url: widget.preferences["base-url"],
        })
      }
      else {
        outputElement.innerText = count
        opr.speeddial.update({
          title: "GitHub (" + count + ")",
          url: widget.preferences["notifications-url"],
        })
      }
    }
    catch(e) {
      logError(e.stacktrace)
    }
    finally {
      setTimeout(update, widget.preferences["update-interval"] * 1000)
    }
  }

  update()
}, false)
