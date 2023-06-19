class CustomQueryBuilder {
  constructor() {
    this.query = "";
    this.query_postfix = "";
    this.whereConditions = [];
    this.orderByConditions = [];
    this.parameters = [];
  }

  select(columns) {
    this.query += `SELECT ${columns} `;
    return this;
  }

  from(table) {
    this.query += `FROM ${table} `;
    return this;
  }

  join(joinExpression, parameters = []) {
    this.query += ` ${joinExpression} `;
    this.parameters.push(...parameters);
    return this;
  }

  where(condition) {
    this.whereConditions.push(condition);
    return this;
  }

  orderBy(condition) {
    this.orderByConditions.push(this.orderByBuilder(condition));
    return this;
  }

  orderByBuilder(orderBy) {
    switch (orderBy) {
      case "priceAsc":
        return "start_events_token ASC";
      case "priceDesc":
        return "highest_events_token DESC";
      case "dateAsc":
        return "event_start_date ASC";
      default:
        return "id ASC";
    }
  }

  limit(limit = 6, offset = 0) {
    this.query_postfix += `LIMIT ${limit} OFFSET ${offset} `;
    return this;
  }

  whereDate(column, date) {
    if (date) {
      this.whereConditions.push(`DATE(${column}) = '${date}'`);
    }
    return this;
  }
  whereLike(column, value) {
    this.whereConditions.push(`${column} LIKE '%${value}%'`);
    return this;
  }

  build() {
    if (this.whereConditions.length > 0) {
      this.query += `WHERE ${this.whereConditions.join(" AND ")} `;
    }
    if (this.orderByConditions.length > 0) {
      this.query += `ORDER BY ${this.orderByConditions.join(", ")} `;
    }
    this.query += this.query_postfix;
    return { query: this.query, parameters: this.parameters };
  }
}

module.exports = CustomQueryBuilder;
