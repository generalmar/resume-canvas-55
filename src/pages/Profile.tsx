import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const [currentPlan, setCurrentPlan] = useState<'free' | 'basic' | 'pro'>('free');
  const [email, setEmail] = useState('john.doe@example.com');
  const [fullName, setFullName] = useState('John Doe');

  const plans = [
    {
      id: 'free' as const,
      name: 'Free',
      price: '$0',
      features: [
        '1 Resume',
        '1 Cover Letter',
        'Basic Templates',
        'PDF Download',
      ],
    },
    {
      id: 'basic' as const,
      name: 'Basic',
      price: '$2',
      period: '/month',
      features: [
        '5 Resumes',
        '5 Cover Letters',
        'All Templates',
        'PDF Download',
        'Priority Support',
      ],
    },
    {
      id: 'pro' as const,
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      features: [
        'Unlimited Resumes',
        'Unlimited Cover Letters',
        'All Templates',
        'PDF Download',
        'Priority Support',
        'Custom Branding',
        'Advanced Analytics',
      ],
    },
  ];

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleUpgradePlan = (planId: 'free' | 'basic' | 'pro') => {
    setCurrentPlan(planId);
    toast.success(`Upgraded to ${plans.find(p => p.id === planId)?.name} plan!`);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </CardFooter>
        </Card>

        {/* Subscription Plans */}
        <div>
          <h2 className="text-3xl font-bold mb-2">Subscription Plans</h2>
          <p className="text-muted-foreground mb-6">Choose the plan that works best for you</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${
                  currentPlan === plan.id ? 'border-primary shadow-lg' : ''
                }`}
              >
                {currentPlan === plan.id && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Current Plan
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground">{plan.period}</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={currentPlan === plan.id ? 'outline' : 'default'}
                    disabled={currentPlan === plan.id}
                    onClick={() => handleUpgradePlan(plan.id)}
                  >
                    {currentPlan === plan.id ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
