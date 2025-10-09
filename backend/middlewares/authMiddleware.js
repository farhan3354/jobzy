import jwt from "jsonwebtoken";
// import User from "../models/usermodel.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // res.json({ user: decoded });
      // req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Admins only" });
  }
};

export const employerMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "employer") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Employers only" });
  }
};

export const jobSeekerMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "job-seeker") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Job seekers only" });
  }
};
