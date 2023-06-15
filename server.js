const http  = require('http');
const fs = require('fs')
const qs = require('qs');

const server = http.createServer((req, res) => {
    fs.readFile('./views/register.html',(err, data) => {
        res.writeHead(200,{'Content-Type': 'text.html'});
        res.write(data);
        res.end();
    })
    let data = '';
    req.on('data',chunk => {
        data += chunk;
    })
    req.on('end',()=>{
        const userInfo = qs.parse(data)
        console.log(data);
        fs.readFile('./views/info.html',"utf-8",(err, datahtml) => {
            if (err){
                console.log(err.message)
            }
            datahtml = datahtml.replace('{name}',userInfo.name)
            datahtml = datahtml.replace('{email}',userInfo.email)
            datahtml = datahtml.replace('{password}',userInfo.password)
            res.writeHead(200);
            res.write(datahtml);
            res.end()
        })
    })
})

server.listen(8000,"localhost", ()=>{
    console.log('sever dang chay')
})