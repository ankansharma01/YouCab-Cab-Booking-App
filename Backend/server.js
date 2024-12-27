const http = require("http");
const App = require("./App");
const { initializeSocket } = require('./socket');


const PORT = process.env.PORT || 3000;
const server = http.createServer(App);
initializeSocket(server);
server.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
