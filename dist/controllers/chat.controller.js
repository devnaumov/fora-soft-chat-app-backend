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
exports.ChatController = void 0;
var express_promise_router_1 = __importDefault(require("express-promise-router"));
var core_1 = require("@mikro-orm/core");
var entities_1 = require("../entities");
var __1 = require("..");
var router = express_promise_router_1.default();
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chats;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, __1.DI.chatRepository.findAll(["users"])];
            case 1:
                chats = _a.sent();
                res.json(chats);
                return [2 /*return*/];
        }
    });
}); });
router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chat, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, __1.DI.chatRepository.findOne(req.params.id, [
                        "users",
                        "messages",
                    ])];
            case 1:
                chat = _a.sent();
                if (!chat) {
                    return [2 /*return*/, res.status(404).json({ message: "Chat not found" })];
                }
                res.json(chat);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                return [2 /*return*/, res.status(400).json({ message: e_1.message })];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chat;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        if (!req.body.name) {
            res.status(400);
            return [2 /*return*/, res.json({ message: "One of `name, admin` is missing" })];
        }
        try {
            chat = new entities_1.Chat(req.body.name, (_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.userId);
            console.log((_b = req === null || req === void 0 ? void 0 : req.session) === null || _b === void 0 ? void 0 : _b.userId);
            core_1.wrap(chat).assign(req.body, (_c = req === null || req === void 0 ? void 0 : req.session) === null || _c === void 0 ? void 0 : _c.userId);
            __1.DI.chatRepository.persistLater(chat);
            chat.users.add(chat.admin);
            __1.DI.chatRepository.flush();
            res.json(chat);
        }
        catch (e) {
            return [2 /*return*/, res.status(400).json({ message: e.message })];
        }
        return [2 /*return*/];
    });
}); });
router.put("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chat, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, __1.DI.chatRepository.findOne(req.params.id)];
            case 1:
                chat = _a.sent();
                if (!chat) {
                    return [2 /*return*/, res.status(404).json({ message: "chat not found" })];
                }
                core_1.wrap(chat).assign(req.body);
                return [4 /*yield*/, __1.DI.chatRepository.persistAndFlush(chat)];
            case 2:
                _a.sent();
                res.json(chat);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                return [2 /*return*/, res.status(400).json({ message: e_2.message })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/invite-user", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chat, user, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.chatId || !req.body.userId) {
                    res.status(400);
                    return [2 /*return*/, res.json({ message: "One of `chatId, userId` is missing" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, __1.DI.chatRepository.findOne(req.body.chatId)];
            case 2:
                chat = _a.sent();
                return [4 /*yield*/, __1.DI.userRepository.findOne(req.body.userId)];
            case 3:
                user = _a.sent();
                if (!chat || !user) {
                    return [2 /*return*/, res.status(404).json({ message: "Chat or user not found" })];
                }
                chat.users.add(user);
                res.json(chat);
                return [4 /*yield*/, __1.DI.chatRepository.persistAndFlush(chat)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                e_3 = _a.sent();
                return [2 /*return*/, res.status(400).json({ message: e_3.message })];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.ChatController = router;
