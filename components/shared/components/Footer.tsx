import { config } from "@/config/config";
import { footerLinks } from "@/config/constants";
import Image from "next/image";
import Link from "next/link";
import Logo from "./logo/logo";
import { ICONS } from "./icons";

type ColumnProps = {
  title: string;
  links: Array<string>;
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="footer_column">
    <h4 className="font-semibold text-white">{title}</h4>
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
  <section className="flexStart footer border-t-1 border-gray-200 bg-[#01BC8F] text-white">
    <div className="flex flex-col gap-12 w-full">
      <div className="flex items-start flex-col">
        <Logo />

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
        </div>
        <FooterColumn
          title={footerLinks[2].title}
          links={footerLinks[2].links}
        />
        <FooterColumn
          title={footerLinks[3].title}
          links={footerLinks[3].links}
        />
      </div>
      <div className="">
        <h3 className="text-2xl font-extrabold">PAYMENT</h3>
        <div className="flex gap-[10px] items-center">
          <div className="">{ICONS.securePayment}</div>
          <div className="">100% Secure Payment Protection</div>
        </div>
        <div className={"flex flex-wrap gap-[10px] mt-[1rem]"}>
          <Image
            className="object-cover border-2 border-[#ccc]"
            src="/images/checkout/upi.svg"
            alt="visa"
            width={50}
            height={50}
          />
          <Image
            className="object-cover border-2 border-[#ccc]"
            src="/images/checkout/visa.svg"
            alt="visa"
            width={50}
            height={50}
          />
          <Image
            className="object-contain bg-white border-2 border-[#ccc]"
            src="/images/checkout/mastercard.svg"
            alt="mastercard"
            width={50}
            height={50}
          />

          <Image
            className="object-cover border-2 border-[#ccc]"
            src="/images/checkout/rupay.svg"
            alt="visa"
            width={50}
            height={50}
          />

          {/* <Image
            className="object-cover border-2 border-[#ccc]"
            src="/images/checkout/razorpay.png"
            alt="razorpay"
            width={50}
            height={50}
          /> */}
        </div>
      </div>
    </div>

    <div className="flexBetween footer_copyright">
      <p>@ 2024 {config.websiteTitle} All rights reserved</p>
    </div>
  </section>
);

export default Footer;
