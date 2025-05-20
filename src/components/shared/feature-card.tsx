import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'; // Added CardFooter for consistency if needed, though not strictly used by current props
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
  ctaText?: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, href, Icon, ctaText = "Let's Go!", className }) => {
  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full", className)}>
      <CardHeader className="flex flex-row items-center gap-2 sm:gap-4 py-3 px-3 sm:px-4 sm:pb-2">
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-accent shrink-0" />
        <CardTitle className="text-lg sm:text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow py-1 px-3 sm:px-4">
        <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
      </CardContent>
      <CardContent className="pt-1 pb-3 px-3 sm:px-4"> 
        <Link href={href} passHref>
          <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm h-8 sm:h-10">
            {ctaText} <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
