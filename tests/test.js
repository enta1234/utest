const app = require('express')()
const axios = require('axios').default


app.get('/v1/user', (req, res) => {
  console.log('have requested.')
  res.json({msg: 'ok'})
})

app.listen(3004, _ => console.log('stated'))

// const { a, b} = Promise.all([axios.get('http://localhost:16006/1'), axios.get('http://localhost:16006/2')])