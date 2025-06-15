
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const PAGE_SIZE = 12;

const fetchTestimonials = async (page: number) => {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })
    .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);
  if (error) throw error;
  return data;
};

const AdminTestimonials: React.FC = () => {
  const [page, setPage] = React.useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-testimonials", page],
    queryFn: () => fetchTestimonials(page),
    keepPreviousData: true,
  });

  return (
    <div>
      <h3 className="font-bold text-xl mb-2">Testimonials</h3>
      {isLoading ? (
        <div className="py-10 text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{String(error)}</div>
      ) : !data || data.length === 0 ? (
        <div className="py-10 text-gray-500 text-center">No testimonials found.</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((t:any) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <div className="w-8 h-8 rounded-full bg-askus-purple text-white flex items-center justify-center font-bold">
                      {t.avatar_initial || (t.name && t.name[0]) || "?"}
                    </div>
                  </TableCell>
                  <TableCell>{t.name}</TableCell>
                  <TableCell>{t.role || "-"}</TableCell>
                  <TableCell>{t.company || "-"}</TableCell>
                  <TableCell className="max-w-xs break-all text-xs">{t.message}</TableCell>
                  <TableCell>{t.created_at ? new Date(t.created_at).toLocaleString() : "-"}</TableCell>
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

export default AdminTestimonials;
