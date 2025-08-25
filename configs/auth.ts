import { hash } from "bcryptjs"

const hasePassHandler = async (password: string) => {
    const hashedPass = hash(password, 12)
    return hashedPass
}

export {hasePassHandler}