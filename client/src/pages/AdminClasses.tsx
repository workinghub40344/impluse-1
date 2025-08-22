import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Trash2, RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import axios, { AxiosError } from "axios";

type ClassItem = {
  _id: string;
  name: string;
  description?: string;
  instructor?: string;
  schedule?: string;
  capacity: number;
};

const Admin = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [newClass, setNewClass] = useState({
    name: "",
    description: "",
    instructor: "",
    schedule: "",
    capacity: 0,
  });

  const { url } = useAuth();

  // 🔹 Fetch all classes
  const fetchClasses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/classes`);
      setClasses(response.data || []);
    } catch (error) {
      const err = error as AxiosError;
      console.error("Error fetching classes:", err.message);
      toast({
        title: "Fetch failed",
        description: "Could not load classes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  // 🔹 Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewClass((prev) => ({
      ...prev,
      [name]: name === "capacity" ? Number(value) : value,
    }));
  };

  // 🔹 Form Validation
  const isFormValid = useMemo(() => {
    return (
      newClass.name.trim().length > 0 &&
      newClass.instructor.trim().length > 0 &&
      newClass.schedule.trim().length > 0 &&
      Number.isFinite(newClass.capacity) &&
      newClass.capacity >= 0
    );
  }, [newClass]);

  // 🔹 Add new class
  const handleAddClass = async () => {
    if (!isFormValid) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields and ensure capacity is valid.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      await axios.post(`${url}/api/classes`, newClass, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({ title: "Success", description: "Class added successfully." });
      setNewClass({
        name: "",
        description: "",
        instructor: "",
        schedule: "",
        capacity: 0,
      });
      fetchClasses();
    } catch (error) {
      const err = error as AxiosError;
      console.error("Error adding class:", err.message);
      toast({
        title: "Error",
        description: "Failed to add class. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // 🔹 Delete a class
  const handleDeleteClass = async (id: string) => {
    const ok = window.confirm("Are you sure you want to delete this class?");
    if (!ok) return;

    try {
      setDeletingId(id);
      const token = localStorage.getItem("token");

      await axios.delete(`${url}/api/classes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({ title: "Deleted", description: "Class deleted successfully." });
      setClasses((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      const err = error as AxiosError;
      console.error("Error deleting class:", err.message);
      toast({
        title: "Error",
        description: "Could not delete the class. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // 🔹 Filtered list
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return classes;
    return classes.filter((c) => {
      return (
        c.name?.toLowerCase().includes(q) ||
        c.instructor?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q)
      );
    });
  }, [classes, search]);

  const formatDateTime = (iso?: string) => {
    if (!iso) return "N/A";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage classes, schedules, and capacity.</p>
        </div>
        <Button variant="outline" onClick={fetchClasses} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Add Class */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Add New Class</CardTitle>
            <CardDescription>Fill details and click Add Class.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name<span className="text-destructive"> *</span>
              </Label>
              <Input id="name" name="name" placeholder="e.g., Yoga Basics" value={newClass.name} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Short description..." value={newClass.description} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructor">
                Instructor<span className="text-destructive"> *</span>
              </Label>
              <Input id="instructor" name="instructor" placeholder="e.g., Priya Sharma" value={newClass.instructor} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule">
                Schedule<span className="text-destructive"> *</span>
              </Label>
              <Input id="schedule" name="schedule" type="datetime-local" value={newClass.schedule} onChange={handleInputChange} />
              <p className="text-xs text-muted-foreground">Pick date & time for the class.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">
                Capacity<span className="text-destructive"> *</span>
              </Label>
              <Input id="capacity" name="capacity" type="number" min={0} placeholder="0" value={newClass.capacity} onChange={handleInputChange} />
            </div>

            <Separator />

            <Button onClick={handleAddClass} disabled={!isFormValid || submitting} className="w-full">
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
              Add Class
            </Button>
            <p className="text-xs text-muted-foreground">Fields marked with * are required.</p>
          </CardContent>
        </Card>

        {/* Right: Manage Classes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Manage Classes</CardTitle>
            <CardDescription>Search, view, and delete classes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-3">
              <Input placeholder="Search by name, instructor, or description..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-md" />
            </div>

            <div className="relative overflow-hidden rounded-md border">
              <div className="max-h-[520px] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 z-10 bg-background">
                    <TableRow>
                      <TableHead className="min-w-[200px]">Name</TableHead>
                      <TableHead className="min-w-[160px]">Instructor</TableHead>
                      <TableHead className="min-w-[220px]">Schedule</TableHead>
                      <TableHead className="w-[100px] text-right">Capacity</TableHead>
                      <TableHead className="w-[120px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                          <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
                          Loading classes...
                        </TableCell>
                      </TableRow>
                    ) : filtered.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                          No classes found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filtered.map((c) => (
                        <TableRow key={c._id}>
                          <TableCell className="align-top">
                            <div className="font-medium">{c.name}</div>
                            {c.description ? <div className="text-xs text-muted-foreground line-clamp-2">{c.description}</div> : null}
                          </TableCell>
                          <TableCell className="align-top">{c.instructor || "—"}</TableCell>
                          <TableCell className="align-top">{formatDateTime(c.schedule)}</TableCell>
                          <TableCell className="align-top text-right">{c.capacity}</TableCell>
                          <TableCell className="align-top text-right">
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteClass(c._id)} disabled={deletingId === c._id}>
                              {deletingId === c._id ? <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> : <Trash2 className="mr-2 h-3.5 w-3.5" />}
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
