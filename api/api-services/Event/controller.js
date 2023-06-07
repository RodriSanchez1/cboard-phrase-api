const Event = require('../Event/model');

module.exports = {
  trackEvent,
};

async function trackEvent(req, res) {
  try {
    const userId = req.params.id;

    const newEvent = {
      ...req.body?.event,
      userId,
      time: new Date(),
    };

    const event = new Event(newEvent);
    await event.save();
    console.log(req.body);
    return res.status(200).json(event);
  } catch (err) {
    return res.status(409).json({
      message: 'Error saving event',
      error: err.message,
    });
  }
}
