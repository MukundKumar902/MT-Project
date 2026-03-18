'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sliders, Download, RotateCw } from 'lucide-react';

export default function PhotoEditorPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          setImage(img);
          applyFilters(img, brightness, contrast, saturation, blur);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const applyFilters = (img: HTMLImageElement, b: number, c: number, s: number, bl: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%) blur(${bl}px)`;
    ctx.drawImage(img, 0, 0);
  };

  const handleBrightnessChange = (value: number) => {
    setBrightness(value);
    if (image) applyFilters(image, value, contrast, saturation, blur);
  };

  const handleContrastChange = (value: number) => {
    setContrast(value);
    if (image) applyFilters(image, brightness, value, saturation, blur);
  };

  const handleSaturationChange = (value: number) => {
    setSaturation(value);
    if (image) applyFilters(image, brightness, contrast, value, blur);
  };

  const handleBlurChange = (value: number) => {
    setBlur(value);
    if (image) applyFilters(image, brightness, contrast, saturation, value);
  };

  const handleReset = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setBlur(0);
    if (image) applyFilters(image, 100, 100, 100, 0);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'edited-photo.png';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Photo Editor</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-primary/30 p-6">
              {image ? (
                <canvas
                  ref={canvasRef}
                  className="w-full max-h-96 object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-96 bg-secondary rounded-lg">
                  <p className="text-muted-foreground">Upload an image to start editing</p>
                </div>
              )}
            </Card>
          </div>

          {/* Controls */}
          <Card className="bg-card border-primary/30 p-6 h-fit">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sliders className="w-5 h-5" />
              Adjustments
            </h2>

            <div className="space-y-6">
              {/* Upload Button */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Upload Image
                </Button>
              </div>

              {image && (
                <>
                  {/* Brightness */}
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Brightness: {brightness}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={brightness}
                      onChange={(e) => handleBrightnessChange(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Contrast */}
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Contrast: {contrast}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={contrast}
                      onChange={(e) => handleContrastChange(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Saturation */}
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Saturation: {saturation}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={saturation}
                      onChange={(e) => handleSaturationChange(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Blur */}
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Blur: {blur}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={blur}
                      onChange={(e) => handleBlurChange(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary/10"
                    >
                      <RotateCw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <Button
                      onClick={handleDownload}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
