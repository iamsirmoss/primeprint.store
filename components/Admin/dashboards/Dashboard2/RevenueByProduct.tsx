"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import SimpleBar from "simplebar-react";
import CardBox from "../../shared/CardBox";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const RevenueByProduct = () => {
  const dropdownItems = ["Sep 2024", "Oct 2024", "Nov 2024"];
  const [activeTab, setActiveTab] = useState("App");

  const ProductTableData = [
    {
      img: "/images/products/dash-prd-1.jpg",
      project: "Minecraf App",
      name: "Jason Roy",
      progrsss: "73.2%",
      variant: "lightWarning",
      statustext: "Medium",
      money: "$3.5K",
    },
    {
      img: "/images/products/dash-prd-2.jpg",
      project: "Web App Project",
      name: "Mathew Flintoff",
      progrsss: "73.2%",
      variant: "lightInfo",
      statustext: "Very High",
      money: "$24.5K",
    },
    {
      img: "/images/products/dash-prd-3.jpg",
      project: "Modernize Dashboard",
      name: "Anil Kumar",
      progrsss: "73.2%",
      variant: "lightSuccess",
      statustext: "Low",
      money: "$12.8K",
    },
    {
      img: "/images/products/dash-prd-4.jpg",
      project: "Dashboard Co",
      name: "George Cruize",
      progrsss: "73.2%",
      variant: "lightError",
      statustext: "High",
      money: "$2.4K",
    },
  ];

  const ProductTableData2 = [
    {
      img: "/images/products/dash-prd-2.jpg",
      project: "Web App Project",
      name: "Mathew Flintoff",
      progrsss: "73.2%",
      variant: "lightError",
      statustext: "Very High",
      money: "$24.5K",
    },
    {
      img: "/images/products/dash-prd-3.jpg",
      project: "Modernize Dashboard",
      name: "Anil Kumar",
      progrsss: "73.2%",
      variant: "lightSuccess",
      statustext: "Low",
      money: "$12.8K",
    },
    {
      img: "/images/products/dash-prd-1.jpg",
      project: "Minecraf App",
      name: "Jason Roy",
      progrsss: "73.2%",
      variant: "lightWarning",
      statustext: "Medium",
      money: "$3.5K",
    },
    {
      img: "/images/products/dash-prd-4.jpg",
      project: "Dashboard Co",
      name: "George Cruize",
      progrsss: "73.2%",
      variant: "lightError",
      statustext: "High",
      money: "$2.4K",
    },
  ];

  const renderTable = (data: any[]) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="border-b border-bordergray dark:border-darkborder">
          <TableRow>
            <TableHead className="py-2 px-3 ps-0 text-ld font-normal">
              Assigned
            </TableHead>
            <TableHead className="text-ld font-normal">Progress</TableHead>
            <TableHead className="text-ld font-normal">Priority</TableHead>
            <TableHead className="text-ld font-normal">Budget</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-bordergray dark:divide-darkborder">
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="whitespace-nowrap ps-0">
                <div className="flex gap-3 items-center">
                  <Image
                    src={item.img}
                    alt="icon"
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-tw"
                  />
                  <div className="truncate line-clamp-2 sm:text-wrap max-w-56">
                    <h6 className="text-sm">{item.project}</h6>
                    <p>{item.name}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <p className="text-sm card-subtitle">{item.progrsss}</p>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <Badge
                  variant={item?.variant}
                >
                  {item.statustext}
                </Badge>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <p className="text-ld">{item.money}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <CardBox className="pb-3 px-6">
      <div className="sm:flex justify-between align-baseline">
        <div>
          <h5 className="card-title">Revenue by Product</h5>
        </div>
        <Select>
          <SelectTrigger className="w-fit sm:my-0 my-4">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {dropdownItems.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto">
        <SimpleBar>
          <div className="flex gap-4">
            {["App", "Mobile", "SasS", "Others"].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-6 rounded-sm cursor-pointer text-dark text-sm font-semibold text-center flex gap-2 items-center bg-muted dark:bg-dark hover:bg-lightprimary dark:hover:bg-lightprimary ${activeTab === tab
                  ? "text-white bg-primary dark:bg-primary hover:bg-primaryemphasis dark:hover:bg-primaryemphasis"
                  : "dark:text-white hover:text-primary dark:hover:text-primary"
                  }`}
              >
                <Icon
                  icon={
                    tab === "App"
                      ? "solar:widget-linear"
                      : tab === "Mobile"
                        ? "solar:smartphone-line-duotone"
                        : tab === "SasS"
                          ? "solar:calculator-linear"
                          : "solar:folder-open-outline"
                  }
                  className={`${activeTab === tab ? "opacity-100" : "opacity-50"}`}
                  height={16}
                />
                {tab}
              </div>
            ))}
          </div>
        </SimpleBar>
      </div>

      {/* Tab Content */}
      {activeTab === "App" && renderTable(ProductTableData)}
      {activeTab === "Mobile" && renderTable(ProductTableData2)}
      {activeTab === "SasS" && renderTable(ProductTableData)}
      {activeTab === "Others" && renderTable(ProductTableData2)}
    </CardBox>
  );
};

export default RevenueByProduct;
