$ = require('jquery');
var io = require('socket.io-client').connect();
 
const socket = io.connect('localhost:3000', {
    reconnectionAttempts: 4,
    reconnectionDelay: 1000
});

$(() => {
  $('#hostFile').on('click', () => {
      var filePath = $('#filePath').val();
      console.log("Host File Path : " + filePath);
      socket.emit('hostFile', filePath);
  });

  socket.on('fileList', fileList => {
    var fileHtml = ""
    fileList.forEach(file => {
      fileHtml += `
                <div id="content">
                    <h2>${file.name}</h2>
                <ul>`
      file.servers.forEach(server => {
        fileHtml += `<li>${server}</li>`
      })
      fileHtml += `
                </ul>
                </div>
                <div id="right_column">
                    <button class="fileDownload"
                    id="${file.id}">Download</button>
                </div>
            `
    })
    $('#fileList').html(fileHtml);
  });
  
});