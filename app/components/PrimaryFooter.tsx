import Link from "next/link";

interface PrimaryFooterProps {
    className?: string;
    showSocialLinks?: boolean;
}

export default function PrimaryFooter({ 
    className = "", 
    showSocialLinks = true 
}: PrimaryFooterProps) {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className={`bg-blue-700 text-white p-4 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                {/* Brand Section */}
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold mb-2">Dav/Devs</h3>
                    <p className="text-blue-100 text-sm max-w-[30ch]">
                        Designing with purpose. Building with code. Living by faith.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="text-center">
                    <h4 className="font-semibold mb-3">Quick Links</h4>
                    <nav className="space-y-2">
                        <Link 
                            href="/portfolio" 
                            className="block text-blue-100 hover:text-white transition-colors text-sm"
                        >
                            Portfolio
                        </Link>
                        <Link 
                            href="/articles" 
                            className="block text-blue-100 hover:text-white transition-colors text-sm"
                        >
                            Articles
                        </Link>
                        <Link 
                            href="/tools" 
                            className="block text-blue-100 hover:text-white transition-colors text-sm"
                        >
                            Tools
                        </Link>
                    </nav>
                </div>

                {/* Contact/Social */}
                <div className="text-center md:text-right">
                    <h4 className="font-semibold mb-3">Connect</h4>
                    {showSocialLinks && (
                        <div className="space-y-2 mb-4">
                            <Link 
                                href="mailto:hello@davdevs.me" 
                                className="block text-blue-100 hover:text-white transition-colors text-sm"
                            >
                                hello@davdevs.me
                            </Link>
                            <Link 
                                href="https://github.com/davinaleong" 
                                className="block text-blue-100 hover:text-white transition-colors text-sm"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </Link>
                            <Link 
                                href="https://linkedin.com/in/davina-leong" 
                                className="block text-blue-100 hover:text-white transition-colors text-sm"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Divider */}
            <hr className="border-blue-600 mb-6" />

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                <p className="text-blue-100 text-center md:text-left">
                    Dav/Devs &copy; 2019-{currentYear} Davina Leong. All rights reserved.
                </p>
                
                <div className="flex items-center gap-4">
                    <Link 
                        href="/terms" 
                        className="text-blue-100 hover:text-white underline transition-colors"
                    >
                        Terms
                    </Link>
                    <Link 
                        href="/privacy" 
                        className="text-blue-100 hover:text-white underline transition-colors"
                    >
                        Privacy
                    </Link>
                    <Link 
                        href="/sitemap" 
                        className="text-blue-100 hover:text-white underline transition-colors"
                    >
                        Sitemap
                    </Link>
                </div>
            </div>
        </footer>
    )
}