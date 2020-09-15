"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var entities_1 = require("./entities");
var Message_1 = require("./entities/Message");
var options = {
    entities: [entities_1.Chat, entities_1.BaseEntity, entities_1.User, Message_1.Message],
    dbName: "chat-app",
    type: "mongo",
    debug: !constants_1.__prod__,
};
exports.default = options;
