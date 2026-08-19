# Data model

The migration is intentionally bounded to eight application tables.

| Table                 | Purpose                                         | Sensitive boundary                                                       |
| --------------------- | ----------------------------------------------- | ------------------------------------------------------------------------ |
| `tenants`             | tenant identity and default locale              | no public writes                                                         |
| `locations`           | site and timezone                               | tenant-scoped                                                            |
| `staff_profiles`      | authenticated role and membership               | self-readable, no anonymous access                                       |
| `tour_inquiries`      | minimized guardian contact and general interest | no child name, birth date, health, custody, ID, photo, or finance fields |
| `tour_slots`          | synthetic availability capacity                 | authenticated tenant members                                             |
| `inquiry_events`      | append-only review trail                        | no update/delete grant; mutation trigger                                 |
| `public_faq_articles` | approved bilingual public knowledge             | anonymous reads only when approved                                       |
| `ai_proposals`        | evidence, warnings, draft output, review state  | never direct mutation or delivery                                        |

Foreign keys are indexed. Inquiry status follows `new -> reviewing -> tour_offered -> confirmed -> completed -> follow_up`, with cancellation/closure branches. Consent purpose/version/timestamps and `delete_after` support a future retention job. Initial production mode does not connect the public form to these tables.
