---
name: resortpass-editorial-review
description: Maintain ResortPass Tracker facts, official-source review dates, CC BY-SA photos and credits, or mobile/web UX in this repository. Use for source checks, price/rule updates, licensed-image changes and usability reviews of this site; exclude unrelated projects and personal bookings.
---

# ResortPass editorial review

Use this workflow for the ResortPass Tracker repository (`package.json` name `resortpass-tracker`). Report the concrete evidence, affected content and relevant validation. A matching chat task may select this skill automatically; it is not a scheduler, website click hook or permission to contact subscribers.

## Sources and status

- The fact register is `src/data/facts.ts`; each record owns its source URL, `checkedAt`, `nextReviewAt`, qualifiers and caveat. Read the official primary source for the specific record. Keep a short source→fact mapping in the task report. Change only records actually verified; an inaccessible source does not justify a new review date.
- `src/data/review-dates.ts` also dates whole editorial guides. Rechecking prices does not mean every guide or historical fact was rechecked. Retain unknown bounds and published qualifiers rather than inventing precise figures.
- Current sales observations come from `/api/status`, not a guide, old repository snapshot, static HTML or cached search excerpt. Respect per-pass freshness; unknown never implies sold out. The known false alarms of 19 March and 9 June 2026 remain documented evidence, not real sales.
- Rulantica regular online prices and hotel guest rates are separate tariff groups. ResortPass entry, renewal, hotel exceptions and Rulantica reservations have distinct conditions.
- ParkQueueTimes wait times/crowd data are licensed for this site's display. Do not copy raw provider data into exports, public MCP tools or external feeds. The read-only MCP surface in `server/mcp.ts` uses only own checker observations and own editorial content; it has no subscription or booking tools.

## Photos and mobile/web UX

- Review the exact Commons file page/revision before using an image. Maintain `src/data/media.ts`, derivative dimensions and visible author/source/license/modification credit. CC BY-SA image derivatives retain their image licence; the code's MIT licence does not replace it. Avoid photos with prominent identifiable bathers. Historical decor or a hotel scene must not imply a current facility or offer.
- `LicensedPhoto.astro` produces responsive WebP sources and disclosed crops. Keep credit anchors outside card action links. Inspect the actual crop and image context; metadata alone does not prove a good or accurate visual.
- For UX work, capture the current affected flow before editing and check the result on mobile and desktop. Include Hebrew/RTL when shared navigation, text layout or credits change. The fixed mobile dock measures its actual height; preserve that space and the sticky Alert's hiding near the form/footer. Verify focus visibility and meaningful live-region announcements for changed forms/results. Distinguish browser tests from a full accessibility audit.

## Validation and delivery

Run checks relevant to the change. `bun run typecheck`, `bun run build`, `bun run verify:static` and `bun run verify:seo` validate shared changes; focused `bun test <changed-area>` checks nontrivial logic. Use source/date invariants for editorial updates and screenshots for layout. Do not claim measured performance, native calendar imports, successful alert delivery or a production release without observing it.

Follow the active task's release and messaging authorization and repository AGENTS preferences. Keep other users' WIP outside staging/commits. For a review-only task, deliver findings; for an authorized fix/release, finish the agreed work. Selecting this skill does not create automations, install account connectors or authorize external messages.
