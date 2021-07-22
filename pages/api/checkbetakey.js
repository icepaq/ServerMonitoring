import * as Check from './databaseactions/checkBetaKey.js'

export default async (req, res) => {
    res.status(200).json({result: await Check.check(req.query.key)})
}