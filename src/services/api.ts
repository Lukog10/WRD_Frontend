import {
  closetItems,
  builderItems,
  outfitSuggestions,
  moodBoards,
  aiRecommendations,
  calendarDays,
  todayOutfit,
  weatherData,
  sustainabilityStats,
  recommendationWidget,
  userProfile,
  closetFilters,
  builderFilters,
  ClothingItem,
  OutfitSuggestion,
  MoodBoard,
  CalendarEvent,
  RecommendationCard,
} from '../../constants/data';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Helper to perform API requests to the backend.
 * Falls back to local mock data if the API URL is not set or the request fails.
 */
async function request<T>(endpoint: string, fallbackData: T): Promise<T> {
  if (!API_URL) {
    return fallbackData;
  }
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`[WRD API] Failed to fetch from backend at endpoint ${endpoint}, falling back to mock data.`, error);
    return fallbackData;
  }
}

export const apiService = {
  getClosetItems: () => request<ClothingItem[]>('/closet-items', closetItems),
  getBuilderItems: () => request<ClothingItem[]>('/builder-items', builderItems),
  getOutfitSuggestions: () => request<OutfitSuggestion[]>('/outfit-suggestions', outfitSuggestions),
  getMoodBoards: () => request<MoodBoard[]>('/mood-boards', moodBoards),
  getAIRecommendations: () => request<RecommendationCard[]>('/ai-recommendations', aiRecommendations),
  getCalendarDays: () => request<CalendarEvent[]>('/calendar-days', calendarDays),
  getTodayOutfit: () => request<typeof todayOutfit>('/today-outfit', todayOutfit),
  getWeatherData: () => request<typeof weatherData>('/weather', weatherData),
  getSustainabilityStats: () => request<typeof sustainabilityStats>('/sustainability-stats', sustainabilityStats),
  getRecommendationWidget: () => request<typeof recommendationWidget>('/recommendation-widget', recommendationWidget),
  getUserProfile: () => request<typeof userProfile>('/profile', userProfile),
  getClosetFilters: () => request<string[]>('/closet-filters', closetFilters),
  getBuilderFilters: () => request<string[]>('/builder-filters', builderFilters),
};
