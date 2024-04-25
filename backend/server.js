import app from "./app.js";
import { v2 as cloudinary } from "cloudinary";

const port = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
