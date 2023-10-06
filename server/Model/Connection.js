import mongoose from "mongoose";
const connection = async () => {
  await mongoose
    .connect(
      "mongodb+srv://aloshkm:aloshy@cluster0.6cpwhx1.mongodb.net/Chat"
    )

    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));
};
export default connection;