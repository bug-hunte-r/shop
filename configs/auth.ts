import { hash } from "bcryptjs"
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

export { hasePassHandler, generateToken }