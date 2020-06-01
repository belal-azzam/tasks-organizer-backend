import { Module } from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import { AuthService } from './auth.service';
import {JwtStrategy} from "./jwt.strategy";
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {JWT_CONFIG} from "../config";

@Module({
    imports: [
        UserModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: JWT_CONFIG.SECRETKEY,
            signOptions: {
                expiresIn: JWT_CONFIG.EXPIRESIN,
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [
        PassportModule,
        JwtModule
    ],
})
export class AuthModule {}
