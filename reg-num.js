module.exports = function RegFactoryFunction(pool) {

    async function addRegNumbers(items) {
        if (!items == "") {
            const regStartsWith = items.substring(0, 2);
            const dbTownsId = await pool.query(`select id from towns where startswith = $1`, [regStartsWith]);
            const townsId = dbTownsId.rows[0].id;
            let checker;
            if (townsId > 0) {
                checker = await pool.query(`select * from registrations where description = $1`, [items]);
            } else {
                return false
            }
            if (checker.rowCount === 0) {
                await pool.query(`insert into registrations (description, towns_id) values ($1, $2)`, [items, townsId]);
            } else {
                return false
            }
        } else {
            return false
        }
    }
    async function filter(town) {
        if (town === 'all') {
            const allRegistrations = await pool.query(`select description from registrations`);
            return allRegistrations.rows
        } else {
            const filtered = await pool.query(`select * from registrations where towns_id = $1;`, [town]);
            return filtered.rows
        }
    }
    // this is for local storage
    async function getAllRegNum() {
        const allReg = await pool.query(`select description from registrations`);
        return allReg.rows;
    }

    async function reset() {
        const reset = await pool.query(`delete from registrations`)
        return reset.rows
    }

    async function checker(items) {
        checkered = await pool.query(`select * from registrations where description = $1`, [items])
        return checkered.rowCount
    }

    return {
        addRegNumbers,
        getAllRegNum,
        reset,
        filter,
        checker

    }
}