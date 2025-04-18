import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useUpdateOperatorMutation } from "@/lib/services/users/userApiSlice";
import { Operator, UserStatus } from "@/types/users";
import { toast } from "sonner";
import logger from "@/lib/logger";

interface DeactivateUserMenuItemProps {
  user: Operator;
}

export default function DeactivateUserMenuItem({ user }: DeactivateUserMenuItemProps) {
  const [updateOperator, { isLoading }] = useUpdateOperatorMutation();

  const handleDeactivate = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await updateOperator({ id: user.id, status: UserStatus.INACTIVE }).unwrap();
      toast.success("User deactivated");
    } catch (error: any) {
      logger.error(error);
      const msg = error?.data?.message || "Failed to deactivate user";
      toast.error(msg);
    }
  };

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isLoading || user.status === UserStatus.INACTIVE}
      onClick={handleDeactivate}
    >
      {isLoading ? "Deactivating..." : user.status === UserStatus.INACTIVE ? "Inactive" : "Deactivate"}
    </DropdownMenuItem>
  );
}
