export function returnFileSize(number: number): string {
    if (number < 1024) {
        return number + 'bytes';
    } else if (number > 1024 && number < 1048576) { // 1024 < n < 1024 * 1024
        return (number / 1024).toFixed(1) + 'KB';
    } else if (number > 1048576 && number < 1073741824) { // 1024 * 1024 < n < 1024 * 1024 * 1024
        return (number / 1048576).toFixed(1) + 'MB';
    } else {
        return (number / 1073741824).toFixed(1) + 'GB';
    }
}