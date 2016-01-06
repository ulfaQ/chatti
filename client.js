
var serverUrl = "http://" + window.location.host + '/api/';
var serverUrlSendMessage = serverUrl + "send/";
var serverUrlGetMessages = serverUrl + "get/";

var userName = prompt("What's Your Name?");

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function onChatMessagesReceived(messagesJSON) {
	var box1 = document.getElementById("box1");
	var messagesArray = JSON.parse(messagesJSON);
	console.log('viestit vastaanotettu', JSON.parse(messagesJSON));
	 box1.innerHTML = "";
	for(var p = 0; p < messagesArray.length; p++) {
		box1.appendChild(document.createTextNode(messagesArray[p]));
		box1.appendChild(document.createElement('br'));
	}
}

function updateMessages() {
	httpGetAsync(serverUrlGetMessages, onChatMessagesReceived)
}

setInterval(updateMessages, 1000);

var textField;

function onLoad() {
	updateMessages();
	console.log("onLoad toimii");
	var sendButton = document.getElementById("send");
	textField = document.getElementById("textfield");
	sendButton.onclick = sendMessage;
}

function sendMessageOnEnter(event) {
	if(event.keyCode === 13) {
		sendMessage();
	}
}

function sendMessage() {
	if(textField.value) {
		var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            updateMessages();
    }
    //var FD = new FormData(); // hello motherfuckers! 1 2
    //FD.append("message", textField.value);
		xmlHttp.open("POST", serverUrlSendMessage, true); // true for asynchronous
    xmlHttp.send(username, ": ", textField.value);
	}
	console.log("sendMessage toimii", textField.value);
	textField.value = "";
}
