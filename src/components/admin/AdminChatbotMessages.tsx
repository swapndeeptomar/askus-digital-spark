
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

const fetchChatbotMessages = async () => {
  const { data, error } = await supabase
    .from("chatbot")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

const AdminChatbotMessages: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-chatbot-messages"],
    queryFn: fetchChatbotMessages,
  });

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-askus-dark">Chatbot Messages</h3>
      {isLoading ? (
        <div className="flex justify-center items-center py-8 text-askus-purple">
          <Loader2 className="animate-spin mr-2" /> Loading...
        </div>
      ) : error ? (
        <div className="text-red-500">Failed to load messages.</div>
      ) : !data || data.length === 0 ? (
        <div className="text-gray-500">No chatbot messages found.</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Page</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell className="whitespace-nowrap text-xs">
                  {new Date(row.created_at).toLocaleString()}
                </TableCell>
                <TableCell className="max-w-[300px] whitespace-pre-wrap">
                  {row.user_input}
                </TableCell>
                <TableCell>{row.user_email ?? "-"}</TableCell>
                <TableCell>{row.source ?? "-"}</TableCell>
                <TableCell className="max-w-[150px]">
                  {row.page_path ?? "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminChatbotMessages;
