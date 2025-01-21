(function($) {
    $(document).ready(function() {
        console.log("YTSHBlocker has started");

        // Функция для перенаправления
        function redirectToMain() {
            // Проверяем, начинается ли текущий URL с /shorts
            if (window.location.href.startsWith('https://www.youtube.com/shorts/')) {
                window.location.href = 'https://www.youtube.com/';
                console.log("Redirecting to the main page of YouTube");
            }
        }

        // Функция для удаления видео
        function removeVideo() {
            if (canRemoveVideo) {
                $('.style-scope.ytd-rich-shelf-renderer').remove();
                $('.ytd-reel-shelf-renderer').remove();
                console.log("Videos deleted");
            }
        }

        // Функция для удаления кнопки
        function removeBtn() {
            if (canRemoveBtn) {
                $('[title="Shorts"]').remove();
                console.log("Button Shorts deleted");
            }
        }

        // Получаем состояния переключателей
        chrome.storage.sync.get(['removeVideo', 'removeBtn', 'removeRedirect'], (data) => {
            canRemoveVideo = data.removeVideo || false;
            canRemoveBtn = data.removeBtn || false;

            // Проверка на перенаправление
            if (data.removeRedirect) {
                redirectToMain(); // Вызов функции редиректа
            }

            // Инициализация MutationObserver
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    // Если добавлены новые элементы, вызываем функции удаления
                    if (mutation.addedNodes.length) {
                        removeVideo();
                        removeBtn();
                    }
                });
            });

            // Настройки для observer
            const config = {
                childList: true,
                subtree: true // отслеживаем изменения во всех дочерних элементах
            };

            // Начинаем наблюдение за body
            observer.observe(document.body, config);
        });
    });
}(jQuery));