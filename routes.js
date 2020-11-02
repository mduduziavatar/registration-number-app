module.exports = function(regFactory) {
    async function index(req, res, next) {
        try {
            res.render('index', {
                regNumber: await regFactory.getAllRegNum()
            });
        } catch (err) {
            next(err)
        }
    }
    async function registrationAdd(req, res, next) {
        try {
            const upReg = req.body.addRegNum;
            const regNumbers = upReg.toUpperCase()
            if (regNumbers !== "") {
                if (/C[AYJ] \d{3,6}$/.test(regNumbers) || /C[AYJ] \d{3}-\d{3}$/.test(regNumbers)) {
                    if (await regFactory.checker(regNumbers) === 0) {
                        await regFactory.addRegNumbers(regNumbers);
                        console.log(regNumbers)
                        req.flash("success", "registration successfully added!")
                    } else {
                        req.flash("errors", "registration already exists")
                    }
                } else {
                    req.flash("errors", "please enter a valid registration number like CA 123123");
                }
            } else {
                req.flash("errors", "please enter a registration");
            }
            const allPlates = await regFactory.getAllRegNum();

            res.render('index', {
                regNumber: allPlates
            });
        } catch (err) {
            next(err);
        }
    }
    async function filtered(req, res, next) {
        try {
            let filtering = req.query.town;
            const filtered = await regFactory.filter(filtering);
            res.render('index', {
                regNumber: filtered
            });
        } catch (err) {
            next(err)
        }
    }

    async function reset(req, res, next) {
        try {
            var reset = await regFactory.reset()
            res.render('index')
        } catch (err) {
            next(err)
        }
    }

    return {
        filtered,
        index,
        registrationAdd,
        reset
    }
}