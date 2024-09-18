export default function GetDomain(url) {
    try {
        return new URL(url).hostname
    } catch (error) {
        return ""
    }
};