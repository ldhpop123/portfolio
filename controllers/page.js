exports.renderMain = async (req, res, next) => {
    try {
        res.render('main');
    } catch (err) {
        console.log(err);
        next(err)
    }
}

exports.renderWeather = async (req, res, next) => {
    try {
        res.render('openweather');
    } catch (err) {
        console.log(err);
        next(err)
    }
}

exports.renderMusic = async (req, res, next) => {
    try {
        res.render('music');
    } catch (err) {
        console.log(err);
        next(err)
    }
}