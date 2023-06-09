const Event = require('../Event/model');

module.exports = {
  topUsedSentences,
};

async function topUsedSentences(req, res) {
  try {
    const { userId, days, action } = req.query;

    console.log(userId, days, action);
    const fechaActual = new Date();
    const fechaInicio = new Date(
      fechaActual.getTime() - days * 24 * 60 * 60 * 1000
    );
    const topUsedSentences = await Event.aggregate([
      {
        $match: {
          userId: userId,
          time: {
            $gte: fechaInicio,
            $lte: fechaActual,
          },
          action: action,
        },
      },
      {
        $group: {
          _id: '$label',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          sentence: '$_id',
          count: 1,
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    return res.status(200).json({ topUsedSentences });
  } catch (err) {
    return res.status(409).json({
      message: 'Error getting analytics',
      error: err.message,
    });
  }
}
