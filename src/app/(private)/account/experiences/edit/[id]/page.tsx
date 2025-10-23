import { getExperienceById } from "@/actions/experiences";
import React from "react";
import ExperienceForm from "../../_components/experience-form";

interface IEditExperienceProps {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({
  params,
}: IEditExperienceProps) {
  const { id } = await params;
  const experienceResponse = await getExperienceById(id);
  if (!experienceResponse.success) {
    return <div>{experienceResponse.message}</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Update Experience</h1>
      <ExperienceForm initialValues={experienceResponse.data} formType="edit" />
    </div>
  );
}
