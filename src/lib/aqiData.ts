export interface UserProfile {
  name: string;
  dateOfBirth: string;
  city: string;
  medicalCondition: 'none' | 'asthma' | 'respiratory' | 'heart';
}

export interface AQIData {
  value: number;
  category: 'good' | 'moderate' | 'unhealthySensitive' | 'unhealthy' | 'veryUnhealthy' | 'hazardous';
  color: string;
}

export interface PollutantData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export const getAQICategory = (value: number): AQIData => {
  if (value <= 50) {
    return { value, category: 'good', color: 'hsl(142, 70%, 45%)' };
  } else if (value <= 100) {
    return { value, category: 'moderate', color: 'hsl(48, 90%, 55%)' };
  } else if (value <= 150) {
    return { value, category: 'unhealthySensitive', color: 'hsl(28, 90%, 55%)' };
  } else if (value <= 200) {
    return { value, category: 'unhealthy', color: 'hsl(15, 85%, 50%)' };
  } else if (value <= 300) {
    return { value, category: 'veryUnhealthy', color: 'hsl(340, 70%, 45%)' };
  }
  return { value, category: 'hazardous', color: 'hsl(0, 75%, 40%)' };
};

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    good: 'Good',
    moderate: 'Moderate',
    unhealthySensitive: 'Unhealthy for Sensitive',
    unhealthy: 'Unhealthy',
    veryUnhealthy: 'Very Unhealthy',
    hazardous: 'Hazardous',
  };
  return labels[category] || 'Unknown';
};

export const activitySuggestions: Record<string, string[]> = {
  good: [
    "Perfect day for a sunrise jog! 🏃‍♂️",
    "Go hug a tree. Literally. They're working overtime. 🌳",
    "Outdoor yoga? Your lungs will thank you! 🧘",
  ],
  moderate: [
    "Short walks are still a go – just skip the marathon plans. 🚶",
    "Maybe save the intense cardio for indoor? 💪",
    "A leisurely bike ride sounds perfect! 🚴",
  ],
  unhealthySensitive: [
    "Indoor gym day! Your lungs need a break. 🏋️",
    "How about some indoor stretching? 🤸",
    "Netflix and... actually rest? 📺",
  ],
  unhealthy: [
    "Stay indoors, become a houseplant today. 🪴",
    "Indoor activities only – think board games! 🎲",
    "Your couch is calling. Answer it. 🛋️",
  ],
  veryUnhealthy: [
    "Masks on, windows closed, vibes inside only. 😷",
    "Consider this your official indoor day. 🏠",
    "Air purifier appreciation day! 💨",
  ],
  hazardous: [
    "Do not go outside. We repeat: STAY INSIDE. 🚨",
    "Emergency cozy mode activated. 🆘",
    "Only essential trips. Breathe wisely. ⚠️",
  ],
};

export const weeklyAQIData = [
  { day: 'Mon', aqi: 45, color: 'hsl(142, 70%, 45%)' },
  { day: 'Tue', aqi: 62, color: 'hsl(48, 90%, 55%)' },
  { day: 'Wed', aqi: 78, color: 'hsl(48, 90%, 55%)' },
  { day: 'Thu', aqi: 55, color: 'hsl(48, 90%, 55%)' },
  { day: 'Fri', aqi: 42, color: 'hsl(142, 70%, 45%)' },
  { day: 'Sat', aqi: 38, color: 'hsl(142, 70%, 45%)' },
  { day: 'Sun', aqi: 51, color: 'hsl(48, 90%, 55%)' },
];

export const pollutantData: PollutantData[] = [
  { name: 'PM2.5', value: 35, percentage: 40, color: 'hsl(15, 85%, 50%)' },
  { name: 'PM10', value: 25, percentage: 20, color: 'hsl(28, 90%, 55%)' },
  { name: 'NO₂', value: 18, percentage: 15, color: 'hsl(48, 90%, 55%)' },
  { name: 'CO', value: 12, percentage: 12, color: 'hsl(142, 60%, 50%)' },
  { name: 'O₃', value: 8, percentage: 8, color: 'hsl(156, 50%, 55%)' },
  { name: 'SO₂', value: 5, percentage: 5, color: 'hsl(156, 60%, 45%)' },
];

export const localFactors = [
  { label: 'Heavy Traffic', icon: '🚗', impact: 'high' },
  { label: 'Cold Weather', icon: '❄️', impact: 'medium' },
  { label: 'Industrial Zone', icon: '🏭', impact: 'high' },
  { label: 'Green Cover', icon: '🌿', impact: 'low' },
];

export const environmentQuotes = [
  { text: "The Earth does not belong to us. We belong to the Earth.", author: "Chief Seattle" },
  { text: "In every walk with nature, one receives far more than he seeks.", author: "John Muir" },
  { text: "Look deep into nature, and then you will understand everything better.", author: "Albert Einstein" },
  { text: "The environment is where we all meet; where we all have a mutual interest.", author: "Lady Bird Johnson" },
  { text: "We do not inherit the Earth from our ancestors; we borrow it from our children.", author: "Native American Proverb" },
  { text: "What we are doing to the forests is a mirror reflection of what we are doing to ourselves.", author: "Mahatma Gandhi" },
  { text: "The greatest threat to our planet is the belief that someone else will save it.", author: "Robert Swan" },
  { text: "Clean air is not a luxury, it's a necessity.", author: "Unknown" },
  { text: "Every breath you take is a gift from the trees.", author: "Environmental Wisdom" },
  { text: "Nature is not a place to visit. It is home.", author: "Gary Snyder" },
];

export const healthRecommendations = {
  good: {
    title: "Air Quality is Excellent! 🌿",
    description: "The air is clean and healthy for everyone.",
    recommendations: [
      { icon: "🏃", title: "Outdoor Activities", text: "Great time for jogging, cycling, or any outdoor exercise!" },
      { icon: "🪟", title: "Fresh Air", text: "Open your windows and let the fresh air in." },
      { icon: "👨‍👩‍👧‍👦", title: "Family Time", text: "Perfect for outdoor family activities and picnics." },
    ],
  },
  moderate: {
    title: "Air Quality is Acceptable 🌤️",
    description: "Air quality is acceptable for most people.",
    recommendations: [
      { icon: "⚡", title: "Moderate Activity", text: "Okay for most outdoor activities, but take breaks." },
      { icon: "👶", title: "Sensitive Groups", text: "Children and elderly should limit prolonged outdoor exposure." },
      { icon: "💧", title: "Stay Hydrated", text: "Drink plenty of water during outdoor activities." },
    ],
  },
  unhealthySensitive: {
    title: "Unhealthy for Sensitive Groups ⚠️",
    description: "People with respiratory conditions should be cautious.",
    recommendations: [
      { icon: "😷", title: "Consider Masks", text: "Sensitive individuals should consider wearing N95 masks." },
      { icon: "🏠", title: "Indoor Preference", text: "Prefer indoor activities when possible." },
      { icon: "💊", title: "Medication Ready", text: "Keep inhalers and medication accessible." },
    ],
  },
  unhealthy: {
    title: "Unhealthy Air Quality 🟠",
    description: "Everyone may begin to experience health effects.",
    recommendations: [
      { icon: "🚫", title: "Limit Outdoor Time", text: "Avoid prolonged outdoor activities." },
      { icon: "😷", title: "Wear Masks", text: "N95 masks recommended for everyone going outside." },
      { icon: "🪟", title: "Keep Windows Closed", text: "Keep windows and doors closed." },
      { icon: "🌬️", title: "Air Purifier", text: "Use air purifiers indoors if available." },
    ],
  },
  veryUnhealthy: {
    title: "Very Unhealthy ⚠️🔴",
    description: "Health warnings of emergency conditions.",
    recommendations: [
      { icon: "🏠", title: "Stay Indoors", text: "Avoid all outdoor physical activities." },
      { icon: "😷", title: "Masks Essential", text: "N95 masks mandatory if going outside." },
      { icon: "🌬️", title: "Air Purification", text: "Run air purifiers continuously." },
      { icon: "🚨", title: "Health Alert", text: "Seek medical attention if experiencing symptoms." },
    ],
  },
  hazardous: {
    title: "Hazardous Conditions 🚨",
    description: "Health alert: everyone may experience serious effects.",
    recommendations: [
      { icon: "🆘", title: "Emergency Level", text: "This is a health emergency. Stay indoors." },
      { icon: "🚫", title: "No Outdoor Activity", text: "Absolutely no outdoor activities." },
      { icon: "📞", title: "Medical Help", text: "Contact healthcare provider if feeling unwell." },
      { icon: "🏥", title: "Sensitive Groups", text: "People with conditions should consider relocating temporarily." },
    ],
  },
};
