import jwt from 'jsonwebtoken';

const isTokenValid = ({ token }) =>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

const authenticateUser = async (req, res, next) => {
  // const token = req.headers.authorization;

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    // Authorization 헤더가 없는 경우 또는 값이 비어 있는 경우
    return res.status(401).json({
      success: false,
      statusCode: 401,
      error: true,
      message: 'Authentication Invalid',
    });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      error: true,
      message: 'Authentication Invalid',
    });
  }

  try {
    const { id, email, name } = isTokenValid({ token });
    req.user = { id, email, name };
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      statusCode: 401,
      error: true,
      message: 'Authentication Invalid',
    });
  }
};

export { authenticateUser };
