function SimpleCarousel(id, images, props) {

    /* START FUNCTIONS */

    this.initSetup = function () {
        this.selectedIndex = 0;
        this.carousel = $('#' + this.id);
        
        this.setupStyles();
        this.generateCarousel(this.carousel, props);
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
            this.setupItemClick(self.items[i], images[i]);
            content.append(self.items[i]);
        }
    };

    this.generateCarousel = function (carousel, props) {
        this.content = $('<div class="carousel-content"></div>');
        if (props) {
            this.content.css('height', props.height || '250px');
            this.content.css('width', props.width || '300px');
        }
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

    this.setupItemClick = function (item, imageUrl) {
        item.on('click', function (evt) {
            if (self.bigImage)
                self.removeBigImage();
            self.bigImage = $('<div class="big-image-bg"><img class="big-image" src="' + imageUrl + '"></div>');
            self.bigImage.on('click', self.removeBigImage)
            $('body').append(self.bigImage);
        });
    };

    this.setupStyles = function() {
        // TODO
    };

    this.removeBigImage = function () {
        if (self.bigImage) {
            self.bigImage.remove();
            delete self.bigImage;
        }
    };

    /* END FUNCTIONS */

    var self = this;
    this.id = id;
    this.items = [];
    this.images = images;
    props = props || {};
    this.initSetup();
}