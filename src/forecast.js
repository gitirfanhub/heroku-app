const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7457d7129fa60ab8dd46d867999785b5&query=' + longitude + ',' + latitude + '&units=f';

    request({ url: url , json: true}, (err, {body}) => {
        if(err)
        {
            callback('unable to fetch url',undefined);
        }
        else
        if(body.err)
        {
            callback('unable to fetch location');
        }
        else
        {
            callback(undefined,body.location);
        }

    })
}


module.exports = forecast;