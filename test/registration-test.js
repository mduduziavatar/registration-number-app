const assert = require("assert");
let RegFactoryFunction = require('../reg-num');


const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://mdu:pg123@localhost:5432/reg_test';
const pool = new Pool({
    connectionString
});
let regFactory = RegFactoryFunction(pool);
describe("The registration number database functions", function() {

    const INSERT_QUERY = `insert into registrations(description, towns_id) values ($1, $2)`;

    beforeEach(async function() {
        await pool.query("delete from registrations");
    });

    it("should be able to add registrations to the database", async function() {

        var capeTown = 'CA 122312'

        await regFactory.addRegNumbers(capeTown)

        var allUsers = await regFactory.getAllRegNum()
        assert.deepEqual([{ description: 'CA 122312' }], allUsers);
    });

    it("should be able to add more then one registration to the database", async function() {

        var belleville = 'CY 122312'
        var capeTown = 'CA 122312'
        var paarl = 'CJ 122312'

        await regFactory.addRegNumbers(belleville)
        await regFactory.addRegNumbers(capeTown)
        await regFactory.addRegNumbers(paarl)

        var allReg = await regFactory.getAllRegNum()
        assert.deepEqual([{
            description: 'CA 122312'
        }], [{ description: 'CA 122312' }], [{ description: 'CJ 122312' }], [{ description: 'CY 122312' }], allReg);
    });

    it("should be able to filter items from database", async function() {

        var capeTown = 'CA 122312'
            // let id = '25'
            // let towns_id = '1'
        await regFactory.addRegNumbers('CA 122312');
        await regFactory.addRegNumbers('CJ 122312');
        var filterReg = await regFactory.filter('1');
        assert.deepEqual([{ description: 'CA 122312' }], [{ description: 'CA 122312' }], filterReg);
    });
    it("should be able to delete all registrations from database", async function() {

        var capeTown = 'CA 122312'

        await regFactory.addRegNumbers(capeTown)

        var allUsers = await regFactory.reset()
        assert.deepEqual([{ description: 'CA 122312' }], [{ description: 'CA 122312' }], allUsers);
    });

    it("should be able to get all items from database", async function() {

        var capeTown = 'CA 122312'

        await regFactory.addRegNumbers(capeTown)

        var allUsers = await regFactory.getAllRegNum()
        assert.deepEqual([{ description: 'CA 122312' }], [{ description: 'CA 122312' }], allUsers);
    });
});