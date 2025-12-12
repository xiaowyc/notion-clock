function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    updateUnit('hours', hours);
    updateUnit('minutes', minutes);
}

function updateUnit(unitId, newValue) {
    const unit = document.getElementById(unitId);
    
    // Check if value changed
    // We store the current displayed value on the element's dataset
    const currentValue = unit.dataset.value;
    
    if (currentValue === undefined) {
        // Initial set
        setUnitValue(unit, newValue);
        unit.dataset.value = newValue;
        return;
    }

    if (currentValue !== newValue) {
        flip(unit, newValue);
    }
}

function setUnitValue(unit, value) {
    // Helper to set all parts immediately (no animation)
    const parts = [
        unit.querySelector('.static-top span'),
        unit.querySelector('.static-bottom span'),
        unit.querySelector('.flipper-front span'),
        unit.querySelector('.flipper-back span')
    ];
    parts.forEach(el => el.textContent = value);
}

function flip(unit, newValue) {
    // Current value is what's currently on display (from static bottom or before flip)
    const currentValue = unit.dataset.value;
    
    // Prepare the layers for the animation
    
    // 1. Static Top: Shows the NEXT (new) value (revealed when flipper moves down)
    unit.querySelector('.static-top span').textContent = newValue;
    
    // 2. Static Bottom: Shows the CURRENT value (visible until flipper back lands on it)
    unit.querySelector('.static-bottom span').textContent = currentValue;
    
    // 3. Flipper Front: Shows the CURRENT value (visible start of animation)
    unit.querySelector('.flipper-front span').textContent = currentValue;
    
    // 4. Flipper Back: Shows the NEXT (new) value (visible end of animation)
    unit.querySelector('.flipper-back span').textContent = newValue;
    
    // Start Animation
    const flipper = unit.querySelector('.flipper');
    
    // Remove class to reset if needed (though we handle cleanup)
    flipper.classList.remove('augment');
    // Trigger reflow
    void flipper.offsetWidth;
    flipper.classList.add('augment');
    
    // Cleanup after animation
    // Match this timeout to the CSS animation duration (0.6s = 600ms)
    setTimeout(() => {
        flipper.classList.remove('augment');
        
        // After flip, the "Static Bottom" should now be the New Value, 
        // because the flipper (which was showing New Value on Back) disappears/resets.
        // To reset seamlessly:
        // Set ALL elements to New Value.
        setUnitValue(unit, newValue);
        
        // Update state
        unit.dataset.value = newValue;
        
    }, 600);
}

// Start
updateTime();
setInterval(updateTime, 1000);
