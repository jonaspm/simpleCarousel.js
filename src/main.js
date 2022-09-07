class SimpleCarousel {

    constructor({ id, images, height, width, onImageClick, onNext, onPrev, bgOverlay}) {

        // Properties
        this.id = id
        this.items = []
        this.height = height
        this.width = width
        this.images = images
        this.bgOverlay = bgOverlay || {}
        this.bgOverlay.color = this.bgOverlay.color || 'rgba(0, 0, 0, 0.4)'
        
        // Events
        this.onPrev = onPrev
        this.onNext = onNext
        this.onImageClick = onImageClick
    }

    render() {
        this.#initSetup()
    }

    #initSetup() {
        this.selectedIndex = 0
        this.carousel = document.querySelector(`#${this.id}`)

        this.setupStyles();
        this.generateCarousel(this.carousel)
        this.fillCarousel(this.content, this.images)

        this.counter.querySelector('.carousel-total').innerText = this.items.length
        this.changeCounter(this.counter, this.selectedIndex)

        this.arrowNext.addEventListener('click', evt => {
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
        this.arrowNext.addEventListener('click', this.onNext)

        this.arrowPrev.addEventListener('click', evt => {
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
        this.arrowPrev.addEventListener('click', this.onPrev)
    }

    fillCarousel(content, images) {
        this.items.length = 0
        var itemTemplate = '<div id="$ID" class="carousel-item hidden-item"></div>'
        for (const [i, image] of images.entries()) {
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
        counter.querySelector('.carousel-index').innerText = (index+1)
    }

    setupItemClick(item, imageUrl) {
        item.addEventListener('click', evt => {
            this.removeBigImage()
            this.bigImage = this.constructor.createElement('<div class="bg-overlay"><img class="big-image" src="' + imageUrl + '"></div>')
            document.querySelector('body').appendChild(this.bigImage)
            this.bigImage.addEventListener('click', () => this.removeBigImage())
        })
        item.addEventListener('click', this.onImageClick)
    }

    setupStyles() {
        const style = document.createElement('style')
        style.innerHTML =  `
        .carousel-content>.counter {
            position: absolute;
            bottom: 0;
            transform: translateY(100%) translateX(50%);
            right: 50%;
        }
      
        .bg-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${this.bgOverlay.color};
            z-index: 999;
        }
      
        .big-image {
            position: fixed;
            height: 80%;
            width: 80%;
            object-fit: contain;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
        }
        
        .carousel-content {
            position: relative;
            margin: 0 auto;
        }
        
        .hidden-item {
            opacity: 0;
            z-index: -1;
        }
        
        .carousel-item {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 25px 50px;
            transition: all 0.5s ease-in-out;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        
        .arrow {
            border: solid black;
            border-width: 0 3px 3px 0;
            display: inline-block;
            padding: 12px;
            cursor: pointer;
        }
        
        .arrow-prev {
            left: -30px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%) rotate(135deg);
        }
        
        .arrow-next {
            right: -30px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%) rotate(-45deg);
        }
        
        .light {
            color: white;
        }
        
        @media (max-width: 480px) {
            .arrow,
            .light .arrow {
            background-size: 10px;
            background-position: 10px 50%;
            }
        }`
        document.head.appendChild(style)
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