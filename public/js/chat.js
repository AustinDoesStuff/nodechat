var socket = io();

function scrollToBottom() {
    //selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};

socket.on('connect', function () {
    console.log('connected to server');

    var params = jQuery.deparam();

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('we did it, fag');
        }
    });
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('updateUserList', function (users) {
    var ol = jQuery('<ul></ul>');

    users.forEach(function(name) {
        ol.append(jQuery('<li></li>').text(name));
    });

    jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        text: message.text
    });

    jQuery('#messages').append(html);
    scrollToBottom();

    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });

    jQuery('#messages').append(html);
    scrollToBottom();

    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">Check my location</a>');

    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);

    // li.append(a);

    // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('')
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser :(');
    }

    locationButton.attr('disabled', 'disabled').text('Sending...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        socket.emit('createLocationMessage', {
            latitude: lat,
            longitude: lon
        });
    }, function (err) {
        locationButton.removeAttr('disabled').text('Send Location');
        return alert("Can't find your location :(");
    });
});