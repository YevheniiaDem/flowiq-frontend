import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { FileText, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
  return (
    <MainLayout>
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
            <p className="text-sm text-muted-foreground">
              Generate and download business reports
            </p>
          </div>
          <Button className="rounded-lg" size="sm">
            <Download className="mr-2 h-3.5 w-3.5" />
            Generate Report
          </Button>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Monthly P&L", date: "December 2026" },
            { title: "Cash Flow Statement", date: "Q4 2026" },
            { title: "Expense Breakdown", date: "December 2026" },
            { title: "Revenue by Source", date: "December 2026" },
            { title: "Customer Analytics", date: "December 2026" },
            { title: "Yearly Summary", date: "2026" },
          ].map((report, i) => (
            <Card
              key={i}
              className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-1 text-sm font-semibold">{report.title}</h3>
              <p className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {report.date}
              </p>
              <Button variant="outline" size="sm" className="w-full rounded-lg text-xs">
                <Download className="mr-2 h-3 w-3" />
                Download
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
