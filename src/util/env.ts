import dotenv from 'dotenv';

dotenv.config();

const env = {
  httpPort: parseInt(process.env.HTTP_PORT || '', 10),
  httpBodyLimit: process.env.HTTP_BODY_LIMIT,
  httpActive: process.env.HTTP_ACTIVE === 'true',
}

export { env };