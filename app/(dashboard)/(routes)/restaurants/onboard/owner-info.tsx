import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Restaurant } from "@/types/restaurants";
import { OwnerInfoSchema, OwnerInfoType } from "./schemas"; // Adjust path if needed

interface Props {
  restaurant: Partial<Restaurant>;
  setRestaurant: React.Dispatch<React.SetStateAction<Partial<Restaurant>>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<string>>;
}

function OwnerInfo({ restaurant, setRestaurant, setCurrentStep }: Props) {
  const form = useForm<OwnerInfoType>({
    resolver: zodResolver(OwnerInfoSchema),
    defaultValues: {
      ...restaurant.contact,
    },
  });

  const onSubmit = (data: OwnerInfoType) => {
    // Merge validated data into the main restaurant state
    // setRestaurant(prev => ({
    //     ...prev,
    //     contact: { ...prev.contact, ...data.contact },
    //     website: data.website,
    //     operatingHours: { ...prev.operatingHours, ...data.operatingHours } // Merge operating hours
    //     // Add owner details if managed here
    // }));
    setCurrentStep("menu-settings"); // Navigate to the next step
  };

  const handlePrevious = () => {
    // Optionally trigger validation before going back if desired
    // form.trigger().then(isValid => { ... });
    setCurrentStep("basic-info");
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone" {...field} />
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
            <Button type="button" variant="ghost" onClick={handlePrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button type="submit">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export default OwnerInfo;
