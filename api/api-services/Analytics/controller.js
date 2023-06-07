const { google } = require('googleapis');
//const analyticsreporting = google.analyticsreporting('v4');
const constants = require('../../constants');
const config = require('../../../config/env');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const GA_PRIVATE_KEY_UPDATED = process.env.GA_PRIVATE_KEY.replace(
  /\\n/gm,
  '\n'
);

module.exports = {
  batchGet: batchGet,
};

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: config.GA_CLIENT_EMAIL,
    private_key: GA_PRIVATE_KEY_UPDATED,
  },
});

// Runs a simple report.
async function runReport() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${constants.DEFAULT_GA_VIEW}`,
    dateRanges: [
      {
        startDate: '2020-03-31',
        endDate: 'today',
      },
    ],
    dimensions: [
      {
        name: 'year',
      },
    ],
    metrics: [
      {
        name: 'activeUsers',
      },
    ],
  });

  console.log('Report result:');
  response.rows.forEach((row) => {
    console.log(row.dimensionValues[0], row.metricValues[0]);
  });
  return response;
}

async function makeReport(req) {
  const reportRequests = req.body.map((requestReport) => {
    const report = {
      property: `properties/${constants.DEFAULT_GA_VIEW}`,
      dateRanges: [
        {
          startDate: requestReport.startDate,
          endDate: requestReport.endDate,
        },
      ],
      metrics: [
        {
          name: `${requestReport.metric}`,
        },
      ],
      orderBys: [
        {
          metric: {
            metricName: `${requestReport.metric}`,
          },
          desc: true,
        },
      ],
      dimensions: [
        {
          name: 'userId',
        },
        {
          name: `${requestReport.dimension}`,
        },
      ],
      // dimensionFilter: {
      //   filter: {
      //     fieldName: 'clientId',
      //     stringFilter: {
      //       matchType: 'EXACT',
      //       value: [requestReport.clientId],
      //     },
      //   },
      // },
      // dimensionFilterClauses: [
      //   {
      //     filters: [
      //       {
      //         dimensionName: 'ga:clientId',
      //         operator: 'EXACT',
      //         expressions: [requestReport.clientId],
      //       },
      //     ],
      //   },
      // ],
    };
    // if (requestReport.filter) {
    //   const newFilter = {
    //     filters: [
    //       {
    //         dimensionName: `ga:${requestReport.filter.name}`,
    //         operator: 'EXACT',
    //         expressions: [requestReport.filter.value],
    //       },
    //     ],
    //   };
    //   report.dimensionFilterClauses.push(newFilter);
    // }
    if (requestReport.pageSize) {
      report['pageSize'] = requestReport.pageSize;
    }
    return report;
  });
  // const fullRequest = {
  //   requestBody: {
  //     reportRequests: reportRequests,
  //   },};
  return await analyticsDataClient.runReport(reportRequests[0]);
}

async function batchGet(req, res) {
  try {
    //const report = await runReport();
    const report = await makeReport(req);
    return res.status(200).json(report);
  } catch (err) {
    return res.status(409).json({
      message: 'Error getting analytics',
      error: err.message,
    });
  }
}
