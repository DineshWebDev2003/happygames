import SafetyScenarioCard from '@/components/safety-scenario-card';
import { safetyScenarios } from '@/data/mock-data';
import { ShieldCheck } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function SafetyPage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <ShieldCheck className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground mb-2">Safety First!</h1>
        <p className="text-lg text-muted-foreground">
          Learn about personal safety and how to stay secure.
        </p>
      </section>

      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="what-is-safety" className="bg-card rounded-lg shadow">
          <AccordionTrigger className="p-4 text-lg font-semibold hover:no-underline">What is Personal Safety?</AccordionTrigger>
          <AccordionContent className="p-4 pt-0 text-muted-foreground">
            Personal safety means protecting your body and your feelings. It's about knowing what's okay and what's not okay when someone touches you or talks to you. Your body belongs to you, and you have the right to say "No!" if you feel uncomfortable.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="good-vs-bad" className="bg-card rounded-lg shadow">
          <AccordionTrigger className="p-4 text-lg font-semibold hover:no-underline">Good Touch vs. Bad Touch</AccordionTrigger>
          <AccordionContent className="p-4 pt-0 text-muted-foreground">
            <p className="mb-2"><strong>Good touches</strong> make you feel loved, safe, and happy. Examples include a hug from a parent, a pat on the back from a teacher for doing well, or holding hands with a friend.</p>
            <p><strong>Bad touches</strong> make you feel uncomfortable, scared, sad, or confused. These can be touches on private parts of your body (parts covered by a swimsuit), or any touch that hurts you or makes you feel bad. It's never okay for someone to make you keep a bad touch a secret.</p>
            <p className="mt-2"><strong>Remember:</strong> If a touch makes you feel weird or bad, it's okay to say NO and tell a trusted adult immediately.</p>
          </AccordionContent>
        </AccordionItem>
         <AccordionItem value="trusted-adults" className="bg-card rounded-lg shadow">
          <AccordionTrigger className="p-4 text-lg font-semibold hover:no-underline">Who are Trusted Adults?</AccordionTrigger>
          <AccordionContent className="p-4 pt-0 text-muted-foreground">
            Trusted adults are grown-ups you can talk to if you feel unsafe, scared, or confused. They will listen to you and help you. Examples include:
            <ul className="list-disc list-inside mt-2">
              <li>Parents or guardians</li>
              <li>Teachers</li>
              <li>Grandparents</li>
              <li>School counselors</li>
              <li>Doctors or nurses</li>
            </ul>
            It's important to have a few trusted adults you can turn to.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <section>
        <h2 className="text-2xl font-semibold text-center mb-6 text-foreground">Learning Scenarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safetyScenarios.map((scenario) => (
            <SafetyScenarioCard key={scenario.id} scenarioItem={scenario} />
          ))}
        </div>
      </section>
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
}
