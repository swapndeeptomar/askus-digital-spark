
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  icon?: string | null;
  created_at: string;
};

const emptyService = {
  name: "",
  description: "",
  price: 0,
  icon: "",
};

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editService, setEditService] = useState<Partial<Service> | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) {
      toast.error("Failed to fetch services: " + error.message);
    } else {
      setServices(data as Service[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line
  }, []);

  const handleEdit = (service?: Service) => {
    setEditService(service ? { ...service } : { ...emptyService });
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setTimeout(() => setEditService(null), 200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editService) return;
    setEditService({ ...editService, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!editService?.name || !editService?.description || editService.price === undefined) {
      toast.error("Name, description, and price are required.");
      return;
    }
    setSaving(true);
    if (editService.id) {
      // Update
      const { error } = await supabase
        .from("services")
        .update({
          name: editService.name,
          description: editService.description,
          price: Number(editService.price),
          icon: editService.icon,
        })
        .eq("id", editService.id);
      if (error) {
        toast.error("Error updating service: " + error.message);
      } else {
        toast.success("Service updated!");
        fetchServices();
        setShowDialog(false);
      }
    } else {
      // Insert
      const { error } = await supabase
        .from("services")
        .insert({
          name: editService.name,
          description: editService.description,
          price: Number(editService.price),
          icon: editService.icon,
        });
      if (error) {
        toast.error("Error adding service: " + error.message);
      } else {
        toast.success("Service added!");
        fetchServices();
        setShowDialog(false);
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      toast.error("Error deleting service: " + error.message);
    } else {
      toast.success("Service deleted!");
      setServices((old) => old.filter((s) => s.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl">Services</h3>
        <Button onClick={() => handleEdit()} className="flex gap-2">
          <Plus className="w-5 h-5" /> Add New Service
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center py-12 text-askus-purple">
          <Loader2 className="animate-spin mr-2" /> Loading services...
        </div>
      ) : services.length === 0 ? (
        <div className="py-8 text-gray-500 text-center">No services found.</div>
      ) : (
        <div className="space-y-5">
          {services.map((s) => (
            <div key={s.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4 relative">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-lg font-semibold">{s.name}</h4>
                  <span className="text-xs text-gray-400 ml-2">{new Date(s.created_at).toLocaleDateString()}</span>
                </div>
                <div className="line-clamp-2 text-gray-600">{s.description}</div>
                <div className="text-xs text-gray-400 mt-2">
                  ₹{Number(s.price).toLocaleString()}
                </div>
                {s.icon && (
                  <div className="mt-2 text-xs text-gray-400">Icon: {s.icon}</div>
                )}
              </div>
              <div className="flex gap-2 items-start absolute right-4 top-4">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(s)} title="Edit">
                  <Pencil className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)} title="Delete">
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
            <DialogTitle>{editService?.id ? "Edit Service" : "Add New Service"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="name"
              value={editService?.name ?? ""}
              onChange={handleChange}
              placeholder="Name"
              disabled={saving}
            />
            <Textarea
              name="description"
              value={editService?.description ?? ""}
              onChange={handleChange}
              placeholder="Description"
              rows={4}
              disabled={saving}
            />
            <Input
              name="price"
              type="number"
              value={editService?.price ?? ""}
              onChange={handleChange}
              placeholder="Price"
              disabled={saving}
            />
            <Input
              name="icon"
              value={editService?.icon ?? ""}
              onChange={handleChange}
              placeholder="Icon (optional)"
              disabled={saving}
            />
          </div>
          <DialogFooter>
            <Button disabled={saving} onClick={handleSave}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editService?.id ? "Update" : "Add"}
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

export default AdminServices;
