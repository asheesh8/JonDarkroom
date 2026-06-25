"use client";

import {
  AdminPageHeader,
  MockNotice,
  Card,
  Field,
  TextInput,
  TextArea,
  SaveForm,
} from "@/components/admin/AdminForm";
import { businessInfo } from "@/data/businessInfo";

export default function AdminBusinessInfoPage() {
  return (
    <div>
      <AdminPageHeader
        title="Business Info"
        description="Update the shop's contact details, hours, and homepage announcement. These appear across the whole site."
      />
      <MockNotice />

      {/* TODO: persist to Supabase `business_info` (single row) and revalidate. */}
      <SaveForm submitLabel="Save business info">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contact */}
          <Card className="space-y-5">
            <h2 className="font-serif text-xl text-cream">Contact & address</h2>
            <Field label="Shop name" htmlFor="name">
              <TextInput id="name" name="name" defaultValue={businessInfo.name} />
            </Field>
            <Field label="Street" htmlFor="street">
              <TextInput
                id="street"
                name="street"
                defaultValue={businessInfo.address.street}
              />
            </Field>
            <div className="grid grid-cols-3 gap-3">
              <Field label="City" htmlFor="city">
                <TextInput
                  id="city"
                  name="city"
                  defaultValue={businessInfo.address.city}
                />
              </Field>
              <Field label="State" htmlFor="state">
                <TextInput
                  id="state"
                  name="state"
                  defaultValue={businessInfo.address.state}
                />
              </Field>
              <Field label="ZIP" htmlFor="zip">
                <TextInput
                  id="zip"
                  name="zip"
                  defaultValue={businessInfo.address.zip}
                />
              </Field>
            </div>
            <Field label="Phone" htmlFor="phone">
              <TextInput
                id="phone"
                name="phone"
                defaultValue={businessInfo.phoneDisplay}
              />
            </Field>
            <Field label="Email" htmlFor="email">
              <TextInput
                id="email"
                name="email"
                type="email"
                defaultValue={businessInfo.email}
              />
            </Field>
          </Card>

          {/* Hours */}
          <Card className="space-y-4">
            <h2 className="font-serif text-xl text-cream">Shop hours</h2>
            <div className="space-y-2.5">
              {businessInfo.hours.map((h) => (
                <div
                  key={h.day}
                  className="grid grid-cols-[110px_1fr] items-center gap-3"
                >
                  <span className="text-sm text-cream/70">{h.day}</span>
                  <TextInput
                    name={`hours-${h.day.toLowerCase()}`}
                    defaultValue={h.hours}
                    placeholder="11AM – 4PM or Closed"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-cream/40">
              Type “Closed” for days the shop isn&apos;t open.
            </p>
          </Card>
        </div>

        {/* Announcement + specialty note */}
        <Card className="space-y-5">
          <h2 className="font-serif text-xl text-cream">
            Homepage announcement
          </h2>
          <Field
            label="Announcement banner"
            htmlFor="announcement"
            hint="Optional. Shown at the top of the homepage — e.g. holiday hours, a sale, or 'closed for vacation.' Leave blank to hide."
          >
            <TextInput
              id="announcement"
              name="announcement"
              placeholder="e.g. Closed July 4th — back Monday!"
            />
          </Field>
          <Field
            label="Specialty services note"
            htmlFor="specialtyNote"
            hint="Shown on service and contact pages."
          >
            <TextArea
              id="specialtyNote"
              name="specialtyNote"
              defaultValue={businessInfo.specialtyNote}
            />
          </Field>
        </Card>
      </SaveForm>
    </div>
  );
}
