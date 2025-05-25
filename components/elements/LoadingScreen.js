import Image from 'next/image';
import logo from '@/app/just_logo.png';

export default function LoadingScreen({ isVisible = true }) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
            <div className="relative">
                <Image
                    src={logo}
                    alt="Logo"
                    width={100}
                    height={100}
                    className="animate-pulse"
                />
                <div className="absolute -inset-4 border-t-4 border-[#43c3ff] rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
