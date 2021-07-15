const checkToken = require("./modules/checkToken.js");
import * as getEmail from "./modules/getServer.js";

export default async (req, res) => {
    const check = new checkToken();
    const email = req.query.email;
    const server = await getEmail.getServer(req.query.server, email);
    const key = await check.run(req.query.key);

    res.status(200).json({
        key: key,
    });
};
