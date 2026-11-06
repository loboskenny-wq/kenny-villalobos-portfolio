const crypto = require("crypto");
const SECRET = process.env.SESSION_SECRET;
const PASSWORD = process.env.BROADCAST_PASSWORD;
function b64(value){return Buffer.from(value).toString("base64url");}
exports.handler = async (event) => {
  if(event.httpMethod !== "POST") return {statusCode:405,body:"Method not allowed"};
  if(!PASSWORD || !SECRET) return {statusCode:503,body:JSON.stringify({error:"Password access is not configured"})};
  let body; try{body=JSON.parse(event.body||"{}");}catch{return {statusCode:400,body:JSON.stringify({error:"Bad request"})};}
  if(typeof body.password!=="string" || body.password!==PASSWORD) return {statusCode:401,body:JSON.stringify({error:"Invalid password"})};
  const payload=b64(JSON.stringify({exp:Date.now()+8*60*60*1000}));
  const sig=crypto.createHmac("sha256",SECRET).update(payload).digest("base64url");
  return {statusCode:200,headers:{"Content-Type":"application/json","Cache-Control":"no-store"},body:JSON.stringify({token:payload+"."+sig})};
};