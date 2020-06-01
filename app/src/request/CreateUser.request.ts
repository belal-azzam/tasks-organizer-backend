import {IsEmail, IsNotEmpty, Length, Validate} from "class-validator";
import {UniqueValidation} from "../validation-rules/Unique.validation";

export class CreateUserRequest {


    @IsNotEmpty()
    @Validate(UniqueValidation, {
        param: "hohoho"
    } as any)
    username: string;

    @Length(8,20)
    @IsNotEmpty()
    password: string;

    @IsEmail()
    email: string;

    role_id: number;
}