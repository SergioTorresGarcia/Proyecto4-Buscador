import bcrypt from "bcrypt";


export const isValidPassword = (password: string) => {

    if (password.length >= 6 && password.length < 10) {
        const passwordEncrypted = bcrypt.hashSync(password, 8)
        return passwordEncrypted
    }

}