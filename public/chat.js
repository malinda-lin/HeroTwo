// make client side connection

// query DOM
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// event listener on client side picks up event
// socket.emit(event name, data object)
btn.addEventListener('click', function() {
  socket.emit('chatmessage', {
    message: message.value,
    handle: handle.value
  });
});
// socket.emit creates data package to be sent to socket.on in server
message.addEventListener('keypress', function() {
  socket.emit('typing', handle.value);
});

// when data package passes through server, server sends data package back to client where it is converted to client side viewable info
socket.on('chatmessage', function(data) {
  // reset feedback innerHTML
  feedback.innerHTML = '';
  output.innerHTML += `<p><strong> ${data.handle} </strong>${data.message}</p>`;
});

socket.on('typing', function(data) {
  feedback.innerHTML += `<p><em>${data} is typing ... </em></p>`;
});
