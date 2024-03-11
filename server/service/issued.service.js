const CustomError = require("../lib/error");
const { Book, User, Issued } = require("../model");

exports.getIssues = async ({ userId, query }) => {
    const {status} = query;
  const user = User.findById(userId);
  if (!user) throw new CustomError("Bad request", 400);
  if(user.role === 'STUDENT'){
    const response = await Issued.find({status, userId});
    return response;
  }
  const response = await Issued.find({status: 'ISSUED'}).populate("bookId");
  if (!response) throw new CustomError("Internal server error", 500);
  return response;
};



exports.createIssues = async ({ userId, data}) => {
  const user = User.findById(userId);
  if (!user) throw new CustomError("Bad request", 400);
  const { bookId, status} = data;
  if(status === 'ACCEPTED') throw new CustomError("Not authorized", 401);
  const response = await Issued.create({ bookId, userId, status});
  const res = await Book.findById(bookId);
  res.amount = res.amount -1;
  res.save();
  if (!response) throw new CustomError("Internal server error", 500);
  return response;
};



exports.updateIssues = async ({userId, data}) => {
    const user = User.findById(userId);
    if (!user) throw new CustomError("Bad request", 400);
    const { _id, status} = data;
    const issue = await Issued.findById(_id);
    if(issue.userId !== userId && user.role !== 'LIBRANIAN') throw new CustomError("Not authorised", 401);
    const response = await Issued.findByIdAndUpdate(_id, {status});
    if (!response) throw new CustomError("Internal server error", 500);
    if(status === 'RETURNED') {
        const book = await Book.findById(response.bookId);
        book.amount = book.amount + 1;
        book.save();
    }
    return response;
};

exports.dropIssues = async ({userId,  query }) => {
    const user = User.findById(userId);
    if (!user) throw new CustomError("Bad request", 400);
    if (user.role === "STUDENT" ) throw new CustomError("Not Authorised", 401);
    const {issueId} = query;
    const response = await Issued.findByIdAndDelete(issueId);
    return response;
};
