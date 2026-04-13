 const jwt = require("jsonwebtoken");
function middlewareaut(req,res,next)
{
        const token = req.headers.token;
        if(!token)
        {   
            res.status(401).json({
                message : "you are not logged in"
            })
            return;
        }
        const decode = jwt.verify(token,"akash123")
        const username=decode.username;
        if(!username)
        {
           res.status(402).send({
            message: "malforned token"
           })
           return;
        }
        req.username=username
        next()
    
}
module.exports = {
 middlewareaut

}