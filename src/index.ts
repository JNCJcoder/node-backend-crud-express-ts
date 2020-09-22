import "reflect-metadata";
import app from "./server";

const PORT = process.env.PORT || 3333;
const server = require("http").createServer(app);

console.log(`Server running in localhost:${PORT}`);
server.listen(PORT);
