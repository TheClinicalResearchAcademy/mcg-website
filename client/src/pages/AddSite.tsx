import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSiteLeadSchema, type InsertSiteLead } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ObjectUploader } from "@/components/ObjectUploader";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const therapeuticAreas = [
  "oncology", "cardiology", "neurology", "psychiatry", 
  "dermatology", "endocrinology", "gastroenterology", "immunology"
];

const certifications = [
  "gcp", "irb", "pharmacy", "lab", "data", "quality"
];

const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "IT", label: "Italy" },
  { value: "ES", label: "Spain" },
  { value: "AU", label: "Australia" }
];

export default function AddSite() {
  const { toast } = useToast();
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);

  const form = useForm<InsertSiteLead>({
    resolver: zodResolver(insertSiteLeadSchema),
    defaultValues: {
      siteName: "",
      contactName: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      country: "",
      piName: "",
      piSpecialty: "",
      therapeuticAreas: [],
      priorExperience: "",
      ehrSystem: "",
      certifications: [],
      documents: [],
      notes: "",
      consentGiven: false
    }
  });

  const siteMutation = useMutation({
    mutationFn: async (data: InsertSiteLead) => {
      const response = await apiRequest("POST", "/api/lead", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Site Application Submitted!",
        description: "Thank you for submitting your site information. Our team will review your application and contact you within 2-3 business days.",
      });
      form.reset();
      setUploadedDocuments([]);
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGetUploadParameters = async () => {
    const response = await apiRequest("POST", "/api/objects/upload", {});
    const data = await response.json();
    return {
      method: "PUT" as const,
      url: data.uploadURL,
    };
  };

  const handleUploadComplete = (result: any) => {
    if (result.successful && result.successful.length > 0) {
      const newDocuments = result.successful.map((file: any) => file.uploadURL);
      setUploadedDocuments(prev => [...prev, ...newDocuments]);
      form.setValue("documents", [...(form.getValues("documents") || []), ...newDocuments]);
      toast({
        title: "Upload Successful",
        description: `${result.successful.length} file(s) uploaded successfully.`,
      });
    }
  };

  const onSubmit = (data: InsertSiteLead) => {
    siteMutation.mutate({
      ...data,
      documents: uploadedDocuments
    });
  };

  return (
    <div data-testid="add-site-page">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden" data-testid="add-site-hero-section">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl text-foreground mb-6" data-testid="add-site-title">
              Add Your <span className="text-gradient">Site</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="add-site-subtitle">
              Join our network of research-ready sites and unlock new clinical trial opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-white/40 backdrop-blur-sm relative" data-testid="add-site-form-section">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 lg:p-12 colorful-shadow border-l-4 border-l-primary/50">
            <CardContent className="p-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="site-registration-form">
                  {/* Basic Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="label-site-name">Site/Institution Name *</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-site-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="label-contact-name">Primary Contact Name *</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-contact-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="label-email">Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="label-phone">Phone Number *</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Address Information */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="label-city">City *</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-city" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="label-state">State/Region *</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-state" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="label-country">Country *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-country">
                                <SelectValue placeholder="Select Country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country.value} value={country.value}>
                                  {country.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* PI Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="piName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="label-pi-name">Principal Investigator Name *</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-pi-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="piSpecialty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="label-pi-specialty">PI Specialty *</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-pi-specialty" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Therapeutic Areas */}
                  <FormField
                    control={form.control}
                    name="therapeuticAreas"
                    render={() => (
                      <FormItem>
                        <FormLabel data-testid="label-therapeutic-areas">Therapeutic Areas of Interest</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {therapeuticAreas.map((area) => (
                            <FormField
                              key={area}
                              control={form.control}
                              name="therapeuticAreas"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={area}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(area)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), area])
                                            : field.onChange(
                                                (field.value || []).filter(
                                                  (value: string) => value !== area
                                                )
                                              );
                                        }}
                                        data-testid={`checkbox-therapeutic-area-${area}`}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal capitalize">
                                      {area}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Experience and EHR */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="priorExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="label-prior-experience">Prior Clinical Trial Experience</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-prior-experience">
                                <SelectValue placeholder="Select Experience Level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">No prior experience</SelectItem>
                              <SelectItem value="limited">Limited experience (1-5 trials)</SelectItem>
                              <SelectItem value="moderate">Moderate experience (6-20 trials)</SelectItem>
                              <SelectItem value="extensive">Extensive experience (20+ trials)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ehrSystem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="label-ehr-system">EHR System</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Epic, Cerner, Meditech" {...field} data-testid="input-ehr-system" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Certifications */}
                  <FormField
                    control={form.control}
                    name="certifications"
                    render={() => (
                      <FormItem>
                        <FormLabel data-testid="label-certifications">Available Certifications/SOPs</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {certifications.map((cert) => (
                            <FormField
                              key={cert}
                              control={form.control}
                              name="certifications"
                              render={({ field }) => {
                                const certLabels: Record<string, string> = {
                                  gcp: "GCP Certification",
                                  irb: "IRB SOPs",
                                  pharmacy: "Pharmacy SOPs",
                                  lab: "Laboratory SOPs",
                                  data: "Data Management SOPs",
                                  quality: "Quality Assurance SOPs"
                                };
                                
                                return (
                                  <FormItem
                                    key={cert}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(cert)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), cert])
                                            : field.onChange(
                                                (field.value || []).filter(
                                                  (value: string) => value !== cert
                                                )
                                              );
                                        }}
                                        data-testid={`checkbox-certification-${cert}`}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {certLabels[cert]}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* File Upload */}
                  <div>
                    <Label className="block font-medium text-foreground mb-2" data-testid="label-file-upload">
                      Upload SOPs/Training Certificates
                    </Label>
                    <div className="border-2 border-dashed border-input rounded-lg p-6 text-center">
                      <i className="fas fa-cloud-upload-alt text-3xl text-muted-foreground mb-4"></i>
                      <ObjectUploader
                        maxNumberOfFiles={5}
                        maxFileSize={10485760} // 10MB
                        onGetUploadParameters={handleGetUploadParameters}
                        onComplete={handleUploadComplete}
                        buttonClassName="text-primary font-medium hover:underline"
                      >
                        <span>Click to upload documents</span>
                      </ObjectUploader>
                      <p className="text-sm text-muted-foreground mt-2">PDF, DOCX, ZIP files up to 10MB each</p>
                      {uploadedDocuments.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm text-accent">{uploadedDocuments.length} file(s) uploaded successfully</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel data-testid="label-notes">Notes / Availability</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4} 
                            placeholder="Please share any additional information about your site's capabilities, availability, or specific requirements..." 
                            {...field} 
                            data-testid="textarea-notes"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Consent */}
                  <FormField
                    control={form.control}
                    name="consentGiven"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-consent"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            I agree to the processing of my data per GDPR and acknowledge electronic records/signatures under 21 CFR Part 11. *
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="text-center pt-6">
                    <Button 
                      type="submit" 
                      className="btn-primary text-lg px-12 py-4"
                      disabled={siteMutation.isPending}
                      data-testid="submit-site-application"
                    >
                      <i className="fas fa-paper-plane mr-2"></i>
                      {siteMutation.isPending ? "Submitting..." : "Submit Site Application"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
