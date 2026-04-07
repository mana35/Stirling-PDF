import type { LogoVariant } from '@app/services/preferencesService';

export const LOGO_FOLDER_BY_VARIANT: Record<LogoVariant, string> = {
  modern: 'mesest-logo',  // MESEST custom branding
  classic: 'mesest-logo', // MESEST custom branding (same for both)
};

export const ensureLogoVariant = (value?: string | null): LogoVariant => {
  return value === 'classic' ? 'classic' : 'modern';
};

export const getLogoFolder = (variant?: LogoVariant | null): string => {
  return LOGO_FOLDER_BY_VARIANT[ensureLogoVariant(variant)];
};

