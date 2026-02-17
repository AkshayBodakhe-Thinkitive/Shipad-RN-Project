export function firstLetterCapitalize(String : string | undefined) {
    if(!String) return '';
    return String.charAt(0).toUpperCase() + String.slice(1)?.toLowerCase();
}