import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import clientRegister from "./src/routes/ClientRoutes.js";
import clientLogin from "./src/routes/ClientLoginRoutes.js";
import adminRegister from "./src/routes/AdminRoutes.js";
import adminLogin from "./src/routes/AdminLoginRoutes.js";
import ticket from "./src/routes/TicketRoutes.js";
import logout from "./src/routes/LogoutRoute.js";
import wompi from "./src/routes/WompiRoute.js";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/clientRegister", clientRegister);
app.use("/api/loginClient", clientLogin);
app.use("/api/adminRegister", adminRegister);
app.use("/api/loginAdmin", adminLogin);
app.use("/api/ticket", ticket);
app.use("/api/logout", logout);
app.use("/api/wompi", wompi);


export default app;
