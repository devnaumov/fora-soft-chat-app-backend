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
exports.Chat = void 0;
var core_1 = require("@mikro-orm/core");
var BaseEntity_1 = require("./BaseEntity");
var User_1 = require("./User");
var Message_1 = require("./Message");
var Chat = /** @class */ (function (_super) {
    __extends(Chat, _super);
    function Chat(name, admin) {
        var _this = _super.call(this) || this;
        _this.users = new core_1.Collection(_this);
        _this.messages = new core_1.Collection(_this);
        _this.name = name;
        _this.admin = admin;
        return _this;
    }
    __decorate([
        core_1.Property(),
        __metadata("design:type", String)
    ], Chat.prototype, "name", void 0);
    __decorate([
        core_1.ManyToMany({ entity: function () { return User_1.User; } }),
        __metadata("design:type", Object)
    ], Chat.prototype, "users", void 0);
    __decorate([
        core_1.ManyToOne(),
        __metadata("design:type", User_1.User)
    ], Chat.prototype, "admin", void 0);
    __decorate([
        core_1.ManyToMany({ entity: function () { return Message_1.Message; }, owner: true }),
        __metadata("design:type", Object)
    ], Chat.prototype, "messages", void 0);
    Chat = __decorate([
        core_1.Entity(),
        __metadata("design:paramtypes", [String, User_1.User])
    ], Chat);
    return Chat;
}(BaseEntity_1.BaseEntity));
exports.Chat = Chat;
