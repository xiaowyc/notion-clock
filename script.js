function updateTime() {
    const now = new Date();
    
    // Get hours and minutes
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    // Update the clock display
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.textContent = `${hours}:${minutes}`;
    }
}

// Update immediately, then every second
updateTime();
setInterval(updateTime, 1000);
