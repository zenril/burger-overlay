var hostile = require('hostile');
var fs    = require("fs");
var path = require('path');
var Mustache = require('mustache');

var conf = path.resolve(__dirname, '../config.json');


fs.readFile(conf, 'UTF-8',  function(err, json) {
    var data = JSON.parse(json);

    data.dir = path.resolve(data.dir);

    console.log(json);
    if (err) throw err;
    
    if(!data.domains){
        throw "aliases array not defiend in config.yaml";
    }
    
    hostEntry(data.domains);
    doVHost(data )


});

function hostEntry(domains, index){
    var i = index || 0;
    if(!domains[i]) return;

    let element = domains[i];
    
    if(!element.localhost){
        element.localhost = '127.0.0.1';
    }

    if(!element.domain){
        console.log("Missing alias");
    }

    hostile.set(element.localhost, element.domain, function (err) {
        if (err) {
            console.error(err)
        } else {
            hostEntry(domains, i + 1);
        }
    });
}


function doVHost(config){

    var vhost = path.resolve(config.vhost);

    var file = path.resolve(config.template);
    
    fs.readFile(file, function(err, templ) {
        var template = templ.toString();

        console.log(template);
        var output = Mustache.render(template, config);

        

        fs.appendFile(vhost, output, (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    });
}