import express from "express";
import resultRoute from "./routes/result.route";
import userRoute from "./routes/user.route";
import authRoute from "./routes/auth.route";
import dashboardRoute from "./routes/dashboard.route";
import cors from "cors"
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const port = 8000;


app.use("/api", resultRoute);
app.use("/api", userRoute);
app.use("/api", authRoute);
app.use("/api", dashboardRoute);

app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
})