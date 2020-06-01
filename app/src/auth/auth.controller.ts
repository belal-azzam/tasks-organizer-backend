import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import {CreateUserRequest} from "../request/CreateUser.request";
import {AuthService, LoginStatus, RegistrationStatus} from "./auth.service";
import {LoginUserRequest} from "../request/LoginUser.request";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    public async register(@Body() createUserDto: CreateUserRequest,  ): Promise<RegistrationStatus> {
        const result:
        RegistrationStatus = await this.authService.register(createUserDto);
        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginUserRequest): Promise<LoginStatus> {
        return await this.authService.login(loginUserDto);
    }

}
