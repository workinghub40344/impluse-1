import { ArrowRight, Zap, Users, Trophy, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Home = () => {
  const { isAuthenticated } = useAuth(); 
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Logo */}
            <div className="mb-8 animate-bounce-in">
              <img 
                src="/lovable-uploads/1d521332-978d-44e0-8cca-06863b74306a.png" 
                alt="Bharat Barbell Club" 
                className="h-32 w-auto mx-auto mb-6 float-animation"
              />
            </div>

            {/* Hero Text */}
            <h1 className="heading-hero mb-6 animate-fade-in">
              Unleash Your
              <br />
              <span className="text-accent">Inner Beast</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-fade-in">
              Join India's most powerful fitness community. Transform your body, mind, and spirit 
              with our world-class training programs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              {
                isAuthenticated ? (
                  <Link to="/classes">
                <Button className="btn-hero text-lg px-8 py-4">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
                ) : (
                  <Link to="/join-now">
                <Button className="btn-hero text-lg px-8 py-4">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
                )

              }
              
              <Link to="/classes">
                <Button className="btn-outline-hero text-lg px-8 py-4">
                  View Classes
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">500+</div>
                <div className="text-primary-foreground/80 font-medium">Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">10+</div>
                <div className="text-primary-foreground/80 font-medium">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">100+</div>
                <div className="text-primary-foreground/80 font-medium">Trainers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-section">Why Choose Bharat Barbell Club?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our premium facilities and expert guidance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-feature text-center">
              <Zap className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-bold mb-3">High-Intensity Training</h3>
              <p className="text-primary-foreground/80">
                Push your limits with our scientifically designed workout programs
              </p>
            </div>

            <div className="card-feature text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-bold mb-3">Expert Trainers</h3>
              <p className="text-primary-foreground/80">
                Learn from certified professionals with years of experience
              </p>
            </div>

            <div className="card-feature text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-bold mb-3">Proven Results</h3>
              <p className="text-primary-foreground/80">
                Join thousands who've achieved their fitness goals with us
              </p>
            </div>

            <div className="card-feature text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-bold mb-3">Flexible Hours</h3>
              <p className="text-primary-foreground/80">
                Train on your schedule with our extended operating hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-accent to-accent-hover">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-accent-foreground mb-6">
            Ready to Transform?
          </h2>
          <p className="text-xl text-accent-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't wait for tomorrow. Your strongest self is just one workout away.
          </p>
          <Button className="bg-primary hover:bg-primary-hover text-primary-foreground text-lg px-8 py-4 rounded-xl shadow-lg">
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;