import e from 'express'
import { pool } from '../db.js'

export const registerPackage = async (req, res) => {
    const { locationFrom, locationTo, size, weight, typeOfPackage, iduser } = req.body
    const [rows] = await pool.query('INSERT INTO package ( locationFrom, locationTo, iduser, typeOfPackage, size, weight ) VALUES( ?, ?, ?, ?, ?, ?)',
        [locationFrom, locationTo, iduser,typeOfPackage, size, weight  ])
    //Se coloca entre llaves para qu devuelva en un objeto json
    res.status(200).json({
        message: `Paquete creado con tamalho: ${size}`
    })
}
export const getUnassignedPackages = async (req, res) => {
    const queryPackages = `SELECT * from package WHERE state = 'Sin entregar'`
    const [rows] = await pool.query(queryPackages)
    // esta esperando a que se haga la consulta del nombre de usuario para retornar la info
    const packages = await Promise.all(rows.map( async (packageElement) => {
        const {locationFrom, locationTo, state, idpackage, iduser } = packageElement
        const findUserPackage = `SELECT name FROM user WHERE iduser = '${iduser}'` 
        const [rows] = await pool.query(findUserPackage)
        // extrae del objeto el nombre
        const name = rows[0]?.name
        const info = {locationFrom, locationTo, state, idpackage,name }
        return info
    }))
    res.json(packages)
}
export const getAssignedPackages = async (req, res) => {
    const queryPackages = `SELECT * from package WHERE state = 'Entregado'`
    const [rows] = await pool.query(queryPackages)
    // esta esperando a que se haga la consulta del nombre de usuario para retornar la info
    const packages = await Promise.all(rows.map( async (packageElement) => {
        const {locationFrom, locationTo, state, idpackage, iduser } = packageElement
        const findUserPackage = `SELECT name FROM user WHERE iduser = '${iduser}'` 
        const [rows] = await pool.query(findUserPackage)
        // extrae del objeto el nombre
        const name = rows[0]?.name
        const info = {locationFrom, locationTo, state, idpackage,name }
        return info
    }))
    res.json(packages)
}
