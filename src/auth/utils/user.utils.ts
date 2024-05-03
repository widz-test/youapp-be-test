import { User } from "src/entity/model/user.model";
import { UserRepository } from "src/entity/repository/user.repository";
import { DisplayableException } from "src/exception/displayable.exception";

export async function findUserByEmail(email: string, repository: UserRepository): Promise<User> {
    const user = await repository.findOne({email: email.toLowerCase()});
    if (user) {
        throw new DisplayableException({}, `User already exist`);
    } 
    return user;
}

export async function findUserByUsername(username: string, repository: UserRepository): Promise<User> {
    const user = await repository.findOne({username: username.toLowerCase()});
    if (user) {
        throw new DisplayableException({}, `User already exist`);
    } 
    return user;
}