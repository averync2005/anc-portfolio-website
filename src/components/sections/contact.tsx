"use client";

/**
 * Contact section (headline, direct email link, and the contact form)
 */




// ---------------------------------
// Imports
// ---------------------------------

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { config } from "@/data/config";
import ContactForm from "../contact-form";
import SectionWrapper from "../ui/section-wrapper";




// ---------------------------------
// ContactSection
// ---------------------------------

/**
 * Display-font headline above a card holding the form (card text in the body font)
 */
const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="min-h-screen max-w-5xl mx-auto px-4 md:px-8 py-24 flex flex-col justify-center">
      <h2 className="text-4xl md:text-7xl font-bold text-foreground text-center mb-14">
        LET&apos;S WORK <br /> TOGETHER
      </h2>

      <Card className="w-full max-w-3xl mx-auto bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl font-sans">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-display">Contact Form</CardTitle>
          <CardDescription>
            Reach me directly at{" "}
            <a target="_blank" href={`mailto:${config.email}`} className="underline hover:text-foreground transition-colors">
              {config.email}
            </a>{" "}
            or use the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </SectionWrapper>
  );
};




// ---------------------------------
// Export
// ---------------------------------

export default ContactSection;