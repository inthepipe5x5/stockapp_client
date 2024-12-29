//helper function that queries supabase DB with react query
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { supabase } from "../services/supabase";

/**
 * Custom hook to query data from a Supabase table with optional filters, limit, sorting, and grouping.
 *
 * @param {string} table - The name of the table to query.
 * @param {object} schema - The schema to validate the data against.
 * @param {object} [filters={}] - Optional filters to apply to the query.
 * @param {number|null} [limit=null] - Optional limit on the number of records to fetch.
 * @param {string} [sort] - Optional column name to sort the results by.
 * @param {string} [groupBy] - Optional column name to group the results by.
 * @returns {object} - The result of the query wrapped in a react-query object.
 *
 * @example
 * const { data, error, isLoading } = useSupabaseQuery(
 *   'users',
 *   userSchema,
 *   { isActive: true },
 *   10,
 *   'createdAt',
 *   'role'
 * );
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <ul>
 *     {data.map(user => (
 *       <li key={user.id}>{user.name}</li>
 *     ))}
 *   </ul>
 * );
 */
const useSupabaseQuery = (
  table,
  schema,
  filters = {},
  limit = null,
  sort,
  groupBy
) => {
  const fetchData = useCallback(async () => {
    let query = supabase.from(table).select();

    if (Object.keys(filters).length > 0) {
      query = query.match(filters);
    }

    if (limit !== null && limit > 0) {
      query = query.limit(limit);
    }
    if (sort && typeof sort === "string") {
      query = query.order(sort);
    }
    if (groupBy && typeof sort === "string") {
      query = query.group(groupBy);
    }

    const { data, error } = await query;

    if (error) throw error;

    return schema ? schema.parse(data) : data;
  }, [table, schema, filters, limit]);

  return useQuery([table, filters, limit], fetchData);
};

export default useSupabaseQuery;
