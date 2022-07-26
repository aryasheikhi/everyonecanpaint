const express = require('express')
const app = express()

app.use(express.static('public'))

app.use((req, res) => {
    res.sendFile('index.html')
})

const port = process.env.PORT || 3000
app.listen(port)
console.log('App listening on port ' + port)
