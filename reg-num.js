module.exports = function RegFactoryFunction(pool) {

    // const pg = require('pg');
    // const Pool = pg.Pool;
    // const connectionString = process.env.DATABASE_URL || 'postgresql://mdu:pg123@localhost:5432/registration_numbers';
    // const pool = new Pool({
    //     connectionString
    // });
    async function addRegNumbers(items) {
        // const regex = /C[AYJ]d{3,6}$/;
        // const correctOnly = items.replace(regex, "")
        // const item = items.charAt(1).toUpperCase() + items.slice(2).toLowerCase()
        // getting the correct two letters of reg number
        if (!items == "") {
            const regStartsWith = items.substring(0, 2);
            const dbTownsId = await pool.query(`select id from towns where startswith = $1`, [regStartsWith]);

            const townsId = dbTownsId.rows[0].id;


            let checker;
            if (townsId > 0) {
                checker = await pool.query(`select * from registrations where description = $1`, [items])

            } else {
                return false
            }
            if (checker.rowCount === 0) {
                console.log('test');
                await pool.query(`insert into registrations (description, towns_id) values ($1, $2)`, [items, townsId]);
                console.log('test1');

            }
        }
    }


    async function filter(town) {
        if (town) {
            const filtered = await pool.query(`select * from registration where town_id = $1;`, [town]);
            return filtered.rows
        } else {
            if (town === 'all') {
                const allRegistrations = await pool.query(`select description from registrations`);
                return allRegistrations.rows
            }
        }
    }
    // this is for local storage
    async function getAllRegNum() {
        const allReg = await pool.query(`select description from registrations`);
        return allReg.rows;

    }

    async function reset() {
        const reset = await pool.query(`delete from registration_numbers`)
        return reset.rows
    }

    return {
        addRegNumbers,
        getAllRegNum,
        reset,
        filter

    }
}