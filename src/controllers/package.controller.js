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
