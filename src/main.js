function carousel(id, images) {

    /* START FUNCTIONS */

    this.initSetup = function () {
        this.selectedIndex = 0;
        this.carousel = $('#' + this.id);

        this.generateCarousel(this.carousel);
        this.fillCarousel(this.content, this.images);

        this.counter.find('.carousel-total').text('' + this.items.length);
        this.changeCounter(this.counter, this.selectedIndex);

        $('.arrow-next').on('click', function (evt) {
            self.selectedIndex++;
            if (self.selectedIndex >= self.items.length) self.selectedIndex = 0;
            self.items.forEach(function (item, i) {
                if (i === self.selectedIndex)
                    item.removeClass('hidden-item');
                else
                    item.addClass('hidden-item');
            });
            self.changeCounter(self.counter, self.selectedIndex);
        });

        $('.arrow-prev').on('click', function (evt) {
            self.selectedIndex--;
            if (self.selectedIndex < 0) self.selectedIndex = self.items.length - 1;
            self.items.forEach(function (item, i) {
                if (i === self.selectedIndex)
                    item.removeClass('hidden-item');
                else
                    item.addClass('hidden-item');
            });
            self.changeCounter(self.counter, self.selectedIndex);
        });
    }

    this.fillCarousel = function (content, images) {
        this.items.length = 0;
        var itemTemplate = '<div id="$ID" class="carousel-item hidden-item"></div>';
        for (let i = 0; i < images.length; i++) {
            self.items.push($(itemTemplate.replace('$ID', 'item-' + i)));
            if (i == self.selectedIndex)
                self.items[i].removeClass('hidden-item');
            self.items[i].css('background-image', "url('" + images[i] + "')");
            content.append(self.items[i]);
        }
    };

    this.generateCarousel = function (carousel) {
        this.content = $('<div class="carousel-content"></div>');
        this.arrowPrev = $('<a class="arrow arrow-prev"></a>');
        this.arrowNext = $('<a class="arrow arrow-next"></a>');
        this.counter = $('<div class="counter"><span class="carousel-index"></span> / <span class="carousel-total"></span></div>');
        this.content.append(self.arrowPrev);
        this.content.append(self.arrowNext);
        this.content.append(self.counter);
        carousel.append(this.content);
    };

    this.changeCounter = function (counter, index) {
        counter.find('.carousel-index').text(index + 1);
    };

    /* END FUNCTIONS */

    var self = this;
    this.id = id;
    this.items = [];
    this.images = images;
    this.initSetup();
}


