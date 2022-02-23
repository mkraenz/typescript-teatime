import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Cursor for paging through collections */
  ConnectionCursor: any;
};

export type CreateManyTeasInput = {
  /** Array of records to create */
  teas: Array<CreateTea>;
};

export type CreateOneTeaInput = {
  /** The record to create */
  tea: CreateTea;
};

export type CreateOrderInput = {
  items: Array<CreateOrderItemInput>;
};

export type CreateOrderItemInput = {
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type CreateTea = {
  /** Ideal brewing temperature */
  bestAtTemperature?: InputMaybe<Scalars['Int']>;
  currency?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  /** English name of the tea */
  name?: InputMaybe<Scalars['String']>;
  /** Price in USD */
  price?: InputMaybe<Scalars['Float']>;
  rating?: InputMaybe<Scalars['Int']>;
  ratingCount?: InputMaybe<Scalars['Int']>;
  /** freetext tags for searchability */
  tags?: InputMaybe<Scalars['String']>;
};

export type CursorPaging = {
  /** Paginate after opaque cursor */
  after?: InputMaybe<Scalars['ConnectionCursor']>;
  /** Paginate before opaque cursor */
  before?: InputMaybe<Scalars['ConnectionCursor']>;
  /** Paginate first */
  first?: InputMaybe<Scalars['Int']>;
  /** Paginate last */
  last?: InputMaybe<Scalars['Int']>;
};

export type DeleteManyOrdersInput = {
  /** Filter to find records to delete */
  filter: OrderDeleteFilter;
};

export type DeleteManyTeasInput = {
  /** Filter to find records to delete */
  filter: TeaDeleteFilter;
};

export type DeleteOneOrderInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type DeleteOneTeaInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type IdFilterComparison = {
  eq?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  iLike?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<Scalars['ID']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<Scalars['ID']>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  neq?: InputMaybe<Scalars['ID']>;
  notILike?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<Scalars['ID']>>;
  notLike?: InputMaybe<Scalars['ID']>;
};

export type NumberFieldComparison = {
  between?: InputMaybe<NumberFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
  notBetween?: InputMaybe<NumberFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NumberFieldComparisonBetween = {
  lower: Scalars['Float'];
  upper: Scalars['Float'];
};

export type OrderDeleteFilter = {
  and?: InputMaybe<Array<OrderDeleteFilter>>;
  or?: InputMaybe<Array<OrderDeleteFilter>>;
  status?: InputMaybe<OrderStatusFilterComparison>;
  userId?: InputMaybe<IdFilterComparison>;
};

export type OrderFilter = {
  and?: InputMaybe<Array<OrderFilter>>;
  or?: InputMaybe<Array<OrderFilter>>;
  status?: InputMaybe<OrderStatusFilterComparison>;
  userId?: InputMaybe<IdFilterComparison>;
};

export type OrderItemFilter = {
  and?: InputMaybe<Array<OrderItemFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<OrderItemFilter>>;
};

export type OrderItemSort = {
  direction: SortDirection;
  field: OrderItemSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum OrderItemSortFields {
  Id = 'id'
}

export type OrderSort = {
  direction: SortDirection;
  field: OrderSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum OrderSortFields {
  Status = 'status',
  UserId = 'userId'
}

export enum OrderStatus {
  Cancelled = 'Cancelled',
  Created = 'Created',
  Filled = 'Filled',
  Paid = 'Paid',
  Shipped = 'Shipped'
}

export type OrderStatusFilterComparison = {
  eq?: InputMaybe<OrderStatus>;
  gt?: InputMaybe<OrderStatus>;
  gte?: InputMaybe<OrderStatus>;
  iLike?: InputMaybe<OrderStatus>;
  in?: InputMaybe<Array<OrderStatus>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<OrderStatus>;
  lt?: InputMaybe<OrderStatus>;
  lte?: InputMaybe<OrderStatus>;
  neq?: InputMaybe<OrderStatus>;
  notILike?: InputMaybe<OrderStatus>;
  notIn?: InputMaybe<Array<OrderStatus>>;
  notLike?: InputMaybe<OrderStatus>;
};

export type OrderUpdateFilter = {
  and?: InputMaybe<Array<OrderUpdateFilter>>;
  or?: InputMaybe<Array<OrderUpdateFilter>>;
  status?: InputMaybe<OrderStatusFilterComparison>;
  userId?: InputMaybe<IdFilterComparison>;
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type StringFieldComparison = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  iLike?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  notILike?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  notLike?: InputMaybe<Scalars['String']>;
};

export type TeaDeleteFilter = {
  and?: InputMaybe<Array<TeaDeleteFilter>>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TeaDeleteFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  tags?: InputMaybe<StringFieldComparison>;
};

export type TeaFilter = {
  and?: InputMaybe<Array<TeaFilter>>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TeaFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  tags?: InputMaybe<StringFieldComparison>;
};

export type TeaSort = {
  direction: SortDirection;
  field: TeaSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum TeaSortFields {
  Name = 'name',
  Price = 'price',
  Tags = 'tags'
}

export type TeaUpdateFilter = {
  and?: InputMaybe<Array<TeaUpdateFilter>>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TeaUpdateFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  tags?: InputMaybe<StringFieldComparison>;
};

export type UpdateManyOrdersInput = {
  /** Filter used to find fields to update */
  filter: OrderUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateOrder;
};

export type UpdateManyTeasInput = {
  /** Filter used to find fields to update */
  filter: TeaUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateTea;
};

export type UpdateOneOrderInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateOrder;
};

export type UpdateOneTeaInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateTea;
};

export type UpdateOrder = {
  id?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<OrderStatus>;
  userId?: InputMaybe<Scalars['ID']>;
};

export type UpdateTea = {
  /** Ideal brewing temperature */
  bestAtTemperature?: InputMaybe<Scalars['Int']>;
  currency?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  /** English name of the tea */
  name?: InputMaybe<Scalars['String']>;
  /** Price in USD */
  price?: InputMaybe<Scalars['Float']>;
  rating?: InputMaybe<Scalars['Int']>;
  ratingCount?: InputMaybe<Scalars['Int']>;
  /** freetext tags for searchability */
  tags?: InputMaybe<Scalars['String']>;
};

export type GetTeasQueryVariables = Exact<{
  filter?: InputMaybe<TeaFilter>;
}>;


export type GetTeasQuery = { __typename?: 'Query', teas: { __typename?: 'TeaConnection', totalCount: number, edges: Array<{ __typename?: 'TeaEdge', node: { __typename?: 'Tea', id: string, name: string, bestAtTemperature: number, tags: string, price: number, currency: string, imageUrl: string, rating: number, ratingCount: number, description: string } }> } };


export const GetTeasDocument = gql`
    query GetTeas($filter: TeaFilter) {
  teas(filter: $filter) {
    totalCount
    edges {
      node {
        id
        name
        bestAtTemperature
        tags
        price
        currency
        imageUrl
        rating
        ratingCount
        description
      }
    }
  }
}
    `;

/**
 * __useGetTeasQuery__
 *
 * To run a query within a React component, call `useGetTeasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeasQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetTeasQuery(baseOptions?: Apollo.QueryHookOptions<GetTeasQuery, GetTeasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeasQuery, GetTeasQueryVariables>(GetTeasDocument, options);
      }
export function useGetTeasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeasQuery, GetTeasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeasQuery, GetTeasQueryVariables>(GetTeasDocument, options);
        }
export type GetTeasQueryHookResult = ReturnType<typeof useGetTeasQuery>;
export type GetTeasLazyQueryHookResult = ReturnType<typeof useGetTeasLazyQuery>;
export type GetTeasQueryResult = Apollo.QueryResult<GetTeasQuery, GetTeasQueryVariables>;