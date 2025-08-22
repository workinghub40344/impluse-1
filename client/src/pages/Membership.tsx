import { Check, Star, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { type MembershipPlan } from './AdminMembershipPage'; // Re-using the type
import { Skeleton } from '@/components/ui/skeleton';

// API function to fetch memberships
const fetchMemberships = async (): Promise<MembershipPlan[]> => {
  const response = await fetch("http://localhost:3001/api/memberships");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Membership = () => {
  const { data: plans, isLoading, isError, error } = useQuery<MembershipPlan[]>({
    queryKey: ["memberships"],
    queryFn: fetchMemberships,
  });

  // A mapping from plan duration to an icon and color for display purposes
  const planStyles: { [key: string]: { icon: React.ElementType, color: string, popular?: boolean } } = {
    monthly: { icon: Zap, color: "from-primary to-secondary" },
    quarterly: { icon: Star, color: "from-accent to-accent-hover", popular: true },
    yearly: { icon: Crown, color: "from-primary via-secondary to-accent" },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Choose Your Power Level</h1>
            <p className="text-xl mb-8 text-primary-foreground/90">Loading awesome plans for you...</p>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card-gym space-y-4 p-8">
                  <Skeleton className="w-16 h-16 rounded-2xl mx-auto" />
                  <Skeleton className="h-8 w-3/4 mx-auto" />
                  <Skeleton className="h-6 w-1/2 mx-auto" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (isError) {
    return <div className="text-red-500 text-center py-20">Error loading membership plans: {error.message}</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your <span className="text-accent">Power Level</span>
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Select the membership plan that matches your fitness goals and commitment level.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans?.map((plan) => {
              const style = planStyles[plan.duration] || planStyles.monthly;
              const Icon = style.icon;
              return (
                <div
                  key={plan._id}
                  className={`relative card-gym ${style.popular ? 'ring-2 ring-accent shadow-glow' : ''} group hover:shadow-strong transition-all duration-300`}
                >
                  {/* Popular Badge */}
                  {style.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-6 py-2 rounded-full font-bold text-sm">
                      Most Popular
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${style.color} flex items-center justify-center`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground capitalize">{plan.duration} Plan</p>

                    <div className="mt-6">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-4xl font-bold text-primary">₹{plan.price.toFixed(2)}</span>
                        <div className="text-sm text-muted-foreground">
                          <div>per {plan.duration.toLowerCase()}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full ${style.popular ? 'btn-hero' : 'btn-outline-hero'} text-lg py-6`}
                  >
                    Choose {plan.name}
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;