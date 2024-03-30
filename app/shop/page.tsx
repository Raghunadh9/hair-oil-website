import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ICONS } from "@/components/shared/components/icons";
const page = () => {
  return (
    <div className="my-[50px] px-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="upto425:text-[10px] " href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>{ICONS.rightArrow}</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink className="upto425:text-[10px] ">
              Shop
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>{ICONS.rightArrow}</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="upto425:text-[10px] ">
              All
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default page;
