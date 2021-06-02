const Main = require('./databaseactions/addserver.js')

export default async (req, res) => {
    res.status(200).json({hi: await Main.main(req.query.serverip, req.query.servername, req.query.email)});
}