const Event = require('../Event/model');

module.exports = {
  topUsedSentences,
};

async function topUsedSentences(req, res) {
  try {
    const { userId, days, action } = req.query;

    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getTime() - days * 24 * 60 * 60 * 1000
    );
    const topUsedSentences = await Event.aggregate([
      {
        $match: {
          userId: userId,
          time: {
            $gte: startDate,
            $lte: currentDate,
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

    const timesSpeaked = await Event.aggregate([
      {
        $match: {
          userId: userId,
          time: {
            $gte: startDate,
            $lte: currentDate,
          },
          action: action,
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d/%m', date: '$time' } },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          count: 1,
        },
      },
    ]);

    return res.status(200).json({ topUsedSentences, timesSpeaked });
  } catch (err) {
    return res.status(409).json({
      message: 'Error getting the report',
      error: err.message,
    });
  }
}
