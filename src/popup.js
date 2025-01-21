document.addEventListener('DOMContentLoaded', () => {
    const toggleVideo = document.getElementById('toggleVideo');
    const toggleBtn = document.getElementById('toggleBtn');

    // Загружаем сохраненные значения
    chrome.storage.sync.get(['removeVideo', 'removeBtn'], (data) => {
        toggleVideo.checked = data.removeVideo || false;
        toggleBtn.checked = data.removeBtn || false;
    });

    // Сохраняем состояние переключателей
    toggleVideo.addEventListener('change', () => {
        chrome.storage.sync.set({ removeVideo: toggleVideo.checked });
    });

    toggleBtn.addEventListener('change', () => {
        chrome.storage.sync.set({ removeBtn: toggleBtn.checked });
    });
});