import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We will respond to your inquiry within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Message Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  return (
    <div data-testid="contact-page">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden" data-testid="contact-hero-section">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl text-foreground mb-6" data-testid="contact-title">
              Contact <span className="text-gradient">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="contact-subtitle">
              Ready to get started? Let's discuss how we can help your site succeed in clinical research.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white/40 backdrop-blur-sm relative" data-testid="contact-form-section">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="p-8">
                <CardContent className="p-0">
                  <h2 className="font-heading font-bold text-2xl mb-6" data-testid="contact-form-title">Send Us a Message</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel data-testid="label-contact-name">Name *</FormLabel>
                              <FormControl>
                                <Input {...field} data-testid="input-contact-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel data-testid="label-contact-email">Email *</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} data-testid="input-contact-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel data-testid="label-contact-company">Company/Site</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-contact-company" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel data-testid="label-contact-message">Message *</FormLabel>
                            <FormControl>
                              <Textarea 
                                rows={6} 
                                placeholder="How can we help you?" 
                                {...field} 
                                data-testid="textarea-contact-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="btn-primary w-full"
                        disabled={contactMutation.isPending}
                        data-testid="submit-contact-form"
                      >
                        <i className="fas fa-envelope mr-2"></i>
                        {contactMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Information */}
            <div>
              <Card className="p-8 h-full">
                <CardContent className="p-0">
                  <h3 className="font-heading font-bold text-2xl mb-6" data-testid="contact-info-title">Get in Touch</h3>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start" data-testid="contact-info-email">
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <i className="fas fa-envelope text-primary"></i>
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold mb-1">Email</h4>
                        <p className="text-muted-foreground">Sites@monacheconsultinggroup.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start" data-testid="contact-info-address">
                      <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <i className="fas fa-map-marker-alt text-secondary"></i>
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold mb-1">Address</h4>
                        <p className="text-muted-foreground">
                          123 Clinical Research Blvd<br />
                          Suite 456<br />
                          Boston, MA 02115
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start" data-testid="contact-info-hours">
                      <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <i className="fas fa-clock text-accent"></i>
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold mb-1">Business Hours</h4>
                        <p className="text-muted-foreground">
                          Monday - Friday: 8:00 AM - 6:00 PM EST<br />
                          Weekend: By appointment
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Map Placeholder */}
                  <div className="bg-muted/50 rounded-lg h-64 flex items-center justify-center border border-border" data-testid="contact-map-placeholder">
                    <div className="text-center">
                      <i className="fas fa-map text-4xl text-muted-foreground mb-4"></i>
                      <p className="text-muted-foreground">Interactive Map Coming Soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Contact Options */}
      <section className="py-20 bg-muted/20" data-testid="additional-contact-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4" data-testid="additional-contact-title">Other Ways to Connect</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="additional-contact-subtitle">
              Choose the method that works best for you to start the conversation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card data-testid="contact-option-consultation">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-calendar-check text-2xl text-primary"></i>
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">Schedule a Consultation</h3>
                <p className="text-muted-foreground mb-6">
                  Book a one-on-one consultation to discuss your specific clinical research needs.
                </p>
                <Button className="btn-primary" data-testid="button-schedule-consultation">
                  Schedule Now
                </Button>
              </CardContent>
            </Card>
            
            <Card data-testid="contact-option-demo">
              <CardContent className="p-8 text-center">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-presentation-screen text-2xl text-secondary"></i>
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">Request a Demo</h3>
                <p className="text-muted-foreground mb-6">
                  See our services in action with a personalized demonstration of our capabilities.
                </p>
                <Button variant="outline" className="btn-outline" data-testid="button-request-demo">
                  Request Demo
                </Button>
              </CardContent>
            </Card>
            
            <Card data-testid="contact-option-proposal">
              <CardContent className="p-8 text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-file-contract text-2xl text-accent"></i>
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">Get a Proposal</h3>
                <p className="text-muted-foreground mb-6">
                  Receive a detailed proposal tailored to your site's specific requirements.
                </p>
                <Button variant="outline" className="btn-outline" data-testid="button-get-proposal">
                  Get Proposal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
