import Anchor from "./Anchor";
import ImageDisplay from "./ImageDisplay";
import Logo from "./../assets/images/logos/logo.svg"
import { getFooterNavigationLinks, getSocialLinks, getLegalLinks, type LinkItem } from "../utils/site-config";

interface PrimaryFooterProps {
    className?: string;
    showSocialLinks?: boolean;
}

export default function PrimaryFooter({ 
    className = "", 
    showSocialLinks = true 
}: PrimaryFooterProps) {
    const currentYear = new Date().getFullYear();
    const footerNavigationLinks = getFooterNavigationLinks();
    const socialLinks = getSocialLinks();
    const legalLinks = getLegalLinks();

    const renderLink = (link: LinkItem) => {
        return (
            <Anchor 
                key={link.href}
                href={link.href}
                external={link.external}
                variant="footer"
                className="block text-sm"
            >
                {link.label}
            </Anchor>
        );
    };

    const renderLegalLink = (link: LinkItem) => {
        return (
            <Anchor 
                key={link.href}
                href={link.href}
                external={link.external}
                variant="footer-legal"
            >
                {link.label}
            </Anchor>
        );
    };
    
    return (
        <footer className={`bg-blue-700 text-white p-4 ${className} print:hidden`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                {/* Brand Section */}
                <Anchor href="/" variant="footer" className="text-center md:text-left flow">
                    <h3 className="text-lg font-bold mb-2">Dav/Devs</h3>
                    <p className="text-blue-100 text-sm">
                        Designing with purpose. Building with code. Living by faith.
                    </p>
                    <ImageDisplay src={Logo} alt="Dav/Devs Logo" aspectRatio="square" className="max-w-30" />
                </Anchor>

                {/* Quick Links */}
                <div className="text-center">
                    <h4 className="font-semibold mb-3">Quick Links</h4>
                    <nav className="space-y-2">
                        {footerNavigationLinks.map(renderLink)}
                    </nav>
                </div>

                {/* Contact/Social */}
                <div className="text-center md:text-right">
                    <h4 className="font-semibold mb-3">Connect</h4>
                    {showSocialLinks && (
                        <div className="space-y-2 mb-4">
                            {socialLinks.map(renderLink)}
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
                    {legalLinks.map(renderLegalLink)}
                </div>
            </div>
        </footer>
    )
}