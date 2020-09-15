"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DI = void 0;
require("reflect-metadata");
var core_1 = require("@mikro-orm/core");
var constants_1 = require("./constants");
var Chat_1 = require("./entities/Chat");
var mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
var express_1 = __importDefault(require("express"));
var controllers_1 = require("./controllers");
var entities_1 = require("./entities");
var user_controller_1 = require("./controllers/user.controller");
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = __importDefault(require("http"));
var Message_1 = require("./entities/Message");
var message_controller_1 = require("./controllers/message.controller");
var cors_1 = __importDefault(require("cors"));
exports.DI = {};
var app = express_1.default();
var server = http_1.default.createServer(app);
var port = process.env.PORT || 3000;
var io = socket_io_1.default(server);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, MongoStore, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = exports.DI;
                return [4 /*yield*/, core_1.MikroORM.init(mikro_orm_config_1.default)];
            case 1:
                _a.orm = _b.sent();
                exports.DI.em = exports.DI.orm.em;
                exports.DI.chatRepository = exports.DI.orm.em.getRepository(Chat_1.Chat);
                exports.DI.userRepository = exports.DI.orm.em.getRepository(entities_1.User);
                exports.DI.messageRepository = exports.DI.orm.em.getRepository(Message_1.Message);
                MongoStore = connect_mongo_1.default(express_session_1.default);
                app.use(cors_1.default());
                app.use(express_1.default.json());
                app.use(function (req, res, next) {
                    req.io = io;
                    next();
                });
                app.use(express_session_1.default({
                    store: new MongoStore({
                        url: exports.DI.em.getDriver().getConnection().getClientUrl() + "/chat-app",
                    }),
                    cookie: {
                        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
                        httpOnly: true,
                        sameSite: "lax",
                        secure: constants_1.__prod__,
                    },
                    secret: "KHAIBVYICGAHUVRI",
                    resave: false,
                    name: "qid",
                    saveUninitialized: false,
                }));
                app.use(function (req, res, next) { return core_1.RequestContext.create(exports.DI.orm.em, next); });
                app.get("/", function (req, res) {
                    return res.json({
                        message: "Welcome to fora soft test chat app",
                    });
                });
                app.use("/chat", controllers_1.ChatController);
                app.use("/user", user_controller_1.UserController);
                app.use("/message", message_controller_1.MessageController);
                io.on("connection", function (socket) {
                    console.log("user connectet");
                    socket.on("disconnect", function () {
                        console.log("user disconnected");
                    });
                    socket.on("chat message", function (msg) {
                        io.emit("chat message", msg);
                        console.log("message: " + msg);
                    });
                });
                app.use(function (req, res) { return res.status(404).json({ message: "No route found" }); });
                server.listen(port, function () {
                    console.log("Server started at http://localhost:" + port);
                });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _b.sent();
                console.log(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
