"use client";

import CardBox from "../../shared/CardBox";

interface RecentContactItem {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  description?: string | null;
  createdAt: Date;
}

interface RecentContactsCardProps {
  contacts: RecentContactItem[];
}

const RecentContactsCard = ({ contacts }: RecentContactsCardProps) => {
  return (
    <CardBox className="p-5 h-full">
      <h2 className="text-lg font-semibold mb-4">Recent Contacts</h2>

      <div className="space-y-4">
        {contacts.length === 0 ? (
          <p className="text-sm text-slate-500">No contact messages yet.</p>
        ) : (
          contacts.map((contact) => (
            <div key={contact.id} className="rounded-xl border p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">{contact.name}</h3>
                <span className="text-xs text-slate-500">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                  }).format(contact.createdAt)}
                </span>
              </div>

              <p className="text-sm text-slate-500 mt-1">{contact.email}</p>

              {contact.subject ? (
                <p className="text-sm mt-2 font-medium">{contact.subject}</p>
              ) : null}

              {contact.description ? (
                <p className="text-sm text-slate-600 mt-1 line-clamp-3">
                  {contact.description}
                </p>
              ) : null}
            </div>
          ))
        )}
      </div>
    </CardBox>
  );
};

export default RecentContactsCard;