const schedule = require('node-schedule');
const appDataSource = require("../models/dataSource");

const scheduleJob = () => {
  const job = schedule.scheduleJob('0 6 * * *', async () => {
    try {
      const currentDateTime = new Date();

      console.log('Scheduled job is running at:', currentDateTime);

      let expiredBids = [];

      expiredBids = await appDataSource.query(`
        SELECT
          bid.id,
          bid.bidding_events_token,
          bid.event_id,
          bid.bid_status_code,
          events.remaining_quantity,
          events.auction_end_date
        FROM bid
        INNER JOIN events ON bid.event_id = events.id
        WHERE events.auction_end_date < ? AND bid.bid_status_code = 'BID_PENDING'
      `, [currentDateTime]);

      if (expiredBids.length > 0) {
        
        expiredBids.sort((a, b) => b.bidding_events_token - a.bidding_events_token);

        let remainingQuantityResult = await appDataSource.query(`
          SELECT
            remaining_quantity
          FROM events
          WHERE id = ?
        `, [expiredBids[0].event_id]);

        let remainingQuantity = remainingQuantityResult[0].remaining_quantity;

        for (let i = 0; i < expiredBids.length; i++) {
          const bid = expiredBids[i];

          if (i < remainingQuantity) {
            await appDataSource.query(`
              UPDATE
                Bid
              SET
                bid_status_code = 'BID_WINNING'
              WHERE
                id = ?
            `, [bid.id]);
          } else {
            await appDataSource.query(`
              UPDATE
                Bid
              SET
                bid_status_code = 'BID_LOSING'
              WHERE
                id = ?
            `, [bid.id]);
          }
        }

        for (const bid of expiredBids) {
          await appDataSource.query(`
            UPDATE
              events
            SET
              remaining_quantity = NULL
            WHERE
              id = ?
          `, [bid.event_id]);
        }

      } else {
        throw new Error('Invalid data: Expired bids do not exist');
      }

    } catch(err) {
      console.log(err);
      throw new Error('Schedule Error');
    }
  });

  return job;
}

module.exports = {
  scheduleJob,
};

