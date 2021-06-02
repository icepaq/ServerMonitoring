import Ping from 'ping';

export default async (req, res) => {
    
    var host ='google.com';
    let r = await Ping.promise.probe(host);
    console.log(r);

    res.status(200).json({latency: r.avg})
}