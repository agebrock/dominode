
/*!
 * dominode
 * Copyright(c) 2011 agebrock <christoph.hagenbrock<AT>googlemail.com>
 * MIT Licensed
 */

/**
 * Library version.
 */

exports.version = '0.0.1';



var jsdom  = require("jsdom"),
    HTML5 = require('html5'),
    Script = process.binding('evals').Script,
    sys = require('util'),
    fs = require('fs'),
    r = require("request"),
    url = require("url");


XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

navigator = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/15.0.849.0 Safari/535.1",
    cookieEnabled: true,
    language: "en-US",
    onLine: true,
    platform: "Linux i686",
    product: "Gecko",
    productSub: "20030107",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/15.0.849.0 Safari/535.1",
    vendor: "Google Inc.",
    vendorSub: ""
};



location =  {
        hash: "",
        host: "home",
        hostname: "home.com",
        href: "http://home.com/",
        origin: "http://home.com",
        pathname: "/",
        port: "",
        protocol: "http:"
};

jsdom.defaultDocumentFeatures = {
     // FetchExternalResources   : ["script"],
      ProcessExternalResources :  ['script', 'img', 'css', 'frame', 'link'],
      FetchExternalResources   : [],
      ProcessExternalResources : [],
      "MutationEvents"           : '3.0',
      "QuerySelector"            : false
    }    
    
var dojoDom = module.exports = {
    /**
    // {url:"http://www.weg.de"}
    **/
    createDocument : function(input, callback){



   if(typeof input == "object" && input.url){
        
            var loc = url.parse(input.url);
            
            for(var i in loc){
                location[i] = loc[i];
            }
      
            //request remote content
            r[input.method || "get"](input, function(e,b,h){
                  if(callback){
                  callback(null,dojoDom.fromString(b.body));
                  }
            });
        }else{ 
            if(callback)
            callback(null,dojoDom.fromString(input));
        }


   
},
    fromString : function(html){
    
        window = jsdom.jsdom(null, null, {parser: HTML5}).createWindow();
       
        var parser = new HTML5.Parser({ document: window.document });
        
        
        window = jsdom.jsdom(html, null, { parser: HTML5 } ).createWindow();
        GLOBAL.document = document = window.document;
        window.navigator = navigator;


        if(typeof dojo != "undefined"){
           dojo.doc = document;
        }
       

        return document;
}}
