const Express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = Express();

const forecast = require('./forecast');
const geocode = require('./geoCodeLoc');

const port = process.env.PORT || 3000;
const htmlpath =  path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

app.use(Express.static(htmlpath));


app.get('', (req,res)=>{
    res.render('index',{
        title: 'Science',
        author: 'Thomas',
    })
})

app.get('/first', (req,res)=>{
    res.render('index',{
        title: 'Javscript',
        author: 'webly',
    })
})

app.get('/second', (req,res)=>{
    res.render('index',{
        title: 'Html5',
        author: 'mllly',
    })
})

// app.get('*', (req,res)=> {
//     var query = req.query;
//     console.log(query);
//     res.render('404',{
//         qu : query,
//     })
// })


app.get('/weather', (req,res)=>{

    if(!req.query.address)
    {
        console.log('location is not sent');
    }

    // res.send({
    //     forecast: 'forecast',
    //     location: 'location',
    //     address: req.query.address,
    // })

    geocode(req.query.address,(err, {latitude, longitude, location} = {})=>{
        if(err)
        {
            console.log("unable to find the latitude & longitude");
        }

        forecast(latitude,longitude, (err,data)=>{
            if(err)
            {
                console.log("unable to find the location");
            }
            else
            {
                res.send({
                    forecast: data,
                    location,
                    address: req.query.address,
                })
            }
        })
    })


})

app.listen(port ,(err, res)=> {
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log('server is running on port no '+ port);
    }
})
