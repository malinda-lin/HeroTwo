// make client side connection

// query DOM
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
// emit event
btn.addEventListener('click', function() {
  socket.emit('chatmessage', {
    message: message.value,
    handle: handle.value
  });
});

// listen for events
socket.on('chatmessage', function(data) {
  output.innerHTML += `<p><strong> ${data.handle} </strong>${data.message}</p>`;
});
