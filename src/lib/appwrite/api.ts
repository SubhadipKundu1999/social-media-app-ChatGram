import { ID } from 'appwrite'

import { INewUser } from "@/types"
import { account, appwriteConfig, avatars, databases } from "./config"

export async function createUserAccount(user: INewUser) {
    try {
        // create a new account
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.name,
            user.password
        )
        // if any account is not created throw error:
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);
        const newuser = await saveUserToDB({
            accountId: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            username: user.username,
            imageURL: avatarUrl,
        })
        return newuser;

    } catch (error) {
        console.log(error);
        return error;
    }

}

export async function saveUserToDB(user: {
    accountId: string,
    email: string,
    name: string,
    imageURL: URL,
    username?: string
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        );
        return newUser;

    } catch (error) {
        console.log(error)
    }
}