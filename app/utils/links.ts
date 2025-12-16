import siteLinksData from "../data/site-links.json";

export interface LinkItem {
    label: string;
    href: string;
    external: boolean;
}

export interface SiteLinks {
    brand: {
        href: string;
        external: boolean;
    };
    navigation: LinkItem[];
    socialLinks: LinkItem[];
    legalLinks: LinkItem[];
}

// Get all site links
export const getSiteLinks = (): SiteLinks => siteLinksData as SiteLinks;

// Get specific link categories
export const getBrandLink = () => siteLinksData.brand;
export const getNavigationLinks = () => siteLinksData.navigation;
export const getSocialLinks = () => siteLinksData.socialLinks;
export const getLegalLinks = () => siteLinksData.legalLinks;

// Get filtered navigation links (useful for different contexts)
export const getMainNavigationLinks = () => 
    siteLinksData.navigation.filter(link => link.label !== "Home");

export const getFooterNavigationLinks = () => 
    siteLinksData.navigation.filter(link => 
       ["Resume", "Timeline", "Portfolio", "Articles", "Tools", "Python", "FEM", "Faith"].includes(link.label)
    );

// Helper function to get link props for external links
export const getLinkProps = (link: LinkItem) => {
    return link.external 
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};
};

// Find specific links
export const findLinkByHref = (href: string): LinkItem | undefined => {
    return siteLinksData.navigation.find(link => link.href === href) ||
           siteLinksData.socialLinks.find(link => link.href === href) ||
           siteLinksData.legalLinks.find(link => link.href === href);
};

export const findLinkByLabel = (label: string): LinkItem | undefined => {
    return siteLinksData.navigation.find(link => link.label === label) ||
           siteLinksData.socialLinks.find(link => link.label === label) ||
           siteLinksData.legalLinks.find(link => link.label === label);
};