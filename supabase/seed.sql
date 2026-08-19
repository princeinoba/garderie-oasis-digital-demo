-- Synthetic seed records only. No real child, family, staff, or operator data.
insert into public.tenants (id, slug, name, default_locale) values
('10000000-0000-4000-8000-000000000001','garderie-oasis-demo','Garderie Oasis Digital Experience','en');

insert into public.locations (id, tenant_id, name) values
('20000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001','Somerset Demonstration Location');

insert into public.tour_inquiries (id,tenant_id,location_id,reference,guardian_first_name,guardian_last_name,email,phone,preferred_language,preferred_contact_method,child_age_group,program_interest,desired_start_month,care_schedule,preferred_tour_date,preferred_tour_time,adult_attendee_count,accessibility_request,general_question,status,source,privacy_notice_version,privacy_acknowledged_at,communication_consent,communication_consented_at,registry_acknowledgement,registry_acknowledged_at,delete_after) values
('30000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001','OAS-DEMO-7K2M','Sophie','Martin','sophie.martin@synthetic.invalid','613-555-0134','fr','email','toddler','toddler','2026-09-01','full_time','2026-08-25','morning',2,'Step-free entrance requested.','Looking for a nurturing, bilingual demonstration environment.','new','website_demo','2026-08-18',now(),true,now(),true,now(),now()+interval '24 months');

insert into public.inquiry_events (tenant_id,inquiry_id,event_type,payload) values
('10000000-0000-4000-8000-000000000001','30000000-0000-4000-8000-000000000001','created','{"mode":"synthetic","delivery":"disabled"}'::jsonb);

insert into public.public_faq_articles (tenant_id,slug,language,question,answer,status,approved_at) values
('10000000-0000-4000-8000-000000000001','hours','en','What are the demonstration hours?','The synthetic schedule shows Monday to Friday, 7:00 AM to 6:00 PM. Verify any real hours with the operator.','approved',now()),
('10000000-0000-4000-8000-000000000001','hours','fr','Quelles sont les heures de demonstration?','L horaire fictif indique du lundi au vendredi, de 7 h a 18 h. Verifiez tout horaire reel aupres de l exploitant.','approved',now()),
('10000000-0000-4000-8000-000000000001','waitlist','en','Is this the City of Ottawa waitlist?','No. This portfolio demonstration is separate from the official City of Ottawa Child Care Registry and Waitlist.','approved',now()),
('10000000-0000-4000-8000-000000000001','waitlist','fr','Est-ce la liste d attente de la Ville d Ottawa?','Non. Cette demonstration de portfolio est distincte du registre officiel de la Ville d Ottawa.','approved',now());

insert into public.ai_proposals (id,tenant_id,inquiry_id,proposal_type,prompt_version,proposed_content,evidence,warnings) values
('40000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001','30000000-0000-4000-8000-000000000001','reply_draft','deterministic-rules-2026-08-18','{"subject":"Your demonstration tour preview","body":"A bilingual tour preview is available for human review. No message has been sent."}'::jsonb,'[{"source":"approved_faq:hours"}]'::jsonb,'["Human review required","Delivery disabled"]'::jsonb);