import { pool } from "../db.js";

export const query = async (req, res) =>{
    const [result] = await pool.query('SELECT "pong" AS result')
    res.json(result[0])
  }