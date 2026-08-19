# AI tool register

| Tool/capability             | Initial state                | Input                                            | Output                                     | Side effects                  |
| --------------------------- | ---------------------------- | ------------------------------------------------ | ------------------------------------------ | ----------------------------- |
| Oasis Guide approved lookup | enabled, deterministic       | one general question and locale                  | approved answer or refusal with provenance | none                          |
| Inquiry summary proposal    | enabled on synthetic records | one displayed synthetic inquiry                  | summary, evidence, warnings                | local session only            |
| Reply draft proposal        | enabled on synthetic records | displayed synthetic inquiry and approved wording | bilingual draft for human review           | no send, no mutation          |
| Remote model provider       | disabled                     | none                                             | none                                       | none                          |
| Email/SMS/calendar delivery | disabled                     | none                                             | local `.ics` preview only                  | user-controlled file download |

Any remote provider activation requires credentials, privacy review, evaluation, redaction, observability, cost limits, and a retained human-approval gate.
