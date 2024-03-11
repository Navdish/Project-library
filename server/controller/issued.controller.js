const {IssuedService} = require('../service');

exports.getIssued = async (req, res)=>{
    try {
      const orders = await IssuedService.getIssues({userId : req?.user?.id, query : req?.query})
      res.status(200).json(orders)
    }
    catch (error) {
      res.status(error?.code).json({message : error?.message});
    }
}

exports.createIssued = async (req, res)=>{
    try {
      const order = await IssuedService.createIssues({userId : req?.user?.id, data : req?.body, files : req?.files});
      res.status(200).json({order});
    }
    catch(error) {
      res.status(error?.code).json({message : error?.message});
    }
}

exports.updateIssued = async (req, res)=>{
    try {
      const order = await IssuedService.updateIssues({data : req?.body});
      res.status(200).json({order});
    }
    catch(error) {
      res.status(error?.code).json({message : error?.message});
    }
}

exports.dropIssued = async (req, res)=>{
    try {
      const order = await IssuedService.dropIssues({userId : req?.user?.id,data : req?.body});
      res.status(200).json({order});
    }
    catch(error) {
      res.status(error?.code).json({message : error?.message});
    }
}