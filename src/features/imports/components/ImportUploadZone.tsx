"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Loader2, Upload } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Button } from "@/src/shared/components/ui/button";
import { ImportJob } from "../types";
import { ImportStatusBadge } from "./ImportStatusBadge";
import { cn } from "@/src/shared/utils/utils";

interface ImportUploadZoneProps {
  onUpload: (file: File) => Promise<void>;
  uploading: boolean;
  recentJobs: ImportJob[];
  labels: {
    title: string;
    subtitle: string;
    browse: string;
    dragHint: string;
    supportedFormats: string;
    fileName: string;
    fileSize: string;
    uploadedAt: string;
    status: string;
    statusLabels: Record<string, string>;
  };
  locale: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ImportUploadZone({
  onUpload,
  uploading,
  recentJobs,
  labels,
  locale,
}: ImportUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.name.toLowerCase().endsWith(".csv")) {
        return;
      }
      await onUpload(file);
    },
    [onUpload]
  );

  const onDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const recentUploads = recentJobs.slice(0, 3);

  return (
    <div data-testid="imports-upload-zone" className="space-y-4">
      <Card
        className={cn(
          "relative overflow-hidden rounded-xl border-2 border-dashed p-8 transition-colors",
          dragOver ? "border-primary bg-primary/5" : "border-border/50 bg-card/50"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          data-testid="imports-file-input"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              await handleFile(file);
              e.target.value = "";
            }
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            {uploading ? (
              <Loader2 className="h-7 w-7 animate-spin text-primary" />
            ) : (
              <Upload className="h-7 w-7 text-primary" />
            )}
          </div>
          <h3 className="text-lg font-semibold">{labels.title}</h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">{labels.subtitle}</p>
          <p className="mt-1 text-xs text-muted-foreground">{labels.dragHint}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{labels.supportedFormats}</p>
          <Button
            type="button"
            data-testid="imports-browse-btn"
            className="mt-4 gap-2"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="h-4 w-4" />
            {labels.browse}
          </Button>
        </motion.div>
      </Card>

      {recentUploads.length > 0 && (
        <div className="space-y-2">
          {recentUploads.map((job) => (
            <Card
              key={job.id}
              className="flex items-center justify-between gap-4 rounded-xl border-border/50 bg-card/50 p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{job.fileName}</p>
                  <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                    <span>
                      {labels.fileSize}: {formatFileSize(job.fileSize)}
                    </span>
                    <span>
                      {labels.uploadedAt}:{" "}
                      {new Date(job.createdAt).toLocaleString(locale, {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <ImportStatusBadge
                status={job.status}
                label={labels.statusLabels[job.status] ?? job.status}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
