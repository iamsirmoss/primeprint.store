"use client";

import CardBox from "../../shared/CardBox";

interface AccessCardProps {
  role: string;
  email?: string | null;
  paidOrders: number;
  completedOrders: number;
  totalPackages: number;
  totalContacts: number;
}

const AccessCard = ({
  role,
  email,
  paidOrders,
  completedOrders,
  totalPackages,
  totalContacts,
}: AccessCardProps) => {
  return (
    <CardBox className="p-5 h-full">
      <p className="text-sm text-slate-500">Access Level</p>
      <h3 className="mt-2 text-xl font-bold">{role}</h3>

      <p className="mt-3 text-sm text-slate-500 break-all">
        Connected as {email || "No email"}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-500">Paid Orders</p>
          <h4 className="text-lg font-semibold mt-1">{paidOrders}</h4>
        </div>

        <div>
          <p className="text-xs text-slate-500">Completed</p>
          <h4 className="text-lg font-semibold mt-1">{completedOrders}</h4>
        </div>

        <div>
          <p className="text-xs text-slate-500">Packages</p>
          <h4 className="text-lg font-semibold mt-1">{totalPackages}</h4>
        </div>

        <div>
          <p className="text-xs text-slate-500">Contacts</p>
          <h4 className="text-lg font-semibold mt-1">{totalContacts}</h4>
        </div>
      </div>
    </CardBox>
  );
};

export default AccessCard;