import HomeSection from '../../HomeSection'
import QrCode from '../../QrCode'
import siteLinks from '../../../data/site-links.json'

export default function HomeSocialSection() {
    return (
      <HomeSection title="Social Media" variant="primary-light">
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 place-items-center max-w-4xl mx-auto">
            {siteLinks.socialLinks
              .filter(link => link.label !== "leong.shi.yun@gmail.com")
              .map((link) => {
                const platform = link.label.toLowerCase() as "linkedin" | "github" | "youtube" | "instagram" | "facebook" | "threads";
                return (
                  <QrCode 
                    key={link.label}
                    platform={platform} 
                    href={link.href}
                    label={link.label}
                  />
                );
              })}
          </div>
        </div>
      </HomeSection>
    )
}