/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import supabase from "@/config/supabase-db-config";
import { success } from "zod";

export const saveConfiguration = async ({
  userId = "",
  payload = {},
}: {
  userId: string;
  payload: any;
}) => {
  try {
    const { data, error } = await supabase
      .from("configurations")
      .select("*")
      .eq("user_id", userId);
    if (error) throw new Error(error.message);

    let response = null;
    if (data.length > 0) {
      response = await supabase
        .from("configurations")
        .update(payload)
        .eq("user_id", userId);
    } else {
      response = await supabase.from("configurations").insert(payload);
    }

    if (response.error) throw new Error(response.error.message);

    return {
      success: true,
      message: "Configuration saved successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getConfiguration = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("configurations")
      .select("*")
      .eq("user_id", userId);
    if (error) throw new Error(error.message);

    if (data.length > 0) {
      return {
        success: true,
        data: data[0],
      };
    } else {
      return {
        success: false,
        message: "Configuration not found",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
