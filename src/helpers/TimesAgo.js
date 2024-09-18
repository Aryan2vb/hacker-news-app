export default function TimesAgo(date) {

    const now = new Date();
    const diff = now - date;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes === 1) return `${days} minute ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours === 1) return `${hours} hour ago`
    if (hours < 24) return `${hours} hours ago`;
    if (days === 1) return `${days} day ago`;
    if (days < 7) return `${days} days ago`;
    if (weeks < 4) return `${weeks} weeks ago`;
    if (months < 12) return `${months} months ago`;
    return `${years} years ago`;
};