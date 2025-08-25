import { compare, hash } from "bcryptjs"
import { sign, verify } from 'jsonwebtoken'
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

const verifyTokenHandler = async (token: string) => {
    try {
        const verifiedToken = verify(token, process.env.privateKey)
        return verifiedToken
    } catch (error) {
        return error.meesage
    }
}

export { hasePassHandler, generateToken, verifyPassHandler, verifyTokenHandler }