import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import VisitorRouter from './routes/visitor.routes.js';
import AuthRouter from './routes/auth.routes.js';
import PostRouter from './routes/post.routes.js';
import prisma from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('csr ssr test api');
});

// 로그인 없이 글쓰기
app.use('/api/visitors', VisitorRouter);
app.use('/api/posts', PostRouter);
app.use('/api/auth', AuthRouter);

const main = async () => {
  console.log(process.env, 'TEST purpose');
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    console.log('Server is not running');
    await prisma.$disconnect();
    process.exit();
  }
};

main();
