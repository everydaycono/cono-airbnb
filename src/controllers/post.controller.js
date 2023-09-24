import prisma from '../db.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const showAllPost = asyncHandler(async (req, res) => {
  // find post
  const post = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return res.status(200).json({
    message: 'show all post',
    data: post,
  });
});
const createAuthPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;

  // create post
  const data = await prisma.post.create({
    data: {
      title,
      content,
      authorId: parseInt(id),
    },
  });

  return res.status(201).json({
    data: {
      title: data.title,
      content: data.content,
      id: data.id,
      author: data.authorId,
    },
    message: 'create post',
  });
});
const showSinglePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true,
    },
  });
  return res.status(200).json({
    data: post,
    message: 'show single post',
  });
});
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  //   owner check
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!post) {
    return res.status(404).json({
      message: 'post not found',
    });
  }

  //   user and req.user check
  if (post.authorId !== req.user.id) {
    return res.status(403).json({
      message: 'forbidden',
    });
  }

  await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  });
  return res.status(200).json({
    message: 'delete post',
  });
});

export { showAllPost, createAuthPost, showSinglePost, deletePost };
