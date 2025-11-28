import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic'

const MONGODB_URI = process.env.MONGODB_URI || ''
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

// Connect to MongoDB
async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return
  }
  
  return mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  })
}

export async function POST(request: Request) {
  try {
    // Connect to database
    await connectDB()

    // Parse request body
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = await User.findOne({ email })
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    
    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate token
    const token = jwt.sign(
      { 
        userId: user._id.toString(), 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Return success
    return NextResponse.json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Server error', error: String(error) },
      { status: 500 }
    )
  }
}
