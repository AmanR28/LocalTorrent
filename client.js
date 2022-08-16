$ = require('jquery');
var io = require('socket.io-client').connect();
 
const socket = io.connect('localhost:3000', {
    reconnectionAttempts: 4,
    reconnectionDelay: 1000
});

$(() => {
  // Host File
  $('#hostFile').on('click', () => {
      var filePath = $('#filePath').val();
      console.log("Host File Path : " + filePath);
      socket.emit('hostFile', filePath);
  });

  // Host File List
  socket.on('hostFileSuccess', (res, files) => {
    if (res == "");
    else if (res == "HOST_FILE_FAIL") alert('Error Hosting File');
    else if (res == "HOST_FILE_EXIST") alert('File Already Hosted');
    else if (res == "HOST_FILE_SUCCESS") { 
      var hostFileHtml = "";
      console.log(files)
      files.forEach(file => hostFileHtml += `<li>${file.name}</li>`)
      $('#hostFileList').html(hostFileHtml);
      alert('File Hosted successfully');
    }
  })

// Set Download Path
  $('#setDownloadPath').on('click', () => {
      var downloadPath = $('#downloadPath').val();
      console.log("Download Path : " + downloadPath);
      socket.emit('setDownloadPath', downloadPath);
  });
  socket.on('checkDownloadPath', res => {
    res ? alert('Download Path Set') : alert('Error Setting Download Path');
  });
  
  // Download File List
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
                    <button class="fileDownload" id="${file.id}">Download</button>
                </div>
            `
    })
    $('#fileList').html(fileHtml);
    $('.fileDownload').on('click', (e) => {
      console.log("Download File ID : " + JSON.stringify(e.target.id));
      socket.emit('fileDownload', e.target.id);
    })
  });

  socket.on('fileDownloading', res => {
    alert(res);
  })
});