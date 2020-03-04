#! /usr/bin/env node
/*
    jsfn.js

    Start a service with the functions in the current directory.

        * ./functions/
        * ./middleware/
        * ./gateway/
*/
const { Service } = require('./index.js')
Service.start()
