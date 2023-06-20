const appDataSource = require("./dataSource")

const getBidEventsToken = async (eventId) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  try {
    const graph = await appDataSource.query(
      `
      SELECT
        event_id,
        bidding_events_token,
        created_at
      FROM bid
      where event_id = ?
      AND created_at >= ?
      `, [eventId, oneWeekAgo]
    );
    const id = graph[0].event_id;
    const eventList = [];
    for (const data of graph) {
      eventList.push({
        x: data.created_at,
        y: data.bidding_events_token
      });
    }

    return {
      id: id,
      data: eventList
    };

  } catch (err) {
    console.log(err);
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error
  }
}

module.exports = { 
  getBidEventsToken,
}