import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get In <span className="text-accent">Touch</span>
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Ready to start your fitness journey? We're here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="heading-section">Let's Connect</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Have questions about our programs or ready to join? Reach out to us through 
                any of the channels below.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">
                      123 Fitness Street, Sector 21<br />
                      New Delhi, Delhi 110001<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Call Us</h3>
                    <p className="text-muted-foreground">
                      +91 98765 43210<br />
                      +91 11 2345 6789
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Email Us</h3>
                    <p className="text-muted-foreground">
                      info@bharatbarbellclub.com<br />
                      support@bharatbarbellclub.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Operating Hours</h3>
                    <div className="text-muted-foreground">
                      <p>Monday - Friday: 5:00 AM - 11:00 PM</p>
                      <p>Saturday - Sunday: 6:00 AM - 10:00 PM</p>
                      <p className="text-accent font-medium mt-1">24/7 for Beast Mode members</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-gym">
              <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-primary mb-2">
                      First Name
                    </label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-primary mb-2">
                      Last Name
                    </label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                    Phone Number
                  </label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-primary mb-2">
                    I'm Interested In
                  </label>
                  <select 
                    id="interest" 
                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select an option</option>
                    <option value="membership">Membership Plans</option>
                    <option value="personal-training">Personal Training</option>
                    <option value="group-classes">Group Classes</option>
                    <option value="nutrition">Nutrition Consultation</option>
                    <option value="corporate">Corporate Programs</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    rows={4} 
                    placeholder="Tell us about your fitness goals and how we can help..."
                  />
                </div>

                <Button className="w-full btn-hero text-lg py-6">
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-section">Find Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Located in the heart of Delhi, we're easily accessible by metro, bus, and car.
            </p>
          </div>

          <div className="card-gym">
            <div className="w-full h-96 bg-muted rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">Interactive Map</h3>
                <p className="text-muted-foreground">
                  Map integration would be implemented here<br />
                  (Google Maps, OpenStreetMap, etc.)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent to-accent-hover">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-accent-foreground mb-6">
            Ready to Begin?
          </h2>
          <p className="text-xl text-accent-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't let another day pass. Your transformation starts with a single step.
          </p>
          <Button className="bg-primary hover:bg-primary-hover text-primary-foreground text-lg px-8 py-4 rounded-xl shadow-lg">
            Join Bharat Barbell Club
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;