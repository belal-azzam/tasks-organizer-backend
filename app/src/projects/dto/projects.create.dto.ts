import {IsNotEmpty} from "class-validator";

export class ProjectsCreateDto {
    @IsNotEmpty()  name: string;
}