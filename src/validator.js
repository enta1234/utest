module.exports = class {
  constructor (testCase) {
    this.testCase = testCase
  }

  async validate(res) {
    const status = res.status
    const headers = res.headers
    const body = res.body
    const [s, h, b] = await Promise.all([this.statusValidator(status), this.headersValidator (headers), this.bodyValidator (body)])
    console.log('s, h, b: ', s, h, b);

  }
  
  statusValidator (status) {
    if (Object.keys(this.testCase).length && this.testCase.code) {
      return this.testCase.code === status ? 'success' : 'failed'
    } else {
      return 'ignore'
    } 
  }
  
  headersValidator (headers) {
    if (Object.keys(this.testCase).length && this.testCase.headers && Object.keys(this.testCase.headers).length) {
      const key = Object.keys(this.testCase.headers)
      
      console.log('key: ', key);
    } else {
      return 'ignore'
    } 
  }
  
  bodyValidator (body) {

  }
}
