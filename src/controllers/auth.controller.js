import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../db.js';

const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  // encrypt password hash
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
      name,
    },
  });

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
    name: user.name,
  });
  return res.status(201).json({
    message: 'User created',
    data: user.name,
    token: accessToken,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Invalid credentials');
  }

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  return res.status(200).json({
    message: 'Logged in',
    data: user.name,
    token: accessToken,
  });
});

// create JWT
const generateAccessToken = ({ userId, email, name }) => {
  return jwt.sign(
    { id: userId, email, name },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '3d',
    }
  );
};

export { registerUser, loginUser };
