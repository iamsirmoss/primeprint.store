"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RiSearch2Line } from "react-icons/ri";
import { IoSearchCircleSharp } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type SearchProduct = {
  id: string;
  slug: string;
  title: string;
  price: number;
  currency: string;
  images: string[];
};

type SearchService = {
  id: string;
  slug: string;
  title: string;
};

type SearchSubService = {
  id: string;
  slug: string;
  title: string;
  service: {
    slug: string;
    title: string;
  };
};

type SearchResponse = {
  products: SearchProduct[];
  services: SearchService[];
  subServices: SearchSubService[];
};

const Search = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState<SearchResponse>({
    products: [],
    services: [],
    subServices: [],
  });

  const trimmedQuery = query.trim();

  const totalResults = useMemo(() => {
    return (
      results.products.length +
      results.services.length +
      results.subServices.length
    );
  }, [results]);

  useEffect(() => {
    if (!open) return;

    if (trimmedQuery.length < 2) {
      setResults({
        products: [],
        services: [],
        subServices: [],
      });
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/search?q=${encodeURIComponent(trimmedQuery)}`,
          {
            signal: controller.signal,
          }
        );

        if (!res.ok) throw new Error("Search failed");

        const data: SearchResponse = await res.json();
        setResults(data);
      } catch (error: any) {
        if (error?.name !== "AbortError") {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmedQuery, open]);

  const handleFullSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!trimmedQuery) return;

    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const goTo = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex flex-col items-center cursor-pointer text-xs group">
          <IoSearchCircleSharp className="text-[25px] md:text-[31px] cursor-pointer text-black/90 group-hover:text-black transition-all duration-500" />
          <h5 className="text-xs md:text-sm group-hover:underline transition-all duration-500 font-medium">
            Search
          </h5>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">

        <form onSubmit={handleFullSearch}>
          <div className="mt-2 w-full mx-auto flex items-center gap-3 bg-transparent p-3 border-b-2 border-black">
            <RiSearch2Line className="text-2xl md:text-3xl shrink-0" />

            <input
              className="w-full outline-none border-none bg-transparent py-1 text-xs placeholder-gray-500"
              placeholder="Search for products or services..."
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              autoFocus
            />

            {loading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
          </div>

          <div className="mt-4 max-h-[420px] overflow-y-auto">
            {trimmedQuery.length < 2 ? (
              <div className="rounded-md border bg-gray-50 p-4 text-xs text-gray-500">
                Type at least 2 characters to start searching.
              </div>
            ) : totalResults === 0 && !loading ? (
              <div className="rounded-md border bg-gray-50 p-4 text-sm text-gray-500">
                No results found.
              </div>
            ) : (
              <div className="space-y-5">
                {/* Products */}
                {results.products.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold uppercase underline">
                      Products
                    </h4>
                    <div className="space-y-2">
                      {results.products.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => goTo(`/product/${item.slug}`)}
                          className="w-full rounded-md border p-3 text-left hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                        >
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div>
                              <p className="text-sm md:text-base font-bold capitalize text-red-400">{item.title}</p>
                              <p className="mt-1 text-xs underline text-gray-400">
                                Product
                              </p>
                            </div>
                            <p className="text-xs md:text-sm font-semibold">
                              {item.price.toFixed(2)} {item.currency}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services */}
                {results.services.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold uppercase underline">
                      Services
                    </h4>
                    <div className="space-y-2">
                      {results.services.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => goTo(`/service/${item.slug}`)}
                          className="w-full rounded-md border p-3 text-left hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                        >
                          <p className="text-sm md:text-base font-bold capitalize text-blue-400">{item.title}</p>
                          <p className="mt-1 text-xs underline text-gray-400">Service</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-services */}
                {results.subServices.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold uppercase underline">
                      Sub-services
                    </h4>
                    <div className="space-y-2">
                      {results.subServices.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            goTo(`/service/sub-service/${item.slug}`)
                          }
                          className="w-full rounded-md border p-3 text-left hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                        >
                          <p className="text-sm md:text-base font-bold capitalize">{item.title}</p>
                          <p className="mt-1 text-xs underline text-gray-400">
                            Under: {item.service.title}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {trimmedQuery.length >= 2 && (
            <div className="mt-4 flex justify-end text-sm md:text-base">
              <Button type="submit" className="cursor-pointer">
                View all results
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Search;