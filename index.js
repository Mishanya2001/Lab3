const mongodb = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const app = express("JSON");
const MongoClient = mongodb.MongoClient;
const mongoUrl = "mongodb://localhost:27017/Tasks";
let mongo;

app.get('/', function (req, res) {
    MongoClient
        .connect(mongoUrl)
        .then(function (client) {
            mongo = client.db();
/*             mongo
                .collection('Tasks')
                .insertOne({
                    firstName: 'Іван',
                    lastName: 'Іванов'
                })
                .then(function () {
                    console.log('Запис створено');
                }); */
            mongo
                .collection('Tasks')
                .find()
                .toArray()
                .then(function (Tasks) {
                    res.json(Tasks);
                });
        });

});

app.listen(3000);
app.use(bodyParser.json());
app.post('/', function (req, res) {
    res.json(req.body);
});