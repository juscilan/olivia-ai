const fs = require("fs")
const path = require("path")
const axios = require("axios")

const sut = require("./html-parser")
const mockResponseHtmlData = {
  data: fs.readFileSync(path.resolve(__dirname, '../fixtures/html-data.html')).toString('utf8')
}
const mockCookie = 's%3AS-0ptSPgWjlfgOnvx71y9tquFiXNoxtG.rQH74HFWb7xr2QcBotr5gkheQtBdPhEyibUuvwdKJ98'

const mockResponse = {
  "52-wk_high": 371.1, 
  "52-wk_low": 57.96, 
  "div_yield": "-", 
  "high": 75.89, 
  "low": 74.54, 
  "mkt_cap": "-", 
  "open": 75.3, 
  "pe_ratio": "-", 
  "prev_close": 75.3}

describe('(html-parser.spec.js) - HTML', () => {
  describe('getData()', () => {
    test('Should return an object like mock above', async () => {
      jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve(mockResponseHtmlData))
      const result = await sut.getData(mockCookie)
      expect(result).toStrictEqual(mockResponse)
    })
    test('Should not return null', async () => {
      jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve(mockResponseHtmlData))
      const result = await sut.getData(mockCookie)
      expect(result).not.toBeNull()
    })
    test('Should not return null', async () => {
      jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve(mockResponseHtmlData))
      const result = await sut.getData(mockCookie)
      expect(result).not.toBeNull()
    })
  })
  describe('formatNumber()', () => {
    test('Should return a value with number type', async () => {
      const result = await sut.formatNumber("78.90")
      expect(result).toBe(78.9)
    })
    test('Should not return a number, it returns the same string', async () => {
      const result = await sut.formatNumber("TT")
      expect(result).toBe("TT")
    })
  })
})
