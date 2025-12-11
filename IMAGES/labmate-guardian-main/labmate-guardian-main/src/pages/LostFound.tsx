import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

const LostFound = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    item_description: "",
    finders_name: "",
    owner_name: "",
    cell_number: "",
    date_claimed: "",
    signature: "",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("lost_found")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch lost & found items");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const itemData = {
        ...formData,
        created_by: user?.id,
      };

      if (editingItem) {
        const { error } = await supabase
          .from("lost_found")
          .update(itemData)
          .eq("id", editingItem.id);

        if (error) throw error;
        toast.success("Item updated successfully");
      } else {
        const { error } = await supabase
          .from("lost_found")
          .insert([itemData]);

        if (error) throw error;
        toast.success("Item added successfully");
      }

      setOpen(false);
      resetForm();
      fetchItems();
    } catch (error: any) {
      toast.error(error.message || "Failed to save item");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const { error } = await supabase
        .from("lost_found")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Item deleted successfully");
      fetchItems();
    } catch (error: any) {
      toast.error("Failed to delete item");
    }
  };

  const resetForm = () => {
    setFormData({
      date: "",
      time: "",
      item_description: "",
      finders_name: "",
      owner_name: "",
      cell_number: "",
      date_claimed: "",
      signature: "",
    });
    setEditingItem(null);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      date: item.date || "",
      time: item.time || "",
      item_description: item.item_description || "",
      finders_name: item.finders_name || "",
      owner_name: item.owner_name || "",
      cell_number: item.cell_number || "",
      date_claimed: item.date_claimed || "",
      signature: item.signature || "",
    });
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lost & Found</h1>
          <p className="text-muted-foreground">Manage found items and claims</p>
        </div>
        <Dialog open={open} onOpenChange={(value) => { setOpen(value); if (!value) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Lost & Found Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="item_description">Item Description *</Label>
                  <Textarea
                    id="item_description"
                    value={formData.item_description}
                    onChange={(e) => setFormData({ ...formData, item_description: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="finders_name">Finder's Name *</Label>
                  <Input
                    id="finders_name"
                    value={formData.finders_name}
                    onChange={(e) => setFormData({ ...formData, finders_name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner_name">Owner Name</Label>
                  <Input
                    id="owner_name"
                    value={formData.owner_name}
                    onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cell_number">Contact Number</Label>
                  <Input
                    id="cell_number"
                    value={formData.cell_number}
                    onChange={(e) => setFormData({ ...formData, cell_number: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_claimed">Date Claimed</Label>
                  <Input
                    id="date_claimed"
                    type="date"
                    value={formData.date_claimed}
                    onChange={(e) => setFormData({ ...formData, date_claimed: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setOpen(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button type="submit">{editingItem ? "Update" : "Add"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Description</TableHead>
              <TableHead>Finder's Name</TableHead>
              <TableHead>Date Found</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No items found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.item_description}</TableCell>
                  <TableCell>{item.finders_name}</TableCell>
                  <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {item.date_claimed ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Claimed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        Unclaimed
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{item.owner_name || "N/A"}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LostFound;
