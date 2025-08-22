// pages/Membership.tsx

import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import axios from "axios";
import { Check, Star, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = { Zap, Star, Crown };

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);


type Plan = {
  _id: string;
  name: string;
  duration: string;
  price: number | string;
  originalPrice?: number | string;
  icon?: string;
  popular?: boolean;
  color?: string;
  features: string[];
};

const Membership = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const { url } = useAuth();
  useEffect(() => {
    axios.get(`${url}/api/memberships`).then((res) => {
      setPlans(res.data);
    }).catch(err => {
      console.error("Error fetching memberships:", err);
    });
  }, [url]);

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => {
              const Icon = iconMap[plan.icon] || Zap;
              return (
                <div
                  key={plan._id}
                  className={`relative card-gym ${plan.popular ? 'ring-2 ring-accent shadow-glow' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-6 py-2 rounded-full font-bold text-sm">
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground">{capitalize(plan.duration)} Plan</p>

                    <div className="mt-6">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-4xl font-bold text-primary">₹{plan.price}</span>
                        {plan.originalPrice && (
                          <div className="text-sm text-muted-foreground">
                            <div className="line-through">₹{plan.originalPrice}</div>
                            <div>per {plan.duration}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature: string, i: number) => (
                      <div key={i} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className={`w-full ${plan.popular ? 'btn-hero' : 'btn-outline-hero'} text-lg py-6`}>
                    Choose {plan.name}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;

