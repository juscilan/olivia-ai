const login = require("./login")
const htmlParser = require("./html-parser")
const jsonParser = require("./json-parser")

const init = async () => {
  const cookie = await login.getCookies()
  const htmlData = await htmlParser.getData(cookie)
  const jsonData = await jsonParser.getData(cookie)
  jsonData.data = htmlData
  
  console.log(jsonData)
}

init()