import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Lock, KeyRound, Mail, CheckCircle, XCircle, Clock, Copy } from "lucide-react";

interface AccessRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  reason: string | null;
  status: string;
  createdAt: string;
}

interface AccessCode {
  id: string;
  code: string;
  email: string;
  used: boolean;
  usedAt: string | null;
  createdAt: string;
}

export default function Admin() {
  const { toast } = useToast();
  const [password, setPassword] = useState(() => sessionStorage.getItem("mcg_admin_pw") || "");
  const [authed, setAuthed] = useState(false);
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [issueEmail, setIssueEmail] = useState("");

  async function api(path: string, opts: RequestInit = {}) {
    const res = await fetch(path, {
      ...opts,
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
        ...(opts.headers || {}),
      },
    });
    if (res.status === 401) throw new Error("Unauthorized");
    return res.json();
  }

  async function loadData() {
    try {
      const [reqRes, codeRes] = await Promise.all([
        api("/api/admin/access-requests"),
        api("/api/admin/access-codes"),
      ]);
      setRequests(reqRes.requests || []);
      setCodes(codeRes.codes || []);
      setAuthed(true);
      sessionStorage.setItem("mcg_admin_pw", password);
    } catch {
      setAuthed(false);
      sessionStorage.removeItem("mcg_admin_pw");
      toast({ title: "Unauthorized", description: "Incorrect password.", variant: "destructive" });
    }
  }

  useEffect(() => {
    if (password) loadData();
  }, []);

  async function issueCode(email: string) {
    try {
      const res = await api("/api/admin/issue-code", { method: "POST", body: JSON.stringify({ email }) });
      if (res.success) {
        toast({ title: "Code Issued", description: `Code ${res.code.code} created for ${email}. Email it to the recruiter.` });
        loadData();
        setIssueEmail("");
      }
    } catch {
      toast({ title: "Error", description: "Could not issue code.", variant: "destructive" });
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      await api(`/api/admin/access-requests/${id}/status`, { method: "POST", body: JSON.stringify({ status }) });
      loadData();
    } catch {
      toast({ title: "Error", description: "Could not update status.", variant: "destructive" });
    }
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    toast({ title: "Copied", description: `Code ${code} copied to clipboard.` });
  }

  if (!authed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="admin-pw">Admin Password</Label>
              <Input
                id="admin-pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && loadData()}
                data-testid="input-admin-password"
              />
            </div>
            <Button className="w-full btn-primary" onClick={loadData} data-testid="button-admin-login">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-3xl">Admin Dashboard</h1>
        <Button variant="outline" onClick={() => { sessionStorage.removeItem("mcg_admin_pw"); setAuthed(false); setPassword(""); }} data-testid="button-logout">
          Sign Out
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Quick Issue Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="recipient@email.com"
              value={issueEmail}
              onChange={(e) => setIssueEmail(e.target.value)}
              data-testid="input-issue-email"
            />
            <Button
              className="btn-primary"
              onClick={() => issueCode(issueEmail)}
              disabled={!issueEmail.includes("@")}
              data-testid="button-issue-code"
            >
              Generate Code
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Generate an authorization code for an email address, then send it manually via email.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Access Requests ({requests.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <p className="text-muted-foreground text-sm">No access requests yet.</p>
          ) : (
            <div className="space-y-3">
              {requests.map((r) => (
                <div key={r.id} className="border rounded-lg p-4" data-testid={`request-${r.id}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{r.name}</h3>
                        <Badge variant={r.status === "approved" ? "default" : r.status === "denied" ? "destructive" : "secondary"}>
                          {r.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.email} • {r.company} • {r.role}</p>
                      {r.reason && <p className="text-sm mt-2">{r.reason}</p>}
                      <p className="text-xs text-muted-foreground mt-2">{new Date(r.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {r.status === "pending" && (
                        <>
                          <Button size="sm" onClick={() => { updateStatus(r.id, "approved"); issueCode(r.email); }} data-testid={`button-approve-${r.id}`}>
                            <CheckCircle className="h-4 w-4 mr-1" /> Approve & Issue Code
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, "denied")} data-testid={`button-deny-${r.id}`}>
                            <XCircle className="h-4 w-4 mr-1" /> Deny
                          </Button>
                        </>
                      )}
                      {r.status !== "pending" && (
                        <Button size="sm" variant="outline" onClick={() => issueCode(r.email)} data-testid={`button-reissue-${r.id}`}>
                          <KeyRound className="h-4 w-4 mr-1" /> Issue Code
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Authorization Codes ({codes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {codes.length === 0 ? (
            <p className="text-muted-foreground text-sm">No codes issued yet.</p>
          ) : (
            <div className="space-y-2">
              {codes.map((c) => (
                <div key={c.id} className="flex items-center justify-between border rounded-lg p-3" data-testid={`code-${c.id}`}>
                  <div className="flex items-center gap-4">
                    <code className="font-mono font-bold text-lg tracking-wider">{c.code}</code>
                    <div className="text-sm">
                      <p>{c.email}</p>
                      <p className="text-xs text-muted-foreground">Created: {new Date(c.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.used ? (
                      <Badge variant="secondary"><CheckCircle className="h-3 w-3 mr-1" /> Used</Badge>
                    ) : (
                      <Badge variant="default"><Clock className="h-3 w-3 mr-1" /> Active</Badge>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => copyCode(c.code)} data-testid={`button-copy-${c.id}`}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
