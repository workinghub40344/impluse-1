import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface Class {
  _id: string;
  name: string;
  description: string;
  instructor: string;
  schedule: string; // ISO date string with date & time
  capacity: number;
}

const Classes = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { url } = useAuth();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get<Class[]>(`${url}/api/classes`);
        setClasses(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [url]);

  // Derive day and time from schedule
  const classesWithDayTime = classes.map(c => {
    const date = new Date(c.schedule);
    return {
      ...c,
      day: date.toLocaleDateString('en-US', { weekday: 'long' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const times = Array.from(new Set(classesWithDayTime.map(c => c.time))).sort();

  const getClassForSlot = (time: string, day: string) =>
    classesWithDayTime.find(c => c.time === time && c.day === day)?.name || '-';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-accent">Classes</span>
          </h1>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Choose from our diverse range of training programs designed to challenge and transform you.
          </p>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          {loading && <p>Loading classes...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && !error && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classes.map(classItem => (
                <div
                  key={classItem._id}
                  className="card-gym group hover:shadow-strong transition-all duration-300"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">{classItem.name}</h3>
                    <p className="text-muted-foreground">{classItem.description}</p>
                  </div>

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

                  <div className="space-y-3">
                    <Button className="w-full btn-hero">Book Class</Button>
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

      {/* Schedule Table */}
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
                  {days.map(day => (
                    <th key={day} className="text-left py-4 px-4 font-bold text-primary">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {times.map(time => (
                  <tr key={time} className="border-b border-border">
                    <td className="py-4 px-4 font-medium">{time}</td>
                    {days.map(day => (
                      <td key={day} className="py-4 px-4">
                        {getClassForSlot(time, day)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Classes;
