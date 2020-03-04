import {createPool, Pool, PoolConfig, PoolConnection} from 'mysql'

export default class Database {
    
    private readonly pool: Pool

    constructor(callback: (err: any) => void, config?: PoolConfig) {
        try {
            // Create a connection with the details provided in .env, unless different config provided
            if (typeof config === 'undefined') {
                this.pool = createPool({
                    host: process.env.MYSQL_HOST || "localhost",
                    user: process.env.MYSQL_USER || "root",
                    password: process.env.MYSQL_PWD || "password",
                    port: Number(process.env.MYSQL_PORT) || 3306,
                    database: process.env.MYSQL_DB || "foodbutler"
                })
            } else {
                this.pool = createPool(config)
            }

            // Test the connection
            this.getConnection().then(conn => {
                conn.ping((err) => {
                    if (err) { throw err }
                    console.log(`Successfully connected to MySQL database '${conn.config.database}' on ${conn.config.host}:${conn.config.port}`)
                })
                conn.release()
            }).catch(err => { throw err })
        } catch(ex) {
            this.pool = createPool({})
            callback(ex)
        }
    }
    
    // Query the database, with optional arguments
    public async query(sql: string, args?: any[]): Promise<any> {
        await this.getConnection().then(conn => {
            return new Promise((resolve, reject) => {
                conn.query(sql, args, (err, rows) => { // 'rows' may be a result from a COUNT(*)
                    if (err) {
                        conn.release()
                        return reject(err)
                    }
                    resolve(rows)
                })
            }).finally(conn.release)
        })
    }

    // Get a connection to the MySQL database
    protected async getConnection(): Promise<PoolConnection> {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, conn) => {
                if (err) {
                    return reject(err)
                }
                resolve(conn)
            })
        })
    }
}