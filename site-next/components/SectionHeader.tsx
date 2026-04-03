interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeader({ label, title, description, center }: SectionHeaderProps): React.ReactElement {
  return (
    <div className={`section-header ${center ? 'center' : ''}`}>
      <span className="section-label">{label}</span>
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
      {description && <p className="section-desc">{description}</p>}
    </div>
  );
}
