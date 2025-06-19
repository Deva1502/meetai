import { ResponsiveDialog } from "@/components/responsive-dialog";
import MeetingForm from "./meeting-form";
import { MeetingGetOne } from "../../types";
// import {MeetingForm} from "./meeting-form"
// import MeetingForm from "./Meeting-form";

interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingDialogProps) => {
  return (
    <ResponsiveDialog
      title="Update Meeting"
      description="Update Meeting Dialog"
      open={open}
      onOpenChange={onOpenChange}
    >
      {/* todo:Meeting form */}
      <MeetingForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
