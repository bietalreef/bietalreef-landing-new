-- ARKLEEN reference provider: public, bilingual, idempotent seed.
-- The private provider_profiles registration state remains unchanged.
do $$
declare
  v_private_provider uuid;
  v_provider uuid;
  v_emirate uuid;
  v_city uuid;
  v_area uuid;
  v_carpentry uuid;
  v_interior uuid;
  v_specialty uuid;
  v_service record;
begin
  select id into strict v_private_provider from public.provider_profiles where provider_numeric_id = 1000102;
  select id into strict v_emirate from public.platform_emirates where slug = 'abu-dhabi';
  select id into strict v_city from public.platform_cities where slug = 'al-ain' and emirate_id = v_emirate;
  select id into strict v_area from public.platform_areas where slug = 'mazid-company-camp' and city_id = v_city;
  select id into strict v_carpentry from public.platform_categories where slug = 'carpentry';
  select id into strict v_interior from public.platform_categories where slug = 'interior-design';

  insert into public.provider_public_profiles (
    provider_profile_id, slug, name_ar, name_en, legal_name, provider_type,
    short_description_ar, short_description_en, description_ar, description_en,
    tagline_ar, tagline_en, phone, whatsapp, website_url, google_maps_url,
    logo_url, cover_image_url, working_hours_ar, working_hours_en, languages,
    founded_year, years_experience, verification_status, publication_status,
    canonical_url, schema_type, seo_title_ar, seo_title_en,
    seo_description_ar, seo_description_en, search_keywords_ar, search_keywords_en,
    is_featured, platform_priority, accepts_quote_requests, direct_contact_enabled,
    published_at, last_verified_at
  ) values (
    v_private_provider, 'arkleen', 'أركلين لأعمال النجارة والتصميم الداخلي',
    'ARKLEEN Carpentry & Interior Design', 'ARKLEEN', 'workshop',
    'ورشة نجارة وتصميم داخلي في العين للأعمال الخشبية حسب الطلب.',
    'Carpentry and interior design workshop in Al Ain for made-to-measure woodwork.',
    'تصميم وتصنيع وتركيب المطابخ والخزائن والأبواب والكسوات والأثاث حسب المقاس، بعد مراجعة الموقع والخامة والتشطيب المطلوب.',
    'Design, fabrication and installation of made-to-measure kitchens, wardrobes, doors, cladding and furniture after reviewing the site, materials and finish.',
    'نجارة وتصميم داخلي حسب المقاس', 'Made-to-measure carpentry and interiors',
    '+971567797828', '+971567797828', 'https://www.arkleen.ae',
    'https://www.google.com/maps/search/?api=1&query=ARKLEEN+Mazid+Company+Camp+Al+Ain',
    '/images/providers/arkleen-logo.png', '/images/providers/arkleen-premium/profile-cover.webp',
    'السبت إلى الخميس بتنسيق مسبق، والجمعة حسب الموعد',
    'Saturday to Thursday by appointment; Friday by arrangement', array['ar','en'],
    2015, greatest(extract(year from current_date)::int - 2015, 0), 'verified', 'published',
    'https://bietalreef.ae/providers/arkleen', 'HomeAndConstructionBusiness',
    'أركلين للنجارة والتصميم الداخلي في العين | بيت الريف',
    'ARKLEEN Carpentry & Interior Design in Al Ain | Biet Al Reef',
    'مطابخ وخزائن وأبواب وديكورات خشبية حسب الطلب في العين وأبوظبي.',
    'Custom kitchens, wardrobes, doors and decorative woodwork in Al Ain and Abu Dhabi.',
    array['أركلين','نجارة العين','مطابخ حسب الطلب','خزائن','أبواب خشبية','تصميم داخلي'],
    array['ARKLEEN','Al Ain carpentry','custom kitchens','wardrobes','wooden doors','interior design'],
    true, 100, true, true, now(), now()
  )
  on conflict (provider_profile_id) do update set
    slug = excluded.slug, name_ar = excluded.name_ar, name_en = excluded.name_en,
    short_description_ar = excluded.short_description_ar, short_description_en = excluded.short_description_en,
    description_ar = excluded.description_ar, description_en = excluded.description_en,
    phone = excluded.phone, whatsapp = excluded.whatsapp, website_url = excluded.website_url,
    google_maps_url = excluded.google_maps_url, logo_url = excluded.logo_url,
    cover_image_url = excluded.cover_image_url, verification_status = excluded.verification_status,
    publication_status = excluded.publication_status, canonical_url = excluded.canonical_url,
    seo_title_ar = excluded.seo_title_ar, seo_title_en = excluded.seo_title_en,
    seo_description_ar = excluded.seo_description_ar, seo_description_en = excluded.seo_description_en,
    search_keywords_ar = excluded.search_keywords_ar, search_keywords_en = excluded.search_keywords_en,
    is_featured = excluded.is_featured, platform_priority = excluded.platform_priority,
    published_at = coalesce(provider_public_profiles.published_at, now()), updated_at = now()
  returning id into v_provider;

  insert into public.provider_categories(provider_id, category_id)
  values (v_provider, v_carpentry), (v_provider, v_interior)
  on conflict do nothing;

  insert into public.platform_specialties(category_id, slug, name_ar, name_en, description_ar, description_en, display_order)
  values (v_carpentry, 'custom-carpentry-interior-fitout', 'نجارة وتصميم داخلي حسب الطلب', 'Custom Carpentry & Interior Fit-out', 'مطابخ وخزائن وأبواب وكسوات وأثاث حسب المقاس.', 'Made-to-measure kitchens, wardrobes, doors, cladding and furniture.', 10)
  on conflict (category_id, slug) do update set updated_at = now()
  returning id into v_specialty;
  insert into public.provider_specialties(provider_id, specialty_id) values (v_provider, v_specialty) on conflict do nothing;

  insert into public.provider_service_locations(provider_id, emirate_id, city_id, area_id, coverage_type, coverage_notes_ar, coverage_notes_en, is_primary, is_active)
  select v_provider, v_emirate, v_city, v_area, 'area', 'الموقع الرئيسي في مزيد، وتقديم الخدمة في العين وأبوظبي حسب المشروع.', 'Primary location in Mazid; service across Al Ain and Abu Dhabi subject to project scope.', true, true
  where not exists (select 1 from public.provider_service_locations where provider_id=v_provider and emirate_id=v_emirate and city_id=v_city and area_id=v_area);

  for v_service in select * from (values
    ('custom-wooden-kitchens','مطابخ خشبية حسب الطلب','Custom Wooden Kitchens','تصميم وتصنيع وتركيب حسب المساحة والخامة والتشطيب.','Design, fabrication and installation tailored to the site, material and finish.','/images/providers/arkleen-premium/service-custom-kitchens.webp',1),
    ('custom-wardrobes','خزائن ودواليب حسب المقاس','Made-to-measure Wardrobes','حلول تخزين داخلية بأبواب وتقسيمات وتشطيبات قابلة للتخصيص.','Custom internal storage, doors, layouts and finishes.','/images/providers/arkleen-premium/service-custom-wardrobes.webp',2),
    ('wooden-doors-and-decor','أبواب وديكورات خشبية','Wooden Doors & Decorative Woodwork','أبواب وكسوات وديكورات مصنّعة وفق المقاسات والتصميم.','Doors, cladding and decorative woodwork made to specification.','/images/providers/arkleen-premium/service-wooden-doors-decor.webp',3),
    ('interior-design-fitout','تصميم داخلي وتشطيبات','Interior Design & Fit-out','تنسيق التصميم والأعمال الخشبية والتشطيبات الداخلية.','Coordinated interior design, joinery and fit-out.','/images/providers/arkleen-premium/service-interior-fitout.webp',4)
  ) s(slug,name_ar,name_en,description_ar,description_en,image_url,display_order)
  loop
    insert into public.platform_services(specialty_id,category_id,slug,name_ar,name_en,short_description_ar,short_description_en,display_order,is_active)
    values (v_specialty, case when v_service.slug='interior-design-fitout' then v_interior else v_carpentry end, v_service.slug, v_service.name_ar, v_service.name_en, v_service.description_ar, v_service.description_en, v_service.display_order, true)
    on conflict (category_id, slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,short_description_ar=excluded.short_description_ar,short_description_en=excluded.short_description_en,is_active=true,updated_at=now();
    insert into public.provider_services(provider_id,service_id,title_ar,title_en,description_ar,description_en,pricing_model,image_url,display_order,is_featured,is_published)
    select v_provider, id, v_service.name_ar, v_service.name_en, v_service.description_ar, v_service.description_en, 'quote_required', v_service.image_url, v_service.display_order, v_service.display_order=1, true
    from public.platform_services where slug=v_service.slug and category_id = case when v_service.slug='interior-design-fitout' then v_interior else v_carpentry end
    on conflict (provider_id,service_id) do update set title_ar=excluded.title_ar,title_en=excluded.title_en,description_ar=excluded.description_ar,description_en=excluded.description_en,image_url=excluded.image_url,is_published=true,updated_at=now();
  end loop;

  insert into public.provider_products(provider_id,category_id,slug,name_ar,name_en,description_ar,description_en,sku,specifications,price_visibility,stock_status,image_url,gallery,display_order,is_featured,is_published)
  values
    (v_provider,v_carpentry,'custom-wooden-kitchen','مطبخ خشبي حسب الطلب','Custom Wooden Kitchen','مطبخ قابل لتخصيص المقاسات والخامة واللون والتقسيمات.','Configurable by dimensions, material, colour and layout.','BR-PRD-ARK-001','{"made_to_order":true}'::jsonb,'request_price','made_to_order','/images/providers/arkleen-premium/product-custom-kitchen.webp','["/images/providers/arkleen-premium/product-custom-kitchen.webp","/images/providers/arkleen-premium/product-custom-kitchen-detail.webp","/images/providers/arkleen-premium/product-custom-kitchen-storage.webp"]'::jsonb,1,true,true),
    (v_provider,v_carpentry,'custom-wooden-wardrobe','خزانة خشبية حسب المقاس','Custom Wooden Wardrobe','خزانة مصنّعة حسب المساحة وخيارات الأبواب والتقسيم.','Made-to-measure with configurable doors and layout.','BR-PRD-ARK-002','{"made_to_order":true}'::jsonb,'request_price','made_to_order','/images/providers/arkleen-premium/product-custom-wardrobe.webp','["/images/providers/arkleen-premium/product-custom-wardrobe.webp","/images/providers/arkleen-premium/product-custom-wardrobe-detail.webp","/images/providers/arkleen-premium/product-custom-wardrobe-storage.webp"]'::jsonb,2,false,true),
    (v_provider,v_carpentry,'custom-wooden-door','باب خشبي حسب الطلب','Custom Wooden Door','باب وفق المقاس والتصميم ونوع الخشب والتشطيب.','Tailored by size, design, timber and finish.','BR-PRD-ARK-003','{"made_to_order":true}'::jsonb,'request_price','made_to_order','/images/providers/arkleen-premium/product-custom-door.webp','["/images/providers/arkleen-premium/product-custom-door.webp","/images/providers/arkleen-premium/product-custom-door-detail.webp","/images/providers/arkleen-premium/product-custom-door-opposite.webp"]'::jsonb,3,false,true)
  on conflict (provider_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,description_ar=excluded.description_ar,description_en=excluded.description_en,image_url=excluded.image_url,gallery=excluded.gallery,is_published=true,updated_at=now();

  insert into public.provider_public_projects(provider_id,slug,title_ar,title_en,description_ar,description_en,emirate_id,city_id,area_id,project_year,client_type,cover_image_url,gallery,display_order,is_featured,publication_status,published_at)
  values
    (v_provider,'arkleen-workshop-facade','واجهة وهوية ورشة أركلين','ARKLEEN Workshop Façade & Identity','تجهيز واجهة الورشة وإظهار الهوية البصرية للنشاط.','Workshop façade preparation and presentation of the business identity.',v_emirate,v_city,v_area,2026,'business','/images/providers/arkline/arkline-hero-exterior.webp','["/images/providers/arkline/arkline-hero-exterior.webp","/images/providers/arkline/arkline-workshop.webp"]'::jsonb,1,true,'published',now()),
    (v_provider,'carpentry-workshop-production','تجهيز ورشة النجارة والإنتاج','Carpentry Workshop & Production Fit-out','تنظيم مساحة الورشة ومناطق العمل والمعدات.','Organisation of workshop work zones and equipment.',v_emirate,v_city,v_area,2026,'business','/images/providers/arkline/arkline-workshop.webp','["/images/providers/arkline/arkline-workshop.webp","/images/providers/arkline/arkline-production.webp"]'::jsonb,2,false,'published',now()),
    (v_provider,'interior-finishes-area','مساحة التصميم والتشطيبات الداخلية','Interior Design & Finishes Area','مساحة لمراجعة الخامات والألوان والتفاصيل الداخلية.','Area for reviewing materials, colours and interior details.',v_emirate,v_city,v_area,2026,'business','/images/providers/arkline/arkline-showroom.webp','["/images/providers/arkline/arkline-showroom.webp","/images/providers/arkline/arkline-hero-exterior.webp"]'::jsonb,3,false,'published',now())
  on conflict (provider_id,slug) do update set title_ar=excluded.title_ar,title_en=excluded.title_en,description_ar=excluded.description_ar,description_en=excluded.description_en,cover_image_url=excluded.cover_image_url,gallery=excluded.gallery,publication_status='published',published_at=coalesce(provider_public_projects.published_at,now()),updated_at=now();
end $$;
