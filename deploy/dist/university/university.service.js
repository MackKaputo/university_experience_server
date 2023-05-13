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
exports.UniversityService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
let UniversityService = class UniversityService {
    constructor(db, config) {
        this.db = db;
        this.config = config;
        this.universitiesCollection = this.db.collection("universities");
        this.commentsCollection = this.db.collection("comments");
    }
    async getUniversities() {
        const universities = this.universitiesCollection.find({}).toArray();
        return universities;
    }
    async createUniversity(dto) {
        const guid = (0, uuid_1.v4)();
        console.log("Received university dto: ", dto);
        const res = await this.universitiesCollection.insertOne(Object.assign(Object.assign({ guid }, dto), { created_at: Date.now(), updated_at: Date.now() }));
        console.log("University created result: ", res);
        return {
            success: true,
            data: await this.universitiesCollection.findOne({ guid })
        };
    }
    async getUniversityByGuid(guid) {
        const university = await this.universitiesCollection.findOne({
            guid
        });
        if (!university) {
            return new common_1.NotFoundException("University not found");
        }
        return university;
    }
    async getUniversityComments(guid) {
        try {
            const universityComments = await this.commentsCollection.find({
                university_guid: guid
            }).toArray();
            return {
                success: true,
                data: universityComments
            };
        }
        catch (error) {
            console.log(error);
            return;
        }
    }
};
UniversityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("DATABASE_CONNECTION")),
    __metadata("design:paramtypes", [mongodb_1.Db,
        config_1.ConfigService])
], UniversityService);
exports.UniversityService = UniversityService;
//# sourceMappingURL=university.service.js.map