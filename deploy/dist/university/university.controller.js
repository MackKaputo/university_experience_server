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
exports.UniversityController = void 0;
const common_1 = require("@nestjs/common");
const university_service_1 = require("./university.service");
const dto_1 = require("./dto");
let UniversityController = class UniversityController {
    constructor(universityService) {
        this.universityService = universityService;
    }
    getUniversities() {
        return this.universityService.getUniversities();
    }
    getUniversityByGuid(guid) {
        return this.universityService.getUniversityByGuid(guid);
    }
    createUniversity(dto) {
        return this.universityService.createUniversity(dto);
    }
    getUniversityComments(guid) {
        return this.universityService.getUniversityComments(guid);
    }
};
__decorate([
    (0, common_1.Get)(""),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UniversityController.prototype, "getUniversities", null);
__decorate([
    (0, common_1.Get)(":guid"),
    __param(0, (0, common_1.Param)("guid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UniversityController.prototype, "getUniversityByGuid", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UniversityDto]),
    __metadata("design:returntype", void 0)
], UniversityController.prototype, "createUniversity", null);
__decorate([
    (0, common_1.Get)(":guid/comments"),
    __param(0, (0, common_1.Param)("guid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UniversityController.prototype, "getUniversityComments", null);
UniversityController = __decorate([
    (0, common_1.Controller)('api/universities'),
    __metadata("design:paramtypes", [university_service_1.UniversityService])
], UniversityController);
exports.UniversityController = UniversityController;
//# sourceMappingURL=university.controller.js.map