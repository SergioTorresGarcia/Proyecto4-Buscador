import bcrypt from "bcrypt";

export const isValidPassword = (password: string) => {

    if (password.length >= 8 && password.length < 14) {
        const passwordEncrypted = bcrypt.hashSync(password, 8)
        return passwordEncrypted
    }
}