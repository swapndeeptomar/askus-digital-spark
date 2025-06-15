
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const PAGE_SIZE = 10;

const fetchPDFs = async (page: number) => {
  // List files in "quotes-pdfs" storage bucket
  const { data, error } = await supabase
    .storage
    .from("quotes-pdfs")
    .list("", {
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
      sortBy: { column: "created_at", order: "desc" }
    });
  if (error) throw error;
  return data;
};

const getPublicUrl = (path: string) => {
  // Use Supabase public URL for the file
  const { data } = supabase
    .storage
    .from("quotes-pdfs")
    .getPublicUrl(path);
  return data?.publicUrl || "";
};

const AdminQuotesPDFs: React.FC = () => {
  const [page, setPage] = React.useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-quotes-pdfs", page],
    queryFn: () => fetchPDFs(page),
    keepPreviousData: true,
  });

  return (
    <div>
      <h3 className="font-bold text-xl mb-2">Quotes PDFs (Storage Bucket)</h3>
      {isLoading ? (
        <div className="py-10 text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{String(error)}</div>
      ) : !data || data.length === 0 ? (
        <div className="py-10 text-gray-500 text-center">No PDF files found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">File</th>
                <th className="p-2">Size</th>
                <th className="p-2">Uploaded</th>
                <th className="p-2">Preview</th>
              </tr>
            </thead>
            <tbody>
              {data.map((file: any) => (
                <tr key={file.id || file.name}>
                  <td className="p-2">
                    <a
                      href={getPublicUrl(file.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-askus-purple underline"
                    >
                      {file.name}
                    </a>
                  </td>
                  <td className="p-2">{file.metadata?.size ? `${(file.metadata.size / 1024).toFixed(1)} KB` : "-"}</td>
                  <td className="p-2">{file.created_at ? new Date(file.created_at).toLocaleString() : "-"}</td>
                  <td className="p-2">
                    {/* PDF preview */}
                    {file.name.endsWith(".pdf") ? (
                      <iframe
                        src={getPublicUrl(file.name)}
                        title={file.name}
                        className="w-36 h-28 border rounded shadow"
                        loading="lazy"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default AdminQuotesPDFs;
