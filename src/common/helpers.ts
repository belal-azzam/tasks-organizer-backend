import * as bcrypt from "bcryptjs";
import {UserDto} from "../dto/User.dto";
import {UserEntity} from "../user/entity/user.entity";

export function __hash(text: string) : Promise<string> {
    return bcrypt.hash(text, parseInt(process.env.BCRYPT_SALT));
}

export async function __comparePasswords(hashedPassword, unhashedPassword) {

    const result = await bcrypt.compare(unhashedPassword, hashedPassword);
    return result;
}

export const toUserDto = (data: UserEntity): UserDto => {
    const { id, username, email } = data;
    let userDto: UserDto = { id, username, email,  };
    return userDto;
};