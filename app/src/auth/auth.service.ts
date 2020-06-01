import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserService} from "../user/User.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserRequest} from "../request/CreateUser.request";
import {LoginUserRequest} from "../request/LoginUser.request";
import {UserDto} from "../dto/User.dto";
import {JwtPayload} from "./jwt.strategy";
import {JWT_CONFIG} from "../config";

export interface RegistrationStatus {
    success: boolean;
    message: string;
}

export interface LoginStatus {
    expiresIn: number;
    accessToken: string;
    username: string;
}
@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService,  ) {}

    async register(userRequest: CreateUserRequest):
        Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'user registered',
        };
        try {
            await this.userService.create(userRequest);
        } catch (err) {
            status = {
                success: false,
                message: err,
            };
        }
        return status;
    }


    async login(loginUserRequest: LoginUserRequest): Promise<LoginStatus> {
        // find user in db
        const user = await this.userService.login(loginUserRequest);

        // generate and sign token
        const token = this._createToken(user);

        return {
            username: user.username, ...token,
        };
    }

    private _createToken({ username }: UserDto): any {
        const user: JwtPayload = { username };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: JWT_CONFIG.EXPIRESIN,
            accessToken,
        };
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.userService.findByPayload(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

}
