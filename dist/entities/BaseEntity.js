"use strict";
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
exports.BaseEntity = void 0;
var core_1 = require("@mikro-orm/core");
var mongodb_1 = require("@mikro-orm/mongodb");
var BaseEntity = /** @class */ (function () {
    function BaseEntity() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    var _a;
    __decorate([
        core_1.PrimaryKey(),
        __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
    ], BaseEntity.prototype, "_id", void 0);
    __decorate([
        core_1.SerializedPrimaryKey(),
        __metadata("design:type", String)
    ], BaseEntity.prototype, "id", void 0);
    __decorate([
        core_1.Property(),
        __metadata("design:type", Object)
    ], BaseEntity.prototype, "createdAt", void 0);
    __decorate([
        core_1.Property({ onUpdate: function () { return new Date(); } }),
        __metadata("design:type", Object)
    ], BaseEntity.prototype, "updatedAt", void 0);
    return BaseEntity;
}());
exports.BaseEntity = BaseEntity;
