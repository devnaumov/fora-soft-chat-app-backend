"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var core_1 = require("@mikro-orm/core");
var BaseEntity_1 = require("./BaseEntity");
var User_1 = require("./User");
var Chat_1 = require("./Chat");
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message(text, chat, owner) {
        var _this = _super.call(this) || this;
        _this.text = text;
        _this.chat = chat;
        _this.owner = owner;
        return _this;
    }
    __decorate([
        core_1.Property(),
        __metadata("design:type", String)
    ], Message.prototype, "text", void 0);
    __decorate([
        core_1.ManyToOne(function () { return Chat_1.Chat; }),
        __metadata("design:type", Chat_1.Chat)
    ], Message.prototype, "chat", void 0);
    __decorate([
        core_1.ManyToOne(),
        __metadata("design:type", User_1.User)
    ], Message.prototype, "owner", void 0);
    Message = __decorate([
        core_1.Entity(),
        __metadata("design:paramtypes", [String, Chat_1.Chat, User_1.User])
    ], Message);
    return Message;
}(BaseEntity_1.BaseEntity));
exports.Message = Message;
