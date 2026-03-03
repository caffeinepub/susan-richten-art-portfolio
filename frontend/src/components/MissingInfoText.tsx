interface MissingInfoTextProps {
  text?: string;
  className?: string;
}

export default function MissingInfoText({ text = 'Information not available', className = '' }: MissingInfoTextProps) {
  return (
    <span className={`text-muted-foreground italic text-sm ${className}`}>
      {text}
    </span>
  );
}
