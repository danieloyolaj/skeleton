const adminValidate = (req, res, next) =>{
  const role = req.user.role

  if(role === 'admin'){
    return next()
  }else{
    res.status(401).json({message: 'Access denied!'})
  }
}

module.exports = adminValidate