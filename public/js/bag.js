const http = require('http')

http.post('bag').then(res => res.json()).then(item => console.log(item))