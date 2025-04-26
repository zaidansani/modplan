import keyValues from "public/key_values.json"

export const gradients = [
    "bg-gradient-to-r from-pink-100 to-yellow-100",
    "bg-gradient-to-r from-blue-100 to-purple-100",
    "bg-gradient-to-r from-green-100 to-teal-100",
    "bg-gradient-to-r from-orange-100 to-red-100",
    "bg-gradient-to-r from-amber-100 to-emerald-100",
    "bg-gradient-to-r from-purple-100 to-rose-100",
    "bg-gradient-to-r from-indigo-100 to-teal-100",
];

export const tagColors = [
    "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-800",
    "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-800",
    "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-800",
    "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-800",
    "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-800",
    "bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 border-pink-800",
    "bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 border-indigo-800",
    "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-orange-800",
    "bg-gradient-to-r from-teal-100 to-teal-200 text-teal-800 border-teal-800",
];

export const defaultColor = "bg-gradient-to-r from-stone-100 to-stone-200 backdrop-blur-sm"

export const gradeColors = Object.fromEntries(Object.entries(keyValues.grades)
    .map(([grade, items]) => [grade, items.color]));

export const badgeColors = "border-stone-400 bg-stone-100 text-stone-400"

export const invertTailwindGradient = (className) => {
    const shadeMap = {
        '50': '950',
        '100': '900',
        '200': '800',
        '300': '700',
        '400': '600',
        '500': '500',
        '600': '400',
        '700': '300',
        '800': '200',
        '900': '100',
        '950': '50',
    };

    return className.split(' ').map(cls => {
        // Match any color-number pattern (e.g., red-100, blue-200, etc.)
        const match = cls.match(/(-\d{2,3})(\/\d+)?$/);
        if (match) {
            const currentShade = match[1].substring(1); // Remove the leading '-'
            const opacity = match[2] || ''; // Preserve opacity if it exists
            return cls.replace(`-${currentShade}${opacity}`, `-${shadeMap[currentShade]}${opacity}`);
        }
        return cls;
    }).join(' ');
};