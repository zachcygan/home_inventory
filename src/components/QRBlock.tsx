"use client";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export default function QRBlock({ slug }: { slug: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const url = typeof window !== "undefined" ? `${window.location.origin}/bin/${slug}` : `/bin/${slug}`;

  useEffect(() => {
    if (!canvasRef.current) return;
    (async () => {
      await QRCode.toCanvas(canvasRef.current!, url, { width: 180, margin: 1 });
      const du = canvasRef.current!.toDataURL("image/png");
      setDataUrl(du);
    })();
  }, [url]);

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas ref={canvasRef} className="rounded border bg-white p-1" />
      {dataUrl && (
        <a download={`bin-${slug}.png`} href={dataUrl} className="text-sm text-blue-600 hover:underline">
          Download QR
        </a>
      )}
      <p className="text-xs text-slate-600">Scan to open this bin.</p>
    </div>
  );
}
