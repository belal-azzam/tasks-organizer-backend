import {IsNotEmpty} from "class-validator";

export class LoginUserRequest {
    @IsNotEmpty()  readonly username: string;
    @IsNotEmpty()  readonly password: string;
}