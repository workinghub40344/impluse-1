import { Check, Star, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Membership = () => {
  const plans = [
    {
      name: "Warrior",
      period: "Monthly",
      price: "₹2,999",
      originalPrice: "₹3,499",
      icon: Zap,
      popular: false,
      features: [
        "Access to all gym equipment",
        "Basic fitness assessment",
        "Locker facility",
        "1 guest pass per month",
        "Mobile app access",
        "Standard support"
      ],
      color: "from-primary to-secondary"
    },
    {
      name: "Gladiator",
      period: "Quarterly",
      price: "₹7,999",
      originalPrice: "₹10,497",
      icon: Star,
      popular: true,
      features: [
        "Everything in Warrior plan",
        "Personal training sessions (4/month)",
        "Nutrition consultation",
        "Group class access",
        "Progress tracking",
        "Priority booking",
        "3 guest passes per month",
        "Supplement discounts"
      ],
      color: "from-accent to-accent-hover"
    },
    {
      name: "Beast Mode",
      period: "Yearly",
      price: "₹24,999",
      originalPrice: "₹35,988",
      icon: Crown,
      popular: false,
      features: [
        "Everything in Gladiator plan",
        "Unlimited personal training",
        "Custom meal plans",
        "Body composition analysis",
        "Recovery sessions (massage/sauna)",
        "Exclusive member events",
        "Unlimited guest passes",
        "Premium supplements included",
        "24/7 gym access",
        "Dedicated trainer support"
      ],
      color: "from-primary via-secondary to-accent"
    }
  ];

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
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative card-gym ${plan.popular ? 'ring-2 ring-accent shadow-glow' : ''} group hover:shadow-strong transition-all duration-300`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-6 py-2 rounded-full font-bold text-sm">
                    Most Popular
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.period} Plan</p>
                  
                  <div className="mt-6">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                      <div className="text-sm text-muted-foreground">
                        <div className="line-through">{plan.originalPrice}</div>
                        <div>per {plan.period.toLowerCase()}</div>
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
                  className={`w-full ${plan.popular ? 'btn-hero' : 'btn-outline-hero'} text-lg py-6`}
                >
                  Choose {plan.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-section">Detailed Comparison</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See exactly what's included in each membership tier
            </p>
          </div>

          <div className="card-gym overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-6 px-4 font-bold text-primary">Features</th>
                  <th className="text-center py-6 px-4 font-bold text-primary">Warrior</th>
                  <th className="text-center py-6 px-4 font-bold text-accent">Gladiator</th>
                  <th className="text-center py-6 px-4 font-bold text-primary">Beast Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ['Gym Equipment Access', true, true, true],
                  ['Group Classes', false, true, true],
                  ['Personal Training Sessions', false, '4/month', 'Unlimited'],
                  ['Nutrition Consultation', false, true, true],
                  ['Guest Passes', '1/month', '3/month', 'Unlimited'],
                  ['Recovery Sessions', false, false, true],
                  ['24/7 Access', false, false, true],
                  ['Dedicated Trainer', false, false, true]
                ].map(([feature, warrior, gladiator, beast], index) => (
                  <tr key={index}>
                    <td className="py-4 px-4 font-medium">{feature}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof warrior === 'boolean' ? (
                        warrior ? <Check className="h-5 w-5 text-accent mx-auto" /> : '-'
                      ) : warrior}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof gladiator === 'boolean' ? (
                        gladiator ? <Check className="h-5 w-5 text-accent mx-auto" /> : '-'
                      ) : gladiator}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof beast === 'boolean' ? (
                        beast ? <Check className="h-5 w-5 text-accent mx-auto" /> : '-'
                      ) : beast}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="heading-section">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "Can I freeze my membership?",
                  answer: "Yes, you can freeze your membership for up to 3 months per year with a small administrative fee."
                },
                {
                  question: "Are there any joining fees?",
                  answer: "No, we believe in transparent pricing. The price you see is the price you pay."
                },
                {
                  question: "Can I upgrade or downgrade my plan?",
                  answer: "Absolutely! You can change your plan at any time. Upgrades are immediate, downgrades take effect from your next billing cycle."
                },
                {
                  question: "What if I'm not satisfied?",
                  answer: "We offer a 30-day satisfaction guarantee. If you're not happy, we'll refund your membership fee."
                }
              ].map((faq, index) => (
                <div key={index} className="card-gym">
                  <h3 className="text-xl font-bold text-primary mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;