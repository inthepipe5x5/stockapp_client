/* Helper code to fetch data from backend Express.js service */
"use strict";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { supabase } from "./supabase";

export default class Backend {
  static baseURL = process.env.BACKEND_URL;
  static supabase = supabase;
  static refreshToken = null;
  static accessToken = null;

  static session = (async () => {
    await this.supabase.auth.getSession();
  })();

  constructor() {
    if (!this.session) throw new Error("No active session");
  }

  static async fetchData(endpoint, params = {}) {
    try {
      const session = await this.supabase.auth.getSession();
      if (!session || !session?.accessToken || !session?.access_token)
        throw new Error("No active session");

      const requestURL = new URL(endpoint, this.baseURL);
      const response = await fetch(requestURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            session?.access_token || session?.accessToken
          }`,
          "Content-Type": "application/json",
        },
        ...params,
      });

      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
      throw error;
    }
  }

  static useBackendQuery(endpoint, params = {}) {
    return useQuery([endpoint, params], () => this.fetchData(endpoint, params));
  }

  static useBackendMutation(endpoint, params = {}) {
    const queryClient = useQueryClient();
    return useMutation(
      (data) =>
        this.fetchData(endpoint, {
          ...params,
          method: "POST",
          body: JSON.stringify(data),
        }),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(endpoint);
        },
      }
    );
  }
}
