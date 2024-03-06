// require your server and launch it
const server = require('./api/server');

const port = 1234;

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
