module.exports.home_get = (req, res) => {
  res.send(
    'welcome to the smart power API. Available routes 1: /login_post 2: signup_post 3: addmeter_post '
  );
};

module.exports.addmeter_post(requireAuth, checkUser, async (req, res) => {
  const { meterName, meterNumber, meterLocation, meterUser } = req.body;

  try {
    const meter = await Meter.create({
      meterName,
      meterNumber,
      meterLocation,
      meterUser,
    });
    // const token = createToken(user._id);
    const confirmationMessage = 'Meter added successfully';
    res.status(201).json({ confirmationMessage, meterId: meter._id });
  } catch (err) {
    const error = err.message;
    const errorAction = 'Kindly check details and try again';
    res.status(400).json({ error, errorAction });
  }
});
