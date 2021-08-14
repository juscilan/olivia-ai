const request = require('request-promise')

const sut = require("./login")
const mock = ["connect.sid=s%3AWaL8Dam0CTNX7TXeqXmaCgQfcEGuCHD4.28MRqi%2FeO2OtkarAmJO%2BP2E2NfOiASoY%2BkzJD%2BhPwek; Path=/; HttpOnly"]

const mockResponseError = {
  response: {
    headers: {
      ["set-cookie"]: mock
    }
  }
}

const mockResponseErrorWithoutCookie = {
  response: {
    headers: {
      ["set-cookie"]: undefined
    }
  }
}

describe('(login.spec.js) - Login', () => {
  describe('getCookies()', () => {
    test('It should return a string contain s% init of cookie', async () => {
      jest.spyOn(request, 'post').mockImplementationOnce(() => Promise.reject(mockResponseError))
      const result = await sut.getCookies()
      expect(result).toContain("s%")
    })
    test('It should not be null', async () => {
      jest.spyOn(request, 'post').mockImplementationOnce(() => Promise.reject(mockResponseError))
      const result = await sut.getCookies()
      expect(result).not.toBeNull()
    })
    test('It should retry the action', async () => {
      jest.spyOn(request, 'post').mockImplementationOnce(() => Promise.reject(mockResponseErrorWithoutCookie))
      const result = await sut.getCookies()
      expect(result).toBeUndefined()
      jest.spyOn(request, 'post').mockImplementationOnce(() => Promise.reject(mockResponseError))
      expect(result).not.toBeNull()
    })
  })
})
