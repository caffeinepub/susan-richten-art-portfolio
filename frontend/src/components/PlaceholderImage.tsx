import { useLazyLoad } from '../hooks/useLazyLoad';

interface PlaceholderImageProps {
  src?: string;
  alt?: string;
  className?: string;
  aspectRatio?: string;
}

export default function PlaceholderImage({ src, alt = '', className = '', aspectRatio }: PlaceholderImageProps) {
  const { ref, isVisible } = useLazyLoad();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-warm-beige ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {isVisible && src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-warm-beige" />
      )}
    </div>
  );
}
