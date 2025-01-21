document.addEventListener('DOMContentLoaded', () => {
    const toggleVideo = document.getElementById('toggleVideo');
    const toggleBtn = document.getElementById('toggleBtn');
    const toggleRedirect = document.getElementById('toggleRedirect'); // Новый переключатель для редиректа

    // Загружаем сохраненные значения
    chrome.storage.sync.get(['removeVideo', 'removeBtn', 'removeRedirect'], (data) => {
        toggleVideo.checked = data.removeVideo || false;
        toggleBtn.checked = data.removeBtn || false;
        toggleRedirect.checked = data.removeRedirect || false; // Состояние переключателя редиректа
    });

    // Сохраняем состояние переключателей
    toggleVideo.addEventListener('change', () => {
        chrome.storage.sync.set({ removeVideo: toggleVideo.checked });
    });

    toggleBtn.addEventListener('change', () => {
        chrome.storage.sync.set({ removeBtn: toggleBtn.checked });
    });

    // Обработчик для нового переключателя
    toggleRedirect.addEventListener('change', () => {
        chrome.storage.sync.set({ removeRedirect: toggleRedirect.checked });
    });
});