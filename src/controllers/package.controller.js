import e from 'express'
import { pool } from '../db.js'

export const registerPackage = async (req, res) => {
    const { locationFrom, locationTo, size, weight, typeOfPackage, iduser } = req.body
    const [rows] = await pool.query('INSERT INTO package ( locationFrom, locationTo, iduser, typeOfPackage, size, weight ) VALUES( ?, ?, ?, ?, ?, ?)',
        [locationFrom, locationTo, iduser, typeOfPackage, size, weight])
    //Se coloca entre llaves para qu devuelva en un objeto json
    res.status(200).json({
        message: `Paquete creado con tamalho: ${size}`
    })
}
export const getUnassignedPackages = async (req, res) => {
    const queryPackages = `SELECT * from package WHERE state = 'Sin entregar'`
    const [rows] = await pool.query(queryPackages)
    // esta esperando a que se haga la consulta del nombre de usuario para retornar la info
    const packages = await Promise.all(rows.map(async (packageElement) => {
        const { locationFrom, locationTo, state, idpackage, iduser } = packageElement
        const findUserPackage = `SELECT name FROM user WHERE iduser = '${iduser}'`
        const [rows] = await pool.query(findUserPackage)
        // extrae del objeto el nombre
        const name = rows[0]?.name
        const info = { locationFrom, locationTo, state, idpackage, name }
        return info
    }))
    res.json(packages)
}
export const getAssignedPackages = async (req, res) => {
    const iddelivery = req.query.iddelivery
    const queryPackages = `SELECT * from package WHERE iddelivery = ${iddelivery} AND state != 'Entregado'`
    const [rows] = await pool.query(queryPackages)
    // esta esperando a que se haga la consulta del nombre de usuario para retornar la info
    const packages = await Promise.all(rows.map(async (packageElement) => {
        const { locationFrom, locationTo, state, idpackage, iduser } = packageElement
        const findUserPackage = `SELECT name FROM user WHERE iduser = '${iduser}'`
        const [rows] = await pool.query(findUserPackage)
        // extrae del objeto el nombre
        const name = rows[0]?.name
        const info = { locationFrom, locationTo, state, idpackage, name }
        return info
    }))
    res.json(packages)
}

export const takePackage = async (req, res) => {
    const state = 'En transporte'
    const { iddelivery, idpackage } = req.body
    const queryUpdatePackage = `UPDATE package SET iddelivery = ?, state = ? WHERE idpackage = ${idpackage}`
    const [rows] = await pool.query(queryUpdatePackage, [iddelivery, state])
    console.log(rows)
    res.json({ message: 'El paquete esta en transporte' })
}
export const deliveryPackage = async (req, res) => {
    const state = 'Entregado'
    const { iddelivery, idpackage } = req.body
    const queryUpdatePackage = `UPDATE package SET iddelivery = ?, state = ? WHERE idpackage = ${idpackage}`
    const [rows] = await pool.query(queryUpdatePackage, [iddelivery, state])
    console.log(rows)
    res.json({ message: 'El paquete ha sido entregado' })
}
export const getDeliveredPackages = async (req, res) => {
    const iddelivery = req.query.iddelivery
    const queryPackages = `SELECT * from package WHERE iddelivery = ${iddelivery} AND state = 'Entregado'`
    const [rows] = await pool.query(queryPackages)
    // esta esperando a que se haga la consulta del nombre de usuario para retornar la info
    const packages = await Promise.all(rows.map(async (packageElement) => {
        const { locationFrom, locationTo, state, idpackage, iduser } = packageElement
        const findUserPackage = `SELECT name FROM user WHERE iduser = '${iduser}'`
        const [rows] = await pool.query(findUserPackage)
        // extrae del objeto el nombre
        const name = rows[0]?.name
        const info = { locationFrom, locationTo, state, idpackage, name }
        return info
    }))
    res.json(packages)
}
export const getPackageById = async (req,res) => {
    const {iduser} = req.query
    const queryFindPackageById = `SELECT * FROM package WHERE iduser = ${iduser}`
    const [rows] = await pool.query(queryFindPackageById)
    const packages = await (Promise.all(rows.map(async (packageElement) => {
        const {idpackage, state, locationFrom, locationTo, iduser} = packageElement
        const findUserPackage = `SELECT * FROM user WHERE iduser =${iduser}`
        const [rows] = await pool.query(findUserPackage)
        //extraer el nombre
        const name = rows[0]?.name
        const info = {locationFrom, locationTo, state, idpackage, name}
        return info
    })))
    
}
