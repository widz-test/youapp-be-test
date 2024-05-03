import { User } from "src/entity/model/user.model";
import { UserRepository } from "src/entity/repository/user.repository";
import { DisplayableException } from "src/exception/displayable.exception";

export async function checkUserByEmail(email: string, repository: UserRepository): Promise<User> {
    const user = await repository.findOne({email: email.toLowerCase()});
    if (user) {
        throw new DisplayableException({}, `User already exist`);
    } 
    return user;
}

export async function checkUserByUsername(username: string, repository: UserRepository): Promise<User> {
    const user = await repository.findOne({username: username.toLowerCase()});
    if (user) {
        throw new DisplayableException({}, `User already exist`);
    } 
    return user;
}

export async function findUserByUsernameOrEmail(username: string, repository: UserRepository): Promise<User> {
    const user = await repository.findByUsernameOrEmail(username);
    if (!user) {
        throw new DisplayableException({}, `User not found`);
    }
    return user;
}

export async function findUserByID(id: string, repository: UserRepository): Promise<User> {
    const user = await repository.findById(id);
    if (!user) {
        throw new DisplayableException({}, `User not found`);
    } 
    return user;
}