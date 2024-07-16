import Token from '../models/tokenM.js'

export const createToken = async () => {
    let newToken = randomKey()
    const token = tokenModel({
        _id: user.id,
        token: newToken,
        createdAt: user.createdAt
    })
}