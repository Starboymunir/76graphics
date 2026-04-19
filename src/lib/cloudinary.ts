/**
 * Server-side-only Cloudinary helpers.
 * Import only from API routes or Server Components.
 */
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export interface CloudinaryImage {
  publicId: string;
  url: string;
  width: number;
  height: number;
  createdAt: string;
  context?: Record<string, string>;
  tags?: string[];
}

/** Upload a Buffer to Cloudinary under the given section folder */
export async function uploadImage(
  buffer: Buffer,
  section: string,
  context?: Record<string, string>
): Promise<CloudinaryImage> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `76graphics/${section}`,
        resource_type: "image",
        context,
      },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("Upload failed"));
        resolve({
          publicId: result.public_id,
          url: result.secure_url,
          width: result.width,
          height: result.height,
          createdAt: result.created_at,
          context: ((result.context as Record<string, Record<string, string>> | undefined)?.custom) ?? {},
          tags: result.tags ?? [],
        });
      }
    );
    stream.end(buffer);
  });
}

/** List all images in a Cloudinary section folder */
export async function listImages(section: string): Promise<CloudinaryImage[]> {
  const result = await cloudinary.api.resources({
    type: "upload",
    prefix: `76graphics/${section}`,
    max_results: 200,
    context: true,
    tags: true,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return result.resources.map((r: any) => ({
    publicId: r.public_id,
    url: r.secure_url,
    width: r.width,
    height: r.height,
    createdAt: r.created_at,
    context: r.context?.custom ?? {},
    tags: r.tags ?? [],
  }));
}

/** Delete an image by its Cloudinary public_id */
export async function deleteImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}
