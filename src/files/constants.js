const WEATHER_ICONS = {
    'neutral': '☁️',
    'super cold': '❄️',
    'cold': '⛷️',
    'hot': '🏖️',
    'super hot': '☀️'
};

const MOOD_ICONS = {
    'neutral': '👧',
    'freezing': '🧊',
    'shivering': '🥶',
    'sweating': '🥵',
    'scorching': '🔥',
    'dead': '💀'
};

const weatherHash = {
    'super cold': -5,
    'cold': -2,
    'neutral': 0,
    'hot': 2,
    'super hot': 5
};

const moodRanges = [
    { mood: 'freezing', start: -Infinity, end: 79 },
    { mood: 'shivering', start: 80, end: 89 },
    { mood: 'neutral', start: 90, end: 99 },
    { mood: 'sweating', start: 100, end: 109 },
    { mood: 'scorching', start: 110, end: Infinity },
];

export { WEATHER_ICONS, MOOD_ICONS, weatherHash, moodRanges };