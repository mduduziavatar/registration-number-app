module.exports = function(regFactory) {
    async function index(req, res, next) {
        try {
            res.render('index');
            console.log(req.body)
        } catch (err) {
            next(err)
        }
    }
    async function registrationAdd(req, res, next) {

        const regNumbers = req.body.addRegNum;
        const towns = req.body.town;
        console.log(regNumbers)

        try {
            res.render('index', {
                regNumber: regNumbers
            });
        } catch (err) {
            next(err);
        }
    }
    async function reg_numbers(req, res, next) {

        try {

            res.render('index', {

            })
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
        reg_numbers,
        index,
        registrationAdd,
        reset
    }
}