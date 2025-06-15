
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const fetchBlogs = async () => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);
  if (error) throw error;
  return data;
};

const Blogs = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs", 10],
    queryFn: fetchBlogs,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50 pt-28 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl font-bold mb-10 text-askus-dark text-center">Our Latest Blogs</h1>
          {isLoading ? (
            <div className="flex justify-center py-12 text-askus-purple">
              <Loader2 className="animate-spin mr-2" /> Loading blogs...
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">Error loading blogs.</div>
          ) : !data || data.length === 0 ? (
            <div className="text-gray-500 text-center">No blog posts found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.map((blog: any) => (
                <div key={blog.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                  {blog.cover_image_url && (
                    <img
                      src={blog.cover_image_url}
                      alt={blog.title}
                      className="h-48 w-full object-cover"
                    />
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-2xl font-semibold mb-3 text-askus-dark">{blog.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-4">{blog.content}</p>
                    <div className="text-xs text-gray-400 mt-auto">
                      <span>
                        {blog.author ? <>By {blog.author} | </> : null}
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/" className="bg-askus-purple text-white px-6 py-3 rounded-lg hover:bg-askus-purple/90 transition inline-block">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;
