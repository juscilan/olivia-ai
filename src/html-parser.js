const axios = require("axios")
const config = require("./config")

const formatNumber = (value) => !isNaN(value) ? Number(value) : value

const getData = async (cookie) => {
  const response = await axios.get(`${config.BASE_URL}/alphabet`, {
    headers: { Cookie: `connect.sid=${cookie}`}
  })
  const regex = /<td>(?!')(.*?)<\/td>/gm
  const arr = response.data.match(regex)
  data = {}
  for (let i = 0; i < arr.length; i += 2) {
    data[arr[i]
      .replace('<td>', '')
      .replace('</td>', '')
      .replace(' ', '_')
      .replace("/", "")
      .replace("\'", "")
      .toLowerCase()] = formatNumber(arr[i + 1]
                          .replace('<td>', '')
                          .replace('</td>', ''))
  }
  return data
}

module.exports = { getData, formatNumber }