const socket = io.connect();

socket.on('messages', data =>{
    console.log(data);
})

function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    //El return false previene el funcionamiento del comportamiento por default del submit que hace un refresh de la página, con el 'false' ya se previene esa acción no deseada.
    return false;
}


socket.on('messages', data => { render(data); });
