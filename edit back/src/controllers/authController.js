const fs = require("fs-extra");
const path = require("path");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Ensure data directory exists
const dataDir = path.join(__dirname, "../../data");
fs.ensureDirSync(dataDir);

const adminsFile = path.join(dataDir, "admins.json");
const JWT_SECRET = process.env.JWT_SECRET || 'stafet_jwt_secret_2025';

// Initialize admins file if it doesn't exist
const initializeAdminsFile = async () => {
  if (!(await fs.pathExists(adminsFile))) {
    // Create default admin with hashed password
    const defaultPassword = 'Stafet@123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);
    
    const defaultData = {
      admins: [
        {
          id: "admin-1",
          email: "admin@stafet.com",
          status: "approved",
          createdAt: new Date().toISOString(),
          approvedAt: new Date().toISOString(),
          approvedBy: "system",
          password: hashedPassword
        }
      ],
      pendingRequests: [],
      requestTokens: []
    };
    
    await fs.writeJson(adminsFile, defaultData, { spaces: 2 });
  }
};

// Login endpoint
const login = async (req, res) => {
  try {
    await initializeAdminsFile();
    const { email, password } = req.body;

    console.log('🔐 Login attempt:', { email, passwordLength: password?.length });

    // Validate input
    if (!email || !password) {
      console.log('❌ Missing credentials');
      return res.status(400).json({
        success: false,
        error: "Email and password are required"
      });
    }

    // Read admin data
    const data = await fs.readJson(adminsFile);
    console.log('📊 Admin data loaded, admin count:', data.admins.length);
    
    // Find admin by email
    const admin = data.admins.find(a => 
      a.email.toLowerCase() === email.toLowerCase() && 
      a.status === 'approved'
    );

    console.log('👤 Admin found:', admin ? 'Yes' : 'No');
    if (!admin) {
      console.log('❌ No admin found with email:', email);
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    // Verify password
    console.log('🔑 Comparing password...');
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log('🔑 Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('❌ Invalid password for email:', email);
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        adminId: admin.id, 
        email: admin.email 
      },
      JWT_SECRET,
      { expiresIn: '30m' } // 30 minutes expiration
    );

    // Return success response
    res.json({
      success: true,
      message: "Login successful",
      token: token,
      admin: {
        id: admin.id,
        email: admin.email,
        status: admin.status
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

// Verify token endpoint
const verifyToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: "No token provided"
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Optionally verify admin still exists and is active
    await initializeAdminsFile();
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

    res.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        status: admin.status
      }
    });

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

    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

// Change password endpoint
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: "No token provided"
      });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET);

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: "Current password and new password are required"
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: "New password must be at least 8 characters long"
      });
    }

    await initializeAdminsFile();
    const data = await fs.readJson(adminsFile);
    
    // Find admin
    const adminIndex = data.admins.findIndex(a => a.id === decoded.adminId);
    
    if (adminIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Admin not found"
      });
    }

    const admin = data.admins[adminIndex];

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.password);
    
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Current password is incorrect"
      });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    
    // Update admin password
    data.admins[adminIndex].password = hashedNewPassword;
    data.admins[adminIndex].lastPasswordChange = new Date().toISOString();

    await fs.writeJson(adminsFile, data, { spaces: 2 });

    res.json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

module.exports = {
  login,
  verifyToken,
  changePassword
};
