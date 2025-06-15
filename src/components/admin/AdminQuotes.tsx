
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

const renderServiceNames = (selected_services: any): React.ReactNode => {
  // If nullish or falsy
  if (!selected_services) return "-";

  // If it's an array of objects (with 'name' property)
  if (Array.isArray(selected_services) && selected_services.length > 0) {
    if (typeof selected_services[0] === "object" && selected_services[0] !== null) {
      return (
        <ul className="list-disc pl-4">
          {selected_services.map(
            (srv: any, i: number) => <li key={i}>{srv.name ? srv.name : JSON.stringify(srv)}</li>
          )}
        </ul>
      );
    } else {
      // Array of strings
      return (
        <ul className="list-disc pl-4">
          {selected_services.map((srv: string | number, i: number) => (
            <li key={i}>{String(srv)}</li>
          ))}
        </ul>
      );
    }
  }
  // If it's a single object (possibly a map)
  if (typeof selected_services === "object") {
    // Object values could be array of objects or strings
    const values = Object.values(selected_services);
    if (values.length > 0) {
      // If first value is object with 'name'
      if (typeof values[0] === "object" && values[0] !== null && "name" in (values[0] as any)) {
        return (
          <ul className="list-disc pl-4">
            {values.map((srv: any, i: number) => <li key={i}>{srv.name ? srv.name : JSON.stringify(srv)}</li>)}
          </ul>
        );
      } else {
        // Array of string/number
        return (
          <ul className="list-disc pl-4">
            {values.map((srv: any, i: number) => <li key={i}>{String(srv)}</li>)}
          </ul>
        );
      }
    }
  }
  return "-";
};

const AdminQuotes: React.FC = () => {
  const [page, setPage] = React.useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-quotes", page],
    queryFn: () => fetchQuotes(page)
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
                    {renderServiceNames(q.selected_services)}
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
