const jwt = require('jsonwebtoken');
const fs = require("fs-extra");
const path = require("path");

const JWT_SECRET = process.env.JWT_SECRET || 'stafet_jwt_secret_2025';
const adminsFile = path.join(__dirname, "../../data/admins.json");

/**
 * Middleware to authenticate JWT tokens
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: "Access token required"
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if admin still exists and is active
    if (await fs.pathExists(adminsFile)) {
      const data = await fs.readJson(adminsFile);
      const admin = data.admins.find(a => 
        a.id === decoded.adminId && 
        a.status === 'approved'
      );

      if (!admin) {
        return res.status(401).json({
          success: false,
          error: "Admin not found or inactive"
        });
      }

      // Add admin info to request
      req.admin = {
        id: admin.id,
        email: admin.email
      };
    }
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: "Token expired"
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: "Invalid token"
      });
    }

    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      error: "Authentication failed"
    });
  }
};

/**
 * Optional authentication middleware
 * Sets req.admin if valid token is provided, but doesn't reject if missing
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, JWT_SECRET);
      
      if (await fs.pathExists(adminsFile)) {
        const data = await fs.readJson(adminsFile);
        const admin = data.admins.find(a => 
          a.id === decoded.adminId && 
          a.status === 'approved'
        );

        if (admin) {
          req.admin = {
            id: admin.id,
            email: admin.email
          };
        }
      }
    }
    
    next();
  } catch (error) {
    // Ignore errors in optional auth
    next();
  }
};

module.exports = {
  authenticateToken,
  optionalAuth
};
