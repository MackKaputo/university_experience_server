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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const uuid_1 = require("uuid");
const argon = require("argon2");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(db, jwt, config) {
        this.db = db;
        this.jwt = jwt;
        this.config = config;
        this.usersCollection = this.db.collection('users');
    }
    async signup(dto) {
        const hash = await argon.hash(dto.password);
        const isUserExist = await this.usersCollection.findOne({ email: dto.email });
        if (isUserExist) {
            throw new common_1.ForbiddenException("Email already exists");
        }
        const guid = (0, uuid_1.v4)();
        const res = await this.usersCollection.insertOne({
            guid,
            email: dto.email,
            password: hash,
            created_at: Date.now(),
            updated_at: Date.now(),
            username: "",
            first_name: "",
            last_name: ""
        });
        console.log("User Sign Up insert result: ", res);
        return {
            success: true,
            data: await this.usersCollection.findOne({ guid }, { projection: { password: 0, _id: 0 } })
        };
    }
    async signin(dto) {
        try {
            console.log(this.config.get('JWT_SECRET'));
            const user = await this.usersCollection.findOne({ email: dto.email }, { projection: { _id: 0 } });
            if (!user) {
                return new common_1.NotFoundException("User not found");
            }
            const passwordMatch = await argon.verify(user.password, dto.password);
            if (!passwordMatch) {
                return new common_1.ForbiddenException("Incorrect password");
            }
            return this.signToken(user.guid, user.email);
        }
        catch (error) {
            console.log(error);
            return new common_1.InternalServerErrorException("Sorry, something went wrong. Try again later");
        }
    }
    async signToken(guid, email) {
        const payload = {
            sub: guid,
            email
        };
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '45m',
            secret: this.config.get('JWT_SECRET')
        });
        return {
            access_token: token
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)({}),
    __param(0, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [mongodb_1.Db,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map