const constants = require('../../constants');
const Report = require('./model');

module.exports = {
  batchGet,
};

async function batchGet(req, res) {
  try {
    const reportRequests = req.body.map((requestReport) => {
      const report = {
        viewId: requestReport.mobileView
          ? constants.MOBILE_GA_VIEW
          : constants.DEFAULT_GA_VIEW,
        dateRanges: [
          {
            startDate: requestReport.startDate,
            endDate: requestReport.endDate,
          },
        ],
        metrics: [
          {
            expression: `ga:${requestReport.metric}`,
          },
        ],
        orderBys: [
          { fieldName: `ga:${requestReport.metric}`, sortOrder: 'DESCENDING' },
        ],
        dimensions: [
          {
            name: 'ga:clientId',
          },
          {
            name: `ga:${requestReport.dimension}`,
          },
        ],
        dimensionFilterClauses: [
          {
            filters: [
              {
                dimensionName: 'ga:clientId',
                operator: 'EXACT',
                expressions: [requestReport.clientId],
              },
            ],
          },
        ],
      };
      if (requestReport.filter) {
        const newFilter = {
          filters: [
            {
              dimensionName: `ga:${requestReport.filter.name}`,
              operator: 'EXACT',
              expressions: [requestReport.filter.value],
            },
          ],
        };
        report.dimensionFilterClauses.push(newFilter);
      }
      if (requestReport.pageSize) {
        report['pageSize'] = requestReport.pageSize;
      }
      return report;
    });
    const fullRequest = {
      requestBody: {
        reportRequests: reportRequests,
      },
    };
    const report = {};
    return res.status(200).json(report.data);
  } catch (err) {
    return res.status(409).json({
      message: 'Error getting analytics',
      error: err.message,
    });
  }
}
