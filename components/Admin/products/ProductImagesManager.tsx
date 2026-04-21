"use client";

import { ChangeEvent, useMemo, useState, useTransition } from "react";
import { Icon } from "@iconify/react";

import CardBox from "@/components/Admin/shared/CardBox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { updateProductImagesAction } from "@/app/(admin)/admin/products/actions";

interface ProductImagesManagerProps {
  productId: string;
  title: string;
  images: {
    id: string;
    url: string;
    alt: string | null;
  }[];
}

export default function ProductImagesManager({
  productId,
  title,
  images,
}: ProductImagesManagerProps) {
  const [imageUrlInputs, setImageUrlInputs] = useState<string[]>(
    images.length > 0 ? images.map((img) => img.url) : [""]
  );
  const [mainImageAlt, setMainImageAlt] = useState(images[0]?.alt || title);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filePreviewUrls = useMemo(() => {
    return selectedFiles.map((file) => ({
      name: file.name,
      preview: URL.createObjectURL(file),
    }));
  }, [selectedFiles]);

  const imageUrlPreviewList = useMemo(() => {
    return imageUrlInputs
      .map((url) => url.trim())
      .filter(Boolean)
      .map((url, index) => ({
        id: `url-${index}`,
        url,
      }));
  }, [imageUrlInputs]);

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  return (
    <CardBox className="p-5">
      <form
        action={(formData) => {
          startTransition(async () => {
            try {
              setError(null);
              await updateProductImagesAction(formData);
            } catch (err) {
              setError(
                err instanceof Error ? err.message : "Unable to update images."
              );
            }
          });
        }}
        className="space-y-5"
      >
        <input type="hidden" name="productId" value={productId} />

        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Images</h2>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Images"}
          </Button>
        </div>

        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        ) : null}

        <div className="space-y-2">
          <Label htmlFor="mainImageAlt">Main Image Alt</Label>
          <Input
            id="mainImageAlt"
            name="mainImageAlt"
            value={mainImageAlt}
            onChange={(e) => setMainImageAlt(e.target.value)}
            placeholder="Main image alt"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageFiles">Upload image(s)</Label>
          <Input
            id="imageFiles"
            name="imageFiles"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesChange}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <Label>Image URL(s)</Label>

            <Button
              type="button"
              variant="outline"
              onClick={() => setImageUrlInputs((prev) => [...prev, ""])}
            >
              <Icon icon="solar:add-circle-linear" width={18} className="mr-2" />
              Add URL
            </Button>
          </div>

          <div className="space-y-3">
            {imageUrlInputs.map((value, index) => (
              <div key={`image-url-${index}`} className="flex gap-2">
                <Input
                  name="imageUrls"
                  value={value}
                  onChange={(e) =>
                    setImageUrlInputs((prev) =>
                      prev.map((item, i) => (i === index ? e.target.value : item))
                    )
                  }
                  placeholder="https://example.com/image.jpg"
                />

                {imageUrlInputs.length > 1 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() =>
                      setImageUrlInputs((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                  >
                    Remove
                  </Button>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {(filePreviewUrls.length > 0 || imageUrlPreviewList.length > 0) && (
          <div className="space-y-4">
            <p className="text-sm font-medium">Preview</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filePreviewUrls.map((file, index) => (
                <div key={`file-preview-${index}`} className="rounded-xl border p-3">
                  <div className="aspect-square overflow-hidden rounded-lg bg-muted mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-xs line-clamp-2">{file.name}</p>
                </div>
              ))}

              {imageUrlPreviewList.map((item) => (
                <div key={item.id} className="rounded-xl border p-3">
                  <div className="aspect-square overflow-hidden rounded-lg bg-muted mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-xs break-all line-clamp-2">{item.url}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </CardBox>
  );
}