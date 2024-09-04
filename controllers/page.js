exports.renderMain = async (req, res, next) => {
    try {
        res.render('main');
    } catch (err) {
        console.log(err);
        next(err)
    }
}