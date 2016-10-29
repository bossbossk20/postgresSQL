var connString = 'postgres://dvwoxgxxzpbfov:n3FSB1EaTzCIvLBed1Bwz7i53U@ec2-54-243-195-160.compute-1.amazonaws.com:5432/d93q4f468iumbf'

var pg = require('pg')
var express = require('express')
var app = express()
pg.defaults.ssl = true
app.get('/', function (request, response) {
  pg.connect(connString, function (err, client, done) {
    if (err) response.send('Could not connect to DB: ' + err)
    // client.query('insert into test values (1,"koy")')
    client.query('SELECT * FROM test', function (err, result) {
      done()
      if (err) return response.send(err)
      response.send(result.rows)
    })
  })
})

var port = process.env.PORT || 5000
app.listen(port, function () {
  console.log('Listening on ' + port)
})
