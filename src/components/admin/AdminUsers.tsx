
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const PAGE_SIZE = 10;
const EDGE_FUNCTION_URL = "/functions/v1/admin_list_users";

const fetchUsers = async (page: number) => {
  const response = await fetch(`${EDGE_FUNCTION_URL}?page=${page}&pageSize=${PAGE_SIZE}`);
  let data;
  let isHTML = false;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    // fallback for error pages
    isHTML = true;
    data = await response.text();
  }
  if (!response.ok) {
    if (isHTML) {
      throw new Error("Server error (HTML): " + data.slice(0, 120));
    }
    throw new Error(data?.error || "Failed to fetch users");
  }
  if (isHTML) {
    throw new Error("Unexpected HTML (not JSON): " + data.slice(0, 120));
  }
  return data.users;
};

const AdminUsers: React.FC = () => {
  const [page, setPage] = React.useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users", page],
    queryFn: () => fetchUsers(page),
  });

  return (
    <div>
      <h3 className="font-bold text-xl mb-2">Users</h3>
      {isLoading ? (
        <div className="py-10 text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500">
          <strong>Error loading users:</strong>
          <br />
          {(error as Error).message}
        </div>
      ) : !data || data.length === 0 ? (
        <div className="py-10 text-gray-500 text-center">No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
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

export default AdminUsers;

