import { IUser, IUserFields, User } from "../../core/models";

export const createUser = async (data: Partial<IUserFields>): Promise<IUser> => {
   return await User.create(data);   
};

export const findUserById = async (id: string): Promise<IUser | null> => {
    return await User.findById(id);
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    return await User.findOne({email});
};

export const updateLastLogin = async (id: string): Promise<void> => {
  await User.findByIdAndUpdate(id, { lastLoginAt: new Date() });
};