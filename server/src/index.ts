// grab sensitive information from .env file
require('dotenv').config({path: require('find-config')('.env')})

import express, { Express, Request, Response } from 'express';

// instantiate express app
const app: Express = express();
const port = process.env.SERVER_PORT || 4000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Express and Typescript working!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});