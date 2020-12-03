//Javascript 3rd libraries and Typescript 
import 'reflect-metadata';
import _ from 'lodash';
import {Product} from 'product';

// import { plainToClass } from 'class-transformer';
const products = [
    {title:'hector'}, 
    {title:'andres'}
];

// //json to class
// const loadedProducts = plainToClass(Product, products);


console.log(_.shuffle([1,2,3]));
