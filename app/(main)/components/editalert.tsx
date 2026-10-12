"use client";

import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import {
  addContributor,
  updateContributor,
  Contributor,
} from "@/app/api/slice/metaData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import CustomText from "./custom_text";
import { CountryDropdown } from "./country_dropdown";
import EditorInput from "./editor_input";
import { FaEdit } from "react-icons/fa";

interface EditContributorDialogProps {
  editIndex?: number; // undefined when adding new contributor
  triggerLabel?: string; // custom button label (e.g. "Edit" or "Add Contributor")
}

export default function EditContributorDialog({
  editIndex,
}: EditContributorDialogProps) {
  const dispatch = useAppDispatch();
  const contributor = useAppSelector((state) => state.meta);
  const [open, setOpen] = useState(false);
  // const [emailCheck, setEmailCheck] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<Contributor>({
    name: "",
    giveName: "",
    publicName: "",
    homeurl: "",
    orcid: "",
    bio: "",
    email: "",
    role: "Author",
    primaryContact: false,
    principleContact: false,
    inBrowserlist: false,
    country: "Select a Country",
    affiliation: "",
  });

  // Prefill form if editing
  useEffect(() => {
    if (editIndex !== undefined && contributor.contributorsList[editIndex]) {
      setForm(contributor.contributorsList[editIndex]);
    }
  }, [editIndex, contributor.contributorsList]);

  const handleClear = () => {
    setForm({
      name: "",
      giveName: "",
      publicName: "",
      homeurl: "",
      orcid: "",
      bio: "",
      email: "",
      role: "Author",
      primaryContact: false,
      principleContact: false,
      inBrowserlist: false,
      country: "Select a Country",
      affiliation: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    // Handle checkbox separately
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement; // narrow type
      setForm((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const checkDuplications = (email: string) => {
    const isDuplicate = contributor.contributorsList.some(
      (val: Contributor, idx: number) =>
        val.email === email && idx !== editIndex, // exclude self when editing
    );

    if (isDuplicate) {
      setError("Please use a different email. No duplication allowed.");
      // setEmailCheck(true);
    } else {
      setError("");
      // setEmailCheck(false);
    }
    return isDuplicate;
  };

  const handleSubmit = () => {
    if (
      !form.publicName ||
      !form.email ||
      form.country === "Select a Country"
    ) {
      setError("All * fields are required");
      return;
    }

    if (checkDuplications(form.email)) return;

    if (editIndex !== undefined) {
      // update existing contributor
      dispatch(updateContributor({ index: editIndex, contributor: form }));
    } else {
      // add new contributor
      dispatch(addContributor(form));
    }

    handleClear();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FaEdit />

        {/* <button className="bg-[#00b4d8] hover:bg-[#0096c7] text-white px-4 py-2 rounded-md">
          {triggerLabel}
        </button> */}
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editIndex !== undefined ? "Edit Contributor" : "Add Contributor"}
          </DialogTitle>
          <DialogDescription>
            {editIndex !== undefined
              ? "Update contributor information below."
              : "Enter contributor information below. Fields marked with * are required."}
          </DialogDescription>
        </DialogHeader>

        {/* form */}
        <form className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Given Name</label>
            <input
              name="giveName"
              value={form.giveName}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="e.g. Ali"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Family Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="e.g. Khan"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">
              Preferred Public Name*
            </label>
            <input
              name="publicName"
              value={form.publicName}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email*</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, email: e.target.value }));
                checkDuplications(e.target.value);
              }}
              className="w-full border rounded-md p-2"
              placeholder="e.g. name@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Country*</label>
            <CountryDropdown
              onChange={(val) =>
                setForm((prev) => ({ ...prev, country: val.name }))
              }
              placeholder={form.country}
              defaultValue={form.country}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Home URL</label>
            <input
              name="homeurl"
              value={form.homeurl}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="https://www.google.com/"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">ORCID</label>
            <input
              name="orcid"
              value={form.orcid}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="https://orcid.org/0000-0002-1825-0097"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">Affiliation</label>
            <input
              name="affiliation"
              value={form.affiliation}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="Department, University"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">Bio Statement</label>
            <EditorInput
              style="mb-10 w-full"
              onChange={(v) => setForm((prev) => ({ ...prev, bio: v }))}
              value={form.bio}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Contributor&apos;s Role*
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="Author">Author</option>
              <option value="Translator">Translator</option>
              <option value="Editor">Editor</option>
            </select>
          </div>

          <div className="col-span-2 flex flex-col gap-2 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="primaryContact"
                checked={form.primaryContact}
                onChange={handleChange}
              />
              Principal contact for editorial correspondence.
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="inBrowserlist"
                checked={form.inBrowserlist}
                onChange={handleChange}
              />
              Include this contributor in browse lists?
            </label>
          </div>
        </form>

        {error && <CustomText text={error} style={"text-red-400"} />}

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <button className="border border-gray-400 rounded-md px-4 py-2">
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={handleSubmit}
            className="bg-[#00b4d8] hover:bg-[#0096c7] text-white px-4 py-2 rounded-md"
          >
            {editIndex !== undefined ? "Update" : "Save"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
