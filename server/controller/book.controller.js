const {bookService} = require('../service');

exports.getBook = async (req, res)=>{
    try {
      const books = await bookService.getBooks({userId : req?.user?.id, query : req?.query})
      res.status(200).json(books)
    }
    catch (error) {
      res.status(error?.code).json({message : error?.message});
    }
}

exports.createBook = async (req, res)=>{
    try {
      console.log("create book controller")
      const user = await bookService.createBooks({userId : req?.user?.id, data : req?.body, files : req?.files});
      res.status(200).json({user, message: "Book added successfully"});
    }
    catch(error) {
      res.status(error?.code).json({message : error?.message});
    }
}

exports.updateBook = async (req, res)=>{
    try {
      const user = await bookService.updateBooks({data : req?.body});
      res.status(200).json({user, message: "Book updated successfully"});
    }
    catch(error) {
      res.status(error?.code).json({message : error?.message});
    }
}

exports.dropBook = async (req, res)=>{
    try {
      const user = await bookService.dropBooks({userId : req?.user?.id,data : req?.body});
      res.status(200).json({user, message: "Book deleted successfully"});
    }
    catch(error) {
      res.status(error?.code).json({message : error?.message});
    }
}