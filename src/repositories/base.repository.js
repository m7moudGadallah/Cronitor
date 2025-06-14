module.exports = class BaseRepository {
  /**
   * Converts sort string like "createdAt_desc,name_asc" into Prisma-compatible orderBy object
   * @param {string} sort
   * @returns {Record<string, 'asc' | 'desc'>[]}
   */
  _buildOrderByObj(sort) {
    if (!sort) return [];

    return sort.split(',').map(part => {
      const [field, direction] = part.split('_');
      if (!field || !['asc', 'desc'].includes(direction)) {
        throw new Error(
          `Invalid sort format: "${part}". Expected "field_asc" or "field_desc".`
        );
      }
      return { [field]: direction };
    });
  }

  /**
   * @param {number} page
   * @param {number} limit
   * @returns {{take: number, skip: number}}
   */
  _buildPaginationObj(page, limit) {
    if (!page || !limit) return {};
    const take = Number(limit);
    const skip = (Number(page) - 1) * take;
    return { take, skip };
  }

  /**
   * Combines filters, sorting, and pagination into Prisma query options
   * @param {{ page?: number, limit?: number, sort?: string, filters?: Record<string, any> }}
   * @returns {object} Prisma query options
   */
  _buildQueryOptions({ page, limit, sort, filters = {} }) {
    const pagination = this._buildPaginationObj(page, limit);
    const orderBy = this._buildOrderByObj(sort);

    return {
      where: filters,
      orderBy: orderBy.length > 0 ? orderBy : undefined,
      ...pagination,
    };
  }
};
