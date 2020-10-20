module.exports = function RegFactoryFunction(pool) {
    async function addRegNumbers(items) {
        // const regex = /C[AYJ]d{3,6}$/;
        // const correctOnly = items.replace(regex, "")
        // const item = items.charAt(1).toUpperCase() + items.slice(2).toLowerCase()
        // getting the correct two letters of reg number
        if (!items == "") {
            const regStartsWith = items.substring(0, 2);
            const dbTownsId = await pool.query(`select id from towns where startswith =$1`, [regStartsWith]);
            const townsId = dbTownsId.rows[0].id;


            let checker;
            if (townsId > 0) {
                checker = await pool.query(`select * from registrations where description = $1`, [items])

            } else {
                return false
            }
            if (checker.rowCount === 0) {
                await pool.query(`insert into registrations (description, towns_id) values ($1, $2)`, [items], [townsId]);
            }
        }
    }

    // function displaying registrations
    function selectedRadio(town) {
        if (town == "all") {
            return userMappedData;
        } else {
            var list = [];
            for (var i = 0; i < userMappedData.length; i++) {
                if (userMappedData[i].startsWith(town)) {
                    list.push(userMappedData[i])
                }
            }
            return list;
        }
    }
    // this is for local storage
    async function getAllRegNum() {
        const allReg = await pool.query(`select description from registrations`);
        return allReg.rows;

    }


    //Gets all valid reg being entered
    function showList(item) {
        regNumber.innerHTML = "";
        for (var i = 0; i < item.length; i++) {
            const currentItem = item[i];
            const theElement = document.createElement("div");
            theElement.innerHTML = currentItem;
            regNumber.appendChild(theElement);
        }
    }

    async function reset() {
        const reset = await pool.query(`delete from registration_numbers`)
        return reset.rows
    }

    return {
        addRegNumbers,
        getAllRegNum,
        selectedRadio,
        showList,
        reset

    }
}