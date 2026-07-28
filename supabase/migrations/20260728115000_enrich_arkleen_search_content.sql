-- Align ARKLEEN's public profile cards with the database source of truth.
-- The public IDs remain stable so the admin, marketplace, WhatsApp and SEO layers
-- can continue to address the same provider, services and products.

do $$
declare
  v_provider_id uuid;
  v_workshops_category_id uuid;
  v_carpentry_category_id uuid;
  v_project_service_id uuid;
  v_emirate_id uuid;
  v_city_id uuid;
  v_area_id uuid;
begin
  select id
    into v_provider_id
  from public.provider_public_profiles
  where slug = 'arkleen';

  if v_provider_id is null then
    raise exception 'ARKLEEN public provider profile was not found';
  end if;

  select id into v_workshops_category_id
  from public.platform_categories
  where slug = 'factories-workshops';

  select id into v_carpentry_category_id
  from public.platform_categories
  where slug = 'carpentry';

  select id into v_project_service_id
  from public.platform_services
  where slug = 'integrated-carpentry-interior-238';

  select emirate_id, city_id, area_id
    into v_emirate_id, v_city_id, v_area_id
  from public.provider_service_locations
  where provider_id = v_provider_id
    and is_active = true
  order by is_primary desc, created_at asc
  limit 1;

  update public.provider_public_profiles
  set
    provider_type = 'workshop',
    logo_url = '/images/providers/arkleen-logo.png',
    short_description_ar = 'أركلين ورشة نجارة وتصميم داخلي في العين بأبوظبي، متخصصة في المطابخ والخزائن والأبواب والأثاث والديكورات الخشبية حسب الطلب.',
    short_description_en = 'ARKLEEN is a carpentry and interior design workshop in Al Ain, Abu Dhabi, specialising in made-to-measure kitchens, wardrobes, doors, furniture and decorative woodwork.',
    description_ar = 'أركلين، ويبحث عنها بعض العملاء باسم اركلين، ورشة نجارة وتصميم داخلي مقرها مدينة العين في إمارة أبوظبي وتخدم المشاريع في العين وأبوظبي حسب نطاق الطلب. تقدم الورشة تصميم وتصنيع وتوريد وتركيب المطابخ الخشبية، خزائن الملابس، الأبواب الداخلية، الكسوات، الأثاث والديكورات الخشبية حسب المقاس. تبدأ كل خدمة بمراجعة صور الموقع والمخططات والمقاسات ونوع الخامة واللون والتشطيب والملحقات، ثم توضيح نطاق العمل والمدة والسعر قبل التنفيذ. ملف أركلين داخل بيت الريف يربط النشاط الرئيسي والتخصصات والخدمات والمنتجات ومناطق التغطية بمعرفات قاعدة البيانات لتسهيل البحث وطلب عرض السعر.',
    description_en = 'ARKLEEN is a carpentry and interior design workshop based in Al Ain, Abu Dhabi, serving projects across Al Ain and Abu Dhabi according to scope. The workshop designs, manufactures, supplies and installs custom wooden kitchens, wardrobes, interior doors, wall cladding, furniture and decorative woodwork. Every request starts with a review of site photographs, drawings, measurements, materials, colours, finishes and accessories, followed by a clear scope, estimated programme and quotation before execution. The ARKLEEN profile on Biet Al Reef connects the business activity, specialisations, services, products and coverage areas to verified database records.',
    tagline_ar = 'ورشة نجارة وتصميم داخلي حسب المقاس في العين وأبوظبي',
    tagline_en = 'Made-to-measure carpentry and interior design workshop in Al Ain and Abu Dhabi',
    seo_title_ar = 'أركلين واركلين للنجارة والتصميم الداخلي في العين وأبوظبي',
    seo_title_en = 'ARKLEEN Carpentry & Interior Design Workshop in Al Ain, Abu Dhabi',
    seo_description_ar = 'ورشة أركلين للنجارة والتصميم الداخلي في العين وأبوظبي لتصميم وتصنيع وتركيب المطابخ والخزائن والأبواب والأثاث والديكورات الخشبية حسب الطلب.',
    seo_description_en = 'ARKLEEN carpentry and interior design workshop in Al Ain and Abu Dhabi for custom kitchens, wardrobes, doors, furniture, fit-out and decorative woodwork.',
    search_keywords_ar = array[
      'أركلين',
      'اركلين',
      'أركلين العين',
      'اركلين العين',
      'أركلين أبوظبي',
      'ورشة نجارة في العين',
      'منجرة في العين',
      'نجار العين',
      'نجارة أبوظبي',
      'مطابخ خشبية حسب الطلب',
      'تفصيل خزائن في العين',
      'أبواب خشبية في العين',
      'تصميم داخلي العين',
      'أثاث وديكور خشبي'
    ],
    search_keywords_en = array[
      'ARKLEEN',
      'Arkleen Al Ain',
      'carpentry workshop Al Ain',
      'carpenter Abu Dhabi',
      'custom kitchens Al Ain',
      'made to measure wardrobes',
      'wooden doors Al Ain',
      'interior design Al Ain',
      'custom furniture Abu Dhabi'
    ],
    completed_projects_count = 1,
    updated_at = now()
  where id = v_provider_id;

  -- A workshop belongs primarily to the factories/workshops directory activity.
  -- Carpentry remains a secondary category so its specialties and services keep
  -- their correct taxonomy and search placement.
  update public.provider_categories
  set is_primary = false
  where provider_id = v_provider_id;

  insert into public.provider_categories(provider_id, category_id, is_primary)
  values (v_provider_id, v_workshops_category_id, true)
  on conflict (provider_id, category_id)
  do update set is_primary = excluded.is_primary;

  insert into public.provider_categories(provider_id, category_id, is_primary)
  values (v_provider_id, v_carpentry_category_id, false)
  on conflict (provider_id, category_id)
  do update set is_primary = excluded.is_primary;

  update public.provider_services as target
  set
    title_ar = source.title_ar,
    title_en = source.title_en,
    description_ar = source.description_ar,
    description_en = source.description_en,
    updated_at = now()
  from (
    values
      (
        'BR-SRV-ARK-001',
        'مطابخ خشبية حسب الطلب',
        'Custom Wooden Kitchens',
        'تقدم أركلين خدمة تصميم وتصنيع وتركيب المطابخ الخشبية حسب الطلب في العين وأبوظبي، مع توزيع عملي يناسب مساحة المطبخ وأماكن الأجهزة واحتياجات التخزين. تشمل الخدمة مراجعة المقاسات أو المخطط، واختيار نوع الخشب والخامة واللون والتشطيب والإكسسوارات، ثم تجهيز عرض سعر واضح قبل التصنيع. ويمكن تنفيذ مطبخ أركلين أو اركلين للفلل والمنازل والملاحق والمكاتب وفق تفاصيل المشروع وموقع التركيب. وتشمل التغطية أعمال المعاينة والتنسيق للتنفيذ داخل مدينة العين ومناطق أبوظبي المتفق عليها.',
        'ARKLEEN designs, manufactures and installs custom wooden kitchens for homes, villas, extensions and offices in Al Ain and Abu Dhabi. The service covers practical space planning, appliance positions, storage requirements, material selection, colours, finishes and accessories. Measurements, drawings and site photographs are reviewed before fabrication so the quotation and scope reflect the actual project. Each kitchen is made to order and coordinated for delivery and installation according to the approved design and site conditions.'
      ),
      (
        'BR-SRV-ARK-002',
        'خزائن ودواليب حسب المقاس',
        'Made-to-Measure Wardrobes & Storage',
        'تنفذ أركلين خزائن ودواليب حسب المقاس في العين وأبوظبي للغرف وغرف الملابس والمداخل ومساحات التخزين المنزلية أو التجارية. يتم تحديد العرض والارتفاع والعمق، ثم تصميم التقسيم الداخلي للرفوف والأدراج وعلاقات الملابس واختيار الأبواب المفصلية أو السحاب والخامة واللون والتشطيب. تساعد صور الموقع والمقاسات التقريبية على تجهيز تصور أولي وعرض سعر، ثم تعتمد التفاصيل النهائية قبل التصنيع والتوريد والتركيب داخل المشروع. وتغطي الخدمة مشاريع الفلل والمنازل والمكاتب وفق متطلبات كل عميل.',
        'ARKLEEN produces made-to-measure wardrobes and storage units for bedrooms, dressing rooms, entrances and residential or commercial interiors in Al Ain and Abu Dhabi. Width, height and depth are reviewed before planning shelves, drawers, hanging areas and internal accessories. Clients can select hinged or sliding doors, materials, colours and finishes. Site photographs and approximate measurements support the initial proposal and quotation, while final dimensions and specifications are confirmed before manufacturing, delivery and installation.'
      ),
      (
        'BR-SRV-ARK-003',
        'أبواب وديكورات خشبية',
        'Wooden Doors & Decorative Woodwork',
        'توفر أركلين تصنيع وتوريد وتركيب الأبواب الداخلية والكسوات والفواصل والديكورات الخشبية حسب المقاس في العين وأبوظبي. تبدأ الخدمة بتحديد عدد القطع وقياسات الفتحات والتصميم المطلوب ونوع الخشب أو القشرة واللون والإكسسوارات والتشطيب. كما يمكن تنسيق الأبواب والأعمال الخشبية مع هوية التصميم الداخلي للمكان. بعد مراجعة صور الموقع أو النموذج المرجعي يتم توضيح نطاق التنفيذ والمدة والسعر قبل بدء التصنيع والتركيب. وتناسب الخدمة الفلل والمنازل والمكاتب والمشاريع التجارية بمواصفات مختلفة.',
        'ARKLEEN manufactures, supplies and installs made-to-measure interior doors, wall cladding, dividers and decorative woodwork in Al Ain and Abu Dhabi. The service begins by confirming quantities, opening dimensions, the required design, timber or veneer, colour, hardware and finish. Doors and decorative elements can be coordinated with the wider interior identity of the space. Site photographs or reference designs are reviewed before the execution scope, expected timeframe and quotation are confirmed for fabrication and installation.'
      ),
      (
        'BR-SRV-ARK-004',
        'تصميم داخلي وتجهيز المساحات',
        'Interior Design & Space Fit-Out',
        'تقدم أركلين خدمات التصميم الداخلي وتجهيز المساحات في العين وأبوظبي مع تركيز متخصص على النجارة والأثاث والكسوات والتفاصيل الخشبية المصممة حسب المشروع. تبدأ الخدمة بفهم نوع المساحة ومساحتها وطريقة الاستخدام والطراز والألوان والميزانية، ثم مراجعة الصور والمخططات والخامات المطلوبة. يمكن تنسيق تصميم المطابخ والخزائن والأبواب والأثاث والديكور ضمن تصور واحد، مع تحديد واضح للأعمال التي ستصمم أو تصنع أو تورد أو تركب. ويتم التنسيق مع العميل حتى اعتماد التصور المناسب قبل بدء التنفيذ.',
        'ARKLEEN provides interior design and space fit-out services in Al Ain and Abu Dhabi with specialist attention to joinery, furniture, cladding and custom wooden details. The process starts by understanding the space, its use, preferred style, colours, budget, photographs and available drawings. Kitchens, wardrobes, doors, furniture and decorative elements can be coordinated within one design direction. The proposal defines which elements will be designed, manufactured, supplied or installed before the project scope and quotation are approved.'
      )
  ) as source(public_card_code, title_ar, title_en, description_ar, description_en)
  where target.provider_id = v_provider_id
    and target.public_card_code = source.public_card_code;

  update public.provider_products as target
  set
    name_ar = source.name_ar,
    name_en = source.name_en,
    description_ar = source.description_ar,
    description_en = source.description_en,
    updated_at = now()
  from (
    values
      (
        'BR-PRD-ARK-001',
        'مطبخ خشبي حسب الطلب',
        'Custom Wooden Kitchen',
        'مطبخ خشبي حسب الطلب من أركلين في العين وأبوظبي، يبدأ سعره من 980 درهم للمتر الطولي ويصمم وفق مساحة الموقع وطريقة الاستخدام. يشمل التخصيص توزيع الخزائن والأدراج وأماكن الأجهزة واختيار الخامة واللون والتشطيب والمفصلات والملحقات الداخلية. السعر المعروض ابتدائي للمقارنة، أما السعر النهائي فيعتمد بعد مراجعة المقاسات والمخطط وصور الموقع والمواصفات المطلوبة وتحديد نطاق التصنيع والتوريد والتركيب. ويستطيع العميل طلب معاينة أولية ومناقشة البدائل المناسبة لمساحة المطبخ وميزانية المشروع.',
        'A custom wooden kitchen by ARKLEEN in Al Ain and Abu Dhabi, with a starting price of AED 980 per linear metre. The design is tailored to the site dimensions and required use, including cabinet distribution, drawers, appliance positions, material, colour, finish, hinges and internal accessories. The displayed amount is an indicative starting price for comparison. Final pricing is confirmed after reviewing measurements, drawings, site photographs, specifications and the required manufacturing, delivery and installation scope.'
      ),
      (
        'BR-PRD-ARK-002',
        'خزانة ملابس حسب المقاس',
        'Made-to-Measure Wardrobe',
        'خزانة ملابس حسب المقاس من أركلين للغرف وغرف الملابس ومساحات التخزين في العين وأبوظبي، وتبدأ من 2,500 درهم للوحدة. تصنع الخزانة وفق العرض والارتفاع والعمق المتاح، مع إمكانية تخصيص الرفوف والأدراج وعلاقات الملابس والإضاءة والأبواب المفصلية أو السحاب والخامة واللون. السعر ابتدائي، ويحدد السعر النهائي بعد اعتماد المقاسات والتقسيم الداخلي والتشطيب والإكسسوارات وموقع التوريد والتركيب. ويمكن طلب معاينة للمساحة ومقارنة بدائل التخزين قبل اعتماد التصميم النهائي.',
        'A made-to-measure wardrobe by ARKLEEN for bedrooms, dressing rooms and storage spaces in Al Ain and Abu Dhabi, starting from AED 2,500 per unit. The wardrobe is manufactured to the available width, height and depth, with configurable shelves, drawers, hanging space, lighting, hinged or sliding doors, materials and colours. The displayed price is indicative. Final pricing is confirmed after approving dimensions, internal organisation, finish, accessories and the delivery and installation location.'
      ),
      (
        'BR-PRD-ARK-003',
        'باب داخلي خشبي',
        'Wooden Interior Door',
        'باب داخلي خشبي من أركلين يصنع حسب فتحة الباب والتصميم المطلوب للمنازل والفلل والمكاتب في العين وأبوظبي، ويبدأ من 800 درهم للقطعة. يمكن اختيار نوع الخشب أو القشرة واللون والتشطيب والإطار والإكسسوارات بما يناسب التصميم الداخلي للمكان. السعر المعروض ابتدائي، ويعتمد السعر النهائي بعد تحديد العدد والمقاسات ونوع الباب والخامة ومستلزمات التوريد والتركيب ومراجعة صور الفتحات أو النموذج المرجعي. وتتاح معاينة أولية لمواءمة التصميم مع بقية الأبواب والديكور في المشروع.',
        'A wooden interior door by ARKLEEN, manufactured to the opening size and required design for homes, villas and offices in Al Ain and Abu Dhabi, starting from AED 800 per piece. Timber or veneer, colour, finish, frame and hardware can be selected to suit the interior. The displayed amount is an indicative starting price. Final pricing depends on quantity, dimensions, door construction, material, delivery, installation and a review of opening photographs or reference designs.'
      )
  ) as source(sku, name_ar, name_en, description_ar, description_en)
  where target.provider_id = v_provider_id
    and target.sku = source.sku;

  -- Retire the former workshop/facade placeholders and keep one honest,
  -- reusable project card that presents the provider's readiness and portfolio.
  delete from public.provider_public_projects
  where provider_id = v_provider_id;

  insert into public.provider_public_projects(
    provider_id,
    slug,
    title_ar,
    title_en,
    description_ar,
    description_en,
    service_id,
    emirate_id,
    city_id,
    area_id,
    project_year,
    client_type,
    materials_used,
    cover_image_url,
    gallery,
    display_order,
    is_featured,
    publication_status,
    published_at
  )
  values (
    v_provider_id,
    'your-next-custom-project',
    'مشروعك القادم مع أركلين',
    'Your Next Custom Project with ARKLEEN',
    'أركلين جاهزة لدراسة وتصميم وتصنيع وتنفيذ مشروعك القادم في العين أو أبوظبي، سواء كان مطبخاً أو خزائن أو أبواباً أو أثاثاً أو كسوات وديكورات خشبية أو تجهيزاً داخلياً متكاملاً. تعرض البطاقة صوراً من هوية الورشة ونماذج مجالات عمل المزود لتوضيح قدرته على تحويل الفكرة والمقاسات والصور المرجعية إلى نطاق عمل قابل للتسعير والتنفيذ. أرسل موقع المشروع والمقاسات والمخططات والصور والخامة والتشطيب والميزانية التقريبية للحصول على مراجعة أولية وعرض سعر مناسب.',
    'ARKLEEN is ready to review, design, manufacture and deliver your next project in Al Ain or Abu Dhabi, whether it involves a kitchen, wardrobes, doors, furniture, wooden cladding, decorative joinery or a coordinated interior fit-out. This single project card uses verified provider and workshop imagery to show the available fields of work and the ability to translate an idea, measurements and reference images into a practical scope and quotation. Share the location, dimensions, drawings, photographs, preferred materials, finish and approximate budget for an initial review.',
    v_project_service_id,
    v_emirate_id,
    v_city_id,
    v_area_id,
    2026,
    'residential_or_commercial',
    array['أعمال نجارة حسب الطلب', 'تصميم داخلي', 'مطابخ', 'خزائن', 'أبواب', 'أثاث وديكورات خشبية'],
    '/images/providers/arkleen-premium/service-interior-fitout.webp',
    '[
      "/images/providers/arkleen-premium/service-interior-fitout.webp",
      "/images/providers/arkleen-premium/service-custom-kitchens.webp",
      "/images/providers/arkleen-premium/service-custom-wardrobes.webp",
      "/images/providers/arkleen-premium/service-wooden-doors-decor.webp",
      "/images/providers/arkline/arkline-workshop.webp",
      "/images/providers/arkline/arkline-production.webp"
    ]'::jsonb,
    1,
    true,
    'published',
    now()
  );
end
$$;
