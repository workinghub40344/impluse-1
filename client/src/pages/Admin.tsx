import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';

const Admin = () => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({
    name: '',
    description: '',
    instructor: '',
    schedule: '',
    capacity: 0,
  });

  // 🔹 Fetch all classes
  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/classes');
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // 🔹 Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass((prevClass) => ({
      ...prevClass,
      [name]: value,
    }));
  };

  // 🔹 Add new class
  const handleAddClass = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(newClass),
      });

      if (response.ok) {
        toast({ title: 'Success!', description: 'Class added successfully.' });
        // Reset form
        setNewClass({
          name: '',
          description: '',
          instructor: '',
          schedule: '',
          capacity: 0,
        });
        fetchClasses();
      } else {
        toast({
          title: 'Error!',
          description: 'Failed to add class.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  // 🔹 Delete a class
  const handleDeleteClass = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/classes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast({ title: 'Success!', description: 'Class deleted successfully.' });
        fetchClasses();
      } else {
        toast({
          title: 'Error!',
          description: 'Failed to delete class.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* 🔹 Add new class form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add New Class</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            name="name"
            placeholder="Name"
            value={newClass.name}
            onChange={handleInputChange}
          />
          <Input
            name="description"
            placeholder="Description"
            value={newClass.description}
            onChange={handleInputChange}
          />
          <Input
            name="instructor"
            placeholder="Instructor"
            value={newClass.instructor}
            onChange={handleInputChange}
          />
          <Input
            name="schedule"
            type="datetime-local"
            value={newClass.schedule}
            onChange={handleInputChange}
          />
          <Input
            name="capacity"
            type="number"
            placeholder="Capacity"
            value={newClass.capacity}
            onChange={handleInputChange}
          />
        </div>
        <Button onClick={handleAddClass} className="mt-4">
          Add Class
        </Button>
      </div>

      {/* 🔹 Manage classes table */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Manage Classes</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.instructor}</TableCell>
                <TableCell>
                  {c.schedule ? new Date(c.schedule).toLocaleString() : 'N/A'}
                </TableCell>
                <TableCell>{c.capacity}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteClass(c._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;
