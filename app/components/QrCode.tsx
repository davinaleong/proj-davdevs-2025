import Link from 'next/link'
import ImageDisplay from "./../components/ImageDisplay"
import PulseOnHover from "../components/animations/PulseOnHover"
import FbQr from './../assets/images/qr-codes/fb-qr.png'
import GhQr from './../assets/images/qr-codes/gh-qr.png'
import IgQr from './../assets/images/qr-codes/ig-qr.png'
import LiQr from './../assets/images/qr-codes/li-qr.png'
import ThQr from './../assets/images/qr-codes/th-qr.png'
import YtQr from './../assets/images/qr-codes/yt-qr.png'

type Platform = 'facebook' | 'github' | 'instagram' | 'linkedin' | 'threads' | 'youtube';

interface QrCodeProps {
  platform: Platform;
  href: string;
  label?: string;
  className?: string;
  external?: boolean;
}

const QR_DATA = {
  facebook: { 
    image: FbQr, 
    defaultLabel: 'Facebook',
    alt: 'Facebook QR Code'
  },
  github: { 
    image: GhQr, 
    defaultLabel: 'GitHub',
    alt: 'GitHub QR Code'
  },
  instagram: { 
    image: IgQr, 
    defaultLabel: 'Instagram',
    alt: 'Instagram QR Code'
  },
  linkedin: { 
    image: LiQr, 
    defaultLabel: 'LinkedIn',
    alt: 'LinkedIn QR Code'
  },
  threads: { 
    image: ThQr, 
    defaultLabel: 'Threads',
    alt: 'Threads QR Code'
  },
  youtube: { 
    image: YtQr, 
    defaultLabel: 'YouTube',
    alt: 'YouTube QR Code'
  }
} as const;

export default function QrCode({ 
  platform, 
  href, 
  label, 
  className = "",
  external = true 
}: QrCodeProps) {
  const qrData = QR_DATA[platform];
  const displayLabel = label || qrData.defaultLabel;
  
  const linkProps = external 
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <PulseOnHover>
      <Link 
        href={href} 
        {...linkProps}
        className={`w-30 flex flex-col items-center bg-gray-100 dark:bg-slate-900 shadow-lg hover:opacity-60 transition-opacity gap-2 p-2 rounded-sm ${className}`}
      >
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center">
          {displayLabel}
        </p>

        <ImageDisplay 
          src={qrData.image.src}
          alt={qrData.alt}
          aspectRatio="square"
          className="bg-white p-1 rounded-sm"
        />
      </Link>
    </PulseOnHover>
  );
}