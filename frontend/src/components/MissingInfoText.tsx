import React from 'react';

interface MissingInfoTextProps {
  text?: string;
  className?: string;
}

export function MissingInfoText({ text = 'Artist needs to enter info here', className = '' }: MissingInfoTextProps) {
  return (
    <span className={`italic text-charcoal-muted/60 ${className}`}>
      {text}
    </span>
  );
}

export default MissingInfoText;
