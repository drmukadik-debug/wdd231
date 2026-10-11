const STORAGE_KEY = "sorayaPreferredCategory";


export function savePreferredCategory(category) {
    localStorage.setItem(STORAGE_KEY, category);
}


export function getPreferredCategory() {
    return localStorage.getItem(STORAGE_KEY);
}


export function removePreferredCategory() {
    localStorage.removeItem(STORAGE_KEY);
}