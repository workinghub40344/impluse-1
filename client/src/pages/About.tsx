import { Target, Award, Heart, Star } from 'lucide-react';
import { AnimatedCard } from '@/components/ui/animated-card';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-accent">Our Legacy</span>
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              For over a decade, Bharat Barbell Club has been transforming lives through 
              strength, discipline, and community.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="heading-section">Our Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Founded in 2013, Bharat Barbell Club began as a small community gym with a 
                  big vision: to create India's most empowering fitness environment where 
                  strength meets character.
                </p>
                <p>
                  What started with a handful of dedicated members has grown into a movement 
                  of over 500 fitness enthusiasts, all united by the common goal of unleashing 
                  their inner potential.
                </p>
                <p>
                  Our philosophy is simple: true strength comes from within. We don't just 
                  build muscles; we build confidence, discipline, and unbreakable spirit.
                </p>
              </div>
            </div>
            <div className="card-gym">
              <img 
                src="/lovable-uploads/1d521332-978d-44e0-8cca-06863b74306a.png" 
                alt="Bharat Barbell Club" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-section">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape the culture of our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedCard
              icon={<Target className="h-12 w-12 text-accent" />}
              title="Excellence"
              description="We strive for perfection in every workout, every form, every rep."
              buttonText="Explore"
              onButtonClick={() => console.log('Excellence clicked')}
            />

            <AnimatedCard
              icon={<Award className="h-12 w-12 text-accent" />}
              title="Achievement"
              description="Celebrating every milestone, from first push-up to personal records."
              buttonText="Discover"
              onButtonClick={() => console.log('Achievement clicked')}
            />

            <AnimatedCard
              icon={<Heart className="h-12 w-12 text-accent" />}
              title="Community"
              description="Building lasting friendships through shared sweat and determination."
              buttonText="Join Us"
              onButtonClick={() => console.log('Community clicked')}
            />

            <AnimatedCard
              icon={<Star className="h-12 w-12 text-accent" />}
              title="Integrity"
              description="Honest training, authentic results, genuine support for every member."
              buttonText="Learn More"
              onButtonClick={() => console.log('Integrity clicked')}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-primary-foreground/90">
              Numbers that reflect our commitment to your success
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">500+</div>
              <div className="text-lg">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">10+</div>
              <div className="text-lg">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">25+</div>
              <div className="text-lg">Expert Trainers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">1000+</div>
              <div className="text-lg">Success Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-section">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              To empower individuals through fitness, creating a supportive community where 
              everyone can discover their strongest, most confident self. We believe that 
              physical strength builds mental resilience, and together, we're building a 
              healthier, stronger India.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;