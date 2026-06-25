import type { WhatsNewRelease } from "../types/activation";

export const APP_RELEASE_VERSION = "0.2.0";

export const WHATS_NEW_RELEASES: WhatsNewRelease[] = [
  {
    version: "0.2.0",
    date: "2026-06-24",
    titleKey: "activation.whatsNew.v020.title",
    features: [
      {
        titleKey: "activation.whatsNew.v020.features.checklist.title",
        descriptionKey: "activation.whatsNew.v020.features.checklist.description",
      },
      {
        titleKey: "activation.whatsNew.v020.features.demo.title",
        descriptionKey: "activation.whatsNew.v020.features.demo.description",
      },
      {
        titleKey: "activation.whatsNew.v020.features.success.title",
        descriptionKey: "activation.whatsNew.v020.features.success.description",
      },
      {
        titleKey: "activation.whatsNew.v020.features.help.title",
        descriptionKey: "activation.whatsNew.v020.features.help.description",
      },
    ],
  },
];

export function getLatestRelease(): WhatsNewRelease | undefined {
  return WHATS_NEW_RELEASES[0];
}
