module.exports = (error, req, res, next) => {
  console.log("Path: ", req.path);
  console.error("Error: ", error);

  // if we want to redirect an error to another path
  if (error.type == "redirect") res.redirect("/error");
  else if (error.type == "time-out")
    // arbitrary condition check
    res.status(408).send(error);
  else if (error?.errno === 1062)// for duplicate errors (mysql code)
    res
      .status(409)
      .send({ success: false, message: error.message });
  else res.status(500).send(error);// all other errors
};
