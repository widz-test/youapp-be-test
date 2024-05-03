export async function getZodiac(day: number, month: number, year: number): Promise<{zodiac: string, horoscope: string}> {
    const westernZodiacSigns = [
        'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini',
        'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'
    ];
    const chineseZodiacSigns = [
        'Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox',
        'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'
    ];
    const westernZodiacIndex = (month - 1 + (day >= 20 ? 1 : 0)) % 12;
    const chineseZodiacIndex = (year - 1900) % 12;
    const westernZodiac = westernZodiacSigns[westernZodiacIndex];
    const chineseZodiac = chineseZodiacSigns[chineseZodiacIndex];
    return {
        zodiac: chineseZodiac,
        horoscope: westernZodiac
    };
}
