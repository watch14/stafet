const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = 'Stafet@123';
  const saltRounds = 12;
  
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Original password:', password);
    console.log('Hashed password:', hashedPassword);
    
    // Test the hash
    const isValid = await bcrypt.compare(password, hashedPassword);
    console.log('Hash validation test:', isValid);
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}

hashPassword();
