// import jwt from "jsonwebtoken";

// export function generateToken(user: any) {
//   const { _id, name, email, role } = user;

//   const signature: any = process.env.TOKEN_SIGN_SECRET;
//   const expiration: string = "12h";

//   return jwt.sign({ _id, name, email, role }, signature, {
//     expiresIn: expiration,
//   });
// }