# Meeting Rundown: Jon's Darkroom & Frameshop
### For Terri — prep before meeting with Jon

---

## Who is Jon?

- Jon Long, owner of Jon's Darkroom & Frameshop in Essex Junction, Vermont
- Been in business ~35 years at 159 Pearl Street
- Featured in Business People–Vermont magazine (2018) — well-known local shop

---

## What we built him

A full website that looks and feels like his actual shop — wood, brass, film strips, polaroids, vintage newspaper vibes. Already deployed and live.

**Pages on the site:**
- Home
- Services (each service has its own page)
- About Jon
- Stories / Blog ("Stories From The Darkroom")
- Press Archive (newspaper features)
- Shop (used camera gear)
- Contact & Visit

**Services covered:**
- Photo Finishing & Printing
- Film Processing (color + black & white)
- Photo Restoration
- Custom Framing
- Camera Equipment (buy/sell used gear)
- Video Transfers (VHS, tapes, slides → digital)
- Passport & Visa Photos
- Photo Gifts (mugs, magnets, ornaments, calendars)

---

## Admin Dashboard — what Jon can manage himself

Jon has a login at `/admin` to run the site without touching code:

- Write and publish blog posts
- Edit his hours, address, phone, email
- Toggle which services show on the homepage
- Manage gallery photos and camera inventory cards
- Swap the featured press clipping

---

## The one big thing to flag

Right now, edits Jon makes in the admin **reset when the server restarts** — nothing is saved to a real database yet. This is a known next step, not a bug. The whole site is built ready to plug into one cleanly.

**Next step:** Connect to Supabase (a simple cloud database) so his edits stick permanently.

---

## What Jon needs to decide / bring to the meeting

- Does he want to move forward so the admin panel actually saves his changes?
- Does he have photos he wants on the site? (Currently using scraped versions from his old site — needs his approval)
- Any services, hours, or text he wants changed?
- His real Facebook and Instagram links (currently placeholder)

---

## Quick facts if Jon asks

| | |
|---|---|
| Address | 159 Pearl Street, Essex Junction, VT 05452 |
| Phone | (802) 879-4485 |
| Email | hello@jonsdarkroom.com |
| Hours | Mon–Fri 11AM–4PM · Sat 11AM–2PM · Sun Closed |

---

## Short version

We built Jon a beautiful, fully working website with an admin dashboard he can use himself. The one thing left is wiring up a real database so his edits save permanently.

**Goal for this meeting:** Get his approval on what's built, grab any real photos he wants swapped in, and decide if we move to phase 2 (the database).
