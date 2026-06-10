const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const optimizableImage = /\.(png|jpe?g)$/i;

export function assetPath(path: string) {
  let resolvedPath = path;

  if (optimizableImage.test(path) && !path.startsWith("/optimized/")) {
    resolvedPath = `/optimized${path.replace(optimizableImage, ".webp")}`;
  }

  if (!resolvedPath.startsWith("/") || resolvedPath.startsWith(basePath)) {
    return resolvedPath;
  }

  return `${basePath}${resolvedPath}`;
}
