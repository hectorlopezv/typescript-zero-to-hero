"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//express-typescript-API
const express_1 = __importDefault(require("express"));
const todo_1 = __importDefault(require("./routes/todo"));
const body_parser_1 = require("body-parser");
const app = express_1.default();
//middle ware to jsonBeautyFy
app.use(body_parser_1.json());
//routes Handler
app.use('/todos', todo_1.default);
//simple middleWare
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
    next();
});
app.listen(3000, () => {
    console.log('We are Running');
});
