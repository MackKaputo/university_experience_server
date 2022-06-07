const userAuth = async (req, res, next) => {
    return res.status(200).json({msg: "middleware working "})
}