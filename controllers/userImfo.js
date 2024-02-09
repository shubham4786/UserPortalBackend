const Details = require("../models/userImfo.js");

const updateImfo = async (req, res) => {
  const updateData = req.body;

  let imfo = await Details.findOne({
    userId: req.body.userId,
  });
  if (imfo) {
    return res.status(409).json({
      success: false,
      message: "User Details already Updated.",
    });
  }

  const details = new Details(updateData);
  await details.save();
  res.json({
    success: true,
    message: "User Details Updated Successfully",
  });
};

const getDetails = async (req, res) => {
  const params = req.query;
  //   console.log(params.searchKey);

  const event = await Details.findOne({ userId: params.searchKey });
  res.json({
    success: true,
    results: event,
  });
};

module.exports = {
  updateImfo,
  getDetails,
};
