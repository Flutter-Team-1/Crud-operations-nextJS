import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/backend/models/user';

type HTTPMethods = 'POST' | 'GET';

const userController: Record<HTTPMethods, Record<string, (req: NextApiRequest, res: NextApiResponse) => Promise<void>>> = {
   POST: {
      create: async (req, res) => {
         const { name, email, password } = req.body;

         try {
            const user = new User({ name, email, password });
            await user.save();
            res.status(201).json({ success: true, data: user });
         } catch (error) {
            res.status(400).json({ success: false, error: (error as Error).message });
         }
      },
      update: async (req, res) => {
         const { id, name, email } = req.body;

         try {
            const updatedUser = await User.findByIdAndUpdate(
               id,
               { name, email },
               { new: true }
            );
            res.status(200).json({ success: true, data: updatedUser });
         } catch (error) {
            res.status(400).json({ success: false, error: (error as Error).message });
         }
      },
   },
   GET: {
      all: async (req, res) => {
         try {
            const users = await User.find({});
            res.status(200).json({ success: true, data: users });
         } catch (error) {
            res.status(500).json({ success: false, error: (error as Error).message });
         }
      },
      one: async (req, res) => {
         const { id } = req.query;

         try {
            const user = await User.findById(id);
            if (!user) {
               res.status(404).json({ success: false, error: "User not found" });
            } else {
               res.status(200).json({ success: true, data: user });
            }
         } catch (error) {
            res.status(500).json({ success: false, error: (error as Error).message });
         }
      },
   },
};

export default userController