import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    health: 'good',
    timeStamp: new Date().toISOString(),
  });
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    server: 'emi api gateway',
    timeStamp: new Date().toISOString(),
  });
});

app.get('/list', (req: Request, res: Response) => {
  res.status(200).json({
    users: [
      {
        first_name: 'Emi',
        last_name: 'Roberto',
        age: 47,
        country: 'Italy',
        active: true,
        last_login: '2025-05-13T09:15:00Z',
      },
      {
        first_name: 'Alice',
        last_name: 'Smith',
        age: 29,
        country: 'UK',
        active: true,
        last_login: '2025-05-12T16:45:00Z',
      },
      {
        first_name: 'John',
        last_name: 'Doe',
        age: 35,
        country: 'USA',
        active: false,
        last_login: '2025-05-10T12:30:00Z',
      },
      {
        first_name: 'Sophie',
        last_name: 'Dubois',
        age: 31,
        country: 'France',
        active: true,
        last_login: '2025-05-13T08:05:00Z',
      },
      {
        first_name: 'Carlos',
        last_name: 'Gomez',
        age: 40,
        country: 'Spain',
        active: false,
        last_login: '2025-05-01T19:00:00Z',
      },
      {
        first_name: 'Lena',
        last_name: 'Müller',
        age: 27,
        country: 'Germany',
        active: true,
        last_login: '2025-05-13T07:55:00Z',
      },
      {
        first_name: 'Yu',
        last_name: 'Wang',
        age: 38,
        country: 'China',
        active: true,
        last_login: '2025-05-11T22:15:00Z',
      },
      {
        first_name: 'Ahmed',
        last_name: 'Khan',
        age: 45,
        country: 'Pakistan',
        active: false,
        last_login: '2025-05-09T18:30:00Z',
      },
      {
        first_name: 'Maria',
        last_name: 'Santos',
        age: 33,
        country: 'Portugal',
        active: true,
        last_login: '2025-05-13T06:20:00Z',
      },
      {
        first_name: 'Chloe',
        last_name: 'Evans',
        age: 24,
        country: 'Australia',
        active: true,
        last_login: '2025-05-13T03:15:00Z',
      },
      {
        first_name: 'Robert',
        last_name: 'Johnson',
        age: 50,
        country: 'Canada',
        active: false,
        last_login: '2025-05-02T14:00:00Z',
      },
    ],
    timeStamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log('Server started', PORT, new Date().toISOString());
});
