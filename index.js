import app from "./app.js";
import "./database.js";

async function main() {
    app.listen(4000)
    console.log("server on port 3000");
};
export default main();