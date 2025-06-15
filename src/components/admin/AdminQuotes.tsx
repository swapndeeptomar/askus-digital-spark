
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const PAGE_SIZE = 10;

const fetchQuotes = async (page: number) => {
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false })
    .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);
  if (error) throw error;
  return data;
};

const AdminQuotes: React.FC = () => {
  const [page, setPage] = React.useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-quotes", page],
    queryFn: () => fetchQuotes(page),
    keepPreviousData: true,
  });

  return (
    <div>
      <h3 className="font-bold text-xl mb-2">Quotes</h3>
      {isLoading ? (
        <div className="py-10 text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{String(error)}</div>
      ) : !data || data.length === 0 ? (
        <div className="py-10 text-gray-500 text-center">No quotes found.</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Estimate</TableHead>
                <TableHead>PDF</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((q:any) => (
                <TableRow key={q.id}>
                  <TableCell>{q.name}</TableCell>
                  <TableCell>{q.email}</TableCell>
                  <TableCell>{q.phone || "-"}</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-4">
                      {Array.isArray(q.selected_services)
                        ? q.selected_services.map((srv:string, i:number) => (
                            <li key={i}>{srv}</li>
                          ))
                        : q.selected_services && typeof q.selected_services === "object"
                        ? Object.values(q.selected_services).map((srv: any, i:number) => (
                            <li key={i}>{srv}</li>
                          ))
                        : "-"}
                    </ul>
                  </TableCell>
                  <TableCell>₹{q.total_estimate}</TableCell>
                  <TableCell>
                    {q.pdf_url ? (
                      <a
                        href={q.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-askus-purple underline"
                      >
                        {q.pdf_filename}
                      </a>
                    ) : (
                      q.pdf_filename
                    )}
                  </TableCell>
                  <TableCell>{q.created_at ? new Date(q.created_at).toLocaleString() : "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="text-askus-purple font-bold disabled:opacity-40">Prev</button>
        <span className="text-gray-700">Page {page + 1}</span>
        <button disabled={!data || data.length < PAGE_SIZE} onClick={() => setPage(p => p + 1)} className="text-askus-purple font-bold disabled:opacity-40">Next</button>
      </div>
    </div>
  );
};

export default AdminQuotes;
