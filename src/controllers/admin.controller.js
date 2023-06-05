import { query } from "express"
import { pool } from "../db.js"

export const loginAdmin = async (req, res) => {
    const { username, password } = req.body
    const query = `SELECT * FROM admin WHERE email = "${username}"`
    const [rows] = await pool.query(query)
    const user = rows[0]
    if (!user || password !== user.password) return res.status(401).json({ message: 'Usuario y/o contraseña incorrecta' })
    const { name, email, idadmin } = user
    res.status(200).json({ name, email, idadmin })
}

export const getDataPackage = async (req, res) => {
    const query = `SELECT state, count(*) AS count FROM package group by state`
    const [rows] = await pool.query(query)
    res.json({paquetes: rows})
    

}