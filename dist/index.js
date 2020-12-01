"use strict";
var count = 2;
var promise = new Promise(function (res, rej) {
    if (count == 2) {
        res();
    }
    else {
        rej();
    }
});
promise.then(function () { return console.log("It is resoleved"); }).catch(function () { return console.log("Rejected"); });
