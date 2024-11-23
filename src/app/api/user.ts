import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../lib/db';
import userController from '../../backend/controllers/userController';
type HTTPMethods = 'POST' | 'GET';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   await connectToDatabase();
   try {

      const method = req.method as HTTPMethods | undefined;
      const action = req.headers.action as string | undefined;

      if (!method || !userController[method]) {
         return res.status(405).json({
            success: false,
            error: `Method ${method} is not allowed.`,
         });
      }

      const methodHandlers = userController[method];
      const actionHandler = methodHandlers[action as keyof typeof methodHandlers];

      if (actionHandler) {
         return actionHandler(req, res);
      }

      return res.status(405).json({
         success: false,
         error: `Action ${action} is not allowed for method ${method}.`,
      });
   }
   catch (error: any) {
      return res.status(500).json({
         success: false,
         error: error.message
      });
   }
}
