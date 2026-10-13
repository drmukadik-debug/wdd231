const STORAGE_KEY = "sorayaPreferredCategory";

const VALID_CATEGORIES = [
    "all",
    "Clothing",
    "Cosmetics",
    "Accessories"
];

export function savePreferredCategory(category) {
    if (!VALID_CATEGORIES.includes(category)) return;

    try {
        localStorage.setItem(STORAGE_KEY, category);
    } catch (error) {
        console.error(error);
    }
}

export function getPreferredCategory() {
    try {
        const category = localStorage.getItem(STORAGE_KEY);

        return VALID_CATEGORIES.includes(category) ? category : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function removePreferredCategory() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error(error);
    }
}