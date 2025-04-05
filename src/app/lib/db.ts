import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: 'Rima123456',
  host: 'localhost',
  port: 5432,
  database: 'kursovaya',
});

export default pool; 