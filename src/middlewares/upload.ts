// @ts-ignore
import multer from 'multer';
import { Request, Response, NextFunction, Express } from 'express';

const imageFilter = (req: Request, file: Express.Multer.File, cb: any) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('Please upload only images.', false);
    }
};

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, './uploads/');
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        const name = `${Date.now()}-Shehryar-${file.originalname}`;
        req.body.logo = name;
        cb(null, name);
    },
});

export const uploadFile = multer({storage, fileFilter: imageFilter}).single('logo');

