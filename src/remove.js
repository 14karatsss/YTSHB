(function($) {
    $(document).ready(function() {
        console.log("YTSHBlocker has started");

        // Функция для удаления видосов
        function removeVideo() {
            $('.style-scope.ytd-rich-shelf-renderer').remove();
            console.log("Videos delete");
        }

        //Функция для удаления кнопки
        function removeBtn(){
            $('[title="Shorts"]').remove();
            console.log("Button Shorts delete");
        }

        // Инициализация MutationObserver
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // Если добавлены новые элементы, вызываем функцию удаления
                if (mutation.addedNodes.length) {
                    removeVideo();
                    removeBtn()
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
}(jQuery));