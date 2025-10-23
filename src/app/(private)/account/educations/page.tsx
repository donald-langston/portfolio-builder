/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import EducationsTable from "./_components/educations-table";
import { getCurrentUser } from "@/actions/users";
import { getEducationsByUserId } from "@/actions/educations";

export default async function EducationsPage() {
    const userResponse: any = await getCurrentUser();
      if (!userResponse.success) {
        return <div>Failed to load user data</div>;
      }
    
      const educationsResponse = await getEducationsByUserId(
        userResponse?.data?.id
      );
    
      if (!educationsResponse.success) {
        return <div>Failed to load projects</div>;
      }
    
      const educations: any = educationsResponse.data;
    
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Educations</h1>
        <Button>
          <Link href="/account/experiences/add">Add Education</Link>
        </Button>
      </div>

      <EducationsTable educations={educations} />
    </div>
  );
}
