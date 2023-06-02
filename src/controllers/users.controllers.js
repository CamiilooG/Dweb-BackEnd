import { pool } from '../db.js'
export const getUsers = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM user')
    res.json(rows)
}
export const loginUser = async (req, res) => {
    const { username, password } = req.body
    const consulta = `SELECT * FROM user WHERE email="${username}"`;
    const [result] = await pool.query(consulta)
    const user = result[0]
    if (!user || password !== user.password) return res.status(401).json({ message: 'Usuario y/o contraseña incorrecta' })

    const { name, location, email } = user

    res.status(200).json({ name, location, email })
}
export const registerUser = async (req, res) => {
    const { email, name, password, location } = req.body
    const [rows] = await pool.query('INSERT INTO user ( email, name, password, location) VALUES( ?, ?, ?, ?)',
        [email, name, password, location])
    //Se coloca entre llaves para qu devuelva en un objeto json
    res.status(200).json({
        message: `usuario creado satisfactoriamente con email: ${email}`
    })
}
export const updateUser = (req, res) => {
    res.send('actualizando usuarios')
}
export const deleteUser = (req, res) => {
    res.send('eliminando empleado')
}