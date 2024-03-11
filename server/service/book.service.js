const CustomError = require("../lib/error");
const { Book, User, Issued } = require("../model");

exports.getBooks = async ({ userId, query }) => {
  const user = User.findById(userId);
  if (!user) throw new CustomError("Bad request", 400);
  const { search } = query;
  console.log("search", search);
  if (search === "") {
    const response = await Book.find();
    if (!response) throw new CustomError("Internal server error", 500);
    return response;
  } else {
    const response = await Book.find({
      $or: [{ title: { $regex: search, $options: "i" } }],
    });
    if (!response) throw new CustomError("Internal server error", 500);
    return response;
  }
};

exports.createBooks = async ({ userId, data, files }) => {
  const user = User.findById(userId);
  if (!user) throw new CustomError("Bad request", 400);
  if (user.role === "STUDENT") throw new CustomError("Not Authorised", 401);
  const { title, amount, description } = data;
  if (!(title && amount && description)) throw new CustomError("Details not provided", 422);
  const duplicate = await Book.findOne({ title });
  if(duplicate) throw new CustomError("Conflict", 409)
//   if (duplicate) {
//     const newAmount = amount + duplicate.amount;
//     const response = await Book.findByIdAndUpdate(duplicate._id, {
//       amount: newAmount,
//     });
//     if (!response) throw new CustomError("Internal server error", 500);
//     return response;
//   }
  
    const entries = files.map( f=> f.path);
  const response = await Book.create({ title, amount, description, photos:entries});
  if (!response) throw new CustomError("Internal server error", 500);
  return response;
};



exports.updateBooks = async ({userId, data , files}) => {
    const user = User.findById(userId);
    if (!user) throw new CustomError("Bad request", 400);
    if (user.role === "STUDENT") {
        const {amount, bookId} = data;
        const response = await Book.findByIdAndUpdate(bookId, {amount});
        if (!response) throw new CustomError("Internal server error", 500);
        return response;
    }
    const {_id, title, amount, description } = data;
    if (!(title && amount && description)) throw new CustomError("Details not provided", 422);
    const entries = files.map( f => f.path);
    const book = await Book.findById(_id, { title, amount, description, photos:entries});
    if(!book) throw new CustomError("Book doesn't exist", 404);
    const response = await Book.findByIdAndUpdate(book._id, data);
    if (!response) throw new CustomError("Internal server error", 500);
  return response;
};

exports.dropBooks = async ({userId,  query }) => {
    const user = User.findById(userId);
    if (!user) throw new CustomError("Bad request", 400);
    if (user.role === "STUDENT") throw new CustomError("Not Authorised", 401);
    const {book} = query;
    const response = await Book.findByIdAndDelete(book._id);
    const response2 = await Issued.deleteMany({bookId : book._id});
    if (!response || !response2) throw new CustomError("Internal server error", 500);
    return response;
};
