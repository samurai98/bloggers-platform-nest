import { FilterQuery, Model } from 'mongoose';

import { ViewPagination, PaginationQueryDTO } from '.';

const getPagesCount = (totalCount: number, pageSize: number) => Math.ceil(totalCount / pageSize);

const getSkipCount = (pageNumber: number, pageSize: number) => (pageNumber - 1) * pageSize;

const getSortDirectionNumber = (sortDirection: string) => (sortDirection === 'asc' ? 1 : -1);

interface DocumentModel<T> extends Model<T> {
  getFilter(search: Record<string, string>): FilterQuery<T>;
}

export const findPaginationEntities = async <T>(
  model: DocumentModel<T> | Model<T>,
  queryFilter: PaginationQueryDTO,
): Promise<ViewPagination<T>> => {
  const { pageNumber, pageSize, sortBy, sortDirection, ...searchFilter } = queryFilter;

  const filter = 'getFilter' in model ? model.getFilter(searchFilter) : {};
  const totalCount = await model.countDocuments(filter);
  const skipCount = getSkipCount(pageNumber, pageSize);
  const pagesCount = getPagesCount(totalCount, pageSize);
  const entities = await model
    .find(filter, { _id: false, __v: false })
    .sort({ [sortBy]: getSortDirectionNumber(sortDirection) })
    .skip(skipCount)
    .limit(pageSize)
    .lean();

  return {
    items: entities as T[],
    page: pageNumber,
    pageSize: pageSize,
    pagesCount,
    totalCount,
  };
};
