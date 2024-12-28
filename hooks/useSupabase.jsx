//helper function that queries supabase DB with react query
import { useQuery } from "react-query";
import { useCallback } from "react";
import { supabase } from "../services/supabase";

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

    return schema.parse(data);
  }, [table, schema, filters, limit]);

  return useQuery([table, filters, limit], fetchData);
};

export default useSupabaseQuery