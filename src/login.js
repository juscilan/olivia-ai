const request = require('request-promise')
const config = require("./config")

const getCookies = async(username = 'olivia', password = 'oliveira') => {
  try {
    await request.post(`${config.BASE_URL}/login`, {
    form: {
      username,
      password
      }
    })
  }catch(responseError){
    if(responseError.response.headers["set-cookie"])
      return responseError.response.headers["set-cookie"][0].split(";")[0].split("=")[1]
    else
      getCookies()
  }
}

module.exports = { getCookies }