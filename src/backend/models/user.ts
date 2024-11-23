import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         trim: true,
      },
      mobile: {
         type: String,
         required: true,
      },
      countryCode: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

export default mongoose.model("User", UserSchema);
