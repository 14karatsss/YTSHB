(function($) {
    $(document).ready(function() {
        console.log("YTSHBlocker has started");

        // Функция для перенаправления
        function redirectToMain() {
            if (window.location.href.startsWith('https://www.youtube.com/shorts/')) {
                window.location.href = 'https://www.youtube.com/';
                console.log("Redirecting to the main page of YouTube");
            }
        }

        // Функция для удаления видео
        function removeVideo() {
            const videoElements = $('.style-scope.ytd-rich-shelf-renderer, .ytd-reel-shelf-renderer');
            if (videoElements.length > 0) {
                videoElements.remove();
                console.log("Videos deleted");
            }
        }

        // Функция для удаления кнопки
        function removeBtn() {
            const btnElements = $('[title="Shorts"], [title="ショート"]');
            if (btnElements.length > 0) {
                btnElements.remove();
                console.log("Button Shorts deleted");
            }
        }

        // Получаем состояния переключателей
        chrome.storage.sync.get(['removeVideo', 'removeBtn', 'removeRedirect'], (data) => {
            const canRemoveVideo = data.removeVideo || false;
            const canRemoveBtn = data.removeBtn || false;

            if (data.removeRedirect) {
                redirectToMain();
            }

            // Инициализация MutationObserver
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    // Если добавлены новые элементы, вызываем функции удаления
                    if (mutation.addedNodes.length) {
                        if (canRemoveVideo) removeVideo();
                        if (canRemoveBtn) removeBtn();
                    }
                });
            });

            // Настройки для observer
            const config = {
                childList: true,
                subtree: true
            };

            // Начинаем наблюдение за body
            observer.observe(document.body, config);

            // Вызов функций удаления при загрузке страницы
            if (canRemoveVideo) removeVideo();
            if (canRemoveBtn) removeBtn();
        });
    });
}(jQuery));