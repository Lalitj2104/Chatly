import express from "express";
import { router } from "./routes/user.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import { cRouter } from "./routes/chat.js";
import { adminRouter } from "./routes/admin.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
const app = express();

export const server = createServer(app);
const io = new Server(server, {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/user", router);
app.use("/chats", cRouter);
app.use("/admin", adminRouter);

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
