"use client";

import dynamic from "next/dynamic";
import { LucideIcon } from "lucide-react";
import { Palette, Brain, GraduationCap, LibraryBig, ShieldCheck, MessageCircle } from "lucide-react";

// (Optionally, if you have a "FeatureCard" (or a "FeatureCard" wrapper) that is a client component, import it; otherwise, dynamically import it.)
// (For example, if "FeatureCard" is a client component, you can import it; otherwise, dynamically import it.)
// (In this example, I assume "FeatureCard" is a client component (or a wrapper) and is imported (or dynamically imported) on the client.)
import FeatureCard from "@/components/shared/feature-card";

interface ClientFeatureCardProps {
  title: string;
  description: string;
  href: string;
  iconName: string; // (iconName is a string (e.g. "Palette") instead of a Lucide icon object.)
  ctaText?: string;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Brain,
  GraduationCap,
  LibraryBig,
  ShieldCheck,
  MessageCircle,
};

const ClientFeatureCard: React.FC<ClientFeatureCardProps> = ({ title, description, href, iconName, ctaText, className }) => {
  const Icon = iconMap[iconName] || Palette; // (Fallback to Palette if iconName is not found.)
  return (
    <FeatureCard
      title={title}
      description={description}
      href={href}
      Icon={Icon}
      ctaText={ctaText}
      className={className}
    />
  );
};

export default ClientFeatureCard; 