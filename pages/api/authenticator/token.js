const checkToken = require("./modules/checkToken.js");
import * as getEmail from "./modules/getServer.js";

export default async (req, res) => {
    const check = new checkToken();

    const server = await getEmail.getServer(req.query.server);
    const key = await check.run(req.query.key);

    res.status(200).json({
        server_email: server,
        key: key,
    });
};
