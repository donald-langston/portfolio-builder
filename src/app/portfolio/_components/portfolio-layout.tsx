/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getConfiguration } from "@/actions/configuration";
import { Spinner } from "@/components/ui/spinner";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    show_educations: true,
    show_percentage_in_educations: true,
    show_icons_in_skills: true,
    show_levels_in_skills: true,
  });

  const params = useParams();
  const pathName = usePathname();
  const router = useRouter();
  const userId: any = params?.id;

  const fetchConfiguration = async () => {
    try {
      setLoading(true);
      const response = await getConfiguration(userId);
      if (response.success && response.data) {
        setConfig(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfiguration();
  }, []);

  let menuItems = [
    {
      name: "Home",
      path: `/portfolio/${params.id}`,
    },
    {
      name: "Education",
      path: `/portfolio/${params.id}/educations`,
    },
    {
      name: "Experience",
      path: `/portfolio/${params.id}/experiences`,
    },
    {
      name: "Projects",
      path: `/portfolio/${params.id}/projects`,
    },
    {
      name: "Contact",
      path: `/portfolio/${params.id}/contactus`,
    },
  ];

  if (config.show_educations === false) {
    menuItems = menuItems.filter((item) => item.name !== "Education");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="lg:px-24 px-5">
      <div className="bg-primary text-white flex items-center justify-center p-5 gap-7 rounded-b-2xl">
        {menuItems.map((item, index) => (
          <div
            className={`cursor-pointer p-3 text-sm ${
              pathName === item.path ? "bg-gray-300 rounded text-primary" : ""
            } `}
            key={index}
            onClick={() => {
              router.push(item.path);
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
