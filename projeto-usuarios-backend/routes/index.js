module.exports = (app)=>{ //get let app from main index
    app.get('/', (req, res)=>{ //define route with app.get

        res.statusCode = 200;// Return status code 200
        res.setHeader('Content-Type', 'text/html');// Set content type as html
        res.end("<h1>Olá</h1");// return <h1> key to user
    });
};