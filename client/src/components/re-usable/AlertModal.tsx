import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialogue"
import { Button } from "../ui/Button"

interface AlertDialogBoxProps {
  triggerLabel: React.ReactElement
  title: string
  description: string
  cancelText?: string
  actionText?: string
  onAction?: () => void
  onCancel?: () => void
  triggerVariant?: "default" | "outline" | "destructive"
}

export function AlertDialogBox({
  triggerLabel,
  title,
  description,
  cancelText = "Cancel",
  actionText = "Continue",
  onAction,
  onCancel,
  triggerVariant = "outline",
}: AlertDialogBoxProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="!bg-white text-black border !border-black" variant={triggerVariant}>{triggerLabel}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black text-white flex flex-col  items-center w-82">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300 text-xs">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-md text-red-700" onClick={onCancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction className="rounded-md text-green-700"  onClick={onAction}>{actionText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
