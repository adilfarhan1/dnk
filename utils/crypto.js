import CryptoJS from 'crypto-js'
import { text } from 'express'

export const encrypt = async (text) => {
    const encrypted = await CryptoJS.AES.encrypt(text, process.env.KEY).toString()
    return encrypted
}

export const decrypt = async (ciphertext) => {
    const decrypted = await CryptoJS.AES.decrypt(ciphertext, process.env.KEY).toString(CryptoJS.enc.Utf8)
    return JSON.parse(decrypted)
}