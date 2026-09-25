import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Build a Sanity CDN URL for an image, e.g. `urlFor(photo).width(400).url()`. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}
