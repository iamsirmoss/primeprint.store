import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface ReturnButtonProps {
      href: string;
      label: string;
}

const ReturnButton = ({ href, label }: ReturnButtonProps) => {
  return (
      <Button size="lg" asChild className="rounded-xl mb-2.5 transition-all duration-300 bg-black/55 hover:bg-black">
            <Link href={href}>
                  <ArrowLeftIcon />
                  {label}
            </Link>
      </Button>
  )
}

export default ReturnButton
