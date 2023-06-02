import { pool } from '../db.js'

export const deliveryGetUsers = async (req, res) => {
  const [result] = await pool.query('SELECT "pong" AS result')
  res.json(result[0])
}

export const registerDelivery = async (req, res) => {
  const { email, name, password } = req.body
  const [rows] = await pool.query('INSERT INTO delivery ( email, name, password) VALUES( ?, ?, ?)',
    [email, name, password])
  //Se coloca entre llaves para qu devuelva en un objeto json
  res.status(200).json({
    message: `usuario creado satisfactoriamente con email: ${email}`
  })
}
export const loginDelivery =async (req, res) =>{
  const {username, password} = req.body
  const consulta = `SELECT * FROM delivery WHERE email="${username}"`
  const [cons] = await pool.query(consulta)
    const user = cons[0]
    if (!user || password !== user.password) return res.status(401).json({ message: 'Usuario y/o contraseña incorrecta' })

    const { name, email } = user

    res.status(200).json({ name, email })
}

export const deliveryUpdateUsers = async (req, res) => {
  const [result] = await pool.query('SELECT "pong" AS result')
  res.json(result[0])
}
export const deliveryDeleteUsers = async (req, res) => {
  const [result] = await pool.query('SELECT "pong" AS result')
  res.json(result[0])
}
