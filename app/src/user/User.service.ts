import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserRequest} from "../request/CreateUser.request";
import {LoginUserRequest} from "../request/LoginUser.request";
import {__comparePasswords, __hash, toUserDto} from "../common/helpers";
import {UserDto} from "../dto/User.dto";
import {UserRepository} from "./User.repository";
import {UserEntity} from "./entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: UserRepository
    ){}

    async create(request: CreateUserRequest) {
        // check if the user exists in the db
        const userInDb = await this.userRepository.findOne({
            where: { or: {username: request.username, email: request.email} }
        });
        if (userInDb) {
            throw new HttpException('username/email is already taken', HttpStatus.BAD_REQUEST);
        }
        const ownersCount = await this.userRepository.count({role_id: 1});
        if(ownersCount === 0){
            request.role_id = 1
        } else {
            request.role_id = 2;
        }
        const userEntity = this.userRepository.create(request);
        await this.userRepository.save(userEntity);
        return toUserDto(userEntity);
    }

    async login({username, password}: LoginUserRequest) {
        const user = await this.userRepository.findOne({where: {username}});
        if(!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
        const areEqual = await __comparePasswords(user.password, password);

        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return {id: user.id, email: user.email, username: user.username}
    }

    async findByPayload({ username }: any): Promise<UserDto> {
        return await this.userRepository.findOne({
            where:  { username } });
    }
}