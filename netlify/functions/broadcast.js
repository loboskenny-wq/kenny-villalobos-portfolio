const crypto = require("crypto");
const SECRET = process.env.SESSION_SECRET;
function unauthorized(){return {statusCode:401,headers:{"Cache-Control":"no-store"},body:JSON.stringify({error:"Unauthorized"})};}
exports.handler = async (event) => {
  if(event.httpMethod!=="GET" || !SECRET) return unauthorized();
  const header=event.headers.authorization||event.headers.Authorization||"";
  const token=header.replace(/^Bearer\s+/i,""); const parts=token.split(".");
  if(parts.length!==2) return unauthorized();
  const expected=crypto.createHmac("sha256",SECRET).update(parts[0]).digest();
  let actual;try{actual=Buffer.from(parts[1],"base64url");}catch{return unauthorized();}
  if(actual.length!==expected.length || !crypto.timingSafeEqual(actual,expected)) return unauthorized();
  let payload;try{payload=JSON.parse(Buffer.from(parts[0],"base64url").toString());}catch{return unauthorized();}
  if(!payload.exp || payload.exp<Date.now()) return unauthorized();
  // Replace these sample entries with approved portfolio items. Private project details
  // are returned only after the signed session token has been validated.
  const projects=[];
  for(let year=2026;year>=2014;year--) projects.push({year,items:[]});
  return {statusCode:200,headers:{"Content-Type":"application/json","Cache-Control":"no-store"},body:JSON.stringify({projects})};
};