const axios = require("axios")
const config = require("./config")
const login = require("./login")

const getData = async (cookie) => {
  try {
    const response = await axios.get(`${config.BASE_URL}/stocks/alphabet`, {
      headers: { 
        Cookie: `connect.sid=${cookie}`, 
        "x-olivia-exam": "alphabet-stock"
      }
    })
    return response.data
  }catch{
    const cookie = await login.getCookies()
    return await getData(cookie)
  }
}

module.exports = { getData }