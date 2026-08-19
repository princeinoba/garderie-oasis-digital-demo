# AI approval contract

A proposal is advisory and immutable until a person explicitly chooses Approve or Reject. The UI must show proposed content, evidence, warnings, provider/mode, and review state together.

Approval in the initial demo records only local component state. It does not change an inquiry, reserve a slot, send a message, publish FAQ content, or call another tool. Production activation would require authenticated actor identity, append-only proposal events, idempotency, and a separate delivery confirmation after approval.
