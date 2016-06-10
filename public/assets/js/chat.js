$(document).ready(function() {
	var messageList = $('#chat_messages');
	var messageField = $('#sendie');
	var lastMsg = '';
	var lastMsgTime = '';
	var chat = new Firebase("https://csgo-prod.firebaseio.com" + CHAT_CONNECT);
	$('#chatScroll').css('height', $(window).innerHeight() - 120);
	$('#chatScroll').perfectScrollbar();
	function sendMessage() {
      	var message = messageField.val();
	    var maxlength = 200;
	    if (message.length > maxlength) {
	    	$.notify('Максимум 200 символов');
	        return;
	    }
		message = message.trim();
	    if (!message) {
	    	$.notify('Вы ничего не ввели!');
	        return;
	    }
		if (lastMsgTime && new Date - lastMsgTime < 1000 * 5) {
			$.notify('1 сообщение в 5 секунд');
	        return;
	    }
	    lastMsgTime = new Date;
	    lastMsg = message;
      	$.ajax({
		  url: '/ajax/chat',
		  type: "POST",
		  data: { 
		  	'type': 'push',
		  	'message': message
		  },
		  success: function(data) {
		  	if(!data.success) {
		  		$.notify(data.text);
		  		return;
		  	} 
		  	messageField.val('');
		  }
		});
	}
	$('#chatScroll').on('click', '.removeMSG',function() {
       	self = this;
		$.ajax({
		  url: '/ajax/chat',
		  type: "POST",
		  data: { 
		  	'type': 'remove',
		  	'id': $(self).attr('data-ids'),
			  'steamid': $(self).attr('data-steamids'),
			  'ban': true
		  },
		  success: function(data) {
		  	if(!data.success) {
		  		$.notify(data.text);
		  		return;
		  	} 
		  }
		});
        return false;
    });
	$('#clearChat').on('click',function(){
		var lastCount = 10;
		$.each($('.removeMSG').get().reverse(),function(){
			lastCount--;
			if(lastCount<0)
				return false;
			self = this;
			$.ajax({
				url: '/ajax/chat',
				type: "POST",
				data: {
					'type': 'remove',
					'id': $(self).attr('data-ids'),
					'steamid': $(self).attr('data-steamids'),
					'ban': false
				},
				success: function(data) {
					if(!data.success) {
						$.notify(data.text);
						return;
					}
				}
			});
		});
	});
	messageField.keypress(function (e) {
	    if (e.keyCode == 13) {
	    	sendMessage();
	    	return false;
	    }
	});
	var msgs = chat.limitToLast(50);
	msgs.on('child_removed', function (snapshot) {
	    var data = snapshot.val();

	    $('.chatMessage[data-uuid='+snapshot.key()+']').remove();
	    $("#chatScroll").perfectScrollbar('update');
	});
	msgs.on('child_added', function (snapshot) {
		var a = $("#chatScroll")[0];
		var isScrollDown = Math.abs((a.offsetHeight + a.scrollTop) - a.scrollHeight) < 5;
	    //GET DATA
	    var data = snapshot.val();
	    data.uuid = snapshot.key();
	    var username = data.username || "Error";
	    var message = data.message;
	    var avatar = data.avatar;
	    var steamid = data.steamid;
	    console.log(data);
	   	if(data.is_moderator == "1") {
	    	username = 'Модератор ('+username+')';
	    }
	    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
	    var messageElement = $("<div class='chatMessage clearfix' data-uuid='"+data.uuid+"'>");
	    var msg = $('<div class="body"></div>');
	    var nameElement = $("<a href='#' class='login'></a>");
	    var avatarElement = $("<img class='removeMSG' data-ids='"+data.uuid+"' data-steamids='"+data.steamid+"' style='height: 32px; width: 32px;' />");
	    avatarElement.attr('src', avatar);
	    nameElement.attr('data-profile', steamid);
	   	if(data.is_vip == "1") {
	    	nameElement.attr('style', 'color:orange;');
	    }
	   	if(data.is_moderator == "1") {
	    	nameElement.attr('style', 'color:green;');
	    }
	    msg.text(message);
	    nameElement.text(username);
	    messageElement.html(msg).prepend(nameElement).prepend(avatarElement);

	    //ADD MESSAGE
	    messageList.append(messageElement);
	    if (isScrollDown) a.scrollTop = a.scrollHeight;
	    $("#chatScroll").perfectScrollbar('update');
  	});
});