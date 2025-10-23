/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentUser } from "@/actions/users";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import ExperiencesTable from "./_components/experiences-table";
import { getExperiencesByUserId } from "@/actions/experiences";
import UploadResume from "@/components/functional/UploadResume";

export default async function ExperiencesPage() {
  const userResponse: any = await getCurrentUser();
  const openResume = false;
  if (!userResponse.success) {
    return <div>Failed to load user data</div>;
  }

  const experiencesResponse = await getExperiencesByUserId(
    userResponse?.data?.id
  );

  if (!experiencesResponse.success) {
    return <div>Failed to load projects</div>;
  }

  const experiences: any = experiencesResponse.data;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Experiences</h1>
        <div className="flex justify-end gap-2">
          <Button>
            <Link href="/account/experiences/add">Add Experience</Link>
          </Button>
          <UploadResume openResume={openResume} />
        </div>
      </div>
      <ExperiencesTable experiences={experiences} />
    </div>
  );
}
