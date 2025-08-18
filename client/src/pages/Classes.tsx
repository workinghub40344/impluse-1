import { Clock, Users, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Classes = () => {
  const classes = [
    {
      name: "Beast Mode HIIT",
      description: "High-intensity interval training that pushes your limits",
      duration: "45 min",
      capacity: "15 people",
      level: "Intermediate",
      schedule: "Mon, Wed, Fri - 6:00 AM",
      image: "💪"
    },
    {
      name: "Powerlifting Fundamentals",
      description: "Master the big three: squat, bench press, and deadlift",
      duration: "60 min",
      capacity: "8 people",
      level: "Beginner",
      schedule: "Tue, Thu, Sat - 7:00 AM",
      image: "🏋️"
    },
    {
      name: "Strength & Conditioning",
      description: "Build functional strength for everyday life",
      duration: "50 min",
      capacity: "12 people",
      level: "All Levels",
      schedule: "Mon, Wed, Fri - 6:00 PM",
      image: "💯"
    },
    {
      name: "Olympic Lifting",
      description: "Learn explosive movements: clean, jerk, and snatch",
      duration: "75 min",
      capacity: "6 people",
      level: "Advanced",
      schedule: "Tue, Thu - 8:00 AM",
      image: "🥇"
    },
    {
      name: "Bodybuilding Focus",
      description: "Hypertrophy training for muscle mass and definition",
      duration: "60 min",
      capacity: "10 people",
      level: "Intermediate",
      schedule: "Daily - 5:00 PM",
      image: "🔥"
    },
    {
      name: "Cardio Combat",
      description: "Boxing-inspired cardio for strength and endurance",
      duration: "40 min",
      capacity: "20 people",
      level: "All Levels",
      schedule: "Mon, Wed, Fri - 7:00 PM",
      image: "🥊"
    }
  ];

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((classItem, index) => (
              <div key={index} className="card-gym group hover:shadow-strong transition-all duration-300">
                {/* Class Header */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{classItem.image}</div>
                  <h3 className="text-2xl font-bold text-primary mb-2">{classItem.name}</h3>
                  <p className="text-muted-foreground">{classItem.description}</p>
                </div>

                {/* Class Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{classItem.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{classItem.capacity}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{classItem.schedule}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(classItem.level)}`}>
                      {classItem.level}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
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