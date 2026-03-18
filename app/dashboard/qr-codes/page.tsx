'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Download } from 'lucide-react';

export default function QRCodePage() {
  const [text, setText] = useState('https://example.com');
  const [qrCode, setQrCode] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async () => {
    if (!text.trim()) return;

    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setQrCode(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">QR Code Generator</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="bg-card border-primary/30 p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Generate QR Code</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Enter text or URL
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text, URL, or data to encode..."
                  className="w-full h-32 p-3 bg-secondary border border-primary/30 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <Button
                onClick={generateQR}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Generate QR Code
              </Button>
            </div>
          </Card>

          {/* Display Section */}
          <Card className="bg-card border-primary/30 p-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold text-foreground mb-4">QR Code</h2>

            {qrCode ? (
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="bg-white p-4 rounded-lg">
                  <img
                    src={qrCode}
                    alt="Generated QR Code"
                    className="w-64 h-64"
                  />
                </div>
                <Button
                  onClick={downloadQR}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>QR code will appear here</p>
              </div>
            )}
          </Card>
        </div>

        {/* Info */}
        <Card className="bg-secondary border-primary/30 p-6 mt-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">About QR Codes</h3>
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>✓ Encode URLs, text, phone numbers, emails, and more</li>
            <li>✓ Compatible with any QR code scanner</li>
            <li>✓ Download as PNG image</li>
            <li>✓ Generate unlimited QR codes</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
