const CheckUser = require("./modules/checkuser.js");

export default async (req, res) => {
    const checkuser = new CheckUser();

    if (await checkuser.run(req.query.email)) {
        res.status(200).json({ result: "EMAIL_EXISTS" });
        return;
    }

    res.status(200).json({result: "Not found"})
}