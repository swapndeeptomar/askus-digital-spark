
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";

type Blog = {
  id: string;
  title: string;
  content: string;
  cover_image_url?: string | null;
  author?: string | null;
  created_at: string;
};

const emptyBlog = {
  title: "",
  content: "",
  cover_image_url: "",
  author: "",
};

const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editBlog, setEditBlog] = useState<Partial<Blog> | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) {
      toast.error("Failed to fetch blogs: " + error.message);
    } else {
      setBlogs(data as Blog[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, []);

  const handleEdit = (blog?: Blog) => {
    setEditBlog(blog ? { ...blog } : { ...emptyBlog });
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setTimeout(() => setEditBlog(null), 200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editBlog) return;
    setEditBlog({ ...editBlog, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!editBlog?.title || !editBlog?.content) {
      toast.error("Title and content are required.");
      return;
    }
    setSaving(true);
    if (editBlog.id) {
      // Update
      const { error } = await supabase
        .from("blogs")
        .update({
          title: editBlog.title,
          content: editBlog.content,
          author: editBlog.author,
          cover_image_url: editBlog.cover_image_url,
        })
        .eq("id", editBlog.id);
      if (error) {
        toast.error("Error updating blog: " + error.message);
      } else {
        toast.success("Blog updated!");
        fetchBlogs();
        setShowDialog(false);
      }
    } else {
      // Insert
      const { error } = await supabase
        .from("blogs")
        .insert({
          title: editBlog.title,
          content: editBlog.content,
          author: editBlog.author,
          cover_image_url: editBlog.cover_image_url,
        });
      if (error) {
        toast.error("Error adding blog: " + error.message);
      } else {
        toast.success("Blog added!");
        fetchBlogs();
        setShowDialog(false);
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      toast.error("Error deleting blog: " + error.message);
    } else {
      toast.success("Blog deleted!");
      setBlogs((old) => old.filter((b) => b.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl">Blogs</h3>
        <Button onClick={() => handleEdit()} className="flex gap-2">
          <Plus className="w-5 h-5" /> Add New Blog
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center py-12 text-askus-purple">
          <Loader2 className="animate-spin mr-2" /> Loading blogs...
        </div>
      ) : blogs.length === 0 ? (
        <div className="py-8 text-gray-500 text-center">No blogs found.</div>
      ) : (
        <div className="space-y-5">
          {blogs.map((b) => (
            <div key={b.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4 relative">
              {b.cover_image_url && (
                <img src={b.cover_image_url} alt={b.title} className="w-full md:w-44 h-28 object-cover rounded border" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-lg font-semibold">{b.title}</h4>
                  <span className="text-xs text-gray-400 ml-2">{new Date(b.created_at).toLocaleDateString()}</span>
                </div>
                <div className="line-clamp-2 text-gray-600">{b.content}</div>
                <div className="text-xs text-gray-400 mt-2">
                  {b.author && <>By {b.author}</>}
                </div>
              </div>
              <div className="flex gap-2 items-start absolute right-4 top-4">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(b)} title="Edit">
                  <Pencil className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(b.id)} title="Delete">
                  <Trash2 className="w-5 h-5 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editBlog?.id ? "Edit Blog" : "Add New Blog"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="title"
              value={editBlog?.title ?? ""}
              onChange={handleChange}
              placeholder="Title"
              disabled={saving}
            />
            <Textarea
              name="content"
              value={editBlog?.content ?? ""}
              onChange={handleChange}
              placeholder="Content"
              rows={10}
              disabled={saving}
            />
            <Input
              name="cover_image_url"
              value={editBlog?.cover_image_url ?? ""}
              onChange={handleChange}
              placeholder="Cover Image URL"
              disabled={saving}
              icon={<ImageIcon className="w-4 h-4" />}
            />
            <Input
              name="author"
              value={editBlog?.author ?? ""}
              onChange={handleChange}
              placeholder="Author"
              disabled={saving}
            />
          </div>
          <DialogFooter>
            <Button disabled={saving} onClick={handleSave}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editBlog?.id ? "Update" : "Add"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={saving} onClick={handleDialogClose}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlogs;
