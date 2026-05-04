import { ExclamationMarkIcon } from "@phosphor-icons/react";
import {
  ArchiveIcon,
  ArrowCounterClockwiseIcon,
  CheckIcon,
  CopyIcon,
  PushPinIcon,
  TrashIcon,
} from "@phosphor-icons/react/ssr";
import { toast as sonnerToast } from "sonner";

export const toast = {
  success: (message: string) =>
    sonnerToast(message, { icon: <CheckIcon className="size-4" /> }),
  copy: (message: string) =>
    sonnerToast(message, { icon: <CopyIcon className="size-4" /> }),
  restore: (message: string) =>
    sonnerToast(message, {
      icon: <ArrowCounterClockwiseIcon className="size-4" />,
    }),
  pin: (message: string) =>
    sonnerToast(message, { icon: <PushPinIcon className="size-4" /> }),
  archive: (message: string) =>
    sonnerToast(message, { icon: <ArchiveIcon className="size-4" /> }),
  trash: (message: string) =>
    sonnerToast(message, { icon: <TrashIcon className="size-4" /> }),
  error: (message: string) =>
    sonnerToast(message, { icon: <ExclamationMarkIcon className="size-4" /> }),
};
