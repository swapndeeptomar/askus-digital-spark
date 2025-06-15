
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type AboutStats = {
  projects_completed: number;
  happy_clients: number;
  team_members: number;
  years_experience: number;
};

const keys = [
  "projects_completed",
  "happy_clients",
  "team_members",
  "years_experience",
];

export function useAboutStats() {
  return useQuery({
    queryKey: ["about-stats"],
    queryFn: async (): Promise<AboutStats> => {
      const { data, error } = await supabase
        .from("about_stats")
        .select("key, value");
      if (error) throw error;
      // Turn array into object with correct keys
      const initialValue: Partial<AboutStats> = {};
      for (const key of keys) initialValue[key as keyof AboutStats] = 0;
      data?.forEach((row: { key: string; value: number }) => {
        if (keys.includes(row.key)) {
          initialValue[row.key as keyof AboutStats] = row.value;
        }
      });
      return initialValue as AboutStats;
    },
  });
}
