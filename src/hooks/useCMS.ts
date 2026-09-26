import { useState, useEffect } from 'react';
import type { CMSState } from '@/types/cms';
import { cmsService, CMS_EVENT_NAME } from '@/services/cmsService';

export function useCMS() {
  const [cmsData, setCmsData] = useState<CMSState>(cmsService.getState());

  useEffect(() => {
    const handleCMSUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<CMSState>;
      if (customEvent.detail) {
        setCmsData(customEvent.detail);
      } else {
        setCmsData(cmsService.getState());
      }
    };

    window.addEventListener(CMS_EVENT_NAME, handleCMSUpdate);
    window.addEventListener('storage', handleCMSUpdate);

    return () => {
      window.removeEventListener(CMS_EVENT_NAME, handleCMSUpdate);
      window.removeEventListener('storage', handleCMSUpdate);
    };
  }, []);

  return {
    cmsData,
    siteConfig: cmsData.siteConfig,
    announcements: cmsData.announcements,
    gallery: cmsData.gallery,
    poster: cmsData.poster,
    brochure: cmsData.brochure,
    events: cmsData.events,
    team: cmsData.team,
    contact: cmsData.contact,
    travel: cmsData.travel,
    schedule: cmsData.schedule,
    prizes: cmsData.prizes,
    rules: cmsData.rules,
    cmsService,
  };
}
