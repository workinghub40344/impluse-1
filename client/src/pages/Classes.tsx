import { useState, useEffect } from 'react';
import { Clock, Users, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Class {
  _id: string;
  name: string;
  description: string;
  instructor: string;
  schedule: string; // Assuming schedule is a string for now
  capacity: number;
  // Add other fields from your model that you want to use
}

const Classes = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/classes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-success/20 text-success';
      case 'Intermediate': return 'bg-warning/20 text-warning';
      case 'Advanced': return 'bg-destructive/20 text-destructive';
      default: return 'bg-accent/20 text-accent';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-accent">Classes</span>
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Choose from our diverse range of training programs designed to challenge 
              and transform you.
            </p>
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          {loading && <p>Loading classes...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && !error && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classes.map((classItem) => (
                <div key={classItem._id} className="card-gym group hover:shadow-strong transition-all duration-300">
                  {/* Class Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">{classItem.name}</h3>
                    <p className="text-muted-foreground">{classItem.description}</p>
                  </div>

                  {/* Class Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{classItem.capacity} people</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{new Date(classItem.schedule).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <span>Instructor: {classItem.instructor}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full btn-hero">
                      Book Class
                    </Button>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-section">Weekly Schedule</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Plan your week with our comprehensive class schedule
            </p>
          </div>

          <div className="card-gym overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-bold text-primary">Time</th>
                  <th className="text-left py-4 px-4 font-bold text-primary">Monday</th>
                  <th className="text-left py-4 px-4 font-bold text-primary">Tuesday</th>
                  <th className="text-left py-4 px-4 font-bold text-primary">Wednesday</th>
                  <th className="text-left py-4 px-4 font-bold text-primary">Thursday</th>
                  <th className="text-left py-4 px-4 font-bold text-primary">Friday</th>
                  <th className="text-left py-4 px-4 font-bold text-primary">Saturday</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 font-medium">6:00 AM</td>
                  <td className="py-4 px-4">Beast Mode HIIT</td>
                  <td className="py-4 px-4">Powerlifting</td>
                  <td className="py-4 px-4">Beast Mode HIIT</td>
                  <td className="py-4 px-4">Olympic Lifting</td>
                  <td className="py-4 px-4">Beast Mode HIIT</td>
                  <td className="py-4 px-4">Powerlifting</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 font-medium">5:00 PM</td>
                  <td className="py-4 px-4">Bodybuilding</td>
                  <td className="py-4 px-4">Bodybuilding</td>
                  <td className="py-4 px-4">Bodybuilding</td>
                  <td className="py-4 px-4">Bodybuilding</td>
                  <td className="py-4 px-4">Bodybuilding</td>
                  <td className="py-4 px-4">Bodybuilding</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">6:00 PM</td>
                  <td className="py-4 px-4">Strength & Conditioning</td>
                  <td className="py-4 px-4">-</td>
                  <td className="py-4 px-4">Strength & Conditioning</td>
                  <td className="py-4 px-4">-</td>
                  <td className="py-4 px-4">Strength & Conditioning</td>
                  <td className="py-4 px-4">-</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">7:00 PM</td>
                  <td className="py-4 px-4">Cardio Combat</td>
                  <td className="py-4 px-4">-</td>
                  <td className="py-4 px-4">Cardio Combat</td>
                  <td className="py-4 px-4">-</td>
                  <td className="py-4 px-4">Cardio Combat</td>
                  <td className="py-4 px-4">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Classes;