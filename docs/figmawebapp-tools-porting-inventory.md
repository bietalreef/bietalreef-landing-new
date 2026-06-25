# Figmawebapp Tools Porting Inventory

This file prepares the tools module from `bietalreef/Figmawebapp` for the new Biet Al Reef app work.

The source tools are currently inside:

```txt
bietalreef/Figmawebapp
src/components/mobile/ToolsScreen.tsx
src/components/mobile/AIToolsDashboard.tsx
src/components/mobile/tools/*
```

`ToolsScreen.tsx` renders `AIToolsDashboard`, and `AIToolsDashboard.tsx` imports the full tool set.

---

## 1. Tools dashboard source

Source file:

```txt
src/components/mobile/AIToolsDashboard.tsx
```

Main dashboard features:

- Category tabs.
- Search.
- Tool cards.
- Arabic/English labels.
- Fullscreen tool view.
- Tool-level error boundary.
- Static imports for all tools.

---

## 2. Tool categories

The dashboard uses these categories:

```txt
all
Documents
Calculators
Design
Marketing
```

Arabic labels:

```txt
الكل
المستندات
الحاسبات
التصميم
التسويق
```

---

## 3. Tools to port from Figmawebapp

| ID | Arabic Name | English Name | Category | Source file |
|---|---|---|---|---|
| quote | مولّد عروض الأسعار | Quotation Generator | Documents | src/components/mobile/tools/QuoteGeneratorTool.tsx |
| invoice | مولّد الفواتير | Invoice Generator | Documents | src/components/mobile/tools/InvoiceGeneratorTool.tsx |
| contract | مولّد العقود | Contract Generator | Documents | src/components/mobile/tools/ContractGeneratorTool.tsx |
| materials | حاسبة مواد البناء | Materials Calculator | Calculators | src/components/mobile/tools/MaterialCalculatorV2.tsx |
| cost | مقدّر تكلفة البناء | Cost Estimator | Calculators | src/components/mobile/tools/CostEstimatorTool.tsx |
| paint | حاسبة الدهانات التفاعلية | Interactive Paint Calculator | Calculators | src/components/mobile/tools/PaintFlooringCalc.tsx |
| lighting | حاسبة الإضاءة | Lighting Calculator | Calculators | src/components/mobile/tools/LightingCalcTool.tsx |
| design-2d | تصميم ثنائي الأبعاد | 2D Floor Plan Designer | Design | src/components/mobile/tools/Design2DTool.tsx |
| design-3d | تصميم ثلاثي الأبعاد | 3D Room Visualizer | Design | src/components/mobile/tools/Design3DTool.tsx |
| convert-2d-3d | تحويل 2D إلى 3D | 2D to 3D Converter | Design | src/components/mobile/tools/Convert2Dto3DTool.tsx |
| room-layout | تخطيط الغرفة | Room Layout Planner | Design | src/components/mobile/tools/RoomLayoutTool.tsx |
| color-palette | لوحة الألوان | Color Palette Designer | Design | src/components/mobile/tools/ColorPaletteTool.tsx |
| marketing | مولّد المحتوى التسويقي | Marketing Content Generator | Marketing | src/components/mobile/tools/MarketingContentTool.tsx |
| social-media | مدير وسائل التواصل | Social Media Manager | Marketing | src/components/mobile/tools/SocialMediaManager.tsx |
| video-creator | إنشاء فيديوهات ذكية | AI Video Creator | Design | src/components/mobile/tools/AIVideoCreatorTool.tsx |
| logo-creator | إنشاء شعارات ذكية | AI Logo Creator | Design | src/components/mobile/tools/AILogoCreatorTool.tsx |

---

## 4. Shared dependencies to copy or rebuild

These files are required by multiple tools and should be copied as a reference or rebuilt in the new app architecture:

```txt
src/components/mobile/tools/SimpleToolShell.tsx
src/components/mobile/tools/CollapsibleSection.tsx
src/components/mobile/tools/pdfExport.ts
src/components/mobile/tools/logic/AllCalculators.ts
src/components/ui/Icon3D.tsx
src/contexts/LanguageContext.tsx
```

Important external dependencies used by the React version:

```txt
react
motion/react
lucide-react
```

For Flutter, these should not be copied as-is. They should be translated into Dart widgets and services.

---

## 5. Recommended new-app tool structure

For the future Flutter/Dart app, prepare a clean structure like:

```txt
lib/features/tools/
  tools_home/
  documents/
    quote_generator/
    invoice_generator/
    contract_generator/
  calculators/
    materials_calculator/
    cost_estimator/
    paint_calculator/
    lighting_calculator/
  design/
    room_layout/
    color_palette/
    design_2d/
    design_3d/
    convert_2d_3d/
  marketing/
    marketing_content/
    social_media_manager/
  ai_media/
    video_creator/
    logo_creator/
  shared/
    tool_shell.dart
    tool_card.dart
    tool_category.dart
    pdf_export_service.dart
    calculators_service.dart
```

---

## 6. Porting priority

### Phase 1 — must port first

```txt
Quotation Generator
Invoice Generator
Contract Generator
Materials Calculator
Cost Estimator
```

These are closest to Biet Al Reef business use and can produce immediate value for providers.

### Phase 2

```txt
Paint Calculator
Lighting Calculator
Room Layout Planner
Color Palette Designer
```

### Phase 3

```txt
2D Designer
3D Visualizer
2D to 3D Converter
AI Video Creator
AI Logo Creator
Social Media Manager
Marketing Content Generator
```

These need deeper design, storage, AI, media, and export decisions.

---

## 7. Notes for implementation

1. Do not treat these tools as public SEO pages.
2. They belong to the app/tools module.
3. The public website can have informational pages about the tools, but the working tools should live in the app.
4. For Flutter, copy the business logic and document structure first, then rebuild UI natively.
5. Do not rely on React component code directly inside Flutter.
6. Preserve Arabic/English labels and tool IDs.
7. Rebuild export features as services, especially quotation, invoice, contract, and PDF output.

---

## 8. Current status

Source has been identified.
Tool list has been extracted.
This file is the reference for copying or rebuilding the tool module in the new application.
