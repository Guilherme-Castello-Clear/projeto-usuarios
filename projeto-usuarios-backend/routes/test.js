module.exports = (app)=>{

    app.get('/test', (req, res)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Teste</h1>');


    });


}