# Role access matrix

| Capability                   | Anonymous | Authenticated staff | Assistant director | Director        | Service role               |
| ---------------------------- | --------- | ------------------- | ------------------ | --------------- | -------------------------- |
| Read approved FAQ            | yes       | yes                 | yes                | yes             | yes                        |
| Submit persisted inquiry     | no        | no by public UI     | optional policy    | optional policy | future server only         |
| Read tenant inquiries/events | no        | own tenant          | own tenant         | own tenant      | all by explicit server use |
| Change inquiry/slot          | no        | no                  | own tenant         | own tenant      | future server only         |
| Write FAQ/proposal           | no        | no                  | own tenant         | own tenant      | future server only         |
| Review a proposal            | no        | no                  | own tenant         | own tenant      | not unattended             |
| Mutate/delete events         | no        | no                  | no                 | no              | trigger rejects mutation   |

Initial deterministic mode uses only the public and protected local demo layers; no Supabase identity is provisioned.
