import React from "react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowRight } from "lucide-react";
import { Restaurant, Step } from "@/types/restaurants";
import { OwnerInfoSchema, OwnerInfoType } from "./schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import { useAddOperatorMutation } from "@/lib/services/users/userApiSlice";
import { toast } from "sonner";
import logger from "@/lib/logger";
import { UserRole } from "@/types/users";
import { useAddAccountMutation } from "@/lib/services/account/accountApiSlice";
interface Props {
  restaurant: Partial<Restaurant>;
  setRestaurant: React.Dispatch<React.SetStateAction<Partial<Restaurant>>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
}

function OwnerInfo({ restaurant, setRestaurant, setCurrentStep }: Props) {
  const [createOperator] = useAddOperatorMutation();
  const [createAccount] = useAddAccountMutation();
  const form = useForm<OwnerInfoType>({
    resolver: zodResolver(OwnerInfoSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: OwnerInfoType) => {
    try {
      const account = await createAccount({}).unwrap();
      const op = await createOperator({
        ...data,
        primaryEmailAddress: {
          emailAddress: data.email,
          verified: false,
        },
        role: UserRole.OWNER,
        accountId: account.id,
      }).unwrap();
      setRestaurant({ ...restaurant, ownerId: op.id, accountId: account.id });
      setCurrentStep("2");
    } catch (error: any) {
      logger.error(error);
      const msg = error.data.message || "Error creating restaurant";
      toast.error(msg);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Owner Information</CardTitle>
            <CardDescription>Enter owner details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone*</FormLabel>
                    <FormControl>
                      <PhoneInput placeholder="Enter phone" {...field} defaultCountry="GH" countries={["GH"]} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div />
            <Button type="submit">
              {isSubmitting ? "Saving..." : " Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export default OwnerInfo;
