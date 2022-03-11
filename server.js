const fs = require ('fs');
const path = require ('path');
const express = require ('express');
let uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extendend: true}));
app.use(express.json());
app.use(express.static("public"));