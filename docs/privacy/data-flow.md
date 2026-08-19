# Privacy data flow

## Initial production mode

Browser -> local step validation -> `/api/tours` -> same-origin/rate/honeypot/schema validation -> deterministic reference and preview -> response. No database write, email, SMS, remote AI request, analytics event, or durable server log is intentionally created.

The form accepts preliminary guardian name/contact, preferred language/contact method, broad child age group, program interest, desired month, care schedule, proposed date/time, adult count, optional accommodation description, and general question. It requires privacy, synthetic communication, and official-registry acknowledgements.

## Excluded data

Child full name, exact date of birth, health/allergy/diagnostic records, government identifiers, custody records, images, payment or financial data, admission decisions, and waitlist rank.

## Future Supabase mode

A separately approved server route may write a minimized inquiry with notice version, consent timestamps, and retention deadline. Tenant RLS and deletion/correction workflows must be verified before enabling it. Privacy/legal copy is demonstration content requiring professional review.
