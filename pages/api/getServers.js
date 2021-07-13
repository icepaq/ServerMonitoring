import * as GetServers from "../api/databaseactions/getServers";

export default async (req, res) => {
    res.status(200).json({ result: await GetServers.check(req.query.email) });
};
