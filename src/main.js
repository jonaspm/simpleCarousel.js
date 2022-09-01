class SimpleCarousel {

    constructor(props) {
        props = props || {}
        this.id = props.id
        this.items = []
        this.height = props.height
        this.width = props.width
        this.images = props.images
        this.onPrev = props.onPrev
        this.onNext = props.onNext
        this.onImageClick = props.onImageClick
        this.initSetup()
    }

    initSetup() {
        this.selectedIndex = 0
        this.carousel = document.querySelector('#' + this.id)

        this.setupStyles();
        this.generateCarousel(this.carousel)
        this.fillCarousel(this.content, this.images)

        this.counter.querySelector('.carousel-total').innerText = this.items.length
        this.changeCounter(this.counter, this.selectedIndex)

        this.carousel.querySelector('.arrow-next').addEventListener('click', evt => {
            this.selectedIndex++
            if (this.selectedIndex >= this.items.length)
                this.selectedIndex = 0
            this.items.forEach((item, i) => {
                if (i === this.selectedIndex)
                    item.classList.remove('hidden-item')
                else
                    item.classList.add('hidden-item')
            });
            this.changeCounter(this.counter, this.selectedIndex)
        })
        this.carousel.querySelector('.arrow-next').addEventListener('click', this.onNext)

        this.carousel.querySelector('.arrow-prev').addEventListener('click', evt => {
            this.selectedIndex--
            if (this.selectedIndex < 0)
                this.selectedIndex = this.items.length - 1
            this.items.forEach((item, i) => {
                if (i === this.selectedIndex)
                    item.classList.remove('hidden-item')
                else
                    item.classList.add('hidden-item')
            })
            this.changeCounter(this.counter, this.selectedIndex)
            
        })
        this.carousel.querySelector('.arrow-prev').addEventListener('click', this.onPrev)
    }

    fillCarousel(content, images) {
        this.items.length = 0
        var itemTemplate = '<div id="$ID" class="carousel-item hidden-item"></div>'
        for (const [i,image]  of images.entries()) {
            this.items.push(
                this.constructor.createElement(
                    itemTemplate.replace('$ID', `item-${i}`)
                )
            )
            if (i == this.selectedIndex)
                this.items[i].classList.remove('hidden-item')
            this.items[i].style['background-image'] = `url('${image}')`
            this.setupItemClick(this.items[i], image)
            content.append(this.items[i])
        }
    }

    generateCarousel(carousel) {
        this.content = this.constructor.createElement('<div class="carousel-content"></div>')
        this.content.style.height = this.height || '250px'
        this.content.style.width = this.width || '300px'
        this.arrowPrev = this.constructor.createElement('<a class="arrow arrow-prev"></a>')
        this.arrowNext = this.constructor.createElement('<a class="arrow arrow-next"></a>')
        this.counter = this.constructor.createElement('<div class="counter"><span class="carousel-index"></span> / <span class="carousel-total"></span></div>')
        this.content.appendChild(this.arrowPrev)
        this.content.appendChild(this.arrowNext)
        this.content.appendChild(this.counter)
        carousel.appendChild(this.content)
    }

    changeCounter(counter, index) {
        counter.querySelector('.carousel-index').innerText = (index + 1)
    }

    setupItemClick(item, imageUrl) {
        item.addEventListener('click', evt => {
            this.removeBigImage()
            this.bigImage = this.constructor.createElement('<div class="big-image-bg"><img class="big-image" src="' + imageUrl + '"></div>')
            document.querySelector('body').appendChild(this.bigImage)
            this.bigImage.addEventListener('click', () => this.removeBigImage())
        })
        item.addEventListener('click', this.onImageClick)
    }

    setupStyles() {
        // TODO
    }

    removeBigImage() {
        if (this.bigImage) {
            this.bigImage.remove()
            delete this.bigImage
        }
    }

    static createElement(strHTML) {
        let template = document.createElement('template');
        strHTML = strHTML.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = strHTML;
        return template.content.firstChild;
    }

}