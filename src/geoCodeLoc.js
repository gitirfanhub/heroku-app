const request = require('request');

const geoCode = (address,callback) => {
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoia2hhbjIyMjMiLCJhIjoiY2tlM3FyYW04MGMyOTJ5bDZoanFlNXN1OSJ9.2hEV5hLXouYi8XG4C7rWZg';
    

    request({url:geoCodeUrl, json:true}, (err, {body}) => {
        if(err)
        {
            console.log('Unable to fetch the url');
            callback('unable to fetch the url',undefined);
        }
        if( body.features.length == 0)
        {
            callback('unable to find the location',undefined);
        }
        else
        {
            callback(undefined,{
                latitude  : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location  : body.features[0].place_name, 
            });
        }
    })
}


module.exports = geoCode;