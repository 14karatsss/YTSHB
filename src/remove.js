(function($) {
    $(document).ready(function() {
        console.log("YTSHBlocker has started");

        let canRemoveVideo = true;
        let canRemoveBtn = true;

        // Функция для удаления видосов
        function removeVideo() {
            if (canRemoveVideo) {
                $('.style-scope.ytd-rich-shelf-renderer').remove();
                console.log("Videos deleted");
            }
        }

        // Функция для удаления кнопки
        function removeBtn(){
            if (canRemoveBtn) {
                $('[title="Shorts"]').remove();
                console.log("Button Shorts deleted");
            }
        }

        // Получаем состояния переключателей
        chrome.storage.sync.get(['removeVideo', 'removeBtn'], (data) => {
            canRemoveVideo = data.removeVideo || false;
            canRemoveBtn = data.removeBtn || false;

            // Инициализация MutationObserver
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    // Если добавлены новые элементы, вызываем функцию удаления
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