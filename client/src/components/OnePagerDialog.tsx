import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Download, Mail, KeyRound, CheckCircle2 } from "lucide-react";

interface OnePagerDialogProps {
  trigger: React.ReactNode;
}

export default function OnePagerDialog({ trigger }: OnePagerDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [requestData, setRequestData] = useState({ name: "", email: "", company: "", role: "", reason: "" });
  const [codeData, setCodeData] = useState({ email: "", code: "" });
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const requestMutation = useMutation({
    mutationFn: async (data: typeof requestData) => {
      const res = await apiRequest("POST", "/api/access-request", data);
      return res.json();
    },
    onSuccess: () => {
      setRequestSubmitted(true);
      toast({ title: "Request Submitted", description: "We will review your request and email you an authorization code." });
    },
    onError: () => {
      toast({ title: "Error", description: "Could not submit request. Please check your information and try again.", variant: "destructive" });
    },
  });

  const validateMutation = useMutation({
    mutationFn: async (data: typeof codeData) => {
      const res = await apiRequest("POST", "/api/validate-code", data);
      return res.json();
    },
    onSuccess: (data) => {
      if (data.success && data.downloadUrl) {
        toast({ title: "Access Granted", description: "Your download will start now." });
        const link = document.createElement("a");
        link.href = data.downloadUrl;
        link.download = "MCG-OnePager.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => setOpen(false), 1000);
      }
    },
    onError: () => {
      toast({ title: "Invalid Code", description: "The authorization code is invalid, expired, or already used.", variant: "destructive" });
    },
  });

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setRequestSubmitted(false); }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg" data-testid="one-pager-dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download Our One-Pager
          </DialogTitle>
          <DialogDescription>
            Access to our company one-pager is restricted to authorized recruiters and pharmaceutical sponsors.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="code" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code" data-testid="tab-have-code">
              <KeyRound className="h-4 w-4 mr-2" />
              I Have a Code
            </TabsTrigger>
            <TabsTrigger value="request" data-testid="tab-request-access">
              <Mail className="h-4 w-4 mr-2" />
              Request Access
            </TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Enter the email and authorization code you received from Monache Consulting Group.
            </p>
            <div className="space-y-3">
              <div>
                <Label htmlFor="code-email">Email</Label>
                <Input
                  id="code-email"
                  type="email"
                  placeholder="your@email.com"
                  value={codeData.email}
                  onChange={(e) => setCodeData({ ...codeData, email: e.target.value })}
                  data-testid="input-code-email"
                />
              </div>
              <div>
                <Label htmlFor="code-input">Authorization Code</Label>
                <Input
                  id="code-input"
                  placeholder="e.g. A1B2C3D4"
                  value={codeData.code}
                  onChange={(e) => setCodeData({ ...codeData, code: e.target.value.toUpperCase() })}
                  className="font-mono tracking-wider"
                  data-testid="input-code"
                />
              </div>
              <Button
                className="w-full btn-primary"
                onClick={() => validateMutation.mutate(codeData)}
                disabled={validateMutation.isPending || !codeData.email || !codeData.code}
                data-testid="button-validate-code"
              >
                <Download className="h-4 w-4 mr-2" />
                {validateMutation.isPending ? "Validating..." : "Validate & Download"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="request" className="space-y-4 mt-4">
            {requestSubmitted ? (
              <div className="text-center py-6 space-y-3" data-testid="request-success">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
                <h3 className="font-semibold text-lg">Request Submitted!</h3>
                <p className="text-sm text-muted-foreground">
                  Thank you. Once approved, you will receive an authorization code at <strong>{requestData.email}</strong>. 
                  Use it on the "I Have a Code" tab to download.
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  Submit a request and we will email you an authorization code after approval.
                </p>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="req-name">Full Name *</Label>
                    <Input id="req-name" value={requestData.name} onChange={(e) => setRequestData({ ...requestData, name: e.target.value })} data-testid="input-request-name" />
                  </div>
                  <div>
                    <Label htmlFor="req-email">Email *</Label>
                    <Input id="req-email" type="email" value={requestData.email} onChange={(e) => setRequestData({ ...requestData, email: e.target.value })} data-testid="input-request-email" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="req-company">Company *</Label>
                      <Input id="req-company" value={requestData.company} onChange={(e) => setRequestData({ ...requestData, company: e.target.value })} data-testid="input-request-company" />
                    </div>
                    <div>
                      <Label htmlFor="req-role">Role *</Label>
                      <Input id="req-role" placeholder="e.g. Recruiter" value={requestData.role} onChange={(e) => setRequestData({ ...requestData, role: e.target.value })} data-testid="input-request-role" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="req-reason">Reason for Request</Label>
                    <Textarea id="req-reason" rows={2} value={requestData.reason} onChange={(e) => setRequestData({ ...requestData, reason: e.target.value })} data-testid="input-request-reason" />
                  </div>
                  <Button
                    className="w-full btn-primary"
                    onClick={() => requestMutation.mutate(requestData)}
                    disabled={requestMutation.isPending || !requestData.name || !requestData.email || !requestData.company || !requestData.role}
                    data-testid="button-submit-request"
                  >
                    {requestMutation.isPending ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
