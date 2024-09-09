import * as multer from 'multer';

// Configure Multer to handle file uploads in memory
export const multerOptions = {
  storage: multer.memoryStorage(), // Store file in memory
  limits: {
    fileSize: 2000 * 2000 * 2, // 2MB limit
  },
};
