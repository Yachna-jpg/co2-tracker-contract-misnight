import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Share2, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';

const Certificates = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <span>Certificates</span>
        <span>/</span>
        <span className="text-foreground font-medium">CERT-001</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* NFT Preview */}
        <div className="flex justify-center items-start">
          <div className="relative w-full max-w-[450px] aspect-[3/4] rounded-xl overflow-hidden border border-border shadow-2xl bg-card">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>

            <div className="relative h-full flex flex-col p-8 z-10">
              <div className="flex justify-between items-start">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm shadow-sm gap-1">
                  <CheckCircle2 className="h-3 w-3 text-success" />
                  Verified
                </Badge>
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm shadow-sm">
                  NFT
                </Badge>
              </div>

              <div className="mt-auto text-center space-y-4">
                <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Certificate NFT</p>
                <h2 className="text-3xl font-bold font-serif leading-tight">Amazon Rainforest Restoration</h2>
                <p className="text-xs text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
                  This certificate represents the removal of greenhouse gases through verified carbon sequestration
                  projects.
                </p>

                <div className="py-6 border-y border-border/50 my-6">
                  <div className="text-4xl font-bold text-success mb-1">1,000 tCO₂</div>
                  <div className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
                    Carbon Dioxide Removed
                  </div>
                </div>

                <div className="text-sm font-mono text-muted-foreground">CERT-001</div>
                <div className="text-xs text-muted-foreground">Issued on May 15, 2026</div>

                <div className="flex justify-center mt-6">
                  <div className="bg-white p-2 rounded">
                    <QrCode className="h-16 w-16 text-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="space-y-6">
          <div className="space-y-2 border-b pb-6">
            <h1 className="text-3xl font-bold tracking-tight">Amazon Rainforest Restoration</h1>
            <p className="text-muted-foreground leading-relaxed">
              This certificate represents the removal of greenhouse gases through verified carbon sequestration projects
              in the Amazon Rainforest.
            </p>
          </div>

          <Card className="bg-muted/30 border-dashed">
            <CardContent className="p-4 flex gap-4 items-center">
              <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5 text-success" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Zero-Knowledge Verified</h4>
                <p className="text-xs text-muted-foreground">
                  Verified on Midnight Blockchain using zero-knowledge proof. Your privacy is protected.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Certificate Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Certificate ID</span>
                <span className="font-mono font-medium">CERT-001</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Project Type</span>
                <span className="font-medium">Nature Based</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">Brazil</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Issued On</span>
                <span className="font-medium">May 15, 2026</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium text-success">1,000 tCO₂</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Standard</span>
                <span className="font-medium">Verra VCS</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Registry ID</span>
                <span className="font-medium font-mono">VCS-12345</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Blockchain Proof</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm relative">
              <div className="absolute left-6 top-6 bottom-6 w-px bg-border z-0"></div>

              <div className="relative z-10 flex gap-4">
                <div className="h-4 w-4 mt-0.5 rounded-full bg-background border-2 border-primary shrink-0"></div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">Certificate Minted</span>
                    <span className="font-mono text-xs text-muted-foreground">Tx: 0x812...ab21</span>
                  </div>
                  <p className="text-xs text-muted-foreground">May 15, 2026 10:30 AM</p>
                </div>
              </div>

              <div className="relative z-10 flex gap-4">
                <div className="h-4 w-4 mt-0.5 rounded-full bg-background border-2 border-primary shrink-0"></div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">Project Verified</span>
                    <span className="font-mono text-xs text-muted-foreground">Tx: 0x7a3...cd11</span>
                  </div>
                  <p className="text-xs text-muted-foreground">May 15, 2026 10:25 AM</p>
                </div>
              </div>

              <div className="relative z-10 flex gap-4">
                <div className="h-4 w-4 mt-0.5 rounded-full bg-background border-2 border-success shrink-0"></div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-success">Data Verified (ZK Proof)</span>
                    <span className="font-mono text-xs text-muted-foreground">Tx: 0xa31...de44</span>
                  </div>
                  <p className="text-xs text-muted-foreground">May 15, 2026 10:20 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Certificate
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share Certificate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
