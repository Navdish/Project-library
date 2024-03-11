const {Server} = require("socket.io")

module.exports = async(server) => {
    const io = new Server (server, {
        cors : {
            origin: "http://localhost:3000",
            methods:["GET", "POST", "PUT"]
        },
    })
    io.on("connection", (socket)=> {
        console.log("user socket id : ", socket.id);

        socket.on("join room", (roomId)=> {
            socket.join(roomId);
            console.log("Room ....", roomId)
        })

        

        
        socket.on('disconnect', () => {
            console.log('Client disconnected');
          });

    })
};