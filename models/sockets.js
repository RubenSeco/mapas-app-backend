const Markers = require("./markers");

class Sockets {
  constructor(io) {
    this.io = io;

    this.markers = new Markers();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {

      console.log("Cliente conectado");

      socket.emit("markers-active", this.markers.active);

      socket.on("marker-new", (marker) => {

        this.markers.addMarker(marker);
        socket.broadcast.emit("marker-new", marker);


      });

      socket.on("marker-update", (marker) => {

        this.markers.updateMarker(marker);
        socket.broadcast.emit("marker-update", marker);
      })




    });
  }


}

module.exports = Sockets;