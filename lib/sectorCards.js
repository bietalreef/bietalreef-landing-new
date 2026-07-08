const SECTOR_CARD_BASE_PATH = '/images/sector-cards/';

export const SECTOR_CARD_IMAGES = {
  generalContracting: `${SECTOR_CARD_BASE_PATH}general-contracting-construction-card.webp`,
  engineeringDesign: `${SECTOR_CARD_BASE_PATH}engineering-consultants-design-card.webp`,
  buildingMaterialsStores: `${SECTOR_CARD_BASE_PATH}building-materials-stores-card.webp`,
  maintenanceFinishing: `${SECTOR_CARD_BASE_PATH}maintenance-finishing-ac-plumbing-electrical-card.webp`,
  aluminiumGlassWood: `${SECTOR_CARD_BASE_PATH}aluminium-glass-wood-card.webp`,
  cleaningEquipment: `${SECTOR_CARD_BASE_PATH}cleaning-equipment-rental-card.webp`,
  factoriesSuppliersWorkshops: `${SECTOR_CARD_BASE_PATH}factories-suppliers-workshops-card.webp`,
};

export function getSectorCardImage(slug) {
  const key = String(slug || '').trim();

  const imageMap = {
    'general-contracting': SECTOR_CARD_IMAGES.generalContracting,
    construction: SECTOR_CARD_IMAGES.generalContracting,
    'project-management': SECTOR_CARD_IMAGES.generalContracting,
    landscaping: SECTOR_CARD_IMAGES.generalContracting,

    'engineering-consultants': SECTOR_CARD_IMAGES.engineeringDesign,
    'interior-design': SECTOR_CARD_IMAGES.engineeringDesign,

    'building-materials': SECTOR_CARD_IMAGES.buildingMaterialsStores,
    'marble-ceramic': SECTOR_CARD_IMAGES.buildingMaterialsStores,
    'smart-systems': SECTOR_CARD_IMAGES.buildingMaterialsStores,
    'furniture-decor': SECTOR_CARD_IMAGES.buildingMaterialsStores,
    'furniture-decoration': SECTOR_CARD_IMAGES.buildingMaterialsStores,

    'general-maintenance': SECTOR_CARD_IMAGES.maintenanceFinishing,
    maintenance: SECTOR_CARD_IMAGES.maintenanceFinishing,
    'finishing-works': SECTOR_CARD_IMAGES.maintenanceFinishing,
    electrical: SECTOR_CARD_IMAGES.maintenanceFinishing,
    plumbing: SECTOR_CARD_IMAGES.maintenanceFinishing,
    'ac-technicians': SECTOR_CARD_IMAGES.maintenanceFinishing,
    'specialized-services': SECTOR_CARD_IMAGES.maintenanceFinishing,

    'aluminium-glass': SECTOR_CARD_IMAGES.aluminiumGlassWood,
    carpentry: SECTOR_CARD_IMAGES.aluminiumGlassWood,
    craftsmen: SECTOR_CARD_IMAGES.aluminiumGlassWood,

    'cleaning-services': SECTOR_CARD_IMAGES.cleaningEquipment,
    cleaning: SECTOR_CARD_IMAGES.cleaningEquipment,
    'equipment-rental': SECTOR_CARD_IMAGES.cleaningEquipment,

    workshops: SECTOR_CARD_IMAGES.factoriesSuppliersWorkshops,
    factories: SECTOR_CARD_IMAGES.factoriesSuppliersWorkshops,
    suppliers: SECTOR_CARD_IMAGES.factoriesSuppliersWorkshops,
    'transport-logistics': SECTOR_CARD_IMAGES.factoriesSuppliersWorkshops,
  };

  return imageMap[key] || SECTOR_CARD_IMAGES.generalContracting;
}
