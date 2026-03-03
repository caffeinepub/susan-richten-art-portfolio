import React from 'react';
import { useLazyLoad } from '../hooks/useLazyLoad';

interface PlaceholderImageProps {
  width?: number | string;
  height?: number | string;
  label?: string;
  className?: string;
  src?: string;
  alt?: string;
  style?: React.CSSProperties;
}

export function PlaceholderImage({
  width = '100%',
  height = 300,
  label,
  className = '',
  src,
  alt,
  style,
}: PlaceholderImageProps) {
  const { ref, isVisible } = useLazyLoad();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
    >
      {isVisible && (
        <>
          {src ? (
            <img
              src={src}
              alt={alt || label || ''}
              className="w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: 1 }}
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ backgroundColor: 'oklch(0.963 0.018 80)' }}
            />
          )}
        </>
      )}
      {!isVisible && (
        <div
          className="w-full h-full"
          style={{ backgroundColor: 'oklch(0.963 0.018 80)' }}
        />
      )}
    </div>
  );
}

export default PlaceholderImage;
