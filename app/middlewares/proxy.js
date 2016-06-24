'use strict';

var request = require('request');

module.exports = function(req, res, next) {

    var host = 'https://site.com',
        query = req.url.substr(6),
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Basic T21uaWZpM3duNDpmaXp6eVIzcHRpbGU2MQ=="
        }

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

    function boom() {
        return res.end()
    }

    if (req.method === 'POST') {

        request(host + query, {
            headers: headers,
            method: 'POST',
            json: true,
            body: req.body
        }).pipe(res).on('error', boom)

    } else if (req.method === 'GET' || req.method === 'HEAD') {

        request({
            url: host + query,
            headers: headers
        }).pipe(res).on('error', boom)

    }
}
