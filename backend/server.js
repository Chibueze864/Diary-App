const express = require("./rest")

const http = require("http");
const server = http.createServer(express).listen(3000);