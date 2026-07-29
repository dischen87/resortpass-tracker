# Content data governance

This directory contains source-backed editorial building blocks. It does not
publish content by itself.

## Rules

- `checkedAt` records when the linked source was manually checked.
- `nextReviewAt` is the latest scheduled recheck, not a promise that the fact
  remains true until then.
- `validFrom` and `validUntil` are inclusive. A `null` boundary means the
  source did not provide a defensible boundary.
- Source priority is `1` for first-party operator/business sources, `2` for
  public authorities and official destination organisations, and `3` for
  rights registries carrying direct author/license metadata.
- Qualified claims such as “more than 100” must retain their qualifier.
- Accommodation scenarios are decision filters, not rankings.
- Restaurant inclusion means “found in a checked source”, not “recommended”.
- Accommodation and restaurant prices are deliberately absent. Prices may
  only be added later with an explicit validity range and a scheduled review.
- Media entries record both the reviewed source revision and, when present,
  the exact local derivative path plus its processing disclosure.
- Before media publication, render the final crop and check attribution,
  modification disclosure, identifiable people, trademarks and misleading
  endorsement risk.
