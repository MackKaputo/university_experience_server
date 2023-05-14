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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongodb_1 = require("mongodb");
const uuid_1 = require("uuid");
let CommentService = class CommentService {
    constructor(db, config) {
        this.db = db;
        this.config = config;
        this.commentsCollection = this.db.collection("comments");
    }
    async getComments() {
        try {
            const comments = this.commentsCollection.find({}).toArray();
            return comments;
        }
        catch (error) {
            console.log(error);
            return new common_1.InternalServerErrorException("Something went wrong, please try again later");
        }
    }
    async createComment(dto) {
        try {
            const guid = (0, uuid_1.v4)();
            const res = await this.commentsCollection.insertOne(Object.assign(Object.assign({ guid }, dto), { created_at: Date.now(), updated_at: Date.now() }));
            console.log(res);
            return {
                success: true,
                data: await this.commentsCollection.findOne({
                    guid
                })
            };
        }
        catch (error) {
            console.log(error);
            return new common_1.InternalServerErrorException("Oops! Something went wrong, please try again later");
        }
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("DATABASE_CONNECTION")),
    __metadata("design:paramtypes", [mongodb_1.Db,
        config_1.ConfigService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map