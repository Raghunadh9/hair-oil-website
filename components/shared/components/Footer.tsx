import { config } from "@/config/config";
import { footerLinks } from "@/config/constants";
import Image from "next/image";
import Link from "next/link";

type ColumnProps = {
  title: string;
  links: Array<string>;
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="footer_column">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link href="/" key={link}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = () => (
  <section className="flexStart footer border-t-1 border-gray-200 bg-[#F0F0F0]">
    <div className="flex flex-col gap-12 w-full">
      <div className="flex items-start flex-col">
        <Image src="/logo.svg" width={80} height={20} alt="logo" />

        <p className="text-start text-sm font-normal mt-5 max-w-xs">
          {config.websiteTitle} is the {config.websiteGreatness}
        </p>
      </div>
      <div className="flex flex-wrap gap-12">
        <FooterColumn
          title={footerLinks[0].title}
          links={footerLinks[0].links}
        />

        <div className="flex-1 flex flex-col gap-4">
          <FooterColumn
            title={footerLinks[1].title}
            links={footerLinks[1].links}
          />
          <FooterColumn
            title={footerLinks[2].title}
            links={footerLinks[2].links}
          />
        </div>

        <FooterColumn
          title={footerLinks[3].title}
          links={footerLinks[3].links}
        />

        <div className="flex-1 flex flex-col gap-4">
          <FooterColumn
            title={footerLinks[4].title}
            links={footerLinks[4].links}
          />
          <FooterColumn
            title={footerLinks[5].title}
            links={footerLinks[5].links}
          />
        </div>

        <FooterColumn
          title={footerLinks[6].title}
          links={footerLinks[6].links}
        />
      </div>
    </div>

    <div className="flexBetween footer_copyright">
      <p>@ 2024 {config.websiteTitle} All rights reserved</p>
    </div>
  </section>
);

export default Footer;
