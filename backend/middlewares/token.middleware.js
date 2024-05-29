import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.model.js";

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      return jsonwebtoken.verify(
        token,
        process.env.JWT_SECRET
      );
    }

    return false;
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (!tokenDecoded) return res.status(401).json({ status: 401, message: "Unauthorized"});

  const user = await User.findById(tokenDecoded.id);

  if (!user) return res.status(401).json({ status: 401, message: "Unauthorized"});

  req.user = user;

  next();
};

export default { auth, tokenDecode };