import { Server } from "socket.io";
import { createServer } from "http";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { Auth } from "./routes/auth/Auth.js";
import { PostRouter } from "./routes/postroute/post.js";
import { DBConnection } from "./config/DBConnection.js";
import { UserRouter } from "./routes/userroute/User.js";
import { SongsRouter } from "./routes/songsroute/Songs.js";
import { ChatRouter } from "./routes/chatroute/ChatRoute.js";
import { ReelsRouter } from "./routes/reelsroute/ReelsRoute.js";
import { StickyNotes } from "./models/stickynotes/StickyNotes.js";
import { StickyNotesRouter } from './routes/stickynotesroute/StickyNotesRoute.js';
import { OldDateTimeConvert } from "./common/common.js";
// import { scheduleJob } from "node-schedule";
import { StoryRouter } from "./routes/storyroute/StoryRoute.js";
import { SaveRouter } from "./routes/saveroute/SaveRoute.js";
import { LikeRouter } from "./routes/likeroute/LikeRoute.js";
import { STORY } from "./models/story/Story.js";



const app = express();

// ==================================================================
// database connection



// ==================================================================
// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
DBConnection();

const eighthours = "*/1 * * * * *";

// export const data = scheduleJob(eighthours, () => {
//     // findStickyNotesTime();
//     // findStorysTime();
// });

const findStorysTime = async () => {
    const ids = [];
    const story = await STORY.find()
    for (let index = 0; index < story.length; index++) {
        const element = story[index];
        const datetime = OldDateTimeConvert(element.updatedAt);
        if (datetime.days >= 1) {
            ids.push(element._id);
        }
    }
    if (ids.length !== 0) {
        const deleted = await STORY.deleteMany({ _id: { $in: ids } });
        console.log("deleted", deleted);
    }
}


const findStickyNotesTime = async () => {
    try {
        const ids = [];
        const stickynotes = await StickyNotes.find()
        for (let index = 0; index < stickynotes.length; index++) {
            const element = stickynotes[index];
            const datetime = OldDateTimeConvert(element.updatedAt);
            if (datetime.days >= 1) {
                ids.push(element._id);
            }
        }
        if (ids.length !== 0) {
            const deleted = await StickyNotes.deleteMany({ _id: { $in: ids } });
            console.log("deleted", deleted);
        }
        // if (ids.length === 0) data.cancel();

    } catch (error) {
        console.log("error", error);
    }
}

// ==================================================================

const swaggerDefinition = {
    info: {
        title: 'Instagram Swagger API',
        version: '1.0.0',
        description: '',
    },
    host: process.env.HOST,
    // host: `localhost:${process.env.PORT ? process.env.PORT : 2000}`,
    basePath: '/',
    // securityDefinitions: {
    //     // bearerAuth: {
    //     //     // type: 'apiKey',
    //     //     // name: 'Authorization',
    //     //     // scheme: 'bearer',
    //     //     // in: 'header',
    //     // },
    // },
};
const options = {
    swaggerDefinition,
    apis: ['./routes/*/*.js'],
    // apis: [Auth],

};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ==================================================================
// router

app.use(Auth);
app.use(UserRouter);
app.use(PostRouter);
app.use(ReelsRouter);
app.use(SongsRouter);
app.use(ChatRouter);
// app.use(MessageRouter);
app.use(StickyNotesRouter);
app.use(StoryRouter);
app.use(SaveRouter);
app.use(LikeRouter);


app.listen(process.env.PORT ? process.env.PORT : 2000, () => {
    console.log('server started http://localhost:2000');
});


// ==================================================================
// socket

// const httpServer = createServer(app);

// const io = new Server(httpServer, {
//     pingTimeout: 60000,
//     cors: {
//         origin: ["http://localhost:3000"]
//     }
// });

// io.on("connection", (socket) => {

//     socket.on('send-message', (message) => {
//         socket.broadcast.emit('message-from-server', message);
//     });

//     socket.on('typing-started', () => {
//         socket.broadcast.emit('typing-started-from-server');
//     });

//     socket.on('typing-stoped', () => {
//         socket.broadcast.emit('typing-stoped-from-server');
//     });

//     socket.on("disconnect", () => {
//         console.log("User left...");
//     });
// });


// // ==================================================================
// // server

// httpServer.listen(process.env.PORT ? process.env.PORT : 2000, () => {
//     console.log(`server started http://localhost:${2000}`);

// });

// app.listen(process.env.PORT ? process.env.PORT: 2000, () => {
//     console.log(`server started http://localhost:${2000}`);
// });
