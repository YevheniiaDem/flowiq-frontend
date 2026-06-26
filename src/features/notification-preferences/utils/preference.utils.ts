import type {
  NotificationChannel,
  NotificationPreferenceCategory,
  NotificationPreferenceItem,
  NotificationPreferenceKey,
  NotificationPreferenceUpdateItem,
  NotificationPreferencesResponse,
  PreferenceCategory,
} from "../types";

export const FUTURE_CHANNELS: NotificationChannel[] = ["PUSH", "TELEGRAM"];

export function clonePreferences(
  data: NotificationPreferencesResponse
): NotificationPreferencesResponse {
  return {
    channels: [...data.channels],
    categories: data.categories.map((category) => ({
      id: category.id,
      preferences: category.preferences.map((item) => ({
        key: item.key,
        channels: { ...item.channels },
      })),
    })),
  };
}

export function diffPreferences(
  original: NotificationPreferencesResponse,
  draft: NotificationPreferencesResponse
): NotificationPreferenceUpdateItem[] {
  const changes: NotificationPreferenceUpdateItem[] = [];

  for (const category of draft.categories) {
    const originalCategory = original.categories.find((c) => c.id === category.id);
    if (!originalCategory) continue;

    for (const item of category.preferences) {
      const originalItem = originalCategory.preferences.find((p) => p.key === item.key);
      if (!originalItem) continue;

      for (const channel of draft.channels) {
        if (item.channels[channel] !== originalItem.channels[channel]) {
          changes.push({
            key: item.key,
            channel,
            enabled: item.channels[channel],
          });
        }
      }
    }
  }

  return changes;
}

export function setAllChannels(
  data: NotificationPreferencesResponse,
  enabled: boolean
): NotificationPreferencesResponse {
  return {
    ...data,
    categories: data.categories.map((category) => ({
      ...category,
      preferences: category.preferences.map((item) => ({
        ...item,
        channels: Object.fromEntries(
          data.channels.map((channel) => [channel, enabled])
        ) as Record<NotificationChannel, boolean>,
      })),
    })),
  };
}

export function setCategoryChannels(
  data: NotificationPreferencesResponse,
  categoryId: PreferenceCategory,
  enabled: boolean
): NotificationPreferencesResponse {
  return {
    ...data,
    categories: data.categories.map((category) =>
      category.id !== categoryId
        ? category
        : {
            ...category,
            preferences: category.preferences.map((item) => ({
              ...item,
              channels: Object.fromEntries(
                data.channels.map((channel) => [channel, enabled])
              ) as Record<NotificationChannel, boolean>,
            })),
          }
    ),
  };
}

export function setPreferenceChannel(
  data: NotificationPreferencesResponse,
  key: NotificationPreferenceKey,
  channel: NotificationChannel,
  enabled: boolean
): NotificationPreferencesResponse {
  return {
    ...data,
    categories: data.categories.map((category) => ({
      ...category,
      preferences: category.preferences.map((item) =>
        item.key !== key
          ? item
          : {
              ...item,
              channels: { ...item.channels, [channel]: enabled },
            }
      ),
    })),
  };
}

export function isCategoryFullyEnabled(
  category: NotificationPreferenceCategory,
  channels: NotificationChannel[]
): boolean {
  return category.preferences.every((item) =>
    channels.every((channel) => item.channels[channel])
  );
}

export function isGlobalFullyEnabled(data: NotificationPreferencesResponse): boolean {
  return data.categories.every((category) => isCategoryFullyEnabled(category, data.channels));
}

export function preferenceKeyToI18n(key: NotificationPreferenceKey): string {
  return key
    .toLowerCase()
    .replace(/_([a-z0-9])/g, (_, char: string) => char.toUpperCase());
}

export function filterCategoriesBySearch(
  data: NotificationPreferencesResponse,
  query: string,
  labelForKey: (key: NotificationPreferenceKey) => string
): NotificationPreferencesResponse {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return data;

  return {
    ...data,
    categories: data.categories
      .map((category) => ({
        ...category,
        preferences: category.preferences.filter((item) =>
          labelForKey(item.key).toLowerCase().includes(normalized)
        ),
      }))
      .filter((category) => category.preferences.length > 0),
  };
}

export function flattenPreferences(
  categories: NotificationPreferenceCategory[]
): NotificationPreferenceItem[] {
  return categories.flatMap((category) => category.preferences);
}
