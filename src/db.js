import {createPool} from 'mysql2/promise'

export const pool =createPool({
    host: 'localhost',
    user: 'user',
    password: 'Camilo_Diego_Camilo_Dweb2023',
    database: 'dweb'
})
