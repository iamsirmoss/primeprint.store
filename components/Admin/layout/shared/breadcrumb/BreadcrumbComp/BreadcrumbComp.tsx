"use client";

import CardBox from "@/components/Admin/shared/CardBox"; 
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { JSX } from "react";

interface BreadCrumbType {
  subtitle?: string;
  items?: { title: string; to?: string }[];
  title: string;
  children?: JSX.Element;
}

const BreadcrumbComp = ({ items = [], title }: BreadCrumbType) => {
  return (
    <>
      <CardBox className="mb-[30px] py-4 px-4">
        <Breadcrumb className="flex justify-between items-center">
          <h6 className="text-base">{title}</h6>
          <div className="flex items-center gap-3">
            {items.map((item) => (
              <div key={item.title}>
                {item.to ? (
                  <BreadcrumbItem>
                    <a href={item.to} className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                      <Icon
                        icon="solar:home-2-line-duotone"
                        height={20}
                      />
                    </a>
                  </BreadcrumbItem>
                ) : (
                  <Badge variant="secondary" className="bg-lightprimary text-primary">
                    {item.title}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Breadcrumb>
      </CardBox>
    </>
  );
};

export default BreadcrumbComp;
