const fs = require("fs")
const path = require("path")
const axios = require("axios")

const sut = require("./json-parser")

const mockRaw = {
  data: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../fixtures/json-data.json')).toString('utf8'))
}

const mockResponse = {
  data: {
    stock:"GOOG",
    IPO:"2004",
    industry:"Internet Content & Information",
    yearlyFinancials:[
      {
        year:"12/2016",
        equity:"19285",
        revenue:"135987",
        ebitda:"12492"
      },
      {
        year:"12/2017",
        equity:"27709",
        revenue:"177866",
        ebitda:"16132"
      },
      {
        year:"12/2018",
        equity:"43549",
        revenue:"232887",
        ebitda:"28019"
      }]
    }
}

describe('(json-parser.spec.js) - Json', () => {
  describe('getData()', () => {
    test('Should return an object like mock above', async () => {
      jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve(mockRaw))
      const result = await sut.getData()
      expect(result.industry).toStrictEqual(mockResponse.data.industry)
    })
    test('Should not return undefined', async () => {
      jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve(mockRaw))
      const result = await sut.getData()
      expect(result).not.toBeUndefined()
    })
    test('Should throw error', async () => {
      jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.reject(mockRaw))
      let result = await sut.getData()
      jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve(mockRaw))
      result = await sut.getData()
      expect(result).not.toBeNull()
    })
  })
})
