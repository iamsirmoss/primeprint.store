"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const Search = () => {

  return (
     <Dialog>
      <form>
        <DialogTrigger asChild>
          <div className="flex flex-col items-center cursor-pointer text-xs group">
            <SearchIcon
              className="cursor-pointer group-hover:text-black/45 transition-all duration-500"
            />
            <h5 className="text-xs md:text-sm group-hover:text-black/45 transition-all duration-500 font-semibold">Search</h5>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>
              Type in the product name you are looking for.
            </DialogDescription>
          </DialogHeader>
              <div className="mt-2 w-full mx-auto flex items-center gap-3 bg-transparent p-3 border-b-2 border-black">
                <SearchIcon className="text-2xl md:text-3xl" color="black" />
                <input
                  className="w-full outline-none border-none bg-transparent py-1 text-xs placeholder-gray-500"
                  placeholder="Search for products, services, and more..."
                />
              </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default Search;
