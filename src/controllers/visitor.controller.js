import prisma from '../db.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getVisitorHistory = asyncHandler(async (req, res) => {
  const visitors = await prisma.visitor.findMany();

  res.status(200).json({
    mewssage: 'visitor history',
    data: visitors,
  });
});

const postVisitorHistory = asyncHandler(async (req, res) => {
  const { title, content, image, user } = req.body;

  await prisma.visitor.create({
    data: {
      title,
      content,
      image,
      user,
    },
  });

  res.status(201).json({
    title,
    content,
    image,
    user,
  });
});

const getSingleVisitorHistory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const visitor = await prisma.visitor.findUnique({
    where: { id: parseInt(id) },
  });

  return res.status(200).json({
    message: 'single visitor history',
    data: visitor,
  });
});

const deleteSingleVisitorHistory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.visitor.delete({
    where: { id: parseInt(id) },
  });

  res.status(200).json({
    message: 'visitor deleted',
  });
});

export {
  getVisitorHistory,
  postVisitorHistory,
  getSingleVisitorHistory,
  deleteSingleVisitorHistory,
};
