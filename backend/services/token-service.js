const jwt = require("jsonwebtoken")
const refreshModel = require("../models/refresh-model")

class TokenService {
  generateToken(payload) {
    let accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10d",
    })
    let refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "70d",
    })
    return { accessToken, refreshToken }
  }

  async storeRefreshToken(token, userId) {
    try {
      await refreshModel.create({ token, userId })
    } catch (err) {
      console.log(err.message)
    }
  }

  verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
  }

  async findRefreshToken(userId, refreshToken) {
    return await refreshModel.findOne({
      userId: userId,
      token: refreshToken,
    })
  }

  async updateRefreshToken(userId, refreshToken) {
    return await refreshModel.updateOne(
      { user_id: userId },
      { $set: { token: refreshToken } }
    )
  }

  async deleteRefreshToken(refreshToken) {
    return await refreshModel.deleteOne({
      token: refreshToken,
    })
  }
}

module.exports = new TokenService()
