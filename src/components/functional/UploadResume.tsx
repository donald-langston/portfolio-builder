/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { uploadFileAndGetUrl } from "@/helpers/uploads";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import { updateCurrentUser } from "@/actions/users";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface UploadResumeProps {
  openResume: boolean;
}

function UploadResume({ openResume }: UploadResumeProps) {
  const [openResumeForm, setOpenResumeForm] = useState(openResume);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = usersGlobalStore() as IUsersGlobalStore;

  const formSchema = z.object({
    resume: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resume: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const payload: any = { ...values };
      
      if (selectedFile) {
        payload.resume = await uploadFileAndGetUrl(selectedFile);
      }

      payload.id = user?.id;
      let response: any = null;

      response = await updateCurrentUser(payload);

      if (response.success) {
        toast.success(response.message);
        setOpenResumeForm(false);
      } else {
        toast.error(response.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog open={openResumeForm} onOpenChange={setOpenResumeForm}>
      <DialogTrigger asChild>
        <Button>Upload Resume</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"Upload Resume"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 mt-7"
          >
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Resume</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setSelectedFile(e.target.files![0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-5">
              <Button
                disabled={loading}
                variant="secondary"
                onClick={() => setOpenResumeForm(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UploadResume;
