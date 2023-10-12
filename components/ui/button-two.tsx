import Link from 'next/link';
import ExternalArrow from '@/components/ui/external-arrow';

type ButtonProps = {
  text: string;
  url: string;
  style?: string;
  email?: string;
  size?: string;
};

const ButtonTwo: React.FC<ButtonProps> = ({ text, url, style = 'default', email, size='lg' }) => {
  const isInternal = url && url.includes('hikeclerb.com');
  const path = isInternal ? new URL(url).pathname : url;
  const href = email ? `mailto:${email}` : path;
  const className = `btn-${style} btn-${size}`.trim();

  return (
    <Link href={href} className={className}>
      {text}
      {!isInternal && href !== `mailto:${email}` && <ExternalArrow />}
    </Link>
  );
};

export default ButtonTwo;
