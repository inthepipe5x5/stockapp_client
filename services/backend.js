/* Helper service class provides helper methods for fetching data from a backend Express.js service using
React Query and Supabase authentication. */
"use strict";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { supabase } from "./supabase";

export default class Backend {
  static baseURL = process.env.BACKEND_URL;

  static async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data?.session) {
      throw new Error("No active session");
    }
    return data.session;
  }
/**
 * The function `fetchData` is an asynchronous method in JavaScript that handles fetching data from an
 * API, including token refresh logic if the access token is expired.
 * @param endpoint - The `endpoint` parameter in the `fetchData` method is the URL endpoint or path
 * that you want to make a request to. It specifies the specific resource or action you are targeting
 * on the server. For example, if you are fetching user data, the endpoint could be something like
 * `/users`
 * @param [params] - The `params` object in the `fetchData` method is used to pass additional options
 * for the API request. It has the following properties:
 * @returns The `fetchData` method is returning the JSON response from the API call if the response is
 * successful. If there is an error during the process, it will log the error message and rethrow the
 * error.
 */

  static async fetchData(endpoint, params = {}) {
    try {
      const session = await this.getSession();

      // Refresh token logic if access token is expired
      const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
      if (session.expires_at && session.expires_at <= now) {
        console.log("Access token expired. Refreshing...");
        const { data, error } = await supabase.auth.refreshSession();
        if (error) throw new Error("Failed to refresh session");
      }

      // Make the API call
      const requestURL = new URL(endpoint, this.baseURL);
      const response = await fetch(requestURL, {
        method: params.method || "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
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
