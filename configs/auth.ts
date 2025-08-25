import { compare, hash } from "bcryptjs"
import { sign } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const hasePassHandler = async (password: string) => {
    const hashedPass = hash(password, 12)
    return hashedPass
}

const generateToken = ({ ...data }) => {
    const token = sign(data, process.env.privateKey)
    return token
}

const verifyPassHandler = async (password: string, hashedPass: string) => {
    const verifiedPass = compare(password, hashedPass)
    return verifiedPass
}

export { hasePassHandler, generateToken, verifyPassHandler }