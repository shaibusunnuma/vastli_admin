import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Restaurant, Step } from "@/types/restaurants";
import { SettingsAndHoursSchema, SettingsAndHoursType, OperatingHoursType } from "./schemas"; // Adjust path
import NumberInput from "@/components/number-input";
import { TimeIntervalInput } from "@/components/TimeIntervalInput";
import { Separator } from "@/components/ui/separator";
import WeekdayInput from "./week-day-input";

interface Props {
  restaurant: Partial<Restaurant>;
  setRestaurant: React.Dispatch<React.SetStateAction<Partial<Restaurant>>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
}

function RestaurantSettings({ restaurant, setRestaurant, setCurrentStep }: Props) {
  const { reservationSettings, operatingHours } = restaurant;

  const form = useForm<SettingsAndHoursType>({
    resolver: zodResolver(SettingsAndHoursSchema),
    defaultValues: {
      reservationSettings: {
        ...reservationSettings,
      },
      operatingHours: {
        ...operatingHours,
      },
    },
  });

  const { watch, setValue, trigger } = form;
  const useIndividualDaySettings = watch("operatingHours.useIndividualDaySettings");

  const onSubmit = (data: SettingsAndHoursType) => {
    console.log("Settings Data:", data);
    setRestaurant((prev) => ({
      ...prev,
      reservationSettings: { ...prev.reservationSettings, ...data.reservationSettings },
      operatingHours: { ...prev.operatingHours, ...data.operatingHours },
    }));
    setCurrentStep("3"); // Or your next step
  };

  const applyWeekdaysToAll = async () => {
    const weekdaysValue = watch("operatingHours.weekdays");
    const isValid = await trigger("operatingHours.weekdays");
    if (!isValid || !weekdaysValue) {
      console.warn("Cannot apply empty or invalid weekday hours.");
      return;
    }
    setValue("operatingHours.monday", weekdaysValue, { shouldValidate: true });
    setValue("operatingHours.tuesday", weekdaysValue, { shouldValidate: true });
    setValue("operatingHours.wednesday", weekdaysValue, { shouldValidate: true });
    setValue("operatingHours.thursday", weekdaysValue, { shouldValidate: true });
    setValue("operatingHours.friday", weekdaysValue, { shouldValidate: true });
  };

  const applyWeekendsToAll = async () => {
    const weekendsValue = watch("operatingHours.weekends");
    const isValid = await trigger("operatingHours.weekends");
    if (!isValid || !weekendsValue) {
      console.warn("Cannot apply empty or invalid weekend hours.");
      return;
    }
    setValue("operatingHours.saturday", weekendsValue, { shouldValidate: true });
    setValue("operatingHours.sunday", weekendsValue, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={() => setCurrentStep("4")}>
      {/* <form onSubmit={form.handleSubmit(onSubmit)}> */}
        <Card>
          <CardHeader>
            <CardTitle>Restaurant Settings & Hours</CardTitle>
            <CardDescription>Configure reservation settings and operating hours.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {" "}
            {/* Increased spacing */}
            {/* Reservation Settings Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Reservation Settings</h3>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {" "}
                {/* Use grid for layout */}
                <FormField
                  control={form.control}
                  name="reservationSettings.timeSlotInterval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Slot Interval (minutes)</FormLabel>
                      <FormControl>
                        {/* Use web NumberInput */}
                        <NumberInput
                          min={15} // From schema
                          max={120} // From schema
                          interval={15} // Example interval step
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      </FormControl>
                      <FormDescription>Choose between 15-120 minutes.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reservationSettings.maxBookingDaysInAdvance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Days in Advance</FormLabel>
                      <FormControl>
                        <NumberInput
                          min={1} // From schema
                          max={90} // From schema
                          interval={1}
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      </FormControl>
                      <FormDescription>How many days ahead can customers book (1-90).</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="reservationSettings.minGuestsPerReservation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Guests per Reservation</FormLabel>
                      <FormControl>
                        <NumberInput
                          min={1} // From schema
                          max={20} // From schema
                          interval={1}
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reservationSettings.maxGuestsPerReservation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Guests per Reservation</FormLabel>
                      <FormControl>
                        <NumberInput
                          min={1} // From schema
                          max={50} // From schema
                          interval={1}
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Switch controls */}
              <FormField
                control={form.control}
                name="reservationSettings.allowSelfBookingManagement"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Allow Self Booking Management</FormLabel>
                      <FormDescription>Enable this to allow customers to modify or cancel their own reservations.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reservationSettings.autoConfirmReservations"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Auto-confirm Reservations</FormLabel>
                      <FormDescription>When enabled, reservations meeting criteria will be automatically confirmed.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Operating Hours Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Operating Hours</h3>
              <Separator />

              <FormField
                control={form.control}
                name="operatingHours.useIndividualDaySettings"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Use Individual Day Settings</FormLabel>
                      <FormDescription>Turn on to set specific hours for each day. If off, use Weekday/Weekend fields.</FormDescription>
                      <FormMessage /> {/* Display errors related to the switch itself if any */}
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly // Added for accessibility context
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Conditional Rendering based on the switch */}
              {!useIndividualDaySettings ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <FormField
                    control={form.control}
                    name="operatingHours.weekdays"
                    render={({ field }) => (
                      <FormItem>
                        {/* Added required indicator based on schema logic */}
                        <FormLabel>
                          Weekdays <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <TimeIntervalInput {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormDescription>Monday to Friday (required when individual days are off)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="operatingHours.weekends"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weekends</FormLabel>
                        <FormControl>
                          <TimeIntervalInput {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormDescription>Saturday and Sunday (optional)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <div className="space-y-6 pt-2">
                  {/* Weekday Inputs */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="font-medium">Weekdays</p>
                        <p className="text-sm text-muted-foreground">Leave empty to mark as closed.</p>
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={applyWeekdaysToAll}>
                        Apply Weekday Hours to All Weekdays
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <WeekdayInput day="monday" />
                      <WeekdayInput day="tuesday" />
                      <WeekdayInput day="wednesday" />
                      <WeekdayInput day="thursday" />
                      <WeekdayInput day="friday" />
                    </div>
                  </div>

                  <Separator />

                  {/* Weekend Inputs */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="font-medium">Weekends</p>
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={applyWeekendsToAll}>
                        Apply Weekend Hours to All Weekend Days
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <WeekdayInput day="saturday" />
                      <WeekdayInput day="sunday" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={()=>setCurrentStep("2")}>
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

export default RestaurantSettings;
