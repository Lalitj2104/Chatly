import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { errorMiddleware } from "./middlewares/error.js";
import { Message } from "./models/message.js";
import { adminRouter } from "./routes/admin.js";
import { cRouter } from "./routes/chat.js";
import { router } from "./routes/user.js";



const app = express();

export const server = createServer(app);
const io = new Server(server, {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
	origin:"http://localhost:5173",
	credentials:true
}))
app.use("/api/v1/user", router);
app.use("/api/v1/chats", cRouter);
app.use("/api/v1/admin", adminRouter);

export const userSocketIDs = new Map();

io.use((socket,next)=>{
 
})
io.on("connection", (socket) => {
	const user = { _id:"asdsdsa", name:"server" };

    //all currently active users
	userSocketIDs.set(user._id.toString(), socket.id);
	console.log("a user connected", socket.id);
	socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
		const messageForRealTime = {
			content: message,
			_id: uuid(),
			sender: {
				_id: user._id,
				name: user.name,
			},
			chat: chatId,
			createdAt: newDate().toISOString(),
		};
		const messageForDB = {
			content: message,
			sender: user._id,
			chat: chatId,
		};
        //to whom we have to send message
        const usersSocket= getSockets(members);
        io.to(usersSocket).emit(NEW_MESSAGE,{
            chatId,
            message:messageForRealTime
        });
        io.to(usersSocket).emit(NEW_MESSAGE_ALERT,{chatId})

		await Message.create(messageForDB);
	});

	socket.on("disconnect", () => {

		console.log("User disconnected");
        userSocketIDs.delete(user._id.toString())
	});
});
app.use(errorMiddleware);

export default app;
