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

  // Get the pathname if the URL is internal
  const path = isInternal ? new URL(url).pathname : url;

  // Determine the final href, if there's an email it will prioritize it
  const href = email ? `mailto:${email}` : path;

  // Determine the final className based on style and whether it's an internal link
  const className = `${style} ${size} ${isInternal ? 'internal' : ''}`.trim();

  return (
    <Link href={href} className={className}>
      {text}
      {!isInternal && href !== `mailto:${email}` && <ExternalArrow />}
    </Link>
  );
};

export default ButtonTwo;
